package com.vitor.projetoJava;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class ProjetoJavaApplication {
    public static void main(String[] args) {
        SpringApplication.run(ProjetoJavaApplication.class, args);
    }
}