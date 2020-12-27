<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.dsbath.web.etc.constant.UserConstant" %>
<%@ page import="com.dsbath.web.etc.security.SecurityUser" %>
<%
	boolean isLogin = false;
	try {
		SecurityUser user = UserConstant.getUser();		
		isLogin = true;
		
	} catch (Exception e) {
		isLogin = false;
		
	}
/*  
	SecurityUser user = UserConstant.getUser();
	
	Integer idx = 0;
	String name = "";
	String addr = "";
	
	try {
		idx = user.getIdx();
		name = user.getName();
		
	} catch (Exception e) {
		
	}
*/
%>
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

<div class="right-form-full">
	
	<div class="right-login-form">
		<% if (isLogin == false) { %>
		<form method="POST" action="/login" id="loginForm">
			<div>
				<img src="/images/login_id.png"/>
				<input type="text" name="username" class="login-id-text" placeholder="아이디"/>
			</div>
			<div>
				<img src="/images/login_password.png"/>
				<input type="password" name="password" class="login-password-text" placeholder="비밀번호"/>
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
		<% } else { %>
		<div>
			로그인 하였습니다.
		</div>
		<% } %>
	</div>
	
	<div class="right-construct-instance">
		<div class="instance-title">시공사례</div>
		<div id="mainConstructInstance">
		</div>
	</div>
	
	<div class="right-tel">
		<div class="text-01">고객 상담 전화</div>
		<div class="text-02">02-6673-6300</div>
		<div class="text-03">평일/토,일 9:00~21:00</div>
	</div>
	
</div>