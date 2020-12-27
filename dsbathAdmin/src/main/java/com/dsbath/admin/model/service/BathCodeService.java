package com.dsbath.admin.model.service;

import java.util.Map;

import com.dsbath.admin.model.BathCode;
import com.dsbath.admin.model.dto.PagingDTO;

/**
 * 욕실디자인 코드 Service
 * 
 * @author idaesan
 *
 */
public interface BathCodeService {

	/**
	 * 코드 목록
	 * 
	 * @param pagingDTO
	 * @return
	 */
	public Map<String, Object> select(PagingDTO<BathCode> pagingDTO);
	
	/**
	 * 코드 상세
	 * 
	 * @param bathCode
	 * @return
	 */
	public Map<String, Object> detail(BathCode bathCode);
	
	/**
	 * 코드 등록, 수정, 삭제
	 * 
	 * @param bathCode
	 * @param type
	 * @return
	 */
	public Map<String, Object> merge(BathCode bathCode, String type);
	
	/**
	 * 디자인 코드 검색 (욕실디자인 코드 검색)
	 * 
	 * @param bathCode
	 * @return
	 */
	public Map<String, Object> selectOfBathDesign(BathCode bathCode);
}
