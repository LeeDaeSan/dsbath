package com.dsbath.admin.controller.rest;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dsbath.admin.model.ConstructEpilogue;
import com.dsbath.admin.model.dto.PagingDTO;
import com.dsbath.admin.model.service.ConstructEpilogueService;

/**
 * 시공후기 Rest Controller
 * 
 * @author idaesan
 *
 */
@RestController
@RequestMapping("/epilogue/rest")
public class ConstructEpilogueRestController {

	@Autowired
	private ConstructEpilogueService constructEpilogueService;
	
	/**
	 * 시공후기 목록
	 * 
	 * @param pagingDTO
	 * @param constructEpilogue
	 * @return
	 */
	@PostMapping("/select")
	public Map<String, Object> select(PagingDTO<ConstructEpilogue> pagingDTO, ConstructEpilogue constructEpilogue) {
		pagingDTO.setModel(constructEpilogue);
		return constructEpilogueService.select(pagingDTO);
	}
}
