package com.dsbath.admin.etc.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

public class SecurityUser extends User {
	private static final Long serialVersionUID = 1L;
	
	private Integer idx;
	private String id;
	private String password;
	private String name;
	
	public SecurityUser (
			String username,
			String password,
			Integer idx,
			String name,
			Collection<? extends GrantedAuthority> authorities) {
		
		this(username, password, idx, name, true, true, true, true, authorities);
	}
	
	public SecurityUser (
			String username,
			String password,
			Integer idx,
			String name,
			boolean enabled,
			boolean accountNonExpired,
			boolean credentialsNonExpired,
			boolean accountNonLocked,
			Collection<? extends GrantedAuthority> authorities) {
		super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
		
		this.id 		= username;
		this.password 	= password;
		this.idx 		= idx;
		this.name 		= name;
		
	}

	public Integer getIdx() {
		return idx;
	}

	public void setIdx(Integer idx) {
		this.idx = idx;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
	
}
