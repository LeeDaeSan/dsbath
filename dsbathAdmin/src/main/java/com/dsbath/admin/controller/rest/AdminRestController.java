package com.dsbath.admin.controller.rest;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dsbath.admin.model.Admin;
import com.dsbath.admin.model.dto.PagingDTO;
import com.dsbath.admin.model.service.AdminService;

/**
 * 관리자 관리 Rest Controller
 * 
 * @author idaesan
 *
 */
@RestController
@RequestMapping("/admin/rest")
public class AdminRestController {
	
	@Autowired
	private AdminService adminService;
	
	/**
	 * 관리자 아이디 중복확인 Rest Controller
	 * 
	 * @param admin
	 * @return
	 */
	@PostMapping("/adminIdChecked")
	public Map<String, Object> adminIdChecked (Admin admin) {
		return adminService.adminIdChecked(admin);
	}
	
	/**
	 * 관리자 정보 등록, 수정, 삭제 Rest Controller
	 * 
	 * @param admin
	 * @param type
	 * @return
	 */
	@PostMapping("/merge")
	public Map<String, Object> merge (Admin admin, @RequestParam(value = "type") String type) {
		return adminService.merge(admin, type);
	}
	
	/**
	 * 관리자 상세 조회 Rest Controller
	 * 
	 * @param admin
	 * @return
	 */
	@PostMapping("/detail")
	public Map<String, Object> detail (Admin admin) {
		return adminService.detail(admin);
	}
	
	/**
	 * 관리자 목록 조회 Rest Controller
	 * 
	 * @param admin
	 * @return
	 */
	@PostMapping("/select")
	public Map<String, Object> select (PagingDTO<Admin> pagingDTO, Admin admin) {
		pagingDTO.setModel(admin);
		return adminService.select(pagingDTO);
	}
}
