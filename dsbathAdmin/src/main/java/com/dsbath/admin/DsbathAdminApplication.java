package com.dsbath.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class DsbathAdminApplication {

	public static void main(String[] args) {
		SpringApplication.run(DsbathAdminApplication.class, args);
	}

	protected SpringApplicationBuilder configure (SpringApplicationBuilder builder) { 
		return builder.sources(DsbathAdminApplication.class); 
	}
}
