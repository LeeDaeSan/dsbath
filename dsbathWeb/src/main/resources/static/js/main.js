$(function () {
	
	selectInstanceFunc();
	
});

function selectInstanceFunc () {
	
	//---> 통신 요청
	$.ajax({
		url 		: '/main/rest/list',
		method		: 'POST',
		dataType	: 'JSON',
		data		: {
			
		}
	
	//---> 통신 완료
	}).done(function (result) {
		
		// 성공
		if (result.status) {
			
		//========== 시공사례 목록 START ==========//		
			var html 		= '';
			var list 		= result.instanceList;
			var listLength 	= list.length;

			for (var i = 0; i < listLength; i++) {
				var thisObj = list[i];
				
				html += '<div class="instance-text">';
				html += 	thisObj.title;
				html += '</div>';
			}
			$('#mainConstructInstance').empty().append(html);
		//========== 시공사례 목록 END ==========//		
			
			
		//========== 공지사항 목록 START ==========//		
				html		= '';
			var nList 		= result.noticeList;
			var nListLength = nList.length;
			
			for (var i = 0; i < nListLength; i++) {
				var thisObj = nList[i];
				console.log(thisObj.createDate);
				html += '<tr class="add-data">';
				html += '	<td class="over-text">▶&nbsp;' + thisObj.title + '</td>';
				html += '	<td class="text-right">' + common.date.toStringMD(new Date(thisObj.createDate), '.') + '</td>';
				html += '</tr>';
			}
			// 데이터가 없을 때
			if (nListLength == 0) {
				html += '<tr>';
				html += '	<th colspan="2" class="text-center no-data">내용이 없습니다.</th>';
				html += '<tr>';
			}
			$('.main_notice_table').find('tbody').empty().append(html);
		//========== 공지사항 목록 END ==========//		
			
			
		//========== 시공후기 목록 START ==========//		
				html		= '';
			var eList 		= result.epilogueList;
			var eListLength = eList.length;
			
			for (var i = 0; i < eListLength; i++) {
				var thisObj = eList[i];
				console.log(thisObj.createDate);
				html += '<tr class="add-data">';
				html += '	<td class="over-text">▶&nbsp;' + thisObj.title + '</td>';
				html += '	<td class="text-right">' + common.date.toStringMD(new Date(thisObj.createDate), '.') + '</td>';
				html += '</tr>';
			}
			// 데이터가 없을 때
			if (nListLength == 0) {
				html += '<tr>';
				html += '	<th colspan="2" class="text-center no-data">내용이 없습니다.</th>';
				html += '<tr>';
			}
			$('.main_epilogue_table').find('tbody').empty().append(html);
			//========== 시공후기 목록 END ==========//		
		// 실패
		} else {
			
		}
		
	//---> 통신 에러
	}).fail(function () {
		
	});
}