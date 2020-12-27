package com.dsbath.web.model;

import java.util.Date;

import lombok.Data;

/**
 * FAQ Table
 * 
 * @author idaesan
 *
 */
@Data
public class Faq {

	private Integer faqIdx;
	private Integer adminIdx;
	private String question;
	private String comment;
	private Date createDate;
	private Date updateDate;
	
	private Admin admin;
}
