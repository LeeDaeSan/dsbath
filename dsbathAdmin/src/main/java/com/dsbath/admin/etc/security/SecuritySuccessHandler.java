package com.dsbath.admin.etc.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.dsbath.admin.etc.constant.Constant;
import com.dsbath.admin.model.Admin;
import com.dsbath.admin.model.service.AdminService;

/**
 * Security Success Handler
 * 
 * @author idaesan
 *
 */
@Configuration
public class SecuritySuccessHandler implements AuthenticationSuccessHandler {

	@Autowired
	private AdminService adminService;
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest req, HttpServletResponse res, Authentication auth)
			throws IOException, ServletException {

		String username = req.getParameter("username");
		String password = new BCryptPasswordEncoder().encode(req.getParameter("password"));
		System.out.println(username);
		System.out.println(password);
		Admin admin = new Admin();
		admin.setAdminId(username);
		admin.setPassword(password);
		
		// 비밀번호 업데이트
		adminService.updateOfPassword(admin);
		
		res.setStatus(HttpServletResponse.SC_OK);
		res.sendRedirect("/" + Constant.VIEWS + "/" + Constant.INDEX_PAGE);
	}
	
}
