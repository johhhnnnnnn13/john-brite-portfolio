create table portfolio_profile (
    id bigserial primary key,
    name varchar(100) not null,
    headline varchar(160) not null,
    biography text not null,
    location varchar(160) not null,
    email varchar(254) not null,
    resume_url varchar(500),
    github_url varchar(500),
    linkedin_url varchar(500),
    phone varchar(40),
    show_phone boolean not null default false,
    published boolean not null default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table skill_category (
    id bigserial primary key,
    name varchar(100) not null unique,
    display_order integer not null
);

create table skill (
    id bigserial primary key,
    category_id bigint not null references skill_category(id),
    name varchar(100) not null,
    context varchar(300),
    display_order integer not null,
    published boolean not null default true,
    unique(category_id, name)
);

create table experience (
    id bigserial primary key,
    employer varchar(180) not null,
    title varchar(160) not null,
    location varchar(160),
    start_date date not null,
    end_date date,
    summary text not null,
    display_order integer not null,
    published boolean not null default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table project (
    id bigserial primary key,
    slug varchar(180) not null unique,
    title varchar(180) not null,
    eyebrow varchar(120) not null,
    status varchar(120) not null,
    summary text not null,
    problem text not null,
    role varchar(160) not null,
    display_order integer not null,
    published boolean not null default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table project_skill (
    project_id bigint not null references project(id) on delete cascade,
    skill_id bigint not null references skill(id),
    primary key(project_id, skill_id)
);

create table project_section (
    id bigserial primary key,
    project_id bigint not null references project(id) on delete cascade,
    title varchar(180) not null,
    body text not null,
    display_order integer not null,
    unique(project_id, display_order)
);

create table contact_message (
    id bigserial primary key,
    name varchar(100) not null,
    email varchar(254) not null,
    subject varchar(150) not null,
    message varchar(3000) not null,
    created_at timestamptz not null default now(),
    expires_at timestamptz not null
);

create index idx_project_published_order on project(published, display_order);
create index idx_experience_published_start on experience(published, start_date desc);
create index idx_contact_message_expires on contact_message(expires_at);
