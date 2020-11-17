package com.dsbath.web.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.dsbath.web.model.ConstructInstance;

/**
 * 메인 화면 Mapper
 * 
 * @author idaesan
 *
 */
@Mapper
public interface MainMapper {

	/**
	 * 시공사례 목록 조회
	 * 
	 * @param constructInstance
	 * @return
	 */
	public List<ConstructInstance> selectOfConstructInstance(ConstructInstance constructInstance);
}
