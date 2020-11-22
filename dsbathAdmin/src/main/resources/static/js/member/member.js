var sortType;
var sort;
var page = 1;

$(function () {
	
	// 우편번호 찾기 : 등록
	postCode.start('insert');
	
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
	
	// 검색 button click event
	$('#searchBtn').unbind('click').click(function (e) {
		e.preventDefault();
		
		selectMemberFunc();
	});
	
	// 목록 조회
	$('#searchBtn').click();
	
	// limit change event
	$('#rowLimit').change(function () {
		$('#searchBtn').click();
	});
	
	// sort click event
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
		
		$('#searchBtn').click();
	});
	
	// 등록 button event
	$('#insertMemberBtn').unbind('click').click(function (e) {
		e.preventDefault();
		
		insertMemberFunc();
	});
	
});

/**
 * 사용자 목록 조회 Function
 * 
 * @param
 * @returns
 */
function selectMemberFunc (p) {
	// 페이지 변수 
	page 	= p ? p : 1;
	limit	= $('#rowLimit').val();
	
	//---> 통신 요청
	$.ajax({
		url			: '/member/rest/list',
		method		: 'POST',
		dataType	: 'JSON',
		data		: {
			
			// 페이징
			page		: (page - 1) * limit,
			limit		: limit,
			sort		: sort,
			sortType	: sortType,
		}
	
	//---> 통신 완료
	}).done(function (result) {
		
		// 성공
		if (result.status) {
			
			// list set
			var html 		= '';
			var list		= result.list;
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
			
			// add list html
			for (var i = 0; i < listLength; i++) {
				var thisObj = list[i];
				
				html += '<tr class="member_detail detail-tr" idx="' + thisObj.memberIdx + '">';
				html += '	<td class="text-right">' + (sRow + i) + '</td>';
				html += '	<td>' + thisObj.memberName + '</td>';
				html += '	<td>' + thisObj.memberId + '</td>';
				html += '	<td>' + thisObj.address + '</td>';
				html += '	<td class="text-center">' + common.date.toString(new Date(thisObj.createDate), '-') + '</td>';
				html += '</tr>';
			}
			
			// add empty html
			if (listLength == 0) {
				html  = '<tr>';
				html += '	<td class="text-center" colspan="5">내용이 없습니다.</td>';
				html += '</tr>';
			}
			
			// 목록 초기화 후 append
			$('#memberTable').find('tbody').empty().append(html);
			
			// paging
			common.paging(page, limit, 10, totalCount, selectMemberFunc);
			
		// 실패
		} else {
			common.alert('dang', '사용자 목록 조회중 에러가 발생하였습니다.');
		}
	
	//---> 통신 에러
	}).fail(function () {
		common.alert('dang', '사용자 목록 조회 요청중 서버 통신 장애가 발생하였습니다.');
	});
}
/**
 * 회원 정보 등록 Function
 * 
 * @returns
 */
function insertMemberFunc () {
	
	var memberName 	= $('#insertMemberName').val();
	var memberId 	= $('#insertMemberId').val();
	var password	= $('#insertPassword').val();
	
	// 이름 validation
	if (!memberName) {
		common.alert('warn', '이름을 입력해 주세요.');
		$('#insertMemberName').focus();
		return false;
	}
	
	// 아이디 validation
	if (!memberId) {
		common.alert('warn', '아이디를 입력해 주세요.');
		$('#insertMemberId').focus();
		return false;
	}
	
	// 아이디 중복확인
	if (!memberIdCheckedFunc(memberId)) {
		common.alert('warn', '현재 사용중인 아이디입니다.\n다시 입력해 주세요.');
		$('#insertMemberId').focus();
		return false;
	}
	
	// 비밀번호 validation
	if (!password) {
		common.alert('warn', '비밀번호를 입력해 주세요.');
		$('#insertPassword').focus();
		return false;
	}
	
	// 주소 validation
	if (!$('#insertZipCode').val() || !$('#insertAddress').val()) {
		common.alert('warn', '우편번호를 입력해 주세요.');
		return false;
	}
	
	// confirm
	if (confirm('사용자 정보를 등록하시겠습니까?')) {
		
		//---> 통신 요청
		$.ajax({
			url			: '/member/rest/merge',
			method		: 'POST',
			dataType	: 'JSON',
			data		: {
				type			: 'I',
				memberName		: memberName,
				memberId		: memberId,
				password		: password,
				zipCode			: $('#insertZipCode').val(),
				address			: $('#insertAddress').val(),
				addressDetail	: $('#insertAddressDetail').val(),
			}
		
		//---> 통신 완료
		}).done(function (result) {
			
			// 통신 성공
			if (result.status) {
				
				// 등록 성공
				if (result.resultCount == 1) {
					common.alert('succ', '관리자 정보 등록을 완료하였습니다.');
					
					// 등록 정보 초기화
					$('#insertMemberName').val('');
					$('#insertMemberId').val('');
					$('#insertPassword').val('');
					$('#insertAddress').val('');
					
					// 팝업 닫기
					$('#addMemberPopup .close').click();
					
					// 목록 재조회
					
				// 등록 실패
				} else {
					common.alert('dang', '사용자 정보 등록을 실패하였습니다.');
				}
				
			// 통신 에러
			} else {
				common.alert('dang', '사용자 정보 등록 요청중 에러가 발생하였습니다.');
			}
			
		//---> 통신 에러
		}).fail(function (result) {
			common.alert('dang', '사용자 정보 등록 요청중 서버 통신 장애가 발생하였습니다.');
		});
	}
}

/**
 * 사용자 아이디 중복확인 Function
 * 
 * @returns
 */
function memberIdCheckedFunc (memberId) {
	var isSamed = false;
	
	//---> 통신 요청
	$.ajax({
		url			: '/member/rest/memberIdChecked',
		method		: 'POST',
		dataType	: 'JSON',
		async		: false,
		data		: {
			memberId	: $.trim(memberId),
		}
	
	//---> 통신 완료
	}).done(function (result) {
		
		// 요청 성공
		if (result.status) {
			var isSamedCount = result.isSamed;
			
			isSamed = (isSamedCount == 0 ? true : false);
			
		// 요청 에러
		} else {
			common.alert('dang', '사용자 아이디 중복확인 요청중 서버 에러가 발생하였습니다.');
		}
	
	//---> 통신 에러
	}).fail(function () {
		common.alert('dang', '사용자 아이디 중복확인 요청중 서버 통신 장애가 발생하였습니다.')
	});
	
	return isSamed;
}