package com.dsbath.admin.model;

import java.util.Date;

import lombok.Data;

/**
 * 게시판 댓글 Table
 * 
 * @author idaesan
 *
 */
@Data
public class BoardComment {

	private Integer boardCommentIdx;
	private Integer boardIdx;
	private Integer adminIdx;
	private Integer memberIdx;
	private Integer parentIdx;
	private String comment;
	private Date createDate;
	private Date updateDate;
	
	private Admin admin;
	private Member member;
	
	private Long commentCount;
}
