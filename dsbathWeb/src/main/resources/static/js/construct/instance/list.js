/**
 * 시공사례 목록 JS
 * 
 * @returns
 */

var page 	= 1;
var limit	= 12;

$(function () {
	
	// 검색 이벤트 시작
	paging.search.start(selectInstanceFunc);
	
});

/**
 * 시공사례 목록 Function
 * 
 * @param p
 * @returns
 */
function selectInstanceFunc (p) {
	
	var page = p ? p : 1;
	
	var param = {
			page 		: (page - 1) * limit,
			limit		: limit,
	};
	
	// ajax request
	common.ajax({
		title		: '시공 사례 목록 조회',
		url			: '/instance/rest/select',
		method		: 'POST',
		async		: true,
		data		: param,
		callback	: function (result) {
			
			// list set
			var html		= '';
			var list 		= result.list;
			var listLength 	= list.length;
			var totalCount 	= result.totalCount;
			var tableTag	= $('#instanceTable');
			
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
				
				// td 4 column 일 때 tr 추가
				if (i != 0 && i % 4 == 0) {
					html += '</tr>';
					html += '<tr>';
				}
				
				html += '<td class="instance_detail text-center" idx="' + thisObj.constructInstanceIdx + '">';
				html += 	(thumbnail ? '<img class="image-100-per code-img" src="' + url + '"/>&nbsp;' : '');
				html += '	<br>';
				html += '	<div>' + thisObj.title + '</div>';
				html += '	<br>';
				html += '</td>';
				
				// 마지막 tr
				if ((i + 1) == listLength) {
					if (i < 4) {
						for (var j = 0; j < (4 - i); j++) {
							html += '<td></td>';
						}
					}
					html += '</tr>';
				}
			}
			
			// 데이터가 없는 경우
			if (listLength == 0) {
				html += '<tr>';
				html += '	<td colspan="4" class="text-center">데이터가 없습니다.</td>';
				html += '</tr>';
			}
			
			// 초기화 후 목록 추가
			tableTag.find('tbody').empty().append(html);
				
			// paging
			paging.init(page, limit, 10, totalCount, selectInstanceFunc);
			
			// 상세 button event
			$('.instance_detail').unbind('click').click(function (e) {
				e.preventDefault();
				
				// 상세 페이지 이동
				location.href = '/views/construct/instance/detail?idx=' + $(this).attr('idx');
			});
		}
	});
}