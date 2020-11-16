package com.dsbath.admin.controller.rest;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dsbath.admin.model.ConstructInstance;
import com.dsbath.admin.model.dto.CommonFileDTO;
import com.dsbath.admin.model.dto.PagingDTO;
import com.dsbath.admin.model.service.ConstructInstanceService;

/**
 * 시공사례 정보 Rest Controller
 * 
 * @author idaesan
 *
 */
@RestController
@RequestMapping("/instance/rest")
public class ConstructInstanceRestController {

	@Autowired
	private ConstructInstanceService constructInstanceService;
	
	/**
	 * 시공사례 정보 목록 조회
	 * 
	 * @param pagingDTO
	 * @param constructInstance
	 * @return
	 */
	@PostMapping("/select")
	public Map<String, Object> select (PagingDTO<ConstructInstance> pagingDTO, ConstructInstance constructInstance) {
		pagingDTO.setModel(constructInstance);
		return constructInstanceService.select(pagingDTO);
	}
	
	/**
	 * 시공사례 상세
	 * 
	 * @param constructInstance
	 * @return
	 */
	@PostMapping("/detail")
	public Map<String, Object> detail (ConstructInstance constructInstance) {
		return constructInstanceService.detail(constructInstance);
	}
	
	/**
	 * 시공사례 등록, 수정, 삭제
	 * 
	 * @param constructInstance
	 * @param type
	 * @return
	 */
	@PostMapping("/merge")
	public Map<String, Object> merge (
			ConstructInstance constructInstance,
			CommonFileDTO commonFileDTO,
			@RequestParam(value = "type") String type) {
		
		return constructInstanceService.merge(constructInstance, commonFileDTO, type);
	}
}
