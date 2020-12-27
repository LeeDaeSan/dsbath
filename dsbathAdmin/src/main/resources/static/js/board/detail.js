/**
 * 게시판 상세 조회 Function
 * 
 * @param idx
 * @returns
 */
function detailBoardFunc (idx) {
	
	// parameter
	var param = {
		boardIdx : idx
	};
	
	// ajax request
	common.ajax({
		title 		: boardParam.boardTitle + ' 상세 조회',
		url 		: '/board/rest/detail',
		method		: 'POST',
		async		: false,
		data		: param,
		callback	: function (result) {
			
			
			var buttonType	= 'B_001';
			var detail 		= result.detail;
			var thumbnail 	= detail.thumbnail;
			var url			= '/file/rest/download?' + thumbnail;
			
			var writeType 	= boardManager.writeType;
			var isAnswer	= boardManager.isAnswer;
			var isComment	= boardManager.isComment;
			
			var writeName	= '';
			
		//======================= 상세 팝업 생성 START =======================//
			addDetailBoardPopup(isAnswer, isComment, 'U');
			// popup body append
			addPopupBody('detail');
		//======================= 상세 팝업 생성 END =======================//
			
			
		//======================= 게시판 상세 START =======================//
			// 관리자 명
			if (writeType == 'A') {
				writeName = detail.admin.adminName;
				
			// 사용자 명
			} else if (writeType == 'M') {
				writeName = detail.member.memberName;
				buttonType = 'B_003';
			}
			
			buttonChange(buttonType);
			
			// 제목
			$('#detailTitle').text(detail.title);
			// 작성자
			$('#detailWriteName').text(writeName);
			// 등록일
			$('#detailCreateDate').text(common.date.toString(new Date(detail.createDate), '-'));
			// 조회수
			$('#detailHit').text(common.number.addComma(detail.hit));
			// 내용
			$('#detailContent').empty().append(detail.content);
			
			// 상세 수정 -> 수정 팝업으로 변경
			$('#updatePopupBtn').unbind('click').click(function (e) {
				e.preventDefault();
				
				addPopupBody('update');
				
				buttonChange('B_002');
				
				$('#detailBoardIdx').val(detail.boardIdx);
				$('#detailTitle').val(detail.title);
				$('#detailContent').summernote('code', detail.content);
				
				// 썸네일 이미지
				if (thumbnail) {
					var formTag 		= $('#detailBoardPopup');
					var updateImage		= $('#detailThumbnail');
					var updateImageFile = $('#detailThumbnailFile');
					
					updateImage.append('<p><img style="width:50px;" src="/file/rest/download?' + thumbnail + '"/></p>');
					updateImage.find('img').after('<a class="delete_thumbnail thumbnail-close" href="javascript:void(0);"><i class="fa fa-close"></i></a>');
					
					formTag.find('.update_file').remove();
					formTag.append('<input type="hidden" class="update_file" value="' + thumbnail + '"/>');
					
					updateImageFile.hide();
					
					// 미리보기 이미지 삭제
					$('.delete_thumbnail').unbind('click').click(function (e) {
						e.preventDefault();
						
						// 이미지 영역 비우기
						updateImage.empty();
						// input file init
						updateImageFile.show();
						updateImageFile.val('');
						updateImageFile.replaceWith( updateImageFile.clone(true) );
					});
				}
			});
		//======================= 게시판 상세 END =======================//
			
			
		//======================= 게시판 답변 상세 START =======================//
			detailBoardAnswerFunc(isAnswer, detail, buttonType);
		//======================= 게시판 답변 상세 END =======================//
			
			
		//======================= 게시판 댓글 목록 START =======================//
			detailBoardCommentFunc(isComment, detail.boardIdx, buttonType);
		//======================= 게시판 댓글 목록 END =======================//
		}
		
	});
}

/**
 * 게시판 Merge (등록, 수정, 삭제)
 * 
 * @param type
 * @param idx
 * @returns
 */
function mergeBoardFunc (type, idx) {
	
	var writeType 	= boardManager.writeType;
	var isAnswer	= boardManager.isAnswer;
	
	var mergeText 	= '등록';
	var tagType		= 'insert';
	
	// 등록
	if (type == 'I') {
		mergeText	= '등록';
		tagType		= 'insert';
		
	// 수정
	} else if (type == 'U') {
		mergeText	= '수정';
		tagType		= 'update';
		
	// 삭제
	} else if (type == 'D') {
		mergeText	= '삭제';
		tagType		= 'delete';
		
	} else {
		return false;
	}
	
	
	var title 		= $('#detailTitle');
	var content 	= $('#detailContent');
	var thumbnail	= $('.detail_file');
	
	// 관리자인 경우
	if (writeType == 'A') {
		// 제목 validation
		if (!title.val()) {
			common.alert('warn', '제목을 입력해 주세요.');
			title.focus();
			return false;
		}
		
		// 내용 validation
		if (!content.summernote('code')) {
			common.alert('warn', '내용을 입력해 주세요.');
			content.focus();
			return false;
		}
	}
	
	// confirm
	if (confirm('해당 내용을 ' + mergeText + '하시겠습니까?')) {
		
		// parameter
		var param = {
			type			: type,
			boardIdx		: idx,
			boardManagerIdx : boardManager.boardManagerIdx,
			title			: title.val(),
			content			: content.summernote('code'),
			thumbnail		: thumbnail.val(),
		};
		
		// ajax reqeust
		common.ajax({
			title		: boardParam.boardTitle + ' ' + mergeText,
			url			: '/board/rest/merge',
			method		: 'POST',
			async		: false,
			data		: param,
			callback	: function (result) {
				
				// 성공
				if (result.resultCount == 1) {
					
					// 완료 alert
					common.alert('succ', '내용을 ' + mergeText + ' 완료하였습니다.');
					// 목록 재조회
					selectBoardFunc();
					// 팝업 닫기
					$('#detailBoardPopup .close').click();
					
				// 실패
				} else {
					common.alert('dang', boardParam.boardTitle + ' ' + mergeText + ' 요청중 에러가 발생하였습니다.');
				}
			}
		});
	}
}


/**
 * 상세 팝업 생성 Function
 * 
 * @returns
 */
function addDetailBoardPopup (isAnswer, isComment, type) {
	
	//========== 상세 정보 START ==========//
	var html  = '		<div class="modal-body modal-body-overflow">';
		html += '			<table class="table" id="detailBoardTable">';
		html += '				<colgroup>';
		html += '					<col width="10%"/>';
		html += '					<col width="23%"/>';
		html += '					<col width="10%"/>'; 
		html += '					<col width="23%"/>';
		html += '					<col width="10%"/>';
		html += '					<col width="23%"/>';
		html += '				</colgroup>';
		html += '				<thead>';
		html += '					<tr>';
		html += '						<th colspan="6" class="head-board">상세 정보</th>';
		html += '					</tr>';
		html += '				</thead>';
		html += '				<tbody>';
		html += '				</tbody>';
		html += '			</table>';
		html += '		</div>';
	//========== 상세 정보 END ==========//
		
		
	//========== 답변 정보 START ==========//
	if (isAnswer == 'Y') {
		html += '		<div class="modal-body modal-body-overflow" ' + (type == 'I' ? 'style="display:none;"' : '') + '>';
		html += '			<table class="table" id="detailBoardAnswerTable">';
		html += '				<colgroup>';	
		html += '					<col width="10%"/>';
		html += '					<col width="auto"/>';
		html += '				</colgroup>';
		html += '				<thead>';
		html += '					<tr>';
		html += '						<th colspan="2" class="head-board">답변</th>';
		html += '					</tr>';
		html += '				</thead>';
		html += '				<tbody class="nowrite-answer">';
		html += '					<tr>';
		html += '						<th colspan="2" class="text-center">답변을 작성해 주세요.</th>';
		html += '					</tr>';
		html += '				</tbody>';
		html += '				<tbody class="write-answer" style="display:none;">';
		html += '				</tbody>';
		html += '			</table>';
		html += '		</div>';
	}
	//========== 답변 정보 END ==========//
	
	
	//========== 댓글 정보 START ==========//
	if (isComment == 'Y') {
		html += '		<div class="modal-body modal-body-overflow" ' + (type == 'I' ? 'style="display:none;"' : '') + '>';
		html += '			<table class="table" id="detailBoardCommentTable">';
		html += '				<thead>';
		html += '					<tr>';
		html += '						<th class="head-board">댓글</th>';
		html += '					</tr>';
		html += '				</thead>';
		html += '				<tbody>';
		html += '					<tr>';
		html += '						<td>';
		html += '							<textarea class="board-comment-textarea form-control" id="detailComment" placeholder="댓글을 입력해 주세요."></textarea>';
		html += '						</td>';
		html += '					</tr>';
		html += '					<tr>';
		html += '						<td class="text-right" style="padding-bottom:0;">';
		html += '							<div class="comment-total-count">댓글 <span id="commentTotalCount">0</span></div>';
		html += '							<button type="button" class="btn btn-sm btn-primary" mergeType="I" id="commentInsertBtn">댓글 저장</button>';
		html += '						</td>';
		html += '					</tr>';
		html += '				</tbody>';
		html += '				<tbody class="comment_body">';
		html += '				</tbody>';
		html += '			</table>';
		html += '		</div>';
	}
	//========== 댓글 정보 END ==========//
	
	
	//========== 버튼 영역 START ==========//
		html += '		<div class="modal-footer">';
		html += '			<button type="button" class="btn btn-sm btn-primary change_btn" 					mergeType="N" id="answerBtn" 		style="display:none;">답변 작성</button>';
		html += '			<button type="button" class="btn btn-sm btn-primary change_btn popup_answer_btn" 	mergeType="I" id="answerInsertBtn" 	style="display:none;">답변 등록</button>';
		html += '			<button type="button" class="btn btn-sm btn-primary change_btn popup_answer_btn" 	mergeType="U" id="answerUpdateBtn" 	style="display:none;">답변 저장</button>';
		html += '			<button type="button" class="btn btn-sm btn-danger  change_btn popup_answer_btn" 	mergeType="D" id="answerDeleteBtn" 	style="display:none;">답변 삭제</button>';
		html += '			<button type="button" class="btn btn-sm btn-primary change_btn" 					mergeType="C" id="updatePopupBtn" 	style="display:none;">상세 수정</button>';
		html += '			<button type="button" class="btn btn-sm btn-primary change_btn popup_btn" 			mergeType="I" id="boardInsertBtn" 	style="display:none;">상세 등록</button>';
		html += '			<button type="button" class="btn btn-sm btn-primary change_btn popup_btn" 			mergeType="U" id="boardUpdateBtn" 	style="display:none;">상세 저장</button>';
		html += '			<button type="button" class="btn btn-sm btn-danger  change_btn popup_btn" 			mergeType="D" id="boardDeleteBtn" 	style="display:none;">상세 삭제</button>';
		html += '			<button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">닫기</button>';
		html += '		</div>';
	//========== 버튼 영역 END ==========//
		
		html += '	</div>';
		html += '</div>';
	
	$('#detailBoardPopup .modal-content .modal-body, #detailBoardPopup .modal-content .modal-footer').remove();
	$('#detailBoardPopup .modal-content').append(html);
	
	// 등록, 수정, 삭제 button event
	$('.popup_btn').unbind('click').click(function (e) {
		e.preventDefault();
		console.log(123);
		mergeBoardFunc($(this).attr('mergeType'), $('#detailBoardIdx').val());
	});
}


/**
 * 상세 모달 팝업 body 생성 Function
 * 
 * @param type
 * @returns
 */
function addPopupBody (type) {
	var writeType 	= boardManager.writeType;
	var isThumbnail	= boardManager.isThumbnail;
	var isAnswer	= boardManager.isAnswer;
	
	var html 	= '';
	var title	= '';
	
	$('.popup_btn').hide();
	
	if (type == 'detail') {
		title	= '상세';
		$('#answerBtn, #updatePopupBtn').show();
		
	} else if (type == 'insert') {
		title	= '등록';
		$('#insertBtn').show();
		
	} else if (type == 'update') {
		title 	= '수정';
		$('#updateBtn, #deleteBtn').show();
	}
	
	// title
	$('#detailBoardPopup').find('#myModalLabel').text(boardManager.boardTitle + ' ' + title);
	
//============== 상세 START =================//
	html += '<tr>';
	html += '	<th>제목</th>';
	html += '	<td colspan="5">';
	
	// 상세
	if (type == 'detail') {
		html += '	<span id="detailTitle"></span>';
	// 등록, 수정
	} else if (type == 'insert' || type == 'update') {
		html += '	<input type="text" class="form-control form-control-sm" id="detailTitle"/>';
		html += '	<input type="hidden" id="detailBoardIdx"/>';
	}
	html += '	</td>';
	html += '</tr>';
	
	// 썸네일
	if (isThumbnail == 'Y') {
		// 등록 or 수정
		if (type == 'insert' || type == 'update') {
			html += '<tr>';
			html += '	<th>썸네일</th>';
			html += '	<td colspan="5">';
			html += '		<input type="file" id="detailThumbnailFile" class="thumbnail_file" fileType="' + type + '"/>';
			html += '		<div id="detailThumbnail"></div>';
			html += '	</td>';
			html += '</tr>';
		}
	}
	// 상세
	if (type == 'detail') {
		html += '<tr>';
		html += '	<th>작성자</th>';
		html += '	<td>';
		html += '		<span id="detailWriteName"></span>';
		html += '	</td>';
		html += '	<th>등록일</th>';
		html += '	<td>';
		html += '		<span id="detailCreateDate"></span>';
		html += '	</td>';
		html += '	<th>조회수</th>';
		html += '	<td>';
		html += '		<span id="detailHit"></span>';
		html += '	</td>';
		html += '</tr>';
	}
	
	html += '<tr>';
	html += '	<th>내용</th>';
	html += '	<td colspan="5">';
	
	// 상세
	if (type == 'detail') {
		html += '	<span id="detailContent"></span>';
	// 등록, 수정
	} else if (type == 'insert' || type == 'update') {
		html += '	<textarea id="detailContent"></textarea>';
	}
	
	html += '	</td>';
	html += '</tr>';
	
	// 게시판 상세 초기화 & 생성
	$('#detailBoardTable').find('tbody').empty().append(html);
	
	// 수정인 경우
	if (type == 'insert' || type == 'update') {
		$('#detailContent').summernote({
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
		
		// 썸네일 파일첨부 미리보기
		if (isThumbnail == 'Y') {
			$('.thumbnail_file').change(function (e) {
				var thisType 	= $(this).attr('fileType');
				
				var formTag 	= $('#detailBoardPopup');
				var files 		= e.target.files;
				var fileLength 	= files.length;
				
				var thisThumbnail 		= $('#detailThumbnail');
				var thisThumbnailFile 	= $('#detailThumbnailFile');
				
				formTag.find('.detail_file').remove();
				
				for (var i = 0; i < fileLength; i++) {
					var fileObj = common.file.save(files[i], 'board', thisThumbnail, '50');
					
					thisThumbnail.find('img').after('<a class="delete_thumbnail thumbnail-close" href="javascript:void(0);"><i class="fa fa-close"></i></a>');
					formTag.append('<input type="hidden" class="detail_file" value="path=' + fileObj.filePath + '&fileName=' + fileObj.fileName + '"/>');
				}
				
				thisThumbnailFile.hide();
				
				// 미리보기 썸네일 삭제
				$('.delete_thumbnail').unbind('click').click(function (e) {
					e.preventDefault();
					
					// 이미지 영역 비우기
					thisThumbnail.empty();
					// input file init
					thisThumbnailFile.show();
					thisThumbnailFile.val('');
					thisThumbnailFile.replaceWith( thisThumbnailFile.clone(true) );
				});
			});
		}
	}
//============== 상세 END =================//
	
	
//============== 답변 START =================//
	// 답변 권한이 있는 경우
	if (isAnswer == 'Y') {
		addPopupBoardAnswerFunc(type);
	}
//============== 답변 END =================//
}