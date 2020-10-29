package com.dsbath.admin.etc.security;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.dsbath.admin.etc.util.StringUtil;
import com.dsbath.admin.model.Admin;
import com.dsbath.admin.model.service.AdminService;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private AdminService adminService;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Admin admin = new Admin();
		admin.setAdminId(username);
		
		admin = adminService.select(admin);

		if (StringUtil.isEmpty(admin)) {
			return null;
		}
		
		// 권한 부여
		List<String> roles = new ArrayList<String>();
		roles.add("ADMIN");
		
		User user = new SecurityUser(
				username,
				admin.getPassword(),
				1,
				"test",
				true,
				true,
				true,
				true,
				makeGrantedAuthority(roles));
		
		return user;
	}
	
	/**
	 * 권한 부여
	 * 
	 * @param roles
	 * @return
	 */
	private static List<GrantedAuthority> makeGrantedAuthority (List<String> roles) {
		List<GrantedAuthority> list = new ArrayList<GrantedAuthority>();
		
		roles.forEach(
			role -> 
				list.add(new SimpleGrantedAuthority(role)));
		
		return list;
	}
}
