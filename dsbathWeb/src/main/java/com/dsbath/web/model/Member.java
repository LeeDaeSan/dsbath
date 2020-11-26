package com.dsbath.web.model;

import java.util.Date;

import lombok.Data;

/**
 * 회원 정보 Table
 * 
 * @author idaesan
 */
@Data
public class Member {
	
	private Integer memberIdx;
	private String memberName;
	private String memberId;
	private String password;
	private String zipCode;
	private String address;
	private String addressDetail;
	private String isDelete;
	private Date createDate;
	private Date updateDate;
	
	private String createDateStr;
	private String updateDateStr;
}
