var timerId = 0;
try
{
	if (KOREA_WELIFE!='1')
	{
		timerId = setInterval(function () {
			photo_ad();
		}, 100);
	}
}
catch (e)
{
}

function photo_ad(){
    min_ad_wid = "233";
    ad_close_width = "22";
    margin_ad_hei = "70";
    extend_hei = "0";
    
    big_ad_wid = "468";
    big_ad_hei = "60"; 
    small_ad_wid = "350"; 
    small_ad_hei = "60";
    tiny_ad_wid = "234";
	tiny_ad_hei = "60";
	
    big_ad_url    = "http://ad.ad4989.co.kr/cgi-bin/PelicanC.dll?impr?pageid=00AM&out=iframe" ;
	//2017-05-02 김상수 부장 요청 큰 사이즈만 교체 By Mj 
	//big_ad_url    = "http://ad.tjtune.com/cgi-bin/PelicanC.dll?impr?pageid=05uc&out=script" ;
    small_ad_url = "http://ad.ad4989.co.kr/cgi-bin/PelicanC.dll?impr?pageid=00AL&out=iframe" ;
    tiny_ad_url = "http://ad.ad4989.co.kr/cgi-bin/PelicanC.dll?impr?pageid=00AK&out=iframe" ;
	
	jQuery('#articleBody').each(function(index) {
        body_offset = jQuery(this).offset(); 
        body_offset_top = body_offset.top;
        body_offset_left = body_offset.left;
     });
       
    jQuery('.article_image').each(function(index) {
        div_wid = jQuery(this).width();
        div_hei = jQuery(this).height();
        
        div_offset = jQuery(this).offset(); 
        div_offset_top = div_offset.top;
        div_offset_left = div_offset.left;
     });

     jQuery('.article_image:first img').each(function(index) {
     	if(index == 0){
	        photo_wid = jQuery(this).width();
	        photo_hei = jQuery(this).height();

	        offset = jQuery(this).offset(); 
	        offset_top = offset.top;
	        offset_left = offset.left;

	        if(photo_wid > big_ad_wid){
	            ad_wid = big_ad_wid;
	            ad_hei = big_ad_hei;
	            ad_url = big_ad_url;
	        }else if(photo_wid > small_ad_wid){
		        ad_wid = small_ad_wid;
		        ad_hei = small_ad_hei;
		        ad_url = small_ad_url;
		    }else{
		        ad_wid = tiny_ad_wid;
		        ad_hei = tiny_ad_hei;
		        ad_url = tiny_ad_url;
		     }
		     
	        ad_align= ((div_wid - photo_wid) + (photo_wid - ad_wid)) / 2; 
	        ad_close_left = ad_wid - ad_close_width + 6;
	        
	        position_top = offset_top - body_offset_top + photo_hei - margin_ad_hei - extend_hei;
	        position_left = offset_left - body_offset_left + photo_wid - ad_wid - (photo_wid-ad_wid)/2;
	        
	        close_top = position_top;
	        close_left = position_left + parseInt(ad_wid) - 15;
	       
	        film_top = position_top + 60;
        	film_left = offset_left;
        	film_width = photo_wid;
	
			if(photo_wid > min_ad_wid){
				jQuery("<div id='mask"+index+"' class='mask_div' style='position:absolute;left:" + position_left + "px;top:" + position_top +"px; z-index:100;'><IFRAME FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=" + ad_wid + " HEIGHT=" + ad_hei + " SRC='"+ad_url+"'></IFRAME></div>").appendTo(".article_image:first"); 
				
				jQuery("<div id='close_mask' class='mask_div' style='cursor: hand; position:absolute;left:"+close_left+"px;top:"+close_top+"px;z-index:2000;line-height:0;'><img src='http://js.hnscom.com/etc/hns/black_x.png' onclick='photo_ad_close("+index+")' ></div>").appendTo(".article_image:first");
				
	        	clearInterval(timerId);
	         }
	         
	         if(extend_hei > 0){
				jQuery("<div id='film' class='mask_div' style='display:block; position:absolute; left:" + film_left + "px; top:" + film_top +"px; z-index:3; background:#000; width:"+film_width+"px; height:30; filter:Alpha(opacity=70); opacity:0.7; -moz-opacity:0.7; cursor:default;'><iframe frameborder='0' allowtransparency='true' width='400' height='30' scrolling='no' src='http://ad.ad4989.co.kr/cgi-bin/PelicanC.dll?impr&amp;pageid=00A4&amp;bannerid=00pJ&amp;out=iframe'></iframe></div>").appendTo(".article_image:first");
			}
     	}
	});
}

function photo_ad_close(index){      
    jQuery('#mask'+index).hide();
    jQuery(".mask_div").hide();
};
