package com.dsbath.admin.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.dsbath.admin.model.ConstructInstance;
import com.dsbath.admin.model.dto.PagingDTO;

/**
 * 시공사례 정보 Mapper
 * 
 * @author idaesan
 *
 */
@Mapper
public interface ConstructInstanceMapper {

	/**
	 * 시공사례 목록 조회
	 * 
	 * @param pagingDTO
	 * @return
	 */
	public List<ConstructInstance> select(PagingDTO<ConstructInstance> pagingDTO);
	
	/**
	 * 시공사례 목록 Total Count
	 * 
	 * @param pagingDTO
	 * @return
	 */
	public Long selectOfTotalCount(PagingDTO<ConstructInstance> pagingDTO);
	
	/**
	 * 시공사례 상세
	 * 
	 * @param constructInstance
	 * @return
	 */
	public ConstructInstance detail(ConstructInstance constructInstance);
	
	/**
	 * 시공사례 등록
	 * 
	 * @param constructInstance
	 * @return
	 */
	public Integer insert(ConstructInstance constructInstance);
	
	/**
	 * 시공사례 수정
	 * 
	 * @param constructInstance
	 * @return
	 */
	public Integer update(ConstructInstance constructInstance);
	
	/**
	 * 시공사례 삭제
	 * 
	 * @param constructInstance
	 * @return
	 */
	public Integer delete(ConstructInstance constructInstance);
}
