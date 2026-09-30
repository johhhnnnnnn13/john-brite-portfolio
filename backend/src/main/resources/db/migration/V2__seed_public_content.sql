insert into portfolio_profile(name, headline, biography, location, email, published)
values ('John Brite', 'Java Full Stack Developer', 'Java full stack developer focused on dependable business systems: clear APIs, well-shaped data models, responsive interfaces, and repeatable delivery.', 'Chennai, Tamil Nadu, India', 'johnbrite99333@gmail.com', true);

insert into skill_category(name, display_order) values
('Backend', 1), ('Frontend', 2), ('Data', 3), ('Delivery', 4), ('Tools', 5), ('Additional project work', 6);

insert into skill(category_id, name, context, display_order)
select c.id, v.name, v.context, v.ord from skill_category c join (values
('Backend','Java','Primary backend language',1),('Backend','Spring Boot','REST services and business workflows',2),('Backend','Spring Security','API security',3),('Backend','Hibernate / JPA','Persistence',4),('Backend','Maven','Build automation',5),
('Frontend','React','Web interfaces',1),('Frontend','TypeScript','Typed frontend code',2),('Frontend','CSS3','Responsive layouts',3),
('Data','PostgreSQL','Portfolio production database',1),('Data','SQL Server','Enterprise project data',2),('Data','MongoDB','Additional database experience',3),
('Delivery','Azure Pipelines','CI/CD automation',1),('Delivery','Git','Branch and pull request workflows',2),
('Tools','Postman','API verification',1),('Tools','OpenAPI','API documentation',2),
('Additional project work','Rust','Device agent development',1)
) as v(category,name,context,ord) on c.name=v.category;

insert into project(slug,title,eyebrow,status,summary,problem,role,display_order,published) values
('enterprise-construction-platform','Enterprise construction management','Professional contribution','Private enterprise product','Permission-aware project workflows, configurable data, and independently manageable cost records.','Enterprise project teams need flexible fields and powerful filters without weakening permissions or coupling budget and contract workflows.','Backend and integration contributor',1,true),
('configurable-integration-platform','Configurable integration platform','Systems engineering','Private engineering project','Reusable connectors and observable scheduled data flows that replace brittle one-off integrations.','Point-to-point integrations become difficult to maintain when every source, mapping, validation rule, and schedule is encoded differently.','Backend design and implementation',2,true),
('secure-mdm-control-plane','Secure MDM agent & control plane','Engineering project','In progress','A Rust device agent and Spring Boot control plane for secure enrollment, inventory, and device commands.','Managed devices need a trustworthy identity, auditable commands, and resilient communication across unreliable network boundaries.','Agent and control-plane engineering',3,true);

insert into project_section(project_id,title,body,display_order)
select p.id, v.title, v.body, v.ord from project p join (values
('enterprise-construction-platform','What I worked on','Project search and filtering APIs, custom fields, permission-aware access, change management, and project team mapping workflows.',1),
('enterprise-construction-platform','Data design','Separated budget and contract data through migrations and independent pagination.',2),
('configurable-integration-platform','Connector model','Reusable source and destination connectors expose metadata so mappings can be configured instead of hard-coded.',1),
('configurable-integration-platform','Operations','Scheduled execution includes retries, run history, monitoring, and overlap prevention.',2),
('secure-mdm-control-plane','Enrollment','Single-use enrollment tokens use expiry and digest storage so raw credentials do not need to be retained.',1),
('secure-mdm-control-plane','Current boundary','This project remains in progress. Phase 2 capabilities are planned and are not represented as complete.',2)
) as v(slug,title,body,ord) on p.slug=v.slug;

insert into project_skill(project_id, skill_id)
select p.id, s.id from project p join skill s on
 (p.slug='enterprise-construction-platform' and s.name in ('Java','Spring Boot','SQL Server','Hibernate / JPA')) or
 (p.slug='configurable-integration-platform' and s.name in ('Java','Spring Boot','PostgreSQL')) or
 (p.slug='secure-mdm-control-plane' and s.name in ('Rust','Java','Spring Boot'));
