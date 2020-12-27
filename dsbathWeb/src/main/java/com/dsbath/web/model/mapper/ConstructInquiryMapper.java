package com.dsbath.web.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.dsbath.web.model.ConstructInquiry;
import com.dsbath.web.model.dto.PagingDTO;

/**
 * 견적 및 시공 문의 Mapper
 * 
 * @author idaesan
 *
 */
@Mapper
public interface ConstructInquiryMapper {

	/**
	 * 견적 및 시공 문의 목록
	 * 
	 * @param pagingDTO
	 * @return
	 */
	public List<ConstructInquiry> select(PagingDTO<ConstructInquiry> pagingDTO);
	
	/**
	 * 견적 및 시공 문의 목록 Total Count
	 * 
	 * @param pagingDTO
	 * @return
	 */
	public Long selectOfTotalCount(PagingDTO<ConstructInquiry> pagingDTO);
	
	/**
	 * 견적 및 시공 문의 상세
	 * 
	 * @param constructInquiry
	 * @return
	 */
	public ConstructInquiry detail(ConstructInquiry constructInquiry);
	
	/**
	 * 견적 및 시공 문의 등록
	 * 
	 * @param constructInquiry
	 * @return
	 */
	public Integer insert(ConstructInquiry constructInquiry);
	
	/**
	 * 견적 및 시공 문의 조회수 증가
	 * 
	 * @param constructInquiry
	 * @return
	 */
	public Integer updateOfHit(ConstructInquiry constructInquiry);
}
