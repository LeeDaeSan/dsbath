<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<style>
.list-col {
	padding-left 	: 40px;
	padding-right 	: 40px;
}
</style>

<!-- 공지사항 상세 js -->
<script src="/js/notice/detail.js" type="text/javascript"></script>

<div class="row">
	<div class="col-md-12 list-col">
		<div class="detail-head">
			<div class="admin-name-div float-left">
				<span id="detailAdminName"></span>
			</div>
			<div class="hit-div float-left">
				<span id="detailHit"></span>
			</div>
			<div class="create-date-div float-right">
				<span id="detailCreateDate"></span>
			</div>
		</div>
		<div class="detail-body">
			<div class="detail-title">
				<div id="detailTitle"></div>
			</div>
			<div class="detail-content">
				<div id="detailContent"></div>
			</div>
		</div>
		<div class="detail-foot">
			<button class="btn btn-sm" type="button" id="listBtn">목록</button>
		</div>
	</div>
</div>