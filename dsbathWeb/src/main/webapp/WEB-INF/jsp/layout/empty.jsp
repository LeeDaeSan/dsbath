<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html>
<html>
	<head>
		<title>DS BATH</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
		<link rel="shortcut icon" href="/images/favicon.ico">
		
	<!------------------------------------- CSS START ------------------------------------->
		<link href="/lib/bootstrap/bootstrap.min.css" rel="stylesheet">
		<link href="/lib/bootstrap/bootstrap-theme.min.css" rel="stylesheet">
		<link href="/css/common.css" rel="stylesheet">
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
    <!------------------------------------- JS END ------------------------------------->
    
	</head>
	<body>
		<div class="wrap">
			<section>
				<section class="wrapper">
					<tiles:insertAttribute name="empty" />
				</section>
			</section>
		</div>
	</body>
</html>