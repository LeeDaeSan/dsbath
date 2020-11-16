package com.dsbath.admin.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.dsbath.admin.model.CommonFile;

/**
 * 공통 파일 정보 Mapper
 * 
 * @author idaesan
 *
 */
@Mapper
public interface CommonFileMapper {

	/**
	 * 공통 파일 정보 등록
	 * 
	 * @param commonFile
	 * @return
	 */
	public Integer insert(CommonFile commonFile);
	
	/**
	 * 공통 파일 정보 삭제
	 * 
	 * @param constructInstanceIdx
	 * @return
	 */
	public Integer delete(Integer constructInstanceIdx);
}
