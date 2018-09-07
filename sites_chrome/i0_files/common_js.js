/**
 *	fnOpenBasicMedia
 *	@param	pmArticleId : ��� ���̵�
 *	@param	pmCooper : ��ü
 *	<pre>
 *		�ǹ�����Ʈ ���� ȣ��
 *		http://sbscnbc.sbs.co.kr/vod/vod_silverlight.jsp
 *	</pre>
 */
fnOpenBasicMedia = function (pmArticleId, pmCooper) {
	// pmArticleId : ARTICLE_ID
	// pmCooper : 'CNBC'

	var _PathName = top.location.pathname;

	if(_PathName.indexOf("/vod/") > -1) {
		top.window.location.href = "http://sbscnbc.sbs.co.kr/vod/index.jsp?pmArticleId="+pmArticleId;
	} else {
		top.window.location.href = "http://sbscnbc.sbs.co.kr/read.jsp?pmArticleId="+pmArticleId;
	}
};

/**
 *	globalGoFlashLink
 *	@param	pmArea : �÷��� ����
 *	@param	pmDiv : �÷��� ���� ����
 *	<pre>
 *		SBS CNBC ���� �÷��ÿ��� ȣ�� �ϴ� function
 *		http://sbscnbc.sbs.co.kr/index.jsp
 *	</pre>
 */
globalGoFlashLink = function(pmArea, pmDiv) {
	if(pmArea == "onair") {
		if(pmDiv == "tv") {
			document.location.href = "http://ionair.sbs.co.kr/slonair/viewer/checkonair.jsp";
		} else if(pmDiv == "love") {
			window.open('http://radio.sbs.co.kr/onair/love_popup.html','radio_onair','toolbar=no,status=no,width=386,height=233,directories=no,scrollbars=no,left=0,top=0,resizable=no,menubar=no');
		} else if(pmDiv == "power") {
			window.open('http://radio.sbs.co.kr/onair/power_popup.html','radio_onair','toolbar=no,status=no,width=386,height=233,directories=no,scrollbars=no,left=0,top=0,resizable=no,menubar=no');
		}
	} else if(pmArea == "broadplan") {
		if(pmDiv == "tv") {
			document.location.href = "http://tv.sbs.co.kr/broadplan/index.jsp?pmDiv=tv";
		} else if(pmDiv == "radio") {
			document.location.href = "http://tv.sbs.co.kr/broadplan/index.jsp?pmDiv=radio";
		} else if(pmDiv == "dmb") {
			document.location.href = "http://tv.sbs.co.kr/broadplan/index.jsp?pmDiv=dmb";
		}
	}
};

/**
 *	globalProgramList
 *	<pre>
 *		SBS CNBC ���� ���α׷� ��ü���⿡�� ȣ�� �ϴ� function
 *		http://sbscnbc.sbs.co.kr/index.jsp
 *	</pre>
 */
globalProgramList = function() {
	var expandListDisplay = cm.getObj("channelList").style.display;

	if(expandListDisplay == "none") {
		cm.getObj("globalProgramListBtn").src = "http://img.sbs.co.kr/s9/subCommon/sbs_menu06_on.gif";
		cm.getObj("channelList").style.display = "";
	} else {
		cm.getObj("globalProgramListBtn").src = "http://img.sbs.co.kr/s9/subCommon/sbs_menu06.gif";
		cm.getObj("channelList").style.display = "none";
	}
};

var goTwitter = function(title,aId) {
	window.open("http://twitter.com/home?status="+title +" "+encodeURIComponent("http://sbscnbc.sbs.co.kr/read.jsp?pmArticleId="+aId),'','');
	return false;
}

var goFacebook = function(title,aId) {
	window.open("http://www.facebook.com/sharer.php?t="+title +"&u="+encodeURIComponent("http://sbscnbc.sbs.co.kr/read.jsp?pmArticleId="+aId),'','');
	return false;
}
var goKakao = function(title,aId) {
	window.open("https://story.kakao.com/share?url="+encodeURIComponent("http://sbscnbc.sbs.co.kr/read.jsp?pmArticleId="+aId),'','');
	return false;
}

var goMe2day = function(title,aId){

	var target_url ="http://me2day.net/plugins/post/new";
	
	window.open(target_url+"?new_post[body]="+title+ " " +encodeURIComponent("http://sbscnbc.sbs.co.kr/read.jsp?pmArticleId="+aId)+"&new_post[tags]=sbscnbc",'me2day','');
	return false;
}

var goYozm = function(title,aId){
	var target_url ="http://yozm.daum.net/api/popup/post";
	window.open(target_url+"?prefix="+title+ "&link=" +encodeURIComponent("http://sbscnbc.sbs.co.kr/read.jsp?pmArticleId="+aId),'yozm','');
	return false;
}

var goclog = function(title, img_file,aId){
	var target_url ="http://csp.cyworld.com/bi/bi_recommend_pop.php";
	
	var param ="?url="+encodeURIComponent("http://sbscnbc.sbs.co.kr/read.jsp?pmArticleId="+aId);
	param +="&title_nobase64=" + title +"&title=";
	if( img_file) {
		param += "&thumbnail=" + img_file;
	}
	param += "&summary_nobase64=&summary=&writer=&corpid=65925089";
	window.open(target_url+param,'clog','width=400,height=364,scrollbars=no,resizable=no');
	return false;
}

var sbscnbc = {};

sbscnbc.comment = function() {

};

sbscnbc.comment.prototype = {
	/**
	 *	goSubmit
	 *	@param	pmCmd : ��� ����
	 *	@param	pmCommentId : ��� ���̵�
	 *	<pre>
	 *		��� �Է�/���� �� üũ
	 *		http://sbscnbc.sbs.co.kr/comment/comment_list.jsp / http://sbscnbc.sbs.co.kr/onair/onair_comment_list.jsp
	 *	</pre>
	 */
	goSubmit : function(pmCmd, pmCommentId) {
		if(cm.getLogin()) {
			cm.getObj("pmCmd").value = pmCmd;

			if(pmCmd == "insert") {
				if(cm.getObj("comment").value.replace(/\s*$/,'') == ""){
					alert("������ �Է��ϼ���.");
					cm.getObj("comment").value = "";
					cm.getObj("comment").focus();
				} else if(cm.getBytes(cm.getObj("comment").value) > 400) {
					alert("400 byte �̳��� �����ּ���.");
					cm.getObj("comment").focus();
				} else {
					cm.getObj("fForm").submit();
				}
			} else if(pmCmd == "delete") {
				if(pmCommentId != "") {
					if(confirm('�����Ͻðڽ��ϱ�?')) {
						cm.getObj("pmCommentId").value	= pmCommentId;
						cm.getObj("fForm").submit();
					}
				}
			}
		}
	},

	/**
	 *	setBytes
	 *	@param	s : ����
	 *	<pre>
	 *		����Ʈ�� ȭ�鿡 ǥ��
	 *		http://sbscnbc.sbs.co.kr/comment/comment_list.jsp / http://sbscnbc.sbs.co.kr/onair/onair_comment_list.jsp
	 *	</pre>
	 */
	setBytes : function(s) {
		cm.getObj("byte").innerHTML = cm.getBytes(s);
	}
};

sbscnbc.common = function() {
	this.isLogin = this.getCookie("SBS_ID") != null ? true : false;
};

sbscnbc.common.prototype = {
	/**
	 *	getAjax
	 *	@param	pmParam : �Ķ����
	 *	@param	pmTargetId : Ÿ�� ���̵�
	 *	@param	pmCallUrl : ȣ�� URL
	 *	@param	pmCallbackFunction : �ݹ� URL
	 *	<pre>
	 *		ajax ȣ��
	 *	</pre>
	 */
	getAjax : function(pmParam, pmTargetId, pmCallUrl, pmCallbackFunction) {
		cm.setDisplay("loadingswf","block");

	  var opt = {
	  	method: "post",
	  	postBody: pmParam,
	  	onSuccess: function(t) {
	  	},
	  	onComplete: function(t) {
				//alert(t.responseText);
				cm.setDisplay("loadingswf","none");
				if(pmCallbackFunction != "") eval(pmCallbackFunction);
	  	},
	  	on404: function(t) {
	    //  alert('Error 404: location "' + t.statusText + '" was not found.');
	  	},
	  	onFailure: function(t) {
	   //   alert('Error ' + t.status + ' -- ' + t.statusText);
	  	}
	  };

	  new Ajax.Updater(pmTargetId, pmCallUrl, opt);
	},

	/**
	 *	getArticleFontSize
	 *	@param	-
	 *	@return	��� ��Ʈ ������
	 *	<pre>
	 *		��� ���� ��Ʈ ������ ����
	 *		http://sbscnbc.sbs.co.kr/read.jsp
	 *	</pre>
	 */
	getArticleFontSize : function() {
		var cookie = cm.getCookie("sbscnbc_article_font_size");

		if ( cookie == null ) return 14;

		if ( cookie.length ) return cookie;
		else return 14;
	},

	/**
	 *	getBytes
	 *	@param	s : ����
	 *	@return	���� ����Ʈ
	 *	<pre>
	 *		����Ʈ ���� ������
	 *	</pre>
	 */
	getBytes : function(s) {
		var len = 0;
		if (s == null) return 0;

		for(var i = 0; i < s.length; i++) {
			var c = escape(s.charAt(i));
			if (c.length == 1) len++;
			else if (c.indexOf("%u") != -1) len += 2;
			else if (c.indexOf("%") != -1) len += c.length / 3;
		}

		return len;
	},

	/**
	 *	getCookie
	 *	@param	pmName : ��Ű �̸�
	 *	@return	��Ű ��
	 *	<pre>
	 *		��Ű ���� ������
	 *	</pre>
	 */
	getCookie : function(pmName) {
		var prefix = pmName + "=";

		var cookieStartIndex = document.cookie.indexOf(prefix);
		if (cookieStartIndex == -1) return null;

		var cookieEndIndex = document.cookie.indexOf(";", cookieStartIndex + prefix.length);
		if (cookieEndIndex == -1) cookieEndIndex = document.cookie.length;

		return unescape(document.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex));
	},

	/**
	 *	getDateValid
	 *	@param	pmDate	: ��¥
	 *	<pre>
	 *		��¥�� ���� ��ȿ�� üũ
	 *	</pre>
	 */
	getDateValid : function(pmDate) {
		var pmYear = pmDate.substr(2,2);
		var pmMonth = pmDate.substr(4,2)-1; // ���� 0�� ����
		var pmDate = pmDate.substr(6,2);

		var nDate = new Date(pmYear,pmMonth,pmDate);
		var nYear = nDate.getYear();
		var nMonth = nDate.getMonth();
		var nDate = nDate.getDate();

		if((pmYear == nYear) && (pmMonth == nMonth) && (pmDate == nDate)) {
			return true;
		} else {
			return false;
		}
	},

	/**
	 *	getFlash
	 *	@param	params	: �Ķ����
	 *	@return	�÷��� �±�
	 *	<pre>
	 *		�÷��� �±׸� ����� ��
	 *	</pre>
	 */
	getFlash : function(params) {
		var id = params["id"] != null ? params["id"] : "";
		var url = params["url"] != null ? params["url"] : "";
		var width = params["width"] != null ? params["width"] : "";
		var height = params["height"] != null ? params["height"] : "";
		var alt = params["alt"] != null ? params["alt"] : "";
		var flashVars = params["flashVars"] != null ? params["flashVars"] : "";
		var wmode = params["wmode"] != null ? params["wmode"] : "window";
		var access = params["access"] != null ? params["access"] : "always";

		var str = '' +
		'<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,115,0" width="' + width + '" height="' + height + '" id="' + id + '">' +
			'<param name="showLiveConnect" value="true" />' +
			'<param name="allowScriptAccess" value="always" />' +
			'<param name="quality" value="high" />' +
			'<param name="menu" value="false" />' +
			'<param name="movie" value="' + url + '" />' +
			'<param name="wmode" value="' + wmode + '" />' +
			'<param name="FlashVars" value="' + flashVars + '" />' +
			'<!--[if !IE]>-->' +
			'<object type="application/x-shockwave-flash" data="' + url + '" width="' + width + '" height="' + height + '" name="' + id + '" >' +
				'<param name="showLiveConnect" value="true" />' +
				'<param name="allowScriptAccess" value="sameDomain" />' +
				'<param name="quality" value="high" />' +
				'<param name="menu" value="false" />' +
				'<param name="wmode" value="' + wmode + '" />' +
				'<param name="FlashVars" value="' + flashVars + '" />' +
				'<param name="pluginurl" value="http://www.macromedia.com/go/getflashplayer" />' +
			'<!--<![endif]-->' +
				'<div class="alt-content alt-' + id + '">' + alt + '</div>' +
			'<!--[if !IE]>-->' +
			'</object>' +
			'<!--<![endif]-->' +
		'</object>';

		return str;
	},

	/**
	 *	getIECheck
	 *	@return	IE ����
	 *	<pre>
	 *		IE ���θ� üũ
	 *	</pre>
	 */
	getIECheck : function() {
		if( /*@cc_on!@*/false ) {
			return true;
		} else {
			return false;
		}
	},

	/**
	 *	getLogin
	 *	@return	�α��� ����
	 *	<pre>
	 *		�α��� ���θ� üũ
	 *	</pre>
	 */
	getLogin : function() {
		if(cm.isLogin) {
			return true;
		} else {
			if(confirm("�α��� �� ����� �����մϴ�.")) {
				var rtnurl = parent ? parent.location : document.location;
				top.location.href = "http://login.sbs.co.kr/Login/login.jsp?Login_ReturnURL="+rtnurl;
			}

			return false;
		}
	},

	/**
	 *	getObj
	 *	@param	ObjId	: ������Ʈ ���̵�
	 *	<pre>
	 *		������Ʈ�� dom id �� ������
	 *	</pre>
	 */
	getObj : function(ObjId) {
		return document.getElementById(ObjId);
	},

	/**
	 *	getObjs
	 *	@param	ObjId	: ������Ʈ ���̵�
	 *	<pre>
	 *		������Ʈ�� dom name ���� ������
	 *	</pre>
	 */
	getObjs : function(ObjId) {
		return document.getElementsByName(ObjId);
	},

	/**
	 *	getParam
	 *	@param	pmParamName	: �ĸ����� ��
	 *	<pre>
	 *		�Ķ���� ���� ������
	 *	</pre>
	 */
	getParam : function(pmParamName) {
		pmParamName = pmParamName.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regexS = "[\\?&]"+pmParamName+"=([^&#]*)";
		var regex = new RegExp(regexS);
		var results = regex.exec(window.location.href);

		if( results == null )
			return "";
		else
			return results[1];
	},

	/**
	 *	setArticleFontSize
	 *	@param	val	: ��Ʈ ũ��
	 *	<pre>
	 *		��� ��Ʈ ũ�� ����
	 *	</pre>
	 */
	setArticleFontSize : function(val) {
		var fontSize = parseInt(cm.getArticleFontSize());
		var content = cm.getObj("content");
		var exp = new Date();
		exp.setDate( exp.getDate() + 1);

		if (val > 0) {
			if (fontSize <= 20) {
				fontSize = fontSize + val;
			}
		} else {
			if (fontSize >= 10) {
				fontSize = fontSize + val;
			}
		}

		content.style.fontSize = fontSize + "px";

		setCookie("sbscnbc_article_font_size", fontSize, exp, "/", "sbscnbc.sbs.co.kr", 0);

		if(val == 0) {
			if(cm.getObj("content_bottom_notice") == null) {
				var newElement = document.createElement("div");
				newElement.id = "content_bottom_notice";
				newElement.innerHTML = "<p style=\"text-align: center\"><u><strong></strong></u></p>";
				content.appendChild(newElement);
			}
		}
	},

	/**
	 *	setArticlePrint
	 *	@param	pmArticleId	: ��� ���̵�
	 *	<pre>
	 *		��� �μ�
	 *	</pre>
	 */
	setArticlePrint : function(pmArticleId) {
		var curLocation = document.location;

		if((curLocation.toString()).indexOf("pmMode=preview") > -1) {
			window.print();
		} else {
			var url = "/common/common_article_content.jsp?pmMode=preview&pmArticleId=" + pmArticleId ;
			window.open(url,'articlePrint','toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=yes,resizable=1,width=750,height=1000,left=0,top=0');
		}
	},
	setArticlePrintNew : function(pmArticleId) {
		var curLocation = document.location;

		if((curLocation.toString()).indexOf("pmMode=preview") > -1) {
			window.print();
		} else {
			var url = "/common/common_article_content_new.jsp?pmMode=preview&pmArticleId=" + pmArticleId ;
			window.open(url,'articlePrint','toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=yes,resizable=1,width=1050,height=1000,left=0,top=0');
		}
	},

	/**
	 *	setBodyLoad
	 *	@param	pmPage	: ������ ��
	 *	<pre>
	 *		������ body onload �� ������ ��ũ��Ʈ
	 *	</pre>
	 */
	setBodyLoad : function(pmPage) {
		cm.setLoadingSwf();

		if(pmPage == "") {
			cm.getObj("query").value = m.searchText;
			cm.getObj("query").focus();
			if(cm.getCookie("20100429182816") == null) {
				//window.open("./html/popup/20100429182816.html","sbscnbc_main_popup","width=400,height=500,top=0,left=0,scrollbars=0,resizable=0");
			}

			setInterval("setPreNextId('topics','next')",3000);
		} else if(pmPage == "comment_list") {
			cm.setPIframeResize("body_iframe");
		} else if(pmPage == "onair_replay_list") {
			o.setRelayScrollTop(true);
			setInterval("o.getRelayContent()", 10000);
		} else if(pmPage == "onair_comment_list") {
			o.setCommentScrollTop();
		} else if(pmPage == "onair_viewer") {
			o.getViewer();
		} else if(pmPage == "vod_viewer") { //�ǹ�����Ʈ ���
			v.getViewer();
		} else if(pmPage == "vod_viewer2") { //�÷��� ��� ��ȯ 2013-06-28
			v.getViewer2();
		} else if(pmPage == "vod_viewer_test") { //�÷��� ��� ��ȯ 2013-06-28
			v.getViewerTest();
		} else if(pmPage == "stock") {
			cm.setStock();
		}
	},

	/**
	 *	setDisplay
	 *	@param	pmObjId	: ������Ʈ ���̵�
	 *	@param	pmDisplay	: display �Ӽ�
	 *	<pre>
	 *		������Ʈ display �Ӽ� ��Ʈ��
	 *	</pre>
	 */
	setDisplay : function(pmObjId, pmDisplay) {
		if(cm.getObj(pmObjId) != null) {
			if(pmDisplay == "") {
				if(cm.getObj(pmObjId).style.display == "" || cm.getObj(pmObjId).style.display == "none") {
					cm.getObj(pmObjId).style.display = "block";
				} else {
					cm.getObj(pmObjId).style.display = "none";
				}
			} else {
				cm.getObj(pmObjId).style.display = pmDisplay;
			}
		}
	},

	/**
	 *	setIframeResize
	 *	@param	pmObjId	: ������Ʈ ���̵�
	 *	<pre>
	 *		���������� ������¡
	 *	</pre>
	 */
	setIframeResize : function(pmObjId) {
		var objBodyIframe = cm.getObj(pmObjId);

		if(objBodyIframe != null) {
			if(iframeHeight == 0) iframeHeight = objBodyIframe.height;

			try {
				if (objBodyIframe.contentWindow.document.domain != "sbs.co.kr")
				return;
			}	catch(e) {
				objBodyIframe.height = iframeHeight;
				return;
			}

			if(cm.getIECheck()) {
				objBodyIframeBody = objBodyIframe.contentWindow.document.body;
				objBodyIframe.height = objBodyIframeBody.scrollHeight + (objBodyIframeBody.offsetHeight - objBodyIframeBody.clientHeight);
			} else {
				objBodyIframeBody = objBodyIframe.contentDocument.documentElement;
				objBodyIframe.height = objBodyIframeBody.offsetHeight > 0 ? objBodyIframeBody.offsetHeight : objBodyIframeBody.scrollHeight;
			}
		}
	},

	/**
	 *	setKeypress
	 *	@param	pmEvent	: �̺�Ʈ
	 *	@param	pmCallbackFunction	: �ݹ� ���
	 *	<pre>
	 *		Ű �̺�Ʈ �߻��� �ݹ� ����� ȣ��
	 *	</pre>
	 */
	setKeypress : function(pmEvent, pmCallbackFunction) {
		var eventKeyCode = null;

		if(window.event) {
			eventKeyCode = window.event.keyCode;
		}	else if(pmEvent) {
			eventKeyCode = pmEvent.which;
		}

		if(eventKeyCode == 13) {
			if(pmCallbackFunction != "") eval(pmCallbackFunction);
		}
	},

	/**
	 *	setLoadingSwf
	 *	<pre>
	 *		�ε� �÷��ø� ȭ�鿡 ǥ��
	 *	</pre>
	 */
	setLoadingSwf : function() {
		var newDivElement = document.createElement("div");
		newDivElement.id = "loadingswf";
		newDivElement.style.position = "absolute";
		newDivElement.style.left = screen.width/2;
		newDivElement.style.top = screen.height/2;
		newDivElement.style.zIndex = 100;
		newDivElement.style.display = "none";

		var aParam = new Array();
		aParam["id"] = "loadingFlash";
		aParam["url"] = "http://img.sbs.co.kr/sbscnbc/swf/loading.swf";
		aParam["width"] = 50;
		aParam["height"] = 50;
		aParam["alt"] = "";
		aParam["flashVars"] = "update=20100104";
		aParam["wmode"] = "transparent";

		newDivElement.innerHTML = cm.getFlash(aParam);

		document.getElementsByTagName("body")[0].appendChild(newDivElement);
	},

	/**
	 *	setMenuTab
	 *	@param	pmDisplay : display �Ӽ�
	 *	@param	pmCurMenu : ���� �޴�
	 *	<pre>
	 *		���� ��޴� ����
	 *	</pre>
	 */
	setMenuTab : function(pmDisplay, pmCurMenu) {
		cm.setDisplay('menu_tab_ul',pmDisplay);

		if(pmDisplay == "block") {
			cm.getObj("gnb_menu_news").src = "http://img.sbs.co.kr/sbscnbc/img/menu/main_menu2_on.gif";

			if(pmCurMenu == "pro") {
				cm.getObj("gnb_menu_global").src = "http://img.sbs.co.kr/sbscnbc/img/menu/main_menu3_of.gif";
			} else if(pmCurMenu == "vod") {
				cm.getObj("gnb_menu_news").src = "http://img.sbs.co.kr/sbscnbc/img/menu/main_menu2_on.gif";
				cm.getObj("gnb_menu_global").src = "http://img.sbs.co.kr/sbscnbc/img/menu/main_menu3_of.gif";
				//cm.getObj("gnb_menu_pro").src = "http://img.sbs.co.kr/sbscnbc/img/menu/main_menu4_off.gif";
			}
		} else {
			if(pmCurMenu == "news") {
				cm.getObj("gnb_menu_news").src = "http://img.sbs.co.kr/sbscnbc/img/menu/main_menu2_on.gif";
			} else if(pmCurMenu == "global") {
				cm.getObj("gnb_menu_news").src = "http://img.sbs.co.kr/sbscnbc/img/menu/main_menu2_off.gif";
			} else if(pmCurMenu == "pro") {
				cm.getObj("gnb_menu_news").src = "http://img.sbs.co.kr/sbscnbc/img/menu/main_menu2_off.gif";
				cm.getObj("gnb_menu_global").src = "http://img.sbs.co.kr/sbscnbc/img/menu/main_menu3_off.gif";
			} else if(pmCurMenu == "vod") {
				cm.getObj("gnb_menu_news").src = "http://img.sbs.co.kr/sbscnbc/img/menu/main_menu2_off.gif";
				cm.getObj("gnb_menu_global").src = "http://img.sbs.co.kr/sbscnbc/img/menu/main_menu3_off.gif";
				//cm.getObj("gnb_menu_pro").src = "http://img.sbs.co.kr/sbscnbc/img/menu/main_menu4_off.gif";
			} else {
				cm.getObj("gnb_menu_news").src = "http://img.sbs.co.kr/sbscnbc/img/menu/main_menu2.gif";
			}
		}
	},

	/**
	 *	setPIframeResize
	 *	@param	pmObjId : ������Ʈ ���̵�
	 *	<pre>
	 *		�θ��� ���������� ������¡
	 *	</pre>
	 */
	setPIframeResize : function(pmObjId) {
		if(parent) parent.cm.setIframeResize(pmObjId);
	},

	/**
	 *	setRankingTab
	 *	@param	iSeq	: �� ����
	 *	<pre>
	 *		��� ���� ��ŷ �� ���콺 ������
	 *		http://sbscnbc.sbs.co.kr/common/common_ranking.jsp
	 *	</pre>
	 */
	setRankingTab : function (iSeq) {
		cm.getObj("right_tab1").className = "right_tab_"+ iSeq +"_selected";

		var objTabCont1 = cm.getObj("right_tab1_cont_1");
		var objTabCont2 = cm.getObj("right_tab1_cont_2");

		if(iSeq == 1) {
			cm.getObj("right_tab1_li1").className = "text4 tab1";
			cm.getObj("right_tab1_li2").className = "text20 tab2";
			cm.setDisplay("right_tab1_cont_1","block");
			cm.setDisplay("right_tab1_cont_2","none");
		} else if(iSeq == 2) {
			cm.getObj("right_tab1_li1").className = "text20 tab1";
			cm.getObj("right_tab1_li2").className = "text4 tab2";
			cm.setDisplay("right_tab1_cont_1","none");
			cm.setDisplay("right_tab1_cont_2","block");
		}
	},

	/**
	 *	setStock
	 *	<pre>
	 *		�ü� ���� ���������� ��Ʈ��
	 *		http://sbscnbc.sbs.co.kr/common/common_stock.html
	 *	</pre>
	 */
	setStock : function () {
		var pmPageNo = cm.getParam("pmPageNo");

		// datamall.koscom.co.kr -> 211.255.206.195
		document.location.replace("http://sbscnbc.sbs.co.kr/common/koscom/koscomMain.jsp?pagePart="+pmPageNo);

		/*
		if(pmPageNo == 1) {
			var newDivElement = document.createElement("img");
			newDivElement.width = 256;
			newDivElement.height = 76;
			newDivElement.src = "http://img.sbs.co.kr/sbscnbc/upload/2010/04/02/10000012688.jpg";
			document.getElementsByTagName("body")[0].appendChild(newDivElement);
		} else if(pmPageNo == 2) {
		} else if(pmPageNo == 3) {
			var newDivElement = document.createElement("img");
			newDivElement.src = "http://img.sbs.co.kr/sbscnbc/upload/2010/04/02/10000012689.jpg";
			document.getElementsByTagName("body")[0].appendChild(newDivElement);
		} else if(pmPageNo == 4) {
		} else if(pmPageNo == 5) {
			var newDivElement = document.createElement("img");
			newDivElement.src = "http://img.sbs.co.kr/sbscnbc/upload/2010/04/02/10000012691.jpg";
			document.getElementsByTagName("body")[0].appendChild(newDivElement);
		}
		*/
	}
};

sbscnbc.main = function() {
	this.curCollectionId = "collection_ALL";
	this.searchText = "�� �η��� ����Ǯ��, ��Ÿ���� �������� ��������!";
	this.searchQuery = "�������� ��������";
	this.searchCollection = "cnbc";
	this.searchIsSubPage = "1";
};

sbscnbc.main.prototype = {
	/**
	 *	setCable
	 *	@param	pmStatus	: ���̺� ����
	 *	<pre>
	 *		���̺� ä�� ����
	 *		http://sbscnbc.sbs.co.kr/index.jsp
	 *	</pre>
	 */
	setCable : function(pmStatus) {
		if(pmStatus == "on") {
			cm.getObj("main_menu_cable").className = "cable_on";
			cm.getObj("cable_box").style.display = "block";
		} else if(pmStatus == "off") {
			cm.getObj("main_menu_cable").className = "";
			cm.getObj("cable_box").style.display = "none";
		}
	},

	/**
	 *	setCollection
	 *	@param	pmCollection	: �˻� ī�װ�
	 *	<pre>
	 *		�˻� ī�װ� ����
	 *		http://sbscnbc.sbs.co.kr/index.jsp
	 *	</pre>
	 */
	setCollection : function(pmCollection) {
		var targetObjId = "collection_"+pmCollection;

		cm.getObj(this.curCollectionId).style.backgroundColor = "";
		cm.getObj(targetObjId).style.backgroundColor = "#f4f4f4";
		cm.getObj("collection_cur").firstChild.nodeValue = cm.getObj(targetObjId).firstChild.nodeValue;
		cm.getObj("collection").value = pmCollection;
		cm.getObj("expandList").style.display = "none";
		this.curCollectionId = targetObjId;
	},

	/**
	 *	setSearch
	 *	<pre>
	 *		�˻� Submit �� üũ
	 *		http://sbscnbc.sbs.co.kr/index.jsp
	 *	</pre>
	 */
	setSearch : function() {
		var query = cm.getObj("query");
		var collection = cm.getObj("collection");
		var isSubPage = cm.getObj("isSubPage");

		if(query.value == m.searchText) {
			query.value = m.searchQuery;
			collection.value = m.searchCollection;
			isSubPage.value = m.searchIsSubPage;
		}
	},

	/**
	 *	setSearchQuery
	 *	<pre>
	 *		�˻� input focus �� üũ
	 *		http://sbscnbc.sbs.co.kr/index.jsp
	 *	</pre>
	 */
	setSearchQuery : function() {
		var query = cm.getObj("query");

		if(query.value == m.searchText) query.value = "";
	}
};

sbscnbc.news = function() {
	this.curArticleBoxId = "global_li_1";
	this.interval = "";
};

sbscnbc.news.prototype = {
	/**
	 *	setRightArticleListParams
	 *	@param	pmPage	: ������
	 *	<pre>
	 *		��� ����Ʈ �˻� ����
	 *		http://sbscnbc.sbs.co.kr/news/news_right.jsp, http://sbscnbc.sbs.co.kr/global/news_right.jsp
	 *	</pre>
	 */
	setRightArticleListParams : function(pmPage) {
		if(pmPage == "date") {
			cm.getObj("txtDate1").value = cm.getObj("pmDate1").value;
			cm.getObj("txtDate2").value = cm.getObj("pmDate2").value;
			cm.getObj("txtDate3").value = cm.getObj("pmDate3").value;
		}

		var sParams  = "pmDate1="+ cm.getObj("txtDate1").value;
				sParams += "&pmDate2="+ cm.getObj("txtDate2").value;
				sParams += "&pmDate3="+ cm.getObj("txtDate3").value;
				sParams += "&pmChannel="+ cm.getObj("pmChannel").value;
				sParams += "&pmInterval="+ cm.getObj("pmInterval").value;
				sParams += "&pmArticleId="+ cm.getObj("pmArticleId").value;
				if(pmPage != "" && pmPage != "date") sParams += "&pmPage="+ pmPage;

		n.setRightArticleList(sParams);
	},

	/**
	 *	getRightArticleList
	 *	<pre>
	 *		onload��, ���ΰ�ħ �ð� �޺����� ����Ǿ����� �ڵ� ���ΰ�ħ ����
	 *		http://sbscnbc.sbs.co.kr/news/news_right.jsp, http://sbscnbc.sbs.co.kr/global/news_right.jsp
	 *	</pre>
	 */
	getRightArticleList : function() {
		var pmArticleId = cm.getObj("pmArticleId").value;
		var sInterval = cm.getObj("pmInterval").value;

		clearInterval(this.interval);

		if(sInterval != "0") {
			clearInterval(this.interval);
			this.interval = setInterval("n.setRightArticleListAutoReload();", 1000 * parseInt(sInterval));
		}

		// ������ ����Ʈ�� OnLoad�Ǹ� ���� ù��° ��縦 �����ش�
		if(pmArticleId == '') {
			var objArticle1 = cm.getObj("global_article_1");
			objArticle1.onclick();
		} else {
			// ���� ���õ� ��� Ȱ��ȭ ǥ��
			var vIndex = cm.getObj("txtIndex").value;

			if( vIndex!='' ) {
				n.setRightArticleBox('global_li_'+ vIndex);
			}
		}
	},

	/**
	 *	getRightChannelTab
	 *	@param	objThis	: Mouseover�� li�±� �ڽ�
	 *	@param	iLiSeq	: li ����
	 *	<pre>
	 *		�������� �� ���콺 ������
	 *		http://sbscnbc.sbs.co.kr/news/news_right.jsp
	 *	</pre>
	 */
	getRightChannelTab : function(objThis, iLiSeq) {
		var curLocation = document.location;
		var tabCnt = 0;

		if((curLocation.toString()).indexOf("/news/") > -1 || (curLocation.toString()).indexOf("/outer/outer_news.jsp") > -1) {
			tabCnt = 3;
		} else if((curLocation.toString()).indexOf("/global/") > -1) {
			tabCnt = 4;
		}

		var iSeq = (iLiSeq%tabCnt)+1;

		// ������(ul) class�� ����
		objThis.parentNode.className = "global_tab_"+ iSeq +"_selected";

		var aLIs = objThis.parentNode.getElementsByTagName("li");
		var objLI, sLiClass;

		for(var i=0; i<aLIs.length; i++) {
		iSeq = (i%tabCnt)+1;

		if( i == iLiSeq ) {
			sLiClass = "text4 tab"+ iSeq;
		} else {
			sLiClass = "text37 tab"+ iSeq;
		}

		// MouseOver�� li�� class ����
		objLI = aLIs[i];

		//if(objLI!=null) {
		objLI.className = sLiClass;
		//}
		}
	},

	/**
	 *	setRightArticleBox
	 *	@param	pmObjId : ������Ʈ ���̵�
	 *	<pre>
	 *		���õ� ��� �ڽ� ǥ��
	 *		http://sbscnbc.sbs.co.kr/news/news_right.jsp
	 *	</pre>
	 */
	setRightArticleBox : function(pmObjId) {
		if(this.curArticleBoxId != "") cm.getObj(this.curArticleBoxId).className = "text3";
		cm.getObj(pmObjId).className = "text3 on";
		this.curArticleBoxId = pmObjId;

		// ���� ũ��
		cm.setArticleFontSize(0);

		// ���� �ڳ� ���
		if(document.getElementById("cornerParams")) {
			var pmCornerParams = document.getElementById("cornerParams").firstChild.nodeValue;
			cm.getAjax(pmCornerParams,'cornerArticleList','http://sbscnbc.sbs.co.kr/common/common_corner_article.jsp','');
		}
	},

	/**
	 *	setCategoryVodTab
	 *	<pre>
	 *		�����ư : 2�������Ƿ� ������/�Ⱥ����� ���
	 *		http://sbscnbc.sbs.co.kr/news/category_vod.jsp
	 *	</pre>
	 */
	setCategoryVodTab : function() {
		var aDivs = cm.getObj("area_vod").getElementsByTagName("div");

		for(var i=0; i<aDivs.length; i++) {
			var sDisplay = 'none';

			if(aDivs[i].style.display == 'none') {
				sDisplay = 'block';
			}

			aDivs[i].style.display = sDisplay;
		}
	},

	/**
	 *	setRightArticleList
	 *	@param	sParams : Parameters
	 *	<pre>
	 *		��� ����Ʈ ��������
	 *		http://sbscnbc.sbs.co.kr/news/news_right.jsp, http://sbscnbc.sbs.co.kr/global/news_right.jsp
	 *	</pre>
	 */
	setRightArticleList : function(pmParams) {
		var curLocation = document.location;

		if((curLocation.toString()).indexOf("/news/") > -1 || (curLocation.toString()).indexOf("/outer/outer_news.jsp") > -1) {
			cm.getAjax(pmParams, "common_body_right", "http://sbscnbc.sbs.co.kr/news/news_right.jsp", "n.getRightArticleList();");
		} else if((curLocation.toString()).indexOf("/global/") > -1) {
			cm.getAjax(pmParams, "common_body_right", "http://sbscnbc.sbs.co.kr/global/news_right.jsp", "n.getRightArticleList();");
		}
	},

	/**
	 *	setRightArticleListAutoReload
	 *	<pre>
	 *		��� ����Ʈ �ڵ� ���� ��ħ
	 *		http://sbscnbc.sbs.co.kr/news/news_right.jsp, http://sbscnbc.sbs.co.kr/global/news_right.jsp
	 *	</pre>
	 */
	setRightArticleListAutoReload : function() {
		var sInterval = cm.getObj("pmInterval").value;

		if(sInterval == "0") {
			clearInterval(this.interval);
			return;
		}

		n.setRightArticleListParams('');
	},

	/**
	 *	setRightChannelTab
	 *	@param	pmChannel : ä��(ī�װ� �Ǵ� ����)
	 *	<pre>
	 *		ī�װ� �Ǵ� ���Ǻ� ��� ��� ����
	 *		http://sbscnbc.sbs.co.kr/news/news_right.jsp, http://sbscnbc.sbs.co.kr/global/news_right.jsp
	 *	</pre>
	 */
	setRightChannelTab : function(pmChannel) {
		cm.getObj("pmChannel").value = pmChannel;

		var sParams  = "pmDate1="+ cm.getObj("txtDate1").value;
				sParams += "&pmDate2="+ cm.getObj("txtDate2").value;
				sParams += "&pmDate3="+ cm.getObj("txtDate3").value;
				sParams += "&pmChannel="+ cm.getObj("pmChannel").value;
				sParams += "&pmArticleId="+ cm.getObj("pmArticleId").value;

		n.setRightArticleList(sParams);
	},

	/**
	 *	setRightChannelTabPreNext
	 *	@param	pmDirection	: ����
	 *	<pre>
	 *		ī�װ� �Ǵ� ������ ����/����
	 *		http://sbscnbc.sbs.co.kr/news/news_right.jsp
	 *	</pre>
	 */
	setRightChannelTabPreNext : function(pmDirection) {
		var objTab = cm.getObj("global_tab1");
		var aLIs = objTab.getElementsByTagName("li");
		var iPosition;

		// ������ ��Ÿ��
		objTab.className = "global_tab_1_selected";

		// ���� ���̴� ù��° li ��ġ ã��
		for(var i=0; i<aLIs.length; i++) {
			if(aLIs[i].style.display == "block") {
				iPosition = i;
				break;
			}
		}

		// ���̱� ������ ù��° li ��ġ ����
		if(pmDirection == "P") {
			switch(iPosition)
			{
				case 3:
				case 6:
				case 9:
				case 12:
					iPosition -= 3;
			  	break;

				default:
			  	iPosition = 12;
			}
		} else if(pmDirection == "N") {
			switch(iPosition)
			{
				case 0:
				case 3:
				case 6:
				case 9:
					iPosition += 3;
					break;

				default:
					iPosition = 0;
			}
		}

		var sDisplay;

		for(var i=0; i<aLIs.length; i++) {
			sDisplay = "none";

			if(iPosition==12) {
				if(iPosition==i) sDisplay = "block";
			} else {
				if( (i>=iPosition) && (i<=(iPosition+2))) sDisplay = "block";
			}

			aLIs[i].style.display = sDisplay;

			// ù��° li ��Ÿ��
			if(i==iPosition) {
				aLIs[i].className = "text4 tab1";
			}
		}
	}
};

sbscnbc.onair = function() {
	this.isSilverlight = true;
	this.silverlightUrl = "http://ionair.sbs.co.kr/slonair/viewer/onair_cnbc.jsp?ch=1";
	this.wmpUrl = "http://sbscnbc.sbs.co.kr/vod/vod_wmp.jsp?pmArticleId=sbscnbc&pmType=onair";
};

sbscnbc.onair.prototype = {
	/**
	 *	getRelayContent
	 *	<pre>
	 *		�ӱ� ������ ������
	 *		http://sbscnbc.sbs.co.kr/index.jsp
	 *	</pre>
	 */
	getRelayContent : function() {
		var scrollHeight = cm.getObj("comment3_1").scrollHeight;
		var clientHeight = cm.getObj("comment3_1").clientHeight;
		var scrollTop = cm.getObj("comment3_1").scrollTop;
		var goScrolling  = false;
		//alert(scrollHeight);
		//alert(clientHeight+scrollTop);

		if(scrollHeight == (clientHeight+scrollTop)) goScrolling = true;

		cm.getAjax("pmType=read","comment3_1_ul","http://sbscnbc.sbs.co.kr/onair/onair_relay_list.jsp","o.setRelayScrollTop("+goScrolling+")");
	},

	/**
	 *	getViewer
	 *	<pre>
	 *		�¿��� �� ����
	 *		http://sbscnbc.sbs.co.kr/onair/index.jsp
	 *	</pre>
	 */
	getViewer : function() {
		if(this.isSilverlight) {
			document.location.replace(this.silverlightUrl);
		} else {
			document.location.replace(this.wmpUrl);
		}
	},

	/**
	 *	setArticleTab
	 *	@param	objThis	: Mouseover�� li�±� �ڽ�
	 *	@param	iTabSeq	: Tab ����
	 *	@param	iLiSeq	: li ����
	 *	<pre>
	 *		����, ����/����, �۷ι� ���� ��
	 *		http://sbscnbc.sbs.co.kr/onair/onair_article_list.jsp
	 *	</pre>
	 */
	setArticleTab : function(objThis, iTabSeq, iLiSeq) {
		// ������(ul) class�� ����
		objThis.parentNode.parentNode.className = "contents_tab_"+ iLiSeq +"_selected";

		var aLIs = objThis.parentNode.parentNode.getElementsByTagName("li");
		var objLI, objTab;
		var sLiClass, sDiplay;

		for(var i=0; i<aLIs.length; i++) {
			if( (i+1) == iLiSeq ) {
				sLiClass = "text4 tab"+ (i+1);
				sDiplay = "block";
			} else {
				sLiClass = "text20 tab"+ (i+1);
				sDiplay = "none";
			}

			// MouseOver�� li�� class ����
			objLI = aLIs[i];

			if(objLI!=null) {
				objLI.className = sLiClass;
			}

			// MouseOver�� div ������ ǥ��
			objTab = cm.getObj("contents_tab_"+ iTabSeq +"_cont_"+ (i+1));

			if(objTab!=null) {
				objTab.style.display = sDiplay;
			}
		}
	},

	/**
	 *	setBytes
	 *	@param	s	: ����
	 *	<pre>
	 *		�¿��� ��Ʈ�� ��� ����Ʈ ����
	 *		http://sbscnbc.sbs.co.kr/onair/onair_comment_list.jsp
	 *	</pre>
	 */
	setBytes : function(s) {
		cm.getObj("byte").innerHTML = cm.getBytes(s) + "/255  bytes";
	},

	/**
	 *	setBytes
	 *	<pre>
	 *		�¿��� ��Ʈ�� ��� �ڵ� ��ũ��
	 *		http://sbscnbc.sbs.co.kr/onair/onair_comment_list.jsp
	 *	</pre>
	 */
	setCommentScrollTop : function() {
		cm.getObj("comment2_1").scrollTop = cm.getObj("comment2_1_ul").scrollHeight;
	},

	/**
	 *	setNetizenTab
	 *	@param	pmSelectedTab	: ���õ� ��
	 *	<pre>
	 *		�ǽð� ���� ��� / ��Ƽ�� ��� ���� ��
	 *		http://sbscnbc.sbs.co.kr/onair/index.jsp
	 *	</pre>
	 */
	setNetizenTab : function(pmSelectedTab) {
		if(pmSelectedTab == "relay") {
			cm.getObj("relayTabImg").src = "http://img.sbs.co.kr/sbscnbc/img/onair/sms_tit.gif";
			cm.getObj("commentTabImg").src = "http://img.sbs.co.kr/sbscnbc/img/onair/net_tit.gif";
			cm.getObj("comment_ifrm").src = "http://sbscnbc.sbs.co.kr/onair/onair_relay_list.jsp";
		} else if(pmSelectedTab == "comment") {
			cm.getObj("relayTabImg").src = "http://img.sbs.co.kr/sbscnbc/img/onair/sms_tit1.gif";
			cm.getObj("commentTabImg").src = "http://img.sbs.co.kr/sbscnbc/img/onair/net_tit1.gif";
			cm.getObj("comment_ifrm").src = "http://sbscnbc.sbs.co.kr/onair/onair_comment_list.jsp?pmParentId=onair_netiz";
		}
	},

	/**
	 *	setRelayScrollTop
	 *	@param	pmScrolling	: ��ũ�� ����
	 *	<pre>
	 *		�ǽð� ���� ��� ��ũ��
	 *		http://sbscnbc.sbs.co.kr/onair/index.jsp
	 *	</pre>
	 */
	setRelayScrollTop : function(pmScrolling) {
		if(pmScrolling) cm.getObj("comment3_1").scrollTop = cm.getObj("comment3_1").scrollHeight;
	}
};

sbscnbc.vod = function() {
	this.isSilverlight = true;
	this.silverlightUrl = "http://sbscnbc.sbs.co.kr/vod/vod_silverlight.jsp";
	this.flashUrl = "http://sbscnbc.sbs.co.kr/vod/vod_flash.jsp";
	this.flashUrlTest = "http://sbscnbc.sbs.co.kr/vod/vod_flash_test.jsp";
	this.wmpUrl = "http://sbscnbc.sbs.co.kr/vod/vod_wmp.jsp";
	this.curDate = "";
};

sbscnbc.vod.prototype = {
	/**
	 *	getPlayerType
	 *	<pre>
	 *		���� ������ ������ �÷��̾��� ������ �˻� ajax �Ķ���Ϳ� �߰�
	 *		http://sbscnbc.sbs.co.kr/vod/index.jsp
	 *	</pre>
	 */
	getPlayerType : function() {
		var rdoSilver = cm.getObj("pSilverLight");
		var rdoWmp = cm.getObj("pWMP");
		var sPlayer = "silverlight";
		var strParams = "";

		if( rdoSilver != null && rdoWmp != null ) {
			if(rdoWmp.checked) {
				sPlayer = "wmp";
			}

			strParams = "&pmPlayerType="+ sPlayer;
		}

		return strParams;
	},

	/**
	 *	getPopupViewer
	 *	@param	pmArticleId	: ��� ���̵�
	 *	<pre>
	 *		�˾� �� ������
	 *		http://sbscnbc.sbs.co.kr/vod/index.jsp
	 *	</pre>
	 */
	getPopupViewer : function (pmArticleId) {
		v.getPopupWmp(pmArticleId);
	},

	/**
	 *	getPopupWmp
	 *	@param	pmArticleId	: ��� ���̵�
	 *	<pre>
	 *		WMP �� ���
	 *		http://sbscnbc.sbs.co.kr/vod/index.jsp
	 *	</pre>
	 */
	getPopupWmp : function (pmArticleId) {
		var width  = 435;
		var height = 530;
		var left   = (screen.width  - width)/2;
		var top    = (screen.height - height)/2;

		var params = 'width='+width+', height='+height;
		params += ', top='+top+', left='+left;

		var popWindow = window.open(this.wmpUrl+"?pmType=popup&pmArticleId="+ pmArticleId, "vod_wmp", "scrollbars=0, resizable=0, "+ params);
	},

	/**
	 *	getViewer
	 *	<pre>
	 *		VOD �� ����
	 *		http://sbscnbc.sbs.co.kr/vod/index.jsp
	 *	</pre>
	 */
	getViewer : function() {
		var pmArticleId = cm.getParam("pmArticleId");

		if(this.isSilverlight) {
			document.location.replace(this.silverlightUrl+"?pmArticleId="+pmArticleId);
		} else {
			document.location.replace(this.wmpUrl+"?pmArticleId="+pmArticleId);
		}
	},

	getViewer2 : function() {
		var pmArticleId = cm.getParam("pmArticleId");
		document.location.replace(this.flashUrl+"?pmArticleId="+pmArticleId);
	},

	getViewerTest : function() {
		var pmArticleId = cm.getParam("pmArticleId");
		document.location.replace(this.flashUrlTest+"?pmArticleId="+pmArticleId);
	},

	/**
	 *	getVodPage
	 *	@param	pmPage	: ������
	 *	<pre>
	 *		������ ��� ����Ʈ�� ������
	 *		http://sbscnbc.sbs.co.kr/vod/vod_list.jsp
	 *	</pre>
	 */
	getVodPage : function(pmPage){
		cm.getAjax("","content_content","vod_list.jsp?pmProgId="+cm.getObj("pmProgId").value+"&pmDate="+cm.getObj("pmDate").value+"&pmPage="+pmPage,"");
	},
	
	/**
	 *	getArticlePage
	 *	@param	pmPage	: ������
	 *	<pre>
	 *		��� ����Ʈ�� ������
	 *		http://sbscnbc.sbs.co.kr/vod/vod_article_list.jsp
	 *	</pre>
	 */
	getArticlePage : function(pmPage){
		cm.getAjax("","articlelist_content","vod_article_list.jsp?pmProgId="+cm.getObj("pmProgId").value+"&pmPage="+pmPage,"");
	},

	/**
	 *	setArticleList
	 *	@param	pmProgId		: ���α׷� ���̵�
	 *	@param	pmDate			: ��¥
	 *	<pre>
	 *		�߾��ϴ� ��� ���
	 *		http://sbscnbc.sbs.co.kr/vod/index.jsp
	 *	</pre>
	 */
	setArticleList : function(pmProgId, pmDate) {
		var strParams = "pmProgId="+ pmProgId;

		if( (pmDate != null) || (pmDate.length > 0) ) {
			strParams += "&pmDate="+ pmDate;
		}

		cm.getAjax(strParams, "articlelist_content", "vod_article_list.jsp", "");
	},

	/**
	 *	setDate
	 *	@param	pmDateType	: ��¥ Ÿ��
	 *	@param	pmValue	: ��¥ ��
	 *	<pre>
	 *		�˻� ��¥ ����
	 *		http://sbscnbc.sbs.co.kr/vod/vod_list.jsp, http://sbscnbc.sbs.co.kr/vod/vod_calendar.jsp
	 *	</pre>
	 */
	setDate : function(pmDateType, pmValue) {
		var targetDate = "";
		var curDate = "";

		if(v.curDate != "") {
			curDate = v.curDate;
		} else {
			curDate = cm.getObj("vod_calendar").contentWindow.v.curDate;
		}

		if(pmDateType == "") {
			targetDate = pmValue;
		} else if(pmDateType == "Y") {
			targetDate = pmValue+curDate.substring(4,6)+curDate.substring(6,8);
		} else if(pmDateType == "M") {
			targetDate = curDate.substring(0,4)+pmValue+curDate.substring(6,8);
		} else if(pmDateType == "D") {
			targetDate = curDate.substring(0,4)+curDate.substring(4,6)+pmValue;
		}

		if(cm.getDateValid(targetDate)) {
			curDate = targetDate;

			if(pmDateType == "Y" || pmDateType == "M") {
				document.location.href = "vod_calendar.jsp?pmDate="+curDate;
			} else if(pmDateType == "D") {
				parent.cm.getObj("calendar").style.display = "none";
				parent.cm.getAjax("","content_content","vod_list.jsp?pmProgId="+parent.cm.getObj("pmProgId").value+"&pmDate="+curDate,"");
				parent.cm.getAjax("","articlelist_content","vod_article_list.jsp?pmProgId="+parent.cm.getObj("pmProgId").value+"&pmTransDate="+curDate,"");
			} else {
				cm.getAjax("","content_content","vod_list.jsp?pmProgId="+cm.getObj("pmProgId").value+"&pmDate="+curDate,"");
				cm.getAjax("","articlelist_content","vod_article_list.jsp?pmProgId="+cm.getObj("pmProgId").value+"&pmTransDate="+curDate,"");
			}
		} else {
			alert("��ȿ���� ���� ��¥�Դϴ�.\n��¥�� �ٽ� Ȯ���� �ּ���.");
		}
	},

	/**
	 *	setPlayer
	 *	@param	iIndex	: ��� index ��ȣ
	 *	<pre>
	 *		������ ��Ͽ��� Ŭ���� ��ܿ� ������ ����
	 *		http://sbscnbc.sbs.co.kr/vod/vod_list.jsp
	 *	</pre>
	 */
	setPlayer : function(iIndex) {
		var strParams  = "pmArticleId="+ cm.getObj("pmArticleId"+ iIndex).value;
				strParams += "&pmProgId="+ cm.getObj("pmProgId"+ iIndex).value;
				strParams += "&pmVodUniqNo="+ cm.getObj("pmVodUniqNo"+ iIndex).value;

				strParams += v.getPlayerType();

		cm.getAjax(strParams, "video_wrap", "vod_content.jsp", "");
	},

	/**
	 *	setProgContent
	 *	@param	pmProgId		: ���α׷� ���̵�
	 *	<pre>
	 *		���� ���α׷� ��� Ŭ����
	 *		http://sbscnbc.sbs.co.kr/vod/vod_prog_list.jsp
	 *	</pre>
	 */
	setProgContent : function(pmProgId) {
		v.setVodList(pmProgId, '', '');
		v.setArticleList(pmProgId, '');
		cm.getObj("pmProgId").value = pmProgId;
	},

	/**
	 *	setProgList
	 *	@param	pmProgId		: ���α׷� ���̵�
	 *	<pre>
	 *		���� ���α׷� ���
	 *		http://sbscnbc.sbs.co.kr/vod/index.jsp
	 *	</pre>
	 */
	setProgList : function(pmProgId) {
		cm.getAjax("pmProgId="+ pmProgId, "content_left","vod_prog_list.jsp","");
	},

	/**
	 *	setVodContent
	 *	@param	pmProgId		: ���α׷� ���̵�
	 *	@param	pmArticleId	: ��� ���̵�
	 *	<pre>
	 *		ajax(vod_article_list.jsp?pmProgId=) ������ ������ ù��° �������� �ڵ����, ���ID�� �Ѿ���� �ش� ��� ���� ���
	 *		http://sbscnbc.sbs.co.kr/vod/vod_list.jsp
	 *	</pre>
	 */
	setVodContent : function(pmProgId, pmArticleId) {
		objArticleId = cm.getObj("pmArticleId1");

		if( (pmArticleId != null) && (pmArticleId != 'undefined') && (pmArticleId.length > 0) ) {
			cm.getAjax("pmProgId="+ pmProgId +"&pmArticleId="+ pmArticleId, 'video_wrap','vod_content.jsp', '');
		} else {
			if( objArticleId != null ) {
				v.setPlayer(1);
			} else {
				var strParams  = "pmProgId="+ pmProgId;
						strParams += v.getPlayerType();
				cm.getAjax(strParams, 'video_wrap','vod_content.jsp','');
			}
		}
	},

	/**
	 *	setVodList
	 *	@param	pmProgId		: ���α׷� ���̵�
	 *	@param	pmDate			: ��¥
	 *	@param	pmArticleId	: ��� ���̵�
	 *	<pre>
	 *		�߾� VOD ���
	 *		http://sbscnbc.sbs.co.kr/vod/index.jsp
	 *	</pre>
	 */
	setVodList : function(pmProgId, pmDate, pmArticleId) {
		var strParams = "pmProgId="+ pmProgId;

		if( (pmDate != null) || (pmDate.length > 0) ) {
			strParams += "&pmDate="+ pmDate;
		}

		cm.getAjax(strParams, "content_content","vod_list.jsp", "v.setVodContent('"+ pmProgId +"', '"+ pmArticleId +"');");
	}

	

};

sbscnbc.sub = function() {
};

sbscnbc.sub.prototype = {
	/**
	 *	setBroadInfoTab
	 *	@param	pmTabNo	: �ǹ�ȣ
	 *	<pre>
	 *		��û �ȳ� �� ����
	 *		http://sbscnbc.sbs.co.kr/sub/info.jsp
	 *	</pre>
	 */
	setBroadInfoTab : function(pmTabNo) {
		for(var i=1; i<=9; i++) {
			cm.getObj("boardList_img"+i).src = "http://img.sbs.co.kr/sbscnbc/img/about_cnbc/x_ch_tab0"+i+".gif";
			cm.getObj("boardList"+i).style.display = "none";
		}

		cm.getObj("boardList_img"+pmTabNo).src = "http://img.sbs.co.kr/sbscnbc/img/about_cnbc/x_ch_tab0"+pmTabNo+"_on.gif";
		cm.getObj("boardList"+pmTabNo).style.display = "block";
	},

	/**
	 *	setCornerChange
	 *	@param	pmCornerId	: �ڳ� ���̵�
	 *	<pre>
	 *		�ٸ��ڳ� ����
	 *		http://sbscnbc.sbs.co.kr/sub/corner/corner.jsp
	 *	</pre>
	 */
	setCornerChange : function (pmCornerId) {
		if ( pmCornerId != "" ) {
			top.location.href = "corner.jsp?pmCornerId=" + pmCornerId + "&pmCornerType=" + cm.getObj("pmCornerType").value;
		}
	},

	/**
	 *	setCornerPaging
	 *	@param	pmPage	: ������
	 *	<pre>
	 *		�ؽ�Ʈ��, �����, �������� ����¡ ó��
	 *		http://sbscnbc.sbs.co.kr/sub/corner/corner_title.jsp , corner_image.jsp, corner_vod.jsp
	 *	</pre>
	 */
	setCornerPaging : function(pmPage) {
		var url = "http://sbscnbc.sbs.co.kr/sub/corner/corner_" + cm.getObj("pmCornerType").value + ".jsp?pmCornerId=" + cm.getObj("pmCornerId").value + "&pmPage=" + pmPage;
		cm.getAjax("","corner_body_content",url,"");
	},

	/**
	 *	setCornerTab
	 *	@param	cornerType	: �ڳ� Ÿ��(������-title,�����-image,������-vod)
	 *	@param	cornerId	: ��¥
	 *	@param	pmPage		: ������
	 *	<pre>
	 *		�ڳ� ��
	 *		http://sbscnbc.sbs.co.kr/sub/corner/corner.jsp
	 *	</pre>
	 */
	setCornerTab : function ( cornerType, cornerId, pmPage ) {
		var url = "";
		url = "corner_" + cornerType + ".jsp?pmCornerId=" + cornerId;
		if ( pmPage != "" )	{ url += "&pmPage=" + pmPage; }
		switch ( cornerType ) {
			case "title" :
				cm.getObj("list01").className = "dot5_selected";
				cm.getObj("list02").className = "dot6";
				cm.getObj("list03").className = "dot7";
				break;
			case "image" :
				cm.getObj("list01").className = "dot5";
				cm.getObj("list02").className = "dot6_selected";
				cm.getObj("list03").className = "dot7";
				break;
			case "vod" :
				cm.getObj("list01").className = "dot5";
				cm.getObj("list02").className = "dot6";
				cm.getObj("list03").className = "dot7_selected";
				break;
		}
		cm.getAjax("","corner_body_content",url,"");
	},
	/**
	 *	setIssueChange
	 *	@param	pmIssueId	: �ڳ� ���̵�
	 *	<pre>
	 *		�ٸ��ڳ� ����
	 *		http://sbscnbc.sbs.co.kr/sub/corner/issue.jsp
	 *	</pre>
	 */
	setIssueChange : function (pmIssueId) {
		if ( pmIssueId != "" ) {
			top.location.href = "issue.jsp?pmIssueId=" + pmIssueId + "&pmIssueType=" + cm.getObj("pmIssueType").value;
		}
	},

	/**
	 *	setIssuePaging
	 *	@param	pmPage	: ������
	 *	<pre>
	 *		�ؽ�Ʈ��, �����, �������� ����¡ ó��
	 *		http://sbscnbc.sbs.co.kr/sub/corner/issue_title.jsp , issue_image.jsp, issue_vod.jsp
	 *	</pre>
	 */
	setIssuePaging : function(pmPage) {
		var url = "http://sbscnbc.sbs.co.kr/sub/corner/issue_" + cm.getObj("pmIssueType").value + ".jsp?pmIssueId=" + cm.getObj("pmIssueId").value + "&pmPage=" + pmPage;
		cm.getAjax("","issue_body_content",url,"");
	},

	/**
	 *	setIssueTab
	 *	@param	issueType	: �ڳ� Ÿ��(������-title,�����-image,������-vod)
	 *	@param	issueId	: ��¥
	 *	@param	pmPage		: ������
	 *	<pre>
	 *		�ڳ� ��
	 *		http://sbscnbc.sbs.co.kr/sub/corner/issue.jsp
	 *	</pre>
	 */
	setIssueTab : function ( issueType, issueId, pmPage ) {
		var url = "";
		url = "issue_" + issueType + ".jsp?pmIssueId=" + issueId;
		if ( pmPage != "" )	{ url += "&pmPage=" + pmPage; }
		switch ( issueType ) {
			case "title" :
				cm.getObj("list01").className = "dot5_selected";
				cm.getObj("list02").className = "dot6";
				cm.getObj("list03").className = "dot7";
				break;
			case "image" :
				cm.getObj("list01").className = "dot5";
				cm.getObj("list02").className = "dot6_selected";
				cm.getObj("list03").className = "dot7";
				break;
			case "vod" :
				cm.getObj("list01").className = "dot5";
				cm.getObj("list02").className = "dot6";
				cm.getObj("list03").className = "dot7_selected";
				break;
		}
		cm.getAjax("","issue_body_content",url,"");
	},

	/**
	 *	setInfoTab
	 *	@param	pmTabNo	: �ǹ�ȣ
	 *	<pre>
	 *		�ȳ� �� ����
	 *		http://sbscnbc.sbs.co.kr/sub/info.jsp
	 *	</pre>
	 */
	setInfoTab : function(pmTabNo) {
		cm.getObj("contents_tab1").className = "contents_tab_"+pmTabNo+"_selected";
		cm.getObj("contents_tab1_1").className = (pmTabNo == "1" ? "text4" : "text20")+" tab1";
		cm.getObj("contents_tab1_2").className = (pmTabNo == "2" ? "text4" : "text20")+" tab2";
		cm.getObj("contents_tab1_3").className = (pmTabNo == "3" ? "text4" : "text20")+" tab3";

		cm.getObj("contents_tab_1_cont_1").style.display = "none";
		cm.getObj("contents_tab_1_cont_2").style.display = "none";
		cm.getObj("contents_tab_1_cont_3").style.display = "none";

		cm.getObj("contents_tab_1_cont_"+pmTabNo).style.display = "block";
	},

	/**
	 *	setSitemapCorner
	 *	<pre>
	 *		����Ʈ �� �ڳ� ����� ��ũ
	 *		http://sbscnbc.sbs.co.kr/sub/sitemap.jsp
	 *	</pre>
	 */
	setSitemapCorner : function() {
		var pmCorner = cm.getObj("pmCorner").value;

		if(pmCorner != "") {
			document.location.href = "corner/corner.jsp?pmCornerId="+pmCorner;
		}
	}
};

sbscnbc.outer = function() {
};

sbscnbc.outer.prototype = {
	/**
	 *	getCTSTab
	 *	@param	pmTabNo	: �ǹ�ȣ
	 *	<pre>
	 *		thinkpool CTS ��
	 *		http://sbscnbc.sbs.co.kr/outer/thinkpool/thinkpool_cts_list.jsp
	 *	</pre>
	 */
	getCTSTab : function(pmTabNo) {
		var bIsOnair = cm.getObj("pmIsin").value == "" ? true : false;

		if(bIsOnair || pmTabNo == 0) {
			cm.getObj("pmTabNo").value = pmTabNo;
			cm.getObj("pmPage").value = "1";
			cm.getObj("fForm").submit();
		} else {
			// ��� ���� ��ũ
			if(pmTabNo == 1) {
				var viewer_iframe_url = parent.document.getElementById("thinkpool_viewer_iframe").src;
				var vArticleId = viewer_iframe_url.substring(viewer_iframe_url.indexOf("pmArticleId")+12,viewer_iframe_url.indexOf("pmArticleId")+23);

				window.open("http://sbscnbc.sbs.co.kr/read.jsp?pmArticleId="+vArticleId);
			// ��������
			} else if(pmTabNo == 2) {
				window.open("http://sbscnbc.sbs.co.kr/news");
			}
		}
	},

	/**
	 *	setThinkpoolViewer
	 *	@param	pmArticleId : ��� ���̵�
	 *	<pre>
	 *		thinkpool ��� src
	 *		http://sbscnbc.sbs.co.kr/outer/thinkpool/thinkpool_cts_list.jsp
	 *	</pre>
	 */
	setThinkpoolViewer : function(pmArticleId) {
		parent.cm.getObj("thinkpool_viewer_iframe").src = "../../vod/vod_wmp.jsp?pmArticleId="+pmArticleId+"&pmType=thinkpool_cts";
		out.setLiStyle("li_"+pmArticleId);
	},

	/**
	 *	getCTSTab
	 *	@param	pmObject : ������Ʈ
	 *	<pre>
	 *		thinkpool CTS ��
	 *		http://sbscnbc.sbs.co.kr/outer/thinkpool/thinkpool_cts_list.jsp
	 *	</pre>
	 */
	setLiStyle : function(pmObjectId) {
		if(cm.getObj("ul_sbscnbc_list")) {
			var ulObj = cm.getObj("ul_sbscnbc_list");

			for(var i=0; i<ulObj.childNodes.length; i++) {
				var liObj = ulObj.childNodes[i];

				if(liObj.id) {
					if(liObj.id == pmObjectId) {
						liObj.className = liObj.className + " select";
					} else {
						liObj.className = liObj.className.replace("select","");
					}
				}
			}
		}
	},

	/**
	 *	setMarquee
	 *	@param	pmObject : ������Ʈ
	 *	@param	pmScroll : scroll ����
	 *	<pre>
	 *		thinkpool CTS ��
	 *		http://sbscnbc.sbs.co.kr/vod/vod_wmp.jsp
	 *	</pre>
	 */
	setMarquee : function(pmObject, pmScroll) {
		if(pmScroll) {
			pmObject.start();
			// pmObject.scrollAmount = 3;
		} else {
			pmObject.stop();
			// pmObject.scrollAmount = 0;
		}
	}
};

var c = new sbscnbc.comment();
var cm = new sbscnbc.common();
var m = new sbscnbc.main();
var n = new sbscnbc.news();
var o = new sbscnbc.onair();
var v = new sbscnbc.vod();
var s = new sbscnbc.sub();
var out = new sbscnbc.outer();