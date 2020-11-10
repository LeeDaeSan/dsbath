package com.dsbath.admin.model.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.dsbath.admin.etc.constant.Constant;
import com.dsbath.admin.etc.util.ResponseUtil;
import com.dsbath.admin.etc.util.StringUtil;
import com.dsbath.admin.model.Member;
import com.dsbath.admin.model.dto.PagingDTO;
import com.dsbath.admin.model.mapper.MemberMapper;
import com.dsbath.admin.model.service.MemberService;

@Service
public class MemberServiceImpl implements MemberService {

	@Autowired
	private MemberMapper memberMapper;
	
	/**
	 * 사용자 정보 목록 조회
	 * 
	 */
	@Override
	public Map<String, Object> select(PagingDTO<Member> pagingDTO) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			resultMap.put("list"		, memberMapper.select(pagingDTO));
			resultMap.put("totalCount"	, memberMapper.selectOfTotalCount(pagingDTO));
			
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
			
			// 등록 or 수정시 비밀번호 암호화
			if (type.equals(Constant.MERGE_TYPE_INSERT) || type.equals(Constant.MERGE_TYPE_UPDATE)) {
				String password = member.getPassword();
				
				// 비밀번호가 있을 때에만 암호화 (null, 공백 암호화 방지)
				if (StringUtil.isNotEmpty(password)) {
					member.setPassword(new BCryptPasswordEncoder().encode(password));
				}
			}
			
			// >> 등록 INSERT
			if (type.equals(Constant.MERGE_TYPE_INSERT)) {
				resultCount = memberMapper.insert(member);
				
			// >> 수정 UPDATE
			} else if (type.equals(Constant.MERGE_TYPE_UPDATE)) {
				
			// >> 삭제 DELETE
			} else if (type.equals(Constant.MERGE_TYPE_DELETE)) {
				
			}
			
			resultMap.put("resultCount", resultCount);
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
		}
		
		return resultMap;
	}
	
	/**
	 * 사용자 아이디 중복확인
	 * 
	 */
	@Override
	public Map<String, Object> memberIdChecked(Member member) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			// 0: 중복없음, 1: 중복있음
			Integer isSamed = 0;
			
			member = memberMapper.memberIdChecked(member);
			
			if (StringUtil.isEmpty(member)) {
				isSamed = 0;
				
			} else {
				
				// 중복 없음
				if (StringUtil.isEmpty(member.getMemberId())) {
					isSamed = 0;
					
				// 중복 있음
				} else {
					isSamed = 1;
				}
			}
			
			resultMap.put("isSamed", isSamed);
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
		}
		
		return resultMap;
	}
}
