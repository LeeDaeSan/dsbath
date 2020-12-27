var common = {
	
	date : {
		toString : function (date, pattern) {
			
			var y = date.getFullYear();
			var m = (date.getMonth() + 1);
				m = m < 10 ? '0' + m : m;
			var d = date.getDate();
				d = d < 10 ? '0' + d : d;
			
			return [y, m, d].join(pattern);
		},
		
		toStringMD : function (date, pattern) {
			var m = (date.getMonth() + 1);
				m = m < 10 ? '0' + m : m;
			var d = date.getDate();
				d = d < 10 ? '0' + d : d;
				
			return [m, d].join(pattern);
		},
		
		formatDate : function (dateStr, pattern) {
			
			var date 		= new Date(dateStr);
			var thisDate 	= common.date.toString(date, pattern);
			var toDay		= common.date.toString(new Date(), pattern);
			
			// 오늘 날짜는 시간 format
			if (thisDate == toDay) {
				var h = date.getHours();
					h = h < 10 ? '0' + h : h;
				var m = date.getMinutes();
					m = m < 10 ? '0' + m : m;
					
				return [h, m].join(':');
				
			// 다른 날짜는 년월일 format
			}  else {
				var y = date.getFullYear();
				var m = (date.getMonth() + 1);
					m = m < 10 ? '0' + m : m;
				var d = date.getDate();
					d = d < 10 ? '0' + d : d;
				
				return [y, m, d].join(pattern);
			}
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
		save : function (file, pathType, tag, width) {
			var fileObj = {};
			
			var formData = new FormData();
				formData.append('file'		, file);
				formData.append('pathType'	, pathType);
				
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
					
					tag.append('<p><img style="width:' + width + 'px;border-radius:10px;" src="/file/rest/download?path=' + filePath + '&fileName=' + fileName + '" id="' + fileName + '"/></p>');
					
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
		del : function (tag) {
			
			var src 	= $(tag).attr('src');
			var srcArr 	= src.split('?');
			if (src.indexOf('/file/rest/download?') != -1) {
				var param = srcArr[1];
				var path	= param.substring( (param.indexOf('path=') + 'path='.length), param.indexOf('&') );
				var name	= param.substring( (param.indexOf('fileName=') + 'fileName='.length) );
				
				//---> 통신 요청
				$.ajax({
					url			: '/file/rest/delete',
					method		: 'POST',
					dataType	: 'JSON',
					data		: {
						path		: path,
						name		: name,
					},
					
				//---> 통신 완료
				}).done(function (result) {
					
					if (result.status) {
						
					} else {
						
					}
					
					//---> 통신 에러
				}).fail(function () {
					
				});
			}
			
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
	},
	
	// ajax
	ajax : function (obj) {

		//---> 통신 요청
		$.ajax({
			url 		: obj.url,
			method		: obj.method,
			dataType	: 'JSON',
			data		: obj.data,
			async		: obj.async ? obj.async : true,
					
		//---> 통신 완료
		}).done(function (result) {
		
			// 성공
			if (result.status) {
				
				// callback 호출
				obj.callback(result);
				
			// 실패
			} else {
				common.alert('dang', obj.title + ' 요청중 에러가 발생하였습니다.');
			}
			
		//---> 통신 에러
		}).fail(function () {
			common.alert('dang', obj.title + ' 요청중 서버 통신 장애가 발생하였습니다.');
		});
	},
	
	getParameter : function () {
	    var params = {};
	    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
	    return params;
	}
};