var deleteImgArr = [];

$(function () {
	
	// 검색 이벤트 시작
	common.search.start(selectBathDesignFunc);
	
	// 코드 등록 button event
	$('#insertPopupBtn').unbind('click').click(function (e) {
		e.preventDefault();
		
		// popup body append
		addPopupBody('insert');
		// modal show
		$('#detailBathDesignPopup').modal('show');
	});
	
	// 등록, 수정, 삭제 button event
	$('.merge_btn').unbind('click').click(function (e) {
		e.preventDefault();
		
		mergeBathDesignFunc($(this).attr('mergeType'), $(this).attr('idx'));
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
				
				html += '<tr class="bath_design_detail detail-tr" idx="' + thisObj.bathDesignIdx + '">';
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
			$('.bath_design_detail').unbind('click').click(function (e) {
				e.preventDefault();
				
				// popup body append
				addPopupBody('detail');
				// modal show
				$('#detailBathDesignPopup').modal('show');
				// 상세 정보 조회
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
			
			var tileCodeHtml = '';
			$.each(detail.tileCodeList, function () {
				var thisIdx			= this.tileCodeIdx;
				var thisImage 		= this.image;
				var thisUrl			= '/file/rest/download?' + thisImage;
				var thisTileName 	= this.tileName;
				
				if (thisImage) {
					tileCodeHtml += '<span class="tile_code_image float-left" idx="' + thisIdx + '">';
					tileCodeHtml += 	(thisImage ? '<img class="image-lg" src="' + thisUrl + '"/>&nbsp;' : '') + '<br>' + thisTileName;
					tileCodeHtml += '</span>';
				}
			});
			$('#detailTileCode').empty().append(tileCodeHtml);
		//================== 상세 정보 END ==================//
			
			
			// 상세팝업 -> 수정팝업으로 변경 button event
			$('#changeBtn').unbind('click').click(function (e) {
				e.preventDefault();
				
				// popup body append
				addPopupBody('update');
				
				$('#updateBtn, #deleteBtn').attr('idx', detail.bathDesignIdx);
				$('#updateTitle').val(detail.title);
				
				$('#updateContent').summernote('code', detail.content);
				
				$('#updateTileCodeBtn').show();

				// 썸네일 이미지
				if (thumbnail) {
					var formTag 		= $('#detailBathDesignPopup');
					var updateImage		= $('#updateThumbnail');
					var updateImageFile = $('#updateThumbnailFile');
					
					updateImage.append('<p><img style="width:50px;" src="/file/rest/download?' + thumbnail + '"/></p>');
					updateImage.find('img').after('<a class="delete_thumbnail thumbnail-close" href="javascript:void(0);"><i class="fa fa-close"></i></a>');
					
					formTag.find('.update_file').remove();
					formTag.append('<input type="hidden" class="update_file" value="' + thumbnail + '"/>');
					
					updateImageFile.hide();
				}

				// 타일디자인
				var tileCodeHtml = '';
				$.each(detail.tileCodeList, function () {
					var thisIdx			= this.tileCodeIdx;
					var thisImage 		= this.image;
					var thisUrl			= '/file/rest/download?' + thisImage;
					var thisTileName 	= this.tileName;
					
					if (thisImage) {
						tileCodeHtml += '<span class="tile_code_image float-left" idx="' + thisIdx + '">';
						tileCodeHtml += 	(thisImage ? '<img class="image-lg" src="' + thisUrl + '"/>&nbsp;' : '') + '<br>' + thisTileName;
						tileCodeHtml += '</span>';
					}
				});
				$('#updateTileCode').empty().append(tileCodeHtml);
				
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
function selectCodeFunc (type) {
	
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
			
			$('#codeTable').find('tbody').empty();
			
			var html 		= '';
			var list		= result.list;
			var listLength	= list.length;
			
			for (var i = 0; i < listLength; i++) {
				var thisObj = list[i];
				
				if (i == 0) {
					html += '<tr>';
				}
				if (i % 3 == 0) {
					html += '</tr><tr>';
				}
				
				var isChoice = false;
				$('#' + type + 'TileCode .tile_code_image').each(function () {
					if ($(this).attr('idx') == thisObj.tileCodeIdx) {
						isChoice = true;
						return false;
					}
				});
				
				var image 	= thisObj.image;
				var url		= '/file/rest/download?' + image;
				
				html += '<td class="code_detail detail-tr text-center ' + (isChoice ? 'code_detail_selected' : '') + '" idx="' + thisObj.tileCodeIdx + '" image="' + image + '" tileName="' + thisObj.tileName + '">';
				html += 	(image ? '<img class="image-lg" src="' + url + '"/>&nbsp;' : '');
				html += '	<br>';
				html += 	thisObj.tileName;
				html += 	(isChoice ? '<div class="img-check"><i class="fa fa-check"></i></div>' : '');
				html += '</td>';
				
				if ((i + 1) == listLength) {
					html += '</tr>';
				}
			}
			
			//데이터가 없는 경우
			if (listLength == 0) {
				html += '<tr>';
				html += '	<td colspan="3" class="text-center">데이터가 없습니다.</td>';
				html += '</tr>';
			}
			
			// 초기화 후 목록 추가
			$('#codeTable').find('tbody').append(html);
			
			// row mouseenter event
			$('.code_detail').mouseenter(function () {
				if (!$(this).hasClass('code_detail_selected')) {
					$(this).find('img').css('opacity', '0.8');
				}
			});
			
			// row mouseleave event
			$('.code_detail').mouseleave(function () {
				if (!$(this).hasClass('code_detail_selected')) {
					$(this).find('img').css('opacity', '1');
				}
			});
			
			// row click event
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
				
				// 이전 타일 디자인 전체 삭제
				$('#' + type + 'TileCode').find('.tile_code_image').each(function () {
					$(this).remove();
				});
				// 신규 타일 디자인 추가
				$('#codeTable').find('.code_detail_selected').each(function () {
					
					var thisIdx 		= $(this).attr('idx');
					var thisImage 		= $(this).attr('image');
					var thisUrl			= '/file/rest/download?' + thisImage;
					var thisTileName 	= $(this).attr('tileName');
					
					var html  = '<span class="text-center tile_code_image float-left" idx="' + thisIdx + '">';
						html += 	(thisImage ? '<img class="image-lg" src="' + thisUrl + '"/>' : '');
						html += '	<br>';
						html += '	<div>' + thisTileName + '</div>';
						html += '</span>';
						
					$('#' + type + 'TileCode').append(html);
					
					$('#addCodePopup').find('.close').click();
					
					// mouseenter event
					$('.tile_code_image').mouseenter(function () {
						$(this).addClass('tile-code-delete');
						$(this).find('.delete_tile_code').remove();
						$(this).append('<a class="delete_tile_code tile-code-close" href="javascript:void(0);"><i class="fa fa-close"></i></a>');
						
						// 선택한 타일디자인 삭제
						$('.delete_tile_code').unbind('click').click(function (e) {
							e.preventDefault();
							
							$(this).closest('.tile_code_image').remove();
						});
					});
					
					// mouseleave event
					$('.tile_code_image').mouseleave(function () {
						$(this).removeClass('tile-code-delete');
						$(this).find('.delete_tile_code').remove();
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
	html += '	<td colspan="3">';
	
	// 상세
	if (type == 'detail') {
		html += '		<span id="detailTitle" class="detail_tags"></span>';	
	// 등록 or 수정
	} else if (type == 'insert' || type == 'update') {
		html += '		<input type="text" id="' + type + 'Title" class="form-control form-control-cust update_tags"/>';
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
	html += '	<td colspan="3">';
	
	// 상세
	if (type == 'detail') {
		html += '	<span id="detailContent" class="detail_tags"></span>';
	// 등록 or 수정
	} else if (type == 'insert' || type == 'update') {
		html += '	<div id="' + type + 'Content" class="update_tags"></div>';
	}
	
	html += '	</td>';
	html += '</tr>';
//============== 내용 END =================//
	
	
//============== 타일 디자인 START =================//
	html += '<tr>';
	html += '	<th>';
	html += '		타일 디자인';
	html += '		<br>';
	
	// 등록
	if (type == 'insert') {
		html += '	<button type="button" mergeType="I" class="btn btn-sm btn-secondary add_tile_code_btn" data-toggle="modal" data-target="#addCodePopup">추가하기</button>';
	// 수정
	} else if (type == 'update') {
		html += '	<button type="button" mergeType="U" style="display:none;" class="btn btn-sm btn-secondary add_tile_code_btn update_tags" id="updateTileCodeBtn" data-toggle="modal" data-target="#addCodePopup">추가하기</button>';
	}
	
	html += '	</th>';
	html += '	<td id="' + type + 'TileCode"></td>';
	html += '</tr>';
//============== 타일 디자인 END =================//
	
	// title
	$('#detailBathDesignPopup').find('#myModalLabel').text('욕실 디자인 ' + title);
	// 초기화 &생성
	$('#detailBathDesignTable').find('tbody').empty().append(html);
	
	// 썸네일 파일첨부 미리보기
	$('.thumbnail_file').change(function (e) {
		var thisType 	= $(this).attr('fileType');
		
		var formTag 	= thisType == 'insert' ? $('#insertBathDesignPopup') : $('#detailBathDesignPopup');
		var files 		= e.target.files;
		var fileLength 	= files.length;
		
		var thisThumbnail 		= $('#' + thisType + 'Thumbnail');
		var thisThumbnailFile 	= $('#' + thisType + 'ThumbnailFile');
		
		formTag.find('.' + thisType + '_file').remove();
		
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
						common.file.save(files[i], 'design', $('.note-editable'), '400');
					}
				},
				onMediaDelete : function (tag) {
					deleteImgArr.push({ tag : tag });
				}
			}
		});
	}
	
	// 타일 코드 추가하기 button event
	$('.add_tile_code_btn').unbind('click').click(function (e) {
		e.preventDefault();
		
		selectCodeFunc(type);
	});
}
