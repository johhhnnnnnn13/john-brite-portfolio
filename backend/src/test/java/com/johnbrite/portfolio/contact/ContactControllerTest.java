package com.johnbrite.portfolio.contact;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.johnbrite.portfolio.common.ApiExceptionHandler;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(ContactController.class)
@Import(ApiExceptionHandler.class)
class ContactControllerTest {
    @Autowired MockMvc mvc;
    @MockitoBean ContactService service;

    @Test void acceptsValidContact() throws Exception {
        mvc.perform(post("/api/v1/contact").contentType(MediaType.APPLICATION_JSON)
            .content("{\"name\":\"Jane\",\"email\":\"jane@example.com\",\"subject\":\"Role\",\"message\":\"Hello John\",\"website\":\"\"}"))
            .andExpect(status().isAccepted()).andExpect(jsonPath("$.accepted").value(true));
        verify(service).accept(any(ContactRequest.class), anyString());
    }

    @Test void rejectsInvalidContact() throws Exception {
        mvc.perform(post("/api/v1/contact").contentType(MediaType.APPLICATION_JSON)
            .content("{\"name\":\"\",\"email\":\"not-an-email\",\"subject\":\"\",\"message\":\"\"}"))
            .andExpect(status().isBadRequest()).andExpect(jsonPath("$.code").value("VALIDATION_FAILED"));
    }
}
