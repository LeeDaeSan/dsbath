package com.dsbath.admin.etc.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		String password = new BCryptPasswordEncoder().encode("1111");
		
		// 권한 부여
		List<String> roles = new ArrayList<String>();
		roles.add("ADMIN");
		
		User user = new SecurityUser(
				username,
				password,
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
