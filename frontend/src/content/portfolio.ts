export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  status: string;
  summary: string;
  problem: string;
  role: string;
  stack: string[];
  sections: { title: string; body: string }[];
};

export const profile = {
  name: 'John Brite',
  headline: 'Java Full Stack Developer',
  location: 'Chennai, Tamil Nadu, India',
  email: 'johnbrite99333@gmail.com',
  intro: 'I build secure backends and thoughtful web experiences.',
  bio: 'Java full stack developer focused on dependable business systems: clear APIs, well-shaped data models, responsive interfaces, and delivery pipelines that make releases repeatable.',
};

export const skillGroups = [
  { name: 'Backend', index: '01', skills: ['Java', 'Spring Boot', 'Spring MVC', 'Spring Security', 'Hibernate / JPA', 'REST APIs', 'JWT', 'Maven'] },
  { name: 'Frontend', index: '02', skills: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Responsive UI', 'API integration'] },
  { name: 'Mobile', index: '03', skills: ['React Native'] },
  { name: 'Data', index: '04', skills: ['PostgreSQL', 'SQL Server', 'MySQL', 'MongoDB', 'Schema design', 'Stored procedures', 'Indexing', 'Migrations'] },
  { name: 'Delivery', index: '05', skills: ['Azure DevOps', 'Azure Pipelines', 'CI/CD', 'Git', 'Pull requests', 'Build automation'] },
  { name: 'Tools', index: '06', skills: ['Postman', 'OpenAPI', 'IntelliJ IDEA', 'VS Code', 'SSMS'] },
  { name: 'Additional', index: '07', skills: ['Rust device agents', 'Enrollment flows', 'Command validation'] },
];

export const projects: Project[] = [
  {
    slug: 'enterprise-construction-platform',
    title: 'Enterprise construction management',
    eyebrow: 'Professional contribution',
    status: 'Private enterprise product',
    summary: 'Permission-aware project workflows, configurable data, and independently manageable cost records.',
    problem: 'Enterprise project teams need flexible fields and powerful filters without weakening permissions or coupling budget and contract workflows.',
    role: 'Backend and integration contributor',
    stack: ['Java', 'Spring Boot', 'SQL Server', 'Hibernate / JPA', 'REST'],
    sections: [
      { title: 'What I worked on', body: 'Project search and filtering APIs, custom fields, permission-aware access, change management, and project team mapping workflows.' },
      { title: 'Data design', body: 'Separated budget and contract data through migrations and independent pagination, keeping each workflow manageable as records grow.' },
      { title: 'Validation', body: 'Debugged SQL, corrected queries, validated API behavior, and supported frontend integration across workflow boundaries.' },
      { title: 'Tradeoffs', body: 'The implementation favors explicit permission checks and stable query behavior over clever abstractions. Product details and source remain private.' },
    ],
  },
  {
    slug: 'configurable-integration-platform',
    title: 'Configurable integration platform',
    eyebrow: 'Systems engineering',
    status: 'Private engineering project',
    summary: 'Reusable connectors and observable scheduled data flows that replace brittle one-off integrations.',
    problem: 'Point-to-point integrations become difficult to maintain when every source, mapping, validation rule, and schedule is encoded differently.',
    role: 'Backend design and implementation',
    stack: ['Spring Boot', 'SQL', 'REST integrations', 'Scheduling', 'Validation'],
    sections: [
      { title: 'Connector model', body: 'Reusable source and destination connectors expose metadata so mappings can be configured instead of hard-coded.' },
      { title: 'Flow', body: 'Records move through extraction, transformation, validation, and destination delivery as explicit workflow stages.' },
      { title: 'Operations', body: 'Scheduled execution includes retries, run history, monitoring, and overlap prevention to keep failures visible and bounded.' },
      { title: 'Tradeoffs', body: 'Configuration adds flexibility, but every option increases validation needs. The design keeps mappings constrained and execution history inspectable.' },
    ],
  },
  {
    slug: 'secure-mdm-control-plane',
    title: 'Secure MDM agent & control plane',
    eyebrow: 'Engineering project',
    status: 'In progress',
    summary: 'A Rust device agent and Spring Boot control plane for secure enrollment, inventory, and device commands.',
    problem: 'Managed devices need a trustworthy identity, auditable commands, and resilient communication across unreliable network boundaries.',
    role: 'Agent and control-plane engineering',
    stack: ['Rust', 'Java', 'Spring Boot', 'Security', 'Device lifecycle'],
    sections: [
      { title: 'Enrollment', body: 'Single-use enrollment tokens use expiry and digest storage so raw credentials do not need to be retained.' },
      { title: 'Lifecycle', body: 'The implemented direction covers device records, heartbeats, inventory collection, and audit trails.' },
      { title: 'Commands', body: 'Signed commands and idempotent handling are designed to make retries safe and command provenance verifiable.' },
      { title: 'Current boundary', body: 'This project remains in progress. Phase 2 operational capabilities are planned and are not presented as completed functionality.' },
    ],
  },
  {
    slug: 'studio-application',
    title: 'Studio Application',
    eyebrow: 'Full Stack / Image Processing',
    status: 'Application project',
    summary: 'An image-processing application combining a React frontend with a Spring Boot backend and MySQL, packaged through an integrated Maven build.',
    problem: 'The frontend and backend needed an integrated production structure with one repeatable build and application package.',
    role: 'Full stack integration and build packaging',
    stack: ['React', 'Spring Boot', 'MySQL', 'Java', 'Maven'],
    sections: [
      { title: 'Application integration', body: 'Integrated the React frontend with the Spring Boot backend as one application structure.' },
      { title: 'Static delivery', body: 'Integrated the React production build into Spring Boot static resources.' },
      { title: 'Build automation', body: 'Configured Maven to build the frontend and package the complete application.' },
      { title: 'Case-study focus', body: 'This case study covers the integrated frontend and backend structure, build automation, and application packaging.' },
    ],
  },
  {
    slug: 'india-one-charger',
    title: 'India One Charger',
    eyebrow: 'Backend / Mobile / Data Integration',
    status: 'Application project',
    summary: 'An application using a Spring Boot backend, PostgreSQL and MongoDB, with a React Native mobile frontend. My work included database integration, metadata APIs, synchronization, and data-processing workflows.',
    problem: 'Configurable data integrations require reliable metadata discovery, synchronization, migrations, and processing across database systems.',
    role: 'Backend and data integration',
    stack: ['Spring Boot', 'PostgreSQL', 'MongoDB', 'React Native'],
    sections: [
      { title: 'Integration modules', body: 'Developed configurable database integration modules and metadata discovery APIs.' },
      { title: 'Synchronization', body: 'Implemented database synchronization and SQL query optimization.' },
      { title: 'Data processing', body: 'Supported database migrations and automated data-processing workflows.' },
      { title: 'Case-study focus', body: 'The work presented here is limited to verified backend, mobile, and data-integration contributions.' },
    ],
  },
  {
    slug: 'syed-bawkher',
    title: 'SYED BAWKHER',
    eyebrow: 'Business Application / Fabric Label Printing',
    status: 'Business application',
    summary: 'A fabric QR-label printing interface for a coat and suit clothing business, displaying fabric code, optional brand details, and store branding in a configurable print layout.',
    problem: 'Fabric labels need a print-friendly layout that presents supplied product details consistently at configurable physical dimensions.',
    role: 'Frontend component development',
    stack: ['React', 'TypeScript', 'react-to-print'],
    sections: [
      { title: 'Printing component', body: 'Developed a reusable fabric QR-label printing component.' },
      { title: 'Label content', body: 'Displayed the fabric code, supplied QR image, optional brand name, and store branding.' },
      { title: 'Print layout', body: 'Added configurable print dimensions and layout for print-friendly output.' },
      { title: 'Case-study focus', body: 'The component accepts a supplied QR image URL; this case study does not claim QR generation or backend functionality.' },
    ],
  },
];

export const principles = [
  ['API contracts', 'Small, explicit contracts with predictable validation and useful failure responses.'],
  ['Security by boundary', 'Authentication, authorization, input limits, and auditability designed into each layer.'],
  ['Data that holds up', 'Schemas and queries shaped for correctness first, then measured and optimized.'],
  ['Tests with purpose', 'Coverage focused on business rules, access boundaries, persistence, and critical user paths.'],
  ['Maintainable delivery', 'Readable code, observable behavior, and repeatable builds that reduce release uncertainty.'],
];
