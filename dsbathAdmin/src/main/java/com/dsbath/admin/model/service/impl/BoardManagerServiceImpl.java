package com.dsbath.admin.model.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dsbath.admin.etc.util.ResponseUtil;
import com.dsbath.admin.model.BoardManager;
import com.dsbath.admin.model.mapper.BoardManagerMapper;
import com.dsbath.admin.model.service.BoardManagerService;

@Service
public class BoardManagerServiceImpl implements BoardManagerService {

	@Autowired
	private BoardManagerMapper boardManagerMapper;
	
	/**
	 * 게시판 관리 상세
	 * 
	 */
	@Override
	public Map<String, Object> detail(BoardManager boardManager) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			resultMap.put("detail", boardManagerMapper.detail(boardManager));
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
		}
		
		return resultMap;
	}
}
