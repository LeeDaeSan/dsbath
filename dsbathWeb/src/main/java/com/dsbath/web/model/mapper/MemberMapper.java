package com.dsbath.web.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.dsbath.web.model.Member;

/**
 * 사용자 정보 Mapper
 * 
 * @author idaesan
 *
 */
@Mapper
public interface MemberMapper {

	/**
	 * 사용자 아이디 중복확인
	 * 
	 * @param member
	 * @return
	 */
	public Member selectOfIdCheck(Member member);
	
	/**
	 * 사용자 정보 등록
	 * 
	 * @param member
	 * @return
	 */
	public Integer insert(Member member);
	
	/**
	 * 사용자 로그인 확인
	 * 
	 * @param member
	 * @return
	 */
	public Member selectOfLogin(Member member);
}
