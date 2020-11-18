package com.dsbath.admin.model.service;

import java.util.Map;

import com.dsbath.admin.model.ConstructEpilogue;
import com.dsbath.admin.model.dto.PagingDTO;

/**
 * 시공후기 Service
 * 
 * @author idaesan
 *
 */
public interface ConstructEpilogueService {

	/**
	 * 시공후기 목록
	 * 
	 * @param pagingDTO
	 * @return
	 */
	public Map<String, Object> select(PagingDTO<ConstructEpilogue> pagingDTO);
}
