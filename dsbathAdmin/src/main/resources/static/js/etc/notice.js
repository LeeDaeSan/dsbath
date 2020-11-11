var sortType;
var sort;
var page = 1;

$(function () {
	
	// summernote init
	$('#insertContent, #updateContent').summernote({
		height 		: 300,
		minHeight	: null,
		maxHeight	: null,
		focus		: true,
		lang		: 'ko-KR',
		placeholder	: '',
		callbacks	: {
			onImageUpload : function (files, el, e) {
				var fileLength = files.length;
				for (var i = 0; i < fileLength; i++) {
					common.file.save(files[i]);
				}
			},
			onMediaDelete : function (target) {
			}
		}
	});
	
	// date range picker 옵션 적용
	$('#popupDate, #periodDate, #updatePopupDate').daterangepicker({
		autoUpdateInput	: false,
		'applyClass'	: 'btn-sm btn-dark',
		'cancelClass'	: 'btn-sm btn-light',
		drops			: 'up',
		locale			: {
			format : 'YYYY-MM-DD'
		}
	});
	$('#popupDate, #periodDate').on('apply.daterangepicker', function (e, picker) {
		$(this).val(
			picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'));
	});
	
	// 검색 button click event
	$('#searchBtn').unbind('click').click(function (e) {
		e.preventDefault();
		
		noticeSelectFunc();
	});
	
	// 목록 조회
	$('#searchBtn').click();
	
	// 검색 설정 : title, content keyup event
	$('#searchTitle, #searchContent').keyup(function (e) {
		if (e.keyCode == '13') {
			$('#searchBtn').click();
		}
	});
	
	// 검색 설정 : checkbox keyup event
	$('#searchIsImportCheck, #searchIsCommentCheck, #searchIsPopupCheck').change(function (e) {
		$('#searchBtn').click();
	});
	
	// 검색 초기화 event
	$('#searchResetBtn').unbind('click').click(function (e) {
		e.preventDefault();
		
		$('#searchTitle').val('');
		$('#searchContent').val('');
		$('#searchAdminName').val('');
		$('#periodDate').val('');
		
		if ($('#searchIsImportCheck').prop('checked')) {
			$('#searchIsImportCheck').click();	
		}
		if ($('#searchIsCommentCheck').prop('checked')) {
			$('#searchIsCommentCheck').click();	
		}
		if ($('#searchIsPopupCheck').prop('checked')) {
			$('#searchIsPopupCheck').click();	
		}
		
		$('#searchBtn').click();
	});
	
	// limit change event
	$('#rowLimit').change(function () {
		noticeSelectFunc(page);
	});
	
	// sort th click event
	$('.sort_th').unbind('click').click(function (e) {
		e.preventDefault();
		
			sortType = $(this).attr('sortType');
		var thisSort = $(this).attr('sort');
		
		// 나머지 초기화
		$('.sort_th').each(function () {
			var thisSortType = $(this).attr('sortType');
			if (sortType != thisSortType) {
				$(this).attr('sort', '');
				$(this).find('.sort_img')
						.addClass('fa-exchange')
						.removeClass('fa-sort-amount-desc')
						.removeClass('fa-sort-amount-asc');
			}
		});
		
		// sort가 없거나 asc인 경우 : desc 변경
		if (!thisSort || thisSort == 'asc') {
			$(this).attr('sort', 'desc');
			$(this).find('.sort_img')
					.addClass('fa-sort-amount-desc')
					.removeClass('fa-exchange')
					.removeClass('fa-sort-amount-asc');
			
		// sort가 desc인 경우 : asc 변경
		} else if (thisSort == 'desc') {
			$(this).attr('sort', 'asc');
			$(this).find('.sort_img')
					.addClass('fa-sort-amount-asc')
					.removeClass('fa-exchange')
					.removeClass('fa-sort-amount-desc');
		}
		
		sort = $(this).attr('sort');
		noticeSelectFunc(page);
	});
	
	// 등록 form 팝업여부 checkbox event
	$('#isPopupCheck').change(function (e) {
		e.preventDefault();
		
		if ($(this).prop('checked')) {
			$('#addNoticePopup .popup_tr').show();
		} else {
			$('#addNoticePopup .popup_tr').hide();
		}
	});
	
	// 등록 button click event
	$('#insertNoiceBtn').unbind('click').click(function (e) {
		e.preventDefault();
		
		noticeInsertFunc();
	});
});

/**
 * 공지사항 목록 Function
 * 
 * @returns
 */
function noticeSelectFunc (p) {
	// 페이징 변수
	page	= p ? p : 1;
	limit	= $('#rowLimit').val();
	
	var startDate 	= '';
	var endDate 	= '';
	if ($('#periodDate').val()) {
		startDate 	= common.date.toString( $('#periodDate').data('daterangepicker').startDate._d, '' );
		endDate 	= common.date.toString( $('#periodDate').data('daterangepicker').endDate._d, '' ); 
	}
	
	var isImport 	= ($('#searchIsImportCheck').prop('checked') ? '1' : '0');
	var isComment	= ($('#searchIsCommentCheck').prop('checked') ? '1' : '0');
	var isPopup		= ($('#searchIsPopupCheck').prop('checked') ? '1' : '0');
	
	//---> 통신 요청
	$.ajax({
		url			: '/notice/rest/list',
		method		: 'POST',
		dataType	: 'JSON',
		data		: {
			
			// 페이징
			page		: (page - 1) * limit,
			limit		: limit,
			sort		: sort,
			sortType	: sortType,
			
			// 검색 조건
			title				: $('#searchTitle').val(),
			content				: $('#searchContent').val(),
			'admin.adminName' 	: $('#searchAdminName').val(),
			startDateStr		: startDate,
			endDateStr			: endDate,
			isImport			: isImport,
			isComment			: isComment,
			isPopup				: isPopup,
		}
	
	//---> 통신 완료
	}).done(function (result) {
		
		// 성공
		if (result.status) {
			
			// list set
			var html		= '';
			var list 		= result.list;
			var listLength 	= list.length;
			var totalCount	= result.totalCount;

			// row set
			var eRow = page * limit;
			var sRow = eRow - limit + 1;
				eRow = eRow > totalCount ? totalCount : eRow;
			
			// total count
			$('#totalCount').text(totalCount);
			// 현재 페이지 건수
			$('#nowLimit').text(sRow + '-' + eRow);
			
			for (var i = 0; i < listLength; i++) {
				var thisObj = list[i];
			
				html += '<tr class="notice_detail detail-tr" idx="' + thisObj.noticeIdx + '">';
				html += '	<td class="text-right">' + (sRow + i) + '</td>';
				html += '	<td>' + thisObj.title + '</td>';
				html += '	<td class="text-center">' + thisObj.admin.adminName + '</td>';
				html += '	<td class="text-center">' + common.date.toString(new Date(thisObj.createDate), '-') + '</td>';
				html += '	<td class="text-center">' + common.date.toString(new Date(thisObj.updateDate), '-') + '</td>';
				html += '	<td class="text-right">' + thisObj.hit + '</td>';
				html += '</tr>';
			}
			
			if (listLength == 0) {
				html  = '<tr>';
				html += '	<td class="text-center" colspan="5">내용이 없습니다.</td>';
				html += '</tr>';
			}
			
			// 목록 초기화 후 append
			$('#noticeTable').find('tbody').empty().append(html);
			
			// paging
			common.paging(page, limit, 10, totalCount, noticeSelectFunc);
			
			// 상세 조회
			$('.notice_detail').unbind('click').click(function (e) {
				e.preventDefault();
				
				noticeDetailFunc($(this).attr('idx'));
				
				// 팝업 show
				$('#detailNoticePopup').modal();
				$('#detailNoticePopup').show();
			});
			
		// 실패
		} else {
			common.alert('dang', '공지사항 목록 조회중 서버 에러가 발생하였습니다.');
		}
		
	//---> 통신 에러
	}).fail(function (result) {
		common.alert('dang', '공지사항 목록 조회 요청중 서버 통신 장애가 발생하였습니다.');
	});
}

/**
 * 공지사항 상세 Function
 * 
 * @returns
 */
function noticeDetailFunc (noticeIdx) {
	
	$('#detailNoticePopup .update_tbody, #savePopupBtn').hide();
	$('#detailNoticePopup .detail_tbody, #updatePopupBtn, #deletePopupBtn').show();
	
	$.ajax({
		url			: '/notice/rest/detail',
		method		: 'POST',
		dataType	: 'JSON',
		data		: {
			noticeIdx : noticeIdx,
		}
	
	}).done(function (result) {
	
		if (result.status) {
			var detail = result.detail;
			
			// 상세 정보
			$('#detailTitle').text(detail.title);
			$('#detailAdmin').text(detail.admin.adminName);
			$('#detailCreateDate').text(common.date.toString(new Date(detail.createDate), '-'));
			$('#detailContent').append(detail.content);
			
			// 수정 상세 정보
			$('#updateTitle').val(detail.title);
			$('#updateContent').summernote('code', detail.content);
			$('#updatePopupDate').val();
			
			var popupStartDate 	= detail.popupStartDate;
			var popupEndDate	= detail.popupEndDate;
			if (popupStartDate && popupEndDate) {
				$('#updatePopupDate').val(
						common.date.toString(new Date(popupStartDate), '-') + ' - ' + common.date.toString(new Date(popupEndDate), '-'));
			}
			
			if (detail.isImport == '1') {
				$('#updateIsImportCheck').click();
			} 
			if (detail.isComment == '1') {
				$('#updateIsCommentCheck').click();
			} 
			if (detail.isPopup == '1') {
				$('#updateIsPopupCheck').click();
			} 
			
			// 수정 화면에서 팝업여부 변경
			$('#updateIsPopupCheck').change(function (e) {
				if ($(this).prop('checked')) {
					$('#detailNoticePopup .popup_tr').show();
				} else {
					$('#detailNoticePopup .popup_tr').hide();
				}
			});
			
			// 수정 화면 변경 button event
			$('#updatePopupBtn').unbind('click').click(function (e) {
				e.preventDefault();
				
				$('#detailNoticePopup .detail_tbody, #updatePopupBtn, #deletePopupBtn').hide();
				$('#detailNoticePopup .update_tbody, #savePopupBtn').show();
			});
			
			// 저장 button event
			$('#savePopupBtn').unbind('click').click(function (e) {
				e.preventDefault();
				
				noticeUpdateFunc(noticeIdx);
			});
			
			// 삭제 button event
			$('#deletePopupBtn').unbind('click').click(function (e) {
				e.preventDefault();
				
				noticeDeleteFunc(noticeIdx);
			});
			
		} else {
			common.alert('dang', '공지사항 상세 조회중 서버 에러가 발생하였습니다.');
		}
		
	// 통신 에러
	}).fail(function (result) {
		common.alert('dang', '공지사항 상세 조회 요청중 서버 통신 장애가 발생하였습니다.');
	});
	
}

/**
 * 공지사항 등록 Function
 * 
 * @returns
 */
function noticeInsertFunc () {
	
	var title 		= $('#insertTitle').val();
	var content 	= $('#insertContent').summernote('code');
	var isImport 	= ($('#isImportCheck').prop('checked') ? '1' : '0');
	var isComment	= ($('#isCommentCheck').prop('checked') ? '1' : '0');
	var isPopup		= ($('#isPopupCheck').prop('checked') ? '1' : '0');
	
	var startDate	= '';
	var endDate		= '';
	if (isPopup == '1') {
		startDate	= common.date.toString( $('#popupDate').data('daterangepicker').startDate._d, '' );
		endDate		= common.date.toString( $('#popupDate').data('daterangepicker').endDate._d, '' );
	}
	
	// 제목 validation
	if (!title) {
		common.alert('warn', '제목을 입력해 주세요.');
		$('#insertTitle').focus();
		return false;
	}
	// 내용 validation
	if (!content) {
		common.alert('warn', '내용을 입력해 주세요.');
		$('#insertContent').focus();
		return false;
	}
	
	// confirm
	if (confirm('공지사항을 등록하시겠습니까?')) {
		
		$.ajax({
			url 		: '/notice/rest/merge',
			method		: 'POST',
			dataType	: 'JSON',
			data		: {
				type				: 'I',
				title				: title,
				content				: content,
				isImport			: isImport,
				isComment			: isComment,
				isPopup				: isPopup,
				popupStartDateStr 	: startDate,
				popupEndDateStr		: endDate,
			}
		
		}).done(function (result) {
			
			// 결과
			if (result.status) {
				var resultCount = result.resultCount;
				
				// 등록 성공
				if (resultCount == 1) {
					// 초기화
					$('#insertTitle').val('');
					$('#insertContent').summernote('reset')
					$('#isImportCheck').prop('checked', false);
					$('#isCommentCheck').prop('checked', false);
					$('#isPopupCheck').prop('checked', false);
					
					common.alert('succ', '공지사항 등록을 완료하였습니다.');
					
					// 팝업 닫기
					$('#addNoticePopup .close').click();
					
					// 목록 조회
					noticeSelectFunc();
					
				// 등록 실패
				} else {
					common.alert('dang', '공지사항 등록중 서버 에러가 발생하였습니다.');
				}
				
			// error
			} else {
				common.alert('dang', '공지사항 등록중 서버 에러가 발생하였습니다.');
			}
			
		// request error
		}).fail(function (result) {
			common.alert('dang', '공지사항 등록 요청중 서버 통신 장애가 발생하였습니다.');
		});
	}
}

/**
 * 공지사항 수정 Function
 * 
 * @returns
 */
function noticeUpdateFunc (noticeIdx) {
	
	var title 		= $('#updateTitle').val();
	var content		= $('#updateContent').summernote('code');
	var isImport	= ($('#updateIsImportCheck').prop('checked') ? '1' : '0');
	var isComment	= ($('#updateIsCommentCheck').prop('checked') ? '1' : '0');
	var isPopup		= ($('#updateIsPopupCheck').prop('checked') ? '1' : '0');
	
	var startDate 	= '';
	var endDate		= '';
	if (isPopup == '1') {
		startDate	= common.date.toString( $('#updatePopupDate').data('daterangepicker').startDate._d, '' );
		endDate		= common.date.toString( $('#updatePopupDate').data('daterangepicker').endDate._d, '' );
	}
	
	// 제목 validation
	if (!title) {
		common.alert('warn', '제목을 입력해 주세요.');
		$('#updateTitle').focus();
		return false;
	}
	// 내용 validation
	if (!content) {
		common.alert('warn', '내용을 입력해 주세요.');
		$('#updateContent').focus();
		return false;
	}
	
	if (confirm('수정사항을 저장하시겠습니까?')) {
		
		$.ajax({
			url 		: '/notice/rest/merge',
			method		: 'POST',
			dataType	: 'JSON',
			data		: {
				type				: 'U',
				noticeIdx			: noticeIdx,
				title				: title,
				content				: content,
				isImport			: isImport,
				isComment			: isComment,
				isPopup				: isPopup,
				popupStartDateStr 	: startDate,
				popupEndDateStr		: endDate,
			}
		
		// 완료
		}).done(function (result) {
			
			if (result.status) {
				var resultCount = result.resultCount;
				
				// 성공
				if (resultCount == 1) {
					
					common.alert('succ', '공지사항 수정을 완료하였습니다.');
					
					// 팝업 닫기
					$('#detailNoticePopup .close').click();
				
					// 목록 조회
					noticeSelectFunc();
					
				// 실패
				} else {
					common.alert('dang', '공지사항 수정 실패하였습니다.');
				}
				
			// 에러
			} else {
				common.alert('dang', '공지사항 수정중 서버 에러가 발생하였습니다.');
			}
			
		// 통신 에러
		}).fail(function () {
			common.alert('dang', '공지사항 수정 요청중 서버 통신 장애가 발생하였습니다.');
		});
	}
}

/**
 * 공지사항 삭제 Function
 * 
 * @param noticeIdx
 * @returns
 */
function noticeDeleteFunc (noticeIdx) {
	
	// confirm
	if (confirm('해당 공지사항을 삭제하시겠습니까?')) {
		
		$.ajax({
			url 		: '/notice/rest/merge',
			method		: 'POST',
			dataType	: 'JSON',
			data		: {
				type				: 'D',
				noticeIdx			: noticeIdx,
			}
		
		// 완료
		}).done(function (result) {
			
			// 성공
			if (result.status) {
				var resultCount = result.resultCount;
				
				// 성공
				if (resultCount == 1) {
					
					// alert
					common.alert('succ', '공지사항 삭제를 완료하였습니다.');
					// 팝업 닫기
					$('#detailNoticePopup .close').click();
					// 목록 조회
					noticeSelectFunc();
					
				// 실패
				} else {
					common.alert('dang', '공지사항 삭제 실패하였습니다.');
				}
				
			// 서버 에러
			} else {
				common.alert('dang', '공지사항 삭제중 서버 에러가 발생하였습니다.');
			}
			
		// 통신 에러
		}).fail(function () {
			common.alert('dang', '공지사항 삭제 요청중 서버 통신 장애가 발생하였습니다.');
		});
	}
}