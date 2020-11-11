$(function () {
	
	// 썸네일 파일첨부 미리보기
	$('#insertThumbnailFile').change(function (e) {
		common.file.thumbnail(e, $('#insertThumbnail'));
		$('#insertThumbnailFile').hide();
	});
	
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
				
				var formTag 	= $('#addInstancePopup');
				var fileLength 	= files.length;
				
				for (var i = 0; i < fileLength; i++) {
					var fileObj = common.file.save(files[i]);
					
					formTag.append('<input type="hidden" class="insert_file" fileName="' + fileObj.fileName + '" filePath="' + fileObj.filePath + '"/>');
				}
			},
			onMediaDelete : function (target) {
				console.log(target);
			}
		}
	});
	
	// 시공사례 등록 button event
	$('#insertInstanceBtn').unbind('click').click(function (e) {
		e.preventDefault();
		
		insertInstanceFunc();
	});
});

/**
 * 시공사례 등록 Function
 * 
 * @returns
 */
function insertInstanceFunc () {
	
	//---> 통신 요청
	$.ajax({
		url 			: '/instance/rest/merge',
		method			: 'POST',
		dataType		: 'JSON',
		cache			: false,
		contentType		: false,
		enctype			: 'multipart/form-data',
		processData		: false,
		data			: {
			
		}
	
	//---> 통신 완료
	}).done(function (result) {
		
		
	//---> 통신 에러
	}).fail(function () {
		
	});
}
