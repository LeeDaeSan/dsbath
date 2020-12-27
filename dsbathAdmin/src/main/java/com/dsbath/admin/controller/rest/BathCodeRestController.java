package com.dsbath.admin.controller.rest;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dsbath.admin.model.BathCode;
import com.dsbath.admin.model.dto.PagingDTO;
import com.dsbath.admin.model.service.BathCodeService;

/**
 * 욕실디자인 코드 Rest Controller
 * 
 * @author idaesan
 *
 */
@RestController
@RequestMapping("/bathCode/rest")
public class BathCodeRestController {

	@Autowired
	private BathCodeService bathCodeService;
	
	/**
	 * 욕실디자인 코드 목록
	 * 
	 * @param pagingDTO
	 * @param bathCode
	 * @return
	 */
	@PostMapping("/select") 
	public Map<String, Object> select (PagingDTO<BathCode> pagingDTO, BathCode bathCode) {
		pagingDTO.setModel(bathCode);
		return bathCodeService.select(pagingDTO);
	}
	
	/**
	 * 욕실디자인 코드 상세
	 * 
	 * @param bathCode
	 * @return
	 */
	@PostMapping("/detail")
	public Map<String, Object> detail (BathCode bathCode) {
		return bathCodeService.detail(bathCode);
	}
	
	/**
	 * 욕실디자인 코드 등록, 수정, 삭제
	 * 
	 * @param bathCode
	 * @param type
	 * @return
	 */
	@PostMapping("/merge")
	public Map<String, Object> merge (BathCode bathCode, @RequestParam(value = "type") String type) {
		return bathCodeService.merge(bathCode, type);
	}
	
	/**
	 * 디자인 코드 검색 (욕실디자인 코드 검색)
	 * 
	 * @param bathCode
	 * @return
	 */
	@PostMapping("/selectOfBathDesign")
	public Map<String, Object> selectOfBathDesign (BathCode bathCode) {
		return bathCodeService.selectOfBathDesign(bathCode);
	}
}
