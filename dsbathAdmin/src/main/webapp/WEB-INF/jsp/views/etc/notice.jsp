<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!-- notice js -->
<script src="/js/etc/notice.js" type="text/javascript"></script>

<style>
#insertContent {
	height : 200px;
}
.detail-content-tr {
	height : 300px;
}
.detail-content-tr th, .detail-content-tr td {
	vertical-align : baseline;
}
</style>

<!-- Search form START -->
<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="x_panel">
			<div class="x_title">
				<h2><i class="fa fa-search"></i>&nbsp;Search</h2>
				<ul class="nav navbar-right panel_toolbox">
					<li>
						<a class="collapse-link">
							<i class="fa fa-chevron-up"></i>
						</a>
					</li>
				</ul>
				<div class="clearfix"></div>
			</div>
			<div class="x_content">
				<table class="table">
					<colgroup>
						<col width="10%"/>
						<col width="30%"/>
						<col width="10%"/>
						<col width="50%"/>
					</colgroup>
					<tbody>
						<tr>
							<th>제목</th>
							<td colspan="3">
								<input type="text" class="form-control form-control-cust" id="searchTitle"/>
							</td>
						</tr>
						<tr>
							<th>내용</th>
							<td colspan="3">
								<input type="text" class="form-control form-control-cust" id="searchContent"/>
							</td>
						</tr>
						<tr>
							<th>작성자</th>
							<td>
								<input type="text" class="form-control form-control-cust" id="searchAdminName"/>
							</td>
							<th>등록일</th>
							<td>
								<input class="form-control form-control-cust" id="periodDate" readOnly/>
							</td>
						</tr>
						<tr>
							<th>설정</th>
							<td colspan="3">
								<label for="searchIsImportCheck">중요 여부</label>
								<input type="checkbox" id="searchIsImportCheck" class="js-switch" data-switchery="true"/>
								&nbsp;&nbsp;
								<label for="searchIsCommentCheck">코멘트 여부</label>
								<input type="checkbox" id="searchIsCommentCheck" class="js-switch" data-switchery="true"/>
								&nbsp;&nbsp;
								<label for="searchIsPopupCheck">팝업 여부</label>
								<input type="checkbox" id="searchIsPopupCheck" class="js-switch" data-switchery="true"/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
<!-- Search form END -->


<!-- Button form START -->
<div class="row">
	<div class="col-md-12 col-sm-12">
		<button type="button" class="btn btn-sm btn-dark float-right" data-toggle="modal" data-target="#addNoticePopup">공지사항 등록</button>
		<button type="button" class="btn btn-sm btn-dark float-right" id="searchResetBtn">검색 초기화</button>
		<button type="button" class="btn btn-sm btn-dark float-right" id="searchBtn">검색</button>
	</div>
</div>
<!-- Button form END -->


<!-- List form START -->
<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="x_panel">
			<div class="x_title">
				<h2><i class="fa fa-list"></i>&nbsp;List</h2>
				<ul class="nav navbar-right panel_toolbox">
					<li>
						<a class="collapse-link">
							<i class="fa fa-chevron-up"></i>
						</a>
					</li>
				</ul>
				<div class="clearfix"></div>
			</div>
			
			<div class="x_content content-head">
				<div class="float-left">
					<div class="total-count-area">
						총 <span id="totalCount">0</span>건 중 <span id="nowLimit">0-0</span>
					</div>
				</div>
				<div class="float-right">
					<span class="float-left row-text">Rows:</span>&nbsp;
					<select id="rowLimit" class="form-control limit-form float-left">
						<option value="10">10</option>
						<option value="20">20</option>
						<option value="30">30</option>
						<option value="50">50</option>
						<option value="100">100</option>
					</select>
				</div>
			</div>
			
			<div class="x_content content-body">
				<div class="table-responsive">
					<table class="table table-striped jambo_table bulk_action" id="noticeTable">
						<colgroup>
							<col width="5%"/>
							<col width="auto"/>
							<col width="15%"/>
							<col width="15%"/>
							<col width="15%"/>
							<col width="15%"/>
						</colgroup>
						<thead>
							<tr class="heading">
								<th class="column-title text-center">No.</th>
								<th class="column-title text-center sort_th" sort="asc" sortType="title">
									제목<i class="fa fa-exchange sort-image sort_img"></i>
								</th>
								<th class="column-title text-center sort_th" sort="asc" sortType="adminName">
									작성자<i class="fa fa-exchange sort-image sort_img"></i>
								</th>
								<th class="column-title text-center sort_th" sort="asc" sortType="createDate">
									등록일<i class="fa fa-exchange sort-image sort_img"></i>
								</th>
								<th class="column-title text-center sort_th" sort="asc" sortType="updateDate">
									수정일<i class="fa fa-exchange sort-image sort_img"></i>
								</th>
								<th class="column-title text-center sort_th" sort="asc" sortType="hit">
									조회수<i class="fa fa-exchange sort-image sort_img"></i>
								</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
				</div>
			</div>
			
			<div class="x_content">
				<div class="text-right">
					<ul class="pagination float-right" id="pagination"></ul>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- List form END -->


<!-- 등록 팝업 START -->
<div class="modal fade" tabindex="-1" role="dialog" aria-modal="true" id="addNoticePopup">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="myModalLabel">공지사항 등록</h4>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">×</span>
				</button>
			</div>
			<div class="modal-body">
				<table class="table">
					<colgroup>
						<col width="16%"/>
						<col width="28%"/>
						<col width="28%"/>
						<col width="28%"/>
					</colgroup>
					<tbody>
						<tr>
							<th>제목</th>
							<td colspan="3">
								<input type="text" id="insertTitle" class="form-control form-control-cust"/>
							</td>
						</tr>
						<tr>
							<th>내용</th>
							<td colspan="3">
								<div id="insertContent"></div>
							</td>
						</tr>
						<tr>
							<th>설정</th>
							<td>
								<label for="isImportCheck">중요 여부</label>
								<input type="checkbox" id="isImportCheck" class="js-switch" data-switchery="true"/>
							</td>
							<td>
								<label for="isCommentCheck">코멘트 여부</label>
								<input type="checkbox" id="isCommentCheck" class="js-switch" data-switchery="true"/>
							</td>
							<td>
								<label for="isPopupCheck">팝업 여부</label>
								<input type="checkbox" id="isPopupCheck" class="js-switch" data-switchery="true"/>
							</td>
						</tr>
						<tr class="popup_tr" style="display:none;">
							<th>팝업 기간</th>
							<td colspan="3">
								<input type="text" id="popupDate" class="form-control form-control-cust"/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">취소</button>
				<button type="button" class="btn btn-sm btn-primary" id="insertNoticeBtn">등록</button>
			</div>
		</div>
	</div>
</div>
<!-- 등록 팝업 END -->


<!-- 상세 팝업 START -->
<div class="modal fade" tabindex="-1" role="dialog" aria-modal="true" id="detailNoticePopup">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="myModalLabel">공지사항 상세</h4>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">×</span>
				</button>
			</div>
			<div class="modal-body">
				<table class="table">
					<colgroup>
						<col width="15%"/>
						<col width="35%"/>
						<col width="15%"/>
						<col width="35%"/>
					</colgroup>
					<tbody>
						<tr>
							<th>제목</th>
							<td colspan="3" id="detailTitle">
							</td>
						</tr>
						<tr>
							<th>작성자</th>
							<td id="detailAdmin"></td>
							<th>등록일</th>
							<td id="detailCreateDate"></td>
						</tr>
						
						<tr class="detail-content-tr">
							<th>내용</th>
							<td colspan="3" id="detailContent">
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">닫기</button>
				<button type="button" class="btn btn-sm btn-primary" id="updatePopupBtn">수정</button>
			</div>
		</div>
	</div>
</div>
<!-- 상세 팝업 END -->