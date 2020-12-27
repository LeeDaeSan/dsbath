<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<style>
.button-area {
	padding : 0px 30px 20px 30px;
}
</style>

<!-- 견적 및 시공 문의 목록 js -->
<script src="/js/construct/inquiry/list.js" type="text/javascript"></script>

<div class="row">
	<div class="col-md-12 list-col">
		<table class="table" id="inquiryTable">
			<colgroup>
				<col width="10%"/>
				<col width="40%"/>
				<col width="15%"/>
				<col width="20%"/>
				<col width="15%"/>
			</colgroup>
			<thead>
				<tr>
					<th class="text-center">번호</th>
					<th class="text-center">제목</th>
					<th class="text-center">글쓴이</th>
					<th class="text-center">날짜</th>
					<th class="text-center">조회</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
		
	</div>
	<div class="text-center">
		<ul class="pagination" id="pagination"></ul>
	</div>
</div>

<div class="row">
	<div class="button-area text-right">
		<button class="btn btn-sm" type="button" id="insertBtn">작성</button>
	</div>
</div>