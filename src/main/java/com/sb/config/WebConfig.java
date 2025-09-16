package com.sb.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	
	
	
	 @Override
	    public void addResourceHandlers(ResourceHandlerRegistry registry) {
	        // 🔹 Make sure the pattern ends with /**
	        // 🔹 The location must end with / to serve directory contents
	        registry.addResourceHandler("/Uploads/Images/**")
	                .addResourceLocations("file:Uploads/Images/");
	    }

}
