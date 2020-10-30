package com.dsbath.admin.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.dsbath.admin.model.Admin;
import com.dsbath.admin.model.dto.PagingDTO;

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
	public List<Admin> select(PagingDTO<Admin> pagingDTO);
	
	/**
	 * 관리자 Total Count 조회
	 * 
	 * @param admin
	 * @return
	 */
	public Long selectOfTotalCount(PagingDTO<Admin> pagingDTO);
}
