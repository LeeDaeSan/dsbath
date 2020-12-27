package com.dsbath.web.controller.rest;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dsbath.web.model.ConstructInquiry;
import com.dsbath.web.model.dto.PagingDTO;
import com.dsbath.web.model.service.ConstructInquiryService;

/**
 * 견적 및 시공 문의 Rest Controller
 * 
 * @author idaesan
 *
 */
@RestController
@RequestMapping("/inquiry/rest")
public class ConstructInquiryRestController {

	@Autowired
	private ConstructInquiryService constructInquiryService;
	
	
	/**
	 * 견적 및 시공 문의 목록
	 * 
	 * @param pagingDTO
	 * @param constructInquiry
	 * @return
	 */
	@PostMapping("/select")
	public Map<String, Object> select (PagingDTO<ConstructInquiry> pagingDTO, ConstructInquiry constructInquiry) {
		pagingDTO.setModel(constructInquiry);
		return constructInquiryService.select(pagingDTO);
	}
	
	/**
	 * 견적 및 시공 문의 상세
	 * 
	 * @param constructInquiry
	 * @return
	 */
	@PostMapping("/detail")
	public Map<String, Object> detail (ConstructInquiry constructInquiry) {
		return constructInquiryService.detail(constructInquiry);
	}
	
	/**
	 * 견적 및 시공 문의 등록, 수정, 삭제
	 * 
	 * @param constructInquiry
	 * @param type
	 * @return
	 */
	@PostMapping("/merge")
	public Map<String, Object> merge (ConstructInquiry constructInquiry, @RequestParam(value = "type") String type) {
		return constructInquiryService.merge(constructInquiry, type);
	}
}
