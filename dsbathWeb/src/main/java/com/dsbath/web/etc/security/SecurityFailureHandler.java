package com.dsbath.web.etc.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import com.dsbath.web.etc.constant.Constant;

/**
 * Security failure handler
 * @author idaesan
 *
 */
@Configuration
public class SecurityFailureHandler implements AuthenticationFailureHandler {

	@Override
	public void onAuthenticationFailure(HttpServletRequest req, HttpServletResponse res, AuthenticationException auth)
			throws IOException, ServletException {
		
		res.sendRedirect(Constant.NOTILES + "/" + Constant.LOGIN_PAGE);
	}
}
