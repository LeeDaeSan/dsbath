package com.dsbath.web.controller.view;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.dsbath.web.etc.constant.Constant;

@Controller
public class ViewController {

	/**
	 * notiles views
	 * @param path1
	 * @return
	 */
	@GetMapping("/" + Constant.NOTILES + "/{path1}")
	public String notiles (@PathVariable String path1) {
		return Constant.NOTILES + "/" + path1;
	}
	
	@GetMapping("/")
	public String index () {
		return Constant.VIEWS + "/main";
	}
	
	@GetMapping("/" + Constant.VIEWS + "/{path1}")
	public String view (@PathVariable String path1) {
		return Constant.VIEWS + "/" + path1;
	}
	
	@GetMapping("/" + Constant.VIEWS + "/{path1}/{path2}")
	public String view (@PathVariable String path1, @PathVariable String path2) {
		return Constant.VIEWS + "/" + path1 + "/" + path2;
	}
	
	@GetMapping("/" + Constant.VIEWS + "/{path1}/{path2}/{path3}")
	public String view (@PathVariable String path1, @PathVariable String path2, @PathVariable String path3) {
		return Constant.VIEWS + "/" + path1 + "/" + path2 + "/" + path3;
	}
	
	@GetMapping("/" + Constant.VIEWS + "/{path1}/{path2}/{path3}/{path4}")
	public String view (@PathVariable String path1, @PathVariable String path2, @PathVariable String path3, @PathVariable String path4) {
		return Constant.VIEWS + "/" + path1 + "/" + path2 + "/" + path3 + "/" + path4;
	}
}
