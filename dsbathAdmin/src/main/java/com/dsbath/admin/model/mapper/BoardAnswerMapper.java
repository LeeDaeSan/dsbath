package com.dsbath.admin.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.dsbath.admin.model.Board;
import com.dsbath.admin.model.BoardAnswer;

/**
 * 게시판 답변 Mapper
 * 
 * @author idaesan
 *
 */
@Mapper
public interface BoardAnswerMapper {

	/**
	 * 게시판 답변 등록
	 * 
	 * @param boardAnswer
	 * @return
	 */
	public Integer insert(BoardAnswer boardAnswer);
	
	/**
	 * 게시판 답변 수정
	 * 
	 * @param boardAnswer
	 * @return
	 */
	public Integer update(BoardAnswer boardAnswer);
	
	/**
	 * 게시판 답변 삭제
	 * 
	 * @param boardAnswer
	 * @return
	 */
	public Integer delete(BoardAnswer boardAnswer);
	
	/**
	 * 게시판 답변 삭제 (게시판 삭제시)
	 * 
	 * @param board
	 * @return
	 */
	public Integer deleteOfBoard(Board board);
}
