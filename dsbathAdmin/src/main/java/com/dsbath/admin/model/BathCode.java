package com.dsbath.admin.model;

import java.util.Date;

import lombok.Data;

/**
 * 욕실디자인 코드 Table
 * 
 * @author idaesan
 *
 */
@Data
public class BathCode {

	private Integer bathCodeIdx;
	private String codeName;
	private String codeType;
	private String image;
	private Date createDate;
	private Date updateDate;
}
