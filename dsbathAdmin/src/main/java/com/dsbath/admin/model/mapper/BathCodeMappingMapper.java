package com.dsbath.admin.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.dsbath.admin.model.BathCodeMapping;

/**
 * 욕실 코드 맵핑 Mapper
 * 
 * @author idaesan
 *
 */
@Mapper
public interface BathCodeMappingMapper {

	/**
	 * 욕실 코드 맵핑 등록
	 * 
	 * @param bathCodeMapping
	 * @return
	 */
	public Integer insert(BathCodeMapping bathCodeMapping);
	
	/**
	 * 욕실 코드 맵핑 삭제
	 * 
	 * @param bathCodeMapping
	 * @return
	 */
	public Integer delete(BathCodeMapping bathCodeMapping);
}
