package com.dsbath.web.model.service;

import java.util.Map;

import com.dsbath.web.model.Member;

/**
 * 사용자 정보 Service
 * 
 * @author idaesan
 *
 */
public interface MemberService {

	/**
	 * 사용자 아이디 중복 확인
	 * 
	 * @param member
	 * @return
	 */
	public Map<String, Object> selectOfIdCheck(Member member);
	
	/**
	 * 사용자 정보 등록, 수정, 삭제
	 * 
	 * @param member
	 * @param type
	 * @return
	 */
	public Map<String, Object> merge(Member member, String type);
	
}
