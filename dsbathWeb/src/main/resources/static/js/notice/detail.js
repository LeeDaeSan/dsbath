/**
 * 공지사항 상세 JS
 * 
 * @returns
 */

$(function () {
	
	detailNoticeFunc();
	
	// 목록 이동 button event
	$('#listBtn').unbind('click').click(function (e) {
		e.preventDefault();
		
		location.href = '/views/notice/list';
	});
});

/**
 * 공지사항 상세 Function
 * 
 * @returns
 */
function detailNoticeFunc () {
	
	var noticeIdx = common.getParameter().idx;

	// idx가 없는 경우 페이지 뒤로가기
	if (!noticeIdx) {
		common.alert('warn', '잘못된 접근 방식입니다. 다시 시도해 주시기 바랍니다.', );
	
		setTimeout(function () {
			history.back();
		}, 3000);
		
		return false;
	}
	
	var param = {
			noticeIdx : noticeIdx  
	};
	
	// ajax request
	common.ajax({
		title		: '공지사항 상세 조회',
		url			: '/notice/rest/detail',
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
	});
}