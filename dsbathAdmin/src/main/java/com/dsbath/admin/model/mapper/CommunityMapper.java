package com.dsbath.admin.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.dsbath.admin.model.Community;
import com.dsbath.admin.model.dto.PagingDTO;

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
	 * 커뮤니티 등록
	 * 
	 * @param community
	 * @return
	 */
	public Integer insert(Community community);
	
	/**
	 * 커뮤니티 수정
	 * 
	 * @param community
	 * @return
	 */
	public Integer update(Community community);
	
	/**
	 * 커뮤니티 삭제
	 * 
	 * @param community
	 * @return
	 */
	public Integer delete(Community community);
}
