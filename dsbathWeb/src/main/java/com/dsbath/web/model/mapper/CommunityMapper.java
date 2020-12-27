package com.dsbath.web.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.dsbath.web.model.Community;
import com.dsbath.web.model.dto.PagingDTO;

/**
 * 커뮤니티 Mapper
 * 
 * @author idaesan
 *
 */
@Mapper
public interface CommunityMapper {

	/**
	 * 커뮤니티 목록
	 * 
	 * @param pagingDTO
	 * @return
	 */
	public List<Community> select(PagingDTO<Community> pagingDTO);
	
	/**
	 * 커뮤니티 목록 Total Count
	 * 
	 * @param pagingDTO
	 * @return
	 */
	public Long selectOfTotalCount(PagingDTO<Community> pagingDTO);
	
	/**
	 * 커뮤니티 상세
	 * 
	 * @param community
	 * @return
	 */
	public Community detail(Community community);
	
	/**
	 * 커뮤니티 조회수 증가
	 * 
	 * @param community
	 * @return
	 */
	public Integer updateOfHit(Community community);
	
}
