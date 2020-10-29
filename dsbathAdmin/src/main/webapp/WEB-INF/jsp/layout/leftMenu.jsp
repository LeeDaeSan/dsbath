<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="col-md-3 left_col">
	<div class="left_col scroll-view">
		<div class="navbar nav_title" style="border: 0;">
			<a href="index.html" class="site_title"><i class="fa fa-paw"></i> <span>디에스 바스</span></a>
		</div>
		<div class="clearfix"></div>
		
		<!-- menu profile quick info -->
		<div class="profile clearfix">
			<div class="profile_pic">
				<!-- <img src="images/img.jpg" alt="..." class="img-circle profile_img"> -->
			</div>
			<div class="profile_info">
				<span>Welcome,</span>
				<h2>John Doe</h2>
			</div>
		</div>
          	<!-- /menu profile quick info -->

          	<br/>

		<!-- sidebar menu -->
		<div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
			<div class="menu_section">
				<h3>General</h3>
				<ul class="nav side-menu">
					<li>
						<a><i class="fa fa-home"></i> Home <span class="fa fa-chevron-down"></span></a>
						<ul class="nav child_menu">
							<li><a href="/views/dashboard">Dashboard</a></li>
						</ul>
					</li>
					
					<li>
						<a><i class="fa fa-sitemap"></i> 관리자 <span class="fa fa-chevron-down"></span></a>
						<ul class="nav child_menu">
							<li><a href="/views/admin/list">관리자 관리</a></li>
						</ul>
					</li>
					
					<li>
						<a><i class="fa fa-users"></i> 사용자 <span class="fa fa-chevron-down"></span></a>
						<ul class="nav child_menu">
							<li><a href="/views/member/list">사용자 관리</a></li>
						</ul>
					</li>
               	</ul>
			</div>
		</div>
		<!-- /sidebar menu -->
	</div>
</div>