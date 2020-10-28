<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>DS BATH</title>
			
	</head>
	
	<body id="page-top">
		<div id="wrapper">
			<tiles:insertAttribute name="leftMenu"/>
			
			<!-- Content Wrapper -->
		    <div id="content-wrapper" class="d-flex flex-column">
		    	<!-- Main Content -->
		      	<div id="content">
					<tiles:insertAttribute name="header"/>
	
					<tiles:insertAttribute name="body"/>
					
					<tiles:insertAttribute name="footer"/>
				</div>
			</div>
		</div>
	</body>
</html>