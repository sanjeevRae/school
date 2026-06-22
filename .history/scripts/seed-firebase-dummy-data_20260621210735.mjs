import admin from "firebase-admin";

const now = new Date().toISOString();

const defaultSettings = {
  id: "main",
  schoolName: "Samriddhi School",
  tagline: "Inspiring Excellence, Building Character",
  address: "Banasthali, Balaju, Kathmandu, Nepal",
  phone: "01-4970590, 4970591",
  email: "info@samriddhischool.edu.np",
  logo: "/images/logo.png",
  favicon: "/images/favicon.png",
  facebook: "https://facebook.com/samriddhischool",
  instagram: "https://instagram.com/samriddhischool",
  youtube: "https://youtube.com/samriddhischool",
  twitter: "",
  aboutText: "Situated in three spacious buildings and grounds of Binayak Basti, Balaju 16, Kathmandu, the aim of Samriddhi School is to provide K-12 education that every child deserves. We appreciate diversity and realize that each young student is different and should be treated as a unique individual. Our constant endeavor is to help each child realize his/her full potential and discover new horizons in learning.\n\nWe believe in bringing out the best in our learners so that they can rise to the top, resembling a lotus, which thrusts itself upwards from the depths in an act of beautiful transcendence. At Samriddhi School, creativity is nurtured, with kids being treated as just kids and not rote machines, making every child feel special and cared for. There are no boundaries for learning and we always encourage trying out new ideas. It's a school for the 21st century where learning is fun and life-long.\n\nSamriddhi School is committed to inspiring and motivating learners to achieve the highest standards of intellectual development as well as personal growth, through a stimulating and comprehensive educational program. The emphasis is on Science, Technology, Engineering, Arts and Mathematics (STEAM), along with other required domains.",
  visionText: "We envision Samriddhi School as a dynamic and inspiring educational institution that sets an example for the learning community. We are committed to providing an outstanding learning environment to our students, to enable them to excel and thrive in a complex, constantly changing world, getting more interconnected by the day.",
  missionText: "The mission of Samriddhi School is to produce lifelong learners with a value system that turns them into good human beings. Honesty, integrity, and sincerity are values that form the strong foundation on which we build an educational process, culminating in academic and personal success of our students. To this end, we make use of the best educational practices and a rich curriculum. Added to this, we plan on collaborating with all stakeholders including students, parents, families, business houses, civic organizations, higher education institutions and the community at large.",
  metaTitle: "Samriddhi School - Quality Education in Kathmandu",
  metaDescription: "Samriddhi School provides quality K-12 education in Kathmandu, Nepal. STEAM-focused curriculum, modern facilities, and holistic development.",
  updatedAt: now,
};

const defaultHeroSlides = [
  { id: "slide_1", image: "/images/hero1.jpg", title: "Welcome to Samriddhi School", subtitle: "Nurturing Future Leaders Through Quality Education", order: 1, isActive: true, updatedAt: now },
  { id: "slide_2", image: "/images/hero2.jpg", title: "STEAM Education for the 21st Century", subtitle: "Science, Technology, Engineering, Arts & Mathematics", order: 2, isActive: true, updatedAt: now },
  { id: "slide_3", image: "/images/hero3.jpg", title: "Holistic Development", subtitle: "Academic Excellence, Character Building, Creative Expression", order: 3, isActive: true, updatedAt: now },
];

const defaultStats = [
  { id: "stat_1", label: "Students", value: "222", suffix: "+", icon: "Users", order: 1, updatedAt: now },
  { id: "stat_2", label: "Excellence", value: "95", suffix: "%", icon: "Award", order: 2, updatedAt: now },
  { id: "stat_3", label: "Service", value: "98", suffix: "%", icon: "Heart", order: 3, updatedAt: now },
  { id: "stat_4", label: "Years of Experience", value: "15", suffix: "+", icon: "Calendar", order: 4, updatedAt: now },
];

const defaultCoreValues = [
  { id: "cv_1", name: "Compassion", description: "Caring for one another and our community", icon: "Heart", order: 1, updatedAt: now },
  { id: "cv_2", name: "Respect", description: "Valuing every individual and their unique contributions", icon: "HandHeart", order: 2, updatedAt: now },
  { id: "cv_3", name: "Service", description: "Serving our community with dedication and humility", icon: "HelpingHand", order: 3, updatedAt: now },
  { id: "cv_4", name: "Excellence", description: "Striving for the highest standards in everything we do", icon: "Star", order: 4, updatedAt: now },
  { id: "cv_5", name: "Responsibility", description: "Taking ownership of our actions and their impact", icon: "Shield", order: 5, updatedAt: now },
  { id: "cv_6", name: "Teamwork", description: "Collaborating to achieve shared goals", icon: "Users", order: 6, updatedAt: now },
  { id: "cv_7", name: "Integrity", description: "Upholding honesty and strong moral principles", icon: "CheckCircle", order: 7, updatedAt: now },
  { id: "cv_8", name: "Empowerment", description: "Enabling students to reach their full potential", icon: "Zap", order: 8, updatedAt: now },
];

const defaultTestimonials = [
  { id: "test_1", name: "Priya Sharma", role: "Parent", content: "Samriddhi School has been a blessing for our family. The teachers genuinely care about each student's growth, and the STEAM-focused curriculum has helped my daughter develop a love for science and technology.", image: "/images/testimonial1.jpg", order: 1, isActive: true, updatedAt: now },
  { id: "test_2", name: "Rajesh K.C.", role: "Parent", content: "What impresses me most about Samriddhi School is their commitment to holistic development. My son has grown not just academically but also in confidence, leadership, and character.", image: "/images/testimonial2.jpg", order: 2, isActive: true, updatedAt: now },
  { id: "test_3", name: "Anita Gurung", role: "Alumni", content: "The foundation I received at Samriddhi School prepared me exceptionally well for university. The critical thinking and problem-solving skills I developed here continue to serve me in my professional career.", image: "/images/testimonial3.jpg", order: 3, isActive: true, updatedAt: now },
];

const defaultTeamMembers = [
  { id: "team_1", name: "Mr. Ram Prasad Sharma", role: "Principal", bio: "With over 20 years of experience in education leadership, Mr. Sharma leads Samriddhi School with vision and dedication.", image: "/images/principal.jpg", order: 1, isActive: true, updatedAt: now },
  { id: "team_2", name: "Ms. Sita Devi Adhikari", role: "Vice Principal", bio: "Ms. Adhikari oversees academic programs and ensures quality education delivery across all grades.", image: "/images/viceprincipal.jpg", order: 2, isActive: true, updatedAt: now },
  { id: "team_3", name: "Mr. Hari Bahadur Thapa", role: "Head of Secondary", bio: "Leading the secondary division with expertise in curriculum development and student assessment.", image: "/images/headsecondary.jpg", order: 3, isActive: true, updatedAt: now },
  { id: "team_4", name: "Ms. Gita Kumari Poudel", role: "Head of Primary", bio: "Passionate about early childhood education and creating engaging learning experiences for young minds.", image: "/images/headprimary.jpg", order: 4, isActive: true, updatedAt: now },
];

const defaultCareerPosts = [
  { id: "career_1", title: "Mathematics Teacher - Secondary Level", department: "Academic", type: "Full-time", description: "We are seeking a passionate Mathematics teacher to join our secondary school faculty. The ideal candidate will have strong subject knowledge and the ability to make mathematics engaging and accessible to students.", requirements: ["Master's degree in Mathematics or related field", "Teaching certification/license", "Minimum 2 years teaching experience", "Strong communication skills", "Proficiency in English"], isActive: true, postedAt: "2026-05-01", updatedAt: now },
  { id: "career_2", title: "Computer Science Teacher", department: "Academic", type: "Full-time", description: "Join our team as a Computer Science teacher and help prepare students for the digital age. You will teach programming, computer fundamentals, and digital literacy across different grade levels.", requirements: ["Bachelor's degree in Computer Science or IT", "Programming knowledge in Python, Java, or similar", "Teaching experience preferred", "Passion for technology education"], isActive: true, postedAt: "2026-05-15", updatedAt: now },
  { id: "career_3", title: "School Counselor", department: "Student Support", type: "Full-time", description: "We are looking for a compassionate School Counselor to support our students' emotional and academic well-being. You will provide individual counseling, conduct group sessions, and collaborate with teachers and parents.", requirements: ["Master's degree in Counseling or Psychology", "Relevant certification/license", "Experience working with children and adolescents", "Strong interpersonal skills"], isActive: true, postedAt: "2026-06-01", updatedAt: now },
];

const defaultPartners = [
  { id: "partner_1", name: "Education Nepal", logo: "/images/partner1.jpg", website: "https://educationnepal.com", order: 1, isActive: true, updatedAt: now },
  { id: "partner_2", name: "Digital Nepal", logo: "/images/partner2.jpg", website: "https://digitalnepal.com", order: 2, isActive: true, updatedAt: now },
  { id: "partner_3", name: "Cambridge Assessment", logo: "/images/partner3.jpg", website: "https://cambridge.org", order: 3, isActive: true, updatedAt: now },
  { id: "partner_4", name: "Microsoft Education", logo: "/images/partner4.jpg", website: "https://education.microsoft.com", order: 4, isActive: true, updatedAt: now },
];

function getServiceAccountFromEnv() {
  const raw = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error("Missing FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON");
  return JSON.parse(raw);
}

function getAdminFirestore() {
  if (admin.apps.length === 0) {
    const serviceAccount = getServiceAccountFromEnv();
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  return admin.firestore();
}

function stripMockId(data) {
  if (data && typeof data === "object" && "id" in data) {
    const { id: _ignoredId, ...rest } = data;
    return rest;
  }
  return data;
}

const SEED_COLLECTIONS = {
  settings: [defaultSettings],
  heroSlides: defaultHeroSlides,
  stats: defaultStats,
  coreValues: defaultCoreValues,
  testimonials: defaultTestimonials,
  teamMembers: defaultTeamMembers,
  careerPosts: defaultCareerPosts,
  partners: defaultPartners,
};

async function seedCollection(firestore, collection, docs) {
  let batch = firestore.batch();
  let ops = 0;

  for (const item of docs) {
    const id = item?.id;
    if (!id) continue;

    const ref = firestore.collection(collection).doc(id);
    batch.set(ref, stripMockId(item), { merge: false });
    ops++;

    if (ops >= 450) {
      await batch.commit();
      batch = firestore.batch();
      ops = 0;
    }
  }

  if (ops > 0) {
    await batch.commit();
  }
}

async function main() {
  const firestore = getAdminFirestore();
  console.log("Seeding Firestore with dummy content from existing seed files...");

  for (const [collection, docs] of Object.entries(SEED_COLLECTIONS)) {
    console.log(`Writing ${collection} (${docs.length} docs)`);
    await seedCollection(firestore, collection, docs);
  }

  console.log("Done.");
}

process.on("unhandledRejection", (e) => {
  console.error("UnhandledRejection:", e);
  process.exit(1);
});

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
