$(function () {
	
	// 검색 button click event
	$('#searchBtn').unbind('click').click(function (e) {
		e.preventDefault();
		
		noticeSelectFunc();
	});
	
	// 목록 조회
	$('#searchBtn').click();
	
	// date range picker 옵션 적용
	$('#popupDate').daterangepicker({
		autoUpdateInput	: false,
		'applyClass'	: 'btn-sm btn-dark',
		'cancelClass'	: 'btn-sm btn-light',
		drops			: 'up',
		locale			: {
			format : 'YYYY-MM-DD'
		}
	});
	$('#popupDate').on('apply.daterangepicker', function (e, picker) {
		$(this).val(
			picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'));
	});
	
	// 등록 button click event
	$('#insertAdminBtn').unbind('click').click(function (e) {
		e.preventDefault();
		
		noticeInsertFunc();
	});
});

/**
 * 공지사항 등록 Function
 * 
 * @returns
 */
function noticeInsertFunc () {
	
	var title 		= $('#insertTitle').val();
	var content 	= $('#insertContent').val();
	var isImport 	= ($('#isImportCheck').prop('checked') ? '1' : '0');
	var isComment	= ($('#isCommentCheck').prop('checked') ? '1' : '0');
	var isPopup		= ($('#isPopupCheck').prop('checked') ? '1' : '0');
	
	var startDate	= '';
	var endDate		= '';
	if ($('#popupDate').val()) {
		startDate	= common.date.toString( $('#popupDate').data('daterangepicker').startDate._d, '' );
		endDate		= common.date.toString( $('#popupDate').data('daterangepicker').endDate._d, '' )
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
					common.alert('succ', '공지사항 등록을 완료하였습니다.');

					// 팝업 닫기
					$('#addNoticePopup .close').click();
					
				// 등록 실패
				} else {
					
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
 * 공지사항 목록 Function
 * 
 * @returns
 */
function noticeSelectFunc () {
	
	$.ajax({
		url			: '/notice/rest/list',
		method		: 'POST',
		dataType	: 'JSON',
		data		: {
			
		}
	
	// 요청 완료
	}).done(function (result) {
		
		if (result.status) {
			var list = result.list;
			console.log(list);
			
		} else {
			common.alert('dang', '공지사항 목록 조회중 서버 에러가 발생하였습니다.');
		}
		
	// 요청 에러
	}).fail(function (result) {
		common.alert('dang', '공지사항 목록 조회 요청중 서버 통신 장애가 발생하였습니다.');
	});
}