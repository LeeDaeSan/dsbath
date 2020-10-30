package com.dsbath.admin.model.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.dsbath.admin.etc.constant.Constant;
import com.dsbath.admin.etc.util.ResponseUtil;
import com.dsbath.admin.etc.util.StringUtil;
import com.dsbath.admin.model.Admin;
import com.dsbath.admin.model.mapper.AdminMapper;
import com.dsbath.admin.model.service.AdminService;

@Service
public class AdminServiceImpl implements AdminService {
	
	@Autowired
	private AdminMapper adminMapper;
	
	/**
	 * 관리자 로그인 정보 조회
	 * 
	 */
	@Override
	public Admin selectOfLogin(Admin admin) {
		
		try {
			admin = adminMapper.selectOfLogin(admin);
			
		} catch (Exception e) {
			admin = null;
		}
		
		return admin;
	}

	/**
	 * 관리자 비밀번호 수정
	 * 
	 */
	@Override
	public Map<String, Object> updateOfPassword(Admin admin) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			resultMap.put("result", adminMapper.updateOfPassword(admin));
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
		}
		
		return resultMap;
	}
	
	/**
	 * 관리자 아이디 중복확인
	 * 
	 */
	@Override
	public Map<String, Object> adminIdChecked(Admin admin) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			// 0: 중복없음, 1: 중복있음
			Integer isSamed = 0;
			
			admin = adminMapper.adminIdChecked(admin);
			if (StringUtil.isEmpty(admin)) {
				isSamed = 0;
				
			} else {
				
				// 중복 없음
				if (StringUtil.isEmpty(admin.getAdminId())) {
					isSamed = 0;
					
				// 중복 있음
				} else {
					isSamed = 1;
				}
			}
			
			resultMap.put("isSamed", isSamed);
			
		} catch (Exception e) {
			e.printStackTrace();
			resultMap = ResponseUtil.failureMap();
		}
		return resultMap;
	}
	
	/**
	 * 관리자 등록, 수정, 삭제
	 * 
	 */
	@Override
	public Map<String, Object> merge(Admin admin, String type) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			Integer result = 0;

			// 등록 or 수정시 비밀번호 암호화
			if (type.equals(Constant.MERGE_TYPE_INSERT) || type.equals(Constant.MERGE_TYPE_UPDATE)) {
				admin.setPassword(
					new BCryptPasswordEncoder().encode(admin.getPassword()));
			}
			
			// 등록
			if (type.equals(Constant.MERGE_TYPE_INSERT)) {
				result = adminMapper.insert(admin);
			}
			
			resultMap.put("resultCount", result);
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
			e.printStackTrace();
		}
		return resultMap;
	}
	
	/**
	 * 관리자 목록 조회
	 * 
	 */
	@Override
	public Map<String, Object> select(Admin admin) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			resultMap.put("list", adminMapper.select(admin));
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
		}
		
		return resultMap;
	}
}
