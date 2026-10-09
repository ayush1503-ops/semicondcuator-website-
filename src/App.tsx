import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './app/page';
import AboutPage from './app/about/page';
import CareersPage from './app/careers/page';
import NotFoundPage from './app/not-found';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
