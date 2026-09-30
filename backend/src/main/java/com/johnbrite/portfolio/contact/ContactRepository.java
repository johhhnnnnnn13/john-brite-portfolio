package com.johnbrite.portfolio.contact;

import org.springframework.data.jpa.repository.JpaRepository;

interface ContactRepository extends JpaRepository<ContactMessage, Long> {}
