<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!-- board js -->
<script src="/js/board/list.js" type="text/javascript"></script>
<script src="/js/board/detail.js" type="text/javascript"></script>
<script src="/js/board/answer.js" type="text/javascript"></script>
<script src="/js/board/comment.js" type="text/javascript"></script>

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
						<col width="40%"/>
						<col width="10%"/>
						<col width="40%"/>
					</colgroup>
					<tbody>
						<tr>
							<th>등록일</th>
							<td>
								<input class="form-control form-control-cust" id="periodDate" readOnly/>
							</td>
							<th>이름</th>
							<td>
								<input type="text" class="form-control form-control-cust" id="searchAdminName"/>
							</td>
						</tr>
						<tr>
							<th>제목</th>
							<td colspan="3">
								<input type="text" class="form-control form-control-cust" id="searchTitle"/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
<!-- Search form START -->


<!-- Button form START -->
<div class="row">
	<div class="col-md-12 col-sm-12">
		<button type="button" class="btn btn-sm btn-dark float-right" id="insertPopupBtn" style="display:none;">등록</button>
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
					<table class="table" id="boardTable">
						<colgroup>
						</colgroup>
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


<!-- 상세 팝업 START -->
<div class="modal fade" tabindex="-1" role="dialog" aria-modal="true" id="detailBoardPopup">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="myModalLabel">시공사례 상세</h4>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">×</span>
				</button>
			</div>
		</div>
	</div>
</div>
<!-- 상세 팝업 END -->