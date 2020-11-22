package com.dsbath.admin.controller.rest;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dsbath.admin.model.TileCode;
import com.dsbath.admin.model.dto.PagingDTO;
import com.dsbath.admin.model.service.TileCodeService;

/**
 * 타일 코드 Rest Controller
 * 
 * @author idaesan
 *
 */
@RestController
@RequestMapping("/tileCode/rest")
public class TileCodeRestController {

	@Autowired
	private TileCodeService tileCodeService;
	
	/**
	 * 타일 코드 목록
	 * 
	 * @param pagingDTO
	 * @param tileCode
	 * @return
	 */
	@PostMapping("/select")
	public Map<String, Object> select (PagingDTO<TileCode> pagingDTO, TileCode tileCode) {
		pagingDTO.setModel(tileCode);
		return tileCodeService.select(pagingDTO);
	}
	
	/**
	 * 타일 코드 등록, 수정, 삭제
	 * 
	 * @param tileCode
	 * @param type
	 * @return
	 */
	@PostMapping("/merge")
	public Map<String, Object> merge (TileCode tileCode, @RequestParam(value = "type") String type) {
		return tileCodeService.merge(tileCode, type);
	}
}
