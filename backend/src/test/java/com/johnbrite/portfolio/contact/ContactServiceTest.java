package com.johnbrite.portfolio.contact;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

import com.johnbrite.portfolio.common.RateLimitException;
import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.time.ZoneOffset;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ContactServiceTest {
    @Mock ContactRepository repository;
    private ContactService service;

    @BeforeEach void setUp() {
        service = new ContactService(repository, Duration.ofMinutes(1), Duration.ofDays(180), Clock.fixed(Instant.parse("2026-09-30T12:00:00Z"), ZoneOffset.UTC));
    }

    @Test void persistsAcceptedMessage() {
        service.accept(request(""), "client-a");
        verify(repository).save(any(ContactMessage.class));
    }

    @Test void dropsHoneypotSubmission() {
        service.accept(request("https://spam.example"), "client-b");
        verify(repository, never()).save(any());
    }

    @Test void rateLimitsRepeatedClient() {
        service.accept(request(""), "client-c");
        assertThrows(RateLimitException.class, () -> service.accept(request(""), "client-c"));
    }

    private ContactRequest request(String website) {
        return new ContactRequest("Jane", "jane@example.com", "Role", "Hello John", website);
    }
}
