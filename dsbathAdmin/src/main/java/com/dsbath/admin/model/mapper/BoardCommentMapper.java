package com.dsbath.admin.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.dsbath.admin.model.Board;
import com.dsbath.admin.model.BoardComment;

/**
 * 게시판 댓글 Mapper
 * 
 * @author idaesan
 *
 */
@Mapper
public interface BoardCommentMapper {

	/**
	 * 게시판 댓글 목록
	 * 
	 * @param boardComment
	 * @return
	 */
	public List<BoardComment> select(BoardComment boardComment);
	
	/**
	 * 게시판 댓글 목록 Total Count
	 * 
	 * @param board
	 * @return
	 */
	public Long selectOfTotalCount(BoardComment boardComment);
	
	/**
	 * 게시판 댓글 등록
	 * 
	 * @param boardComment
	 * @return
	 */
	public Integer insert(BoardComment boardComment);
	
	/**
	 * 게시판 댓글 수정 
	 * 
	 * @param boardComment
	 * @return
	 */
	public Integer update(BoardComment boardComment);
	
	/**
	 * 게시판 댓글 삭제
	 * 
	 * @param boardComment
	 * @return
	 */
	public Integer delete(BoardComment boardComment);

	/**
	 * 게시판 댓글 삭제 (게시판 삭제시)
	 * 
	 * @param board
	 * @return
	 */
	public Integer deleteOfBoard(Board board);
}
