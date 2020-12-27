$(function () {
	
	// 검색 이벤트 시작
	common.search.start(selectCodeFunc);
	
	// 코드 등록 button event
	$('#insertPopupBtn').unbind('click').click(function (e) {
		e.preventDefault();
		
		// popup body append
		addPopupBody('insert');
		// modal show
		$('#detailCodePopup').modal('show');
	});
	
	// 등록, 수정, 삭제 button click event
	$('.merge_btn').unbind('click').click(function (e) {
		e.preventDefault();
		
		mergeCodeFunc($(this).attr('mergeType'), $(this).attr('idx'));
	});
	
});

/**
 * 코드 목록 조회 Function
 * 
 * @param p
 * @returns
 */
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
		url			: '/bathCode/rest/select',
		method		: 'POST',
		dataType	: 'JSON',
		data		: {
			page		: (page - 1) * limit,
			limit		: limit,
			sort		: common.search.obj.sort,
			sortType	: common.search.obj.sortType,
			
			startDateStr	: startDate,
			endDateStr		: endDate,
			codeType		: $('#searchCodeType').val(),
			codeName		: $('#searchCodeName').val(),
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
			$('#nowLimit').text((eRow > 0 ? sRow : 0) + '-' + eRow);
			
			for (var i = 0; i < listLength; i++) {
				var thisObj = list[i];
				var image	= thisObj.image;
				var url		= '/file/rest/download?' + image;
				
				// 최초 tr
				if (i == 0) {
					html += '<tr>';
				}
				// td 5 column 일 때 tr 추가
				if (i % 5 == 0) {
					html += '</tr>';
					html += '<tr>';
				}
				
				html += '<td class="code_detail detail-tr text-center" idx="' + thisObj.bathCodeIdx + '">';
				html += 	(image ? '<img class="image-lg code-img" src="' + url + '"/>' : '');
				html += '	<br>';
				html += '	<div>' + thisObj.codeName + '</div>';
				html += '</td>';
				
				// 마지막 tr
				if ((i + 1) == listLength) {
					if (i < 5) {
						for (var j = 0; j < (5 - i); j++) {
							html += '<td></td>';
						}
					}
					html += '</tr>';
				}
			}
			
			// 데이터가 없는 경우
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
			$('.code_detail').unbind('click').click(function (e) {
				e.preventDefault();
				
				// popup body append
				addPopupBody('detail');
				// modal show
				$('#detailCodePopup').modal('show');
				// 상세 정보 조회
				detailCodeFunc('tile', $(this).attr('idx'));
			});
			
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
 * 코드 상세 Function
 * 
 * @param type
 * @param idx
 * @returns
 */
function detailCodeFunc (type, idx) {
	
	//---> 통신 요청
	$.ajax({
		url 		: '/bathCode/rest/detail',
		method		: 'POST',
		dataType	: 'JSON',
		data		: {
			bathCodeIdx : idx,
		}
	
	//---> 통신 완료
	}).done(function (result) {
	
		// 성공
		if (result.status) {
			
			var detail 	= result.detail;
			var image 	= detail.image;
			
			// 상세 정보 append
			$('#detailCodeType').text(detail.codeType == 'T' ? '타일' : '제품');
			$('#detailCodeName').text(detail.codeName);
			$('#detailImage').empty().append((image ? '<img class="image-200" src="/file/rest/download?' + image + '"/>' : ''));
			
			// 상세팝업 -> 수정팝업으로 변경 button event
			$('#changeBtn').unbind('click').click(function (e) {
				e.preventDefault();
				
				// popup body append
				addPopupBody('update');
				
				$('#updateBtn, #deleteBtn').attr('idx', detail.bathCodeIdx);
				$('#updateCodeType').val(detail.codeType);
				$('#updateCodeName').val(detail.codeName);
				
				var formTag 		= $('#detailCodePopup');
				var updateImage		= $('#updateImage');
				var updateImageFile = $('#updateImageFile');
				
				updateImage.append('<p><img class="image-lg" src="/file/rest/download?' + image + '"/></p>');
				
				updateImage.find('img').after('<a class="delete_image image-close" href="javascript:void(0);"><i class="fa fa-close"></i></a>');
				formTag.find('.update_file').remove();
				formTag.append('<input type="hidden" class="update_file" value="' + image + '"/>')
				
				updateImageFile.hide();
				
				// 미리보기 이미지 삭제
				$('.delete_image').unbind('click').click(function (e) {
					e.preventDefault();
					
					// 이미지 영역 비우기
					updateImage.empty();
					// input file init
					updateImageFile.show();
					updateImageFile.val('');
					updateImageFile.replaceWith( updateImageFile.clone(true) );
				});
			});
			
		// 실패
		} else {
			common.alert('dang', '코드 상세 정보 조회를 실패하였습니다.');
		}
		
	//---> 통신 에러
	}).fail(function () {
		common.alert('dang', '코드 상세 정보 조회 요청중 에러가 발생하였습니다.');
	});
}

/**
 * 코드 등록, 수정, 삭제 Function
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
	
	// confirm
	if (confirm('해당 코드 정보를 ' + mergeText + '하시겠습니까?')) {
		
		// parameter
		var param = {
			type : type	
		};
		
		if (type == 'U' || type == 'D') {
			param['bathCodeIdx'] = idx;
		}
		
		if (type == 'I' || type == 'U') {
			param['codeType'] 	= $('#' + tagType + 'CodeType').val();
			param['codeName'] 	= $('#' + tagType + 'CodeName').val();
			param['image']		= $('.' + tagType + '_file').val();
		}
		
		//---> 통신 요청
		$.ajax({
			url			: '/bathCode/rest/merge',
			method		: 'POST',
			dataType	: 'JSON',
			async		: false,
			data		: param,
		
		//---> 통신 완료
		}).done(function (result) {
			
			// 성공
			if (result.status) {
				
				if (result.status) {
					
					// alert
					common.alert('succ', '코드 정보 ' + mergeText + '을(를) 완료하였습니다.');
					
					// 팝업 닫기
					$('#detailCodePopup .close').click();
					
					// 목록 재조회
					selectCodeFunc();
					
				}
				
			// 실패
			} else {
				common.alert('dang', '코드 정보 ' + mergeType + ' 요청중 에러가 발생하였습니다.');
			}
			
		//---> 통신 에러
		}).fail(function (result) {
			common.alert('dang', '코드 정보 ' + mergeType + ' 요청중 서버 통신 에러가 발생하였습니다.');
		});
	}
	
}

/**
 * modal 팝업 body 생성 Function
 * 
 * @param type
 * @returns
 */
function addPopupBody (type) {
	
	var html 	= '';
	var title 	= '';
	
	$('.popup_btn').hide();
	
	if (type == 'detail') {
		title = '상세';
		$('#changeBtn').show();
		
	} else if (type == 'insert') {
		title = '등록';
		$('#insertBtn').show();
		
	} else if (type == 'update') {
		title = '수정';
		$('#updateBtn, #deleteBtn').show();
	}
	
//============== 유형 START =================//
	html += '<tr>';
	html += '	<th>유형</th>';
	html += '	<td colspan="2">';
	
	// 상세
	if (type == 'detail') {
		html += '	<span id="detailCodeType"></span>';
	// 등록 or 수정
	} else if (type == 'insert' || type == 'update') {
		html += '	<select id="' + type + 'CodeType" class="form-control form-control-cust">';
		html += '		<option value="T" ' + ($('#searchCodeType').val() == 'T' ? 'selected' : '') + '>타일</option>';
		html += '		<option value="P" ' + ($('#searchCodeType').val() == 'P' ? 'selected' : '') + '>제품</option>';
		html += '	</select>';
	}
	
	html += '	</td>';
	html += '</tr>';
//============== 유형 END =================//
	
	
//============== 이름 START =================//
	html += '<tr>';
	html += '	<th>이름</th>';
	html += '	<td colspan="2">';
	
	// 상세
	if (type == 'detail') {
		html += '	<span id="detailCodeName"></span>';
	// 등록 or 수정
	} else if (type == 'insert' || type == 'update') {
		html += '	<input type="text" id="' + type + 'CodeName" class="form-control form-control-cust"/>';
	}
	
	html += '	</td>';
	html += '</tr>';
//============== 유형 END =================//
	
	
//============== 이미지 START =================//
	html += '<tr>';
	html += '	<th>이미지</th>';
	html += '	<td colspan="2">';
	
	// 상세
	if (type == 'detail') {
		html += '	<span id="detailImage"></span>';
	// 등록 or 수정
	} else if (type == 'insert' || type == 'update') {
		html += '	<input type="file" id="' + type + 'ImageFile" class="image_file" fileType="' + type + '" isChange="N"/>';
		html += '	<div id="' + type + 'Image"></div>';
	}
	
	html += '	</td>';
	html += '</tr>';
//============== 이미지 END =================//
	
	// title
	$('#detailCodePopup').find('#myModalLabel').text('코드 ' + title);
	// 초기화 & 생성
	$('#detailCodeTable').find('tbody').empty().append(html);
	
	// 이미지 변경 event
	$('.image_file').change(function (e) {
		var thisType = $(this).attr('fileType');
		
		var formTag 	= $('#detailCodePopup');
		var files		= e.target.files;
		var fileLength	= files.length;
		
		var thisImage 		= $('#' + thisType + 'Image');
		var thisImageFile 	= $('#' + thisType + 'ImageFile');
		
		for (var i = 0; i < fileLength; i++) {
			var fileObj = common.file.save(files[i], 'code', thisImage, '100');
			
			thisImage.find('img').after('<a class="delete_image image-close" href="javascript:void(0);"><i class="fa fa-close"></i></a>');
			formTag.find('.' + type + '_file').remove();
			formTag.append('<input type="hidden" class="' + thisType + '_file" value="path=' + fileObj.filePath + '&fileName=' + fileObj.fileName + '"/>');
		}
		
		thisImageFile.hide();
		
		// 미리보기 이미지 삭제
		$('.delete_image').unbind('click').click(function (e) {
			e.preventDefault();
			
			// 이미지 영역 비우기
			thisImage.empty();
			// input file init
			thisImageFile.show();
			thisImageFile.val('');
			thisImageFile.replaceWith( thisImageFile.clone(true) );
		});
	});
}