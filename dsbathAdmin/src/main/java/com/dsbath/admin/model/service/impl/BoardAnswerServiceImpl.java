package com.dsbath.admin.model.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dsbath.admin.etc.constant.Constant;
import com.dsbath.admin.etc.constant.UserConstant;
import com.dsbath.admin.etc.util.ResponseUtil;
import com.dsbath.admin.model.BoardAnswer;
import com.dsbath.admin.model.mapper.BoardAnswerMapper;
import com.dsbath.admin.model.service.BoardAnswerService;

@Service
public class BoardAnswerServiceImpl implements BoardAnswerService {

	@Autowired
	private BoardAnswerMapper boardAnswerMapper;
	
	/**
	 * 게시판 답변 Merge (등록, 수정, 삭제)
	 * 
	 */
	@Override
	public Map<String, Object> merge(BoardAnswer boardAnswer, String type) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			Integer loginIdx = UserConstant.getUser().getIdx();
			
			Integer resultCount = 0;
			
			// >> 등록
			if (Constant.MERGE_TYPE_INSERT.equals(type)) {
				boardAnswer.setAdminIdx(loginIdx);
				resultCount = boardAnswerMapper.insert(boardAnswer);
				
			// >> 수정
			} else if (Constant.MERGE_TYPE_UPDATE.equals(type)) {
				resultCount = boardAnswerMapper.update(boardAnswer);
				
			// >> 삭제
			} else if (Constant.MERGE_TYPE_DELETE.equals(type)) {
				resultCount = boardAnswerMapper.delete(boardAnswer);
			}
			
			resultMap.put("resultCount", resultCount);
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
			e.printStackTrace();
		}
		
		return resultMap;
	}
}
