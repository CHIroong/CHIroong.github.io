
(function(window){

	var Config = function(){
		this.media = "";
		this.mainId = "mainId";
		this.adCnt = 1;
		this.delay = 300;
		this.closeDelay = 3000;
		this.bottomMargin = 200;
		this.jQuery_check_count = 10;
		this.exceptArea = [];
		this.isRight = false;
		this.winHeight = 0;
		this.marginSpace = 0;
		this.lineBottomMargin = 0;
		this.isIframe = false;
		this.iframeSpaceAdjust = 12;
		this.isInner = false;
		this.inspaceAdLoaded = false;
		this.zIndex = 100000000;
		this.scrollTimer = null;
		this.wrapperName = "scrollDiv";
		this.jQueryUrl = "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js";
		this.adHtml = "<div style='line-height:13px; margin:0px 7px 0px 0px;'><div id='adPremium' style='float:left;width:34px;height:13px;margin-right:6px'><a href='http://ad.kakaocorp.com/adinfo/search' onclick='ilsaMain.IsaIconClick=true' target='_blank'><img src='//img2.keywordsconnect.com/inspace_premium.gif' style='border:none' ></a></div><div style='margin:" + (navigator.userAgent.indexOf("MSIE")>=0||navigator.userAgent.indexOf("Trident")>=0?"4":"3") + "px 0 0 10px;float:left'><a href='[#LINK#]' target='_blank' alt='[#DESC#]' title='[#DESC#]' target='_blank' style='color:#225178;font-size:12px;font-weight:normal;line-height:15px;cursor:pointer;text-decoration:none;' onclick='closeIsad([#IDX#])'>[#TITLE#]</a></div><div id='closeBox' style='width:11px;height:11px;left:253px;top:-13px;position:absolute'><img src='//img2.keywordsconnect.com/inspace_close1.gif' style='cursor:pointer;width:11px;height:11px;' onclick='ilsaMain.IsaIconClick=true;closeIsad([#IDX#])' /></div></div><br><div id='ILSA_TogArea' style='clear:both;line-height:16px;'><a href='[#LINK#]' target='_blank' id='ILSA_descArea' style='font-size:12px;padding-left:5px;color:#565656;cursor:pointer;font-weight:normal;text-decoration:none;display:none' onclick='closeIsad([#IDX#])'>[#DESC#]</a><br><a href='[#LINK#]' target='_blank' id='ILSA_siteArea' style='font-size:12px;padding-left:5px;color:#218d44;cursor:pointer;text-decoration:none;display:none;font-weight:normal;' onclick='closeIsad([#IDX#])'>[#SITE#]</a></div><a id='ISA_Link' href='[#LINK#]' style='display:none'></a>";
		this.adSize = {
			width : 280,
			height : 16,   	//실제 광고크기 = height - topMargin
			minHeight : 40,
			topMargin : -3,
			rightMargin : 7
		};
		this.layout = {
			bgColor : "#f5eced",
			border : "1px solid #d4b0b0"
		};	
	};

	var UtilFuncILSA = function(){

		this.getFrameObj = function(){
			return ilsaConf.isIframe ? parent.document : document;
		};

		this.attachEvt = function(Obj, event, listener) {
			(Obj.addEventListener)? Obj.addEventListener(event, listener, false) : Obj.attachEvent('on' + event, listener);
		};

		this.objXorY = function(obj, offsetXY){
			var offSet = (offsetXY == "offsetLeft")?obj.offsetLeft:obj.offsetTop;
			var parrentElement = obj.offsetParent;
			if (parrentElement != null){
				offSet += this.objXorY(parrentElement, offsetXY);
			}else{
				offSet = 0;
			}
			return offSet;
		};
		
		this.createScript = function(url, jName){
			var oldJsonp = document.getElementById(jName);
			if (oldJsonp != null) {
				oldJsonp.parentNode.removeChild(oldJsonp);
				delete oldJsonp;
			}
			var head = document.getElementsByTagName("head")[0];
			var script = document.createElement('script');
			script.id = jName;
			script.type = 'text/javascript';
			script.src = url;
			head.appendChild(script);
		};

		this.getPageSize = function() {
			var windowWidth, windowHeight;
			
			var doc = null;
			var page = null;

			if(ilsaConf.isIframe) {
				doc = parent.document;
				page = parent;
			} else {
				doc = document;
				page = self;
			}

			if (page.innerHeight) {
				windowWidth = page.innerWidth;
				windowHeight = page.innerHeight;
			} else if (doc.documentElement && doc.documentElement.clientHeight) {
				windowWidth = doc.documentElement.clientWidth;
				windowHeight = doc.documentElement.clientHeight;
			} else if (doc.body && doc.body.clientHeight) {
				windowWidth = doc.body.clientWidth;
				windowHeight = doc.body.clientHeight;
			}

			return {width: windowWidth, height: windowHeight };
		};

		this.cutStr = function(str, len){

			function chk_byte(s){
				if(escape(s).length > 4) return 2;
				else return 1;
			}
			
			var retStr = "";
			var strLen = 0;
			var chr = '';

			for(var i = 0; i < str.length; i++){
				chr = str.charAt(i);
				strLen += chk_byte(chr);
				if(strLen >= len) {
					retStr = retStr.substring(0, retStr.length-1) + "...";
					break;
				} else {
					retStr += chr;
				}
			}

			return retStr;	
		};

		this.cT = function(){
			return false;
		};

		this.insert_jQuery = function(callback){
			if(ilsaConf.load_jQuery) {
				ilsaUtil.createScript(ilsaConf.jQueryUrl, "inspace_jQueryScript");
				this.check_insert_jQuery(callback);
			} else {
				$$$ = jQuery;
				callback();
			}
		};

		this.check_insert_jQuery = function(callback){
			setTimeout(function(){
				if(typeof(jQuery)!="undefined"){
					$$$ = jQuery;
					callback();
				} else {
					if(ilsaConf.jQuery_check_count > 0) {
						setTimeout(function(){ ilsaUtil.check_insert_jQuery(callback); }, 100);
						ilsaConf.jQuery_check_count--;
					} else {
						$$$ = jQuery;
						return;
					};					
				}
			}, 100);
		};

	};

	var SpaceAd = function(){
		this.mainLeft = 0;
		this.mainRight = 0;
		this.mainSize = 0;
		this.adSize = 0;
		this.lineHeight = 20;
		this.adObj = null;
		this.isClosed = false;
		this.ILSA_Data = null;
		this.IsaIconClick = false;
		this.IsaIconOver = false;
		this.isMin = true;
		this.inspaceTags = null;
		this.init = function(){
			
			ilsaUtil.insert_jQuery(function(){ 
				setTimeout(function(){ 
					ilsaMain.init_Inspace();
				}, 100);					
			});

		},

		this.init_Inspace = function(){

			this.beforeInit();
			
			this.mainLeft = $$$("#"+ilsaConf.mainId, ilsaUtil.getFrameObj()).position().left;
			this.mainSize = $$$("#"+ilsaConf.mainId, ilsaUtil.getFrameObj()).width();
			this.mainRight = this.mainLeft + this.mainSize;

			$$$("#"+ilsaConf.mainId, ilsaUtil.getFrameObj()).find("p").append("<span name='inspace_pos'>&nbsp;</span>");
			$$$("#"+ilsaConf.mainId, ilsaUtil.getFrameObj()).find("br").before("<span name='inspace_pos'>&nbsp;</span>");

			this.inspaceTags = $$$("span[name=inspace_pos]", ilsaUtil.getFrameObj());
			var mainLeft = $$$("#"+ilsaConf.mainId, ilsaUtil.getFrameObj()).position().left;

			for(var i = 0; i < this.inspaceTags.length; i++){
				if($$$(this.inspaceTags[i]).position().left <= mainLeft + ilsaConf.marginSpace) {$$$(this.inspaceTags[i]).remove();continue;}
				if($$$(this.inspaceTags[i]).position().left + ilsaConf.adSize.width - (mainLeft == 0 ? ilsaConf.marginSpace : 0) >= this.mainRight) {$$$(this.inspaceTags[i]).remove();continue;}
			}

			this.inspaceTags = $$$("span[name=inspace_pos]", ilsaUtil.getFrameObj());


			//####### Begin: 예외영역의 태그 제거 #########
			try {
				for(var i = 0; i < ilsaConf.exceptArea.length; i++){
					var exceptObj = $$$(ilsaConf.exceptArea[i], ilsaUtil.getFrameObj());
					if(exceptObj.length == 0) continue;
					if(exceptObj.length > 1) {
						for(var j = 0; j < exceptObj.length; j++){
							for(var k = 0; k < this.inspaceTags.length; k++){
								this.checkRemoveTags($$$(this.inspaceTags[k]), $$$(exceptObj[j]));
							}
						}
					} else {
						for(var k = 0; k < this.inspaceTags.length; k++){
							this.checkRemoveTags($$$(this.inspaceTags[k]), exceptObj);
						}
					}					
				}
			} catch (e) {
				//console.log("exception");
			}
			//####### End: 예외영역의 태그 제거 #########

			this.inspaceTags = $$$("span[name=inspace_pos]", ilsaUtil.getFrameObj());			

			this.afterInit();
			
			ilsaUtil.attachEvt(ilsaConf.isIframe ? parent.window : window, 'resizeend', function(){ ilsaMain.resizeCheck(); });
			ilsaUtil.attachEvt(ilsaConf.isIframe ? parent.window : window, 'resize',  function(){ ilsaMain.resizeCheck(); ilsaMain.mousePosCheck(); });
			// ilsaUtil.attachEvt(ilsaConf.isIframe ? parent.window : window, 'scroll',  function(){ ilsaMain.mousePosCheck(); });
			// ilsaUtil.attachEvt(ilsaConf.isIframe ? parent.window : window, 'mousewheel',  function(){ ilsaMain.mousePosCheck(); });
			
			$$$(ilsaConf.isIframe ? parent.window : window).bind("scroll mousewheel", function(){
				clearTimeout(ilsaConf.scrollTimer);
				ilsaConf.scrollTimer = setTimeout(function(){
					ilsaMain.mousePosCheck();
				},20);
			});

			this.createAdArea();
			this.getAd();
			
		};

		this.checkRemoveTags = function(tagObj, exceptObj){

			if(ilsaConf.isRight || (tagObj.position().left + ilsaConf.adSize.width >= exceptObj.position().left)) {
				if(tagObj.position().top + this.lineHeight >= exceptObj.position().top && tagObj.position().top <= exceptObj.position().top + exceptObj.height()){
					var mainOffsetLeft = $$$("#"+ilsaConf.mainId, ilsaUtil.getFrameObj()).offset().left;
					if(ilsaConf.isInner && tagObj.offset().left + ilsaConf.adSize.width + exceptObj.width() + 2 < mainOffsetLeft + this.mainSize && !(exceptObj.offset().left < mainOffsetLeft + (this.mainSize/2) && exceptObj.offset().left + exceptObj.width > mainOffsetLeft+ (this.mainSize/2) ) ){
						var isLeft = this.mainLeft + (this.mainSize/2) < exceptObj.offset().left;
						var mainRight = this.mainLeft + this.mainSize;
						var exceptObjMargin = mainOffsetLeft + this.mainSize - exceptObj.offset().left - exceptObj.width();
						var pos = ilsaConf.isRight ? mainRight - (isLeft ? exceptObj.width() + exceptObjMargin : 0) - ilsaConf.adSize.width - ilsaConf.marginSpace + $$$("#"+ilsaConf.mainId, ilsaUtil.getFrameObj()).offset().left - this.mainLeft : tagObj.offset().left;
						tagObj.attr("class","inspace_pos" + pos);
					}else{
						tagObj.remove();
					}
				}
			}
		};

		this.resizeCheck = function(){
			this.mainLeft = $$$("#"+ilsaConf.mainId, ilsaUtil.getFrameObj()).position().left;
			var adSize = $$$("#ILSA_obj").width();
			var adObj = ilsaConf.isIframe ? $$$("#"+ilsaConf.wrapperName, parent.document) : $$$("#tmpILSA_Container");
			ilsaConf.winHeight = ilsaUtil.getPageSize().height;

		};

		this.mousePosCheck = function(){

			var win = $$$(ilsaConf.isIframe ? parent.window : window);
			var body = $$$(ilsaConf.isIframe ? parent.document.body : document.body);
			var yPos = ilsaUtil.getPageSize().height - ilsaConf.bottomMargin + (win.scrollTop() | body.scrollTop());

			if(ilsaMain.ILSA_Data==null) return;
			
			ilsaMain.IsaIconOver = false;
			ilsaMain.isMin = true;

			minAd = function(){
				if(!ilsaMain.isMin) {
					ilsaMain.isMin = true;
					ilsaMain.IsaIconOver = false;
					setAd();
					$$$("#ILSA_TogArea").css("display","none");
					(ilsaConf.isIframe ? $$$("#"+ilsaConf.wrapperName, parent.document) : $$$("#tmpILSA_Container")).css("top", parseInt((ilsaConf.isIframe ? $$$("#"+ilsaConf.wrapperName, parent.document) : $$$("#tmpILSA_Container")).css("top").replace("px","")) + 33);
				}
			};


			setAd = function(){

				var dataLen = ilsaMain.ILSA_Data.length;
				if(dataLen == 0) return;
				ILSA_Html = ilsaConf.adHtml;
				var adObj = $$$("#ILSA_obj");

				adObj.css("height", (ilsaConf.adSize.height - ilsaConf.adSize.topMargin));
				if(ilsaConf.isIframe) {
					var adObj2 = $$$("#" + ilsaConf.wrapperName, parent.document);
					adObj2.css("height", (ilsaConf.adSize.height - ilsaConf.adSize.topMargin+2+ilsaConf.iframeSpaceAdjust));
					adObj2.css("width", (ilsaConf.adSize.width)+2);
				}

				var rndNum = Math.floor(Math.random()*dataLen);
				var splitLink = ilsaMain.ILSA_Data[rndNum].link.split("&au=");
				var linkUrl = splitLink[0] + "&kw=" + encodeURIComponent(ilsaMain.ILSA_Data[rndNum].mk) + "&au="+splitLink[1];
				var adHtml = ILSA_Html.replace("[#TITLE#]", ilsaUtil.cutStr(ilsaMain.ILSA_Data[rndNum].title, 36));
				adHtml = adHtml.replace(/\[#DESC#\]/g, ilsaUtil.cutStr(ilsaMain.ILSA_Data[rndNum].desc, 46));
				adHtml = adHtml.replace(/\[#LINK#]/g, linkUrl);
				adHtml = adHtml.replace(/\[#IDX#\]/g, 0);
				adHtml = adHtml.replace("[#SITE#]", ilsaMain.ILSA_Data[rndNum].site);

				var openTimer = null;
				var closeTimer = null;

				adObj.bind('mouseout', function(){ 
					clearTimeout(openTimer);

					closeTimer = setTimeout(function(){
						minAd();
					}, ilsaConf.closeDelay);
				});

				adObj.bind('mouseover', function(){
					clearTimeout(closeTimer);

					openTimer = setTimeout(function(){
						if(!ilsaMain.IsaIconOver) {
							ilsaMain.IsaIconOver = true;
							ilsaMain.isMin = false;
							$$$("#ILSA_TogArea").css("display","block");
							$$$("#ILSA_descArea").css("display", "inline");
							$$$("#ILSA_siteArea").css("display", "inline");
							adObj.css("height", (ilsaConf.adSize.height - ilsaConf.adSize.topMargin + 33));
							if(ilsaConf.isIframe) adObj2.css("height", (ilsaConf.adSize.height - ilsaConf.adSize.topMargin + 35 + (ilsaConf.isIframe ? ilsaConf.iframeSpaceAdjust : 0)));
							(ilsaConf.isIframe ? $$$("#"+ilsaConf.wrapperName, parent.document) : $$$("#tmpILSA_Container")).css("top", parseInt((ilsaConf.isIframe ? $$$("#"+ilsaConf.wrapperName, parent.document) : $$$("#tmpILSA_Container")).css("top").replace("px","")) - 33);
							ilsaMain.isaIconOver();
						}					
					}, ilsaConf.delay);
				});

				adObj.html(adHtml);

				if($$$("#ILSA_descArea").height() > 20){
					$$$("#ILSA_descArea").text(ilsaUtil.cutStr(ilsaMain.ILSA_Data[rndNum].desc, 42));
				}

				$$$("#ILSA_obj #closeBox").css("left", $$$("#ILSA_obj #ILSA_descArea").width() - 11);
				
			}

			this.startMoveCheck();			
			
			setAd();
			this.moveAd(yPos);

			this.endMoveCheck();

		};

		this.moveAd = function(yPos){

			this.inspaceTags = $$$("span[name=inspace_pos]", ilsaUtil.getFrameObj());

			var adSize = $$$("#ILSA_obj").css("width").replace("px","");
			if(adSize==0 || this.inspaceTags.length == 0) return;

			var adObj = ilsaConf.isIframe ? $$$("#"+ilsaConf.wrapperName, parent.document) : $$$("#tmpILSA_Container");
			adObj.css("display", "block");
			
			var leftPos = $$$(this.inspaceTags[0]).offset().left;
			var topPos = $$$(this.inspaceTags[0], ilsaUtil.getFrameObj()).offset().top;
			var innerPos = 0;

			for(var i =  this.inspaceTags.length - 1; i >=0; i--){
				var tempTopPos = $$$(this.inspaceTags[i], ilsaUtil.getFrameObj()).offset().top;
				innerPos = $$$(this.inspaceTags[i]).attr("class");
				if(innerPos) {try{innerPos = parseInt(innerPos.match(/[\d.]+/)[0]);}catch(e){}}
				if(yPos > tempTopPos) {
					leftPos = $$$(this.inspaceTags[i]).offset().left;
					topPos = tempTopPos;
					break;
				}
			}

			this.mainLeft = $$$("#"+ilsaConf.mainId, ilsaUtil.getFrameObj()).position().left;
			this.mainRight = this.mainLeft + this.mainSize;
			
			adObj.css("left", ilsaConf.isRight ? (ilsaConf.isInner && innerPos ? innerPos - 3 : this.mainRight - ilsaConf.adSize.width + $$$("#"+ilsaConf.mainId, ilsaUtil.getFrameObj()).offset().left - this.mainLeft) : leftPos);
			adObj.css("top", topPos - ilsaConf.lineBottomMargin - (ilsaConf.isIframe ? ilsaConf.iframeSpaceAdjust : 0));
			$$$("#ILSA_obj #closeBox").css("left", $$$("#ILSA_obj #ILSA_descArea").width() - 11);
			$$$("#ILSA_TogArea").css("display","none");
			
		};

		this.closeAd = function(adObj){
			adObj.style.visibility = "hidden";
		};

		this.getAd = function(){
			var curUrl = window.document.location.href;
			ilsaUtil.createScript("//cm.keywordsconnect.com/S/" + ilsaConf.media + "/" + ilsaConf.adCnt + "/?u=" + encodeURIComponent(curUrl), "ilsaAdScript");
		};

		this.createAdArea = function(){

			if(ilsaConf.isIframe){
				var adObj = ilsaUtil.getFrameObj().getElementById(ilsaConf.wrapperName);
				adObj.style.position = "absolute";
				adObj.style.display = "none";
				adObj.style.zIndex = ilsaConf.zIndex;
				
			}else{
				var tmpAdContainer = document.createElement("div");
				tmpAdContainer.id = "tmpILSA_Container";
				tmpAdContainer.style.position = "absolute";
				tmpAdContainer.style.display = "none";
				tmpAdContainer.style.zIndex = ilsaConf.zIndex;
			}
			var tmpAdObj = document.createElement("div");
			tmpAdObj.id = "ILSA_obj";
			tmpAdObj.style.position = "absolute";
			tmpAdObj.style.background = ilsaConf.layout.bgColor;
			tmpAdObj.style.border = ilsaConf.layout.border;
			tmpAdObj.style.width = ilsaConf.adSize.width + "px";
			tmpAdObj.style.height = ilsaConf.adSize.height - ilsaConf.adSize.topMargin + "px";
			tmpAdObj.style.lineHeight = "18px";
			tmpAdObj.style.zIndex = ilsaConf.zIndex;
			tmpAdObj.style.left = "0px";
			tmpAdObj.style.top = ilsaConf.isIframe ? ilsaConf.iframeSpaceAdjust+"px" : "0px";
			ilsaConf.isIframe ? "0" : tmpAdObj.style.marginTop = ilsaConf.adSize.topMargin + "px";
			tmpAdObj.style.textAlign = "left";
			ilsaConf.isIframe ? document.body.appendChild(tmpAdObj) : tmpAdContainer.appendChild(tmpAdObj);
			ilsaConf.isIframe ? "" : document.body.appendChild(tmpAdContainer);
	
		};	

		this.beforeInit = function(){

		};

		this.afterInit = function(){

		};

		this.startMoveCheck = function(){

		};

		this.endMoveCheck = function(){

		};

		this.isaIconOver = function(){

		};
	};

	window.ILSA_Util = UtilFuncILSA;
	window.ILSA_Config = Config;
	window.ILSA_Main = SpaceAd;

})(window);

createInSpaceAd = function(ilsaData){

	if(ilsaData.error) return;
	if(typeof(ilsaData)=="undefined") return;
	if(typeof(ilsaData.data)=="undefined") return;
	if(ilsaData==null) return;
	if(!ilsaData) return;

	ilsaMain.ILSA_Data = ilsaData.data;

	if(ilsaData.impLink != "#" && !ilsaConf.inspaceAdLoaded) {
		var bconImg = document.createElement("img");
		bconImg.width = 1; bconImg.height = 1;
		bconImg.src = ilsaData.impLink;
		document.getElementById("ILSA_obj").appendChild(bconImg);
		ilsaConf.inspaceAdLoaded = true;
	}

};

closeIsad = function(idx){
	ilsaMain.closeAd((ilsaUtil.getFrameObj()).getElementById(ilsaConf.isIframe ? ilsaConf.wrapperName : "tmpILSA_Container"));
};


setTimeout(function(){
	ilsaAdLaunch();
}, 2000); 