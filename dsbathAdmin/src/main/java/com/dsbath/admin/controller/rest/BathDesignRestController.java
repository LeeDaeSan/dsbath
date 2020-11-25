package com.dsbath.admin.controller.rest;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dsbath.admin.model.BathDesign;
import com.dsbath.admin.model.dto.PagingDTO;
import com.dsbath.admin.model.service.BathDesignService;

/**
 * 욕실디자인 Rest Controller
 * 
 * @author idaesan
 *
 */
@RestController
@RequestMapping("/bathDesign/rest")
public class BathDesignRestController {

	@Autowired
	private BathDesignService bathDesignService;
	
	/**
	 * 욕실디자인 목록
	 * 
	 * @param pagingDTO
	 * @param bathDesign
	 * @return
	 */
	@PostMapping("/select")
	public Map<String, Object> select(PagingDTO<BathDesign> pagingDTO, BathDesign bathDesign) {
		pagingDTO.setModel(bathDesign);
		return bathDesignService.select(pagingDTO);
	}
	
	/**
	 * 욕실디자인 상세
	 * 
	 * @param bathDesign
	 * @return
	 */
	@PostMapping("/detail")
	public Map<String, Object> detail(BathDesign bathDesign) {
		return bathDesignService.detail(bathDesign);
	}
	
	/**
	 * 욕실디자인 등록, 수정, 삭제
	 * 
	 * @param bathDesign
	 * @param type
	 * @return
	 */
	@PostMapping("/merge")
	public Map<String, Object> merge (BathDesign bathDesign, @RequestParam(value = "type") String type) {
		return bathDesignService.merge(bathDesign, type);
	}
}
