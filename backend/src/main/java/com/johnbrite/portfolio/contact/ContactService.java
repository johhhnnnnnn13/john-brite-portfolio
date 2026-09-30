package com.johnbrite.portfolio.contact;

import com.johnbrite.portfolio.common.RateLimitException;
import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ContactService {
    private final ContactRepository repository;
    private final Duration rateWindow;
    private final Duration retention;
    private final Clock clock;
    private final ConcurrentHashMap<String, Instant> recent = new ConcurrentHashMap<>();

    ContactService(ContactRepository repository,
                   @Value("${portfolio.contact.rate-window:PT1M}") Duration rateWindow,
                   @Value("${portfolio.contact.retention:P180D}") Duration retention) {
        this(repository, rateWindow, retention, Clock.systemUTC());
    }

    ContactService(ContactRepository repository, Duration rateWindow, Duration retention, Clock clock) {
        this.repository = repository; this.rateWindow = rateWindow; this.retention = retention; this.clock = clock;
    }

    @Transactional
    void accept(ContactRequest request, String clientKey) {
        if (!request.website().isBlank()) return;
        Instant now = clock.instant();
        recent.compute(clientKey, (key, previous) -> {
            if (previous != null && previous.plus(rateWindow).isAfter(now)) throw new RateLimitException();
            return now;
        });
        repository.save(new ContactMessage(request.name().strip(), request.email().strip().toLowerCase(), request.subject().strip(), request.message().strip(), now, now.plus(retention)));
    }
}
