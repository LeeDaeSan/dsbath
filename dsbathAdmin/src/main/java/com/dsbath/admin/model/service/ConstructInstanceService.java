package com.dsbath.admin.model.service;

import java.util.Map;

import com.dsbath.admin.model.ConstructInstance;
import com.dsbath.admin.model.dto.PagingDTO;

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
	 * 시공사례 등록, 수정, 삭제
	 * 
	 * @param constructInstance
	 * @param type
	 * @return
	 */
	public Map<String, Object> merge(ConstructInstance constructInstance, String type);
}
