package com.johnbrite.portfolio.project;

import com.johnbrite.portfolio.common.NotFoundException;
import java.util.List;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/projects")
public class ProjectController {
    private final JdbcClient jdbc;
    public ProjectController(JdbcClient jdbc) { this.jdbc = jdbc; }

    @GetMapping
    List<ProjectSummary> projects() {
        return jdbc.sql("select id, slug, title, eyebrow, status, summary, problem, role from project where published=true order by display_order")
            .query(ProjectSummary.class).list();
    }

    @GetMapping("/{slug}")
    ProjectDetail project(@PathVariable String slug) {
        var project = jdbc.sql("select id, slug, title, eyebrow, status, summary, problem, role from project where slug=:slug and published=true")
            .param("slug", slug).query(ProjectSummary.class).optional()
            .orElseThrow(() -> new NotFoundException("Project not found."));
        var stack = jdbc.sql("select s.name from skill s join project_skill ps on ps.skill_id=s.id where ps.project_id=:id order by s.name")
            .param("id", project.id()).query(String.class).list();
        var sections = jdbc.sql("select title, body from project_section where project_id=:id order by display_order")
            .param("id", project.id()).query(ProjectSection.class).list();
        return new ProjectDetail(project.slug(), project.title(), project.eyebrow(), project.status(), project.summary(), project.problem(), project.role(), stack, sections);
    }
}

record ProjectSummary(long id, String slug, String title, String eyebrow, String status, String summary, String problem, String role) {}
record ProjectSection(String title, String body) {}
record ProjectDetail(String slug, String title, String eyebrow, String status, String summary, String problem, String role, List<String> stack, List<ProjectSection> sections) {}
