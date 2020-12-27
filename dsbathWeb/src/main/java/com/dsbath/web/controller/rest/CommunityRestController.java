package com.dsbath.web.controller.rest;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dsbath.web.model.Community;
import com.dsbath.web.model.dto.PagingDTO;
import com.dsbath.web.model.service.CommunityService;

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
}
