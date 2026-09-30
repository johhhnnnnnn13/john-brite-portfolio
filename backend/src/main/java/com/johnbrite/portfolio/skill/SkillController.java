package com.johnbrite.portfolio.skill;

import java.util.List;
import java.util.Map;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/skills")
public class SkillController {
    private final JdbcClient jdbc;
    public SkillController(JdbcClient jdbc) { this.jdbc = jdbc; }

    @GetMapping
    List<Map<String, Object>> skills() {
        return jdbc.sql("select c.name as category, s.name, s.context from skill s join skill_category c on c.id=s.category_id where s.published=true order by c.display_order,s.display_order")
            .query().listOfRows();
    }
}
