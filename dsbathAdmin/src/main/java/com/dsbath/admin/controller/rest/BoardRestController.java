package com.dsbath.admin.controller.rest;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dsbath.admin.model.Board;
import com.dsbath.admin.model.BoardAnswer;
import com.dsbath.admin.model.BoardComment;
import com.dsbath.admin.model.BoardManager;
import com.dsbath.admin.model.dto.PagingDTO;
import com.dsbath.admin.model.service.BoardAnswerService;
import com.dsbath.admin.model.service.BoardCommentService;
import com.dsbath.admin.model.service.BoardManagerService;
import com.dsbath.admin.model.service.BoardService;

/**
 * 게시판 Rest Controller
 * 
 * @author idaesan
 *
 */
@RestController
@RequestMapping("/board/rest")
public class BoardRestController {

	/**
	 * 게시판 관리 Service
	 */
	@Autowired
	private BoardManagerService boardManagerService;
	
	/**
	 * 게시판 Service
	 */
	@Autowired
	private BoardService boardService;
	
	/**
	 * 게시판 답변 Service
	 */
	@Autowired
	private BoardAnswerService boardAnswerService;
	
	/**
	 * 게시판 댓글 Service
	 */
	@Autowired
	private BoardCommentService boardCommentService;
	
	/**
	 * 게시판 관리 상세
	 * 
	 * @param boardManager
	 * @return
	 */
	@PostMapping("/boardManager/detail")
	public Map<String, Object> boardManagerDetail (BoardManager boardManager) {
		return boardManagerService.detail(boardManager);
	}
	
	/**
	 * 게시판 목록
	 * 
	 * @param pagingDTO
	 * @param board
	 * @return
	 */
	@PostMapping("/select")
	public Map<String, Object> select (PagingDTO<Board> pagingDTO, Board board) {
		pagingDTO.setModel(board);
		return boardService.select(pagingDTO);
	}
	
	/**
	 * 게시판 상세
	 * 
	 * @param board
	 * @return
	 */
	@PostMapping("/detail")
	public Map<String, Object> detail (Board board) {
		return boardService.detail(board);
	}
	
	/**
	 * 게시판 Merge (등록, 수정, 삭제)
	 * 
	 * @param board
	 * @param type
	 * @return
	 */
	@PostMapping("/merge")
	public Map<String, Object> merge (Board board, @RequestParam(value = "type", required = true) String type) {
		return boardService.merge(board, type);
	}
	
	/**
	 * 게시판 답변 Merge (등록, 수정, 삭제)
	 * 
	 * @param boardAnswer
	 * @param type
	 * @return
	 */
	@PostMapping("/answer/merge")
	public Map<String, Object> answerMerge (BoardAnswer boardAnswer, @RequestParam(value = "type", required = true) String type) {
		return boardAnswerService.merge(boardAnswer, type);
	}
	
	/**
	 * 게시판 댓글 목록
	 * 
	 * @param boardComment
	 * @return
	 */
	@PostMapping("/comment/list")
	public Map<String, Object> commentList (BoardComment boardComment) {
		return boardCommentService.select(boardComment);
	}
	
	/**
	 * 게시판 댓글 Merge (등록, 수정, 삭제)
	 * 
	 * @param boardComment
	 * @param type
	 * @return
	 */
	@PostMapping("/comment/merge")
	public Map<String, Object> commentMerge (BoardComment boardComment, @RequestParam(value = "type", required = true) String type) {
		return boardCommentService.merge(boardComment, type);
	}
}
