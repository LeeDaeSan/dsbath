package com.dsbath.admin.model;

import java.util.Date;

import lombok.Data;

/**
 * 시공후기 Table
 * 
 * @author idaesan
 *
 */
@Data
public class ConstructEpilogue {

	private Integer constructEpilogueIdx;
	private Integer memberIdx;
	private String title;
	private String content;
	private String thumbnail;
	private Integer hit;
	private Date createDate;
	private Date updateDate;
	
	private String createDateStr;
	private String updateDateStr;
	
	private Member member;
}
