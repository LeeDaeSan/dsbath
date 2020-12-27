/**
 *	공지사항 목록 JS
 */

var page 	= 1;
var limit 	= 10;

$(function () {
	
	// 검색 이벤트 시작
	paging.search.start(selectNoticeFunc);
	
});

/**
 * 공지사항 목록 Function
 * 
 * @returns
 */
function selectNoticeFunc (p) {
	
	var page = p ? p : 1;
	
	var param = {
		page			: (page - 1) * limit,
		limit			: limit,
		'admin.adminName' : ''
	};
	
	// ajax request
	common.ajax({
		title		: '공지사항 목록 조회',
		url 		: '/notice/rest/select',
		method		: 'POST',
		async		: true,
		data		: param,
		callback 	: function (result) {
			
			var html		= '';
			var list 		= result.list;
			var listLength	= list.length;
			var totalCount 	= result.totalCount;
			var tableTag	= $('#noticeTable');
			var colCount 	= tableTag.find('thead').find('th').length;
			
			// row set
			var eRow = page * limit;
			var sRow = eRow - limit + 1;
				eRow = eRow > totalCount ? totalCount : eRow;
				
			for (var i = 0; i < listLength; i++) {
				var thisObj = list[i];
				
				html += '<tr class="detail-tr notice_detail" idx="' + thisObj.noticeIdx + '">';
				html += '	<td class="over-text text-right">' 	+ (totalCount - i * sRow) 							+ '</td>';
				html += '	<td class="over-text text-left">'	+ thisObj.title 									+ '</td>';
				html += '	<td class="over-text text-center">' + thisObj.admin.adminName 							+ '</td>';
				html += '	<td class="over-text text-center">' + common.date.formatDate(thisObj.createDate, '-') 	+ '</td>';
				html += '	<td class="over-text text-right">' 	+ thisObj.hit 										+ '</td>';
				html += '</tr>';
			}
			
			// 목록이 없을 때
			if (listLength == 0) {
				html += '<tr><td class="text-center" colspan="' + colCount + '">내용이 없습니다.</td></tr>';
			}
			
			// 목록 초기화 후 append
			tableTag.find('tbody').empty().append(html);
			
			// paging
			paging.init(page, limit, 10, totalCount, selectNoticeFunc);
			
			// 상세 button event
			$('.notice_detail').unbind('click').click(function (e) {
				e.preventDefault();
				
				// 상세페이지 이동
				location.href = '/views/notice/detail?idx=' + $(this).attr('idx');
			});
		}
	});
}