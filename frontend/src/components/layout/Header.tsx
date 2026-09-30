import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../app/theme-context';

const links = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];
const homeUrl = import.meta.env.BASE_URL;

export function Header() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const update = () => {
      const available = document.documentElement.scrollHeight - innerHeight;
      setProgress(available > 0 ? (scrollY / available) * 100 : 0);
    };
    addEventListener('scroll', update, { passive: true });
    update();
    return () => removeEventListener('scroll', update);
  }, []);

  return (
    <header className="site-header">
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <div className="nav-wrap">
        <Link className="brand" to="/" aria-label="John Brite home">JB<span>.</span></Link>
        <nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Primary">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          {links.map((label) => <a key={label} href={`${homeUrl}#${label.toLowerCase()}`} onClick={() => setOpen(false)}>{label}</a>)}
        </nav>
        <div className="nav-actions">
          <button className="icon-button" onClick={toggle} aria-label={`Use ${theme === 'dark' ? 'light' : 'dark'} theme`} title="Switch theme">
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <button className="icon-button menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
    </header>
  );
}
