/**
 * 시공사례 상세 JS
 * 
 * @returns
 */

$(function () {
	
	detailInstanceFunc();
	
	// 목록 이동 button event
	$('#listBtn').unbind('click').click(function (e) {
		e.preventDefault();
		
		location.href = '/views/construct/instance/list';
	});
});

/**
 * 시공사례 상세 Function
 * 
 * @returns
 */
function detailInstanceFunc () {
	
	var instanceIdx = common.getParameter().idx;
	
	// idx가 없는 경우 페이지 뒤로가기
	if (!instanceIdx) {
		common.alert('warn', '잘못된 접근 방식입니다. 다시 시도해 주시기 바랍니다.', );
		
		setTimeout(function () {
			history.back();
		}, 3000);
		
		return false;
	}
	
	// parameter
	var param = {
		constructInstanceIdx : instanceIdx
	};
	
	// ajax request
	common.ajax({
		title		: '시공 사례 상세 조회',
		url			: '/instance/rest/detail',
		method		: 'POST',
		async		: true,
		data		: param,
		callback	: function (result) {
			
			var detail = result.detail;
			
			$('#detailAdminName').text(detail.admin.adminName);
			$('#detailHit').text(detail.hit);
			$('#detailCreateDate').text(common.date.formatDate(detail.createDate, '-'));
			$('#detailTitle').text(detail.title);
			$('#detailContent').empty().append(detail.content);
		}
	})
}