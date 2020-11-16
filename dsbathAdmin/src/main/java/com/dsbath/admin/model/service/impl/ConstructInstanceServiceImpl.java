package com.dsbath.admin.model.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dsbath.admin.etc.constant.Constant;
import com.dsbath.admin.etc.constant.UserConstant;
import com.dsbath.admin.etc.util.ResponseUtil;
import com.dsbath.admin.model.CommonFile;
import com.dsbath.admin.model.ConstructInstance;
import com.dsbath.admin.model.ConstructInstanceFileMapping;
import com.dsbath.admin.model.dto.CommonFileDTO;
import com.dsbath.admin.model.dto.PagingDTO;
import com.dsbath.admin.model.mapper.CommonFileMapper;
import com.dsbath.admin.model.mapper.ConstructInstanceFileMappingMapper;
import com.dsbath.admin.model.mapper.ConstructInstanceMapper;
import com.dsbath.admin.model.service.ConstructInstanceService;

@Service
public class ConstructInstanceServiceImpl implements ConstructInstanceService {
	
	@Autowired
	private ConstructInstanceMapper constructInstanceMapper;
	
	@Autowired
	private CommonFileMapper commonFileMapper;
	
	@Autowired
	private ConstructInstanceFileMappingMapper constructInstanceFileMappingMapper;
	
	/**
	 * 시공사례 정보 목록 조회
	 * 
	 */
	@Override
	public Map<String, Object> select(PagingDTO<ConstructInstance> pagingDTO) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			resultMap.put("list"		, constructInstanceMapper.select(pagingDTO));
			resultMap.put("totalCount"	, constructInstanceMapper.selectOfTotalCount(pagingDTO));
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
		}
		
		return resultMap;
	}

	/**
	 * 시공사례 상세
	 * 
	 */
	@Override
	public Map<String, Object> detail(ConstructInstance constructInstance) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			resultMap.put("detail", constructInstanceMapper.detail(constructInstance));
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
			e.printStackTrace();
		}
		return resultMap;
	}
	
	/**
	 * 시공사례 등록, 수정, 삭제
	 * 
	 */
	@Override
	@Transactional
	public Map<String, Object> merge(ConstructInstance constructInstance, CommonFileDTO commonFileDTO, String type) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			Integer loginIdx = UserConstant.getUser().getIdx();
			
			Integer resultCount = 0;
			
			// 등록, 수정 로그인 PK 셋팅
			if (type.equals(Constant.MERGE_TYPE_INSERT) || type.equals(Constant.MERGE_TYPE_UPDATE)) {
				constructInstance.setAdminIdx(loginIdx);
			}
			
			// >> 등록 INSERT
			if (type.equals(Constant.MERGE_TYPE_INSERT)) {
				resultCount = constructInstanceMapper.insert(constructInstance);
				
			// >> 수정 UPDATE
			} else if (type.equals(Constant.MERGE_TYPE_UPDATE)) {
				resultCount = constructInstanceMapper.update(constructInstance);
				
			// >> 삭제 DELETE
			} else if (type.equals(Constant.MERGE_TYPE_DELETE)) {
				resultCount = constructInstanceMapper.delete(constructInstance);
			}
			
			resultMap.put("resultCount", resultCount);
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
			e.printStackTrace();
		}
		
		return resultMap;
	}
}
