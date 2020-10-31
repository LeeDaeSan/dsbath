package com.dsbath.admin.model.service;

import java.util.Map;

import com.dsbath.admin.model.Notice;
import com.dsbath.admin.model.dto.PagingDTO;

/**
 * 공지사항 Service
 * 
 * @author idaesan
 *
 */
public interface NoticeService {

	/**
	 * 공지사항 등록, 수정, 삭제
	 * 
	 * @param notice
	 * @param type
	 * @return
	 */
	public Map<String, Object> merge(Notice notice, String type);
	
	/**
	 * 공지사항 목록
	 * 
	 * @param padingDTO
	 * @return
	 */
	public Map<String, Object> select(PagingDTO<Notice> pagingDTO);
}
