package com.dsbath.admin.model;

import java.util.Date;

import lombok.Data;

/**
 * 게시판 답변 Table
 * 
 * @author idaesan
 *
 */
@Data
public class BoardAnswer {

	private Integer boardAnswerIdx;
	private Integer boardIdx;
	private Integer adminIdx;
	private String answerTitle;
	private String answerContent;
	private Date createDate;
	private Date updateDate;
	
	// 관리자
	private Admin admin;
}
