package com.dsbath.admin.model.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dsbath.admin.etc.constant.Constant;
import com.dsbath.admin.etc.constant.UserConstant;
import com.dsbath.admin.etc.util.ResponseUtil;
import com.dsbath.admin.model.Community;
import com.dsbath.admin.model.dto.PagingDTO;
import com.dsbath.admin.model.mapper.CommunityMapper;
import com.dsbath.admin.model.service.CommunityService;

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
			
			resultMap.put("detail", communityMapper.detail(community));
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
		}
		
		return resultMap;
	}
	
	/**
	 * 커뮤니티 등록, 수정, 삭제
	 * 
	 */
	@Override
	public Map<String, Object> merge(Community community, String type) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			Integer loginIdx = UserConstant.getUser().getIdx();
			
			Integer resultCount = 0;
			
			// >> 등록
			if (type.equals(Constant.MERGE_TYPE_INSERT)) {
				community.setAdminIdx(loginIdx);
				resultCount = communityMapper.insert(community);
				
			// >> 수정
			} else if (type.equals(Constant.MERGE_TYPE_UPDATE)) {
				resultCount = communityMapper.update(community);
				
			// >> 삭제
			} else if (type.equals(Constant.MERGE_TYPE_DELETE)) {
				resultCount = communityMapper.delete(community);
			}
			
			resultMap.put("resultCount", resultCount);
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
		}
		
		return resultMap;
	}
}
