<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>


<!-- admin main js -->
<script src="/js/design/design.js" type="text/javascript"></script>

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
						<col width="20%"/>
						<col width="20%"/>
						<col width="10%"/>
						<col width="40%"/>
					</colgroup>
					<tbody>
						<tr>
							<th>이름</th>
							<td colspan="2">
								<input type="text" class="form-control form-control-cust keyup_enter" id=""/>
							</td>
							<th>아이디</th>
							<td>
								<input type="text" class="form-control form-control-cust keyup_enter" id=""/>
							</td>
						</tr>
						<tr>
							<th>등록일</th>
							<td colspan="2">
								<input class="form-control form-control-cust" id="periodDate" readOnly/>
							</td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<th>주소</th>
							<td colspan="4">
								<input type="text" class="form-control form-control-cust keyup_enter" id=""/>
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
		<button type="button" class="btn btn-sm btn-dark float-right" id="insertPopupBtn">디자인 등록</button>
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
					<table class="table table-striped jambo_table bulk_action" id="bathDesignTable">
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


<!-- 상세 팝업 START -->
<div class="modal fade" tabindex="-1" role="dialog" aria-modal="true" id="detailBathDesignPopup">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="myModalLabel">디자인 상세 정보</h4>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">×</span>
				</button>
			</div>
			<div class="modal-body modal-body-overflow">
				<table class="table" id="detailBathDesignTable">
					<colgroup>
						<col width="10%"/>
						<col width="40%"/>
						<col width="10%"/>
						<col width="40%"/>
					</colgroup>
					<tbody>
					</tbody>
				</table>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">닫기</button>
				<button type="button" class="btn btn-sm btn-primary popup_btn" style="display:none;" id="changeBtn">수정</button>
				<button type="button" class="btn btn-sm btn-primary popup_btn merge_btn" mergeType="I" id="insertBtn">등록</button>
				<button type="button" class="btn btn-sm btn-danger popup_btn merge_btn" style="display:none;" mergeType="D" id="deleteBtn">삭제</button>
				<button type="button" class="btn btn-sm btn-primary popup_btn merge_btn" style="display:none;" mergeType="U" id="updateBtn">저장</button>
			</div>
		</div>
	</div>
</div>
<!-- 상세 팝업 END -->


<!-- 등록 팝업 START -->
<div class="modal fade" tabindex="-1" role="dialog" aria-modal="true" id="insertBathDesignPopup">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="myModalLabel">디자인 등록</h4>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">×</span>
				</button>
			</div>
			<div class="modal-body modal-body-overflow">
				<table class="table">
					<colgroup>
						<col width="10%"/>
						<col width="40%"/>
						<col width="10%"/>
						<col width="40%"/>
					</colgroup>
					<tbody>
						<tr>
							<th>제목</th>
							<td colspan="3">
								<input type="text" id="insertTitle" class="form-control form-control-cust"/>
							</td>
						</tr>
						<tr>
							<th>썸네일</th>
							<td>
								<input type="file" id="insertThumbnailFile" class="thumbnail_file" fileType="insert"/>
								<div id="insertThumbnail"></div>
							</td>
						</tr>
						<tr>
							<th>내용</th>
							<td colspan="3">
								<div id="insertContent"></div>
							</td>
						</tr>
						<tr>
							<th>
								타일 디자인
								<br>
								<button type="button" mergeType="I" class="btn btn-sm btn-secondary add_tile_code_btn" data-toggle="modal" data-target="#addCodePopup">추가하기</button>
							</th>
							<td id="insertTileCode"></td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">취소</button>
				<button type="button" class="btn btn-sm btn-primary merge_btn" mergeType="I">등록</button>
			</div>
		</div>
	</div>
</div>
<!-- 등록 팝업 END -->


<!-- 코드 검색 팝업 START -->
<div class="modal fade" tabindex="-1" role="dialog" aria-modal="true" id="addCodePopup">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="myModalLabel">코드 검색</h4>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">×</span>
				</button>
			</div>
			<div class="modal-body">
				<table class="table">
					<colgroup>
						<col width="15%"/>
						<col width="70%"/>
						<col width="15%"/>
					</colgroup>
					<tr>
						<th>코드명</th>
						<td>
							<input type="text" class="form-control form-control-sm"/>
						</td>
						<td>
							<button class="btn btn-sm btn-secondary">검색</button>
						</td>
					</tr>
				</table>
				
				<table class="table" id="codeTable">
					<colgroup>
						<col width="33%"/>
						<col width="33%"/>
						<col width="33%"/>
					</colgroup>
					<tbody>
					</tbody>
				</table>
				
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">취소</button>
				<button type="button" class="btn btn-sm btn-primary" id="choiceCodeBtn">선택</button>
			</div>
		</div>
	</div>
</div>
<!-- 코드 검색 팝업 END -->