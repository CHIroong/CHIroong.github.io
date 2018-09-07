var _idn = {
	idnInsElement : [],
	iframe: "/ad/ui/idn_live.html",
	server: "ad.idnad.co.kr",
	userAgent: navigator.userAgent || navigator.vendor || window.opera,
	nuser: 0,
	setCookie: function(cKey, cValue) {
		var date = new Date();
		date.setDate(date.getDate() + 365);
		document.cookie = cKey + '=' + escape(cValue) + ';expires=' + date.toGMTString() + ";path=/"
	},
	uniqid: function(prefix, more_entropy) {
		if (typeof prefix == 'undefined') {
			prefix = "";
		}
		var retId;
		var formatSeed = function(seed, reqWidth) {
			seed = parseInt(seed, 10).toString(16);
			if (reqWidth < seed.length) {
				return seed.slice(seed.length - reqWidth)
			}
			if (reqWidth > seed.length) {
				return Array(1 + (reqWidth - seed.length)).join('0') + seed
			}
			return seed
		};
		
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
		for( var i=0; i < 8; i++ )
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		
		retId = prefix;
		retId += formatSeed(parseInt(new Date().getTime() / 1000, 10), 8);
		retId += text;
		if (more_entropy) {
			retId += (Math.random() * 10).toFixed(8).toString()
		}
		return retId
	},
	makeRandom: function(min, max){
		var val = Math.random() * (max- min) + min;
		return Math.floor(val);
	},
	getAdOffset: function(imgInfo, param, _idnIlike) {
		var returnArr = {target: 'body', left: '', top: ''};
		if (typeof(imgInfo) == 'undefined' || imgInfo == null) imgInfo = _idn.getImgInfo(_idnIlike);
		var photo = {
			"position": {
				"v": _idnIlike["position"]?_idnIlike["position"]["v"]:null
				|| _idnIlike["photo_margin_top"]?(_idnIlike["photo_margin_top"]=="center"?"center":_idnIlike["photo_margin_top"]=="random"?"random":"top"):null
				|| _idnIlike["photo_margin_bottom"]?(_idnIlike["photo_margin_bottom"]=="center"?"center":_idnIlike["photo_margin_bottom"]=="random"?"random":"bottom"):null
					|| "center"
				,"h": _idnIlike["position"]?_idnIlike["position"]["h"]:_idnIlike["photo_position"] || "center"
			}
			,"margin": {
				"top": _idnIlike["margin"]?_idnIlike["margin"]["top"]:parseInt(_idnIlike["photo_margin_top"]) || 0
				,"bottom" : _idnIlike["margin"]?_idnIlike["margin"]["bottom"]:parseInt(_idnIlike["photo_margin_bottom"]) || 0
				,"left" : _idnIlike["margin"]?_idnIlike["margin"]["left"]:0
				,"right" : _idnIlike["margin"]?_idnIlike["margin"]["right"]:0
			}
			,"zone": _idnIlike["zone"] || _idnIlike["photo_move_zone"] || 1
		}
		
		returnArr.top = imgInfo.absoluteTop;
		switch(photo["position"]["v"]){
			case 'top':
				returnArr.top += photo["margin"]["top"];
				break;
			case 'bottom':
				returnArr.top += imgInfo.imgHeight;
				returnArr.top -= photo["margin"]["bottom"];
				returnArr.top -= param.height;
				break;
			case 'random':
				returnArr.top += this.makeRandom(0, (imgInfo.imgHeight*photo["zone"]-param.height));
				break;
			default:
				returnArr.top += (imgInfo.imgHeight-param.height)/2; // center default
				break;
		}
		
		switch(photo["position"]["h"]){
			case 'left':
				returnArr.left = Math.floor(imgInfo.absoluteLeft);
				break;
			case 'right':
				returnArr.left = Math.floor(imgInfo.absoluteLeft + (imgInfo.imgWidth-param.width));
				break;
			case 'random':
				returnArr.randNum = this.makeRandom(0, (imgInfo.imgWidth-param.width));
				returnArr.left = Math.floor(imgInfo.absoluteLeft + returnArr.randNum);
				break;
			default:
				returnArr.left = Math.floor(imgInfo.absoluteLeft + ((imgInfo.imgWidth-param.width)/2)); // center default
				break;
		}
		returnArr.top = Math.floor(returnArr.top);
		
		return returnArr;
	},
	getImgInfo: function(photo) {
		var returnArr = null;
		var contentsArea = null;
		var number = photo["number"]-1 || photo["photo_number"]-1 || 0;
		try {
			if(photo["element"]) {
				contentsArea = photo["element"];
			}
			else {
				if(photo["photo_area_type"] == "id") {
					contentsArea = document.getElementById(photo["photo_area"]);
				}else{
					try {
						contentsArea = document.getElementsByClassName(photo["photo_area"])[0]; // IE9+
					}
					catch(e) {
						contentsArea = document.querySelectorAll('.'+photo["photo_area"])[0]; // IE8...
					}
				}
			}
			
			while(contentsArea.getElementsByTagName("img")[number].width<=0 || contentsArea.getElementsByTagName("img")[number].height<=0){
				if(number > 5){
					break;
				}
				number++;
			}
			
			returnArr = {
				imgWidth: contentsArea.getElementsByTagName("img")[number].width,
				imgHeight: contentsArea.getElementsByTagName("img")[number].height,
				absoluteTop: contentsArea.getElementsByTagName("img")[number].getBoundingClientRect().top + (window.scrollY || window.pageYOffset || document.documentElement.scrollTop),
				absoluteLeft: contentsArea.getElementsByTagName("img")[number].getBoundingClientRect().left + (window.scrollX || window.pageXOffset || document.documentElement.scrollLeft)
			};
		} catch (e) {
			returnArr = null;
		}
		return returnArr;
	},
	offsetTop: function(el) {
		return el ? el.offsetTop + this.offsetTop(el.offsetParent) : 0;
	},
	offsetLeft: function(el) {
		return el ? el.offsetLeft + this.offsetLeft(el.offsetParent) : 0;
	},
	contentSlide: function(p) {
		var el       = p.el;
		var size     = p.size;
		var set      = p.set;
		var close    = p.close;
		var slideSet = parseFloat(set==="down"?el.style.height:set==="side"?el.style.width:"error");
		if((this.offsetTop(el) <= ((document.body.scrollTop || document.documentElement.scrollTop)+window.innerHeight*0.6) || close === true) && slideSet !== "error" && el.style.display != "none") {
			var slide = setInterval(function() {
				if(parseFloat(slideSet) < size && !close) {
					slideSet += ((slideSet > parseFloat(size*0.9)) ? 1 : (slideSet > parseFloat(size*0.7)) ? 4: (slideSet > parseFloat(size*0.5)) ? 10 : 20);
					slideSet = slideSet>size?size:slideSet;
				} else if (parseFloat(slideSet) > 0 && close) {
					slideSet -= ((slideSet < parseFloat(size * 0.1)) ? 1 : (slideSet < parseFloat(size * 0.6)) ? 4 : (slideSet < parseFloat(size * 1)) ? 10 : 20);
					slideSet = slideSet<0?0:slideSet;
				}
				if(set==="down") el.style.setProperty("height", slideSet+"px", "important");
				else if(set==="side") el.style.setProperty("width", slideSet+"px", "important");
				if((parseFloat(slideSet) >= size && !close) || (parseFloat(slideSet) <= 0 && close)) {
					if (close) el.style.display = "none";
					clearInterval(slide);
				}
			}, 10);
			return "ok";
		}
	},
	clientSlide: function(p) {
		var param           = p.param;
		var div_uniq_id     = p.div_uniq_id;
		var v_pos           = p.v_pos;
		var slide_direction = p.slide_direction;
		var slide_close     = p.slide_close;
		var interval        = p.interval;
		var wait_interval   = p.wait_interval;
		var obj             = document.getElementById(div_uniq_id);
		var sideSub         = v_pos.split(':');
		var width           = parseInt(param.width)+parseInt(sideSub[1]);
		if(slide_direction == "left"){
			obj.style.left = "-"+parseInt(param.width)+"px";
		}else if(slide_direction == "right"){
			obj.style.right = "-"+parseInt(param.width)+"px";
		}
		obj.style.display = "";
		setTimeout(function() {
			var i = 0;
			var show_interval = setInterval(function() {
				i = i + ((i > 95) ? 0.5 : (i > 80) ? 1 : (i > 70) ? 2 : 5);
				i = i > 100 ? 100 : i;
				if(slide_direction == "left"){
					obj.style.marginLeft = (i * (width / 100))+"px";
				}else if(slide_direction == "right"){
					obj.style.marginRight = (i * (width / 100))+"px";
				}
				
				if (i == 100) {
					if(slide_close) {
						setTimeout(function() {
							var j = 100;
							var close_interval = setInterval(function() {
								j = j - ((j > 95) ? 0.5 : (j > 80) ? 1 : (j > 70) ? 2 : 5);
								j = j < 0 ? 0 : j;
								if(slide_direction == "left"){
									obj.style.marginLeft = (j * (width / 100))+"px";
								}else if(slide_direction == "right"){
									obj.style.marginRight = (j * (width / 100))+"px";
								}
								if (j == 0) {
									clearInterval(close_interval);
								}
							}, interval);
						}, slide_close*1000);
					}
					clearInterval(show_interval);
				}
			}, interval);
		}, wait_interval);
	},
	insertAfter: function (moveElement, beforeElement) {
		beforeElement.parentNode.insertBefore(moveElement, beforeElement.nextSibling);
	},
	setting: function(param, div_uniq_id, _idnIlike) {
		try {
			var grid_mode = "iframe";
			var onLog = true;
			if (typeof _idnIlike["key"] !== "undefined") {
				grid_mode = "menual";
				var h_pos = "";
				var v_pos = "";
				var h_xpos = "";
				var v_xpos = "";
				this.pos = {};
				this.xpos = {};
				this.pos.mode = _idnIlike.banner_position || "";
				this.xpos.pos = _idnIlike.close_button_position || "";
				this.xpos.size = "20";
				this.xpos.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAAAAACo4kLRAAAAdElEQVQY07WOOwqEMABEX+8drAIiRmw8gsdaiGCfi3jIt4WJ7q+w2amGx8ww8C89vgzs5sNk9xPOmgCSzlc06tY0m8bX0aj6waBT7bgBV9X1nSVdlvKhKusAg/VvyY0A45UNQfvD9hpCwe1UO1N71n/CW3oCUXI6c0yjXSUAAAAASUVORK5CYII=";
				
				var position = _idnIlike["position"] || "fixed";
				var z_index = _idnIlike["z_index"] || "999998";
				var slideDefault = !!(_idnIlike["scroll_event"] == "off_scroll_slide" || _idnIlike["slide_state"] == "on");
				if (this.pos.mode) {
					if(this.pos.mode=='center'){
						h_pos = 'left:50%; margin-left: -'+parseInt(param.width / 2)+'px;';
						v_pos = 'top:50%; margin-top: -'+parseInt(param.height / 2)+'px;';
					}
					else{
						if(this.pos.mode.split('_')[0].split(':')[1]){
							h_pos = this.pos.mode.split('_')[0].split(':')[0] + ': '+this.pos.mode.split('_')[0].split(':')[1];
						}else{
							if(this.pos.mode.split('_')[0]=='center'){
								h_pos = 'top:50%; margin-top: -'+parseInt(param.height / 2)+'px;';
							}
							else{
								h_pos = this.pos.mode.split('_')[0] + ':' + (slideDefault?"80px":"0");
							}
						}
						
						if(this.pos.mode.split('_')[1].split(':')[1]){
							v_pos = this.pos.mode.split('_')[1].split(':')[0] + ': '+this.pos.mode.split('_')[1].split(':')[1];
						}
						else{
							if(this.pos.mode.split('_')[1]=='center'){
								v_pos = 'left:50%; margin-left: -'+parseInt(param.width / 2)+'px;';
							}
							else{
								v_pos = this.pos.mode.split('_')[1] + ':' + (slideDefault?"15px":"0");
							}
						}
					}
					
					this.pos.style = 'position:'+position+'; ' + v_pos + '; ' + h_pos + ';';
					
					if(slideDefault) {
						this.pos.style += 'display:none';
					}
				}
				
				if (_idnIlike["close_button_size"]) {
					this.xpos.size = _idnIlike["close_button_size"];
					if(this.xpos.size > 20) {
						this.xpos.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAYUExURaCgoFRUVObm5tXV1b6+vhISEv///wAAAG4mtYgAAAC7SURBVHjapJPbDsMgDEMTiNn///EozZVWaNLyBsYOOaWEYxE+h/pR5u0UOMs8OqprUMg8xmhJh8wNMvlSR/bL2iCV0ddS4MlXNbZwtHsDnjwLcbXsD28Mpvr0SwoKLJrfNZl3atZyHeInVPUXBJm59tdbPWXZzUX25v0lXFkVfmkwnbeVfJeNVeVvUINV8As5szJ+/kn0VsZKozrKc2g7P7Fwqqzu/gLvTeWpLV3yYMSvD/zvv+RYXwEGABQUFO8GQFs7AAAAAElFTkSuQmCC";
					}
				}
				
				if (this.xpos.pos) {
					// 150x150 size s3dpop 광고 진행시 random 사용불가
					if(this.xpos.pos == "random") {
						var xposRand = "0"+this.makeRandom(0, 3).toString(2);
						xposRand = xposRand.slice(-2);
						
						h_xpos = (xposRand[0]=="0"?"top":"bottom") + ':0;';
						v_xpos = (xposRand[1]=="0"?"left":"right") + ':0;';
					}
					else{
						h_xpos = this.xpos.pos.split('_')[1] + ':0;';
						v_xpos = this.xpos.pos.split('_')[0] + ':0;';
					}
					this.xpos.style = 'display:none; padding:0; cursor:pointer; position:absolute; width:' + this.xpos.size + 'px !important; height:' + this.xpos.size + 'px !important;' + h_xpos + ' ' + v_xpos
				}
			}
		} catch (e) {
			this.log("setting : IDN Setting Error", e);
		}
		
		var _idnID = this._idnID = this.uniqid("_IDN") + "" + Math.round(100000 * Math.random());
		var str_param = "";
		var str = [];
		var encode_type = param.encode_type;
		param.inpos = _idnIlike.close_button_position?_idnIlike.close_button_position.split('_')[1]:param.inpos;
		var _return = "";
		var email_regex = /[^\|=(%(25)*7C|3D)][_\.0-9a-zA-Z-]+(%(25)*40|@)[0-9a-zA-Z][0-9a-zA-Z-]+\.+[a-zA-Z]{2,6}/gi;
		for (key in param) {
			param[key] = typeof param[key]=== 'string'?param[key].replace(email_regex, ""):param[key];
			if(key !== "rurl")
				str.push(encode_type === "escape" ? key + "=" + escape(param[key]) : encode_type === "encodeURI" ? key + "=" + encodeURI(param[key]) : key + "=" + encodeURIComponent(param[key]))
		}
		str_param = str.join("&");
		var src = "//" + param.domain + "" + this.iframe + "?" + str_param;
		switch (grid_mode) {
			case "menual":
				if (_idnIlike.hasOwnProperty("kakao") && _idnIlike["kakao"] && window.location.search.match('&kko')) {
					// kakao page 유입지면 광고차단
				}
				else {
					var height = parseInt(param.height);
					
					if (_idnIlike["close_button_side"] != "in") height += parseInt(this.xpos.size);
					var idn_ad_div = createElement("div", {"id":div_uniq_id, "style": "z-index:" + z_index + "; display:inline-block; position:relative; overflow:hidden; height:" + height + "px; " + this.pos.style}, document.getElementById("div_" + param.aimc))
					var idnEventId = _idnIlike["scroll_event"] ? _idnIlike["scroll_event"] + "_" + param.aimc : param.aimc;
					var on_scroll_style = this.xpos.pos.split('_')[0] == "top" && _idnIlike["close_button_side"] != "in" ? this.xpos.size : 0;
					var scroll_div = createElement("div", {"id":idnEventId , "style":"padding-top:" + on_scroll_style + "px; height:" + param.height + "px"}, idn_ad_div);
					
					if (this.xpos.pos) {
						createElement("img", {"id":"close_btn_" + _idnID , "style":this.xpos.style, "src":this.xpos.src, "width":this.xpos.size+"px", "height":this.xpos.size+"px"}, scroll_div);
						if(!_idnIlike['content_slide_direction'])
						{
							document.getElementById("close_btn_" + _idnID).onclick = function() {
								_idn.close(idn_ad_div.id);
							}
						}
					}
					
					createElement("iframe", {"id" : "idnframe_"+_idnID, "name" : "idnframe_"+_idnID, "src" : src , "allowTransparency" : true, "seamless" : "seamless", "frameBorder" : 0 , "scrolling" : "no", "border" : 0, "marginWidth" : 0, "marginHeight" : 0, "width" : param.width, "height" : param.height, "style" : "width:"+param.width+"px !important; height:"+param.height+"px !important", "onload":"_idn.iframeload(\"" + _idnID + "\")"}, scroll_div);
					
					if(_idnIlike["banner_type"] == "mirror") {
						idn_ad_div.style.overflow = "inherit";
						if(_idnIlike.close_size > 20) {var close_src = "data:image/png;base64," +
							"iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAYUExURaCgoFRUVObm5tXV1b6+vhISEv///wAAAG4mtYgAAAC7SURBVHjapJPbDsMgDEMTiNn///EozZVWaNLyBsYOOaWEYxE+h/pR5u0UOMs8OqprUMg8xmhJh8wNMvlSR/bL2iCV0ddS4MlXNbZwtHsDnjwLcbXsD28Mpvr0SwoKLJrfNZl3atZyHeInVPUXBJm59tdbPWXZzUX25v0lXFkVfmkwnbeVfJeNVeVvUINV8As5szJ+/kn0VsZKozrKc2g7P7Fwqqzu/gLvTeWpLV3yYMSvD/zvv+RYXwEGABQUFO8GQFs7AAAAAElFTkSuQmCC";}
						else {var close_src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAAAAACo4kLRAAAAdElEQVQY07WOOwqEMABEX+8drAIiRmw8gsdaiGCfi3jIt4WJ7q+w2amGx8ww8C89vgzs5sNk9xPOmgCSzlc06tY0m8bX0aj6waBT7bgBV9X1nSVdlvKhKusAg/VvyY0A45UNQfvD9hpCwe1UO1N71n/CW3oCUXI6c0yjXSUAAAAASUVORK5CYII=";}
						var mirror = createElement("div", {"id" : "idn_mirror_"+_idnID, "style" : "width:"+param.width+"px !important; height:"+param.height+"px !important; position: absolute; left: "+(_idnIlike.pos=="left"?"-":"")+(parseInt(param.width)+parseInt(_idnIlike.margin))+"px; top:0"}, scroll_div);
						createElement("iframe", {"id" : "idnframe_mirror_"+_idnID, "name" : "idnframe_mirror_"+_idnID, "src" : src , "allowTransparency" : true, "seamless" : "seamless", "frameBorder" : 0 , "scrolling" : "no", "border" : 0, "marginWidth" : 0, "marginHeight" : 0, "width" : param.width, "height" : param.height, "style" : "width:"+param.width+"px !important; height:"+param.height+"px !important; ", "onload":"_idn.iframeload(\"" + _idnID + "\")"}, mirror);
						var close = createElement("img", {"id":"mirror_x_btn_" + _idnID , "style":"padding:0; cursor:pointer; position:absolute; width:"+_idnIlike.close_size+"px !important; height:"+_idnIlike.close_size+"px !important; "+_idnIlike.close_position.v+":0;"+_idnIlike.close_position.h+":0", "src":close_src, "width":_idnIlike.close_size+"px", "height":_idnIlike.close_size+"px"}, mirror);
						close.onclick = function() {
							mirror.outerHTML = "";
							delete mirror;
						}
					}
					
					if (_idnIlike["banner_type"] === "overlay") {
						if(_idnIlike["close_button_side"] === "in" && document.documentElement.clientWidth > (parseInt(param.width)+24)) {
							createElement("img", {"id":"close_btn_" + _idnID , "style":"padding:0; cursor:pointer; position:absolute; width:12px !important; height:50px !important; right:0", "src":"data:image/false;base64,R0lGODlhDAAyAIAAANDQ0AAAACH5BAAAAAAALAAAAAAMADIAAAJIjI+pCdr4TIRyyekwDZrvo3XWmAHdhIUfuFarSMbmPLeOjMc6V9+sjfK5WsESbDeKmBi/oufpUm6kECpyR6N9Hk7udgj1XkkFADs=", "width":"12px", "height":"50px"}, scroll_div);
							document.getElementById("close_btn_" + _idnID).onclick = function() {
								_idn.close(idn_ad_div.id);
							}
						}
						
						var innerObj = document.getElementById(idnEventId);
						innerObj.style.width = param.width+"px";
						innerObj.style.margin = "0 auto";
						
						var obj = document.getElementById(div_uniq_id);
						obj.style.backgroundColor = _idnIlike["banner_background"];
						obj.style.width = "100%";
						obj.style.height = param.height+"px";
					}
					
					if (_idnIlike["photo"] || (_idnIlike["photo_area_type"] && _idnIlike["photo_area"])) {
						var photo = _idnIlike["photo"] || _idnIlike;
						var imgInfo = _idn.getImgInfo(photo);
						
						if (imgInfo.imgWidth > param.width && imgInfo.imgHeight > param.height) {
							var adOffset = _idn.getAdOffset(imgInfo, param, photo);
							
							var obj = document.getElementById(div_uniq_id);
							obj.style.position = "absolute";
							obj.style.left = adOffset.left + "px";
							obj.style.top = adOffset.top + "px";
							obj.style.margin = "0px";
							
							var element;
							if(photo["element"]) {
								if(!photo["element"].id) photo["element"].setAttribute('id', "idn_photo"+_idnID);
								element = "document.getElementById('"+photo["element"].id+"')";
							}
							else {
								if(_idnIlike["photo_area_type"] == "id") {
									element = "document.getElementById('"+_idnIlike["photo_area"]+"')";
								}else{
									try {
										element = "document.getElementsByClassName('"+_idnIlike["photo_area"]+"')[0]"; // IE9+
									}
									catch(e) {
										element = "document.querySelectorAll('."+_idnIlike["photo_area"]+"')[0]"; // IE8...
									}
								}
							}
							var _script = "window.onresize = function(){";
							_script += "	var element="+element+".getElementsByTagName(\"img\")["+(_idnIlike["photo_number"]-1)+"];";
							_script += "	var elWidth=element.clientWidth || element.getBoundingClientRect().width;";
							var photo_pos = _idnIlike["position"]?_idnIlike["position"]["h"]:_idnIlike["photo_position"] || "center";
							switch(photo_pos){
								case 'left':
									_script += "	var left = element.getBoundingClientRect().left;";
									break;
								case 'right':
									_script += "	var left = element.getBoundingClientRect().left + (elWidth - document.getElementById('"+div_uniq_id+"').getBoundingClientRect().width);";
									break;
								case 'random':
									_script += "	var left = element.getBoundingClientRect().left + "+adOffset.randNum+";";
									break;
								default:
									_script += "	var left = element.getBoundingClientRect().left + ((elWidth - document.getElementById('"+div_uniq_id+"').getBoundingClientRect().width)/2);";
									break;
							}
							_script += "	document.getElementById('"+div_uniq_id+"').style.left = left+'px';";
							_script += "}";
							
							var script = document.createElement("script");
							script.type = "text/javascript";
							script.text = _script;
							document.getElementById(div_uniq_id).appendChild(script);
						}else{
							document.getElementById(div_uniq_id).style.display = "none";
							onLog = false;
						}
					}
					
					if (_idnIlike["auto_close"]) {
						setTimeout(function() {
							_idn.close(idn_ad_div.id);
						}, _idnIlike["auto_close"]*1000);
					}
					if (_idnIlike["fade_in_state"] == "on") {
						var level = null;
						var timer = null;
						level = 0;
						timer = setInterval(function() {
							var obj = document.getElementById(idnEventId);
							level = level + 0.1;
							obj.style.opacity = level;
							obj.style.MozOpacity = level;
							obj.style.KhtmlOpacity = level;
							obj.style.MsFilter = "'progid:DXImageTransform.Microsoft.Alpha(Opacity=" + (level * 100) + ")'";
							obj.style.filter = "alpha(opacity=" + (level * 100) + ");";
							if (level > 1) clearInterval(timer)
						}, _idnIlike["fade_in_interval"] || 100)
					}
					if (_idnIlike["slide_state"] == "on") {
						var slide_direction = _idnIlike[param.aimc + "_slide_direction"];
						_idn.clientSlide({
							param: param,
							div_uniq_id: div_uniq_id,
							v_pos: v_pos,
							slide_direction: slide_direction,
							slide_close: _idnIlike[param.aimc + "_slide_close"] || "",
							interval: _idnIlike[param.aimc + "_scroll_event_interval"] || 10,
							wait_interval: _idnIlike[param.aimc + "_scroll_event_wait_interval"] || 1000
						});
					}
					if (_idnIlike["scroll_event"]) {
						var interval = null;
						var wait_interval = null;
						var show_interval = 10;
						var hide_interval = null;
						var size = parseInt(param.height);
						var i = 1;
						var level = null;
						var timer = null;
						switch (_idnIlike["scroll_event"]) {
							case "scroll_view":
								var obj = document.getElementById(idnEventId);
								var flag = true;
								var top = _idnIlike["scroll_event_top_hidden"]?_idnIlike["scroll_event_top_hidden"]:null;
								var bottom = _idnIlike["scroll_event_bottom_hidden"]?_idnIlike["scroll_event_bottom_hidden"]:null;
								var reverse = _idnIlike["scroll_event_reverse"]?_idnIlike["scroll_event_reverse"]:"";
								var none = reverse?"":"none";
								var show = reverse?"none":"";
								var hiddenObj;
								var hiddenFlag = false;
								
								if(top) { obj.style.display = none };
								if(bottom) { obj.style.display = show };
								setTimeout(function() {
									window.onscroll = function(){
										if(flag && obj.style.display=="none" && !top && !bottom){
											obj.style.display = "";
											flag = false;
										}else{
											if(top) {
												if (document.body.scrollTop <= top) {
													obj.style.display = none;
												} else {
													obj.style.display = show;
												}
											}
											
											if(bottom) {
												var docHeight = document.body.offsetHeight == undefined ? window.document.documentElement.scrollHeight : document.body.offsetHeight;
												
												var winheight = winheight == window.innerHeight ? document.documentElement.clientHeight : window.innerHeight;
												
												var scrollpoint = window.scrollY == undefined ? window.document.documentElement.scrollTop : window.scrollY;
												
												if(_idnIlike["scroll_event_hidden_object_type"] && _idnIlike["scroll_event_hidden_object"]){
													if(_idnIlike["scroll_event_hidden_object_type"] == "id") {
														hiddenObj = document.getElementById(_idnIlike["scroll_event_hidden_object"]);
													}else{
														try {
															hiddenObj = document.getElementsByClassName(_idnIlike["scroll_event_hidden_object"])[0]; // IE9+
														}
														catch(e) {
															hiddenObj = document.querySelectorAll('.'+_idnIlike["scroll_event_hidden_object"])[0]; // IE8...
														}
													}
													var hObjY = hiddenObj.offsetTop;
												}
												
												if(obj.style.display == "" && _idnIlike["scroll_event_hidden_object_type"] && hiddenObj){
													if(window.scrollY < hObjY - param.height && hiddenFlag == false){
														obj.style.display = show;
														hiddenFlag = true;
													}
												}else{
													if ((scrollpoint + winheight) >= docHeight - bottom) {
														obj.style.display = none;
													}
													else {
														if(window.scrollY > hObjY && hiddenFlag == true){
															obj.style.display = none;
															hiddenFlag = false;
														}else{
															obj.style.display = show;
														}
													}
												}
											}
										}
									};}, 1000);
								break;
							case "on_scroll_toast":
								window[idnEventId + "_event"] = (function() {
									var obj = document.getElementById(idnEventId);
									if (interval != null || obj == null || obj.style.paddingTop != param.height + "px") return false;
									obj.style.paddingTop = "0";
									obj.style.display = "";
									interval = setInterval(function() {
										if (i >= 100) clearInterval(interval);
										obj.style.height = (i * (size / 100)) + "px";
										i = i + ((i > 95) ? 0.5 : (i > 80) ? 1 : (i > 70) ? 2 : 5);
										i = i > 100 ? 100 : i
									}, 10);
									wait_interval = setInterval(function() {
										i = 1;
										hide_interval = setInterval(function() {
											if (i >= 100) {
												obj.style.display = "none";
												clearInterval(hide_interval)
											}
											obj.style.paddingTop = 0 + (i * (size / 100)) + "px";
											i = i + ((i > 95) ? 0.5 : (i > 80) ? 1 : (i > 70) ? 2 : 5);
											i = i > 100 ? 100 : i
										}, _idnIlike[param.aimc + "_scroll_event_interval"] || 10);
										clearInterval(wait_interval);
										interval = null
									}, _idnIlike[param.aimc + "_scroll_event_wait_interval"] || 3000)
								});
								break;
							case "off_scroll_toast":
								window[idnEventId + "_event"] = (function() {
									var obj = document.getElementById(idnEventId);
									var button_obj = document.getElementById("close_btn_" + _idnID);
									var height = parseInt(param.height);
									if (obj == null || parseInt(obj.style.paddingTop.replace("px", "")) < size && on_scroll_style < parseInt(obj.style.paddingTop.replace("px", ""))) return false;
									obj.style.display = "none";
									button_obj.style.display = "none";
									obj.style.paddingTop = height + on_scroll_style + "px";
									clearInterval(wait_interval);
									wait_interval = setInterval(function() {
										i = 1;
										obj.style.display = "";
										if (_idnIlike["show_slide"] == "off") {
											obj.style.paddingTop = "0px";
											button_obj.style.display = "";
										} else {
											if (i >= 100) {
												clearInterval(this.show_interval)
											}
											show_interval = setInterval(function () {
												if (i >= 100) {
													button_obj.style.display = "";
													clearInterval(show_interval)
												}
												obj.style.paddingTop = height + on_scroll_style - (i * (size / 100)) + "px";
												i = i + ((i > 95) ? 0.5 : (i > 80) ? 1 : (i > 70) ? 2 : 5);
												i = i > 100 ? 100 : i
											}, _idnIlike[param.aimc + "_scroll_event_interval"] || 10);
										}
										clearInterval(wait_interval);
										wait_interval = null
									}, _idnIlike[param.aimc + "_scroll_event_wait_interval"] || 1000)
								});
								break;
							case "off_scroll_slide":
								var banner_stop;
								window[idnEventId + "_event"] = (function() {
									var slide_direction = _idnIlike[param.aimc + "_slide_direction"];
									if(slide_direction && slide_direction != "undefined" && banner_stop != "ok") {
										_idn.clientSlide({
											param: param,
											div_uniq_id: div_uniq_id,
											v_pos: v_pos,
											slide_direction: slide_direction,
											slide_close: _idnIlike[param.aimc + "_slide_close"] || "",
											interval: _idnIlike[param.aimc + "_scroll_event_interval"] || 10,
											wait_interval: _idnIlike[param.aimc + "_scroll_event_wait_interval"] || 1000
										});
										banner_stop = "ok";
									}
								});
								break;
							case "off_scroll_fade":
								window[idnEventId + "_event"] = (function() {
									var obj = document.getElementById(idnEventId);
									if (timer != null || !obj) {
										return false
									}
									obj.style.opacity = 0;
									obj.style.display = "none";
									obj.style.MsFilter = "'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)'";
									obj.style.filter = "alpha(opacity='0');";
									clearInterval(wait_interval);
									wait_interval = setInterval(function() {
										obj.style.display = "";
										i = 1;
										if (i >= 100) clearInterval(timer);
										level = 0;
										timer = setInterval(function() {
											var obj = document.getElementById(idnEventId);
											level = level + 0.1;
											obj.style.opacity = level;
											obj.style.MozOpacity = level;
											obj.style.KhtmlOpacity = level;
											obj.style.MsFilter = "'progid:DXImageTransform.Microsoft.Alpha(Opacity=" + (level * 100) + ")'";
											obj.style.filter = "alpha(opacity=" + (level * 100) + ");";
											if (level > 1) {
												clearInterval(timer);
												timer = null
											}
										}, _idnIlike[param.aimc + "_scroll_event_interval"] || 100);
										clearInterval(wait_interval);
										wait_interval = null
									}, _idnIlike[param.aimc + "_scroll_event_wait_interval"] || 1000)
								});
								break;
							case "content_slide":
								var div = document.getElementById("div_"+param.aimc);
								var beforeElement = (typeof _idnIlike.content_slide_element === "function" ? _idnIlike.content_slide_element() : _idnIlike.content_slide_element) || "";
								if(beforeElement) { this.insertAfter(div, beforeElement); }
								
								var set = _idnIlike["content_slide_direction"] || "";
								switch(set){
									case "down":
										div.style.setProperty("width", "100%", "important");
										div.style.setProperty("height", "0", "important");
										div.style.setProperty("margin-bottom", "10px", "important");
										div.style.setProperty("text-align", "center", "important");
										size = param.height;
										break;
									case "left":
									case "right":
										div.style.setProperty("width", "0", "important");
										div.style.setProperty("height", height+"px", "important");
										div.style.setProperty("margin-"+(set==="left"?"right":"left"), "10px", "important");
										div.style.setProperty("margin-top", "10px", "important");
										div.style.setProperty("margin-bottom", "10px", "important");
										div.style.setProperty("float", set, "important");
										size = param.width;
									
								}
								div.style.setProperty("overflow", "hidden", "important");
								div.style.setProperty("display", "inline-block", "important");
								document.getElementById("close_btn_" + _idnID).onclick = function() {
									_idn.contentSlide({
										el: div,
										size: size,
										set: (set == "left" || set == "right" ? "side" : set),
										close: true
									});
								};
								
								var banner_stop;
								window[idnEventId + "_event"] = (function() {
									if(banner_stop != "ok") {
										banner_stop = _idn.contentSlide({
											el: div,
											size: size,
											set: (set == "left" || set == "right" ? "side" : set),
											close: false
										});
									}
								});
								break;
						}
						if (typeof window.addEventListener != "undefined") {
							window.addEventListener('scroll', window[idnEventId + "_event"], true)
						} else if (typeof window.attachEvent != "undefined") {
							window.attachEvent("on" + 'scroll', window[idnEventId + "_event"])
						}
					}
					
				}
				break;
			case "iframe" :
				var div_area = document.getElementById(div_uniq_id);
				createElement("iframe", {"id" : "idnframe_"+_idnID, "name" : "idnframe_"+_idnID, "src" : src , "allowTransparency" : true, "seamless" : "seamless", "frameBorder" : 0 , "scrolling" : "no", "border" : 0, "marginWidth" : 0, "marginHeight" : 0, "width" : param.width, "height" : param.height, "style" : "width:"+param.width+"px !important; height:"+param.height+"px !important"}, div_area);
				break;
		}
	},
	getMetaContent: function(n) {
		var metas = document.getElementsByTagName('meta');
		
		for (var i = 0; i < metas.length; i++) {
			if (metas[i].getAttribute("name") == n) {
				return encodeURIComponent(metas[i].getAttribute("content"));
			}
		}
		return "";
	},
	log: function(msg, err, exception) {
		try {
			if (this.mode != "live") {
				var console = window.console || {
					log: function() {}
				};
				var message = (typeof err == "undefined") ? msg : msg + "\n[ERROR : " + err.message + "]";
				if (window.console) console.log(this.aimc, message);
			}
		} catch (e) {
			if (this.mode != "live") document.write(msg);
		}
	},
	error: function(msg, width, height) {
		if (this.mode != "live") {
			var area = "<div style='width:" + width + "px; height:" + height + "px; border:1px solid #ededed; text-align: center; vertical-align: middle; display: table-cell;'>" + msg + "</div>";
			document.write(area);
		}
	},
	iframeload: function(id) {
		try {
			if (document.getElementById("close_btn_" + id)) {
				document.getElementById("close_btn_" + id).style.display = "";
			}
		} catch (e) {
			this.log("iframeload : IDN can't display close button", e);
		}
	},
	close: function(id) {
		var element = document.getElementById(id);
		element.outerHTML = "";
		delete element;
	}
};

var _idnPageViewUniqId = _idnPageViewUniqId || _idn.uniqid("PVU_");
var _idnPageNum = parseInt(_idnPageNum + 1) || 1;
var _idnSiteUniqId = "";
var _idnSys = [];
var _idnUserAgent = navigator.userAgent || navigator.vendor || window.opera;
var deviceType = _idnUserAgent.match(/Android/i) ? "A" : (_idnUserAgent.match(/iPhone|iPad|iPod/i) ? "I" : _idnUserAgent.match(/Opera Mini|IEMobile|BlackBerry/i) ? "M" : "P");
var _idnPatten = /\.idnad\.co.*\/ad\/.*\.js/i;
var _idnUd = function(s, l, n) {
	if (l - n < 0) return "";
	src = s[l - n].src;
	if (_idnPatten.test(src)) {
		return src;
	} else return _idnUd(s, l, n + 1);
};
var _idnScripts = document.getElementsByTagName("script");

_idnUrl = _idnUd(_idnScripts, _idnScripts.length, 1);
if (_idnUrl.indexOf("?") > 1) {
	var _idnData = _idnUrl.substr(_idnUrl.indexOf("?") + 1, _idnUrl.length).split("&");
	if (_idnData.length > 0) {
		for (var _idnParam = 0; _idnParam < _idnData.length; _idnParam++) {
			var _idnParamData = _idnData[_idnParam].split("=");
			_idnSys[_idnParamData[0]] = _idnParamData[1];
		}
	}
}

for (var b = document.getElementsByTagName("ins"), c = 0, d = b[c]; c < b.length; d = b[++c]){
	var e = d;
	if ("adsByIdn"+_idnSys["adImpMgrCode"] == e.className && b[c].getAttribute("data-view-switch")==null){
		_idn.idnInsElement = b[c];
		b[c].setAttribute("data-view-switch", "on");
		for (var d = e.attributes, e = d.length, f = 0; f < e; f++){
			var g = d[f];
			if (/data-/.test(g.name)){
				_idnSys[g.name.replace("data-", "").replace(/-/g, "_")] =g.value;
			}
		}
	}
}

_idnSys.width = _idnSys.width || 0;
_idnSys.height = _idnSys.height || 0;

if (typeof _idnSys.mpvn === "undefined") _idnSys.mpvn = 5;
if (typeof _idnSys.adImpMgrCode === "undefined") {
	_idn.log("parameter : Parameter Error");
}
var n = document.cookie.split("; ").length;
for (var i = 0; i < n; i++) {
	var keyValues = document.cookie.split("; ")[i].split("=");
	if (keyValues[0] == "siteUniqId") {
		_idnSiteUniqId = unescape(keyValues[1]);
	}
}
if (_idnSiteUniqId == undefined || _idnSiteUniqId == "") {
	_idnSiteUniqId = _idn.uniqid("STU_");
	_idn.setCookie("siteUniqId", _idnSiteUniqId);
	_idn.nuser = 1;
} else {
	_idn.setCookie("siteUniqId",_idnSiteUniqId);
}
switch (_idnSys.mode) {
	case "test":
		this.mode = "test";
		var file = _idnSys.file || "idn_test";
		this.iframe = "/ad/ui/" + file + ".html";
		this.server = _idnSys.domain || "file.idnad.co.kr";
		break;
	case "sett":
	default:
		this.mode = "live";
		this.iframe = "/ad/ui/idn_live.html";
		this.server = _idnSys.domain || "ad.idnad.co.kr";
		break;
}
if (typeof _idnSys.pvn != "undefined") {
	_idnPageNum = parseInt(_idnSys.pvn);
}
if (typeof _idnSys.adImpMgrCode == "undefined" || _idnSys.adImpMgrCode == 0 || _idnSys.adImpMgrCode == "") {
	_idn.error("I Like SponsorAd Ad code not found ", _idnSys.width, _idnSys.height);
};
var prf, plt, apu;
try {
	var ilsframe = typeof(top.ilsframe) == "undefined" ? "" : top.ilsframe;
	if (typeof ilsframe != "undefined") {
		prf = ilsframe.window.document.getElementById("prf").value;
		plt = ilsframe.window.document.getElementById("plt").value;
		apu = ilsframe.window.document.getElementById("apu").value;
	}
} catch (e) {
	if (_idnSys.pass == "ct") {
		var refParam = [];
		var _array = [];
		document.referrer.replace(/(.*)\?/ig, "").replace(" ", "");
		var temp = document.referrer.replace(/(.*)\?/ig, "").split("&");
		for (k in temp) {
			if ((k.match(/[0-9]/) != null)) {
				_array = temp[k].split("=");
				refParam[_array[0]] = _array[1]
			}
		}
		prf = unescape(refParam["prf"]);
		plt = unescape(refParam["plt"]);
		if (typeof refParam["apu"] != "undefined") {
			apu = unescape(refParam["apu"]);
		}
	}
}
var _idnParam = {
	pcs: _idnSys.psc || document.charset || document.characterSet,
	prf: _idnSys.prf || prf || document.referrer,
	plt: _idnSys.plt || plt || document.location.href,
	pvu: this.pvu || _idnPageViewUniqId,
	pvn: _idnSys.pvn || this.pvn || _idnPageNum,
	stu: _idnSiteUniqId,
	width: _idnSys.width,
	height: _idnSys.height,
	inpos: _idnSys.inpos || "",
	ct: _idnSys.ct || "Y",
	aimc: _idnSys.adImpMgrCode,
	domain: _idnSys.domain || this.server,
	mode: this.mode || _idnSys.mode || "",
	sett: _idnSys.sett || "",
	apu: _idnSys.apu || apu || "",
	nts: _idnSys.nts || "",
	mpvn: _idnSys.mpvn || 100,
	device: deviceType,
	pass: _idnSys.pass || "",
	loc: _idnSys.loc || "",
	pt: encodeURIComponent(document.title) || ""
};
if (typeof _idnSys.menual !== "undefined" && _idnSys.menual) {
	var div = createElement("div", {"id" : "div_"+_idnParam.aimc}, _idn.idnInsElement);
	
	var e = document.createElement("script");
	if (e.readyState){
		e.onreadystatechange = function(){
			if (this.readyState == "complete" || this.readyState == "loaded"){
				_url = this.src;
				_idn.setting(JSON.parse(unescape(_url.substr(_url.indexOf("?param=") + 7, _url.length))), _idn.uniqid("DIV_"), eval("ilike_" + JSON.parse(unescape(_url.substr(_url.indexOf("?param=") + 7, _url.length))).aimc));
			}
		}
	} else {
		e.onload = function(){
			_url = this.src;
			_idn.setting(JSON.parse(unescape(_url.substr(_url.indexOf("?param=") + 7, _url.length))), _idn.uniqid("DIV_"), eval("ilike_" + JSON.parse(unescape(_url.substr(_url.indexOf("?param=") + 7, _url.length))).aimc));
		}
	}
	e.src = "//" + this.server + "/ad/customize/" + _idnSys.adImpMgrCode + ".js?param=" + escape(JSON.stringify(_idnParam));
	e.type = "text/javascript";
	e.async = "true";
	document.getElementsByTagName("head")[0].appendChild(e);
	ilike_ad_menual_setting = false;
} else{
	var main_div = createElement("div", {"id":_idn.uniqid("DIV_"), "style": "display:inline-block; position:relative; overflow:hidden; height:" + _idnParam.height + "px; " + "width:"+_idnParam.width+"px"}, _idn.idnInsElement);
	
	_idn.setting(_idnParam, main_div.id, "");
}

function createElement(element,attribute,appendTo){
	if(typeof(element) === "undefined"){return false;}
	if(typeof(appendTo) === "undefined"){appendTo = "";}
	var _el = document.createElement(element);
	if(typeof(attribute) === 'object'){
		for(var key in attribute){
			_el.setAttribute(key,attribute[key]);
		}
	}
	if(appendTo){
		try{appendTo.appendChild(_el)}catch(e){}
	}
	return _el;
}