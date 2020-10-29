package com.dsbath.admin.model;

import java.util.Date;

import lombok.Data;

@Data
public class Admin {

	private Integer adminIdx;
	private String adminName;
	private String adminId;
	private String password;
	private String address;
	private String role;
	private Date createDate;
	private Date updateDate;
}
