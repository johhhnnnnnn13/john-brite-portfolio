insert into skill_category(name, display_order) values ('Mobile', 3)
on conflict (name) do update set display_order = excluded.display_order;

update skill_category set display_order = case name
    when 'Backend' then 1
    when 'Frontend' then 2
    when 'Mobile' then 3
    when 'Data' then 4
    when 'Delivery' then 5
    when 'Tools' then 6
    when 'Additional project work' then 7
    else display_order
end;

insert into skill(category_id, name, context, display_order, published)
select c.id, v.name, v.context, v.ord, true
from skill_category c
join (values
    ('Mobile', 'React Native', 'Mobile application frontend', 1),
    ('Data', 'MySQL', 'Application data storage', 4),
    ('Frontend', 'react-to-print', 'Print-friendly React components', 4)
) as v(category, name, context, ord) on c.name = v.category
on conflict (category_id, name) do update set
    context = excluded.context,
    display_order = excluded.display_order,
    published = excluded.published;

insert into project(slug, title, eyebrow, status, summary, problem, role, display_order, published) values
(
    'studio-application',
    'Studio Application',
    'Full Stack / Image Processing',
    'Application project',
    'An image-processing application combining a React frontend with a Spring Boot backend and MySQL, packaged through an integrated Maven build.',
    'The frontend and backend needed an integrated production structure with one repeatable build and application package.',
    'Full stack integration and build packaging',
    4,
    true
),
(
    'india-one-charger',
    'India One Charger',
    'Backend / Mobile / Data Integration',
    'Application project',
    'An application using a Spring Boot backend, PostgreSQL and MongoDB, with a React Native mobile frontend. My work included database integration, metadata APIs, synchronization, and data-processing workflows.',
    'Configurable data integrations require reliable metadata discovery, synchronization, migrations, and processing across database systems.',
    'Backend and data integration',
    5,
    true
),
(
    'syed-bawkher',
    'SYED BAWKHER',
    'Business Application / Fabric Label Printing',
    'Business application',
    'A fabric QR-label printing interface for a coat and suit clothing business, displaying fabric code, optional brand details, and store branding in a configurable print layout.',
    'Fabric labels need a print-friendly layout that presents supplied product details consistently at configurable physical dimensions.',
    'Frontend component development',
    6,
    true
)
on conflict (slug) do update set
    title = excluded.title,
    eyebrow = excluded.eyebrow,
    status = excluded.status,
    summary = excluded.summary,
    problem = excluded.problem,
    role = excluded.role,
    display_order = excluded.display_order,
    published = excluded.published,
    updated_at = now();

insert into project_section(project_id, title, body, display_order)
select p.id, v.title, v.body, v.ord
from project p
join (values
    ('studio-application', 'Application integration', 'Integrated the React frontend with the Spring Boot backend as one application structure.', 1),
    ('studio-application', 'Static delivery', 'Integrated the React production build into Spring Boot static resources.', 2),
    ('studio-application', 'Build automation', 'Configured Maven to build the frontend and package the complete application.', 3),
    ('studio-application', 'Case-study focus', 'This case study covers the integrated frontend and backend structure, build automation, and application packaging.', 4),
    ('india-one-charger', 'Integration modules', 'Developed configurable database integration modules and metadata discovery APIs.', 1),
    ('india-one-charger', 'Synchronization', 'Implemented database synchronization and SQL query optimization.', 2),
    ('india-one-charger', 'Data processing', 'Supported database migrations and automated data-processing workflows.', 3),
    ('india-one-charger', 'Case-study focus', 'The work presented here is limited to verified backend, mobile, and data-integration contributions.', 4),
    ('syed-bawkher', 'Printing component', 'Developed a reusable fabric QR-label printing component.', 1),
    ('syed-bawkher', 'Label content', 'Displayed the fabric code, supplied QR image, optional brand name, and store branding.', 2),
    ('syed-bawkher', 'Print layout', 'Added configurable print dimensions and layout for print-friendly output.', 3),
    ('syed-bawkher', 'Case-study focus', 'The component accepts a supplied QR image URL; this case study does not claim QR generation or backend functionality.', 4)
) as v(slug, title, body, ord) on p.slug = v.slug
on conflict (project_id, display_order) do update set
    title = excluded.title,
    body = excluded.body;

insert into project_skill(project_id, skill_id)
select distinct p.id, s.id
from project p
join skill s on
    (p.slug = 'studio-application' and s.name in ('React', 'Spring Boot', 'MySQL', 'Java', 'Maven')) or
    (p.slug = 'india-one-charger' and s.name in ('Spring Boot', 'PostgreSQL', 'MongoDB', 'React Native')) or
    (p.slug = 'syed-bawkher' and s.name in ('React', 'TypeScript', 'react-to-print'))
on conflict (project_id, skill_id) do nothing;
