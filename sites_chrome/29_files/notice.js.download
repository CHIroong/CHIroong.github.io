"use strict";

var adtive_notice_ad = {
	// 사이트 주소 
	site_url: "http://cdn.adtive.com",
	//site_url: "http://notice.adtive.com/data",
	//log_url : "http://notice.adtive.com",
	log_url:'http://log.adtive.com/noticead',
	// 노출 비율 
	weight_arr : new Array(),
	
	// 배너타입 b - black  ,y-yellow
	btype : [ "y" ],
	campaign_arr: new Array(),
	// 통계용 코드 값.
	code : {
		idx : "t0",
		mcode : "t1",
		zcode : "t2",
		ad_type : "t3",
		cpno : "t4",
		banner_type : "t5",
		close_yn : "n",
		
	},

	//배너 토출 체크
	banner_check : false,

	// 마우스 오버 한번만 되게 체크
	noticeAd_pc_cnt : 0,
	
	//매체코드 
	zcode : '',
	
	//영역코드 
	mcode : '',
	getRandomItem : function(list, weight) {
		var total_weight = weight.reduce(function(prev, cur,
				i, arr) {
			return Number(prev) + Number(cur);
		});
		var random_num = adtive_notice_ad.rand(0, total_weight);
		var weight_sub = total_weight;
		for (var i = 0; i < list.length; i++) {
			if (random_num <= weight_sub && random_num > weight_sub - weight[i]) {
				//return list[i];
				return i;
			} else if(i == list.length-1) {
				return i;
			}
			weight_sub -= weight[i];
		}

		// end of function
	},
	set_ad_type : function () {
		var data=[];
		var camp_idx = 0;
		for (var i = 0; i < 10; i++) {
			//camp_idx = Math.floor(Math.random() * adtive_notice_ad.campaign_arr.length);
			camp_idx = adtive_notice_ad.getRandomItem(adtive_notice_ad.campaign_arr, adtive_notice_ad.weight_arr);
			//console.log('camp_idx::'+camp_idx);
			if (camp_idx != adtive_notice_ad.code.idx)
				break;
		}
		data['idx']=camp_idx;
		data['camp'] = adtive_notice_ad.campaign_arr[camp_idx];
		data['banner_idx'] = Math.floor(Math.random()
				* adtive_notice_ad.btype.length);
		return data;

	},
	check_url : function(url) {
		var url2='';
		if (url.indexOf('=') > -1) {
			url2=url+'&';
		} else if (url.indexOf('?') > -1) {
			url2=url;
		} else {
			url2=url+'?';
		}
		return url2;
	},
	rand : function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	//광고 노출 시작 
	start : function(mcode, zcode) {
		adtive_notice_ad.cssload();
		adtive_notice_ad.zcode = zcode;
		adtive_notice_ad.mcode = mcode;

		// get JSON with using pure javascript
		var xhr = new XMLHttpRequest();
		var paramVal = "paramVal";
		//var target = "http://notice.adtive.com/maker";//영역정보,캠페인정보 끌어오기
		//var target = adtive_notice_ad.site_url+"/adinfo/md/"+mcode+"/"+zcode;//영역정보
		var target = adtive_notice_ad.log_url+"/maker.php";//영역정보,캠페인정보 끌어오기
//		console.log(target);
		xhr.open("GET", target + "?zcode="+zcode+"&mcode="+mcode+"&paramName=" + paramVal, true);

		xhr.send();
		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				if (xhr.status == 200) {
					var loadedJSON = JSON.parse(xhr.responseText);
					adtive_notice_ad.jdata = loadedJSON;
					
					var zone = adtive_notice_ad.jdata.zone;
					// 브라우저당 한시간 한번 노출. 
					if (zone.user_vlimit == 'y') {
						//쿠키 있는지 확인
						var cookie_name = 'adtive_' + mcode + '_' + zcode;

						var cookie_ck = adtive_notice_ad.getCookie(cookie_name);
						//설정된 쿠키가 없으면,
						if (cookie_ck == null) {
							adtive_notice_ad.setCookie(cookie_name, 'y', 1);
						} else {
							return false;
						}
					}

					//노출할지말지..
					var show_opt=['y','n'];
					var show_yn=show_opt[adtive_notice_ad.getRandomItem(show_opt, [zone.view_per, 100-zone.view_per])];
					if(show_yn == 'n') return;

					adtive_notice_ad.campaign_arr = adtive_notice_ad.jdata.campaign;
					if(adtive_notice_ad.campaign_arr.length == 0) return;
					for (var i = 0; i < adtive_notice_ad.jdata.campaign.length; i++) {
						adtive_notice_ad.weight_arr[i] = adtive_notice_ad.jdata.campaign[i].cpn_rate;
					}
					
					adtive_notice_ad.show_banner();
					
					if(zone.view_trem == 1) {
						if(adtive_notice_ad.banner_check != true) {
						   setTimeout(function(){ 
							   adtive_notice_ad.ad_start();
						   }, 2000);
						}
					} else {
						//var open_top_position = (zone.scroll_px) ? zone.scroll_px : 0;
						var open_top_position = (zone.scroll_px > 0) ? zone.scroll_px : window.innerHeight;
						if(zone.view_trem == 3 && zone.selector.indexOf('.') > -1) {
							var className=zone.selector.replace(".","");
							//if(document.getElementsByClassName(className)[0]) open_top_position = document.getElementsByClassName(className)[0].offsetHeight;
							if(document.getElementsByClassName(className)[0]) open_top_position = document.getElementsByClassName(className)[0].offsetTop;
							
						}
						window.onscroll = function() {
							if ((document.body.scrollTop > open_top_position || document.documentElement.scrollTop > open_top_position)
									&& adtive_notice_ad.banner_check != true) {
								adtive_notice_ad.ad_start();
							}
						};
					}

				} else {
					console.log("fail to load");
				}
			}
		}
	},
	show_banner : function() {
		var banner_type = adtive_notice_ad.set_ad_type();
		var camp_idx=banner_type['idx'];
		var camp=banner_type['camp'];
		var banner_idx=banner_type['banner_idx'];

		var banner_img = '';
		var b_img1 = camp.cpn_mat1;
		var b_img2 = camp.cpn_mat2;
		var b_img_arr = (b_img2) ? [b_img1, b_img2] : [b_img1];
		var b_img_idx = Math.floor(Math.random() * b_img_arr.length);
		if(b_img_idx == 1)
			var ad_type = 'B';
		else
			var ad_type = 'A';
		banner_img = b_img_arr[b_img_idx];
//					banner_img = banner_img.replace("//", 'http://');
		banner_img = adtive_notice_ad.site_url+banner_img;

		//	        	adtive_notice_ad.log(mcode,zcode,ad_type,adtive_notice_ad.banner_type,camp.post_key,'vis');
		adtive_notice_ad.code = {
			idx : camp_idx,
			mcode : adtive_notice_ad.mcode,
			zcode : adtive_notice_ad.zcode,
			ad_type : ad_type,
			cpno : camp.cpno,
			//	                	banner_type:banner_type,
			close_yn : adtive_notice_ad.code.close_yn
		};
		////////////
		adtive_notice_ad.banner_view('type' + banner_idx,
				banner_img, camp);
	},
	
	show_pop : function () {
		adtive_notice_ad.noticeAd_pc_cnt = 1;

		var t_code = adtive_notice_ad.code;
		var ifrm_obj = document
				.getElementById("noticeAd_pc_iframe");

		var pc_h = window.innerHeight;
		var pc_w = window.innerWidth;
		var camp = adtive_notice_ad.campaign_arr[t_code.idx];
		
		var noticeAd_pc_iframe_w = (camp.cpn_popup_w > 0) ? Number(camp.cpn_popup_w) : 400;
		var noticeAd_pc_iframe_h = (camp.cpn_popup_h > 0) ? Number(camp.cpn_popup_h) : pc_w - 44;
		
		if(noticeAd_pc_iframe_w > pc_w - 40)
			noticeAd_pc_iframe_w = pc_w - 40;

		if(noticeAd_pc_iframe_h > pc_h - 40)
			noticeAd_pc_iframe_h = pc_h - 40;

		var noticeAd_pc_iframe_mt = (pc_h - (noticeAd_pc_iframe_h+30)) / 2 ;
		ifrm_obj.style.marginTop=noticeAd_pc_iframe_mt+'px';


		//ifrm_obj.style.width=Number(noticeAd_pc_iframe_w+26)+'px';
		//ifrm_obj.style.height=Number(noticeAd_pc_iframe_h+26)+'px';
		//ifrm_obj.style.marginTop=0;
		//ifrm_obj.style.top="5px";

		ifrm_obj.style.display = "inline-block";

		var bg_noticeAd_pc_iframe = document
				.getElementById("bg_noticeAd_pc_iframe");
		bg_noticeAd_pc_iframe.style.display = "block";

		var url = adtive_notice_ad.check_url(camp.cpn_url);
		var code_param = "mcode=" + t_code.mcode
				+ "&zcode=" + t_code.zcode + "&btype="
				+ t_code.ad_type + "&cpno=" + t_code.cpno;
		var addStyle = "";
		var ifm_html = "<div class='noticeAd_pc_iframe_box' id='noticeAd_pc_iframe_box'><iframe src='"
				+ url
				+ code_param
				+ "' width='"
				+ noticeAd_pc_iframe_w
				+ "' height='"
				+ noticeAd_pc_iframe_h
				+ "' frameborder='0' scrolling='yes' style='"
				+ addStyle
				+ "'></iframe><div class='close' onclick='adtive_notice_ad.noticeAd_pc_close();'>닫기</div></div>";
		ifrm_obj.innerHTML = ifm_html;

		var div_obj = document
				.getElementById("noticeAd_pc_wrap")
		div_obj.style.display = "none";
		adtive_notice_ad.log(t_code.mcode, t_code.zcode,
				t_code.ad_type, t_code.cpno, 'clk');
	},
	show_guage : function() {
		var noticeAd_pc_gauge = document
						.getElementById("noticeAd_pc_gauge");
		var name = "bar";
		var arr = noticeAd_pc_gauge.className.split(" ");
		if (arr.indexOf(name) == -1) {
			noticeAd_pc_gauge.className += " " + name;
		}
	},
	remove_guage : function() {
		var noticeAd_pc_gauge = document
				.getElementById("noticeAd_pc_gauge");
		var name = "bar";
		var arr = noticeAd_pc_gauge.className.split(" ");
		if (arr.indexOf(name) >= -1) {
			noticeAd_pc_gauge.className = noticeAd_pc_gauge.className
					.replace(" " + name, "");
		}
	},
	//광고 배너 시작 
	ad_start : function() {
		adtive_notice_ad.banner_check = true;
		var t_code = adtive_notice_ad.code;
		if (t_code.close_yn == "n") {
			adtive_notice_ad.log(t_code.mcode, t_code.zcode, t_code.ad_type, t_code.cpno, 'v');
		}

		var ad_obj = document.getElementById("noticeAd_pc_wrap");
		var name = "run";
		var arr = ad_obj.className.split(" ");
		if (arr.indexOf(name) == -1) {
			ad_obj.className += " " + name;
		}

		var ad_obj = document.getElementById("noticeAd_pc_wrap_img");
		var timer;
		ad_obj.onmouseover = function() {
			var t_code = adtive_notice_ad.code;
			var camp = adtive_notice_ad.campaign_arr[t_code.idx];
			if (camp.cpn_landing_open=='P' && adtive_notice_ad.noticeAd_pc_cnt < 1){
				adtive_notice_ad.show_guage();	
				timer = setTimeout(
						function() {
							adtive_notice_ad.show_pop();
						}, 500);

			}
		};
		
		ad_obj.onmouseout = function() {
			adtive_notice_ad.remove_guage();
			clearTimeout(timer);
		};
		ad_obj.onmousedown = function() {
			var t_code = adtive_notice_ad.code;
			var camp = adtive_notice_ad.campaign_arr[t_code.idx];
			if (camp.cpn_landing_open=='P' && adtive_notice_ad.noticeAd_pc_cnt < 1) {
				adtive_notice_ad.show_guage();	
				timer = setTimeout(
						function() {
							adtive_notice_ad.show_pop();
						}, 500);
			}
		};
	},
	
	// 방문 ,배너 노출, 클릭 통계 
	log : function(mcode, zcode, type, cpno, kind) {
		//			return false;
		var dt = new Date();
		var dtt = dt.getTime();
		var _Img = new Image();
		var r_num = Math.floor(Math.random() * 1000000000);
		_Img.src = adtive_notice_ad.log_url + "/wlog.php?mcode=" + mcode
				+ "&zcode=" + zcode + "&type=" + type + "&cpno="
				+ cpno + "&kind=" + kind + "&time=" + r_num;
	},
	
	// css 동적 로딩 
	cssload : function() {
		var head = document.getElementsByTagName('head')[0];
		var link = document.createElement('link');
		link.id = 'myCss';
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = adtive_notice_ad.site_url
				+ '/css/adtive.css?ver=20180810';
		link.media = 'all';
		head.appendChild(link);
	},

	//배너 노출 
	banner_view : function(type, image, camp) {
		 var style = (adtive_notice_ad.jdata.zone.position=='L') ? 'left:50px' : '';
		 var str = '';
            str +='<div class="noticeAd_pc_wrap '+type+'"  id="noticeAd_pc_wrap">';
            str +='<div class="banner_wrap" style="display: block;'+style+'">';
            var target="javascript:;";
			var script="";
            if(camp.cpn_landing_open=='W') {
				var t_code=adtive_notice_ad.code;
                var url=adtive_notice_ad.check_url(camp.cpn_url);
                var code_param=
				"mcode=" + t_code.mcode
				+ "&zcode=" + t_code.zcode + "&btype="
				+ t_code.ad_type + "&cpno=" + t_code.cpno;
				target=url+code_param;
				script=' target="_blank" onclick="adtive_notice_ad.log(\''+t_code.mcode+'\',\''+t_code.zcode+'\',\''+t_code.ad_type+'\',\''+t_code.cpno+'\',\'clk\');"';
            }
			str +='<a href="'+target+'" id="noticeAd_pc_wrap_a"'+script+'>';
			str +='<img src="'+image+'" alt="광고 영역" id="noticeAd_pc_wrap_img" /> ';
			str +='</a>';
            str +='<a href="javascript:adtive_notice_ad.noticeAd_banner_close();" class="btn_close" id="noticeAd_pc_wrap_close">닫기</a>';
            str +='<span class="gauge" id="noticeAd_pc_gauge"></span>';
            str +='</div></div>';
            str +='<div class="bg_noticeAd_pc_iframe" id="bg_noticeAd_pc_iframe">';
            str +='<div id="noticeAd_pc_iframe">';
            str +='</div></div>';
//            document.body.innerHTML+=str;
            document.body.insertAdjacentHTML('beforeend', str);
	},

	// 노티스 광고 배너 닫기  
	noticeAd_pc_close : function() {
		var ifrm_obj = document.getElementById("noticeAd_pc_iframe")
		ifrm_obj.style.display = "none";

		var bg_noticeAd_pc_iframe = document
				.getElementById("bg_noticeAd_pc_iframe");
		bg_noticeAd_pc_iframe.style.display = "none";

		//  배너 다시 나타나게 ,
		adtive_notice_ad.noticeAd_pc_cnt = 0;
		adtive_notice_ad.code.close_yn = 'y';
		var noticeAd_pc_gauge = document.getElementById("noticeAd_pc_gauge");
		noticeAd_pc_gauge.className = "gauge";

		var notice_obj = document.getElementById("noticeAd_pc_wrap")
		var t_code = adtive_notice_ad.code;
		//console.log(t_code);
		//adtive_notice_ad.campaign.splice(t_code.idx,1);
		
		var banner_type = adtive_notice_ad.set_ad_type();
		var camp_idx=banner_type['idx'];
		var camp=banner_type['camp'];
		var banner_idx=banner_type['banner_idx'];
		
		var ad_obj = document.getElementById("noticeAd_pc_wrap_img");

		adtive_notice_ad.code.idx = camp_idx;
		adtive_notice_ad.code.cpno = camp.cpno;
		adtive_notice_ad.code.banner_type = banner_type;
		var banner_img = '';
		var b_img1 = camp.cpn_mat1;
		var b_img2 = camp.cpn_mat2;
		var b_img_arr = (b_img2) ? [b_img1, b_img2] : [b_img1];
		var b_img_idx = Math.floor(Math.random() * b_img_arr.length);
		if(b_img_idx == 1)
			var ad_type = 'B';
		else
			var ad_type = 'A';
		banner_img = b_img_arr[b_img_idx];
//			
	//	banner_img = banner_img.replace("//", 'http://');
		banner_img = adtive_notice_ad.site_url+banner_img;


		ad_obj.src = banner_img;
		
		if(camp.cpn_landing_open == 'W') {
			var ad_link_obj = document.getElementById("noticeAd_pc_wrap_a");
			var url=adtive_notice_ad.check_url(camp.cpn_url);
			var code_param="mcode=" + t_code.mcode
						+ "&zcode=" + t_code.zcode + "&btype="
						+ ad_type + "&cpno=" + t_code.cpno;
			ad_link_obj.href=url+code_param;
			ad_link_obj.target='_blank';
			// or use an anonymous function:+

			ad_link_obj.onclick = function() {
				adtive_notice_ad.log(t_code.mcode, t_code.zcode,
						ad_type, t_code.cpno, 'clk');
				adtive_notice_ad.noticeAd_pc_cnt =1;
			};
		}
		adtive_notice_ad.ad_start();
		notice_obj.style.display = "inline-block";

	},

	// 노티스 광고 배너 닫기  
	noticeAd_banner_close : function() {
		var notice_obj = document.getElementById("noticeAd_pc_wrap")
		notice_obj.style.display = "none";
	},

	// 쿠기 설정 
	setCookie : function(name, value, hour) {
		var date = new Date();
		date.setTime(date.getTime() + hour * 60 * 60 * 1000);
		document.cookie = name + '=' + value + ';expires=' + date.toUTCString()
				+ ';path=/';
	},
	// 쿠키 가져오기 
	getCookie : function(name) {
		var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
		return value ? value[2] : null;
	},
	// 쿠키 삭제 
	deleteCookie : function(name) {
		document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}

};