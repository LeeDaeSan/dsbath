/**
 * 커뮤니티 목록 JS
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

var page = 1;

$(function () {
	
	selectCommunityFunc();
	
});

/**
 * 커뮤니티 목록 Function
 * 
 * @returns
 */
function selectCommunityFunc (p) {
	
	page	= p ? p : 1;
	limit	= 10;
	
	// parameter
	var param = {
		page			: (page - 1) * limit,
		limit			: limit,
		communityType 	: communityType,
	};
	
	// ajax request
	common.ajax({
		title		: communityTitle + ' 목록 조회',
		url			: '/community/rest/select',
		method		: 'POST',
		async		: true,
		data		: param,
		callback	: function (result) {
			
			// list set
			var html		= '';
			var list 		= result.list;
			var listLength 	= list.length;
			var totalCount 	= result.totalCount;
			var tableTag	= $('#communityTable');
			
			// row set
			var eRow = page * limit;
			var sRow = eRow - limit + 1;
				eRow = eRow > totalCount ? totalCount : eRow;
				
			for (var i = 0; i < listLength; i++) {
				var thisObj = list[i];
				
				var thumbnail 	= thisObj.thumbnail;
				var url 		= '/file/rest/download?' + thumbnail;
				
				// 최초 tr
				if (i == 0) {
					html += '<tr>';
				}
				
				// td 3 column 일 때 tr 추가
				if (i != 0 && i % 3 == 0) {
					html += '</tr>';
					html += '<tr>';
				}
				
				html += '<td class="community_detail text-center" idx="' + thisObj.communityIdx + '">';
				html += 	(thumbnail ? '<img class="image-100-per code-img" src="' + url + '"/>&nbsp;' : '');
				html += '	<br>';
				html += '	<div>' + thisObj.title + '</div>';
				html += '	<br>';
				html += '</td>';
				
				// 마지막 tr
				if ((i + 1) == listLength) {
					if (i < 3) {
						for (var j = 0; j < (3 - i); j++) {
							html += '<td></td>';
						}
					}
					html += '</tr>';
				}
			}
			
			// 데이터가 없는 경우
			if (listLength == 0) {
				html += '<tr>';
				html += '	<td colspan="3" class="text-center">데이터가 없습니다.</td>';
				html += '</tr>';
			}
			
			// 초기화 후 목록 추가
			tableTag.find('tbody').empty().append(html);
				
			// paging
			paging.init(page, limit, 10, totalCount, selectCommunityFunc);
			
			// 상세 button event
			$('.community_detail').unbind('click').click(function (e) {
				e.preventDefault();
				
				// 상세 페이지 이동
				location.href = '/views/community/' + communityPath + '/detail?idx=' + $(this).attr('idx');
			});
			
		}
	});
}