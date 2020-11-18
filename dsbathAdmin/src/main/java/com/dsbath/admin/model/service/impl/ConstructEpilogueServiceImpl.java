package com.dsbath.admin.model.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dsbath.admin.etc.util.ResponseUtil;
import com.dsbath.admin.model.ConstructEpilogue;
import com.dsbath.admin.model.dto.PagingDTO;
import com.dsbath.admin.model.mapper.ConstructEpilogueMapper;
import com.dsbath.admin.model.service.ConstructEpilogueService;

@Service
public class ConstructEpilogueServiceImpl implements ConstructEpilogueService {

	@Autowired
	private ConstructEpilogueMapper constructEpilogueMapper;
	
	/**
	 * 시공후기 목록
	 */
	@Override
	public Map<String, Object> select(PagingDTO<ConstructEpilogue> pagingDTO) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			resultMap.put("list"		, constructEpilogueMapper.select(pagingDTO));
			resultMap.put("totalCount"	, constructEpilogueMapper.selectOfTotalCount(pagingDTO));
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
			e.printStackTrace();
		}
		
		return resultMap;
	}
}
