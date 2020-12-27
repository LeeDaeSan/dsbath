package com.dsbath.admin.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.dsbath.admin.model.BathCode;
import com.dsbath.admin.model.dto.PagingDTO;

/**
 * 욕실디자인 코드 Mapper
 * 
 * @author idaesan
 *
 */
@Mapper
public interface BathCodeMapper {

	/**
	 * 코드 목록
	 * 
	 * @param pagingDTO
	 * @return
	 */
	public List<BathCode> select(PagingDTO<BathCode> pagingDTO);
	
	/**
	 * 코드 목록 Total Count
	 * 
	 * @param pagingDTO
	 * @return
	 */
	public Long selectOfTotalCount(PagingDTO<BathCode> pagingDTO);
	
	/**
	 * 코드 상세
	 * 
	 * @param bathCode
	 * @return
	 */
	public BathCode detail(BathCode bathCode);
	
	/**
	 * 코드 등록
	 * 
	 * @param bathCode
	 * @return
	 */
	public Integer insert(BathCode bathCode);
	
	/**
	 * 코드 수정
	 * 
	 * @param bathCode
	 * @return
	 */
	public Integer update(BathCode bathCode);
	
	/**
	 * 코드 삭제
	 * 
	 * @param bathCode
	 * @return
	 */
	public Integer delete(BathCode bathCode);
	
	/**
	 * 디자인 코드 검색 (욕실디자인 코드 검색)
	 * 
	 * @param bathCode
	 * @return
	 */
	public List<BathCode> selectOfBathDesign(BathCode bathCode);
}
