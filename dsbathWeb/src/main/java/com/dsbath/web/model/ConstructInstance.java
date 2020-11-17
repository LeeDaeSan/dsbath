package com.dsbath.web.model;

import java.util.Date;

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
}
