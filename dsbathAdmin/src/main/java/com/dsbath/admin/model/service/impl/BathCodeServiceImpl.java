package com.dsbath.admin.model.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dsbath.admin.etc.constant.Constant;
import com.dsbath.admin.etc.util.ResponseUtil;
import com.dsbath.admin.model.BathCode;
import com.dsbath.admin.model.dto.PagingDTO;
import com.dsbath.admin.model.mapper.BathCodeMapper;
import com.dsbath.admin.model.service.BathCodeService;

@Service
public class BathCodeServiceImpl implements BathCodeService {

	@Autowired
	private BathCodeMapper bathCodeMapper;
	
	/**
	 * 코드 목록
	 * 
	 */
	@Override
	public Map<String, Object> select(PagingDTO<BathCode> pagingDTO) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			resultMap.put("list"		, bathCodeMapper.select(pagingDTO));
			resultMap.put("totalCount"	, bathCodeMapper.selectOfTotalCount(pagingDTO));
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
			e.printStackTrace();
		}
		
		return resultMap;
	}
	
	/**
	 * 코드 상세
	 * 
	 */
	@Override
	public Map<String, Object> detail(BathCode bathCode) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			resultMap.put("detail", bathCodeMapper.detail(bathCode));
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
		}
		
		return resultMap;
	}
	
	/**
	 * 코드 등록, 수정, 삭제
	 * 
	 */
	@Override
	public Map<String, Object> merge(BathCode bathCode, String type) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			Integer resultCount = 0;
			
			// >> 등록
			if (type.equals(Constant.MERGE_TYPE_INSERT)) {
				resultCount = bathCodeMapper.insert(bathCode); 
				
			// >> 수정
			} else if (type.equals(Constant.MERGE_TYPE_UPDATE)) {
				resultCount = bathCodeMapper.update(bathCode);
				
			// >> 삭제
			} else if (type.equals(Constant.MERGE_TYPE_DELETE)) {
				resultCount = bathCodeMapper.delete(bathCode);
			}
			
			resultMap.put("resultCount", resultCount);
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
		}
		
		return resultMap;
	}
	
	/**
	 * 디자인 코드 검색 (욕실디자인 코드 검색)
	 *  
	 */
	@Override
	public Map<String, Object> selectOfBathDesign(BathCode bathCode) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			resultMap.put("list", bathCodeMapper.selectOfBathDesign(bathCode));
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
		}
		
		return resultMap;
	}
}
