package com.dsbath.web.model.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dsbath.web.etc.constant.Constant;
import com.dsbath.web.etc.constant.UserConstant;
import com.dsbath.web.etc.security.SecurityUser;
import com.dsbath.web.etc.util.ResponseUtil;
import com.dsbath.web.model.ConstructInquiry;
import com.dsbath.web.model.dto.PagingDTO;
import com.dsbath.web.model.mapper.ConstructInquiryMapper;
import com.dsbath.web.model.service.ConstructInquiryService;

@Service
public class ConstructInquiryServiceImpl implements ConstructInquiryService {
	
	@Autowired
	private ConstructInquiryMapper constructInquiryMapper;
	
	/**
	 * 견적 및 시공 문의 목록
	 * 
	 */
	@Override
	public Map<String, Object> select(PagingDTO<ConstructInquiry> pagingDTO) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			resultMap.put("list"		, constructInquiryMapper.select(pagingDTO));
			resultMap.put("totalCount"	, constructInquiryMapper.selectOfTotalCount(pagingDTO));
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
		}
		
		return resultMap;
	}
	
	/**
	 * 견적 및 시공 문의 상세
	 * 
	 */
	@Override
	public Map<String, Object> detail(ConstructInquiry constructInquiry) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();

			// 조회수 증가
			constructInquiryMapper.updateOfHit(constructInquiry);
			// 상세 조회
			resultMap.put("detail", constructInquiryMapper.detail(constructInquiry));
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
		}
		
		return resultMap;
	}
	
	/**
	 * 견적 및 시공 문의 등록, 수정, 삭제
	 * 
	 */
	@Override
	public Map<String, Object> merge(ConstructInquiry constructInquiry, String type) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			Integer resultCount = 0;
			
			Integer memberIdx = UserConstant.getUser().getIdx();
			
			// >> 등록
			if (Constant.MERGE_TYPE_INSERT.equals(type)) {
				constructInquiry.setMemberIdx(memberIdx);
				
				resultCount = constructInquiryMapper.insert(constructInquiry);
			}
			
			resultMap.put("resultCount", resultCount);
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
		}
		
		return resultMap;
	}

}
