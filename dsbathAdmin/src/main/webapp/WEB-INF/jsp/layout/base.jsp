<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ page import="com.dsbath.admin.etc.constant.UserConstant" %>
<%@ page import="com.dsbath.admin.etc.security.SecurityUser" %>
<%
	SecurityUser user = UserConstant.getUser();
	
	Integer idx = 0;
	String name = "";
	String addr = "";
	
	try {
		idx = user.getIdx();
		name = user.getName();
		
	} catch (Exception e) {
		
	}
%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>DS BATH</title>
		<link rel="shortcut icon" href="/images/favicon.ico">

	<!------------------------------------- CSS START ------------------------------------->	
		<!-- Bootstrap -->
	    <link href="/lib/gentelella/bootstrap/bootstrap.min.css" rel="stylesheet">
	    <!-- Font Awesome -->
	    <link href="/lib/gentelella/font-awesome/font-awesome.min.css" rel="stylesheet">
	    <!-- NProgress -->
	    <link href="/lib/gentelella/nprogress/nprogress.css" rel="stylesheet">
	    <!-- iCheck -->
	    <link href="/lib/gentelella/iCheck/green.css" rel="stylesheet">
	    <!-- bootstrap-progressbar -->
	    <link href="/lib/gentelella/bootstrap-progressbar/bootstrap-progressbar-3.3.4.min.css" rel="stylesheet">
	    <!-- JQVMap -->
	    <link href="/lib/gentelella/jqvmap/jqvmap.min.css" rel="stylesheet"/>
	    <!-- bootstrap-daterangepicker -->
	    <link href="/lib/gentelella/bootstrap-daterangepicker/daterangepicker.css" rel="stylesheet">
	    <!-- switchery -->
	    <link href="/lib/gentelella/switchery/switchery.min.css" rel="stylesheet" />
	    <!-- Custom Theme Style -->
	    <link href="/lib/gentelella/build/custom.min.css" rel="stylesheet">
	    <!-- summernote -->
		<link rel="stylesheet" href="/lib/summernote/summernote-lite.min.css">
	    
	    <link href="/css/common.css" rel="stylesheet">
    <!------------------------------------- CSS END ------------------------------------->
    
	    <!-- Daum post code (우편번호) script -->
	    <script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
    	<!-- jQuery -->
		<script src="/webjars/jquery/3.3.1/dist/jquery.min.js" type="text/javascript"></script>
		<!-- common js -->
	    <script src="/js/common.js" type="text/javascript"></script>
	    <!-- post code js -->
	    <script src="/js/postCode.js" type="text/javascript"></script>
	    
		<script>
		var sessionIdx 	= '<%= idx %>';
		var sessionName = '<%= name %>';
	
		$(function () {
			var mainTitle = '';
			var subTitle1 = '';
			var subTitle2 = '';
			
			var url = location.href;
			
			// 대시보드
			if (url.indexOf('/dashboard') != -1) {
				mainTitle = 'Dashboard';
				subTitle1 = 'Dashboard';
				subTitle2 = '';
				
			// 관리자 관리
			} else if (url.indexOf('/admin/list') != -1) {
				mainTitle = '관리자 관리';
				subTitle1 = '관리자';
				subTitle2 = '관리자 관리';
				
			// 사용자 관리
			} else if (url.indexOf('/member/list') != -1) {
				mainTitle = '사용자 관리';
				subTitle1 = '사용자';
				subTitle2 = '사용자 관리';
				
			// 욕실 리모델링 디자인
			} else if (url.indexOf('/design/list') != -1) {
				mainTitle = '욕실 리모델링 디자인';
				subTitle1 = '디자인';
				subTitle2 = '욕실 리모델링 디자인';
			
			// 욕실 디자인 코드 관리
			} else if (url.indexOf('/design/code/list') != -1) {
				mainTitle = '디자인 코드 관리';
				subTitle1 = '디자인';
				subTitle2 = '디자인 코드 관리';
				
			// 견적 및 시공 문의
			} else if (url.indexOf('/construct/inquiry') != -1) {
				mainTitle = '견적 및 시공 문의';
				subTitle1 = '시공';
				subTitle2 = '견적 및 시공 문의';
				
			// 시공 사례
			} else if (url.indexOf('/construct/instance') != -1) {
				mainTitle = '시공 사례';
				subTitle1 = '시공';
				subTitle2 = '시공 사례';
			
			// 시공 후기
			} else if (url.indexOf('/construct/epilogue') != -1) {
				mainTitle = '시공 후기';
				subTitle1 = '시공';
				subTitle2 = '시공 후기';
				
			// 브랜드스토리
			} else if (url.indexOf('/etc/brandstory') != -1) {
				mainTitle = '브랜드 스토리';
				subTitle1 = '기타';
				subTitle2 = '브랜드 스토리';
				
			// 공지사항
			} else if (url.indexOf('/etc/notice') != -1) {
				mainTitle = '공지사항';
				subTitle1 = '기타';
				subTitle2 = '공지사항';
				
			// 자주하는 질문
			} else if (url.indexOf('/etc/faq') != -1) {
				mainTitle = '자주하는 질문';
				subTitle1 = '기타';
				subTitle2 = '자주하는 질문';
			
			// 고객센터
			} else if (url.indexOf('/etc/centerBoard') != -1) {
				mainTitle = '고객센터';
				subTitle1 = '기타';
				subTitle2 = '고객센터';
			
			// 오시는길
			} else if (url.indexOf('/etc/loadview') != -1) {
				mainTitle = '오시는길';
				subTitle1 = '기타';
				subTitle2 = '오시는길';
				
			// 커뮤니티 : 디에스 키친&바스 살림 팁
			} else if (url.indexOf('/etc/community/living') != -1) {
				mainTitle = '디에스 키친&바스 살림 팁';
				subTitle1 = '기타<i class="fa fa-caret-right"></i> 커뮤니티';
				subTitle2 = '디에스 키친&바스 살림 팁';
		
			// 커뮤니티 : 디에스 인테리어 팁
			} else if (url.indexOf('/etc/community/interior') != -1) {
				mainTitle = '디에스 인테리어 팁';
				subTitle1 = '기타<i class="fa fa-caret-right"></i> 커뮤니티';
				subTitle2 = '디에스 인테리어 팁';
				
			// 커뮤니티 : 디에스 이벤트
			} else if (url.indexOf('/etc/community/event') != -1) {
				mainTitle = '디에스 이벤트';
				subTitle1 = '기타<i class="fa fa-caret-right"></i> 커뮤니티';
				subTitle2 = '디에스 이벤트';
			}
			
			$('#mainTitle').empty().append(mainTitle);
			$('#subTitle1').empty().append(subTitle1 ? '<i class="fa fa-caret-right"></i> ' + subTitle1 : '');
			$('#subTitle2').empty().append(subTitle2 ? '<i class="fa fa-caret-right"></i> ' + subTitle2 : '');
			
		});
		</script>
	</head>
	
	<body class="nav-md">
		<div class="container body">
			<div class="main_container">
				<tiles:insertAttribute name="leftMenu"/>
				
				<tiles:insertAttribute name="header"/>

				<div class="right_col" style="min-height:1000px;" role="main">
				
					<!-- Title START -->
					<div class="row title-row">
						<div class="title-left">
							<h5 class="main-title" id="mainTitle"></h5>
							<h5 class="sub-title">
								<i class="fa fa-home"></i>
								<span id="subTitle1"></span>
								<span id="subTitle2"></span>
							</h5>
						</div>
					</div>
					<!-- Title END -->
					
					<tiles:insertAttribute name="body"/>
				</div>
				
				<tiles:insertAttribute name="footer"/>
			</div>
		</div>
	</body>
	
	    <!------------------------------------- JS START ------------------------------------->    
	    <!-- Bootstrap -->
	    <script src="/lib/gentelella/bootstrap/bootstrap.bundle.min.js"></script>
	    <!-- FastClick -->
	    <script src="/lib/gentelella/fastclick/fastclick.js"></script>
	    <!-- NProgress -->
	    <script src="/lib/gentelella/nprogress/nprogress.js"></script>
	    <!-- Chart.js -->
	    <script src="/lib/gentelella/Chart.js/Chart.min.js"></script>
	    <!-- gauge.js -->
	    <script src="/lib/gentelella/gauge.js/gauge.min.js"></script>
	    <!-- bootstrap-progressbar -->
	    <script src="/lib/gentelella/bootstrap-progressbar/bootstrap-progressbar.min.js"></script>
	    <!-- iCheck -->
	    <script src="/lib/gentelella/iCheck/icheck.min.js"></script>
	    <!-- Skycons -->
	    <script src="/lib/gentelella/skycons/skycons.js"></script>
	    <!-- Flot -->
	    <script src="/lib/gentelella/Flot/jquery.flot.js"></script>
	    <script src="/lib/gentelella/Flot/jquery.flot.pie.js"></script>
	    <script src="/lib/gentelella/Flot/jquery.flot.time.js"></script>
	    <script src="/lib/gentelella/Flot/jquery.flot.stack.js"></script>
	    <script src="/lib/gentelella/Flot/jquery.flot.resize.js"></script>
	    <!-- Flot plugins -->
	    <script src="/lib/gentelella/flot.orderbars/jquery.flot.orderBars.js"></script>
	    <script src="/lib/gentelella/flot-spline/jquery.flot.spline.min.js"></script>
	    <script src="/lib/gentelella/flot.curvedlines/curvedLines.js"></script>
	    <!-- DateJS -->
	    <script src="/lib/gentelella/DateJS/date.js"></script>
	    <!-- JQVMap -->
	    <script src="/lib/gentelella/jqvmap/jquery.vmap.js"></script>
	    <script src="/lib/gentelella/jqvmap/jquery.vmap.world.js"></script>
	    <script src="/lib/gentelella/jqvmap/jquery.vmap.sampledata.js"></script>
	    <!-- bootstrap-daterangepicker -->
	    <script src="/lib/gentelella/moment/moment.min.js"></script>
	    <script src="/lib/gentelella/bootstrap-daterangepicker/daterangepicker.js"></script>
	    <!-- switchery -->
	    <script src="/lib/gentelella/switchery/switchery.min.js"></script>
	    <!-- summernote -->
	    <script src="/lib/summernote/summernote-lite.min.js"></script>
		<script src="/lib/summernote/lang/summernote-ko-KR.js"></script>
	    <!-- Custom Theme Scripts -->
	    <script src="/lib/gentelella/build/custom.min.js"></script>
    <!------------------------------------- JS END ------------------------------------->
</html>