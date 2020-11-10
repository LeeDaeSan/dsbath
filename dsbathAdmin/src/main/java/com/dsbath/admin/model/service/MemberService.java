package com.dsbath.admin.model.service;

import java.util.Map;

import com.dsbath.admin.model.Member;
import com.dsbath.admin.model.dto.PagingDTO;

/**
 * 사용자 정보 Service
 * 
 * @author idaesan
 *
 */
public interface MemberService {

	/**
	 * 사용자 정보 목록 조회
	 * 
	 * @param pagingDTO
	 * @return
	 */
	public Map<String, Object> select(PagingDTO<Member> pagingDTO);
	
	/**
	 * 사용자 정보 등록, 수정, 삭제
	 * 
	 * @param member
	 * @param type
	 * @return
	 */
	public Map<String, Object> merge(Member member, String type);
	
	/**
	 * 사용자 아이디 중복확인
	 * 
	 * @param member
	 * @return
	 */
	public Map<String, Object> memberIdChecked(Member member);
}
