package com.dsbath.admin.model;

import java.util.Date;
import java.util.List;

import lombok.Data;

/**
 * 게시판 Table
 * 
 * @author idaesan
 *
 */
@Data
public class Board {

	private Integer boardIdx;
	private Integer boardManagerIdx;
	private Integer adminIdx;
	private Integer memberIdx;
	private String thumbnail;
	private String title;
	private String content;
	private Integer hit;
	private String isImport;
	private Date createDate;
	private Date updateDate;
	
	// 게시판 관리	
	private BoardManager boardManager;
	// 게시판 답변
	private BoardAnswer boardAnswer;
	// 게시판 댓글 목록
	private List<BoardComment> boardCommentList;
	// 관리자
	private Admin admin;
	// 사용자
	private Member member;
}
