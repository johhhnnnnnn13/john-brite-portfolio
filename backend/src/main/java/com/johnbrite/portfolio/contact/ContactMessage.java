package com.johnbrite.portfolio.contact;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;

@Entity
@Table(name = "contact_message")
public class ContactMessage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 100) private String name;
    @Column(nullable = false, length = 254) private String email;
    @Column(nullable = false, length = 150) private String subject;
    @Column(nullable = false, length = 3000) private String message;
    @Column(nullable = false) private Instant createdAt;
    @Column(nullable = false) private Instant expiresAt;

    protected ContactMessage() {}
    ContactMessage(String name, String email, String subject, String message, Instant createdAt, Instant expiresAt) {
        this.name = name; this.email = email; this.subject = subject; this.message = message; this.createdAt = createdAt; this.expiresAt = expiresAt;
    }
}
