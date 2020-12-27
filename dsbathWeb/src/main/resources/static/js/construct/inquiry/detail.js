/**
 * 견적 및 시공 문의 상세 JS
 * 
 * @returns
 */
$(function () {
	
	detailInquiryFunc();
	
	// 목록 이동 button event
	$('#listBtn').unbind('click').click(function (e) {
		e.preventDefault();
		
		location.href = '/views/construct/inquiry/list';
	});
});

/**
 * 견적 및 시공 문의 상세 Function
 * @returns
 */
function detailInquiryFunc () {
	
	var inquiryIdx = common.getParameter().idx;
	
	// idx가 없는 경우 페이지 뒤로가기
	if (!inquiryIdx) {
		common.alert('warn', '잘못된 접근 방식입니다. 다시 시도해 주시기 바랍니다.');
		
		setTimeout(function () {
			history.back();
		}, 3000);
		
		return false;
	}
	
	var param = {
		inquiryIdx : inquiryIdx
	};
	
	// ajax request
	common.ajax({
		title		: '견적 및 시공 문의 상세 조회',
		url 		: '/inquiry/rest/detail',
		method		: 'POST',
		async		: true,
		data		: param,
		callback	: function (result) {
			
			var detail = result.detail;

			$('#detailMemberName').text(detail.member.memberName);
			$('#detailHit').text(detail.hit);
			$('#detailCreateDate').text(common.date.formatDate(detail.createDate, '-'));
			$('#detailTitle').text(detail.title);
			$('#detailContent').empty().append(detail.content);
			
			$('#detailAnswerTitle').text(detail.answerTitle);
			$('#detailAnswerDate').text(common.date.formatDate(detail.answerDate, '-'));
			$('#detailAnswerContent').empty().append(detail.answerContent);
		}
	});
}