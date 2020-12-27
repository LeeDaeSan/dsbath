package com.dsbath.web.etc.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.dsbath.web.etc.util.StringUtil;
import com.dsbath.web.model.Member;
import com.dsbath.web.model.mapper.MemberMapper;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private MemberMapper memberMapper;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Member member = new Member();
		
		member.setMemberId(username);
		
		member = memberMapper.selectOfLogin(member);
		
		// 조회된 아이디 없음
		if (StringUtil.isEmpty(member)) {
			return null;
		}
		
		// 권한 부여
		List<String> roles = new ArrayList<String>();
		roles.add("MEMBER");
		
		User user = new SecurityUser(
				member.getMemberId(),
				member.getPassword(),
				member.getMemberIdx(),
				member.getMemberName(),
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
