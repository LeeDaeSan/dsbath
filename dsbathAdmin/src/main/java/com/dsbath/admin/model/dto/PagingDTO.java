package com.dsbath.admin.model.dto;

import lombok.Data;

@Data
public class PagingDTO <T> {

	private Long totalCount;
	private Integer page = 0;
	private Long limit;
	
	private String sort;
	private String sortType;
	
	private String startDateStr;
	private String endDateStr;
	
	private T model;
}
