package com.dsbath.admin.model.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dsbath.admin.etc.util.ResponseUtil;
import com.dsbath.admin.model.Admin;
import com.dsbath.admin.model.mapper.AdminMapper;
import com.dsbath.admin.model.service.AdminService;

@Service
public class AdminServiceImpl implements AdminService {
	
	@Autowired
	private AdminMapper adminMapper;
	
	/**
	 * 관리자 정보 조회
	 * 
	 */
	@Override
	public Admin select(Admin admin) {
		
		try {
			admin = adminMapper.select(admin);
			
		} catch (Exception e) {
			admin = null;
		}
		
		return admin;
	}

	/**
	 * 관리자 비밀번호 수정
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
}
