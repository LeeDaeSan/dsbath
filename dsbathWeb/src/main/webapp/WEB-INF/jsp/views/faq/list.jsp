<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<style>
.faq-search-div {
	margin-top		: 50px;
    margin-bottom	: 50px;
}
#faqSearchTable {
	margin			: 0 auto;
	border			: 0 !important;
}
#faqSearchTable tr td {
	padding			: 5px;
}
#searchKeyword {
	border			: 1px solid #373f3c;
    padding			: 6px;
    border-radius	: 8px;
    font-size		: 16px;
}
#searchBtn {
	background		: #2c363d;
    color			: #fff;
    border			: #2c363d;
    font-size		: 16px;
    width			: 170px;
    border-radius	: 8px;
    padding-top		: 7px;
    padding-bottom	: 7px;
}
#faqUl {
	list-style		: none;
    padding-left	: 0;
    margin-left		: 60px;
    margin-right	: 60px;
    margin-bottom	: 35px;
}
#faqUl li {
    padding-top		: 13px;
    cursor			: pointer;
}
#faqUl li .faq-question {
	padding-left	: 5px;
    font-size		: 17px;
    font-weight		: bold;
}
#faqUl li .faq-question-head {
	padding-bottom	: 3px;
	border-bottom	: 1px solid #f2cc3e;
}
#faqUl li .faq-question-head:hover {
	opacity			: 0.7;
}
#faqUl li .faq-question-head img {
	padding-bottom	: 6px;
}
#faqUl li .faq-comment {
    padding-left	: 30px;
    padding-top		: 10px;
}
#faqUl li.none-data {
	border-top		: 1px solid #f2cc3e;
    border-bottom	: 1px solid #f2cc3e;
    padding-bottom	: 13px;
    text-align		: center;
}
</style>

<!-- 자주하는 질문 js -->
<script src="/js/faq/list.js" type="text/javascript"></script>

<!-- 검색 영역 START -->
<div class="faq-search-div">
	<table id="faqSearchTable">
		<tr>
			<td>
				<input type="text" id="searchKeyword" placeholder="검색어"/>
			</td>
			<td>
				<button type="button" id="searchBtn">검색하기</button>
			</td>
		</tr>
	</table>
</div>
<!-- 검색 영역 END -->


<!-- 목록 영역 START -->
<ul id="faqUl">
</ul>
<div class="text-center">
	<ul class="pagination" id="pagination"></ul>
</div>
<!-- 목록 영역 END -->
