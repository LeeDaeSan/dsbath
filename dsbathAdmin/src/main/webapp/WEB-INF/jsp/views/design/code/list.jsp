<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<style>
#insertImage, #updateImage {
	width : 50px;
}
.image-close {
	position	: absolute;
    margin		: 0px;
    margin-top	: -5px;
    margin-left	: 2px;
    color		: #f30000 !important;
    font-size	: 15px;
}
.image-close:hover {
	opacity		: 0.6;
}
</style>
<!-- design code js -->
<script src="/js/design/code.js" type="text/javascript"></script>

<!-- Button form START -->
<div class="row">
	<div class="col-md-12 col-sm-12">
		<button type="button" class="btn btn-sm btn-dark float-right" data-toggle="modal" data-target="#insertCodePopup">코드 등록</button>
		<button type="button" class="btn btn-sm btn-dark float-right" id="searchResetBtn">검색 초기화</button>
		<button type="button" class="btn btn-sm btn-dark float-right" id="searchBtn">검색</button>
	</div>
</div>
<!-- Button form END -->

<!-- 등록 팝업 START -->
<div class="modal fade" tabindex="-1" role="dialog" aria-modal="true" id="insertCodePopup">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="myModalLabel">코드 등록</h4>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">×</span>
				</button>
			</div>
			<div class="modal-body">
				<table class="table">
					<colgroup>
						<col width="15%"/>
						<col width="30%"/>
						<col width="auto"/>
					</colgroup>
					<tbody>
						<tr>
							<th>유형</th>
							<td colspan="2">
								<select id="insertCodeType" class="form-control form-control-cust">
									<option value="til">타일</option>
								</select>
							</td>
						</tr>
						<tr>
							<th>이름</th>
							<td colspan="2">
								<input type="text" id="insertName" class="form-control form-control-cust"/>
							</td>
						</tr>
						<tr>
							<th>이미지</th>
							<td colspan="2">
								<input type="file" id="insertImageFile" class="image_file" fileType="insert"/>
								<div id="insertImage"></div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">취소</button>
				<button type="button" class="btn btn-sm btn-primary merge_btn" mergeType="I" id="insertBtn">등록</button>
			</div>
		</div>
	</div>
</div>
<!-- 등록 팝업 END -->