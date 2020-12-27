package com.dsbath.web.controller.rest;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dsbath.web.model.Faq;
import com.dsbath.web.model.dto.PagingDTO;
import com.dsbath.web.model.service.FaqService;

/**
 * FAQ Rest Controller
 * 
 * @author idaesan
 *
 */
@RestController
@RequestMapping("/faq/rest")
public class FaqRestController {

	@Autowired
	private FaqService faqService;
	
	/**
	 * FAQ 목록
	 * 
	 * @param pagingDTO
	 * @param faq
	 * @return
	 */
	@PostMapping("/select")
	public Map<String, Object> select (PagingDTO<Faq> pagingDTO, Faq faq) {
		pagingDTO.setModel(faq);
		return faqService.select(pagingDTO);
	}
	
	/**
	 * FAQ 상세
	 * 
	 * @param faq
	 * @return
	 */
	@PostMapping("/detail")
	public Map<String, Object> detail (Faq faq) {
		return faqService.detail(faq);
	}
	
	/**
	 * FAQ 등록, 수정, 삭제
	 * 
	 * @param faq
	 * @param type
	 * @return
	 */
	@PostMapping("/merge")
	public Map<String, Object> merge (Faq faq, @RequestParam(value = "type") String type) {
		return faqService.merge(faq, type);
	}
}
