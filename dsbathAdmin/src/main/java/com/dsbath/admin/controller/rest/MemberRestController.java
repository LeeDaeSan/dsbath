package com.dsbath.admin.controller.rest;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dsbath.admin.model.Member;
import com.dsbath.admin.model.dto.PagingDTO;
import com.dsbath.admin.model.service.MemberService;

/**
 * 사용자 정보 Controller
 * 
 * @author idaesan
 *
 */
@RestController
@RequestMapping("/member/rest")
public class MemberRestController {

	@Autowired
	private MemberService memberService;
	
	/**
	 * 사용자 정보 목록 조회
	 * 
	 * @param pagingDTO
	 * @param member
	 * @return
	 */
	@PostMapping("/list")
	public Map<String, Object> select (PagingDTO<Member> pagingDTO, Member member) {
		pagingDTO.setModel(member);
		return memberService.select(pagingDTO);
	}
	
	/**
	 * 사용자 정보 등록, 수정, 삭제
	 * 
	 * @param member
	 * @param type
	 * @return
	 */
	@PostMapping("/merge")
	public Map<String, Object> merge (Member member, @RequestParam(value = "type") String type) {
		return memberService.merge(member, type);
	}
	
	/**
	 * 사용자 아이디 중복확인
	 * 
	 * @param member
	 * @return
	 */
	@PostMapping("/memberIdChecked")
	public Map<String, Object> memberIdChecked (Member member) {
		return memberService.memberIdChecked(member);
	}
}
