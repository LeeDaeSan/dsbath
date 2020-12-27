<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<style>
.list-col {
	padding-left 	: 40px;
	padding-right 	: 40px;
	height			: 100%;
}
.table td, .table th {
	border-top	: 0 !important;
}
.code-img:hover {
	opacity 	: 0.6;
}
.image-100-per {
	border-radius 	: 10px;
	width			: 100%;
}
.table {
	border-bottom	: 0 !important;
}
</style>


<!-- 커뮤니티 목록 js -->
<script src="/js/community/list.js" type="text/javascript"></script>


<div class="row">
	<div class="col-md-12 list-col">
		<table class="table" id="communityTable">
			<colgroup>
				<col width="33%"/>
				<col width="33%"/>
				<col width="33%"/>
			</colgroup>
			<tbody>
			</tbody>
		</table>
	</div>
	<div class="text-center">
		<ul class="pagination" id="pagination"></ul>
	</div>
</div>