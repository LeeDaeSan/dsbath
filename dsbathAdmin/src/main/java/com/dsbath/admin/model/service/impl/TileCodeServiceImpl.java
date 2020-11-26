package com.dsbath.admin.model.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dsbath.admin.etc.constant.Constant;
import com.dsbath.admin.etc.util.ResponseUtil;
import com.dsbath.admin.model.TileCode;
import com.dsbath.admin.model.dto.PagingDTO;
import com.dsbath.admin.model.mapper.TileCodeMapper;
import com.dsbath.admin.model.service.TileCodeService;

@Service
public class TileCodeServiceImpl implements TileCodeService {

	@Autowired
	private TileCodeMapper tileCodeMapper;
	
	/**
	 * 타일 코드 목록
	 * 
	 */
	@Override
	public Map<String, Object> select(PagingDTO<TileCode> pagingDTO) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			resultMap.put("list"		, tileCodeMapper.select(pagingDTO));
			resultMap.put("totalCount"	, tileCodeMapper.selectOfTotalCount(pagingDTO));
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
		}
		
		return resultMap;
	}
	
	/**
	 * 타일 코드 상세
	 * 
	 */
	@Override
	public Map<String, Object> detail(TileCode tileCode) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			resultMap.put("detail", tileCodeMapper.detail(tileCode));
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
		}
		
		return resultMap;
	}
	
	/**
	 * 타일 코드 등록, 수정, 삭제
	 * 
	 */
	@Override
	public Map<String, Object> merge(TileCode tileCode, String type) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			Integer resultCount = 0;
			
			// >> 등록
			if (type.equals(Constant.MERGE_TYPE_INSERT)) {
				resultCount = tileCodeMapper.insert(tileCode);
				
			// >> 수정
			} else if (type.equals(Constant.MERGE_TYPE_UPDATE)) {
				resultCount = tileCodeMapper.update(tileCode);
				
			// >> 삭제
			} else if (type.equals(Constant.MERGE_TYPE_DELETE)) {
				resultCount = tileCodeMapper.delete(tileCode);
			}
			
			resultMap.put("resultCount", resultCount);
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
		}
		
		return resultMap;
	}
	
	/**
	 * 타일 코드 목록 (욕실디자인 코드검색)
	 * 
	 */
	@Override
	public Map<String, Object> selectOfBathDesign(TileCode tileCode) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			resultMap.put("list", tileCodeMapper.selectOfBathDesign(tileCode));
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
		}
		
		return resultMap;
	}
}
