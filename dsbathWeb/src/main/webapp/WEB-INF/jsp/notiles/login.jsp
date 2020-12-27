<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<script type="text/javascript">
$(function () {
	
	$('#loginSubmit').unbind('click').click(function (e) {
		e.preventDefault();
		
		var username = $('input[name="username"]');
		if (!username.val()) {
			common.alert('warn', '아이디를 입력해 주세요.');
			username.focus();
			return false;
		}
		
		var password = $('input[name="password"]');
		if (!password.val()) {
			common.alert('warn', '비밀번호를 입력해 주세요.');
			password.focus();
			return false;
		}
		
		$('#loginForm').submit();
	});	
	
});

</script>
<form method="POST" action="/login" id="loginForm">
	<div>
		<img src="/images/login_id.png"/>
		<input type="text" name="username" class="login-id-text" placeholder="아이디"/>
	</div>
	<div>
		<img src="/images/login_password.png"/>
		<input type="password	" name="password" class="login-password-text" placeholder="비밀번호"/>
	</div>
	<button class="btn right-login-btn" id="loginSubmit">Login</button>
	
	<div class="right-login-check">
		<span class="left-check">
			<input type="checkbox"/>자동로그인
		</span>
		<span class="right-check">
			<span><a href="/views/join/join01">회원가입</a></span>
			<span>|</span>
			<span>정보찾기</span>
		</span>
	</div>
</form>
