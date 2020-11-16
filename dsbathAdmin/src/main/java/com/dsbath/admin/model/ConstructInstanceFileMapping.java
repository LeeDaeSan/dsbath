package com.dsbath.admin.model;

import lombok.Data;

/**
 * 시공사례 공통파일 mapping table
 * 
 * @author idaesan
 *
 */
@Data
public class ConstructInstanceFileMapping {

	private Integer fileMappingIdx;
	private Integer constructInstanceIdx;
	private Integer commonFileIdx;
}
