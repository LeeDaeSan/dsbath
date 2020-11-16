package com.dsbath.admin.model;

import java.util.Date;
import java.util.List;

import lombok.Data;

/**
 * 시공사례 정보 Table
 * 
 * @author idaesan
 *
 */
@Data
public class ConstructInstance {

	private Integer constructInstanceIdx;
	private Integer adminIdx;
	private String title;
	private String content;
	private Integer hit;
	private String thumbnail;
	private Date createDate;
	private Date updateDate;
	
	private Admin admin;
	
	private List<CommonFile> commonFileList;
}
