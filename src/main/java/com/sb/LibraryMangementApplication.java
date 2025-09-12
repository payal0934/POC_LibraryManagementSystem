package com.sb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.sb.EntityManager.UserEntity;
import com.sb.repository.BookRepository;
import com.sb.repository.UserRepository;

@SpringBootApplication
public class LibraryMangementApplication {
    public static void main(String[] args) {
        SpringApplication.run(LibraryMangementApplication.class, args);
        System.out.println("library management started");
    }
}
