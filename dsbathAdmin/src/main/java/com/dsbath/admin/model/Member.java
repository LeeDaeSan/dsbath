package com.dsbath.admin.model;

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
	private String address;
	private String isDelete;
	private Date createDate;
	private Date updateDate;
	
	private String createDateStr;
	private String updateDateStr;
}
