/**
 * Paging JS
 */

// 페이징
var paging = {

	init : function (page, limit, pageLimit, totalCount, callback, pagingTag) {
		
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
		
		// empty
		if (totalCount == 0) {
			html += '<li thisPage="1" class="this_page_link page-item active">';
			html += '	<a href="javascript:void(0);" class="page-link">1</a>';
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
		var pagination = pagingTag ? pagingTag : $('#pagination'); 
		pagination.empty().append(html);
		
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

	//검색 관련 기능
	search : {
		
		// 검색 관련 데이터 변수
		obj : {
			page		: 1,
			sortType 	: '',
			sort		: '',
			callback	: null,
		},
		
		// 이벤트 시작
		start : function (callback) {
			
			var page 		= paging.search.obj.page;
			var sort		= paging.search.obj.sort;
			var sortType 	= paging.search.obj.sortType;
			var callback	= callback;
			
		//------------------------- 검색 : 기간검색 daterangepicker 적용 START -------------------------
			/*
			$('#popupDate, #periodDate, #updatePopupDate').daterangepicker({
				autoUpdateInput	: false,
				'applyClass'	: 'btn-sm btn-dark',
				'cancelClass'	: 'btn-sm btn-light',
				locale			: {
					format : 'YYYY-MM-DD'
				}
			});
			$('#popupDate, #periodDate').on('apply.daterangepicker', function (e, picker) {
				$(this).val(
					picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'));
			});
			*/
		//------------------------- 검색 : 기간검색 daterangepicker 적용 END -------------------------
			
			
		//------------------------- 검색 : 검색버튼 click event START -------------------------
			$('#searchBtn').unbind('click').click(function (e) {
				e.preventDefault();
				
				callback();
			});
			callback();
		//------------------------- 검색 : 검색버튼 click event END -------------------------
		
			
		//------------------------- 검색 : enter keyup event START -------------------------
			$('.keyup_enter').keyup(function (e) {
				if (e.keyCode == '13') {
					$('#searchBtn').click();
				}
			});
		//------------------------- 검색 : enter keyup event END -------------------------
			
			
		//------------------------- 검색 : row 변경 event START -------------------------
			$('#rowLimit').change(function () {
				callback(page);
			});
		//------------------------- 검색 : row 변경 event END -------------------------	
		
			
		//------------------------- 검색 : sort 정렬 click event START -------------------------
			$('.sort_th').unbind('click').click(function (e) {
				e.preventDefault();
				
				paging.search.obj.sortType = $(this).attr('sortType');
				
				var thisSort = $(this).attr('sort');
				
				// 나머지 초기화
				$('.sort_th').each(function () {
					var thisSortType = $(this).attr('sortType');
					if (sortType != thisSortType) {
						$(this).attr('sort', '');
						$(this).find('.sort_img')
								.addClass('fa-exchange')
								.removeClass('fa-sort-amount-desc')
								.removeClass('fa-sort-amount-asc');
					}
				});
				
				// sort가 없거나 asc인 경우 : desc 변경
				if (!thisSort || thisSort == 'asc') {
					$(this).attr('sort', 'desc');
					$(this).find('.sort_img')
							.addClass('fa-sort-amount-desc')
							.removeClass('fa-exchange')
							.removeClass('fa-sort-amount-asc');
					
				// sort가 desc인 경우 : asc 변경
				} else if (thisSort == 'desc') {
					$(this).attr('sort', 'asc');
					$(this).find('.sort_img')
							.addClass('fa-sort-amount-asc')
							.removeClass('fa-exchange')
							.removeClass('fa-sort-amount-desc');
				}
				
				paging.search.obj.sort = $(this).attr('sort');
				
				callback(page);
			});
		//------------------------- 검색 : sort 정렬 click event END -------------------------
		}
	},
	
};
