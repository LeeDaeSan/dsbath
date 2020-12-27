var deleteImgArr = [];
	
var communityType 	= 'L';
var communityTitle 	= '키친&바스 살림 팁';

var url = location.href;

// 키친&바스 살림 팁
if (url.indexOf('living') != -1) {
	communityType 	= 'L';
	communityTitle 	= '디에스 키친&바스 살림 팁';
	
// 인테리어 팁
} else if (url.indexOf('interior') != -1) {
	communityType 	= 'I';
	communityTitle 	= '디에스 인테리어 팁';
	
// 이벤트
} else if (url.indexOf('event') != -1) {
	communityType 	= 'E';
	communityTitle 	= '디에스 이벤트';
}

$(function () {
	
	// 검색 이벤트 시작
	common.search.start(selectCommunityFunc);
	
	// 커뮤니티 등록 button event
	$('#insertPopupBtn').unbind('click').click(function (e) {
		e.preventDefault();
		
		// popup body append
		addPopupBody('insert');
		// modal show
		$('#detailCommunityPopup').modal('show');
	});
	
	// 등록, 수정, 삭제 button event
	$('.merge_btn').unbind('click').click(function (e) {
		e.preventDefault();
		
		mergeCommunityFunc($(this).attr('mergeType'), $(this).attr('idx'));
	});
});

/**
 * 커뮤니티 목록 Function
 * 
 * @param p
 * @returns
 */
function selectCommunityFunc (p) {
	
	// 페이징 변수
	page 	= p ? p : 1;
	limit	= $('#rowLimit').val();
	
	var startDate 	= '';
	var endDate 	= '';
	if ($('#periodDate').val()) {
		startDate 	= common.date.toString( $('#periodDate').data('daterangepicker').startDate._d, '' );
		endDate 	= common.date.toString( $('#periodDate').data('daterangepicker').endDate._d, '' ); 
	}
	
	//---> 통신 요청
	$.ajax({
		url 		: '/community/rest/select',
		method		: 'POST',
		dataType	: 'JSON',
		data		: {

			// 페이징
			page		: (page - 1) * limit,
			limit		: limit,
			sort		: common.search.obj.sort,
			sortType	: common.search.obj.sortType,

			communityType		: communityType,
			title				: $('#searchTitle').val(),
			'admin.adminName' 	: $('#searchAdminName').val(),
			startDateStr		: startDate,
			endDateStr			: endDate,
		}
	
	//---> 통신 완료
	}).done(function (result) {
	
		// 성공
		if (result.status) {
			
			// list set
			var html 		= '';
			var list 		= result.list;
			var listLength	= list.length;
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
				
				html += '<tr class="community_detail detail-tr" idx="' + thisObj.communityIdx + '">';
				html += '	<td class="text-right">' + (sRow + i) + '</td>';
				html += '	<td>' + thisObj.title + '</td>';
				html += '	<td class="text-center">' + thisObj.admin.adminName + '</td>';
				html += '	<td class="text-center">' + common.date.toString(new Date(thisObj.createDate), '-') + '</td>';
				html += '	<td class="text-center">' + common.date.toString(new Date(thisObj.updateDate), '-') + '</td>';
				html += '	<td class="text-right">' + thisObj.hit + '</td>';
				html += '</tr>';
			}
			
			// 데이터가 없을 때
			if (listLength == 0) {
				html  = '<tr>';
				html += '	<td class="text-center" colspan="6">내용이 없습니다.</td>';
				html += '</tr>';
			}
			
			// 목록 초기화 후 append
			$('#communityTable').find('tbody').empty().append(html);
			
			// paging
			common.paging(page, limit, 10, totalCount, selectCommunityFunc);			
			
			// 상세 button event
			$('.community_detail').unbind('click').click(function (e) {
				e.preventDefault();
				
				// popup body append
				addPopupBody('detail');
				// modal show
				$('#detailCommunityPopup').modal('show');
				// 상태 정보 조회
				detailCommunityFunc($(this).attr('idx'));
			});
			
		// 실패
		} else {
			common.alert('dang', communityTitle + ' 목록 조회중 서버 에러가 발생하였습니다.');
		}
		
	//---> 통신 에러
	}).fail(function () {
		common.alert('dang', communityTitle + ' 목록 조회 요청중 서버 통신 장애가 발생하였습니다.');
	});
}

/**
 * 커뮤니티 상세 Function
 * 
 * @param idx
 * @returns
 */
function detailCommunityFunc (idx) {
	
	//---> 통신 요청
	$.ajax({
		url 		: '/community/rest/detail',
		method		: 'POST',
		dataType	: 'JSON',
		data		: {
			communityIdx 	: idx,
			communityType 	: communityType,
		}
	
	//---> 통신 완료
	}).done(function (result) {
	
		// 성공
		if (result.status) {
			
			var detail = result.detail;
			
			var thumbnail 	= detail.thumbnail;
			var url			= '/file/rest/download?' + thumbnail;
			
			$('#detailTitle').empty().append((thumbnail ? '<img class="image-xs" src="' + url + '"/>&nbsp;' : '') + detail.title);
			$('#detailContent').empty().append(detail.content);
			$('#detailAdminName').text(detail.admin.adminName);
			$('#detailCreateDate').text(common.date.toString(new Date(detail.createDate), '-'));
			
			// 상세팝업 -> 수정팝업으로 변경 button event
			$('#changeBtn').unbind('click').click(function (e) {
				e.preventDefault();
				
				// popup body append
				addPopupBody('update');
				
				$('#updateBtn, #deleteBtn').attr('idx', detail.communityIdx);
				$('#updateTitle').val(detail.title);
				$('#updateContent').summernote('code', detail.content);
				
				// 썸네일 이미지
				if (thumbnail) {
					var formTag			= $('#detailCommunityPopup');
					var updateImage 	= $('#updateThumbnail');
					var updateImageFile = $('#updateThumbnailFile');
					
					updateImage.append('<p><img style="width:50px;" src="/file/rest/download?' + thumbnail + '"/></p>');
					updateImage.find('img').after('<a class="delete_thumbnail thumbnail-close" href="javascript:void(0);"><i class="fa fa-close"></i></a>');
					
					formTag.find('.update_file').remove();
					formTag.append('<input type="hidden" class="update_file" value="' + thumbnail + '"/>');
					
					updateImageFile.hide();
				}
				
				// 미리보기 이미지 삭제
				$('.delete_thumbnail').unbind('click').click(function (e) {
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
			common.alert('dang', communityTitle + ' 상세 정보 조회를 실패하였습니다.');
		}
		
	//---> 통신 에러
	}).fail(function () {
		common.alert('dang', communityTitle + ' 상세 정보 조회 요청중 에러가 발생하였습니다.');
	});
}

/**
 * 커뮤니티 등록, 수정, 삭제 Function
 * 
 * @param type
 * @param idx
 * @returns
 */
function mergeCommunityFunc (type, idx) {
	
	var mergeText 	= '등록';
	var tagType		= 'insert';
	
	// 등록
	if (type == 'I') {
		mergeText	= '등록';
		tagType		= 'insert';
		
	// 수정
	} else if (type == 'U') {
		mergeText	= '수정';
		tagType		= 'update';
		
	// 삭제
	} else if (type == 'D') {
		mergeText	= '삭제';
		tagType		= 'delete';
		
	} else {
		return false;
	}
	
	var title 		= $('#' + tagType + 'Title');
	var content		= $('#' + tagType + 'Content');
	var thumbnail 	= $('.' + tagType + '_file');
	
	// validation : 등록, 수정만 해당
	if (type == 'I' || type == 'U') {
		
		// 제목 validation
		if (!title.val()) {
			common.alert('warn', '제목을 입력해 주세요.');
			title.focus();
			return false;
		}
	}
	
	// confirm
	if (confirm('해당 ' + communityTitle + ' 정보를 ' + mergeText + '하시겠습니까?')) {
		
		// parameter
		var param = {
			type 			: type,
			communityType 	: communityType
		};
		
		if (type == 'U' || type == 'D') {
			param['communityIdx'] = idx;
		}
		
		if (type == 'I' || type == 'U') {
			param['title']		= title.val();
			param['content']	= content.summernote('code');
			param['thumbnail']	= thumbnail.val();
		}
		
		//---> 통신 요청
		$.ajax({
			url 		: '/community/rest/merge',
			method		: 'POST',
			dataType	: 'JSON',
			async		: false,
			data		: param,
			
		//---> 통신 완료
		}).done(function (result) {
			
			// 성공
			if (result.status) {
				
				if (result.resultCount == 1) {
					
					// alert
					common.alert('succ', communityTitle + ' 정보 ' + mergeText + '을(를) 완료하였습니다.');
					
					// 정보 초기화
					title.val('');
					content.summernote('reset');
					
					// 팝업 닫기
					$('#detailCommunityPopup .close').click();
					
					// 목록 재조회
					selectCommunityFunc();
					
				} else {
					common.alert('dang', communityTitle + ' 정보 ' + mergeText + '을(를) 실패하였습니다.');
				}
				
			// 실패
			} else {
				common.alert('dang', communityTitle + ' 정보 ' + mergeText + '을(를) 실패하였습니다.');
			}
			
		//---> 통신 에러
		}).fail(function () {
			common.alert('dang', communityTitle + ' 정보 ' + mergeText + ' 요청중 에러가 발생하였습니다.');
		});
	}
}

/**
 * 상세 모달 팝업 body 생성 Function
 * 
 * @param type
 * @returns
 */
function addPopupBody (type) {
	
	var html 	= '';
	var title	= '';
	
	$('.popup_btn').hide();
	
	if (type == 'detail') {
		title	= '상세';
		$('#changeBtn').show();
		
	} else if (type == 'insert') {
		title	= '등록';
		$('#insertBtn').show();
		
	} else if (type == 'update') {
		title 	= '수정';
		$('#updateBtn, #deleteBtn').show();
	}
	
//============== 제목 START =================//
	html += '<tr>';
	html += '	<th>제목</th>';
	html += '	<td>';
	
	// 상세
	if (type == 'detail') {
		html += '	<span id="detailTitle"></span>';
	// 등록 or 수정
	} else if (type == 'insert' || type == 'update') {
		html += '	<input type="text" id="' + type + 'Title" class="form-control form-control-cust"/>';
	}
	
	html += '	</td>';
	html += '</tr>';
//============== 제목 END =================//


//============== 썸네일 파일첨부 START =================//
	// 등록 or 수정
	if (type == 'insert' || type == 'update') {
		html += '<tr>';
		html += '	<th>썸네일</th>';
		html += '	<td>';
		html += '		<input type="file" id="' + type + 'ThumbnailFile" class="thumbnail_file" fileType="' + type + '"/>';
		html += '		<div id="' + type + 'Thumbnail"></div>';
		html += '	</td>';
		html += '</tr>';
	}
//============== 썸네일 파일첨부 END =================//
	
	
//============== 작성자 START =================//
	// 상세
	if (type == 'detail') {
		html += '<tr>';
		html += '	<th>작성자</th>';
		html += '	<td>';
		html += '		<span id="detailAdminName"></span>';
		html += '		<span id="detailCreateDate" class="float-right"></span>';
		html += '	</td>';
		html += '</tr>';
	}
//============== 작성자 END =================//
	
	
//============== 내용 START =================//
	html += '<tr>';
	html += '	<th>내용</th>';
	html += '	<td>';
	
	// 상세
	if (type == 'detail') {
		html += '	<span id="detailContent"></span>';
	// 등록 or 수정
	} else if (type == 'insert' || type == 'update') {
		html += '	<div id="' + type + 'Content"></div>';
	}
	
	html += '	</td>';
	html += '</tr>';
//============== 내용 END =================//
	
	
	// title
	$('#detailCommunityPopup').find('#myModalLabel').text(communityTitle + ' ' + title);
	// 초기화 &생성
	$('#detailCommunityTable').find('tbody').empty().append(html);
	
	// 썸네일 파일첨부 미리보기
	$('.thumbnail_file').change(function (e) {
		var thisType 	= $(this).attr('fileType');
		
		var formTag 	= $('#detailCommunityPopup')
		var files 		= e.target.files;
		var fileLength 	= files.length;
		
		var thisThumbnail 		= $('#' + thisType + 'Thumbnail');
		var thisThumbnailFile 	= $('#' + thisType + 'ThumbnailFile');
		
		formTag.find('.' + thisType + '_file').remove();
		
		for (var i = 0; i < fileLength; i++) {
			var fileObj = common.file.save(files[i], 'community', thisThumbnail, '50');
			
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
	
	// content summernote init
	if (type == 'insert' || type == 'update') {
		$('#' + type + 'Content').summernote({
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
						common.file.save(files[i], 'community', $('.note-editable'), '400');
					}
				},
				onMediaDelete : function (tag) {
					deleteImgArr.push({ tag : tag });
				}
			}
		});
	}
}