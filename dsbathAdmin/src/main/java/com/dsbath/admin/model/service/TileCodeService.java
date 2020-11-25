package com.dsbath.admin.model.service;

import java.util.List;
import java.util.Map;

import com.dsbath.admin.model.TileCode;
import com.dsbath.admin.model.dto.PagingDTO;

/**
 * 타일 코드 Service
 * 
 * @author idaesan
 *
 */
public interface TileCodeService {

	/**
	 * 타일 코드 목록
	 * 
	 * @param pagingDTO
	 * @return
	 */
	public Map<String, Object> select(PagingDTO<TileCode> pagingDTO);
	
	/**
	 * 타일 코드 등록, 수정, 삭제
	 * 
	 * @param tileCode
	 * @return
	 */
	public Map<String, Object> merge(TileCode tileCode, String type);
	
	/**
	 * 타일 코드 목록 (욕실디자인 코드검색)
	 * 
	 * @param tileCode
	 * @return
	 */
	public Map<String, Object> selectOfBathDesign(TileCode tileCode);
}
