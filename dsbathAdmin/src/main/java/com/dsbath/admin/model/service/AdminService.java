package com.dsbath.admin.model.service;

import java.util.Map;

import com.dsbath.admin.model.Admin;
import com.dsbath.admin.model.dto.PagingDTO;

/**
 * 관리자 정보 Service
 * 
 * @author idaesan
 *
 */
public interface AdminService {

	/**
	 * 관리자 로그인 정보 조회
	 * 
	 * @param admin
	 * @return
	 */
	public Admin selectOfLogin(Admin admin);
	
	/**
	 * 관리자 비밀번호 수정
	 * 
	 * @param admin
	 * @return
	 */
	public Map<String, Object> updateOfPassword(Admin admin);
	
	/**
	 * 관리자 아이디 중복확인
	 * 
	 * @param admin
	 * @return
	 */
	public Map<String, Object> adminIdChecked(Admin admin);
	
	/**
	 * 관리자 정보 등록, 수정, 삭제
	 * 
	 * @param admin
	 * @param type
	 * @return
	 */
	public Map<String, Object> merge(Admin admin, String type);
	
	/**
	 * 관리자 목록 조회
	 * 
	 * @param admin
	 * @return
	 */
	public Map<String, Object> select(PagingDTO<Admin> pagingDTO);
}
