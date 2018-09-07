/**
 * IE에서 console.log 에러나지 않게
 **/
if( window.console == undefined ) { console = { log : function(){} }; }


/**
 * 상단 프로모션 배너
 **/
var count_top_promotion = 0;
var index_top_promotion = 0;
var top_promotion_timer_id = 0;
var interval_promotion = 5;     ///< 5 sections

$(document).ready(function() {

    /* iPhone, Android의 경우 좌우에 여백을 준다! */
    //if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/) != null) { $('#wrap').css('padding', '0 10px 0 10px'); }

    /**
     * 로그인/로그아웃 버튼 설정
     **/
    //alert(window.location);
    //alert(window.location.match(/(www|utv|people|eplay|pdf|moblie|m|info|bizcenter|member|etview|report|conference|edu|infostation)\.etnews\.com/));
    if ($('#full_menu_id dl#gnb03').length && window.location.host.match(/(www|enteronnews|utv|people|eplay|pdf|paoin|moblie|m|info|bizcenter|member|etview|report|conference|edu|infostation)\.etnews\.com/) != null) {
        var return_url = encodeURIComponent(window.location.href);

        var login_url = 'https://member.etnews.com/member/login.html?return_url=' + return_url;
        var logout_url = 'https://member.etnews.com/member/logout.html?return_url=' + return_url;
        var modify_url = 'https://member.etnews.com/member/myinfo.html?return_url=' + return_url;;
        var join_url = 'https://member.etnews.com/member/join_index.html?return_url=' + return_url;

        var str_html = '';

        // 로그인 상태
        if ($.cookie('USER_ID') != null) {
            str_html = '<dt>회원 서비스</dt>'
				+ '<dd><a href="' + logout_url + '">로그아웃</a></dd>'
                + '<dd><a href="' + modify_url + '">정보수정</a></dd>'
				+ '<dd><a href="https://member.etnews.com/member/myinfo.html?mc=m_011_00002">뉴스레터</a></dd>'
				+ '<dd><a href="http://www.etnews.com/pages/bookmark.html?mc=e_002_00007">내 스크랩</a></dd>';
        }
        else {
            str_html = '<dt>회원 서비스</dt>'
				+ '<dd><a href="' + login_url + '">로그인</a></dd>'
                + '<dd><a href="' + join_url + '">회원가입</a></dd>';
        }

        $('#full_menu_id dl#gnb03').html('').html(str_html);


    } else if ($('#full_menu_id ul#gnb03_18').length && window.location.host.match(/(www|enteronnews|utv|people|eplay|pdf|paoin|moblie|m|info|bizcenter|member|etview|report|conference|edu|infostation)\.etnews\.com/) != null) {
        var return_url = encodeURIComponent(window.location.href);

        var login_url = 'https://member.etnews.com/member/login.html?return_url=' + return_url;
        var logout_url = 'https://member.etnews.com/member/logout.html?return_url=' + return_url;
        var modify_url = 'https://member.etnews.com/member/myinfo.html?return_url=' + return_url;;
        var join_url = 'https://member.etnews.com/member/join_index.html?return_url=' + return_url;
        
        var str_html = '';
		// 로그인상태2
        if ($.cookie('USER_ID') != null) {
            str_html = '<li>회원 서비스</li>'
				+ '<li><a href="' + logout_url + '">로그아웃</a></li>'
                + '<li><a href="' + modify_url + '">정보수정</a></li>'
				+ '<li><a href="https://member.etnews.com/member/myinfo.html?mc=m_011_00002">뉴스레터</a></li>'
				+ '<li><a href="http://www.etnews.com/pages/bookmark.html?mc=e_002_00007">내 스크랩</a></li>';
        }
        else {
            str_html = '<li>회원 서비스</li>'
				+ '<li><a href="' + login_url + '">로그인</a></li>'
                + '<li><a href="' + join_url + '">회원가입</a></li>';
        }
        $('#full_menu_id ul#gnb03_18').html('').html(str_html);

    } else if ($('#gnb ul.gnb03').length && (window.location.host == 'www.ciobiz.co.kr' || window.location.host == 'ciobiz.etnews.com')) {
        var return_url = encodeURIComponent(window.location.href);

        var login_url = 'https://member.etnews.com/ciobiz/login.html?return_url=' + return_url;
        var logout_url = 'https://member.etnews.com/ciobiz/logout.html?return_url=' + return_url;
        var modify_url = 'https://member.etnews.com/ciobiz/myinfo.html?return_url=' + return_url;;
        var join_url = 'https://member.etnews.com/ciobiz/join_index.html?return_url=' + return_url;

        var str_html = '';

        // 로그인 상태
        if ($.cookie('CIOBIZ_ID') != null) {
            str_html = '<li><a href="' + logout_url + '">로그아웃</a></li>'
                + '<li><a href="' + modify_url + '">정보수정</a></li>';
        }
        else {
            str_html = '<li><a href="' + login_url + '">로그인</a></li>'
                + '<li><a href="' + join_url + '">회원가입</a></li>';
        }

        $('#gnb ul.gnb03').html('').html(str_html);
    }


    /**
     * 날개배너
	 * 20170502 구글 정책으로 고정 요청 - 김상수 부장 By Mj
     **/
    if ($('#wingBanner').length) {
        /* sticky banner 설정 */
        var stickyBanner = function(isInit) {
            var layerLeft = 0;
            var marginTop = 0;
            var currentTop = parseInt($("#leftWingBanner").css("top"));
            var animateTime = 1000;

            if (isInit == true) {
                currentTop = marginTop;
            }

            //alert(currentTop);
            //$("#wingLeftSticky").attr("style", "position:absolute; top:" + marginTop + "px; left:" + layerLeft + "px;");
            //$("#wingRightSticky").attr("style", "position:absolute; top:100px; left:1008px;");
			/*
            $(window).scroll(function() {
                var position = $(window).scrollTop();
                var mov_pos;
                if (position < 255) {
                    mov_pos = currentTop;
                }
                else {
                    mov_pos = position - 130;
                }

                $("#leftWingBanner").stop().animate({"top":mov_pos + "px"}, animateTime);
                $("#RightWingBanner").stop().animate({"top":mov_pos + "px"}, animateTime);
            });
			*/
        }

        //stickyBanner(true);
    }

    /**
     * 상단 프로모션 배너
     **/
    if ($('#promotionBanner .banner').length) {
        count_top_promotion = $('#promotionBanner .banner').length;
        if (top_promotion_timer_id) clearTimeout(top_promotion_timer_id);
        if (count_top_promotion > 1)
            top_promotion_timer_id = setTimeout(function() { moveTopPromotion('next'); }, interval_promotion * 1000); // 5 seconds
    }
});

/**
 * Interworks 광고배너. 고정날개배너.
 * 브라우저의 해상도에 따라 배너 크기가 달라지므로 이를 조정한다.
 **/
function showWingInterworks() {
    //var document_width = $(document).width();
    var screen_width = screen.width;
    var css_left = null;
    var css_right = null;

    //if (document_width >= 1660) {
    if (screen_width >= 1680) {
        css_left = {'width': '220px', 'height': '600px'};
        css_right = {'width': '220px', 'height': '600px'};
    }
    //else if (document_width >= 1420 && document_width < 1660) {
    else if (screen_width >= 1440 && screen_width < 1680) {
        css_left = {'width': '200px', 'height': '600px'};
        css_right = {'width': '200px', 'height': '600px'};
    }
    //else if (document_width >= 1260 && document_width < 1420) {
    else if (screen_width >= 1280 && screen_width < 1440) {
        css_left = {'width': '130px', 'height': '600px'};
        css_right = {'width': '130px', 'height': '600px'};
    }
    else {
        return;
    }

    $('#wingLeftInterworks').css(css_left).show();
    $('#wingRightInterworks').css(css_right).show();
}


/**
 * 상단 프로모션 배너
 **/
function moveTopPromotion(action) {
    // 프로모션 갯수가 1개 이하이면 그냥 종료
    if (count_top_promotion <= 1) return;

    // 만약 타이머가 설정된 경우라면 초기화
    if (top_promotion_timer_id) clearTimeout(top_promotion_timer_id);

    var obj = $('#promotionBanner .banner');
    obj.each(function() { $(this).hide(); });

    if (action == 'prev') {
        index_top_promotion--;
        if (index_top_promotion < 0)
            index_top_promotion = count_top_promotion - 1;
    }
    else {
        index_top_promotion++;
        if (index_top_promotion >= count_top_promotion)
            index_top_promotion = 0;
    }

    // 타이머 설정
    if (count_top_promotion > 1)
        top_promotion_timer_id = setTimeout(function() { moveTopPromotion('next'); }, interval_promotion * 1000); // 5 seconds

    obj.eq(index_top_promotion).show();
}

/**
 * 스크롤 없는 팝업
 **/
function open_pop(url, pop_width, pop_height) {
    var width = pop_width;
    var height = pop_height;
    var left = (screen.availWidth - width) / 2;
    var top = (screen.availHeight - height) / 2;

    optString = "some_options, width=" + width +", height=" + height + ", left=" + left + ", top=" + top;
    window.open(url, "", optString).focus();
}


/**
 * 스크롤 있는 팝업
 **/
function open_pop_scroll(url, pop_width, pop_height) {
    var width = pop_width;
    var height = pop_height;
    var left = (screen.availWidth - width) / 2;
    var top = (screen.availHeight - height) / 2;

    optString = "some_options, scrollbars=yes, width=" + width +", height=" + height + ", left=" + left + ", top=" + top;
    window.open(url, "", optString).focus();
}


/**
 * 비주얼IT 서브메뉴
 **/
var timerVisualIt = null;
$(document).ready(function() {
    $('#buttonVisualIT').click(function() { $('#menuBox .visualit_list').toggle(); return false; });
    $('#buttonVisualIT').mouseover(function() { $('#menuBox .visualit_list').show(); return false; });
    $('#buttonVisualIT').mouseout(function() { hideVisualIT(); return false; });
    $('#menuBox .visualit_list').mouseover(function() { if (timerVisualIt != null) clearTimeout(timerVisualIt); });
    $('#menuBox .visualit_list').mouseout(function() { hideVisualIT(); });
});

function hideVisualIT() {
    if ($('#menuBox .visualit_list').css('display') != 'block') return;

    if (timerVisualIt != null) clearTimeout(timerVisualIt);
    timerVisualIt = setTimeout(function() { $('#menuBox .visualit_list').hide(); }, 500); // 1 seconds
}


/**
 * 한글자르기
 **/
function str_cut(str, len) {
    var l = 0;
    for (var i = 0; i < str.length; i++) {
        l += (str.charCodeAt(i) > 128) ? 2 : 1;
        if (l > len) return str.substring(0, i) + '...';
    }
    return str;
}
