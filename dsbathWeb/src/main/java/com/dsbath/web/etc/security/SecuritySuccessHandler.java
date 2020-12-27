package com.dsbath.web.etc.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.dsbath.web.etc.constant.Constant;

/**
 * Security Success Handler
 * 
 * @author idaesan
 *
 */
@Configuration
public class SecuritySuccessHandler implements AuthenticationSuccessHandler {

	@Override
	public void onAuthenticationSuccess(HttpServletRequest req, HttpServletResponse res, Authentication auth)
			throws IOException, ServletException {
		
		/*
		String username = req.getParameter("username");
		String password = new BCryptPasswordEncoder().encode(req.getParameter("password"));

		Admin admin = new Admin();
		admin.setAdminId(username);
		admin.setPassword(password);
		
		// 비밀번호 업데이트
		adminService.updateOfPassword(admin);
		*/
		res.setStatus(HttpServletResponse.SC_OK);
		res.sendRedirect("/" + Constant.VIEWS + "/" + Constant.INDEX_PAGE);
	}
	
}
