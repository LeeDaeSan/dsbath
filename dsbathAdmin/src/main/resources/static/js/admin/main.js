var sortType;
var sort;
var page = 1;
$(function () {

	// date range picker 옵션 적용
	$('#periodDate').daterangepicker({
		autoUpdateInput	: false,
		'applyClass'	: 'btn-sm btn-dark',
		'cancelClass'	: 'btn-sm btn-light',
		locale			: {
			format : 'YYYY-MM-DD',
		}
	});
	
	$('#periodDate').on('apply.daterangepicker', function(e, picker) {
	      $(this).val(
	    		  picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'));
	});
	
	// 검색 button event
	$('#searchBtn').click(function (e) {
		e.preventDefault();
		
		adminSelectFunc();
	});
	
	// 목록 조회
	$('#searchBtn').click();
	
	// keyup event
	$('#searchAdminName, #searchAdminId, #searchAddress').keyup(function (e) {
		if (e.keyCode == '13') {
			$('#searchBtn').click();
		}
	});
	
	// 검색 초기화 event
	$('#searchResetBtn').unbind('click').click(function (e) {
		e.preventDefault();
		
		$('#searchAdminName').val('');
		$('#searchAdminId').val('');
		$('#searchAddress').val('');
		$('#periodDate').val('');
		
		$('#searchBtn').click();
	});
	
	// limit change event
	$('#rowLimit').change(function () {
		adminSelectFunc(page);
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
		adminSelectFunc(page);
	});
	
	// 관리자 등록 Button event
	$('#insertAdminBtn').unbind('click').click(function (e) {
		e.preventDefault();
		
		// 이름 validation
		if (!$('#insertAdminName').val()) {
			alert('이름을 입력해 주세요.');
			$('#insertAdminName').focus();
			return false;
		}
		
		// 아이디 validation
		if (!$('#insertAdminId').val()) {
			alert('아이디를 입력해 주세요.');
			$('#insertAdminId').focus();
			return false;
		}
		
		// 아이디 중복확인
		if (!adminIdCheckedFunc()) {
			alert('현재 사용중인 아이디입니다.\n다시 입력해 주세요.');
			$('#insertAdminId').focus();
			return false;
		}

		// 비밀번호 validation
		if (!$('#insertPassword').val()) {
			alert('비밀번호를 입력해 주세요.');
			$('#insertPassword').focus();
			return false;
		}
		
		if (confirm('관리자를 등록하시겠습니까?')) {
			insertAdminFunc();
		}
	});
});

/**
 * 관리자 아이디 중복확인 Function
 * 
 * @returns
 */
function adminIdCheckedFunc () {
	var isSamed = false;
	
	$.ajax({
		url 		: '/admin/rest/adminIdChecked',
		method		: 'POST',
		dataType	: 'JSON',
		async		: false,
		data		: {
			adminId		: $.trim($('#insertAdminId').val())
		}
	}).done(function (result) {
		
		if (result.status) {
			var isSamedCount = result.isSamed;
			
			isSamed = (isSamedCount == 0 ? true : false);
			
		} else {
			alert('서버 에러');
		}
		
	}).fail(function (result) {
		alert('서버 에러');
	});
	
	return isSamed;
}

/**
 * 관리자 목록 조회 Function
 * 
 * @returns
 */
function adminSelectFunc (p) {
	
	// 페이징 변수
	page	= p ? p : 1;
	limit	= $('#rowLimit').val();
	
	// 기간 데이터 파싱
	var periodDate 	= -common.number.onlyNumber($('#periodDate').val()) + '';
	var startDate 	= periodDate.substring(0, 8);
	var endDate 	= periodDate.substring(8, 16);
	
	$.ajax({
		url			: '/admin/rest/select',
		method		: 'POST',
		dataType	: 'JSON',
		data		: {
			page			: (page - 1) * limit,
			limit			: limit,
			sort			: sort,
			sortType		: sortType,
			startDateStr	: startDate,
			endDateStr		: endDate,
			adminName		: $('#searchAdminName').val(),
			adminId			: $('#searchAdminId').val(),
			address			: $('#searchAddress').val(),
		}
	
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
				
				html += '<tr class="admin_detail" idx="' + thisObj.adminIdx + '">';
				html += '	<td class="text-right">' + (sRow + i) + '</td>';
				html += '	<td>' + thisObj.adminName + '</td>';
				html += '	<td>' + thisObj.adminId + '</td>';
				html += '	<td>' + thisObj.address + '</td>';
				html += '	<td class="text-center">' + common.date.toString(new Date(thisObj.createDate), '-') + '</td>';
				html += '</tr>';
			}
			
			// 데이터가 없는 경우
			if (listLength == 0) {
				html  = '<tr>';
				html += '	<td colspan="5" class="text-center">데이터가 없습니다.</td>';
				html += '</tr>';
			}
			
			// 초기화 후 목록 추가
			$('#adminTable').find('tbody').empty().append(html);
			
			// paging
			common.paging(page, limit, 10, totalCount, adminSelectFunc);
			
			// 상세 팝업
			$('.admin_detail').unbind('click').click(function (e) {
				e.preventDefault();
				
				var adminIdx = $(this).attr('idx');
				
				// 상세 정보 조회
				adminDetailFunc(adminIdx);
				
				// 팝업 show
				$('#detailAdminPopup').modal();
				$('#detailAdminPopup').show();
				
				// 비밀번호 변경 button
				$('#updatePasswordChangeBtn').unbind('click').click(function (e) {
					e.preventDefault();
					
					var type = $(this).attr('changeType');
					
					// off => on
					if (type == 'off') {
						$('#updatePassword').prop('readOnly', false);
						$(this).attr('changeType', 'on');
						$(this).text('취소');
						
					// on => off
					} else {
						$('#updatePassword').prop('readOnly', true);
						$('#updatePassword').val('');
						$(this).attr('changeType', 'off');
						$(this).text('변경');
					}
				});
				
				// 수정 button
				$('#updateAdminBtn').unbind('click').click(function (e) {
					e.preventDefault();
					
					// 이름 validation
					if (!$('#updateAdminName').val()) {
						alert('이름을 입력해 주세요.');
						$('#updateAdminName').focus();
						return false;
					}
					
					// 비밀번호 validation
					if ($('#updatePasswordChangeBtn').attr('changeType') == 'on' && !$('#updatePassword').val()) {
						alert('비밀번호를 입력해 주세요.');
						$('#updatePassword').focus();
						return false;
					}
					
					if (confirm('수정사항을 저장하시겠습니까?')) {
						updateAdminFunc(adminIdx);
					}
				});
				
				// 삭제 button
				$('#deleteAdminBtn').unbind('click').click(function (e) {
					e.preventDefault();
					
					if (confirm('해당 관리자를 정말 삭제하시겠습니까?')) {
						deleteAdminFunc(adminIdx);
					}
				});
				
			});
			
		} else {
			alert('관리자 목록 조회 실패');
		}
		
	}).fail(function (result) {
		alert('서버 에러');
	});
}

/**
 * 관리자 상세 조회 Function
 * 
 * @returns
 */
function adminDetailFunc (adminIdx) {
	
	$.ajax({
		url			: '/admin/rest/detail',
		method		: 'POST',
		dataType	: 'JSON',
		data		: {
			adminIdx : adminIdx,
		}
	}).done(function (result) {
		
		if (result.status) {
			
			var detail = result.detail;
			
			$('#updateAdminName').val(detail.adminName);
			$('#updateAdminId').val(detail.adminId);
			$('#updateAddress').val(detail.address);
			
		} else {
			alert('서버 에러');
		}
		
	}).fail(function (result) {
		alert('서버 에러');
	});
}

/**
 * 관리자 등록 Function
 * 
 * @returns
 */
function insertAdminFunc () {
	
	$.ajax({
		url			: '/admin/rest/merge',
		method		: 'POST',
		dataType	: 'JSON',
		data		: {
			type		: 'I',
			adminName	: $('#insertAdminName').val(),
			adminId		: $('#insertAdminId').val(),
			password	: $('#insertPassword').val(),
			address		: $('#insertAddress').val(),
		}
	
	}).done(function (result) {
		// 성공
		if (result.status) {
			
			if (result.resultCount == 1) {
				
				alert('등록을 완료하였습니다.');
				
				// 등록 정보 초기화
				$('#insertAdminName').val('');
				$('#insertAdminId').val('');
				$('#insertPassword').val('');
				$('#insertAddress').val('');
				
				// 팝업 닫기
				$('#addAdminPopup .close').click();
				
				// 목록 재조회
				adminSelectFunc();
				
			} else {
				alert('등록 실패');
			}
			
		// 실패
		} else {
			alert('서버 에러');
		}
		
	}).fail(function (result) {
		alert('서버 에러');
	});
}

/**
 * 관리자 정보 수정 Function
 * 
 * @returns
 */
function updateAdminFunc (adminIdx) {
	
	$.ajax({
		url			: '/admin/rest/merge',
		method		: 'POST',
		dataType	: 'JSON',
		data		: {
			type		: 'U',
			adminIdx	: adminIdx,
			adminName	: $('#updateAdminName').val(),
			password	: $('#updatePassword').val(),
			address		: $('#updateAddress').val(),
		}
	
	}).done(function (result) {
		// 성공
		if (result.status) {
			
			if (result.resultCount == 1) {
				
				alert('수정을 완료하였습니다.');
				
				// 상세 정보 초기화
				$('#updateAdminName').val('');
				$('#updateAdminId').val('');
				$('#updatePassword').val('');
				$('#updateAddress').val('');
				
				// 팝업 닫기
				$('#detailAdminPopup .close').click();
				
				// 목록 재조회
				adminSelectFunc();
				
			} else {
				alert('수정 실패');
			}
			
		// 실패
		} else {
			alert('서버 에러');
		}
		
	}).fail(function (result) {
		alert('서버 에러');
	});
}

/**
 * 관리자 정보 삭제 Function
 * 
 * @returns
 */
function deleteAdminFunc (adminIdx) {
	
	$.ajax({
		url			: '/admin/rest/merge',
		method		: 'POST',
		dataType	: 'JSON',
		data		: {
			type		: 'D',
			adminIdx	: adminIdx,
		}
	
	}).done(function (result) {
		// 성공
		if (result.status) {
			
			if (result.resultCount == 1) {
				
				alert('해당 관리자 삭제를 완료하였습니다.');
				
				// 상세 정보 초기화
				$('#updateAdminName').val('');
				$('#updateAdminId').val('');
				$('#updatePassword').val('');
				$('#updateAddress').val('');
				
				// 팝업 닫기
				$('#detailAdminPopup .close').click();
				
				// 목록 재조회
				adminSelectFunc();
				
			} else {
				alert('삭제 실패');
			}
			
		// 실패
		} else {
			alert('서버 에러');
		}
		
	}).fail(function (result) {
		alert('서버 에러');
	});
}