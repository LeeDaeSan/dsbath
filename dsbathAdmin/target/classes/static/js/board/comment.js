
/**
 * 게시판 댓글 상세 조회 Function
 * 
 * @returns
 */
function detailBoardCommentFunc (isComment, boardIdx, buttonType) {
	
	// 댓글 권한 있을 때
	if (isComment == 'Y') {
		
		// parameter
		var param = {
			boardIdx : boardIdx,
		};
		
		// ajax request
		common.ajax({
			title		: '댓글 목록 조회',
			url			: '/board/rest/comment/list',
			method		: 'POST',
			async		: true,
			data		: param,
			callback	: function (result) {
				
				var html		= '';
				var list 		= result.list;
				var listLength 	= list.length;
				var totalCount	= result.totalCount;
				
				// total count
				$('#commentTotalCount').text(common.number.addComma(totalCount));
				
				for (var i = 0; i < listLength; i++) {
					var thisObj 	= list[i];
					
					var adminName 	= thisObj.admin ? thisObj.admin.adminName : null;
					var memberName 	= thisObj.member ? thisObj.member.memberName : null;
					
					var name = adminName ? adminName : memberName;
					
					html += '<tr idx="' + thisObj.boardCommentIdx + '">';
					html += '	<td>';
					html += '		<div class="comment-name-area">';
					html += '			<i class="fa fa-chevron-right comment-icon"></i>';
					html += '			<div class="comment-name">' + name + '</div>';
					html += '			<div class="comment-date">' + common.date.formatDateTime(thisObj.createDate) + '</div>';
					html += '			<div class="comment-count ' + (thisObj.commentCount > 0 ? 'comment_count_btn' : '') + '">' + (thisObj.commentCount > 0 ? '+' + thisObj.commentCount : '') + '</div>';
					html += '			<div class="comment-button-area">';
					html += '				<button type="button" class="float-right btn btn-sm btn-secondary comment_of_comment_btn">댓글 쓰기</button>';
					// 작성자가 본인일 경우 수정, 삭제 가능
					if (thisObj.admin && (thisObj.admin.adminIdx == sessionIdx)) {
						html += '			<button type="button" class="float-right btn btn-sm btn-secondary comment_btn" mergeType="D">삭제</button>';
						html += '			<button type="button" class="float-right btn btn-sm btn-secondary comment_change_btn" changeType="N">수정</button>';
						html += '			<button type="button" class="float-right btn btn-sm btn-secondary comment_btn comment_update_btn" mergeType="U" style="display:none;">저장</button>';
					}
					html += '			</div>';
					html += '		</div>';
					html += '		<div class="comment-content comment_content_div" commentValue="' + thisObj.comment + '">';
					html += 			thisObj.comment;
					html += '		</div>';
					html += '		<div class="comment_of_comment_div" style="display:none;">';
					html += '			<div class="comment-of-comment-text"><i class="fa fa-mail-reply comment-icon"></i>&nbsp;내용</div>';
					html += '			<div class="comment-of-comment-button-area">';
					html += '				<button type="button" class="float-right btn btn-sm btn-secondary commment_of_comment_insert_btn" mergeType="I">등록</button>';
					html += '			</div>';
					html += '			<textarea class="board-comment-textarea form-control comment_of_comment_textarea" placeholder="댓글을 입력해 주세요."></textarea>';
					html += '		</div>';
					html += '		<div class="comment_of_comment_area" style="display:none;">';
					html += '		</div>';
					html += '	</td>';
					html += '</tr>';
					
				}
				
				// 목록이 없을 때
				if (listLength == 0) {
					html = '<tr><td class="text-center">댓글 내용이 없습니다.</td></tr>';
				}
				
				// 목록 초기화 및 생성
				$('#detailBoardCommentTable')
					.find('.comment_body')
					.empty()
					.append(html);
				
				// 댓글 수정 -> 수정 form 변경
				$('.comment_change_btn').unbind('click').click(function (e) {
					e.preventDefault();

					// 상세 -> 수정 form
					if ($(this).attr('changeType') == 'N') {
						$(this).attr('changeType', 'Y');
						$(this).text('취소');
						$(this).closest('div').find('.comment_update_btn').show();
						$(this).closest('tr').find('.comment_content_div').empty().append('<textarea class="board-comment-textarea form-control detail_comment" placeholder="내용을 입력해 주세요.">' + $(this).closest('tr').find('.comment_content_div').attr('commentValue') + '</textarea>')
						
					// 수정 form -> 상세
					} else {
						$(this).attr('changeType', 'N');
						$(this).text('수정');
						$(this).closest('div').find('.comment_update_btn').hide();
						$(this).closest('tr').find('.comment_content_div').empty().text($(this).closest('tr').find('.comment_content_div').attr('commentValue'));
					}
				});
				
				// 댓글 등록 button event
				$('#commentInsertBtn').unbind('click').click(function (e) {
					e.preventDefault();
					
					mergeBoardCommentFunc({
						type		: $(this).attr('mergeType')	,
						boardIdx	: boardIdx					,
						comment		: $('#detailComment')		,
					});
					
				});
				
				// 댓글 수정, 삭제 button event
				$('.comment_btn').unbind('click').click(function (e) {
					e.preventDefault();
					
					mergeBoardCommentFunc({
						type			: $(this).attr('mergeType')						,
						boardIdx		: boardIdx										,
						boardCommentIdx	: $(this).closest('tr').attr('idx')				,
						comment			: $(this).closest('tr').find('.detail_comment')	,
						
					});
				});
				
				// 대댓글 목록 보기 button event
				$('.comment_count_btn').unbind('click').click(function (e) {
					e.preventDefault();
					
					selectBoardCommentFunc2(boardIdx, $(this).closest('tr').attr('idx'), $(this).closest('tr').find('.comment_of_comment_area'));
				});
				
				// 대댓글 작성 form button event
				$('.comment_of_comment_btn').unbind('click').click(function (e) {
					e.preventDefault();
					
					$(this).closest('tr').find('.comment_of_comment_div').show();
				});
				
				// 대댓글 등록 button event
				$('.commment_of_comment_insert_btn').unbind('click').click(function (e) {
					e.preventDefault();
					
					mergeBoardCommentFunc({
						type		: $(this).attr('mergeType'),
						boardIdx	: boardIdx,
						parentIdx	: $(this).closest('tr').attr('idx'),
						comment		: $(this).closest('.comment_of_comment_div').find('.comment_of_comment_textarea'),
					});
				});
			}
		});
		
	// 댓글 권한 없을 때
	} else {
		$('#detailBoardCommentTable').closest('div').remove();
	}
	
}

/**
 * 대댓글 목록 조회 Function
 * 
 * @param parentIdx
 * @returns
 */
function selectBoardCommentFunc2 (boardIdx, parentIdx, parentTag) {
	
	// parameter
	var param = {
		boardIdx	: boardIdx,
		parentIdx 	: parentIdx
	};
	
	// ajax request
	common.ajax({
		title		: '댓글 목록 조회',
		url 		: '/board/rest/comment/list',
		method		: 'POST',
		async		: true,
		data		: param,
		callback	: function (result) {
			
			var html 		= '';
			var list 		= result.list;
			var listLength 	= list.length;
			
			for (var i = 0; i < listLength; i++) {
				var thisObj = list[i];
				
				var adminName 	= thisObj.admin ? thisObj.admin.adminName : null;
				var memberName 	= thisObj.member ? thisObj.member.memberName : null;
				
				var name = adminName ? adminName : memberName;
				
				html += '<div class="comment-of-comment" idx="' + thisObj.boardCommentIdx + '">';
				html += '	<div class="comment-name-area">';
				html += '		<i class="fa fa-mail-reply comment-icon"></i>';
				html += '		<div class="comment-name">' + name + '</div>';
				html += '		<div class="comment-date">' + common.date.formatDateTime(thisObj.createDate) + '</div>';
				// 작성자가 본인일 경우 수정, 삭제 가능
				if (thisObj.admin && (thisObj.admin.adminIdx == sessionIdx)) {
					html += '		<div class="comment-button-area">';
					html += '			<button type="button" class="float-right btn btn-sm btn-secondary comment_of_comment_btn" mergeType="D">삭제</button>';
					html += '			<button type="button" class="float-right btn btn-sm btn-secondary comment_of_comment_change_btn" changeType="N">수정</button>';
					html += '			<button type="button" class="float-right btn btn-sm btn-secondary comment_of_comment_btn comment_of_comment_update_btn" mergeType="U" style="display:none;">저장</button>';
					html += '		</div>';
				}
				html += '	</div>';
				html += '	<div class="comment-content comment_of_comment_detail_content_div" commentValue="' + thisObj.comment + '">' + thisObj.comment + '</div>';
				html += '</div>';
			}
			
			parentTag.empty().append(html);
			
			parentTag.slideDown('fast');
			
			// 수정 -> 수정 form 변경
			$('.comment_of_comment_change_btn').unbind('click').click(function (e) {
				e.preventDefault();
				
				// 상세 -> 수정 form
				if ($(this).attr('changeType') == 'N') {
					$(this).attr('changeType', 'Y');
					$(this).text('취소');
					$(this).closest('div').find('.comment_of_comment_update_btn').show();
					$(this).closest('.comment-of-comment').find('.comment_of_comment_detail_content_div').empty().append('<textarea class="board-comment-textarea form-control detail_comment_of_comment" placeholder="내용을 입력해 주세요.">' + $(this).closest('.comment-of-comment').find('.comment_of_comment_detail_content_div').attr('commentValue') + '</textarea>')
					
				// 수정 form -> 상세
				} else {
					$(this).attr('changeType', 'N');
					$(this).text('수정');
					$(this).closest('div').find('.comment_of_comment_update_btn').hide();
					$(this).closest('.comment-of-comment').find('.comment_of_comment_detail_content_div').empty().text($(this).closest('.comment-of-comment').find('.comment_of_comment_detail_content_div').attr('commentValue'));
				}
			});
			
			// 댓글 수정, 삭제 button event
			$('.comment_of_comment_btn').unbind('click').click(function (e) {
				e.preventDefault();
				
				mergeBoardCommentFunc({
					type			: $(this).attr('mergeType')													,
					boardIdx		: boardIdx																	,
					boardCommentIdx	: $(this).closest('.comment-of-comment').attr('idx')						,
					comment			: $(this).closest('.comment-of-comment').find('.detail_comment_of_comment')	,
				});
			});
		}
	});
}

/**
 * 게시판 댓글 Merge (등록, 수정, 삭제) Function
 * 
 * @param type
 * @param boardIdx
 * @returns
 */
function mergeBoardCommentFunc (param) {
	
	var typeObject 	= typeFunc(param.type);
	var commentTag 	= param.comment;
	
	if (param.type == 'I' || param.type == 'U') {
		// 내용 validation
		if (!commentTag.val()) {
			common.alert('warn', '내용을 입력해 주세요.');
			commentTag.focus();
			return false;
		}
	}
	
	// confirm
	if (confirm('작성하신 댓글을 ' + typeObject.mergeText + '하시겠습니까?')) {
		
		param.comment = commentTag.val();
		
		// ajax request
		common.ajax({
			title		: boardParam.boardTitle + ' ' + typeObject.mergeText,
			url			: '/board/rest/comment/merge',
			method		: 'POST',
			async		: false,
			data		: param,
			callback	: function (result) {
				
				// 성공
				if (result.resultCount == 1) {
					
					// 완료 alert
					common.alert('succ', '댓글 내용을 ' + typeObject.mergeText + ' 완료하였습니다.');
					// form 초기화
					commentTag.val('');
					// 상세 재조회
					detailBoardFunc(param.boardIdx);
					
				// 실패
				} else {
					common.alert('dang', boardParam.boardTitle + ' ' + typeObject.mergeText + ' 요청중 에러가 발생하였습니다.');
				}
			}
		});
	}
}