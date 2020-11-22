package com.dsbath.admin.model;

import java.util.Date;

import lombok.Data;

/**
 * 욕실디자인 Table
 * 
 * @author idaesan
 *
 */
@Data
public class BathDesign {

	private Integer bathDesignIdx;
	private Integer adminIdx;
	private String title;
	private String content;
	private Integer hit;
	private String designType;
	private Date createDate;
	private Date updateDate;
	
	private String createDateStr;
	private String updateDateStr;
	
	private Admin admin;
}
