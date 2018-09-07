//팝언더 설정하기 모든 브라우저 호환하기위함..
var _NMN={
	initialize:function(){this.ua.initialize()},
	ua:{
		initialize:function(){
			this.browser=this.searchString(this.list_browser)||'unknown';
			this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||'unknown';
			this.os=this.searchString(this.list_os)||'unknown';
			this.width = window.innerWidth || document.documentElement.clientWidth || document.body.offsetWidth;
			this.height = window.innerHeight || document.documentElement.clientHeight || document.body.offsetHeight;
		},

		list_browser:[{str:navigator.userAgent,subStr:'Chrome',id:'Chrome'},
			{str:navigator.userAgent,subStr:'OmniWeb',versionSearch:'OmniWeb/',id:'OmniWeb'},
			{str:navigator.vendor,subStr:'Apple',id:'Safari',versionSearch:'Version'},
			{prop:window.opera,id:'Opera',versionSearch:'Version'},
			{str:navigator.vendor,subStr:'iCab',id:'iCab'},
			{str:navigator.vendor,subStr:'KDE',id:'Konqueror'},
			{str:navigator.userAgent,subStr:'Firefox',id:'Firefox'},
			{str:navigator.vendor,subStr:'Camino',id:'Camino'},
			{str:navigator.userAgent,subStr:'Netscape',id:'Netscape'},
			{str:navigator.userAgent,subStr:'MSIE',id:'Explorer',versionSearch:'MSIE'},
			{str:navigator.userAgent,subStr:'Gecko',id:'Mozilla',versionSearch:'rv'},
			{str:navigator.userAgent,subStr:'Mozilla',id:'Netscape',versionSearch:'Mozilla'}],

		list_os:[{str:navigator.platform,subStr:'Win',id:'Windows'},
			{str:navigator.platform,subStr:'Mac',id:'Mac'},
			{str:navigator.userAgent,subStr:'iPhone',id:'iPhone/iPod'},
			{str:navigator.platform,subStr:'Linux',id:'Linux'}],

		//브라우저 정보찾기
		searchString:function(e){
			for(var t=0;t<e.length;t++){
				var n=e[t].str;
				var r=e[t].prop;
				this.versionSearchString=e[t].versionSearch||e[t].id;
				if(n){ if(n.indexOf(e[t].subStr)!=-1) return e[t].id }
				else if(r)return e[t].id}
			},
		//브라우저 버전 정보찾기
		searchVersion:function(e){
			var t=e.indexOf(this.versionSearchString);
			if(t==-1)return;return parseFloat(e.substr(t+this.versionSearchString.length+1))
		}
	},

	//쿠키 정보 설정
	cookie:{
		get:function(a,b){
			var c=new Date();
				c.setTime(c.getTime());
			var d=new Date(c.getTime()+(1000*60*60*b)).toGMTString();
			var e=document.cookie.split(';');
			var f='';
			var g='';
			var h=[0,d];
			for(var i=0;i<e.length;i++){
				f=e[i].split('=');
				g=f[0].replace(/^\s+|\s+$/g,'');
				if(g==a){b_cookie_found=true;
				if(f.length>1){
					h=unescape(f[1]).split('|');
					if(h.length==1)
						h[1]=d
				}
				return h
				}
				f=null;
				g=''
			}
			return h
		},
		set:function(a,b,c){
			document.cookie=a+'='+escape(b+'|'+c)+';expires='+c+';path=/'
		}
	},

	//브라우저 리스너 등록
	listener:{
		add:function(a,b,c){
			var d='on'+b;
			if(typeof a.addEventListener!='undefined')a.addEventListener(b,c,arguments.callee);
			else if(typeof a.attachEvent!='undefined')a.attachEvent(d,c);
			else{
				if(typeof a[d]!='function')a[d]=c;
				else{
					var e=a[d];	
					a['old_'+d]=e;
						a[d]=function(){
							e();
							return c()
						}
				}
			}
		},

		remove:function(a,b,c,e){
			if(e==undefined)e=false;
			var d='on'+b;
			if(typeof a.removeEventListener!='undefined')a.removeEventListener(b,c,e);
			else if(typeof a.detachEvent!='undefined')a.detachEvent(d,c);
			else{if(typeof a['old_'+d]!='function')a[d]=null;
			else a[d]=a['old_'+d]}}
	},

	format:{},
	random:function(){
		/* return Math.floor(Math.random()*1000001) */
		return '_ADPOP_';
	}
};

_NMN.initialize();
_NMN.ua.width = (_NMN.ua.width == null || _NMN.ua.width <= 400) ? 1200 : _NMN.ua.width;
_NMN.ua.height = (_NMN.ua.height == null || _NMN.ua.height <= 400) ? 800 : _NMN.ua.height;


_NMN.format.popunder = {
	settings:{
		url:"",
		times:1,
//		hours:3.000000,						//기본 3시간 설정에 따라 다르게 할수 있음.
		hours:0.090000,						//기본 3시간 설정에 따라 다르게 할수 있음.
		cookie:"_NMNPOP_"
	},
	config:'width=' + _NMN.ua.width +', height=' + _NMN.ua.height + ',resizable=yes,toolbar=yes,location=yes,directories=yes,status=no,menubar=yes,copyhistory=no,scrollbars=yes',isBinded:false,
	isTriggered:false,
	initialize:function(){
		var a=_NMN.cookie.get(_NMN.format.popunder.settings.cookie, _NMN.format.popunder.settings.hours);

		this.cookie={};
		this.cookie.times=!isNaN(Number(a[0]))?Number(a[0]):0;
		this.cookie.expires=!isNaN(Date.parse(a[1]))?a[1]:new Date().toGMTString();

		if(document.readyState=='complete') {
			setTimeout(_NMN.format.popunder.bind,1);
		} else {
			_NMN.listener.add(document,'DOMContentLoaded',function(){
				_NMN.listener.remove(document,'DOMContentLoaded');
				_NMN.format.popunder.bind()
			});

			_NMN.listener.add(document,'onreadystatechange',function(){
				if(document.readyState=='complete'){
					_NMN.listener.remove(document,'onreadystatechange');
					_NMN.format.popunder.bind()
				}
			});

			_NMN.listener.add(window,'load',_NMN.format.popunder.bind)
		}
	},
	bind:function(){
		if(_NMN.format.popunder.isBinded)return;
		_NMN.format.popunder.isBinded = true;

		//프리퀀시를 없앴음
		if(_NMN.format.popunder.cookie.times >= _NMN.format.popunder.settings.times) return;

		var a={};
		for(var b in _NMN.format.popunder.binders){
			var c=_NMN.format.popunder.binders[b];
			var d=b.split('');
			var e='',l='';
			var f=1,type;
			for(var i=0;i<d.length;i++){
				var g=d[i];
				if(g.match(/[a-z0-9]/)==null)continue;
				type=g.search(/[a-z]/)==0;
				if(type){
					if(type!=f){a[e][l]=c;e=g}else e+=g
				} else{
					if(type!=f||parseInt(i)+1==d.length){
						if(type!=f){
							if(typeof a[e]!='object')a[e]={};
							l=g
						}
						if(parseInt(i)+1==d.length)a[e][type==f?l+g:l]=c
					} else l+=g
				}
				f=type 
			}
		}

		var h=a[_NMN.ua.browser.toLowerCase()]||a.all;

		var j=Object.keys(h);
		j.sort();

		for(var k=0;k<j.length;k++){
			var l=j[k];
			if(_NMN.ua.version<=l)break
		} 
		
		h[l]()
	},

	binders:{
		safari6:function(){_NMN.listener.add(document,'click',_NMN.format.popunder.triggers.triple_trigger)},
		chrome31:function(){_NMN.listener.add(document,'click',_NMN.format.popunder.triggers.tab_trigger)},
		chrome30:function(){_NMN.listener.add(document,'click',_NMN.ua.os=='Windows'?_NMN.format.popunder.triggers.fullscreen_trigger:_NMN.format.popunder.triggers.triple_trigger)},
		chrome28:function(){_NMN.listener.add(document,'click',_NMN.format.popunder.triggers.triple_trigger)},
		firefox12_chrome21:function(){_NMN.listener.add(document,'click',_NMN.format.popunder.triggers.double_trigger)},
		explorer0_explorer7_explorer8_explorer9_explorer10_explorer11_:function(){

//			alert(_NMN.format.popunder.triggers.single_delay);
			//익스일경우만 팝업띄우기
			var w=window.open(_NMN.format.popunder.settings.url,'pu_'+_NMN.random(),_NMN.format.popunder.config);
			window.setTimeout(window.focus,750);
			window.setTimeout(window.focus,850);
			if(w)w.blur()
			if(!w) 
				{
					if(document.domain.toLowerCase().indexOf("mt.co.kr")>=0) {
					} else {
						_NMN.listener.add(document,'click',_NMN.format.popunder.triggers.single_delay)
					}
				}
//			_NMN.format.popunder.triggers.single_delay();
		},
		// 익스 11버전
		mozilla11:function(){ 

			//익스일경우만 팝업띄우기
			var w=window.open(_NMN.format.popunder.settings.url,'pu_'+_NMN.random(),_NMN.format.popunder.config);
			window.setTimeout(window.focus,750);
			window.setTimeout(window.focus,850);
			if(w)w.blur()
			if(!w) 
				{
					if(document.domain.toLowerCase().indexOf("mt.co.kr")>=0) {
					} else {
						_NMN.listener.add(document,'click',_NMN.format.popunder.triggers.single_delay)
					}
				}
		},
		all0:function(){ _NMN.listener.add(document,'click',_NMN.format.popunder.triggers.single)}},
		triggers:{
			tab_trigger:function(){
				_NMN.listener.remove(document,'click',_NMN.format.popunder.triggers.tab_trigger,true);
				if(!_NMN.format.popunder.registerTrigger()) return;
				var a=document.createElement('a');
				a.href=_NMN.format.popunder.settings.url;
				a.setAttribute('target','_blank');
				top.window.document.body.appendChild(a);
				var e=document.createEvent('MouseEvents');
				e.initMouseEvent('click',true,true,window,0,0,0,0,0,true,false,false,true,0,null);
				a.dispatchEvent(e)
			},
			fullscreen_trigger:function(){
				_NMN.listener.remove(document,'click',_NMN.format.popunder.triggers.fullscreen_trigger);
				if(!_NMN.format.popunder.registerTrigger())return;document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
				window.open(_NMN.format.popunder.settings.url,'pu_'+_NMN.random(),_NMN.format.popunder.config);
				document.webkitCancelFullScreen()
			},
			triple_trigger:function(){
				_NMN.listener.remove(document,'click',_NMN.format.popunder.triggers.triple_trigger);
				if(!_NMN.format.popunder.registerTrigger())return;
				window.open('javascript:window.focus()','_self');
				var w=window.open('about:blank','pu_'+_NMN.random(),_NMN.format.popunder.config);
				var a=document.createElement('a');
				a.setAttribute('href','data:text/html,<scr'+'ipt>window.close();</scr'+'ipt>');
				a.style.display='none';
				document.body.appendChild(a);
				var e=document.createEvent('MouseEvents');
				e.initMouseEvent('click',true,true,window,0,0,0,0,0,true,false,false,true,0,null);
				a.dispatchEvent(e);document.body.removeChild(a);
				w.document.open().write('<scr'+'ipt type="text/javascript">window.location="'+_NMN.format.popunder.settings.url+'";<\/scr'+'ipt>');
				w.document.close()
			},
			double_trigger:function(a){
				_NMN.listener.remove(document,'click',_NMN.format.popunder.triggers.double_trigger);
				if(!_NMN.format.popunder.registerTrigger()&&a!='i')return;
				var w=window.open(_NMN.format.popunder.settings.url,'pu_'+_NMN.random(),_NMN.format.popunder.config);
				if(w){
					w.blur();
					try{
						var b=w.window.open('about:blank');
						b.close()
					}catch(i){}
					if(_NMN.ua.browser=='Firefox')window.showModalDialog("javascript:window.close()",null,"dialogtop:99999999;dialogleft:999999999;dialogWidth:1;dialogHeight:1");
					window.focus()
				}
			},
			single_delay:function(){
				_NMN.listener.remove(document,'click',_NMN.format.popunder.triggers.single_delay);
					if(!_NMN.format.popunder.registerTrigger())return;
					var w=window.open(_NMN.format.popunder.settings.url,'pu_'+_NMN.random(),_NMN.format.popunder.config);
					window.setTimeout(window.focus,750);
					window.setTimeout(window.focus,850);
					if(w)w.blur()
			},
			single:function(a){
				_NMN.listener.remove(document,'click',_NMN.format.popunder.triggers.single);
					if(!_NMN.format.popunder.registerTrigger()&&a!='i')return;
					var w=window.open(_NMN.format.popunder.settings.url,'pu_'+_NMN.random(),_NMN.format.popunder.config);
					if(w){
						w.blur();
						window.focus()
					}
			}
		},
		registerTrigger:function(){

			if(_NMN.format.popunder.isTriggered)return false;
			_NMN.format.popunder.isTriggered=true;

			if(_NMN.format.popunder.settings.hours > 0)
//			if(_NMN.format.popunder.settings.hours > -3)
				_NMN.cookie.set(_NMN.format.popunder.settings.cookie,++_NMN.format.popunder.cookie.times,_NMN.format.popunder.cookie.expires);
//				_NMN.cookie.set(_NMN.format.popunder.settings.cookie,_NMN.format.popunder.cookie.times,_NMN.format.popunder.cookie.expires);
			return true
		}
};


	//모바일일 경우 직접 문자를 넣어 팝업을 띄우게 한다.
	if(!Object.keys){
		Object.keys=(function(){
			var hasOwnProperty=Object.prototype.hasOwnProperty,hasDontEnumBug=!({toString:null}).propertyIsEnumerable('toString'),
				dontEnums=['toString','toLocaleString','valueOf','hasOwnProperty','isPrototypeOf','propertyIsEnumerable','constructor'],
				dontEnumsLength=dontEnums.length;
			return function(a){
				if(typeof a!=='object'&&typeof a!=='function'||a===null)throw new TypeError('Object.keys called on non-object');
				var b=[];
				for(var c in a){
					if(hasOwnProperty.call(a,c))b.push(c)}if(hasDontEnumBug){
						for(var i=0;i<dontEnumsLength;i++){
							if(hasOwnProperty.call(a,dontEnums[i]))b.push(dontEnums[i])}
						}
			return b
			}
		})()
	};



//_NMN.initialize();
///alert(_NMN.format.popunder.config);

 //레퍼유알엘에서 키워드 추출하기 결과값  	
 //_NMNDATA_.q= through;    //물방울가슴성형
 //_NMNDATA_.refer = escape(document.referrer);

//키워드를 가져오기 위한 스크립트
//레퍼값을 상단 페이지로 수정해주시기 바랍니다. 
var _NMNREF = document.referrer;
var _NMNSEARCH = _NMNREF.match(/&q=|&query=|query=|&keyword/);


//포털 블락하기
/*
if(_NMNBLOCK_ != null) {
	var  _NMNBLOCKPROCESS_ = _NMNREF.match(_NMNBLOCK_);

		//_NMN.format.popunder.settings.url
		//_NMN.format.popunder.initialize();

	if(_NMNBLOCKPROCESS_ != null) { 
		_NMN.format.popunder = {
			initialize: function() {},
			settings : ''
		};
	}
}
*/

//Base64.encode
var _NMNBase64 = {
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", // private property
	encode : function (input) {// public method for encoding
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
 		input = _NMNBase64._utf8_encode(input);
 		while (i < input.length) {
 			chr1 = input.charCodeAt(i++); chr2 = input.charCodeAt(i++); chr3 = input.charCodeAt(i++);
 			enc1 = chr1 >> 2; enc2 = ((chr1 & 3) << 4) | (chr2 >> 4); enc3 = ((chr2 & 15) << 2) | (chr3 >> 6); enc4 = chr3 & 63;
			if (isNaN(chr2)) { enc3 = enc4 = 64;} else if (isNaN(chr3)) {enc4 = 64;}
			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
		}
		return output;
	},
	_utf8_encode : function (string) { // private method for UTF-8 encoding
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) { utftext += String.fromCharCode(c);
			}else if((c > 127) && (c < 2048)) {	utftext += String.fromCharCode((c >> 6) | 192); utftext += String.fromCharCode((c & 63) | 128);
			}else { utftext += String.fromCharCode((c >> 12) | 224); utftext += String.fromCharCode(((c >> 6) & 63) | 128); utftext += String.fromCharCode((c & 63) | 128);}
		}
		return utftext;
	} 
}
 
 //레퍼유알엘에서 키워드 추출하기
function _NMNGETKEYWORD(k, url) {
	var vars = {};
	var q;
	url = _NMNREF;          
	url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});  
	return q = vars[k];
}

	function setKeyword(jsonData) {
		console.log(jsonData);
		through = 'ad';
	}

var _NMNQ;
if(_NMNSEARCH != null) {
	var _NMNQ =  _NMNSEARCH[0].replace(/&|=/g,'');
	var _NMNQ = _NMNGETKEYWORD(_NMNQ,_NMNREF);
}

if(_NMNQ){ var through = _NMNBase64.encode(_NMNQ); }
else{ 
	
	var through = ''; 

	//스포츠조선
	if(document.domain.toLowerCase().indexOf(".chosun.com")>=0) {
		try
		{
			var through = jQuery(".news_text").html().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"");
			through = encodeURI(through.replace(/(<([^>]+)>)|\n|\'|\"|\,|\;|\&/gi, "").substring(0,500));			
		}
		catch (e)
		{
			console.log("news_text is not ready" + through);
		}

/*
		var useTemplate = false;
		(function (window, $) {
			'use strict';
			var url="http://ad.about.co.kr/mad/jsonp/icover/main34/middle_middle?aG9zdD0mbGltaXQ9NCZtZWRpYT0mY2xrX3BhcmFtPSZjYj0maXNSZWZyZXNoPSZwcmRfaWR4PSZjYXRlZ29yeT0mcGI9JnNfdG09VA==&callback=?";  //popunder
				$.getJSON(url, function (data) {
				 var EDNadtype = data.cb;
				 var EDNclickURL = data.creatives[0].click;
				   window.console && console.log('Ad UI : ', EDNadtype);
				   window.console && console.log('Ad landing : ', EDNclickURL);
					 if (EDNadtype === 'adbayPopunderCallback') {
					 window.open(EDNclickURL);
					}
				});//$.getJSON(url, function (data) {
		}(this, this.jQuery));
*/

	//엑스포츠
	} else if(document.domain.toLowerCase().indexOf(".xportsnews.com")>=0) {
//		var through = jQuery("#CmAdContent").html().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"");
//		through = encodeURI(through.replace(/(<([^>]+)>)|\n|\'|\"|\,|\;|\&/gi, "").substring(0,500));

	//스포츠동아, 데일리한국, 오센
	} else if(document.domain.toLowerCase().indexOf(".donga.com")>=0 || document.domain.toLowerCase().indexOf(".hankooki.com")>=0 || document.domain.toLowerCase().indexOf(".mt.co.kr")>=0 ) {
		try
		{
			var through = $('meta[name="description"]').attr('content');
			through = encodeURI(through.replace(/(<([^>]+)>)|\n|\'|\"|\,|\;|\&/gi, "").substring(0,500));
		}
		catch (e)
		{
			console.log("news_text is not ready" + through);
		}
	}


	try
	{
		(function ($) {
			if (window.isSetBridgeAd) return;
			window.isSetBridgeAd = true;
			var jQueryVer;
			try {
				jQueryVer = $.fn.jquery
			} catch(e) {
				console.log("jQuery is not ready");
				return
			}

			var JSON = JSON || {};
			JSON.stringify = JSON.stringify ||
			function (obj) {
				var t = typeof(obj);
				if (t != "object" || obj === null) {
					if (t == "string") obj = '"' + obj + '"';
					return String(obj)
				} else {
					var n, v, json = [],
					arr = (obj && obj.constructor == Array);
					for (n in obj) {
						v = obj[n];
						t = typeof(v);
						if (t == "string") v = '"' + v + '"';
						else if (t == "object" && v !== null) v = JSON.stringify(v);
						json.push((arr ? "": '"' + n + '":') + String(v))
					}
					return (arr ? "[": "{") + String(json) + (arr ? "]": "}")
				}
			};
			JSON.parse = JSON.parse ||
			function (str) {
				if (str === "") str = '""';
				eval("var p=" + str + ";");
				return p
			};


			var getKeyword = {
				init: function () {
					var old_jQuery = (Number((jQueryVer.split(".")).slice(0, 2).join("")) < Number(("1.5".split(".")).slice(0, 2).join(""))),
					that = this,
					lhost = "http://info.mmnneo.com",
					path = "/getKeyword.info?callback=?",
					data = {
						"tid": 3,
						"limit_saved_day": 3,
						"limit_adsent_cnt": 2,
						"limit_adsent_minute": 0,
						"order_name": "tid_3_cnt,sent_cnt,saved_date",
						"order_direction": "asc,asc,desc"
					};

					if (that.old_jQuery) {
						$.ajax({
							type: "GET",
							url: lhost + path,
							data: data,
							dataType: "jsonp",
							error: (function () {
								console.log("Sever connect failed")
							}),
							success: function (jsonData) {
								setKeyword(jsonData);

							}
						})
					} else {

/*
						$.getJSON(lhost + path, data).fail(function () {
							console.log("Server connect failed")
						}).done(function (jsonData) {
							setKeywordAd(jsonData)
						})

						var popNum = '';
						if(document.domain.toLowerCase().indexOf(".newsen.com")>=0) {
							popNum = '02';
						} else if(document.domain.toLowerCase().indexOf("hani.co.kr")>=0) {
							popNum = '03';
						} else if(document.domain.toLowerCase().indexOf("giti.co.kr")>=0) {
							popNum = '04';
						} else if(document.domain.toLowerCase().indexOf("sports.donga.com")>=0) {
							popNum = '05';
						} else if(document.domain.toLowerCase().indexOf("osen.mt.co.kr")>=0) {
							popNum = '06';
						} else if(document.domain.toLowerCase().indexOf("etnews.com")>=0) {
							popNum = '07';
						} else if(document.domain.toLowerCase().indexOf("cinetong.com")>=0) {
							popNum = '08';
						} else if(document.domain.toLowerCase().indexOf("obsnews.co.kr")>=0) {
							popNum = '09';
						} else if(document.domain.toLowerCase().indexOf("newsshare.co.kr")>=0) {
							popNum = '10';
						} else if(document.domain.toLowerCase().indexOf("ilyo.co.kr")>=0) {
							popNum = '11';
						} else if(document.domain.toLowerCase().indexOf("beautyhankook.com")>=0) {
							popNum = '12';
						} else if(document.domain.toLowerCase().indexOf("thegolftimes.co.kr")>=0) {
							popNum = '13';
						} else if(document.domain.toLowerCase().indexOf("ikoreadaily.co.kr")>=0) {
							popNum = '14';
						} else if(document.domain.toLowerCase().indexOf("khan.co.kr")>=0) {
							popNum = '15';
						} else if(document.domain.toLowerCase().indexOf("hankooki.com")>=0) {
							popNum = '16';

						} else if(document.domain.toLowerCase().indexOf("zuzunza.com")>=0) {
							popNum = '17';
						} else if(document.domain.toLowerCase().indexOf("isplus.joins.com")>=0) {
							popNum = '20';
						} else if(document.domain.toLowerCase().indexOf("asiae.co.kr")>=0) {
							popNum = '21';
						} else if(document.domain.toLowerCase().indexOf("star.mt.co.kr")>=0) {
							popNum = '22';
						} else if(document.domain.toLowerCase().indexOf("moneyweek.co.kr")>=0) {
							popNum = '23';
						} else if(document.domain.toLowerCase().indexOf("www.sportsseoul.com")>=0) {
							popNum = '24';
						} else if(document.domain.toLowerCase().indexOf("holic.sportsseoul.com")>=0) {
							popNum = '31';
						} else if(document.domain.toLowerCase().indexOf("www.donga.com")>=0) {
							popNum = '25';
						} else if(document.domain.toLowerCase().indexOf("mediainnews.com")>=0) {
							popNum = '26';
						} else if(document.domain.toLowerCase().indexOf("zipbogo.net")>=0) {
							popNum = '32';
						} else if(document.domain.toLowerCase().indexOf("sportsq.co.kr")>=0) {
							popNum = '33';
						} else if(document.domain.toLowerCase().indexOf("chosun.com")>=0) {
							popNum = '34';
						} else if(document.domain.toLowerCase().indexOf("reviewstar.net")>=0) {
							popNum = '35';
						} else if(document.domain.toLowerCase().indexOf("dailymail.kr")>=0) {
							popNum = '36';
						} else if(document.domain.toLowerCase().indexOf("fnnews.com")>=0) {
							popNum = '37';
						} else if(document.domain.toLowerCase().indexOf("iworldtoday.com")>=0) {
							popNum = '39';
						} else if(document.domain.toLowerCase().indexOf("comic.etoday.co.kr")>=0) {
							popNum = '40';
						} else if(document.domain.toLowerCase().indexOf("beatsports.net")>=0) {
							popNum = '42';
						} else if(document.domain.toLowerCase().indexOf("contents.seoul.co.kr")>=0) {
							popNum = '43';
						} else if(document.domain.toLowerCase().indexOf("comics.ajunews.com")>=0) {
							popNum = '29';
						} else if(document.domain.toLowerCase().indexOf("comic.news1.kr")>=0) {
							popNum = '28';
						} else if(document.domain.toLowerCase().indexOf("zbn.donga.com")>=0) {
							popNum = '27';
						} else if(document.domain.toLowerCase().indexOf("kihoilbo")>=0) {
							popNum = '51';
						} else if(document.domain.toLowerCase().indexOf("lawissue")>=0) {
							popNum = '52';
						} else if(document.domain.toLowerCase().indexOf("koreatimes")>=0) {
							popNum = '53';						
						} else if(document.domain.toLowerCase().indexOf("ujnews")>=0) {
							popNum = '54';													
						} else if(document.domain.toLowerCase().indexOf("tvdaily")>=0) {
							popNum = '55';
						} else if(document.domain.toLowerCase().indexOf("zbn.donga.com")>=0) {
							popNum = '27';
						}

						var ednua = navigator.userAgent.toLowerCase();
						 if( ednua.match(/Android/i) || ednua.match(/webOS/i) || ednua.match(/iPhone/i) || ednua.match(/iPad/i) || ednua.match(/iPod/i) ||  ednua.match(/BlackBerry/i) || ednua.match(/Windows Phone/i) || ednua.match(/Opera Mini/i) || ednua.match(/IEMobile/i) || ednua.match(/windows mobile/i) || ednua.match(/WPDesktop/i) || ednua.match(/nokia/i) || ednua.match(/Mobile/i) || ednua.match(/Tablet/i) || ednua.match(/Nexus/i) ) {
                                   var ednmb = "mb"; 
						}


						if(popNum != '' && ednmb != "mb") {
							'use strict';
					        //아래 siteurl=의 주소를 변경함. 주소가 http://adapi.about.co.kr/mad/jsonp/ 로 시작되어야함.
					       var siteurl = "http://adapi.about.co.kr/mad/jsonp/icover/main" + popNum + "/middle_middle";  
                           var url = siteurl+"?aG9zdD0mbGltaXQ9NCZtZWRpYT0mY2xrX3BhcmFtPSZjYj0maXNSZWZyZXNoPSZwcmRfaWR4PSZjYXRlZ29yeT0mcGI9JnNfdG09VA==&callback=?"; 
                               $.getJSON(url, function (data) {
                                var EDNadtype = data.cb;
                                var EDNclickURL = data.creatives[0].click;
                                    window.console && console.log('Ad UI : ', EDNadtype);
                                    window.console && console.log('Ad url : ', url);
                                        if (EDNadtype === 'adbayPopunderCallback') {
		                                     window.console && console.log('Ad landing : ', EDNclickURL);
                                             popunder = window.open(EDNclickURL);
//										     popunder.blur();
                                             }
										else if (EDNadtype === 'executeAdbayMediaHouseAds') {
			                                  var EDNsrc = data.creatives[0].src;
					                          window.console && console.log('Ad src : ', EDNsrc);
					                          window.console && console.log('Ad src length : ', EDNsrc.length);
											   if (EDNsrc.length > 0){ 
											    popunder = window.open();
											    popunder.document.write(EDNsrc);
//											    popunder.blur();
											   }
											 }
										else {}
                              });//$.getJSON(url, function (data) {
						}
						*/

						function setKeywordAd(jsonData) {

							/*
							if (typeof jsonData !== "object") return;

							if(jsonData.nckw['STATUS'] == 'SUCCESS') {
								var _NMNQ1_ = _NMNBase64.encode(jsonData.nckw['KEYWORDS'][0].keyword);
								 (function() {
								   var _NMN_ = document.createElement('script'); 
									   _NMN_.type = 'text/javascript'; 
									   _NMN_.async = true; 
									   _NMN_.src = 'http://script.theprimead.co.kr/getSiteMatch_script_neo.php?_NMNQ1_=' + _NMNQ1_ + '&_NMNP_=' + _NMNP_;
										var _NMNS_ = document.getElementsByTagName('script')[0]; 
										_NMNS_.parentNode.insertBefore(_NMN_, _NMNS_);       
								 })();
							}
							*/
						}
					}
				}
			};
			getKeyword.init();

		})(jQuery)
	}
	catch (e)
	{
//		console.log(e);
	}
}


//리얼클릭
try{(function ($) {
	if(window.isSetPrimeAd) return;
	window.isSetPrimeAd = true;

	var jQueryVer;
	try {
		jQueryVer = $.fn.jquery
	} catch(e) {
		console.log("제이 쿼리 라이브러이가 없음!!!");
		return
	}

	var id = '';
	var mcode  = '';
	var src  = '';

	//스포츠동아
	if(document.domain.toLowerCase().indexOf("sports.donga.com")>=0) {
		id = 'realssp_theamedia00001_3994';
		mcode = 'dGhlYW1lZGlhMDAwMDFfMzk5NA==';
		src = 'http://nw.realssp.co.kr/realclickssp.js?v=1.0&m=theamedia00001_3994&t=j';
	}

	//오센
	if(document.domain.toLowerCase().indexOf("osen.mt.co.kr")>=0) {
		id = 'realssp_theamedia00002_3995';
		mcode = 'dGhlYW1lZGlhMDAwMDJfMzk5NQ==';
		src = 'http://nw.realssp.co.kr/realclickssp.js?v=1.0&m=theamedia00002_3995&t=j';
	}

	//전자신문
	if(document.domain.toLowerCase().indexOf("etnews.com")>=0) {
		id = 'realssp_theamedia00003_3996';
		mcode = 'dGhlYW1lZGlhMDAwMDNfMzk5Ng==';
		src = 'http://nw.realssp.co.kr/realclickssp.js?v=1.0&m=theamedia00003_3996&t=j';
	}

	//오펀
	if(document.domain.toLowerCase().indexOf("etnews.com")>=0) {
		id = 'realssp_theamedia00004_3997';
		mcode = 'dGhlYW1lZGlhMDAwMDRfMzk5Nw==';
		src = 'http://ssp.realclick.co.kr/realclickssp.js?v=1.0&m=theamedia00004_3997&t=i';
	}

	//스포츠경향
	if(document.domain.toLowerCase().indexOf("sports.khan.co.kr")>=0) {
		id = 'realssp_theamedia00006_3998';
		mcode = 'dGhlYW1lZGlhMDAwMDZfMzk5OA==';
		src = 'http://nw.realssp.co.kr/realclickssp.js?v=1.0&m=theamedia00006_3998&t=j';
	}
	
	//한국아이닷컴
	if(document.domain.toLowerCase().indexOf("daily.hankooki.com")>=0) {
		id = 'realssp_theamedia00007_3999';
		mcode = 'dGhlYW1lZGlhMDAwMDdfMzk5OQ==';
		src = 'http://ssp.realclick.co.kr/realclickssp.js?v=1.0&m=theamedia00007_3999&t=i';
	}
	
	//스타뉴스
	if(document.domain.toLowerCase().indexOf("star.mt.co.kr")>=0) {
		id = 'realssp_theamedia00008_4000';
		mcode = 'dGhlYW1lZGlhMDAwMDhfNDAwMA==';
		src = 'http://nw.realssp.co.kr/realclickssp.js?v=1.0&m=theamedia00008_4000&t=j';
	}

	//동아닷컴
	if(document.domain.toLowerCase().indexOf("news.donga.com")>=0) {
		id = 'realssp_theamedia00009_4001';
		mcode = 'dGhlYW1lZGlhMDAwMDlfNDAwMQ==';
		src = 'http://nw.realssp.co.kr/realclickssp.js?v=1.0&m=theamedia00009_4001&t=j';
	}

	//뉴스쉐어
	if(document.domain.toLowerCase().indexOf("newsshare.co.kr")>=0) {
		id = 'realssp_theamedia00010_4002';
		mcode = 'dGhlYW1lZGlhMDAwMTBfNDAwMg==';
		src = 'http://nw.realssp.co.kr/realclickssp.js?v=1.0&m=theamedia00010_4002&t=j';
	}

	//골프타임즈
	if(document.domain.toLowerCase().indexOf("thegolftimes.co.kr")>=0) {
		id = 'realssp_theamedia00011_4003';
		mcode = 'dGhlYW1lZGlhMDAwMTFfNDAwMw==';
		src = 'http://nw.realssp.co.kr/realclickssp.js?v=1.0&m=theamedia00011_4003&t=j';
	}

	//씨네통
	if(document.domain.toLowerCase().indexOf("cinetong.com")>=0) {
		id = 'realssp_theamedia00012_4004';
		mcode = 'dGhlYW1lZGlhMDAwMTFfNDAwMw==';
		src = 'http://nw.realssp.co.kr/realclickssp.js?v=1.0&m=theamedia00012_4004&t=j';
	}

	//업다운뉴스
	if(document.domain.toLowerCase().indexOf("updownnews.co.kr")>=0) {
		id = 'realssp_theamedia00013_4005';
		mcode = 'dGhlYW1lZGlhMDAwMTNfNDAwNQ==';
		src = 'http://nw.realssp.co.kr/realclickssp.js?v=1.0&m=theamedia00013_4005&t=j';
	}

	//일간크림
	if(document.domain.toLowerCase().indexOf("isplus.live.joins.com")>=0) {
		id = 'realssp_theamedia00014_4006';
		mcode = 'dGhlYW1lZGlhMDAwMTNfNDAwNQ==';
		src = 'http://nw.realssp.co.kr/realclickssp.js?v=1.0&m=theamedia00014_4006&t=j';
	}

	//스동 주번나
	if(document.domain.toLowerCase().indexOf("zbn.donga.com")>=0) {
		id = 'realssp_theamedia00015_4007';
		mcode = 'dGhlYW1lZGlhMDAwMTVfNDAwNw==';
		src = 'http://nw.realssp.co.kr/realclickssp.js?v=1.0&m=theamedia00015_4007&t=j';
	}

	//스포츠서울 홀릭
	if(document.domain.toLowerCase().indexOf("holic.sportsseoul.com")>=0) {
		id = 'realssp_theamedia00016_4008';
		mcode = 'dGhlYW1lZGlhMDAwMTZfNDAwOA==';
		src = 'http://nw.realssp.co.kr/realclickssp.js?v=1.0&m=theamedia00016_4008&t=j';
	}

	if(id && mcode && src) {
		/*
		var div = document.createElement("div"); 
		  div.class = "realssp_dv";
		  div.id = id;
		  div.setAttribute("data-mcode", mcode);
		  document.body.appendChild(div);  
		*/
		var iframe = document.createElement("iframe"); 
		  iframe.class = "realssp";
		  iframe.id = id;
		  iframe.setAttribute("data-src", 'http://ssp.realclick.co.kr/?m=' + mcode + '&c=iframe');
		  iframe.setAttribute("width", '0px');
		  iframe.setAttribute("height", '0px');
		  document.body.appendChild(iframe);  

		var script = document.createElement('script');
		  script.type = 'text/javascript';
		  script.src = src;
		 document.body.appendChild(script);
	}

})(jQuery)

} catch(e) { console.log(e); }