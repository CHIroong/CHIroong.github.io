$(document).ready(function(){
	weather_set();
	$("#popupWeatherButton").click(function(){
		$("#popupWeather").toggle();
		set_weather_more_btn();
	});

	//2016-01-20 마우스 오버시에도 나오도록 설정 : By Mj
	$("#rollWeatherUL").mouseover(function(){
		$("#popupWeather").show();
		set_weather_more_btn();
	});

	$("#rollWeatherUL").mouseout(function(){
		$("#popupWeather").show();
		set_weather_more_btn();
	});

    /** 
     * 날씨 정보 전체목록 박스 마우스아웃 이벤트로 닫기
     **/
    $('#popupWeather').on('mouseleave', function(){
        $(this).hide();
        set_weather_more_btn();
    });

});



/**
 * 날씨정보 더보기 버튼 설정
 * 날씨 전체 목록 박스의 활성화 상태를 가져와서 노출해주자
 **/
function set_weather_more_btn() {
    if( $('#popupWeather').css('display') == 'block' ) {
        $('#popupWeatherButton').removeClass('btn_arr').addClass('btn_arr_on');
    } else {
        $('#popupWeatherButton').removeClass('btn_arr_on').addClass('btn_arr');
    }
}


function weather_set()
{
    $.ajax({
        url: 'http://www.etnews.com/weather/weather.json',
        dataType: 'jsonp',
        jsonpCallback: 'weather_list',
        success: function(json) {
            var len = json.area_list.length;
            if(len == 0) return;

            var roll_html = '';
            var $box_li = $('#popupWeather li'); ///< IE7에서는 동적으로 생성하는 데이터에 CSS가 적용되지 않아 컨텐츠를 미리 만든후 속성값을 수정하도록 작업했다
			
            for(var i = 0; i < len; i++) {
                var sky = json.area_list[i].area_icon;
                if(sky > 16) sky = 1;
                
                var pimg = 'http://img.etnews.com/2015/et/images/w_p'+ sky +'.png';
                var gimg = 'http://img.etnews.com/2015/et/images/w_g'+ sky +'.png';
                var iconname = json.area_list[i].area_icon_ko;
                var area = json.area_list[i].area_name_ko;
                var temperature = json.area_list[i].area_ta;



                roll_html += '<li>';
                roll_html += '    <em><img src="'+ pimg +'"  alt="'+ iconname +'"/></em>';
                roll_html += '    <span class="tit_c">'+ area +'</span>';
                roll_html += '    <span class="w_dt01"><strong>'+ temperature +'</strong>℃</span>';
                roll_html += '</li>';

                $box_li.eq(i).find('img').attr('src', gimg).attr('alt', iconname);
                $box_li.eq(i).find('dt strong').text(temperature);
                $box_li.eq(i).find('dd').text(area);
            }
			
			//2016-01-20 마지막 롤링에 날씨제공업체 로고 나오도록 설정 : By Mj
			roll_html += '<li>';
			roll_html += '    <em><a href="http://www.153weather.com" target="_blank" style="padding:0"><img src="http://img.etnews.com/2016/img/logo_b.png" width="100" height="25" /></a></em>';
			roll_html += '</li>';

            $('#rollWeatherUL').html(roll_html).parent().show();
			try
			{
	            $('#rollWeatherBox').vTicker({ speed: 500, pause: 3000, animation: 'fade', mousePause: true, showItems: 1});
			}
			catch (err)
			{
			}
        },
        error: function(xhr) {
            console.log('실패 - ', xhr);
        }
    });

}

