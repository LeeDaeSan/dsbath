package com.dsbath.web.model.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dsbath.web.etc.constant.Constant;
import com.dsbath.web.etc.constant.UserConstant;
import com.dsbath.web.etc.util.ResponseUtil;
import com.dsbath.web.etc.util.StringUtil;
import com.dsbath.web.model.BathCodeMapping;
import com.dsbath.web.model.BathDesign;
import com.dsbath.web.model.dto.PagingDTO;
import com.dsbath.web.model.mapper.BathCodeMappingMapper;
import com.dsbath.web.model.mapper.BathDesignMapper;
import com.dsbath.web.model.service.BathDesignService;

@Service
public class BathDesignServiceImpl implements BathDesignService {
	
	@Autowired
	private BathDesignMapper bathDesignMapper;
	
	@Autowired
	private BathCodeMappingMapper bathCodeMappingMapper;
	
	/**
	 * 욕실디자인 목록
	 * 
	 */
	@Override
	public Map<String, Object> select(PagingDTO<BathDesign> pagingDTO) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			resultMap.put("list"		, bathDesignMapper.select(pagingDTO));
			resultMap.put("totalCount"	, bathDesignMapper.selectOfTotalCount(pagingDTO));
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
			e.printStackTrace();
		}
		return resultMap;
	}
	
	/**
	 * 욕실디자인 상세
	 * 
	 */
	@Override
	public Map<String, Object> detail(BathDesign bathDesign) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			// 조회수 증가 
			bathDesignMapper.updateOfHit(bathDesign);
			// 상세 조회
			resultMap.put("detail", bathDesignMapper.detail(bathDesign));
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
		}
		
		return resultMap;
	}
	
	/**
	 * 욕실디자인 등록, 수정, 삭제
	 * 
	 */
	@Override
	public Map<String, Object> merge(BathDesign bathDesign, String type) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			// 로그인 PK
			Integer loginIdx = UserConstant.getUser().getIdx();
			// 결과값
			Integer resultCount = 0;
			
			// 등록, 수정 로그인 PK 셋팅
			if (type.equals(Constant.MERGE_TYPE_INSERT) || type.equals(Constant.MERGE_TYPE_UPDATE)) {
				bathDesign.setAdminIdx(loginIdx);
			}
			
			// >> 등록
			if (type.equals(Constant.MERGE_TYPE_INSERT)) {
				// -> 디자인 정보 등록
				resultCount = bathDesignMapper.insert(bathDesign);
				
				// -> 타일 코드 맵핑 등록
				if (StringUtil.isNotEmpty(bathDesign.getTileCodeMappingList())) {
					for (BathCodeMapping mapping : bathDesign.getTileCodeMappingList()) {
						mapping.setBathDesignIdx(bathDesign.getBathDesignIdx());
						resultCount = bathCodeMappingMapper.insert(mapping);
					}
				}
				
				// -> 제품 코드 맵핑 등록
				if (StringUtil.isNotEmpty(bathDesign.getProdCodeMappingList())) {
					for (BathCodeMapping mapping : bathDesign.getProdCodeMappingList()) {
						mapping.setBathDesignIdx(bathDesign.getBathDesignIdx());
						resultCount = bathCodeMappingMapper.insert(mapping);
					}
				}
				
			// >> 수정
			} else if (type.equals(Constant.MERGE_TYPE_UPDATE)) {
				resultCount = bathDesignMapper.update(bathDesign);
				
				if (StringUtil.isNotEmpty(bathDesign.getTileCodeMappingList())) {
					
					// -> 이전 코드 맵핑 전체 삭제
					BathCodeMapping deleteMapping = new BathCodeMapping();
					deleteMapping.setBathDesignIdx(bathDesign.getBathDesignIdx());
					resultCount = bathCodeMappingMapper.delete(deleteMapping);
					
					// -> 신규 타일 코드 맵핑 추가
					for (BathCodeMapping mapping : bathDesign.getTileCodeMappingList()) {
						mapping.setBathDesignIdx(bathDesign.getBathDesignIdx());
						resultCount = bathCodeMappingMapper.insert(mapping);
					}
					
					// -> 신규 제품 코드 맵핑 추가
					for (BathCodeMapping mapping : bathDesign.getProdCodeMappingList()) {
						mapping.setBathDesignIdx(bathDesign.getBathDesignIdx());
						resultCount = bathCodeMappingMapper.insert(mapping);
					}
					
				}
				
			// >> 삭제
			} else if (type.equals(Constant.MERGE_TYPE_DELETE)) {
				resultCount = bathDesignMapper.delete(bathDesign);
			}
			
			resultMap.put("resultCount", resultCount);
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
			e.printStackTrace();
		}
		
		return resultMap;
	}

}
