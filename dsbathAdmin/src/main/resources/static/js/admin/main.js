$(function () {
	
	// 검색 이벤트 시작
	common.search.start(selectAdminFunc);
	
	// 우편번호 찾기 : 등록
	postCode.start('insert');
	// 우편번호 찾기 : 상세
	postCode.start('update');
	
	// 검색 초기화 event
	$('#searchResetBtn').unbind('click').click(function (e) {
		e.preventDefault();
		
		$('#searchAdminName').val('');
		$('#searchAdminId').val('');
		$('#searchAddress').val('');
		$('#periodDate').val('');
		
		$('#searchBtn').click();
	});
	
	// 관리자 등록 Button event
	$('.merge_admin_btn').unbind('click').click(function (e) {
		e.preventDefault();
		
		mergeAdminFunc($(this).attr('mergeType'), $(this).attr('idx'));
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
			common.alert('dang', '관리자 아이디 중복확인 요청중 서버 에러가 발생하였습니다.');
		}
		
	}).fail(function (result) {
		common.alert('관리자 아이디 중복확인 요청중 서버 통신 장애가 발생하였습니다.');
	});
	
	return isSamed;
}

/**
 * 관리자 목록 조회 Function
 * 
 * @returns
 */
function selectAdminFunc (p) {
	
	// 페이징 변수
	page	= p ? p : 1;
	limit	= $('#rowLimit').val();
	
	// 기간 데이터 파싱
	var startDate 	= '';
	var endDate 	= '';
	if ($('#periodDate').val()) {
		startDate 	= common.date.toString( $('#periodDate').data('daterangepicker').startDate._d, '' );
		endDate 	= common.date.toString( $('#periodDate').data('daterangepicker').endDate._d, '' ); 
	}
	
	$.ajax({
		url			: '/admin/rest/select',
		method		: 'POST',
		dataType	: 'JSON',
		data		: {
			page			: (page - 1) * limit,
			limit			: limit,
			sort			: common.search.obj.sort,
			sortType		: common.search.obj.sortType,
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
				var address 		= thisObj.address ? thisObj.address : '';
				var addressDetail 	= thisObj.addressDetail ? thisObj.addressDetail : '';
				
				var addr = (address ? address + ' ' : '') + addressDetail;
				
				html += '<tr class="admin_detail detail-tr" idx="' + thisObj.adminIdx + '">';
				html += '	<td class="text-right">' + (sRow + i) + '</td>';
				html += '	<td>' + thisObj.adminName + '</td>';
				html += '	<td>' + thisObj.adminId + '</td>';
				html += '	<td>' + addr + '</td>';
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
			common.paging(page, limit, 10, totalCount, selectAdminFunc);
			
			// 상세 팝업
			$('.admin_detail').unbind('click').click(function (e) {
				e.preventDefault();
				
				var adminIdx = $(this).attr('idx');
				
				$('.merge_admin_btn').attr('idx', adminIdx);
				
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
			$('#updateZipCode').val(detail.zipCode);
			$('#updateAddress').val(detail.address);
			$('#updateAddressDetail').val(detail.addressDetail);
			
		} else {
			common.alert('dang', '관리자 상세 정보 조회 요청중 에러가 발생하였습니다.');
		}
		
	}).fail(function (result) {
		common.alert('dang', '관리자 상세 정보 조회 요청중 서버 통신 에러가 발생하였습니다.');
	});
}

/**
 * 관리자 등록, 수정, 삭제 Function
 * 
 * @returns
 */
function mergeAdminFunc (type, idx) {
	
	var mergeText = '등록';
	var tagType = 'insert';
	
	// 등록 설정
	if (type == 'I') {
		tagType = 'insert';
		mergeText = '등록';
		
	// 수정 설정 
	} else if (type == 'U') {
		tagType = 'update';
		mergeText = '수정';
		
	// 삭제 설정
	} else if (type == 'D') {
		mergeText = '삭제';
		
	} else {
		return false;
	}
	
	// validation : 등록, 수정만 해당
	if (type == 'I' || type == 'U') {
		
		// 이름 validation
		if (!$('#' + tagType + 'AdminName').val()) {
			common.alert('warn', '이름을 입력해 주세요.');
			$('#' + tagType + 'AdminName').focus();
			return false;
		}
		
		// 등록
		if (type == 'I') {
			// 아이디 validation
			if (!$('#' + tagType + 'AdminId').val()) {
				common.alert('warn', '아이디를 입력해 주세요.');
				$('#' + tagType + 'AdminId').focus();
				return false;
			}
			
			// 아이디 중복확인
			if (!adminIdCheckedFunc()) {
				common.alert('warn', '현재 사용중인 아이디입니다.\n다시 입력해 주세요.');
				$('#' + tagType + 'AdminId').focus();
				return false;
			}
			
			// 비밀번호 validation
			if (!$('#' + tagType + 'Password').val()) {
				common.alert('warn', '비밀번호를 입력해 주세요.');
				$('#' + tagType + 'Password').focus();
				return false;
			}
		
		// 수정
		} else if (type == 'U') {
			// 비밀번호 validation
			if ($('#updatePasswordChangeBtn').attr('changeType') == 'on' && !$('#updatePassword').val()) {
				alert('비밀번호를 입력해 주세요.');
				$('#updatePassword').focus();
				return false;
			}
		}
		
		// 주소 validation
		if (!$('#' + tagType + 'ZipCode').val() || !$('#' + tagType + 'Address').val()) {
			common.alert('warn', '우편번호를 입력해 주세요.');
			return false;
		}
	}
	
	// confirm
	if (confirm('해당 관리자 정보를 ' + mergeText + '하시겠습니까?')) {
		
		// parameter
		var param = {
			type : type,
		};
		
		if (type == 'U' || type == 'D') {
			param['adminIdx'] = idx;
		}
		
		if (type == 'I' || type == 'U') {
			param['adminName'] 		= $('#' + tagType + 'AdminName').val();
			param['adminId']		= $('#' + tagType + 'AdminId').val();
			param['password']		= $('#' + tagType + 'Password').val();
			param['zipCode']		= $('#' + tagType + 'ZipCode').val();
			param['address']		= $('#' + tagType + 'Address').val();
			param['addressDetail']	= $('#' + tagType + 'AddressDetail').val();
		}
		
		//---> 통신 요청
		$.ajax({
			url			: '/admin/rest/merge',
			method		: 'POST',
			dataType	: 'JSON',
			async		: false,
			data		: param,
			
		//---> 통신 완료
		}).done(function (result) {
			
			// 통신 성공
			if (result.status) {
				
				// 성공
				if (result.resultCount == 1) {
					
					// alert
					common.alert('succ', '관리자 정보 ' + mergeText + '을 완료하였습니다.');
					
					// 정보 초기화
					$('#' + tagType + 'AdminName').val('');
					$('#' + tagType + 'AdminId').val('');
					$('#' + tagType + 'Password').val('');
					$('#' + tagType + 'ZipCode').val('');
					$('#' + tagType + 'Address').val('');
					$('#' + tagType + 'AddressDetail').val('');
					
					if (type == 'U') {
						$('#updatePasswordChangeBtn').click();
					}
					
					// 팝업 닫기
					$('#insertAdminPopup .close').click();
					$('#detailAdminPopup .close').click();
					
					// 목록 재조회
					selectAdminFunc();
				
				// 실패
				} else {
					common.alert('dang', '관리자 정보 ' + mergeText + '을(를) 실패하였습니다.');
				}
				
			// 통신 에러
			} else {
				common.alert('dang', '관리자 정보 ' + mergeText + ' 요청중 에러가 발생하였습니다.');
			}
		
		//---> 통신 에러
		}).fail(function (result) {
			common.alert('dang', '관리자 정보 ' + mergeText + ' 요청중 서버 통신 에러가 발생하였습니다.');
		});
	}
}
