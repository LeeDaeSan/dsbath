<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<body class="login">
	<div>
		<div class="login_wrapper">
			<div class="animate form login_form">
					<img src="/images/login-logo.png" style="width:350px;"/>
				<section class="login_content">
					<form method="POST">
						<h1>LOG IN</h1>
						<div>
							<input type="text" class="form-control" name="username" placeholder="아이디" required />
						</div>
						<div>
							<input type="password" class="form-control" name="password" placeholder="비밀번호" required />
						</div>
						<div>
							<button class="btn btn-dark submit">Log in</button>
						</div>
						<div class="clearfix"></div>
						<div class="separator"></div>
					</form>
				</section>
			</div>
		</div>
	</div>
</body>