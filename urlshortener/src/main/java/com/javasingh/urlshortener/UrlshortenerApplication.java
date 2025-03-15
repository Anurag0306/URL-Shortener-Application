package com.javasingh.urlshortener;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class UrlshortenerApplication {
    public static void main(String[] args) {
        // Load environment variables from .env.prod file
        Dotenv dotenv = Dotenv.configure()
            .directory("urlshortener") // Path to .env.prod
            .filename(".env.prod")  // Ensure the filename starts with a dot (.)
            .ignoreIfMalformed()  // Ignore errors in env file
            .ignoreIfMissing()  // Prevent app from crashing if file is missing
            .load();
        
        // Set environment variables for Spring Boot
        dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));

        // Debugging: Print loaded values to verify
        // System.out.println("Database URL: " + System.getenv("DATABASE_URL"));
        // System.out.println("JWT Secret: " + System.getenv("JWT_SECRET"));

        SpringApplication.run(UrlshortenerApplication.class, args);
    }
}
