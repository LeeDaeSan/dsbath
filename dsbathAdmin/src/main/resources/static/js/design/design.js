var deleteImgArr = [];

$(function () {
	
	// 검색 이벤트 시작
	common.search.start(selectBathDesignFunc);
	
	// content summernote init
	$('#insertContent').summernote({
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
					common.file.save(files[i], 'design', $('.note-editable'), '400');
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
		
		var formTag 	= thisType == 'insert' ? $('#insertBathDesignPopup') : $('#detailBathDesignPopup');
		var files 		= e.target.files;
		var fileLength 	= files.length;
		
		var thisThumbnail 		= $('#' + thisType + 'Thumbnail');
		var thisThumbnailFile 	= $('#' + thisType + 'ThumbnailFile');
		
		for (var i = 0; i < fileLength; i++) {
			var fileObj = common.file.save(files[i], 'design', thisThumbnail, '50');
			
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
	
	// 등록, 수정, 삭제 button event
	$('.merge_btn').unbind('click').click(function (e) {
		e.preventDefault();
		
		mergeBathDesignFunc($(this).attr('mergeType'), $(this).attr('idx'));
	});
	
	// 타일 코드 추가하기 button event
	$('.add_tile_code_btn').unbind('click').click(function (e) {
		e.preventDefault();
		
		selectCodeFunc();
	});
});

/**
 * 욕실 디자인 목록 Function
 * 
 * @returns
 */
function selectBathDesignFunc (p) {
	
	// 페이징 변수
	page	= p ? p : 1;
	limit	= $('#rowLimit').val();
	
	//---> 통신 요청
	$.ajax({
		url 		: '/bathDesign/rest/select',
		method		: 'POST',
		dataType	: 'JSON',
		data		: {
			page		: (page - 1) * limit,
			limit		: limit,
			sort		: common.search.obj.sort,
			sortType	: common.search.obj.sortType,
		}
	
	//---> 통신 완료
	}).done(function (result) {
		
		// 성공
		if (result.status) {
			
			// list set
			var html 		= '';
			var list		= result.list;
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
				
				var thumbnail 	= thisObj.thumbnail;
				var url			= '/file/rest/download?' + thumbnail;
				
				html += '<tr class="code_detail detail-tr" idx="' + thisObj.bathDesignIdx + '">';
				html += '	<td class="text-right">' + (sRow + i) + '</td>';
				html += '	<td>' + (thumbnail ? '<img class="image-xs" src="' + url + '"/>&nbsp;' : '') + thisObj.title + '</td>';
				html += '	<td class="text-center">' + thisObj.admin.adminName + '</td>';
				html += '	<td class="text-center">' + common.date.toString(new Date(thisObj.createDate), '-') + '</td>'; 
				html += '	<td class="text-center">' + common.date.toString(new Date(thisObj.updateDate), '-') + '</td>'; 
				html += '	<td class="text-right">' + (thisObj.hit ? thisObj.hit : 0) + '</td>';
				html += '</tr>';
			}
			
			// 데이터가 없는 경우
			if (listLength == 0) {
				html += '<tr>';
				html += '	<td colspan="6" class="text-center">데이터가 없습니다.</td>';
				html += '</tr>';
			}
			
			// 초기화 후 목록 추가
			$('#bathDesignTable').find('tbody').empty().append(html);
			
			// paging
			common.paging(page, limit, 10, totalCount, selectBathDesignFunc);
			
			// 상세 조회
			$('.code_detail').unbind('click').click(function (e) {
				e.preventDefault();
				
				detailBathDesignFunc($(this).attr('idx'));
			});
			
		// 실패
		} else {
			common.alert('dang', '욕실디자인 목록 정보 조회 요청중 에러가 발생하였습니다.');
		}
		
	//---> 통신 에러
	}).fail(function () {
		common.alert('dang', '욕실디자인 목록 정보 조회 요청중 서버 통신 에러가 발생하였습니다.');
	});
}

/**
 * 욕실디자인 상세 Function
 * 
 * @param idx
 * @returns
 */
function detailBathDesignFunc (idx) {
	
	//---> 통신 요청
	$.ajax({
		url			: '/bathDesign/rest/detail',
		method		: 'POST',
		dataType	: 'JSON',
		data		: {
			bathDesignIdx : idx,
		}
	
	//---> 통신 완료
	}).done(function (result) {
	
		// 성공
		if (result.status) {
			
			var detail = result.detail;
			
			var thumbnail 	= detail.thumbnail;
			var url			= '/file/rest/download?' + thumbnail;
			
		//================== 상세 정보 START ==================//
			$('#detailTitle').empty().append((thumbnail ? '<img class="image-xs" src="' + url + '"/>&nbsp;' : '') + detail.title);
			$('#detailContent').empty().append(detail.content);
			$('#detailAdminName').text(detail.admin.adminName);
			$('#detailCreateDate').text(common.date.toString(new Date(detail.createDate), '-'));
		//================== 상세 정보 END ==================//
			
		//================== 수정 정보 START ==================//
			$('#updateTitle').val(detail.title);
		//================== 수정 정보 END ==================//
			
			var tileCodeHtml = '';
			$.each(detail.tileCodeList, function () {
				var thisIdx			= this.tileCodeIdx;
				var thisImage 		= this.image;
				var thisUrl			= '/file/rest/download?' + thisImage;
				var thisTileName 	= this.tileName;
				
				tileCodeHtml += '<span class="tile_code_image float-left" idx="' + thisIdx + '">';
				tileCodeHtml += 	(thisImage ? '<img class="image-sm" src="' + thisUrl + '"/>&nbsp;' : '') + '<br>' + thisTileName;
				tileCodeHtml += '</span>';
			});
			$('#detailTileCode').empty().append(tileCodeHtml);
			
			// 팝업 show
			$('#detailBathDesignPopup').modal('show');
			
			// 수정 화면 변경 event
			$('#updatePopupBtn').unbind('click').click(function (e) {
				e.preventDefault();
				
				$('#updateContent').summernote({
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
								common.file.save(files[i], 'design', $('.note-editable'), '400');
							}
						},
						onMediaDelete : function (tag) {
							deleteImgArr.push({ tag : tag });
						}
					}
				});
				
				$('.detail_tags').hide();
				$('.update_tags').show();
			});
			
		// 실패
		} else {
			common.alert('dang', '디자인 상세 정보 조회를 실패하였습니다.');
		}
	
	//---> 통신 에러
	}).fail(function () {
		common.alert('dang', '디자인 상세 정보 조회 요청중 에러가 발생하였습니다.');
	});
}

/**
 * 욕실디자인 등록, 수정, 삭제 Function
 * 
 * @returns
 */
function mergeBathDesignFunc (type, idx) {
	
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
	if (confirm('해당 디자인 정보를 ' + mergeText + '하시겠습니까?')) {
		
		// parameter
		var param = {
				type : type
		};
		
		if (type == 'U' || type == 'D') {
			param['bathDesignIdx'] = idx;
		}
		
		if (type == 'I' || type == 'U') {
			param['title']		= title.val();
			param['content']	= content.summernote('code');
			param['thumbnail']	= thumbnail.val();
			
			$('#' + tagType + 'TileCode').find('.tile_code_image').each(function (i) {
				param['tileCodeMappingList[' + i + '].tileCodeIdx'] = $(this).attr('idx');
			});
		}
		
		//---> 통신 요청
		$.ajax({
			url			: '/bathDesign/rest/merge',
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
					common.alert('succ', '디자인 정보 ' + mergeText + '을(를) 완료하였습니다.');
					
					// 정보 초기화
					title.val('');
					content.summernote('reset');
					
					// 팝업 닫기
					$('#insertBathDesignPopup .close').click();
					$('#detailBathDesignPopup .close').click();
					
					// 목록 재조회
					selectBathDesignFunc();
				}
				
			// 실패
			} else {
				common.alert('dang', '디자인 정보 ' + mergeText + '을(를) 실패하였습니다.');
			}
			
		//---> 요청 에러
		}).fail(function () {
			common.alert('dang', '디자인 정보 ' + mergeText + ' 요청중 에러가 발생하였습니다.');
		});
	}
}

/**
 * 코드 목록 조회 (팝업용)
 * 
 * @returns
 */
function selectCodeFunc () {
	
	//---> 통신 요청
	$.ajax({
		url 		: '/tileCode/rest/selectOfBathDesign',
		method		: 'POST',
		dataType	: 'JSON',
		data		: {}
	
	//---> 통신 완료
	}).done(function (result) {
		
		// 성공
		if (result.status) {
			
			var html 		= '';
			var list		= result.list;
			var listLength	= list.length;
			
			html += '<tr>';
			for (var i = 0; i < listLength; i++) {
				var thisObj = list[i];
				
				if (i % 3 == 0) {
					html += '</tr><tr>';
				}
				
				var image 	= thisObj.image;
				var url		= '/file/rest/download?' + image;
				
				html += '	<td class="code_detail detail-tr text-center" idx="' + thisObj.tileCodeIdx + '" image="' + image + '" tileName="' + thisObj.tileName + '">' + (image ? '<img class="image-lg" src="' + url + '"/>&nbsp;' : '') + '<br>' + thisObj.tileName + '</td>';
			}
			html += '</tr>';
			
			//데이터가 없는 경우
			if (listLength == 0) {
				html += '<tr>';
				html += '	<td colspan="3" class="text-center">데이터가 없습니다.</td>';
				html += '</tr>';
			}
			
			// 초기화 후 목록 추가
			$('#codeTable').find('tbody').empty().append(html);
			
			// 타일 선택
			$('.code_detail').unbind('click').click(function (e) {
				e.preventDefault();
				
				$(this).find('.img-check').remove();
				
				if ($(this).hasClass('code_detail_selected')) {
					$(this).removeClass('code_detail_selected');
					
				} else {
					$(this).addClass('code_detail_selected');
					$(this).append('<div class="img-check"><i class="fa fa-check"></i></div>');
				}
			});
			
			// 선택 button event
			$('#choiceCodeBtn').unbind('click').click(function (e) {
				e.preventDefault();
				
				$('#codeTable').find('.code_detail_selected').each(function () {
					var thisIdx 		= $(this).attr('idx');
					var thisImage 		= $(this).attr('image');
					var thisUrl			= '/file/rest/download?' + thisImage;
					var thisTileName 	= $(this).attr('tileName');
					
					var html  = '<span class="text-center tile_code_image float-left" idx="' + thisIdx + '">';
						html += 	(thisImage ? '<img class="image-sm" src="' + thisUrl + '"/>&nbsp;' : '') + '<br>' + thisTileName;
						html += '</span>';
						
					$('#insertTileCode').append(html);
					
					$('#addCodePopup').find('.close').click();
					
					// mouseenter
					$('.tile_code_image').mouseenter(function () {
						$(this).addClass('tile-code-delete');
						$(this).find('.delete_tile_code').remove();
						$(this).append('<a class="delete_tile_code tile-code-close" href="javascript:void(0);"><i class="fa fa-close"></i></a>');
					});
					
					// mouseleave
					$('.tile_code_image').mouseleave(function () {
						$(this).removeClass('tile-code-delete');
						//$(this).find('.delete_tile_code').remove();
					});
					
				});
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
