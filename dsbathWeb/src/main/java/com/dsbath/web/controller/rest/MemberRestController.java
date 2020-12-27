package com.dsbath.web.controller.rest;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dsbath.web.model.Member;
import com.dsbath.web.model.service.MemberService;

/**
 * 사용자 정보 Rest Controller
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
	 * 사용자 아이디 중복 확인
	 * 
	 * @param member
	 * @return
	 */
	@PostMapping("/idCheck")
	public Map<String, Object> selectOfIdCheck (Member member) {
		return memberService.selectOfIdCheck(member);
	}
	
	/**
	 * 사용자 정보 Merge (등록, 수정, 삭제)
	 * 
	 * @param member
	 * @param type
	 * @return
	 */
	@PostMapping("/merge")
	public Map<String, Object> merge (Member member, @RequestParam(value = "type") String type) {
		return memberService.merge(member, type);
	}

}
