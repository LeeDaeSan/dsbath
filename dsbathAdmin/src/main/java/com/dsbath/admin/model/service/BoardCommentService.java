package com.dsbath.admin.model.service;

import java.util.Map;

import com.dsbath.admin.model.BoardComment;

/**
 * 게시판 댓글 Service
 * 
 * @author idaesan
 *
 */
public interface BoardCommentService {

	/**
	 * 게시판 댓글 목록
	 *
	 * @param boardComment
	 * @return
	 */
	public Map<String, Object> select(BoardComment boardComment);
	
	/**
	 * 게시판 댓글 Merge (등록, 수정, 삭제)
	 * 
	 * @param boardComment
	 * @param type
	 * @return
	 */
	public Map<String, Object> merge(BoardComment boardComment, String type);
}
