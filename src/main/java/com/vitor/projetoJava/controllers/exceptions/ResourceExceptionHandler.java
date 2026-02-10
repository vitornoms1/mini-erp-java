package com.vitor.projetoJava.controllers.exceptions;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.Instant;

/**
 * Global exception handler that intercepts business logic errors.
 */
@ControllerAdvice // This annotation allows this class to handle exceptions across the whole app
public class ResourceExceptionHandler {

    @ExceptionHandler(RuntimeException.class) // Tells Spring to trigger this when a RuntimeException occurs
    public ResponseEntity<StandardError> stockError(RuntimeException e, HttpServletRequest request) {
        String error = "Business Logic Error";
        HttpStatus status = HttpStatus.BAD_REQUEST; // Code 400

        StandardError err = new StandardError();
        err.setTimestamp(Instant.now());
        err.setStatus(status.value());
        err.setError(error);
        err.setMessage(e.getMessage());
        err.setPath(request.getRequestURI());

        return ResponseEntity.status(status).body(err);
    }
}