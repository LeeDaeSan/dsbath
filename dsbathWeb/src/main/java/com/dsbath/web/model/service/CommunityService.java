package com.dsbath.web.model.service;

import java.util.Map;

import com.dsbath.web.model.Community;
import com.dsbath.web.model.dto.PagingDTO;

/**
 * 커뮤니티 Service
 * 
 * @author idaesan
 *
 */
public interface CommunityService {

	/**
	 * 커뮤니티 목록
	 * 
	 * @param pagingDTO
	 * @return
	 */
	public Map<String, Object> select(PagingDTO<Community> pagingDTO);
	
	/**
	 * 커뮤니티 상세
	 * 
	 * @param community
	 * @return
	 */
	public Map<String, Object> detail(Community community);
	
}
