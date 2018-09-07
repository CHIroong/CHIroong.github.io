/*---------------------------------------------------------------------------------------------
                                      JAVASCRIPT CODE
  ---------------------------------------------------------------------------------------------
    function name                       | description               | use process
  ---------------------------------------------------------------------------------------------
    setCookie(쿠키명, 값, 유효기간(일)) |                           | 쿠키생성
    getCookie(쿠키명)                   |                           | 쿠키가져오기
  ---------------------------------------------------------------------------------------------*/

// 쿠키 생성
function setCookie(cName, cValue, cDay, cDomain){
    var expire = new Date();
    expire.setDate(expire.getDate() + cDay);
    cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
    if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
    document.cookie = cookies;
    if (cDomain) {
        document.cookie += "domain=" + cDomain + ";";
    }
}

// 쿠키 가져오기
function getCookie(cName) {
    cName = cName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cName);
    var cValue = '';
    if(start != -1){
        start += cName.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1)end = cookieData.length;
        cValue = cookieData.substring(start, end);
    }
    return unescape(cValue);
}

// 쿠키 지움
function delCookie(cName) {
    var today = new Date();

    today.setTime(today.getTime() - 1);
    var value = getCookie(cName);
    if(value != "")
        document.cookie = cName + "=" + value + "; path=/; expires=" + today.toGMTString();
}


/*---------------------------------------------------------------------------------------------
                                      JAVASCRIPT CODE
  ---------------------------------------------------------------------------------------------
    function name                       | description               | use process
  ---------------------------------------------------------------------------------------------
    checkMsgLength()                    | 입력된 문자열 길이 검사           | 기사 댓글
    calculateMsgLength()                | 문자열 길이 반환              | 기사 댓글
    assertMsgLength()                   | 문자열 길이만큼 잘라 변환     | 기사 댓글
  ---------------------------------------------------------------------------------------------*/

// 문자열길이 검사
function checkMsgLength(frm, id, lenStr) {
    var length = calculateMsgLength(document.getElementById(frm).value);
    document.getElementById(id).innerHTML = length;
    if (length > lenStr) {
        alert("최대 "+lenStr+" 바이트까지 남기실 수 있습니다.\r\n초과된 " + (length - lenStr) + "바이트는 자동으로 삭제됩니다.");
        document.getElementById(frm).value = assertMsgLength(document.getElementById(frm).value, lenStr, id);
    }
}

//문자열길이 반환
function calculateMsgLength(message) {
    var nbytes = 0;

    for (i=0; i<message.length; i++) {
        var ch = message.charAt(i);

        if (escape(ch).length > 4) {
            nbytes += 2;
        } else if (ch != "\r") {
            nbytes++;
        }
    }

    return nbytes;
}

//문자열 길이만큼 잘라 변환
function assertMsgLength(message, maximum, id) {
    var inc = 0;
    var nbytes = 0;
    var msg = "";
    var msglen = message.length;

    for (i=0; i<msglen; i++) {
        var ch = message.charAt(i);

        if (escape(ch).length > 4) {
            inc = 2;
        } else if (ch != "\r") {
            inc = 1;
        }

        if ((nbytes + inc) > maximum) {
            break;
        }

        nbytes += inc;
        msg += ch;
    }

    document.getElementById(id).innerHTML = nbytes;
    return msg;
}

/*---------------------------------------------------------------------------------------------
                                      JAVASCRIPT CODE
  ---------------------------------------------------------------------------------------------
    function name                       | description               | use process
  ---------------------------------------------------------------------------------------------
    articleHeader()                     | 기사뷰 헤더 네비          | 기사뷰 헤더 네비
  ---------------------------------------------------------------------------------------------*/

var articleHeader = {

    // 헤더 네비게이션 생성
    setScroll:function(){
        jQuery(window).scroll(function() {
            if (jQuery(this).scrollTop() > 300) {
                jQuery('#article-header-title').slideDown(300);
            } else {
                jQuery('#article-header-title').slideUp(300);
            }
        });
    },


    // 기사이동
    move:function(mod, order_type, order_value, section_code, sub_section_code, serial_code){
        jQuery.post( "ajaxGetForwardIdxno.php", { mod: mod, order_type:order_type, order_value: order_value, section_code: section_code, sub_section_code: sub_section_code, serial_code: serial_code }, function( f_idxno ) {

            if(f_idxno){
                location.href = '/news/articleView.html?idxno='+f_idxno
            }else{
                alert('기사가 존재하지 않습니다');
            }

        });
    }

}


/*---------------------------------------------------------------------------------------------
                                      JAVASCRIPT CODE
  ---------------------------------------------------------------------------------------------
    function name                       | description               | use process
  ---------------------------------------------------------------------------------------------
    articlePrint(idxno)                 | 인쇄창 오픈               | 인쇄창 오픈
    articleMail(idxno)                  | 메일보내기창 오픈         | 메일보내기창 오픈
    articleErr(idxno)                   | 오류신고창 오픈               | 오류신고창 오픈
    articleSingo(idxno)                 | 댓글신고창 오픈               | 댓글신고창 오픈
  ---------------------------------------------------------------------------------------------*/

// 인쇄창 오픈
function articlePrint( idxno ) {
    window.open('/news/articlePrint.html?idxno='+idxno, 'articlePrint', 'width=660,height=500,scrollbars=yes');
}

// 메일보내기창 오픈
function articleMail( idxno ) {
    window.open('/news/articleMail.html?idxno='+idxno, 'articleMail', 'width=660,height=500,scrollbars=yes');
}

// 오류신고창 오픈
function articleErr( idxno ) {
    window.open('/news/articleErr.html?idxno='+idxno, 'articleErr', 'width=660,height=500,scrollbars=yes');
}

// 댓글신고창 오픈
function articleSingo( idxno ) {
    window.open('/news/articleSingo.html?idxno='+idxno, 'articleSingo', 'width=660,height=500,scrollbars=yes');
}

/**
 * 중부일보 추가
 */

// SNS 공유하기
var snsShare = {
    snsShareStats:function(sns) {
        if (!sns) return false;
        var isStatsChk = false;
        $.ajaxSetup({async:false});
        $.post( "/news/snsShareStats.php", {article_idxno:articleIdxno, sns:sns},
            function(data,rst){
                if (rst == "success"){
                    if(data.result == "success"){
                        isStatsChk=true;
                    } else {
                        alert(decodeURIComponent(data.msg));
                    }
                }else alert(decodeURIComponent(data.msg)||lang.axResultError);
            },"json");
        return isStatsChk;
    }

    ,evtSnsShareBtn:function() {
        $('.sns-btns-plugin').on('click', function(e) {
            snsShare.share($(this));
        });
    }

    ,share:function(target) {
        var sns     = target.data('sharesns');
        var title   = target.data('title');
        var desc    = target.data('desc');
        var url     = target.data('url');
        var img     = target.data('image');
        var isSnsStats = false;

        // 카카오톡일 경우 PC 지원 제한
        if(sns == "talk") {
            if(!site_ismobile) {
                alert("PC 웹에서 지원하지 않습니다.");
                return false;
            }
        }

        // SNS 공유 통계 집게
        if (sns != "http") {
            isSnsStats = snsShare.snsShareStats(sns);
            if (isSnsStats!==true) return false;
        }

        if(sns == "talk") {
            sendKakaoTalk(url, title, desc, img);
        }else if(sns == "story") {
            shareStory(url, title, desc, img);
        }else if(sns == "http") {
            new Clipboard('#sns-url-copy-button', {
                text: function(trigger) {
                    return decodeURIComponent($(trigger).data('url'));
                }
            });
            alert("클립보드에 복사되었습니다. \nCtrl+v해서 원하는 곳에 붙여넣으세요.");
        }else if(sns == "band") {
            shareBand(url, title);
        }else{
            shareOtherSNS(sns, title, url, img);
        }
    }
}

// 모바일 페이지 슬라이딩 
var mobile = {
	vars: {
		// page
		page:1
	}

	// 모바일 메인화면 슬라이딩 
	,evtSlidePaging:function(target, search, func, endFunc)
	{
		if(!target) return false;
		if(!search) search="#user-container .index-wrap";
		if(!func) func=function(){};
		if(!endFunc) endFunc=function(){};

		var $target = $(target)
			,slideParams = $target.map(function(){ return this.href; }).get() // 메뉴 링크
			,slide = null
			,$slideData=null
			,_$slides = null
			,$window=$(window)
			,$body=$("body, html")
			,oldIdx=0;                  // 옮겨진건지 비교하려고 임시 저장 & 최초 slide idx

		oldIdx=(function(){
			// 실행 - hash 와 같이 사용시 주석해제
			var hash=location.hash
				,ssSlideIndex=Number(util.sessionStorage.getItem("slide"))||0;
			if(/*hash.indexOf("#SLIDE:")>=0 || */ssSlideIndex){
				//var hashIdx=hash.replace(/^#SLIDE:/,"")||"";
				//if(hashIdx==ssSlideIndex){
					return ssSlideIndex;
				//}
			}
			return 0;
		})();

		// 메뉴에 이벤트
		$target.click(function(){
			var $this=$(this)
				,index=$this.index(".m-m-a")||0;
			showSlide(index);
			return false;
		});

		// 현재 슬라이드 저장
		function setSlideIdx(idx){
			if(util.sessionStorage) util.sessionStorage.setItem("slide", idx);
			location.hash="SLIDE:"+idx;
		}

		// 클릭시 slide 보임 이벤트
		function showSlide(index){
			if(!_$slides) _$slides=$(slide.target.slide);
			load(null, _$slides, index, true);
			$target.each(function() { 
				$(this).closest('div').removeClass('slick-current');
			});
			$target.eq(index).closest('div').addClass("slick-current");
			slide.funcs.sortPageLoad(index).putPage(index+1, slideParams.length).changeNumbering(index);  
			setSlideIdx(index);
			$slideData=_$slides.eq(index);
		
			endFunc($target, _$slides, index);
			oldIdx=index;
		}

		// 높이 맞춤 : 기본 객체가 absolute 이기에 측정해 와야 함
		function getHeight($s){
			if(!$s) return 0;
			return $s.children("div").map(function(){ return $(this).height(); }).get().reduce(function(a,b){ return a+b; }, 0)||0;
		}
		// --- 높이 맞춤

		/*	call ajax
			- url : 가져올 링크
			- param : 보낼데이터값
			- $place : 덧붙일 jquery 객체
			- search : 받아온 데이터에서 검색할 selector
		*/
		function ajax(url,param,$place,search/*,$slides,idx*/){
			if(!url || !$place) return false;

			return $.get(url, param, 
						function(data,rst){
									if(rst!="success") return false;
									//var html = search?$(data).find(search):data; // 원본
									var html = data;
									$place.append(html);
									//alert($place.html());
									//func.apply(this, [$target, $slides, idx, slideParams, arguments]);
								}, "html");
		}

		/* 데이터 부르기 
			- _this : Slide object
			- $slides : slide 객체
			- idx : 몇번째 slide
			- self : true or false -> 현재 idx 도 갱신할것인가?
		*/
		function load(_this, $slides, idx, self){
			var t = $slides.length-1
				,index={prev:idx-1, self:idx, next:idx+1};
			
			_$slides=$slides;					// click에 쓰임
		
			if(index.prev<0) index.prev=t;
			if(index.next>t) index.next=0;
			
			var url = {prev:slideParams[index.prev]||"", self:slideParams[index.self]||"", next:slideParams[index.next]||""}
				,$slide = {prev:$slides.eq(index.prev), self:$slides.eq(index.self), next:$slides.eq(index.next)	};

			/* script 는 실행이 안되 주석
			if(!$slide.prev.html())					$slide.prev.load(url.prev+" "+search, function(){		func.apply(this, [$target, $slides, idx, url.prev, arguments]); });
			if(!$slide.self.html() && self)		$slide.self.load(url.self+" "+search, function(){		func.apply(this, [$target, $slides, idx, url.self,	  arguments]); });
			if(!$slide.next.html())					$slide.next.load(url.next+" "+search, function(){		func.apply(this, [$target, $slides, idx, url.next, arguments]); });
			
			if(!$slide.prev.html())					ajax(url.prev,{},$slide.prev,search,$slides,idx);
			if(!$slide.self.html() && self)		ajax(url.self,{},$slide.self,search,$slides,idx);
			if(!$slide.next.html())					ajax(url.next,{},$slide.next,search,$slides,idx);
			*/

			if(!$slide.prev.html())			ajax(url.prev,{mmode:1},$slide.prev,search).always(function(){	func.apply(this, [$target, $slides, idx, slideParams, arguments]);	}); // .then(success,fail), always(both)
			if(!$slide.self.html() && self)	ajax(url.self,{mmode:1},$slide.self,search).always(function(){	func.apply(this, [$target, $slides, idx, slideParams, arguments]);	}); 
			if(!$slide.next.html())			ajax(url.next,{mmode:1},$slide.next,search).always(function(){	func.apply(this, [$target, $slides, idx, slideParams, arguments]);	}); 
			
			return this;
		}
		// --- 데이터 부르기

		slide=new Slide({
				root:"#mb-index"
				,box:".mb-contt"
				,slide:".m-slide-hpage-list" // touch event
				,btn : {prev:".m-slide-hpage-btn-prev", next:".m-slide-hpage-btn-next", number:".m-slide-hpage-number"}
				,page : ".m-slide-hpage-page"
			},{
				func:{	
						start:function(_this, $slides, idx){ if(idx===0) load.call(this, _this, $slides, idx); }
						,move:function(_this, $slides, idx){  }
						,end:function(_this, $slides, idx){ 
							if(idx!==0) load.call(this, _this, $slides, idx); 

							$slideData=$slides.eq(idx);

							// 메뉴 변화
							//$target.removeClass("on").eq(idx).addClass("on");
							$(".m-m-a").each(function() { $(this).closest('div').removeClass('slick-current'); });
							$(".m-m-a").eq(idx).closest('div').addClass("slick-current");

							// 위로이동
							if(oldIdx!=idx){ setTimeout(function(){ $body.scrollTop(0); },1000); }

							oldIdx=idx;

							setSlideIdx(idx);
							endFunc.call(this, $target, $slides, idx);
						}
					}
			},false).exe();
				
		// resize event
		$window.on({
			setHeight:function(){
				if(!$slideData) $slideData=$(slide.target.slide).eq(oldIdx);
				$slideData.parent().height(getHeight($slideData));
			}
			,resize:function(){ $(this).trigger("setHeight"); }
			,scroll:function(){ $(this).trigger("setHeight"); }
		}).trigger("setHeight");

		//$(".m_header_logo").click(function(){ setSlideIdx(0); });			// 로고 클릭시 초기화

		if(oldIdx) showSlide(oldIdx);										// 로딩시 다른 slide 라면 보이게
	}

	// slide 연관하여 부속 작업
	,evtSlidePagingAfter:function(){
		// 로고 클릭시 초기화
		$(".m-header-logo").on("click", function(){ if(util.sessionStorage) util.sessionStorage.setItem("slide", 0); });

		// 좌측 네비 클릭시 
		$(".m-l-m-a").on("click", function() { 
			var slideIdx = $(this).attr("data-index")||0;
			if(util.sessionStorage) util.sessionStorage.setItem("slide", slideIdx);
		}); 

		// 메뉴와 다를 경우 무조건 첫번째 메뉴로 표시 
		if ($editcode&&$editcode!='MOBILE_2'&&$editcode!='MOBILE_17'&$editcode!='MOBILE_16'&$editcode!='MOBILE_18'&$editcode!='MOBILE_19'&$editcode!='MOBILE_20') {
			if(util.sessionStorage) util.sessionStorage.setItem("slide", 0);
		}

		// 메인이 아닐때 메뉴링크 메인으로 인도
		if(!___isSlide && ___slideTarget){
			$(___slideTarget).on("click", function(){
				//var index=$(this).index()||0; //-- 인덱스를 못찾아서 아래로 바꿈 
				var index=$(this).attr("data-index")||0;
				if(util.sessionStorage) util.sessionStorage.setItem("slide", index);
				var mnurl = $(this).attr("href");
				location.href=SITE_DOMAIN+"/#SLIDE:"+index;
				return false;
			});
		}
		
		// 상단 메뉴 표시 
		var defIdx = util.sessionStorage.getItem("slide");
		$(".m-m-a").each(function() { $(this).closest('div').removeClass('slick-current'); });
		$(".m-m-a").eq(defIdx).closest('div').addClass("slick-current");
	}

	// 더보기시(ajax) 다른 페이지라면. hash 참고함
	,getMoreArticleListOtherPage:function(p)
	{
		var hash=location.hash;
		if(hash.indexOf("#PAGE:")>=0 || p){
			var num=p||hash.replace(/^#PAGE:/,"")
				,page=(Number(num)||1)-(mobile.vars.page||1);
			if(page<=0) page=1;

			var $targets=$(".article-column");
			mobile.vars.page=page;
			//$(".list-btn-more").trigger("click"); //-- 클릭 이벤트가 안먹어서 아래로 바꿈 
			setTimeout(function(){ $(".list-btn-more").trigger("click")}, 100);
			$(window).load(function(){ 
				$("body,html").animate({ 
					scrollTop:(($targets.eq(/*(page*20)-1*/11).position().top||0)+$targets.eq(0).outerHeight()) 
				}); 
			});
		}
	}
}