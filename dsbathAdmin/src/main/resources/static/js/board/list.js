var boardParam = common.getBoardParameter();
var boardManager;

$(function () {
	
	// 게시판 관리 상세 조회
	detailBoardManagerFunc();
	
	// 검색 이벤트 시작
	common.search.start(selectBoardFunc);
	
	// 게시판 등록 button event
	$('#insertPopupBtn').unbind('click').click(function (e) {
		e.preventDefault();
		
		addDetailBoardPopup(boardManager.isAnswer, boardManager.isComment, 'I');
		// modal show
		$('#detailBoardPopup').modal('show');
		// modal append
		addPopupBody('insert');
		// 버튼 활성화
		buttonChange('B_004');
	});
	
});

/**
 * 게시판 관리 정보 조회 Function
 * 
 * @returns
 */
function detailBoardManagerFunc () {
	
	// parameter
	var param = {
		boardType : boardParam.boardType
	};
	
	// ajax request
	common.ajax({
		title		: boardParam.boardTitle,
		url			: '/board/rest/boardManager/detail',
		method		: 'POST',
		async		: false,
		data		: param,
		callback	: function (result) {
			boardManager = result.detail;
			
			// 등록 버튼 활성화
			if (boardManager.writeType == 'A') {
				$('#insertPopupBtn').show();
				
			// 등록 버튼 삭제
			} else {
				$('#insertPopupBtn').remove();
			}
			
		}
	});
}

/**
 * 게시판 목록 조회 Function
 * 
 * @param p
 * @returns
 */
function selectBoardFunc (p) {
	
	// 페이징 변수
	page	= p ? p : 1;
	limit	= $('#rowLimit').val();
	
	var startDate 	= '';
	var endDate 	= '';
	if ($('#periodDate').val()) {
		startDate 	= common.date.toString( $('#periodDate').data('daterangepicker').startDate._d, '' );
		endDate 	= common.date.toString( $('#periodDate').data('daterangepicker').endDate._d, '' ); 
	}
	
	// parameter
	var param = {
		page	: (page - 1) * limit,
		limit	: limit,
		
		boardManagerIdx 		: boardManager.boardManagerIdx,
		title					: $('#searchTitle').val(),
		'member.memberName' 	: $('#searchMemberName').val(),
		'admin.adminName' 		: $('#searchAdminName').val(),
		startDateStr			: startDate,
		endDateStr				: endDate,
	};
	
	// ajax request
	common.ajax({
		title		: boardParam.boardTitle + ' 목록 조회',
		url			: '/board/rest/select',
		method		: 'POST',
		async		: false,
		data		: param,
		callback	: function (result) {
			
			// row type 정보
			var rowType 	= boardManager.rowType;
			var rowCount	= 5;					//boardManager.rowCount;
			
			// list set
			var html		= '';
			var list		= result.list;
			var listLength	= list.length;
			var totalCount	= result.totalCount;
			var tableTag	= $('#boardTable');
			var colCount	= tableTag.find('thead').find('th').length;
			
			// row set
			var eRow = page * limit;
			var sRow = eRow - limit + 1;
				eRow = eRow > totalCount ? totalCount : eRow;
				
			// total count
			$('#totalCount').text(totalCount);
			// 현재 페이지 건수
			$('#nowLimit').text(sRow + '-' + eRow);
			
			if (rowType == 'B') {
				// head colgroup append
				tableTag.find('colgroup').empty();
				for (var i = 0; i < rowCount; i++) {
					tableTag.find('colgroup').append('<col width="' + (100 / rowCount) + '%"/>');
				}
			}
			
			for (var i = 0; i < listLength; i++) {
				var thisObj = list[i];
				
				var thumbnail	= thisObj.thumbnail;
				var url			= '/file/rest/download?' + thumbnail;
				
				// 목록형
				if (rowType == 'L') {
					var adminName 	= thisObj.admin ? thisObj.admin.adminName : null;
					var memberName 	= thisObj.member ? thisObj.member.memberName : null;
					
					var name = adminName ? adminName : memberName;
					
					html += '<tr class="board_detail detail-tr" idx="' + thisObj.boardIdx + '">';
					html += '	<td class="text-right">'	+ (sRow + i) + '</td>';
					html += '	<td class="text-left">' 	+ thisObj.title + '</td>';
					html += '	<td class="text-center">' 	+ name + '</td>';
					html += '	<td class="text-center">' 	+ common.date.toString(new Date(thisObj.createDate), '-') + '</td>';
					html += '	<td class="text-right">' 	+ common.number.addComma(thisObj.hit) + '</td>';
					html += '</tr>';
					
				// 바둑판형
				} else if (rowType == 'B') {
					
					// 최초 tr
					if (i == 0) {
						html += '<tr>';
					}
					
					html += '<td class="board_detail detail-td-img text-center" idx="' + thisObj.boardIdx + '">';
					html += 	(thumbnail ? '<img class="image-100-per code-img" src="' + url + '"/>&nbsp;' : '');
					html += '	<br>';
					html += '	<div>' + thisObj.title + '</div>';
					html += '	<br>';
					html += '</td>';
					
					// td row count 맞춰 tr 추가
					if (i > 0 && (i % rowCount == 0)) {
						html += '</tr>';
						html += '<tr>';
					}
					
					// 마지막 tr
					if ((i + 1) == listLength) {
						if (i < rowCount) {
							for (var j = 0; j < (rowCount - i - 1); j++) {
								html += '<td></td>';
							}
						}
						html += '</tr>';
					}
				}
			}
			
			// 목록 없을 때
			if (listLength == 0) {
				html  = '<tr>';
				html += '	<td class="text-center" colspan="' + colCount + '">내용이 없습니다.</td>';
				html += '</tr>';
			}
			
			// 목록 초기화 후 append
			tableTag.find('tbody').empty().append(html);
			
			// paging
			common.paging(page, limit, 10, totalCount, selectBoardFunc);
			
			// 상세 button event
			$('.board_detail').unbind('click').click(function (e) {
				e.preventDefault();
				
				// modal show
				$('#detailBoardPopup').modal('show');
				// 상세 조회
				detailBoardFunc($(this).attr('idx'));
			});
		}
	});
}


/**
 * 버튼 별 버튼영역 셋팅 Function
 * 
 * @param type
 * @returns
 */
function buttonChange (type) {
	
	// 전체 hide
	$('.change_btn').hide();
	
	// B_001 : 상세
	if (type == 'B_001') {
		$('#updatePopupBtn').show();
		
	// B_002 : 상세 -> 수정 팝업
	} else if (type == 'B_002') {
		$('#boardUpdateBtn, #boardDeleteBtn').show();
		
	// B_003 : 게시판 작성 권한 없음
	} else if (type == 'B_003') {
		$('#updatePopupBtn, .popup_btn').remove();
		
	// B_004 : 게시판 신규 등록
	} else if (type == 'B_004') {
		$('#boardInsertBtn').show();
		
	// BA_001 : 답변 작성
	} else if (type == 'BA_001') {
		$('#updatePopupBtn, #answerBtn').show();
		$('#answerBtn').text('답변 수정');
		$('#answerBtn').attr('mergeType', 'C');
		
	// BA_002 : 답변 수정
	} else if (type == 'BA_002') {
		$('#updatePopupBtn, #answerBtn').show();
		$('#answerBtn').text('답변 작성');
		$('#answerBtn').attr('mergeType', 'N');
		
	// BA_003 : 답변 작성 -> 답변 등록
	} else if (type == 'BA_003') {
		$('#answerInsertBtn').show();
		
	// BA_004 : 답변 수정 -> 답변 저장, 답변 삭제
	} else if (type == 'BA_004') {
		$('#answerUpdateBtn, #answerDeleteBtn').show();
		
	// BA_005 : 답변 권한 없음
	} else if (type == 'BA_005') {
		$('#answerBtn, .popup_answer_btn').remove();
		$('#updatePopupBtn').show();
	}
	
}

/**
 * type 별 object 셋팅  Function
 * 
 * @param type
 * @returns
 */
function typeFunc (type) {
	
	var writeType 	= boardManager.writeType;
	var isAnswer	= boardManager.isAnswer;
	
	var mergeText 	= '상세';
	var tagType		= 'detail';
	
	// 상세
	if (type == 'T') {
		mergeText	= '상세';
		tagType		= 'detail';
		
	// 등록
	} else if (type == 'I') {
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
		return {};
	}
	
	return {
		writeType	: writeType,
		isAnswer	: isAnswer,
		mergeText	: mergeText,
		tagType		: tagType,
	};
}