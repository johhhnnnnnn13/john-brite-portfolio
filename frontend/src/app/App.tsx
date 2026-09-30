import { Link, Route, Routes } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { HomePage } from '../features/home/HomePage';
import { ProjectPage } from '../features/projects/ProjectPage';
import { ThemeProvider } from './ThemeProvider';

function NotFound() {
  return <main className="not-found"><p className="kicker">404 / Not found</p><h1>This route isn’t in the blueprint.</h1><Link className="button button--primary" to="/">Return home</Link></main>;
}

export function App() {
  return <ThemeProvider><Header /><Routes><Route path="/" element={<HomePage />} /><Route path="/projects/:slug" element={<ProjectPage />} /><Route path="/404" element={<NotFound />} /><Route path="*" element={<NotFound />} /></Routes><Footer /></ThemeProvider>;
}
