package com.dsbath.admin.model;

import java.util.Date;

import lombok.Data;

/**
 * 타일 디자인 코드 Table
 * 
 * @author idaesan
 *
 */
@Data
public class TileCode {

	private Integer tileCodeIdx;
	private String image;
	private String tileName;
	private String tileCode;
	private Date createDate;
	private Date updateDate;
	
	private String createDateStr;
	private String updateDateStr;
}
