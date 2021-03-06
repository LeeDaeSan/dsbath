package com.dsbath.web.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.dsbath.web.model.Notice;
import com.dsbath.web.model.dto.PagingDTO;

/**
 * 공지사항 Mapper
 * 
 * @author idaesan
 *
 */
@Mapper
public interface NoticeMapper {

	/**
	 * 공지사항 목록 조회
	 * 
	 * @param pagingDTO
	 * @return
	 */
	public List<Notice> select(PagingDTO<Notice> pagingDTO);
	
	/**
	 * 공지사항 목록 Total Count
	 * 
	 * @param pagingDTO
	 * @return
	 */
	public Long selectOfTotalCount(PagingDTO<Notice> pagingDTO);
	
	/**
	 * 공지사항 상세
	 * 
	 * @param notice
	 * @return
	 */
	public Notice detail(Notice notice);
	
	/**
	 * 공지사항 등록
	 * 
	 * @param notice
	 * @return
	 */
	public Integer insert(Notice notice);
	
	/**
	 * 공지사항 수정
	 * 
	 * @param notice
	 * @return
	 */
	public Integer update(Notice notice);
	
	/**
	 * 공지사항 삭제
	 * 
	 * @param notice
	 * @return
	 */
	public Integer delete(Notice notice);
	
	/**
	 * 공지사항 조회수 증가
	 * 
	 * @param notice
	 * @return
	 */
	public Integer updateOfHit(Notice notice);
}
