/**
수정 2014.08.19
PC 와 모바일 모두 사용할 수 있게 script.js에서 따로 분리
mUtil은 기존에 코딩된것이 있어 냅둠
*/
/*****************************************************************************
막 가져다 쓰는거
*****************************************************************************/
var util=mUtil={
	vars: {
		areaHeight : 0								// textarea 높이 자동 리사이즈에서 최초 값 저장해둠
		// 메뉴 mod parameters - 관리자 1차 메뉴명 활성화 표시
		,menus : {
		          	1:["news","newsForward"]
		          	,2:"edit"
		          	,3:"member"
		          	,4:"bbs"
		          	,5:["adcontent","adcontrol"]
		          	,6:["poll","pdf","cover","hosu","form","statistics","widget"]
		          	,7:["configuration","editCfg","templateSkin","memberCfg","bbsCfg"]
				 }
	}

	// php validate  와 js validate옵션 매칭
	,validateOpt:{required:"blank", digits:"number", r_digits:"number", alpha:"alphabet", r_alpha:"alphabet", alnum:"num-alp", r_alnum:"num-alp", date:"blank", r_date:"blank", email:"email", r_email:"email", regexp:"blank", r_regexp:"blank", inArray:"blank", r_inArray:"blank"}
	
	,localStorage:window.localStorage||false // localstorage
	,sessionStorage:window.sessionStorage||false // sessionStorage

	// log
	,logs:function(msg)
	{
		try{
			console.log(msg);
		}catch(e){
			$("body").append('<div style="padding:.1em;margin:.1em 1em;color:red">LOG ::: '+msg+'</div>');
		}
	}
	
	// 세션 유지
	,keepSession:function(interval)
	{
		if(!interval) interval = 10; //10분
		setInterval(function(){
							$.get("/",
										{mod:"main",act:"keepSession"},
										function(){},"text");
						},1000*60*interval);
	}
	
	/**
	아래 것중에 브라우저 판별
	chrome/26.0.1410.64, safari/534.57.2, opera/9.80, msie 8.0, trident~ rv:11.0(IE11) 	firefox/20.0
	*/
	,browser:function()
	{
		var s = navigator.userAgent.toLowerCase()
			,b = /(chrome|safari|opera|msie|firefox|trident.*rv|edge|opr)[ \/:]?([0-9]+)/.exec(s)||[]
			,o = "";
	
		if(!b[1]) return {}; // in app browser 는 없음
		if(b[1].indexOf("trident")>=0){ //IE11
			//b.shift();
			b[1] = "msie";
		}else if(b[1].indexOf("chrome")>=0){ //chrome 일때 주의
			if(s.indexOf("edge")>0) b[1] = "edge";
			else if(s.indexOf("opr")>0) b[1] = "opera";
		}
	
		// os
		if(s.indexOf("windows nt")>=0) o = "windows";
		else if(s.indexOf("macintosh")>=0) o = "mac";
		else if(s.match(/android .* mobile/)) o = "android";
		else if(s.match(/mac os .* mobile/)) o = "ios";
		else if(s.match(/windows phone os/)) o = "wm";
	
		return {name:b[1]||"", version:parseInt(b[2]||0), os:o};
	}
	
	// 뒤로
	,evtGoBack:function(target)
	{
		$(target||".btn_cancel").click(function(){
			history.back();
		});
	}
	
	// 삭제시 confirm 창 ... <a href="">~~~</a> 를 그냥 걸어준다. true면 href url로 갈것임
	,evtConfirmToUrl:function(target, msg)
	{
		$(target).click(function(){
			return window.confirm(msg);
		});
	}
	
	// 창닫기
	,closeWindowAfterAlert:function(msg)
	{
		if(msg) alert(msg);
		window.self.close();
	}
	
	// msg후 뒤로
	,gobackAfterAlert:function(msg, url)
	{
		if(msg) alert(msg);
		if(url)	location.href = url;
		else history.back();
	}
	
	// 버튼 등 타겟이 있는 단순 이동
	,evtClickedSimpleMove:function(target, url, msg)
	{
		var parents = this;
		$(document.body).on("click", target, function(){
			parents.gobackAfterAlert(msg,url);
		});
	}
	
	// 메뉴 선택되게
	,selectedMenu:function(mod)
	{
		if(!mod) return ;
		
		var menus = this.vars.menus
			,index = 0;
		
		for(var i in menus){
			var m = menus[i];
			if(typeof m === "object"){
				if($.inArray(mod, m)>=0){
					index = i;
					break;
				}
			}else{
				if(m===mod){
					index = i;
					break;
				}
			}
		}
	
		$("#nav").children("li:eq("+index+")").addClass("on");
	}
	
	// css px제거후 숫자형으로
	,castIntFromCss:function(v)
	{
		return Number(v.replace("px",""));
	}
	
	// json(object) => string형태로
	,convertJson2Str:function(json)
	{
		if(!json) return "";
		
		var arr = [], str="";
		for(var i in json)
		{
			arr.push('"'+i+'":"'+json[i]+'"');
		}
		
		if(arr.length>0) str = '{'+arr.join(",")+'}';
		return str;
	}
	
	,getCookie:function(name)
	{	/*
		var cookie = document.cookie;
		if(cookie.indexOf(name)<0) return "";
		
		var regexp = new RegExp("^(.*)"+name+"=(.*?);(.*)$","g");
		return cookie.replace(regexp,"$2").replace(/^\s+|\s+$/g,"");
		*/
		name+="=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
	    }
	    return "";
	}
	
	,setCookie:function(name, value, days, domain)
	{
		var expires = "";
		if(days){
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			expires = "; expires="+date.toGMTString();
		}
		if(!domain) domain="."+HOST;
		
		document.cookie = name+"="+value+expires+"; path=/; " + (domain?"domain="+domain+";":"");
	}
	
	// 파일절대경로중 디렉토리와 파일명만 추출 - path(string) : http://~~~~.com/201202/filename.gif 중 201202/filename.gif 로 추출
	,getDirNFilename:function(path)
	{
		if(!path) return path;
		
		return path.replace(/^http[s]?:\/\/(.*)\/(.*)\/(.*)$/i, "$2/$3");
	}	

	/**
	 *  원본파일명 <=> 썸네일 파일명 상호 변환
	 *  @param 
	 *  	mode : 원본파일->썸네일 = "o2t", 썸네일->원본파일 = "t2o" , default = o2t
	 *  	filename : 파일파일명
	 */		
	,convertPhotoFilename:function(filename, mode)
	{
		if(!mode) mode = "o2t";
		if(!filename) return filename;
		
		// 덧 단어
		var suffix = "_150";						// 실적용시 썸네일에 쓰이는 거 바꿔줄것
		
		//  원본파일 -> 썸네일
		if(mode == "o2t")
		{
			var regexp = new RegExp("^("+PH_DOMAIN+")/news/photo/(.*)\.(gif|jpg|jpeg|png|bmp)$", "i");
			return filename.replace(regexp, "$1/news/thumbnail/$2"+suffix+".$3");
		}
		// 썸네일 -> 원본파일
		else if(mode == "t2o")
		{	
			var regexp = new RegExp("^("+PH_DOMAIN+")/news/thumbnail/(.*)"+suffix+"\.(gif|jpg|jpeg|png|bmp)$", "i");
			return filename.replace(regexp, "$1/news/photo/$2.$3");
		}	
		return filename;
	}
	
	// 캡션 등 쓸데없는 html  entities  치환
	,replaceHtmlEntities:function(text)
	{
		if(!text) return text;
		
		return text.replace(/<br \/>/g,"\n")
					.replace(/&quot;/g,'"')
					.replace(/&#039;/g, "'");
	}
	
	// 태그 <,>치환
	,replaceHtmlTag:function(text)
	{
		if(!text) return text;
		
		return text.replace(/</g,"&lt;").replace(/>/g,"&gt;");
	}
	
	// newline br 치환
	,replaceNewlineToBr:function(text)
	{
		if(!text) return text;
		
		return text.replace(/\n|\r|\r\n/g,"<br />\n");
	}
		
	// jquery serialize 가 인코딩하는 것은 공백을 + 로 변경시킨다. 그래서 decode전에 +를 공백 기호로 먼저 인코딩한
	// encodeText는 인코딩된 값
	,replaceEncodeBlank:function(encodeText)
	{
		if(!encodeText) return encodeText;
		return encodeText.replace(/\+/g, "%20");
	}
	
	// 태그제거
	,stripTags:function(text){
		return text.replace(/(<([^>]+)>)/ig, "");
	}
	
	// 용량 표시 방법 - naver smart editor
	,setUnitString:function(nByte) 
	{
 		var nImageSize
 			, sUnit;
 		
 		if(nByte < 0 )nByte = 0;
 		
 		if( nByte < 1024) {
 			nImageSize = Number(nByte);
 			sUnit = 'B';
 			return nImageSize + sUnit;
 		} else if( nByte > (1024*1024)) {
 			nImageSize = Number(parseInt((nByte || 0), 10) / (1024*1024));
 			sUnit = 'MB';
 			return nImageSize.toFixed(2) + sUnit;
 		} else {
 			nImageSize = Number(parseInt((nByte || 0), 10) / 1024);
 			sUnit = 'KB';
 			return nImageSize.toFixed(0) + sUnit;
 		}
     }
	
	// string repeat
	,strRepeat:function(count, str){
		if(!str) return str;
		count = (count||0);
		return new Array(count).join(str); 
	}
	
	// 관리자에서 일반 유저페이지 호출시
	,replaceURLToUser:function(v)
	{	
		var regexp = new RegExp("^"+DOMAIN,"i");
		if(v.match(regexp)) return v;
		
		var regexp2 = new RegExp("^http:\/\/[a-z]+\."+HOST,"i");
		if(v.match(regexp2)) return v.replace(regexp2, DOMAIN);
		else if(v.match(/^http:\/\//i)) return v;
		
		return DOMAIN+v;
	}
	
	/**
	 *  채우기
	 * str : 채울글
	 * length :  몇자
	 * pad : 채울문자
	 * direct : 방향 (left, right)
	 * return : object or string(0000-00-00 00:00)
	 */
	,strPad:function(str, length, pad, direct)
	{
		if(!direct) direct = "left";
		if(!str) str = "";
		if(!length) return str;
		
		length = parseInt(length);
		str = String(str);
		var strLength = str.length;
		
		if(length<=strLength) return str;
			
		var array = new Array(length);
		
		if(direct == "left")
		{
			for(var i=length-1; i>=0; i--){
				array[i]=str.charAt(length-i-1)||pad;	
			}
		}else if(direct == "right")
		{
			for(var i=0; i<length; i++) array[i]=str.charAt(i)||pad;		
		}		
		return array.join("")||str;
	}
	
	/*****************************************************************************
	Toast ...
	@params 
	- (string)position (뜰 위치) : top, bottom(default)
	- (string)msg (전달 문구) : 
	- (DOM)target (팝 뜰 위치) : opener, parent, ... default self
	- (object)options : 나중을 위해
	*****************************************************************************/
	,toast:function(msg, position, target, options){

		position = position || "bottom";
		target = target?target.document.body:document.body;
		
		if(!msg) return ;
		
		// 박스생성 - 실행
		var $html = $('<div class="toast_box"><span>'+msg+'</span></div>')
			,pos = this.position=="top"?"top":"bottom";	

		$html.fadeTo(500, .8).delay(3000).fadeOut(function(){
			$(this).remove();
		}).appendTo(target);

		var left =  (parseInt($(target).width(),10) / 2) - (parseInt($html.width(), 10)/2)
			,obj = {};

		obj[pos]="0px";
		obj["left"]=left;
		$html.css(obj);
	
		// 더 필요한거... 추가(추후)
	}
	
	// 숫자만
	,onlyNumber:function(v)
	{
		v = String(v);
		
		if(!v) return false;
		return (v.match(/^\d+$/));
	}
	
	// 이메일 체크
	,onlyEmail:function(v)
	{
		v = String(v);
		
		if(!v) return false;
		return v.match(/^[\w\~\-\.]+\@[\w\~\-]+(\.[\w\~\-]+)+\s*$/ig);
	}
	
	// 현재시간 반환 object/string(2012-02-02 01:11)
	,getCurrentDateTime:function(format)
	{
		if(!format) format = "string";
	
		var date = new Date()
			, year = date.getFullYear()
			, month = util.strPad(date.getMonth()+1, 2, "0", "left")
			, dates = util.strPad(date.getDate(), 2, "0", "left")
			, hour = util.strPad(date.getHours(), 2, "0", "left")
			, minute = util.strPad(date.getMinutes(), 2, "0", "left");
		
		return (format=="object") ? {
													 	year:year
														,month:month
														,date:dates
														,hour:hour
														,minute:minute
													  } : (year+"-"+month+"-"+dates+" "+hour+":"+minute) ;
	}
	
	,timestampToDatetime:function(timestamp)
	{
		if(!timestamp) timestamp=Math.floor(Date.now()/1000);
		var conv = new Date(timestamp*1000)
			,year = conv.getFullYear()
			,month = util.strPad(conv.getMonth()+1, 2, "0")
			,date = util.strPad(conv.getDate(), 2, "0")
			,day = conv.getDay()
			,week = lang.weeks[day]
			,hour = util.strPad(conv.getHours(), 2, "0")
			,minute = util.strPad(conv.getMinutes(), 2, "0")
			,second = util.strPad(conv.getSeconds(), 2, "0")

		return {
			year:year
			,month:month
			,date:date
			,day:day
			,week:week
			,hour:hour
			,minute:minute
			,second:second
			,strDate:year+"-"+month+"-"+date
			,strDateHan:year+"년 "+month+"월 "+date+"일"
			,strDateWeek:year+"-"+month+"-"+date+" "+week
			,strDateWeekHan:year+"년 "+month+"월 "+date+"일 "+week+"요일"
			,strDateTime:year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second 
			,strDateTimeHan:year+"년 "+month+"월 "+date+"일 "+hour+"시 "+minute+"분 "+second+"초"
		};
	}
	
	/**
	 * float 레이어 띄움
	 * @params 
	 *  - cWdith : 컨텐츠 레이어 넓이
	 *  - cHeight : 컨텐츠 레이어 높이
	 *  - html : 컨텐츠 레이어에 들어갈 내용 (jquery or html or text ...)
	 */
	,floatLayer:function(cWidth, cHeight, html, closeFunc)
	{
		var $div = $("<div />")
			,$content = $("<div />")
			,body = (document.documentElement||document.body)		// IE와 기타브라우저를 구분하기 위해서.
			//,scrollTop = (document.documentElement.scrollTop||document.body.scrollTop)
			,_width = body.clientWidth
			,width = _width < body.scrollWidth ? body.scrollWidth : _width
			,_height = body.clientHeight
			,height = _height < body.scrollHeight ? body.scrollHeight : _height
			,cLeft = width/2 - cWidth/2;
		
		//cHeight = cHeight > _height ? _height : cHeight;
		//html.find("#edit_layer_frame").prop("height",cHeight-150);
		
		if(cLeft<=0) cLeft = 0;
		if(!html) html = "";
		
		$div.attr({
					"id":"autobox_float_bg"
					,"class":"float_layer fade_in7"
				  })
			.css({
				"width":"100%"
				,"height":height
			})
			.appendTo(document.body);
		
		$content.attr({
					"id":"autobox_float_content"
					,"class":"float_layer_content box_shadow_black"
				  })
			.css({
					"width":cWidth
					,"height":cHeight
					,"top":10
					,"left":cLeft
				 })
			.append(html)
			.appendTo(document.body);
	}
	
	// url을 array로
	,linkToJson:function(link)
	{
		if(!link) return false;
		
		var json = {}
			,tmp = link.replace(/^\/\?/,"").split("&");
		
		if(tmp.length<=0 || !tmp) return false;
		for(var i in tmp){
			var param = tmp[i].split("=")
				,key = param[0]
				,value = param[1];
			
			json[key] = value;
		}
		return json;
	}

	/*
	 * hidden form 만들기
	 * @params
	 *  - json : {name:"value", ...}
	 *  - config : {...} form attribute
	 */
	,createHiddenForm:function(json, config)
	{
		if(!json) return false;
		
		if(!config){
			config = {
					method:"post"
					,action:"/?"
					,name:"dummy_form"
			};
		}
		
		// 폼 생성
		var form = document.createElement("form");
		if(config){
			for(var attr in config){
				form[attr] = config[attr];
			}
		}
		
		for(var name in json){
			if(!name) continue;
			var input = document.createElement("input");
				input.type = "hidden";
				input.name = name;
				input.value = json[name];
				
			form.appendChild(input);
		}
		return form;
	}
	
	// 선택한 파일이 이미지 확장자인가?
	,isFileOnlyImg:function(value)
	{
		return (value.match(/\.(jpg|gif|png|jpeg)$/ig));
	}
	
	// 선택한 파일이 pdf 확장자인가?	
	,isFileOnlyPdf:function(value)
	{
		return (value.match(/\.pdf$/ig));
	}
	
	// 파일 다중 선택이 지원되는 브라우져인가?
	,isMultipleFileSelect:function(fileTarget)
	{
		return ("files" in fileTarget);
	}
	
	// 파일 선택시 이미지만
	,evtSelectedFileOnlyImg:function(targets)
	{
		if(!targets) return ;
		
		$(document.body).on("change", targets, function(){
			var $this = $(this)
				,value = this.value;
			if(!util.isFileOnlyImg(value)){
				alert(lang.validSelectImage);
				$this.replaceWith($this.clone());	
				return false;
			}
		});
	}
	
	/**
	 * 로딩후 탭메뉴선택
	 * @params
	 *  - target : 객체
	 *  - attr : 찾을 attribute name
	 *  - value : 찾을 attribute value
	 */
	,loadSelectFromTabMenu:function(target, attr, value)
	{
		if(!target || !attr || !value) return ;
		
		$(target).find("["+attr+"]").removeClass("over").end().find("["+attr+"='"+value+"']").addClass("over");
	}
	
	// 캡챠 html tag - [--dummy--] 난수로 대치
	,captchaTag:function(domain)
	{
		//var dummy = Math.random();
		if(location.protocol === "https:"){
			domain = ((domain==DOMAIN && SSL_DOMAIN) || !domain) ? SSL_DOMAIN : domain.replace(/^http:/,"https:");
		}else domain = domain||DOMAIN;
		return '<div class="bar_bg bb_110 captcha_box">'
				+'	<div class="bar_bg bar_bg_in">'
				+'		<label for="auth_captcha" class="captcha_label">'+lang.captchaBlock+'</label>'
				+'		<img id="captcha_img" class="captcha_img" src="'+domain+'/captcha/securimage_show.php?sid=[--dummy--]" alt="CAPTCHA Image1" title="'+lang.explainCaptcha+'" />'
				+'		<object type="application/x-shockwave-flash" data="'+domain+'/captcha/securimage_play.swf?bgcol=#ffffff&amp;icon_file='+domain+'/images/captcha_audio_play.png&amp;audio_file='+domain+'/captcha/securimage_play.php" width="13" height="12" align="absmiddle"><param name="movie" value="'+domain+'/captcha/securimage_play.swf?bgcol=#ffffff&amp;icon_file='+domain+'/captcha/images/audio_icon.png&amp;audio_file='+domain+'/captcha/securimage_play.php" /></object>'
				+'		<a href="javascript:void(0);" tabindex="-1" id="captcha_btn_refresh" class="btn_bullet btn_bullet_100_570" title="Refresh Image"><img src="'+domain+'/captcha/images/refresh.png" alt="Reload Image" class="captcha_img_refresh" /></a>'
				+'		<input type="text" name="auth_captcha" id="auth_captcha" class="auth_captcha" size="10" maxlength="8" required="required" placeholder="'+lang.captcha+'" />'
				+'	</div>'
				+'</div>';
	}
	
	// 캡챠 문자 갱신 
	,evtCaptchaReload:function(domain)
	{
		domain = domain||DOMAIN;
		$(document.body).on("click", "#captcha_img,#captcha_btn_refresh",
							function(){
								document.getElementById("captcha_img").src = domain+"/captcha/securimage_show.php?sid="+Math.random();
							});
	}
	
	// 캡챠 로드 시키기
	,loadCaptcha:function(target)
	{
		var obj = document.getElementById(target);
		if(!obj) return false;
		
		var captchaTag = this.captchaTag(DOMAIN).replace("[--dummy--]", Math.random())
			,$box = $(obj);		
		
		$box.html(captchaTag);
		
		// reload event
		this.evtCaptchaReload(DOMAIN);
	}
	
	/*
	 캡챠 글자 맞는지 확인
	 이게 먼저 실행 되어야 해서 동기적으로 처리함 (async:false)
	*/
	,isCorrectCaptcha:function(str)
	{
		if(!str){
			alert(lang.validRequireCaptcha);
			return false;
		}
		
		var result = 
			$.ajax({
					url:"/"
					,data:{mod:"service",act:"axCheckCaptcha",authKey:str}
					,async:false
					,type:"post"
					,dataType:"json"
					,success:function(data, rst, xhr){
						if(rst == "success"){
							if(data.result != "success") alert(decodeURIComponent(data.msg)||lang.validRequireCaptchaWrong);				
						}else alert(lang.axError);				
					}
				})
			,json = (result.responseText.indexOf("{")==0 ? $.parseJSON(result.responseText) : false);		// { 로 시작해야 json이다 ㅡㅡ;
		
		if(json === false) return false;
		else if(json.result === "success") return true;			
		
		return false;
	}
	
	// 글쓰기 폼에서 글자수 제한
	,isLimitChar:function(text, limit)
	{
		if(!limit) limit = 400;
		if(text.length>limit) return false;
		
		return true;
	}
	
	// 글자수 replace
	,applyLimitContent:function(target, text, limit)
	{
		if(!limit) limit = 400;
		var str = text.slice(0, limit);
		
		// jquery 객체라면...
		if(!!target.jquery){
			target[(target.is("input, textarea")) ? "val" : "html"](str);
		}else{	
			var tag = target.tagName.toLowerCase()||"";
			target[(tag === "input" || tag === "textarea") ? "value" : "innerHTML"] = str;
		}
		return false;
	}
	
	// 글자수 표시 이벤트
	,evtDisplayCharLength:function($target, $display, limit)
	{
		var parents = this;
		
		if(!limit) limit = 400;

		var func = $display.is("input") ? "val" : "text";		
		$display[func]("0 / " + limit);
		
		$(document.body).on("keyup", $target, function(){
			var text = $target.val()
				,length = text.length;
			
			if(parents.isLimitChar(text, limit)===false){
				parents.applyLimitContent($target, text, limit);
				parents.toast(lang.validRequireLimitData);
				return false;
			}
			
			$display[func](length +" / " + limit);
		});
	}
	
	// textarea 자동으로 늘어나게 - target은 jquery객체아님
	,resizeTextarea:function(target)
	{
		var ch = document.getElementById(target.replace(/^[#\.]/,"")).clientHeight;
		this.vars.areaHeight = ch;
		
		function resize(e){
			var _this = e.currentTarget || e.srcElement
				,$this = $(_this)
				,key = e.keyCode
				,sh = _this.scrollHeight
				,_ch = _this.clientHeight;
			
			if(ch < sh) $this.css({height:sh});							
			if(ch < _ch){
				if(key === 8 || key === 46) $this.css({height:"-=16"});
			}
		}
		
		$(document.body).on({
								keyup:function(e){
									resize(e);
								}
								,blur:function(e){
									resize(e);									
								}
							},target);
	}
	
	/*
	 * 실제 이미지 크기 재오기
	 * link 이미지 링크
	 * func webkit은 이미지가 로드 되어야 크기를 잴수 있다. 그래서 리턴 되더라도 이미지가 로드 되지 않았다면 잴수 없다
	 */
	,getImageSize:function(link, func)
	{
		if(!link) return false;
		
		var img = new Image()
			,size={};
		img.src = link;
		img.onerror=function(){};
																								// IE
		size={width:img.width||0, height:img.height||0};
		if(size.width){
			func.call(this,size);
		}else{																					// ETC ...
			img.onload=function(){
				size={width:this.width||0, height:this.height||0};
				func.call(this,size);
			};
		}		
	}
	
	// 아이피주속 * 로 교체
	,convertIp:function(v)
	{
		return v.replace(/(\.[0-9]{1,3}\.[0-9]{1,3}\.)/,".***.***.");
	}
	
	// 4자 이후 **** 로 변환
	,convertStr:function(v, len, replace)
	{
		if(!len) len=4;
		if(!replace) replace="****";
		
		var rexp = new RegExp("^(.{"+len+"}).*$","i");
		return v.replace(rexp,"$1"+replace);
	}
	
	// php의 number_format
	,numberFormat:function(v)
	{
		v = Math.abs(v);
		if(!v) return 0;
		return String(v).split( /(?=(?:\d{3})+(?:\.|$))/g ).join( "," );
	}
	
	// tooltip ... jquery UI
	,showTooltip:function(target, option)
	{
		if(typeof option != "object") option={};
		
		$(target).tooltip(option);
	}
	
	// tooltip custom
	,showCustomTooltip:function(target)
	{
		if(!target) return ;
		$(document.body).on({
			mouseenter:function(e){
				var $this = $(this)
					,title = $this.attr("title");
		
				if(!title) return false;
				var $box = $('<div class="c_tooltip_box">'+title+'</div>');
								
				$box.appendTo(document.body);
				
				var position = $this.offset()
					,top = position.top - ($box.outerHeight()+3)
					,left = position.left - ($box.outerWidth()/2 - $this.outerWidth()/2);
				
				left = left<0?0:left;
				$box.css({"top":top+"px", "left":left+"px"}).fadeIn(100);
			}
			,mouseleave:function(){
				$(".c_tooltip_box").fadeOut(100,function(){
					$(this).remove();
				});
			}
		},target);
	}
	
	// js 인클루드?
	,includeJs:function(jsPath)
	{
		var script = document.createElement("script")
			,findScript = document.getElementsByTagName("script")
			,appendScript = findScript[2]||findScript[0];						// jquery 로드후 붙일려구
		script.type = "text/javascript";
		script.charset = "utf-8";
		script.src = jsPath;
		
		appendScript.parentNode.insertBefore(script, appendScript);
		
		return script;
	}
	
	/**
	 * 그래프 그리기
	 * 
	 */
	,createChart:function(obj, chartType, xy, width, height, mode)
	{
		var $obj = $(obj)
			,$caption = $obj.find("caption");
		
		$obj.next(".visualize").remove(); // 중복으로 생겨 제거
		
		chartType = chartType||($caption.attr("ref")||"bar");
		width = width||"620px";
		height = height||"400px";
		xy = xy||($caption.attr("xy")||"y");
		
		var chartVars =
								{
									type: chartType, //bar, area, pie, line
									width: width, // 넓이
									height: height, //높이
									appendTitle: false, //테이블의 캡션이 라벨 설명의 제목이 된다
									title: null, // 임이의 제목(이게 appendTitle 보다 우선)
									appendKey: true, // 라벨 설명
									colors:["#00BFFF","#0000FF","#96A5FF","#20B2AA","#3CB371","#2C952C","#D27328","#1EAAAA","#B90000","#FFB400","#8B4F1D","#9E37D1","#828282","#FF7A85","#FF5AD9","#7B68EE","#28288C","#FF0000","#000000"],
									colorsGradient: ["#00BFFF","#0000FF","#96A5FF","#20B2AA","#3CB371","#2C952C","#D27328","#1EAAAA","#B90000","#FFB400","#8B4F1D","#9E37D1","#828282","#FF7A85","#FF5AD9","#7B68EE","#28288C","#FF0000","#000000"], //gradient 색상
									textColors: [], //라벨 글자색
									parseDirection: xy, // x, y 설정
									pieMargin: 20, // (pie전용 : 원 상하 여백)
									pieLabelPos: 'inside', // (pie전용 : 라벨위치 inside, outside) 
									lineWeight: 3, // (line,area 전용 : 선굵기)
									barGroupMargin: 10,// (bar 전용 : bar묶음당 여백)
									barMargin: 5, //(bar 전용 : bar 한개당 여백)
									yLabelInterval: 50, // y 축 라벨(단위)의 간격
									mode:mode			// %로 나타낼려면 "percent"
								};
		
		//$(".visualize").remove(); //이전에 생성된 챠트 없앰

		$obj.visualize(chartVars); // 그래프 생성
	}
	
	
	/**
	 * 클립보드 복사 
	 * source : 복사할 정보
	 */
	,copyExe:function(source)
	{
		if(window.clipboardData){			// ie
			window.clipboardData.setData('Text',source);
			util.toast(lang.copiedDoPaste);
		}else{								// etc
			
			var $tmpDiv=$('<div class="blind">'+source.replace(/</g,"&lt;").replace(/>/g,"&gt;")+'</div>').appendTo("body")
				,range=document.createRange()
				,selection=null;

			range.selectNodeContents($tmpDiv.get(0));
			selection=window.getSelection();
			selection.removeAllRanges();
			selection.addRange(range);
			
			if(document.execCommand("copy", false, null)) util.toast(lang.copiedDoPaste);
			else window.prompt(lang.controlCcopy, source);

			$tmpDiv.remove();
		}
	}
		
	/**
	 * 클릭시 클립보드 복사
	 * target : 클릭 먹일 객체
	 */
	,copyClipboard:function(target)
	{		
		if(!target) return false;
		
		$(document.body).on("click", target,
							function(){
								var source = this.getAttribute("data-source")||this.value||"";
								if(!source) return false;
								
								util.copyExe(source);
								return false;
							});
	}
	
	// array sum
	,arraySum:function(arr)
	{
		if($.isArray(arr)===false) return false;
		
		var sum = 0;
		for(var i=0,cnt=arr.length;i<cnt;i++){
			sum+=Number(arr[i])||0;
		}
		return sum||0;
	}
	
	// array 최고값
	,arrayMaxMin:function(arr, mode)
	{
		if($.isArray(arr)===false) return false;
	
		if(!mode) mode = "max";
		arr.sort(function(a, b){
			return b-a;
		});
		return (mode=="max"?arr[0]:arr[arr.length-1])||0;
	}
	
	// checkbox,radio 이미지화에서 페이지 갱신없이 작업할때 작업완료후 함수 실행시켜야함
	,inputReload:function($target)
	{
		if(!window.___input) window.___input = new Input();
		if($target) ___input.setTarget($target.find("input"));				// 일부가 있다면 그부분 input 만 갱신
		
		___input.reload();
	}
		
	/**
	 체크/라디오 박스 체크하기/해제하기(커스텀 이미지 된것 or 일반)	 
	 */
	,releaseCustomInput:function(target, checked)
	{
		if(!window.___input) window.___input = new Input();
		___input.checkOrRelease(target, checked)
	}
	
	// 글자넘칠때 more
	,cutStrMore:function(target, length, suffix, button)
	{
		if(!target) return ;
		if(!length) length = 100;
		if(!button) button = '<button type="button" class="link_blue cut_str_button more"><span class="icon"></span><span class="text">'+lang.unfold+'</span></button>';
		
		var $target = !!target.jquery ? target : $(target)
			,box = '<span class="cut_str_btn_box">'+button+'</span>';
		
		$.each($target,function(i){
			var $this = $(this)
				,text = $.trim($this.text())
				,len = text.length;
		
			if(len>length){
				var start = text.substr(0, length) + '<span class="cut_suffix">'+suffix+'</span>'								// 자른 첫단락
					,end = '<span class="cut_str_box">'+text.substring(length, len)+'</span>'+box;								// 나머지 단락
					
				$this.html(start+end)
			}
		});
		
		// 더보기시 늘어나게
		$(document.body).on("click",".cut_str_button",function(){
			var $this = $(this);
			
			if($this.hasClass("more")){
				$this.removeClass("more").find(".text").text(lang.fold).closest(".cut_str_btn_box").prev(".cut_str_box").show().prev(".cut_suffix").hide();
			}else{
				$this.addClass("more").find(".text").text(lang.unfold).closest(".cut_str_btn_box").prev(".cut_str_box").hide().prev(".cut_suffix").show();
			}			
			return false;
		});		
	}
	
	// 이미지로 placeholder했을때, 여러 이벤트 처리
	,evtPlacehoder:function(target, bgImg)
	{
		if(!target) target = ".bg_placeholder";
		if(!bgImg) bgImg = (location.protocol==="https:"?"/images":IM_DOMAIN)+"/placeholder-bullet.png";
		
		$(target).each(function(){			
			if(this.value) this.style.backgroundImage="none";
			else this.style.backgroundImage = "url("+bgImg+")";
		})
		.off()
		.on({
				focus:function(){
					this.style.backgroundImage="none";
				}
				,blur:function(){
					if(!this.value) this.style.backgroundImage = "url("+bgImg+")";
				}
		});
	}	

	/*
	 * label로 placeholder했을때, 여러 이벤트 처리
	 * target - input element selector
	 */
	,evtPlacehoderLabel:function(target)
	{
		if(!target) return false;
		
		function getLabel(evt, _this){
			var $this=$(_this)
				,id=_this.id
				,$label=$this.siblings("label[for='"+id+"']")
				,eType=evt.type.toLowerCase();
			if($label.length<=0) $label=$this.siblings("label");
			
			if(eType=="focus") $label.hide();
			else{
				if(!$this.val()) $label.show();
			}
		}
		
		$(target).on({
			focus:function(e){ getLabel(e||window.event, this); }
			,blur:function(e){ getLabel(e||window.event, this); }
		});
	}

	// 본문 프린트(기사+게시판)
	,printContent:function(openerTarget, selfTarget)
	{
		var $html = $(openerTarget,window.opener.document).clone().find(".not_print").remove().end()
			,$target = $(selfTarget);
		try{
			$target.html($html);
		}catch(e){
			$target.html($html.html());
		}
	
		window.onload=function(){
			window.print();
			setTimeout(function(){ window.close(); },1000);
		}
	}
	
	// 링크띄우기
	,linkOpen:function(mode, target)
	{
		$(document.body).on("click",target,function(){
			var $this = $(this)
				,link = $this.attr("data-link");
			
			if(mode==="open"){
				var options = $this.attr("data-open-options")||"";
				window.open(link,"_dummy",options)
			}else{
				location.href=link;
			}
			
			return false;
		});
	}
	
	/**
	* 즐겨찾기 등록하기
	* <a onclick="util.createBookmarkLink('http://domain.com');">즐겨찾기 등록</a>
	*/
	,createBookmarkLink:function(url){
	    title = document.title;
	    //FF
	    if (window.sidebar) {
	        window.sidebar.addPanel(title, url,"");
	    }
	    //IE
	    else if(window.external) {
	        window.external.AddFavorite(url,title);
	    }
	    //Opera
	    else if(window.opera && window.print) {
	        return true;
	    }
	}

	/**
	* 시작페이지 설정
	* <a onClick="util.startPage(this,'http://domain.com');">시작페이지로</a>
	*/
	,startPage:function(obj,url){
	    if (document.all && window.external){
	        obj.style.behavior='url(#default#homepage)';
	        obj.setHomePage(url);
	    }else{}
	}
	
	/*영상,iframe 크기 제한 - 부모의 100%까지만*/
	,objectMaxWidth:function(){
		$(".object_max_width").find("object, embed, iframe").attr("width","100%");
	}

	// 유튜브 iframe 비율에 맞게
	,objectResizeMaxWidth:function(){
		$("#m_a_content").find("iframe").each(function(){
			var $this=$(this),width=$this.width();
			$this.prop({"width":width,"height":(width*0.56)});
		});
	}
	
	// facebook 댓글 넓이 페이지에 맞게
	,toResizeFacebookReply:function()
	{
		var width = $("#arl_view_box").width();
		// 700 넘는다면 늘려주기
		if(width>700){
			$(window).load(function(){
				var $iframe = $(".fb_iframe_widget").children("span").css("width",width+"px").find("iframe")
					,iWidth = $iframe.width();
				$iframe.css("width", width+"px").attr("src", $iframe.attr("src").replace("width="+iWidth, "width="+width));
			});
		}
	}
	
	// 임시-slide 시 자동 롤릴
	,autoSlide:function(target, speed, finder)
	{
		var $wpVote=$(target)
			,$btnNext = $wpVote.find(finder||".box_slide_horizon_btn_next,.m_slide_horizon_btn_next")
			,roll = true;
			
		setInterval(function(){
			if(roll===true){			
				$btnNext.triggerHandler("click");
			}
		}, (speed||5)*1000);
		
		$wpVote.on({
			mouseenter:function(){
				roll=false;
			}
			,mouseleave:function(){
				roll=true;
			}
		});
	}
	
	/**
	 * 기사뷰 오른쪽 따라다니는 기사묶음, 상단이동 접히고 하단이동 펼쳐짐(예:http://mediatoday.co.kr)
	 * @param
	 *  - box : 움직일 전체박스 selector
	 *  - btn : 클릭시 접힘 or 펼침 selector
	 *  - limitLine : 어느선에서 자동 펼치고 접힐것인가? selector
	 <div id="float_right_box" class="float_right_box on">	
		<div class="btn_box">
			<a href="#" class="frb_btn icon close">toggle button</a>
		</div>
	
		<div class="content_box">
			<h6 class="cb_title">주요 인기기사</h6>
			<div class="cb_content">			
				<div class="frb_box">
					<a href="/?mod=news&amp;act=articleView&amp;idxno=30554" class="frb_a">
						<dl class="frb_dl ">
						<dt class="frb_dt frb_dt1"><img src="http://ph.spotvnews.co.kr/news/thumbnail/201510/30554_41828_0025_150.jpg" alt="" class="frb_img"></dt>
						<dt class="frb_dt frb_dt2">'우리 사랑해요' 론다 로우지 ♥ 트래비스 브라운, 열애 인정</dt>
						</dl>
					</a>
					<!-- 리스트 네개 -->
				</div>
			</div>
		</div>
	</div>
	 */
	,floatSideView:function(box, btn, limitLine){
		if(!box) box = "#float_right_box";
		if(!btn) btn = ".frb_btn";
		if(!limitLine) box = "#article_end_limit";
		
		var $frb = $(box)
			,$btn = $frb.find(btn)
			,frbToggle = false//접기
			,open = true // 스크롤시 내려가서 열렸을때 닫을때 : false 일때는 스크롤 내려도 안 열림
			,iever = Number((/msie[ \/:]?([0-9]+)/.exec(navigator.userAgent.toLowerCase())||[])[1]||11) //ie 버전-크롬등은 11로함
			,limit = $(limitLine).offset().top; // 이선 넘길시 자동 펼침
	
		$btn.click(function(){
			var isScroll = arguments[1]=="scroll"; // scroll event 인가?
	
			frbToggle = !frbToggle;
	
			if(isScroll===false) open=false;			// click 닫은거 스크롤시 안열리게
	
			// ie 9이하
			if(iever<=9){
				$frb.animate({ "right":(frbToggle===true?"0":"-560px") },
									580,
									function(){ $(this).toggleClass("on"); });
			}else $frb.toggleClass("on");		//그외 css
	
			// 화살표 방향 바꾸기
			$btn[(frbToggle===true?"addClass":"removeClass")]("close");
	
			return false;
		});
	
		window.onscroll=function(){
			if(open===false) return false;
	
			var _t = $frb.offset().top;
			if(frbToggle===false && _t>=limit) $btn.trigger("click", ["scroll"]);
			else if(frbToggle===true && _t<limit) $btn.trigger("click", ["scroll"]);
		};
	}
	
	// 한줄 속보 - 펼침
	,fadeLineArticleChange:function(target)
	{
		var	$box = $(target)
		,$items=$box.find(".ts_items")
		,len = $items.length
		,$btn=$box.find(".ts_label")
		,roll = true
		,index = 0;

		if(len>0){
			// 간격으로 
			setInterval(function(){
				if(roll!==true) return false;
	
				index++;
				if(index>=len) index=0;
				$items.hide().eq(index).fadeIn();		
			}, 5000);
		
			$btn.click(function(){
				$box.toggleClass("on");
				roll=!$box.is(".on");
				
				if(!roll) $items.show();
				else{
					$itmes.hide().eq(0).show();
					index=0;
				} 
			});
	
			$items.on({
				mouseenter:function(){ roll=false; }
				,mouseleave:function(){ if(!$box.is(".on")) roll=true; }
			});
		}
	}
	
	//날씨
	,todayWeather:function(target, skin){
		var regions = ["108","112","127","133","143","146","152","156","159","184","101","105"] //서울,인천,충주,대전,대구,전주,울산,광주,부산,제주,춘천,강릉
			,icons = {"01":"0 0","02":"0 -50px","03":"0 -100px","04":"0 -150px","07":"0 -350px","08":"0 -200px","11":"0 -250px","12":"0 -400px","13":"0 -450px"} // icon 번호 : 우리 icon 이미지 좌표
			,iUrl = "http://www.kma.go.kr/images/icon/NW/NB[icon].png" // 기본 아이콘
			,url = "http://www.kma.go.kr/XML/weather/sfc_web_map.xml?"+Math.random()
			,yqlUrl = "http://query.yahooapis.com/v1/public/yql?q="+encodeURIComponent("select * from xml where url='" + url + "'")+"&format=json&callback=?" // xml은 jsonp 가 안되어 yahoo 이용해서 json 으로 만듬 - crossdomain
			,contents = []
			,copyright = '<a href="http://www.kma.go.kr/" target="_blank" class="a">기상청 제공</a>';
			
		if(!skin) skin="default";
		
		$.get(yqlUrl,function(data, result){
			if(result=="success"){
				var weather = data.query.results.current.weather
					,date = weather.year+"."+weather.month+"."+weather.day+" ("+weather.hour+"시)"
					,d = weather.local||[]
					,$target = $(target);
					
				for(var i=0,t=d.length; i<t; i++){
					var _d = d[i]
						,stnId = _d.stn_id
						,content = _d.content
						,icon = _d.icon
						,iconpos = icons[icon]
						,desc = _d.desc
						,ta = _d.ta
						,iconUrl = ""
						,tag = "";
					
					if($.inArray(stnId, regions)<0) continue;
					//if(!iconpos) iconUrl = iUrl.replace("[icon]", icon); // 만들어진 아이콘이 없을때 기상청 아이콘 가져올까 했는데 라이센스때문에 그냥 냅둡
					if(!iconpos) iconpos = "-1000px 0"; // 기상청 xml에서 아이콘이 없는게 있다
					
					tag = '<div class="wb_list">'
						+ 	'<ul class="no_type wb_const">'
						+		'<li class="li first">'+date+'</li>'
						+		'<li class="li second">'+content.replace("대구(기)","대구")+' <span class="ta">'+ta+'</span>℃</li>'
						+	'</ul>'
						+	'<p class="icon wb_img" style="background-position:'+iconpos+'">'+desc+'</p>'
						+ '</div>';
					contents.push(tag);
				}
				
				if(contents.length<=0) return false;
				
				var over = false				// true라면 마우스 올린상태이므로 바뀌지 않음
					,$wblist = $target.on({
											mouseenter:function(){ over=true; }
											,mouseleave:function(){ over=false; }
										 }).append('<div class="weather_box '+skin+'"><div class="wb_box">'+contents.join("")+'</div><p class="wb_copy">'+copyright+'</p></div>').find(".wb_list")
					,index = 0
					,t = $wblist.length;
				
				if(t<=1) return false;
				setInterval(function(){
					if(over===true) return false;
					
					index++;
					if(index>=t) index=0;
					$wblist.addClass("none").eq(index).removeClass("none");					
				}, 5*1000);
		
			}else alert(lang.axError);
		},"json");
	}
	
	// 회사소개 페이지 탭메뉴
	,menuTabCompanyPage:function(){
		var queryString = location.search;
	
		function view(_p, _sp){			
			$li.removeClass("on").eq(_p).addClass("on");			// 메인메뉴
			$items.hide().eq(_p).show();
		
			// sub 메뉴-규약과규정
			if(_sp>=0){
				var $sub = $items.eq(_p||0).filter(".citb_sub")
					,$suba = $sub.find(".cits_a") 
					,$subitems = $sub.find(".citb_sub_item");
			
				$suba.removeClass("on").eq(_sp).addClass("on");	// 서브메뉴
				$subitems.hide().eq(_sp).show();
			}
		}
		
		var $menus = $("#citb_menu")
			,$li = $menus.find(".li")
			,$contents = $("#citb_contents")
			,$items = $contents.find(".citb_item")
			,hash = location.hash.replace(/^#PAGE/, "")
			,loadPage = hash?hash.split("^"):[1,0]
			,page = loadPage[0]-1
			,subpage = !loadPage[1]?false:loadPage[1]-1;			
	
		// 로딩될때 - PAGE hash가 있을떄.
		if(location.hash.indexOf("#PAGE")>=0) view(page, subpage);		
		
		// 메인메뉴
		$menus.find(".li_a").add($(".cits_a")).click(function(){
			var $this = $(this)
				,href = $.trim($this.attr("href"));
			
			if(href.indexOf("#PAGE")!==0) return true; // page 이동일때,
			
			var link = href.replace(/^#/,"")
				,arr = link.replace(/^PAGE/,"").split("^")
				,p = (Number(arr[0])||1)-1	// main menu
				,sp = !arr[1]?false:(Number(arr[1])||1)-1; // sub menu
		
			view(p, sp);
			
			location.hash = href;
			return false;
		});
	}

	// 자동박스 직접 tpl에서 호출
	/*
	<!-- 기사뷰 오른쪽 사이드 단 꾸밈 들 -->
	<div id="autobox_aritcle_side_tag"></div>
	<script type="text/javascript">util.getAutoboxTplTag("#autobox_aritcle_side_tag");</script>
	*/
	,getAutoboxTplTag:function(target, code){
		$.get(	"/"
				,{mod:"html", act:"getAutoboxTplTag", code:code||""}
				,function(data, rst){
					if(rst!=="success") return false;
					$(target).html(decodeURIComponent(data));
				},"html");
	}

	//php, urlencod : http://phpjs.org/functions/urlencode/
	,urlencode:function(str){
		str = (str + '').toString();
		return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
	}

	//php, urldecode : http://phpjs.org/functions/urldecode/
	,urldecode:function(str){
		return decodeURIComponent((str + '')
				.replace(/%(?![\da-f]{2})/gi, function() {
				  return '%25';
				}).replace(/\+/g, '%20'));
	}

	// 모바일기기에서 pc화면으로 들어왔을때 하단에 버튼생김
	// 우선 android, ios 만
	,linkToMobileForPC:function(){
		var os=util.browser().os||"";
		if($.inArray(os,["android","ios"])<0) return false;
		$("body").append('<a href="'+M_DOMAIN+"/"+(location.search||"")+'" class="to_mobile_from_pc_a"></a>');
	}	
	
	// 글쓰기 에디터에서 안의 내용물만큼 자동으로 늘리기
	// 모바일에서만 사용할까함 - 공통으로 사용하려고 여기에 둠
	,setAutoHeightEditor:function(){
		if($.inArray(util.browser().os, ["ios","android"])<0) return false;
		var $iframe=$("iframe[src*='editor/SmartEditor2Skin']")				// 에디터 iframe
			,$iframeContent=$iframe.contents()
			,$se2Frame=$iframeContent.find("#se2_iframe")					// 에디터 내 iframe
			,$se2FrameDiv=$se2Frame.parent("div")							// 에디터 내 iframe 부모 div
			,selfWindow=this												// 자기자신
			,selfBody=selfWindow.document.documentElement ? selfWindow.document.documentElement : selfWindow.document.body
			,$selfBody=$(selfBody)
			,defaultHeight=$se2Frame.height()||500
			,$this=$(this)
			,isMobileTpl=(util.getCookie("template")=="m");
		
		$this.on("keyup blur focus mousedown touchstart scroll", function(){
			//var height=selfBody.scrollHeight;
			var height=$selfBody.find("body").css("height","auto").height()+30
			if(height<defaultHeight) height=defaultHeight;
			
			$se2Frame.height(height);
			$se2FrameDiv.height(height);
			$iframe.height(height+(isMobileTpl?5:49));
		});
		
		//$(window).load(function(){ $this.trigger("blur"); });	
		// 모바일에서는 load 이벤트가 안먹네;;
		var si=setInterval(function(){
								$this.trigger("blur"); 
								if($selfBody.height()>0) clearInterval(si);
							},300);
		
		// 재사용 할 것이기에 저장함
		if("article" in window) article.vars.$editorHeightObj = $this;
		else if("mPhoto" in window) mPhoto.vars.$editorHeightObj = $this;
		
		// 모바일일때 다른 메뉴 없앰
		if(isMobileTpl) $iframeContent.find("#smart_editor2").addClass("device_m");
	}
		
	// 사진,영상,파일 삽입시 늘이기
	,setAutoHeightEditorAttach:function(){
		try{
			var $eh=null;
			
			if("article" in window) $eh=article.vars.$editorHeightObj;
			else if("mPhoto" in window) $eh=mPhoto.vars.$editorHeightObj;
			
			var h=$eh.height()
				,si=null;
			
			si=setInterval(function(){
				$eh.trigger("blur");
				var _h=$eh.height();
				if(h!=_h) clearInterval(si);			
			}, 100);
		}catch(e){}
	}
	
	// 8~32자이며 숫자+영문+특문 조합. 
	,validMixNumCharLoUp:function(val)
	{
		if(!val) return false;
		//var valpwd = /^.*(?=^.{8,32}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
		var valpwd = /^.*(?=^.{8,32}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[`~\!@#\$%\^\&\*\(\)_\-\+\=\|\{\}\[\]\?\.,]).*$/i;
		return valpwd.test(val);
	}
	
	// PC, Mobile 이벤트 구분해 캐치해냄 
	,getEventObject:function(e)
	{
		var evt = window.event||e;
			evt = evt.targetTouches?evt.targetTouches[0]:evt;  	// jquery touch event
		return evt;
	}

	// input,textarea 일때는 제외
	,exceptElementSwipe:function(e){
		var targetElement=e.target.tagName.toLowerCase()
			,elements=["input","textarea"];
		return ($.inArray(targetElement,elements)>=0);
	}

	/* 드래그 이벤트 - pc & mobile
		param={start:function(){}, move:..., end:..., finish:...};
	*/
	,evtSwipe:function(target,param)
	{
		if(!target) return false;
		if(!param) param={};

		var parents=this, isExcept=false, startDrag=false, move=false, direct=""
			,x=null, y=null
			,minSwipeGap=Number(param.minSwipeGap)||20; // 최소 스와이프 범위 세팅
		$(target).on({
					"mousedown touchstart":function(e){
						var evt=mUtil.getEventObject(e);
						startDrag=true;
						x=evt.clientX;
						y=evt.clientY;
						
						param.start.call(this, e);
						
						isExcept=parents.exceptElementSwipe(e);
						
						// 마우스일때
						if(e.type === "mousedown" && !isExcept){
							e.preventDefault();
							e.stopPropagation();
						}
					}
					,"mousemove touchmove":function(e){
						if(isExcept) return false;
						
						if(startDrag===true && swipe!=="Y"){
							var evt=mUtil.getEventObject(e)
								,_x=evt.clientX, _y=evt.clientY
								,mx=_x-x
								,ix=Math.abs(mx), iy=Math.abs(_y-y)
								,swipe="" 
								,isRight = mx<0;
							if(ix<iy && swipe=="") swipe="Y";
							else swipe="X";
							
							if(swipe=="X" && ix>minSwipeGap){
								// touch 이고 어느정도 드래그가 있을때 자식객체로 다른 이벤트 전달 못하게함
								if(e.type === "touchmove"){
									e.preventDefault();
									e.stopPropagation();
								}
								
								param.move.call(this, e, isRight, ix);
								if(ix>=0){
									move=true;
									direct=isRight?"right":"left";	// 오른쪽으로 or 왼쪽 슬라이드?
								}else{
									move=false;
									direct="";
								}
							}// end isInterval					
						}
					}
					,"mouseup touchend":function(e){
						if(move===true && direct){
							param.end.call(this, e, direct);
							//return false;
						}
						
						param.finish.call(this, e);

						startDrag=false;
						move=false;
						direct="";
						x=null;
						y=null;
						isExcept=false;
					}				
				});
	}
	
	// 이전기사, 다음기사 (slide + click)
	// @param : drag === true 드래그로 이전,다음기사 넘기기
	,evtNextPrevArticleView:function(drag){
		var $box=$("#container,.m_content_box")
			,$btnPrev=$('<button type="button" class="npav_btn_prev show">이전기사</button>')
			,$btnNext=$('<button type="button" class="npav_btn_next show">다음기사</button>')
			,$btns=$btnPrev.add($btnNext)
			,sectionCode=this.linkToJson(location.search.replace(/^\?/,"")).sc_code||""
			,articleIdxno=this.linkToJson(location.search.replace(/^\?/,"")).idxno||"";
		
		function locate(d){
			location.href="/?mod=news&act=articleDirect&direc="+d+"&sc_code="+sectionCode+"&idxno="+articleIdxno;
		}
		
		$btns.appendTo("body");
		setTimeout(function(){ $btns.removeClass("show"); }, 1200);
		if(drag!==true){// drag를 허용 안한다면 실행
			$box.click(function(){ $btns.toggleClass("show"); });
			$btnPrev.click(function(){ locate('prev'); });
			$btnNext.click(function(){ locate('next'); });
		}
		
		if(drag!==true) return;
		
		// swipe
		this.evtSwipe($box,{
								start:function(e){}
								,move:function(e, isRight, ix){
									(isRight?$btnNext:$btnPrev).css((isRight?"next":"prev"),(ix>=0?0:ix)+"px");
								}
								,end:function(e, direct){ locate(direct); return false; }
								,finish:function(e){ $btns.removeClass("show").removeAttr("style"); }
							});
	}
	
	// ios7이상일때, private browsing (개인정보보호 브라우징) 선택할 경우 webStorage(sessionStorage,localStorage)를 사용 못함
	,isSupportWebStorage:function()
	{
		var storage=util.sessionStorage;
		try{
			storage.setItem("test","1");
			storage.removeItem("test");
			return true;
		}catch(e){ return false; }
		return false;
	}


	// 카드 뉴스 이벤트
	,makeCardNews:function(target)
	{
		if(!target) target="#arl_view_content";
		var $view=$(target)
			,$tables=$view.find(".news_photo_table")
			,$images=$tables.find("img")
			,img=$images.map(function(){ return {src:this.src,width:this.width}; }).get()
			,len=img.length||0
			,html=	'	<div id="cardnews_box" class="cdb_slide cardnews_box">'
					+'		<div class="cdb_slide_btns">'
					+'			<a href="#;" class="cdb_slide_btn_number">1</a>'
					+'		</div>'
					+'		<div class="cdb_slide_box cnb_box">'
					+		(function(){
								if(!len) return '';
								var arr=[];
								for(var i=0;len>i;i++){
									arr.push('<div class="cdb_slide_list cnb_ib"><img src="'+img[i].src+'" class="cnb_i" /></div>');
								}
								return arr.join("");
							})()					
					+'		</div>'
					+'		<button type="button" class="cdb_slide_btn_prev cnb_b cnb_prev">이전</button>'
					+'		<button type="button" class="cdb_slide_btn_next cnb_b cnb_next">다음</button>'
					+'		<div class="cdb_slide_btn_page"></div>'
					+'	</div>';
		
		$tables.css("display","none");
		$view.prepend(html);

		// 높이 측정
		util.getImageSize(img[0].src,function(s){
			var $cdb=$("#cardnews_box").width(s.width)
				,$prev=$cdb.find(".cdb_slide_btn_prev").prop("disabled",true)
				,$next=$cdb.find(".cdb_slide_btn_next");
			
			// PC만 실행
			//if(M_DOMAIN.indexOf(location.host)<=0) $cdb.find(".cnb_box").css({width:s.width,height:s.height});

			var _slide=new Slide({
								root:".cdb_slide"
								,box:".cdb_slide_box"
								,slide:".cdb_slide_list"								// touch event
								,btn : {prev:".cdb_slide_btn_prev", next:".cdb_slide_btn_next", number:".cdb_slide_btn_number"}
								,page : ".cdb_slide_btn_page"
							}
							,{
								func:{
										end:function(){
											var index=$cdb.find(".selected").index();
											
											// 처음 / 끝일때는 멈춤
											$next.add($prev).prop("disabled",false);
											if(index===0){
												$prev.prop("disabled",true);
											}else if(index===(len-1)){
												$next.prop("disabled",true);
											}
										}
									  }
							 }).exe();

		});
	}


	// 메인판 하단 세로 탭 박스 이벤트
	,evtMouseenterVerticalTabMain:function()
	{
		// 가운데단 탭 이벤트
		var $loTab=$("#lo_tab")
			,$bTab=$loTab.find(".lot_1").find(".li")	 // 버튼 탭
			,$cTab=$loTab.find(".lot_2").find(".li"); // 컨텐츠 탭
		$bTab.mouseenter(function(){ 
			var $this=$(this),index=$this.index();
			$bTab.add($cTab).removeClass("on");
			$this.add($cTab.eq(index)).addClass("on");
		});
	}


	// 본문내 이미지태그에 viewSubPhoto('') 있다면 큰사이즈 이미지 링크
	,evtReplaceBigSizePhoto:function(target){
		if(!target) return false;

		var $imgs=$(target).find("img[onclick*='viewSubPhoto']").each(function(){
			var $this=$(this), isBtn=$this.is(".bd_bt"), src=$this.attr("src");
			if(src && !isBtn){
				$this.css("max-width","590px").attr("src",src.replace("/news/photo/","/news/large/"))
				.error(function(){
					// 원본파일과 large파일의 디렉토리가 다를경우가 있어 없다면 다음 月디렉토리 참조
					var _src=this.src, _d="", _p=_src.replace(/(\/[0-9]+\/)/, function(a1,a2,a3){ _d=a1; })
						,_n=_d.replace(/\//g,""), _date=new Date();
					
					_date.setYear(_n.substr(0,4));
					_date.setMonth(_n.substr(4,6));
					_date.setDate("28");
					
					var _date2=new Date();								// 다음달 계산해옴
					_date2.setTime(_date.getTime()+(86400000+7));
					var dir=_date2.getFullYear()+util.strPad((_date2.getMonth()+1),2,'0');

					this.src=_src.replace(_d,"/"+dir+"/");				// 이미지 src 교체
					//articleView.viewLightBox();							// lightbox 재실행
				}).closest("table").addClass("news_photo_table");
			}
		}).removeAttr("onclick");

		// 클릭이벤트 캡쳐하기
		setTimeout(function(){
			$imgs.filter(".bd_bt").css("cursor","pointer").click(function(){ $imgs.not(".bd_bt").trigger("click"); });
		}, 1000);
	}

	// 마이뉴스 메뉴 링크
	,setMyNewsLink:function($mynewsa){
		if(!$mynewsa) $mynewsa=$("#my_news_a");
		$mynewsa.attr("href",$mynewsa.attr("href")+"&sc_code="+(mUtil.localStorage.getItem("mynews_code")||""));
	}

	// 마이뉴스 설정
	,setMyNews:function(){
		var $bg=$("#smn_bg")
			,$box=$("#smn_box")
			,$boxes=$bg.add($box)
			,$section=$box.find("#sb_sections")
			,$mynewsa=$("#my_news_a");

		function selectedCode(){		// 저장된 코드 선택되게		
			$box.find(".sb_chk").prop("checked",false).parent("label").removeClass("on"); // 우선 초기화

			var code=mUtil.localStorage.getItem("mynews_code");
			if(!code) return false;
			
			var cArr=code.split(","), selectors=[];
			for(var i=0,len=cArr.length;i<len;i++) selectors.push(".sb_chk[value='"+cArr[i]+"']");

			$box.find(selectors.join(",")).prop("checked",true).parent("label").addClass("on");
		}

		// 섹션리스트 보이기
		$("#set_my_news").click(function(){
			$boxes.addClass("show");
			selectedCode();

			return false;
		});

		// 섹션리스트 닫기
		$box.find(".sb_close").click(function(){
			$boxes.removeClass("show");
			//location.href=$mynewsa.attr("href");
			return false;
		});

		// 저장
		$box.find(".sb_submit").click(function(){
			var vals=$box.find(".sb_chk:checked").map(function(){ return this.value; }).get().join(",");
			
			mUtil.localStorage.setItem("mynews_code",vals);
			mUtil.setMyNewsLink($mynewsa);

			alert("저장하였습니다.");
			location.href=$mynewsa.attr("href");
			return false;
		});

		// 체크박스 이벤트
		$box.on("change",".sb_chk",function(){
			$(this).parent("label")[(this.checked?"addClass":"removeClass")]("on");
		});

		// 섹션 가져오기
		$.get(	"/"
				,{mod:"news",act:"axSectionList"}
				,function(data,rst){
					if(rst=="success"){
						var dt=data['0'],arr=[];
						for(var len=dt.length,i=0;i<len;i++){
							var d=dt[i]
								,code=d.code
								,name=decodeURIComponent(d.name)
								,state=d.state;
							if(state=="N" || $.inArray(code,["2000000000","1449643817","1449648265","1457677212"])>=0) continue;

							arr.push('<label class="sb_label"><input type="checkbox" name="sb_chk" value="'+code+'" class="sb_chk" /> '+name+'</label>');							
						}
						
						if(arr.length<=0) return false;

						$section.html(arr.join("\n"));			// 뿌리고

						selectedCode();							// 선택되게
							
					}else alert(lang.axError);
				},"json");
		
		// 로컬스토리지 다중 섹션 링크 생성
		//mUtil.setMyNewsLink($mynewsa);
	}

	// 현재시간 필드에 입력
	,inputCurrentTime:function(input,target){
		if(!input || !target) return false;
		var parents=this,$input=$(input);
		$(target).click(function(){
			$input.val(parents.getCurrentDateTime("string"));
			return ;
		});
	}

	// target 중 url 패턴이 있다면 a 태그로 변환
	,strToLinkTag:function(target){
		if(!target) return false;

		var $target=$(target)
			,html=$target.html()
			,urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/ig
			,template=util.getCookie("template");			// mobie?

		if(!html) return false;

		var rst=html.replace(urlPattern, function(a,b,c,d,e,f){
			var url=template=="m"?a.replace(DOMAIN, M_DOMAIN):a;
			return 	'<a href="'+url+'" target="_blank" class="ra">'+a+'</a>';
		});

		$target.html(rst);
		
		return this;
	}

	
	
};




/**********************************************************************************************************************************************************/
/* pc & mobile 공통사용 */
/**********************************************************************************************************************************************************/


/*****************************************************************************
기사 댓글
*****************************************************************************/
var articleReply={
	vars:{
		useCaptcha : "Y"												// 캡챠 사용여부 (Y:사용, N:사용안함)
		,recomLogin : "N"												// 추천 / 반대 로그인제인지 아닌지? (default : N 비회원)
		,limitContent : 400												// 댓글 글자수 제한 (default 400)
		,loginId : false												// 로그인한 user_id 
		,isManager : false												// 게시물관리자인가?
		,tmpPass : ""													// 비번 임시
		,captchaTag : ""												// 캡챠 스크립트
		,$content : null												// 수정시 감춘 블럭
		,buttonsTag : null												// 수정삭제 버튼
		,write:{
			$area : null												// 글쓰기 원래 폼
			,$form : null												// 옮겨다닐 객체 덩어리
			,$captcha : null											// 캡챠 붙일영역
			,$passBox : null											// 비번 박스
		}
	}

	// 링크로 들어온 댓글 표시
	,mark:function()
	{
		var hash = location.hash;
		if(!hash || hash.search(/^#re_/)!==0) return false;
		var $hashObj = $(hash).addClass("mark")
			,si = setTimeout(function(){
			$hashObj.removeClass("mark");
			clearTimeout(si);
		},5000);
	}

	// 전체선택
	,evtClickedAllCheck:function()
	{
		var $checkboxes = null;
		$(document.body).on("click", ".arl_reply_btn_all_select", function(){
			var $target = $("#article_reply_form").find("input[name='re_idxno[]']");
			//	,$checked = $target.filter(":checked")
			//	,$notChecked = $target.not($checked);
			
			//if($checked.length>0) $checked.prop("checked", false);
			//$notChecked.prop("checked", true);
			
			if($checkboxes===null){ $checkboxes = $(".arl_reply_btn_all_select"); }			
			$checkboxes.toggleClass("on");
			
			$target.click();
		});
	}
	
	// 댓글 리스트에서 삭제 전송
	,submitFromList:function(form)
	{
		if(!window.confirm(lang.confirmDelete)) return false;
		
		var $checked = $(form).find("input[name='re_idxno[]']:checked");
		
		if($checked.length<=0){
			alert(lang.articleReplyRequireChecked);
			return false;
		}
		return true;
	}
	
	// 댓글 리스트에서 삭제
	,evtDelete:function(mod,act)
	{
		if(!mod) mod="news";
		if(!act) act="replyAllDlt";
		$(".arl_reply_btn_delete").click(function(){
			if(!window.confirm(lang.confirmDelete)) return false;
			var form = util.createHiddenForm({mod:mod,act:act,re_idxno:(this.getAttribute("data-idxno")||"")}, {method:"post", action:"/?dummy="+mod+"-"+act});
			document.body.appendChild(form);
			form.submit();
		});
	}
	
	// 기사내 댓글 등록
	,submitFromView:function(form)
	{
		var _act = form.act.value;

		if(_act==="replyCrt" && form.name && !$.trim(form.name.value)){
			alert(lang.validRequireName);
			form.name.focus();
			return false;
		}
	
		if(!this.vars.loginId && form.password && !form.password.value){
			alert(lang.validRequirePassword);
			form.password.focus();
			return false;
		}
		
		if(form.content && !$.trim(form.content.value)){
			alert(lang.validRequireContent);
			form.content.focus();
			return false;
		}

		// 캡챠 사용일 경우
		if(this.vars.useCaptcha=="Y" && form.auth_captcha){
			if(!form.auth_captcha.value){
				alert(lang.validRequireCaptcha);
				form.auth_captcha.focus();
				return false;
			}
			
			// 캡챠 확인
			if(form.auth_captcha && util.isCorrectCaptcha(form.auth_captcha.value)!==true){
				form.auth_captcha.value="";
				form.auth_captcha.focus();
				return false;
			}		
		}
		
		// 글자수 제한
		if(util.isLimitChar(form.content.value, this.vars.limitContent)===false){
			if(!window.confirm(lang.validConfirmLimitDataDownsize)) return false;			
			util.applyLimitContent(form.content, form.content.value, this.vars.limitContent);
		}
	
		// 전송
		var links =  $(form).serialize()
			,params = util.linkToJson(links)
			,act = params['act']
			,parents = this
			,_$start = null			
			,articleIdxno = params['article_idxno']
			,parentIdxno = params['parent_idxno']||""
			,grp = params['grp']||""
			//,thread = params['thread']||"0"
			,_encodeEmail = util.replaceEncodeBlank(params['email'])||""
			,_encodeName = util.replaceEncodeBlank(params['name'])||""
			,_encodeContent = util.replaceEncodeBlank(params['content'])||""
			,email = util.replaceHtmlTag(decodeURIComponent(_encodeEmail)||"")
			,name = util.replaceHtmlTag(decodeURIComponent(_encodeName)||"")
			,content = util.replaceHtmlTag(decodeURIComponent(_encodeContent)||"").replace(/\n/g,"<br />");			//  인코딩 + 는 공백이기에 공백인코딩문자로 교체->decodeURIComponent->태그<,>치환
		
		// 다음단계 돌면서 같은레벨의 끝 찾기 - thread하나로 찾아야 하기에 넘어온 thread값보다 같거나 큰것이 있다면 거기에 덧붙인다.
		// _$start : 함수내 광역변수? - scope 범위 때문에 여기에 선언
		function untilSameStep(grp, step, thread){
			if(!_$start) return false;
			
			thread = parseInt(thread, 10);
			var selector = "[data-grp='"+grp+"']" //[data-thread='"+thread+"'] [data-step='"+step+"']
				,$dummy = _$start.next(selector)
				,_thread = parseInt($dummy.attr("data-thread")||0, 10);
		
			if(_thread >= thread){
				_$start = $dummy;
				untilSameStep(grp, step, thread);
			}	
		}
		// --- end function
		
		if(!articleIdxno) return false;
		
		// serialize 인코딩 문제 처리 (공란이 +로 바뀌는 문제)
		params["name"] = _encodeName;
		params["email"] = _encodeEmail;
		params["content"] = _encodeContent;
		
		$.post(	"/"
				,params
				,function(data, rst){
					if(rst=="success"){
						// 선거실명인증 등록을 한 경우 -- @update 이정연 수정 
						if(data.result == "election"){
							var rData = data.data[0]
										,rIdxno = rData.idxno
										,rUserId = rData.user_id

							// @update 2018/05/24
							// 페이지 이동 
							top.location.href = '/?mod=addon&act=index&ext_mod=election&ext_act=proc&rpgb=C&uni_idxno=' + rIdxno + '&user_id=' + rUserId;
							
							/* 팝업창 
							var electionWin = window.open('/?mod=addon&act=index&ext_mod=election&ext_act=proc&rpgb=C&uni_idxno=' + rIdxno + '&user_id=' + rUserId , "electionWindow", "width=600, height=500");
							if(electionWin == null)
							{
								alert("차단된 팝업창을 허용해주세요.");
								return false;
							}
							*/	

						}else if(data.result == "success"){							
							// 새글쓰기
							if(act=="replyCrt"){
								
								var $box = $("#reply_list_box").find(".reply_list")
									,$list = $box.has(".rl_head")
									,$first = $box.filter(":first")																										// 첫번째 행 찾음-여기다 붙임
									,count = $list.length;
								
								if(!count || count<=0){
									location.reload(true);																												// 복사할 객체가 없어 리프레시
									return false;
								}else{
									var rData = data.data[0]
										,rIdxno = rData.idxno
										,rStep = rData.step
										,rUserId = decodeURIComponent(rData.user_id)||""
										,rRegDate = rData.reg_date||""
										,rRegIp = rData.reg_ip||""
										,rGrp = rData.grp||""
										,rThread = rData.thread||"0"
										,stepClass = "reply_list_step_"+rThread
										,rPositionName = "re_"+rIdxno
										,$clone = $list.filter(":first").find("#reply_form").remove().end().clone()
										,removeClassName  = $clone.attr("class").replace(/(.*)(?:)reply_list_step_(\d)\s(.*)/i,"$2")||"0"
										,iconImg = PH_DOMAIN+"/other/member_icon/"+rUserId+".jpg"; 
	
									rRegIp = (parents.vars.isManager===true?rRegIp:util.convertIp(rRegIp));																	// 아이피 *로 교체
									
									$clone.attr({"id":rPositionName, "data-idxno":rIdxno, "data-grp":rGrp, "data-step":rStep, "data-thread":rThread, "data-user-id":rUserId}).removeClass("reply_list_step_"+removeClassName).addClass(stepClass)			// 첫번째 것이니 step class가 0이다.
									.find(".rl_position").attr("name", rPositionName)
									.end().find(".rl_to_reply")[(rThread>0?"addClass":"removeClass")]("rl_arrow")
									.end().find(".rl_icon_img").show().attr("src", iconImg)
									.end().find(".rl_name").html(name)
									.end().find(".rl_user_id").text(rUserId?"("+(parents.vars.isManager===true||(rUserId&&parents.vars.loginId==rUserId)?rUserId:util.convertStr(rUserId))+")":"")
									.end().find(".rl_email").html((parents.vars.isManager===true||(rUserId&&parents.vars.loginId==rUserId)?email:""))
									.end().find(".rl_date").text(rRegDate)
									.end().find(".rl_reg_ip").text("("+rRegIp+")")
									.end().find(".rl_content").html(content)
									.end().find(".rl_vote_positive_number").text("0")
									.end().find(".rl_vote_negative_number").text("0");
									
									// 글등록은 본인이 하는 것이어서 수정/삭제 버튼 붙이기
									var $buttons = $clone.find(".reply_btn_delete");
									if($buttons.length<=0){
										$clone.find(".reply_buttons").prepend(parents.vars.buttonsTag);
									}
									
									// 댓글의 댓글임 - 삽입할 위치 찾음 
									if(parentIdxno){	
										var $target = $box.filter("[data-idxno='"+parentIdxno+"']");
										
										// 뺑뺑이 돌면서, 붙일 객체의 마지막을 찾음(step만으로 찾으려니 ㅡㅡ;)
										_$start = $target;
										untilSameStep(grp, rStep, rThread);
										$target = _$start;				
										
										$clone.insertAfter($target);
										$boxPosition = $target.next();																								// 글 덧붙인 위치로 이동
									}			
									// 그냥 댓글
									else{																			
										$clone.insertBefore($first);
										$boxPosition = $first.prev();
									}
									
									parents.scrollCurrentPosition($boxPosition, 50);	
								}								
							}
							// 수정
							else if(act=="replyUpt") parents.vars.$content.html(content);
						
							parents.initReplyForm();																								// 폼 초기화-제 위치로 
							
						}else alert(decodeURIComponent(data.msg));
					}else alert(lang.axError);
				},"json");
		
		return false;
	}				
	
	// 글자수 표시
	,displayCharLength:function()
	{
		util.evtDisplayCharLength($("#reply_write_content"), $("#reply_content_limit"), this.vars.limitContent);
	}
	
	/**
	 * 여기부터는 기사내 댓글쓰고,삭제,수정
	 */

	// 글쓰기 객체, 기본 가져가야할 값 
	,init:function()
	{
		this.vars.write = {
							$area:$("#reply_write_form")
							,$form:$("#reply_form")
							,$captcha:$("#reply_write_capcha_box")
							,$passBox:$("#reply_password_box")
						  };
		
		// 로그인 상태인가? - 로그인 되어 있다면 비번 입력 감춰라
		this.vars.loginId = document.reply_form.user_id.value;
		if(this.vars.loginId) $(".reply_write_password_box").hide();
	
		// 캡챠 : 태그, event
		this.vars.captchaTag = util.captchaTag(DOMAIN);
		util.evtCaptchaReload(DOMAIN);
		
		// 수정 삭제 버튼
		this.vars.buttonsTag = '<a href="javascript:void(0);" class="btn_bullet btn_bullet_0_60 c_tooltip reply_btn_delete" title="'+lang.delte+'"></a>&nbsp;'
							 + '<a href="javascript:void(0);" class="btn_bullet btn_bullet_0_630 c_tooltip reply_btn_modify" title="'+lang.modify+'"></a>';
		
		// @electionModel 
		// 선거실명인증 전송시 
		$("#btn_regist_election, #btn_regist_normal").click(function(){
			var form = document.reply_form;
			form.election_type.value = (this.id=="btn_regist_election" ? "R" : "");
		});
	}
	
	// 폼 초기화
	,initForm:function()
	{
		var $form = this.vars.write.$form;
		
		if(this.vars.$content) this.vars.$content.show();
		this.vars.$content = null;																		// 수정폼 초기화
		
		$form.find("#reply_clone_box").removeClass("reply_list_step_1")
		.end().find("input[name='act']").val("replyCrt")
		.end().find("input[name='idxno']").val("")
		.end().find("input[name='parent_idxno']").val("")
		.end().find("input[name='grp']").val("")
		.end().find("input[name='step']").val("")
		.end().find("input[name='thread']").val("")
		.end().find("#reply_write_content").val("")
		.end().find("#reply_content_limit").text("0 / "+this.vars.limitContent)
		.end().find(".reply_write_modify_hide").show()
		.end().find("#reply_write_name").val($form.find("input[name='ss_user_name']").val()||"")
		.end().find("#reply_write_email").val($form.find("input[name='ss_email']").val()||"")
		.end().find(".reply_write_password_box")[this.vars.loginId?"hide":"show"]()
		.end().find("#reply_write_password").val("")
		.end().find("#reply_write_capcha_box").hide().empty()
		.end().find("#reply_btn_cancel, #reply_btn_parent_box").hide()
		.end().find("#btn_regist_normal").text("비실명등록").prev("#btn_regist_election").show();
		
		if(util.vars.areaHeight) $form.find("#reply_write_content").height(util.vars.areaHeight);		// 기본 default height
		
		util.evtPlacehoder();
		return $form;
	}
	
	// 원위치
	,initReplyForm:function(parents)
	{
		var _this = (this||parents);
		_this.initForm().appendTo(_this.vars.write.$area);
	}
	
	// 댓글에 댓글에서 취소 클릭시 원래 위치로 이벤트
	,evtInitReplyForm:function()
	{
		var parents = this;
		 $(document.body).on("click", "#reply_btn_cancel, #reply_btn_parent_box", function(){
			if(this.id==="reply_btn_parent_box"){
				location.href="#reply_write_form";
				//parents.scrollCurrentPosition(parents.vars.write.$area, -20);
			}
			parents.initReplyForm(parents);
		}); 
	}
		
	// textarea 클릭시 캡챠 보이게
	,showCaptcha:function()
	{
		var parents = this
			,use = this.vars.useCaptcha;
		
		if(use == "Y" && document.getElementById("reply_write_capcha_box")){
			$(document.body).on("focus", "#reply_write_content", 
								function(){
									// 글 등록일때, 캡챠영역이 있을때, 캡챠이미지가 없을때만 나옴(관리자는 안나옴)
									if(/*document.reply_form.act.value != "replyCrt" ||*/
										parents.vars.write.$captcha.find("#captcha_img").length>0) return false;												
				
									parents.vars.write.$captcha.show().html(parents.vars.captchaTag.replace("[--dummy--]", Math.random()));
								});
		}
	}
	
	// 등록,삭제 권한 msg
	,comparekWriteIdToLoginId:function(userId)
	{
		// 관리자가 아니라면 체크
		if(!this.vars.isManager){
			if((this.vars.loginId && userId) && this.vars.loginId!==userId){
				alert(lang.compareRequireNotSameId);
				return false;
			}
			
			if(userId && !this.vars.loginId){
				alert(lang.validRequireFillId);
				return false;
			}
		}
		return true;
	}
	
	// 비번 박스 붙임
	,displayPasswordBox:function($target, idxno)
	{
		if(!idxno || !$target) return false;
		
		var $box=this.vars.write.$passBox
			,width=$box.width()
			,pos = $target.position()
			,top = pos.top
			,left = pos.left
			,l=left-width+10;
		
		$box.show().css({top:top+"px", left:(l<=0?0:l)+"px"}).data({"data-idxno":idxno}).find("#reply_tmp_password").val("").focus();	
	}
	
	// 비번 입력 이벤트
	,evtInputPassword:function()
	{
		var parents = this
			,$input = $("#reply_tmp_password");
		
		$("#dummy_reply_password_form").on("submit", function(){
			var value = $input.val();
			if(!value){
				alert(lang.validRequirePassword);
				$input.focus();
				return false;
			}
			
			// 전송
			var idxno = parents.vars.write.$passBox.data("data-idxno")||""
				,$parent = $("#re_"+idxno)
				,articleIdxno = document.reply_form.article_idxno.value;
			
			parents.submitDelete($parent, articleIdxno, idxno, value);
			
			return false;
		});
		
		// 닫기 
		$("#reply_btn_tmp_password_close").on("click", function(){
			parents.vars.write.$passBox.fadeOut("fast");
		});
	}
	
	// 삭제 전송
	,submitDelete:function($parent, articleIdxno, idxno, password)
	{
		var parents = this;
		$.post(	"/"
				,{mod:"news", act:"replyDlt", article_idxno:articleIdxno, "re_idxno[]":[idxno], password:password}
				,function(data,rst){
					if(rst == "success"){
						if(data.result == "success"){
							$parent.fadeOut("fast", function(){$(this).remove();});
							if(parents.vars.write.$passBox) parents.vars.write.$passBox.hide();														// 비번박스 안보이게
							
							var $cTotal = $("#reply_total")
								,total = (Number($cTotal.text())||1)-1;
							$cTotal.text(total);
						}else if(data.result == "reload"){																							// 하위에 댓글에 댓글이 남아있다면 문구 남김
							$parent.html(decodeURIComponent(data.msg));												
						}else alert(decodeURIComponent(data.msg));											
					}else alert(lang.axError);											
				},"json");
	}
	
	// 기사내 댓글 삭제
	,evtDeleteFromArticleView:function()
	{
		var parents = this;
		$(document.body).on("click", ".reply_btn_delete", 
							function(){
								var $this = $(this)
									,$parent = $this.closest(".reply_list")
									,articleIdxno = document.reply_form.article_idxno.value
									,idxno = $parent.attr("data-idxno")||""
									,userId = $parent.attr("data-user-id")||"";
								
								// 권한 체크
								if(parents.comparekWriteIdToLoginId(userId)===false) return false;
								
								// 관리자가 아니고, 글 등록한 아이디가 없다면 비번으로 등록한 글이니 비번 입력 필드 노출
								if(!parents.vars.isManager){
									if(!userId){
										parents.displayPasswordBox($this, idxno);
										return false;
									}									
								}else{
									// 글등록한 아이디가 있더라도 관리자라면,
									if(parents.vars.loginId){
										if(!window.confirm(lang.confirmDelete)) return false;
									}
								}
								
								parents.submitDelete($parent, articleIdxno, idxno, "");
							});
	}
	
	// 기사내 댓글 수정
	,evtModifyFromArticleView:function()
	{
		var parents = this;
		$(document.body).on("click", ".reply_btn_modify", 
				function(){
					var $this = $(this)
						,$parent = $this.closest(".reply_list")
						,idxno = $parent.attr("data-idxno")||""
						,userId = $parent.attr("data-user-id")||""
						,$content = $parent.find(".rl_content")
						,content = $.trim($content.text())
						,$form = parents.initForm();
					
					// 권한 체크
					if(parents.comparekWriteIdToLoginId(userId)===false) return false;
					
					if(!idxno) return false;
					parents.vars.$content = $content.hide();
				
					$form.find("input[name='act']").val("replyUpt")
					.end().find("input[name='idxno']").val(idxno)
					.end().find("#reply_write_content").val(content)
					.end().find(".reply_write_modify_hide").hide()
					.end().find("#reply_write_name").val("dummy")																	// js에러만 안나게 dummy 어차피 있어도 갱신안됨
					.end().find(".reply_write_password_box")[(parents.vars.isManager!==true && !userId?"show":"hide")]()			// 관리자가 아니고 등록자 아이디가 없을때는 비번 입력폼 나옴
					.end().find("#reply_btn_cancel, #reply_btn_parent_box").show(1,
					function(){
						// 수정일때는 "저장"으로 바꿈
						if(this.id != "reply_btn_cancel") return false;
						var $this = $(this);
						$this.prev("#btn_regist_normal").text(lang.save).prev("#btn_regist_election").hide();
					})
					.end().insertAfter($content);
					
					parents.scrollCurrentPosition($parent);	
				});
	}
	
	// 기사내 댓글의 댓글 등록
	,evtWriteFromArticleView:function()
	{
		var parents = this;
		$(document.body).on("click", ".reply_btn_write", 
				function(){
					var $this = $(this)
						,$parent = $this.closest(".reply_list")
						,idxno = $parent.attr("data-idxno")
						,grp = $parent.attr("data-grp")
						,step = $parent.attr("data-step")
						,thread = $parent.attr("data-thread")
						,$form = parents.initForm();
					
					if(!idxno) return false;
				
					if(Number(thread)>15){
						alert(lang.articleReplyRequireReplyDepth);
						return false;
					}
				
					$form.find("#reply_clone_box").addClass("reply_list_step_1")	// 이것보다 한단계 들여쓰기
					.end().find("input[name='act']").val("replyCrt")
					.end().find("input[name='parent_idxno']").val(idxno)
					.end().find("input[name='grp']").val(grp)
					.end().find("input[name='step']").val(step)
					.end().find("input[name='thread']").val(thread)
					.end().find("#reply_btn_cancel, #reply_btn_parent_box").show()
					.end().appendTo($parent);
					
					parents.scrollCurrentPosition($parent);	
				});
	}
	
	// 댓글신고
	,evtSingoFromArticleView:function()
	{
		if(M_DOMAIN.indexOf(location.host)>=0) return false; // kimyh 2015.03.24 모바일에서 실행안함

		var parentLayer = editSortable
			,width = 650
			,height = 650;
		$(document.body).on("click",".reply_btn_singo",
							function(){
								var url = util.replaceURLToUser(this.href)
									,html = parentLayer.replaceLayerHtmlTag(parentLayer.vars.layerBoxIframe, lang.close, url, (height-60))
									,output = "";
								output = $(html).find(".edit_layer_close").click(parentLayer.closeEditLayer).end();
								util.floatLayer(width,height,output);	// layer 띄우기
								
								return false;
							});
	}
	
	// 댓글신고 전송
	,submitSingo:function(form)
	{
		if(!form.name.value){
			alert(lang.validRequireName);
			form.name.focus();
			return false;
		}
		
		if(!form.email.value){
			alert(lang.validRequireEmail);
			form.email.focus();
			return false;
		}
		
		return true;
	}
	
	// 스크롤 위치로~
	,scrollCurrentPosition:function($target, interval)
	{
		try{
			var top = $target.position().top
			,scrollTop = (document.documentElement.scrollTop||document.body.scrollTop)
			,mark = (scrollTop-top) > -70 ? "-":"+";																							// 갭차이가 70보다작으면 위로 이동/크면 아래로 이동
			evt.scrollToTop((!interval?Number(mark+""+10):interval), scrollTop+(top-scrollTop));
		}catch(e){}
	}
	
	// 추천 반대
	,evtPositiveNegative:function()
	{
		var parents = this
			,articleIdxno = document.reply_form.article_idxno.value;
		
		$(document.body).on("click", ".rl_vote_btn_positive, .rl_vote_btn_negative"
							,function(e){
								var $this = $(this)
									,$parent = $this.closest(".reply_list")
									,idxno = $parent.attr("data-idxno")
									,userId = $parent.attr("data-user-id")
									,mode = this.className.indexOf("rl_vote_btn_positive")>=0 ? "rec" : "opp"
									,numberPlace = ".rl_vote_positive_number"
									,act = "replyVoted";
									
								if(mode !== "rec") numberPlace = ".rl_vote_negative_number";
								
								// 관리자는 통과 *** 주석
								//if(parents.vars.isManager===false){
									if(parents.vars.recomLogin==="Y" && !parents.vars.loginId){
										alert(lang.validRequireId);
										return false;
									}
									
									if(parents.vars.loginId && userId && parents.vars.loginId===userId){
										alert(lang.articleReplyRequireSameNotClicked);
										return false;
									}
								//}
								
								$.post(	"/"
										,{mod:"news", act:act, article_idxno:articleIdxno, idxno:idxno, recommend:mode}
										,function(data, rst){
											if(rst === "success"){
												if(data.result==="success") $this.find(numberPlace).text(data.data[0].count);
												else util.toast(decodeURIComponent(data.msg||""));
											}else alert(lang.axError);
										},"json");
							});
	}
	
	// 차단
	,evtClickedIntercept:function(target)
	{
		var params = {rule:"newsReply"};
		bbsCfg.evtClickedIntercept(target, params);
	}
};

/*****************************************************************************
게시판 댓글 - articleReply base...
*****************************************************************************/
var bbsReply={
	vars:{
		useCaptcha : "Y"												// 캡챠 사용여부 (Y:사용, N:사용안함)
		,recomLogin : "N"												// 추천 / 반대 로그인제인지 아닌지? (default : N 비회원)
		,limitContent : 400												// 댓글 글자수 제한 (default 400)
		,loginId : false												// 로그인한 user_id 
		,isManager : false												// 게시물관리자인가?
		,tmpPass : ""													// 비번 임시
		,captchaTag : ""												// 캡챠 스크립트
		,$content : null												// 수정시 감춘 블럭
		,buttonsTag : null												// 수정삭제 버튼
		,csortKey : null												// 추천수 보기일때 (=v)
		,write:{
			$area : null												// 글쓰기 원래 폼
			,$form : null												// 옮겨다닐 객체 덩어리
			,$captcha : null											// 캡챠 붙일영역
			,$passBox : null											// 비번 박스
		}
	}

	// 링크로 들어온 댓글 표시
	,mark:function()
	{
		articleReply.mark();
	}
		
	// 게시판 댓글 등록
	,submitFromView:function(form)
	{
		var _act = form.act.value;
		if(_act==="commentCrt" && form.name && !$.trim(form.name.value)){
			alert(lang.validRequireName);
			form.name.focus();
			return false;
		}
	
		if(!this.vars.loginId && form.password && !form.password.value){
			alert(lang.validRequirePassword);
			form.password.focus();
			return false;
		}
		
		if(form.content && !$.trim(form.content.value)){
			alert(lang.validRequireContent);
			form.content.focus();
			return false;
		}

		// 캡챠 사용일 경우
		if(this.vars.useCaptcha=="Y" && form.auth_captcha){
			if(!form.auth_captcha.value){
				alert(lang.validRequireCaptcha);
				form.auth_captcha.focus();
				return false;
			}
			
			// 캡챠 확인
			if(form.auth_captcha && util.isCorrectCaptcha(form.auth_captcha.value)!==true){
				form.auth_captcha.value="";
				form.auth_captcha.focus();
				return false;
			}		
		}
		
		// 글자수 제한
		if(util.isLimitChar(form.content.value, this.vars.limitContent)===false){
			if(!window.confirm(lang.validConfirmLimitDataDownsize)) return false;			
			util.applyLimitContent(form.content, form.content.value, this.vars.limitContent);
		}
				
		// 새글쓰기이고,
		if(!form.comment_idxno.value && !form.parent_idxno.value){
			var csortKey= form.csort_key.value
				,cpage = form.cpage.value;
			
			//추천순보기일때 - 마지막 페이지 보내기 위해
			//등록순보기일때 - 첫페이지로 보내기 위해
			if(csortKey==="v" || ((!csortKey||csortKey==="r") && (cpage&&cpage!="1"))) return true;
		}
				
		// 전송
		var links =  $(form).serialize()
			,params = util.linkToJson(links)
			,act = params['act']
			,parents = this
			,_$start = null			
			,bbsIdxno = params['bbs_idxno']
			,parentIdxno = params['parent_idxno']||""
			,grp = params['grp']||""
			//,thread = params['thread']||"0"
			,_encodeEmail = util.replaceEncodeBlank(params['email'])||""
			,_encodeName = util.replaceEncodeBlank(params['name'])||""
			,_encodeContent = util.replaceEncodeBlank(params['content'])||""
			,email = util.replaceHtmlTag(decodeURIComponent(_encodeEmail)||"")
			,name = util.replaceHtmlTag(decodeURIComponent(_encodeName)||"")
			,content = util.replaceHtmlTag(decodeURIComponent(_encodeContent)||"").replace(/\n/g,"<br />");			//  인코딩 + 는 공백이기에 공백인코딩문자로 교체->decodeURIComponent->태그<,>치환
		
		// 다음단계 돌면서 같은레벨의 끝 찾기 - thread하나로 찾아야 하기에 넘어온 thread값보다 같거나 큰것이 있다면 거기에 덧붙인다.
		// _$start : 함수내 광역변수? - scope 범위 때문에 여기에 선언
		function untilSameStep(grp, step, thread){
			if(!_$start) return false;
			
			thread = parseInt(thread, 10);
			var selector = "[data-grp='"+grp+"']" //[data-thread='"+thread+"'] [data-step='"+step+"']
				,$dummy = _$start.next(selector)
				,_thread = parseInt($dummy.attr("data-thread")||0, 10);
		
			if(_thread >= thread){
				_$start = $dummy;
				untilSameStep(grp, step, thread);
			}	
		}
		// --- end function
		
		if(!bbsIdxno) return false;
		
		// serialize 인코딩 문제 처리 (공란이 +로 바뀌는 문제)
		params["name"] = _encodeName;
		params["email"] = _encodeEmail;
		params["content"] = _encodeContent;
		
		$.post(	"/"
				,params
				,function(data, rst){
					if(rst=="success"){
						// 선거실명인증 등록을 한 경우 -- @update 이정연 수정 
						if(data.result == "election"){
							var rData = data.data[0]
										,rIdxno = rData.idxno
										,rUserId = rData.user_id

							// @update 2018/05/24
							// 페이지 이동 
							top.location.href = '/?mod=addon&act=index&ext_mod=election&ext_act=proc&rpgb=B&uni_idxno=' + rIdxno + '&user_id=' + rUserId; 
							
							/* 팝업창 
							var electionWin = window.open('/?mod=addon&act=index&ext_mod=election&ext_act=proc&rpgb=B&uni_idxno=' + rIdxno + '&user_id=' + rUserId , "electionWindow", "width=600, height=500");
							if(electionWin == null)
							{
								alert("차단된 팝업창을 허용해주세요.");								
								return false;
							}	
							*/ 

						}else if(data.result == "success"){
							// 새글쓰기
							if(act=="commentCrt"){
								
								var $box = $("#bbs_cmt_list_box").find(".bbs_cmt_list")
									,$list = $box.has(".bcl_head")
									,$first = $box.filter(":first")																										// 첫번째 행 찾음-여기다 붙임
									,count = $list.length;
								
								if(!count || count<=0){
									location.reload(true);																												// 복사할 객체가 없어 리프레시
									return false;
								}else{
									var rData = data.data[0]
										,rIdxno = rData.idxno
										,rStep = rData.step
										,rUserId = decodeURIComponent(rData.user_id)||""
										,rRegDate = rData.reg_date||""
										,rRegIp = rData.reg_ip||""
										,rGrp = rData.grp||""
										,rThread = rData.thread||"0"
										,stepClass = "bbs_cmt_list_step_"+rThread
										,rPositionName = "re_"+rIdxno
										,$clone = $list.filter(":first").find("#bbs_cmt_form").remove().end().clone()
										,removeClassName  = $clone.attr("class").replace(/(.*)(?:)bbs_cmt_list_step_(\d)\s(.*)/i,"$2")||"0"
										,memIconPath = PH_DOMAIN+"/other/member_icon/"+rUserId+".jpg"; 
									
									rRegIp = (parents.vars.isManager===true?rRegIp:util.convertIp(rRegIp));																	// 아이피 ***로 교체
									
									$clone.attr({"id":rPositionName, "data-idxno":rIdxno, "data-grp":rGrp, "data-step":rStep, "data-thread":rThread, "data-user-id":rUserId}).removeClass("bbs_cmt_list_step_"+removeClassName).addClass(stepClass)			// 첫번째 것이니 step class가 0이다.
									.find(".bcl_position").attr("name", rPositionName)
									.end().find(".bcl_to_reply")[(rThread>0?"addClass":"removeClass")]("bcl_arrow")
									.end().find(".bcl_icon_img").show().attr("src",memIconPath)
									.end().find(".bcl_name").html(name)
									.end().find(".bcl_user_id").text(rUserId?"("+(parents.vars.isManager===true||(rUserId&&parents.vars.loginId==rUserId)?rUserId:util.convertStr(rUserId))+")":"")
									.end().find(".bcl_email").html(parents.vars.isManager===true||(rUserId&&parents.vars.loginId==rUserId)?email:"")
									.end().find(".bcl_date").text(rRegDate)
									.end().find(".bcl_reg_ip").text("("+rRegIp+")")
									.end().find(".bcl_content").html(content)
									.end().find(".bcl_vote_positive_number").text("0")
									.end().find(".bcl_vote_negative_number").text("0");
									
									// 글등록은 본인이 하는 것이어서 수정/삭제 버튼 붙이기
									var $buttons = $clone.find(".bbs_cmt_btn_delete");
									if($buttons.length<=0){
										$clone.find(".bbs_cmt_buttons").prepend(parents.vars.buttonsTag);
									}
									
									// 댓글의 댓글임 - 삽입할 위치 찾음 
									if(parentIdxno){	
										var $target = $box.filter("[data-idxno='"+parentIdxno+"']");
										
										// 뺑뺑이 돌면서, 붙일 객체의 마지막을 찾음(step만으로 찾으려니 ㅡㅡ;)
										_$start = $target;
										untilSameStep(grp, rStep, rThread);
										$target = _$start;				
										
										$clone.insertAfter($target);
										$boxPosition = $target.next();																								// 글 덧붙인 위치로 이동
									}			
									// 그냥 댓글
									else{																			
										$clone.insertBefore($first);
										$boxPosition = $first.prev();
									}
									
									parents.scrollCurrentPosition($boxPosition, 50);	
								}								
							}
							// 수정
							else if(act=="commentUpt") parents.vars.$content.html(content);
						
							parents.initReplyForm();																								// 폼 초기화-제 위치로 
							
						}else alert(decodeURIComponent(data.msg));
					}else alert(lang.axError);
				},"json");
		
		return false;
	}				
	
	// 글자수 표시
	,displayCharLength:function()
	{
		util.evtDisplayCharLength($("#bbs_cmt_write_content"), $("#bbs_cmt_content_limit"), this.vars.limitContent);
	}
	
	/**
	 * 여기부터는 기사내 댓글쓰고,삭제,수정
	 */

	// 글쓰기 객체, 기본 가져가야할 값 
	,init:function()
	{
		this.vars.write = {
							$area:$("#bbs_cmt_write_form")
							,$form:$("#bbs_cmt_form")
							,$captcha:$("#bbs_cmt_write_capcha_box")
							,$passBox:$("#bbs_cmt_password_box")
						  };
		
		// 로그인 상태인가? - 로그인 되어 있다면 비번 입력 감춰라
		this.vars.loginId = document.bbs_cmt_form.user_id.value;
		if(this.vars.loginId) $(".bbs_cmt_write_password_box").hide();
	
		// 캡챠 : 태그, event
		this.vars.captchaTag = util.captchaTag(DOMAIN);
		util.evtCaptchaReload(DOMAIN);
		
		// 수정 삭제 버튼
		this.vars.buttonsTag = '<a href="javascript:void(0);" class="btn_bullet btn_bullet_0_60 c_tooltip bbs_cmt_btn_delete" title="'+lang.delte+'"></a>'
							 + '<a href="javascript:void(0);" class="btn_bullet btn_bullet_0_630 c_tooltip bbs_cmt_btn_modify" title="'+lang.modify+'"></a>';
		
		// @electionModel 
		// 선거실명인증 전송시 
		$("#btn_regist_election, #btn_regist_normal").click(function(){
			var form = document.bbs_cmt_form;
			form.election_type.value = (this.id=="btn_regist_election" ? "R" : "");
		});
	}
	
	// 폼 초기화
	,initForm:function()
	{
		var $form = this.vars.write.$form;
		
		if(this.vars.$content) this.vars.$content.show();
		this.vars.$content = null;																		// 수정폼 초기화
		
		$form.find("#bbs_cmt_clone_box").removeClass("bbs_cmt_list_step_1")
		.end().find("input[name='act']").val("commentCrt")
		.end().find("input[name='comment_idxno']").val("")
		.end().find("input[name='parent_idxno']").val("")
		.end().find("input[name='grp']").val("")
		.end().find("input[name='step']").val("")
		.end().find("input[name='thread']").val("")
		.end().find("#bbs_cmt_write_content").val("")
		.end().find("#bbs_cmt_content_limit").text("0 / "+this.vars.limitContent)
		.end().find(".bbs_cmt_write_modify_hide").show()
		.end().find("#bbs_cmt_write_name").val($form.find("input[name='ss_user_name']").val()||"")
		.end().find("#bbs_cmt_write_email").val($form.find("input[name='ss_email']").val()||"")
		.end().find(".bbs_cmt_write_password_box")[this.vars.loginId?"hide":"show"]()
		.end().find("#bbs_cmt_write_password").val("")
		.end().find("#bbs_cmt_write_capcha_box").hide().empty()
		.end().find("#bbs_cmt_btn_cancel, #bbs_cmt_btn_parent_box").hide()
		.end().find("#btn_regist_normal").text("비실명등록").prev("#btn_regist_election").show();
		
		if(util.vars.areaHeight) $form.find("#bbs_cmt_write_content").height(util.vars.areaHeight);		// 기본 default height
		
		util.evtPlacehoder();
		return $form;
	}
	
	// 원위치
	,initReplyForm:function(parents)
	{
		var _this = (this||parents);
		_this.initForm().appendTo(_this.vars.write.$area);
	}
	
	// 댓글에 댓글에서 취소 클릭시 원래 위치로 이벤트
	,evtInitReplyForm:function()
	{
		var parents = this;
		 $(document.body).on("click", "#bbs_cmt_btn_cancel, #bbs_cmt_btn_parent_box", function(){
			if(this.id==="bbs_cmt_btn_parent_box"){
				location.href="#bbs_cmt_write_form";
			}
			parents.initReplyForm(parents);
		}); 
	}
		
	// textarea 클릭시 캡챠 보이게
	,showCaptcha:function()
	{
		var parents = this
			,use = this.vars.useCaptcha;
		
		if(use == "Y" && document.getElementById("bbs_cmt_write_capcha_box")){
			$(document.body).on("focus", "#bbs_cmt_write_content", 
								function(){
									// 글 등록일때, 캡챠영역이 있을때, 캡챠이미지가 없을때만 나옴(관리자는 안나옴)
									if(/*document.bbs_cmt_form.act.value != "replyCrt" ||*/
										parents.vars.write.$captcha.find("#captcha_img").length>0) return false;												
				
									parents.vars.write.$captcha.show().html(parents.vars.captchaTag.replace("[--dummy--]", Math.random()));
								});
		}
	}
	
	// 등록,삭제 권한 msg
	,comparekWriteIdToLoginId:function(userId)
	{
		// 관리자가 아니라면 체크
		if(!this.vars.isManager){
			if((this.vars.loginId && userId) && this.vars.loginId!==userId){
				alert(lang.compareRequireNotSameId);
				return false;
			}
			
			if(userId && !this.vars.loginId){
				alert(lang.validRequireFillId);
				return false;
			}
		}
		return true;
	}
	
	// 비번 박스 붙임
	,displayPasswordBox:function($target, commentIdxno)
	{
		if(!commentIdxno || !$target) return false;
		
		if(M_DOMAIN.indexOf(location.host)>=0){	// mobile
			$target.closest(".bcl_head").after(this.vars.write.$passBox.show().data({"data-idxno":commentIdxno}).find("#reply_tmp_password").val("").focus().end())
		}else{
			var pos = $target.position()
				,top = pos.top
				,left = pos.left;
			
			this.vars.write.$passBox.show().css({top:top+"px", left:left+"px"}).data({"data-idxno":commentIdxno}).find("#reply_tmp_password").val("").focus();			
		}		
	}
	
	// 비번 입력 이벤트
	,evtInputPassword:function()
	{
		var parents = this
			,$input = $("#reply_tmp_password");
		
		$("#dummy_reply_password_form").on("submit", function(){
			var value = $input.val();
			if(!value){
				alert(lang.validRequirePassword);
				$input.focus();
				return false;
			}
			
			// 전송
			var commentIdxno = parents.vars.write.$passBox.data("data-idxno")||""
				,$parent = $("#re_"+commentIdxno)
				,bbsId = document.bbs_cmt_form.bbs_id.value;
			
			parents.submitDelete($parent, bbsId, commentIdxno, value);
			
			return false;
		});
		
		// 닫기 
		$("#reply_btn_tmp_password_close").on("click", function(){
			parents.vars.write.$passBox.fadeOut("fast");
		});
	}
	
	// 삭제 전송
	,submitDelete:function($parent, bbsId, commentIdxno, password)
	{
		var parents = this;
		$.post(	"/"
				,{mod:"bbs", act:"commentDlt", bbs_id:bbsId, comment_idxno:commentIdxno, password:password}
				,function(data,rst){
					if(rst == "success"){
						if(data.result == "success"){
							$parent.fadeOut("fast", function(){$(this).remove();});
							if(parents.vars.write.$passBox) parents.vars.write.$passBox.hide();														// 비번박스 안보이게				
							
							var $cTotal = $("#bbs_cmt_total")
								,total = (Number($cTotal.text())||1)-1;
							$cTotal.text(total);
						}else if(data.result == "reload"){																							// 하위에 댓글에 댓글이 남아있다면 문구 남김
							$parent.html(decodeURIComponent(data.msg));												
						}else alert(decodeURIComponent(data.msg));											
					}else alert(lang.axError);											
				},"json");
	}
	
	// 댓글 삭제
	,evtDeleteFromArticleView:function()
	{
		var parents = this;
		$(document.body).on("click", ".bbs_cmt_btn_delete", 
							function(){
								var $this = $(this)
									,$parent = $this.closest(".bbs_cmt_list")
									,bbsId = document.bbs_cmt_form.bbs_id.value
									,commentIdxno = $parent.attr("data-idxno")||""
									,userId = $parent.attr("data-user-id")||"";
								
								// 권한 체크
								if(parents.comparekWriteIdToLoginId(userId)===false) return false;
								
								// 관리자가 아니고, 글 등록한 아이디가 없다면 비번으로 등록한 글이니 비번 입력 필드 노출
								if(!parents.vars.isManager){
									if(!userId){
										parents.displayPasswordBox($this, commentIdxno);
										return false;
									}									
								}else{
									// 글등록한 아이디가 있더라도 관리자라면,
									if(parents.vars.loginId){
										if(!window.confirm(lang.confirmDelete)) return false;
									}
								}
								
								parents.submitDelete($parent, bbsId, commentIdxno, "");
							});
	}
	
	// 기사내 댓글 수정
	,evtModifyFromArticleView:function()
	{
		var parents = this;
		$(document.body).on("click", ".bbs_cmt_btn_modify", 
				function(){
					var $this = $(this)
						,$parent = $this.closest(".bbs_cmt_list")
						,commentIdxno = $parent.attr("data-idxno")||""
						,userId = $parent.attr("data-user-id")||""
						,$content = $parent.find(".bcl_content")
						,content = $.trim($content.text())
						,$form = parents.initForm();
					
					// 권한 체크
					if(parents.comparekWriteIdToLoginId(userId)===false) return false;
					
					if(!commentIdxno) return false;
					parents.vars.$content = $content.hide();
				
					$form.find("input[name='act']").val("commentUpt")
					.end().find("input[name='comment_idxno']").val(commentIdxno)
					.end().find("#bbs_cmt_write_content").val(content)
					.end().find(".bbs_cmt_write_modify_hide").hide()
					.end().find("#bbs_cmt_write_name").val("dummy")																	// js에러만 안나게 dummy 어차피 있어도 갱신안됨
					.end().find(".bbs_cmt_write_password_box")[(parents.vars.isManager!==true && !userId?"show":"hide")]()			// 관리자가 아니고 등록자 아이디가 없을때는 비번 입력폼 나옴
					.end().find("#bbs_cmt_btn_cancel, #bbs_cmt_btn_parent_box").show(1,
					function(){
						// 수정일때는 "저장"으로 바꿈
						if(this.id != "bbs_cmt_btn_cancel") return false;
						var $this = $(this);
						$this.prev("#btn_regist_normal").text(lang.save).prev("#btn_regist_election").hide();
					})
					.end().insertAfter($content);
					
					parents.scrollCurrentPosition($parent);	
				});
	}
	
	// 기사내 댓글의 댓글 등록
	,evtWriteFromArticleView:function()
	{
		var parents = this;
		$(document.body).on("click", ".bbs_cmt_btn_write", 
				function(){
					var $this = $(this)
						,$parent = $this.closest(".bbs_cmt_list")
						,commentIdxno = $parent.attr("data-idxno")
						,grp = $parent.attr("data-grp")
						,step = $parent.attr("data-step")
						,thread = $parent.attr("data-thread")
						,$form = parents.initForm();
					
					if(!commentIdxno) return false;
				
					if(Number(thread)>15){
						alert(lang.articleReplyRequireReplyDepth);
						return false;
					}
				
					$form.find("#bbs_cmt_clone_box").addClass("bbs_cmt_list_step_1")	// 이것보다 한단계 들여쓰기
					.end().find("input[name='act']").val("commentCrt")
					.end().find("input[name='parent_idxno']").val(commentIdxno)
					.end().find("input[name='grp']").val(grp)
					.end().find("input[name='step']").val(step)
					.end().find("input[name='thread']").val(thread)
					.end().find("#bbs_cmt_btn_cancel, #bbs_cmt_btn_parent_box").show()
					.end().appendTo($parent);
					
					parents.scrollCurrentPosition($parent);	
				});
	}
	
	// 댓글신고
	,evtSingoFromArticleView:function()
	{
		var parentLayer = editSortable
			,width = 650
			,height = 650;
		$(document.body).on("click",".bbs_cmt_btn_singo",
							function(){
								var url = util.replaceURLToUser(this.href)
									,html = parentLayer.replaceLayerHtmlTag(parentLayer.vars.layerBoxIframe, lang.close, url, (height-60))
									,output = "";
								output = $(html).find(".edit_layer_close").click(parentLayer.closeEditLayer).end();
								util.floatLayer(width,height,output);	// layer 띄우기
								
								return false;
							});
	}
	
	// 댓글신고 전송
	,submitSingo:function(form)
	{
		if(!form.name.value){
			alert(lang.validRequireName);
			form.name.focus();
			return false;
		}
		
		if(!form.email.value){
			alert(lang.validRequireEmail);
			form.email.focus();
			return false;
		}
		
		return true;
	}
	
	// 스크롤 위치로~
	,scrollCurrentPosition:function($target, interval)
	{
		articleReply.scrollCurrentPosition($target, interval);
	}
	
	// 추천 반대
	,evtPositiveNegative:function()
	{
		var parents = this
			,bbsId = document.bbs_cmt_form.bbs_id.value;
		
		$(document.body).on("click", ".bcl_vote_btn_positive, .bcl_vote_btn_negative"
							,function(e){
								var $this = $(this)
									,$parent = $this.closest(".bbs_cmt_list")
									,commentIdxno = $parent.attr("data-idxno")
									,userId = $parent.attr("data-user-id")
									,type = this.className.indexOf("bcl_vote_btn_positive")>=0 ? "up" : "down"
									,act = "commentVote";
								
								// 관리자는 통과 *** 주석
								//if(parents.vars.isManager===false){
									if(parents.vars.recomLogin==="Y" && !parents.vars.loginId){
										alert(lang.validRequireId);
										return false;
									}
									
									if(parents.vars.loginId && userId && parents.vars.loginId===userId){
										alert(lang.articleReplyRequireSameNotClicked);
										return false;
									}
								//}
								
								$.post(	"/"
										,{mod:"bbs", act:act, bbs_id:bbsId, comment_idxno:commentIdxno, type:type}
										,function(data, rst){
											if(rst === "success"){
												if(data.result==="success"){
													var count = data.data[0];
													$this.find(".bcl_vote_positive_number").text(count.up_count)
													.end().find(".bcl_vote_negative_number").text(count.down_count);
												}else util.toast(decodeURIComponent(data.msg||""));
											}else alert(lang.axError);
										},"json");
							});
	}
	
	// 댓글 아이콘
	,evtErrorLoadMemberIcon:function(target)
	{
		if(typeof target!=="object") target = $(target);
		target.src=PH_DOMAIN+"/other/member_icon/no_icon.png";
		return false;
	}
	
	// 추천수 보기일때 등록폼 아래로
	,moveFormSortV:function()
	{
		if(this.vars.csortKey==="v")
			this.vars.write.$area.appendTo("#bbs_cmt_write_form_clone");
	}
};



/*****************************************************************************
설문조사(vote, poll) 사용자
*****************************************************************************/
var poll={
	vars:{
		isAdmin : false
		,limitContent: 400
		,recomLogin : false									// 로그인한 사람만 댓글 
		,useCaptcha : false									// 캡쳐사용
		,pollIdxno : null									// 게시물
		,loginId : null										// 로그인 사용자
		,state : "D"										// A:진행중 , D:종료 
	}	

	// 로그인 되어 있나?
	,isLogin:function()
	{	
		var element = document.poll_reply_form.user_id;
		if(!element) return false;
		
		return !!(element.value.length||false);
	}
	
	// 투표하기
	,submitPoll:function(form)
	{
		var qType = form.question_type.value
			,answerCount = Number(form.answer_cnt.value)||0
			,questions = form['question_value[]']
			,cnt = questions.length
			,checked = 0;
		
		if(!cnt) cnt = 1;
		
		// 한개 입력창이나 체크/라디오일때는 배열로 안오나 보다 ㅡㅡ;
		for(var i=0; i<cnt; i++){
			if(qType === "T"){					// 주관식
				if((questions[i]||questions).value) checked++;
			}else{
				if((questions[i]||questions).checked===true) checked++;
			}
		}
		
		if(!checked){
			alert(lang.pollRequireWrong);
			return false;
		}
		
		// 복수 응답에 제한이 1 이상이라면
		if(qType==="M" && answerCount>0){
			if(checked>answerCount){
				alert(lang.pollRequireOverMultiAnswers.replace("[]", answerCount));
				return false;
			}
		}		
		
		return true;
	}
	
	// 복수 답변일때 설정된 답변만큼만 선택할수 있게.
	,evtClickedAnswerCount:function()
	{
		try{
			var form = document.poll_form
				,qType = form.question_type.value
				,answerCount = Number(form.answer_cnt.value)||0;
		
			if(qType!=="M" || !answerCount) return false;
			
			var $checkbox = $("#poll_form").find("input[type='checkbox'][name='question_value[]']");
			$checkbox.click("click"
							,function(){
								var len = $checkbox.filter(":checked").length;
								if(len>answerCount){
									if(this.checked){
										alert(lang.pollRequireOverMultiAnswers.replace("[]", answerCount));
										var _this = this;
										setTimeout(function(){ util.releaseCustomInput($checkbox.filter(_this), false); }, 100); // 체크 해제
									//	return false;
									}
								}
							});
		}catch(e){}
	}
	
	// 댓글 본문 클릭시 캡챠 나오게
	,evtClickedContentViewCaptcha:function()
	{
		if(!document.getElementById("poll_reply_write_capcha_box")) return false;
		
		$("#poll_reply_form").on("click","#poll_reply_content",function(){
			if(document.getElementById("captcha_img")) return false;
			if(util.loadCaptcha("poll_reply_write_capcha_box")===false) 
				return false;	
		});		
	}	
	
	// 댓글 달기
	,submitReply:function(form)
	{
		if(form.name){
			if(!form.name.value){
				alert(lang.validRequireNickname);
				form.name.focus();
				return false;
			}
		}
		
		if($(form.password).closest(".poll_reply_write_password_box").css("display")!="none"){
			if(!form.password.value){
				alert(lang.validRequirePassword);
				form.password.focus();
				return false;
			}
		}
		
		if(!form.content.value){
			alert(lang.validRequireContent);
			form.content.focus();
			return false;
		}
		
		if(document.getElementById("poll_reply_write_capcha_box")){
			var captcha = (form.auth_captcha ? form.auth_captcha.value : false);
			if(!captcha){
				alert(lang.validRequireCaptcha);
				if(form.auth_captcha) form.auth_captcha.focus();
				else{
					// 보안 이미지 없다면 재생성
					if(document.getElementById("captcha_img")) return false;
					if(util.loadCaptcha("poll_reply_write_capcha_box")===false) 
						return false;
				}
				return false;
			}
			
			if(util.isCorrectCaptcha(captcha)===false)
				return false;
		}

		return true;
	}
	
	// 댓글 수정
	,submitUptReply:function(form, $form, $hideBox, idxno, userId)
	{
		if(this.submitReply(form)===false) return false;
		if(!idxno) return false;
		
		var parents = this
			,name = form.name.value
			,content = form.content.value
			,auth_captcha = (form.auth_captcha ? form.auth_captcha.value : "")
			,password = "";
		
		if(form.password) password=form.password.value;
		
		$.post(	"/"
				,{mod:"poll",act:"replyUpt",re_idxno:idxno,name:name,content:content,password:password,auth_captcha:auth_captcha}
				,function(data, rst, xhr){
					if(rst === "success"){
						if(data.result==="success"){
							var ssname = $form.find("input[name='ss_nick_name']").val()
								,content = $form.find("#poll_reply_content").val()
								,$list = $("#re_"+idxno)																					// 수정중인 댓글
								,$content = $list.find(".poll_reply_list_content")
								,$buttonBox = $list.find(".poll_reply_btn_box")																// 수정중인 댓글 내용 출력부분 
								,$recomBox = $list.find(".poll_reply_recom_box");
							
							if(parents.vars.isAdmin===true) $list.find(".prl_name").text(name);												// 닉 변경되었다면 변경함 (관리자)
							$content.html(util.replaceNewlineToBr(util.replaceHtmlTag(content)));
							var $convertForm = parents.initForm($form, $content.add($buttonBox).add($recomBox), "replyCrt", "", userId, ssname, "", "hide");	// form reset
							$("#poll_reply_write_box").append($convertForm);
						}else alert(decodeURIComponent(data.msg));
					}else alert(lang.axError);
				},"json");
		
		return false;
	}
	
	// form reset
	,initForm:function($form, $hideBox, act, idxno, userId, name, content, visible)
	{
		var parents = this
			,sId = $form.find("input[name='user_id']").val();
	
		// 기존 수정창 리셑
		if($hideBox!==null){
			$hideBox.show();
			$hideBox = null;
		}	
		
		content = $.trim(content);
		$form.find("input[name='act']").val(act)
		.end().find("#poll_reply_name").val(name)
		.end().find(".poll_reply_name_box")[(this.vars.isAdmin===false && act=="replyUpt"?"hide":"show")]()
		.end().find("#poll_reply_pwd").val("")
		.end().find(".poll_reply_pwd_box")[(this.vars.isAdmin===true || ((act=="replyUpt" && userId && sId===userId) || (act=="replyCrt" && sId))?"hide":"show")]()
		.end().find("#poll_reply_content").val(content)
		.end().find("#poll_reply_write_capcha_box").empty()
		.end().find(".poll_reply_btn_cancel")[visible]()
		.end().find("#poll_reply_limit_char").text(content.length+" / "+this.vars.limitContent);
		
		$form.unbind("submit").removeAttr("onsubmit");																// submit이 여러번 된다.
		if(act=="replyCrt") $form.submit(function(){ return parents.submitReply(this); });
		else if(act=="replyUpt") $form.submit(function(){ return parents.submitUptReply(this, $form, $hideBox, idxno, userId); });
		
		return $form;
	}
	
	// 의견 수정
	,evtClickedModify:function(){
		var parents = this
			,$formBox = $("#poll_reply_write_box")
			,$form = $("#poll_reply_form")
			,sId = $form.find("input[name='user_id']").val()
			,$hideBox = null;
			
		// 클릭 이벤트
		$("#poll_reply_list_box").on("click",".poll_reply_btn_modify",
									function(){
										if(parents.vars.state==="D" && parents.vars.isAdmin === false){
											alert(lang.pollRequireFinished);
											return false;
										}
										
										var $this = $(this)
											,$parent = $this.closest(".poll_reply_list")
											,idxno = $parent.attr("data-idxno")
											,userId = $parent.attr("data-user-id");
										
										if(!idxno) return false;
 										if(parents.vars.isAdmin===false && userId && sId!=userId){
											alert(lang.compareRequireNotSameId);
											return false;
										}
 										 										
 										// 수정창 만들기
 										var name = $parent.find(".prl_name").text()
 											,$content = $parent.find(".poll_reply_list_content")
 											,content =  $content.text()
 											,$buttonBox = $this.closest(".poll_reply_btn_box")
 											,$recomBox = $parent.find(".poll_reply_recom_box");																				

 										// 등록/수정 버튼 안보이게
 										var $convertForm = parents.initForm($form, $hideBox, "replyUpt", idxno, userId, name, content, "show"); 
 										$hideBox = $buttonBox.add($content).add($recomBox).hide();										
 										
										$content.after($convertForm);
										
										// bg placeholder
										util.evtPlacehoder(); 
									})
									// 폼취소버튼
									.on("click",".poll_reply_btn_cancel",
									function(){
										var name = $form.find("input[name='ss_nick_name']").val()
											,$convertForm = parents.initForm($form, $hideBox, "replyCrt", "", "", name, "", "hide");
										
										$formBox.append($convertForm);
										
										// bg placeholder
										util.evtPlacehoder(); 
									});		
	}
	
	// 의견삭제
	,submitReplyDelete:function(params, $obj)
	{
		if(typeof params !== "object") return false;
		params.mod = "poll";
		params.act = "replyDlt";
		$.post(	"/"
				,params
				,function(data,rst){					
					if(rst==="success"){
						if(data.result==="success"){
							$obj.fadeOut(function(){ $(this).remove(); });
						}else alert(decodeURIComponent(data.msg));
					}else alert(lang.axError);
				},"json");		
	}
	
	
	// 의견삭제 - confirm
	,evtClickedDelete:function(){
		var parents = this
			,$pwdBox = $("#poll_reply_password_box")
			,boxWidth = $pwdBox.width()
			,boxHeight = $pwdBox.height()
			,reIdxno = null
			,pollIdxno = null
			,params = null
			,$parent = null;
		
		// 삭제 이벤트
		$("#poll_reply_list_box").on("click",".poll_reply_btn_delete",
									function(){
										if(parents.vars.state==="D" && parents.vars.isAdmin === false){
											alert(lang.pollRequireFinished);
											return false;
										}
										
										var $this = $(this);
										
										$parent = $this.closest(".poll_reply_list");										
										reIdxno = $parent.attr("data-idxno");
										pollIdxno = $parent.attr("data-poll-idxno");
										userId = $parent.attr("data-user-id");
										params = {re_idxno:reIdxno,idxno:pollIdxno, user_id:userId};
										
										if(!reIdxno) return false;
										if(!userId){										// 일반 사용자
											var pos = $this.position()
												,top = pos.top
												,left = pos.left;
											$pwdBox.show().css({top:top+boxHeight,left:left-boxWidth});
										}else{												// 로그인후 사용자
											if(!window.confirm(lang.confirmDelete)) return false;
											parents.submitReplyDelete(params, $parent);
											userId = reIdxno = pollIdxno = params = $parent = null;
										}										
									});	
	
		// 비번 입력시 삭제 이벤트
		var $pwdInput = $("#poll_reply_tmp_password");
		$("#poll_reply_btn_tmp_password").click(function(){
			var value = $pwdInput.val();
			if(!value){
				alert(lang.validRequirePassword);
				$pwdInput.focus();
				return false;
			}
			
			params.password = value;
			parents.submitReplyDelete(params, $parent);	
			userId = reIdxno = pollIdxno=  params = $parent = null;
			$clicked.click();
		});
		
		// 비번 창닫기 이벤트
		var $clicked = $("#poll_reply_btn_tmp_password_close").click(function(){
			$pwdBox.hide();
			$pwdInput.val("");
		});
	}
	
	// 추천반대
	,evtClickedRecomView:function()
	{
		var parents = this
			,pollIdxno = parents.vars.pollIdxno
			,loginId = parents.vars.loginId;
		
		$(document.body).on("click", ".prr_btn_positive, .prr_btn_negative"
							,function(e){
								if(parents.vars.state==="D" && parents.vars.isAdmin === false){
									alert(lang.pollRequireFinished);
									return false;
								}
								
								var $this = $(this)
									,$parent = $this.closest(".poll_reply_list")
									,reIdxno = $parent.attr("data-idxno")
									,userId = $parent.attr("data-user-id")
									,mode = this.className.indexOf("prr_btn_positive")>=0 ? "rec" : "opp"
									,numberPlace = ".prr_positive_number"
									,act = "replyVoted";
									
								if(mode !== "rec") numberPlace = ".prr_negative_number";
								
								// 관리자는 통과 *** 주석
								//if(parents.vars.isAdmin===false){
									/*
									if(parents.vars.recomLogin==="Y" && !loginId){
										alert(lang.validRequireId);
										return false;
									}
									*/
								
									if(loginId && userId && loginId===userId){
										alert(lang.articleReplyRequireSameNotClicked);
										return false;
									}
								//}
								
								$.post(	"/"
										,{mod:"poll", act:act, idxno:pollIdxno, re_idxno:reIdxno, recommend:mode}
										,function(data, rst){
											if(rst === "success"){
												if(data.result==="success") $this.find(numberPlace).text(data.data[0].count);
												else util.toast(decodeURIComponent(data.msg||""));
											}else alert(lang.axError);
										},"json");
							});
	}
	
	// mark
	,mark:function()
	{
		articleReply.mark();
	}
	
	// 글자수 제한
	,evtKeydownCharLimit:function()
	{
		util.evtDisplayCharLength($("#poll_reply_content"), $("#poll_reply_content_limit"), this.vars.limitContent);
	}
	
	// 결과보기 버튼 클릭
	,evtClickedShowResult:function()
	{
		var parents = this
			,$box = $("#poll_view_graph_container");
		$("#poll_view_btn_result").click(function(){
			$box.toggle();
			if($box.css("display")=="block"){
				var graphType = $("#poll_result_table").find("caption").attr("ref")||"bar";
				parents.showGraph(graphType);
			}
		});
	}
	
	// 그래프 보이기
	,showGraph:function(graphType)
	{
		try{
			util.createChart("#poll_result_table",graphType,"x","","","percent");
		}catch(e){
			// IE 8이하는 canvas지원이 되지 않아 일반 그래프로 보여짐
			$(".visualize").remove();
			document.getElementById("poll_view_graph_horizon_box").style.display="block";
		}
	}
	
	// 댓글신고
	,evtClickedSingoReply:function()
	{
		var parentLayer = editSortable
			,width = 650
			,height = 650;
		$(document.body).on("click",".prl_btn_singo",
							function(){
								var url = util.replaceURLToUser(this.href)
									,html = parentLayer.replaceLayerHtmlTag(parentLayer.vars.layerBoxIframe, lang.close, url, (height-60))
									,output = "";
								output = $(html).find(".edit_layer_close").click(parentLayer.closeEditLayer).end();
								util.floatLayer(width,height,output);	// layer 띄우기
								
								return false;
							});
	}
	
	// 댓글 신고 페이지
	,submitSingoReply:function(form)
	{
		if(!form.name.value){
			alert(lang.validRequireName);
			form.name.focus();
			return false;
		}
		
		if(!form.email.value){
			alert(lang.validRequireEmail);
			form.email.focus();
			return false;
		}
		
		return true;
	}
};


///*****************************************************************************
//로그인 객체
//*****************************************************************************/
var login={
		
	validate:function()
	{
		var $userId = $("#user_id")
			,$userPw = $("#user_pw");
		
		if($userId.val() == "")
		{
			alert(lang.loginNotId);
			$userId.focus();
			return false;
		}
		
		if($userPw.val() == "")
		{
			alert(lang.loginNotPw);
			$userPw.focus();
			return false;
		}
		
		return true;
	}
	
	,submit:function()
	{
		if(this.validate()===true)
		{
			document.login_form.submit();
		}
		
		return false;
	}
	
	// 로그아웃 후 이동
	,delayToMove:function(sec)
	{
		if(!sec) sec = 5;
		var $target = $("#logout_interval");
		
		$target.text(sec);
		setInterval(function(){
			$target.text(sec--);
			
			if(sec<=0) location.href=DOMAIN;
		},1000);
	}
	
	// 관리자 로그인 공지사항
	,notice:function()
	{
		$.getJSON("http://www.ndsoft.co.kr/namecheck/notice_new.php?callback=?", {}
			,function(data, result){
				if(result==="success" && data.result){
					$("#aln_box").html(decodeURIComponent(data.result)||"").find("li")
					.addClass(function(i, currentClass){
						switch(i){
							case 0: return "main_bullet mb_0_990";	
							case 1: return "main_bullet mb_0_1013";	
							case 2: return "main_bullet mb_0_1036";	
							case 3: return "main_bullet mb_0_1059";	
							default: return "main_bullet mb_0_1082";	
						}
					});
				}
			});
	}
		
};


/*****************************************************************************
폼양식-구독시청,제휴문의 등... 일반
*****************************************************************************/
var frms={
	loadCaptcha:function()
	{
		var $captchaBox = $("#frm_captcha_box")
			,$required = $("#data_write_form").find("[required='required']:first");
		
		// 첫번째 필수 입력란이 채워지면 보안문자 보임
		$required.blur(function(){
			if(!this.value || document.getElementById("captcha_img")) return false;
			if(util.loadCaptcha("form_write_captcha_box")!==false) $captchaBox.show();
			else return false;
		});				
	}

	// 비번확인
	,submitConfirmPwd:function(form)
	{
		if(!form.user_pw.value){
			alert(lang.loginNotPw);
			form.user_pw.focus();
			return false;
		}
		return true;
	}
};




/*****************************************************************************
picker - datepicker, timepicker
*****************************************************************************/
var picker={
	// 변수
	vars:{}
	
	//timepicker html
	,timePickerHtml:function()
	{
		return '	<div id="time_picker" class="time_picker">'+
						'<div class="tp_box">'+
						'<div id="tp_hour" class="tp_hour">'+
							'<h4>'+lang.hourSubfix+'</h4>'+
							'<div class="tp_hour_data">'+
								'<a href="javascript:void(0)" title="00" class="tp_date_select">00</a>'+
								'<a href="javascript:void(0)" title="01">01</a>'+
								'<a href="javascript:void(0)" title="02">02</a>'+
								'<a href="javascript:void(0)" title="03">03</a>'+
								'<a href="javascript:void(0)" title="04">04</a>'+
								'<a href="javascript:void(0)" title="05">05</a>'+
								'<a href="javascript:void(0)" title="06">06</a>'+
								'<a href="javascript:void(0)" title="07">07</a>'+
								'<a href="javascript:void(0)" title="08">08</a>'+
								'<a href="javascript:void(0)" title="09">09</a>'+
								'<a href="javascript:void(0)" title="10">10</a>'+
								'<a href="javascript:void(0)" title="11">11</a>'+
								'<a href="javascript:void(0)" title="12">12</a>'+
								'<a href="javascript:void(0)" title="13">13</a>'+
								'<a href="javascript:void(0)" title="14">14</a>'+
								'<a href="javascript:void(0)" title="15">15</a>'+
								'<a href="javascript:void(0)" title="16">16</a>'+
								'<a href="javascript:void(0)" title="17">17</a>'+
								'<a href="javascript:void(0)" title="18">18</a>'+
								'<a href="javascript:void(0)" title="19">19</a>'+
								'<a href="javascript:void(0)" title="20">20</a>'+
								'<a href="javascript:void(0)" title="21">21</a>'+
								'<a href="javascript:void(0)" title="22">22</a>'+
								'<a href="javascript:void(0)" title="23">23</a>'+
							'</div>'+
						'</div>'+									
						'<div id="tp_minute" class="tp_minute">'+
							'<h4>'+lang.minuteSubfix+'</h4>'+
							'<a href="javascript:void(0)" title="00" class="tp_date_select">00</a>'+
							'<a href="javascript:void(0)" title="05">05</a>'+
							'<a href="javascript:void(0)" title="10">10</a>'+
							'<a href="javascript:void(0)" title="15">15</a>'+
							'<a href="javascript:void(0)" title="20">20</a>'+
							'<a href="javascript:void(0)" title="25">25</a>'+
							'<a href="javascript:void(0)" title="30">30</a>'+
							'<a href="javascript:void(0)" title="35">35</a>'+
							'<a href="javascript:void(0)" title="40">40</a>'+
							'<a href="javascript:void(0)" title="45">45</a>'+
							'<a href="javascript:void(0)" title="50">50</a>'+
							'<a href="javascript:void(0)" title="55">55</a>'+
						'</div>'+	
					'</div>'+
					'<div class="tp_button">'+
						'<button type="button" id="tp_button" class="btn_bg btn_bg_1030"><span class="btn_bg btn_bg_in">'+lang.add+'</span></button>'+
					'</div>'+
				'</div>';
	}

	// input type에서 해당 요소 지원여부 체크
	,isSupportInputType:function(type)
	{
		var input = document.createElement("input");
		input.setAttribute("type", type);
		return input.type !== "text";
	}
	
	// 시간 나누기
	,divideTime:function(time)
	{
		if(!time) return time;
		
		var tmp = time.split(":");
		return tmp;
	}
	
	// 시간 추출해내기
	,getTime:function(datetime){
		if(!datetime) return datetime;
		var time = datetime.replace(/^\d{4}\-\d{2}\-\d{2} (\d{2}\:\d{2})$/,"$1");
		return $.trim(time);
	}
	
	// 수정시 이미 값이 있다면 이전값 선택되어 질수 있게
	,datePickerBefore:function()
	{
		$("#time_picker").remove();
		$("#tp_hour a, #tp_minute a, #tp_button").unbind("click");
		picker.vars.beforeValue = $.trim($(this).val());
	}
		
	/*시간 선택 picker
	 * args : 
	 *  1. 날짜선택된
	 *  2. target ... 혹시 this 가 없을것을 대비하여.
	 *  3. ...
	 */ 
	,timePicker:function(data)
	{		
		$("#time_picker").remove();		
		var $this = $(this||arguments[1]);
		var html = $.parseHTML(picker.timePickerHtml());
				
		var $pos = $this.offset();
		var $height = parseInt($this.outerHeight())+2
			, $width = parseInt($this.outerWidth())/2
			, $y = parseInt($pos.top) + $height
			, $x = parseInt($pos.left)+$width;
	
		$(html).css({"top":$y, "left":$x}).appendTo("body");
		
		var $obj = $("#time_picker")
			, $timePicker = $("#tp_hour a, #tp_minute a")
			, $button = $("#tp_button");
		
		// 입력창에 값이 있다면, 미리 선택되어 있게.
		var timeStr = "", timeDivide=[];
		if(picker.vars.beforeValue.match(/^\d{4}\-\d{2}\-\d{2} \d{2}\:\d{2}$/))
		{
			timeStr = picker.getTime(picker.vars.beforeValue);			
			$this.val(data+" "+timeStr);
			
			// 리스트에서 선택되게
			timeDivide = picker.divideTime(timeStr);
			if(timeDivide[0]!="00") $("#tp_hour a").removeClass("tp_date_select");
			if(timeDivide[1]!="00") $("#tp_minute a").removeClass("tp_date_select");
			$("#tp_hour a[title='"+timeDivide[0]+"'], #tp_minute a[title='"+timeDivide[1]+"']").addClass("tp_date_select");
						
			delete picker.vars.beforeValue;
		}
		
		// 허공클릭시 레이어 사라지게
		$("body").one("click", function(){
			$timePicker.add($button).unbind("click");
			$obj.remove();
		});
		
		$obj.add($this).click(function(e){
				e.stopPropagation();
		});
	
		// 데이터 클릭시
		$timePicker.click(function(){
			var $parent = $(this).parent();
			$parent.find("a").removeClass("tp_date_select").end().end().addClass("tp_date_select");						// 선택된거 표시
			
			if($parent.attr("id") === "tp_minute") $button.trigger("click");											// 분 클릭시도 입력되게
		});
		
		// 버튼 클릭시...선택된 값 빼오기
		$button.click(function(){
			var $dateValue = $.trim($timePicker.parent().find(".tp_date_select").text());
			if(!$dateValue.match(/^[0-9]{4}/)) {
				alert(lang.tpRequireReselect);
				return false;
			} //-> 1245 이런식으로 빼와야됨
			
			var hour = $dateValue.substr(0, 2)
				, min = $dateValue.substr(2,2);
			$this.val(data+" "+hour+":"+min);
			
			// 창닫고 이벤트 해제
			$timePicker.add($button).unbind("click");
			$obj.remove();
		});
	}
	
	/*
	 * show calendar
	 * values : type array - jquery id name, type array selected function or single function - 전달 함수, type array beforeshow function - single function - 카렌더 생성전 실행, opts={changeMonth:false, changeYear:false} - 月,年 select box
	 * ex ::: picker.appendCalendar(["#a","#b"], [function(){alert("A");}, function(){alert("B");}]); or picker.appendCalendar(["#a","#b"], function(){alert("B");); or picker.appendCalendar(["#a","#b"]);
	 * return : void
	 */
	,appendCalendar:function(arr, onSelect, beforeShow, opts)
	{
		
		if(arr.length<=0)return false;
		if(!onSelect)
		{
			onSelect=function(dateText){};
		}
		
		if(!beforeShow)
		{
			beforeShow=function(input){};
		}
		
		if(!opts) opts={};
		if(!opts.changeMonth) opts.changeMonth = false;		// 월 바로 바꿀수 있게
		if(!opts.changeYear) opts.changeYear = false;			// 년도 바로 바꿀수 있게
		
		for(var i in arr)
		{
			var calendarDays = lang.weeks;
			var mSuf = lang.monthSubfix;
			var $obj = $(arr[i]);

			// 만약 브라우저가 지원한다면 이벤트 거부
			if(picker.isSupportInputType($obj.attr("type"))===true){
				$obj.change(onSelect[i]||onSelect);
				picker.vars.beforeValue = $obj.val();
				continue; 
			}
	
			$obj.datepicker({
				showOn:"both",
				altFormat:"yy-mm-dd",
				dateFormat:"yy-mm-dd",
				dayNamesMin:[calendarDays[0],calendarDays[1],calendarDays[2],calendarDays[3],calendarDays[4],calendarDays[5],calendarDays[6]],
				monthNames:["1"+mSuf,"2"+mSuf,"3"+mSuf,"4"+mSuf,"5"+mSuf,"6"+mSuf,"7"+mSuf,"8"+mSuf,"9"+mSuf,"10"+mSuf,"11"+mSuf,"12"+mSuf],
				gotoCurrent:true,
				buttonText:"date",
				onSelect:onSelect[i]||onSelect,
				beforeShow:beforeShow[i]||beforeShow,
				changeMonth:opts.changeMonth,
				changeYear: opts.changeYear
			});			
		}
	}
	
	// 기간 구하기 - 2012-01-21 or 2012-1-21 format
	,getDaysPeriod:function(sDate, eDate)
	{
		var regexp = /^(\d{4})\-\d{1,2}\-\d{1,2}$/;
		if(!sDate.match(regexp) || !eDate.match(regexp)) return "empty";
		
		var rsDate = sDate.split("-")
			,reDate = eDate.split("-")
			,stime = new Date()
			,etime = new Date()
			,day = 86400000;
		
		// IE8이하는 new Date("2013-01-01") 이 안먹는다 ㅡㅡ^
		stime.setFullYear(rsDate[0]);
		stime.setMonth(Number(rsDate[1])-1);
		stime.setDate(rsDate[2]);
		
		etime.setFullYear(reDate[0]);
		etime.setMonth(Number(reDate[1])-1);
		etime.setDate(reDate[2]);
		
		var milliseconds = etime.getTime()-stime.getTime();
		
		if(milliseconds<0) return "error";
		
		return milliseconds/day + 1;
	}
};



/*****************************************************************************
블로그(blog) 
*****************************************************************************/
var blogs={
	vars:{
		isModify : false
		,$ul : null
		,$text : null
		,$dialog : null
		,code : null
		,state : null
	}
	
	,registForm:function(form)
	{
		if(!form.rss_url.value){
			alert(lang.blogRequireRssUrl);
			form.rss_url.focus();
			return false;
		}
		return true;
	}
	
	,evtClickedAllCheck:function()
	{
		article.evtAllCheck("#cfg_blog_all_check", $("#blog_article_list_form").find("input[name='chk_idxno[]']"));
	}
	
	// 게시물 승인
	,recogSubmit:function()
	{
		var form = document.blog_article_list_form;
		$(".cfg_article_btn_submit").click(function(){
			var $this = $(this)
				,recMode = $this.attr("data-recog");
			
			if(recMode=="AY"){	// 전체승인일 경우...
				recMode = "Y";
			}else{				// 전체 승인이 아닐경우...
				if($(form).find("input[name='chk_idxno[]']:checked").length<=0){
					alert(lang.validRequireSelectedItem);
					return false;
				}
			}
			
			form.recMode.value = recMode;
			form.submit();
		});
	}
	
	// 이미지 삭제
	,evtClickedDeleteImage:function(target)
	{
		$(target).click(function(){
			if(!window.confirm(lang.confirmDelete)) return false;
			
			var $this = $(this);
			$.get(	"/"
					,util.linkToJson($this.attr("href"))
					,function(data, rst){
						if(rst === "success"){
							if(data.result==="success"){
								$this.closest(".cfg_blog_img_box").remove();
							}else alert(decodeURIComponent(data.msg));
						}else alert(lang.axError);
					},"json");
		
			return false;
		});
	}
	
	// 개개 블로그 글 수정
	,articleRegistForm:function(form)
	{
		if(!form.title.value){
			alert(lang.validRequireTitle);
			form.title.focus();
			return false;
		}
		
		if(!form.link.value){
			alert(lang.adcRequireLink);
			form.link.focus();
			return false;
		}
		
		return true;
	}
	
	// 블로그 섹션
	// 등록
	,evtClickedReg:function()
	{
		var parents = this
			,$ul = $("#cfg_section_list_box")
			,$dialog = $("#cfg_section_dialog")
			,$input = $dialog.find("#cfg_title_input");
			
		parents.vars.$ul = $ul;
		parents.vars.$dialog = $dialog;
		$("#content").on("click", "#cfg_section_btn_write, .cfg_section_btn_modify, .cfg_section_btn_delete"
						,function(){
							var $this = $(this)
								,isModify = $this.is(".cfg_section_btn_modify")
								,isDelete = $this.is(".cfg_section_btn_delete");
								
							// 삭제
							if(isDelete){
								if(!window.confirm(lang.confirmDelete)) return false;
								var $li = $this.closest(".cfg_section_list_li")
									,code = $li.attr("data-code");
								
								if(!code) return false;
								$.post(	"/?dummy=blog-adminBlogSectionDlt"
										,{mod:"blog", act:"adminBlogSectionDlt", code:code}
										,function(data, rst){
											if(rst === "success"){
												if(data.result === "success"){
													$li.fadeOut("fast",function(){ $(this).remove(); });
												}else alert(decodeURIComponent(data.msg));
											}else alert(lang.axError);
										},"json");
								
								return false;
							}
							
							// --- 수정 + 입력 --- //							
							// 수정
							if(isModify){
								var $li = $this.closest("li")
									,$text = $li.find(".cfg_title_text")
									,text = $.trim($text.text());
								
								parents.vars.$text = $text;
								
								// 추가 - 2013/12/06
								parents.vars.code = $li.attr("data-code");
								parents.vars.state = $li.attr("data-state");
							}
							
							// dialog 띄우기
							parents.vars.isModify = isModify;
							$dialog.dialog({
								modal:true
								,open:function(){
									if(isModify) 
									{
										$input.val(text);
										$("input[name='state'][value=" + parents.vars.state + "]").attr("checked", true);
									}
								}
								,close:function(){
									$input.val("");	
									parents.vars.$text = null;
									// 추가 - 2013/12/06
									parents.vars.code = null;
									parents.vars.state = null;
								}								
							});
						});
	}

	// 전송
	,evtSubmit:function(form)
	{
		// 섹션명
		var text = form.title.value;
		if(!text){
			alert(lang.editcfgRequireSectionTitle);
			form.title.focus();
			return false;
		}
		
		// 상태 
		var statechk = $("#form_blog_section").find("input[name='state']").filter(":checked").val();
		
		// 기본 필수 파라미터
		text = util.stripTags(text);
		var parents = this
			,params = {
				mod : "blog"
				,act : "adminBlogSectionCrt"
				,title : text
				,state : statechk
			};
			
		if(this.vars.isModify){
			params.act = "adminBlogSectionUpt";
			params.code = this.vars.code;
		}
		
		// 전송
		$.post(	"/?dummy=blog-"+params.act
				,params
				,function(data, rst){
					if(rst === "success"){
						if(data.result === "success"){							
							if(parents.vars.isModify){
								parents.vars.$text.text(text);
							}else{
								if(parents.vars.$ul.children(".cfg_section_list_li").length<=0){
									 location.reload(true);
									 return false;
								}
								
								parents.vars.$ul.append($(".cfg_section_list_li:eq(0)").clone().attr("data-code",data.data.code).find(".cfg_title_text").text(text).end());
							}
							
							parents.vars.$dialog.dialog("close");
						}else alert(decodeURIComponent(data.msg));
					}else alert(lang.axError);
				},"json");		
		
		return false;
	}
	
	// sort
	,evtSort:function()
	{
		var $box = $("#cfg_section_list_box");
		$box.sortable({
			axis:"y"
			,placeholder: "ui-state-highlight"
			,forcePlaceholderSize:true
			,update:function(event, ui){
				// 섹션코드
				var codes = $box.find(".cfg_section_list_li").map(function(){ return $(this).attr("data-code"); }).get();
				$.post("/?dummy=blog-axBlogSectionMove"
						,{mod:"blog", act:"axBlogSectionMove", "code[]":codes}
						,function(data, rst){
							if(rst === "success"){
								if(data.result === "success"){
									
								}else alert(decodeURIComponent(data.msg));
							}else alert(lang.axError);							
						},"json");
			}
		});
	}
	
	// 블로그 형태 설정
	,evtTypeCodeClicked:function()
	{
		var $field = $("#type_code_text")
			, $a = $("a.blog_title")
			, $del = $("button.blog_btn_delete")
			, $act = $("input[name='act']")
			, $code = $("input[name='code']");
		
		// 아이디 클릭시 수정 이벤트
		$a.click(function(){
			$this = $(this);
			
			$field.val($.trim($this.text())||"").focus(); // 아이디 빼서 텍스트 input에 넣음;
			$code.val($.trim($this.prev("input[name='___code']").val())||""); // 코드 값 넣음;
		});		
		
		// 삭제 버튼 클릭시 이벤트
		$del.click(function(){
			if(!window.confirm(lang.confirmDelete)) return false;
			
			$this = $(this);
			$act.val("adminBlogTypeDlt");
			
			$code.val($.trim($this.closest("dl").find("input[name='___code']").val()));	
			
			document.form_type.submit();
		});
	}
	
	// 등록, 수정 submit
	,typeSubmit:function(mode)
	{
		var $field = $("#type_code_text")
		, $a = $("a.blog_title")
		, $code = $("input[name='code']");
		var $text = $.trim($field.val());
		
		if($text=="")
		{
			alert(lang.cfgBlogTypeExplain);
			$field.focus();
			return false;			
		}
		
		// 아이디 모우기 - 속도 늦을경우 이부분 주석!
		var arr = [];
		$a.each(function(){
			arr.push($.trim($(this).text()));
		});
		
		if($.inArray($text, arr)>=0)
		{
			alert(lang.editRequireExistsSectionName);
			$field.focus();
			return false;
		}
		
		// 수정일때는 히든 코드값이 있나 확인.
		if(mode == "modify")
		{			
			if($code.val()=="")
			{
				alert(lang.editRequireExistsSectionName);
				return false;
			}
		}else $code.val("");
		
		if(mode=="modify") document.form_type.submit();
		else return true;
	}
	
	// blog 등록
	,registBlogSubmit:function(form)
	{
		var domain = form.blog_domain
			,id = form.blog_site_id
			,url = form.blog_rss_url
			,vDomain = domain.value
			,vId = id.value
			,vUrl = url.value;
		
		if((!vDomain && !vId) && !vUrl){
			alert(lang.blogRequireRegOptions);
			domain.focus();
			return false;
		}
		
		if(vDomain && !vId){
			alert(lang.a);
			domain.focus();
			return false;
		}
		
		if(!vDomain && vId){
			alert(lang.loginNotId);
			id.focus();
			return false;
		}
		return true;
	}
	
	//위젯
	,widget:function()
	{
		var $iframe = $("#wd_main_frame")
			,$controller = $("#wd_controller")
			,$close = $controller.find("#wd_close")
			,$recom = $controller.find("#wd_recom")
			,$recomA = $recom.find("a")
			,idxno = $controller.attr("data-idxno")
			,blogIdxno = $controller.attr("data-blog-idxno")
			,link = $controller.attr("data-link")
			,height = (document.documentElement||document.body).clientHeight;
		
		// iframe height
		$iframe.height(height);
		
		// drag
		$controller.draggable({"cursor":"move"});
		
		// 닫기
		$close.click(function(){
			top.location.href= link;
			return false;
		});
		
		// 추천
		$recom.click(function(){
			$.post(	"/"
					,{mod:"blog", act:"articleRecommend", idxno:idxno}
					,function(data,rst){
						if(rst === "success"){
							if(data.result === "success"){
								$recomA.text(data.data[0].count);
							}else alert(decodeURIComponent(data.msg));
						}else alert(lang.axError);
					},"json");
			
			return false;
		});
	}
	
	//리스트 추천
	,listRecom:function(target)
	{
		// 추천
		$(document.body).on("click",target, function(){
			var $this = $(this)
				,idxno = $this.attr("data-idxno")
				,$count = $this.find(".count");
			$.post(	"/"
					,{mod:"blog", act:"articleRecommend", idxno:idxno}
					,function(data,rst){
						if(rst === "success"){
							if(data.result === "success"){
								$count.text(data.data[0].count);
							}else alert(decodeURIComponent(data.msg));
						}else alert(lang.axError);
					},"json");
			
			return false;
		});	
	}
};






/*****************************************************************************
pdf + hosu + 표지관리 서비스 페이지
*****************************************************************************/
var pdf={
	vars:{
		mode:""
		,params: {
					year:""
					,month:""
					,day:""
					,hosu:""
					,category:""
				}
	}

	,submitReg:function(form)
	{
		if(!form.page.value){
			alert(lang.pdfRequirePage);
			form.page.focus();
			return false;
		}else{
			if(!util.onlyNumber(form.page.value)){
				alert(lang.validOnlyNumber);
				form.page.focus();
				return false;
			}
		}
		
		if(!form.section.value){
			alert(lang.pdfRequireSection);
			form.section.focus();
			return false;
		}
		
		if(!form.content.value){
			alert(lang.pdfRequireContent);
			form.content.focus();
			return false;
		}
		
		var _file = form.pdf_file.value;
		if(form.act.value==="pdfCrt" && !_file){
			alert(lang.pdfRequireFile);
			form.pdf_file.focus();
			return false;
		}else{
			if(_file){
				if(!util.isFileOnlyPdf(_file)){
					alert(lang.pdfRequireFile);
					form.pdf_file.focus();
					return false;
				}
			}
		}
		
		return true;
	}

	// 멀티업로드 지원하는가?
	,isMultipleUpload:function()
	{
		$(document.body).append('<input type="file" id="___dummy_file" class="blind" />');
		
		var target = document.getElementById("___dummy_file");
		if(!util.isMultipleFileSelect(target)){
			$("#pdf_btn_multiple").remove();
		}
		
		$(target).remove();
	}
	
	// 셀렉트 바 선택되어 있게
	,selectedParams:function()
	{
		var form = document.pdf_search
			,params = this.vars.params;
		
		// 카테고리
		if(form.category && params.category) form.category.value = params.category;
		
		// 일간지 
		if(this.vars.mode==="D"){
			if(params.year && params.month && params.day){
				form.syear.value = params.year;
				form.smonth.value = params.month;
				form.sday.value = params.day;
			}else{
				var tmp = _currentDate.split("-");
				form.syear.value = tmp[0];
				form.smonth.value = tmp[1];
				form.sday.value = tmp[2];
			}
		}
		// 주간지
		else{
			if(params.hosu)
			form.hosu.value = params.hosu;
		}
	}
	
	// 다중 pdf,썸네일 업로드 띄우기
	,openMultiUploadForm:function()
	{
		$("#pdf_btn_multiple").click(function(){
			window.open(this.getAttribute("href"), "pdf_multi", "width=500, height=300, resizable=yes, scrollbars=no");
			return false;
		});
	}
	
	// 다중 파일 업로드 체크
	,multifileUpload:function(form)
	{
		if(!$(form).find("input[name='pdf_file[]']").val())	return false;
				
		return true;
	}
	
	// 표지 등록
	,submitCoverReg:function(form)
	{
		if(form.category.value==="E"){
			if(!form.ebook_key.value){
				alert(lang.coverRequireEbookkey);
				form.ebook_key.focus();
				return false;
			}
		}
		
		if(!form.hosu.value){
			alert(lang.hosuRequire);
			form.hosu.focus();
			return false;
		}
		
		if(!util.onlyNumber(form.hosu.value)){
			alert(lang.validOnlyNumber);
			form.hosu.focus();
			return false;
		}		
		
		if(!form.pub_date.value){
			alert(lang.coverRequirePubdate);
			form.pub_date.focus();
			return false;
		}
		
		if(!form.title.value){
			alert(lang.validRequireTitle);
			form.title.focus();
			return false;
		}
		
		if(!form.content.value){
			alert(lang.validRequireContent);
			form.content.focus();
			return false;
		}
		
		if(form.act.value == "coverCrt"){
			var _file = form.main_image.value;
			if(!_file){
				alert(lang.coverRequireMainimage);
				form.main_image.focus();
				return false;
			}
		
			if(_file){
				if(!util.isFileOnlyImg(_file)){
					alert(lang.validSelectImage);
					form.main_image.focus();
					return false;
				}
			}
		}
		
		return true;
	}
	
	// cover등록시 보일것만
	,visibleSelected:function()
	{
		var $box = $("#cfg_cover_ebook_box")
			,$target = $("#cfg_cover_category");
		$target.change(function(){
			var val = $(this).val();
			
			$box[val=="E"?"show":"hide"]();
		});
		
		$box[$target.val()=="E"?"show":"hide"]();
	}

	// e-book 보기
	,ebookOpen:function(target){
		if(!target) return false;
		$(document.body).on("click",target,function(){
			var idxno=this.getAttribute("data-idxno");
			window.open('/?mod=cover&act=ebookCheck&idxno='+idxno,'ebookWin','width='+screen.width+' height='+screen.height+',scrollbars=no,menubar=no');
			return false;
		});
	}

	,getListPageAjax:function(){

		function listCall(){
			isLoading=true;
			$tileContainer.masonry();

			var limit=(mobile.vars.page==1?20:10)
				,params=mUtil.linkToJson(location.search.replace(/^\?/,""))||{};

			$.get(	"/"
					,{mod:"cover",act:"axCoverList",category:params.category||"",code:params.code||"",page:mobile.vars.page,limit:limit}
					,function(data,rst){
						if(rst=="success" && data.result=="success"){
							var dt=data.data
								,dir=data.cateDir;
						
							for(var i=0,len=dt.length;i<len;i++){
								var d=dt[i]
									,idxno=d.idxno
									,code=d.code
									,mainImg=d.main_image
									,title=d.title.replace('&lt;br&gt;','<br />')
									,date=d.pub_date
									,hosu=d.hosu
									,$clone=$tileContainer.find(".clone").clone();
			
								$clone.removeClass("clone").addClass("targets").attr("data-idxno",idxno)
								.find(".thumbnail").prop("src",PH_DOMAIN+"/cover/"+dir+"/"+code+"/"+mainImg).end()
								.find(".title").html(title).end()
								.find(".section").html(date+" ["+hosu+"]");

								$tileContainer.append($clone).masonry('appended', $clone).masonry();
							}

							$tileContainer.masonry();
							isLoading=false;
						}
					},"json");
		}

		var _$clone=$tileContainer.find(".clone")
			,_wcm=8	//양옆 margin 값 합
			,_wc=_$clone.outerWidth()+_wcm;
	
		function alignCenter(){
			var w=document.documentElement.clientWidth-10
				,maxBox=Math.floor(w/_wc)
				,maxWidth=maxBox*_wc;
				
				$tileContainer.css("width",maxWidth+"px");
		}

		// 스크롤 끝에 다다르면 재호출 
		var $window = $(window),$document = $(document),isLoading=false;
		$window.on({
			scroll:function(){
				if($window.scrollTop()>=($document.height()-$window.height()-200)){
					if(isLoading===true) return false;

					mobile.vars.page++;
					listCall();					
				}
			}
			,load:function(){ 
				if(typeof $tileContainer!="undefined") $tileContainer.masonry(); 
				alignCenter();
			}
			,resize:function(){ alignCenter(); }
		});

		listCall();
	}
};


/*****************************************************************************
선거실명제 
*****************************************************************************/
var vote={
	vars:{
		electionType:null,
		forms:null,
		actionMode:""
	}

	,voteCheck:function(regisType, electionObjAreaId)
	{
		if(!regisType) regisType="news";
		if(!electionObjAreaId) electionObjAreaId="";
		if (!this.vars.electionType || this.vars.electionType == null) return false;
		
		switch (this.vars.electionType)
		{
			// 선거실명제 이용시
			case "A":
				// 모바일 페이지에서는 입력을 제한
				if (M_DOMAIN.indexOf(location.host)>=0) {
					$("body").append('<style type="text/css">.election_deny_mobile{clear:both;display:block;margin:0 0 20px 0;padding:15px;color:#666;font-weight:bold;line-height:1.6em;letter-spacing:1px;text-align:center;border:1px solid #dfe0e6;background-color:#f3f4f6;}</style>');
					if (regisType == "news") {
						$(electionObjAreaId).hide();
						$(".reply_btn_write, .reply_btn_modify").hide();
						$(this.vars.forms).parent().before('<a href="/?mod=main&amp;act=goWWW&amp;refresh_url='+encodeURIComponent(DOMAIN+"/?mod=news&act=articleView&idxno="+mUtil.linkToJson(location.search.replace("?","")).idxno+"#reply_list_box")+'" class="election_deny_mobile">' + lang.articleReplyRegisMobileAccess + '</a>');
					} else if (regisType == "bbs_cmt") {
						$(electionObjAreaId).hide();
						$(".bbs_cmt_btn_write, .bbs_cmt_btn_modify").hide();
						$(this.vars.forms).parent().before('<div><a href="/?mod=main&amp;act=goWWW&amp;refresh_url='+encodeURIComponent(DOMAIN+"/?mod=bbs&act=view&bbs_id="+mUtil.linkToJson(location.search.replace("?","")).bbs_id+"&idxno="+mUtil.linkToJson(location.search.replace("?","")).idxno+"#reply_list_box")+'" class="election_deny_mobile">' + lang.articleReplyRegisMobileAccess + '</a></div>');
					} else if (regisType == "bbs") {
						//alert(lang.electionRegisMobileAccess);
						//history.back();
						//return false;
					}
				}
				break;

			// 폐쇄시
			case 'C':
				if (regisType == "news") $(".reply_btn_write, .reply_btn_modify").hide();
				else if (regisType == "bbs_cmt") $(".bbs_cmt_btn_write, .bbs_cmt_btn_modify").hide();
				if (electionObjAreaId) $(electionObjAreaId).hide();
				else {
					if (this.vars.actionMode == "insert") {
						alert(lang.electionRegisPostBlock);
						history.back();
						return false;
					}
				}
				break;

			default:
				break;
		}

		$(document.body).on("click", ".btn_regist_election, .btn_regist_normal",
							function(){
								if ($(this).is(".btn_regist_election") == true) $("body").find('input[name="election_type"]').val('R');
								else $("body").find('input[name="election_type"]').val('');
							});
	}
};




/* os명 : windows, mac
 * 브라우저명 : chrome,safari,firefox,opera
 * class로 담아둠 
 */
(function(){
	var browser = util.browser();
	document.getElementsByTagName("html")[0].className=browser.os+" "+browser.name;
})();