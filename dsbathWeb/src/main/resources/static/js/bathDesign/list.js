/**
 * 욕실 디자인 목록 JS
 * 
 * @returns
 */

var page 	= 1;
var limit	= 36;

$(function () {
	
	// 검색 이벤트 시작
	paging.search.start(selectBathDesignFunc);
	
});

/**
 * 욕실 디자인 목록 Function
 * 
 * @returns
 */
function selectBathDesignFunc (p) {
	
	var page = p ? p : 1;
	
	var param = {
			page 		: (page - 1) * limit,
			limit		: limit,
	};
	
	// ajax request
	common.ajax({
		title		: '욕실디자인 목록 조회',
		url			: '/bathDesign/rest/select',
		method		: 'POST',
		async		: true,
		data		: param,
		callback	: function (result) {
		
			// list set
			var html		= '';
			var list 		= result.list;
			var listLength 	= list.length;
			var totalCount 	= result.totalCount;
			var tableTag	= $('#bathDesignTable');
			
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
				
				html += '<td class="bath_design_detail text-center" idx="' + thisObj.bathDesignIdx + '">';
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
			paging.init(page, limit, 10, totalCount, selectBathDesignFunc);
			
			// 상세 button event
			$('.bath_design_detail').unbind('click').click(function (e) {
				e.preventDefault();
				
				// 상세 페이지 이동
				location.href = '/views/bathDesign/detail?idx=' + $(this).attr('idx');
			});
		}
	});
	
}