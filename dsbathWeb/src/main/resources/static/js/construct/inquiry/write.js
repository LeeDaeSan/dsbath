/**
 * 견적 및 시공 문의 작성 JS
 * 
 * @returns
 */
$(function () {
	
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
					common.file.save(files[i], 'inquiry', $('.note-editable'), '400');
				}
			},
			onMediaDelete : function (tag) {
				deleteImgArr.push({ tag : tag });
			}
		}
	});
	
	// 등록 button event\
	$('#insertBtn').unbind('click').click(function (e) {
		e.preventDefault();
		
		mergeInquiryFunc();
	});
	
});

/**
 * 견적 및 시공 문의 등록 Function
 * 
 * @returns
 */
function mergeInquiryFunc () {
	
	// 제목 validation
	if (!$('#insertTitle').val()) {
		common.alert('warn', '제목을 입력해 주세요.');
		$('#insertTitle').focus();
		return false;
	}
	
	// 내용 validation
	if (!$('#insertContent').summernote('code')) {
		common.alert('warn', '내용을 입력해 주세요.');
		return false;
	}
	
	var param = {
		type 		: 'I',
		title		: $('#insertTitle').val(),
		content		: $('#insertContent').summernote('code'),
	};
	
	// ajax request
	common.ajax({
		title		: '견적 및 시공 문의 등록',
		url			: '/inquiry/rest/merge',
		method		: 'POST',
		async		: false,
		data		: param,
		callback	: function (result) {
			
			if (result.resultCount == 1) {
				
				common.alert('succ', '견적 및 시공 문의 등록을 완료하였습니다.');
				
				// 2초 후 목록으로 페이지 이동
				setTimeout(function () {
					location.href = '/views/construct/inquiry/list';
				}, 2000);
				
			} else {
				common.alert('warn', '견적 및 시공 문의 등록 요청에 실패하였습니다.');
			}
		}
	});
}
