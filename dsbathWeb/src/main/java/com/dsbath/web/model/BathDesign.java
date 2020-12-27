package com.dsbath.web.model;

import java.util.Date;
import java.util.List;

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
	private String thumbnail;
	private Integer hit;
	private String designType;
	private Date createDate;
	private Date updateDate;
	
	private String createDateStr;
	private String updateDateStr;
	
	private Admin admin;
	
	private List<BathCode> bathCodeList;
	
	private List<BathCodeMapping> tileCodeMappingList;
	private List<BathCodeMapping> prodCodeMappingList;
}
