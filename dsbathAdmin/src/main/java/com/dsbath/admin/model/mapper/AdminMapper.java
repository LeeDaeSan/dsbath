package com.dsbath.admin.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.dsbath.admin.model.Admin;

/**
 * 관리자 정보 Mapper
 * 
 * @author idaesan
 *
 */
@Mapper
public interface AdminMapper {
	
	/**
	 * 관리자 상세 조회
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
	public Integer updateOfPassword(Admin admin);
	
	/**
	 * 관리자 아이디 중복확인
	 * 
	 * @param admin
	 * @return
	 */
	public Admin adminIdChecked(Admin admin);
	
	/**
	 * 관리자 등록
	 * 
	 * @param admin
	 * @return
	 */
	public Integer insert(Admin admin);
	
	/**
	 * 관리자 목록 조회
	 * 
	 * @param admin
	 * @return
	 */
	public List<Admin> select(Admin admin);
}
