package com.dsbath.admin.model.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dsbath.admin.etc.constant.Constant;
import com.dsbath.admin.etc.constant.UserConstant;
import com.dsbath.admin.etc.util.ResponseUtil;
import com.dsbath.admin.model.BathDesign;
import com.dsbath.admin.model.TileCodeMapping;
import com.dsbath.admin.model.dto.PagingDTO;
import com.dsbath.admin.model.mapper.BathDesignMapper;
import com.dsbath.admin.model.mapper.TileCodeMappingMapper;
import com.dsbath.admin.model.service.BathDesignService;

@Service
public class BathDesignServiceImpl implements BathDesignService {
	
	@Autowired
	private BathDesignMapper bathDesignMapper;
	
	@Autowired
	private TileCodeMappingMapper tileCodeMappingMapper;
	
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
				for (TileCodeMapping mapping : bathDesign.getTileCodeMappingList()) {
					mapping.setBathDesignIdx(bathDesign.getBathDesignIdx());
					resultCount = tileCodeMappingMapper.insert(mapping);
				}
				
			// >> 수정
			} else if (type.equals(Constant.MERGE_TYPE_UPDATE)) {
				resultCount = bathDesignMapper.update(bathDesign);
				
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
