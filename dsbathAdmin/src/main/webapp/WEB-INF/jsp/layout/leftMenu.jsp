<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="col-md-3 left_col">
	<div class="left_col scroll-view">
		<div class="navbar nav_title" style="border: 0;">
			<a href="/views/dashboard" class="site_title"><img src="/images/admin-main-logo.png" class="main-logo"/></a>
		</div>
		<div class="clearfix"></div>
		
		<!-- menu profile quick info -->
		<div class="profile clearfix">
			<div class="profile_pic">
				<!-- <img src="images/img.jpg" alt="..." class="img-circle profile_img"> -->
			</div>
			<div class="profile_info">
				<span>Welcome,</span>
				<h2 id="leftMenuAdminName"></h2>
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
						<a href="/views/dashboard"><i class="fa fa-dashboard"></i> Dashboard <span class="fa fa-chevron-down"></span></a>
						<!-- 
						<ul class="nav child_menu">
							<li><a href="/views/dashboard">Dashboard</a></li>
						</ul> 
						-->
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
					
					<li>
						<a><i class="fa fa-tags"></i> 디자인 <span class="fa fa-chevron-down"></span></a>
						<ul class="nav child_menu">
							<li><a href="/views/design/list">욕실 리모델링 디자인</a></li>
						</ul>
					</li>
					
					<li>
						<a><i class="fa fa-wrench"></i> 시공 <span class="fa fa-chevron-down"></span></a>
						<ul class="nav child_menu">
							<li><a href="/views/construct/inquiry">견적 및 시공 문의</a></li>
							<li><a href="/views/construct/instance">시공 사례</a></li>
							<li><a href="/views/construct/epilogue">시공 후기</a></li>
						</ul>
					</li>
					
					<li>
						<a><i class="fa fa-gear"></i> 기타 <span class="fa fa-chevron-down"></span></a>
						<ul class="nav child_menu">
							<li><a href="/views/etc/brandstory">브랜드스토리</a></li>
							<li><a href="/views/etc/notice">공지사항</a></li>
							<li><a href="/views/etc/faq">자주하는 질문</a></li>
							<li><a href="/views/etc/custom">고객센터</a></li>
							<li><a href="/views/etc/loadview">오시는길</a></li>
							<li><a href="/views/etc/community">커뮤니티</a></li>
						</ul>
					</li>
               	</ul>
			</div>
		</div>
		<!-- /sidebar menu -->
	</div>
</div>

<script>
$('#leftMenuAdminName').empty().append(sessionName);
</script>