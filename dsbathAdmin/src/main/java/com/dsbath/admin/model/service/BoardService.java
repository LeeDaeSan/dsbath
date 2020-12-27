package com.dsbath.admin.model.service;

import java.util.Map;

import com.dsbath.admin.model.Board;
import com.dsbath.admin.model.dto.PagingDTO;

/**
 * 게시판 Service
 * 
 * @author idaesan
 *
 */
public interface BoardService {

	/**
	 * 게시판 목록
	 * 
	 * @param pagingDTO
	 * @return
	 */
	public Map<String, Object> select(PagingDTO<Board> pagingDTO);
	
	/**
	 * 게시판 상세
	 * 
	 * @param board
	 * @return
	 */
	public Map<String, Object> detail(Board board);
	
	/**
	 * 게시판 Merge (등록, 수정, 삭제)
	 * 
	 * @param board
	 * @param type
	 * @return
	 */
	public Map<String, Object> merge(Board board, String type);
}
