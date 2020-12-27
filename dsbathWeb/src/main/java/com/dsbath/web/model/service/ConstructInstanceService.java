package com.dsbath.web.model.service;

import java.util.Map;

import com.dsbath.web.model.ConstructInstance;
import com.dsbath.web.model.dto.PagingDTO;

/**
 * 시공사례 정보 Service
 * 
 * @author idaesan
 *
 */
public interface ConstructInstanceService {

	/**
	 * 시공사례 목록 조회
	 * 
	 * @param pagingDTO
	 * @return
	 */
	public Map<String, Object> select(PagingDTO<ConstructInstance> pagingDTO);
	
	/**
	 * 시공사례 상세
	 * 
	 * @param constructInstance
	 * @return
	 */
	public Map<String, Object> detail(ConstructInstance constructInstance);
	
	/**
	 * 시공사례 등록, 수정, 삭제
	 * 
	 * @param constructInstance
	 * @param type
	 * @return
	 */
	public Map<String, Object> merge(ConstructInstance constructInstance, String type);
}
