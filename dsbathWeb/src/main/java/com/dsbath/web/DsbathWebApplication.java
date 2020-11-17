package com.dsbath.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class DsbathWebApplication {

	public static void main(String[] args) {
		SpringApplication.run(DsbathWebApplication.class, args);
	}

	protected SpringApplicationBuilder configure (SpringApplicationBuilder builder) { 
		return builder.sources(DsbathWebApplication.class); 
	}
}
