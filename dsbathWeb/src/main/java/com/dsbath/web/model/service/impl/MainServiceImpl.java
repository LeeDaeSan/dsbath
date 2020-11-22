package com.dsbath.web.model.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dsbath.web.etc.util.ResponseUtil;
import com.dsbath.web.model.ConstructInstance;
import com.dsbath.web.model.mapper.MainMapper;
import com.dsbath.web.model.service.MainService;

@Service
public class MainServiceImpl implements MainService {
	
	@Autowired
	private MainMapper mainMapper;
	
	/**
	 * 시공사례 목록
	 * 
	 */
	@Override
	public Map<String, Object> selectOfConstructInstanc(ConstructInstance constructInstance) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			resultMap.put("instanceList", mainMapper.selectOfConstructInstance(constructInstance));
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
			e.printStackTrace();
		}
		
		return resultMap;
	}

}
