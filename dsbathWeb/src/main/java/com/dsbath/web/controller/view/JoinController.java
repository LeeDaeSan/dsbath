package com.dsbath.web.controller.view;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.dsbath.web.etc.constant.Constant;

@Controller
public class JoinController {

	/*
	@RequestMapping("/" + Constant.VIEWS + "/join/join02")
	public String join02 (
			@RequestParam(value = "check01", required = false) String check01, 
			@RequestParam(value = "check02", required = false) String check02) {
		
		if (Constant.JOIN_CHECK_01.equals(check01) && Constant.JOIN_CHECK_02.equals(check02)) {
			return Constant.VIEWS + "/join/join02";
		} else {
			return Constant.VIEWS + "/join/join01";
		}
	}
	*/
}
