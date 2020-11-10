$(function () {
	
	// 등록 button event
	$('#insertMemberBtn').unbind('click').click(function (e) {
		e.preventDefault();
		
		insertMemberFunc();
	});
});

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
	
	// confirm
	if (confirm('사용자 정보를 등록하시겠습니까?')) {
		
		//---> 통신 요청
		$.ajax({
			url			: '/member/rest/merge',
			method		: 'POST',
			dataType	: 'JSON',
			data		: {
				type		: 'I',
				memberName	: memberName,
				memberId	: memberId,
				password	: password,
				address		: $('#insertAddress').val(),
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
			common.alert('dang', '사용자 정보 등록 요청중 서버 통신 에러가 발생하였습니다.');
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