package com.dsbath.admin.model;

import java.util.Date;
import java.util.List;

import lombok.Data;

/**
 * 게시판 관리 Table
 * 
 * @author idaesan
 *
 */
@Data
public class BoardManager {

	private Integer boardManagerIdx;
	private String boardTitle;
	private String boardType;
	private String writeType;
	private String rowType;
	private String isAnswer;
	private String isComment;
	private String isThumbnail;
	private Integer rowCount;
	private Date createDate;
	
	// 게시판 목록
	private List<Board> boardList;
}
