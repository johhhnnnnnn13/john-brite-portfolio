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
  { name: 'Data', index: '03', skills: ['PostgreSQL', 'SQL Server', 'MongoDB', 'Schema design', 'Stored procedures', 'Indexing', 'Migrations'] },
  { name: 'Delivery', index: '04', skills: ['Azure DevOps', 'Azure Pipelines', 'CI/CD', 'Git', 'Pull requests', 'Build automation'] },
  { name: 'Tools', index: '05', skills: ['Postman', 'OpenAPI', 'IntelliJ IDEA', 'VS Code', 'SSMS'] },
  { name: 'Additional', index: '06', skills: ['Rust device agents', 'Enrollment flows', 'Command validation'] },
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
];

export const principles = [
  ['API contracts', 'Small, explicit contracts with predictable validation and useful failure responses.'],
  ['Security by boundary', 'Authentication, authorization, input limits, and auditability designed into each layer.'],
  ['Data that holds up', 'Schemas and queries shaped for correctness first, then measured and optimized.'],
  ['Tests with purpose', 'Coverage focused on business rules, access boundaries, persistence, and critical user paths.'],
  ['Maintainable delivery', 'Readable code, observable behavior, and repeatable builds that reduce release uncertainty.'],
];
