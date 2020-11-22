package com.dsbath.web.model.service;

import java.util.Map;

import com.dsbath.web.model.ConstructInstance;

/**
 * 메인 Service
 * 
 * @author idaesan
 *
 */
public interface MainService {

	/**
	 * 시공사례 목록 조회
	 * 
	 * @param constructInstance
	 * @return
	 */
	public Map<String, Object> selectOfConstructInstanc(ConstructInstance constructInstance);
}
