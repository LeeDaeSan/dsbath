package com.dsbath.admin.controller.rest;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dsbath.admin.model.Community;
import com.dsbath.admin.model.dto.PagingDTO;
import com.dsbath.admin.model.service.CommunityService;

/**
 * 커뮤니티 Rest Controller
 * 
 * @author idaesan
 *
 */
@RestController
@RequestMapping("/community/rest")
public class CommunityRestController {

	@Autowired
	private CommunityService communityService;
	
	/**
	 * 커뮤니티 목록
	 * 
	 * @param pagingDTO
	 * @param community
	 * @return
	 */
	@PostMapping("/select")
	public Map<String, Object> select (PagingDTO<Community> pagingDTO, Community community) {
		pagingDTO.setModel(community);
		return communityService.select(pagingDTO); 
	}
	
	/**
	 * 커뮤니티 상세
	 * 
	 * @param community
	 * @return
	 */
	@PostMapping("/detail")
	public Map<String, Object> detail (Community community) {
		return communityService.detail(community);
	}
	
	/**
	 * 커뮤니티 등록, 수정, 삭제
	 * 
	 * @param community
	 * @param type
	 * @return
	 */
	@PostMapping("/merge")
	public Map<String, Object> merge (Community community, @RequestParam(value = "type") String type) {
		return communityService.merge(community, type);
	}
}
