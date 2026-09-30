package com.johnbrite.portfolio.profile;

import java.util.Map;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/profile")
public class ProfileController {
    private final JdbcClient jdbc;
    public ProfileController(JdbcClient jdbc) { this.jdbc = jdbc; }

    @GetMapping
    Map<String, Object> profile() {
        return jdbc.sql("select name, headline, biography, location, email, resume_url as \"resumeUrl\", github_url as \"githubUrl\", linkedin_url as \"linkedinUrl\" from portfolio_profile where published = true limit 1")
            .query().singleRow();
    }
}
