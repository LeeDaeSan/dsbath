/**
 * 자주하는 질문 JS
 * 
 * @returns
 */

var page 	= 1;
var limit	= 10;

$(function () {
	
	// 검색하기 button event
	$('#searchBtn').unbind('click').click(function (e) {
		e.preventDefault();
		
		selectFaqFunc();
	});
	
	$('#searchBtn').click();
	
	// 검색어 keyup event
	$('#searchKeyword').keyup(function (e) {
		if (e.keyCode == '13') {
			$('#searchBtn').click();
		}
	});
});

/**
 * 자주하는 질문 목록 Function
 * 
 * @returns
 */
function selectFaqFunc (p) {
	
	var page = p ? p : 1;
	
	var param = {
		question 	: $.trim($('#searchKeyword').val()),
		page		: (page - 1) * limit,
		limit		: limit,
	};
	
	// ajax request
	common.ajax({
		title		: '자주하는 질문 목록 조회',
		url			: '/faq/rest/select',
		method		: 'POST',
		async		: true,
		data		: param,
		callback	: function (result) {
			
			// list set
			var html 		= '';
			var list		= result.list;
			var listLength	= list.length;
			var totalCount	= result.totalCount;
			
			for (var i = 0; i < listLength; i++) {
				var thisObj = list[i];
				
				html += '<li>';
				html += '	<div class="faq-question-head">';
				html += '		<img src="/images/faq/faq-plus.png"/>';
				html += '		<span class="faq-question">' + thisObj.question + '</span>';
				html += '	</div>';
				html += '	<div class="faq-comment" style="' + (param.question ? '' : 'display:none;') + '">' + thisObj.comment + '</div>';
				html += '</li>';
			}
			
			// 데이터가 없는 경우
			if (listLength == 0) {
				html = '<li class="none-data">데이터가 없습니다.</li>';
			}
			
			// 초기화 후 목록 추가
			$('#faqUl').empty().append(html);
			
			// paging
			paging.init(page, limit, 10, totalCount, selectFaqFunc);
			
			// 질문의 답변 보기 slide down / up event
			$('#faqUl li .faq-question-head').unbind('click').click(function (e) {
				e.preventDefault();
				
				// on -> off
				if ($(this).attr('show') == 'on') {
					$(this).attr('show', 'off');
					$(this).closest('li').find('.faq-comment').slideUp('fast');
					$(this).closest('li').find('img').attr('src', '/images/faq/faq-plus.png');
					
				// off -> on
				} else {
					$(this).attr('show', 'on');
					$(this).closest('li').find('.faq-comment').slideDown('fast');
					$(this).closest('li').find('img').attr('src', '/images/faq/faq-minus.png');
				}
			});
		}
	});
}
