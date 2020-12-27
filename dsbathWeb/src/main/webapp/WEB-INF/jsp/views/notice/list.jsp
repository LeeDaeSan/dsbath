<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>


<!-- 공지사항 목록 js -->
<script src="/js/notice/list.js" type="text/javascript"></script>

<div class="row">
	<div class="col-md-12 list-col">
		<table class="table" id="noticeTable">
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