package com.dsbath.admin.model.service;

import java.util.Map;

import com.dsbath.admin.model.BoardManager;

/**
 * 게시판 관리 Service
 * 
 * @author idaesan
 *
 */
public interface BoardManagerService {

	/**
	 * 게시판 관리 상세
	 * 
	 * @param boardManager
	 * @return
	 */
	public Map<String, Object> detail(BoardManager boardManager);
}
