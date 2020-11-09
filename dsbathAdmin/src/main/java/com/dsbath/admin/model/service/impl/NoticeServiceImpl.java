package com.dsbath.admin.model.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dsbath.admin.etc.constant.Constant;
import com.dsbath.admin.etc.constant.UserConstant;
import com.dsbath.admin.etc.util.DateUtil;
import com.dsbath.admin.etc.util.ResponseUtil;
import com.dsbath.admin.etc.util.StringUtil;
import com.dsbath.admin.model.Notice;
import com.dsbath.admin.model.dto.PagingDTO;
import com.dsbath.admin.model.mapper.NoticeMapper;
import com.dsbath.admin.model.service.NoticeService;

@Service
public class NoticeServiceImpl implements NoticeService {
	
	@Autowired
	private NoticeMapper noticeMapper;
	
	/**
	 * 공지사항 목록 조회
	 * 
	 */
	@Override
	public Map<String, Object> select(PagingDTO<Notice> pagingDTO) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			resultMap.put("list"		, noticeMapper.select(pagingDTO));
			resultMap.put("totalCount"	, noticeMapper.selectOfTotalCount(pagingDTO));
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
			e.printStackTrace();
		}
		
		return resultMap;
	}
	
	/**
	 * 공지사항 상세
	 * 
	 */
	@Override
	public Map<String, Object> detail(Notice notice) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			resultMap.put("detail", noticeMapper.detail(notice));
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
		}
		
		return resultMap;
	}

	/**
	 * 공지사항 등록, 수정, 삭제 
	 * 
	 */
	@Override
	public Map<String, Object> merge(Notice notice, String type) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			Integer loginIdx = UserConstant.getUser().getIdx();
			
			Integer resultCount = 0;
			
			// 등록
			if (type.equals(Constant.MERGE_TYPE_INSERT)) {
				
				notice.setAdminIdx(loginIdx);
				
				// 팝업 시작일
				String popupStartDateStr = notice.getPopupStartDateStr();
				if (StringUtil.isNotEmpty(popupStartDateStr)) {
					notice.setPopupStartDate(
							DateUtil.stringToDate(popupStartDateStr, "yyyyMMdd"));
				}
				// 팝업 종료일
				String popupEndDateStr = notice.getPopupEndDateStr();
				if (StringUtil.isNotEmpty(popupEndDateStr)) {
					notice.setPopupEndDate(
							DateUtil.stringToDate(popupEndDateStr, "yyyyMMdd"));
				}
				
				resultCount = noticeMapper.insert(notice);
				
			// 수정
			} else if (type.equals(Constant.MERGE_TYPE_UPDATE)) {
				
				// 팝업 시작일
				String popupStartDateStr = notice.getPopupStartDateStr();
				if (StringUtil.isNotEmpty(popupStartDateStr)) {
					notice.setPopupStartDate(
							DateUtil.stringToDate(popupStartDateStr, "yyyyMMdd"));
				}
				// 팝업 종료일
				String popupEndDateStr = notice.getPopupEndDateStr();
				if (StringUtil.isNotEmpty(popupEndDateStr)) {
					notice.setPopupEndDate(
							DateUtil.stringToDate(popupEndDateStr, "yyyyMMdd"));
				}
				
				resultCount = noticeMapper.update(notice);
				
			// 삭제
			} else if (type.equals(Constant.MERGE_TYPE_DELETE)) {
				resultCount = noticeMapper.delete(notice);
			}
			
			resultMap.put("resultCount", resultCount);
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
		}
		
		return resultMap;
	}
}
