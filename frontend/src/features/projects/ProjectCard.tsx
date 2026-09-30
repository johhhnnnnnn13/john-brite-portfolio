import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../../content/portfolio';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="project-card">
      <div className="project-card__index">0{index + 1}</div>
      <div>
        <p className="kicker">{project.eyebrow}</p>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="tags">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
      </div>
      <Link to={`/projects/${project.slug}`} aria-label={`Read ${project.title} case study`}><ArrowUpRight /></Link>
    </article>
  );
}
