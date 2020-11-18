$(function () {
	// 검색 이벤트 시작
	common.search.start(selectEpilogueFunc);
});

/**
 * 목록 조회
 * 
 * @returns
 */
function selectEpilogueFunc (p) {
	// 페이징 변수
	page	= p ? p : 1;
	limit	= $('#rowLimit').val();
	
	var startDate 	= '';
	var endDate 	= '';
	if ($('#periodDate').val()) {
		startDate 	= common.date.toString( $('#periodDate').data('daterangepicker').startDate._d, '' );
		endDate 	= common.date.toString( $('#periodDate').data('daterangepicker').endDate._d, '' ); 
	}
	
	//---> 통신 요청
	$.ajax({
		url 		: '/epilogue/rest/select',
		method		: 'POST',
		dataType	: 'JSON',
		data		: {
			page		: (page - 1) * limit,
			limit		: limit,
			sort		: common.search.obj.sort,
			sortType	: common.search.obj.sortType,
			
			title				: $('#searchTitle').val(),
			content				: $('#searchContent').val(),
			'member.memberName' : $('#searchMemberName').val(),
			startDateStr		: startDate,
			endDateStr			: endDate,
		}
	
	//---> 통신 완료
	}).done(function (result) {
		
		if (result.status) {
			
			// list set
			var html 		= '';
			var list 		= result.list;
			var listLength	= list.length;
			var totalCount	= result.totalCount;
			
			// row set
			var eRow = page * limit;
			var sRow = eRow - limit + 1;
				eRow = eRow > totalCount ? totalCount : eRow;
				
			// total count
			$('#totalCount').text(totalCount);
			// 현재 페이지 건수
			$('#nowLimit').text(sRow + '-' + eRow);
			
			for (var i = 0; i < listLength; i++) {
				var thisObj = list[i];
				
				html += '<tr class="epilogue_detail detail-tr" idx="' + thisObj.constructEpilogueIdx + '">';
				html += '	<td class="text-right">' + (sRow + i) + '</td>';
				html += '	<td>' + thisObj.title + '</td>';
				//html += '	<td>' + (thumbnail ? '<img style="width:35px;height:35px;" src="' + url + '"/>&nbsp;' : '') + thisObj.title + '</td>';
				html += '	<td class="text-center">' + (thisObj.member ? (thisObj.member.memberName ? thisObj.member.memberName : '') : '') + '</td>';
				html += '	<td class="text-center">' + common.date.toString(new Date(thisObj.createDate), '-') + '</td>';
				html += '	<td class="text-center">' + common.date.toString(new Date(thisObj.updateDate), '-') + '</td>';
				html += '	<td class="text-right">' + (thisObj.hit ? thisObj.hit : 0) + '</td>';
				html += '</tr>';
			}
			
			// 목록 없을 때
			if (listLength == 0) {
				html  = '<tr>';
				html += '	<td class="text-center" colspan="6">내용이 없습니다.</td>';
				html += '</tr>';
			}
			
			// 목록 초기화 후 append
			$('#epilogueTable').find('tbody').empty().append(html);
			
			// paging
			common.paging(page, limit, 10, totalCount, selectEpilogueFunc);
			
		} else {
			common.alert('dang', '시공후기 정보 목록 조회 요청중 서버 에러가 발생하였습니다.');
		}
		
	//---> 통신 에러
	}).fail(function () {
		common.alert('dang', '시공후기 정보 목록 조회 요청중 서버 통신 장애가 발생하였습니다.');
	});
	
}