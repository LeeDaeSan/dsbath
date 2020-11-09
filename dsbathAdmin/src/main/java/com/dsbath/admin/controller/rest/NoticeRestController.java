package com.dsbath.admin.controller.rest;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dsbath.admin.model.Notice;
import com.dsbath.admin.model.dto.PagingDTO;
import com.dsbath.admin.model.service.NoticeService;

/**
 * 공지사항 Rest Controller
 * 
 * @author idaesan
 *
 */
@RestController
@RequestMapping("/notice/rest")
public class NoticeRestController {

	@Autowired
	private NoticeService noticeService;
	
	/**
	 * 공지사항 목록
	 * 
	 * @param pagingDTO
	 * @param notice
	 * @return
	 */
	@PostMapping("/list")
	public Map<String, Object> list (PagingDTO<Notice> pagingDTO, Notice notice) {
		pagingDTO.setModel(notice);
		return noticeService.select(pagingDTO);
	}
	
	/**
	 * 공지사항 상세
	 * 
	 * @param notice
	 * @return
	 */
	@PostMapping("/detail")
	public Map<String, Object> detail (Notice notice) {
		return noticeService.detail(notice);
	}
	
	/**
	 * 공지사항 등록, 수정, 삭제
	 * 
	 * @param notice
	 * @param type
	 * @return
	 */
	@PostMapping("/merge")
	public Map<String, Object> merge (Notice notice, @RequestParam(value = "type") String type) {
		return noticeService.merge(notice, type);
	}
}
