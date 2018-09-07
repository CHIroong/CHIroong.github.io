
/* //맨위로가기 버튼 소스 */
$(function() {
  $(".btn_gotop").on("click" , function(e) {
					e.preventDefault();    
					$("html, body").delay(50).animate({scrollTop: 0 }, 500);
		
  });
});


//검색창 소스출처(http://codepen.io/nikhil/pen/qcyGF)
$(document).ready(function(){
		var submitIcon = $('.searchbox-icon');
		var inputBox = $('.searchbox-input');
		var searchBox = $('.searchbox');
		var isOpen = false;
		submitIcon.click(function(){
			if(isOpen == false){
				searchBox.addClass('searchbox-open');
				inputBox.focus();
				isOpen = true;
			} else {
				searchBox.removeClass('searchbox-open');
				inputBox.focusout();
				isOpen = false;
			}
		});  
		 submitIcon.mouseup(function(){
				return false;
			});
		searchBox.mouseup(function(){
				return false;
			});
		$(document).mouseup(function(){
				if(isOpen == true){
					$('.searchbox-icon').css('display','block');
					submitIcon.click();
				}
			});
	});
		function buttonUp(){
			var inputVal = $('.searchbox-input').val();
			inputVal = $.trim(inputVal).length;
			if( inputVal !== 0){
				$('.searchbox-icon').css('display','none');
			} else {
				$('.searchbox-input').val('');
				$('.searchbox-icon').css('display','block');
			}
		}

/*전체메뉴*/
/*전체메뉴*/
function et_menu_all() {
		var csmenu_more_btn = document.getElementById("et_all_trig_id");
		var csmenu_more = document.getElementById("full_menu_id");
		if (csmenu_more.style.display == "none") {
            csmenu_more.style.display = "block";
			csmenu_more_btn.className = "et_all_trig_on";
			if ($("#FloatLayer1").css("top")=="125px") {
				$(".gnb_wrap").css("z-index","999999");
			}
        } else {
            csmenu_more.style.display = "none";
			csmenu_more_btn.className = "et_all_trig_off";
			if ($("#FloatLayer1").css("top")=="125px") {
				$(".gnb_wrap").css("z-index","0");
			}
        }
		
}