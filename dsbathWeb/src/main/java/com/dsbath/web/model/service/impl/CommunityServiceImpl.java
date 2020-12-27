package com.dsbath.web.model.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dsbath.web.etc.util.ResponseUtil;
import com.dsbath.web.model.Community;
import com.dsbath.web.model.dto.PagingDTO;
import com.dsbath.web.model.mapper.CommunityMapper;
import com.dsbath.web.model.service.CommunityService;

@Service
public class CommunityServiceImpl implements CommunityService {

	@Autowired
	private CommunityMapper communityMapper;
	
	/**
	 * 커뮤니티 목록
	 * 
	 */
	@Override
	public Map<String, Object> select(PagingDTO<Community> pagingDTO) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			resultMap.put("list"		, communityMapper.select(pagingDTO));
			resultMap.put("totalCount" 	, communityMapper.selectOfTotalCount(pagingDTO));
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
			e.printStackTrace();
		}
		
		return resultMap;
	}
	
	/**
	 * 커뮤니티 상세
	 * 
	 */
	@Override
	public Map<String, Object> detail(Community community) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			// 조회수 증가
			communityMapper.updateOfHit(community);
			// 상세 조회
			resultMap.put("detail", communityMapper.detail(community));
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
			e.printStackTrace();
		}
		
		return resultMap;
	}
	
}
