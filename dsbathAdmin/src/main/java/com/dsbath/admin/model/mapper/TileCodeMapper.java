package com.dsbath.admin.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.dsbath.admin.model.TileCode;
import com.dsbath.admin.model.dto.PagingDTO;

/**
 * 타일 코드 Mapper 
 * 
 * @author idaesan
 *
 */
@Mapper
public interface TileCodeMapper {

	/**
	 * 타일 코드 목록
	 * 
	 * @param pagingDTO
	 * @return
	 */
	public List<TileCode> select(PagingDTO<TileCode> pagingDTO);
	
	/**
	 * 타일 코드 목록 Total Count
	 * 
	 * @param pagingDTO
	 * @return
	 */
	public Long selectOfTotalCount(PagingDTO<TileCode> pagingDTO);
	
	/**
	 * 타일 코드 등록
	 * 
	 * @param tileCode
	 * @return
	 */
	public Integer insert(TileCode tileCode);
	
	/**
	 * 타일 코드 수정
	 * 
	 * @param tileCode
	 * @return
	 */
	public Integer update(TileCode tileCode);
	
	/**
	 * 타일 코드 삭제
	 * 
	 * @param tileCode
	 * @return
	 */
	public Integer delete(TileCode tileCode);
	
	/**
	 * 타일 코드 목록 (욕실디자인 코드검색)
	 * 
	 * @param tileCode
	 * @return
	 */
	public List<TileCode> selectOfBathDesign(TileCode tileCode);
}
