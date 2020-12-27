package com.dsbath.admin.model.service;

import java.util.Map;

import com.dsbath.admin.model.Community;
import com.dsbath.admin.model.dto.PagingDTO;

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
	
	/**
	 * 커뮤니티 등록, 수정, 삭제
	 * 
	 * @param community
	 * @param type
	 * @return
	 */
	public Map<String, Object> merge(Community community, String type);
}
