import { ArrowUpRight } from 'lucide-react';
import { profile } from '../../content/portfolio';

export function Footer() {
  return (
    <footer className="footer">
      <div>
        <span className="kicker">Available for opportunities</span>
        <p>Java backend and full stack roles in Chennai and Bengaluru.</p>
      </div>
      <a href={`mailto:${profile.email}`}>{profile.email} <ArrowUpRight size={17} /></a>
      <small>© {new Date().getFullYear()} John Brite. Built with React & Spring Boot.</small>
    </footer>
  );
}
