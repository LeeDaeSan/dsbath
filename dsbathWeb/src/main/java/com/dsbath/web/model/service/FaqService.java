package com.dsbath.web.model.service;

import java.util.Map;

import com.dsbath.web.model.Faq;
import com.dsbath.web.model.dto.PagingDTO;

/**
 * FAQ Service
 * 
 * @author idaesan
 *
 */
public interface FaqService {

	/**
	 * FAQ 목록 조회
	 * 
	 * @param pagingDTO
	 * @return
	 */
	public Map<String, Object> select(PagingDTO<Faq> pagingDTO);
	
	/**
	 * FAQ 상세
	 * 
	 * @param faq
	 * @return
	 */
	public Map<String, Object> detail(Faq faq);
	
	/**
	 * FAQ 등록, 수정, 삭제
	 * 
	 * @param faq
	 * @param type
	 * @return
	 */
	public Map<String, Object> merge(Faq faq, String type);
}
