package com.dsbath.web.etc.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.header.writers.StaticHeadersWriter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.dsbath.web.etc.constant.Constant;
import com.dsbath.web.etc.security.CustomUserDetailsService;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private CustomUserDetailsService customUserDetailsService;
	
	@Autowired
	private AuthenticationSuccessHandler authenticationSuccessHandler;
	
	@Autowired
	private AuthenticationFailureHandler authenticationFailureHandler;
	
	/**
	 * 시큐리티 암호화 로그인 설정
	 * 
	 */
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(customUserDetailsService).passwordEncoder(new BCryptPasswordEncoder());
	}
	
	/**
	 * 시큐리티 제외 경로 설정
	 */
	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers(
				"/images/**",
				"/lib/**",
				"/css/**",
				"/js/**",
				"/webjars/**");
	}
	
	/**
	 * 시큐리티 로그인, 로그아웃 접근권한 설정
	 * 
	 */
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		// 로그인 disabled 처리
		http.cors().and();
		http.csrf().disable();
		
		// ifram 사용으로 인해 X-Frame-Option 설정
		http.headers().frameOptions().disable();
		
		// 접근권한 설정
		http.authorizeRequests()
			//.antMatchers( "/" + Constant.LOGIN_PAGE).permitAll()
			.antMatchers("/**").permitAll()
			.anyRequest()
			.authenticated();
		
		// 로그인 설정	
		http.formLogin()
			.loginPage("/" + Constant.LOGIN_PAGE)
			.successHandler(authenticationSuccessHandler)
			.failureHandler(authenticationFailureHandler)
			.permitAll()
			
		// 로그아웃 설정
			.and()
			.logout()
			.logoutRequestMatcher(new AntPathRequestMatcher("/" + Constant.LOGOUT_PAGE))
			.permitAll()
			.logoutSuccessUrl("/" + Constant.VIEWS + "/" + Constant.LOGIN_PAGE)
			.invalidateHttpSession(true);
		
	}
}
