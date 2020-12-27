package com.dsbath.admin.model.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dsbath.admin.etc.constant.Constant;
import com.dsbath.admin.etc.constant.UserConstant;
import com.dsbath.admin.etc.util.ResponseUtil;
import com.dsbath.admin.model.Board;
import com.dsbath.admin.model.dto.PagingDTO;
import com.dsbath.admin.model.mapper.BoardAnswerMapper;
import com.dsbath.admin.model.mapper.BoardCommentMapper;
import com.dsbath.admin.model.mapper.BoardMapper;
import com.dsbath.admin.model.service.BoardService;

@Service
public class BoardServiceImpl implements BoardService {
	
	@Autowired
	private BoardMapper boardMapper;
	
	@Autowired
	private BoardAnswerMapper boardAnswerMapper;
	
	@Autowired
	private BoardCommentMapper boardCommentMapper;
	
	/**
	 * 게시판 목록
	 * 
	 */
	@Override
	public Map<String, Object> select(PagingDTO<Board> pagingDTO) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			resultMap.put("list"			, boardMapper.select(pagingDTO));
			resultMap.put("totalCount"		, boardMapper.selectOfTotalCount(pagingDTO));
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
			e.printStackTrace();
		}
		
		return resultMap;
	}
	
	/**
	 * 게시판 상세
	 * 
	 */
	@Override
	public Map<String, Object> detail(Board board) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			resultMap.put("detail", boardMapper.detail(board));
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
		}
		
		return resultMap;
	}
	
	/**
	 * 게시판 Merge (등록, 수정, 삭제)
	 */
	@Override
	public Map<String, Object> merge(Board board, String type) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			Integer loginIdx = UserConstant.getUser().getIdx();
			
			Integer resultCount = 0;
			
			// >> 등록
			if (Constant.MERGE_TYPE_INSERT.equals(type)) {
				board.setAdminIdx(loginIdx);
				
				resultCount = boardMapper.insert(board);
				
			// >> 수정
			} else if (Constant.MERGE_TYPE_UPDATE.equals(type)) {
				resultCount = boardMapper.update(board);
				
			// >> 삭제 (전처리 : 참조된 답변, 댓글 정보 삭제)
			} else if (Constant.MERGE_TYPE_DELETE.equals(type)) {
				// 게시판 댓글 삭제
				resultCount = boardCommentMapper.deleteOfBoard(board);
				// 게시판 답변 삭제
				resultCount = boardAnswerMapper.deleteOfBoard(board);
				// 게시판 삭제
				resultCount = boardMapper.delete(board);
			}
			
			resultMap.put("resultCount", resultCount);
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
			e.printStackTrace();
		}
		
		return resultMap;
	}
}
