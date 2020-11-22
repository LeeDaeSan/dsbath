package com.dsbath.web.controller.rest;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dsbath.web.model.ConstructInstance;
import com.dsbath.web.model.service.MainService;

/**
 * 메인 Rest Controller
 * 
 * @author idaesan
 *
 */
@RestController
@RequestMapping("/main/rest")
public class MainRestController {

	@Autowired
	private MainService mainService;
	
	/**
	 * 시공사례 목록
	 * 
	 * @param constructInstance
	 * @return
	 */
	@RequestMapping("/list")
	public Map<String, Object> mainList (ConstructInstance constructInstance) {
		return mainService.selectOfConstructInstanc(constructInstance);
	}
}
