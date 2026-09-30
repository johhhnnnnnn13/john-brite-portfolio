package com.johnbrite.portfolio.experience;

import java.util.List;
import java.util.Map;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/experience")
public class ExperienceController {
    private final JdbcClient jdbc;
    public ExperienceController(JdbcClient jdbc) { this.jdbc = jdbc; }

    @GetMapping
    List<Map<String, Object>> experience() {
        return jdbc.sql("select employer, title, location, start_date as \"startDate\", end_date as \"endDate\", summary from experience where published=true order by start_date desc")
            .query().listOfRows();
    }
}
