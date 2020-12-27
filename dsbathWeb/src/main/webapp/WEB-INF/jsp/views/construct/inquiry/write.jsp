<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<style>
.list-col {
	padding-left 	: 40px;
	padding-right 	: 40px;
	height			: 100%;
}
table {
	border-bottom	: 0 !important;
}
#insertContent {
	width 			: 100%;
}
</style>

<!-- 견적 및 시공 문의 작성 js -->
<script src="/js/construct/inquiry/write.js" type="text/javascript"></script>

<div class="row">
	<div class="col-md-12 list-col">
		
		<div class="detail-body">
			<table class="table">
				<colgroup>
					<col width="15%"/>
					<col width="auto"/>
				</colgroup>
				<tbody>
					<tr>
						<th>제목</th>
						<td>
							<input type="text" class="form-control" id="insertTitle"/>
						</td>
					</tr>
					<tr>
						<th>내용</th>
						<td>
							<textarea id="insertContent"></textarea>
						</td>
					</tr>
				</tbody>				
			</table>
		</div>
		
		<div class="detail-foot">
			<button class="btn btn-sm" type="button" id="insertBtn">저장</button>
			<button class="btn btn-sm" type="button" id="listBtn">목록</button>
		</div>
	</div>
</div>