package com.dsbath.web.model.service;

import java.util.Map;

import com.dsbath.web.model.Notice;
import com.dsbath.web.model.dto.PagingDTO;

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
	 * 공지사항 상세
	 * 
	 * @param notice
	 * @return
	 */
	public Map<String, Object> detail(Notice notice);
	
	/**
	 * 공지사항 목록
	 * 
	 * @param padingDTO
	 * @return
	 */
	public Map<String, Object> select(PagingDTO<Notice> pagingDTO);
}
