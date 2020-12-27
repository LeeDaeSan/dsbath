package com.dsbath.web.model;

import java.util.Date;

import lombok.Data;

/**
 * 견적 및 시공 문의 Table
 * 
 * @author idaesan
 *
 */
@Data
public class ConstructInquiry {

	private Integer inquiryIdx;
	private Integer memberIdx;
	private String title;
	private String content;
	private Integer hit;
	private Date createDate;
	
	private Integer adminIdx;
	private String answerTitle;
	private String answerContent;
	private Date answerDate;
	
	private Member member;
	private Admin admin;
}
