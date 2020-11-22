var deleteImgArr = [];

$(function () {
	
	// 검색 이벤트 시작
	common.search.start(selectInstanceFunc);
	
	// content summernote init
	$('#insertContent, #updateContent').summernote({
		height 		: 300,
		minHeight	: null,
		maxHeight	: null,
		focus		: true,
		lang		: 'ko-KR',
		placeholder	: '',
		callbacks	: {
			onImageUpload : function (files, el, e) {
				var fileLength 	= files.length;
				for (var i = 0; i < fileLength; i++) {
					common.file.save(files[i], 'instance', $('.note-editable'), '400');
				}
			},
			onMediaDelete : function (tag) {
				deleteImgArr.push({ tag : tag });
			}
		}
	});
	
	// 썸네일 파일첨부 미리보기
	$('.thumbnail_file').change(function (e) {
		var thisType 	= $(this).attr('fileType');
		
		var formTag 	= thisType == 'insert' ? $('#addInstancePopup') : $('#detailInstancePopup');
		var files 		= e.target.files;
		var fileLength 	= files.length;
		
		var thisThumbnail 		= $('#' + thisType + 'Thumbnail');
		var thisThumbnailFile 	= $('#' + thisType + 'ThumbnailFile');
		
		for (var i = 0; i < fileLength; i++) {
			var fileObj = common.file.save(files[i], 'instance', thisThumbnail, '50');
			
			thisThumbnail.find('img').after('<a class="delete_thumbnail thumbnail-close" href="javascript:void(0);"><i class="fa fa-close"></i></a>');
			formTag.append('<input type="hidden" class="' + thisType + '_file" value="path=' + fileObj.filePath + '&fileName=' + fileObj.fileName + '"/>');
		}
		
		thisThumbnailFile.hide();
		
		// 미리보기 썸네일 삭제
		$('.delete_thumbnail').unbind('click').click(function (e) {
			e.preventDefault();
			
			// 이미지 영역 비우기
			thisThumbnail.empty();
			// input file init
			thisThumbnailFile.show();
			thisThumbnailFile.val('');
			thisThumbnailFile.replaceWith( thisThumbnailFile.clone(true) );
		});
	});
	
	
	// 검색 초기화 button event
	$('#searchResetBtn').unbind('click').click(function (e) {
		e.preventDefault();
		
	});
	
	// 시공사례 등록 button event
	$('#insertInstanceBtn').unbind('click').click(function (e) {
		e.preventDefault();
		
		insertInstanceFunc();
	});
	
});

/**
 * 시공사례 목록 Function
 * 
 * @returns
 */
function selectInstanceFunc (p) {
	// 페이징 변수
	page 	= p ? p : 1;
	limit	= $('#rowLimit').val();
	
	//---> 통신 요청
	$.ajax({
		url			: '/instance/rest/select',
		method		: 'POST',
		dataType	: 'JSON',
		data		: {
			page		: (page - 1) * limit,
			limit		: limit,
			sort		: common.search.obj.sort,
			sortType	: common.search.obj.sortType,
			
			'admin.adminName' 	: $('#searchAdminName').val(),
		}
	
	//---> 통신 완료
	}).done(function (result) {
		
		if (result.status) {
			
			// list set
			var html 		= '';
			var list		= result.list;
			var listLength 	= list.length;
			var totalCount 	= result.totalCount;
			
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
				
				var thumbnail 	= thisObj.thumbnail;
				var url			= '/file/rest/download?' + thumbnail;
				
				html += '<tr class="instance_detail detail-tr" idx="' + thisObj.constructInstanceIdx + '">';
				html += '	<td class="text-right">' + (sRow + i) + '</td>';
				html += '	<td>' + (thumbnail ? '<img style="width:35px;height:35px;" src="' + url + '"/>&nbsp;' : '') + thisObj.title + '</td>';
				html += '	<td class="text-center">' + thisObj.admin.adminName + '</td>';
				html += '	<td class="text-center">' + common.date.toString(new Date(thisObj.createDate), '-') + '</td>';
				html += '	<td class="text-center">' + common.date.toString(new Date(thisObj.updateDate), '-') + '</td>';
				html += '	<td class="text-right">' + thisObj.hit + '</td>';
				html += '</tr>';
			}
			
			// 목록 없을 때
			if (listLength == 0) {
				html  = '<tr>';
				html += '	<td class="text-center" colspan="6">내용이 없습니다.</td>';
				html += '</tr>';
			}
			
			// 목록 초기화 후 append
			$('#instanceTable').find('tbody').empty().append(html);
			
			// paging
			common.paging(page, limit, 10, totalCount, selectInstanceFunc);
			
			// 상세 팝업
			$('.instance_detail').unbind('click').click(function (e) {
				e.preventDefault();
				
				detailInstanceFunc($(this).attr('idx'));
				
				// 팝업 show
				$('#detailInstancePopup').modal();
				$('#detailInstancePopup').show();
			});
			
		// 서버 에러
		} else {
			common.alert('dang', '시공사례 정보 목록 조회 요청중 서버 에러가 발생하였습니다.');
		}
		
	//---> 통신 에러
	}).fail(function () {
		common.alert('dang', '시공사례 정보 목록 조회 요청중 서버 통신 장애가 발생하였습니다.');
	});
}

/**
 * 시공사례 상세 정보 Function
 * 
 * @param instanceIdx
 * @returns
 */
function detailInstanceFunc (instanceIdx) {
	
	$('#detailInstancePopup .update_tbody, #savePopupBtn').hide();
	$('#detailInstancePopup .detail_tbody, #updatePopupBtn, #deletePopupBtn').show();
	
	//---> 통신 요청
	$.ajax({
		url			: '/instance/rest/detail',
		method		: 'POST',
		dataType	: 'JSON',
		data		: {
			constructInstanceIdx : instanceIdx,
		}
	
	//---> 통신 완료
	}).done(function (result) {
		
		// 성공
		if (result.status) {
			var detail = result.detail;
			
			var thumbnail 	= detail.thumbnail;
			var url			= '/file/rest/download?' + thumbnail;
			var title 		= (thumbnail ? '<img style="width:35px;height:35px;" src="' + url + '"/>&nbsp;' : '') + detail.title;
			
			// 상세 정보
			$('#detailTitle').empty().append(title);
			$('#detailAdmin').text(detail.admin.adminName);
			$('#detailCreateDate').text(common.date.toString(new Date(detail.createDate), '-'));
			$('#detailContent').empty().append(detail.content);
			
			// 수정 상세 정보
			$('#updateTitle').val(detail.title);
			$('#updateContent').summernote('code', detail.content);
			if (thumbnail) {
				$('#updateThumbnail').empty().append('<img style="width:35px;height:35px;" src="' + url + '"/>&nbsp;');
				$('#updateThumbnail').find('img').after('<a class="delete_thumbnail thumbnail-close" href="javascript:void(0);"><i class="fa fa-close"></i></a>');;
				$('#updateThumbnailFile').hide();
				
				// 미리보기 썸네일 삭제
				$('.delete_thumbnail').unbind('click').click(function (e) {
					e.preventDefault();
					
					// 이미지 영역 비우기
					$('#updateThumbnail').empty();
					// input file init
					$('#updateThumbnailFile').val('');
					$('#updateThumbnailFile').replaceWith( $('#updateThumbnailFile').clone(true) );
					$('#updateThumbnailFile').show();
				});
				
			} else {
				
			}
			
			// 수정 화면 변경 button event
			$('#updatePopupBtn').unbind('click').click(function (e) {
				e.preventDefault();
			
				$('#detailInstancePopup .detail_tbody, #updatePopupBtn, #deletePopupBtn').hide();
				$('#detailInstancePopup .update_tbody, #savePopupBtn').show();
			});
			
			// 시공사례 수정 저장 button event
			$('#savePopupBtn').unbind('click').click(function (e) {
				e.preventDefault();
				
				updateInstanceFunc(detail.constructInstanceIdx);
			});
			
			// 시공사례 삭제 button event
			$('#deletePopupBtn').unbind('click').click(function (e) {
				e.preventDefault();
				
				deleteInstanceFunc(detail.constructInstanceIdx);
			});
			
		// 실패
		} else {
			common.alert('dang', '시공사례 상세 조회중 서버 에러가 발생하였습니다.');
		}
		
	//---> 통신 에러
	}).fail(function () {
		common.alert('dang', '시공사례 상세 조회 요청중 서버 통신 장애가 발생하였습니다.');
	});
}

/**
 * 시공사례 등록 Function
 * 
 * @returns
 */
function insertInstanceFunc () {
	
	// confirm
	if (confirm('시공사례를 등록하시겠습니까?')) {
		
		//---> 통신 요청
		$.ajax({
			url 			: '/instance/rest/merge',
			method			: 'POST',
			dataType		: 'JSON',
			data			: {
				type			: 'I',
				title			: $('#insertTitle').val(),
				content			: $('#insertContent').summernote('code'),
				thumbnail		: $('.insert_file').val(),
			},
			
		//---> 통신 완료
		}).done(function (result) {
			
			// 요청 성공
			if (result.status) {
				var resultCount = result.resultCount;
				
				// 성공
				if (resultCount == 1) {
					
					// 초기화
					$('#insertTitle').val('');
					$('#insertContent').summernote('reset');
					
					// alert
					common.alert('succ', '시공사례 정보 수정을 완료하였습니다.');
					// 팝업 닫기
					$('#addInstancePopup .close').click();
					// 목록 조회
					selectInstanceFunc();
					
				// 실패
				} else {
					common.alert('dang', '시공사례 정보 등록을 실패하였습니다.');
				}
				
			// 요청 에러
			} else {
				common.alert('dang', '시공사례 정보 등록 요청중 서버 에러가 발생하였습니다.');
			}
			
		//---> 통신 에러
		}).fail(function () {
			common.alert('dang', '시공사례 정보 등록 요청중 서버 통신 장애가 발생하였습니다.');
		});
	}
}

/**
 * 시공사례 수정 Function
 * 
 * @param instanceIdx
 * @returns
 */
function updateInstanceFunc (instanceIdx) {
	
	var title 		= $('#updateTitle').val();
	var content 	= $('#updateContent').summernote('code');
	var thumbnail 	= $('.update_file').val();
	
	if (confirm('수정사항을 저장하시겠습니까?')) {

		// 삭제할 이미지 삭제
		$.each(deleteImgArr, function () {
			common.file.del(this.tag);
		});
		
		var param = {
			type 					: 'U',
			constructInstanceIdx 	: instanceIdx,
			title					: title,
			content					: content,
			thumbnail				: thumbnail,
		};
		
		//---> 통신 요청
		$.ajax({
			url			: '/instance/rest/merge',
			method		: 'POST',
			dataType	: 'JSON',
			data		: param,
			
		//---> 통신 완료
		}).done(function (result) {

			// 저장 성공
			if (result.status) {
				
				// 초기화
				$('#updateTitle').val('');
				$('#updateContent').summernote('reset');
				
				// alert
				common.alert('succ', '시공사례 정보 수정을 완료하였습니다.');
				// 팝업 닫기
				$('#detailInstancePopup .close').click();
				// 목록 조회
				selectInstanceFunc();
				
			// 저장 실패
			} else {
				common.alert('dang', '시공사례 정보 수정 요청중 서버 에러가 발생하였습니다.');
			}
			
		//---> 통신 에러
		}).fail(function () {
			common.alert('dang', '시공사례 정보 수정 요청중 서버 통신 장애가 발생하였습니다.');
		});
	}
}

/**
 * 시공사례 삭제 Function
 * 
 * @param instanceIdx
 * @returns
 */
function deleteInstanceFunc (instanceIdx) {

	// confirm
	if (confirm('해당 시공사례를 삭제하시겠습니까?')) {
		
		//---> 통신 요청
		$.ajax({
			url			: '/instance/rest/merge',
			method		: 'POST',
			dataType	: 'JSON',
			data		: {
				type					: 'D',
				constructInstanceIdx 	: instanceIdx,
			}
		
		//---> 통신 완료
		}).done(function (result) {
		
			// 삭제 성공
			if (result.status) {
				// alert
				common.alert('succ', '시공사례 정보 삭제를 완료하였습니다.');
				// 팝업 닫기
				$('#detailInstancePopup .close').click();
				// 목록 조회
				selectInstanceFunc();
				
			// 삭제 실패
			} else {
				common.alert('dang', '시공사례 정보 삭제 요청중 서버 에러가 발생하였습니다.');
			}
			
		//---> 통신 에러
		}).fail(function () {
			common.alert('dang', '시공사례 정보 삭제 요청중 서버 통신 장애가 발생하였습니다.');
		});
	}
}