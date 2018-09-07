// 날씨
function todayWeather(target, skin){
	var regions = ["108","112","127","133","143","146","152","156","159","184","101","105"] //서울,인천,충주,대전,대구,전주,울산,광주,부산,제주,춘천,강릉
		,icons = {"01":"0 0","02":"0 -50px","03":"0 -100px","04":"0 -150px","07":"0 -350px","08":"0 -200px","11":"0 -250px","12":"0 -400px","13":"0 -450px"} // icon 번호 : 우리 icon 이미지 좌표
		//,iUrl = "http://www.kma.go.kr/images/icon/NW/NB[icon].png" // 기본 아이콘
		,url = "http://www.kma.go.kr/XML/weather/sfc_web_map.xml?"+Math.random()
		,yqlUrl = "http://query.yahooapis.com/v1/public/yql?q="+encodeURIComponent("select * from xml where url='" + url + "'")+"&format=json&callback=?" // xml은 jsonp 가 안되어 yahoo 이용해서 json 으로 만듬 - crossdomain
		,contents = []
		,copyright = '<a href="http://www.kma.go.kr/" target="_blank">기상청 제공</a>'
		,weeks = ['일', '월', '화', '수', '목', '금', '토'];
		
	if(!skin) skin="default";
	
	$.get(yqlUrl,function(data, result){
		if(result=="success"){
			var weather = data.query.results.current.weather
				,date = weather.year+"."+weather.month+"."+weather.day//+" ("+weather.hour+"시)"
				,d = weather.local||[]
				,$target = $(target);
				
			var dateStr = date.replace(/\./gi, "-") 
				,dayOfWeek = weeks[new Date(dateStr).getDay()]||"";  // 요일 구하기 
			
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
				//if(!iconpos) iconUrl = iUrl.replace("[icon]", icon); // 만들어진 아이콘이 없을때 기상청 아이콘 가져올까 했는데 라이센스때문에 그냥 처리 
				//if(!iconpos) iconpos = "-1000px 0"; // 기상청 xml에서 아이콘이 없는게 있다 --- 원본 
				if(!iconpos) iconpos = "0 -600px"; 
				
				tag = '<div class="wb-columns">'
					+	'<span class="days"><i class=\"fa fa-clock-o\"></i> '+date+'('+dayOfWeek+')</span>'
					+	'<span class="icon wb-img" style="background-position:'+iconpos+'"><i class="show-for-sr">'+desc+'</i></span>'
					+	'<div class="area font-dotum">'+content.replace("대구(기)","대구")+'</div>'
					+ 	'<p class="ta">'+ta+'℃</p>'
					+ '</div>';
				contents.push(tag);
			}
			
			if(contents.length<=0) return false;

			//console.log(contents);

			// 서울&인천부터 정렬하도록 변경 
			var contents_cut = contents.splice(2,2);
			var contents_new = contents_cut.concat(contents);
			
			// 인천부터 나오도록 변경 
			var contents_cut2 = contents_new.splice(1,1);
			contents_new = contents_cut2.concat(contents_new);
			//console.log(contents_new);
		
			var over = false // true라면 마우스 올린상태이므로 바뀌지 않음
				,$wblist = $target.on({
										mouseenter:function(){ over=true; }
										,mouseleave:function(){ over=false; }
									 }).append('<div class="weather-box '+skin+'"><div id="weather-rolls" class="wb-box">'+contents_new.join("")+'</div><span class="partner font-dotum">'+copyright+'</span></div>').find(".wb-columns")
				,index = 0
				,t = $wblist.length;

			//alert(index);
			
			// 첫번째 인덱스 보이기 
			$wblist.eq(index).show();
			
			if(t<=1) return false;
			setInterval(function(){
				if(over===true) return false;
				
				index++;
				if(index>=t) index=0;

				$wblist.hide().eq(index).show();
				//$wblist.addClass("none").eq(index).removeClass("none"); // 원본 
			}, 5*1000);
		}else alert(lang.axError);
	},"json");
}

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
		if(className == "") className = "font-size18";

		$("#"+className+"_1").prop("checked", true);
		$("#"+className+"_2").prop("checked", true);

		change_article_fontsize(className);
	}

	/* 초기 실행 */ 
	get_article_fontsize();
});