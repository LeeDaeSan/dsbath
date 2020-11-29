package com.dsbath.admin.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.dsbath.admin.model.TileCodeMapping;

/**
 * 타일 코드 맵핑 Mapper
 * 
 * @author idaesan
 *
 */
@Mapper
public interface TileCodeMappingMapper {

	/**
	 * 타일 코드 맵핑 등록
	 * 
	 * @param tileCodeMapping
	 * @return
	 */
	public Integer insert(TileCodeMapping tileCodeMapping);
	
	/**
	 * 타일 코드 맵핑 삭제
	 * 
	 * @param tileCodeMapping
	 * @return
	 */
	public Integer delete(TileCodeMapping tileCodeMapping);
}
