package com.dsbath.web.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.dsbath.web.model.Faq;
import com.dsbath.web.model.dto.PagingDTO;

/**
 * FAQ Mapper
 * 
 * @author idaesan
 *
 */
@Mapper
public interface FaqMapper {

	/**
	 * FAQ 목록
	 * 
	 * @param pagingDTO
	 * @return
	 */
	public List<Faq> select(PagingDTO<Faq> pagingDTO);
	
	/**
	 * FAQ 목록 Total Count
	 * 
	 * @param pagingDTO
	 * @return
	 */
	public Long selectOfTotalCount(PagingDTO<Faq> pagingDTO);
	
	/**
	 * FAQ 상세
	 * 
	 * @param faq
	 * @return
	 */
	public Faq detail(Faq faq);
	
	/**
	 * FAQ 등록
	 * 
	 * @param faq
	 * @return
	 */
	public Integer insert(Faq faq);
	
	/**
	 * FAQ 수정
	 * 
	 * @param faq
	 * @return
	 */
	public Integer update(Faq faq);
	
	/**
	 * FAQ 삭제
	 * 
	 * @param faq
	 * @return
	 */
	public Integer delete(Faq faq);
}
