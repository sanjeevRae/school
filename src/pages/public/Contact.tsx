import Navigation from "@/components/public/Navigation";
import Footer from "@/components/public/Footer";
import { useSettings } from "@/hooks/useSchoolData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const { data: settings } = useSettings();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Thank you for your message! We will get back to you soon.");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="bg-slate-800 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            We'd love to hear from you. Reach out to us for any inquiries or to schedule a campus visit.
          </p>
        </div>
      </div>

      <main className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-amber-50 shrink-0">
                    <MapPin className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">Address</h4>
                    <p className="text-sm text-slate-500">{settings?.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-amber-50 shrink-0">
                    <Phone className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">Phone</h4>
                    <p className="text-sm text-slate-500">{settings?.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-amber-50 shrink-0">
                    <Mail className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">Email</h4>
                    <p className="text-sm text-slate-500">{settings?.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-amber-50 shrink-0">
                    <Clock className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">Office Hours</h4>
                    <p className="text-sm text-slate-500">
                      Sunday - Friday: 8:00 AM - 5:00 PM
                      <br />
                      Saturday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-slate-50 rounded-xl p-6 md:p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                      <Input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                      <Input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                      <Input
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Subject *</label>
                      <Input
                        required
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        placeholder="Message subject"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Message *</label>
                    <Textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Your message..."
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {submitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
