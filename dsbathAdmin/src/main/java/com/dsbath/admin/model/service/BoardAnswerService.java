package com.dsbath.admin.model.service;

import java.util.Map;

import com.dsbath.admin.model.BoardAnswer;

/**
 * 게시판 답변 Service
 * 
 * @author idaesan
 *
 */
public interface BoardAnswerService {

	/**
	 * 게시판 답변 Merge (등록, 수정, 삭제)
	 * 
	 * @param board
	 * @param type
	 * @return
	 */
	public Map<String, Object> merge(BoardAnswer boardAnswer, String type);
}
