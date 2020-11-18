<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!-- construct epilogue js -->
<script src="/js/construct/epilogue.js" type="text/javascript"></script>


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
								<input type="text" class="form-control form-control-cust" id="searchMemberName"/>
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
		<button type="button" class="btn btn-sm btn-dark float-right" data-toggle="modal" data-target="#addInstancePopup">시공후기 등록</button>
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
					<table class="table table-striped jambo_table bulk_action" id="epilogueTable">
						<colgroup>
							<col width="5%"/>
							<col width="auto"/>
							<col width="15%"/>
							<col width="15%"/>
							<col width="15%"/>
							<col width="10%"/>
						</colgroup>
						<thead>
							<tr class="heading">
								<th class="column-title text-center">No.</th>
								<th class="column-title text-center sort_th" sort="asc" sortType="title">
									제목<i class="fa fa-exchange sort-image sort_img"></i>
								</th>
								<th class="column-title text-center sort_th" sort="asc" sortType="memberName">
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