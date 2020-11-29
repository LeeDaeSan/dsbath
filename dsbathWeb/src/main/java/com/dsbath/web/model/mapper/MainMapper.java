package com.dsbath.web.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.dsbath.web.model.BathDesign;
import com.dsbath.web.model.ConstructEpilogue;
import com.dsbath.web.model.ConstructInstance;
import com.dsbath.web.model.Notice;

/**
 * 메인 화면 Mapper
 * 
 * @author idaesan
 *
 */
@Mapper
public interface MainMapper {

	/**
	 * 시공사례 목록 조회
	 * 
	 * @param constructInstance
	 * @return
	 */
	public List<ConstructInstance> selectOfConstructInstance(ConstructInstance constructInstance);
	
	/**
	 * 공지사항 목록 조회
	 * 
	 * @param notice
	 * @return
	 */
	public List<Notice> selectOfNotice();
	
	/**
	 * 시공후기 목록 조회
	 * 
	 * @return
	 */
	public List<ConstructEpilogue> selectOfConstructEpilogue();
	
	/**
	 * 욕실디자인 목록 조회
	 * 
	 * @return
	 */
	public List<BathDesign> selectOfBathDesign();
}
