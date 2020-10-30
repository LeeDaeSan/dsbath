$(function () {

	// 목록 조회
	adminSelectFunc();
	
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
 * 관리자 목록 조회 Function
 * 
 * @returns
 */
function adminSelectFunc () {
	
	$.ajax({
		url			: '/admin/rest/select',
		method		: 'POST',
		dataType	: 'JSON',
		data		: {
			
		}
	
	}).done(function (result) {
		
		if (result.status) {
			
			var html		= '';
			var list 		= result.list;
			var listLength 	= list.length;
			
			for (var i = 0; i < listLength; i++) {
				var thisObj = list[i];
				
				html += '<tr>';
				html += '	<td></td>';
				html += '	<td>' + thisObj.adminName + '</td>';
				html += '	<td>' + thisObj.adminId + '</td>';
				html += '	<td>' + thisObj.address + '</td>';
				html += '	<td>' + common.date.toString(new Date(thisObj.createDate), '-') + '</td>';
				html += '</tr>';
			}
			
			// 초기화 후 목록 추가
			$('#adminTable tbody').empty().append(html);
			
		} else {
			alert('관리자 목록 조회 실패');
		}
		
	}).fail(function (result) {
		alert('서버 에러');
	});
}