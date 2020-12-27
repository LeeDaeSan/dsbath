package com.dsbath.web.model.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.dsbath.web.etc.constant.Constant;
import com.dsbath.web.etc.util.ResponseUtil;
import com.dsbath.web.etc.util.StringUtil;
import com.dsbath.web.model.Member;
import com.dsbath.web.model.mapper.MemberMapper;
import com.dsbath.web.model.service.MemberService;

@Service
public class MemberServiceImpl implements MemberService {
	
	@Autowired
	private MemberMapper memberMapper;
	
	/**
	 * 사용자 아이디 중복 확인
	 * 
	 */
	@Override
	public Map<String, Object> selectOfIdCheck(Member member) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			resultMap.put("isSamed", StringUtil.isNotEmpty(memberMapper.selectOfIdCheck(member)) ? "1" : "0");
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
		}
		
		return resultMap;
	}
	
	/**
	 * 사용자 정보 등록, 수정, 삭제
	 * 
	 */
	@Override
	public Map<String, Object> merge(Member member, String type) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			Integer resultCount = 0;
		
			// 등록, 수정일 때, 비밀번호 암호화
			if (Constant.MERGE_TYPE_INSERT.equals(type) || Constant.MERGE_TYPE_UPDATE.equals(type)) {
				String password = member.getPassword();
				
				// 비밀번호가 있을 때에만 암호화 (null, 공백 암호화 방지)
				if (StringUtil.isNotEmpty(password)) {
					member.setPassword(new BCryptPasswordEncoder().encode(password));
				}
			}
			
			// >> 등록
			if (Constant.MERGE_TYPE_INSERT.equals(type)) {
				resultCount = memberMapper.insert(member);
				
			// >> 수정
			} else if (Constant.MERGE_TYPE_UPDATE.equals(type)) {
				
				
			// >> 삭제
			} else if (Constant.MERGE_TYPE_DELETE.equals(type)) {
				
			}
			
			resultMap.put("resultCount", resultCount);
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
			e.printStackTrace();
		}
		
		return resultMap;
	}

}
