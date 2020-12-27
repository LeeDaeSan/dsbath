<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!-- Daum post code (우편번호) script -->
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<!-- common js -->
<script src="/js/postCode.js"></script>
	    
<script type="text/javascript">
$(function () {
	
	// 우편번호 찾기 : 등록
	postCode.start('insert');
	
	// 회원가입 요청
	$('#join02Btn').unbind('click').click(function (e) {
		e.preventDefault();
		
		var userId 			= $('#userId');
		var userPassword 	= $('#userPassword'); 
		var userPasswordCh 	= $('#userPasswordCh'); 
		var userName		= $('#userName');
		var userNickName	= $('#userNickName');
		var zipCode			= $('#insertZipCode');
		var address			= $('#insertAddress');
		var addressDetail	= $('#insertAddressDetail');
		var userEmail 		= $('#userEmail');
		
		var idRegExp 		= /^[a-zA-Z0-9]{4,12}$/;
		var nameRegExp 		= /^[가-힣]{2,15}$/;
		var nickRegExp 		= /^[0-9가-힣a-zA-Z]{2,15}$/;
		var emailRegExp 	= /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

		// 아이디 공백 체크  
		if (!$.trim(userId.val())) {
			common.alert('warn', '아이디를 입력해 주세요.');
			userId.focus();
			return false;
		}
		// 아이디 중복 확인
		if (idCheck()) {
			common.alert('warn', '현재 사용중인 아이디입니다.\n다시 입력해 주시기 바랍니다.');
			userId.focus();
			return false;
		}
		// 아이디 유효성 검사
		if (!idRegExp.test($.trim(userId.val()))) {
			common.alert('warn', '4 ~ 12자, 영문 대소문자, 숫자 조합만으로 입력하여 주세요.');
			userId.focus();
			return false;
		}
		
		
		// 비밀번호 공백 체크
		if (!$.trim(userPassword.val())) {
			common.alert('warn', '비밀번호를 입력해 주세요.');
			userPassword.focus();
			return false;
		}
		// 비밀번호 확인 체크
		if ($.trim(userPassword.val()) != $.trim(userPasswordCh.val())) {
			common.alert('warn', '비밀번호가 일치하지 않습니다.\n다시 입력해 주세요.');
			userPasswordCh.focus();
			return false;
		}
		
		// 이름 공백 체크
		if (!$.trim(userName.val())) {
			common.alert('warn', '이름을 입력해 주세요.');
			userName.focus();
			return false;
		}		
		// 이름 유효성 체크
		if (!nameRegExp.test($.trim(userName.val()))) {
			common.alert('warn', '최소 2자 이상 15자 이하 한글만 입력해 주세요.');
			userName.focus();
			return false;
		}
		
		// 닉네임 공백 체크
		if (!$.trim(userNickName.val())) {
			common.alert('warn', '닉네임을 입력해 주세요.');
			userNickName.focus();
			return false;
		}
		// 닉네임 유효성 체크
		if (!nickRegExp.test($.trim(userNickName.val()))) {
			common.alert('warn', '최소 2자 이상 15자 이하 한글만 입력해 주세요.');
			userNickName.focus();
			return false;
		}
		
		// 주소 공백 체크
		if (!$.trim(zipCode.val()) || !$.trim(address.val())) {
			common.alert('warn', '주소를 입력해 주세요.');
			return false;
		}
		if (!$.trim(addressDetail.val())) {
			common.alert('warn', '상세 주소를 입력해 주세요.');
			return false;
		}
		
		// 이메일 공백 체크
		if (!$.trim(userEmail.val())) {
			common.alert('warn', '이메일을 입력해 주세요.');
			userEmail.focus();
			return false;
		}
		// 이메일 유효성 체크
		if (!emailRegExp.test($.trim(userEmail.val()))) {
			common.alert('warn', '이메일 형식에 맞지 않습니다.\n다시 입력해 주시기 바랍니다.');
			userEmail.focus();
			return false;
		}
		
		// confirm
		if (confirm('회원가입을 하시겠습니까?')) {
		
			// insert		
			insertMemberFunc();
		}
	});
	
});

/**
 * 아이디 중복확인 Function
 
 */
function idCheck () {
	var isSamed = false;
	
	//---> 통신 요청
	$.ajax({
		url 		: '/member/rest/idCheck',
		method		: 'POST',
		dataType	: 'JSON',
		async		: false,
		data		: {
			memberId 	: $('#userId').val(),
		}
	
	//---> 통신 완료
	}).done(function (result) {
	
		// 성공
		if (result.status) {
			
			// 아이디 중복 O
			if (result.isSamed == '1') {
				isSamed = true;
				
			// 아이디 중복 X
			} else {
				isSamed = false;
			}
			
		// 실패
		} else {
			common.alert('dang', '아이디 중복확인 요청중 에러가 발생하였습니다.');
		}
		
	//---> 통신 에러
	}).fail(function (result) {
		common.alert('dang', '아이디 중복확인 요청중 서버 통신 에러가 발생하였습니다.');
	});
	
	return isSamed;
}

/**
 * 사용자 정보 등록 Function
 *
 */
function insertMemberFunc () {

	//---> 통신 요청
	$.ajax({
		url			: '/member/rest/merge',
		method		: 'POST',
		dataTyoe	: 'JSON',
		async		: false,
		data		: {
			type			: 'I',
			memberId		: $.trim($('#userId').val()),
			password		: $.trim($('#userPassword').val()),
			memberName		: $.trim($('#userName').val()),
			nickName		: $.trim($('#userNickName').val()),
			zipCode			: $.trim($('#insertZipCode').val()),
			address			: $.trim($('#insertAddress').val()),
			addressDetail	: $.trim($('#insertAddressDetail').val()),
			email			: $.trim($('#userEmail').val()),
		}
	
	//---> 통신 완료
	}).done(function (result) {
		
		if (result.status) {
			
			// 성공
			if (result.resultCount == 1) {
				common.alert('succ', '회원가입을 완료하였습니다.');
				
				// 메인 이동
				location.href = '/views/main';
				
			// 실패
			} else {
				common.alert('dang', '회원가입 요청중 에러가 발생하였습니다.');
			}
			
		} else {
			common.alert('dang', '회원가입 요청중 에러가 발생하였습니다.');	
		}
		
	//---> 통신 에러
	}).fail(function () {
		common.alert('dang', '회원가입 요청중 서버 통신 에러가 발생하였습니다.');
	});
}
</script>

<div class="sub-page-body">

	<div class="join-info-01">
		<div class="join-info-01-head">
			이용정보 입력
		</div>
		<div class="join-info-01-body">
			<table class="table">
				<colgroup>
					<col width="10%"/>
					<col width="35%"/>
					<col width="10%"/>
					<col width="35%"/>
					<col width="auto"/>
				</colgroup>
				<tbody>
					<tr>
						<th class="text-right">아이디</th>
						<td>
							<input type="text" class="form-control" id="userId"/>
						</td>
						<td colspan="3"></td>
					</tr>
					<tr>
						<th class="text-right">비밀번호</th>
						<td>
							<input type="password" class="form-control" id="userPassword"/>
						</td>
						<th class="text-right">비밀번호 확인</th>
						<td>
							<input type="password" class="form-control" id="userPasswordCh"/>
						</td>
						<td></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	
	<div class="join-info-02">
		<div class="join-info-02-head">
			개인정보 입력
		</div>
		<div class="join-info-02-body">
			<table class="table">
				<colgroup>
					<col width="10%"/>
					<col width="20%"/>
					<col width="15%"/>
					<col width="10%"/>
					<col width="35%"/>
					<col width="auto"/>
				</colgroup>
				<tbody>
					<tr>
						<th class="text-right">이름</th>
						<td colspan="2">
							<input type="text" class="form-control" id="userName"/>
						</td>
						<th class="text-right">닉네임</th>
						<td>
							<input type="text" class="form-control" id="userNickName"/>
						</td>
						<td colspan="2"></td>
					</tr>
					<tr>
						<th class="text-right">지번</th>
						<td>
							<input type="text" class="form-control" id="insertZipCode" readOnly/>
						</td>
						<td>
							<button type="button" class="btn" id="insertZipCodeBtn">지번 검색</button>
						</td>
						<td colspan="3"></td>
					</tr>
					<tr>
						<th class="text-right">주소</th>
						<td colspan="2">
							<input type="text" class="form-control" id="insertAddress" readOnly/>
						</td>
						<td colspan="3"></td>
					</tr>
					<tr>
						<th class="text-right">상세 주소</th>
						<td colspan="2">
							<input type="text" class="form-control" id="insertAddressDetail"/>
						</td>
						<td colspan="3"></td>
					</tr>
					<tr>
						<th class="text-right">E-mail</th>
						<td colspan="2">
							<input type="text" class="form-control" id="userEmail"/>
						</td>
						<td colspan="3"></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	
	<div class="join-btn-area">
		<button type="button" class="btn" id="join02Btn">회원가입 요청</button>
	</div>
</div>