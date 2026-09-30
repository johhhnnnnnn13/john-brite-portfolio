import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { projects } from '../../content/portfolio';

export function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return <Navigate to="/404" replace />;
  return (
    <main className="case-study">
      <Link className="back-link" to="/#projects"><ArrowLeft size={18} /> All projects</Link>
      <header className="case-study__header">
        <div><p className="kicker">{project.eyebrow}</p><h1>{project.title}</h1><p>{project.summary}</p></div>
        <dl><div><dt>Status</dt><dd>{project.status}</dd></div><div><dt>Role</dt><dd>{project.role}</dd></div><div><dt>Stack</dt><dd>{project.stack.join(' · ')}</dd></div></dl>
      </header>
      <section className="case-study__problem"><span>THE PROBLEM</span><h2>{project.problem}</h2></section>
      <div className="case-study__sections">{project.sections.map((section, index) => <section key={section.title}><span>0{index + 1}</span><div><h2>{section.title}</h2><p>{section.body}</p></div><CheckCircle2 size={22} /></section>)}</div>
    </main>
  );
}
