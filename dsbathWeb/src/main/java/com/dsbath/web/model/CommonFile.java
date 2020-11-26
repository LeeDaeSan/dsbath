package com.dsbath.web.model;

import java.util.Date;

import lombok.Data;

/**
 * 공통 파일 정보 Table
 * 
 * @author idaesan
 *
 */
@Data
public class CommonFile {

	private Integer commonFileIdx;
	private String url;
	private String fileName;
	private String isMain;
	private String fileType;
	private Date createDate;
}
