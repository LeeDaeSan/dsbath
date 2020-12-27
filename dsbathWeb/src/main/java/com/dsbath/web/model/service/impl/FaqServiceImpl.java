package com.dsbath.web.model.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dsbath.web.etc.constant.Constant;
import com.dsbath.web.etc.constant.UserConstant;
import com.dsbath.web.etc.util.ResponseUtil;
import com.dsbath.web.model.Faq;
import com.dsbath.web.model.dto.PagingDTO;
import com.dsbath.web.model.mapper.FaqMapper;
import com.dsbath.web.model.service.FaqService;

@Service
public class FaqServiceImpl implements FaqService {

	@Autowired
	private FaqMapper faqMapper;
	
	/**
	 * FAQ 목록
	 * 
	 */
	@Override
	public Map<String, Object> select(PagingDTO<Faq> pagingDTO) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			resultMap.put("list"		, faqMapper.select(pagingDTO));
			resultMap.put("totalCount"	, faqMapper.selectOfTotalCount(pagingDTO));
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
			e.printStackTrace();
		}
		
		return resultMap;
	}
	
	/**
	 * FAQ 상세
	 */
	@Override
	public Map<String, Object> detail(Faq faq) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			resultMap.put("detail", faqMapper.detail(faq));
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
		}
		
		return resultMap;
	}
	
	/**
	 * FAQ 등록, 수정, 삭제
	 * 
	 */
	@Override
	public Map<String, Object> merge(Faq faq, String type) {
		Map<String, Object> resultMap = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			Integer loginIdx = UserConstant.getUser().getIdx();
			
			Integer resultCount = 0;
			
			// >> 등록
			if (type.equals(Constant.MERGE_TYPE_INSERT)) {
				faq.setAdminIdx(loginIdx);
				resultCount = faqMapper.insert(faq);
				
			// >> 수정
			} else if (type.equals(Constant.MERGE_TYPE_UPDATE)) {
				resultCount = faqMapper.update(faq);
				
			// >> 삭제
			} else if (type.equals(Constant.MERGE_TYPE_DELETE)) {
				resultCount = faqMapper.delete(faq);
			}
			
			resultMap.put("resultCount", resultCount);
			
		} catch (Exception e) {
			resultMap = ResponseUtil.failureMap();
		}
		
		return resultMap;
	}
	
}
