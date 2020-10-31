package com.dsbath.admin.model;

import java.util.Date;

import lombok.Data;

/**
 * 공지사항 정보 Table
 * 
 * @author idaesan
 *
 */
@Data
public class Notice {

	private Integer noticeIdx;
	private Integer adminIdx;
	private String title;
	private String content;
	private Integer hit;
	private String isImport;
	private String isPopup;
	private String isComment;
	private Date popupStartDate;
	private Date popupEndDate;
	private Date createDate;
	private Date updateDate;
	
	private String popupStartDateStr;
	private String popupEndDateStr;
}
