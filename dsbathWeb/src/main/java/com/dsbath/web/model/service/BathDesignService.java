package com.dsbath.web.model.service;

import java.util.Map;

import com.dsbath.web.model.BathDesign;
import com.dsbath.web.model.dto.PagingDTO;

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
	 * 욕실디자인 상세
	 * 
	 * @param bathDesign
	 * @return
	 */
	public Map<String, Object> detail(BathDesign bathDesign);
	
	/**
	 * 욕실디자인 등록, 수정, 삭제
	 * 
	 * @param bathDesign
	 * @param type
	 * @return
	 */
	public Map<String, Object> merge(BathDesign bathDesign, String type);
}
