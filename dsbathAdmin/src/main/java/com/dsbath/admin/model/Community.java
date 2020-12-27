package com.dsbath.admin.model;

import java.util.Date;

import lombok.Data;

/**
 * 커뮤니티 Table
 * 
 * @author idaesan
 *
 */
@Data
public class Community {

	private Integer communityIdx;
	private Integer adminIdx;
	private String title;
	private String content;
	private String thumbnail;
	private Integer hit;
	private String communityType;
	private Date createDate;
	private Date updateDate;
	
	private Admin admin;
}
