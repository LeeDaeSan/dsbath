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
			
		// 실패
		} else {
			
		}
		
	//---> 통신 에러
	}).fail(function () {
		
	});
}