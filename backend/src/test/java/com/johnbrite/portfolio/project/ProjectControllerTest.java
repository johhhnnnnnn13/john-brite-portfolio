package com.johnbrite.portfolio.project;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.johnbrite.portfolio.common.ApiExceptionHandler;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(ProjectController.class)
@Import(ApiExceptionHandler.class)
class ProjectControllerTest {
    @Autowired MockMvc mvc;
    @MockitoBean JdbcClient jdbc;

    @SuppressWarnings({"rawtypes", "unchecked"})
    @Test void returns404ForMissingOrUnpublishedProject() throws Exception {
        JdbcClient.StatementSpec spec = org.mockito.Mockito.mock(JdbcClient.StatementSpec.class);
        JdbcClient.MappedQuerySpec query = org.mockito.Mockito.mock(JdbcClient.MappedQuerySpec.class);
        when(jdbc.sql(any(String.class))).thenReturn(spec);
        when(spec.param(anyString(), any())).thenReturn(spec);
        when(spec.query(ProjectSummary.class)).thenReturn(query);
        when(query.optional()).thenReturn(Optional.empty());
        mvc.perform(get("/api/v1/projects/private-project"))
            .andExpect(status().isNotFound()).andExpect(jsonPath("$.code").value("NOT_FOUND"));
    }

    private static String anyString() { return org.mockito.ArgumentMatchers.anyString(); }
}
