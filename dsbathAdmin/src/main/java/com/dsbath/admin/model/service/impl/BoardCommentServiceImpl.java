package com.dsbath.admin.model.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dsbath.admin.etc.constant.Constant;
import com.dsbath.admin.etc.constant.UserConstant;
import com.dsbath.admin.etc.util.ResponseUtil;
import com.dsbath.admin.model.BoardComment;
import com.dsbath.admin.model.mapper.BoardCommentMapper;
import com.dsbath.admin.model.service.BoardCommentService;

@Service
public class BoardCommentServiceImpl implements BoardCommentService {

	@Autowired
	private BoardCommentMapper boardCommentMapper;
	
	/**
	 * 게시판 댓글 목록
	 * 
	 */
	@Override
	public Map<String, Object> select(BoardComment boardComment) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			resultMap.put("list"		, boardCommentMapper.select(boardComment));
			resultMap.put("totalCount"	, boardCommentMapper.selectOfTotalCount(boardComment));
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
			e.printStackTrace();
		}
		
		return resultMap;
	}
	
	/**
	 * 게시판 댓글 Merge (등록, 수정, 삭제)
	 * 
	 */
	@Override
	public Map<String, Object> merge(BoardComment boardComment, String type) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			Integer loginIdx = UserConstant.getUser().getIdx();
			
			Integer resultCount = 0;
			
			// >> 등록
			if (Constant.MERGE_TYPE_INSERT.equals(type)) {
				boardComment.setAdminIdx(loginIdx);
				
				resultCount = boardCommentMapper.insert(boardComment);
				
			// >> 수정
			} else if (Constant.MERGE_TYPE_UPDATE.equals(type)) {
				resultCount = boardCommentMapper.update(boardComment);
				
			// >> 삭제
			} else if (Constant.MERGE_TYPE_DELETE.equals(type)) {
				resultCount = boardCommentMapper.delete(boardComment);
			}
			
			resultMap.put("resultCount", resultCount);
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
			e.printStackTrace();
		}
		
		return resultMap;
	}
}
