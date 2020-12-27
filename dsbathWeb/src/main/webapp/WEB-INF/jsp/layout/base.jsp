<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>DS BATH</title>
		<link rel="shortcut icon" href="/images/favicon.ico">
		
	<!------------------------------------- CSS START ------------------------------------->
		<link href="/lib/bootstrap/bootstrap.min.css" rel="stylesheet">
		<link href="/lib/bootstrap/bootstrap-theme.min.css" rel="stylesheet">
		<link href="/css/common.css" rel="stylesheet">
		 <!-- summernote -->
		<link rel="stylesheet" href="/lib/summernote/summernote-lite.min.css">
	<!------------------------------------- CSS END ------------------------------------->
	
		<!-- jQuery -->
		<script src="/webjars/jquery/3.3.1/dist/jquery.min.js" type="text/javascript"></script>
		<!-- common js -->
	    <!-- <script src="/js/common.js" type="text/javascript"></script> -->
	    
    <!------------------------------------- JS START ------------------------------------->
    	<!-- Bootstrap -->
	    <script src="/lib/bootstrap/bootstrap.min.js"></script>
	    <!-- common js -->
	    <script src="/js/common.js"></script>
	    <!-- paging js -->
	    <script src="/js/paging.js"></script>
	    <!-- summernote -->
	    <script src="/lib/summernote/summernote-lite.min.js"></script>
		<script src="/lib/summernote/lang/summernote-ko-KR.js"></script>
    <!------------------------------------- JS END ------------------------------------->
    	
    	<style>
    	.glyphicon-menu-right {
    		font-size	: 13px !important;
    	}
    	</style>
    	
    	<script type="text/javascript">
    	$(function () {
    		
    		var path = location.pathname;
    		
    		// main page
    		if (path == '/' || path == '/views/main') {
    			$('.title-layout').remove();
    			
    		// sub page
    		} else {
    			$('.sub-layout-body').addClass('row sub-body');
    			
    			$('.sub-body').append();
    			
    			var title 	= '';
    			
    			// 브랜드 스토리
    			if (path == '/views/brandstory/list') {
    				title = '브랜드 스토리';
    				
    			// 회원가입
    			} else if (path.indexOf('/views/join') != -1) {
    				title = '회원가입';
    			
    			// 공지사항
    			} else if (path.indexOf('/views/notice') != -1) {
    				title = '공지사항';
    				
    			// 욕실 디자인
    			} else if (path.indexOf('/views/bathDesign') != -1) {
    				title = '욕실 디자인';
    				
    			// 견적 및 시공 문의	
    			} else if (path.indexOf('/views/construct/inquiry') != -1) {
    				title = '견적 및 시공 문의';
    				
    			// 시공 사례
    			} else if (path.indexOf('/views/construct/instance') != -1) {
    				title = '시공 사례';
    				
    			// 자주하는 질문
    			} else if (path.indexOf('/views/faq') != -1) {
    				title = '자주하는 질문';
    				
    			// 커뮤니티 : 디에스 키친 & 바스 살림 팁
    			} else if (path.indexOf('/views/community/living')) {
    				title = '디에스 키친 & 바스 살림 팁';
    				
    			// 커뮤니티 : 디에스 인테리어 팁
    			} else if (path.indexOf('/views/community/interior')) {
    				title = '디에스 인테리어 팁';
    				
    			// 커뮤니티 : 디에스 이벤트	
    			} else if (path.indexOf('/views/community/event')) {
    				title = '디에스 이벤트';
    			}
    			
   				$('#bodyTitleText').text(title);
   				$('#bodySubTitleText').empty().append('홈<span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span>&nbsp;' + title);
    		}
    		
    	});
    	</script>
	</head>
	
	<body>
			
		<tiles:insertAttribute name="left"/>
		
		<tiles:insertAttribute name="header"/>
		
		<div class="col-lg-12 layout-body">
			<div class="sub-layout-body">
				<div class="row title-layout">
					<!-- title -->
					<div class="title-div" id="bodyTitleText">회원가입</div>				
					
					<!-- path -->
					<div class="title-path-div" id="bodySubTitleText">홈<span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></div>
				</div>
				
				
				<tiles:insertAttribute name="body"/>
			</div>
		</div>
		
		<tiles:insertAttribute name="right"/>

	
		<tiles:insertAttribute name="footer"/>
	</body>
</html>