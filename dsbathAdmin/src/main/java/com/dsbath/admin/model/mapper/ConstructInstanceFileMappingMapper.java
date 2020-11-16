package com.dsbath.admin.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.dsbath.admin.model.ConstructInstanceFileMapping;

/**
 * 시공사례 공통파일 맵핑 Mapper
 * 
 * @author idaesan
 *
 */
@Mapper
public interface ConstructInstanceFileMappingMapper {

	/**
	 * 시공사례 공통파일 맵핑 등록
	 * 
	 * @param constructinstanceFileMapping
	 * @return
	 */
	public Integer insert(ConstructInstanceFileMapping constructInstanceFileMapping);
	
	/**
	 * 시공사례 공통파일 맵핑 삭제
	 * 
	 * @param constructInstanceIdx
	 * @return
	 */
	public Integer delete(Integer constructInstanceIdx);
}
