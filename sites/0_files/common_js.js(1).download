 function runOnair(){
	//var popWidth = 640;		//910
	var popWidth = 910;		//910
	if(navigator.userAgent.indexOf("MSIE") != -1 || navigator.userAgent.indexOf("Trident") != -1 || navigator.userAgent.indexOf("Edge") != -1){
		//popWidth = 636;
		popWidth = 910;
	}
	var onairWin = window.open('http://vod.sbs.co.kr/onair/onair_index.jsp?Channel=CNBC','SBS_OnAir','directories=no,location=no,menubar=no,status=no,toolbar=no,scrollbars=no,resizable=no,width='+popWidth+',height=490');
	//탄핵특별생방송
	//var onairWin = window.open('http://vod.sbs.co.kr/onair/onair_cnbc.jsp?Channel=CNBC','SBS_OnAir','directories=no,location=no,menubar=no,status=no,toolbar=no,scrollbars=no,resizable=no,width='+popWidth+',height=490');
	onairWin.focus();
}

function getCookie(pmName) {
	var prefix = pmName + "=";

	var cookieStartIndex = document.cookie.indexOf(prefix);
	if (cookieStartIndex == -1) return "";

	var cookieEndIndex = document.cookie.indexOf(";", cookieStartIndex + prefix.length);
	if (cookieEndIndex == -1) cookieEndIndex = document.cookie.length;

	return unescape(document.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex));
}

	/**
	 *	fn_make_paging
	 *	@param	total_cnt : 총 갯수
	 *	@param	page_size : 한 페이당 표시되는 컨텐츠 갯수
	 *	@param	page_size : 한 페이당 표시되는 컨텐츠 갯수
	 *  @param	curr_page : 현재 페이지 번호	
	 *
	 *	json 파싱 후, 페이징 만들기 
	 */

	function fn_make_paging(total_cnt, page_size,curr_page){
					
			 fn_make_paging_detail(total_cnt, page_size,curr_page ,10 , 'paging');
	}
	/**
	 *	fn_make_paging_detail
	 *	@param	total_cnt : 총 갯수
	 *	@param	page_size : 한 페이당 표시되는 컨텐츠 갯수
	 *	@param	page_size : 한 페이당 표시되는 컨텐츠 갯수
	 *  @param	curr_page : 현재 페이지 번호	
	 *  @param	iMaxPage  : 최대 노출 페이지 갯수 ex) 1-10 20-30...까지 노출시는 10 
	 *  @param	page_div_id : 페이지 div 아이디명
	 *
	 *	json 파싱 후, 페이징 만들기 
	 */
	function fn_make_paging_detail(total_cnt, page_size,curr_page ,iMaxPage , page_div_id){
			var sRtnValue  = "";		
			if(total_cnt > 0) {
				var iTotalPage =  Math.ceil ( (total_cnt / page_size) ) ;				//총 페이지 수  계산
				var iCacluPage =  curr_page%iMaxPage==0 ? (curr_page / iMaxPage)-1 : curr_page / iMaxPage;
				var iStartPage =  Math.floor ( iCacluPage )*iMaxPage +1;	//시작 페이지 번호 계산
			//	if( iStartPage >= iTotalPage){
			//		iStartPage = 1 ;
			//	}


				var pmLinkUrl  = "onclick=\"goPage("; //goPage라는 함수 호출

				sRtnValue  = "<div class=\"mdp_inner\">";
				sRtnValue += "\n\t<span>";
				sRtnValue += "\n\t\t<a href=\"#\""+pmLinkUrl+"1);\" class='fnc first'>처음</a>"; 
				//sRtnValue += "\n\t\t<a href=\"#\""+pmLinkUrl+(  iStartPage > 1 ? iStartPage-iMaxPage : 1 )+");\"class=\"fncpn prev\"><i class=\"icn\"><span class=\"ir\">&lt;</span></i></a>";  //160831 주석
				//sRtnValue += "\n\t\t<a href=\"#\""+pmLinkUrl+(  curr_page > 1 ? curr_page-1 : 1 )+");\"class=\"fncpn prev\"><i class=\"icn\"><span class=\"ir\">&lt;</span></i></a>"; //한칸씩 이동하기 주석
				sRtnValue += "\n\t\t<a href=\"#\""+pmLinkUrl+(  iStartPage > 10 ? iStartPage-1 : 1 )+");\"class=\"fncpn prev\"><i class=\"icn\"><span class=\"ir\">&lt;</span></i></a>";
				
				for(var i=iStartPage; i < iStartPage+iMaxPage; i++) {
					sRtnValue +=(i==curr_page ? "<strong>" : "")+ "\n\t\t<a href=\"#\""+pmLinkUrl+i+");\"><span>"+i+"</span></a>"+(i==curr_page ? "</strong>" : "");
					if(i == iTotalPage) break;
				}

				sRtnValue +="\n\t\t<a href=\"#\""+pmLinkUrl+(iTotalPage > iStartPage+iMaxPage ? iStartPage+iMaxPage : iTotalPage)+");\"class=\"fncpn next\"><i class=\"icn\"><span class=\"ir\">&gt;</span></i></a>";
				//sRtnValue +="\n\t\t<a href=\"#\""+pmLinkUrl+(iTotalPage > curr_page ? curr_page+1 : iTotalPage)+");\"class=\"fncpn next\"><i class=\"icn\"><span class=\"ir\">&gt;</span></i></a>"; //한칸씩 이동하기 주석
				sRtnValue += "\n\t\t<a href=\"#\""+pmLinkUrl+iTotalPage+");\"class=\"fnc last\">끝</a>";
				sRtnValue += "\n\t</span>";
				sRtnValue += "\n</div>";
			}else{
				//alert("데이터가 존재하지 않습니다.");
			}
			
			$("#"+page_div_id).html(sRtnValue);
	}
	
	/**
	 *	removeTag
	 *	@param	text : html 문자열
	 *
	 *	html문자열을 제거한다.
	 */

		function removeTag( text ) {
			text = text.replace(/<br>/ig, "\n"); // <br>을 엔터로 변경
			 text = text.replace(/&nbsp;/ig, " "); // 공백      
			 text = text.replace(/&hellip;/ig, "hellip;"); // hellip;
			 text = text.replace(/hellip;/ig, "..."); // hellip;
			 // HTML 태그제거
			 text = text.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
			 
			 text = text.replace(/<(no)?script[^>]*>.*?<\/(no)?script>/ig, "");
			 text = text.replace(/<style[^>]*>.*<\/style>/ig, "");
			 text = text.replace(/<(\"[^\"]*\"|\'[^\']*\'|[^\'\">])*>/ig, "");
			 text = text.replace(/<\\w+\\s+[^<]*\\s*>/ig, "");
			 text = text.replace(/&[^;]+;/ig, "");
			 text = text.replace(/\\s\\s+/ig, "");
			 
			 return text;


		}