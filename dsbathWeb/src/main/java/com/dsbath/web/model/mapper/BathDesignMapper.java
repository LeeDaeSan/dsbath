package com.dsbath.web.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.dsbath.web.model.BathDesign;
import com.dsbath.web.model.dto.PagingDTO;

/**
 * 욕실 디자인 Mapper
 * 
 * @author idaesan
 *
 */
@Mapper
public interface BathDesignMapper {

	/**
	 * 욕실디자인 목록
	 * 
	 * @param pagingDTO
	 * @return
	 */
	public List<BathDesign> select(PagingDTO<BathDesign> pagingDTO);
	
	/**
	 * 욕실디자인 상세
	 * 
	 * @param bathDesign
	 * @return
	 */
	public BathDesign detail(BathDesign bathDesign);
	
	/**
	 * 욕실디자인 목록 Total Count
	 * 
	 * @param pagingDTO
	 * @return
	 */
	public Long selectOfTotalCount(PagingDTO<BathDesign> pagingDTO);
	
	/**
	 * 옥실디자인 등록
	 * 
	 * @param bathDesign
	 * @return
	 */
	public Integer insert(BathDesign bathDesign);
	
	/**
	 * 욕실디자인 수정
	 * 
	 * @param bathDesign
	 * @return
	 */
	public Integer update(BathDesign bathDesign);
	
	/**
	 * 욕실디자인 삭제
	 * 
	 * @param bathDesign
	 * @return
	 */
	public Integer delete(BathDesign bathDesign);
	
	/**
	 * 욕실디자인 조회수 증가
	 * 
	 * @param bathDesign
	 * @return
	 */
	public Integer updateOfHit(BathDesign bathDesign);
}
