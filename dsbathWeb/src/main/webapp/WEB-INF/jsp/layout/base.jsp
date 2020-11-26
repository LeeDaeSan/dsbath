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
    <!------------------------------------- JS END ------------------------------------->
	</head>
	
	<body>
			
		<tiles:insertAttribute name="left"/>
		
		<tiles:insertAttribute name="header"/>
		
		<div class="col-lg-12 layout-body">
			<tiles:insertAttribute name="body"/>
		</div>
		
		<tiles:insertAttribute name="right"/>

	
		<tiles:insertAttribute name="footer"/>
	</body>
</html>