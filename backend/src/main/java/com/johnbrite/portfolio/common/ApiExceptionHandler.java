package com.johnbrite.portfolio.common;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<ApiError> validation(MethodArgumentNotValidException exception) {
        Map<String, String> fields = new LinkedHashMap<>();
        for (FieldError error : exception.getBindingResult().getFieldErrors()) {
            fields.putIfAbsent(error.getField(), error.getDefaultMessage());
        }
        return ResponseEntity.badRequest().body(new ApiError("VALIDATION_FAILED", "Check the highlighted fields.", fields, Instant.now()));
    }

    @ExceptionHandler(NotFoundException.class)
    ResponseEntity<ApiError> notFound(NotFoundException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiError("NOT_FOUND", exception.getMessage(), Map.of(), Instant.now()));
    }

    @ExceptionHandler(RateLimitException.class)
    ResponseEntity<ApiError> rateLimit() {
        return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(new ApiError("RATE_LIMITED", "Please wait before sending another message.", Map.of(), Instant.now()));
    }

    public record ApiError(String code, String message, Map<String, String> fields, Instant timestamp) {}
}
