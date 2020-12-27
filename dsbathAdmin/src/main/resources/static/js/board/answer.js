
/**
 * 게시판 답변 상세
 * 
 * @param isAnswer
 * @param boardAnswer
 * @param buttonType
 * @returns
 */
function detailBoardAnswerFunc (isAnswer, detail, buttonType) {
	
	var boardIdx 	= detail.boardIdx;
	var boardAnswer = detail.boardAnswer;
	
	// 답변 권한 있을 때
	if (isAnswer == 'Y') {
		
		// 작성 답변이 있을 때
		if (boardAnswer) {
			$('#detailBoardAnswerTable .nowrite-answer').hide();
			$('#detailBoardAnswerTable .write-answer').show();
			
			// 답변 제목
			$('#detailAnswerTitle').text(boardAnswer.answerTitle);
			// 답변 내용
			$('#detailAnswerContent').empty().append(boardAnswer.answerContent);
			
			buttonType = 'BA_001';
			
		// 작성 답변이 없을 때
		} else {
			$('#detailBoardAnswerTable .write-answer').hide();
			$('#detailBoardAnswerTable .nowrite-answer').show();
			
			buttonType = 'BA_002';
		}
		
		// 버튼 영역 change
		buttonChange(buttonType);
		
		// 답변 작성 button event : 신규 -> 등록 화면 전환
		$('#answerBtn').unbind('click').click(function (e) {
			e.preventDefault();
			
			var mergeType = $(this).attr('mergeType');
			
			$('#detailBoardAnswerTable .nowrite-answer').hide();
			$('#detailBoardAnswerTable .write-answer').show();
			
			$(this).hide();
			
			if (mergeType == 'N') {
				addPopupBoardAnswerFunc('insert');
				buttonType = 'BA_003';
				
			} else if (mergeType == 'C') {
				addPopupBoardAnswerFunc('update');
				buttonType = 'BA_004';
				
				$('#detailBoardAnswerIdx').val(boardAnswer.boardAnswerIdx);
				$('#detailAnswerTitle').val(boardAnswer.answerTitle);
				$('#detailAnswerContent').summernote('code', boardAnswer.answerContent);
			}

			// 댓글 form hide
			$('#detailBoardCommentTable').closest('div').hide();
			
			// 버튼 영역 change
			buttonChange(buttonType);
		});
		
		// 답변 등록 button event : 등록
		$('.popup_answer_btn').unbind('click').click(function (e) {
			e.preventDefault();
			
			mergeBoardAnswerFunc($(this).attr('mergeType'), boardIdx);
		});
		
	// 답변 권한 없을 때
	} else {
		buttonChange('BA_005');
		$('#detailBoardAnswerTable').closest('div').remove();
	}
}

/**
 * 게시판 답변 Merge (등록, 수정)
 * 
 * @param type
 * @param idx
 * @returns
 */
function mergeBoardAnswerFunc (type, boardIdx) {
	
	var typeObject = typeFunc(type);
	
	var answerTitle 	= $('#detailAnswerTitle');
	var answerContent 	= $('#detailAnswerContent');
	
	// 답변 권한이 있는 경우
	if (typeObject.isAnswer == 'Y') {
		// 답변 제목 validation
		if (!answerTitle.val()) {
			common.alert('warn', '답변 제목을 입력해 주세요.');
			answerTitle.focus();
			return false;
		}
		// 답변 내용 validation
		if (!answerContent.summernote('code')) {
			common.alert('warn', '답변 내용을 입력해 주세요.');
			answerContent.focus();
			return false;
		}
	}
	
	// confirm
	if (confirm('작성하신 답변을 ' + typeObject.mergeText + '하시겠습니까?')) {
		
		// default parameter
		var param = {
			type			: type,
			boardAnswerIdx	: $('#detailBoardAnswerIdx').val(),
			boardIdx		: boardIdx,
			answerTitle		: answerTitle.val(),
			answerContent	: answerContent.summernote('code'),
		};
		
		// ajax request
		common.ajax({
			title		: boardParam.boardTitle + ' ' + typeObject.mergeText,
			url			: '/board/rest/answer/merge',
			method		: 'POST',
			async		: false,
			data		: param,
			callback	: function (result) {
				
				// 성공
				if (result.resultCount == 1) {
					// 완료 alert
					common.alert('succ', '답변 내용을 ' + typeObject.mergeText + ' 완료하였습니다.');
					// 상세 재조회
					detailBoardFunc(boardIdx);
					// 목록 재조회
					selectBoardFunc();
					
				// 실패
				} else {
					common.alert('dang', boardParam.boardTitle + ' ' + typeObject.mergeText + ' 요청중 에러가 발생하였습니다.');
				}
				
			}
		});
	}
	
}


/**
 * 답변 팝업 Function
 * 
 * @param type
 * @returns
 */
function addPopupBoardAnswerFunc (type) {
	
	var html  = '<tr>';
		html += '	<th>제목</th>';
		html += '	<td>';
		
		// 상세
		if (type == 'detail') {
			html += '<span id="detailAnswerTitle"></span>';
		// 등록, 수정
		} else if (type == 'insert' || type == 'update') {
			html += '<input type="text" class="form-control form-control-sm" id="detailAnswerTitle"/>';
			html += '<input type="hidden" id="detailBoardAnswerIdx"/>';
		}
		
		html += '	</td>';
		html += '</tr>';
		html += '<tr>';
		html += '	<th>내용</th>';
		html += '	<td>';
		
		// 상세
		if (type == 'detail') {
			html += '<span id="detailAnswerContent"></span>';
		// 등록, 수정
		} else if (type == 'insert' || type == 'update') {
			html += '<textarea id="detailAnswerContent"></textarea>';
		}
		
		html += '	</td>';
		html += '</tr>';
	
	// 게시판 답변 초기화 & 생성
	$('#detailBoardAnswerTable').find('tbody.write-answer').empty().append(html);
	
	// 수정인 경우
	if (type == 'insert' || type == 'update') {
		$('#detailAnswerContent').summernote({
			height 		: 300,
			minHeight	: null,
			maxHeight	: null,
			focus		: true,
			lang		: 'ko-KR',
			placeholder	: '',
			callbacks	: {
				onImageUpload : function (files, el, e) {
					var fileLength 	= files.length;
					for (var i = 0; i < fileLength; i++) {
						common.file.save(files[i], 'board', $('.note-editable'), '400');
					}
				},
				onMediaDelete : function (tag) {
					deleteImgArr.push({ tag : tag });
				}
			}
		});
	}
}