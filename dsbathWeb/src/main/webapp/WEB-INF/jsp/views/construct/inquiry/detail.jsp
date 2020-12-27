<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<style>
.list-col {
	padding-left 	: 40px;
	padding-right 	: 40px;
	height			: 100%;
}
.detail-answer {
	padding-left	: 35px;
}
.detail-answer .detail-answer-title {
	border-bottom 	: 1px solid #f2cc3e;
	height			: 28px;
}
.detail-answer .detail-answer-title #detailAnswerTitle {
	font-size		: 20px;
}
.detail-answer .detail-answer-content {
	min-height		: 200px;
}
</style>

<!-- 견적 및 시공 문의 상세 js -->
<script src="/js/construct/inquiry/detail.js" type="text/javascript"></script>

<div class="row">
	<div class="col-md-12 list-col">
		<div class="detail-head">
			<div class="admin-name-div float-left">
				<span id="detailMemberName"></span>
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
			<div class="detail-answer">
				<div class="detail-answer-title">
					<div id="detailAnswerTitle" class="float-left"></div>
					<div id="detailAnswerDate" class="float-right"></div>
				</div>
				<div class="detail-answer-content">
					<div id="detailAnswerContent"></div>
				</div>
			</div>
		</div>
		<div class="detail-foot">
			<button class="btn btn-sm" type="button" id="listBtn">목록</button>
		</div>
	</div>
</div>