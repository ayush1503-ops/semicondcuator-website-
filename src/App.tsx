import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import HomePage from './pages/Home';
import NotFoundPage from './pages/NotFound';
import AboutPage from '@/app/about/page';
import TrainingPage from '@/app/training/page';
import TrainingDetailPage from '@/app/training/[slug]/page';
import ServicesPage from '@/app/services/page';
import ProjectsPage from '@/app/projects/page';
import CareersPage from '@/app/careers/page';
import PartnershipsPage from '@/app/partnerships/page';
import ResourcesPage from '@/app/resources/page';
import ResourceDetailPage from '@/app/resources/[slug]/page';
import ContactPage from '@/app/contact/page';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="training" element={<TrainingPage />} />
          <Route path="training/:slug" element={<TrainingDetailPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="careers" element={<CareersPage />} />
          <Route path="partnerships" element={<PartnershipsPage />} />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="resources/:slug" element={<ResourceDetailPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}