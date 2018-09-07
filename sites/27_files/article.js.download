
$(document).ready(function() {
    /* 기사본문 글자크기 변수선언 */
    if ($('#articleBody p').length) {
        font_size_default = Number($('#articleBody p').css('font-size').replace('px', ''));
        font_size_current = font_size_default;
        font_size_max = 18;
        font_size_min = 12;
    }

    resizePhotoImage();
});


/**
 * 기사본문 글자크기 변경
 **/
function changeFontSize(type) {
    if (type == 'default') {    ///< 원래 크기로
        font_size_current = font_size_default;
    } else if (type == 'inc') { ///< 1px 크게
        if (font_size_current == font_size_max) { return; }
        font_size_current++;
    } else if (type == 'dec') { ///< 1px 작게
        if (font_size_current == font_size_min) { return; }
        font_size_current--;
    }

    $('#articleBody p').css('font-size', font_size_current + 'px');
}

//2015-11-10 - By Mj
//뉴스 or 라이프 조회수 구분 code값 추가
function articleCount(art_code, koost, code) {
    if (art_code && art_code.length > 0) {
        $.ajax({
            type: "POST",
            //url: "http://www.etnews.com/tools/article_count.html",
            url: "/tools/article_count.html",
            data: "art_code=" + art_code + "&code=" + code + "&koost=" + koost + "&referer=" + encodeURIComponent(document.referrer),
            cache: false,
            success: function(html) {
            },
            error: function() {
            }
        });
    }
}


// 2014-10-24 shyun
//  uri 추가 : 어떤 경로로 유입되었는지 더 자세하게 구분하기 위한 값
function articleCount2(art_code, ref, forward, ip, agent, uri) {
    if (art_code && art_code.length > 0) {
        //if(ref == '') ref = encodeURIComponent(document.referrer);
        $.ajax({
            type: "POST",
            url: "/tools/article_count2.html",
            data: "art_code=" + art_code + "&referer=" + ref + "&forward=" + forward + "&ip=" + ip + "&agent=" + agent + "&uri=" + uri,
            cache: false,
            success: function(html) {
            },
            error: function() {
            }
        });
    }
}

/* 스크롤 있는 팝업 */
function openPopupWindow(url, pop_width, pop_height) {
	var width = pop_width;
	var height = pop_height;
	var left = (screen.availWidth - width) / 2;
	var top = (screen.availHeight - height) / 2;

	optString = "some_options, scrollbars=yes, width=" + width +", height=" + height + ", left=" + left + ", top=" + top;

	window.open(url, "etnews_pop", optString).focus();
}

function articlePrint(art_code,charset) {
    if (art_code && art_code.length > 0) {
        openPopupWindow('/tools/article_print.html?art_code=' + art_code+'&charset='+charset, 700, 600);
    }
}


function articleMail(art_code,charset) {
    if (art_code && art_code.length > 0) {
        openPopupWindow('/tools/article_mail.html?art_code=' + art_code+'&charset='+charset, 700, 570);
    }
}


/**
 * 본문 사진 이미지 크기 자동 조절
 * 이미지 크기를 구하지 못했을 때 구동
 **/
function resizePhotoImage() {
    if (!$('.photo_image').length) return;

    var photo_width = 0;
    var photo_height = 0;
    var view_width = 680;
    var caption_width = 0;

    $('.photo_image').each(function() {
        // 이미지 크기 구하기
        photo_width = $(this).width();
        photo_height = $(this).height();

        if (!photo_width || !photo_height) {
            //setTimeout('resize_photo', 200);
            return;
        }

        if (photo_width > view_width) {
            // 이미지 크기 조절
            photo_width = view_width;
            $(this).removeAttr('width').removeAttr('height')
                .css({
                    //'height': parseInt(photo_height * view_width / photo_width, 10),
                    'width': photo_width
                });
            caption_width = view_width - 10;
        }
        else {
            caption_width = photo_width - 10;
        }

        //$('#articleBody .article_img500').css('width', photo_width);    ///< 이미지 중앙정렬을 위해 추가
        $(this).show();
    });

    /*
    // 캡션 크기 조절 및 보여주기
    $('#articleBody .caption').css({
        'width': caption_width,
        'display': 'block',
        'padding': 5
    });
    */
}


/**
 * 연관기사 가져오기 (이슈분석, 오피니언기사)
 **/
function getRelated(art_code) {
    if (art_code && art_code.length > 0) {
        $.ajax({
            type: "POST",
            url: "/tools/article_ajax.html",
            dataType: "json",
            data: "mode=get_related&art_code=" + art_code,
            cache: false,
            success: function(json) {
                var html = '';
                if (!json) return;

                var len = json.items.length;
                if (len == 0) return;
                if (json.label == '') return;
                if (typeof json.category_info != 'undefined') if (json.category_info.pserial == 8 && len > 3) len = 3; ///<오피니언 이미지가 존재하는 기사는 최대기사갯수를 3으로 고정한다.

                //관련기사가 3개이하인 레이어타입
                if (len <= 3) {
                    var wcls = 'w240'; ///<이미지가 있는경우엔 w220으로 변경해준다
                    var cls = ''; ///< 이미지가 노출될때 사용되는 클래스
                    var image = ''; ///< 이미지가 노출되는 태그

                    if (typeof json.image != 'undefined') {
                        if (json.category_info.pserial == 8 && json.image != '') {
                            console.log(json.image.length, 'imag');
                            wcls = 'w220';
                            cls = ' class="fl"';
                            image = '<p class="fr img"><a href="/news/opinion_list.html?id='+ json.category_info.serial +'"><img alt="기자이미지" src="'+ json.image +'"></a></p>';
                        }
                    }

                    html += '<div class="w348">';
                    html += '    <h3 class="tit">'+ json.label +'</h3>';
                    html += '    <span class="btn_close"><a href="javascript:;" onclick="$(this).parent().parent().parent().html(\'\');">닫기</a></span>';
                    html += '    <div class="article">';
                    html += '        <ul'+ cls +'>';
                    for (var i = 0; i < len; i++) {
                        html += '            <li class="'+ wcls +'"><a href="/'+ json.items[i].art_code +'">'+ json.items[i].title +'</a></li>';
                    }
                    html += '        </ul>'+ image;
                    html += '    </div>';
                    html += '</div>';
                }


                //관련기사가 4~6개인 레이어 타입
                else if (len > 3 && len <= 6) {
                    html += '<div class="w560">';
                    html += '    <h3 class="tit">'+ json.label +'</h3>';
                    html += '    <span class="btn_close"><a href="javascript:;" onclick="$(this).parent().parent().parent().html(\'\');">닫기</a></span>';
                    html += '    <div class="article">';
                    html += '        <ul class="fl mgr35">';
                    for (var i = 0; i < 3; i++) {
                        html += '            <li class="w220"><a href="/'+ json.items[i].art_code +'">'+ json.items[i].title +'</a></li>';
                    }
                    html += '        </ul>';
                    html += '        <ul>';
                    for (var i = 3; i < len; i++) {
                        html += '            <li class="w220"><a href="/'+ json.items[i].art_code +'">'+ json.items[i].title +'</a></li>';
                    }
                    html += '        </ul>';
                    html += '    </div>';
                    html += '</div>';
                }

                $('#layerRelated').html(html);

                //스크롤위치에 따른 연관기사 노출유무 컨트롤
                $(window).scroll(function(){
                    var open_line = $('#openLine').offset().top; ///< 관련기사 오픈기준 박스위치
                    var close_line = $('#closeLine').offset().top; ///< 관련기사 클로즈기준 박스위치
                    var scrollBottom = ($(window).scrollTop() + $(window).height()) - 500;
					//alert(scrollBottom+'/'+open_line+'/'+close_line);
                    if (scrollBottom >= open_line) {
                        if (scrollBottom >= close_line) {
                            switchRelatedPop('hide');
                        } else {
                            switchRelatedPop('show');
                        }
                    } else {
                        switchRelatedPop('hide');
                    }
                });


            },
            error: function() {
            }
        });
    }
}

/**
 * 연관기사 on/off함수
 **/
function switchRelatedPop(action) {
	
	if (action == 'show') {
        if ($('#layerRelated').css('display') == 'none')
            $('#layerRelated').css({'display':'block'}).animate({'right': '-5px'}, 300);
    } else {
        if ($('#layerRelated').css('display') == 'block')
            $('#layerRelated').css({'display':'none', 'right':'-100px', 'z-index':'10'});
    }
}


