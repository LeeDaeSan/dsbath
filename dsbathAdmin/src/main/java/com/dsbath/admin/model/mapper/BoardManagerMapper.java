package com.dsbath.admin.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.dsbath.admin.model.BoardManager;

/**
 * 게시판 관리 Mapper
 * 
 * @author idaesan
 *
 */
@Mapper
public interface BoardManagerMapper {

	/**
	 * 게시판 관리 상세
	 * 
	 * @param boardManager
	 */
	public BoardManager detail(BoardManager boardManager);
}
