/**
 * 욕실디자인 상세 JS
 * 
 * @returns
 */
$(function () {
	
	detailBathDesignFunc();
	
	// 목록 이동 button event
	$('#listBtn').unbind('click').click(function (e) {
		e.preventDefault();
		
		location.href = '/views/bathDesign/list';
	});
});

function detailBathDesignFunc () {
	
	var bathDesignIdx = common.getParameter().idx;
	
	// idx가 없는 경우 페이지 뒤로가기
	if (!bathDesignIdx) {
		common.alert('warn', '잘못된 접근 방식입니다. 다시 시도해 주시기 바랍니다.', );
		
		setTimeout(function () {
			history.back();
		}, 3000);
		
		return false;
	}
	
	// parameter
	var param = {
			bathDesignIdx : bathDesignIdx
	};
	
	// ajax request
	common.ajax({
		title		: '욕실 디자인 상세 조회',
		url			: '/bathDesign/rest/detail',
		method		: 'POST',
		async		: true,
		data		: param,
		callback	: function (result) {
			
			var detail = result.detail;
			
			$('#detailAdminName').text(detail.admin.adminName);
			$('#detailHit').text(detail.hit);
			$('#detailCreateDate').text(common.date.formatDate(detail.createDate, '-'));
			$('#detailTitle').text(detail.title);
			$('#detailContent').empty().append(detail.content);
			
			// 타일 디자인 html
			var tileHtml = '';
			// 제품 디자인 html
			var prodHtml = '';
			
			$.each(detail.bathCodeList, function () {
				var thisIdx			= this.bathCodeIdx;
				var thisImage		= this.image;
				var thisUrl			= '/file/rest/download?' + thisImage;
				var thisCodeName 	= this.codeName;
				var thisCodeType	= this.codeType;
				
				if (thisImage) {
					if (thisCodeType == 'T') {
						tileHtml += '<span class="tile_code_image float-left text-center" idx="' + thisIdx + '">';
						tileHtml += 	(thisImage ? '<img class="image-lg" src="' + thisUrl + '"/>&nbsp;' : '') + '<br>' + thisCodeName;
						tileHtml += '</span>';
					} else if (thisCodeType == 'P') {
						prodHtml += '<span class="prod_code_image float-left text-center" idx="' + thisIdx + '">';
						prodHtml += 	(thisImage ? '<img class="image-lg" src="' + thisUrl + '"/>&nbsp;' : '') + '<br>' + thisCodeName;
						prodHtml += '</span>';
					}
				}
			});
			$('#detailTileCode').empty().append(tileHtml);
			$('#detailProdCode').empty().append(prodHtml);
		}
	});
}