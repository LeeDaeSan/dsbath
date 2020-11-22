package com.dsbath.admin.model.service;

import java.util.Map;

import com.dsbath.admin.model.BathDesign;
import com.dsbath.admin.model.dto.PagingDTO;

/**
 * 욕실디자인 Service
 * 
 * @author idaesan
 *
 */
public interface BathDesignService {

	/**
	 * 욕실디자인 목록
	 * 
	 * @param pagingDTO
	 * @return
	 */
	public Map<String, Object> select(PagingDTO<BathDesign> pagingDTO);
	
	/**
	 * 욕실디자인 등록, 수정, 삭제
	 * 
	 * @param bathDesign
	 * @param type
	 * @return
	 */
	public Map<String, Object> merge(BathDesign bathDesign, String type);
}
