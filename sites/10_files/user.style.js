$(document).ready(function(){
	var $wrapBody = $("#user-wrap") 
		, $fontsOption = $wrapBody.find(".fonts-option")
		, $fontsBtn = $fontsOption.find(".fonts-btn")
		, $fontsPanel = $fontsOption.find(".fonts-option-panel");
	
	
	// 폰트크기
	$fontsBtn.on({
		click: function(){
			if($fontsPanel.css("display") == "block") {
				$fontsPanel.hide();
				$fontsBtn.removeClass("active");
			} else {
				$fontsPanel.show();
				$fontsBtn.addClass("active");
			}
		}
	});

	/* 기사본문 폰트사이트 이벤트 */
	$('.article-view-header, #article-header-title').on('click', '.fontsize-radio', function(e){
		setCookie("article-view-page-fontsize", $(this).val(), 30);
		get_article_fontsize();
	});

	/* 폰트클래스 변경 */
	function change_article_fontsize(className) {
		$('.view-page').removeClass('font-size15 font-size16 font-size17 font-size18 font-size19 font-size20').addClass(className);
	}

	/* 쿠키가져오기 */
	function get_article_fontsize() {
		var className = getCookie("article-view-page-fontsize");
		if(className == "") className = "font-size17";

		$("#"+className+"_1").prop("checked", true);
		$("#"+className+"_2").prop("checked", true);

		change_article_fontsize(className);
	}

	/* 초기 실행 */ 
	get_article_fontsize();
});


// 세션갱신
var sReq;
function processAutoSessReload() 
{
	if (sReq.readyState == 4) {
		// only if "OK"
		if (sReq.status == 200) {
			// moveItem();
		} else {
  			alert("작업중 오류가 발생 했습니다.\n다시 시도해 주세요.");
			//alert("작업중 오류가 발생 했습니다.\n다시 시도해 주세요." + REQ.statusText);
		}
	}
}

function autoSessReload() 
{
	try {
		sReq = new XMLHttpRequest;
	} catch(e) {}

	if(!sReq) 
		try {
			sReq = new ActiveXObject("Msxml2.XMLHTTP");
		} catch(e) {}

	if(!sReq) 
       	try {
  			sReq = new ActiveXObject("Microsoft.XMLHTTP");
		} catch(e) {}

    if(!sReq) alert("호환되지 않는 브라우저 입니다.\n");

  	var handlerFunction = processAutoSessReload;
	sReq.onreadystatechange = handlerFunction;
		  		 
	sReq.open("POST", "/member/sessionReload.php", true);
  	sReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	sReq.send();	
}