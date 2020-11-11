var common = {
	
	date : {
		toString : function (date, pattern) {
			
			var y = date.getFullYear();
			var m = (date.getMonth() + 1);
				m = m < 10 ? '0' + m : m;
			var d = date.getDate();
				d = d < 10 ? '0' + d : d;
				
			return [y, m, d].join(pattern);
		} 
	},

	string : {
		toEmpty : function (obj) {
			return obj ? obj : '';
		}
	},
	
	number : {
		// n : 수, w : 길이 -> 길이 만큼 수를 채우고 나머지는 0으로 채운다.
		pad : function (n, w) {
			n = n + '';
			return n.length >= w ? n : new Array(w - n.length + 1).join('0') + n;
		},
		
		// 문자열에서 숫자 외의 문자 제외
		onlyNumber : function (n) {
			var isRg = false;
			// (-) 음수인 경우
			if (n.indexOf('-') != -1) {
				isRg = true;
			}
			
			n = Number(n.replace(/[^0-9]/g, ''));
			return isRg ? -n : n;
		},
		
		// 금액 콤마 추가
		addComma : function (n) {
			n = n + '';
			return n == null || n == 'null' || n == 0 ? 0 : n.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
		},
		
		// 금액 백분율 구하기
		percentage : function (num, totalNum, fix) {
			return (num / totalNum * 100).toFixed(fix) + '%';
		},
		
		// 금액 수치 오르는 효과
		mountCount : function (num, thisTag, duration, order) {
			var start 	= 0;
			var end 	= num;
			
			// 내림차순
			if (order == 'DESC') {
				start 	= num;
				end 	= 0;
				
			// 오름차순
			} else if (order == 'ASC') {
				start 	= 0;
				end 	= num;
			}
			
			$({ val : start }).animate({ val : end }, {
				duration 	: duration,
				step 		: function () {
					thisTag.text(common.number.addComma(Math.floor(this.val)));
				},
				complete 	: function () {
					thisTag.text(common.number.addComma(Math.floor(this.val)));
				}
			});
		}
	},
	
	// 페이징
	paging : function (page, limit, pageLimit, totalCount, callback) {
		
		var firstPage 	= 1;														// 맨 처음 페이지 번호
		var lastPage 	= Math.ceil(totalCount / limit); 							// 맨 마지막 페이지 번호
		var startPage 	= Math.ceil(page / pageLimit) * pageLimit - pageLimit + 1;	// 페이징의 첫 번호
		var endPage 	= Math.ceil(page / pageLimit) * pageLimit;					// 페이징의 마지막 번호
		
			endPage		= lastPage < endPage ? lastPage : endPage;
		

		var html = '';
		
		// First button
			html += '<li class="page-item ' + (firstPage >= startPage ? 'disabled' : 'first_button') + '">';
			html += '	<a href="javascript:void(0);" class="page-link">&laquo;</a>';
			html += '</li>';
			
		// Prev button
			html += '<li class="page-item ' + (firstPage >= page ? 'disabled' : 'prev_button') + '">';
			html += '	<a href="javascript:void(0);" class="page-link">&lsaquo;</a>';
			html += '</li>';
			
		// Number button
		for (var i = startPage; i <= endPage; i++) {
			html += '<li thisPage="' + i + '" class="this_page_link page-item ' + (i == page ? 'active' : '') + '">';
			html += '	<a href="javascript:void(0);" class="page-link">' + i + '</a>';
			html += '</li>';
		}
		
		// Next button
			html += '<li class="page-item ' + (lastPage <= page ? 'disabled' : 'next_button') + '">';
			html += '	<a href="javascript:void(0);" class="page-link">&rsaquo;</a>';
			html += '</li>';
			
		// Last button
			html += '<li class="page-item ' + (lastPage <= endPage ? 'disabled' : 'last_button') + '">';
			html += '	<a href="javascript:void(0);" class="page-link">&raquo;</a>';
			html += '</li>';

		// 페이징 append
		$('#pagination').empty().append(html);
		
		// first page click event
		$('.first_button').unbind('click').click(function (e) {
			e.preventDefault();
			
			callback(firstPage);
		});
		
		// prev page click event
		$('.prev_button').unbind('click').click(function (e) {
			e.preventDefault();
			
			callback((page == 1 ? 1 : (page - 1)));
		});
		
		// number page click event
		$('.this_page_link').unbind('click').click(function (e) {
			e.preventDefault();
			// 목록 함수 재호출
			callback($(this).attr('thisPage'));
		});
		
		// next page click event
		$('.next_button').unbind('click').click(function (e) {
			e.preventDefault();
			
			callback(Number(page) + 1);
		});
		
		// last page click event
		$('.last_button').unbind('click').click(function (e) {
			e.preventDefault();
			
			callback(lastPage);
		});
	},

	// alert
	alert : function (type, msg) {
		var title 		= '';
		var className 	= '';
		var icon		= '';
		
		// 성공
		if (type == 'succ') {
			title		= 'Success';
			className	= 'success';
			icon		= 'fa-check-circle';
			
		// 경고
		} else if (type == 'warn') {
			title		= 'Warning';
			className	= 'warning';
			icon		= 'fa-exclamation-circle';
			
		// 위험
		} else if (type == 'dang') {
			title		= 'Danger';
			className	= 'danger';
			icon		= 'fa-exclamation-triangle';
			
		// 일반
		} else if (type == 'info') {
			title		= 'Info';
			className	= 'info';
			icon		= 'fa-info-circle';
		}
		
		var alertHtml  = '<div class="modal fade bs-example-modal-sm" id="alertModal" tabindex="-1" role="dialog" style="display:none;" aria-hidden="true">';
			alertHtml += '	<div class="modal-dialog modal-sm">';
			alertHtml += '		<div class="modal-content ' + className + '">';
			alertHtml += '			<div class="modal-body">';
			alertHtml += '				<h4 class="' + className + '-title">';
			alertHtml += '					<i class="alert-icon fa ' + icon + '"></i>';
			alertHtml +=					title; 
			alertHtml += '				</h4>';
			alertHtml += 				(msg ? msg : '');
			alertHtml += '			</div>';
			alertHtml += '			<div class="alert-footer">';
			alertHtml += '				<button type="button" class="btn btn-sm btn-dark btn-close">확인</button>';
			alertHtml += '			</div>';
			alertHtml += '		</div>';
			alertHtml += '	</div>';
			alertHtml += '</div>';
		
		// append
		$('body').append(alertHtml);
		// alert popup show
		$('#alertModal').addClass('show').show();
		
		// alert close event
		$('#alertModal .btn-close').unbind('click').click(function (e) {
			e.preventDefault();
			$('#alertModal').remove();
		});
		
		// esc, enter keyup event
		$(document).keyup(function (e) {
			e.preventDefault();
			e.stopPropagation();
			
			if (e.keyCode == 13 || e.keyCode == 27) {
				$('#alertModal .btn-close').click();
			}
		});
	},
	
	cookie : {
		// 쿠키 저장
		setCookie : function (name, value, day) {
	        var date = new Date();
	        date.setTime(date.getTime() + day * 60 * 60 * 24 * 1000);
	        document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
	    },
	    // 쿠키 조회
	    getCookie : function(name) {
	        var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	        return value? value[2] : null;
	    },
	    // 쿠키 삭제
	    deleteCookie : function(name) {
	        var date = new Date();
	        document.cookie = name + "= " + "; expires=" + date.toUTCString() + "; path=/";
	    }

	},
	
	/**
	 * 파일 저장, 삭제
	 */
	file : {
		// 저장
		save : function (file, el) {
			var fileObj = {};
			
			var formData = new FormData();
				formData.append('file', file);
			
			$.ajax({
				url 			: '/file/rest/upload',
				type			: 'POST',
				cache			: false,
				contentType		: false,
				enctype			: 'multipart/form-data',
				processData		: false,
				async			: false,
				data			: formData,
				
			// 완료
			}).done(function (result) {
			
				if (result.status) {
					var fileName = result.fileName;
					var filePath = result.filePath;
					
					$('.note-editable').append('<p><img style="width:' + $('.note-editable').width() + 'px" src="/file/rest/download?path=' + filePath + '&fileName=' + fileName + '" id="' + fileName + '"/></p>');
					
					fileObj['fileName'] = fileName;
					fileObj['filePath'] = filePath;
					
				} else {
					common.alert('dang', '파일 저장중 서버 에러가 발생하였습니다.');
				}
				
			}).fail(function (result) {
				common.alert('dang', '파일 저장중 서버 통신 에러가 발생하였습니다.');
			});
			
			return fileObj;
		},
		
		// 파일 삭제
		del : function (fileName) {
			
			//---> 통신 요청
			$.ajax({
				url			: '/file/rest/delete',
				method		: 'POST',
				dataType	: 'JSON',
				data		: {
					fileName	: fileName,
				},
				
			//---> 통신 완료
			}).done(function (result) {
				
				if (result.status) {
					
				} else {
					
				}
				
			//---> 통신 에러
			}).fail(function () {
				
			});
		},
		
		thumbnail : function (e, tag) {

			var files 	= e.target.files;
			var filesArr = Array.prototype.slice.call(files);
			
			filesArr.forEach(function (f) {
				
				if (!f.type.match('image.*')) {
					common.alert('warn', '이미지 확장자만 첨부 가능합니다.');
					return false;
				}
				
				var reader = new FileReader();
				reader.onload = function (e) {
					tag.attr('src', e.target.result);
				}
				
				reader.readAsDataURL(f);
			});
		}
	}
};