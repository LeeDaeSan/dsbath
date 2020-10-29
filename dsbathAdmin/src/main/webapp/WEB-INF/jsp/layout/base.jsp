<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>DS BATH</title>
		
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
	    <!-- Custom Theme Style -->
	    <link href="/lib/gentelella/build/custom.min.css" rel="stylesheet">
    <!------------------------------------- CSS END ------------------------------------->
    
    	<!-- jQuery -->
		<script src="/webjars/jquery/3.3.1/dist/jquery.min.js" type="text/javascript"></script>
		
	</head>
	
	<body class="nav-md">
		
		<div class="container body">
			<div class="main_container">
				<tiles:insertAttribute name="leftMenu"/>
				
				<tiles:insertAttribute name="header"/>

				<div class="right_col" role="main">
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
	    <!-- Custom Theme Scripts -->
	    <script src="/lib/gentelella/build/custom.min.js"></script>
    <!------------------------------------- JS END ------------------------------------->
</html>