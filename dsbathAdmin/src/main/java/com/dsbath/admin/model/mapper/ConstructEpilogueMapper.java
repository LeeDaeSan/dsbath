package com.dsbath.admin.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.dsbath.admin.model.ConstructEpilogue;
import com.dsbath.admin.model.dto.PagingDTO;

/**
 * 시공후기 Mapper
 * 
 * @author idaesan
 *
 */
@Mapper
public interface ConstructEpilogueMapper {

	/**
	 * 시공후기 목록
	 * 
	 * @param pagingDTO
	 * @return
	 */
	public List<ConstructEpilogue> select(PagingDTO<ConstructEpilogue> pagingDTO);
	
	/**
	 * 시공후기 목록 Total Count
	 * 
	 * @param pagingDTO
	 * @return
	 */
	public Long selectOfTotalCount(PagingDTO<ConstructEpilogue> pagingDTO);
}
