/**
 * 기사 본문 ICT용어 하이라이팅
 **/
var t_len = terms.length;
var tid = '';

$('#articleBody p').each(function() {
    var html = $(this).html();
    // 2015-04-15 shyun
    // 매칭되는 용어가 a태그로 감싸져있을경우 태그 꼬임이 발생한다. a태그 안의 용어는 생략하기 위해 임시 html 본문을 사용한다.
    var tmp_html = $(this).find('a').text('').end().html(); 
    for (var i = 0; i < t_len; i++) {
//        var a_tag = '<span class="a_ict_word"><a class="ict_word" href="javascript:;" onmouseover="view_ICT(this, '+ i +')" onmouseout="remove_ICT()">';
        var a_tag = '<span class="a_ict_word"><a class="ict_word" href="javascript:;">';
        var b_tag = '</a><span style="display: none;">'+ i +'</span></span>';
        var term = terms[i].term;
        var abbr = terms[i].abbr;
        var orig = terms[i].orig;

        //html = html.replace(/<br[ \/]*>/gi, '____');

        if (tmp_html.indexOf(term) != -1) {
            //html = html.replace(new RegExp(term, 'gi'), a_tag + term + b_tag);
            html = html.replace(term, a_tag + term + b_tag);
        } else if (tmp_html.indexOf(abbr) != -1 && abbr != '' ) {
            html = html.replace(abbr, a_tag + abbr + b_tag);
        } else if (tmp_html.indexOf(orig) != -1 && orig != '') {
            html = html.replace(orig, a_tag + orig + b_tag);
        }

        //html = html.replace(/____/gi, '<br>');
    }

    $(this).html(html);
});


// N초후 팝업객체 삭제
function remove_ICT() {
    tid = setTimeout(function() { $('#ictBox').remove();  }, 3000);
}


$(document).on('mouseover', 'a.ict_word', function(){
    if($('#ictBox').length > 0) $('#ictBox').remove();

    clearTimeout(tid);  ///< N초후 팝업객체 삭제코드의 타임아이디 초기화
    var i = $(this).siblings().text();
    var t_idx = terms[i].t_idx;
    var term = terms[i].term;
    var abbr = terms[i].abbr;
    var orig = terms[i].orig;
    var pos = $(this).offset().left - $(this).parent().parent().offset().left;

    var box = '';
    // 추가되는 태그로 인해 단어사이에 공백이 생김으로 인해 아래와 같이 모두 한줄짜리의 태그로 줄바꿈을 삭제함
    box += '<span id="ictBox"><button class="layer_colsed" onclick="$(\'#ictBox\').remove()"><span class="hidden">닫기</span></button><a class="ict_word_box" href="http://premium.etnews.com/ict/index.html?id='+ t_idx +'" target="_blank"><strong>'+ terms[i].view +'</strong><span>: '+ terms[i].defi +'</span><span class="ict_word_btn" >상세보기▶</span></a></span>';


//    $(this).after(box); //크롬에서 위치가 하이퍼링크뒤로 감
    $(this).before(box);
    var span_w = $('.ict_word_box').width(); ///< 메세지 창 넓이 $.after() 아래에 정의해야 함

    var is_right = 'n';
    var ph = $(this).parent().height(); ///< $(this).height() : 라인높이값 (줄바꿈 체크를위해)... IE 8.0 이하에서는 해당 값을 불러올수 없어 그 부모값을 대상으로 값을 가져온다.
    if(ph > 100) is_right = 'y'; ///< IE 8.0이하에서는 한줄일때 96의 값을 가지기 때문에 100을 기준으로 줄바꿈 체크를 함
    //2017개편하면서 조건 변경 
    //if(pos > span_w || is_right == 'y') { ///< left좌표값이 메세지 창넓이(width)값 보다 크면 오른쪽 기준
    if(pos > span_w) { ///< left좌표값이 메세지 창넓이(width)값 보다 크면 오른쪽 기준
        $('#ictBox').addClass('ict_word_box_right'); 
    } else {
        $('#ictBox').addClass('ict_word_box_left'); 
    }
});

$(document).on('mouseout', 'a.ict_word', remove_ICT);
