var sortType;
var sort;
var page = 1;

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
					// 초기화
					$('#insertTitle').val('');
					$('#insertContent').val('');
					$('#isImportCheck').prop('checked', false);
					$('#isCommentCheck').prop('checked', false);
					$('#isPopupCheck').prop('checked', false);
					
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
function noticeSelectFunc (p) {
	// 페이징 변수
	page	= p ? p : 1;
	limit	= $('#rowLimit').val();
	
	$.ajax({
		url			: '/notice/rest/list',
		method		: 'POST',
		dataType	: 'JSON',
		data		: {
			page		: (page - 1) * limit,
			limit		: limit,
			sort		: sort,
			sortType	: sortType,
		}
	
	// 요청 완료
	}).done(function (result) {
		
		if (result.status) {
			
			var html		= '';
			var list 		= result.list;
			var listLength 	= list.length;
			var totalCount	= result.totalCount;

			var eRow = page * limit;
			var sRow = eRow - limit + 1;
				eRow = eRow > totalCount ? totalCount : eRow;
			
			// total count
			$('#totalCount').text(totalCount);
			// 현재 페이지 건수
			$('#nowLimit').text(sRow + '-' + eRow);
				
			for (var i = 0; i < listLength; i++) {
				var thisObj = list[i];
			
				html += '<tr class="notice_detail" idx="' + thisObj.noticeIdx + '">';
				html += '	<td>' + (sRow + i) + '</td>';
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
			
		} else {
			common.alert('dang', '공지사항 목록 조회중 서버 에러가 발생하였습니다.');
		}
		
	// 요청 에러
	}).fail(function (result) {
		common.alert('dang', '공지사항 목록 조회 요청중 서버 통신 장애가 발생하였습니다.');
	});
}