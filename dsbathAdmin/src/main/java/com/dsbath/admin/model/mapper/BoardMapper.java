package com.dsbath.admin.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.dsbath.admin.model.Board;
import com.dsbath.admin.model.dto.PagingDTO;

/**
 * 게시판 Mapper
 * 
 * @author idaesan
 *
 */
@Mapper
public interface BoardMapper {

	/**
	 * 게시판 목록
	 * 
	 * @param pagingDTO
	 * @return
	 */
	public List<Board> select(PagingDTO<Board> pagingDTO);
	
	/**
	 * 게시판 목록 Total Count
	 * 
	 * @param pagingDTO
	 * @return
	 */
	public Long selectOfTotalCount(PagingDTO<Board> pagingDTO);
	
	/**
	 * 게시판 상세
	 * 
	 * @param board
	 * @return
	 */
	public Board detail(Board board);
	
	/**
	 * 게시판 등록
	 * 
	 * @param board
	 * @return
	 */
	public Integer insert(Board board);
	
	/**
	 * 게시판 수정
	 * 
	 * @param board
	 * @return
	 */
	public Integer update(Board board);
	
	/**
	 * 게시판 삭제
	 * @param board
	 * @return
	 */
	public Integer delete(Board board);
}
