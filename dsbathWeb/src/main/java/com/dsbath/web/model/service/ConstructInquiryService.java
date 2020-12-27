package com.dsbath.web.model.service;

import java.util.Map;

import com.dsbath.web.model.ConstructInquiry;
import com.dsbath.web.model.dto.PagingDTO;

/**
 * 견적 및 시공 문의 Service
 * 
 * @author idaesan
 *
 */
public interface ConstructInquiryService {

	/**
	 * 견적 및 시공 문의 목록
	 * 
	 * @param pagingDTO
	 * @return
	 */
	public Map<String, Object> select(PagingDTO<ConstructInquiry> pagingDTO);
	
	/**
	 * 견적 및 시공 문의 상세
	 * 
	 * @param constructInquiry
	 * @return
	 */
	public Map<String, Object> detail(ConstructInquiry constructInquiry);
	
	/**
	 * 견적 및 시공 문의 등록, 수정, 삭제
	 * 
	 * @param constructInqury
	 * @param type
	 * @return
	 */
	public Map<String, Object> merge(ConstructInquiry constructInquiry, String type);
}
