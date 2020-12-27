/**
 * 커뮤니티 상세 JS
 * 
 * @returns
 */

var communityType 	= 'L';
var communityTitle 	= '키친&바스 살림 팁';
var communityPath	= 'living';

var url = location.href;

// 키친&바스 살림 팁
if (url.indexOf('living') != -1) {
	communityType 	= 'L';
	communityTitle 	= '디에스 키친&바스 살림 팁';
	communityPath	= 'living';
	
// 인테리어 팁
} else if (url.indexOf('interior') != -1) {
	communityType 	= 'I';
	communityTitle 	= '디에스 인테리어 팁';
	communityPath	= 'interior';
	
// 이벤트
} else if (url.indexOf('event') != -1) {
	communityType 	= 'E';
	communityTitle 	= '디에스 이벤트';
	communityPath	= 'event';
}

$(function () {
	
	detailCommunityFunc();
	
	// 목록 이동 button event
	$('#listBtn').unbind('click').click(function (e) {
		e.preventDefault();
		
		location.href = '/views/community/' + communityPath + '/list';
	});
});

/**
 * 커뮤니티 상세 Function
 * 
 * @returns
 */
function detailCommunityFunc () {
	
var communityIdx = common.getParameter().idx;
	
	// idx가 없는 경우 페이지 뒤로가기
	if (!communityIdx) {
		common.alert('warn', '잘못된 접근 방식입니다. 다시 시도해 주시기 바랍니다.', );
		
		setTimeout(function () {
			history.back();
		}, 3000);
		
		return false;
	}
	
	// parameter
	var param = {
			communityIdx 	: communityIdx,
			communityType	: communityType,
	};
	
	// ajax request
	common.ajax({
		title		: communityTitle + ' 상세 조회',
		url			: '/community/rest/detail',
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