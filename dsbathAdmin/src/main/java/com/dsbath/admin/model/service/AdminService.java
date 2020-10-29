package com.dsbath.admin.model.service;

import java.util.Map;

import com.dsbath.admin.model.Admin;

/**
 * 관리자 정보 Service
 * 
 * @author idaesan
 *
 */
public interface AdminService {

	/**
	 * 관리자 정보 조회
	 * 
	 * @param admin
	 * @return
	 */
	public Admin select(Admin admin);
	
	/**
	 * 관리자 비밀번호 수정
	 * 
	 * @param admin
	 * @return
	 */
	public Map<String, Object> updateOfPassword(Admin admin);
}
