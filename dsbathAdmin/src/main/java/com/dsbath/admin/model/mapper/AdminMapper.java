package com.dsbath.admin.model.mapper;

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
	public Admin select(Admin admin);
	
	/**
	 * 관리자 비밀번호 수정
	 * 
	 * @param admin
	 * @return
	 */
	public Integer updateOfPassword(Admin admin);
}
