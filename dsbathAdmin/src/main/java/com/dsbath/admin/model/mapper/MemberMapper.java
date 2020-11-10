package com.dsbath.admin.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.dsbath.admin.model.Member;
import com.dsbath.admin.model.dto.PagingDTO;

/**
 * 회원 정보 Mapper
 * 
 * @author idaesan
 *
 */
@Mapper
public interface MemberMapper {

	/**
	 * 사용자 정보 목록 조회
	 * 
	 * @param pagingDTO
	 * @return
	 */
	public List<Member> select(PagingDTO<Member> pagingDTO);
	
	/**
	 * 사용자 정보 등록
	 * 
	 * @param member
	 * @return
	 */
	public Integer insert(Member member);
	
	/**
	 * 사용자 아이디 중복확인
	 * 
	 * @param member
	 * @return
	 */
	public Member memberIdChecked(Member member);
}
