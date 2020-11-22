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
		<button type="button" class="btn btn-sm btn-dark float-right" data-toggle="modal" data-target="#insertAdminPopup">관리자 등록</button>
		<button type="button" class="btn btn-sm btn-dark float-right" id="searchResetBtn">검색 초기화</button>
		<button type="button" class="btn btn-sm btn-dark float-right" id="searchBtn">검색</button>
	</div>
</div>
<!-- Button form END -->