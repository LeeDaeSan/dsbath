var postCode = {
	
	start : function (type) {
		
		// 우편번호 검색 button event
		$('#' + type + 'ZipCodeBtn').unbind('click').click(function (e) {
			e.preventDefault();
			// 팝업 호출
			postCode.popup(type);
		});
	},
	
	popup : function (type) {
		
		new daum.Postcode({
			oncomplete : function (data) {
				
				// 우편번호
				$('#' + type + 'ZipCode').val(data.zonecode);
				// 지번 주소
				$('#' + type + 'Address').val(data.jibunAddress);
			}
		
		}).open();
	}
}