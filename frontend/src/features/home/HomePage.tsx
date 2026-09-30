import { ArrowDown, ArrowRight, Download, Mail, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AnchorButton } from '../../components/ui/Button';
import { Architecture } from '../architecture/Architecture';
import { ContactForm } from '../contact/ContactForm';
import { ProjectCard } from '../projects/ProjectCard';
import { principles, profile, projects, skillGroups } from '../../content/portfolio';
import { api, apiEnabled } from '../../services/api';

export function HomePage() {
  const [displayProjects, setDisplayProjects] = useState(projects);

  useEffect(() => {
    if (!apiEnabled) return;
    api.projects()
      .then((remote) => setDisplayProjects(projects.map((fallback) => ({ ...fallback, ...remote.find((item) => item.slug === fallback.slug) }))))
      .catch(() => setDisplayProjects(projects));
  }, []);

  return <main>
    <section className="hero" id="home">
      <div className="hero__content">
        <p className="kicker">Java full stack developer · Chennai</p>
        <h1>John<br /><span>Brite.</span></h1>
        <p className="hero__lede">I build <strong>secure backends</strong> and thoughtful web experiences.</p>
        <p className="hero__body">Spring Boot, React, SQL, and automated delivery pipelines. Complex business workflows, shaped into reliable applications.</p>
        <div className="hero__actions"><AnchorButton href="#projects">View projects <ArrowDown size={17} /></AnchorButton><span className="button button--secondary button--disabled" aria-disabled="true" title="Owner-reviewed resume has not been supplied">Resume pending <Download size={17} /></span></div>
        <a className="email-link" href={`mailto:${profile.email}`}><Mail size={16} /> {profile.email}</a>
      </div>
      <div className="hero__visual"><Architecture /></div>
      <div className="hero__meta"><span><MapPin size={15} /> Chennai, India</span><span>Backend · Frontend · Delivery</span></div>
    </section>

    <section className="section about" id="about">
      <div className="section-heading"><p className="kicker">01 / About</p><h2>Engineering for the parts that have to work.</h2></div>
      <div className="about__copy"><p>{profile.bio}</p><p>I enjoy the work between layers: tracing a request from interface to API, shaping data so it stays useful, and making the release path as considered as the feature itself.</p><dl><div><dt>Based in</dt><dd>Chennai, Tamil Nadu</dd></div><div><dt>Education</dt><dd>B.Tech, Information Technology<br />Loyola-ICAM, 2023</dd></div><div><dt>Open to</dt><dd>Java backend & full stack roles<br />Chennai / Bengaluru</dd></div></dl></div>
    </section>

    <section className="section skills" id="skills">
      <div className="section-heading"><p className="kicker">02 / Capabilities</p><h2>A practical stack, connected end to end.</h2></div>
      <div className="skill-grid">{skillGroups.map((group) => <article key={group.name} className="skill-group"><span>{group.index}</span><h3>{group.name}</h3><ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></article>)}</div>
    </section>

    <section className="section projects" id="projects">
      <div className="section-heading section-heading--row"><div><p className="kicker">03 / Selected work</p><h2>Systems with real constraints.</h2></div><p>Case studies focus on the problem, contribution, and engineering decisions. Private work stays private.</p></div>
      <div className="project-list">{displayProjects.map((project, index) => <ProjectCard project={project} index={index} key={project.slug} />)}</div>
    </section>

    <section className="section experience" id="experience">
      <div className="section-heading"><p className="kicker">04 / Experience</p><h2>Professional work, without invented details.</h2></div>
      <div className="experience__content"><div className="timeline-marker"><span /></div><div><p className="kicker">Employment details pending resume review</p><h3>Enterprise application development</h3><p>Backend features, data workflows, API validation, SQL debugging, frontend integration, and delivery support across construction management and integration systems.</p><p className="note">Company names and employment dates are intentionally withheld until the reviewed resume is added.</p></div></div>
    </section>

    <section className="section approach" id="approach">
      <div className="section-heading"><p className="kicker">05 / Engineering approach</p><h2>Clear boundaries. Useful feedback. Fewer surprises.</h2></div>
      <div className="principles">{principles.map(([title, body], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
    </section>

    <section className="delivery">
      <div><p className="kicker">From commit to environment</p><h2>Delivery is part of the system.</h2></div><p>Git and pull request workflows feed Azure Pipelines that validate, test, package, and promote the same versioned artifact through staging and production approvals.</p><div className="delivery__flow"><span>Commit</span><ArrowRight /><span>Validate</span><ArrowRight /><span>Package</span><ArrowRight /><span>Promote</span></div>
    </section>

    <section className="section contact" id="contact">
      <div className="contact__intro"><p className="kicker">06 / Contact</p><h2>Let’s build something dependable.</h2><p>For Java backend and full stack opportunities, send a note here or reach me directly by email.</p><a href={`mailto:${profile.email}`}>{profile.email}</a></div><ContactForm />
    </section>
  </main>;
}
