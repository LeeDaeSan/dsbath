$(function () {
	
	// 검색 이벤트 시작
	common.search.start(selectCodeFunc);
	
	$('.image_file').change(function (e) {
		var thisType = $(this).attr('fileType');
		
		var formTag 	= thisType == 'insert' ? $('#insertCodePopup') : $('#detailCodePopup');
		var files		= e.target.files;
		var fileLength	= files.length;
		
		var thisImage 		= $('#' + thisType + 'Image');
		var thisImageFile 	= $('#' + thisType + 'ImageFile');
		
		for (var i = 0; i < fileLength; i++) {
			var fileObj = common.file.save(files[i], 'code', thisImage, '50');
			
			thisImage.find('img').after('<a class="delete_image image-close" href="javascript:void(0);"><i class="fa fa-close"></i></a>');
			formTag.append('<input type="hidden" class="' + thisType + '_file" value="path=' + fileObj.filePath + '&fileName=' + fileObj.fileName + '"/>');
		}
		
		thisImageFile.hide();
		
		// 미리보기 이미지 삭제
		$('.detail_image').unbind('click').click(function (e) {
			e.preventDefault();
			
			// 이미지 영역 비우기
			thisImage.empty();
			// input file init
			thisImageFile.show();
			thisImageFile.val('');
			thisImageFile.replaceWith( thisImageFile.clone(true) );
		});
		
	});
	
	// 등록, 수정, 삭제 button click event
	$('.merge_btn').unbind('click').click(function (e) {
		e.preventDefault();
		
		mergeCodeFunc($(this).attr('mergeType'), $(this).attr('idx'));
	});
	
});

function selectCodeFunc (p) {
	
	// 페이징 변수
	page 	= p ? p : 1;
	limit	= $('#rowLimit').val();
	
	// 기간 데이터 파싱
	var startDate 	= '';
	var endDate 	= '';
	if ($('#periodDate').val()) {
		startDate 	= common.date.toString( $('#periodDate').data('daterangepicker').startDate._d, '' );
		endDate 	= common.date.toString( $('#periodDate').data('daterangepicker').endDate._d, '' ); 
	}
	
	//---> 통신 요청
	$.ajax({
		url			: '/tileCode/rest/select',
		method		: 'POST',
		dataType	: 'JSON',
		data		: {
			page		: (page - 1) * limit,
			limit		: limit,
			sort		: common.search.obj.sort,
			sortType	: common.search.obj.sortType,
			
			startDateStr	: startDate,
			endDateStr		: endDate,
			tileName		: $('#searchTileName').val(),
		}
		
	//---> 통신 완료
	}).done(function (result) {
		
		// 성공
		if (result.status) {
			
			var html 		= '';
			var list		= result.list;
			var listLength	= list.length;
			var totalCount	= result.totalCount;
			
			var eRow = page * limit;
			var sRow = eRow - limit + 1;
				eRow = eRow > totalCount ? totalCount : eRow;
				
				// total count
				$('#totalCount').text(totalCount);
				// 현재 페이지 건수
				$('#nowLimit').text(sRow + '-' + eRow);
				
				for (var i = 0; i < listLength; i++) {
					var thisObj = list[i];
					
					html += '<tr class="code_detail detail-tr" idx="' + thisObj.tileCodeIdx + '">';
					html += '	<td class="text-right">' + (sRow + i) + '</td>';
					html += '	<td>' + thisObj.tileName + '</td>';
					html += '	<td class="text-center">' + common.date.toString(new Date(thisObj.createDate), '-') + '</td>'; 
					html += '	<td class="text-center">' + common.date.toString(new Date(thisObj.updateDate), '-') + '</td>'; 
					html += '</tr>';
				}
				
				//데이터가 없는 경우
				if (listLength == 0) {
					html += '<tr>';
					html += '	<td colspan="5" class="text-center">데이터가 없습니다.</td>';
					html += '</tr>';
				}
				
				// 초기화 후 목록 추가
				$('#codeTable').find('tbody').empty().append(html);
				
				// paging
				common.paging(page, limit, 10, totalCount, selectCodeFunc);
				
				// 상세 팝업
			
		// 실패
		} else {
			common.alert('dang', '코드 목록 정보 조회 요청중 에러가 발생하였습니다.');
		}
		
	//---> 통신 에러
	}).fail(function () {
		common.alert('dang', '코드 목록 정보 조회 요청중 서버 통신 에러가 발생하였습니다.');
	});
}

/**
 * 코드 등록, 수정, 삭제
 * 
 * @param type
 * @param idx
 * @returns
 */
function mergeCodeFunc (type, idx) {
	
	var mergeText 	= '등록';
	var tagType		= 'insert';
	
	// 등록 type
	if (type == 'I') {
		mergeText 	= '등록';
		tagType 	= 'insert';
		
	// 수정 type
	} else if (type == 'U') {
		mergeText 	= '수정';
		tagType 	= 'update';
		
	// 삭제 type
	} else if (type == 'D') {
		mergeText 	= '삭제';
		tagType 	= 'delete';
	}
	
	//---> 통신 요청
	$.ajax({
		url			: '/tileCode/rest/merge',
		method		: 'POST',
		dataType	: 'JSON',
		data		: {
			type		: type,
			tileName	: $('#' + tagType + 'Name').val(),
			image		: $('.' + tagType + '_file').val(),
		}
	
	//---> 통신 완료
	}).done(function (result) {
		
		// 성공
		if (result.status) {
			
			console.log(result);
			
		// 실패
		} else {
			
		}
		
	//---> 통신 에러
	}).fail(function (result) {
	});
}