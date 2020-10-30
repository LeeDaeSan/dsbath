<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!-- admin main js -->
<script src="/js/admin/main.js" type="text/javascript"></script>

<!-- Button form START -->
<div class="row">
	<div class="col-md-12 col-sm-12">
		<button type="button" class="btn btn-sm btn-dark float-right" data-toggle="modal" data-target="#addAdminPopup">관리자 등록</button>
	</div>
</div>
<!-- Button form END -->

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
							<th>이름</th>
							<td>
								<input type="text" class="form-control form-control-cust" id="adminName"/>
							</td>
							<th>아이디</th>
							<td>
								<input type="text" class="form-control form-control-cust" id="adminId"/>
							</td>
						</tr>
						<tr>
							<th>
								<select class="form-control form-control-cust">
									<option>등록일</option>
									<option>수정일</option>
								</select>
							</th>
							<td colspan="3">
								<input type="text" class="form-control form-control-cust" id="startDate"/>
							</td>
						</tr>
						<tr>
							<th>주소</th>
							<td colspan="3">
								<input type="text" class="form-control form-control-cust" id="address"/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
<!-- Search form END -->


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
			<div class="x_content">
				<div class="table-responsive">
					<table class="table table-striped jambo_table bulk_action" id="adminTable">
						<colgroup>
							<col width="5%"/>
							<col width="15%"/>
							<col width="15%"/>
							<col width="auto"/>
							<col width="15%"/>
							<col width="15%"/>
						</colgroup>
						<thead>
							<tr class="heading">
								<th class="column-title">No.</th>
								<th class="column-title">이름</th>
								<th class="column-title">아이디</th>
								<th class="column-title">주소</th>
								<th class="column-title">등록일</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- List form END -->


<!-- 등록 팝업 START -->
<div class="modal fade" tabindex="-1" role="dialog" aria-modal="true" id="addAdminPopup">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="myModalLabel">관리자 등록</h4>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">×</span>
				</button>
			</div>
			<div class="modal-body">
				<table class="table">
					<tbody>
						<tr>
							<th>이름</th>
							<td>
								<input type="text" id="insertAdminName" class="form-control form-control-cust"/>
							</td>
						</tr>
						<tr>
							<th>아이디</th>
							<td>
								<input type="text" id="insertAdminId" class="form-control form-control-cust"/>
							</td>
						</tr>
						<tr>
							<th>비밀번호</th>
							<td>
								<input type="password" id="insertPassword" class="form-control form-control-cust"/>
							</td>
						</tr>
						<tr>
							<th>주소</th>
							<td>
								<input type="text" id="insertAddress" class="form-control form-control-cust"/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">취소</button>
				<button type="button" class="btn btn-primary" id="insertAdminBtn">등록</button>
			</div>
		</div>
	</div>
</div>
<!-- 등록 팝업 END -->