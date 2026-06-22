// Cloudinary configuration and upload utilities
const rawCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const rawUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const CLOUDINARY_CLOUD_NAME = rawCloudName?.trim() || "";
const CLOUDINARY_UPLOAD_PRESET = rawUploadPreset?.trim() || "";
const USE_MOCK_CLOUDINARY = !CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET;

// Mock upload that stores images as base64 in localStorage
// When real Cloudinary credentials are provided, this switches to actual Cloudinary uploads
export async function uploadImage(file: File): Promise<{ url: string; publicId: string }> {
  if (!(file instanceof File)) {
    throw new Error("Please choose a valid image file.");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files can be uploaded.");
  }

  if (USE_MOCK_CLOUDINARY) {
    throw new Error("Cloudinary is not configured. Add valid VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET values in .env and restart the dev server.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  let response: Response;
  try {
    response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );
  } catch {
    throw new Error("Network error while uploading to Cloudinary. Check your internet connection and browser console.");
  }

  let data: any = null;
  try {
    data = await response.json();
  } catch {
    throw new Error("Cloudinary returned an invalid response.");
  }

  if (!response.ok) {
    const apiMessage = data?.error?.message || data?.message;
    const statusMessage = `Cloudinary upload failed (${response.status} ${response.statusText})`;
    throw new Error(apiMessage ? `${statusMessage}: ${apiMessage}` : statusMessage);
  }

  if (!data?.secure_url || !data?.public_id) {
    throw new Error("Cloudinary upload succeeded but returned incomplete data.");
  }

  return { url: data.secure_url, publicId: data.public_id };
}

export async function deleteImage(publicId: string): Promise<void> {
  if (USE_MOCK_CLOUDINARY) {
    const images = JSON.parse(localStorage.getItem("mock_cloudinary_images") || "{}");
    delete images[publicId];
    localStorage.setItem("mock_cloudinary_images", JSON.stringify(images));
    return;
  }

  // Cloudinary delete requires server-side signature
  // This would be implemented in the tRPC backend
  console.warn("Cloudinary delete requires backend implementation");
}

export function getImageUrl(publicIdOrUrl: string): string {
  if (!publicIdOrUrl) return "";
  if (publicIdOrUrl.startsWith("http") || publicIdOrUrl.startsWith("data:")) {
    return publicIdOrUrl;
  }
  if (USE_MOCK_CLOUDINARY) {
    return "";
  }
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${publicIdOrUrl}`;
}
