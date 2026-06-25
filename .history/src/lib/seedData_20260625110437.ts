import type { SchoolSettings, HeroSlide, CoreValue, Program, BlogPost, Stat, Partner, Testimonial, TeamMember, AdmissionInfo, CareerPost, GalleryImage } from "@/types";

export const defaultSettings: SchoolSettings = {
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
  aboutSectionLabel: "About Our School",
  aboutSectionTitle: "Samriddhi School",
  aboutImage1: "/images/hero1.jpg",
  aboutImage2: "/images/preschool.jpg",
  aboutImage3: "/images/hero2.jpg",
  aboutImage4: "/images/primary.jpg",
  aboutFeature1Title: "STEAM Curriculum",
  aboutFeature1Desc: "Science, Technology, Engineering, Arts & Math",
  aboutFeature2Title: "Expert Faculty",
  aboutFeature2Desc: "Qualified and experienced teaching staff",
  aboutFeature3Title: "Quality Education",
  aboutFeature3Desc: "High academic standards and achievements",
  aboutFeature4Title: "Since 2008",
  aboutFeature4Desc: "Over 15 years of educational excellence",
  aboutPageIntroVisible: true,
  aboutPageIntroLabel: "Our Story",
  aboutPageIntroTitle: "Samriddhi School",
  aboutPageIntroImage: "/images/hero1.jpg",
  aboutPageHighlightsVisible: true,
  aboutPageHighlightsLabel: "Why Choose Us",
  aboutPageHighlightsTitle: "What Sets Us Apart",
  aboutPageHighlight1Title: "STEAM Curriculum",
  aboutPageHighlight1Desc: "Integrated approach to Science, Technology, Engineering, Arts & Mathematics",
  aboutPageHighlight1Icon: "",
  aboutPageHighlight2Title: "Small Class Sizes",
  aboutPageHighlight2Desc: "Personalized attention with optimal student-teacher ratios",
  aboutPageHighlight2Icon: "",
  aboutPageHighlight3Title: "Holistic Development",
  aboutPageHighlight3Desc: "Focus on academic, physical, emotional, and social growth",
  aboutPageHighlight3Icon: "",
  aboutPageHighlight4Title: "Quality Faculty",
  aboutPageHighlight4Desc: "Experienced and passionate educators",
  aboutPageHighlight4Icon: "",
  aboutPageHighlight5Title: "Safe Environment",
  aboutPageHighlight5Desc: "Secure campus with modern facilities",
  aboutPageHighlight5Icon: "",
  aboutPageHighlight6Title: "15+ Years",
  aboutPageHighlight6Desc: "Established track record of excellence",
  aboutPageHighlight6Icon: "",
  metaTitle: "Samriddhi School - Quality Education in Kathmandu",
  metaDescription: "Samriddhi School provides quality K-12 education in Kathmandu, Nepal. STEAM-focused curriculum, modern facilities, and holistic development.",
  updatedAt: new Date().toISOString(),
};

export const defaultHeroSlides: HeroSlide[] = [
  {
    id: "slide_1",
    image: "/images/hero1.jpg",
    title: "Welcome to Samriddhi School",
    subtitle: "Nurturing Future Leaders Through Quality Education",
    order: 1,
    isActive: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "slide_2",
    image: "/images/hero2.jpg",
    title: "STEAM Education for the 21st Century",
    subtitle: "Science, Technology, Engineering, Arts & Mathematics",
    order: 2,
    isActive: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "slide_3",
    image: "/images/hero3.jpg",
    title: "Holistic Development",
    subtitle: "Academic Excellence, Character Building, Creative Expression",
    order: 3,
    isActive: true,
    updatedAt: new Date().toISOString(),
  },
];

export const defaultStats: Stat[] = [
  { id: "stat_1", label: "Students", value: "222", suffix: "+", icon: "Users", order: 1, updatedAt: new Date().toISOString() },
  { id: "stat_2", label: "Excellence", value: "95", suffix: "%", icon: "Award", order: 2, updatedAt: new Date().toISOString() },
  { id: "stat_3", label: "Service", value: "98", suffix: "%", icon: "Heart", order: 3, updatedAt: new Date().toISOString() },
  { id: "stat_4", label: "Years of Experience", value: "15", suffix: "+", icon: "Calendar", order: 4, updatedAt: new Date().toISOString() },
];

export const defaultCoreValues: CoreValue[] = [
  { id: "cv_1", name: "Compassion", description: "Caring for one another and our community", icon: "Heart", order: 1, updatedAt: new Date().toISOString() },
  { id: "cv_2", name: "Respect", description: "Valuing every individual and their unique contributions", icon: "HandHeart", order: 2, updatedAt: new Date().toISOString() },
  { id: "cv_3", name: "Service", description: "Serving our community with dedication and humility", icon: "HelpingHand", order: 3, updatedAt: new Date().toISOString() },
  { id: "cv_4", name: "Excellence", description: "Striving for the highest standards in everything we do", icon: "Star", order: 4, updatedAt: new Date().toISOString() },
  { id: "cv_5", name: "Responsibility", description: "Taking ownership of our actions and their impact", icon: "Shield", order: 5, updatedAt: new Date().toISOString() },
  { id: "cv_6", name: "Teamwork", description: "Collaborating to achieve shared goals", icon: "Users", order: 6, updatedAt: new Date().toISOString() },
  { id: "cv_7", name: "Integrity", description: "Upholding honesty and strong moral principles", icon: "CheckCircle", order: 7, updatedAt: new Date().toISOString() },
  { id: "cv_8", name: "Empowerment", description: "Enabling students to reach their full potential", icon: "Zap", order: 8, updatedAt: new Date().toISOString() },
];

export const defaultPrograms: Program[] = [
  {
    id: "prog_1",
    title: "Pre-School",
    slug: "pre-school",
    description: "Samriddhi School Early Childhood Program with Phonics and Whole Child Development. Our pre-school program nurtures young minds through play-based learning, sensory activities, and foundational skill development.",
    image: "/images/preschool.jpg",
    fullContent: "Our Pre-School program is designed to provide a nurturing and stimulating environment for children aged 3-5. The curriculum focuses on holistic development through play-based learning, phonics instruction, sensory activities, and social interaction.\n\nKey Features:\n- Phonics-based early literacy\n- Play-based learning approach\n- Motor skills development\n- Social and emotional learning\n- Creative arts and music\n- Outdoor play and exploration\n- Small class sizes for individual attention",
    features: ["Phonics Instruction", "Play-Based Learning", "Motor Skills Development", "Creative Arts"],
    order: 1,
    isActive: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prog_2",
    title: "Primary School",
    slug: "primary-school",
    description: "Focus on English language, Project-based learning and different extra-curricular activities for the holistic development of a child. Grades 1-5 build strong academic foundations.",
    image: "/images/primary.jpg",
    fullContent: "The Primary School program at Samriddhi School (Grades 1-5) focuses on building strong academic foundations while nurturing creativity and critical thinking. Our curriculum emphasizes English language proficiency, project-based learning, and a wide range of extracurricular activities.\n\nKey Features:\n- Strong English language focus\n- Project-based learning methodology\n- Mathematics and Science foundations\n- Nepali language and cultural studies\n- Arts, Music, and Physical Education\n- Computer literacy from early grades\n- Regular field trips and educational visits\n- Character education and values development",
    features: ["English Language Focus", "Project-Based Learning", "STEM Foundations", "Character Education"],
    order: 2,
    isActive: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prog_3",
    title: "Secondary School",
    slug: "secondary-school",
    description: "The Lower Secondary school (VI-VIII) is a smooth transition from Primary to Secondary School. Upper Secondary (IX-X) prepares students for SEE examinations with comprehensive subject coverage.",
    image: "/images/secondary.jpg",
    fullContent: "Our Secondary School program encompasses Lower Secondary (Grades 6-8) and Upper Secondary (Grades 9-10). The curriculum is designed to provide a smooth transition from primary education while preparing students for the SEE (Secondary Education Examination).\n\nKey Features:\n- Comprehensive subject coverage aligned with national curriculum\n- Science laboratories for hands-on learning\n- Mathematics and Computer Science emphasis\n- Nepali and English language development\n- Social Studies and Environment Education\n- Health and Physical Education\n- Career guidance and counseling\n- Preparation for SEE examinations",
    features: ["National Curriculum", "Science Labs", "Computer Science", "SEE Preparation"],
    order: 3,
    isActive: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prog_4",
    title: "Plus-2 Management",
    slug: "plus2-management",
    description: "Samriddhi School Grade XI/XII Management program provides in-depth knowledge of management studies. Choose from Computer Science, Business Studies, Economics, Hotel Management, and more.",
    image: "/images/plus2.jpg",
    fullContent: "Our Plus-2 Management program (Grades 11-12) is designed to provide students with comprehensive knowledge of management principles and practices. The program prepares students for higher education in business, management, and related fields.\n\nSpecializations Offered:\n- Computer Science\n- Business Studies\n- Economics\n- Hotel Management\n- Business Mathematics\n- Marketing\n\nKey Features:\n- Experienced faculty with industry backgrounds\n- Modern computer labs and business simulation tools\n- Guest lectures and industry visits\n- Internship opportunities\n- College counseling and placement support\n- Entrepreneurship development programs",
    features: ["Computer Science", "Business Studies", "Economics", "Hotel Management"],
    order: 4,
    isActive: true,
    updatedAt: new Date().toISOString(),
  },
];

export const defaultBlogPosts: BlogPost[] = [
  {
    id: "blog_1",
    title: "Critical Thinking in Classroom",
    slug: "critical-thinking-in-classroom",
    excerpt: "Discover how we foster critical thinking skills in our students through innovative teaching methodologies and engaging classroom activities.",
    content: "Critical thinking is one of the most essential skills we can impart to our students. At Samriddhi School, we have integrated critical thinking across all subjects and grade levels.\n\nOur approach includes:\n- Socratic questioning techniques\n- Problem-based learning scenarios\n- Debate and discussion forums\n- Analytical writing assignments\n- Real-world case studies\n- Collaborative problem-solving activities\n\nTeachers are trained to facilitate rather than lecture, encouraging students to ask questions, challenge assumptions, and develop their own reasoned conclusions. This approach has resulted in students who are not just knowledgeable, but also capable of applying their knowledge in novel situations.",
    image: "/images/blog1.jpg",
    author: "Academic Team",
    category: "Education",
    publishedAt: "2026-01-15",
    isActive: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "blog_2",
    title: "Limitless - Personal Wellness Program",
    slug: "limitless-wellness-program",
    excerpt: "Not to be missed program for SEE graduates at Samriddhi School/College, Balaju, Kathmandu focusing on personal development and wellness.",
    content: "Limitless is our signature personal wellness program designed specifically for SEE graduates transitioning to higher secondary education. This comprehensive program addresses the mental, emotional, and physical well-being of students during this crucial transition period.\n\nProgram Components:\n- Stress management workshops\n- Mindfulness and meditation sessions\n- Goal setting and career planning\n- Time management training\n- Study skills enhancement\n- Peer support groups\n- One-on-one counseling sessions\n\nThe program has shown remarkable results in helping students adapt to the increased academic demands of higher secondary education while maintaining their mental and emotional well-being.",
    image: "/images/blog2.jpg",
    author: "Counseling Department",
    category: "Wellness",
    publishedAt: "2026-02-20",
    isActive: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "blog_3",
    title: "How to Choose a School/College That's Right for You",
    slug: "choosing-right-school",
    excerpt: "You're done with your SEE, and you're looking for your next big venture. Here's a comprehensive guide to help you make the right choice.",
    content: "Choosing the right school or college after SEE is one of the most important decisions you'll make. With so many options available, it's essential to evaluate institutions based on factors that truly matter for your growth and success.\n\nKey Considerations:\n1. Academic Excellence - Look at track records, teaching methodologies, and faculty qualifications\n2. Infrastructure - Modern labs, libraries, sports facilities, and technology integration\n3. Holistic Development - Opportunities for extracurricular activities, leadership, and personal growth\n4. Location and Accessibility - Consider commute time and safety\n5. Values and Culture - Ensure the institution's values align with your family's\n6. Support Services - Counseling, career guidance, and mentorship programs\n\nAt Samriddhi School, we welcome prospective students and parents to visit our campus, interact with our faculty, and experience our learning environment firsthand.",
    image: "/images/blog3.jpg",
    author: "Admissions Team",
    category: "Guidance",
    publishedAt: "2026-03-10",
    isActive: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "blog_4",
    title: "Points to Remember Before Picking a Pre-School",
    slug: "picking-preschool",
    excerpt: "The research shows positive impact on a child's social and academic life with early education. Finding one that best suits your budget and quality is a big challenge.",
    content: "Early childhood education lays the foundation for a child's future academic and social success. Research consistently shows that quality pre-school education has lasting positive impacts on a child's development.\n\nWhat to Look For:\n- Qualified and caring teachers who understand child development\n- Safe, clean, and stimulating learning environment\n- Age-appropriate curriculum with play-based learning\n- Low student-to-teacher ratio\n- Opportunities for social interaction and emotional development\n- Parent involvement and communication\n- Nutritious meals and proper hygiene practices\n- Outdoor play area and physical activities\n\nAt Samriddhi School's Pre-School program, we tick all these boxes and more. Our experienced early childhood educators create a warm, nurturing environment where every child feels safe to explore, learn, and grow.",
    image: "/images/blog4.jpg",
    author: "Early Childhood Team",
    category: "Early Education",
    publishedAt: "2026-04-05",
    isActive: true,
    updatedAt: new Date().toISOString(),
  },
];

export const defaultPartners: Partner[] = [
  { id: "partner_1", name: "Education Nepal", logo: "/images/partner1.jpg", website: "https://educationnepal.com", order: 1, isActive: true, updatedAt: new Date().toISOString() },
  { id: "partner_2", name: "Digital Nepal", logo: "/images/partner2.jpg", website: "https://digitalnepal.com", order: 2, isActive: true, updatedAt: new Date().toISOString() },
  { id: "partner_3", name: "Cambridge Assessment", logo: "/images/partner3.jpg", website: "https://cambridge.org", order: 3, isActive: true, updatedAt: new Date().toISOString() },
  { id: "partner_4", name: "Microsoft Education", logo: "/images/partner4.jpg", website: "https://education.microsoft.com", order: 4, isActive: true, updatedAt: new Date().toISOString() },
];

export const defaultTestimonials: Testimonial[] = [
  {
    id: "test_1",
    name: "Priya Sharma",
    role: "Parent",
    content: "Samriddhi School has been a blessing for our family. The teachers genuinely care about each student's growth, and the STEAM-focused curriculum has helped my daughter develop a love for science and technology.",
    image: "/images/testimonial1.jpg",
    order: 1,
    isActive: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "test_2",
    name: "Rajesh K.C.",
    role: "Parent",
    content: "What impresses me most about Samriddhi School is their commitment to holistic development. My son has grown not just academically but also in confidence, leadership, and character.",
    image: "/images/testimonial2.jpg",
    order: 2,
    isActive: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "test_3",
    name: "Anita Gurung",
    role: "Alumni",
    content: "The foundation I received at Samriddhi School prepared me exceptionally well for university. The critical thinking and problem-solving skills I developed here continue to serve me in my professional career.",
    image: "/images/testimonial3.jpg",
    order: 3,
    isActive: true,
    updatedAt: new Date().toISOString(),
  },
];

export const defaultTeamMembers: TeamMember[] = [
  {
    id: "team_1",
    name: "Mr. Ram Prasad Sharma",
    role: "Principal",
    bio: "With over 20 years of experience in education leadership, Mr. Sharma leads Samriddhi School with vision and dedication.",
    image: "/images/principal.jpg",
    order: 1,
    isActive: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "team_2",
    name: "Ms. Sita Devi Adhikari",
    role: "Vice Principal",
    bio: "Ms. Adhikari oversees academic programs and ensures quality education delivery across all grades.",
    image: "/images/viceprincipal.jpg",
    order: 2,
    isActive: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "team_3",
    name: "Mr. Hari Bahadur Thapa",
    role: "Head of Secondary",
    bio: "Leading the secondary division with expertise in curriculum development and student assessment.",
    image: "/images/headsecondary.jpg",
    order: 3,
    isActive: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "team_4",
    name: "Ms. Gita Kumari Poudel",
    role: "Head of Primary",
    bio: "Passionate about early childhood education and creating engaging learning experiences for young minds.",
    image: "/images/headprimary.jpg",
    order: 4,
    isActive: true,
    updatedAt: new Date().toISOString(),
  },
];

export const defaultAdmissionInfo: AdmissionInfo = {
  id: "admission_main",
  title: "Admission Information",
  content: "Samriddhi School welcomes applications from students who are eager to learn and grow in a supportive, challenging environment. Our admission process is designed to identify students who will benefit from and contribute to our school community.",
  requirements: [
 "Completed application form",
    "Birth certificate",
    "Previous school transcripts (if applicable)",
    "Two passport-sized photographs",
    "Entrance examination (Grades 1 and above)",
    "Parent/guardian interview",
  ],
  process: [
    "Submit completed application form with required documents",
    "Schedule and appear for entrance examination",
    "Attend parent/guardian interview",
    "Receive admission decision within 5 working days",
    "Complete fee payment and enrollment formalities",
  ],
  fees: "Fee structure varies by grade level. Please contact our admissions office for detailed fee information. Scholarships are available for deserving students based on academic merit and financial need.",
  updatedAt: new Date().toISOString(),
};

export const defaultCareerPosts: CareerPost[] = [
  {
    id: "career_1",
    title: "Mathematics Teacher - Secondary Level",
    department: "Academic",
    type: "Full-time",
    description: "We are seeking a passionate Mathematics teacher to join our secondary school faculty. The ideal candidate will have strong subject knowledge and the ability to make mathematics engaging and accessible to students.",
    requirements: ["Master's degree in Mathematics or related field", "Teaching certification/license", "Minimum 2 years teaching experience", "Strong communication skills", "Proficiency in English"],
    isActive: true,
    postedAt: "2026-05-01",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "career_2",
    title: "Computer Science Teacher",
    department: "Academic",
    type: "Full-time",
    description: "Join our team as a Computer Science teacher and help prepare students for the digital age. You will teach programming, computer fundamentals, and digital literacy across different grade levels.",
    requirements: ["Bachelor's degree in Computer Science or IT", "Programming knowledge in Python, Java, or similar", "Teaching experience preferred", "Passion for technology education"],
    isActive: true,
    postedAt: "2026-05-15",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "career_3",
    title: "School Counselor",
    department: "Student Support",
    type: "Full-time",
    description: "We are looking for a compassionate School Counselor to support our students' emotional and academic well-being. You will provide individual counseling, conduct group sessions, and collaborate with teachers and parents.",
    requirements: ["Master's degree in Counseling or Psychology", "Relevant certification/license", "Experience working with children and adolescents", "Strong interpersonal skills"],
    isActive: true,
    postedAt: "2026-06-01",
    updatedAt: new Date().toISOString(),
  },
];

export const defaultGalleryImages: GalleryImage[] = [
  { id: "gallery_1", title: "Annual Day Celebration", images: ["/images/gallery1.jpg", "/images/gallery6.jpg"], category: "Events", order: 1, isActive: true, updatedAt: new Date().toISOString() },
  { id: "gallery_2", title: "Science Fair 2026", images: ["/images/gallery2.jpg", "/images/gallery5.jpg"], category: "Academic", order: 2, isActive: true, updatedAt: new Date().toISOString() },
  { id: "gallery_3", title: "Sports Day", images: ["/images/gallery3.jpg"], category: "Sports", order: 3, isActive: true, updatedAt: new Date().toISOString() },
  { id: "gallery_4", title: "Art Exhibition", images: ["/images/gallery4.jpg"], category: "Arts", order: 4, isActive: true, updatedAt: new Date().toISOString() },
];

// Seeding function
export async function seedAllData(seedFn: (collection: string, data: any[]) => Promise<void>) {
  await seedFn("settings", [defaultSettings]);
  await seedFn("heroSlides", defaultHeroSlides);
  await seedFn("stats", defaultStats);
  await seedFn("coreValues", defaultCoreValues);
  await seedFn("programs", defaultPrograms);
  await seedFn("blogPosts", defaultBlogPosts);
  await seedFn("partners", defaultPartners);
  await seedFn("testimonials", defaultTestimonials);
  await seedFn("teamMembers", defaultTeamMembers);
  await seedFn("admissionInfo", [defaultAdmissionInfo]);
  await seedFn("careerPosts", defaultCareerPosts);
  await seedFn("galleryImages", defaultGalleryImages);
}
