import { Routes, Route } from 'react-router'
import { Suspense, lazy } from 'react'
import { Spinner } from '@/components/ui/spinner'

// Public pages
const Home = lazy(() => import('./pages/public/Home'))
const About = lazy(() => import('./pages/public/About'))
const Programs = lazy(() => import('./pages/public/Programs'))
const ProgramDetail = lazy(() => import('./pages/public/ProgramDetail'))
const Admission = lazy(() => import('./pages/public/Admission'))
const NewsEvents = lazy(() => import('./pages/public/NewsEvents'))
const BlogDetail = lazy(() => import('./pages/public/BlogDetail'))
const Career = lazy(() => import('./pages/public/Career'))
const Contact = lazy(() => import('./pages/public/Contact'))
const Gallery = lazy(() => import('./pages/public/Gallery'))

// Admin pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))
const AdminContent = lazy(() => import('./pages/admin/Content'))
const AdminAdmission = lazy(() => import('./pages/admin/Admission'))
const AdminPrograms = lazy(() => import('./pages/admin/Programs'))
const AdminBlogs = lazy(() => import('./pages/admin/Blogs'))
const AdminMedia = lazy(() => import('./pages/admin/Media'))
const AdminSettings = lazy(() => import('./pages/admin/Settings'))

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Spinner className="h-8 w-8 text-slate-600" />
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/programs/:slug" element={<ProgramDetail />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/news" element={<NewsEvents />} />
        <Route path="/news/:slug" element={<BlogDetail />} />
        <Route path="/career" element={<Career />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/content" element={<AdminContent />} />
        <Route path="/admin/admission" element={<AdminAdmission />} />
        <Route path="/admin/programs" element={<AdminPrograms />} />
        <Route path="/admin/blogs" element={<AdminBlogs />} />
        <Route path="/admin/media" element={<AdminMedia />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Routes>
    </Suspense>
  )
}
