$(function () {
	
	selectCodeFunc();
	
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
	});
	
});

function selectCodeFunc () {
	
	//---> 통신 요청
	$.ajax({
		url			: '/tileCode/rest/select',
		method		: 'POST',
		dataType	: 'JSON',
		data		: {
			
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
	}).fail(function () {
		
	});
}

function mergeCodeFunc () {
	
	//---> 통신 요청
	$.ajax({
		url			: '/tileCode/rest/merge',
		method		: 'POST',
		dataType	: 'JSON',
		data		: {
			image		: $('.insert_file').val(),
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
	}).fail(function () {
		
	});
}