/**
 * 2012.07.03
 * 관리자  script
 */

/*****************************************************************************
공용 이벤트
*****************************************************************************/
var evt={
	vars : {
		
	}

	/**
	 * 위로 스스르~~
	 * @param interval : px
	 * @param limit : 탑의 어디까지 도달하는가?
	 */
	,scrollToTop:function(interval, limit)
	{
		if(!interval) interval = -50;
		if(!limit) limit = 0;
		
		var top = document.documentElement.scrollTop||document.body.scrollTop
		,si = setInterval(function(){
										top += interval;
										if(interval<0){											
											if(limit >= top) clearInterval(si);	
										}else{												
											if(limit <= top) clearInterval(si);	
										}
										window.scrollTo(0, top);				
									}, 1);		
	}

	/**
	 * 가로형 일반적 사진 갤러리
	 * 
	 * @params
	 *  - list : [{}] 사진 리스트 [{"parentIdxno":"","idxno":"","filename":"","insertPhoto":"","represent":"","search":"","watermarkPosition":"","photoUrl":"","width":,"caption":""}...]
	 *  - $target : $리스트뿌릴 타겟
	 *  - $btns : {prev:$이전버튼타겟, next:$다음버튼타겟}
	 */
	,horizonPhotoList:function(list, $target, $btns)
	{
		var $prev = $btns.prev
			,$next = $btns.next
			,len = list.length
			,$parent = $target.parent()														// 사진을 둘러싼 박스
			,html = "";
		
		if(len<=0) return false;
		
		for(var i in list){
			var image = list[i]
				,idxno = image.idxno
				,filename = image.filename
				,photoUrl = image.photoUrl
				,thumb = util.convertPhotoFilename(photoUrl, "o2t")
				,path = (filename?filename:util.getDirNFilename(photoUrl))
				,width = image.width
				,height = image.height;
			
			html += '<li><a href="javascript:void(0);" data-idxno="'+idxno+'" data-path="'+path+'" data-url="'+photoUrl+'" data-thumb="'+thumb+'" data-width="'+width+'" data-height="'+height+'"><img src="'+thumb+'" alt="photo list" /></a></li>';
		}
		
		$(html).appendTo($target);
		
		var tWidth = $parent.innerWidth()
			,$liFirst = $target.children("li:first")
			,margins = $liFirst.css(["margin-left", "margin-right"])
			,marginLeft = editSortable.castToIntFromCss(margins["margin-left"])
			,marginRight = editSortable.castToIntFromCss(margins["margin-right"])
			,liWidth = $liFirst.outerWidth()+marginLeft+marginRight;

		// button
		if((liWidth*len) <= tWidth) $prev.add($next).hide();
		$prev.prop("disabled", true);															// 처음은 disabled
		
		// 이전버튼
		$prev.click(function(){
			var left = editSortable.castToIntFromCss($target.css("margin-left"))+liWidth;
			
			if(left>=0) $prev.prop("disabled", true);
			else $next.prop("disabled",false);
			
			$target.animate({"margin-left":"+="+liWidth},100);
		});
		
		// 다음버튼
		$next.click(function(){
			var left = editSortable.castToIntFromCss($target.css("margin-left"))-liWidth
				,compare = Math.abs(left) + marginLeft + marginRight + tWidth
				,fullWidth = liWidth * len;
			
			if(compare >= fullWidth) $next.prop("disabled",true);
			else $prev.prop("disabled", false);
			
			$target.animate({"margin-left":"-="+liWidth},100);
		});
	}
	
	/*
		기본 가로/Cube 슬라이드 (library.js)
		- box_slide_horizon : 한 슬라이드에 한 단
		- box_slide_horizon_multi : 한 슬라이드에 여러 단이 있는거(여러조건의 오토박스)
	*/
	,evtDefaultSlide:function(isEdit)
	{
		// 일반 가로 슬라이드
		new Slide({
			root:".box_slide_horizon,.box_slide_horizon_multi"
			,box:".box_slide_horizon_box"
			,slide:".box_slide_horizon_list"								// touch event
			,btn : {prev:".box_slide_horizon_btn_prev", next:".box_slide_horizon_btn_next", number:".box_slide_horizon_btn_number"}
			,page : ".box_slide_horizon_btn_page"
		}
		,{/* option */}).exe();

		// Cube 슬라이드
		new Slide({
			root:".box_slide_cube"
			,box:".box_slide_cube_box"
			,slide:".box_slide_cube_rotate"								// touch event
			,list:".box_slide_cube_list"
			,btn : {prev:".box_slide_cube_btn_prev", next:".box_slide_cube_btn_next"}
			,page : ".box_slide_cube_btn_page"
		}
		,{/* option */}, isEdit).exe();
	}
	
	// 추가삭제후 이벤트 재시작 목록
	,restartEventList:function()
	{
		this.evtDefaultSlide(true);
	}
	
	// light box - 시간날때, 다시 만들어야 함
	,lightBox:function(target)
	{		
		$(document.body).on("click", target,
							function(){
								var _this = this
									,mode = _this.getAttribute("data-mode")
									,source = _this.getAttribute("data-source")
									,caption = _this.getAttribute("data-caption")
									,_width = document.body.clientWidth
									,_height = document.body.clientHeight;
								
								if(!source || !mode) return false;
								
								// 뷰함수
								function float(size){
									var inTag = ""
										,width = size.width
										,height = size.height;
									
									// 사진
									if(mode === "image"){
										width = width>_width ? _width-100 : width;
										height = height>_height ? _height : height;										
										inTag = '<img src="'+source+'" width="'+width+'" alt="" class="light_box_img" />';
										if(caption)	inTag+='<div class="border_box light_box_caption">'+caption+'</div>';
									}
									// 동영상
									else if(mode === "video"){
										inTag = decodeURIComponent(source).replace(/&#039;/g, '"');
										var $inTag = $(inTag);
										width = Number($inTag.attr("width"));
										height = Number($inTag.attr("height"))+35;
									}
								
									var html = editSortable.replaceLayerHtmlTag(editSortable.vars.layerBox, lang.close, inTag, null)
										,output = $(html).find(".edit_layer_close").click(editSortable.closeEditLayer).end().find(".edit_layer_frame").css({"position":"relative","height":(height+10)+"px"}).end();
									
									util.floatLayer((width>975?975:width), height, output);	// layer 띄우기
								}
								
								if(mode === "image"){
									source = util.convertPhotoFilename(source, "t2o");
									util.getImageSize(source, float);
								}else if(mode === "video"){
									float({width:600, height:500});
								}
						
								return false;
							});
	}
	
	/**
	 * 속보형 롤링 한줄 기사
	 * @param
	 *  - target : 속보 전체 selector
	 *  - speed : 속보(밀리초) - 0이하라면 흘러가지 않고 바로 바뀜
	 *  - delay : 멈춤시간(초)
	 *  
	 *  필요 selector 
	 *   - .box : 롤링되는 객체의 바로 부모 박스
	 *   - .title : 하나하나의 한줄 제목
	 *   
	 *  템플릿(오토박스)내에서 호출시
	 *  <script>evt.rollingLines(".edit_autobox[data-area-idxno='{$row[0].area_code}'] .ts_break_news");</script>
	 *  
	 *  sample :::
	 *  <!-- 속보 -->
		<dl id="break_news" class="form_dl sf1_box">
			<dt class="sf1b_title">{$lang.breaknews}</dt>
			<dd>
				<ul class="no_type sf1b_ul box">
					<li class="sf1b_li title"><a href="" class="sf1b_a">1인천모자살인사건 피의자 차남 부인 자살… 오늘 오후 경찰조사 예정(2보) </a></li>
					<li class="sf1b_li title"><a href="" class="sf1b_a">2인천모자살인사건 피의자 차남 부인 자살… 오늘 오후 경찰조사 예정(2보) </a></li>
					<li class="sf1b_li title"><a href="" class="sf1b_a">3인천모자살인사건 피의자 차남 부인 자살… 오늘 오후 경찰조사 예정(2보) </a></li>
					<li class="sf1b_li title"><a href="" class="sf1b_a">4인천모자살인사건 피의자 차남 부인 자살… 오늘 오후 경찰조사 예정(2보) </a></li>
					<li class="sf1b_li title"><a href="" class="sf1b_a">5인천모자살인사건 피의자 차남 부인 자살… 오늘 오후 경찰조사 예정(2보) </a></li>
				</ul>
			</dd>
		</dl>
		<!-- //속보 -->
	 */
	,rollingLines:function(target, speed, delay)
	{
		var $target = $(target)
			,height = $target.height()
			,$box = $target.find(".box")
			,$title = $box.find(".title")
			,length = $title.length
			,si = null, st = null
			,top = 0
			,max = height*length
			,interval = speed<=0?height:1
			,count = 1
			,by = 1;			// 위,아래
		
		if(length<=0) return false;
		if(!speed) speed = 20;
		if(!delay) delay = 3;		
		
		$title.height(height);					// 한줄 제목을 보일 높이값으로 세팅함
		$box.append($title.clone());			// 끊김없이 이어질려고
		
		//--- roll ---//
		function roll(){
			si = setInterval(function(){
				
				top+=(interval*by);				
				if(top>=max){
					top = 0;
					count = 0;
				}else if(top<0){
					top = max-height;
					count = length-1;
				}
				
				$box.css("top", -(top)+"px");				
				if((by>0 && (count*height <= top)) || (by<0 && (count*height >= top))){					
					clearInterval(si);					
					st = setTimeout(roll, delay*1000);

					if(by>0) count++;	// up button
					else count--;		// down button
				}
				
			}, speed);
		}
				
		st = setTimeout(roll, delay*1000);		// 실행
				
		$box.on({
			mouseenter:function(){				// 멈춤
				clearInterval(si);
				clearTimeout(st);
			}
			,mouseleave:function(){				// 재실행
				roll();
			}
		});
		
		// up, down 버튼 클릭
		$target.parent(".wnb_default").find(".up, .down").click(function(){
			var _top = Math.abs(top)
				,_height = Math.abs(count*height - height);
			
			$box.trigger("mouseenter");
			if($(this).is(".up")){		// 위로
				by = 1;
				count = count+(_top===_height?0:2);
			}else{						// 아래로
				by = -1;
				count = count-(_top===_height?2:0);
			}
			
			roll();
		});
	}
	
	/*
	 * 상단 배너등 접었다 폈다 하는거
	<div class="fold_box"><!-- fold 닫힌상태 -->
		<ul class="fb_content"><!-- .fb_content --> 는 필수
			<li class="fb_item"><img src="http://ph.set1.com/adcontent/content_file/27fb3c9cea3b31fd789657d4fa07cf73.gif" alt="스페셜이벤트" /></li>
			<li class="fb_item"><img src="http://ph.set1.com/adcontent/content_file/1a54f9c953da450c32f9a6d98deed9ea.gif" alt="정전60주년" /></li>
			<li class="fb_item"><img src="http://ph.set1.com/adcontent/content_file/6006fa6f69b0a58890224e9059784560.gif" alt="코오롱글로벌배 골프" /></li>
		</ul>
		<a href="#;" class="fb_btn">접기/펴기</a>
	</div>
	 */
	,clickedFold:function(target)
	{
		$(target).has(".fb_content").addClass("has")
		.find(".fb_btn").click(function(){
								var $this = $(this)
									,$box = $this.closest(target)
									,isFold = $box.hasClass("fold");			// .fold 클래스가 있으면 닫힘 상태
								
								$box.toggleClass("fold");
							});
	}
	
	/*
	 [template] 사진형 기사 박스 - 숫자형 버튼 클릭

	@ data-type : scroll or stop (default stop) - 몇초에 한번씩 바뀔것인가
	@ data-delay : 숫자형(second) - 멈춤시간
	
	sample :
	<div id="template_skin_100" class="border_box height_auto template_skin_103" data-type="auto" data-delay="3" style="width:400px;height:200px;">	
		<div class="transition_all border_box ts_box">
			<div class="ts_list" style="height:200px;">
				<a href="http://daum.net"><img src="a.jpg" alt="title" class="tsl_img" /></a>
				<a href="http://daum.net"><img src="b.jpg" alt="title" class="tsl_img" /></a>
				<a href="http://daum.net"><img src="c.jpg" alt="title" class="tsl_img" /></a>
			</div>
		</div>
	
		<div class="ts_btns" style="top:175px;">
			<button type="button" class="tsb tsb1">1</button>
			<button type="button" class="tsb tsb2">2</button>
			<button type="button" class="tsb tsb3">3</button>
			{/section}
		</div>
	</div>
	*/
	,changePhotoArticle:function(target){
		var $target = $(target)
			,$box = $target.find(".ts_box")
			//,$list = $target.find(".ts_list")
			,$btn = $target.find(".tsb").filter(":eq(0)").addClass("on").end()
			,size = $target.css(["width","height"])
			//,width = util.castIntFromCss(size.width)
			,height = util.castIntFromCss(size.height)
			,type = $target.attr("data-type")||"stop"
			,delay = Number($target.attr("data-delay"))||3
			,roll = type=="auto" ? true : false		// 롤링될것인가?
			,index = 0
			,top = 0
			,count = $btn.length; // 총갯수
		
		function chk(){
			top = index*height*-1;
			$box.css("top", top+"px");
			$btn.filter(".on").removeClass("on").end().filter(":eq("+index+")").addClass("on");
		}
		
		if(roll===true){
			setInterval(function(){
				if(roll===true){					
					chk();
					
					index++;					
					if(count <= index) index=0;
				}
			}, delay*1000);	
			
			// 마우스 오버시
			$target.on({
				mouseenter:function(){
					roll = false;
				}
				,mouseleave:function(){
					roll = true;
				}
			});
		}// roll if
				
		// 버튼 클릭시
		$btn.click(function(){
			var $this = $(this);
			index = $this.index();
			
			chk();			
		});
	}
	
	/*
	 * [template] 줄기사 화살표로 페이징  
	 * 	<div id="template_skin_100" class="border_box height_auto template_skin_104">
			<div class="ts_btns">
				<span class="tahoma ts_page">1/1</span>
				<button type="button" class="ts_btn ts_prev">이전</button>
				<button type="button" class="ts_btn ts_next">다음</button>
			</div>
			
			<ul class="no_type ts_ul first">
				<li class="ts_li"><a href="http://da.net" class="tsl_a">title</a></li>
				<li class="ts_li"><a href="http://da.net" class="tsl_a">title</a></li>
				...
			</ul>
			
			<ul class="no_type ts_ul">
				<li class="ts_li"><a href="http://da.net" class="tsl_a">title</a></li>
				<li class="ts_li"><a href="http://da.net" class="tsl_a">title</a></li>
				...
			</ul>
			
		</div>
		
		<script type="text/javascript">
		evt.pageLineArticle("#template_skin_100");
		</script>
	 */
	,pageLineArticle:function(target)
	{
		var $target = $(target)
			,$page = $target.find(".ts_page")
			,$btns = $target.find(".ts_btns")
			,$btn = $target.find(".ts_prev, .ts_next")
			,$ul = $target.find(".ts_ul")
			
			,tPage = $ul.length					// 총 페이지
			,page = 1							// 현재 페이지
			,chage = true;						// 자동갱신
		
		// 버튼 오른쪽에 위치 시킴
		$btns.width($target.innerWidth());			
		$page.text(page+"/"+tPage);
		
		$btn.click(function(){
			var $this = $(this)
				,prev = $this.hasClass("ts_prev");
			
			
			if(prev){ 	// 이전 클릭시
				page--;
				if(page <= 0) page=tPage;
			}else{		// 다음 클릭시
				page++;	
				if(page > tPage) page=1;
			}
			
			$page.text(page+"/"+tPage);
			$ul.hide().filter(":eq("+(page-1)+")").show();
		});	
		
		$target.on({
			mouseenter:function(){
				chage = false;
			}
			,mouseleave:function(){
				chage = true;
			}
		});
		
		setInterval(function(){
			if(chage===true){
				$btn.filter(".ts_prev").trigger("click");
			}
		}, 5*1000);
	}
	
	
	/**
	 * 사진 오버시 타겟이 다른 곳에 보이기   
	 * template 192번
	 */
	,viewPhotoToTarget:function(target)
	{
		var $contents = $(target)
			,$titles = $contents.find(".tsl_title")
			,index = 0
			,length = $contents.find(".tsl_title").length
			,isChange = true;

		function view(){
			var $parent = $contents
				,$this = $parent.find(".tsl_title").eq(index)
				,$img = $this.find("img")
				,$title = $parent.find(".ts_title")
				,$titleBox = $parent.find(".ts_title_box")
				,$cnv = $titleBox.find(".ts_img")
				,href = $this.attr("href")
				,alt = $img.attr("alt")
				,src = $img.attr("src");
				
			$title.html(alt);
			$titleBox.attr("href", href);
			$cnv.attr({"src":src, "alt":alt});
			$titles.removeClass("on").filter($this).addClass("on");
		}

		$contents.on({
			mouseenter:function(){ isChange = false; }
			,mouseleave:function(){ isChange = true; }
		});
		
		$titles.mouseenter(function(){
			index = $(this).index();
			view();
		});
		
		setInterval(function(){
			if(isChange===true){
				index++;
				if(index>=length){
					index = 0;
				}	
				
				view();	
			}			
		}, 7*1000);	
	}
};


/*****************************************************************************
border 퍼지게... blast.exe(target); target은 jquery이거나 일반 셀렉터 or 객체
*****************************************************************************/
var blast={
	vars:{
		borderSize : 5
		,$target : null
		,$outline : null
	}
	
	,init:function(target)
	{
		this.vars.$target = !!target.jquery ? target : $(target);
	}
	
	,castInt:function(v){
		return util.castIntFromCss(v);
	}
	
	,getInfo:function($target)
	{
		var pos = $target.position()
			,width = $target.outerWidth()
			,height = $target.outerHeight()
			,borderSize = this.vars.borderSize
			,marginBottom = this.castInt($target.css("margin-top")) - borderSize
			,marginRight = this.castInt($target.css("margin-right")) - borderSize;
			
		return  {
					top : pos.top + marginBottom
					,left : pos.left + marginRight
					,width : width
					,height: height
				};
	}
	
	,makeOutline:function()
	{
		var $t = this.vars.$target
			,info = this.getInfo($t);
		if(this.vars.$outline !== null) this.removeOutline();
		
		this.vars.$outline = $("<div />").addClass("edit_box_blast").css({"top":info.top, "left":info.left, "width":info.width, "height":info.height});
		this.vars.$outline.appendTo(document.body);		
	}
	
	// remove
	,removeOutline:function()
	{
		var $target = this.vars.$outline ? this.vars.$outline : $(".edit_box_blast");
		$target.addClass("blast");
		
		var st = setTimeout(function(){
			$target.remove();
			clearTimeout(st);
		},1000);
		
		this.vars.$outline = null;
	}
	
	// 다른곳에서 부를때,
	,exeOutline:function(target)
	{
		if(!target) return ;
		
		this.init(target);
		this.makeOutline();	
	}	

	,exe:function(target, interval){
		if(!interval) interval = 300;

		var parents = this;
		parents.exeOutline(target);

		var st =  setTimeout(function(){
			parents.removeOutline();
			clearTimeout(st);
		},interval);
	}
};




/*****************************************************************************
사이트 기본설정
*****************************************************************************/
var basicCfg={
	vars:{
		
	}
	
	// 메타태그 select bar event
	,evtMetatagSelectBar:function()
	{
		var $textarea = $("#cfg_metatag_content");
		$("#cfg_metatag_name").change(function(){
			var name = this.value;		
			if(!name) return false;
			
			var textValue = $textarea.val()
				,tag = '<meta name="'+name+'" content="'+lang.cfgMetatagContent+'" />';
			
			if(textValue.indexOf('name="'+name+'"')>=0){
				alert(lang.cfgRequireMetatagDuple);
				return false;
			}
			
			$textarea.val($.trim(textValue+"\n"+tag));
		});
	}
	
	// 전송
	,evtSubmitMetatag:function(form)
	{
		/*
		if(!form.metatag_content.value){
			alert(lang.validRequireContent);
			form.metatag_content.focus();
			return false;
		}
		*/
		return true;
	}
	
	// 통계 스크립트 등록
	,evtSubmitAnalystics:function(form)
	{
		/*
		if(!form.analystics_content.value){
			alert(lang.validRequireContent);
			form.analystics_content.focus();
			return false;
		}
		*/
		return true;
	}
};


/*****************************************************************************
메뉴 서브메뉴 미리보기 편집
*****************************************************************************/
var menucfg={
	// 새창-UI가 바뀌어서 안씀
	opencfg:function()
	{
		$(document.body).on("click", ".adm_open_new", 
							function(){
								var link = this.getAttribute("href");
								if(!link) return false;
								
								window.open(link, "menu_cfg", "width=1000,height=500,resizable=yes");
								return false;								
							});
	}
		
	// a tag 막기
	,disableABubble:function()
	{
		$("#cfg_menu_set").find("a").attr("target","_blank"); //.click(function(){ return false; });		
	}
};

// 메뉴보이기 일반화면
var menus={
	vars:{
		maxWidth : 980
	}
	,show:function()
	{
		var parents = this
			,$buttons = $(".layer_menu_btn")
			,$menu = $("#menu");
		
		// 모아서 메뉴 안으로 넣기
		$.each($buttons, function(){
			var $this = $(this)
				,menu = $this.attr("data-menu");
			if(!menu) return false;
			
			$("#"+menu).appendTo(this);			
		});
		
		// 포커스, 마우스 이벤트
		$buttons.on({
						"mouseenter focusin":function(){
							var $this = $(this)
								,menu = $this.attr("data-menu");
							if(!menu) return false;
							
							var $layer = $this.children(".layer_menu")
								,layerWidth = $layer.outerWidth()
								,height = $this.outerHeight()
								,position = $this.offset()
								,left = position.left
								,top = position.top + height
								
								,allLeft = layerWidth+left				// 박스크기에따라 나오는 위치 판별
								,mPosition = $menu.offset()
								,allmLeft = parents.vars.maxWidth+mPosition.left;
							
							// 노출되는 것이 밖으로 벗어 난다면
							if(allLeft >= allmLeft){
								var mPosition = $menu.offset()
									,mLeft = mPosition.left;
								// document넓이보다 크다면, 첫 메뉴 시작점부터
								if(layerWidth >= parents.vars.maxWidth){
									left = mLeft;
								}else{
								// 작다면 document의 오른쪽 끝으로 붙임
									left-=(allLeft-allmLeft);
								}								
							}
							$layer.css({"top":top+"px", "left":left+"px"}).show();
						}
						,"mouseleave focusout":function(){
							var $this = $(this);
							$this.children(".layer_menu").hide();
						}						
					});
	}
	
	// 즐겨찾기
	,registFavorite:function(target)
	{
		$(target).click(function(){
			try{
				util.createBookmarkLink(DOMAIN);
			}catch(e){}
			
			return false;
		});
	}
	
	// 시작페이지 설정
	,startPage:function(target)
	{
		$(target).click(function(){
			util.startPage(this, DOMAIN);
			return false;
		});
	}
	
	// 일반적 텍스트 서브메뉴
	,normalSubmenu:function()
	{
		try{
			var $lis = $("#nav").children(".n_li.is_menu")				// 0부터 시작, 어디까지가 메뉴?
				,maxIndex = ($lis.length||1)-1 							// hover 가 되면 변화가 있는 메뉴의 끝
				,liIndex = parseInt(util.localStorage.getItem("menuIndex"), 10)||0 				// 대메뉴 인덱스번호
				,submenuIndex = parseInt(util.localStorage.getItem("subMenuIndex"),10)||0		// 서브메뉴 인덱스번호
				,$except = $(".sub_menu_box").find(".m_except");		// 제외할 객체
			
			// index화면일때,
			if(!location.search){
				liIndex=0;
				submenuIndex=0;
				util.localStorage.setItem("menuIndex", liIndex);
				util.localStorage.setItem("subMenuIndex", submenuIndex);
			}

			// 서브메뉴가 있을때...
			function positionSubmenu($target){
				if($target.is(".has_menu")){
					var $nav = $("#nav")
						,$submenu = $target.find(".sub_menu")
						,subWidth = $submenu.width()||0
						,navWidth = (($nav.position().left||$nav.offset().left)||0)+980
						,pos = $submenu.position()
						,totalWidth = subWidth+(pos?pos.left:0)
						,exceptPos = $except.position()
						,exceptLeft = (exceptPos?exceptPos.left:0);

					// 상시 박혀있는 것을 덮지 않게 하기 위해
					if(exceptLeft>0 && totalWidth>exceptLeft){
						$submenu.css("margin-left", (exceptLeft-totalWidth-10)+"px");
					}
					// 메뉴 영역보다 오른쪽으로 벗어났다면,
					else if(totalWidth>navWidth){
						$submenu.css("margin-left", -Math.abs(totalWidth-navWidth)+"px");
					}
				}				
			}
			// ---
				
			$lis.removeClass("on").filter(":eq("+liIndex+")").addClass("on")			
			// 서브메뉴
			.find(".sm_li:eq("+submenuIndex+")").addClass("on")
			.end().end().each(function(){
				
				var $this = $(this)
					,$mark = $this.find(".mark");
				
				// 화살표등의 hover마크가 있다면 가운데 자리잡게 함
				if($mark.length>0) $mark.css("margin-left", (($this.width()/2) - ($mark.width()/2))+"px");	
				
				// 서브메뉴 위치
				positionSubmenu($this);				
			});
			
			// event
			$lis.on({ 
						mouseenter:function(){ 
							var index = $lis.index(this)||0;
							if(index>maxIndex) return false;
							
							// 서브메뉴 위치
							positionSubmenu($(this));
							
							$lis.removeClass("on"); 
						}
						,mouseleave:function(){ 
							$lis.filter(":eq("+liIndex+")").addClass("on"); 
						}
						,click:function(){
							var index = $lis.index(this)||0;
							
							if(index>maxIndex) index=0;
							util.localStorage.setItem("menuIndex", index);
						}
					 })
				  // submenu
				 .find(".sm_li").click(function(){
					 var index = $(this).index()||0;
					 util.localStorage.setItem("subMenuIndex", index);
				 });
		}catch(e){}
	}


	// 세로메뉴 보이기/감추기
	,verticalSubmenu:function(){
		var body=document.documentElement
			,$header=$("#header").find(".h_top")
			,$btnMenu=$("#ht_btn_menu")
			,$menuBox=$("#menu")
			,$hasMenu=$menuBox.find(".has_menu")
			,$btnClose=$menuBox.find("#menu_btn_close")
			,$navBox=$menuBox.find("#nav")
			,isToggle=true; 

		function setPosition(){
			var hLeft=$header.offset().left
				,height=body.scrollHeight;

			$menuBox.css({left:hLeft+"px",height:height+"px"});
		}
		
		// 열고 닫기 
		$btnMenu.add($btnClose).click(function(){ 
			// 열림
			if(isToggle) setPosition();

			$menuBox[isToggle?"addClass":"removeClass"]("on"); 
			isToggle=!isToggle;
		});

		// 메인메뉴 오버시 서브메뉴 위치
		$hasMenu.mouseenter(function(){
			var $this=$(this)
				,bh=body.clientHeight
				,$subMenu=$this.find(".sub_menu")
				,lh=(function(){ 
						var _hs=$subMenu.find(".sm_li").map(function(){ return $(this).outerHeight(); }).get(), _ts=0; 
						for(var i=0,t=_hs.length;i<t;i++) _ts+=_hs[i]; 
						return _ts; 
				 })()
				,t=$this.offset().top||0
				,sh=lh+t;

			if(bh<sh) t-=(sh-bh);
			if(t<=0) t=0;

			$subMenu.css({"padding-top":t+"px"});
		});

		$(window).on({
			"setPositionMenu":function(){ setPosition(); }
			,resize:function(){ $(this).triggerHandler("setPositionMenu"); }
		});
	
	}
};


/*****************************************************************************
회원설정 (memberCfg)
*****************************************************************************/
var memberCfg={
	startIndex:null   // drag 로 순위 변경시 drag시작한 index
		
	// 기본설정 user type 필수 체크 
	,evtRequireUserType:function()
	{
		$("#user_type_A, #user_type_B").change(function()
		{
			alert(lang.mbrcfgRequireUserType);
			$(this).attr("checked", true);
			return false;
		});
	}

	// 기본설정 전송
	,typeSubmit:function()
	{
		var rtn = true;
		var $form = $("form[name='form_type']");
		var $input = $form.find("input[type!='checkbox'][type!='hidden']");
		if($input.size()<=0) return false;
		
		$input.each(function(i, ele)
		{
			var $obj = $(ele);
			if($obj.val()=="")
			{
				alert($obj.parent().prev("dt").children("label").text() + ", 입력하여 주세요.");
				$obj.focus();
				rtn = false;
				return false;
			}
		});
		
		return rtn;
	}
	
	// 약관설정
	,termSubmit:function()
	{
		var $obj = $("#term_content");
		if($obj.val().length<=100)
		{
			alert(lang.mbrcfgRequireTermContent);
			$obj.focus();
			return false;
		}
		return true;
	}
	
	// 개인정보 수집
	,privacySubmit:function()
	{
		var $obj = $("#privacy_content");
		if($obj.val().length<=100)
		{
			alert(lang.mbrcfgRequirePrivacyContent);
			$obj.focus();
			return false;
		}
		return true;
	}
	
	// 인증 설정 radio check
	,checkedAuthType:function()
	{
		var $Y = $("#auth_use_check_Y")
			, $N = $("#auth_use_check_N")
			, checked="N";
		
		if($Y.prop("checked")===true){
			$("#auth_jp_ip_box input").attr("disabled",false);
			checked="Y";
		}else if($N.prop("checked")===true){
			$("#auth_jp_ip_box input").attr("disabled",true);
			checked="N";
		}
		
		return checked;
	}
	
	// 인증 설정 radio check - 클릭이벤트 
	, evtCheckedAuthType:function()
	{
		var $clicked = $("#auth_use_check_Y, #auth_use_check_N");
		
		$clicked.click(memberCfg.checkedAuthType);
		
	}
	
	// 인증 설정
	,authTypeSubmit:function()
	{
		if(this.checkedAuthType()=="Y")
		{
			var $jp = $("#auth_jp_check")
				, $ip = $("#auth_ip_check")
				, $jChecked = $jp.prop("checked")
				, $iChecked = $ip.prop("checked");
			
			if($jChecked===true)
			{
				if($("#auth_jp_id").val()=="" || $("#auth_jp_pw").val()=="")
				{
					alert(lang.mbrcfgRequireAuthJid);
					return false;
				}
			}else $("#auth_jp_id, #auth_jp_pw").val(""); // 선택되어 있지 않다면, 빈값으로 날아가게...
			
			if($iChecked===true)
			{
				if($("#auth_ip_id").val()=="" || $("#auth_ip_pw").val()=="")
				{
					alert(lang.mbrcfgRequireAuthIid);
					return false;
				}
			}else $("#auth_ip_id, #auth_ip_pw").val("");
			
			if($jChecked===false && $iChecked===false)
			{
				alert(lang.mbrcfgRequireAuthChecked);
				return false;
			}			
		}
		
		return true;
	}
	
	/******************* 아이디 제한 *************************************************/
	// 아이디제한 수정 클릭
	,evtLimitIdClicked:function()
	{
		var $field = $("#limit_id_text")
			, $a = $("a.limit_id_title")
			, $del = $("button.limit_id_btn_delete")
			, $act = $("input[name='act']")
			, $code = $("input[name='code']");
		
		// 아이디 클릭시 수정 이벤트
		$a.click(function(){
			$this = $(this);
			
			$field.val($.trim($this.text())||"").focus(); // 아이디 빼서 텍스트 input에 넣음;
			$code.val($.trim($this.prev("input[name='___code']").val())||""); // 코드 값 넣음;
		});		
		
		// 삭제 버튼 클릭시 이벤트
		$del.click(function(){
			if(!window.confirm(lang.mbrcfgConfirmLimitId)) return false;
			
			$this = $(this);
			$act.val("adminLimitIdDlt");
			
			$code.val($.trim($this.parent().find("input[name='___code']").val()));	
			
			document.form_type.submit();
		});
	}
	
	// 등록, 수정 submit
	,limitIdSubmit:function(mode)
	{
		var $field = $("#limit_id_text")
		, $a = $("a.limit_id_title")
		, $code = $("input[name='code']");
		var $text = $.trim($field.val());
		
		if($text=="")
		{
			alert(lang.mbrcfgRequireLimitIdField);
			$field.focus();
			return false;			
		}
		
		// 아이디 모우기 - 속도 늦을경우 이부분 주석!
		var arr = [];
		$a.each(function(){
			arr.push($.trim($(this).text()));
		});
		
		if($.inArray($text, arr)>=0)
		{
			alert(lang.mbrcfgRequireLimitIdDupl);
			$field.focus();
			return false;
		}
		
		// 수정일때는 히든 코드값이 있나 확인.
		if(mode == "modify")
		{			
			if($code.val()=="")
			{
				alert(lang.mbrcfgRequireLimitIdCode);
				return false;
			}
		}else
			$code.val("");
		
		if(mode=="modify") document.form_type.submit();
		else return true;
	}
	
	/******************* 필명 제한 *************************************************/
	// 필명제한 수정 클릭
	,evtLimitNickClicked:function()
	{
		var $field = $("#limit_nick_text")
			, $a = $("a.limit_nick_title")
			, $del = $("button.limit_nick_btn_delete")
			, $act = $("input[name='act']")
			, $code = $("input[name='code']");
		
		// 아이디 클릭시 수정 이벤트
		$a.click(function(){
			$this = $(this);
			
			$field.val($.trim($this.text())||"").focus(); // 아이디 빼서 텍스트 input에 넣음;
			$code.val($.trim($this.prev("input[name='___code']").val())||""); // 코드 값 넣음;
		});		
		
		// 삭제 버튼 클릭시 이벤트
		$del.click(function(){
			if(!window.confirm(lang.mbrcfgConfirmLimitNick)) return false;
			
			$this = $(this);
			$act.val("adminLimitNickDlt");
			
			$code.val($.trim($this.parent().find("input[name='___code']").val()));	
			
			document.form_type.submit();
		});
	}
	
	// 필명 - 등록, 수정 submit
	,limitNickSubmit:function(mode)
	{
		var $field = $("#limit_nick_text")
		, $a = $("a.limit_nick_title")
		, $code = $("input[name='code']");
		var $text = $.trim($field.val());
		
		if($text=="")
		{
			alert(lang.mbrcfgRequireLimitNickField);
			$field.focus();
			return false;			
		}
		
		// 아이디 모우기 - 속도 늦을경우 이부분 주석!
		var arr = [];
		$a.each(function(){
			arr.push($.trim($(this).text()));
		});
		
		if($.inArray($text, arr)>=0)
		{
			alert(lang.mbrcfgRequireLimitNickDupl);
			$field.focus();
			return false;
		}
		
		// 수정일때는 히든 코드값이 있나 확인.
		if(mode == "modify")
		{			
			if($code.val()=="")
			{
				alert(lang.mbrcfgRequireLimitNickCode);
				return false;
			}
		}else
			$code.val("");
		
		if(mode=="modify") document.form_type.submit();
		else return true;
	}
	
	/******************* 비밀번호찾기 등록 *************************************************/
	// 비번 수정 클릭
	,evtLimitPwdClicked:function()
	{
		var $field = $("#limit_pwd_text")
			, $a = $("a.limit_pwd_title")
			, $del = $("button.limit_pwd_btn_delete")
			, $act = $("input[name='act']")
			, $code = $("input[name='code']");
		
		// 아이디 클릭시 수정 이벤트
		$a.click(function(){
			$this = $(this);
			
			$field.val($.trim($this.text())||"").focus(); // 아이디 빼서 텍스트 input에 넣음;
			$code.val($.trim($this.prev("input[name='___code']").val())||""); // 코드 값 넣음;
		});		
		
		// 삭제 버튼 클릭시 이벤트
		$del.click(function(){
			if(!window.confirm(lang.mbrcfgConfirmLimitPwd)) return false;
			
			$this = $(this);
			$act.val("adminPwdHintDlt");
			
			$code.val($.trim($this.parent().find("input[name='___code']").val()));	
			
			document.form_type.submit();
		});
	}
	
	// 필명 - 등록, 수정 submit
	,limitPwdSubmit:function(mode)
	{
		var $field = $("#limit_pwd_text")
		, $a = $("a.limit_pwd_title")
		, $code = $("input[name='code']");
		var $text = $.trim($field.val());
		
		if($text=="")
		{
			alert(lang.mbrcfgRequireLimitPwdField);
			$field.focus();
			return false;			
		}
		
		// 아이디 모우기 - 속도 늦을경우 이부분 주석!
		var arr = [];
		$a.each(function(){
			arr.push($.trim($(this).text()));
		});
		
		if($.inArray($text, arr)>=0)
		{
			alert(lang.mbrcfgRequireLimitPwdDupl);
			$field.focus();
			return false;
		}
		
		// 수정일때는 히든 코드값이 있나 확인.
		if(mode == "modify")
		{			
			if($code.val()=="")
			{
				alert(lang.mbrcfgRequireLimitPwdCode);
				return false;
			}
		}else
			$code.val("");
		
		if(mode=="modify") document.form_type.submit();
		else return true;
	}
	
	/******************* 직업 등록 *************************************************/
	// 비번 수정 클릭
	,evtLimitJobClicked:function()
	{
		var $field = $("#limit_job_text")
			, $a = $("a.limit_job_title")
			, $del = $("button.limit_job_btn_delete")
			, $act = $("input[name='act']")
			, $code = $("input[name='code']");
		
		// 아이디 클릭시 수정 이벤트
		$a.click(function(){
			$this = $(this);
			
			$field.val($.trim($this.text())||"").focus(); // 아이디 빼서 텍스트 input에 넣음;
			$code.val($.trim($this.prev("input[name='___code']").val())||""); // 코드 값 넣음;
		});		
		
		// 삭제 버튼 클릭시 이벤트
		$del.click(function(){
			if(!window.confirm(lang.mbrcfgConfirmLimitJob)) return false;
			
			$this = $(this);
			$act.val("adminJobKindDlt");
			
			$code.val($.trim($this.parent().find("input[name='___code']").val()));	
			
			document.form_type.submit();
		});
	}
	
	// 필명 - 등록, 수정 submit
	,limitJobSubmit:function(mode)
	{
		var $field = $("#limit_job_text")
		, $a = $("a.limit_job_title")
		, $code = $("input[name='code']");
		var $text = $.trim($field.val());
		
		if($text=="")
		{
			alert(lang.mbrcfgRequireLimitJobField);
			$field.focus();
			return false;			
		}
		
		// 아이디 모우기 - 속도 늦을경우 이부분 주석!
		var arr = [];
		$a.each(function(){
			arr.push($.trim($(this).text()));
		});
		
		if($.inArray($text, arr)>=0)
		{
			alert(lang.mbrcfgRequireLimitJobDupl);
			$field.focus();
			return false;
		}
		
		// 수정일때는 히든 코드값이 있나 확인.
		if(mode == "modify")
		{			
			if($code.val()=="")
			{
				alert(lang.mbrcfgRequireLimitJobCode);
				return false;
			}
		}else
			$code.val("");
		
		if(mode=="modify") document.form_type.submit();
		else return true;
	}
	
	/******************* 필자 등록 *************************************************/
	// 비번 수정 클릭
	,evtWriterClicked:function()
	{
		var $field = $("#writer_text")
			, $a = $("a.writer_title")
			, $del = $("button.writer_btn_delete")
			, $act = $("input[name='act']")
			, $code = $("input[name='code']");
		
		// 아이디 클릭시 수정 이벤트
		$a.click(function(){
			$this = $(this);
			
			$field.val($.trim($this.text())||"").focus(); // 아이디 빼서 텍스트 input에 넣음;
			$code.val($.trim($this.prev("input[name='___code']").val())||""); // 코드 값 넣음;
		});		
		
		// 삭제 버튼 클릭시 이벤트
		$del.click(function(){
			if(!window.confirm(lang.mbrcfgConfirmWriter)) return false;
			
			$this = $(this);
			$act.val("adminWriterDlt");
			
			$code.val($.trim($this.parent().find("input[name='___code']").val()));	
			
			document.form_type.submit();
		});
	}
	
	// 필명 - 등록, 수정 submit
	,writerSubmit:function(mode)
	{
		var $field = $("#writer_text")
		, $a = $("a.writer_title")
		, $code = $("input[name='code']");
		var $text = $.trim($field.val());
		
		if($text=="")
		{
			alert(lang.mbrcfgRequireWriterField);
			$field.focus();
			return false;			
		}
		
		// 아이디 모우기 - 속도 늦을경우 이부분 주석!
		var arr = [];
		$a.each(function(){
			arr.push($.trim($(this).text()));
		});
		
		if($.inArray($text, arr)>=0)
		{
			alert(lang.mbrcfgRequireWriterDupl);
			$field.focus();
			return false;
		}
		
		// 수정일때는 히든 코드값이 있나 확인.
		if(mode == "modify")
		{			
			if($code.val()=="")
			{
				alert(lang.mbrcfgRequireWriterCode);
				return false;
			}
		}else
			$code.val("");
		
		if(mode=="modify") document.form_type.submit();
		else return true;
	}
	
	/** 
	 * drag sort event
	 * params : target id, drop function(save sort number for ajax) 
	 */
	,evtSort:function(id)
	{
		if(!id) return ;
		var mode = {
							"#pwd_sort":"axAdminPwdSort"
							,"#job_sort":"axAdminJobSort"
							,"#writer_sort":"axAdminWriterSort"
							};// 어떤걸 전송할지...
					
		$(id).sortable({
			axis:"y",
			placeholder: "ui-state-highlight",
			start:function(evt, ui){				
				memberCfg.startIndex = parseInt($(ui.item.context).index(), 10);
			},
			update:function(evt, ui){
				var $endIndex = parseInt($(ui.item.context).index(), 10);
				var $currentCode = $(ui.item.context).find("input[name='___code']").val();
				
				// 순위교체
				if(memberCfg.startIndex >=0 && $endIndex >= 0 && memberCfg.startIndex!=$endIndex)
				{	
					$.post(	"/?dummy=memberCfg-axAdminPwdSort"
								,{mod:"memberCfg", act:mode[id]||"axAdminPwdSort", currentCode:$currentCode, startIndex:memberCfg.startIndex, endIndex:$endIndex}
								,function(data, rst)
								{									
									if(rst=="success")
									{
										try{
											if(data.result == "error") 
												alert(decodeURIComponent(data.msg));
										}catch(e){
											alert(e.message);
										}
									}else alert(lang.networkError);
								},"json");
				}				
			}
		});
		//$(id).disableSelection();
	}
};


/*****************************************************************************
회원가입폼
*****************************************************************************/
var member={
	// 가입인가, 수정인가 (join, update)
	mode: "join"
	
	// 프로파일 이미지
	, profileImage : null
		
	// 중복체크했나 객체
	,duplication:{
		id:false,
		nick:false,
		tel:false
	}
	
	// 비밀번호 비교 - 비밀번호, 비밀번호 확인
	,comparePasswords:function(pwd, pwd2)
	{
		if(!pwd || !pwd) return false;
		
		var obj1 = $(pwd), obj2 = $(pwd2);
		if(obj1.val()=="" || obj2.val()=="")
		{
			alert("["+lang.required+"] "+lang.password);
			if(obj1.val()=="") obj1.focus();
			else if(obj2.val()=="") obj2.focus();
			return false;
		}
		
		if(obj1.val()!=obj2.val())
		{
			alert(lang.mbrRequireDifferentPassword);
			obj1.focus();
			return false;
		}
		return true;
	}

	/* 아이디중복체크
	 * 이벤트 걸 버튼 id, 가지고갈 input, id중복(btn_dupl) or 필명중복(btn_nick_dupl) or 연락처중복(btn_tel_dupl) 
	 */
	,evtDuplicate:function(buttonId, target, mode)
	{
		if(!buttonId || !target || !mode) return;
		
		var $button = $(buttonId)
			, $target = $(target)
			, paramsArr = {"id":["axCheckDuplId","user_id","mbrAxSuccessId"], "nick":["axCheckDuplNick","user_nickname","mbrAxSuccessNick"]}; //  mode에따른 파라미터, 객체명 (act, 확인할 아이디 또는 필명, 확인후 메시지)
	
		// add event listener!
		$button.click(function(){
				value = $target.val();
				if(value)
				{	
					var params = {mod:"member", act:paramsArr[mode][0]};
					params[paramsArr[mode][1]] = value;
					if(paramsArr[mode][0]=="axCheckDuplNick") 
					{
						params['user_id'] = $("#user_id").val();
					}
					
					$.post( "/?dummy=member-"+paramsArr[mode][0]
								, params
								, function(data, rst)
								{
									try{
										if(data.result == "success")
										{
											alert(lang[paramsArr[mode][2]]);
											member.duplication[(mode=="id"?"id":"nick")] = true;

											return false;
										}else{
											alert(decodeURIComponent(data.msg));
											$target.val("").focus();
										}
									}catch(e){
										alert(lang.axError);
									}
								},"json"	);						
				}else{
					alert((mode=="id"?lang.loginNotId:lang.mbrRequireNick));
					$target.focus();
					return false;
				}
				delete value;
			});			
	}
	
	// 중복검사 했나?
	,duplicationExecute:function()
	{
		if($("#user_id").val()!="" && this.duplication.id===false)
		{
			alert(lang.mbrRequireDuplId);
			$("#btn_dupl").focus();
			return false;
		}
		
		if(document.getElementById("user_nickname"))
		{		
			if($("#user_nickname").val()!="" && this.duplication.nick===false)
			{
				alert(lang.mbrRequireDuplNick);
				$("#btn_nick_dupl").focus();
				return false;
			}
		}
		
		/*
		if (this.duplication.nick===false)
		{
			alert(lang.mbrRequireDuplTel);
			$("#btn_tel_dupl").focus();
			return false;
		}
		*/

		return true;
	}
	
	// 비밀번호 변경
	,evtSubmitChangePwd:function()
	{
		var form = document.change_pwd_form;
		
		if(form.current_password.value=="")
		{
			alert(lang.mbrRequireCurrentPwd);
			form.current_password.focus();
			return false;
		}
		
		if(form.user_pw.value=="")
		{
			alert(lang.mbrRequireChangePwd1);
			form.user_pw.focus();
			return false;
		}
		
		if(!util.validMixNumCharLoUp(form.user_pw.value)){
			alert(lang.validRequirePasswordMixRegexp);
			form.user_pw.focus();
			return false;
		}
		
		if(form.user_pw_check.value=="")
		{
			alert(lang.mbrRequireChangePwd2);
			form.user_pw_check.focus();
			return false;
		}
		
		if(form.user_pw.value!==form.user_pw_check.value)
		{
			alert(lang.mbrRequireNoSamePwd);
			form.user_pw.focus();
			return false;
		}
		
		return ;
	}
	
	// 비밀번호 초기화
	,evtResetPwd:function(target)
	{
		$(target).click(function(){				
			if(!window.confirm(lang.mbrConfirmResetPwd)) return false;
			var userId = document.getElementById("user_id").value;
			if(!userId) return false;
			
			location.href="/?mod=member&act=adminPasswordReset&user_id="+userId;
		});
	}
	
	// 회원삭제
	,evtDeleteMemebr:function()
	{
		$(".btn_mbr_delete").click(function(){
			return window.confirm(lang.mbrConfirmDelete);
		});
	}
	
	// 우편번호 submit
	,submitZip:function()
	{
		var $searchWord = $("#search_word");
		
		if($.trim($searchWord.val()).length<=1)
		{
			alert(lang.zipRequireWord);
			$searchWord.focus();
			return false;
		}
		return true;
	}
	
	/* 우편번호 검색
	 * params  
	 * 	id : 버튼 id,  
	 * 	zipcod1,2 우편번호필드 id
	 * 	address1 주소필드 id
	 */
	,evtZipcodeOpen:function(id, zipcode1, zipcode2, address1)
	{
		var $button = $(id);
		
		// click event
		$button.click(function(){
			var zipcodeWin = window.open("/?mod=member&act=zipcodeForm&targetZipcode1="+zipcode1+"&targetZipcode2="+zipcode2+"&targetAddress1="+address1,"zipcode","width=600,height=310,scrollbars=yes");
			zipcodeWin.focus();
		});		
	}

	/**
	 * 다음 우편번호 API 검색 
	 * @desc 시사인 추가 
	 */ 
	,evtZipcodeOpenDaum:function(id, zipcode1, zipcode2, address1, address2)
	{
		 new daum.Postcode({
							oncomplete: function(data) {
							// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

							// 각 주소의 노출 규칙에 따라 주소를 조합한다.
							// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
							var fullAddr = ''; // 최종 주소 변수
							var extraAddr = ''; // 조합형 주소 변수

							// 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
							// 사용자가 도로 주소를 선명택했을 경우
							if (data.userSelectedType === 'R') { 
								fullAddr = data.roadAddress;
							} 
							// 사용자가 지번 주소를 선택했을 경우(J)
							else 
							{ 
								//fullAddr = data.jibunAddress;
								fullAddr = data.roadAddress;
							}

							// 사용자가 선택한 주소가 도로명 타입일때 조합한다.	=> 지번으로 입력해도 도로명으로 등록되기 때문에 조건 주석처리.
							//if(data.userSelectedType === 'R'){
							//법정동명이 있을 경우 추가한다.
							if (data.bname !== ''){
								extraAddr += data.bname;
							}
							// 건물명이 있을 경우 추가한다.
							if (data.buildingName !== ''){
								extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
							}
							// 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
							fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
							//}

							// 우편번호와 주소 정보를 해당 필드에 넣는다.
							$("#"+zipcode1).val(data.zonecode);
							$("#"+address1).val(fullAddr);

							// 커서를 상세주소 필드로 이동한다.
							if (address2)
							{
								$("#"+address2).focus();

							}
							//document.getElementById("addr2").readOnly = false;
							//document.getElementById("addr2").focus();
						}
						}).open();
	}
	
	// 우편번호 검색 결과값 클릭시 input field에 넣음
	,evtInputZipCodeResult:function()
	{
		$(".zip_address").click(function()
		{
			var $this = $(this);
			
			// input 객체빼오기 (id)
			var $objZip1 = $("#"+$("input[type='hidden'][name='targetZipcode1']").val(), window.opener.document)||null
				, $objZip2 = $("#"+$("input[type='hidden'][name='targetZipcode2']").val(), window.opener.document)||null
				, $objAddress1 = $("#"+$("input[type='hidden'][name='targetAddress1']").val(), window.opener.document)||null; //window.opener.$(~~~~) 해도됨.
			
			if($objZip1==null || $objZip2==null || $objAddress1==null) return ;
											
			// 주소빼오기
			var address = $this.text().replace(/(\s\(.*\))$/ig,"")+" "
				, zipcode = $this.prev("span").text().replace(/(\[|\])/gi,"").split("-")||["",""];
			var zipcode1=zipcode[0], zipcode2=zipcode[1];
			
			// input to opener obj 
			$objZip1.val(zipcode1);
			$objZip2.val(zipcode2);
			$objAddress1.val(address).focus();
			
			window.close();				
		});
	}
	
	// 약관이동
	,submitTerm:function()
	{
		var $obj=$("#agree_check");
		if($obj.prop("checked")===false)
		{
			alert(lang.mbrRequireAgreeCheck);
			$obj.focus();
			return false;
		}
		return true;
	}
	
	// 주민번호 인증
	,submitJumin:function()
	{
		// 폼 검사 및 전송		
		var validate = new formValidate();
		// 검사할 요소 정리
		var validateTerm =	[						
								{name:"jp_name",msg:lang.mbrRequireName, kind:"blank"},
								{name:"jp_jnum[]",msg:lang.mbrRequireJumin, kind:"identify"}
							];

		// argument 가 있다면,
		if(arguments.length>0)
		{
			if(arguments[0] instanceof Object)
			{
				validateTerm.push(arguments[0]);
			}
		}

		if (validate.setVariables("jumin_form", validateTerm)===true)
		{					
			//실시간 체크
			$(validate.tags).bind("focusin keydown keyup", 
											function(evt)
											{
												validate.clickedBtn=false;
												validate.checkedSameElement(evt.currentTarget||window.event.srcElement);
											});

			//check before form submit
			$("#jumin_form").bind("submit", 
											function()
											{
												validate.clickedBtn=true;												
												//return validate.checked(); 
												
												if(validate.checked()===true)
												{
													var popWindow = window.open("", "popupJUMIN", "width=450, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no");
													if(!popWindow)
													{
														alert(lang.mbrRequirePopupWindow);
														return false;
													}
													return true;
													
												}else return false;
											});
		}
		
	}
	
	// ipin 인증 - 팝업띄움 - jp_user_id2 값은 비밀번호 찾기시에만 필요하기 때문에 if~else 문 처리하였습니다. - 이정연 수정 
	,submitIpin:function()
	{
		var $paramR1 = $("input[type='hidden'][name='param_r1']");
		if ($paramR1.val() == "helpPw") 
		{
			if ($("#jp_user_id2"))
			{
				if($.trim($("#jp_user_id2").val())=="")
				{
					alert(lang.loginNotId);
					$("#jp_user_id2").focus();
					return false;
				}
			}
		}
		
		var popWindow = window.open("", "popupIPIN", "width=450, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no");
		if(!popWindow)
		{
			alert(lang.mbrRequirePopupWindow);
			return false;
		}
		
		return true;
	}
	
	// 이메일 인증
	,submitEmail:function()
	{
		// 폼 검사 및 전송		
		var validate = new formValidate();
		// 검사할 요소 정리
		var validateTerm =	[						
								{name:"user_name",msg:lang.mbrRequireName, kind:"blank"},
								{name:"user_email", kind:"email"}
							];

		// argument 가 있다면,
		if(arguments.length>0)
		{
			if(arguments[0] instanceof Object)
			{
				validateTerm.push(arguments[0]);
			}
		}

		if (validate.setVariables("email_form", validateTerm)===true)
		{					
			//실시간 체크
			$(validate.tags).bind("focusin keydown keyup", 
											function(evt)
											{
												validate.clickedBtn=false;
												validate.checkedSameElement(evt.currentTarget||window.event.srcElement);
											});

			//check before form submit
			$("#email_form").bind("submit", 
											function()
											{
												validate.clickedBtn=true;												
												return validate.checked();
											});
		}
		
	}
	
	// 비밀번호 힌트로 찾기
	,submitFindPwHint:function()
	{
		if($.trim($("#passwd_response").val())=="")
		{
			alert(lang.mbrRequireFindPwHint);
			$("#passwd_response").focus();
			return false;
		}
					
		return true;
	}
	
	// 비밀번호 확인
	,submitConfirmPwd:function(form)
	{
		if(!form.current_password.value)
		{
			alert(lang.loginNotPw);
			form.current_password.focus();
			return false;
		}
					
		return true;
	}
	
	// 프로파일 사진 미리보기
	,evtPreviewProfilePhoto:function($target)
	{
		$target.on({
					mouseenter:function(){
						// 미리정의된 변수에 이미지 저장
						//if(member.profileImage==null)
						//{
							if(member.profileImage) member.profileImage.remove(); 	// 수정된 사진이 캐싱된 이미지 때문에 안보일때 있어 갱신함
							var $this = $(this)
								, $pos = $this.position()
								, top = $pos.top+20
								, left = $pos.left
								, imgUrl = $target.prev("#profile_url").val();//.replace(/\.(jpeg|jpg|png|gif)$/i, ".jpg")||"";
							
							member.profileImage = $('<img src="'+imgUrl+'?'+Math.random()+'" />').css({"position":"absolute","max-width":"500px","top":top,"left":left,"border":"3px dashed #ccc"})
																	.error(function(){
																		this.style.display="none";
																		alert(lang.mbrConfirmErrorProfilePhoto);
																	});
							$("body").append(member.profileImage);
						//}else{
							// 정의된 변수에 이미지가 저장되어 있다면 재로딩 하지 말고 보이기만 하게.
						//	member.profileImage.show();
						//}					
					}
					,mouseleave:function(){
						member.profileImage.hide();
					}
				});		
	}
	
	/**
	 * 회원아이디 찾기
	 * @param : callback - 다른 곳에서 사용할수 있도록 callback 함수로 아이디 선택했을때 이벤트 지정
	 */
	,evtFindIdByOpen:function(callback)
	{
		if(!window.open("/?mod=member&act=adminMemberSearch&callback="+callback, "findId", "width=750,height=600,scrollbars=yes")) 
			return false;
	}
	
	/**
	 * 회원가입여부확인 
	 */ 
	,submitDuplJoinCheck:function(form)
	{
		var userNameVal = form.user_name.value,
			userEmailVal = form.user_email.value; 

		if (!userNameVal.replace(' ', ''))
		{
			alert(lang.validRequireName);
			form.user_name.focus();
			return false;
		}

		if (!userEmailVal.replace(' ', ''))
		{
			alert(lang.validRequireEmail);
			form.user_email.focus();
			return false; 
		}

		return true;
	}	

	/* 연락처 중복체크
	 * 이벤트 걸 버튼 id, 가지고갈 input, 중복(btn_tel_dupl)
	 */
	,evtDuplicateTel:function(buttonId, target)
	{
		if(!buttonId || !target) return;
		
		var $button = $(buttonId)
			, $target = ""; 
	
		// add event listener!
		$button.click(function(){
				value = "";
				if (target.indexOf("[") != "-1") 
				{
					var objID = tmp_val = "";

					// 입력값 확인 
					$('[name^="'+target+'"]').each(function(i){
						objID = $(this).attr("id");
						if (!$("#"+objID).val())
						{
							alert("연락처를 입력해주세요.");
							value = "";
							return false;
						}
						value += (!value) ? $("#"+objID).val() : "-" + $("#"+objID).val();
					});
				}
				else
				{
					$target = $(target);
					value = $target.val();
					if (!value)
					{
						alert("연락처를 입력해주세요.");
						return false;
					}
				}

				if (value)
				{
					var params = {mod:"member", act:"axCheckDuplTel"};
					params['tel'] = value;
						
					$.post( "/?dummy=member-axCheckDuplTel"
								, params
								, function(data, rst)
								{
									try{
										if(data.result == "success")
										{
											alert('사용 가능한 연락처 입니다.');
											member.duplication['tel'] = true;
											return false;
										}else{
											alert(decodeURIComponent(data.msg));
											//$target.val("").focus();
										}
									}catch(e){
										alert(lang.axError);
									}
								},"json");
				}
				delete value;
			});
	}

	/* 구독자 인증 
	 * 필요 파라미터 - 
	 */
	,evtSubsribePopup:function(member_mode)
	{
		var $button = $(".btn_offline_client_code"),
			$user_id = $("#user_id").val(),
			$type = "";
	
		// add event listener!
		$button.click(function(){
			$type = (member_mode == "update") ? "member" : "newmember";
			$user_id = ($user_id && $user_id != "undefined") ? $user_id : "";
			var subscribeAuthWin = window.open(SSL_DOMAIN + "/?mod=subscribe&act=authCrtForm&type=" + $type + "&user_id=" + $user_id, "subscribeAuthWin", "width=600,height=450,scrollbars=yes")
			if(!subscribeAuthWin) 
				return false;
		
			subscribeAuthWin.focus();
		});
	}

	/**
	 * 구독지주소 데이터 업데이트 
	 */
	,rcvAddressFormSubmit:function(form)
	{
		if (!form.offline_client_code.value)
		{
			alert("구독 번호를 입력 해주세요.");
			form.offline_client_code.focus();
			return false; 
		}

		if (!form.rcv_zipcode.value)
		{
			alert("구독지 우편번호를 입력해주세요");
			form.rcv_zipcode.focus();
			return false;
		}

		if (!form.rcv_address1.value)
		{
			alert("구독지 주소를 입력해주세요");
			form.rcv_address1.focus();
			return false; 
		}

		if (!form.rcv_address2.value)
		{
			alert("구독지 상세주소를 입력해주세요");
			form.rcv_address2.focus();
			return false;
		}

		return true;
	}

	// 이메일 인증 - New 
	,submitEmailNew:function()
	{
		// 폼 검사 및 전송		
		var validate = new formValidate();
		// 검사할 요소 정리
		var validateTerm =	[
								{name:"identify_email", kind:"blank", msg:"이름, 이메일 또는 전화번호를 입력해주세요."}
							];

		// argument 가 있다면,
		if(arguments.length>0)
		{
			if(arguments[0] instanceof Object)
			{
				validateTerm.push(arguments[0]);
			}
		}

		if (validate.setVariables("email_form", validateTerm)===true)
		{					
			//실시간 체크
			$(validate.tags).bind("focusin keydown keyup", 
											function(evt)
											{
												validate.clickedBtn=false;
												validate.checkedSameElement(evt.currentTarget||window.event.srcElement);
											});

			//check before form submit
			$("#email_form").bind("submit", 
											function()
											{
												validate.clickedBtn=true;
												return validate.checked();
											});
		}
		
	}

	// 휴면회원리스트 선택/해제
	,evtQuiescenceListCheck:function()
	{
		// 전체선택
		$("#cfg_bbs_all_check").on("click", function() {
			var $check = $(this).prop("checked");
			$('input[name="chk_userid[]"]').each(function() {
				if ($check==true) {
					if ($(this).prop("checked") == false) $(this).click();
				} else {
					if ($(this).prop("checked") == true) $(this).click();
				}  
			});
		});	
	}
	
	// 개별 휴면 복구/삭제 처리 
	,updateQuiescence:function()
	{
		$(".mbr_manage_box").on('click', '[data-control="btn_quiesc_repair"], [data-control="btn_quiesc_delete"]', function() {
			var $ctrl = $(this).attr("data-control"),
				parents = $(this).closest('tr'),
				userid = parents.find('input[name="chk_userid[]"]').val(),
				params = "";
				
			if ($ctrl == 'btn_quiesc_repair') {
				if (!confirm(lang.mbrConfirmQuiescRepair)) return false;
				params = {mod:"member", act:"adminQuiescenceRepair", chk_userid:userid, return_type:"ax"};
			} else if ($ctrl == 'btn_quiesc_delete') { 
				if (!confirm(lang.mbrConfirmQuiescDelete)) return false;
				params = {mod:"member", act:"adminQuiescenceDlt", chk_userid:userid, return_type:"ax"};				
			}
			
			$.post(	"/?dummy=member-" + params.act
					,params 
					,function(data, rst) {									
						if(rst=="success") {
							try{
								if(data.result == "error") alert(decodeURIComponent(data.msg));
								else location.reload();
							}catch(e){
								alert(e.message);
							}
						}else alert(lang.networkError);
					},"json");				
		});
	}
	
	// 선택 휴면 복구/삭제 처리 
	,submitQuiescence:function()
	{
		$("#btn_select_repair, #btn_select_delete").on('click', function() {
			var $id = $(this).attr("id"), 
				cnt = 0,
				form = document.sleep_list_form; 
			
			$('input[name="chk_userid[]"]').each(function() {
				if ($(this).prop("checked") == true) cnt++; 
			});
			
			if (cnt <= 0) {
				alert(lang.mbrSelectQuiescCount);
				return false; 
			}
			
			if ($id == 'btn_select_repair') {
				if (!confirm(lang.mbrConfirmQuiescRepair)) return false; 
				form.action = "/?dummy=member-adminQuiescenceRepair";
				form.mod.value = "member";
				form.act.value = "adminQuiescenceRepair";		
			}else if ($id == 'btn_select_delete') {
				if (!confirm(lang.mbrConfirmQuiescDelete)) return false; 
				form.action = "/?dummy=member-adminQuiescenceDlt";
				form.mod.value = "member";
				form.act.value = "adminQuiescenceDlt";				
			}
			
			form.submit();										
		});
	}	

	// 회원 정보 로그 보기 
	,memberActivityLogView:function() 
	{
		var $user_id = $("#user_id").val();
		$(".btn_member_activity_log").on("click", function(){
			var href = '/?mod=member&act=adminActivityLog&user_id=' + $user_id
				,width = 800
				,height = 600
				,parents = editSortable
				,html = parents.replaceLayerHtmlTag(parents.vars.layerBoxIframe, lang.close, href, (height-60))
				,output = "";
				
			output = $(html).find(".edit_layer_close").click(parents.closeEditLayer).end();
			util.floatLayer(width,height,output);	// layer 띄우기
				
			return false;
		});
	}	
};


/*****************************************************************************
뉴스설정 (articleCfg)
*****************************************************************************/
var articleCfg={
	// 변수
	vars:{
		$dropElements : []							// drop될 하위 섹션 담음 
		,$bigserialTarget : null					// 맨 하단의 연재를 담아둠
		,moveLimit : 4								// 카테고리 depth 가 4초과한다면 이동이 안됨 
		,appendHtmlDragLi:function(parentCode, code, depth, name){
			var visible = depth>=articleCfg.vars.moveLimit?' style="display:none"':''	// depth 이하일때만, 추가버튼 생기게
				,html='<li class="arlcfg_depth_'+depth+' arlcfg_dragable" data-depth="'+depth+'" data-parent="'+parentCode+'" data-code="'+code+'" style="position: relative;">'
					+'	<span class="arlcfg_section_subject">'+name+'</span>'
					+'	<span class="arlcfg_section_btns">'
					+'		<a href="/?mod=configuration&act=articleSectionUptForm&code='+code+'" class="btn_com btn_com_0_739 arlcfg_btn_modify" title="'+lang.modify+'" target="_blank"></a>'
					+'		<a href="/?mod=configuration&act=articleSectionDlt&code='+code+'" class="btn_com btn_com_35_739 arlcfg_btn_delete" title="'+lang.delte+'"></a>'
					+'		<a href="/?mod=configuration&act=articleSectionCrtForm&code='+code+'" class="btn_com btn_com_17_739 arlcfg_btn_add" title="'+lang.add+'" target="_blank"'+visible+'></a>'
					+'		<a href="/?mod=configuration&act=articleSectionEpt&code='+code+'" class="link_blue c_tooltip arlcfg_btn_txt arlcfg_btn_empty" title="'+lang.cfgArticleSectionEmptyEx+'" target="_blank">'+lang.cfgArticleSectionEmpty+'</a>'
					+'	</span>'
					+'</li>';
					//+articleCfg.vars.appendHtmlDropLi;//.replace("arlcfg_dragable","arlcfg_dragable ui-droppable"); // 빈 li 추가
			
			return html;
		}
		,appendHtmlDropLi : '<li class="arlcfg_drop_place arlcfg_dragable" />'				// 빈 drop용 lin
		,watermark:{
			max:3																			// watermark 허용 갯수
			,count:0																		// 현재 업로드된 갯수
		}
	}
		
	// 섹션 sort시 임시변수
	,sectionSort:{
		depth:0
		,parent:0
		,code:""
		,order:0		
		,startIndex:0 // 현재 집은 객체의 순번
	}

	// 권한 등록 폼
	,evtPermissionCheckbox:function()
	{
		$(".arlcfg_checkbox input[type='checkbox']").click(function(){
			var $this = $(this)
				, $checked = $this.prop("checked")
				, $name = $(this).prop("name")||$(this).attr("name");
			
			// 상위 카테고리를 체크했다면,
			if($name=="arl_per[]" || $name=="rpl_per[]" || $name=="search_per[]") 
				$this.parents("dt").next("dd").find("input[type='checkbox']").prop("checked", $checked);
			else	// 나머지 체크박스 클릭시,
				$this.parents("dd").prev("dt").find("input[type='checkbox']").prop("checked", !!parseInt($this.parents("dd").find("input[type='checkbox']:checked").size(),10)); // 체크된 갯수가 0->false, 1이상이면->true로 변환
		});
	}
	
	// 섹션 추가/수정
	,submitAddSection:function(obj)
	{
		var form = document.section_form;
		/*
		if(form.depthLine.value != "1")
		{
			if(form.parent.value == "")
			{
				alert(lang.cfgSectionEmptyParentCode);
				return false;
			}
		}
		*/
		if(form.arlcfg_section_name.value=="")
		{
			alert(lang.cfgSectionEmptyName);
			form.arlcfg_section_name.focus();
			return false;
		}
		return true;
	}
	
	// 편집꾸밈판에 사용 / 미사용
	,sectionWriteFormUseSection:function()
	{
		var section = document.section_form.use_section
			,$section = $(section)
			,value = $section.filter(":checked").val()
			,$selectBars = $("#arlcfg_use_section_layout, #arlcfg_theme_skin, #arlcfg_theme_m_skin");
		
		$selectBars.prop("disabled", (value === "N"));
		
		// when click
		$section.click(function(){
			$selectBars.prop("disabled", (this.value === "N"));
		});
	}
	
	/** 
	 * 2016.07.02 drag로 섹션 이동 방법 변경 -> 찍어서 이동하게 변경
	 * 
	 * 드래그로 순위 바꿈
	 * 
	 * ::: 규칙 ::: 
	 * 섹션명 글자 drop은 하위카테고리,
	 * 섹션명 글자 아래 빈 li는 같은 depth 로 drop된다. 
	 * 
	 *		
	 */
	,evtSort:function(id)
	{		
		//---------------------------------- s function -------------------------------------------//
		// 색깔변화
		function changeColor($target, mode, drop){
			var depth = $target.prev("li").attr("data-depth")||""
				, depthClassName = "arlcfg_blank_depth_"+depth||""
				, _$target = $target.find(".arlcfg_section_subject");
			
			if(mode=="no"){
				if(drop == "blank") $target.removeClass(depthClassName+" arlcfg_blank_over");
				else _$target.css("color","");				
			}else{
				if(drop == "blank") $target.addClass(depthClassName+" arlcfg_blank_over");
				else _$target.css("color","red");
			}
		}
				
		// 하위 섹션 엘리먼트까지 찾아서 반환
		function makeSubSectionElement($current, $appendCurrent)
		{
			var arrSize = articleCfg.vars.$dropElements.length;
    		if(arrSize>0){
    			var _sCode = $(articleCfg.vars.$dropElements[arrSize-1][0]).attr("data-code")   		
    				, $_untilElement = $current.next().nextUntil($current.nextAll("li[data-code='"+_sCode+"']").next().next()); // 가장 서브인 카테고리까지 담아둠  	
    	
    			return $appendCurrent.add($_untilElement);
    		}
    		return $appendCurrent;
		}
		
		// 옮겨놓을 객체가 자신의 하위 객체인지 판단 - true : 자신의 객체, false : 자신외 객체(옮겨놓아도 됨)
		function isFamilyElement($target, $appendCurrent)
		{
			var _size = $appendCurrent.size();
    		if(_size>0)
    		{
    			var _$start = $($appendCurrent[0]).index()
    				, _$end = $($appendCurrent[_size-1]).index()
    				, _$target = $target.index();
    		
    			return (_$start <= _$target && _$end >= _$target);
    		}
		}
		
		// depth가 그 이상 될때는 이동되지 않음
		function isAllowDepth($moveTarget, depthInterval, limit)
		{
			var sum = 0;
			$moveTarget.each(function(idx, ele){
				var $ele = $(ele)
					, depth = parseInt($ele.attr("data-depth"),10) 
					, depthSum = depth + depthInterval;
				
				if(depthSum > limit) {
					sum++;
					return false;
				}
			});	 
			
			return sum===0 ? true : false;
		}
		
		// 하위가 있는 카테고리와 같은 depth에 넣지 못하도록
		function isSubSection($target)
		{
    		if($target.hasClass("arlcfg_drop_place")){
    			return ($target.prev("li").attr("data-code") == $target.next("li").attr("data-parent")) ? false : true;
    		}
    		return true;
		}
		//---------------------------------- e function -------------------------------------------//
        
		var $id = $(id)
			,appendHtmlLi = this.vars.appendHtmlDropLi;											
		
		$id.children("li.arlcfg_dragable").not(".ui-droppable")										// 새로 추가되는 엘리먼트만 draggable 이벤트를 주기위해 filter
        .draggable({
        	//	axis:"y"
        	revert: "invalid"
        	,opacity:.5
        	,zIndex:1
        	,create:function(event, ui){
        		var $this = $(this);
        		$this.after(appendHtmlLi);
        	}
        	,start:function(){
        		articleCfg.releaseSelected($id);													// 선택된거 해제
        	}

        	,disabled:true		// 드래그 되게 하려면 주석함 or false
        })
        .end()	
        .end().children("li.arlcfg_droppable:not(:has(+.ui-droppable))").after(appendHtmlLi); 		// 루트에서 올려놓게 하기 위해서 하나더 빈공간 만듦. (not(:has(+~~~))는 다음 엘리먼트에 이미 추가가 되어 있다면 appendHtmlLi를 추가하지 않음.
		 
		
		// chain 했더만 어디서 에러가 나는지 연속해서 찾지를 못함. 그래서 분리함;
		$id.children("li.arlcfg_dragable, li.arlcfg_droppable")										// drop 할 객체		
        .droppable({
        	activate:function(event, ui){}
	    	,deactivate:function(event, ui){}
        	,create:function(event, ui){}
        	
        	// 마우스 drag 오버시
    		,over:function(event, ui)
	    	{
	    		var $target = $(event.target)
    				, $current = ui.helper
    				, $appendCurrent = $current.add($current.next("li"));  ;

    			// 상위 카테고리에서 자기의 하위 카테고리로르는 못 들어가게
	    		articleCfg.vars.$dropElements = [];			//초기화 
	    		articleCfg.getSubSectionElement($current, $current.attr("data-code")||"");
        		$appendCurrent = makeSubSectionElement($current, $appendCurrent);
        		
        		if(isFamilyElement($target, $appendCurrent)===true) return ;						// true면 자기자신의 하위 객체이다
        		if(isSubSection($target) === false)	return ;										// 같은 depth로 들어갈때 하위 카테고리가 있는경우 못 들어가게
        		        		
	    		if($target.hasClass("arlcfg_drop_place")){
        			changeColor($target, "", "blank");
        		}else{
        			changeColor($target, "", "");
        		}
	    	}
        	,out:function(event, ui)
        	{       		
        		var $target = $(event.target)
    				, $current = ui.helper;
        		
        		if($target.hasClass("arlcfg_drop_place")){
        			changeColor($target, "no", "blank");
        		}else{
        			changeColor($target, "no", "");
        		}
        	}
        	,drop:function(event, ui)
        	{        		
        		var $target = $(event.target)
        			, $current = ui.helper;
        		
        		var pParent = $target.attr("data-parent")||$target.prev("li").attr("data-parent")
        			, pCode = $target.attr("data-code")||$target.prev("li").attr("data-code")
        			, pDepth = parseInt(($target.attr("data-depth")||$target.prev("li").attr("data-depth")), 10)
        			, cParent = $current.attr("data-parent")
        			, cCode = $current.attr("data-code")
        			, cDepth = parseInt($current.attr("data-depth"), 10)
        			, $appendCurrent = $current.css({"top":"","left":""}).add($current.next("li"))
        			, className = "arlcfg_depth_"
        			, depthInterval = (pDepth - cDepth)+1 + (($target.hasClass("arlcfg_drop_place")?-1:0))		// 하위 카테고리까지 depth계산하기 - 같은 depth일때는 한단계 줄여서		
        			, dropAct = "";																															// 떨어뜨릴때, 하위로 갈것인가? 같은 depth로 갈것인가
        			
        		try{
        			
            		changeColor($target, "no", ($target.hasClass("arlcfg_drop_place")?"blank":""));		 			// 해제
            	
            		// 전체섹션을 루트가 아니라면 하위 메뉴로 들어갈 수 없다.
            		var _isDropAllSection = true;
            		if(cCode=="2000000000"){
            			if(pDepth!="0" && pDepth!="1") _isDropAllSection = false;
            			else if(pDepth=="1"){
            				if(!$target.hasClass("arlcfg_drop_place")) _isDropAllSection = false;
            			}
            			if(!_isDropAllSection){
            				util.toast(lang.cfgSectionNotMoveAllToSub);
        					return ;
            			}
            		}
            		
	        		// 하위 카테고리 있음 찾음
        			articleCfg.vars.$dropElements = [];			//초기화 
        			articleCfg.getSubSectionElement($current, cCode);
	        		
	        		// 있다면, 하위 카테고리 가지고 drop
	        		$appendCurrent = makeSubSectionElement($current, $appendCurrent);	
	        		
	        		if(isFamilyElement($target, $appendCurrent)===true) return ;												// true면 자기자신의 하위 객체이다
	        		if(isSubSection($target) === false)	return ;																				// 같은 depth로 들어갈때 하위 카테고리가 있는경우 못 들어가게
	        		
	        		var $moveTarget = $appendCurrent.not(".arlcfg_drop_place");
	        		
	        		// depth가 어느정도 초과되면 이동이 안됨.(default : 4)
        			if(isAllowDepth($moveTarget, depthInterval, articleCfg.vars.moveLimit)===false){
        				util.toast(articleCfg.vars.moveLimit+" " + lang.cfgSectionNotMoveDepthOver);
        				return ;
        			}
        			
        			$current.attr("data-parent", ($target.hasClass("arlcfg_drop_place")?pParent:pCode));		// 선택한 것은 상위 카테리가 변경된다.
        			$moveTarget.each(function(idx, ele){
        				var $ele = $(ele)
        					, $addBtn = $ele.find(".arlcfg_btn_add")
        					, depth = parseInt($ele.attr("data-depth"),10) 
        					, depthSum = depth+ depthInterval	// 타겟depth - 선택depth + 1 하면 depth 간 간격차이가 나옴. 그걸 더해준다. - 영역은 바로위 객체와 같은 depth로 만들어진다 
        					, befClassName = className + depth
        					, chgClassName = className + depthSum;    	        		
        				$ele.removeClass(befClassName).addClass(chgClassName).attr({"data-depth":depthSum});
        				
        				if(depthSum < articleCfg.vars.moveLimit) $addBtn.show();
        				else $addBtn.hide();
        			});
        				        		
	        		if($target.hasClass("arlcfg_drop_place")){
	        			dropAct = "sameDepth";
	        			$target.after($appendCurrent);																				// 순위위주 바꿀때 빈 li에 넣음 - depth 는 바뀌지 않고, parent_code는 바뀔수도 있음 
	        		}else{
	        			dropAct = "subDepth";
	        			$target.next("li").after($appendCurrent);																// 하위 카테고리로 들어갈때, - depth, parent_code 모두 바뀜
	        		}
	        		
	        		//--- db 갱신 ajax
	        		articleCfg.updateData(	{
	        												 drop_act : dropAct
	        												,p_parent_code : pParent
	        												,p_code : pCode
	        												,p_depth : pDepth
	        												,c_parent_code : cParent
	        												,c_code : cCode
	        												,c_depth : cDepth
	        											});
	        		
        		}catch(e){util.logs(e.message);}        		
        	}
        	
        }).disableSelection();
	}	
	
	// database 갱신
	,updateData:function(data)
	{
		if(!data) return ;
		if(!(data instanceof Object)) return;
	
		data.mod = "configuration";
		data.act = "axArticleSectionSort";
		
		$.post( "/?dummy=configuration-axArticleSectionSort"
					,data
					,function(data, rst)
					{
						if(rst == "success"){
							if(data.result == "error") alert(decodeURIComponent(data.msg));
						}else alert(lang.axError);
					},"json");
	}
	
	// 루프 돌면서 가장 하위 카테고리 찾음
	,getSubSectionElement:function($current, sCode)
	{
		if(!sCode) return ;
		
		var $allSearch = $current.nextAll("li[data-parent='"+sCode+"']")
			, size = $allSearch.size()
			, $eleCurrent = $($allSearch[size-1]);        		
	
		if(size<=0) return ; 
		articleCfg.vars.$dropElements.push($eleCurrent);
		
		sCode = $eleCurrent.attr("data-code");
		articleCfg.getSubSectionElement($current, sCode); 		
	}
	
	// 인증 설정 radio check
	,checkedAuthType:function()
	{
		var $Y = $("#real_name_user_check_Y")
			, $N = $("#real_name_user_check_N")
			, checked="N";
		
		if($Y.prop("checked")===true){
			$(".real_name_box input").attr("disabled",false);
			checked="Y";
		}else if($N.prop("checked")===true){
			$(".real_name_box input").attr("disabled",true);
			checked="N";
		}
		
		return checked;
	}
	
	// 인증 설정 radio check - 클릭이벤트 
	, evtCheckedAuthType:function()
	{
		var $clicked = $("#real_name_user_check_Y, #real_name_user_check_N");
		
		$clicked.click(articleCfg.checkedAuthType);		
	}
	
	// 인증 설정
	,authTypeSubmit:function()
	{
		var $M = $("#use_mopas_M")
			,$C = $("#use_mopas_C")
			,$realName = $("#real_name_code")
			,$realTitle = $("#real_title")
			,$realSdate = $("#real_sdate")
			,$realEdate = $("#real_edate")
			,$realContent = $("#real_content");
			
		if(this.checkedAuthType()=="Y")
		{			
			if($M.prop("checked")===true)
			{				
				if($realName.val()=="")
				{
					alert(lang.cfgVoteRealNameRequireCode);
					$realName.focus();
					return false;
				}				
			}else if($C.prop("checked")===true){
				$realName.val(""); // 선택되어 있지 않다면, 빈값으로 날아가게...
			}
			
			if($("#real_name_user_check_Y").prop("checked")===true)
			{
				if($realTitle.val()=="")
				{
					alert(lang.cfgVoteRealNameRequireEtc);
					$realTitle.focus();
					return false;
				}
				
				if($realSdate.val()=="")
				{
					alert(lang.cfgVoteRealNameRequireEtc);
					$realSdate.focus();
					return false;
				}
				
				if($realEdate.val()=="")
				{
					alert(lang.cfgVoteRealNameRequireEtc);
					$realEdate.focus();
					return false;
				}
			}
		}else{
			$realName.add($realTitle).add($realSdate).add($realEdate).add($realEdate).add($realContent).val(""); // 선택되어 있지 않다면, 빈값으로 날아가게...
		}
		
		return true;
	}
	
	// 버튼 이벤트
	,evtButton:function()
	{
		// target button
		var clssModify = "arlcfg_btn_modify"
			,clssDelete = "arlcfg_btn_delete"
			,clssAdd = "arlcfg_btn_add"
			,clssEmpty = "arlcfg_btn_empty";
		
		var $sort = 
			$("#section_sort").on("click", "."+clssModify+", ."+clssDelete+", ."+clssAdd+", ."+clssEmpty,
										function(){
											var $this = $(this)
												,$parentBox = $this.closest(".arlcfg_dragable");
																
											if($this.hasClass(clssAdd)) articleCfg.sectionAdd($parentBox);						// 추가
											else if($this.hasClass(clssModify)) articleCfg.sectionModify($parentBox);			// 수정
											else if($this.hasClass(clssDelete)) articleCfg.sectionDelete($parentBox);			// 삭제
											else if($this.hasClass(clssEmpty)) articleCfg.sectionDelete($parentBox,"empty");	// 섹션비우기
											
											articleCfg.releaseSelected($sort);													// 선택된거 해제
											
											return false;											
										});
	}
	
	/*
	 * 현재 섹션의 객체 찾기
	 * @params 
	 * 	- code : 찾을 코드명
	 *  - target : 찾을 코드명의 타겟 - 현재 code ? , 부모 code ?
	 */ 
	,getCurrentObjFromCode:function(code, target)
	{
		return $("#section_sort").find("li["+target+"='"+code+"']");
	}
	
	// 고정연재 selector 담아둠
	,getbigSerial:function()
	{
		articleCfg.vars.$bigserialTarget = $("li[data-code='2000000000']");
	}
	
	// 추가
	,sectionAdd:function($parent)
	{	
		if(!$parent) return false;
		var code = $parent.attr("data-code")||"0";
		if(code.length<=0) return false;
				
		var url = "/?mod=configuration&act=articleSectionCrtForm&ax=iframe&code="+code;
		
		this.sectionShowDialog(url);
		return false;
	}
	
	// 추가후 본문에 append
	,sectionAppendAfterAdd:function(result, msg, code, parentCode, name, serial)
	{
		if(result=="true")
		{
			if(!code || parentCode.length<=0 || !name)
			{
				alert(lang.cfgSectionSetEmptyCode);
				history.back();
			}
			
			// 최상위 섹션 등록이고 미리 지정된 객체가 없을때 연재 객체 다시 찾음-연재위에 append 할려고
			var $bigserialTarget = null;
			if(parentCode=="0"){
				if(!articleCfg.vars.$bigserialTarget) articleCfg.getbigSerial();
				//$bigserialTarget = articleCfg.vars.$bigserialTarget.prev().prev(); // 기존 드래그로 바꿀때
				$bigserialTarget = articleCfg.vars.$bigserialTarget.prev();
			}
						
			var serialIcon = "";
			if(serial=="S") serialIcon = '<span class="icon_bullet ib_113_151 section_serial" title="'+lang.sectionSeries+'"></span> ';
			
			// 초기화
			articleCfg.vars.$dropElements = [];
			
			name = decodeURIComponent(name);
			var $target = this.getCurrentObjFromCode(parentCode, "data-code");
			
			this.getSubSectionElement($target, parentCode);
			
			var	$lastOfTarget = (parentCode=="0"?($bigserialTarget||$target):(articleCfg.vars.$dropElements[articleCfg.vars.$dropElements.length-1]||$target))
				,targetDepth = $target.attr("data-depth")
				,depth = parseInt(targetDepth, 10)+1;
			
			var li = this.vars.appendHtmlDragLi(parentCode, code, depth, serialIcon+name);
			//$lastOfTarget.next("li").after(li); // 기존 드래그로 바꿀때
			$lastOfTarget.after(li);
			
			// 새로 추가된 객체에 drag & drop event 추가
			// destroy로 이벤트 제거할래도, 음... ㅡㅡㅋ 
			//articleCfg.evtSort("#section_sort");

			this.closeDialog();
		}else{
			if(msg) alert(msg);
			history.back();
		}
	}
	
	// 수정
	,sectionModify:function($parent)
	{
		if(!$parent) return false;
		var code = $parent.attr("data-code")
			,depth = $parent.attr("data-depth");
		if(!code) return false;
		
		var url = "/?mod=configuration&act=articleSectionUptForm&ax=iframe&code="+code+"&current_depth="+depth;
		this.sectionShowDialog(url);
		return false;
	}
	
	// 수정후 교체
	,sectionReplaceAfterModify:function(result, msg, code, name, serial, state)
	{
		if(result=="true")
		{
			if(!code || !name)
			{
				alert(lang.cfgSectionSetEmptyCode);
				history.back();
			}
			
			var serialIcon = "", stateIcon = "";
			if(serial=="S") serialIcon = '<span class="icon_bullet ib_113_151 section_serial" title="'+lang.sectionSeries+'"></span> ';
			if(state=="N") stateIcon = ' <span class="icon_bullet ib_0_270" style="text-indent:-10000px">종료</span>';
			
			name = decodeURIComponent(name);
			var $target = this.getCurrentObjFromCode(code, "data-code");
			
			$target.find(".arlcfg_section_subject").html(serialIcon+name+stateIcon);
			$target.css("background-color","#ff9933").delay(300).animate({"background-color":"transparent"},600); //.fadeTo(500, .2).fadeTo(500, 1);
			
			this.closeDialog();
		}else{
			if(msg) alert(msg);
			history.back();
		}
	}
	
	// modal layer
	,sectionShowDialog:function(url)
	{
		if(!url) return false;
		var parentLayer = editSortable
			,width = 650
			,height = (___loginId==="ndsoft"?700:400)
			,html = parentLayer.replaceLayerHtmlTag(parentLayer.vars.layerBoxIframe, lang.close, url, (height-60))
			,output = "";
	
		output = $(html).find(".edit_layer_close").click(parentLayer.closeEditLayer).end();
		util.floatLayer(width,height,output);	// layer 띄우기
	}
	
	// 삭제
	,sectionDelete:function($parent, mode)
	{
		if(!$parent) return false;
		
		if(!window.confirm(mode=="empty"?"섹션을 비울까요?":lang.confirmDelete)) return false;
		var code = $parent.attr("data-code")||"";
		
		if(!code) return false;
		
		$parent.append('<img src="'+IM_DOMAIN+'/ajax_load_icon_small.gif" class="icon_load" valign="middle" />');
		$.get(	"/"
				,{mod:"configuration", act:mode=="empty"?"axArticleSectionEpt":"axArticleSectionDlt", code:code}
				,function(data, rst)
				{
					if(rst == "success")
					{
						if(data.result == "success")
						{
							if(mode=="empty") alert(lang.toastApply);
							else{
								$parent.fadeOut(function(){
									var $this = $(this);
									$this.add($this.next(".arlcfg_drop_place")).remove();								
								});
							}
						}else alert(decodeURIComponent(data.msg));
						
					}else alert(lang.axError);
					
					$parent.find(".icon_load").remove();
				},"json");		
	}
	
	// dialog close
	,closeDialog:function()
	{
		editSortable.closeEditLayer();
	}
	
	// 기사이동 이벤트
	,evtMoveArticle:function()
	{
		// 클래스 명
		var $sort = $("#section_sort")
			,clssFrom = "arlcfg_move_from"
			,clssTo = "arlcfg_move_to"
			,clssBox = "arlcfg_move_article"
			,txtFrom = '<span class="'+clssFrom+'">'+lang.cfgSectionSetMoveFrom+'</span>'
			,txtTo = '<span class="'+clssTo+'">'+lang.cfgSectionSetMoveTo+' <button class="button_none link_blue arlcfg_move_btn">'+lang.cfgSectionSetMoveBtn+'</button>' 
					+'&nbsp;&nbsp;또는&nbsp;&nbsp;<button class="button_none link_blue arlcfg_add_btn">'+lang.cfgSectionSetAddBtn+'</button></span>';
		
		// 더블클릭 선택 이벤트
		$sort.on("dblclick", ".arlcfg_dragable", function(){
			if($sort.hasClass("event_on")) return false; // 섹션 순서 이동이 실행중일때는 작동안함
				
			var $this = $(this)
				,txt = '';
			
			if($this.hasClass(clssBox))
			{
				// 시작 섹션이라면, 선택된거 전부 없앰
				if($this.find("."+clssFrom).length>0) $sort.find("li").removeClass(clssBox).find("."+clssFrom+", ."+clssTo).remove();
				// 이동할 섹션이라면, 그것만없앰
				else $this.removeClass(clssBox).find("."+clssTo).remove();
				
				//더블클릭한것만 없앨때,
				//$this.removeClass(clssBox).find("."+clssFrom+", ."+clssTo).remove();
			}else{
				// 이동할 기사 선택했다면,
				var size = $sort.find("."+clssFrom).length;
				
				if(size > 0){
					// 이동 도착 섹션이 이전에 있다면 제거
					$sort.find("."+clssTo).closest("."+clssBox).removeClass(clssBox).find("."+clssTo).remove();
					txt = txtTo;
				}else{
					if($sort.find("."+clssTo).length<=0) util.toast(lang.cfgSectionSetMoveToMsg);						// 이동할 목적지 섹션이 없다면 선택하도록 toast 띄움
					txt = txtFrom;
				}
				
				$this.addClass(clssBox).append(txt);
			}
		}).disableSelection();
		
		// 이동 버튼 클릭 - controller 로 보냄
		$sort.on("click", ".arlcfg_move_btn, .arlcfg_add_btn", function(){
			if(!window.confirm(lang.cfgSectionSetMoveConfirm)) return ;
			
			var $this = $(this)
				,$from = $this.closest("ul").find("."+clssFrom).closest("."+clssBox)
				,$to = $this.closest("."+clssBox)
				,fromCode = $from.attr("data-code")
				,toCode = $to.attr("data-code")
				,isMove = $this.is(".arlcfg_move_btn");

			if(!fromCode || !toCode){
				util.toast(lang.cfgSectionSetMoveAlertSelected);
				return false;
			}	
			
			$("#arlcfg_section_progress").show();
			
			$.post(	"/"
					,{mod:"configuration", act:"axMoveArticle", div:(isMove?"move":"add"), from_code:fromCode, to_code:toCode}
					,function(data, rst){
						if(rst == "success"){
							if(data.result == "success"){
								
								util.toast(decodeURIComponent(data.msg));		// ?건을 이동하였습니다.
								articleCfg.releaseSelected($sort);				// 해제
								
							}else alert(decodeURIComponent(data.msg));
							
							$("#arlcfg_section_progress").hide();
						}else alert(lang.axError);
					},"json");
		});
	}
	
	// 섹션변경 이벤트 
	,evtClickedSectionChange:function()
	{
		var $btn=$("#arlcfg_section_change")
			,$sortBox=$("#section_sort")
			,$lis=$sortBox.find("li")
			,$check=$sortBox.find(".asds_check")
			,$moveBtn=$sortBox.find(".asds_a.move");
		
		function getData(mode, $this){
			//console.log(mode)
			if(!window.confirm("섹션을 이동하겠습니까?")) return false;
			
			var $li=$this.closest("li")
				,$checked=$lis.filter(".event_checked")
				,fromParentCode=$checked.attr("data-parent")||""
				,fromCode=$checked.attr("data-code")||""
				,toParentCode=$li.attr("data-parent")||""
				,toCode=$li.attr("data-code")||"";
			
			if(!mode || !fromCode || !toCode){
				alert("중요코드가 없습니다.");
				return false;
			}
			
			// ajax
			$this.append('<img src="'+IM_DOMAIN+'/ajax_load_icon_small.gif" class="icon_load" valign="middle" />');		
			$.post(	"/"
					,{mod:"configuration", act:"axArticleSectionSortNew", div:mode, from_code:fromCode, form_parent_code:fromParentCode, to_code:toCode, to_parent_code:toParentCode}
					,function(data, rst){
						if(rst == "success"){
							if(data.result == "success"){								
								alert("이동하였습니다.");
								location.reload(true);								
							}else alert(decodeURIComponent(data.msg));
							
							$sortBox.find(".icon_load").remove();
						}else alert(lang.axError);
					},"json");
		}
		
		$btn.click(function(){			
			if($lis.filter(".arlcfg_move_article").length>0) return false;		// 섹션 기사 이동이 동작중일때는 동작금지
			
			var $this=$(this)
				,isEventOn=$this.hasClass("event_on");
			
			$this.add($sortBox).toggleClass("event_on");
			$lis.removeClass("event_checked");
			$sortBox.removeClass("checked");
		});
			
		// 이동할 섹션
		$check.click(function(){
			var $this=$(this)
				,$li=$this.closest("li")
				,isChecked=$sortBox.hasClass(".checked");
			
			$sortBox[isChecked?"removeClass":"addClass"]("checked");
			$lis.removeClass("event_checked");
			$li.addClass("event_checked");
		});
		
		// 같은 depth로 이동
		$moveBtn.click(function(){
			var $this=$(this)
				,mode="sub";
			if($this.is(".asds_depth_prev")) mode="prev";
			else if($this.is(".asds_depth_next")) mode="next";
			else if($this.is(".asds_sub")) mode="sub";
			
			getData(mode,$this);	
			return false;
		});	
	}
	
	// 모든 선택 해제
	,releaseSelected:function($sort)
	{
		$sort.find(".arlcfg_move_article").removeClass("arlcfg_move_article").find(".arlcfg_move_from, .arlcfg_move_to").remove();
	}
	
	// 기사 옵션설정에서 전송시 byte로 변경
	,submitArticleConfig:function(form)
	{
		var photo = form.photo_upload
			,file = form.file_upload
			,video = form.video_upload
			,convert = 1024*1024;
		
		photo.value = (Number(photo.value)||0)*convert;
		file.value = (Number(file.value)||0)*convert;
		video.value = (Number(video.value)||0)*convert;
		
		return true;
	}	

	// 검색 방법 설정시 input 보이게
	,showInputBySearchModule:function()
	{
		//var $input = $("#journal_code");		
		$(".search_module_selector").click(function(){
			var val = this.value;		
			switch (val)
			{
				case "wisenut":
					$("#search_cfg_W").css("display", "block");
					break;
				
				case "yonhap":
					$("#search_cfg_W").css("display", "none");
					break;
					
				case "default":
				default:
					$("#search_cfg_W").css("display", "none");
					break;
			}
		});
	}
	
	// 기사댓글 설정 로딩시-사용안함
	,loadArticleReply:function()
	{
		var form = document.form_option
			,onOff = form.reply_onoff
			,service = form.service_reply
			,captcha = form.reply_captcha_value
			,recom = form.use_vote_value
			//,rLogin = form.reply_login_value
			,$form = $(form)
			,value = "";
		
		if(onOff.value=="N") value = "N";
		else value = service.value;
	
		$form.find("input[name='reply_config']:radio").val([value])
		.end().find("input[name='reply_captcha']:radio").val([captcha.value])
		.end().find("input[name='use_vote']:radio").val([recom.value])
		.click(function(){
			$("#reply_cfg_member_box")[this.value==="Y"?"show":"hide"]();
		})
		//.end().find("input[name='reply_login']:radio").val([rLogin.value])
		.end().find("#reply_cfg_member_box")[recom.value==="Y"?"show":"hide"]();
		
		// radio, checkbox갱신
		util.inputReload($form);
	}
	
	// 기사 댓글 설정
	,submitArticleReply:function(form)
	{		
		return true;
	}
		
	// 기사 댓글 스팸 필터 - 저장
	,spamFilterSaveForArticleReply:function()
	{		
		$(document.body).on("click keydown", ".spam_cfg_btn_add, .spam_cfg_btn_delete, .spam_cfg_input_text", 
							function(e){
								var $this = $(this)
									,pass = true
									,eType = e.type;
								
								// event별로 객체 구별								
								// click event - input 에 걸린 click 은 무시
								if(eType=="click" && $this.is(".spam_cfg_input_text")) pass = false;
								
								// keydown event
								if(eType=="keydown"){
									if($this.is(".spam_cfg_btn_add") || $this.is(".spam_cfg_btn_delete")) pass = false;						// 버튼에 걸리 keydown이벤트 무시
									if($this.is(".spam_cfg_input_text") && e.keyCode!==13)  pass = false;									// input 에 걸린 keydown은 엔터만 통과
								}
								
								if(pass===true){																							// 버튼으로 클릭, input에서 엔터만 등록할 수 있다.
									var $box = $this.closest(".spam_cfg_box_width")
										,$dataList = $box.find(".spam_cfg_items")
										,$li = null
										,division = $box.attr("data-division")||"ip"
										,clss = ".spam_cfg_title_"+division
										,inputName = "spam_"+division
										,act = "spamBlockCrt"
										,mode = "add"
										,value = ""
										,field = null;
									
									// 삭제
									if($this.is(".spam_cfg_btn_delete")){
										if(!window.confirm(lang.confirmDelete)) return false;
										
										$li = $this.closest(".spam_cfg_item");
										value = $.trim($li.find(".spam_cfg_title").text());
										act = "spamBlockDlt";
										mode = "delete";
									}
									// 추가								
									else{
										field = document.article_reply_spam_form[inputName];
										value = $.trim(field.value);
										if(value){
											if(division === "ip"){
												if(!(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/i).test(value)){
													alert(lang.valid);
													field.focus();
													return false;
												}
											}
										}else{
											alert(lang.articleReplyRequireSpamData);
											field.focus();
											return false;
										}
									}
									
									// data 조합
									var arr = []
										,params = {};
									$box.find(clss).each(function(i,ele){
										var _value = $.trim($(this).text());
										
										// 삭제이고, 삭제하는 값과 같다면 더하지 말라. 
										if(mode === "delete" && value === _value){}
										else arr.push(_value);
									});
									
									if(mode==="add" && value){
										// 이미 등록되어 있나 체크
										if($.inArray(value, arr)>=0){
											alert(lang.validRequireDuplicateData);
											field.value = "";
											field.focus();
											return false;
										}
										
										arr.push(value);
									}
									
									// data 전송
									params["mod"] = "configuration";
									params["act"] = act;
									params["division"] = division;
									params[inputName+"[]"] = arr;
									
									$.post(	"/"
											,params
											,function(data, rst){
												if(rst === "success"){
													if(data.result === "success"){
														// 추가
														if(mode === "add"){
															var $clone = $dataList.children(".spam_cfg_item").filter(":last").clone();
															if($clone.length<=0){
																location.reload(true);
																return false;
															}
															
															$dataList.append($clone.find(".spam_cfg_title").text(value).end());
															if(field){
																field.value = "";
																field.focus();
															}
														}else{
														// 삭제
															$li.fadeOut("fast", function(){ $(this).remove(); });
														}													
													}else alert(decodeURIComponent(data.msg).replace("<br />","\n"));
												}else alert(lang.axError);
											},"json");
								} // pass end if
							});
	}
		
	// 워터마크 등록
	,evtSubmitWatermark:function(form)
	{
		var watermark = form['watermark[]'];
		
		if(!watermark.value){
			alert(lang.validSelectImage);
			watermark.focus();
			return false;
		}
		
		return true;
	}
	
	
	// 워터마크 파일 선택 갯수 제한
	,evtChangeWatermarkAttach:function()
	{	
		var parents = this
			,isImage = 0
			,max = this.vars.watermark.max;		
	
		$("#cfg_watermark_write_box").on("change","#cfg_watermark_attach",function(evt){
			var $this = $(this);
			
			try{
				var files = evt.target.files
					,length = files.length;
				
				if((length+parents.vars.watermark.count) > max){
					alert(lang.validFileMaxCount.replace("[]", max));
					$this.replaceWith($this.clone());
					return false;
				}
				
				for(var i=0; i<length; i++){
					var file = files[i]
						,name = file.name;//,size = file.size,type = file.type;
					if(!util.isFileOnlyImg(name)) isImage++;					
				}
			}catch(e){
				var name = this.value;
				if(!util.isFileOnlyImg(name)) isImage++;	
			}
			
			if(isImage>0){
				isImage=0; // 초기화
				alert(lang.validSelectImage);
				$this.replaceWith($this.clone());				
			}
		});	
	}
	
	// 워터마크 삭제
	,evtDelteWatermark:function()
	{
		var form = document.watermark_form;
		$("#cfg_watermark_list_box").on("click",".cfg_watermark_btn_delete",
										function(){
											if(!window.confirm(lang.confirmDelete)) return false;
											var _this = this
												,act = "watermarkDlt"
												,filename = $(_this).closest(".cfg_watermark_list_li").attr("data-file");
											
											form.action = "/?dummy=configuration-"+act;
											form.act.value = act;
											form.file.value = filename;
											
											form.submit();											
										});
	}
	
	// 워터마크 순서변경
	,evtSortableWatermark:function()
	{
		$("#cfg_watermark_list_box").sortable({
			axis:"y"
			,placeholder: "ui-state-highlight"
			,forcePlaceholderSize:true
			,update:function(e, ui){
				var $li = $(this).find(".cfg_watermark_list_li")
					,files = [];
				
				$li.each(function(i, ele){
					var attrData = ele.getAttribute("data-file");
				
					files.push(attrData);
					
					// 위에서 정보 모우고, 미리 변경될 파일명으로 교체
					ele.setAttribute("data-file", attrData.replace(/_[0-9]{1}/i,'_'+(i+1)));
				});
				
				if(files.length<=0) return false;
				
				$.post(	"/"
						,{mod:"configuration", act:"axWatermarkSort", "files[]":files}
						,function(data, rst){
							if(rst==="success"){
								if(data.result!=="success") 
									alert(decodeURIComponent(lang.msg));
							}else alert(lang.axError);
						},"json");
			}
		});
	}
	
	/********************************************************************
	 * 기사 전송
	 ********************************************************************/
	// 등록폼
	,evtClickedArlTransForm:function()
	{
		var $crtForm = $("#cfg_at_crt_form")
			,form = document.cfg_arl_trans_form;
		$("#content").on("click", "#cfg_arl_trans_btn_regist, .cfg_at_list_btn_info", 
				function(){			
					form.reset();
					
					var $this = $(this);			
					$crtForm.dialog({
						width:600
			            ,height:380
			            ,modal: true
			            ,open:function(event, ui){
			            	// 수정 이라면,
		    				var isModify = $this.is(".cfg_at_list_btn_info");
			    			if(isModify){
								form.field_name.disabled = true;
								
			    				var $parent = $this.closest(".cfg_at_list_li")
			    					,idxno = $parent.attr("data-idxno")||""
			    					,company = $parent.attr("data-company")||""
			    					,address = $parent.attr("data-address")||""
			    					,port = $parent.attr("data-port")||""
			    					,id = $parent.attr("data-id")||""
			    					,password = $parent.attr("data-password")||""
			    					,fieldName = $parent.attr("data-field-name")||""
			    					,sftp = $parent.attr("data-sftp")||"";
			    			
			    				form.idxno.value = idxno;
			    				form.company.value = company;
			    				form.address.value = address;
			    				form.port.value = port;
			    				form.id.value = id;
			    				form.password.value = password;
			    				form.field_name.value = fieldName;
			    				form.sftp.checked = sftp=="Y";
			    			}
			            }
						,close:function(event, ui){
							form.field_name.disabled = false;
							form.reset();		
						}
					});			 
		});
	}
	
	// 섹션매칭
	,evtClickedArlTransSectionForm:function()
	{
		var $crtForm = $("#cfg_at_section_match_form")
			,form = document.section_match_form;
		$("#content").on("click", ".cfg_at_list_btn_section", function(){
			form.reset();
			
			var $this = $(this);
			$crtForm.dialog({
				width:650
	            ,maxHeight:700
	            ,modal: true
	            ,open:function(event, ui){					
	            	var $parent = $this.closest(".cfg_at_list_li")
	            		,idxno = $parent.attr("data-idxno")||"";
	            	
	            	form.idxno.value = idxno;
	            	
	            	var items = ___codes[idxno]||false;
	            	if(items && (typeof items==="object")){
	            		for(var i in items){
	            			var partnerCode = items[i];
	            			$crtForm.find(".cfg_at_section_input[data-section-code='"+i+"']").val(partnerCode);
	            		}
	            	}
	            }
				,close:function(event, ui){
					form.reset();	
				}
			});			 
		});
	}
	
	// 정보 등록
	,evtSubmitArticleTransInfo:function(form)
	{
		if(!form.company.value){
			alert(lang.validRequireCompany);
			form.company.focus();
			return false;
		}
		
		if(!form.field_name.value){
			alert(lang.requiredSentence);
			form.field_name.focus();
			return false;
		}
		
		if(!form.address.value){
			alert(lang.validRequireAddress);
			form.address.focus();
			return false;
		}
		
		if(form.port.value){
			if(!util.onlyNumber(form.port.value)){
				alert(lang.validOnlyNumber);
				form.port.focus();
				return false;
			}
		}
		
		if(!form.id.value){
			alert(lang.loginNotId);
			form.id.focus();
			return false;
		}
		
		if(!form.password.value){
			alert(lang.loginNotPw);
			form.address.focus();
			return false;
		}
		
		return true;
	}
	
	// 식별코드 클릭
	,evtClickedFieldInput:function()
	{
		var form = document.cfg_arl_trans_form.field_name;
		$(".cfg_at_crt_field_a").click(function(){
			var $this = $(this)
				,text = $.trim($this.text());
			
			if(form.disabled===false){
				if(text === "etc"){
					form.value = "";
					form.focus();
				}else form.value = text;
			}
			return false;
		});
	}
	
	// 섹션매칭 등록
	,evtSubmitArticleTransSection:function(form)
	{
		var $form = $(form)
			,$codeInput = $form.find("input[name='code[]']")
			,sectionCode = []
			,partnerCode = [];
		
		$.each($codeInput,function(i, ele){
			var pCode = ele.value;
			if(pCode){
				var sCode = ele.getAttribute("data-section-code");
				sectionCode.push(sCode);
				partnerCode.push(pCode);
			}
		});
		
		form.section_code.value = sectionCode.join(",")||"";			// 섹션코드
		form.partner_code.value = partnerCode.join(",")||"";			// 매칭한 제휴사 섹션코드
		
		return true;
	}
};


/*****************************************************************************
메인 아이콘,색상 기사쓰기 특수문자 등록
*****************************************************************************/
var decorations={
	vars:{
		iconPath : null
	}

	,init:function()
	{
		this.vars.iconPath = PH_DOMAIN+"/other/deco_icon/";
	}
	
	// 파일명만 빼오기
	,getFilename:function(v){
		return v.replace(/^(http.*\/deco_icon\/)(\w+\.(jpg|jpeg|png|gif))/gi,"$2");
	}
	
	// color validate
	,isColorValidate:function(value)
	{
		if(!value.match(/^#\w/)) return false;
		if(value.length!==4 && value.length!==7) return false;
		return true;
	}

	// input color가 없다면 colorpicker보이게
	,showColorpicker:function()
	{
		var $colorBox = $("#decoration_cfg_color_box")
			,$text = $("#decoration_cfg_color")
			,$preview = $("#decoration_cfg_preview")
			,$picker = $("#decoration_cfg_colorpicker");
		
		if(picker.isSupportInputType("color")===true){
			$preview.add($picker).remove();
			$text.css({"margin":"0 0 -1em 0"});			
		}else{
			$colorBox.addClass("color_box");
			$picker.farbtastic(function(color){
				if(!color) return false;
				$preview.css({"background-color":color});
				$text.val(color);
			});
		}
	}
	
	// 추가
	,evtAddContent:function()
	{
		var parents = this;
		$(document.body).on("click keydown change", ".decoration_cfg_btn_add, .decoration_cfg_btn_delete, .decoration_cfg_input_text", 
				function(e){
					var $this = $(this)
						,pass = true
						,eType = e.type;
					
					// event별로 객체 구별								
					// click event - input 에 걸린 click 은 무시
					if(eType=="click" && $this.is(".decoration_cfg_input_text")) pass = false;
					
					// keydown event
					if(eType=="keydown"){
						if($this.is(".decoration_cfg_btn_add") || $this.is(".decoration_cfg_btn_delete")) pass = false;				// 버튼에 걸리 keydown이벤트 무시
						if(($this.is(".decoration_cfg_input_text") && e.keyCode!==13) || this.type!=="text")  pass = false;			// input 에 걸린 keydown은 엔터만 통과 - file이 아님어야 함
					}
					
					// change event
					if(eType=="change"){
						if(this.type!=="file") pass = false;
					}
					
					if(pass===true){																								// 버튼으로 클릭, input에서 엔터만 등록할 수 있다.
						var $box = $this.closest(".decoration_cfg_box_width")
							,$dataList = $box.find(".decoration_cfg_items")
							,$li = null
							,division = $box.attr("data-division")||"ip"
							,clss = ".decoration_cfg_title_"+division
							,inputName = "deco_"+division
							,act = "decorationCrt"
							,mode = "add"
							,value = ""
							,field = null;
						
						// 삭제
						if($this.is(".decoration_cfg_btn_delete")){
							if(!window.confirm(lang.confirmDelete)) return false;
							
							$li = $this.closest(".decoration_cfg_item");
							value = $.trim((division==="icon" ? parents.getFilename($li.find(".decoration_cfg_title img").attr("src")||"") : $li.find(".decoration_cfg_title").text()));									// icon 일때는 이미지 경로로
							act = "decorationDlt";
							mode = "delete";
						}
						// 추가								
						else{
							field = document.article_reply_deco_form[inputName];
							value = $.trim(field.value);
							if(value){
								if(division === "icon"){
									if(!util.isFileOnlyImg(value)){
										alert(lang.validSelectImage);
										$this.replaceWith($this.clone());
										return false;
									}
								}else if(division === "color"){
									if(!parents.isColorValidate(value)){
										alert(lang.cfgDecorationRequireRgbColor);
										return false;
									}
								}
							}else{
								alert((division==="icon" ? lang.validRequireFile : lang.validRequireContent));
								field.focus();
								return false;
							}
						}
					
						// icon 추가는 iframe으로.
						if(mode==="add" && division==="icon"){
							parents.submitAfterCreateIframe();
							
							return false;
							// 아이콘 업로드는 여기까지...
						}
						
						// data 조합
						var arr = []
							,params = {};
						$box.find(clss).each(function(i,ele){
							var _value = $.trim((division==="icon" ? parents.getFilename($(this).find("img").attr("src")||"") : $(this).text()));
							
							// 삭제이고, 삭제하는 값과 같다면 더하지 말라. 
							if(mode === "delete" && value === _value){}
							else arr.push(_value);
						});
						
						if(mode==="add" && value){
							// 이미 등록되어 있나 체크
							if($.inArray(value, arr)>=0){
								alert(lang.validRequireDuplicateData);
								field.value = "";
								field.focus();
								return false;
							}
							
							arr.push(value);
						}
						
						// data 전송
						params["mod"] = "configuration";
						params["act"] = act;
						params["division"] = division;
						params[inputName+"[]"] = arr;
						
						// 아이콘일때 파일 삭제
						if(mode==="delete" && division==="icon") params["dlt_file"] = value;
							
						$.post(	"/"
								,params
								,function(data, rst){
									if(rst === "success"){
										if(data.result === "success"){
											// 추가
											if(mode === "add"){
												var $clone = $dataList.children(".decoration_cfg_item").filter(":last").clone();
												if($clone.length<=0){
													location.reload(true);
													return false;
												}
												
												if(division==="color") $clone.find(".decoration_cfg_preview_item").css("background-color",value).end().find(".decoration_cfg_item_title").text(value);
												else $clone.find(".decoration_cfg_title").text(value);

												$dataList.append($clone);												
												
												if(field){
													field.value = "";
													field.focus();
												}
											}else{
											// 삭제
												$li.fadeOut("fast", function(){ $(this).remove(); });
											}													
										}else alert(decodeURIComponent(data.msg).replace("<br />","\n"));
									}else alert(lang.axError);
								},"json");
					} // pass==true end if
				});
	}
	
	// 모두전송하기
	,sendData:function(selector)
	{
		var parents = this
			,$parent = $(selector).closest(".decoration_cfg_box_width")
			,division = $parent.attr("data-division")
			,arr = []
			,params = {};
	
		$parent.find(".decoration_cfg_title").each(function(i,ele){
			var _value = $.trim((division==="icon" ? parents.getFilename($(this).find("img").attr("src")) : $(this).text()));					
			arr.push(_value);
		});
		
		if(arr.length<=0) return false;
		
		params["mod"] = "configuration";
		params["act"] = "decorationCrt";
		params["division"] = division;
		params["deco_"+division+"[]"] = arr;
		
		$.post(	"/"
				,params
				,function(data, rst){
					if(rst === "success"){
						if(data.result === "success"){}
						else alert(decodeURIComponent(data.msg).replace("<br />","\n"));
					}else alert(lang.axError);
				},"json");
	}
	
	// 아이콘 iframe 생성후 전송
	,submitAfterCreateIframe:function()
	{
		// if($("#dummy_upload_icon").length>0) return false;		
		var iframe = '<iframe name="upload_icon" id="dummy_upload_icon" frameborder="0" width="0" height="0"></iframe>'
			,body = document.article_reply_deco_form;
		
		$(body).append(iframe);		
		body.submit();
	}
	
	// 아이콘 생성후 후처리
	,appendIconAfterSubmit:function(result, filename, msg)
	{
		if(!result) return false;
		
		var $file = $(document.article_reply_deco_form.deco_icon);
		
		if(result === "error") alert(decodeURIComponent(msg));
		else{
			
			var $box = $("#decoration_cfg_icon_box .decoration_cfg_items")
				,$clone = $box.children(".decoration_cfg_item").filter(":last").clone()
				,path = this.vars.iconPath+filename;
			
			if($clone.length<=0){
				location.reload(true);
				return false;
			}
			
			$clone.find(".decoration_cfg_title > img").attr({"src":path});
			$box.append($clone);
		}
		
		$file.replaceWith($file.clone());
		$("#dummy_upload_icon").remove();
	}
	
	// sortable
	,evtSortable:function()
	{
		var parents = this;
		$( ".decoration_cfg_items" ).sortable({
			axis:"y"
			,placeholder: "ui-state-highlight"
			,forcePlaceholderSize:true
			,update:function(event, ui){																				// sort
				// data 조합
				parents.sendData(ui.item.context);
			}
		});//.disableSelection();
	}
};


/*****************************************************************************
크레딧등록
*****************************************************************************/
var credit={
	vars : {
		isModify : false
		,$ul : null
		,$text : null
		,index : null
		,$dialog : null
	}

	// 등록
	,evtClickedReg:function()
	{
		var parents = this
			,$ul = $("#cfg_credit_list_box")
			,$dialog = $("#cfg_credit_dialog")
			,$input = $dialog.find("#cfg_credit_input");
		
		parents.vars.$ul = $ul;
		parents.vars.$dialog = $dialog;
		$("#content").on("click", "#cfg_credit_btn_write, .cfg_credit_btn_modify, .cfg_credit_btn_delete"
						,function(){
							var $this = $(this)
								,isModify = $this.is(".cfg_credit_btn_modify")
								,isDelete = $this.is(".cfg_credit_btn_delete");
							
							// 삭제
							if(isDelete){
								if(!window.confirm(lang.confirmDelete)) return false;
								var $li = $this.closest(".cfg_credit_list_li")
									,index = $li.index();
								
								if(index<0) return false;
								$.post(	"/?dummy=configuration-creditDlt"
										,{mod:"configuration", act:"creditDlt", index:index}
										,function(data, rst){
											if(rst === "success"){
												if(data.result === "success"){
													$li.fadeOut("fast",function(){ $(this).remove(); });
												}else alert(decodeURIComponent(data.msg));
											}else alert(lang.axError);
										},"json");
								
								return false;
							}
							
							// --- 수정 + 입력 --- //							
							// 수정
							if(isModify){
								var $li = $this.closest("li")
									,$text = $li.find(".cfg_credit_text")
									,text = $.trim($text.text());
								
								parents.vars.$text = $text;
								parents.vars.index = $li.index();
							}else{
								if(parents.vars.$ul.children(".cfg_credit_list_li").length>20){
									alert(lang.creditLimitCount);
									return false;
								}
							}
							
							// dialog 띄우기
							parents.vars.isModify = isModify;
							$dialog.dialog({
								modal:true
								,open:function(){
									if(isModify) $input.val(text);
								}
								,close:function(){
									$input.val("");										// 입력란 비우기 
									parents.vars.$text = null;
									parents.vars.index = null;	
								}								
							});
						});
	}

	// 전송
	,evtSubmit:function(form)
	{
		var text = form.credit_input.value;
		
		if(!text){
			alert(lang.creditRequireText);
			form.credit_input.focus();
			return false;
		}
		
		text = util.stripTags(text);
		var parents = this
			,params = {
				mod : "configuration"
				,act : "creditCrt"
				,text : text
			};
		
		if(this.vars.isModify){
			params.act = "creditUpt";
			params.index = this.vars.index;
		}
		
		// 전송
		$.post(	"/?dummy=configuration-"+params.act
				,params
				,function(data, rst){
					if(rst === "success"){
						if(data.result === "success"){							
							if(parents.vars.isModify){
								parents.vars.$text.text(text);
							}else{
								if(parents.vars.$ul.children(".cfg_credit_list_li").length<=0){					// 복사해둔게 없다면 새로고침
									 location.reload(true);
									 return false;
								}
								
								parents.vars.$ul.append($(".cfg_credit_list_li:eq(0)").clone().find(".cfg_credit_text").text(text).end());	// 덧붙이기
							}
							
							parents.vars.$dialog.dialog("close");
						}else alert(decodeURIComponent(data.msg));
					}else alert(lang.axError);
				},"json");		
		
		return false;
	}
	
	// sort
	,evtSort:function()
	{
		var $box = $("#cfg_credit_list_box");
		$box.sortable({
			axis:"y"
			,placeholder: "ui-state-highlight"
			,forcePlaceholderSize:true
			,update:function(event, ui){																				// sort
				var text = $box.find(".cfg_credit_text").map(function(){ return $(this).text(); }).get();
				$.post(	"/?dummy=configuration-axSort"
						,{mod:"configuration", act:"axCreditSort", "text[]":text}
						,function(data, rst){
							if(rst === "success"){
								if(data.result === "success"){
									
								}else alert(decodeURIComponent(data.msg));
							}else alert(lang.axError);							
						},"json");
			}
		});
	}
};



/*****************************************************************************
편집설정 (editCfg)
*****************************************************************************/
var editCfg={
		
	// 섹션스킨등록 submit
	evtSubmitSectionSkin:function(form)
	{
		var title = form.section_title
			, code = form.section_code
			, skin = form.section_skin
			, act = form.act;
		
		if(!title.value)
		{
			alert(lang.editcfgRequireSectionTitle);
			title.focus();
			return false;
		}
		
		if(act.value == "editSkinCrt")
		{
			if(!code.value)
			{
				alert(lang.editcfgRequireSectionCode);
				code.focus();
				return false;
			}
		}
		
		if(!skin.value)
		{
			alert(lang.editcfgRequireSectionSkin);
			skin.focus();
			return false;
		}
	}

	// 스킨 삭제 - 중요 스킨은 삭제 안됨
	,evtClickedDeleteSkin:function()
	{
		var except = ["MAIN","MOBILE","ARTLT","ARTVW","BBS"];
		$(".editcfg_delete").click(function(){
			var json = util.linkToJson(this.href.replace(/^(.*)\/\?/,""))
				,code = json["code"]||"";
			
			if(code){
				if($.inArray(code, except)>=0){
					alert(lang.editcfgRequireDeleteExcept)
					return false;
				}
			}
			
			if(!window.confirm(lang.confirmDelete)) return false;
				
			return true;
		});
	}

	// 박스 스킨
	,evtSubmitBoxSkin:function(form)
	{
		var div = form.skin_size
			, title = form.skin_title
			, num = form.skin_num
			, file = form.skin_capture
			, max = form.skin_tab_max
			, act = form.act; //boxSkinUpt
		
		if(!div.value)
		{
			alert(lang.editcfgRequireBoxDiv);
			div.focus();
			return false;
		}
		
		if(!title.value)
		{
			alert(lang.editcfgRequireBoxName);
			title.focus();
			return false;
		}
		
		if(!num.value)
		{
			alert(lang.editcfgRequireBoxNum);
			num.focus();
			return false;
		}
		
		if(!util.onlyNumber(num.value))
		{
			alert(lang.validOnlyNumber);
			num.focus();
			return false;
		}
		
		if(act.value != "boxSkinUpt")
		{
			if(!file.value)
			{
				alert(lang.editcfgRequireBoxFile);
				file.focus();
				return false;
			}
		}
		
		if(max.value)
		{
			if(!util.onlyNumber(max.value))
			{
				alert(lang.validOnlyNumber);
				max.focus();
				return false;
			}
		}
		
		return true;
	}
	
	// 단 갯수 변화시 필드 늘림
	,evtChangeApplyFieldCount:function()
	{
		var $target = $("#editcfg_skin_box_num");
		
		$target.change(function(){
			var _this = this
				, $copy = $(".editcfg_skin_box_body")
				, _num = parseInt(_this.value, 10)||0
				, _count = $copy.size()
				, _sum = _count - _num;
		
			// 숫자만,
			if(!_num || _sum==0 || _num==0) return false;
			if(!util.onlyNumber(_this.value)){
				util.toast(lang.validOnlyNumber);
				return false;				
			}
	
			// 입력된 칸보다 입력한 갯수가 더 많으니 필드추가
			if(_sum < 0){				
				for(var i=0; i<Math.abs(_sum); i++){
					var $clone = $copy.filter(":first").clone().find("textarea").val("").closest(".editcfg_skin_box_body");
					$clone.insertAfter($copy.filter(":last"));
				}
				util.toast(lang.toastAdded);
			}else{
				$copy.filter(":gt("+(_num-1)+")").remove();
				util.toast(lang.toastDeleted);
			}
		});		
	}
	
	// 수동으로 지울때
	,evtClickedRemoveField:function()
	{
		$("#content").on("click", ".editcfg_skin_remove_btn",function(){
			if(!window.confirm(lang.confirmDelete)) return ;
			
			var $target = $(this).closest(".editcfg_skin_box_body")	
				, _num = $(".editcfg_skin_box_body").size();
			
			if(_num<=1)
			{
				util.toast(lang.editcfgRequireNotRemove);
				return false;
			}
			
			$target.fadeOut(function(){
				$(this).remove();
				$("#editcfg_skin_box_num").val(_num-1);
				util.toast(lang.toastDeleted);
			});			
		});
	}
	
	// 스킨 사이즈 설정
	,evtSubmitSkinSize:function(form)
	{
		var  size = form.size;
		
		if(!size.value)
		{
			alert(lang.editcfgRequireSizeValue);
			size.focus();
			return false;
		}
		
		if(!util.onlyNumber(size.value)){
			util.toast(lang.validOnlyNumber);
			return false;				
		}
		
		return true;
	}
	
	// writeform show
	,evtClickedShowWriteForm:function(){
		var $btn = $("#editcfg_box_set_btn_writeform, #editcfg_tpl_box_set_btn_writeform");
		
		$btn.click(function(){
			var $form = $("#editcfg_box_set_writeform");			
			$form.dialog({
	            resizable: false
	            ,width:400
	            ,height:450
	            ,modal: true
	            ,open:function(event, ui){
	            	$(event.target).find("iframe").attr("src", $btn.attr('href')); //"/?mod=editCfg&act=boxSkinSizeCrtForm");
	            }
				,close:function(event, ui){
					var $iframe = $(event.target).find("iframe")
						, $select = $("#editcfg_skin_box_div, #editcfg_tpl_skin_box_div")
						, _value = $select.val();
			
					// select bar 갱신
					$select.children("option").not(":first").remove();
					$iframe.contents().find(".editcfg_box_set_td_size").each(function(i, ele){
						var $ele = $(ele)
							, idxno = $ele.attr("data-idxno")
							, size = $.trim($ele.text())
							, text = size+(size=="mobile"?"":" px");
						
						$select.append('<option value="'+idxno+'">'+text+'</option>');
					});
					
					$select.val(_value);
					$iframe.attr("src", "about:blank");					
				}
	        });
			
			return false;
		});
	}
	
	// 템플릿 전송
	,evtSubmitTemplateSkin:function(form)
	{
		var size = form.box_size
			,title = form.title
			,upfile = form.upfile
			,act = form.act;
	
		if(!size.value)
		{
			alert(lang.editcfgRequireSizeSelect);
			size.focus();
			return false;
		}
		
		if(!title.value)
		{
			alert(lang.editcfgRequireSectionTitle);
			title.focus();
			return false;
		}
		
		if(act.value != "templateUpt")
		{
			if(!upfile.value)
			{
				alert(lang.editcfgRequireBoxFile);
				upfile.focus();
				return false;
			}
		}		
		
		return true;
	}
	
	// 기본테마설정
	,evtSubmitBasicTheme:function(form)
	{
		if(!form.default_theme_pc.value || !form.default_theme_mobile.value){
			alert(lang.editcfgRequireThemeSelect);
			return false;
		}
		return true;
	}
	
	/*
	 * 박스/템플릿 만들시 아스키코드 넣을때
	   @params
	 	- target : 클릭시 나올 객체 + 삽입할 객체
	 	- clicked : 삽입할 요소
	 *  - position : left - 왼쪽에 나옴, bottom - 아래에 나옴 
	 *  - box : 선택할 박스
	 */ 
	,putHtmlentity:function(target, clicked, position, box)
	{
		if(!position) position = "left";
		if(!box) box = "#htmlentity_box";
		 
		var $entityBox = $(box).draggable({ handle: ".ewic_btn_box" })
			,btns = box+" .hbb";;
		
		// 닫기 버튼
		$entityBox.find(".hbc").click(function(){ 
										$entityBox.hide(); 
										editStyleTitle.vars.area = null;
										
										$entityBox.attr("data-visible","hidden");
										return false; 
									 });
		
		// 삽입객체 이벤트 
		$(document.body).on("click", target, 
							function(){								
								if($entityBox.attr("data-visible")=="visible") return false;
								
								var $this = $(this)
									,width = $this.outerWidth()
									,height = $this.outerHeight()
									,pos = $this.position()
									,top = 0
									,left = 0;
								
								switch(position){
									case "bottom":
										top = pos.top + height+2;
										left = pos.left;
									break;
									
									default:
									case "left":
										top = pos.top;
										left = pos.left + width +20;
									break;									
								}
								
								$entityBox.show().css({"top":top+"px", "left":left+"px"});
								
								$entityBox.attr("data-visible","visible");
								
								return false;
							})
						.on("click", clicked, function(){
							editStyleTitle.vars.area = this;
							return false;
						});
		
		// 클릭 버튼 : entity가 있는 버튼
		editStyleTitle.putChar(btns);
	}

	// codemirror 설치
	// @param : (array) param = [{target:"객체",theme:"테마 material | default",mode:"언어종류 htmlmixed | css", height:"300px"},...]
	,addCodemirrorPlugin:function(param){
		//return false; // 우선 보류 - mac 등 원활히 되지 않음  
		
		if(!param || typeof param!="object") return false;
		var css=["/codemirror/material.css","/codemirror/codemirror.css"]
			,js=["/codemirror/codemirror.js","/codemirror/javascript.js","/codemirror/css.js","/codemirror/xml.js","/codemirror/htmlmixed.js"]
			,head=document.getElementsByTagName("head")[0];
			
		// append css
		for(var i=0,cnt=css.length;i<cnt;i++){
			var href=IM_DOMAIN+css[i];
			if(document.querySelectorAll("link[href='"+href+"']").length>0) continue; 

			var link=document.createElement("link");
			link.type="text/css";
			link.rel="stylesheet";
			link.href=href;
			head.appendChild(link);
		}

		// append script
		var loadScript=function(src){
				var script=document.createElement("script");
				script.type="text/javascript";
				script.src=src;
				head.appendChild(script);
				return script;
			}
			,getSelected=function(t){
				var target=document.querySelectorAll(t)[0];
				return target.style.display=="none"?false:target;
			}
			,loadSelect=function(){
				for(var i=0,cnt=param.length;i<cnt;i++){
					var target=getSelected(param[i].target);
			
					if(!target) continue;
					CodeMirror.fromTextArea(target, {
						lineNumbers: true,
						lineWrapping: true,
						mode: param[i].mode,
						theme: param[i].theme,
						matchBrackets: true
					})
					.setSize("100%",param[i].height||300);
						
					if(param[i].theme=="default") target.parentNode.style.border="1px solid #bcbcbc";
				}	
			};

		loadScript(IM_DOMAIN+js[0]).onload=function(){	// codemirror.js 모두 로딩되어야 함
			for(var i=1,cnt=js.length;i<cnt;i++){
				var src=IM_DOMAIN+js[i];
				if(document.querySelectorAll("script[src='"+src+"']").length>0) continue; 

				loadScript(src);
			}

			setTimeout(function(){ loadSelect(); },300);
		};
	
		// $(window).load(function(){ loadSelect(); }); ---> edge에서 이상하게 작동됨
		// edge 브라우저는 로딩이 쉽게 안됨; 한번더 실행해서 안된거 있음 찾음
		setTimeout(loadSelect,1200);


		// 템플릿 제작용 태그 내 클릭이벤트 재정의
		$(".hbb").click(function(){
			util.copyExe($(this).html());
			return false;
		});
	}
	
	
};


/*****************************************************************************
다음송고 api
*****************************************************************************/
var daumapi={
	vars:{}
	
	,evtSubmitExceptId:function(form)
	{			
		var $except = $("#cfg_daumapi_except_list_except").find(".cfg_daumapi_btn_add_id")
			,ides = []
			,names = []
			,checked = $("input[name='daumapi_constract']:checked").val()||"N"
			,startDate = form.daumapi_start_date
			,tag = form.daumapi_tag
			,channelUrl = form.daumapi_channel_url
			,excSection = form.daumapi_exc_section;
		
		// 다음 계약이 Y라면 확인 메시지 띄움
		if(checked==="Y"){
			if(!window.confirm(lang.daumapiConfirmSubmit)) return false;
		}
		
		if(!tag.value){
			alert(lang.daumapiRequireTag);
			tag.focus();
			return false;
		}
	
		if(!channelUrl.value){
			alert(lang.requiredSentence);
			channelUrl.focus();
			return false;
		}		

		if(checked==="Y" && !startDate.value){
			alert(lang.pollRequireWrongDate);
			startDate.focus();
			return false;
		}
		
		$except.each(function(i, ele){
			var _ele = ele
				//,$ele = $(_ele)
				,id = _ele.getAttribute("data-id")
				,name = _ele.getAttribute("data-name");
			
			ides.push(id);
			names.push(name);
		});
		
		$.post(	"/"
				,{mod:"configuration", act:"axDaumapiCrtContent",daumapi_constract:checked, daumapi_tag:tag.value, daumapi_channel_url:channelUrl.value, daumapi_start_date:startDate.value , daumapi_exc_section:excSection.value, "daumapi_except_id[]":ides, "daumapi_except_name[]":names}
				,function(data, rst){
					if(rst==="success"){
						if(data.result === "success") util.toast(lang.toastSaved);
						else alert(decodeURIComponent(data.msg));
					}else alert(lang.axError);
				}
				,"json");
		
		return false;
	}
	
	
	// 회원 클릭후 담기
	,evtClickedCart:function()
	{
		var $total = $("#cfg_daumapi_except_list_total")
			,$except = $("#cfg_daumapi_except_list_except");
		
		$total.add($except).on("dblclick", ".cfg_daumapi_btn_add_id",
								function(){
									var _this = this
										,$this = $(_this)
										,$target = $this.closest(".cfg_daumapi_except_list").is("#cfg_daumapi_except_list_total") ? $except : $total;
									
									$this.appendTo($target);									
								});		
	}
	
	// 채널 설정 저장
	,evtSubmitChannel:function(form)
	{
		var $datas = $(form).find(".cfg_daumapi_channel_code").filter("[data-channel-code!='']")								// code 거 적용된거 찾아옴
			,cCode = []
			,sCode = []
			,textArr = [];
		
		$.each($datas, function(i, ele){
			var _ele = ele
				,sectionCode = _ele.getAttribute("data-section-code")
				,channelCode = _ele.getAttribute("data-channel-code")
				,text = _ele.textContent||_ele.innerText;
			
			cCode.push(channelCode);
			sCode.push(sectionCode);
			textArr.push(text);
		});
		
		$.post(	"/"
				,{mod:"configuration", act:"daumapiChannelCrt", "sectionCode[]":sCode, "channelCode[]":cCode, "text[]":textArr}
				,function(data,rst){
					if(rst === "success"){
						if(data.result === "success"){
							util.toast(lang.toastSaved);
						}else alert(decodeURIComponent(data.msg));
					}else alert(lang.axError);
				},"json");		
		
		return false;
	}
	
	// 채널 클릭 이벤트
	,evtClickedChannel:function()
	{
		var $form = $("#daumapi_form");
		$("#cfg_daumapi_channel_content").on("click", ".cfg_daumap_channel_btn",
											function(){
												var _this = this
													,$this = $(_this)
													,code = _this.getAttribute("data-code")
													,name = $this.text()
													,$checked = $form.find("input[name='code[]']:checked");
												
												if($checked.length<=0){
													alert(lang.articleRequireSectionCode);
													return false;
												}
												//prop("checked", false)
												$checked.click().nextAll(".cfg_daumapi_channel_code").attr("data-channel-code", code).text(name+" ("+code+")");												
											});
		
		$form.on("click", ".cfg_daumapi_channel_code",
				function(){
					$(this).attr("data-channel-code", "").empty();
					return false;
				});
	}

	// 섹션 추가
	,addExceptSection:function(){
		var $textarea = $("#cfg_daumapi_except_section")
			,$box = $("#article_median_sections_box")
			,pos = $textarea.position()
			,posX = pos.left
			,posY = pos.top
			,width = $textarea.outerWidth();

		$textarea.click(function(){
			$box.css({"top":(posY-30)+"px","left":(width+posX+10)+"px"}).show();
		});

		$box.find(".article_median_sections_a").click(function(){
			var code = $(this).parent("li").attr("data-code")
				,result = "";
			if(code){
				var val = $textarea.val();
				if(val.indexOf(code)<0){
					result = val+","+code;
				}else{
					if(!window.confirm("같은 코드가 존재합니다. 삭제할까요?")) return false;
					result = val.replace(code,"");
				}
				$textarea.val(result.replace(/^,+|,+$|\s+/,"").replace(/,{2,}/,","));					
			}
			return false;
		})
		.end().find("#article_median_section_btn_close").click(function(){ $box.hide(); });
	}
		
};


/*****************************************************************************
편집 화면 sortable - 2012.12.26 대대적 수정본
*****************************************************************************/
var editSortable={
	vars :{
		menubar : {top:25, right:40, bottom:80, left:40}																		// 메뉴바영역 크기 - 마우스 포인터가 지나가도 메뉴 위라면 사라지지 않게 영역 확보-css hover로 교체하여 거의 안씀.나중을위해 남겨놓음
		,zIndex : 0																												// 해당 메뉴의 z-index
		,selectedGroupCode : ""																									// 선택된 그룹 코드
		,panType : "MAIN"																										// 꾸밈판 타입(서브꾸밈들도 많을테니까)
		,panInfo : ""																											// 꾸밈판 종류 (MAIN 메인꾸밈, PAGE 기사뷰,리스트등 페이지 꾸밈, MOBILE 모바일, NEWSLETTER 뉴스레터)
		,layerBox :  '<div class="edit_layer_box">'																				// 레이어 띄우는데 기본박스안에 컨텐츠 없음
				+  '	<div class="edit_layer_close_box"><a href="javascript:void(0);" class="icon_bullet ib_0_1200 edit_layer_close" title="<!--[close]-->"></a></div>'
				+  '	<div class="edit_layer_frame"><!--[src]--></div>'
				+  '</div>'
		,layerBoxIframe :  '<div class="edit_layer_box">'																		// 레이어 띄우는데 기본박스-iframe
						+  '	<div class="edit_layer_close_box"><a href="javascript:void(0);" class="icon_bullet ib_0_1200 edit_layer_close" title="<!--[close]-->"></a></div>'
						+  '	<div class="edit_layer_frame"><iframe id="edit_layer_frame" name="edit_layer_frame" src="<!--[src]-->" frameborder="0" width="100%" height="<!--[height]-->"></iframe></div>'
						+  '</div>'
	}

	// sort 이벤트 줄 영역 부모객체의 selector 
	,evtTarget : {
		cursor : ".edit_article, .edit_box, .edit_html, .edit_banner"															// 바꿀 포인터 커져 셀렉터
		,dragAble : ".edit_drag_able"																							// 드래그가능한 영역
		,areaTarget : ".edit_box, .edit_html, .edit_add, .edit_banner"															// 영역(data-area) attribute가 있는 엘리먼트 
		,viewAreaMenu : ".edit_menu_box, .edit_menu_html, .edit_menu_banner"													// 박스영역 보이기 옵션시 선택자
		,over : ".edit_box,.edit_box_title,.tab_content,.edit_box_tab,.edit_html,.edit_article,.edit_autobox,.edit_banner"		// 메뉴나오는 오버객체들
		,buttons : ".em_event_btn"																								// 메뉴 클릭할 버튼 class
		,sync : [".drag_sync1",".drag_sync2", ".drag_sync3", ".drag_sync4", ".drag_sync5", ".drag_sync6",".drag_mobile"]														// 서로 영역간 왔다리 갓다리 할 수 있는 영역 (배열로 여러개 [".drag_260",".drag_980",...]) - mobile : .drag_mobile
		,standAlone : ".drag_alone"																								// 독립적인 영역, 자신의 영역에서만 움직일 수 있음 (다수의 selector) - drag_alone 은 아무곳이나 가져다 쓸려고 만듦
		,groupMenu : ".edit_menu_grouping"																						// group menu
		,groupMarkFilter : "[data-edit-type='auto']"																			// grouping 할때 표시할 박스 조건
		,fixOutlinebox : ".edit_autobox, .edit_box_title"																		// 안의 컨텐츠가 글자수가 많아 비정상적으로 넓어질때 상위 박스 크기로 맞춤
	}
		
	// 수정/삭제 박스보이나?(N:DOM에 없는상태, S:DOM에 있고,보이는 상태, H:DOM에 있지만 안보이는 상태);
	,stateView : "N"

	// 현재 sortable 상태(N:이벤트없는 상태, S:start, E:end, R:remove)
	,state : "N"
		
	// grouping 메뉴박스 보이나?
	,stateGrouping : "N"
	
	// 덧붙일 html tags
	,html:{
		 box : ""																	// 일반박스
		,boxTab : ""																// 탭박스
		,boxDan : ""																// 박스내 단
		,article : ""																// 기사
		,html : ""																	// html 박스
		,banner : ""																// 배너
		,title : ""																	// 제목 입력 가능하게한 박스는 제목 수정 버튼 나오게
		,autoBox : ""																// 오토박스 덩어리
		,grouping : ""																// 오토박스끼리 기사 연결되게 묶음
	}

	// 추가할 이벤트
	,$target:{
		article : null																// 이벤트 먹일 기사 셀렉터
		,box : null																	// 이벤트 먹일 박스 셀렉터
		,html : null																// html
		,autobox : null																// 이벤트 먹일 자동박스
		,banner : null																// 배너
		,menuBoxArticle : null														// 생성된 편집 기사 메뉴
		,rcBtn : {																	// 리모콘 버튼
					editMode : null
					,displayArea : null
					,grouping : null												// grouping - 자동박스 기사 연결
					,preview : null													// 미리보기 
				 }
		,grouping : null															// 생성된 grouping elements
		,outline : {}
		
		,currentBox : {																// 비동기적 추가,수정,삭제시 현재 객체를 미리 담아둠
						html : null													// html box
						,box : null													// 기사 box
						,banner : null												// 배너
					}										
	}
		
	// - 버튼 html
	,makeHtml:function()
	{
		var box = '<div class="edit_button_box edit_menu_box" data-type="box">'
						+'	<span class="edit_left em_mark_box"></span>'	
						+'	<span class="edit_left">'
						+'		<a href="" class="main_bullet mb_0_660 em_event_btn em_btn_modify" data-mode="modify" data-type="box" title="'+lang.editcfgBoxModify+'"></a>'					
						+'		<a href="" class="main_bullet mb_0_690 em_event_btn em_btn_delete" data-mode="delete" data-type="box" title="'+lang.editcfgBoxDelete+'"></a>'
						+'	</span>'
						+'	<span class="edit_right">'
						+'		<a href="" class="main_bullet mb_0_720 em_event_btn em_btn_add_html" data-mode="create" data-type="html" title="'+lang.editcfgHtmlAdd+'"></a>'
						+'		<a href="" class="main_bullet mb_0_750 em_event_btn em_btn_add_banner" data-mode="create" data-type="banner" title="'+lang.editcfgBannerAdd+'"></a>'
						+'		<a href="" class="main_bullet mb_0_780 em_event_btn em_btn_add_box" data-mode="create" data-type="box" title="'+lang.editcfgBoxAdd+'"></a>'
						+'		<a href="" class="main_bullet mb_0_810 em_event_btn em_btn_reload_box" data-mode="reload" data-type="reload" title="'+lang.editcfgBoxReload+'"></a>'
						+'	</span>'
						+'</div>'
			,boxTab = '<div class="edit_button_box edit_menu_box_tab" data-type="boxTab">'
						+'	<span class="edit_left">'
						+'		<a href="" class="main_bullet mb_0_660 em_event_btn em_btn_modify" data-mode="modify" data-type="boxTab" title="'+lang.editcfgTabModify+'"></a>'					
						+'		<a href="" class="main_bullet mb_0_690 em_event_btn em_btn_delete" data-mode="delete" data-type="boxTab" title="'+lang.editcfgTabDelete+'"></a>'
						+'	</span>'
						+'	<span class="edit_right">'
						+'		<a href="" class="icon_bullet ib_100_0 em_event_btn em_btn_add_html" data-mode="create" data-type="boxTab" title="'+lang.editcfgTabAdd+'"></a>'
						+'	</span>'
						+'</div>' //main_bullet mb_0_780
			// 박스내 단의 추가 버튼
			,boxDan = '<div class="edit_button_box edit_menu_box_dan" data-type="boxDan">'
						+'	<span class="edit_right">'
						+'		<a href="" class="main_bullet mb_166_600 em_event_btn em_in_btn_create" data-mode="create" data-type="boxDan" title="'+lang.editcfgAutoboxAdd+'"></a>'
						+'	</span>'	
						+'</div>'
			,article = '<div class="edit_button_box edit_menu_article" data-type="article">'
						+'	<span class="edit_left edit_vertical_right">'
						+'		<!--|||--><a href="" class="main_bullet mb_0_640 em_event_btn em_btn_modify" data-mode="modify" data-type="article" title="'+lang.editcfgArticleModify+'"></a><!--'					
						+'		--><a href="" class="main_bullet mb_332_640 em_event_btn em_btn_delete" data-mode="delete" data-type="article" title="'+lang.editcfgArticleDelete+'"></a><!--'
						+'		--><!--//|||--><a href="" class="main_bullet mb_166_640 em_event_btn em_btn_add_article" data-mode="create" data-type="article" title="'+lang.editcfgArticleAdd+'"></a>'
						+'	</span>'
						+'</div>'/* <!--|||-->~<!--//|||--> 는 수동비슷한 기사 일때, 수정,삭제 버튼 안나오게 할려고 하는거임*/
			,autobox = '<div class="edit_button_box edit_menu_autobox" data-type="autobox">'
						+'	<span class="edit_right edit_vertical_left">'
						+'		<a href="" class="main_bullet mb_0_620 em_event_btn em_btn_modify" data-mode="modify" data-type="autobox" title="'+lang.editcfgAutoboxModify+'"></a><!--'					
						+'		--><a href="" class="main_bullet mb_332_620 em_event_btn em_btn_delete" data-mode="delete" data-type="autobox" title="'+lang.editcfgAutoboxDelete+'"></a><!--'
						+'		--><a href="" class="main_bullet mb_166_620 em_event_btn em_btn_add_article" data-mode="create" data-type="autobox" title="'+lang.editcfgAutoboxAdd+'"></a>'
						+'	</span>'
						+'</div>'
			,html = '<div class="edit_button_box edit_menu_html" data-type="html">'
						+'	<span class="edit_left em_mark_html"></span>'	
						+'	<span class="edit_left">'
						+'		<a href="" class="main_bullet mb_0_660 em_event_btn em_btn_modify" data-mode="modify" data-type="html" title="'+lang.editcfgHtmlModify+'"></a>'					
						+'		<a href="" class="main_bullet mb_0_690 em_event_btn em_btn_delete" data-mode="delete" data-type="html" title="'+lang.editcfgHtmlDelete+'"></a>'
						+'	</span>'
						+'	<span class="edit_right">'
						+'		<a href="" class="main_bullet mb_0_720 em_event_btn em_btn_add_html" data-mode="create" data-type="html" title="'+lang.editcfgHtmlAdd+'"></a>'
						+'		<a href="" class="main_bullet mb_0_750 em_event_btn em_btn_add_banner" data-mode="create" data-type="banner" title="'+lang.editcfgBannerAdd+'"></a>'
						+'		<a href="" class="main_bullet mb_0_780 em_event_btn em_btn_add_box" data-mode="create" data-type="box" title="'+lang.editcfgBoxAdd+'"></a>'
						+'	</span>'
						+'</div>'
			,banner = '<div class="edit_button_box edit_menu_banner" data-type="banner">'
						+'	<span class="edit_left em_mark_banner"></span>'	
						+'	<span class="edit_left">'
						+'		<a href="" class="main_bullet mb_0_660 em_event_btn em_btn_modify" data-mode="modify" data-type="banner" title="'+lang.editcfgBannerModify+'"></a>'					
						+'		<a href="" class="main_bullet mb_0_690 em_event_btn em_btn_delete" data-mode="delete" data-type="banner" title="'+lang.editcfgBannerDelete+'"></a>'
						+'	</span>'
						+'	<span class="edit_right">'
						+'		<a href="" class="main_bullet mb_0_720 em_event_btn em_btn_add_html" data-mode="create" data-type="html" title="'+lang.editcfgHtmlAdd+'"></a>'
						+'		<a href="" class="main_bullet mb_0_750 em_event_btn em_btn_add_banner" data-mode="create" data-type="banner" title="'+lang.editcfgHtmlAdd+'"></a>'
						+'		<a href="" class="main_bullet mb_0_780 em_event_btn em_btn_add_box" data-mode="create" data-type="box" title="'+lang.editcfgBoxAdd+'"></a>'
						+'	</span>'
						+'</div>'
			// 제목 입력 가능하게 한 박스는 제목 수정 버튼 나오게
			,title = '<div class="edit_button_box edit_menu_title" data-type="title">'
						+'	<span class="em_title_in_btn"><a href="" class="main_bullet mb_0_600 em_event_btn em_in_btn_modify" data-mode="modify" data-type="title" title="'+lang.editcfgBoxTitleModify+'"></a></span>'	
						+'</div>'
			,grouping = '<div class="edit_button_box edit_menu_grouping" data-type="grouping">'
						+'	<span class="edit_left"><span class="edit_menu_box_title">box title</span></span>'
						+'	<span class="edit_right"><a href="" class="em_event_btn em_in_btn_grouping" data-mode="group" data-type="grouping" title="'+lang.editRcGrouping+'"></a></span>'	// data-mode : group-실행, release-해제
						+'</div>';
		
		this.html.box = box;
		this.html.boxTab = boxTab;
		this.html.boxDan = boxDan;
		this.html.article = article;
		this.html.html = html;		
		this.html.title = title;		
		this.html.autobox = autobox;		
		this.html.banner = banner;	
		this.html.grouping = grouping;		
	}
		
	// 데이타 적당히 만듬
	,makeData:function($obj, mode, type, data)
	{
		$obj.attr("href","javascript:void(0);"); 					// 나중에 필요없음 삭제!!!
	
		var params = {}
			,reqUrl = encodeURI(location.search.replace(/^\?/,""));
		
		// 뉴스레터 꾸밈일때는 배너 삽입 금지
		if(type=="banner" && this.vars.panInfo=="NEWSLETTER"){
			alert(lang.newsletterDisableEditExp);
			return false;
		}
		
		switch(mode){
			// 삽입 ------------------------------------------------------
			case "create":			
				switch(type){
					case "html":
					case "box":
					case "banner":
						params = {
									 mod : "edit"
									,act : data.actCreate[type]
									,section : data.section
									,area : data.area
									,area_size : data.areaSize
									,target_step : data.targetStep
								};
					break;
					case "boxTab":
						params = {
									 mod : "edit"
									,act : data.actCreate[type]
									,section : data.section
									,area : data.area
									,box_skin_idxno : data.boxSkinIdxno
									,tab_idxno : data.tabIdxno
								};
					break;
					case "autobox":
					case "boxDan":
						params = {
									 mod : "templateSkin"
									,act : data.actCreate[type]
									,section : data.section
									,content_idxno : data.contentIdxno
									,box_skin_idxno : data.boxSkinIdxno
									,box_skin_size : data.boxSkinSize
								};
					break;
					case "article":
						if(data.editType == "auto"){
							params = {
										 mod : "edit"
										,act : data.actCreate[type]
										,display_idxno : data.displayIdxno
										,area_idxno : data.areaIdxno
										,target_step : data.targetStep
									};
						}else{
							// boxDan 과 같은 parameter
							params = {
										 mod : "templateSkin"
										,act : data.actCreate["boxDan"]
										,section : data.section
										,content_idxno : data.contentIdxno
										,box_skin_idxno : data.boxSkinIdxno
										,box_skin_size : data.boxSkinSize
										,data_type : "N"					// default "A" 강제로 직접입력(N)으로 파라미터 전달
									};
						}
					break;
					default:
						alert("헐~ 아직 ㅡㅡ;");
						return false;
					break;
				}
			break;
			
			// 수정 ------------------------------------------------------
			case "modify":
				switch(type){
					case "html":	
						params = {
									 mod : data.modModify
									,act : data.actModify
									,section : data.section
									,area : data.area
									,idxno : data.idxno
								};
					break;
					case "box":
					case "banner":
						params = {
									 mod : data.modModify
									,act : data.actModify
									,section : data.section
									,area : data.area
									,idxno : data.idxno
									,edit_idxno : data.editIdxno
									,area_size : data.areaSize
								};
					break;
					case "boxTab":
						params = {
									 mod : data.modModify
									,act : data.actModify
									,section : data.section
									,area : data.area
									,idxno : data.idxno
									,edit_idxno : data.editIdxno
								};
					break;
					case "title":
						// 박스 제목 수정은 따로 idxno 를 구해야 한다. - 수정및 추가						
						var idxno = $obj.closest(".edit_box_title").attr("data-idxno");
						var d_num = $obj.closest(".edit_box_title").attr("data-num");
						
						params = {
									 mod : data.modModify
									,act : "boxContentUptForm"
									,section : data.section
									,area : data.area
									,idxno : idxno
									,edit_idxno : data.editIdxno
									,d_num : d_num
								};
					break;
					case "autobox":
						params = {
									mod : data.modModify
									,act : data.actModify
									,section : data.section
									,content_idxno : data.contentIdxno
									,display_idxno : data.displayIdxno
									,area_idxno : data.areaIdxno
									,box_skin_size : data.boxSkinSize
									,data_type : "A"
								};
					break;
					case "article":
						// 기사는 자동/수동 구분해야
						if(data.editType=="auto"){
							params = {
										 mod : data.modModify
										,act : data.actModify
										,idxno : data.idxno
										,area_idxno : data.areaIdxno
										,display_idxno : data.displayIdxno
									};
						}else{
							params = {
										 mod : data.modModify
										,act : data.actModify
										,section : data.section
										,content_idxno : data.contentIdxno
										,display_idxno : data.displayIdxno
										,area_idxno : data.areaIdxno
										,box_skin_size : data.boxSkinSize
										,data_type : "N"
									};
						}
					break;
					default:
						alert("헐~ 아직 ㅡㅡ;");
						return false;
					break;
				}
			break;
			
			// 삭제 ------------------------------------------------------
			case "delete":
				
				switch(type){
					case "html":
						params = {
									 mod : data.modDelete
									,act : data.actDelete
									,section : data.section
									,event_table : data.eventTable
									,edit_idxno : data.editIdxno
									,area : data.area
									,idxno : data.idxno
									,req_url : reqUrl
								};
					break;
					case "box":	
					case "banner":
						params = {
									 mod : data.modDelete
									,act : data.actDelete
									,section : data.section
									,event_table : data.eventTable
									,edit_idxno : data.editIdxno
									,req_url : reqUrl
								};
					break;
					case "boxTab":
						params = {
									 mod : data.modDelete
									,act : data.actDelete
									,section : data.section
									,event_table : data.eventTable
									,edit_idxno : data.editIdxno
									,idxno : data.idxno
									,req_url : reqUrl
								};
					break;
					case "article":
						if(data.editType == "auto"){
							params = {
										mod : data.modDelete
										,act : data.actDelete
										,idxno : data.idxno
										,req_url : reqUrl
									};
						}else{
							params = {
										mod : data.modDelete
										,act : data.actDelete
										,section : data.section
										,display_idxno : data.displayIdxno
										,area_idxno : data.areaIdxno
										,req_url : reqUrl
									};
						}
					break;
					case "autobox":
						if(LOGIN_ID!=="ndsoft" && data.autobox=="auto"){//  기타 아이디이고 자동규칙이 적용되어 있다면 못 지우게
							alert("자동박스 규칙이 적용되어 있습니다. 삭제시 NDSoft에 문의해 주세요.");
							return false;
						}
						params = {
									mod : data.modDelete
									,act : data.actDelete
									,section : data.section
									,display_idxno : data.displayIdxno
									,area_idxno : data.areaIdxno
									,req_url : reqUrl
								};
					break;
					default:
						alert("헐~ 아직 ㅡㅡ;");
						return false;
					break;
				}
			break;
			
			// 갱신 ------------------------------------------------------
			case "reload":
				params = {				
						mod : "edit"
						,act : "reloadData"
						,area_idxno : data.areaIdxno
						,edit_idx : data.editIdxno
					};
			break;
		}
		
		return params;
	}
	
	/**
	 * 메뉴에 이벤트 넣음
	 * @params
	 * obj : 현재 객체
	 * 
	 * 나중에 ajax로 교체
	 */
	,makeMenuLink:function(obj)
	{
		if(!obj) return ;
		
		var $obj = $(obj)		
			,mode = $obj.attr("data-mode")																				//	수정,삭제,입력인가?
			,type = $obj.attr("data-type")																				// 박스,html,배너...?
			,$parent = $obj.closest(".edit_button_box")																	// 버튼 박스에서 type찾음 - 상위 데이타 몰려있는 div찾기 위함
			,parentType = ""
			,$dataBox = null;
	
		// box title의 수정일경우 수정할 객체의 edit_box 객체를 찾는다. 
		// 데이타 집함 div
		if(type == "title" || type=="reload") 
			$dataBox = $parent.closest(".edit_box");
		else if(type=="boxTab"){
			$dataBox = $parent.closest(".edit_tab").find(".tab_content.on");											// tab box
		}else if(type=="boxDan"){																						// 일반 박스의 단안의 내용추가
			if($parent.parent().parent().is(".edit_box_tab")) 
				$dataBox = $parent.closest(".edit_box_tab");															// 탭안의 단 내용 추가
			else if($parent.parent().parent().is(".edit_box_title")) 													// 일반박스 안의 단 내용 추가
				$dataBox = $parent.closest(".edit_box_title");
		}else{
			parentType = $parent.attr("data-type");
			$dataBox = $parent.closest(".edit_" + parentType);	
		}																
		
		// 데이타 모음
		var data = {
						 	 modModify : $dataBox.attr("data-mod-modify") || ($dataBox.attr("data-tab-mod-modify")||"")
							,modDelete : $dataBox.attr("data-mod-delete") || ($dataBox.attr("data-tab-mod-delete")||"")
							,actCreate : {																								// create 고정 되었잖아...
													 box : "boxSkinList"																// 박스 삽입
													,boxTab : "boxContentAddForm"
													,boxDan : "editTemplate"
													,autobox : "editTemplate"															// 자동박스-boxDan과 같음
													,article : "articleDataCrtForm"														// 기사삽입
													,html : "htmlCrtForm"																// html 삽입
													,banner : "bannerList"																// 배너
												}
							,actModify : $dataBox.attr("data-act-modify") || ($dataBox.attr("data-tab-act-modify")||"")
							,actDelete : $dataBox.attr("data-act-delete") || ($dataBox.attr("data-tab-act-delete")||"")	
							,section : $dataBox.attr("data-section") || ($dataBox.attr("data-tab-section")||"")
							,area : $dataBox.attr("data-area") || ($dataBox.attr("data-tab-area")||"")
							,editIdxno : $dataBox.attr("data-edit-idxno") || ($dataBox.attr("data-tab-edit-idxno")||"")
							,eventTable : $dataBox.attr("data-event-table") || ($dataBox.attr("data-tab-event-table")||"")
							,boxSkinIdxno : $dataBox.attr("data-box-skin-idxno") || ($dataBox.attr("data-tab-box-skin-idxno")||"")
							,boxSkinSize : $dataBox.attr("data-box-skin-size") || ""
							,idxno : $dataBox.attr("data-idxno") || ($dataBox.attr("data-tab-idxno")||"")
							,areaSize : $dataBox.attr("data-area-size") || ""
							,titleUsed : $dataBox.attr("data-title") || "false"
							,targetStep : $dataBox.attr("data-target-step") || ""	
							,tabIdxno : $dataBox.attr("data-tab-tab-idxno") || ""	
							,contentIdxno : $dataBox.attr("data-content-idxno") || ""
							,tabLimit : parseInt($dataBox.attr("data-tab-limit"), 10) || 0												// tab box tab 제한갯수
							,displayIdxno : $dataBox.attr("data-display-idxno") || ""
							,areaIdxno : $dataBox.attr("data-area-idxno") || ""
							,editType : $dataBox.attr("data-edit-type") || ""
							,autobox : $dataBox.attr("data-autobox") || "manual"
						  };
		
		// 데이타 만듬
		var params = this.makeData($obj, mode, type, data);
		
		if(params===false) return ;
		
		// box, html, banner 새로 만들어질때 해당 객체로 스크롤 이동을 위해
		editContents.vars.isTarget =  (type=="html" || type=="box" || type=="banner") ? true : false;
		
		// 비동기적 추가,수정,삭제를 위해 현재 객체 담아둠
		if(type == "html") this.$target.currentBox.html = $dataBox;
		else if(type == "banner") this.$target.currentBox.banner = $dataBox;
		else{
			// 기사관련은 모두 박스전체를 갈아치운다. - .edit_box 찾음, 여기서 필요한 section, idxno, area 값을 가져옴
			var $currentBox = $dataBox.is(this.evtTarget.areaTarget) && $dataBox || $dataBox.closest(this.evtTarget.areaTarget);
			this.$target.currentBox.box = {
											target : $currentBox
											,data : {
														idxno:$currentBox.attr("data-edit-idxno")||""
														,area:$currentBox.attr("data-area")||""
														,areaSize:$currentBox.attr("data-area-size")||""
														,section:$currentBox.attr("data-section")||""
													}
											};
		}
	
		if(mode == "delete") this.deleteBox($dataBox, params);
		else{
			
			// 탭 박스이고 탭 추가일경우, 탭제한수 넘으면 경고
			if(type == "boxTab" && mode == "create"){
				if(data.tabLimit <= parseInt($dataBox.prevAll(".tab_menu").children(".tab_item").length, 10)){
					util.toast(lang.editcfgTabMaxError);
					return false;
				}
			}else if(type == "reload"){
				this.sendReloadAutobox(params);
				return false;
			}
			
			// 버튼 클릭시
			var url = "/?"+$.param(params);
			//this.clickedButton((data.editType.length>0?params:url)); // editType이 있다면, post로 전송 
			this.clickedButton(url);
			
			return false;
		}		
	}
	
	// html text 교체
	,replaceLayerHtmlTag:function(html, close, src, height)
	{
		return html.replace("<!--[close]-->", close||"")
					.replace("<!--[src]-->", src||"")
					.replace("<!--[height]-->", height||"");
	}
	
	/*
	 * 프레임 레이어
	 * post로 날릴때는 값을 json형태로 넣음
	 */
	,clickedButton:function(url)
	{
		var type = (typeof url === "object");
		
		if(type) url="about:blank";
		
		var height = 610
		,browserHeight = (window.innerHeight-100)||(window.screen.height-200);
		if(browserHeight>height) height = browserHeight;
		
		if(url.indexOf("&act=articleDataCrtForm")>0 || url.indexOf("&act=articleDataUptForm")>0) height = 650;
		else if(url.indexOf("&act=boxContentAddForm")>0 || url.indexOf("&act=boxContentUptForm")>0) height = 480;
		else if(url.indexOf("&act=htmlCrtForm")>0 || url.indexOf("&act=htmlUptForm")>0) height = 500;
		
		var width = 1020
			,html = this.replaceLayerHtmlTag(this.vars.layerBoxIframe, lang.close, url, (height-60))
			,parents = this
			,output = "";
		output = $(html).find(".edit_layer_close").click(parents.closeEditLayer).end();
		util.floatLayer(width,height,output);	// layer 띄우기
		
		if(type){
			var form = util.createHiddenForm(url, {method:"post", action:"/?dummy="+url.mod+"-"+url.act,target:"edit_layer_frame"});
			document.body.appendChild(form);
			form.submit();
		}
	}
	
	// 레이어 닫기
	,closeEditLayer:function()
	{
		var parents = editSortable
			,$target = $("#autobox_float_bg, #autobox_float_content").addClass("fade_out");
		setTimeout(function(){
			$target.remove();
			parents.removeAllOutlineBox();									// 영역표시 삭제
		},500);
	}
	
	// delete box
	,deleteBox:function($box, params)
	{
		if(!params) return ;
		// 삭제시 그룹핑 되어있으면 다시 묻기 - 오토박스, (전체박스는 php단에서 에러메시지 보낸다)
		if($box.is(".edit_autobox") && $box.attr("data-group")=="true"){
			if(!window.confirm(lang.editGroupConfirmDelAutobox)) return ;
		}else{
			if(!window.confirm(lang.confirmDelete)) return ;
		}
		
		// tab box 삭제
		var parents = this;
		$.post(	"/?dummy="+params.modDelete+"-"+params.actDelete
					,params
					,function(data, rst){
						if(rst == "success"){
							if(data.result == "success"){
								// remove Tab in Box
								if($box.is(".tab_content")) parents.deleteTabInBox($box);
								
								// 기사 박스 삭제시 전체 박스 갱신
								else if($box.is(".edit_article")) editContents.box.update();
									
								// etc box
								else $box.fadeOut(300, function(){	
									var $parent = $box.parent()									// 없애기 전에 변수에 미리 저장
										,doEmptyMsg = $box.is(".edit_autobox, .edit_article");	// 박스내 자동박스일때 메시지 출력, 나머진 그냥 없어지면 됨
									
									$box.remove();												// 삭제
									
									if(doEmptyMsg){
										var $finder = $parent.find(".edit_autobox, .edit_article");
										if($finder.length<=0){
											$parent.html('<div class="edit_box_empty_content">'+lang.editRequireBoxEmptyContent+'</div>');
										}
									}
								});
								
								parents.removeAllOutlineBox();									// 영역표시 삭제
								
							}else if(data.result == "error"){
								alert(decodeURIComponent(data.msg));
							}
						}else alert(lang.axError);
					},"json");
	}
	
	// 탭박스 삭제 - 해당 탭박스 / 타이틀 삭제후 남은 첫번째 메뉴 삭제
	,deleteTabInBox:function($box)
	{
		var $parent = $box.closest(".edit_tab")
			,$menu = $parent.find(".tab_menu")
			,$boxes = $parent.find(".tab_content")
			,index = parseInt($boxes.index($box),10);												// 삭제할 인덱스번호
		
		if($boxes.length <= 1){
			alert(lang.editRequireRemoveTabLength);
			return false;
		}
		
		$menu.children("li:eq("+index+")").remove();												// 메뉴없애고
		$parent.find(".tab_menu").children("li:first").addClass("on"); 								// 첫번째 메뉴 디폴트로 선택 - $menu에 저장된 것은 삭제된 객체를 포함하기 때문에 현재 남아있는 객체들과 차이가 있음. 그래서 새로 찾음
		
		$box.remove();																				// 탭 박스 삭제
		$parent.find(".tab_content").filter(":first").addClass("on");								// 첫번째 탭 박스 선택	
		
		// 탭사라지면 퍼지게
		blast.exe($parent);
	}
	
	// 자동박스 갱신
	,sendReloadAutobox:function(params)
	{
		$.get(	"/"
				,params
				,function(data,rst){
					if(rst === "success"){
						if(data.result === "success"){
							editContents.box.update();
							util.toast(lang.editAutoboxToastReload);
						}else alert(decodeURIComponent(data.msg));
					}else alert(lang.axError);
				},"json");
	}
	
	// init
	,init:function()
	{					
		editSortable.$target.article = $(".edit_inner_content");
		editSortable.$target.box = $(".edit_box");	
		editSortable.$target.html = $(".edit_html");	
		editSortable.$target.autobox = $(".edit_autobox");
		editSortable.$target.banner = $(".edit_banner");
		editSortable.vars.panType = editSortable.$target.box.attr("data-section");
		this.vars.panInfo = $("#edit_remote_control").attr("data-section-type")||"";
	}

	// clicked
	,exe:function(/*$button*/)
	{
		var state = editSortable.state;

		//$button = String(this.tagName).toLowerCase() == "button" ? $(this) : $button;		// button element
		
		// 객체 찾기
		if(!editSortable.$target.article)
			editSortable.init();
		
		/*
		# drag event 
		# cursor 바뀌게 하는것. 이게 속도가 너무 안나와서 sortable 이벤트 줄때 직접 class 줬다,뺏음
		$cursor = editSortable.$target.box.add($(".edit-article").filter(":parent:has(.edit-box) > .edit-article"));
		N : $cursor.addClass("cursor-move");
		S : $cursor.removeClass("cursor-move");
		*/
		switch(state){
			// 이벤트 먹임(start) or restart
			case "N":

				// 이미 영역표시로 메뉴가 켜져있다면 없앰
				if(editSortable.$target.menuBoxArticle!==null && editSortable.stateView=="S") 
					editSortable.hideView();
				
				try{
					editSortable.restartEvtDrag();
				}catch(e){;
					editSortable.addEvtDrag();
				}
				
				state = "S";
				
				// mouseenter, mouseout event로 메뉴 생성
				editSortable.addEvtOverToDisplay("on");
				editSortable.evtRemoveOutlineBox("on");				// 범위넘어선 아웃라인 제거
			break;
			
			// 중지
			case "S":
				editSortable.stopEvtDarg();
				state = "N";
								
				// 해제
				editSortable.addEvtOverToDisplay("off");
				editSortable.evtRemoveOutlineBox("off");			// 범위넘어선 아웃라인 event 제거
				editSortable.removeAllOutlineBox();
			break;
		}
		
		// 버튼 상태
		editSortable.state = state; // 상태저장, 값이 없으면 현재 상태저장
	}

	/**
	 * 이벤트추가
	 * 타겟을 여기서 정해줌
	 */
	,addEvtDrag:function()
	{		
		// sortable
		var parents = this
			,$editArticle = parents.$target.article
			,$editBox = parents.$target.box
			,$editAutobox = parents.$target.autobox
			,$editBanner = parents.$target.banner
			,innerContent = ".edit_inner_content";
		
		// button text
		parents.viewEventToggle("OFF", "S", "on");
	
		// === add event === //
		// box
		$editArticle.sortable({
							cancel : ".edit_drag_disable"
							,items:".edit_box"+parents.evtTarget.dragAble+", .edit_html"+parents.evtTarget.dragAble+", .edit_banner"+parents.evtTarget.dragAble	// 첫번째 disable 객체는 꿈쩍도 안하게
							,opacity : .7
							,create:function(event, ui){
								var $this = $(this)
									,$parent = $(event.target.parentElement)||$this.parent();//상위 부모객체
						
								// left + right = 왔다리 갔다리 할수 있게
								if($parent.is(parents.evtTarget.sync.join(","))){
									// sync에 있는 모든 클래스가 서로 왔다갔다 할수 있게.
									// $this.sortable("option", "connectWith", parents.evtTarget.sync.join(" "+innerContent+",")+" "+innerContent);
									
									// 같은 class영역끼리만 움직일수 있게...해당 class에 맞는 connectWith를 걸어준다.
									var clss = "."+$parent.attr("class").replace(/^(.*|\s)?(drag_.*)($|\s)?/i,"$2").replace(/^\s+|\s+$/g,"");
									if($.inArray(clss, parents.evtTarget.sync)>=0){
										$this.sortable("option", "connectWith", clss+" "+innerContent);
									}
								}
								// center + 기타 왔따리 같따리 하지 않아도 되는 부분
								else if($parent.is(parents.evtTarget.standAlone)){									
									$this.sortable("option", "axis", "y");
								}
								/*
								// right
								else if($parent.hasClass("layout-right")){
									$this.sortable({connectWith:".layout-left .edit_inner_content", revert:400});
								}
								*/
							}
							
							// start, stop 이동시 백그라운드 색상
							,start:function(event, ui){
								parents.evtDragStart(event, ui, parents);
							}
							,stop:function(event, ui){
								parents.evtDragStop(event, ui, parents);		
							}					
							,update:function(event, ui){							// 순서 바꿀때 이벤트
								// 만약 다른쪽 영역(connectWith된 영역)에서 온것이라면 2번 전송되는 버그를 피하기 위해, 현재 객체와 부모객체가 같다면 무시.
								if(ui.sender){
									if (this === ui.item.parent()[0]) return ;
								}
								parents.endDropUpdatePosition(event, ui, parents);
							}
							,receive:function(event, ui){
								// update인데, connectWith되어 다른쪽 영역으로 이동된 후의 이벤트
							}
						});

		// box 내 드래그 요소
		$editBox.sortable({
							cancel : ".edit_drag_disable"
							,items:".edit_autobox"+parents.evtTarget.dragAble+", .edit_article"+parents.evtTarget.dragAble+"[data-edit-type='manual']"		// .edit_box내 .edit_autobox와 그 옆 .edit_article(수동 생성 기사)에게만 우선 먹임
							,opacity : .7
							,axis : "y"
							// start, stop 이동시 백그라운드 색상
							,start:function(event, ui){
								parents.evtDragStart(event, ui, parents);
							}
							,stop:function(event, ui){
								parents.evtDragStop(event, ui, parents);
							}					
							,update:function(event, ui){							// 순서 바꿀때 이벤트
								parents.endDropUpdatePosition(event, ui, parents);
							}
						});
		
		// autobox 내 기사 드래그 요소
		$editAutobox.sortable({
								cancel : ".edit_drag_disable"
								,items:".edit_article"+parents.evtTarget.dragAble		// .edit_box내 기사만
								,opacity : .7
								,axis : "y"
								// start, stop 이동시 백그라운드 색상
								,start:function(event, ui){
									parents.evtDragStart(event, ui, parents);
								}
								,stop:function(event, ui){
									parents.evtDragStop(event, ui, parents);
								}					
								,update:function(event, ui){							// 순서 바꿀때 이벤트
									parents.endDropUpdatePosition(event, ui, parents);
								}
							});
		
		// mouse select drag 막음
		$editArticle.add($editBox).add($editAutobox).add($editBanner).disableSelection().find(this.evtTarget.cursor).addClass("cursor_move");
	}
	
	// drop시 순서 바꿈 parents.evtTarget.dragAble .edit_box, .edit_html, .edit_add 
	,endDropUpdatePosition:function(event, ui, parents)
	{		
		var parents = this
			,$context = $(ui.item.context)
			,isDataBox = $context.is(parents.evtTarget.areaTarget)																	// 데이타가 있는 박스 인가?
			//,intervalIndex = isDataBox ? -1 : 0																					// (드래그가능한 영역만 찾으면 되니 주석).edit_box, .edit_html, .edit_banner, .edit_add 일경우 처음 자리 잡고 있는 것이 있어 1부터 시작, .edit_article 은 그런게 없어 0부터 시작(기준 0부터 시작하는걸로)
			,$dataBox = isDataBox?$context:$context.closest(parents.evtTarget.areaTarget)											// 데이타가 있는 박스
			,$siblingsBox = $dataBox.siblings(parents.evtTarget.areaTarget)															// 놓은 자리의 data-area값을 알기위해
			,$dragAbleBox = $context.parent().children(parents.evtTarget.dragAble)													// 같은 level에서 드래그가능한 영역에서만 index 구하기
			,endIndex = $dragAbleBox.index($context)																				// index (예전 : endIndex = $context.index()+intervalIndex)
			,endArea = $siblingsBox.attr("data-area")||""
			,params = {}
			,isReloadBox = false;																									// 박스 새로 불러들일것인가?
		
		// 박스일때,
		if(isDataBox){
			params = {
				mod : "edit"
				,act : "axEditStepSort"
				,currentIdxno : $context.attr("data-edit-idxno")||""
				,targetArea : endArea
				,targetStep : endIndex
			};
		}
		// autobox일때,
		else if($context.is(".edit_autobox, .edit_article[data-edit-type='manual']")){
			params = {
					mod : "edit"
					,act : "axContentStepSort"
					,contentIdxno : $context.attr("data-content-idxno")||""
					,currentIdxno : $context.attr("data-display-idxno")||""
					,targetStep : endIndex
				};
		}
		// autobox내 기사
		else if($context.is(".edit_article[data-edit-type='auto']")){
			params = {
					mod : "edit"
					,act : "axArticleStepSort"
					,areaIdxno : $context.attr("data-area-idxno")||""
					,orginArea : $context.attr("data-orgin-area")||""
					,currentIdxno : $context.attr("data-idxno")||""
					,targetStep : endIndex
				};
			
			isReloadBox = true;
		}
		
		$.post(	"/"
				,params
				,function(data, rst){
					if(rst=="success"){
						if(data.result == "success"){
							$context.attr({"data-area":endArea});																	// ajax 완료후 영역(data-area)가 바뀌었으니 갱신시킴
							
							// 기사 옮길시 박스 모양이 달라질수 있으니 새로 불러들임
							if(isReloadBox===true){
								var oldDataBox = editSortable.$target.currentBox.box;												// 이전에 담긴 박스가 있다면 임시로 담아서 다시 복구해야 함
								editSortable.$target.currentBox.box = {																// 박스지정
																		target : $dataBox
																		,data : {
																					idxno:$dataBox.attr("data-edit-idxno")||""
																					,area:$dataBox.attr("data-area")||""
																					,areaSize:$dataBox.attr("data-area-size")||""
																					,section:$dataBox.attr("data-section")||""
																				}
																		};														
								editContents.box.update();																			// 갱신시킴
								editSortable.$target.currentBox.box = oldDataBox;													
							}
						}
					}else util.logs(lang.axError);
				},"json");
	}

	// 드래그 시작
	,evtDragStart:function(event, ui, parents)
	{
		var $context = $(ui.item.context);													
		$context.addClass("edit_move_color");								
		parents.removeAllOutlineBox();						// 메뉴박스없앰
		parents.addEvtOverToDisplay("off",true);			// 롤오버 이벤트 없앰
	}
	
	// 드래그 종료
	,evtDragStop:function(event, ui, parents)
	{
		var context = ui.item.context
			,$context = $(context);
		$context.removeClass("edit_move_color");
		//parents.wrapOutline(context);						// 메뉴박스 재생성
		parents.addEvtOverToDisplay("on",true);				// 롤오버 이벤트 생성
	}

	// 이벤트 중지
	,stopEvtDarg:function()
	{
		// 삭제,수정등 객체가 변경되었을경우 저장된 객체는 존재하지 않기 때문에 다시 얻어와서 처리함
		try{
			this.$target.article.add(this.$target.box).add(this.$target.autobox).sortable("disable").find(this.evtTarget.cursor).removeClass("cursor_move");// button text
			this.viewEventToggle("ON", "N", "off");
		}catch(e){
			this.init();
			this.stopEvtDarg();
		}		
	}

	// 이벤트 다시 시작
	,restartEvtDrag:function()
	{
		this.$target.article.add(this.$target.box).add(this.$target.autobox).sortable("enable").find(this.evtTarget.cursor).addClass("cursor_move");// button text
		this.viewEventToggle("OFF", "S", "on");
	}

	// 이벤트 제거
	,removeEvtDrag:function()
	{
		this.$target.article.add(this.$target.box).add(this.$target.autobox).sortable("destroy").find(this.evtTarget.cursor).removeClass("cursor_move");// button text
		this.viewEventToggle("ON", "N", "off");
	}
	
	// mouseenter/leave event toggle
	,viewEventToggle:function(btnTxt, state, clickedMenu)
	{
		//this.$target.rcBtn.editMode.text(lang.editRcEditingMode + ""+btnTxt); 	// button text - 안씀
		this.$target.rcBtn.editMode[clickedMenu==="on"?"addClass":"removeClass"]("on").attr("title",lang.editRcEditingMode + " "+btnTxt); //  button text - 사용
		this.state = state; 													// 상태바꿈
		this.evtClickedMenu(clickedMenu);										// 메뉴클릭시 이벤트
	}
	
	// 상위 박스영역만 편집창보이게
	,view:function()
	{
		var state = editSortable.stateView;
		switch(state){
			case "N":
				// 메뉴 이벤트가 걸려 있다면, 없앰 - mouseenter, drag&drop
				if(editSortable.$target.article && editSortable.$target.box && editSortable.$target.banner && editSortable.state=="S"){
					editSortable.stopEvtDarg();
					editSortable.addEvtOverToDisplay("off");
					editSortable.evtRemoveOutlineBox("off");			// 범위넘어선 아웃라인 event 제거
					editSortable.removeAllOutlineBox();
					editSortable.evtClickedMenu("off");					// 메뉴클릭시 이벤트
				}
					
				// 이미 생성되어 있다면 보이기만함
				if(editSortable.$target.menuBoxArticle===null) editSortable.displayView();
				else editSortable.showView();
				
				state = "S";
			break;

			case "S":
				editSortable.removeView();
				state = "N";
			break;
		}

		editSortable.stateView = state;		
	}
	
	// 원본 css의 margin-top: 을 초기화하는 클래스 붙임
	,replaceAreaViewClass:function(v)
	{
		return v.replace("edit_button_box","edit_button_box edit_button_box_nomargin");
	}
	
	// 편집창 append
	,displayView:function()
	{
		if(this.$target.box===null && this.$target.html===null && this.$target.banner===null) this.init();
		
		var $box = this.$target.box
			,$html = this.$target.html
			,$banner = this.$target.banner;
			
		$box.prepend(this.replaceAreaViewClass(this.html.box));
		$html.prepend(this.replaceAreaViewClass(this.html.html));
		$banner.prepend(this.replaceAreaViewClass(this.html.banner));

		this.$target.menuBoxArticle = $box.add($html).add($banner).children(this.evtTarget.viewAreaMenu);  // 감추는데 다시 찾을 필요없게, 미리 담아서 사용
	
		this.showView();
	}

	// 편집창 보이게
	,showView:function()
	{
		this.$target.menuBoxArticle.show();
		this.displayViewEventToggle("OFF", "S", "on");
	}

	// 편집창 안보이게
	,hideView:function()
	{	
		this.$target.menuBoxArticle.hide();
		this.displayViewEventToggle("ON", "N", "off");
	}

	// 편집창 사라지게
	,removeView:function()
	{
		this.$target.menuBoxArticle.remove();
		this.displayViewEventToggle("ON", "N", "off");
		this.$target.menuBoxArticle = null;
	}
	
	// 영역보일시 이벤트 관련 작업들 on/off
	,displayViewEventToggle:function(btnTxt, stateView, clickedMenu)
	{
		//this.$target.rcBtn.displayArea.text(lang.editRcEditingDisplayArea + " "+btnTxt);	// 상대 button text - 안씀
		this.$target.rcBtn.displayArea[clickedMenu==="on"?"addClass":"removeClass"]("on").attr("title",lang.editRcEditingDisplayArea + " "+btnTxt); // 상대 button text - 사용
		this.stateView = stateView;															// 상대 상태
		this.evtClickedMenu(clickedMenu);													// 메뉴클릭시 이벤트
	}
	
	/**
	 *  박스타이틀 수정시 아웃라인 표시
	 *  @params
	 *  $this - 현재 타겟 객체(jquery)
	 *  parent - 감쌀 부모객체(클래스명)
	 *  menu - 생길 메뉴
	 *  
	 *  *** 상위객체가 relative, absolute 일때, 하위 위치의 설정또는 제거가 쉽지않아 css :hover로 변경함.
	 *  *** savePosition(),evtRemoveOutlineBox(),removeAllOutlineBox() 함수 '거의' 필요없음.
	 */
	,outlineForOver:function($this, parent, menu)
	{
		var $box = $this.closest(parent);
		
		// 식별후 메뉴 덧붙임
		// 안의 박스에서 단 나눌때 제목이 있는 것은 수정버튼나오고, 안에 컨텐츠가 없다면 추가 버튼도 나오게.
		if(menu.indexOf("edit_menu_box_dan")>=0){
			if(menu.indexOf("edit_menu_title")>=0 && $this.find("edit_menu_title").length>0) return false;
			//else if(menu.indexOf("edit_menu_box_bottom_title")>=0 && $this.find(".edit_menu_box_bottom_title").length>0) return false;
			else if($box.find(".edit_menu_box_dan").length>0) return false;
		}else if(menu.indexOf("edit_menu_article")>=0){														// 수동비슷한 기사 입력시 기사 수정,삭제 버튼 안나오게 - data-idxno, data-target-step 이 0또는 없다면 그러하다;
			var _dataIdxno = $this.attr("data-idxno")||"0",
				_dataTargetStep = $this.attr("data-target-step")||"0";
			if(_dataIdxno==="0" && _dataTargetStep==="0") menu = menu.replace(/<!--\|\|\|-->(.*)<!--\/\/\|\|\|-->/ig,"");
		}else if($box.children(".edit_box_outline").length>0) return false;
		
		var _w = $box.innerWidth()		
			,_h = $box.innerHeight();
		
		// width값을 정해 놓지 않은 상태에서 안의 컨텐츠의 글자수가 늘어나면 box의 넓이가 비정상적으로 넓어져 메뉴가 밖으로 삐진다. 그걸 막기위해 폭을 박스보다 클경우 박스와 같게 처리함
		if($box.is(this.evtTarget.fixOutlinebox)){
			var editboxWidth = $box.closest(".edit_box").innerWidth();
			if(editboxWidth<_w) _w = editboxWidth;
		}
		
		var _p = $box.position()
			,borderWidth = (menu.indexOf("edit_menu_article")>=0?"0":"1")													// 기사는 나오지 않음
			//,_p = $box.offset()																							// 상위 객체가 relative일때 위치값때문에 절대값을 가져와야 함 
			//,rangeGapTop = ($this.is(".edit_box_tab,.edit_article,.edit_autobox") ? 0 : this.vars.menubar.top)			// 마우스 top 범위 지정 - 마우스 벗어나도 괜찮음
			//,rangeGapRight = (!$this.is(".edit_html") ? this.vars.menubar.right : 0)										// 박스내 기사가 있는 거라면 오른쪽으로 약간 벗어나도 안 없어지게
			//,rangeGapLeft = (!$this.is(".edit_html") ? this.vars.menubar.left : 0)										// 박스내 기사가 있는 거라면 왼쪽으로 약간 벗어나도 안 없어지게
			//,rangeGapBottom = (!$this.is(".edit_html") ? this.vars.menubar.bottom : 0)									// 기사 박스가 메뉴보다 짧을때 어느정도 확보해야 함
			,_t = _p.top - 1
			,_t2 = _t + _h
			,_st = _t-1			// 사용할 top 위치
			,_l = _p.left - 1	
			,_l2 = _l + _w
			,_sl = _l-1			// 사용할 left 위치
			,zIndex = this.vars.zIndex
			,time = new Date().getTime()
			//,articleHeight = $this.outerHeight()																			// 기사자체박스의 높이
			//,rangeMenuBottom = articleHeight>rangeGapBottom?_t2:_t2+(rangeGapBottom-articleHeight)						// 기사 박스가 메뉴 영역보다 작을때 메뉴 클릭도 하기 전에 없어지니 영역 확보 
			,$top = $("<div />").addClass("edit_box_outline horizon btn_top_"+time).css({"width":_w, "top":_st,"left":_l, "border-bottom-width":borderWidth+"px", "z-index":zIndex}).append(menu)
			,$bottom = $("<div />").addClass("edit_box_outline horizon btn_bottom_"+time).css({"width":_w, "top":_t2,"left":_l, "border-top-width":borderWidth+"px", "z-index":zIndex})
			,$left = $("<div />").addClass("edit_box_outline vertical btn_left_"+time).css({"height":_h, "top":_t,"left":_sl, "border-right-width":borderWidth+"px", "z-index":zIndex})
			,$right = $("<div />").addClass("edit_box_outline vertical btn_right_"+time).css({"height":_h, "top":_t,"left":_l2, "border-left-width":borderWidth+"px", "z-index":zIndex});
		
			// 모바일편집에서는 버튼이 안쪽에 생기게 처리함-역시 relative, absolute 상위 객체때문에...모두 안으로 버튼 들어가게...
			/*if($box.attr("data-section")=="MOBILE"){
				$top.find(".edit_menu_autobox").addClass("inner").end().find(".edit_menu_article").addClass("inner");
			}*/
		
			$top.add($bottom).add($left).add($right).appendTo($box); 
			// ---> ie를 제외한 것은 absolute로 덮으면 아래 객체에 접근할수가 없다. 그래서 따로 만들어서 합침
			
			// 저장 - js 위치값 할때는 주석해제..
			// this.savePosition(time, {x1:_sl-rangeGapLeft, y1:_st-rangeGapTop, x2:_l2+rangeGapRight, y2:rangeMenuBottom});
			
			return time;
	}
	
	/**
	 * object 생성
	 * key:{x1:시작X축, y1:시작y축, x2:끝X축, y2:끝y축} 
	 */
	,savePosition:function(key, data)
	{
		if(!key) return false;
		
		// 저장
		this.$target.outline[key] = data;
	}
	
	/**
	 * 저장된 것중 마우스 범위가 벗어난 객체 삭제
	 */
	,evtRemoveOutlineBox:function(onOff)
	{
		var parents = this
			,$body = $(document.body);
		
		if(onOff=="off") $body.off("mouseover");
		else{
			/*
			$body.mousemove(function(event)
							{
								var stacks = parents.$target.outline
									,evt = event || window.event
									,x = evt.pageX||evt.clientX
									,y = evt.pageY||evt.clientY;
								
								for(var key in stacks){
									var pos = stacks[key]
										,x1 = pos.x1
										,y1 = pos.y1
										,x2 = pos.x2
										,y2 = pos.y2;
									
									// 마우스 범위 안에 있는 것은 삭제
									if(x1 <= x && x2 >= x && y1 <= y && y2 >= y) continue; 
									
									var classes = ".btn_top_"+key+", .btn_bottom_"+key+", .btn_left_"+key+", .btn_right_"+key;
									$(classes).remove();
									
									delete parents.$target.outline[key];				// 변수에서 삭제된 outline 삭제
								}
							});
			*/
		}
	}
	
	/**
	 * 전체 아웃라인 박스 삭제
	 */
	,removeAllOutlineBox:function()
	{
		$(".edit_box_outline").remove();
		//(this||editSortable).$target.outline = {};									// 변수 초기화
	}
	
	// outline 씌우기
	,wrapOutline:function(current)
	{
		var $this = $(current)
			,menu = ""
			,parent = ""
			,zIndex = 0;
	
		if($this.is(".edit_box")){													// normal box
			parent = ".edit_box";
			menu = this.html.box;		
			zIndex = 1;
		}else if($this.is(".edit_box_title")){										// normal box 단
			var tmode = "";
			
			parent = ".edit_box_title";
			
			if($this.closest(this.evtTarget.dragAble).attr("data-title")=="true")	// 제목없음은 수정 버튼 출력하지 않음 - 탭박스는 제외
			{	
				this.vars.zIndex = 14;
				menu = this.html.title;				
				this.outlineForOver($this, parent, menu);
								
				tmode = "title";													// 타이틀 수정 버튼이 있다면 클래스 추가하여 좀 밑으로 내려서 위치함
			}				
			
			menu = this.getBoxDanHtml($this, tmode);								// 아니라면 그냥 그대로~menu)

			// 추가버튼은 항상 생성
			zIndex = 15;
		}else if($this.is(".tab_content")){											// tab box
			parent = ".tab_content";
			menu = this.html.boxTab;	
			zIndex = 10;					
		}else if($this.is(".edit_box_tab")){										// tab box 단
			parent = ".edit_box_tab";
			menu = this.getBoxDanHtml($this);
			zIndex = 15;					
		}else if($this.is(".edit_html")){											// html box
			parent = ".edit_html";
			menu = this.html.html;	
			zIndex = 1;
		}else if($this.is(".edit_banner")){											// banner box
			parent = ".edit_banner";
			menu = this.html.banner;	
			zIndex = 1;
		}else if($this.is(".edit_article")){										// article modify
			parent = ".edit_article";
			menu = this.html.article;
			zIndex = 25;
		}else if($this.is(".edit_autobox")){										// autobox 
			parent = ".edit_autobox";
			menu = this.html.autobox;
			zIndex = 20;
		}
		
		this.vars.zIndex = zIndex;
		return this.outlineForOver($this, parent, menu);
	}
	
	// 박스단 안에 컨텐츠가 하나라도 있다면 boxDan 추가 버튼 안나오게
	,getBoxDanHtml:function($box, mode)
	{
		if($box.find(".edit_autobox, .edit_article").length<=0){
			if(mode == "title")
				return this.html.boxDan.replace("edit_menu_box_dan", "edit_menu_box_dan edit_menu_box_bottom_title");
			else
				return this.html.boxDan;
		}
		return "";
	}
			
	// 마우스 over 시 - menuShow : true 일때보이게
	,addEvtOverToDisplay:function(onOff, menuShow)
	{
		var parents = this
			,$addButton = $(".edit_add")
			//,$container = $("#container");	
			,$container = $(document.body);// 오른쪽 윙형 에디터가 있을경우 2016.04.27
		
		if(onOff == "off"){
			// 최상위 버튼 안보이게
			if(!menuShow)$addButton.hide();
			$container.off("mouseenter", this.evtTarget.over);
		}else{
			// 최상위 버튼 보이게
			if(!menuShow) $addButton.show();	
			$container.on("mouseenter", this.evtTarget.over, 
												function(event){
													parents.wrapOutline(this);
												});
		}
	}
	
	// 메뉴버튼 클릭이벤트
	,evtClickedMenu:function(onOff)
	{
		var parents = this
			,$body = $(document.body);
		if(onOff == "off"){
			$body.off("click", this.evtTarget.buttons);
		}else{
			$body.on("click", this.evtTarget.buttons, 
							function(e){							
								parents.makeMenuLink(this);
							});
		}
	}
	
	// 최초 기사 / 박스 / html / 배너 등 생성 버튼 이벤트
	,evtClickedButton:function()
	{
		var parents = this
			,$btnBox = $(".edit_add");
		$btnBox.find("a").click(function(){
											var url = this.getAttribute("href");
											if(url){
												var className = this.className;
												
												// 뉴스레터 꾸밈일때는 배너 삽입 금지
												if(className.indexOf("btn_add_banner")>=0 && parents.vars.panInfo=="NEWSLETTER"){
													alert(lang.newsletterDisableEditExp);
													return false;
												}
												
												parents.clickedButton(url);
												
												// box, html 새로 만들어질때 해당 객체로 스크롤 이동을 위해
												editContents.vars.isTarget =  (className.indexOf("btn_add_html")>=0 || className.indexOf("btn_add_box")>=0 || className.indexOf("btn_add_banner")>=0) ? true : false;
												
												var $last = $(this).closest(".edit_inner_content").children().filter(":last");
												if(className.indexOf("btn_add_html")>=0) parents.$target.currentBox.html = $last;
												else if(className.indexOf("btn_add_banner")>=0) parents.$target.currentBox.banner = $last;
												else{
													// box 정보 저장
													var links = util.linkToJson(this.href.split("/?")[1]); 								// 데이타 가져오기
													parents.$target.currentBox.box = {
																						target : $last
																						,data : {
																									idxno:""
																									,area:links.area||""
																									,areaSize:links.area_size||""
																									,section:links.section||""
																								}
																						};
												}
											}
											
											return false;
										});
	}
	
	// grouping -----
	,group:function()
	{
		// 드래그/메뉴바 플로팅 이벤트 제거
		if(editSortable.$target.article && editSortable.$target.box && editSortable.state=="S"){
			editSortable.stopEvtDarg();
			editSortable.addEvtOverToDisplay("off");
			editSortable.evtRemoveOutlineBox("off");			// 범위넘어선 아웃라인 event 제거
			editSortable.removeAllOutlineBox();
			editSortable.evtClickedMenu("off");					// 메뉴클릭시 이벤트
		}

		// 영역 표시 이벤트 제거
		if(editSortable.$target.menuBoxArticle!==null && editSortable.stateView=="S") 
			editSortable.hideView();
						
		// 이미 생성되어 있다면 보이기만함
		if(editSortable.$target.grouping !== null) return false;
		
		editSortable.showGroupDialog();										// group 창 띄움		
		editSortable.disableRcButton(true);									// 모든버튼 비활성화
		editSortable.stateGrouping = "S";									// grouping 작업중
	}
	
	// 추가되는 아이템 - 박스제목 html
	,getHtmlGroupItem:function(areaIdxno, title)
	{
		return '<li data-area-idxno="'+areaIdxno+'">'+title+' <button type="button" class="icon_bullet ib_0_240 edit_group_item_delete"></button></li>';
	}
	
	// 추가되는 그룹명 html
	// <!--[replace]-->는 뽑아올때 한대 합칠려고 item과 치환함
	,getHtmlGroupName:function(groupIdxno, groupName)
	{
		return '<li class="edit_group_name" data-group-idxno="'+groupIdxno+'">'
			 + '	<a href="javascript:void(0);" class="edit_group_add_btn">'+groupName+'</a> <button type="button" class="icon_bullet ib_100_240 edit_group_modify"></button> <button type="button" class="icon_bullet ib_0_240 edit_group_delete"></button>'
			 + '	<ul class="no_type edit_group_datalist"><!--[replace]--></ul>'	
			 + '</li>';
	}
	
	// sortable event
	,evtGroupSortable:function()
	{
		$(".edit_group_datalist").sortable({axis:"y",placeholder: "ui-state-highlight"}).disableSelection();
	}
	
	// group 보이기
	,showGroupDialog:function()
	{
		var parents = this;
		
		$("<div />").attr({"id":"edit_group_dialog","class":"edit_group_dialog","title":lang.editRcGrouping}).dialog({
			width:400
			,height:450
			,position:"left top"
			,resizable:true
			,buttons:{
				"저 장":function(){
					editSortable.sendGroupData();
				}
			}
			,create:function(){
				// 스크롤 따라다니게 ...
				$(this).closest(".ui-dialog").css("position","fixed");
			}
			,open:function(){
				if(editSortable.$target.box===null) editSortable.init();
				
				// html
				var html = '<div class="edit_group_add_box">'
						 + '	<input type="text" id="add_group_name" class="add_group_name" title="'+lang.editGroupName+'" placeholder="'+lang.editGroupName+'" maxlength="30" required="required" />'
						 + '	<button type="button" id="add_group_btn" class="btn_bg btn_bg_510"><span class="btn_bg btn_bg_in">'+lang.editGroupName +" "+ lang.add+'</span></button>'
						 + '</div>'
						 + '<div class="edit_group_explain"><span class="icon_bullet ib_0_60"></span> '+lang.editGroupExplain+'</div>'
						 + '<div id="edit_group_list_box" class="edit_group_list_box"><ul class="no_type"></ul></div>'
					,$content = $("#edit_group_dialog");
				
				$content.html(html);
				
				// 열면 바로 리스트 긁어옴
				$.get(	"/"
						,{mod:"edit", act:"callAreaGroupData", section:parents.vars.panType}
						,function(data, rst){
							if(rst == "success"){																
								if(data.result=="success"){									
									try{
										var items = data.data
											,html = [];
									
										if(items.length<=0) return false;
										
										for(var i in items){										
											var item = items[i]
												,groupName = decodeURIComponent(item.group_name)||""
												,groupCode = item.group_code||""
												,lists = item.list
												,li = []
												,groupHtml = "";
											
											if(lists.length<=0) continue;
											
											for(var j in lists){
												var list = lists[j]
													,boxIdxno = list.area_code||""
													,boxTitle = decodeURIComponent(list.autobox_title)||"";
												
												li.push(parents.getHtmlGroupItem(boxIdxno, boxTitle));
											}
											
											groupHtml=parents.getHtmlGroupName(groupCode, groupName);
											if(li.length>0) groupHtml = groupHtml.replace("<!--[replace]-->", li.join("\n"));	// 본문에 넣음
																					
											html.push(groupHtml);
										}
										
										if(html.length>0)
										$("#edit_group_list_box > ul").html(html.join("\n"));								

										parents.evtGroupSortable();																// 정렬
									}catch(e){}
									
									parents.evtClickedGroupName();															// 그룹명 클릭
									parents.evtClickGroupButtons();															// 생성된 아이템 클릭이벤트
								}else alert(decodeURIComponent(data.msg));
							}else alert(lang.axError);
						},"json");
			}
			,close:function(){
				parents.removeGroup($(this));
			}
		});
	}
	
	// send
	,sendGroupData:function()
	{
		var $box = $("#edit_group_list_box").find(".edit_group_name")
			,arr = [];
		$.each($box, function(i, ele){
			var $this = $(ele)
				,groupIdxno = $this.attr("data-group-idxno")
				,groupTitle = $.trim($this.find(".edit_group_add_btn").text())
				,$datalist = $this.find("li")
				,data = {}
				,idxno = [];
			
			$.each($datalist, function(j, el){
				var $_this = $(el)
					,areaIdxno = $_this.attr("data-area-idxno");
				
				if(areaIdxno) idxno.push(areaIdxno);
			});
			
			data["group_name"] = groupTitle;
			data["group_code"] = groupIdxno;
			data["list"] = idxno;									// array
						
			arr.push(data);
		});
		
		// 값이 비었을때, 전달하기
		if(arr.length<=0) arr.push({group_name:"",group_code:"",list:[]});
		
		$.post(	"/?dummy=edit-exeAreaGroupData"
				,{mod:"edit", act:"exeAreaGroupData", section:this.vars.panType, "data":arr}
				,function(data, rst){
					if(rst == "success"){
						if(data.result == "success") util.toast(lang.toastSaved);
						else alert(decodeURIComponent(data.msg));
					}else alert(lang.axError);
				},"json");
	}
	
	// 그룹명 클릭시 이벤트
	,evtClickedGroupName:function()
	{
		var parents = this;
		$(document.body).on("click", ".edit_group_add_btn"
							,function(){
								var $this = $(this);
								
								// 에디터 모드라면 전달 금지
								if($this.prop("contentEditable")=="true") return false;
								
								parents.vars.selectedGroupCode = $this.parent("li").attr("data-group-idxno") || "";
			
								parents.clickedItemMark($this);									// 클릭한 객체 표시
								if(parents.$target.grouping===null)	parents.viewGroup();		// autobox 찾아서 입힘	
							});	
	}
	
	// 생성된 버튼 이벤트
	,evtClickGroupButtons:function()
	{
		var parents = this;
		
		// 추가버튼 - 그룹명 붙이기
		function addGroupName()
		{
			var $input = $("#add_group_name")
				,groupName = $.trim($input.val());
			if(!groupName) return false;
			
			var groupIdxno = new Date().getTime()
				,html = parents.getHtmlGroupName(groupIdxno, groupName)
				,$target = $("#edit_group_list_box > ul");
			
			$target.append(html);
			$input.val("").focus();
			
			parents.evtGroupSortable(); // 드래그 재시작
		}
		
		// editable 비활성화
		function editableDisable()
		{
			$(".edit_group_add_btn").prop("contentEditable",false).removeClass("edit_group_name_editable");
		}
		
		// 추가버튼
		$(document.body).on("click", "#add_group_btn", addGroupName);
		$(document.body).on("keydown", "#add_group_name"
							,function(e){
								if(e.keyCode==13){
									addGroupName();
									return false;
								}
							});
		
		// 그룹명 수정
		$(document.body).on("click", ".edit_group_modify"
							,function(){
								var $this = $(this);
								
								$this.prev(".edit_group_add_btn").prop("contentEditable",true).addClass("edit_group_name_editable").focus()
								.off().on(	{
												blur:function(){
													editableDisable();
												}
												,keydown:function(e){
													if(e.keyCode == 13){
														editableDisable();
														return false;
													}
												}
											});
							});
		
		
		// 각각 박스명 삭제
		$(document.body).on("click",".edit_group_item_delete"
							,function(){
								if(!window.confirm(lang.confirmDelete)) return false;
								
								var $this = $(this)
									,$parent = $this.closest("li")
									,areaIdxno = $parent.attr("data-area-idxno")
									,$autobox = parents.$target.autobox
									,$grouping = parents.$target.grouping;
								
								$parent.fadeOut("fast", function(){ $(this).remove(); });
								
								if($grouping===null || $autobox===null) return ;
								var $targetBox = $autobox.filter("[data-area-idxno='"+areaIdxno+"']");
								parents.toggleGroupCheckButton($targetBox.find(".em_in_btn_grouping"));
								parents.toggleGroupAttribute($targetBox, "", "");
								
								return false;
							});
		
		// 각각 그룹명 삭제
		$(document.body).on("click",".edit_group_delete"
							,function(){
								if(!window.confirm(lang.confirmDelete)) return false;
								
								var $this = $(this)
									,$parent = $this.closest("li")
									,$autobox = parents.$target.autobox
									,$grouping = parents.$target.grouping
									,arr = [];
								
								// 삭제할 하위 아이템들 코드 모음 - 버튼 활성화를 위해
								$parent.find(".edit_group_datalist").children("li").each(function(i,ele){
									var areaIdxno = this.getAttribute("data-area-idxno");
									if(areaIdxno) arr.push(areaIdxno);
								});
								
								$parent.fadeOut("fast", function(){ $(this).remove(); });
								
								parents.vars.selectedGroupCode = null;									// 그룹명을 삭제했기에 코드변수 초기화
								
								if($grouping===null || $autobox===null || arr.length<=0) return ;
								for(var i in arr){
									var $targetBox = $autobox.filter("[data-area-idxno='"+arr[i]+"']");
									parents.toggleGroupCheckButton($targetBox.find(".em_in_btn_grouping"));		// 하위 박스명 전부 삭제
									parents.toggleGroupAttribute($targetBox, "", "");							// 자동박스 group관련 속성 정리
								}
																
								return false;
							});
	}
	
	// 버튼 비활성화
	,disableRcButton:function(diabled)
	{
		if((typeof diabled)!=="boolean") diabled = false;
		$("#edit_remote_control").find("button").prop("disabled", diabled);
	}
	
	// 클릭한데 표시
	,clickedItemMark:function($this)
	{
		$("#edit_group_list_box").find(".edit_group_add_btn").removeClass("item_mark");
		$this.addClass("item_mark");
	}
	
	// 덧붙임
	,viewGroup:function()
	{
		if(!this.$target.autobox) this.init();
		var parents = this
			,dataSet = parents.getGroupingData();														// ajax로 호출한 그룹된 박스명 모음
		
		this.$target.autobox.has(this.evtTarget.groupMarkFilter).prepend(this.html.grouping);			// groupMarkFilter : data-edit-type="auto" 만 표시함
		this.$target.grouping = this.$target.autobox.children(this.evtTarget.groupMenu);
		$.each(this.$target.grouping,
			   function(i, ele){
					var $this = $(this)
						,$tapContentBox = $this.closest(".tab_content")
						,$autobox = $this.closest(".edit_autobox")
						,width = 0
						,height = 0;
					
					// tab box가 아니라면, autobox의 값을 재오고.
					if($tapContentBox.length<=0 || $tapContentBox.css("display")=="block"){
						width = $autobox.innerWidth();
						height = $autobox.innerHeight();
					}else{
					// tab box라면 autobox가 있는 것이 display:none일경우 block후 width,height를 구한다. none일경우 0,0값이 나온다
						$tapContentBox.addClass("on");
						width = $autobox.innerWidth();
						height = $autobox.innerHeight();
						$tapContentBox.removeClass("on");
					}
					
					var boxTitle = decodeURIComponent($autobox.attr("data-box-title"))||""
						,areaIdxno = $autobox.attr("data-area-idxno")||""
						,padding = $this.css(["padding-top","padding-left","padding-bottom","padding-right"])
						,_w = Math.floor(width-(parents.castToIntFromCss(padding["padding-right"])+parents.castToIntFromCss(padding["padding-left"])))
						,_h = Math.floor(height-(parents.castToIntFromCss(padding["padding-top"])+parents.castToIntFromCss(padding["padding-bottom"])));
					
					if(areaIdxno){						
						var checked = ($.inArray(areaIdxno, dataSet)>=0);
						$this.css({
									"width":_w, 
									"height":_h<=0 ? 40 : _h
								})
							 .find(".edit_menu_box_title").text(boxTitle)
							 .end().find(".em_in_btn_grouping").addClass((checked===true?"em_checked":""))
							 .attr({"data-mode":(checked===true?"release":"group"),"title":(checked===true?lang.editGroupRelease:lang.editRcGrouping)});
					}
			   });
		
		// 이벤트 더하기
		parents.evtGroupAddRemove();
	}
		
	// 그룹핑 된 데이타 값들
	,getGroupingData:function()
	{
		var arr = [];
		$("#edit_group_list_box").find("li[data-area-idxno]").each(function(i, ele){
			var idxno = this.getAttribute("data-area-idxno");
			if(idxno) arr.push(idxno);
		});
		return arr;
	}
	
	// add grouping Event
	,evtGroupAddRemove:function()
	{
		var parents = this;
		$(document.body).on("click", ".em_in_btn_grouping"
							,function(){
								var $this = $(this)
									,mode = $this.attr("data-mode")						// group - 더하기, release - 해제
									,$parent = $this.closest(".edit_autobox")
									,title = decodeURIComponent($parent.attr("data-box-title"))||""
									,areaIdxno = $parent.attr("data-area-idxno")||"";
								
								if(!parents.vars.selectedGroupCode){
									alert(lang.editGroupRequireCode);
									return false;
								}
								
								if(mode == "group"){
									parents.addGroupItem(title, areaIdxno);
									parents.toggleGroupCheckButton($this);	
									parents.toggleGroupAttribute($parent, "true", parents.vars.selectedGroupCode);	// group관련 속성 정리 
								}else if(mode == "release"){
									if(!window.confirm(lang.editGroupConfirmRelease)) return false;
									parents.removeGroupItem(areaIdxno);
									parents.toggleGroupCheckButton($this);
									parents.toggleGroupAttribute($parent, "", "");
								}
								return false;
							});
	}
	
	// 추가
	,addGroupItem:function(title, areaIdxno)
	{
		if(!title || !areaIdxno) return ;
		
		var code = this.vars.selectedGroupCode
			,$targetId = $("#edit_group_list_box")
			,$listBox = $targetId.find("li[data-group-idxno='"+code+"']").find(".edit_group_datalist")
			,html = this.getHtmlGroupItem(areaIdxno, title);
		
		if($targetId.find("li[data-area-idxno='"+areaIdxno+"']").length>0) return false;
		
		$listBox.append(html);	
	}
	
	// 제거
	,removeGroupItem:function(areaIdxno)
	{
		if(!areaIdxno) return ;
		
		$("#edit_group_list_box").find(".edit_group_datalist").find("li[data-area-idxno='"+areaIdxno+"']")
		.fadeOut("fast", function(){
			$(this).remove();
		});		
	}
	
	// 체크버튼 토글
	,toggleGroupCheckButton:function($this)
	{
		var mode = $this.attr("data-mode")||"group";
		if(mode == "group") $this.attr("data-mode","release").addClass("em_checked");
		else $this.attr("data-mode","group").removeClass("em_checked");
	}
	
	// group관련 attribute 작업
	,toggleGroupAttribute:function($tBox, group, code)
	{
		if(!$tBox) return false;
		
		$tBox.attr({
					"data-group":group
					,"data-group-code":code
					});
	}
	
	// px 제거
	,castToIntFromCss:function(v)
	{
		return util.castIntFromCss(v);
	}
	
	// grouping remove
	,removeGroup:function($this)
	{
		if(this.$target.grouping!==null) this.$target.grouping.remove();
		//this.$target.autobox = null;
		this.$target.grouping = null;	
		
		this.stateGrouping = "N";
		this.disableRcButton(false);
		$this.remove();
		$(document.body).off("click", ".edit_group_add_btn")								// group 클릭시 생성된 이벤트 모두  제거
						.off("click", ".edit_group_item_delete")
						.off("click", ".edit_group_delete")
						.off("click", ".em_in_btn_grouping")
						.off("click", "#add_group_btn")
						.off("keydown", "#add_group_name")
						.off("click", ".edit_group_modify");			
						
		
	}
	//-------------
	
	// 모바일편집판
	,evtClickedPreview:function()
	{
		var $parent = $(this).closest("#edit_remote_control")
			,section = $parent.attr("data-preview-section")||""
			,type = $parent.attr("data-section-type")
			,editType = $parent.attr("data-edit-type")
			,url = ""
			,options = "";
		
		if(type === "MOBILE"){
			url = M_DOMAIN+"/?mod=edit&act=mobilePreview&section="+section;
			options = "width=400,height=640,resizable=yes,scrollbars=yes";
		}else if(type === "PAGE" && editType === "inc"){
			url = location.href.replace(ADM_DOMAIN, DOMAIN)+"&edit_mode=preview";
			options = "";
		}else if(type === "NEWSLETTER"){
			url = DOMAIN+"/?mod=edit&act=newsletterPreview&section="+section;
			options = "";
		}else{
			url = DOMAIN+"/?mod=edit&act=preview&section="+section;
			options = "";
		}
		
		window.open(url,"preview",options);
	}
	
	// 웹출판 링크
	,webPublish:function()
	{
		location.href="/?mod=edit&act=webPublishing&section="+($(this).closest("#edit_remote_control").attr("data-preview-section")||"");
	}
	
	// 박스갱신
	,boxReload:function()
	{
		if(!window.confirm(lang.confirmLongTime)) return false;
		
		location.href="/?mod=edit&act=exeCronEditArticle&section="+($(this).closest("#edit_remote_control").attr("data-preview-section")||"");
	}
			
	// grouping 버튼 - 현재는 안씀
	,groupViewEventToggle:function(btnTxt, state, clickedMenu)
	{
		this.$target.rcBtn.grouping.text(lang.editRcGrouping + " "+btnTxt);					// 상대 button text										
		this.stateGrouping = state;															// 상대 상태
		this.evtClickedMenu(clickedMenu);													// 메뉴클릭시 이벤트
	}
	
	// 리모콘 드래그
	,dragRemoteBox:function()
	{
		if(touches.isMobile()===false){
			var $box = $("#edit_remote_control");
			$box.draggable();
		}else{
			touches.remoteControl.dragRemoteBox();											// mobile
		}
	}
	
	// 박스 복구하기 일때, 표시
	,embossDeletedBox:function()
	{
		var $target = $("#edit_recover_box");
		
		if(!$target.length || location.search.indexOf("act=recoveryBoxPreview")>=0) return false; 
		
		var $parent = $target 																// !$target.is(".edit_box")?$target.closest(".edit_box"):$target			// edit_box가 아닐때 editbox찾기
			,contentBorderWidth = 25
			,pos = $parent.offset()
			,width = $target.outerWidth()
			,height = $target.outerHeight()
			,body = (document.documentElement||document.body)								// IE와 기타브라우저를 구분하기 위해서
			,documentBody = document.body
			,pageWidth = body.clientWidth < body.scrollWidth ? body.scrollWidth : body.clientWidth
			,pageHeight = body.clientHeight < body.scrollHeight ? body.scrollHeight : body.clientHeight
			,$div = $('<div class="edit_recover_box_bg"></div>').css({ "width":pageWidth+"px", "height":pageHeight+"px" })
			,$content = $('<div id="edit_recover_box_clone" class="radius border_color_change edit_recover_box_clone"></div>').css({ "top":pos.top-contentBorderWidth, "left":pos.left-contentBorderWidth, "width":width, "height":height }).append($target.clone())
			,$buttons = $('<div id="edit_recover_box_button" class="radius_bottom edit_recover_box_button"><button type="button" data-type="restore" class="btn_bg btn_bg_370"><span class="btn_bg btn_bg_in">'+lang.restore+'</span></button><!--<button type="button" data-type="close" class="btn_com btn_com_0_240">'+lang.close+'</button>--></div>').css({ "top":pos.top+height+contentBorderWidth, "left":pos.left, "width":width });
			
		evt.scrollToTop(10, pos.top-(contentBorderWidth*2));								// 스크롤 이동	
		
		// 버튼 이벤트
		$buttons.find("button").click(function(){
			var $this = $(this)
				,type = $this.attr("data-type");
			
			if(type==="restore"){
				var hash = location.hash.replace(/^#/,"");
				if(!hash) return false;
				
				location.href="/?mod=editCfg&act=editLogsRecovery&refer=preview&idxno="+hash;
			}else window.self.close();
		});
		
		// 덧붙이기
		$(documentBody).append($div).append($content).append($buttons);										// body 변수로 하면 이상하게 document.body에 안붙고 다른데 붙음		
	
		// 창크기 변경시
		$(window).resize(function(){
			var position = $parent.offset()
				,pageWidth = body.clientWidth < body.scrollWidth ? body.scrollWidth : body.clientWidth
				,pageHeight = body.clientHeight < body.scrollHeight ? body.scrollHeight : body.clientHeight;
			
			$div.css({ "width":pageWidth+"px", "height":pageHeight+"px" });
			$content.css({ "top":position.top-contentBorderWidth, "left":position.left-contentBorderWidth });
			$buttons.css({ "top":position.top+height+contentBorderWidth, "left":position.left });
		});
		
		return true;
	}
	
	// 초기 버튼 이벤트
	,addEventButton:function()
	{
		var parents = this;
		
		if(this.embossDeletedBox()===false){
			var $button = $("#rc_mode_btn")
				,$buttonArea = $("#rc_display_area_btn")
				,$buttonGrouping = $("#rc_grouping_btn")
				,$buttonPreview = $("#rc_preview_btn")
				,$buttonPublish = $("#rc_publish_btn")
				,$buttonReload = $("#rc_reload_btn");
			
			// 버튼 객체 미리 저장 - 이부분 나중에 필요할까 해서 남겨놓음
			parents.$target.rcBtn.editMode = $button;
			parents.$target.rcBtn.displayArea = $buttonArea;
			parents.$target.rcBtn.grouping = $buttonGrouping;
			parents.$target.rcBtn.preview = $buttonPreview;
			
			parents.makeHtml();                			// 붙일 에디터 버튼 만들기
			$button.click(parents.exe);
			
			$buttonArea.click(parents.view);			// 박스영역만 보이게
			
			$buttonGrouping.click(parents.group);		// 그룹핑

			$buttonPreview.click(parents.evtClickedPreview);	// 미리보기
			$buttonPublish.click(parents.webPublish);	// 웹출판버튼
			$buttonReload.click(parents.boxReload);		// 박스 갱신
			
			parents.evtClickedButton();					// html/배너/컨텐츠라는 최초 버튼에 이벤트
			
			parents.dragRemoteBox();					// 리모콘 드래그
			
			$(window).resize(parents.removeAllOutlineBox);// 창크기 변경시 생성된 outline 제거
		}
	}
};


/*****************************************************************************
모바일 관련 작업 - 편집용 - 일반화면은 mobile.js
*****************************************************************************/
var touches={
	vars:{
	}
	
	// mobile 인가
	,isMobile:function()
	{
		var agent = window.navigator.userAgent.toLowerCase()
			,agents = ['android','samsung','psp','playstation','lgtelecom','smartphone','symbian','ppc','windows ce','iphone','ipod','ipad'];
		
		for(var i=0, cnt=agents.length; i<cnt; i++){
			if(agent.indexOf(agents[i])>=0) return {result:true, device:agents[i]};
		}
		
		return false;
	}
	
	// touch 이벤트가 작동하는가
	,hasTouch:function()
	{
		return ("ontouchmove" in window);
	}
	
	// geture 이벤트가 작동하는가
	,hasGesture:function()
	{
		return ("ongesturechange" in window);
	}
	
	// jquery 이벤트 등록 사용시, 이벤트 알아내기
	,getEventObject:function(e)
	{
		var evt = window.event||e;
			evt = evt.targetTouches?evt.targetTouches[0]:evt;  	// jquery touch event
		return evt;
	}

	// 터치 이벤트
	,evtTouch:function(target, start, move, end, leave, cancel)
	{
		if(!target) target = document.body;
		if(!start) start = function(){};
		if(!move) move = function(){};
		if(!end) end = function(){};
		if(!leave) leave = function(){};
		if(!cancel) cancel = function(){};
		
		target.addEventListener("touchstart", start, false);
		target.addEventListener("touchmove", move, false);
		target.addEventListener("touchend", end, false);
		target.addEventListener("touchleave", leave, false);
		target.addEventListener("touchcancel", cancel, false);
	}
	
	// 제스쳐 이벤트(멀티터치) - ios용 (~2013.03)
	,evtGesture:function(target, start, change, end)
	{
		if(!target) target = document.body;
		if(!start) start = function(){};
		if(!change) change = function(){};
		if(!end) end = function(){};
		
		target.addEventListener("gesturestart", start, false);
		target.addEventListener("gesturechange", move, false);
		target.addEventListener("gestureend", end, false);
	}
		
	// 리모콘
	,remoteControl:{
		vars:{
			size:{
				width:0
				,height:0
			}
		}
	
		// drag event
		,evtStart:function(e)
		{	
			var tches = e.touches;
			if(tches.length!=1) return false;
		}

		,evtMove:function(e)
		{	
			// currentTarget은 하위의 부모객체 지정함, target은 하위를 터치했다면 고거 선택됨
			var tches = e.touches;
			if(tches.length!=1) return false;
			
			var tche = tches[0]
				,x = tche.clientX
				,y = tche.clientY
				,target = e.currentTarget || e.srcElement;
			
			target.style.top = (y - touches.remoteControl.vars.size.height)+"px";
			target.style.left = (x - touches.remoteControl.vars.size.width)+"px";
		
			e.preventDefault(); 
			e.stopPropagation();
		}

		,evtEnd:function(e){}
				
		// 리모콘 이벤트
		,dragRemoteBox:function()
		{
			var parents = this.parent
				,box = document.querySelector("#edit_remote_control");
			this.vars.size = { 
								width : box.offsetWidth/2 
								,height : box.offsetHeight/2
							 };
			
			parents.evtTouch(box, this.evtStart, this.evtMove, this.evtEnd, null, null);			
		}
	}
	
	// 일반용 모바일 js include - 개떡같은 IE 됐다 안됐다 그래서 그냥 태그로 넣음
	,includeMobileJs:function()
	{
		var jsPath = IM_DOMAIN+"/script/mobile.js";		
		return util.includeJs(jsPath);
	}
	
	// 로드 되었나?
	,exeLoad:function(script, func)
	{
		if(!(typeof func === "function")) func = function(){};
		script.onload=func;
	}
	
	// 메인편집판
	,sortable:{
		vars:{}
	}
	
	// 하위 객체에서 상위 객체 접근시킬려고 
	,init:function()
	{
		this.remoteControl.parent = this;
		this.sortable.parent = this;
		delete this.init;
		return this;
	}
}.init();


/*****************************************************************************
꾸밈 박스 - 기사 조건 검색...
*****************************************************************************/
var editBox={
	vars:{
		iconPath : null													// icon 저장경로
		,$iconColorTarget : null										// 적용할 객체
		,section:{
			display : "#autobox_section_data_list"						// 섹션뿌리는 장소
			,add : "#autobox_section_add_data_list"						// 섹션 추가 모음
			,except : "#autobox_section_except_data_list"				// 섹션 제외 모음
			,btnAdd : ".autobox_section_btn_add"						// 섹션 추가 버튼
			,btnExcept : ".autobox_section_btn_except"					// 섹션 제외 버튼
			,sectionNames : []											// 모든 섹션명
		}
	}

	,init:function()
	{
		this.vars.iconPath = PH_DOMAIN+"/other/deco_icon/";
	}
	
	// 상위 섹션명 가져오기 - 재귀함수
	,getSectionName:function($obj, parentCode)
	{
		if(!parentCode || !$obj) return false;
		
		$obj = $obj.prevAll(".autobox_section_items[data-code='"+parentCode+"']");
		parentCode = $obj.attr("data-parent-code");
		var name = $.trim($obj.children(".autobox_section_item").text());
		if(!name) return false;
		
		editBox.vars.section.sectionNames.push(name);
		editBox.getSectionName($obj, parentCode);
	}
	
	// 전체섹션 추가시 나머지 버튼 추가 버튼 없애고 보이고...
	,buttonToggle:function(mode)
	{
		var $target = $(this.vars.section.display).find(this.vars.section.btnAdd);
		if(mode == "hide"){
			$(this.vars.section.add).empty();			// 전부 비움
			$target.hide();			
		}else $target.show();
	}

	// 붙임
	,display:function(obj, target)
	{
		var $target = $(target)
			,$ele = $(obj)
			,$obj = $ele.is(".autobox_section_items") ? $ele : $ele.closest(".autobox_section_items")
			,code = $obj.attr("data-code")
			,depth = $obj.attr("data-depth")
			,parentCode = $obj.attr("data-parent-code")
			,name = article.replaceSerialTxt($obj.children(".autobox_section_item").text());
		
		if(!name || !code || !parentCode) return false;
				
		this.vars.section.sectionNames = [];							// 담을 장소 초기
		this.vars.section.sectionNames.push(name);
		
		this.getSectionName($obj, parentCode);							// 재귀적으로 불러들임
		
		if(!this.vars.section.sectionNames) return false;
		if(this.vars.section.sectionNames.length<=0) return "";
		
		this.vars.section.sectionNames.reverse();
		
		// 똑같은 섹션이 추가/제외에 있음 안됨
		if($target.closest(".autobox_section_add_box").find("a[data-code='"+code+"']").length > 0){
			util.toast("["+name+"] "+lang.editRequireExistsSectionName);
			return false;
		}
		
		// 같은 항목에 상위가 섹션이 있는데 하위 섹션이 있음 안됨
		// 예 : 정치 > 선거, 정치 > 도정 이라면, 정치가 추가 항목에 있다면 선거는 불필요한 선택임 - 바로 상위만되니 보완 필요
		if($target.find("a[data-code='"+parentCode+"']").length > 0){
			util.toast("["+name+"] "+lang.editRequireExistsParentSection);
			return false;
		}
		
		// 같은 항목에 상위 코드를 선택하기전 이미 하위 코드가 들어가 있다면 그 하위코드 삭제후 등록 - 바로 상위만되니 보완 필요
		$target.find("a[data-parent-code='"+code+"']").parent().remove();
		
		// 전체섹션을 선택하여 추가하면 나머지는 추가 되지 못하게
		if(code=="ALL") this.buttonToggle("hide");
		
		var names = this.vars.section.sectionNames.join(" > ")
			,html = '<li class="create_bgcolor">'+names+' <a href="javascript:void(0);" title="'+lang.delte+'" class="icon_bullet ib_0_240 autobox_section_btn_del" data-depth="'+depth+'" data-code="'+code+'" data-parent-code="'+parentCode+'" title="'+lang.delte+'"></a></li>';
		
		$target.append(html);
	}

	// 추가 이벤트
	,evtAdd:function()
	{
		var parents = this;
		$(this.vars.section.display).on("click", this.vars.section.btnAdd, 
												 function(){
													parents.display(this, parents.vars.section.add);
												 })
									.on("dblclick", ".autobox_section_btn_dblclick",
												 function(){
													parents.display(this, parents.vars.section.add);
												});
	}
	
	// 제외 이벤트
	,evtExcept:function()
	{
		var parents = this;
		$(this.vars.section.display).on("click", this.vars.section.btnExcept, 
												 function(){
													parents.display(this, parents.vars.section.except);														
												 });
	}
	
	// 삭제
	,evtDelete:function()
	{
		var $parents = this;
		$(this.vars.section.add+", "+this.vars.section.except)
		.on("click", ".autobox_section_btn_del", 
					 function(){
						if(!window.confirm(lang.confirmDelete)) return false;
			
						var $this = $(this)
							,$parent = $this.parent()
							,code = $this.attr("data-code");
										
					
						$parent.fadeOut(function(){
							$(this).remove();

							if(code == "ALL") $parents.buttonToggle("show");		// 추가버튼 보이게
						});
					 });
	}
	
	// 수정일때 저장된 데이타 불러오기
	,displaySavedSection:function()
	{		
		// 추가
		var addCodeStr = document.autobox_form.section_add_items.value				// 추가 코드
			,exceptCodeStr = document.autobox_form.section_except_items.value		// 제외코드
			,___addCodes = addCodeStr.length>5?addCodeStr.split(","):[]
			,___exceptCodes = exceptCodeStr.length>5?exceptCodeStr.split(","):[]
			,aLength = ___addCodes.length
			,eLength = ___exceptCodes.length;
		
		if(___addCodes && aLength>0){
			for(var i=0; i<aLength; i++){
				var code = ___addCodes[i];
					code = code=="1111111111" ? "ALL" : code;						// 코드가 1111111111 로 들어오면 섹션전부(ALL)이다.
				var $obj = $(this.vars.section.display).find("li[data-code='"+code+"']");
								
				if(code=="ALL") this.buttonToggle("hide");
				this.display($obj, this.vars.section.add);				
			}
		}
		
		// 제외
		if(___exceptCodes && eLength>0){
			for(var i=0; i<eLength; i++){
				var code = ___exceptCodes[i]
					,$obj = $(this.vars.section.display).find("li[data-code='"+code+"']");
				
				this.display($obj, this.vars.section.except);				
			}
		}
		
		this.inputHiddenForSectionCode();		// 섹션코드 hidden에 넣음
	}
	
	// 섹션코드 input[hidden] value 에 추가
	,inputHiddenForSectionCode:function()
	{
		var aCodes = []
			,eCodes = []
			,form = document.autobox_form;
		$(this.vars.section.add).find("a.autobox_section_btn_del").each(function(i, ele){
			var code = ele.getAttribute("data-code");
			if(code) aCodes.push(code);
		});
		
		$(this.vars.section.except).find("a.autobox_section_btn_del").each(function(i, ele){
			var code = ele.getAttribute("data-code");
			if(code) eCodes.push(code);
		});
		
		form.section_add_items.value = aCodes.length>0 ? aCodes.join(",") : "";
		form.section_except_items.value = eCodes.length>0 ? eCodes.join(",") : "";
	}
	
	// 리스트 박스 선택
	,submitList:function()
	{
		var radios = $("#editTemplate_form").find("input[name='template_skin_idxno']:checked");
		
		if(radios.length<=0){
			alert(lang.editRequireSelectSkin);
			return false;
		}
		
		return true;
	}
	
	// 조건 전송
	,submit:function(form)
	{
		if(form.title.value == ""){
			alert(lang.editAutoboxRequireTitle);
			form.title.focus();
			return false;
		}
		
		if(form.condition_limit_m.value == "" || form.condition_limit_n.value == ""){
			alert(lang.editAutoboxRequireConditionLimit);
			form[(form.condition_limit_m.value==""?"condition_limit_m":"condition_limit_n")].focus();
			return false;
		}
		
		// 기사 섹션 체크
		if(form.section_add_items){
			// 섹션코드 input[hidden] value 에 추가
			this.inputHiddenForSectionCode();
			
			if(form.section_add_items.value == ""/* && form.section_except_items.value == ""*/){
				alert(lang.editAutoboxRequireSectionCode);
				return false;
			}
		}
		// 게시판 선택
		else{
			/* 전체선택을 위해
			var bbsSrl = document.getElementsByName('bbs_srl[]');
			if(!bbsSrl[0].value){
				alert(lang.bbsRequireSelectSelectBar);
				bbsSrl[0].focus();
				return false;
			}
			*/
		}
				
		 return true;	
	}

	/*
	 * 컨텐츠선택의 서브제목 링크 post로 보내기
	 * @params
	 * - $target : a tag 위치
	 */
	,linkToSendPost:function($target)
	{
		$target.click(function(){
			var href = this.getAttribute("href")
				,json = util.linkToJson(href)
				,form = null;
			
			form = util.createHiddenForm(json, {method:"post",action:"/?dummy="+json.mod+"-"+json.act});
				
			document.body.appendChild(form);			
			form.submit();			
			
			return false;			
		});
	}
	
	// 기사 찾기 팝업
	,evtClickPopSearchList:function()
	{
		var $button = $("#editnews_btn_search");
		$button.click(function(){
			window.open("/?mod=editNews&act=newsFindList","searchList","width=800,height=600,scrollbars=yes");
		});		
	}
	
	// 블로그 게시물 찾기 팝업
	,evtClickPopSearchBlogList:function()
	{
		var $button = $("#editblog_btn_search");
		$button.click(function(){
			var searchWin = window.open("/?mod=editNews&act=blogFindList","searchList","width=750,height=600,scrollbars=yes");
			searchWin.focus();
		});		
	}
	
	// 팝업뜬 기사 선택
	,fillInput:function(str)
	{
		tmpStr = decodeURIComponent(str);
		tmpStrData = tmpStr.split('<!-- -->');
		
		var form = document.editnews_form, 
		org_data_type = tmp_data_type = tmp_article_idxno = '';

		// 수정인 경우에만 체크 
		// 같은 데이터타입이며 같은 idxno 일 경우 org_data_type 으로 업데이트 한다. - @2014/05/19 이정연 추가 
		if (form.org_article_idxno.value)
		{
			tmp_article_idxno = tmpStrData[0]; 
			org_data_type = form.org_data_type.value;
			
			switch (org_data_type)
			{
				case 'A':
					tmp_data_type = (form.org_article_idxno.value == tmp_article_idxno && tmpStrData[5] != 'BLOG') ? form.org_data_type.value : tmpStrData[5]; 
					break;
				case 'BLOG':
					tmp_data_type = (form.org_article_idxno.value == tmp_article_idxno && tmpStrData[5] != 'N') ? form.org_data_type.value : tmpStrData[5]; 
					break;
				case 'N':
				default:
					tmp_data_type = tmpStrData[5]; 
					break;
			}
		}
		else
		{
			tmp_article_idxno = tmpStrData[0];
			tmp_data_type = tmpStrData[5];
		}
		var chk_data_type = (form.article_idxno.value == tmpStrData[0]) ? form.data_type.value : tmpStrData[5]; 
		form.article_idxno.value = tmp_article_idxno;
		form.title.value = tmpStrData[1];
		form.sub_title.value = tmpStrData[2];
		form.summary.value = tmpStrData[3];
		form.link.value = tmpStrData[4];
		form.data_type.value = tmp_data_type;
	}
	
	// 꾸밈 기사 중 메인 꾸밈,제목,부제목 이미지 삭제 버튼
	,evtClickedDeletePhoto:function(buttons, targetForm)
	{
		if(!buttons) return ;
		var params = null
			,parents = this
			,$showThumb = null;
		
		$(buttons).on({
			click:function(){
				if(!window.confirm(lang.confirmDelete)) return false;
				
				var $this = $(this)
					,gid = this.getAttribute("data-gid");
				
				if(params===null){
					params = util.linkToJson($(targetForm).find("input[type='hidden']").serialize());
					params.mod = "editNews";
					params.act = "newsDltImg";
					params.pageMode = targetForm.act.value;
				}
				
				params.gid = gid;
				
				$.post(	"/?dummy=editNews-newsDltImg"
						,params
						,function(data,rst){
							if(rst == "success"){
								if(data.result=="success"){
									$this.hide().removeAttr("data-img-path");
									targetForm.crop_image.value = "";								// crop 이미지 삭제
								}else alert(decodeURIComponent(data.msg));
								
								if($showThumb) $showThumb.remove();		
							}else util.toast(lang.axError);
						},"json");
				
				return false;
			}
			,mouseenter:function(){			
				$showThumb = parents.overImage(this);
			}
			,mouseleave:function(){
				if($showThumb) $showThumb.remove();		
			}
				
		});
	}
	
	// 탭박스 이미지/over 이미지삭제
	,evtClickedDeletePhotoALink:function(buttons)
	{
		if(!buttons) return ;
		var parents = this
			,$showThumb = null;
		
		$(buttons).on({
			click:function(){
				if(!window.confirm(lang.confirmDelete)) return false;
				
				var $this = $(this)
					,params = (this.getAttribute("href")).replace("/?","");
				
				$.get(	"/?dummy=edit-boxContentTitleDlt"
						,params
						,function(data,rst){
							if(rst == "success"){
								if(data.result=="success") $this.prev(".editbox_box_hidden_img").addBack().remove();		
								else alert(decodeURIComponent(data.msg));
								
								if($showThumb) $showThumb.remove();
							}else util.toast(lang.axError);
						},"json");
				
				return false;
			}
			,mouseenter:function(){
				$showThumb = parents.overImage(this, "nopath");
			}
			,mouseleave:function(){
				if($showThumb) $showThumb.remove();		
			}
				
		});
	}
	
	// 이미지 오버시 보이게 - nopath는 직접 url로 한것을 호출할때 
	,overImage:function(_this, nopath)
	{
		var $this = $(_this)
			,$pos = $this.position()
			,top = $pos.top+20
			,left = $pos.left-100
			,img = _this.getAttribute("data-img-path")
			,isBlog = img.indexOf("BLOG_")>=0			//blog or article
			,path = nopath=="nopath" ? "" : PH_DOMAIN+"/edit/"+(isBlog?"blog":"news")+"/edit_img/"
			,tempPath = nopath=="nopath" ? "" : PH_DOMAIN+"/edit/"+(isBlog?"blog":"news")+"/temp_img/"
			,imgUrl = path+img
			,$thumb = null;
	
			if(!img) return ;
			
			$thumb = $('<img src="'+imgUrl+'" />').css({"position":"absolute","max-width":"500px","top":top,"left":left,"border":"3px dashed #ccc","max-width":"300px"})
												.error(function(){
													this.src = tempPath+img; // edit_img/에 없으면  temp_img/에서 찾음 
												});					
						
			$(document.body).append($thumb);
		return $thumb;
	}
	
	// 타겟프레임이 frame으로 선택되어 있다면 입력창에서 나오게
	,evtChangeSelectedFrame:function(target1, target2)
	{
		var selectBar = document.getElementById(target1||"editbox_write_link_target")
			,field = document.getElementById(target2||"editbox_write_link_target_frame");
		
		// load...
		if(selectBar.value == "frame") field.style.display = "inline";
		$(selectBar).change(function(){
			if(this.value == "frame") field.style.display = "inline";
			else{
				field.style.display = "none";
				field.value = "";
			}
		});
	}
	
	// 타겟프레임이 frame으로 선택되어 있다면 입력창에서 나오게 - radio box
	,evtChangeSelectedTitleTypeRadio:function(button, text, img)
	{
		var $radio = $(button)
			,$text = $(text)
			,$img = $(img);
		
		// load...
		if($radio.filter(":checked").val()=="Y"){
			$text.hide();
			$img.show();
		}
		
		$radio.click(function(){
			if(this.checked === true && this.value == "Y"){
				$text.hide();
				$img.show();
			}else{
				$text.show();
				$img.hide();
			}
		});
	}
	
	// preview page 라인 선택 이벤트
	,evtChangePreviewLine:function()
	{
		var $selectOver = $("#editbox_write_overline_type")
			,$selectUnder = $("#editbox_write_underline_type");
		
		// 상단 라인
		if($selectOver.val()=="N") $selectOver.next("span").hide();
		else $selectOver.next("span").show();
		
		// 하단 라인
		if($selectUnder.val()=="N") $selectUnder.next("span").hide();
		else $selectUnder.next("span").show();
		
		$selectOver.add($selectUnder).change(function(){
			var $this = $(this)
				,value = this.value;
			
			if(value == "N") $this.next("span").hide().find("#editbox_write_overline_size").val("");
			else $this.next("span").show();
		});
	}
	
	// preview에서 이전 page로
	,evtBackPreview:function()
	{
		var $btn = $("#editbox_btn_prev");
		$btn.click(function(){
			var displayIdxno = this.getAttribute("data-display-idxno")
				,form = document.contentprev_form
				,autobox_type = form.autobox_type.value; 
			
			if (autobox_type == 'N')
			{
				location.href="/?mod=templateSkin&act=editTemplate&section="+form.section.value+"&content_idxno="+form.content_idxno.value+"&box_skin_idxno="+form.box_skin_idxno.value+"&box_skin_size="+form.box_skin_size.value+"&display_idxno="+form.display_idxno.value+"&area_idxno="+form.area_idxno.value+"&data_type="+form.data_type.value+"&back=prev";
			}
			else
			{
				form.mod.value = 'edit';
				form.act.value = (displayIdxno) ? 'contentDataUptForm' : 'contentDataCrtForm';
				form.submit();
			}
		});
	}
	
	// 컨텐츠 선택에서 이전 템플릿 선택 page로 - GET방식
	,evtBackCondition:function(name)
	{
		var $btn = $("#editbox_btn_prev");
		$btn.click(function(){
			var form = document[name];
			location.href="/?mod=templateSkin&act=editTemplate&section="+form.section.value+"&content_idxno="+form.content_idxno.value+"&box_skin_idxno="+form.box_skin_idxno.value
						+"&box_skin_size="+form.box_skin_size.value+"&display_idxno="+form.display_idxno.value+"&area_idxno="+form.area_idxno.value+"&data_type="+form.data_type.value+"&back=prev";
		});
	}
	
	// 2개 toggle view
	,toggle2View:function()
	{
		var $btnTxt = $("#editbox_write_txt_btn")
			,$btnImg = $("#editbox_write_img_btn")
			,$vTxt = $("#editbox_write_title_box")
			,$vImg = $("#editbox_write_title_img_box");	
		
		// 타이틀 사진이 있다면 타이틀이 사진 필드가 보임
		$vImg.has(".editbox_delete_btn").show(1,function(){
			//$vTxt.hide();
		});
		
		/*
		$btnTxt.click(function(){
			$vTxt.show();
			$vImg.hide();
		});
		*/
		
		$btnImg.click(function(){
			//$vTxt.hide();
			//$vImg.show();
			$vImg.toggle();
		});		
	}
	
	// 개별기사 입력전송
	,submitNewsCreate:function(form)
	{		
		if(!form.link.value){
			alert(lang.editboxWriteRequireLink);
			form.link.focus();
			return false;
		}
		
		if(form.link_target.value=="frame"){
			if(!form.link_target_frame.value){
				alert(lang.editboxWriteRequireFrame);
				form.link_target_frame.focus();
				return false;
			}
		}

		// 사진이 선택되지 않고 업로드된 사진이 없을때 텍스트 타이틀 검사
		if(!form.title_img.value && String($(".editbox_delete_btn[data-gid='title']").attr("data-img-path")||"").length<=0){
			if(!form.title.value){
				alert(lang.editboxWriteRequireTitle);
				form.title.focus();
				return false;
			}
		}
		
		/*
		if(!form.summary.value){
			alert(lang.editboxWriteRequireSummary);
			form.summary.focus();
			return false;
		}
		*/
		
		return true;
	}
	
	// 탭박스 제목 수정
	,submitBoxContent:function(form)
	{		
		var radio = document.getElementsByName("content_title_img_use")
			,title = form.content_title
			,img1 = form.content_title_img1
			//,img2 = form.content_title_img2
			,url1 = form.content_title_img1_url
			//,url2 = form.content_title_img2_url
			,yn = "n";
	
		for(var cnt=radio.length, i=0; i<cnt; i++){
			if(radio[i].checked===true){
				yn = radio[i].value;
				break;
			}
		}
		
		// 이미지 타이틀
		if(yn=="Y"){
			if(img1.value=="" && url1.value==""){
				alert(lang.editboxWriteRequireTitleImg);
				img1.focus();
				return false;				
			}
		}else{
			if(title.value==""){
				alert(lang.validRequireTitle);
				title.focus();
				return false;				
			}
		}
		
		return true;
	}
	
	// html add
	,submitFromHtml:function(form)
	{
		if(!form.html_content.value){
			alert(lang.validRequireContent);
			form.html_content.focus();
			return false;
		}
		return true;
	}
	
	// loading 직후 color, icon 세팅
	,loadSetIconColor:function()
	{
		var form = document.editnews_form
			,iconTitle = form.icon_title.value||""
			,iconSubTitle = form.icon_sub_title.value||""
			,colorTitle = form.color_title.value||""
			,colorSubTitle = form.color_sub_title.value||""
			,$title = $("#editbox_write_title")
			,$subTitle = $("#editbox_write_sub_title");
		
		if(colorTitle) $title.css("color",(colorTitle?colorTitle:""));
		if(iconTitle){
			var iPath = this.vars.iconPath+iconTitle
				,tWidth = $title.width()
				,position = $("input[name='icon_title_position']").val();
			
			$title[position=="back"?"next":"prev"]("span").css("display","inline-block").html('<img src="'+iPath+'" align="absmiddle" alt="" />').find("img").load(function(){
				$title.css("width", tWidth-this.width);
			});		
		}
		
		if(colorTitle) $subTitle.css("color",(colorSubTitle?colorSubTitle:""));
		if(iconSubTitle){
			var isPath = this.vars.iconPath+iconSubTitle
				,stWidth = $subTitle.width()
				,position = $("input[name='icon_sub_title_position']").val();
			
			$subTitle[position=="back"?"next":"prev"]("span").css("display","inline-block").html('<img src="'+isPath+'" align="absmiddle" alt="" />').find("img").load(function(){
				$title.css("width", stWidth-this.width);
			});	
		}
	}
	
	// color, icon event
	,evtClickColorIconBox:function()
	{
		var parents = this
			,form = document.editnews_form
			,$box = $("#editbox_write_icon_color_box")
			,$inputTitle = $("#editbox_write_title")
			,$inputSubTitle = $("#editbox_write_sub_title")
			,widthInputTitle = $inputTitle.width()
			,widthInputSubTitle = $inputSubTitle.width()
			,$checkedPosition = $("#icon_front, #icon_back");
				
		// 열기
		$(".editbox_write_icon_btn").click(function(){			
			var $this = $(this);
						
			parents.vars.$iconColorTarget = $this.prevAll("#editbox_write_title,#editbox_write_sub_title");
			var pos = parents.vars.$iconColorTarget.position();
			$box.show().css({"top":pos.top, "left":(pos.left)});
		});
				
		// 닫기
		$("#ewic_btn_close").click(function(){
			$box.hide();
		});
		
		// 아이콘 위치
		$checkedPosition.click(function(){
			var value = this.value
				,isTitle = parents.vars.$iconColorTarget.is("#editbox_write_title")
				,$prevBox = parents.vars.$iconColorTarget.prev("span")
				,$nextBox =  parents.vars.$iconColorTarget.next("span");
			
			if(value==="front"){
				$nextBox.hide().find("img").appendTo($prevBox.show());
			}else{
				$prevBox.hide().find("img").appendTo($nextBox.show());
			}

			form[isTitle ? "icon_title_position":"icon_sub_title_position"].value = value;
		});
		
		// 아이콘 적용
		$(".ewic_c_icon").click(function(){
			if(parents.vars.$iconColorTarget===null && !parents.vars.$iconColorTarget.is("input"))
				return false;
			
			var filename = this.getAttribute("data-icon")
				,path = parents.vars.iconPath+filename
				,isTitle = parents.vars.$iconColorTarget.is("#editbox_write_title")
				,checkedPosition = $checkedPosition.filter(":checked").val()
				,$prevBox = parents.vars.$iconColorTarget.prev("span")
				,$nextBox =  parents.vars.$iconColorTarget.next("span")
				,$targetBox = (checkedPosition=="back"?$nextBox:$prevBox);
			
			if(filename){
				$targetBox.show()
				.html('<img src="'+path+'" align="absmiddle" alt="" />')				
				.find("img").load(function(){																								// webkit은 이미지가 완전히 load되어야 크기를 잴수 있어 함수 return으로는 좀...
					parents.vars.$iconColorTarget.css("width",((isTitle?widthInputTitle:widthInputSubTitle)-this.width));
				});
				
				// 다른쪽 아이콘 만약 있다면, 없앰
				(checkedPosition=="back"?$prevBox:$nextBox).hide();
				
			}else{
				$prevBox.add($nextBox).hide().empty();
				parents.vars.$iconColorTarget.css("width",(isTitle?widthInputTitle:widthInputSubTitle));
			}
			
			form[isTitle ? "icon_title":"icon_sub_title"].value = filename;						// form 에 저장
			form[isTitle ? "icon_title_position":"icon_sub_title_position"].value = checkedPosition;
		});
		
		// color 적용		
		$(".ewic_c_color").click(function(){
			var color = this.getAttribute("data-color");
			if(parents.vars.$iconColorTarget===null && !parents.vars.$iconColorTarget.is("input")) return false;
			
			parents.vars.$iconColorTarget.css("color",color);
			form[parents.vars.$iconColorTarget.is("#editbox_write_title") ? "color_title":"color_sub_title"].value = color;									// form 에 저장
		});
		
		// input 클릭시 타겟 변경
		$inputTitle.add($inputSubTitle).click(function(){
			parents.vars.$iconColorTarget = $(this);
		});
		
		// drag
		$box.draggable();
	}
	
	// 관련기사
	,openRelationArticle:function()
	{
		var $button = $("#editbox_write_btn_relation");
		$button.click(function(){
			window.open("/?mod=news&act=relationList","relationArticle","width=750,height=600,scrollbars=yes");
		});	
	}
	
	// 관련기사 클릭시 추가하기
	,evtClickedRelationAdd:function()
	{
		var $place = $("#editbox_write_relation", opener.document);
		$("#relation_tab_in").on("click", ".relation_search_btn_add", function(){	
			var $this = $(this)
				,idxnoSelf = $this.attr("data-targetIdxno")
				,title = $this.attr("data-title").replace(/"/, "&quot;")
				,data = idxnoSelf+"|||"+title
				,li = '<li class="editbox_write_relation_li" data-idxno-self="'+idxnoSelf+'">'
					+ '<span class="btn_bullet btn_bullet_0_540"></span>'
					+ '	<a href="/?mod=news&amp;act=articleView&amp;idxno='+idxnoSelf+'" class="editbox_write_a_relation" target="_blank">'+title+'</a>'
					+ ' <a href="#" class="icon_bullet ib_200_540_t editbox_write_btn_relation editbox_write_save_relation" title="'+lang.save+'" data-mode="save">'+lang.save+'</a>'
					+ ' <a href="#" class="icon_bullet ib_100_240 editbox_write_btn_relation editbox_write_mod_relation" title="'+lang.modify+'" data-mode="modify"></a>'
					+ ' <a href="#" class="icon_bullet ib_0_240 editbox_write_btn_relation editbox_write_del_relation" title="'+lang.delte+'" data-mode="delete"></a>'
					+ ' <input type="hidden" name="relation[]" value="in|||'+data+'" />'
					+ '</li>';
			
			if(!$place.find('[data-idxno-self="'+idxnoSelf+'"]').length){
				$place.append(li);			
				util.toast(lang.toastAdded);
			}
		});
	}
	
	// 관련기사 수정,삭제
	,evtClickedRelationUpt:function()
	{
		var $target = $("#editbox_write_relation")
			,separate = "|||";
		
		function allBack(){
			var $a = $target.find(".editbox_write_a_relation");
			
			$a.attr("contentEditable", false).removeClass("editbox_input_editable").nextAll(".editbox_write_save_relation").hide().nextAll(".editbox_write_mod_relation").show();
			
			// 데이터 hidden form 넣음
			$.each($a, function(){
				var $this = $(this)
					,$li = $this.closest(".editbox_write_relation_li")
					,idxno = $li.attr("data-idxno-self")
					,$input = $li.find("input[name='relation[]']")
					,val = $input.val().split(separate);
				
				val[1] = idxno;
				val[2] = $this.text();
				
				$input.val(val.join(separate));
			});			
		}
		
		$target.on("click",".editbox_write_btn_relation"
										,function(){
											var $this = $(this)
												,mode = $this.attr("data-mode")
												,$parent = $this.closest(".editbox_write_relation_li")
												,$input = $parent.find("input[name='relation[]']")
												,idxno = $parent.attr("data-idxno-self");
											
											// 저장 버튼시 
											function save(){
												var $aTag = $parent.find(".editbox_write_save_relation").hide().end().find(".editbox_write_a_relation")
													,val = $input.val().split(separate);
												
												val[1] = idxno;
												val[2] = $aTag.text();
												$input.val(val.join(separate));												
												$aTag.attr("contentEditable", false).removeClass("editbox_input_editable");
												$parent.find(".editbox_write_mod_relation").show();

												$target.sortable("enable");
											}
											
											if(mode=="delete") $parent.fadeOut("fast", function(){ $(this).remove(); });
											else if(mode=="modify"){
												$target.sortable("disable");
												
												allBack();
												
												$this.hide().prevAll(".editbox_write_a_relation").attr("contentEditable", true).addClass("editbox_input_editable").focus().keydown(function(e){
													// 엔터시 저장버튼
													if(e.keyCode===13){
														save();
														return false;
													}
												});	
												$parent.find(".editbox_write_save_relation").show();
												
												// 공백 클릭했을때, 업뎃되게
												$(document.body).click(function(){
													allBack();
													$target.sortable("enable");
												});
											}else if(mode=="save"){
												save();
											}	
											return false;
										});
		
		$target.click(function(e){ e.stopPropagation(); });
	}
	
	// 외부링크
	,relationOutArticle:function(title, link, target)
	{
		if(!title || !link) return false;
		if(!target) target="_blank";		

		var li = '<li class="editbox_write_relation_li" data-idxno-self="'+link+'">'
			+ '	<a href="'+link+'" class="editbox_write_a_relation" target="'+target+'">'+title+'</a>'
			+ ' <a href="#" class="icon_bullet ib_200_540_t editbox_write_btn_relation editbox_write_save_relation" title="'+lang.save+'" data-mode="save">'+lang.save+'</a>'
			+ ' <a href="#" class="icon_bullet ib_100_240 editbox_write_btn_relation editbox_write_mod_relation" title="'+lang.modify+'" data-mode="modify"></a>'
			+ ' <a href="#" class="icon_bullet ib_0_240 editbox_write_btn_relation editbox_write_del_relation" title="'+lang.delte+'" data-mode="delete"></a>'
			+ ' <input type="hidden" name="relation[]" value="out|||'+link+'|||'+title+'|||'+target+'" />'
			+ '</li>';
		
		var $place = $("#editbox_write_relation", opener.document);
		if(!$place.find('[data-idxno-self="'+link+'"]').length){
			$place.append(li);			
			util.toast(lang.toastAdded);
		}
	}
	
	// sort
	,evtRelationSortable:function()
	{
		$("#editbox_write_relation").sortable({
			axis:"y"
			,placeholder: "ui-state-highlight"
			,forcePlaceholderSize:true
			,update:function(event, ui){																				// sort
				// data 조합
			}
		});//.disableSelection();
	}
};


/*****************************************************************************
꾸밈 컨텐츠후 비동기적 붙이기
*****************************************************************************/
var editContents={
	vars:{
		isTarget : false													// 추가되는 객체가 box, html 인가?
	}

	// box, html 추가일때만 scroll/blast 이동 - action : after vs replaceWith (or insert vs update)
	,goScroll:function($scrollObj, action)
	{
		if((action!="after" && action!="insert") || !this.vars.isTarget) return false;
			
		var $scrollTarget = $scrollObj.next();
		
		window.scrollTo(0, $scrollTarget.position().top||0);
		blast.exe($scrollTarget);											// blast			
		this.vars.isTarget = false;											// 초기화
	}
	
	// layer 창 닫기
	,close:function(){
		editSortable.closeEditLayer();
		editSortable.$target.currentBox = {};								// 초기화
	}

	// 경고창
	,alert:function(mode, msg)
	{
		if(mode == "error"){
			if(msg){
				msg = decodeURIComponent(msg);
				alert(msg);
			}
			
			this.close();
			return false;
		}
	}
	
	// 드래그, 표시창 이벤트 재시작
	,restartEvent:function()
	{
		var es = editSortable;
		if(es.state=="S"){						// drag
			es.evtClickedMenu("off");			// 버튼 이벤트 여러번 먹는거 피하기 위해 해제함			
			es.init();
			es.addEvtDrag();
		}else if(es.stateView=="S"){			// view
			es.removeView();
			es.init();
			es.displayView();
		}
	}
	
	// 재시작할 함수 목록
	,restartList:function()
	{
		// mobile 이벤트
		if("mobile" in window) mobile.restartEventList();
		else evt.restartEventList();
	}
	
	// request data
	,requestData:function(mod, act, action){
		var obj = this.box.init();
		if(!obj) return false;
		
		var $target = obj.target		
			,idxno = obj.data.idxno
			,area = obj.data.area
			,areaSize = obj.data.areaSize
			,section = obj.data.section
			,parents = this;
		
		if(!$target || !idxno || !area || !section) return false;		
		mod = mod || "edit";
		at = act || "axCallBoxData";
	
		// call data
		$.post(	"/?dummay="+mod+"-"+act
				,{mod:mod, act:act, idxno:idxno, area:area, area_size:areaSize, section:section}
				,function(data, rst){
					if(rst == "success"){
						if(!data) return false;						
						var result = decodeURIComponent(data);
						
						action = action || "replaceWith";
						$target[action](result);
						
						parents.restartEvent();										// 다른 이벤트 재시작		
						parents.goScroll($target, action);							// 해당 객체로 이동 - 추가일때만,
						parents.close();											// 창닫기
						parents.restartList();										// slide, cube 이벤트 다시
					}else alert(lang.axError);
				},"text");
	}
	
	// get group code
	,getGroupCodeInBox:function()
	{
		if(!editSortable.$target.currentBox.box.target) return false;
		var $box = editSortable.$target.currentBox.box.target.find(".edit_autobox[data-group='true']")
			,values = [];
		$box.each(function(i, ele){
			var code = $(ele).attr("data-group-code");
			if(code) values.push(code);		
		});
		return values;
	}
	
	// 페이지에서 그룹된 객체의 edit_box 찾아서 모든 박스 갱신
	,reloadAfterFindOutBox:function(values)
	{
		if(!values[0]) return false;
		
		for(var i in values){																				// 같은 코드의 상위박스(.edit_box)를 찾아 필요 속성을 가지고 그 박스를 갱신시켜라	
			var $box = $(".edit_autobox[data-group-code='"+values[i]+"']").closest(".edit_box");
			$.each($box, function(i, ele){																	// 해당 코드의 그룹된 박스 모두 갱신
				var $ele = $(ele);
				editSortable.$target.currentBox.box = {
														target : $ele
														,data : {
																	idxno:$ele.attr("data-edit-idxno")||""
																	,area:$ele.attr("data-area")||""
																	,areaSize:$ele.attr("data-area-size")||""
																	,section:$ele.attr("data-section")||""
																}
														};
				
				editContents.requestData("edit", "axCallBoxData", "replaceWith");
			});
		}
	}
	
	// htmlbox 관련
	,html:{
		dataReload:function(html, mode, bankind)
		{
			if(!mode) mode = "insert";
			var $current = editSortable.$target.currentBox.html || editSortable.$target.currentBox.banner;	// html, banner랑 같이 사용		
			if($current===null || !html) return false;
			
			// 2014.10.31 network 광고 + document.write + 이벤트 배너 페이지 새로고침
			if(bankind==="adcontrol"||bankind==="event"){
				location.reload(true);
				return false;
			}
			
			var $html = $(decodeURIComponent(html));
			$current[(mode=="insert"?"after":"replaceWith")]($html);
			
			editContents.restartEvent();
			editContents.close();	
			editContents.goScroll($current, mode);												// 해당 객체로 이동			
			
			if($html.has(".banner_event_box").length>0) banpop.banner($html.find(".banner_event_box"));		// 배너일때, 이벤트 재시작
		}
	}
		
	// box 관련 결과
	,box:{
		init:function(){
			return editSortable.$target.currentBox.box||false;
		}
		,group:function(){
			var values = editContents.getGroupCodeInBox();
			editContents.reloadAfterFindOutBox(values);
		}
		,insert:function(idxno){
			// 박스 자체를 추가할때만,
			editSortable.$target.currentBox.box.data.idxno = idxno||"";
			editContents.requestData("edit", "axCallBoxData", "after");	
		}
		,update:function(){
			// 나머지
			editContents.requestData("edit", "axCallBoxData", "replaceWith");
			editContents.box.group();
		}
	}
};



/*****************************************************************************
개별기사 추가/수정시 이미지 crop & 추후 편집 ㅋ
*****************************************************************************/
var photoEditor={
	vars:{
		api : null															// jcrop api
		,$apiExplanTarget : null											// 위치값 노출 영역
		,popup : null														// 팝업객체
		,orginSize:{width:0,height:0}										// 원본사이즈
	}

	// 로드될때 기본 오토박스에 설정된 사이즈가 기본 사이즈
	,setDefaultImgSize:function(width, height)
	{
		// api 참조하지 못했다면 다시 시작.
		if(this.vars.api===null){
			var parents = this;
			try{
				if(photoList[0].width){									// 사진이 있다면
					setTimeout(function(){
						var $img = $("#photoEditor_image")
							,_photoList = photoList[0];
	
						parents.load($img, _photoList.width, _photoList.height);
						parents.setDefaultImgSize.call(parents, width, height);
					},700);
				}
			}catch(e){}

			return false;
		}
		
		width = parseInt(width, 10);
		height = parseInt(height, 10);
		
		if(!width || !height) return false;
		
		var $inputWidth = $("#pe_manual_size_width")
			,$inputHeight = $("#pe_manual_size_height")
			,$btn = $("#pe_btn_maunual")
			,$btnFixed = $(".pe_btn_fix")
			,$checked = $("#pe_manual_size")
			,form = document.photoEditor_form;
		
		$checked.prop("checked", true);
		$btnFixed.prop("disabled", true);
		$inputWidth.add($inputHeight).add($btn).prop("disabled", false);
		
		$inputWidth.val(width);
		$inputHeight.val(height);
		form.src_w.value = width;
		form.src_h.value = height;
		
		// crop tool
		this.vars.api.setOptions({ minSize:[width, height], aspectRatio:width/height });

		var info = this.getSelectBoxInfo();
		this.vars.api.animateTo([info.x, info.y, info.x+width, info.y+height]);
	}

	// 이미지 업로드, crop 이미지 view toggle
	,evtClickedToggleView:function()
	{
		var $btn = $("#editbox_write_crop_toggle_btn")
			,$viewCrop = $("#editbox_write_crop_img_box")
			,$viewAttach = $("#editbox_write_attach_box");
		
		$btn.click(function(){
			var $this = $(this);
			if($this.attr("data-mode")=="attach") $this.text(lang.photoEditorCropImage).attr("data-mode","crop");
			else $this.text(lang.photoEditorAttachImage).attr("data-mode","attach");
			 
			$viewCrop.add($viewAttach).toggle();
		});
	}

	// 새창띄우기
	,popup:function()
	{
		var $btn = $("#editbox_write_crop_img_btn")
			,parents = this;
		$btn.click(function(){
			var form = document.editnews_form
				,articleMode = form.act.value||"newsUpt"
				,articleIdxno = form.article_idxno.value||""
				,articleType = form.data_type.value||""
				,link = form.link.value||""
				,pop = null
				,imgWidth = form.default_width.value
				,imgHeight = form.default_height.value;
			
			if(!link || !articleIdxno){
				if(!window.confirm(lang.photoEditorRequireLink)) return false;
				
				form.editnews_btn_search.click();
				
				return false;
			}
			
			if(!(pop=window.open("/?mod=photoEditor&act=main&article_mode="+articleMode+"&idxno="+articleIdxno+"&article_type="+articleType+"&img_width="+imgWidth+"&img_height="+imgHeight, "photoEditor", "width=855,height=600,scrollbars=yes"))){
				alert("allow popup!");
				return false;
			}
			pop.focus();
			parents.vars.popup = pop;
		});
	}
	
	// 버튼 이벤트 
	,evtClickedButton:function()
	{
		var $checked = $("#pe_manual_size")
			,$config = $("#photoEditor_config")
			,$btnFix = $config.find(".pe_btn_fix")
			,$formManualWidth = $config.find("#pe_manual_size_width")
			,$formManualHeight = $config.find("#pe_manual_size_height")
			,$btnApply = $("#pe_btn_maunual")
			,$btnCancel = $("#pe_btn_cancel")
			,$img = $("#photoEditor_image")
			,$photoList = $("#pe_list")
			,$photoItems = $photoList.find("a")
			,form = document.photoEditor_form
			,parents = this
			,$noImageBox = $("#photoEditor_no_img")
			,$photoViewBox = $(".photoEditor_list_box,.photoEditor_view_box");
		
		// 사진 뿌리고, 정보 넣기
		this.displayPhoto=function(target){
			var $this = $(target)
				,idxno = $this.attr("data-idxno")||""
				,path = $this.attr("data-path")||""
				,url = $this.attr("data-url")||""
				,width = $this.attr("data-width")||""
				,height = $this.attr("data-height")||""
				,isUpload = $this.attr("data-is-upload")||"false";

			parents.vars.orginSize={width:width, height:height};				// 원본사이즈 저장
			$img.attr("src", url+"?dummy="+Math.random()).removeAttr("style");																				// 기존에 style이 그대로 남아있음
			
			// insert form value
			form.img_idxno.value = idxno;
			form.img_src.value = path;
			form.is_upload_file.value = isUpload;
			// form.src_w.value = width;
			// form.src_h.value = height;
			form.crop_x.value = "";
			form.crop_y.value = "";
			form.crop_w.value = "";
			form.crop_h.value = "";
			
			$this.closest("ul").children("li").removeClass("selected").filter($this.parent("li")).addClass("selected");				// 선택된거 border
			
			// 다른거 선택했다면 없애고 재생성
			if(parents.vars.api !== null)	parents.vars.api.destroy();			
			parents.load($img, width, height);
		};
		
		// 원본보다 큰가?
		this.isCorrectSize=function(width, height){
			if(parents.vars.orginSize.width<width || parents.vars.orginSize.height<height){
				alert("자르는 크기는 실제 이미지보다 작아야 합니다.");
				return false;
			}
			return true;
		};
		
		// 첫번째 사진 먼저 뿌려놓기
		if($photoItems.length>0){
			this.displayPhoto($photoItems[0]);
			
			$noImageBox.removeClass("show");
			$photoViewBox.addClass("show");
		}else{
			$photoViewBox.removeClass("show");
			$noImageBox.addClass("show");
		}
		
		// 사진 클릭시 해당 캔버스로...
		$photoList.on("click", "a"
						,function(){
							parents.displayPhoto(this);
							
							// 크기 정해준거 그대로..
							$img.load(function(){
								var width = form.src_w.value
									,height = form.src_h.value;
								
								if(!width || !height) return false;

								parents.vars.api.setOptions({ minSize:[width, height], aspectRatio:width/height });

								var info = parents.getSelectBoxInfo();
								parents.vars.api.animateTo([info.x, info.y, info.x+width, info.y+height]);
							});
						});
		
		// 체크박스 클릭시 직접입력 활성화/비활성화
		$checked.change(function(){
			var checked = this.checked;
			$btnFix.prop("disabled", checked);
			$formManualWidth.add($formManualHeight).add($btnApply).prop("disabled", !checked);
		});			
		
		// 고정 크기 값 적용
		$btnFix.click(function(){
			var size = this.getAttribute("data-size").split("x")
				,width = Number(size[0])
				,height = Number(size[1])
				,api = parents.vars.api;
			
			if(!width || !height) return false;
			if(!parents.isCorrectSize(width,height)) return false;
			
			api.setOptions({ minSize:[width, height], aspectRatio:width/height });

			var info = parents.getSelectBoxInfo();
			api.animateTo([info.x, info.y, info.x+width, info.y+height]);

			form.src_w.value = width;
			form.src_h.value = height;		
		});
		
		// 필드에 엔터 치더라도 submit 안되게
		$formManualWidth.add($formManualHeight).keydown(function(e){
			if(e.keyCode==13){
				$btnApply.trigger("click");//enter칠때 적용 버튼
				return false;
			}
		});
		
		// 직접 크기 지정
		$btnApply.click(function(){
			var width = Number($formManualWidth.val())
				,height = Number($formManualHeight.val())
				,api = parents.vars.api;
			
			if(!width || !height){
				util.toast(lang.validOnlyNumber);
				return false;
			}			

			if(!parents.isCorrectSize(width,height)) return false;
			
			api.setOptions({ minSize:[width, height], aspectRatio:width/height });

			var info = parents.getSelectBoxInfo();
			api.animateTo([info.x, info.y, info.x+width, info.y+height]);

			form.src_w.value = width;
			form.src_h.value = height;
		});
		
		// 해제
		$btnCancel.click(function(){
			parents.release();
		});
		
	}
	
	// 위치값 뽑기
	,getSelectBoxInfo:function()
	{
		return this.vars.api.tellSelect(); 											//x,y,x2,y2,width,height
	}
	
	// 현재 위치값 저장
	,setPosition:function(c)
	{
		var form = document.photoEditor_form;
		
		form.crop_x.value = c.x;
		form.crop_y.value = c.y;
		form.crop_w.value = c.w;
		form.crop_h.value = c.h;		
		
		this.vars.$apiExplanTarget.text(parseInt(form.src_w.value||c.w, 10) +", "+ parseInt(form.src_h.value||c.h, 10));
	}
	
	// 해제
	,release:function()
	{
		var api = this.vars.api
			,form = document.photoEditor_form
			,$checked = $("#pe_manual_size");
				
		// 버튼 활성화 / 비활성화
		if($checked.prop("checked")===true){
			// 직접입력 활성화 되었다면 비활성화로
			var $input = $("#pe_manual_size_width, #pe_manual_size_height, #pe_btn_maunual")
				,$fixedBtn = $(".pe_btn_fix");
			
			$checked.prop("checked", false);
			$input.val("").prop("disabled", true);
			
			$fixedBtn.prop("disabled", false);
		}else{
			// 표시되어 있는 버튼 있다면 모두 미표시로
		}
		
		api.release();
		api.setOptions({ minSize:[0, 0], aspectRatio:0 });		

		form.crop_x.value = "";
		form.crop_y.value = "";
		form.crop_w.value = "";
		form.crop_h.value = "";
		form.src_w.value = "";
		form.src_h.value = "";
	}
	
	// api load
	,load:function(target, width, height)
	{
		var parents = this;
		$(target).Jcrop({							
							bgOpacity: 0.5											// start off with jcrop-light class
							,bgColor: 'black'
							,addClass: 'jcrop-normal' 
							,bgFade : true
							,minSize : [0,0]
							//,maxSize : [600,3000]
							,trueSize : [width,height]								// 실제 이미지 크기
							,allowResize : true
							,allowMove : true  										// 선택영역 움직이게
							,allowSelect: true  									// 이미지 클릭하면 영역 선택되게
							//,aspectRatio : 4/3 									//width/height
				
							// 다른곳 선택하면 영역선택
							,onSelect : function(c){ parents.setPosition(c); }
				
							// 갱신되면
							,onChange : function(c){ parents.setPosition(c); }
				
							// dbclick
							,onDblClick : function(){ parents.cropSubmit(); }
						}

	    				// init 	
						,function(){
							parents.vars.api = this;
							$(".ord-se.jcrop-handle").after('<div id="crop_explain" class="pe_crop_explain"></div>');			// 크기표시 레이어
							parents.vars.$apiExplanTarget = $("#crop_explain");
						});

	}
	
	// 전송
	,cropSubmit:function()
	{
		var form = document.photoEditor_form
			,cropX = form.crop_x.value
			,cropY = form.crop_y.value
			,cropW = form.crop_w.value
			,cropH = form.crop_h.value
			//,srcW = form.src_w.value
			//,srcH = form.src_h.value
			,articleIdxno = form.article_idxno.value
			//,imgIdxno = form.img_idxno.value
			,imgSrc = form.img_src.value
			,preview = form.preview.value;
		
		if(!imgSrc || !articleIdxno) return false;
		
		if(!cropX || !cropY || !cropW || !cropH /*|| !srcW || !srcH*/){
			alert(lang.photoEditorRequireMakeArea);
			return false;
		}
		
		// 미리보기라면
		if(preview=="ok"){
			var $dialog = $("#photoEditor_preview_dialog")
				,params = "/?"+$(form).serialize();
			
			$dialog.dialog({
				minWidth:500
				,minHeight:500
				//,maxWidth:800
				//,maxHeight:550
				,modal:true
				,open:function(){
					$(this).find("img").attr("src", params).closest(".ui-front").prev(".ui-front").addBack().css("z-index", 600);
				}
				,close:function(){
					$(this).find("img").removeAttr("src");
				}
				,buttons:[{
							text:lang.save
							,click:function(){
									form.preview.value = "";
									form.submit();
							}
						}]
			});
			
			return false;
		}		
		
		return true;
	}
	
	// 전송후 crop 된 이미지 경로 가져옴 + 파일 전송후 작업
	,afterCrop:function(file)
	{
		if(!file) return ;
		
		var form = document.editnews_form;
		
		form.crop_image.value = file;
		
		// 삭제 버튼 활성화
		$(".editbox_delete_btn[data-gid='photo']").show().attr("data-img-path", file);
				
		if(this.vars.popup !== null){
			this.vars.popup.close();
			this.vars.popup = null;
		}
	}
	
	// 파일 업로드 후
	,afterUpload:function(image)
	{
		if(image=="false" || !image){
			alert(lang.photoEditorRequireErrorUpload);
			return false;
		}
								
		var idxno = image.idxno
			,photoUrl = image.photoUrl
			,thumb = util.convertPhotoFilename(photoUrl, "o2t")
			,path = util.getDirNFilename(photoUrl)
			,width = image.width
			,height = image.height
			,$img = $("#photoEditor_image")
			,$photoList = $("#pe_list")
			,form = document.photoEditor_form
			,html = '<li><a href="javascript:void(0);" data-idxno="'+idxno+'" data-path="'+path+'" data-url="'+photoUrl+'" data-thumb="'+thumb+'" data-width="'+width+'" data-height="'+height+'" data-is-upload="true"><img src="'+thumb+'" alt="photo list" /></a></li>';
		
		$(html).prependTo($photoList);
		
		var $a = $photoList.find("a");
		this.displayPhoto($a[0]);
		
		if($a.length<=1) $("#pe_btn_prev,#pe_btn_next").prop("disabled", true);
		
		// iframe 에서 파일 업로드 된거
		$("#photoEditor_no_img").removeClass("show");
		$(".photoEditor_list_box, .photoEditor_view_box").addClass("show");
		$("#photoEditor_upload_frame").remove();
		$("#pe_image").prop("disabled", true);
		
		if(photoList.length<=0){
			photoList=[{width:width, height:height}];
			this.setDefaultImgSize(imgWidth, imgHeight);
		}
	}
	
	// 파일 한개 업로드
	,upload:function()
	{
		$(document.body).on("change","#pe_image",function(){
			var value = this.value
				,$this = $(this);
			
			if(!util.isFileOnlyImg(value)){
				alert(lang.validSelectImage);
				$this.replaceWith($this.clone());
				return false;
			}
			
			$('<iframe src="about:blank" name="photoEditor_upload_frame" id="photoEditor_upload_frame" width="100%" height="500" frameborder="1"></iframe>').appendTo(document.body);
			
			document.photoEditor_file_form.submit();
		});
	}
		
};




/*****************************************************************************
기사 부분
*****************************************************************************/
var article={
	// 각종변수
	vars : {
				sectionCodeArr:[]												// 섹션코드 미리 담아두고 이미 뿌린것이라면 제외하게
				,notInsertSectionCode:["2000000000"]							// 더블클릭해도 추가못하게 하는 코드("2000000000":전체연재라는 단어)
				,tilePage:1														// 타일리스트에서 페이징
				,asideDefaultTop : 75											// 오른쪽 사이드 높이
				,$editorHeightObj:null											// 에디터 글 내용 만큼 높이 늘릴때 에디터내의 객체 저장
			}
		
	// 현재 위지윅모드인가
	,isWysiwyg:function()
	{
		return (oEditors.getById["article_content"].getEditingMode()=="WYSIWYG");
	}
	
	/**
	 *  위지윅모드로 강제 전환
	 *  1:WYSIWYG, 2:HTMLSrc, 3:TEXT
	 */
	,toWysiwyg:function(mode){
		mode = mode||1;
		var edit = "";
		switch(mode){
			case 1: edit='WYSIWYG'; 	break;
			case 2: edit='HTMLSrc'; 		break;
			case 3: edit='TEXT'; 			break;
		}
		
		oEditors.getById["article_content"].exec("CHANGE_EDITING_MODE", [edit]); 
	}
	
	// 폼 고유키 생성
	,getPrimaryKeyOfForm:function()
	{
		return (Math.random()*new Date().getTime()).toFixed();
	}
	
	// 객체가 몇번째인지 - 객체중(wrap) 인덱스를 찾을 객체(target)
	,getIndex:function(wrap, target)
	{
		var idx = parseInt($(wrap).index(target))-1; // hidden으로 감춰진 원본 있다.
		return (idx<=0?0:idx);
	}
	
	// 에디터내의 DOM 가져오기
	,getEditorDom:function(editorId)
	{
		if(!editorId) editorId = "article_content";
		return $(oEditors.getById[editorId].getWYSIWYGDocument());
	}
	
	// 기사 옵션 항목 보이기/감추기
	,openOptionItems:function()
	{
		$("#arl_btn_opt_view").click(function()
		{
			var $parent = $(this);
			$("#arl_write_opt").slideToggle(200, function(){
				if(parseInt($(this).parent().height())<=100)	$parent.removeClass("arl_btn_opt_view_close");
				else $parent.addClass("arl_btn_opt_view_close");
				
				article.evtFixPositionFollowPhotoBox(article.vars.minus);
			});
		});
	}

	// 오른쪽 사진,파일,동영상 탭메뉴
	// 주석 한것은 불특정하게 처음 접속시 저장값이 이상하게 나타난다. 예전에 iPad에서 볼수 있었던 것인데, 그때 해결책으로 removeItem 해도 여전히 나타남 (IE10, firefox에서 한번씩 나타났음. 안 나타난곳이 더 많지만...)
	,evtTabmenu:function()
	{
		var $target = $("#aside_tab_menu");
			//, lsTabmenuHtml = util.localStorage.getItem("asideTabmenu")||"";
		
		// localstorage 에 저장
		/*
		function setItemToLocalStorage()
		{
			try{
				if(util.localStorage)
				{
					util.localStorage.removeItem("asideTabmenu");
					util.localStorage.setItem("asideTabmenu", $target.html());
				}
			}catch(e){}
		}

		if(lsTabmenuHtml)	$target.html(lsTabmenuHtml);
		*/
		$( "#aside_tab_box" ).tabs({
													show:function(event, ui)
													{
														// 다음에 열었을때 마지막 탭 보이게 하려고 
														// setItemToLocalStorage();
													}
											});
											/*
											.find( ".ui-tabs-nav" )
											.sortable(	{ 
																axis: "x" 
																,update:function(event, ui)
																{
																	// 탭 드래그시 위치 html 통채로 저장-귀찮음
																	// setItemToLocalStorage();
																}
															});	
											*/
	}

	/* 
	 * 발행일 선택시 엠바고도 바뀌게-자체 picker 없는 브라우저
	 */
	,selectPubdateChgEmbargo:function(date)
	{
		if(!date) return ;		
		
		var	$target = $("#arl_embargo_date")
			, eDate = $target.val();
		
		if(typeof date==="object") date=date.target.value;
		
		$target.val(eDate.replace(/^\d{4}\-\d{2}\-\d{2}/, date)||date);		
	}

	/* 
	 * 발행일 선택시 엠바고도 바뀌게-datepicker에서 onselect 에 줘도 되지만, 브라우저별로 calendar를 지원할경우를 대비에 onblur로 했다.
	 * opera 는 자체 picker 때문에 잘 안되는 듯.
	 */
	,evtSelectPubdateChgEmbargo:function(obj, target)
	{
		if(!obj) return ;		
		var $obj = $(obj);
		
		$obj.blur(function(){
			var date = $obj.val()
				, $target = $(target)
				, eDate = $target.val();
			
			$target.val(eDate.replace(/^\d{4}\-\d{2}\-\d{2}/, date)||date);
		});
	}

	/**
	 * 작성자 포커스시 작성자 선택창 나왔다 안나왔다 하게...
	 */
	,evtFocusForWriter:function()
	{
		$("#arl_user_name").bind("click focusin",
													function(e){
														var evt = e;
														e.stopPropagation();
														
														var $box = $(this).next(".arl_input_writer_box").slideDown(50).click(function(e){ e.stopPropagation(); });
														$box.find("a.arl_input_writer").click(function(e){
																	e.stopPropagation();
																	
																	// event 2번 걸려서 focusin 이벤트만 처리
																	if(evt.type == "focusin")
																	{
																		var $this = $(this)
																			, name = $.trim($this.text())
																			, email = $this.attr('data-email')
																			, id = $this.attr('data-id');
																		
																		$("#arl_user_id").val(id);
																		$("#arl_user_name").val(name);
																		$("#arl_user_email").val(email);
																		
																		$box.slideUp(50);
																	}																	
																});
														
														$("body").one("click",function(e){
															$box.slideUp(50);
														});
													});
	}
	
	/**
	 * select 태그로 할때...지금은 사용안함
	 * 섹션 리스트 뿌리기
	 * @param 
	 * (string)parentKey : 상위키(default : 0)
	 */	
	,displaySectionList:function(parentKey){	
		if(!(___sectionList instanceof Object)) return;
		
		// 어디에 입력할지 정함 - index 얻어옮
		function getIndex(compare, mode){
			if(!options || options.length<=0) return 0;	
		
			var temp = 0;
			for(var i in options){
				if(isNaN(i)===true) continue;
				
				if(mode == "value"){
					if(compare == options[i].value) return parseInt(i, 10);
				}else{
					if(compare == options[i].getAttribute("parent")) temp=i;
				}				
			}
			
			/* 몇차이상은 2단계를 모두 펼쳐놓기 할때사용
			if(mode=="parent"){
				for(var i in options){
					if(isNaN(i)===true) continue;
					if(options[temp].value == options[i].getAttribute("parent"))	temp=i;
				}
			}*/
			
			return parseInt(temp,10);
		}		
		
		parentKey = parentKey||"0";
		var values = ___sectionList[parentKey]||{}
			, size = values.length																		// 미리 인덱스값 더해놓을려구
			, target = document.getElementById("arl_section_code")
			, options = target.options
			, sectionSet = parseInt(util.localStorage.getItem("sectionSet"))||1; // 세팅된 리스트 펼치기
			
		if(!values || size<=0) return ;
		
		for(var key in values){
			var value = values[key]
				, name = decodeURIComponent(value.name)||""
				, code = value.code||""
				, depth = parseInt(value.depth, 10)||0
				, parent = value.parent||""
				, repeatStr = util.strRepeat(depth,"─")
				, text = (parentKey=="0"?"":"├") + repeatStr + " " +name
				, _key = parseInt(key, 10);
			
			if(!code || !name) continue ;
			if($.inArray(code, article.vars.sectionCodeArr)>=0) continue;					// 이미 삽입되어 있다면 패스
			
			var option = new Option(text, code);
			option.setAttribute("parent", parent);
			
			// 삽입 - 전체보이게와 처음은 그냥 막 덧붙임 
			if(parentKey=="0" || sectionSet==3){
				target.add(option);
			}else{				
				var index = getIndex(parentKey,(_key>0?"parent":"value"))||0;		
				target.add(option, options[index+1]);
			}
			
			// 검색을 위해 담아두기
			article.vars.sectionCodeArr.push(code);
			
			// 재귀 함수-세팅값보다 depth가 작을때만 재귀함수 실행, 세팅된 값은 depth가 2까지만 세팅할수 있다.		
			/* 몇차이상은 2단계를 모두 펼쳐놓기 할때사용
			if(depth<4){
				if(depth<3 && sectionSet > depth) article.displaySectionList(code);
			}
			else{
				article.displaySectionList(code);
			}*/
			
			if(sectionSet > depth || sectionSet==3) article.displaySectionList(code);		
			
		} // end for in
	}
	
	
	/**
	 * select 태그로 할때...지금은 사용안함
	 * 섹션 한번/더블 클릭시 다음 리스트
	 */
	,evtClickCallData:function(){
		var $target = $("#arl_section_code")
			,parents = this;

		$target.on({
			// 하위 데이타 불러오기
			click:function(e){
				e.stopPropagation();
								
				var value = this.value;
				if(!value || !(___sectionList instanceof Object) || !___sectionList[value]) return ;
				
				$target.find("option[value='"+value+"']");
				article.displaySectionList(value);
			}
			// 데이타 모으기
			,dblclick:function(e){
				// 태그 제거
				function stripStr(v){
					return $.trim(v.replace(/├|─/g,"")||v);
				}
				
				// 재귀함수 ... 거슬러 올라가면서 value, text 빼오기
				function getParentValue(_parent){
					if(_parent=="0") return ;
					
					// 선택된 값의 상위 값/키 구하기
					var $target = $selected.prevAll("option[value='"+_parent+"']")
						, _text = stripStr($target.text())
						, _value = $target.val()
						, _params = {"text":_text, "value":_value};
					_parent = $target.attr("parent");													// 선택된 값의 parent key 구하기
					
					// 변수에 담기
					parentsValues.push(_params);
				
					// 재귀
					getParentValue(_parent);
				}
				
				var selected = this[this.selectedIndex]
					, $selected = $(selected)
					, text = stripStr(selected.text)
					, value = selected.value
					, parent = selected.getAttribute("parent")
					, parentsValues = []
					, $form = $("#article_form")
					, $dataField = $("#arl_section_code_data");
				
				if(!value || !text) return;
				if($.inArray(value, article.vars.notInsertSectionCode)>=0 ) return ;																				// 전체연재라는 것을 추가 안되게
				if($form.find("input[name='section_code[]'][value='"+value+"']").size()>0) return ; // 추가되어 있다면 pass
				
 				parentsValues.push({"text":text, "value":value});				// 맨먼저 배열에 담아두기
				
				//--- 돌면서 상위 option빼오기
				getParentValue(parent);
				
				// 상위 섹션이 있다면, 역순으로 바꿈
				if(parentsValues.length>0) parentsValues.reverse();
				
				// display view section
				var sectionText = []; 
				for(var i in parentsValues)	sectionText.push(parentsValues[i].text);	
				
				// 삽입
				$dataField.parent().slideDown(100, function(){
					$form.append('<input type="hidden" name="section_code[]" value="'+value+'" />');					// hidden 값
					//$dataField.append($('<div class="arl_section_code_ele create_bgcolor">'+sectionText.join(" &gt;  ")+' <a href="javascript:void(0);" title="'+lang.delte+'" class="arl_section_code_del" data-value="'+value+'">x</a></div>').fadeIn());
					$dataField.append(parents.sectionHtmlTag(sectionText.join(" &gt;  "), value));
				});
			}
		});
		
	}
	
	// 연재단어 없애기
	,replaceSerialTxt:function(v)
	{
		return $.trim(v.replace("["+lang.sectionSeries+"]",""));
	}
	
	
	/**
	 * 서브섹션 펼쳐놓기
	 * @param
	 * 	$sectionList : 섹션리스트
	 *  depth : 몇차까지 열것인가?
	 */
	,unfoldSectionList:function($sectionList, depth)
	{
		if(!depth) return ;
		
		depth = Number(depth);
		if(!$sectionList) $sectionList = $("#section_list_box").find(".section_list");
		
		// 이전 작업 초기화 - 섹션이 많을경우 다시 생각
		$sectionList.removeClass("open").find(".section_list_btn").removeClass("open").attr("title", lang.unfold);
		
		// 펼치기
		$sectionList.filter(function(){
			return Number($(this).attr("data-depth")<=depth);
		}).addClass("open").not('[data-depth="'+depth+'"]').find(".section_list_btn").addClass("open").attr("title", lang.fold);
	}
	
	
	/**
	 * 섹션관련작업
	 * 하위섹션 유무에 따라 + 표시, + 클릭이벤트로 서브펼치고 (옵션)더블클릭으로 추가
	 * @param
	 *  target : selector
	 * 	isEvent boolean - true : 더블클릭하면 추가, false : 더블클릭이벤트없음 
	 */
	,displaySectionView:function(target, isEvent)
	{
		var parents = this
			,$sectionList = $(target)
			,$li = $sectionList.find(".section_list")
			,isMobile = ($.inArray(util.browser().os||"",["ios","android"])>=0?true:false); // mobile일때는 click event, etc ... dblclick
		
		$.each($li, function(){
			var $this = $(this)
				,depth = Number($this.attr("data-depth"))||1
				,code = $this.attr("data-code")
				,parentCode = $this.attr("data-parent-code")
				
				,$next = $this.next(".section_list")
				,ndepth = Number($next.attr("data-depth"))||1;
			
			if((depth+1)!==ndepth || !ndepth) $this.find(".section_list_btn").css({"visibility":"hidden"});
		});
		
		// 접었다 폈다 아이콘
		$sectionList.on("click", ".section_list_btn", 
								function(){
									var $this = $(this)
										,$parent = $this.closest(".section_list")
										,depth = Number($parent.attr("data-depth"))
										,isOpen = $this.hasClass("open");
									
									if(isOpen){
									// 닫기
										var $lis = $parent.nextUntil(".section_depth_"+depth).filter(function(){ return Number($(this).attr("data-depth")>depth); });
										$lis.add($this.attr("title", lang.unfold)).add($lis.find(".section_list_btn").attr("title", lang.unfold)).removeClass("open");
									}else{
									// 열기
										$parent.nextUntil(".section_depth_"+depth).filter(".section_depth_"+(depth+1)).add($this.attr("title", lang.fold)).addClass("open");
									}
								});
		
		// 더블클릭 or 클릭시 추가 - 기사 작성폼에서 사용
		if(isEvent===true){
			var $form = $("#article_form")
				,$dataField = $("#arl_section_code_data");
			
			$li.on((isMobile?"click":"dblclick"), ".section_list_a", function(){				
					
					// 재귀함수 ... 거슬러 올라가면서 value, text 빼오기
					function getParentValue(_parent){
						if(_parent=="0") return ;
						
						// 선택된 값의 상위 값/키 구하기
						var $target = $parent.prevAll("[data-code='"+_parent+"']")
							, _text = parents.replaceSerialTxt($target.children(".section_list_a").text())
							, _value = $target.attr("data-code")
							, _params = {"text":_text, "value":_value};
						_parent = $target.attr("data-parent-code");													// 선택된 값의 parent key 구하기
						
						// 변수에 담기
						parentsValues.push(_params);
					
						// 재귀
						getParentValue(_parent);
					}
					
					var $this = $(this)
						,$parent = $this.parent(".section_list")
						,text = parents.replaceSerialTxt($this.text())
						,value = $parent.attr("data-code")
						,parent = $parent.attr("data-parent-code")
						,parentsValues = [];
					
					if(!value || !text) return;
					if($.inArray(value, article.vars.notInsertSectionCode)>=0 ) return ;																				// 전체연재라는 것을 추가 안되게
					if($form.find("input[name='section_code[]'][value='"+value+"']").size()>0) return ; // 추가되어 있다면 pass
					
	 				parentsValues.push({"text":text, "value":value});				// 맨먼저 배열에 담아두기
					
					//--- 돌면서 상위 option빼오기
					getParentValue(parent);
					
					// 상위 섹션이 있다면, 역순으로 바꿈
					if(parentsValues.length>0) parentsValues.reverse();
					
					// display view section
					var sectionText = []; 
					for(var i in parentsValues)	sectionText.push(parentsValues[i].text);	
					
					// 삽입
					$dataField.parent().slideDown(100, function(){
						$form.append('<input type="hidden" name="section_code[]" value="'+value+'" />');					// hidden 값
						//$dataField.append($('<div class="arl_section_code_ele create_bgcolor">'+sectionText.join(" &gt;  ")+' <a href="javascript:void(0);" title="'+lang.delte+'" class="arl_section_code_del" data-value="'+value+'">x</a></div>').fadeIn());
						$dataField.append(parents.sectionHtmlTag(sectionText.join(" &gt;  "), value));
					});
					
				return false;
			});
		}
	}
	
	
	/**
	 * 추가된 섹션 지우기
	 */
	,evtDelCodeSectionDisplay:function(){
		var $dataBox = $("#arl_section_code_data").on("click", ".arl_section_code_del", 
																						function(){
																							//if(!window.confirm(lang.confirmDelete)) return ;
																							
																							var $this = $(this)
																								, value = $this.attr("data-value")
																								, $form = $("#article_form");
																							
																							$form.find("input[name='section_code[]'][value='"+value+"']").remove();	// hidden form 제거
																							util.releaseCustomInput($form.find("input[name='_dummy_section_edit[]'][value='"+value+"']"), false);	// 외부 체크 박스 해제
																							$this.parent().fadeOut(function(){
																																	// display 제거
																																	$(this).remove();
																																	if($dataBox.find(".arl_section_code_ele").size()<=0) {
																																		$dataBox.parent().slideUp(300);
																																		$form.find("input[name='section_code[]']").remove();
																																	}
																																});
																						});
	}
	
	/**
	 * 섹션 설정 - 각 브라우저 마다 설정하게
	 */
	,evtClickedSectionSet:function(target){
		try{
			var parents = this
				,_id = "sectionSet"+target
				,$sectionList = $(target).find(".section_list")
				,sectionSet = util.localStorage.getItem(_id)||"1"
				,$sectionEle = $("#section_set_list_1, #section_set_list_2, #section_set_list_3");
			
			parents.unfoldSectionList($sectionList, sectionSet);									// 펼치기
			$sectionEle.prop("checked", false).filter("[value='"+sectionSet+"']").prop("checked",true);
			$sectionEle.on("click", function(){
				if(this.id && this.checked){
					this.checked = true;
					var _value = this.value||1;					
					util.localStorage.setItem(_id, _value);
										
					// 바로 펼치기
					article.vars.sectionCodeArr = [];												// 중복검사용 변수 초기화
					parents.unfoldSectionList($sectionList, _value);
					
					//$("#arl_section_code").children("option").remove();							// 섹션 노출 필드 초기화 - 이전 select tag 사용할때
					//article.displaySectionList("0");												// 출력
				}
				$sectionEle.not(this).prop("checked", false);
			});	
			
		}catch(e){}
	}
	
	/**
	 *  1차에 따른 2차 섹션, 그리고 2차에 종속된 연재 일경우.. 이거 사용 - 현재 쓰는 함수
	 * 섹션 ajax - id : section_code, sub_section_code, serial_code
	 * json :  '{
						"result":"success"
						,"msg":"db update error"
					    ,"data":{
					    			 "section":[{"code":"S2N1", "name":"'.rawurlencode('섹션1').'"}, ...]
					    			,"serial":[{"code":"S2N1", "name":"'.rawurlencode('섹션1').'"}, ...]
					    			}
					  }';
		
		// 썻던 스크립트
		// section event - 1차, 2차, 3차 id, 2차 섹션 value, 연재 value
		article.evtCallSectionList("#arl_section_code", "#arl_sub_section_code", "#arl_sub2_section_code", "#arl_sub3_section_code", subSectionCode, subSectionCode2, subSectionCode3);			// 주섹션 리스트 : 서브섹션은 1차섹션에 종속, 3차섹션은 서브섹션에 종속되어 있을때, 
		article.evtCallSectionList("#arl_section_code_etc", "#arl_sub_section_code_etc", "#arl_sub2_section_code_etc", "#arl_sub3_section_code_etc", subSectionCodeEtc, subSectionCodeEtc2, subSectionCodeEtc3);			// 부섹션 리스트 :
	 */
	,evtCallSectionList:function(sec1, sec2, sec3, serial, sec2Value, sec3Value, serialValue)
	{
		if(!sec1 || !sec2 || !sec3) return ;
		
		var $sec1 = $(sec1)
			, $sec2 = $(sec2)
			, $sec3 = $(sec3)
			, $serial = $(serial)
			, process = 0;
		
		//  내부 함수... 따로두면 변수 라등가 기타등등이 귀찮아 져서 ㅡㅡ;;;
		function callData(depth, value1, value2, value3, $target)
		{
			if(!value1 || !depth) return ;
			
			$.post(	"/?dummy=news-axSectionList-"+depth+"-"+value1+"-"+value2+"-"+value3
					,{mod:"news", act:"axSectionList", depth:depth, code1:value1, code2:value2, code3:value3}
					,function(data,rst)
					{
						if(rst == "success")
						{
							if(data.result == "success")
							{ 
								var json = data.data.section
									, jsonSerial = data.data.serial;
								
								try{
									//if(json.length <= 0) return;
									
									// 타겟 섹션 리스트
									if(depth==2) $target.children("option:gt(0)").add($sec3.children("option:gt(0)")).remove();
									else $target.children("option:gt(0)").remove();
									for(var i in json)
									{
										$target.append('<option value="'+json[i].code+'">'+decodeURIComponent(json[i].name)+'</option>');
									}
									
									// 연재 리스트
									$serial.children("option:gt(0)").remove();
									if(jsonSerial.length>0)
									{
										for(var i in jsonSerial)
										{
											$serial.append('<option value="'+jsonSerial[i].code+'">'+decodeURIComponent(jsonSerial[i].name)+'</option>');
										}
									}
									
								}catch(e){
									alert("illegal json form!!!");
								}
								
								// 로드될때, 정해진 값이 있다면, 그걸로 함.
								if(depth == 2 && sec2Value){
									$sec2.val(sec2Value);	
									process = 1;
								}
								if(depth == 3 && sec3Value){
									$sec3.val(sec3Value);									
									process = 2;
								}
								if(serialValue) $serial.val(serialValue);
							
							}//else alert(data.msg); // if error!!!
						}
					},"json");
		}; // 내부함수끝
		
		$sec1.add($sec2).add($sec3).change(function()
		{
			
			var id = this.id
				,value = this.value					// 선택된 섹션코드
				,depth = 0 								// 선택된 카테고리 순위
				,$target = null							// ajax 후 넘오온 데이타 삽입할 후위 selectbox
				,sec1Id=$sec1.attr("id")||$sec1.prop("id")
				,sec2Id=$sec2.attr("id")||$sec2.prop("id")
				,sec3Id=$sec3.attr("id")||$sec3.prop("id");
			
			if(!id) return ;	

			if(id == sec1Id)								// 1차 카테고리 선택됨
			{
				depth = 2;  
				$target = $sec2;
			}else if(id == sec2Id)					// 2차 카테고리 선택됨	
			{
				depth = 3; 
				$target = $sec3;
			}else if(id == sec3Id)					// 3차 카테고리 선택됨	
			{
				depth = 4; 
				$target = $serial;
			}
		
			// 수정시, 첫 로딩후 섹션을 다시 선택한다면 이전 값 초기화 해줌.
			// 초기화 안해주니까 계속 그 값을 물고 있을려고 한다.
			if(sec2Value || sec3Value || serialValue) sec2Value = sec3Value = serialValue = "";

			// 선택된 값이 없다면.
			if(value == "" || !value)
			{
				// 선택된 값이 없는게 depth 1,2 라면, 하위 카테고리 옵션값 초기화 
				if(depth == 2) $sec2.children("option:gt(0)").add($sec3.children("option:gt(0)")).add($serial.children("option:gt(0)")).remove();
				else if(depth == 3) $sec3.children("option:gt(0)").remove();
				
				//return; // 연재 목록때문에 계속 진행해야...
			}
	
			callData(depth, $sec1.val(), $sec2.val(), $sec3.val(), $target); 			
		});	

		// 수정일때, 또는 최초로드 될때, 1차 2차 연재 선택되어 있게
		// setInterval 쓰는 이유는 1차 로딩 된후 2차 로딩되고 그런식으로 차례로 되어야 한다.
		var sec1Value = $sec1.val(), timeout2=null, timeout3=null;
		if(sec1Value && process==0) callData(2, sec1Value, "", "", $sec2);	
		if(sec2Value){
			timeout2 = setInterval(function(){
											if(sec2Value && process==1){
												callData(3, sec1Value, sec2Value, "", $sec3);
												clearTimeout(timeout2);
											}
											//util.logs("2---"+timeout2)
									}, 30);
		}
		if(sec3Value){
			timeout3 = setInterval(function(){
											if(sec3Value && process==2){
												callData(4, sec1Value, sec2Value, sec3Value, $serial);
												clearTimeout(timeout3);
											}
											//util.logs("3---"+timeout3)
									}, 30);
		}		
	}
	
	/* 2차섹션/연재가 1차에 종속된 경우(현재 SE 버전과 같은경우) 이거 사용
	 * 섹션 ajax - id : section_code, sub_section_code, serial_code, 2차 섹션 value, 연재 value
	 * json :  '{
						"result":"success"
						,"msg":"db update error"
					    ,"data":{
					    				"subSection":[{"code":"S2N1", "name":"'.rawurlencode('섹션1').'"}, ...]
					    				,"serial":[{"code":"S2N1", "name":"'.rawurlencode('연재1').'"}, ...]
					    			}
					  }';
		예 ::: article.evtCallSectionWithSubList("#arl_section_code", "#arl_sub_section_code", "#arl_sub2_section_code", subSectionCode, subSectionCode2);		// 서브섹션과 연재가 1차섹션에만 종속되어 있을때, 둘중 하나만 조건에 맞는거 주석해제
	 */
	,evtCallSectionWithSubList:function(sec1, sec2, sec3, sec2Value, sec3Value)
	{
		if(!sec1 || !sec2 || !sec3) return ;
		
		var $sec1 = $(sec1)
			, $sec2 = $(sec2)
			, $sec3 = $(sec3);
		
		// 내부 함수... 따로두면 변수 라등가 기타등등이 귀찮아 져서 ㅡㅡ;;;
		function callData(value){
			if(!value) return ;
			
			$.post(	"/?dummy=news-axSectionList-"+value
					,{mod:"news", act:"axSectionList", section_code:value}
					,function(data,rst)
					{
						if(rst == "success")
						{
							if(data.result == "success")
							{
								var jsonSection = data.data.subSection
									, jsonSubSection= data.data.serial;
								
								// 2차섹션
								if(jsonSection.length <= 0) return;									
								$sec2.children("option:gt(0)").add($sec3.children("option:gt(0)")).remove();
								for(var i in jsonSection)
								{
									$sec2.append('<option value="'+jsonSection[i].code+'">'+decodeURIComponent(jsonSection[i].name)+'</option>');
								}
								
								// 연재
								if(jsonSubSection.length <= 0) return;
								for(var i in jsonSubSection)
								{
									$sec3.append('<option value="'+jsonSubSection[i].code+'">'+decodeURIComponent(jsonSubSection[i].name)+'</option>');
								}
								
								// 로드될때, 정해진 값이 있다면, 그걸로 함.
								if(sec2Value) $sec2.val(sec2Value);
								if(sec3Value) $sec3.val(sec3Value);
								
							}else alert(data.msg); // if error!!!
						}
					},"json");
		};// 내부함수끝
				
		// select box 선택될때,
		$sec1.change(function()
		{
			var value = this.value;					// 선택된 섹션코드
									
			// 선택된 값이 없다면.
			if(value == "" || !value)
			{
				// 선택된 값이 없는게 depth 1,2 라면, 하위 카테고리 옵션값 초기화 
				$sec2.children("option:gt(0)").add($sec3.children("option:gt(0)")).remove();				
				return;
			}
			
			callData(value);
		});
		
		//  수정일때, 또는 최초로드 될때, 1차 2차 연재 선택되어 있게
		callData($sec1.val());		
	}
		
	// 키업에 맞춰 형식에 맞게 작성유도 obj : array [{"target":"", "type":"date"}] - type : date(0000-00-00), datetime(0000-00-00 00:00)
	,evtKeyForceToWellFormForDate:function(obj)
	{
		if(!obj instanceof Array || !obj[0] instanceof Object) return;
		if(obj[0].target=="") return;
		
		$(obj).each(function(i, ele){
			var type = ele.type;
			$(ele.target).keyup(function(e){
				if(e.keyCode==8) return; // 백스페이스는 넘김
				
				var  $this = $(this)
					, $value = $this.val();
				
				if($value.length == 4 || $value.length == 7) $this.val($value+"-");
					
				if(type == "datetime")
				{
					if($value.length == 10) $this.val($value+" ");
					else if($value.length == 13) $this.val($value+":");
				}
			});
		});
	}
	
	// 오른쪽 사진 박스 에디터에 맞게 따라다니게
	,evtFixPositionFollowPhotoBox:function(minus)
	{
		// 사진이 있을때, 
		//if($("#aside_tab_box").size()>1)
		//{
			article.vars.minus = minus || article.vars.asideDefaultTop;
			
			var $parent = $("#article_content_box")				//	에디터
				, $target = $("#aside_tab_box");						// 따라다닐객체
		
			
			var $aside = $("#aside")
				, targetIndex = $aside.children("*").index($target)
				, top = $parent.offset().top;
			
			// 사진 박스를 제외한 상단 객체 총 높이 구해서 그것보다 에디터의 높이가 작으면 에디터 높이에 맞추고, 크면 0으로 해서 상단 객체랑 붙게 한다. 
			var height = 0;			
			$aside.children("*").each(function(i, ele){
				if(i<targetIndex){					
					height+=parseInt($(ele).height(),10);
				}
			});
			
			var _top = top > height ? top-height-article.vars.minus : 0;
			$target.css({"margin-top":_top});
		//}
	}
	
	/* 업로드시 첨부파일 업로드 중이라고 메시지
	 * @param : mode(string) - show, hide : target(object) - 현재의 document.body
	 */
	,progressScreen:function(mode, target)
	{
		var id = "___upload_progress"
			, msgId = id+"_msg"
			, $target = $(target);
	
		// 보이게
		if(mode=="show")
		{
			var html='<div id="'+id+'" class="'+id+'"></div>'
				, msg = '<div id="'+msgId+'" class="'+msgId+'">'+lang.uploadGeneralIngMsg+'</div>';

			$target.append(html);
			$target.append(msg);
		}
		// 감추기
		else{
			$("#"+id, $target).remove();
			$("#"+msgId, $target).remove();
		}
	}
	
	// 섹션 우선순위 바꾸기
	,evtSortSection:function()
	{
		var $form = $("#article_form");
		$("#arl_section_code_data").sortable({
			axis:"y"
			,forcePlaceholderSize: true
			,placeholder: "ui-state-highlight"
			,update:function(){
				var $this = $(this);
				$form.find("input[name='section_code[]']").remove()
				.end().append(
					$this.find(".arl_section_code_del")
					.map(function(){
						var val = this.getAttribute("data-value");
						return '<input type="hidden" name="section_code[]" value="'+val+'" />';
					}).get().join("")
				);
			}
		}).disableSelection();
	}
	
	// 탭메뉴 보이게
	,showTabmenu:function(v)
	{
		var tab = "#aside_photo_list";
		switch(v){
			case "photo": 	tab = "#aside_photo_list"; 	break;
			case "file": 		tab = "#aside_file_list"; 		break;
			case "video": 	tab = "#aside_video_list"; 	break;
		}
		$( "#aside_tab_box" ).tabs("option", "active", $("#aside_tab_menu a[href='"+tab+"']").parent().index());
	}
	
	/**
	 *  기사리스트에서 전체선택
	 *  $eventTarget : click이벤트를 줄 타겟, $checkbox : 체크박스 이름
	 */
	,evtAllCheck:function($eventTarget, $checkbox){
		if(!$eventTarget || !$checkbox) return ;
		
		var $checkboxes = null;
		$(document.body).on("click", $eventTarget, function(){
							/*
							$checkbox.each(function(){
								var $this = $(this);
								$this.prop("checked", !$this.prop("checked"));
							});
							*/
			
							if($checkboxes===null){ $checkboxes = $($eventTarget); }			
							if($checkboxes!==null){ $checkboxes.toggleClass("on"); }
							
							$checkbox.click();
				 		});
	}
	
	/**
	 * 개개의 기사승인, 엠바고 기사 노출
	 * scRecognition 설명  A(전체), C (검토대기), E(엠바고), L(2주이내 승인기사)  
	 */
	,addEvtClickRecogList:function(){		
		var	form = document.article_list_form
			,mod = form.mod.value
			,act = form.act.value
			,$btn = $(".arl_list_btn_ok")
			,$btnAll = $("#arl_list_btn_all_ok")
			,params = "mod="+mod+"&act="+act+"&sc_recognition="+scRecognition;
				
		// 개개의 기사 승인/엠바고 노출
		$btn.click(function(){
			var $this = $(this)
				,value = this.getAttribute("data-value")
				,idxno = this.getAttribute("data-idxno")
				,isRecog = (scRecognition=="A" || scRecognition=="C" || scRecognition=="L")
				,url = ""; // 기사 승인부분인가?(엠바고가 아닌것을 찾는거임)
			
			// 엠바고기사일때, 노출할꺼냐 물어봄 - 일단 주석
			/*
			if(!isRecog){
				if(!window.confirm(lang.cfgRecogConfirmEmbargo)) return false;
			}
			*/
			
			url = params+"&data_idxno="+idxno+"&all_recognition=N";
			
			// 기사 승인
			if(isRecog) url+="&data_value="+value;
	
			$.post(	"/"
					,url
					,function(data,rst){
						if(rst == "success"){							
							if(data.result == "success"){
								if(isRecog) $this.closest("tr").find(".arl_list_title_a").addClass("arl_list_recognition_E").end().find(".arl_list_btn_ok").removeClass("over").filter($this).addClass("over");	// 버튼 토글, 승인난 기사 회색으로...
								else $this.remove();
								
							}else alert(decodeURIComponent(data.msg));							
						}else alert(lang.axError);
					},"json");
		});	
		
		// 전체 기사승인/엠바고 승인
		$btnAll.click(function(){
			if(!window.confirm((scRecognition=="C" ? lang.cfgRecogConfirmAll : lang.cfgRecogConfirmAllEmbargo))) return false;
			var url = "";

			url = params+"&all_recognition=Y";				
			if(scRecognition=="C") url+="&data_value=B";

			$.post(	"/"
					,url
					,function(data,rst){
						if(rst == "success"){
							if(data.result == "success") location.href=location.href;//location.reload(true);
							else alert(decodeURIComponent(data.msg));							
						}else alert(lang.axError);
					},"json");	
		});
	}
	
	
	/**
	 * 기사가져오기 
	 * return이 먼저 되어 버려 동기적으로 처리하도록 함
	 * 근대 success 후 변수에 저장하려고 했는데, 잘 안됨
	 * decodeURIComponent 하여 처리
	 * @params 
	 *  - (string) idxno 기사코드
	 */
	,getArticleContent:function(idxno)
	{
		if(!idxno) return false;

		var result = 
			$.ajax({
					url:"/"
					,data:{mod:"news",act:"axArticleView",idxno:idxno}
					,async:false
					,dataType:"json"
					,success:function(data, rst, xhr){
						if(rst == "success"){
							if(data.result != "success") alert(decodeURIComponent(data.msg));				
						}else alert(lang.axError);				
					}
				});
		
		return (result.responseText.indexOf("{")==0 ? $.parseJSON(result.responseText) : false);					// { 로 시작해야 json이다 ㅡㅡ;
	}
	
	
	/**
	 * 승인 페이지 view 
	 * @params
	 *  - (string) idxno : 기사 고유키 
	 */
	,evtClickedViewArticle:function()
	{
		var parents = this
			,width = 900
			,height = 650
			,$btn = $(".arl_list_blank")
			,form = document.article_list_form
			,mod = form.mod.value
			,act = form.act.value
			,recognition = form.sc_recognition.value
			,params = "mod="+mod+"&act="+act+"&sc_recognition="+recognition+"&all_recognition=N"
			,buttons = (recognition=="E") ? '<button class="btn_com btn_com_0_1380 arl_list_btn_ok" title="'+lang.articleListBtnEmbargoOk+'" data-value="E">'+lang.articleListBtnEmbargoOk+'</button>' 								// 엠바고
										  : (
												'<button class="arl_list_btn_ok" title="'+lang.articleListBtnHoldNormal+'" data-value="B">일반</button>'					// 노출
											+	'<button class="arl_list_btn_ok" title="'+lang.aritcleListBtnHoldImportant+'" data-value="I">중요</button>'
											+	'<button class="arl_list_btn_ok" title="'+lang.articleListBtnHoldHeadline+'" data-value="T">헤드</button>'
											+	'<button class="arl_list_btn_ok" title="'+lang.articleListBtnHoldMain+'" data-value="M">메인+섹션탑</button>'
											)
			,html = '<div class="edit_layer_box">'
				+  	'	<div class="edit_layer_close_box"><a href="javascript:void(0);" class="icon_bullet ib_0_1200 edit_layer_close" title="'+lang.close+'"></a></div>'
				+  	'	<div class="frame_layer_box edit_layer_frame">'
				+	'		<div class="arl_recog_view_box">'
				+	'			<h2 id="arl_recog_view_title" class="arl_recog_view_title"></h2>'
				+	'			<h3 id="arl_recog_view_sub_title" class="arl_recog_view_sub_title"></h3>'
				+	'			<div id="arl_recog_view_content" class="arl_recog_view_content"></div>'
				+	'		</div>'
				+	'		<div id="arl_recog_view_button" class="arl_recog_view_button">'
				+	'			<span class="arl_recog_view_button_left">'
				+	'				<button class="icon_bullet ib_100_240_t arl_list_btn_ok" title="'+lang.modify+'" data-value="modify">'+lang.modify+'</button>'
				+	'				<button class="icon_bullet ib_0_240_t arl_list_btn_ok" title="'+lang.delte+'" data-value="delete">'+lang.delte+'</button>'
				+	'			</span>'
				+	'			<span class="arl_recog_view_button_right">'+buttons+'</span>'
				+	'		</div>'
				+	'	</div>'
				+  	'</div>';																		// html
		
		// 보기 버튼 클릭
		$btn.click(function(){
			var $this = $(this)
				,$output = $(html)
				,$parentTr = $this.closest("tr")
				,idxno = this.getAttribute("data-idxno")
				,value = this.getAttribute("data-value")
				,url =  {
						modify:'/?mod=news&act=articleUptForm&idxno='+idxno
						,delte:'/?mod=news&act=articleDlt&request_mode=ax&idxno='+idxno
						,param:params+"&data_idxno="+idxno											// 승인 / 노출 url 기본값
					   }
				,postUrl = url.param
				,content = parents.getArticleContent(idxno)
				,articleData = content.data[0];
			
			// 기사가 검색 안될때
			if(content===false){
				alert(lang.articleNotExists);
				editSortable.closeEditLayer();
				return false;
			}
			
			// 기사 내용
			var articleTitle = decodeURIComponent(articleData.title||"")
				,articleSubTitle = decodeURIComponent(articleData.sub_title||"")
				,articleContent = decodeURIComponent(articleData.content||"")
				,levelArr = ["B","I","T","M"]; //일반,중요,헤드,메인+섹션탑
			
			// html 생성			
			$output.find(".edit_layer_close").click(editSortable.closeEditLayer)					// 창닫기
			.end().find("#arl_recog_view_title").html(articleTitle)
			.next("#arl_recog_view_sub_title").html(articleSubTitle)
			.next("#arl_recog_view_content").html(articleContent)
			.end().end().end().find(".arl_list_btn_ok")															// 이벤트
			.click(function(){																		// 기사승인, 노출 버튼 클릭
				var dataValue = this.getAttribute("data-value");
				
				if(dataValue == "modify"){															// 수정
					//location.href = url.modify;	
					window.open(url.modify);
					return false;
				}else if(dataValue == "delete"){													// 삭제
					if(!window.confirm(lang.confirmDelete)) return false;
					//location.href = url.delte;
					//return false;
					postUrl = url.delte.replace(/^\/\?/i,"");				
				}else if($.inArray(dataValue,levelArr)>=0){											// 기사승인 - 엠바고는 위 url 그대로
					postUrl += "&data_value="+dataValue;			
				}else if(dataValue == "E"){															// 엠바고 일때 물어보기 - 일단주석
					// if(!window.confirm(lang.cfgRecogConfirmEmbargo)) return false;
				}
				
				$[dataValue == "delete"?"get":"post"](	"/"											// delete일때만, get 이다.
						,postUrl
						,function(data,rst){
							if(rst == "success"){
								if(data.result == "success"){
									var $target = $this.closest("tr");
									
									if(dataValue == "delete"){										// 삭제
										$target.addClass("arl_delete_tr").delay(700).fadeOut(function(){
											$(this).remove();
										});
									}else if(dataValue == "E") $target.find(".arl_list_btn_ok").remove();// 엠바고 기사 버튼 없애기								
									else $target.find(".arl_list_title_a").addClass("arl_list_recognition_E").end().find(".arl_list_btn_ok").removeClass("over").filter("[data-value='"+dataValue+"']").addClass("over"); // 버튼 토글, 승인난 기사 회색으로...
									
									editSortable.closeEditLayer();									// 레이어닫기
								}else alert(decodeURIComponent(data.msg));
							}else alert(lang.axError);
						},"json");				
			});
			
			// 승인 버튼 미리 선택되게
			if(value!="" && (recognition == "A" || /*recognition == "C" ||*/ recognition == "L")){
				$output.find('.arl_list_btn_ok[data-value="'+($parentTr.find(".arl_list_btn_ok.over").attr("data-value")||"B")+'"]').addClass("over");
			}
			// --- 이벤트 end
			
			util.floatLayer(width, height, $output);												// 레이어 열기
			
			return false;
		});
	}
	
	
	/**
	 * ___sectionList 거슬러 올라가 값 빼오기
	 * @params
	 *  - code : 검색할 코드번호
	 *  - arr : 담아놀 객체
	 */
	,getSectionFullNames:function(code, arr)
	{
		if(!___sectionList) return "";
		if(!(arr instanceof Array)) return "";
		
		for(var i in ___sectionList){
			for(var j in ___sectionList[i]){
				var obj = ___sectionList[i][j];
				if(obj.code == code){
					//arr.unshift((obj.serial_state=="S"?"["+sectionSeries+"]":"")+decodeURIComponent(obj.name));
					arr.unshift(decodeURIComponent(obj.name));
					
					if(obj.code == 0) return ;
					this.getSectionFullNames(obj.parent, arr);	
					
					break;
				}					
			}
		}
	}
	
	/**
	 * 일정 시간 localstorage에 저장
	 */
	,evtSaveContentsStorage:function(interval)
	{
		if(!interval) interval = 60;			// 60 second 으로 고침
		
		var parents = this
			,contents = this.convertJson()		// localstorage
			,writeTime = ""
			,title = "";
		// 있는지 체크
		if(contents.idxno){
			if(contents.title) title = lang.articleTitle+" : "+decodeURIComponent(contents.title||"")+"\n";
			if(contents.local_write_time) writeTime = lang.articleConfirmLocalstorageWriteTime+" : "+(contents.local_write_time||"")+"\n\n";
			
			if(!window.confirm(title+writeTime+lang.articleConfirmTempData)) parents.removeContentsStorage();		// 취소면 삭제
			else parents.callContentsStorage();														// 덮어씌움
		}
		
		setInterval(parents.saveContentsStorage, interval * 1000);		
	}
	
	/**
	 * 기사 localstorage에 임시 저장 - IE8이상만
	 */
	,saveContentsStorage:function()
	{
		if(!util.localStorage) return ;
		
		// 에디터 폼 업데이트
		oEditors.getById["article_content"].exec("UPDATE_CONTENTS_FIELD", []);
		
		var form = document.article_form
			,serialize = $(form).serializeArray()
			,json = []
			,j = 0;
	
		if(serialize.length<=0) return ;
		
		// 데이타 담기
		for(var i in serialize){
			var parse = serialize[i]
				,name = parse.name
				,value = encodeURIComponent(parse.value);
			
			// section_code는 배열이기에 {}로 바꾸면 한개만 나옴 ;
			if(name == "section_code[]"){
				name = name.replace("[]","["+j+"]");
				j++;
			}
			
			json.push('"'+ name +'":"'+ value +'"');
		}
		
		json.push('"local_write_time":"'+util.getCurrentDateTime()+'"');			// 현재날짜 저장
		
		util.localStorage.setItem("articleContents", "{" + json.join(",") + "}");		
		util.toast('<span class="toast_loading ajax_load_icon_small_white"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + lang.articleToastSaveLocalStorage);
	}
	
	/**
	 * json 만들기
	 */
	,convertJson:function()
	{
		return $.parseJSON(util.localStorage.getItem("articleContents")||"{}");
	}
	
	// 섹션태그 붙이기
	,sectionHtmlTag:function(name, code)
	{
		if(!name || !code) return ;
		
		return '<div class="arl_section_code_ele create_bgcolor view">'+name
				+'	<a href="javascript:void(0);" title="'+lang.delte+'" class="icon_bullet ib_0_240 arl_section_code_del" data-value="'+code+'" title="'+lang.delte+'"></a>'
				+'</div>';
	}
	
	/**
	 * 가져와서 뿌려주기
	 */
	,callContentsStorage:function()
	{
		if(!util.localStorage) return ;
		
		var contents = this.convertJson()
			,form = document.article_form
			,$form = $(form)
			,sectionCode = "section_code[]"
			,$displayTarget = $("#arl_section_code_data")
			,exceptFields = ["local_write_time"];						// 자동 채움안할 필드명
	
		if(typeof contents !== "object") return ;						// 객체 형태가 아니라면 pass
		if(!contents.idxno) return ;									// idxno 가 없다는거 제대로 저장되지 않은것.
		
		$form.find("input[name='"+sectionCode+"']").remove().end().find("#arl_section_code_data").empty();			// 배열형태이어서 있는지 없는지 이런거 체크하기가 까다로움. 그래서 없앴다 재생성 (input + display 객체)
		
		for(var key in contents){
			var name = key.replace(/\[[0-9]+\]/i,"[]")
				,value = decodeURIComponent(contents[key]);
			
			if($.inArray(name, exceptFields)>=0) continue;
			
			// sectioncode가 있을때도 있고 없을때도 있어서 없다면 생성함
			if(name == sectionCode){
				var arr = [];											// 정리된 값 붙이기
				this.getSectionFullNames(value, arr);					// 상위 섹션 찾기
				if(arr.length>0) $displayTarget.append(this.sectionHtmlTag(arr.join(" &gt; "), value));		// append		
				
				// hidden 값 붙이기
				$form.append('<input type="hidden" name="'+name+'" value="'+value+'" />');
			}else form[name].value = value;
		}
		
		// section code가 있다면 필드 보이게
		if(sectionCode in form) $("#arl_section_code_data_box").addClass("view");
	}
	
	/**
	 * submit 시 remove
	 */
	,removeContentsStorage:function()
	{
		if(!util.localStorage) return ;
		util.localStorage.removeItem("articleContents");
	}
	// oEditors.getById["article_content"].exec("UPDATE_CONTENTS_FIELD", []);	//에디터에서 textarea로 옮기기
	
	/**
	 * 리스트의 섹션 펼쳤다 접었다하기
	 * 
	 * @params
	 *  target : 이벤트줄 객체
	 *  scCode : 미리 펼쳐놓을 섹션
	 */
	,evtClickedSectionList:function(target, scCode)
	{
		var $target = !!target.jquery?target:$(target);
		
		// 처리 함수
		function exec(_this){
			var _$this = $(_this)
				,$this = _$this.is(".arls_btn_more")?_$this:_$this.find(".arls_btn_more")
				,isShow = $this.is(".arls_show")
				,$parent = $this.closest(".arls_li");
			
			$this.text(isShow?"+":"-")[isShow?"removeClass":"addClass"]("arls_show");
			$parent[isShow?"removeClass":"addClass"]("show").nextUntil(".arls_depth_1").css({
				"position":(isShow?"absolute":"static")
			});
		}
		
		$target.on("click", function(){	exec(this);	});
		
		// 코드가 있다면 섹션 펼쳐놓기 
		if(scCode){
			var $element = (function(){
	        	var $obj = $("#arls_section_"+scCode);
	        	if($obj.is(".arls_depth_1")===false){	
	        		var _$obj = $obj.prevUntil(".arls_depth_1");
	        		_$obj = $(_$obj[_$obj.length-1]).prev();
	        		
	        		if(_$obj.length<=0) $obj = $obj.prev(); 
	        		else $obj = _$obj;	        	
	        	}
	        	
	        	return $obj;
	      	})();
			
			exec($element);
		}
	}
	
	// 크레딧 추가
	,addCredit:function()
	{
		$(document.body).on("change", ".credit_select", 
			function(){
				var $this = $(this)
					,$textarea = $this.closest("form").find(".photo_caption_text,.video_content_text")
					,content = $textarea.val()
					,val = this.value;
	
				if(!val) return false;
				
				$textarea.val(content+' <div class="a_credit">'+val+'</div>');				
			});
	}
	
	/*클릭 타일형리스트 더보기 버튼
	 * <script type="text/javascript" charset="utf-8" src="{$IM_DOMAIN}/script/masonry.pkgd.min.js"></script>
		// 타일만들기
		$tileContainer = $('#tile_list_transform');
		$tileContainer.masonry({
		  //columnWidth: 225,
		  itemSelector: '.targets',
		  gutter:0,
		  isOriginLeft:true,
		  isOriginTop:true
		});
		
		@param
		 - origin : t(thumbnail) or o(orgin photo) : default t
	 */ 
	,evtClickedTileList:function(origin)
	{
		var parents = this
			,$state = $("#tile_list_state")
			,$target = $("#tile_list_btn_more");
		
		if(!origin) origin='t';
		$target.click(function(){
			
			var params = util.linkToJson(location.search.replace(/^\?/,""))
				,clss = "arr_bullet ab_300_10";
			
			$state.addClass("loading");
			parents.vars.tilePage++								// 페이징증가 - 이미 1페이지는 뿌려져 있다
			
			// 파라미터 교체
			params['act'] = (params['act'] === "writerArticleList"?"axWriterArticleList":"axArticleList");	// 내기사 보기, 일반적 기사 분리
			params['page'] = parents.vars.tilePage;		
			params['sc_word'] = decodeURI(params['sc_word']||"");	// 인코딩 된 한글 디코드 함
			params['total'] = params['total']||10;				// ajax는 total값이 중요하지 않기에 임의로 보냄-total 갯수 재어오는 query 실행안되게하기 위해.
			
			$.get(	"/"
					,params
					,function(data, rst){
						if(rst === "success"){
							if(data.result === "success"){
								var cnt = data.data.length;
								if(cnt<=0 || $tileContainer==null) return false;

								var boxes = [];
								for(var i=0; i<cnt; i++){
									var datas = data.data[i]
										,idxno = datas.idxno
										,fileExists = datas.file_exists||"false" 
										,defaultImgUrl = (origin==="o"?util.convertPhotoFilename(datas.default_img_url,"t2o"):datas.default_img_url)
										,defaultImgHeight = fileExists=="true" ? (Number(datas.default_img_size.height||0)+(origin==="o"?0:0)) : 0
										,title = decodeURIComponent(datas.title)
										,summary = decodeURIComponent(datas.summary)
										,userName = decodeURIComponent(datas.user_name)
										,date = datas.date
										,link = "/?mod=news&act=articleView&idxno="+idxno
										/*,link = "/?mod=news&act=articleView&idxno="+idxno+"&sc_code="+(params["sc_code"]||"")+"&page="+params["page"]+"&total="+(params["total"]||"") @update 2016/08/29 */
										,$clone = $("#sample").clone();
									
									$clone.removeClass("sample").removeAttr("id").addClass("targets").find(".title_a").html(title).attr("href", link)
									.end().find(".info").text(userName).end().find(".etc").append(date);
									
									// 사진
									if(fileExists=="true"){
										defaultImgHeight = ((datas.default_img_size.height*190)/datas.default_img_size.width);
										$clone.find(".thumb_box").css("height",defaultImgHeight+"px").children("a").attr("href", link).children(".thumb").attr("src",defaultImgUrl)
										.closest(".list").children(".blank,.summary").remove();
									}else{
										$clone.find(".thumb_box").remove().end().find(".summary_a").html(summary).attr("href", link);
									}
									
									$tileContainer.append($clone).masonry('appended', $clone);
								}
							}else util.toast(decodeURIComponent(data.msg))
						}else alert(lang.axError);
						
						if(typeof $tileContainer!="undefined") $tileContainer.imagesLoaded(function(){ $tileContainer.masonry(); });
						$state.removeClass("loading");
					},"json");
			
			
			return false;
		});
		
		// 스크롤 끝에 다다르면 재호출
		var $window = $(window)
			,$document = $(document)
		$window.scroll(function(){
			if($window.scrollTop()>=($document.height()-$window.height())){
				$target.trigger("click");
			}
		});
	}	
	
	/* 와이즈넷 검색
	 * @params
	 *  - sampleTaret : 요약문형, 제목형 중 타겟정할것 
	 */
	,wisenutSearchParse:function(sampleTarget)
	{
		var $result = $("#search_article_result")
			,$articleCount = $("#search_article_count")
			,$artilceBtn = $("#sa_btns_more_article")
			,$sample = $(sampleTarget);		
		
		try{		
			var title = "",content = "",viewDate = "",secTitle = "",default_img = "",pdf = "",writer = "",area = "",str = "",view_default_img = "",dnfile = "",$clone = "",href = "",src = "";
			
			if(total){
				$articleCount.text(util.numberFormat(total));
				$artilceBtn.attr("href", $artilceBtn.attr("href")+"&total="+total);				// 링크에 추가
			}
								
			for(var i = 0; i < response.length; i++) {
				$clone = $sample.clone();
				
				title = response[i][0][0]||"";
				subtitle = response[i][1][0]||"";
				writer = response[i][2][0]||"";
				content = response[i][3][0]||"";
				secTitle = response[i][4][0]||"";
				default_img = response[i][5][0]||"";
				viewDateYear = response[i][6][0]||"";
				viewDateMonth = response[i][7][0]||"";
				viewDateDay = response[i][8][0]||"";
				viewDate = viewDateYear + "-" + viewDateMonth + "-" + viewDateDay;
				pdf = response[i][9][0]||"";
				newsPage = response[i][10][0]||"";
				onoff = response[i][11][0]||"";
				area = response[i][12][0]||"";
				originNum = response[i][13][0]||"";
				
				src = util.convertPhotoFilename(PH_DOMAIN+"/news/photo/"+default_img, "o2t");
				href = "/?mod=news&act=articleView&idxno="+originNum;
		
				$clone.removeClass("hide").removeAttr("id")
				.find(".title_a").html(title).attr("href", href)
				.end().find(".summary_a").html(content).attr("href", href)
				.end().find(".regdate").text(viewDate)
				.end().find(".writer").html(writer)
				.end().find(".pop_a").attr("href", href)
				.end().find(".icon.photo").css("display",(default_img?"inline-block":"none"))
				.end().find(".icon.online").css("display",(onoff=="O"?"inline-block":"none"))
				.end().find(".thumb")[default_img?"show":"hide"]().find(".thumb_a").attr("href",href).find(".img").attr({src:src, alt:title});
				
				$result.append($clone);
			}		
		}
		catch(e) {
		//	alert(e.message);
		}		
	}
	
	// 마지막 섹션 코드 저장 / 호출
	// 호출시 새글로 인정. 아이디,이메일,기자명 채우기
	,exeLastSectionCode:function(mode)
	{
		if(!mode) mode = "set"; // or get
			
		var sectionCode = $("input[name='section_code[]']:hidden").map(function(){ return this.value; }).get().join(",")
			,$articleType = $("input[name='article_type']")
			,articleType = "M"; // 기본 동영상

		if(mode == "get"){
			if(sectionCode) return false; // 이미 섹션코드가 있다면 건너뜀 - 수정모드라 간주

			var $displayTarget = $("#arl_section_code_data")
				,form = document.article_form
				,$form = $(form);

			// 아이디,이메일,기자명 채우기
			if(___userInfo.id) form.user_id.value = decodeURIComponent(___userInfo.id);
			if(___userInfo.email) form.user_email.value = decodeURIComponent(___userInfo.email);
			if(___userInfo.name && ___userInfo.id) form.user_name.value = $(".arl_input_writer_box").find(".arl_input_writer[data-id='"+___userInfo.id+"']").text(); //form.user_name.value = decodeURIComponent(___userInfo.name);

			sectionCode = (util.localStorage.getItem("lastSectionCode")||"").split(",");
		
			if(!sectionCode[0]) return false;
			for(var i=0, len=sectionCode.length; i<len; i++){
				var arr = []											// 정리된 값 붙이기
					,code = sectionCode[i];
				this.getSectionFullNames(code, arr);					// 상위 섹션 찾기
				if(arr.length>0) $displayTarget.append(this.sectionHtmlTag(arr.join(" &gt; "), code));		// append		
				
				// hidden 값 붙이기
				$form.append('<input type="hidden" name="section_code[]" value="'+code+'" />');
			}

			// section code가 있다면 필드 보이게
			if("section_code[]" in form) $("#arl_section_code_data_box").addClass("view");			

			// 기사형태
			articleType = util.localStorage.getItem("lastArticleType")||articleType;
			$articleType.filter("[value='"+articleType+"']").click()

		}else{
			if(!sectionCode) return false;	
			util.localStorage.setItem("lastSectionCode", sectionCode);

			articleType = $articleType.filter(":checked").val()||articleType;
			if(articleType) util.localStorage.setItem("lastArticleType", articleType);
		}//end if		
	}


	/* 
		외부에서 섹션추가 
		샘플 : 
		<dl class="form_dl edit_create_form">
			<dt><label for="arl_forward">편집용 섹션</label></dt>
			<dd class="arl_section_edit_box">
				<label><input type="checkbox" name="_dummy_section_edit[]" value="100000" class="section_edit_chk" checked="checked" /> 메인용</label>
			</dd>
		</dl>
	
		article.outSectionClicked("#a","1395273923");	
	*/
	,outSectionClicked:function(target, sectionCode){
		if(!target || !sectionCode) return false;
		
		var $target=$(target)
			,$form=$(document.article_form)
			,$secBox=$("#section_list_box")
			//,sectionCodes=$secBox.find(".section_list[data-code='"+sectionCode+"'], .section_list[data-parent-code='"+sectionCode+"']").map(function(i,ele){ var $ele=$(ele); return {"code":$ele.attr("data-code"), "name":$.trim($ele.find(".section_list_a").text())}; }).get()||[]	// 탐색하는 섹션 바로 하위섹션
			//,sectionCodes=$secBox.find(".section_depth_1[data-code='"+sectionCode+"']").nextUntil(".section_depth_1").add(".section_depth_1[data-code='"+sectionCode+"']").map(function(i,ele){ var $ele=$(ele); return {"code":$ele.attr("data-code"), "name":$.trim($ele.find(".section_list_a").text())}; }).get()||[] // 1차부터 그 다음 1차전부
			,sectionCodes=$secBox.find(".section_depth_1[data-code='"+sectionCode+"']").add(".section_depth_1[data-code='"+sectionCode+"']").map(function(i,ele){ var $ele=$(ele); return {"code":$ele.attr("data-code"), "name":$.trim($ele.find(".section_list_a").text())}; }).get()||[] // 탐색하는 자신 제외하고 1차부터~그다음 1차섹션전부
			,selectedCode=$form.find("input[name='section_code[]']").map(function(i,ele){ return ele.value; }).get()||[]
			,len=sectionCodes.length
			,inputTag=[];
	
		if(!len) return false;
		for(var i=0;i<len;i++){
			var s=sectionCodes[i];
			inputTag.push('<label style="width:30%;"><input type="checkbox" name="_dummy_section_edit[]" value="'+s.code+'" class="section_edit_chk" '+($.inArray(s.code,selectedCode)>=0?'checked="checked"':'')+' />'+s.name+'</label>');
		}
	
		$target.append(inputTag.join(" "));
		util.inputReload($target);
	
		// 클릭 이벤트
		var $listBox=$("#section_list_box").find(".section_list")
			,$sectionData=$("#arl_section_code_data");
		$form.on("click", ".section_edit_chk", function(){
			var $this=$(this)
				,code=this.value||""
				,checked=this.checked;
	
			if(checked){			// 체크
				$listBox.filter("[data-code='"+code+"']").find(".section_list_a").trigger("dblclick");
			}else{					// 체크 안함
				$sectionData.find(".arl_section_code_del").filter("[data-value='"+code+"']").trigger("click");
			}
		});
	}
	

	// 온라인제목이 없다면 오프라인제목으로 대체
	,inputTitleInMaintitle:function(){
		var form=document.article_form;
		if(form.maintitle.value && !form.title.value){
			form.title.value=form.maintitle.value;
		}
	}
	
};



/*****************************************************************************
기사 전송 (네이버,zoom,...)
*****************************************************************************/
var articleTrans={
	vars : {
		year:null
		,month:null
		,day:null		
	}

	// 검색폼
	,searchForm:function()
	{
		var form = document.article_forward_search_form
			,date = new Date();

		form.year.value = this.vars.year||date.getFullYear();
		form.month.value = this.vars.month||util.strPad(date.getMonth()+1, 2, "0", "left");
		form.day.value = this.vars.day||util.strPad(date.getDate(), 2, "0", "left");
	}

	,evtButtonClick:function()
	{
		var form = document.article_forward_form;
		$("#article_forward_form").on("click",".arl_trans_btn_submit",
				function(){
					form.sendDivision.value = this.getAttribute("data-division")||"I";					
				});
	}
	
	,submitFromList:function(form)
	{
		var $form = $(form)
			,$checked = $form.find("input[name='company[]']:checked")
			,$articleChecked = $form.find("input[name='check_idxno[]']:checked");
		
		if($checked.length<=0){
			alert(lang.transReuireSelectSite);
			return false;
		}
		
		if($articleChecked.length<=0){
			alert(lang.validRequireSelectedItem);
			return false;
		}
				
		if(!window.confirm(lang.transConfirm)) return false;
		
		return true;
	}
		
};


/*****************************************************************************
미디어N
*****************************************************************************/
var median={
	vars : {
		sectionNames : []
	}

	,submitReceive:function(form)
	{
		if(!form.receive_id.value){
			alert(lang.loginNotId);
			form.receive.focus();
			return false;
		}
		return true;
	}
	
	/*
	 * kind : 가져오기 종류 (median, newswire)
	 */
	,evtClickShowSectionBox:function(kind)
	{
		var $sectionBox = $("#article_median_sections_box")
			,$section = $sectionBox.find(".article_median_sections_a")
			,$btnClose = $sectionBox.find("#article_median_section_btn_close")
			,boxHeight = 550 //$sectionBox.height()
			,hafHeight = boxHeight/2
			,scrollBottom = document.body.scrollHeight
			,$table = $("#article_median_form").find("table")
			,$loading = $("#article_median_load")
			,idxno = null
			,$btn = null
			,$tr = null;
		
		if(!kind) kind = "median";
		
		// 닫기
		$btnClose.click(function(){
			$sectionBox.fadeOut("fast");
		});
		
		// 보이기
		$(".article_median_btn_get").click(function(){
			var $this = $(this)
				,position = $this.position()
				,top = position.top - hafHeight
				,dataKind = $this.attr("data-kind");
			
			// 기사 전송 환경설정이랑 같이 사용
			if(dataKind=="cts" || dataKind=="yonhap" || dataKind=="thefact" || dataKind=="imbc" || dataKind=="photo"){
				kind = dataKind;
				$sectionBox.css({"top":top+"px","left":(position.left+100)+"px"}).show();
				return false;
			}
			
			idxno = $this.attr("data-idxno");
			$btn = $this;
			$tr = $this.closest("tr");
			if(!idxno) return false;

			// 혹시 로딩바가 나와 있을지 몰라 다시 없앰
			$loading.hide();
			
			// 색상변경
			$table.find(".article_median_select_get").removeClass("article_median_select_get");
			$tr.addClass("article_median_select_get");
			
			if(top<=0) top = 0;			
			$sectionBox.css({"top":top+"px","left":(position.left+100)+"px"}).show();		
			
			return false;
		});
		
		// 섹션클릭시 이벤트
		$section.click(function(){
			var $this = $(this)
				,code = $this.parent("li").attr("data-code");
		
			// 기사 전송 환경설정이랑 같이 사용-cts,연합
			if(kind=="cts" || kind=="yonhap" || kind=="thefact" || kind=="imbc" || kind=="photo"){
				if(kind==="cts"){
					form_option.cts_section_code.value=code;
				}else if(kind==="yonhap"){
					form_option.yonhap_section_code.value=code;
				}else if(kind==="thefact"){
					form_option.thefact_section_code.value=code;
				}else if(kind==="imbc"){
					form_option.imbc_section_code.value=code;
				}else if(kind==="photo"){
					form_option.photo_section_code.value=code;
				}
				return false;
			}
			////////////////////////////////////////
			
			if(!idxno || !code) return false;
			
			// 뒤처리
			function after(){
				$btnClose.click();
				$btn.fadeOut("fast",function(){
					$(this).remove();
				});
				
				$tr.removeClass("article_median_select_get");
				
				idxno = null;
				$btn = null;
				$tr = null;
			}
			
			
			// 가져오기
			// 뉴스와이어
			if(kind==="newswire"){
				// 새창으로 전송
				var url = { mod:"newsForward", act:"newswireTransCrt", idxno:idxno, section_code:code }
					,form = util.createHiddenForm(url, {id:"dummy_newswire", method:"post", action:"/?dummy="+url.mod+"-"+url.act, target:"_blank"});
				document.body.appendChild(form);
				form.submit();
				
				form.remove();								
				after();				
			}
			// 미디어엔
			else if(kind==="median"){
				$loading.show();
				
				$.post(	"/?dummy=newsForward-medianTransCrt"
						,{mod:"newsForward",act:"medianTransCrt",idxno:idxno,section_code:code}
						,function(data, rst){
							if(rst === "success"){
								if(data.result === "success"){
									after();								
									util.toast(lang.articleMedianGetArticle);
								}else alert(decodeURIComponent(data.msg));
							}else alert(decodeURIComponent(data.msg));
							
							$loading.hide();
						},"json");
			}
			
			return false;
		});
	}
	
	
	// 부모섹션명 가져오기
	,getSectionName:function($obj, parentCode)
	{
		if(!parentCode || !$obj) return false;
		
		$obj = $obj.prevAll(".article_median_sections_li[data-code='"+parentCode+"']");
		parentCode = $obj.attr("data-parent-code");
		var name = $.trim($obj.text());
		if(!name) return false;
		
		median.vars.sectionNames.push(name);
		median.getSectionName($obj, parentCode);
	}
	
	// 섹션추가(사용안함) - 하나씩 하는걸로 변경
	,evtClickedAddSection:function()
	{
		var parents = this
			,$form = $("#article_median_form")
			,$checkbox = $form.find("input[name='idxno']");
		
		$("#article_median_sections_box").on("click",".article_median_sections_a"
													,function(){
														median.vars.sectionNames = [];
														
														var $checked = $checkbox.filter(":checked");														
														if($checked.length<=0) return false;
														
														var $this = $(this)
															,$parent = $this.closest("li")
															,txt = $.trim($this.text())
															,code = $parent.attr("data-code")
															,parentCode = $parent.attr("data-parent-code")
															,sectionNames = "";
														
														if(!txt||!code) return false;
														
														// 상위 섹션 구하기
														parents.getSectionName($parent, parentCode);
														parents.vars.sectionNames.push(txt);
														
														sectionNames = median.vars.sectionNames.join(">");
														
														$.each($checked, function(i,ele){
															var $_this = $(ele)
																,$sectField = $_this.closest("tr").find(".article_median_section_list")
																,_codes = $_this.data("data-codes")||[]
																,_a = '<a href="#" class="amsl_a" title="'+lang.delte+'" data-code="'+code+'">'+sectionNames+'</a>';
															
															// 없을때만, 추가됨
															if($.inArray(code, _codes)<0){
																_codes.push(code);
																$_this.data("data-codes", _codes);
																$sectField.append(_a);
															}
														});
														
														return false;
													});
		
		// 추가된 섹션 삭제
		$form.on("click", ".amsl_a", function(){
										var $this = $(this)
											,code = $this.attr("data-code")
											,codes = $this.closest("tr").find("input[name='idxno']").data("data-codes")||[]
											,index = $.inArray(code, codes);
										
										if(codes.length>0 && index>=0){
											codes.splice(index, 1);											// remove code data
											$this.fadeOut("fast", function(){$(this).remove();});			// remove section name
										}
										
										return false;
									 });
	}
	
	// 전송(사용안함 - 하나씩 하는걸로 변경
	,submit:function()
	{
		var $form = $("#article_median_form")
			,$checkbox = $form.find("input[name='idxno']")
			,idxnos = []
			,sectionCodes = [];
		
		$.each($checkbox, function(i, ele){
			var $this = $(ele)
				,codes = $this.data("data-codes")
				,idxno = $this.val();
			
			if(codes && codes[0]){
				idxnos.push(idxno);
				sectionCodes.push(codes.join("|"));
			}
		});
		
		if(sectionCodes && sectionCodes[0] && idxnos && idxnos[0]){
			var form = document.article_median_form
				,mod = form.mod.value||""
				,act = form.act.value||"";
			
			$.post(	"/"
					,{mod:mod, act:act, idxnos:idxnos, sectionCodes:sectionCodes}
					,function(data, result){
						if(result === "success"){
							if(data.result === "success") location.reload();
							else alert(decodeURIComponent(data.msg));
						}else alert(lang.axError);
					},"json");
		}
		
		return false;
	}
		
};


/*****************************************************************************
뉴스와이어(newswire) 가져오기
*****************************************************************************/
var wire={
	evtClickShowSectionBox:function()
	{
		median.evtClickShowSectionBox("newswire");
	}	
};


/*****************************************************************************
기사 view
*****************************************************************************/
var articleView={
	vars:{
		fontSize:14
	}
	// 기사뷰내 아이콘 클릭 이벤트
	,evtClickedViewIcon:function()
	{
		var $button = $("#avi_back, #avi_top, #avi_font_plus, #avi_font_minus, .avi_print, .avi_email, .avi_send_error");		
		$button.click(function(){
								var name = this.id || this.className
									, $articleBox = $("#arl_view_content, #arl_view_content p");
							
								switch(name)
								{
									case "avi_back":								// 뒤로 버튼
										history.back();
									break;
									
									case "avi_top":								// 위로	
										evt.scrollToTop();
									break;
									
									case "avi_font_plus":						// 글자크게
										if(articleView.vars.fontSize >= 30) return ;
										articleView.vars.fontSize+=1;
										$articleBox.css("font-size",articleView.vars.fontSize+"px");
									break;
									
									case "avi_font_minus":					// 글자작게
										if(articleView.vars.fontSize <= 8) return ;
										articleView.vars.fontSize-=1;
										$articleBox.css("font-size",articleView.vars.fontSize+"px");
									break;
									
									case "avi_print":								// 프린트
									case "avi_email":								// 이메일
									case "avi_send_error":					// 오류전송
										var url = ""
											, options = ""
											, idxno = $(this).attr("data-idxno");
									
										switch(name){
											case "avi_email":
												url = DOMAIN+"/?mod=news&act=articleEmailForm&idxno="+idxno;
												options = "width=700, height=600, resizable=no, scrollbars=yes";
											break;
											case "avi_print": // by. shkim 추가 
												url = DOMAIN+"/?mod=news&act=print&idxno="+idxno;
												options = "width=700, height=600, resizable=no, scrollbars=yes";
											break;
											case "avi_send_error":
												url = DOMAIN+"/?mod=news&act=articleErrForm&idxno="+idxno;
												options = "width=700, height=450, resizable=no, scrollbars=yes";
											break;
										}
										
										window.open(url, name, options);
									break;
								}
								
								return false;
						  });		
	}
	
	// 기사이메일 전송
	,evtSubmitSendEmail:function(form)
	{
		var sendName = form.send_name
			, sendEmail = form.send_email
			, title = form.title
			, content = form.content
			, names = document.getElementsByName("name[]")
			, nSize = names.length
			, emails = document.getElementsByName("email[]")
			, eSize = emails.length
			, nResult = eResult = "";				//  등록되어 있다면,
		
		// 이름 - 메일
		if(nSize>0)
		{
			for(var i=0; i<nSize; i++)
			{
				if(names[i].value!="") nResult+=i;
			}
		}
		
		// 이메일 - 이름
		if(eSize>0)
		{
			for(var i=0; i<eSize; i++)
			{
				var _value = emails[i].value;
				if(_value!="" && util.onlyEmail(_value)) eResult+=i;
			}
		}
		
		// 이름과 이메일을 제대로 입력했나?
		if(nResult=="" || eResult=="" || nResult!=eResult)
		{
			alert(lang.arlViewRequireSendEmailTo);			
			return false;
		}		
		
		if(!sendName.value)
		{
			alert(lang.validRequireName);
			sendName.focus();
			return false;
		}
		
		if(!sendEmail.value)
		{
			alert(lang.validRequireEmail);
			sendEmail.focus();
			return false;
		}
		
		if(!title.value)
		{
			alert(lang.validRequireTitle);
			title.focus();
			return false;
		}
		
		if(!content.value)
		{
			alert(lang.validRequireContent);
			content.focus();
			return false;
		}		
		return true;
	}
	
	// 오류신고 submit
	,evtSubmitSendError:function(form)
	{
		var name = form.name
			, email = form.email
			, title = form.title
			, content = form.content;
		
		if(!name.value)
		{
			alert(lang.validRequireName);
			name.focus();
			return false;
		}
		
		if(!email.value)
		{
			alert(lang.validRequireEmail);
			email.focus();
			return false;
		}
		
		if(!title.value)
		{
			alert(lang.validRequireTitle);
			title.focus();
			return false;
		}
		
		if(!content.value)
		{
			alert(lang.validRequireContent);
			content.focus();
			return false;
		}		
		return true;
	}
	
	// check font - 단어 하나는 체크하기 힘듬.mmmmm~~~여러개 두면 성공ㅋ
	,checkFont:function(font)
	{
		if(!font) return true;
		var basicFont = util.localStorage.getItem("articleFont")||"";
		
		if(basicFont==font) return true;
		$(document.body).append('<span id="___dummy_font" style="position:absolute;top:-10000px;font-size:50px" class="'+basicFont+'">mmmmmmmmmmmmmm</span>');
		
		var $dummy = $("#___dummy_font")
			,width = $dummy.width()
			,chgWidth = $dummy.removeAttr("class").addClass(font).width();
		
		$dummy.remove();
		return !(width===chgWidth);
	}
	
	// change font
	,evtClickedChangeFont:function()
	{
		var parents = this
			,savedFont = util.localStorage.getItem("articleFont")||""
			,$view = $("#arl_view_content")
			,$fontList = $("#avi_font_list");
		
		$view = $view.add($view.find("p"));
		
		if(savedFont){
			$view.addClass(savedFont);					// 저장된 코드 적용
			$fontList.find(".avif_a").removeClass("on").end().find("."+savedFont).addClass("on");
		}
		
		$fontList.on("click", ".avif_a", function(){
			var clss = this.getAttribute("data-font");
			if(clss){
				if(parents.checkFont(clss)===false){
					alert(lang.arlViewRequireNotSupportFont);
					return false;
				}
				
				$view.removeClass("avif_gulim avif_dotum avif_gothic avif_batang avif_malgun_gothic").addClass(clss);
				$fontList.find(".avif_a").removeClass("on").filter(this).addClass("on");
				
				try{
					util.localStorage.setItem("articleFont", clss);
				}catch(e){
					// 가끔 처음 키생성시 에러가 나는데 remove해준후 하면 되는듯;
					util.localStorage.removeItem("articleFont");
					util.localStorage.setItem("articleFont", clss);
				}
			}
			
			return false;
		});
	}
	
	// 추천 반대
	,evtPositiveNegative:function()
	{
		var parents = this;		
		$(document.body).on("click", "#avr_btn_positive, #avr_btn_negative"
							,function(e){
								var $this = $(this)
									,$parent = $this.closest("#arl_view_box")
									,articleIdxno = $parent.attr("data-idxno")
									,mode = this.id=="avr_btn_positive" ? "rec" : "opp";
								
								$.post(	"/?dummy=news-articleVoted"
										,{mod:"news", act:"articleVoted", article_idxno:articleIdxno, recommend:mode}
										,function(data, rst){
											if(rst === "success"){
												if(data.result==="success") $this.find(".avr_number").text(data.data[0].count);
												else util.toast(decodeURIComponent(data.msg||""));
											}else alert(lang.axError);
										},"json");
							});
	}
	
	// 기사 갤러리 스킨
	,gallerySkin:function(){
		var $box = $("#arl_view_box")
			,info = []					// 정보 모우기
			,$contents = $box.find("#arl_view_content").find(".news_photo_table").map(function(){
				var $this = $(this)
					,src = $this.find("img").attr("src")
					,thumb = src.replace(/\/news\/photo\/(.*)\.(gif|jpg|jpeg|png|bmp)$/gi,"/news/thumbnail/$1_150.$2")
					,caption = $this.find(".news_photo_table_caption").html();
				info.push(	{
								src : src
								,thumb : thumb
								,caption : caption
							});
			})
			,$btnListPrev = $box.find("#alg_btn_prev")
			,$btnListNext = $box.find("#alg_btn_next")
			,$list = $box.find("#algc_list")
			,$btnInterval = $(".avg_interval")
			,$btnGalleryPrev = $box.find("#avg_btn_prev")
			,$btnGalleryNext = $box.find("#avg_btn_next")
			,$img = $("#avg_img")
			,$caption = $("#avg_caption")
			,cnt = info.length
			,page = 0													// 현재페이지
			,pageCnt = 11												// 한번에 나올 갯수
			,pageWidth = $list.closest(".content").width()				// 리스트 뿌리는 넓이
			,maxPage = Math.ceil(cnt/pageCnt)							// 총 페이지 수
			,index = Number(location.hash.replace(/^#idx-/i,""))||0;
	
		// view ---
		function view(idx){
			$img.attr({"src":info[idx].src, "title":info[idx].caption});
			$caption.html(info[idx].caption);
			$list.children("li").removeClass("on").eq(index).addClass("on");
		}
		
		// buttons
		function btnActive(){
			// 버튼 활성화/비활성화
			$btnListPrev.add($btnListNext).removeClass("disabled");
			if(page===0) $btnListPrev.addClass("disabled");
			if(page===(maxPage-1)) $btnListNext.addClass("disabled");
		}
		
		// 리스트 다음 페이지
		function slide(idx){
			var left = pageWidth * page * -1
		
			$list.animate({"left":left+"px"},200,function(){
				view(index);
				btnActive();				
			});
		}
		
		// 첫 실행 ---
		if(cnt>0){
			var html = "";
			for(var i=0; i<cnt; i++){
				html+='<li class="algc_li'+((i!==0&&(i+1)%pageCnt===0)?" last":"")+'"><img src="'+info[i].thumb+'" title="'+info[i].caption+'" class="thumbs" data-index="'+i+'" /></li>';
			}
			
			$list.append(html);
			
			// 첫사진, 캡션
			view(index);
		}else{
			$list.add($img.parent()).html('<div style="margin:20px 0;text-align:center">'+lang.arlViewGalleryNotExists+'</div>');
			$btnListPrev.add($btnListNext).add($btnGalleryPrev).add($btnGalleryNext).hide();
		}
		
		// 버튼 활성화/비활성화
		btnActive();
		
		
		// 썸네일 클릭 이벤트
		$list.on("click", ".thumbs", function(){
			index = Number($(this).attr("data-index"))||0;			
			//location.hash="idx-"+$this.closest("li").index();
			
			view(index);
			return false;
		});
		
		// 썸네일 리스트 버튼 
		$btnListPrev.add($btnListNext).click(function(){
			var _this = this
				,$this = $(_this)
				,id = _this.id
				,mode = "next";
			
			if(id=="alg_btn_prev"){
				if(page<=0){
					util.toast(lang.arlViewGalleryFirstPhoto);
					return false;
				}		
				index = page*pageCnt-1; // 순서중요(이전버튼 클릭시, 그 페이지의 마지막)		
				page--;	
			}else{				
				if(maxPage<=(page+1)){
					util.toast(lang.arlViewGalleryLastPhoto);
					clearTimeout(st);
					return false;
				}			
				page++;
				index = page*pageCnt; // 순서중요(다음버튼 클릭시, 그 페이지의 처음)
			}
			
			slide();		
			return false;
		});		
		
		// 큰 이미지 화살표
		$btnGalleryPrev.add($btnGalleryNext).click(function(){
			var _this = this
				,$this = $(_this)
				,id = _this.id;

			if(id=="avg_btn_prev"){
				if(index<=0){
					util.toast(lang.arlViewGalleryFirstPhoto);
					return false;
				}else index--;

				if(((index+1)%pageCnt)===0){
					page--;
					slide(index);
				}
			}else{
				if(index>=(cnt-1)){
					util.toast(lang.arlViewGalleryLastPhoto);
					clearTimeout(st);
					return false;
					//page=-1;
					//index=0;
					//slide(index);
				}else index++;
				
				if((index%pageCnt)===0){
					page++;
					slide(index);
				}
			}
			
			view(index);					
			return false;
		});
		
		
		// 자동 넘김
		var st = null
			,_time = Number($btnInterval.filter(":checked").val())*1000;
		function time(){
			var t = Number($btnInterval.filter(":checked").val())*1000;
			if(t<=0){
				clearTimeout(st);
				return false;
			}
			
			$btnGalleryNext.trigger("click");
			
			if(st) clearTimeout(st);
			st = setTimeout(time, t);
		}
		
		if(_time>0)	setTimeout(time, _time);
		
		// 자동넘김 클릭
		$btnInterval.click(function(){
			var val = $btnInterval.filter(":checked").val()
				,_time = Number(val)*1000
			if(val!=0){
				if(st) clearTimeout(st);
				//time()
				st = setTimeout(time, _time);
			} 
		});
	}
	
	// 기사내 큰 사진 보기
	,viewLightBox:function()
	{
		var $images=$("#arl_view_content").find(".news_photo_table").find("img")
			,_width = 1230 //window.innerWidth || (document.documentElement || document.body).clientWidth;
			,_height = window.innerHeight || (document.documentElement || document.body).clientHeight;

		if($images){
			$.each($images, function(){
				var _this = this
					,src = _this.src
					,$this = $(_this);
			
				if($this.parent().is("a")) return;
				util.getImageSize(src, function(size){
					var target = $this
						,width = size.width
						,height = size.height;
					
					// 600 초과하는 것만
					if(width>600){
						// _width 넘는건 _width 으로 fix
						// height도 비율에 맞게
						if(width>_width){
							height = (height*_width)/width;
							width = _width;								// height, width 순서 바꾸기말것!!!
						}
						
						if(_height<height) height = _height-100;		// 화면보다 높지 않게
						
						// click event
						$(target)
						.wrap('<span class="big_size_img"></span>')
						.parent(".big_size_img")
						.css("cursor","pointer")
						//.closest("td").css({"position":"relative","cursor":"pointer"}).attr("title","클릭하면 이미지를 크게 볼 수 있습니다.")				
						//.append('<img src="'+IM_DOMAIN+'/icon_plus.gif" style="position:absolute;right:10px;bottom:15px;z-index:0" />')	
						.click(function(){
											var inTag = '<img src="'+src+'" width="'+width+'" />'
												,html=editSortable.replaceLayerHtmlTag(editSortable.vars.layerBox, lang.close, inTag, null)
												,output = $(html).find(".edit_layer_close").click(editSortable.closeEditLayer).end().find(".edit_layer_frame").css({"height":height+20/*,"background-color":"#fff","text-align":"center"*/}).end();
													
											util.floatLayer(width, height, output);	// layer 띄우기
										});
					}// end if
				});
			});			
		}
	}	
	
	// 만평, 만화 페이징
	,cartoonArticle:function(section)
	{
		var $article = $("#arl_view_content")
			,$imgTarget = $article.find("img") 		// 이미지
			,$articleTitle = $(".arl_view_title") 	// 타이틀
			,$articleDate = $(".arl_view_date") 	//발행일
			,$articleBtns = $(".arl_view_modify, .arl_view_delete, .arl_view_copy") // 수정,삭제,복사 버튼
			
			,$btns = $("#cartoon_btn_prev, #cartoon_btn_next") 		// 이전
			,$list = $("#cartoon_list") 			// 뿌릴 썸네일 리스트
			,$clone = $("#clone")
			,page = location.hash.replace("#___PAGE:","")||1;

		return {
					page:page
					
					// data 가져오기
					,get:function(){
						
						var parents = this;
					 	$.get("/"
								,{mod:"news", act:"axArticleList", sc_recognition:"E", limit:"8", sc_code:section, page:this.page}
								,function(data, rst){
									if(rst === "success"){
										if(data.result == "success"){
											var d=data.data
												,count = d.length;
											if(count>0){
												$list.empty();
												
												for(var i=0; i<count; i++){
													var $cln = $clone.clone() // 디자인 복사할 객체
														,idxno = d[i].idxno
														,userName = d[i].user_name
														,title = d[i].title
														,pubDate = util.timestampToDatetime(d[i].pub_date).strDateWeekHan
														,titleDate = pubDate.substr(6,7)
														,img = PH_DOMAIN+"/news/photo/"+d[i].default_img
														,thumb = d[i].default_img_url;
											
													$cln.attr({
																"data-idxno":idxno
																,"data-user-name":userName
																,"data-title":title
																,"data-img":img
																,"data-date":pubDate
															})
														.removeAttr("id")
														.removeClass("clone")
														.find(".cbi_img").attr({"src":thumb, "alt":titleDate}).end()
														.find(".cbi_title").html(titleDate).end()
														.appendTo($list);
												}
											}else parents.page--;
											
											location.hash = "___PAGE:"+parents.page;
																			
										}else util.toast(lang.toastNotData);					
									}else alert(lang.axError)
								},"json");
								
						return this;
					}
					
					// 썸네일 클릭 이벤트
					,evtClickedThumb:function(){
						$list.on("click", ".cbi_img_a", function(){
							var $box = $(this).parent()
								,idxno = $box.attr("data-idxno")
								,userName = decodeURIComponent($box.attr("data-user-name"))
								,title = decodeURIComponent($box.attr("data-title"))
								,img = $box.attr("data-img")
								,date = $box.attr("data-date");
								
							$imgTarget.attr({"src":img, "alt":title});
							$articleTitle.html(title);
							$articleDate.text(date);
							
							// 수정삭제 버튼에도 idxno 교체
							$articleBtns.each(function(){
								this.href = this.getAttribute("href").replace(/(idxno=\d{0,})/, "idxno="+idxno);
							});
							
							return false;
						});
						return this;
			       }
			       
			       // 이전,다음버튼
			       ,evtClickedBtns:function(){
			       		var parents = this;
			       		$btns.click(function(){
			       			var $this = $(this)
			       				,isPrev = $this.is("#cartoon_btn_prev"); // 이전이냐?
			       				
			       			if(isPrev){
			       				parents.page--;
			       				if(parents.page<=0) parents.page=1;
			       			}else{
			       				parents.page++;
			       			}
			       			
			       			parents.get();	
			       		});
			       		return this;
			       }
			       
			       // 실행
			       ,exe:function(){
			       		this.evtClickedThumb().evtClickedBtns().get()
			       }
			};
	}
	
	/*
 	TV
 	@param
 		sc_code (string) : 섹션코드
	 */ 
	,videoMain:function(sc_code)
	{
		var //$vTitle = $("#ts_video_title")
			vTag = document.getElementById("ts_video_tags")
			,$vTag = $(vTag)
			,videoPosition = $vTag.position().top||0
			,$vListBox = $("#ts_video_list_box")
			,$vListBoxClicked = $vListBox.find(".ts_video_data")
			,$vListSideBox = $("#ts_video_side_box").find(".ts_video_data")
			,$btnMore = $("#ts_video_btn_more")
			,$btnMoreBox = $btnMore.parent(".btn_more")
			,$body = $("html,body");
		
		// 클릭시 플레이 영역으로 데이타 옮김	
		$(document.body).on("click", ".ts_video_a", function(){
			var _this = this,
				$this = $(_this),
				$box = $this.closest(".ts_video_data"),
				title = decodeURIComponent($box.attr("data-title"))||"",
				tag = decodeURIComponent($box.attr("data-tag"))||"",
				idxno = decodeURIComponent($box.attr("data-idxno"))||"",
				side = $box.attr("data-side")||"n",
				href = _this.href;
				
			//$vTag.html(tag).attr({"data-idxno":idxno});
			vTag.innerHTML = tag;		
			vTag.setAttribute("data-idxno", idxno); // IE8 검은색으로 전체 덮는 문제때문에 이렇게 처리.
			//$vTitle.html(title).attr("href", href);	
			
			// 리스트에서 클릭 한것이라면 scroll 위로...play 중 ...
			if(side==="y"){
				$body.animate({scrollTop:videoPosition}, 300, 
								function(){
									$vListBoxClicked.add($vListSideBox).removeClass("on").has(_this).addClass("on");						
								});
			}else{
				$vListBoxClicked.add($vListSideBox).removeClass("on").has(_this).addClass("on");
			}
			
			return false;		
		});
		
		
		// 갯수가 12개가 안된다면 more 버튼 없애기
		if($vListBoxClicked.length<12){
			$btnMoreBox.hide();	
		}else{
		// 12개이상이라면, more 버튼에 click 이벤트
			$btnMore.click(function(){
				$btnMoreBox.addClass("load"); //loading 아이콘
				
				$.get(	"/"
						,{mod:"search", act:"axVideoList", sc_code:sc_code, page:page++}
						,function(data, rst){
							if(rst==="success"){
								if(data.result === "success"){
									var _data = data.data
										,_cnt = _data.length
										,$vListBoxClickedFirst = $vListBoxClicked.filter(":first");
										
									for(var i=0; i<_cnt; i++){
										var $clone = $vListBoxClickedFirst.clone()
											,_idxno = _data[i].idxno||""
											,_href = _data[i].href||""
											,_tags = _data[i].tags||""
											,_title = _data[i].title||""
											,_date = _data[i].date||""
											,_image = _data[i].image||"";
									
										$clone.attr({"data-href":_href, "data-title":_title, "data-tag":_tags, "data-idxno":_idxno})
										.find(".ts_video_a").attr("href", decodeURIComponent(_href))
										.end().find(".tsb_img").attr({"src":_image, "title":decodeURIComponent(_title)})
										.end().find(".tsb_title_a").attr("href", decodeURIComponent(_href)).html(decodeURIComponent(_title))
										.end().find(".date").text(_date)
										.end().appendTo($vListBox);
									}
									
									// 데이타 있다면 list 다시 변수에 담음
									$vListBoxClicked = $vListBox.find(".ts_video_data");
								}else{
									util.toast(decodeURIComponent(data.msg));
									$btnMore.unbind("click").css({"text-decoration":"none","cursor":"default"});
									$btnMoreBox.css("opacity",".5");
									
									page--;
								}
							}else alert(lang.axError);
							
							$btnMoreBox.removeClass("load"); //loading 아이콘 없애기
						},"json");
	
				return false;
			});
		}
	}

	// 단축url카피-트위터url
	,evtClickedCopyTwitterUrl:function(target){
		if(!target)target = ".copy_shorturl";

		$(target).click(function(){
			var idxno = $("#arl_view_box").attr("data-idxno");

			if(idxno){
				var url = encodeURIComponent(DOMAIN+"/?mod=news&act=articleView&idxno="+idxno);

				$.get("/"
						,{mod:"news", act:"axSnsRShortUrl", url:url}
						,function(data,rst){
							if(rst==="success" && data.msg=="success") util.copyExe(data.url);
							else alert(lang.axError);
						},"json");
			}
			
			return false;
		});
	}

	// 기사전송
	,articleSendForwardToPotal:function(){
		$(".btn_article_forward_win").click(function(){
			var article_idxno = $(this).attr("data-article-idxno") 
				,href = "/?mod=newsForward&act=forwardArticleForm&article_idxno=" + article_idxno
				,width = 380	
				,height = 420
				,parents = editSortable
				,html = parents.replaceLayerHtmlTag(parents.vars.layerBoxIframe, lang.close, href, (height-60))
				,output = "";
			
			output = $(html).find(".edit_layer_close").click(parents.closeEditLayer).end();
			util.floatLayer(width,height,output);
			
			return false;
		});
	}

	// 더보기 영역
	,etvMoreArea:function(){
		$(".se2cma_btn").click(function(){
			var $this=$(this)
				,$parent=$this.closest(".se2_custom_more_area")
				,isOpen=$parent.is(".open")											// true 닫는 이벤트, false 여는 이벤트
				,text=isOpen?$parent.attr("data-open"):$parent.attr("data-close");	// 닫기 열기 문구 정함
			$parent.toggleClass("open").find(".se2cma_content").toggleClass("show")
			.end().find(".se2cma_btn").text(text);
		});
	}


};


/*****************************************************************************
관련기사
*****************************************************************************/
var relation={
	vars:{
		startIndex:0
		,multi:false
		,incre:0
		,totalCount:0
	}

	// 관련기사 팝업 이벤트
	,evtClickPopList:function(){
		var $button = $("#arl_add_relation_btn");
		$button.click(function(){
			window.open("/?mod=news&act=relationList","relationArticle","width=750,height=600,scrollbars=yes");
		});		
	}	
	
	// 저장
	,saveForData:function(act, targetIdxno, title, target, link){
		if(!title) return ;
		if(!target) target = "_self";
		if(!act) act = "relation";
		if(!targetIdxno) targetIdxno = "";
		if(!link) link = "";
		
		var openers = null;
		try{ openers = opener.document; }catch(e){ openers = document; } 
		var selfIdxno = openers.article_form.idxno.value
			,parents = this;
		
		if(!selfIdxno) return ; 
		
		$.post(	"/?dummay=news-"+act+"-"+selfIdxno
					,{mod:"news", act:act,article_idxno_self:selfIdxno,  article_idxno_target:targetIdxno, title:title, target:target, link:link}
					,function(data, rst){
						if(rst=="success"){							
							if(data.result=="error") alert(data.msg);
							else{
								var _data = data.data[0]
									, _idxno = _data.idxno||""
									, _idxnoSelf = _data.article_idxno_self||""
									, _idxnoTarget = _data.article_idxno_target||""
									, _title = (decodeURIComponent(_data.title)||"").replace(/&amp;/g,"&")
									, _target = _data.target|""
									, _url = _data.url||"/?mod=news&act=articleView&idxno="+_idxnoTarget
									, $field = $("#arl_relation_data", openers)
									, html = '<li><span class="btn_bullet btn_bullet_0_540"></span> <a href="'+_url+'" target="'+_target+'" class="editbox_write_a_relation">'+_title+'</a> <a href="javascript:void(0)" title="'+lang.delte+'" data-idxno="'+_idxno+'" data-idxno-self="'+_idxnoSelf+'" data-idxno-target="'+_idxnoTarget+'" class="icon_bullet ib_0_240 relation_btn_delete_article"></a></li>';
						
								if(!_title) return;
								
								$field.css("display","block").append(html);
								
								util.toast(lang.toastAdded);
								
								// 묶음일때 결과 alert
								if(parents.vars.multi === true){
									parents.vars.incre++;
									if(parents.vars.totalCount <= parents.vars.incre){
										alert(lang.toastApply);
										parents.vars.totalCount=0;
										parents.vars.incre=0;
									}
								}
							}							
						}else alert(lang.networkError);
					},"json");		
	}

	// 관련기사  추가 클릭-묶음 추가
	,evtClickedAddBtn:function(){
		$("#relation_tab_in").on("click", ".relation_search_btn_add", function(){		
			var $this = $(this)
				, idxnoSelf = $this.attr("data-targetIdxno")
				, title = $this.attr("data-title");
			
			if(document.relation_form.subm.value=="pack"){ // 묶음일때 관련기사 추가
				relation.appendToTabsContent($this, idxnoSelf, title);
			}else{
				if($("#arl_relation_data", opener.document).find(".relation_btn_delete_article[data-idxno-target='"+idxnoSelf+"']").length>0) return false;
				relation.saveForData("relation", idxnoSelf, title);
			}
		});
	}	
	
	// 삭제
	,evtClickedDeleteBtn:function(){
		var $obj = $("#arl_relation_data").on("click", ".relation_btn_delete_article", function(){
							var $this = $(this)
								, idxno = $this.attr("data-idxno")
								, idxnoSelf = $this.attr("data-idxno-self")
								, idxnoTarget = $this.attr("data-idxno-target");
							
							if(!window.confirm(lang.confirmDelete)) return false;
							
							if(!idxnoSelf) return ;
							
							$.post(	"/?dummay=news-relationDlt-"+idxno
										,{mod:"news", act:"relationDlt", idxno:idxno, article_idxno_self:idxnoSelf, article_idxno_target:idxnoTarget}
										,function(data, rst){
											if(rst=="success"){
												if(data.result=="success"){
													$this.parent("li").fadeOut(400,function(){			
														var $self = $(this)
															, $obj = $self.parent("ul");
														$self.remove();	
														if($obj.children("li").size()<=0) $obj.hide();		
														
														util.toast(lang.toastDeleted);
													});
												}else alert(decodeURIComponent(data.msg));					
											}else alert(lang.networkError);
										},"json");			
		});
	}
	
	// 외부 관련기사 추가
	,outArticleSubmit:function(){
		var form = document.relation_out_form
			, title = form.title.value
			, link = form.link.value
			, target = form.target[0].checked===true?"_self":"_blank";
		
		if(!title){
			alert(lang.relationRequireTitle);
			form.title.focus();
			return false;
		}
		
		if(!link){
			alert(lang.relationRequireLink);
			form.link.focus();
			return false;
		}
		
		// 편집화면에서 외부링크 
		if(isEditBox) editBox.relationOutArticle(title, link, target);
		else relation.saveForData("relationOut", "", title, target, link);
		
		form.reset();
		
		return false;
	}
	
	// 순위 바꾸기
	,evtSortable:function()
	{
		var $target = $("#arl_relation_data");
		
		$target.sortable({
			axis:"y",
			placeholder: "ui-state-highlight",
			start:function(evt, ui){				
				relation.vars.startIndex = parseInt($(ui.item.context).index(), 10);
			},
			update:function(evt, ui){
				var endIndex = parseInt($(ui.item.context).index(), 10)
					, $btn = $(ui.item.context).find(".relation_btn_delete_article")
					, idxno = $btn.attr("data-idxno")
					, idxnoSelf = $btn.attr("data-idxno-self")
					, idxnoTarget = $btn.attr("data-idxno-target");
				
				// 순위교체
				if(relation.vars.startIndex >=0 && endIndex >= 0 && relation.vars.startIndex!=endIndex)
				{
					$.post(	"/?dummy=news-axRelationSort"
								,{mod:"news", act:"axRelationSort", idxno:idxno, idxnoSelf:idxnoSelf, idxnoTarget:idxnoTarget, startIndex:relation.vars.startIndex, endIndex:endIndex}
								,function(data, rst)
								{
									if(rst=="success")
									{
										try{
											if(data.result == "error") 
												alert(decodeURIComponent(data.msg));
										}catch(e){
											alert(e.message);
										}
									}else alert(lang.networkError);
								},"json");
				}
			}
		});
		$target.disableSelection();		
	}
	
	// 관련기사 꾸러미 event
	,evtLoadPack:function()
	{
		var $rPack=$("#arl_relation_pack");
		
		// tab event
		new TabBox().defaultClick("#arp_tab");
		
		// 툴팁
		util.showCustomTooltip(".c_tooltip");
				
		// 순위 변경 
		var $sortable=$rPack.find(".tab_content").sortable({axis:"y"});
		
		// 모달창
		$("#arl_add_relation_pack_btn").click(function(){
			$rPack.dialog({
				modal:true
				,width:500
				,height:500
				,open:function(){
					var $this = $(this);
					
					$.get(	"/"
							,{mod:"news",act:"axGetRelationPack"}
							,function(data,rst){
								if(rst=="success"){
									if(!data || data.result=="false"){
										alert(decodeURIComponent(data.msg));
										return false;
									}
									
									for(var id in data){
										var $place = $this.find("#"+id).empty(), _d = data[id]||"", _h = "";
										if(!id || !_d) continue;
										for(var i=0,len=_d.length; i<len; i++){
											var __d = _d[i];
											if(!__d.idxno || !__d.title) continue;
											_h += relation.getPackHtml(__d);
										}
										$place.append(_h);
									}								
								}else alert(lang.axError);									
							},"json");
				}
			});
		});	
		
		// 관련기사 찾기 창
		$("#arp_btn_pop").click(function(){
			var _w=window.open(this.href,"relationArticle","width=750,height=600,scrollbars=yes");
			_w.focus();
			return false;
		});	
		
		// 관련기사 삭제
		$rPack.on("click", ".arpt_item_del", function(){
			if(!window.confirm(lang.confirmDelete)) return false;
			$(this).closest(".arpt_item").fadeOut(function(){ $(this).remove(); });
		});
		
		// 관련기사 수정
		$rPack.on("click", ".arpt_item_mod", function(){
			var $item=$(this).closest(".arpt_item");

			$item.children(".arpt_item_a").on({
				focus:function(){
					$sortable.sortable("disable");
					$(this).addClass("editable");
				}
				,blur:function(){
					var $this=$(this), txt=$this.html();
					if(!txt){
						alert("내용을 입력해 주세요."); 
						return false;
					}
					$sortable.sortable("enable");
					$this.removeClass("editable").prop("contentEditable",false);
					$item.attr("data-title", txt);
					
				}
			}).prop({"contentEditable":true}).focus();
		});
		
		// 관련기사 저장
		$("#arp_btn_add").click(function(){
			var $tContents = $rPack.find(".tab_content")
				,params={};
			$tContents.each(function(i, ele){
				var id = ele.id
					,$ele = $(ele)
					,$items = $ele.find(".arpt_item")
					,obj = {};
				
				if(id && $items.length>0){
					params[id] = $items.map(function(){ return {idxno:this.getAttribute("data-idxno"), title:this.getAttribute("data-title")}; }).get();
				}				
			});
			
			var stringJson = encodeURIComponent(JSON.stringify(params));
			if(stringJson.length<10) return false;
			
			$.post(	"/?dummy=news-axRelationPack"
					,{mod:"news", act:"axRelationPack", json_val:stringJson}
					,function(data,rst){
						if(rst=="success" && data.result=="success") alert(lang.toastSaved);
						else alert(lang.axError);
					},"json");
		});
		
		// 관련기사 기사에 삽입
		$("#arp_btn_insert").click(function(){
			if(!window.confirm("기사에 관련 묶음을 추가할까요?")) return false;
			
			var $items = $rPack.find(".tab_content.on").find(".arpt_item")
				,total=$items.length;
			if(total<=0){
				alert("추가할 관련기사가 없습니다.");
				return false;
			}
			
			// message 띄우기
			relation.vars.multi=true;
			relation.vars.totalCount=total;
			
			var $rData = $("#arl_relation_data").find(".relation_btn_delete_article");
			$.each($items, function(i,ele){
				var $ele = $(ele)
					,idxno = $ele.attr("data-idxno")
					,title = $ele.attr("data-title");

				if($rData.filter("[data-idxno-target='"+idxno+"']").length<=0){
					relation.saveForData("relation", idxno, title);
				}
			});
		});
		
	}
	
	// 묶음 html
	,getPackHtml:function(params)
	{
		return '<div class="arpt_item" data-idxno="'+params.idxno+'" data-title="'+(params.title.replace(/&/g,'&amp;'))+'">'
			  +	'<a href="/?mod=news&act=articleView&idxno='+params.idxno+'" target="_blank" class="ellipsis arpt_item_a">'+params.title+'</a>'
			  +	'<a href="#;" class="icon_bullet ib_100_240 arpt_item_mod">수정</a>'
			  +	'<a href="#;" class="icon_bullet ib_0_240 arpt_item_del">삭제</a>'
			  +'</div>';
	}
	
	// 탭에 표시
	,appendToTabsContent:function($obj, idxno, title)
	{
		if(!$obj || !idxno || !title) return false;
		
		var html = this.getPackHtml({idxno:idxno, title:title})		
			,$place = $("#arl_relation_pack", window.opener.document).find(".tab_content.on")
			,isData = $place.find(".arpt_item[data-idxno='"+idxno+"']").length>0;
		
		if(isData){
			util.toast(lang.editRequireExistsSectionName);
			return false;
		}
		
		$place.append(html);
	}
	
};



/*****************************************************************************
사진 파일 업로드
*****************************************************************************/
var photo={
		resizeWidth:600
		// 사진 데이타 수정하기 위해 전송
		,photoUpdateSubmit:function(obj)
		{
			// 몇번째 파일인지 체크해서 담음 
			// obj.photo_order.value = article.getIndex(".photo_form", obj); // 팝업레이어로 바뀌면서 창띄울때 처리
			obj.temp_upload.value = "photo";
			
			if(!util.onlyNumber(obj.resize_width.value) || Number(obj.resize_width.value)>this.resizeWidth){
				alert(lang.validRequireNumberLimit600);				
				obj.resize_width.focus();
				return false;
			} 
			
			return true;
		}
				
		// 대표사진은 사진에 표시- order(int) : 제외할 photo_list 의 index --- -1 일경우는 삭제할때 이벤트이다.
		,displayRepresentPhoto:function(order)
		{
			if(!order) order = 0;
						
			if(order > -1)
				$("#aside_photo_list input[name='photo_represent']:not(:eq("+(parseInt(order)+1)+"))").prop({"checked":false});		// 대표사진 체크 하나만 되게 - 이게 먼저 일어나야 함 - 삭제시에는 일어날 필요없음 
		
			var $target = $("#aside_photo_list input[name='photo_represent']")
				, $photoList = $target.filter(":checked").parents(".photo_box").find(".photo_list")
				, len = $photoList.length
				, html = '<span class="photo_represent_mark"><span>대표사진</span></span>';
			
			if(len==1){				
				$("#aside_photo_list .photo_represent_mark").remove();
				$photoList.append(html);
			}else if(len == 0){
				$target.filter(":eq(1)").prop({"checked":true});
				
				$("#aside_photo_list .photo_list:eq(1)").append(html);																									// 대표사진을 삭제 했다면 첫번째 사진...
			}
			//$("#aside_photo_list input[name='photo_represent']").filter(":checked").attr({"readonly":true}).end().not(":checked").attr({"readonly":false});
		}
		
		// 삽입된 이미지 인가? - target : 바꿀 객체(jquery), used : Y / N
		,displayUsedPhoto:function(target, used)
		{
			if(!target) target = $("#aside_photo_list .photo_box:last > .photo_list");
			if(!used) used = "N";
			
			var $target = target
				, html = '<span class="photo_used_mark"><span>사용중</span></span>';
			
			var $remove = $target.children(".photo_used_mark").remove(); 									// 무조건 택 제거-이중으로 뜨는거 방지
			
			if(used=="Y")	$remove.end().append(html);																	// Y라면, append 시킴
			
			try{
				var idxno = $target.next("form[class='photo_form']").children("input[name='photo_idxno']").val();
				if(idxno)
				{
					$.post("/?dummy=news-axPhotoReverse"
								, {mod:"news", act:"axPhotoReverse", idxno:idxno, reverse:used}
								, function(data, rst)
								{
									if(rst=="success")
									{
										if(data.result=="error") alert(data.msg);
									}else alert(lang.axError);
								},"json");
				}
			}catch(e){}
		}
		
		/** 
		 * 팝업창에서 사진 전송후 값 전달
		 * @param : json - 쳐넣을 값(string), mode - 탭에서 사진이 보이냐?(save:보임-저장후 스크립트, list:안보임-수정에서 리스트 뿌리기용)
		 * @json = {"parentIdxno":"","idxno":"","filename":"Sunflower.gif","insertPhoto":"Y","position":"[left,center,right]","represent":"N", "watermarkPosition":"N","photoUrl":"http:\/\/ph.ver10.com\/temp\/0510451001346915352.gif","caption":"dd\u3147\u3147\u3147\u3147\u3147\u3147\u3147"}
		 */
		,afterUploadInsertData:function(json, mode)
		{			
			if(!json) return ;
			if(!mode) mode = "save";
			
			var	isFirst = $("#aside_photo_list .photo_box").length
				,$parsedJson = json;
			
			// 첫번째 이미지일경우 대표사진으로 정함-저장용일때 
			if(isFirst==1 && mode=="save") $parsedJson.represent = "Y";			
			
			photo.makePhotoArea($parsedJson);
			
			if(isFirst==1 && mode=="save"){
				photo.displayRepresentPhoto();				// 대표사진
				article.evtFixPositionFollowPhotoBox();	// 오른쪽 사진 박스 위치 이동
			}
			
			// 본문삽입되었나
			if($parsedJson.insertPhoto == "Y" && mode=="save")
			{
				var $target = $("#aside_photo_list .photo_box:last > .photo_list")
					,width = parseInt($parsedJson.width,10)
					,align = "center";
				
				if($parsedJson.position==="auto"){
					align = (width>350) ? "center" : "right";
				}else{
					align = $parsedJson.position;
				}
				photo.displayUsedPhoto($target, $parsedJson.insertPhoto);
				photo.photoInsertTag(align, $target);
			}
			
			// 사진 탭으로 열리게
			if(mode==="save")
			article.showTabmenu('photo');
		}
		
		/**
		 * 사진 수정
		 * @param : json - string
		 * @json={"order":"3","filename":"Sunflower.gif","watermarkPosition":"N","insertPhoto":"N", "represent":"N", "photoUrl":"http:\/\/ph.ver10.com\/temp\/0510451001346915352.gif","caption":"dd\u3147\u3147\u3147\u3147\u3147\u3147\u3147"}
		 */
		,afterUploadUpdateData:function(json)
		{
			if(!json) return ;
			
			$(".edit_layer_close").click(); // 창닫고 처리
			
			var isFirst = $("#aside_photo_list .photo_box").length //첫번째 사진인가?
				, $parsedJson = json||$.parseJSON(json)
				, order = $parsedJson.order;								// hidden value에 담긴 순서
		
			if(!order.length) return ;											//  order 값이 없다는것은 고유키가 없다는거
			
			// 대표사진정한다면, 전체 데이타 갱신 - 물론 갯수가 2개이상일때.
			if($parsedJson.represent=="Y" && isFirst>1) photo.displayRepresentPhoto(order);												 	// 대표사진

			// 오른쪽 사진 영역
			var $pArea = $pArea = $("#aside_photo_list .photo_box:eq("+(parseInt(order)+1)+")")
				, $oldFileObj = $pArea.find("input[name='photo_old_file']")
				, oldPhotoUrl = $oldFileObj.val()			
				, width = $parsedJson.width
				, resizeWidth = $parsedJson.resize_width||"";
		
			if(resizeWidth && resizeWidth!="0")	width = resizeWidth; // 변경될 사진 크기가 있다면 ..
			if(!width) width = ""; // 에러라면 그냥 없앰 ㅡㅡ;			

			// 사진 정삭적인 경로 - 썸네일이라면 원본파일로 변경 
			if(oldPhotoUrl) oldPhotoUrl = PH_DOMAIN+"/news/photo/"+util.convertPhotoFilename(oldPhotoUrl, "t2o");
			//if(oldPhotoUrl) oldPhotoUrl=util.convertPhotoFilename(oldPhotoUrl, "t2o");

			// 본문 이미지 영역
			var $dom = article.getEditorDom()
				, $img = $dom.find("img[src='"+oldPhotoUrl+"']")
				, $table = $img.parents(".news_photo_table");

			// 사진이 넘어왔다면,
			if($parsedJson.photoUrl)
			{
				if(width>0 && width>600) width = 600;			
				$oldFileObj.val(util.getDirNFilename($parsedJson.photoUrl)||"");
				$pArea.find(".photo_view > img").attr({"src":util.convertPhotoFilename($parsedJson.photoUrl,"o2t")||"","width":width,"twidth":width}); // ,"alt":decodeURIComponent($parsedJson.filename)||""
			}else{
			// 안넘어 왔다면 사진 크기만 변경된거라고보고
				$pArea.find(".photo_view > img").attr({"twidth":width});
			}
			$pArea.find(".pv_caption").text(decodeURIComponent($parsedJson.caption||""))[$parsedJson.caption?"show":"hide"]();
			$pArea.find("input[name='photo_insert_photo']").val($parsedJson.insertPhoto||"N");			
			$pArea.find(".photo_file").replaceWith('<input type="file" name="photo_file[]" class="photo_file" />'); //ie 초기화가 reset밖에 없어 이렇게 대치
			
			// 본문 이미지 교체
			//if($parsedJson.photoUrl && (oldPhotoUrl != $parsedJson.photoUrl))
			//{
				$img.attr({"src":$parsedJson.photoUrl, "width":width});
				$table.attr("width",width);
			//}					
	
			// 캡션교체 - 본문
			//if($parsedJson.caption)
			//{
				$table.find(".news_photo_table_caption").html($.parseHTML(decodeURIComponent($parsedJson.caption)||""));
			//}
			
		}
		
		/** 사진 영역 만들기 + 이벤트 넣음
		 * @json 규칙
		 * json ={"parentIdxno":"", "idxno":"", "filename":"file.jpg","insertPhoto":"Y","represent":"N","watermarkPosition":"N","photoUrl":"http://ph.ver10.com/temp/0491192001346986023.gif","width":500,"align":"center","caption":"caption"} ;
		 * *** json.filename, json.caption 은 decodeURIComponent 로 디코딩해서 사용해야함
		 */
		,makePhotoArea:function(json)
		{
			if(!json instanceof Object) return "";
			
			// json ={"parentIdxno":"","idxno":"","filename":"%5B%EC%82%AC%EC%A7%84%5D%ED%95%9C-%EB%84%A4%EB%8D%9C%EB%9E%80%EB%93%9C_%ED%86%B5%EA%B3%84%ED%98%91%EB%A0%A5_%EC%96%91%ED%95%B4%EA%B0%81%EC%84%9C_%EC%B2%B4%EA%B2%B02.jpg-0.jpg","insertPhoto":"Y","watermarkPosition":"N","photoUrl":"http://ph.ver10.com/temp/0491192001346986023.gif","width":500,"align":"center","caption":"%E3%84%B4%E3%85%87%E3%84%B4%E3%85%87%E3%84%B9%E3%84%B4%E3%85%87%E3%84%B9"} ;
			//$(function(){
			
			// json 한글 decode
			json.filename = decodeURIComponent(json.filename);
			json.caption = decodeURIComponent(json.caption);
			
			var $target = $(".photo_box:first").clone()
				, $appendTo = $("#aside_photo_list")
				, parentIdxno = json.parentIdxno||""			// 부모키 (기사코드)
				, idxno = json.idxno||""									// 사진키
				, filename = json.filename||""						// 파일명
				, insertPhoto = json.insertPhoto||"N"			// 사진 본문삽입인가
				, represent = json.represent||"N"					// 대표사진
				, search = json.search||"Y"							// 검색가능
				, watermark = json.watermarkPosition||"N"// 워터마크위치
				, photoUrl = json.photoUrl||""						// 사진 path
				, width = json.width||""								// 넓이
				, oldPhotoFile = util.getDirNFilename(photoUrl)||""	//파일의 디렉토리/파일명빼옴
				, caption = json.caption||"";							// 캡션

			$target.attr("id", "photo_box_"+idxno)
				.find(".pa_left").click(function(){
															photo.photoInsertTag("left", this);							// 좌배치
														})
				.end().find(".pa_center").click(function(){
																photo.photoInsertTag("center", this);					// 중 배치
															})
				.end().find(".pa_right").click(function(){
																photo.photoInsertTag("right", this);						// 우 배치
															})
				.end().find(".pa_remove").click(function(){
																photo.removePhotoTag(this);								// 본문에서 제거
															})
				.end().find(".pa_delete").click(function(){
																photo.deletePhoto(this);										// 사진 완전삭제+본문삭제
															})
				
				.end().find(".photo_view > img").attr({"src":util.convertPhotoFilename(photoUrl, "o2t"),"tWidth":width}).click(function(){}) //"alt":filename,
				.error(function(){ this.src = this.src.replace(/\.(jpg|png|jpeg|bmp|gif)/i,".jpg"); })
				.end().find(".pv_caption").text(caption)[caption?"show":"hide"]()
				.end().find("form").attr("name", "photo_"+article.getPrimaryKeyOfForm())
				.find("input[name='photo_parent_idxno']").val(parentIdxno)
				.next("input[name='photo_idxno']").val(idxno)
				.next("input[name='photo_insert_photo']").val(insertPhoto)
				.next("input[name='photo_old_file']").val(oldPhotoFile)
				.next(".photo_options")
				.find("textarea[name='photo_caption']").val(util.replaceHtmlEntities(caption))
				.end().find("input[name='photo_represent']").prop("checked", (represent=="Y"))
				.end().find("input[name='photo_search']").prop("checked", (search=="Y"))
				.end().find("input[name='photo_watermark'][value='"+watermark+"']").prop("checked", true)
				//.end().find(".pd_btn_save").click(function(){})
				.end().find(".pd_btn").click(photo.photoUpdateFormSlide);		
			
			$target.show().appendTo($appendTo);
			
			util.inputReload($target);	// checkbox,radio 이미지화 갱신
			radioWatermark.reload($target.find("input[name='photo_watermark']")); // 워터마크 이미지 
			
			//});
		}
		
		// 수정하려고 폼 열고 닫기 - 슬라이드는 좁아 레이어로 처리함
		// @param ele : this가 없다면 강제로 타겟을 지정하게끔
		,photoUpdateFormSlide:function($ele)
		{
			var $this = $(this);
			
			$this = $this.attr("class").indexOf("pd_btn")<0 ? $ele : $this; // 현재 클릭객체인지 전달받은 객체인지
			var	$box = $this.closest(".photo_box")
				,$img = $box.find(".photo_view").clone()
				,$box2 = $box.find(".photo_options > li,.photo_btn_save").show().filter(".photo_door").hide().closest(".photo_form")
				,width = 700
				,height = 560
				,html = editSortable.replaceLayerHtmlTag(editSortable.vars.layerBox, lang.close, "", "")
				,title = '<h3 class="edit_layer_title"><span class="icon_bullet ib_0_1230 elt_icon"></span>'+lang.photoName+lang.modify+'</h3>'
				,output = ""
				,iheight=Number($img.find("img").attr("tWidth"))||0;
			
			// 이미지 크기 변경할 수 있게 담아둠
			$img = $img.find(".pv_caption").hide().end().find(".pv_input_width").show().find(".pviw_value").val(((iheight>photo.resizeWidth || !iheight)?photo.resizeWidth:iheight)||0).end().end();
			
			// 몇번째 사진인가?
			$box2.find("input[name='photo_order']").val(article.getIndex(".photo_box", $box));
			
			output = $(html).find(".edit_layer_close").click(function(){
																			editSortable.closeEditLayer();
																			
																			$box2.find(".photo_view,.edit_layer_title").remove().end().find(".photo_file").replaceWith('<input type="file" name="photo_file[]" class="photo_file" />')
																			.end().find(".photo_options > li,.photo_btn_save").hide().filter(".photo_door").show();
																			$box.append($box2)																
																		}).end().find(".edit_layer_frame").html($box2.prepend($img).prepend(title)).end();
			util.floatLayer(width,height,output);	// layer 띄우기
			
			/*	이전 슬라이드
			var $this = $(this)
				,i=0;
			
			$this = $this.attr("class") != "pd_btn" ? $ele : $this; // 현재 클릭객체인지 전달받은 객체인지
			
			//:not(.photo_door) 느리다면, :lt(7)로 수정..7은 몇번째까지 열것이지...
			$this.parents(".photo_options").children("li:not(.photo_door)").slideToggle(100,function(){
				if(i++ == 5){
					//$this.text(($this.text()==lang.modify?lang.fold:lang.modify));
					if($this.text()==lang.modify){
						$this.text(lang.fold);
					}else{
						$this.text(lang.modify);
						$(this).parents(".photo_box").removeClass("photo_box_selected");
					}
				}
			});	
			*/	
		}
		
		// 본문이미지 클릭시 오른쪽 폼 열기 이벤트 추가
		,evtAddPhotoUploadForm:function(){
			// 본문에서 사진 클릭시 오른쪽의 리스트에서 표시되게
			// 클릭 이벤트 - 캡션의 보더 넣을라면 smart_editor2_in.css 에서 수정 
			var $editorDom = article.getEditorDom();
			$editorDom.on("dblclick", ".news_photo_table img, .news_photo_table_caption",
					function(){
					// 아이디 값으로 교체
					var $this = $(this)
						, photoIdxno = $this.closest(".news_photo_table").attr("id").replace("news_photo_table_","");
				
					// 현재창 열고 이동/표시
					photo.photoUpdateFormShowWhenContent(photoIdxno);
				});
		}
		
		// 본문에서 이미지 클릭시 오른쪽 폼 열고 닫기
		,photoUpdateFormShowWhenContent:function(photoIdxno)
		{
			// 탭메뉴에서 사진 탭메뉴 보이게
			article.showTabmenu('photo');
		
			// 오른쪽 이미지 경로
			var $photoList = $("#aside_photo_list").find(".photo_box")
				, $target = $photoList.filter("#photo_box_"+photoIdxno);
			
			$target.find(".pd_btn").click();
			
			/*
			$photoList.removeClass("photo_box_selected");
			
			// 해당 이미지의 오른쪽 에디터에서 이미지 표시,창열기
			$target.addClass("photo_box_selected");
			
			// 다른창닫기	 :lt(7)
			$(".photo_options").each(function(i,ele){
				$(ele).children("li:not(.photo_door)").css("display","none");
				$(ele).find(".pd_btn").text(lang.modify);
			});			
			
			// 해당 박스 펼치기 :lt(7)
			$target.find(".photo_options").children("li:not(.photo_door)").css("display", "block");
			$target.find(".pd_btn").text(lang.fold);
			
			// 펼쳐질때 꼭대기에 붙기
			var top = parseInt($target.position().top, 10)
				, $parent = $target.parent()
				, scrollTop = parseInt($parent.scrollTop(), 10);
			$target.parent().scrollTop(top+scrollTop);
			*/
		}
		
		// 사진 태그
		,photoInsertTag:function(align, ele)
		{
			if(article.isWysiwyg()===false)
			{
				article.toWysiwyg();
			}
			var $box = $(ele).parents(".photo_box")
				, $img = $box.find(".photo_view > img")
				, $editorDom = article.getEditorDom();
		
			var photoUrl = util.convertPhotoFilename($img.attr("src"),"t2o")||""
				, photoIdxno = $box.find("input[name='photo_idxno']").val()||""
				, width = $img.attr("tWidth")
				, filename = $img.attr("alt")
				, caption = $box.find("textarea[name='photo_caption']").val()
				//, $editorDomPhoto = $editorDom.find(".news_photo_table img[src='"+photoUrl+"']");
				, $editorDomPhoto = $editorDom.find("#news_photo_table_"+photoIdxno);

			align = align||"center";
			
			width = parseInt(width)||"";
			if(width>0 && width>600) width = 600;

			var tag =  '<table class="news_photo_table" align="'+align+'" width="'+width+'" id="news_photo_table_'+photoIdxno+'">'
							+'<tr><td>'
							+'<img src="'+photoUrl+'" width="'+width+'" />' //title="'+filename+'" alt="'+filename+'" 
							+'</td></tr>'
							+'<tr><td class="news_photo_table_caption">'+(caption||"").replace(/\n|\r\n|\t/g,"<br />")+'</td></tr></table>';
			
			if($editorDomPhoto.length>0)
			{	
				// 사진이 이미 삽입되어 있다면, 정보만 갱신
				//$editorDomPhoto.parents(".news_photo_table").replaceWith(tag.replace(/<br \/>$/gi,""));
				$editorDomPhoto.replaceWith(tag.replace(/<br \/>$/gi,""));
			}else{
				// 사진이 삽입되어 있지 않았다면, 삽입
				oEditors.getById["article_content"].exec("PASTE_HTML",[tag]);
				
				// 본문사용 택 삽입
				photo.displayUsedPhoto($box.children(".photo_list"), "Y");
			}
			
			util.setAutoHeightEditorAttach(); //편집창 늘리기
		}	
		
		// 본문에서 사진 태그 제거-ele : 지울객체의 덩어리, alert : 지울까요?를 노출할것인가 ? (ok, no)
		,removePhotoTag:function(ele, cfm)
		{	
			if(!cfm) cfm="ok";
			if(cfm=="ok"){
				if(!window.confirm(lang.photoConfirmRemovePhotoTag)) return false;
				if(article.isWysiwyg()===false)
				{
					alert(lang.photoRequireWysiwygMode);
					return false;
				}
			}
			var $box = $(ele).parents(".photo_box")
				, photoIdxno = $box.find("input[name='photo_idxno']").val()||""
				, photoUrl = util.convertPhotoFilename($box.find(".photo_view > img").attr("src"), "t2o");

			if(!photoUrl) return false;
		
			var $body = article.getEditorDom();
			
			//$body.find("img[src='"+photoUrl+"']").parents(".news_photo_table").remove();
			$body.find("#news_photo_table_"+photoIdxno).remove();
			
			// 본문사용 택 제거
			photo.displayUsedPhoto($(ele).parents(".photo_list"), "N");
			
			util.setAutoHeightEditorAttach(); //편집창 늘리기
		}
		
		// 사진 파일삭제
		,deletePhoto:function(ele)
		{
			if(!window.confirm(lang.confirmDelete)) return false;
			
			var $box = $(ele).parents(".photo_box")
				,$img = $box.find(".photo_view > img")
				,photoUrl = util.convertPhotoFilename($img.attr("src"),"t2o")							// url
				,order = article.getIndex(".photo_box", $box)													// 몇번째 인지
				,parentIdxno = $box.find("input[name='photo_parent_idxno']").val()||""
				,idxno = $box.find("input[name='photo_idxno']").val()||""
				,represent = $box.find("input[name='photo_represent']:checked").val()||"N";

			if(!idxno || !parentIdxno) return false;
			
			if(!photoUrl)
			{
				alert(lang.photoRequireErrorParsePhotoTag);
				return false;
			}
			
			// 삭제
			$.post("/?dummy=news-uploadDlt"
						, {mod:"news", act:"uploadDlt", temp_upload:"photo", photo_parent_idxno:parentIdxno, photo_idxno:idxno, photo_url:util.getDirNFilename(photoUrl), photo_order:order, photo_represent:represent}
						, function(data, rst){
							if(rst == "success")
							{
								if(data.result == "success")
								{
									// 본문의 사진, 현재 박스도 삭제
									$box.remove();
									photo.removePhotoTag(ele, "no");
									
									// 대표사진을 지웠다면 첫번째 사진으로...	
									photo.displayRepresentPhoto(-1);
									
								}else if(data.result == "error"){
									alert(data.msg);
									return false;
								}
								
							}else alert(lang.axError);
							
						},"json");
		}
		
		// 사진 뿌리기
		// {"parentIdxno":"","idxno":"","filename":"Sunflower.gif","insertPhoto":"Y","represent":"N", "watermarkPosition":"N","photoUrl":"http:\/\/ph.ver10.com\/temp\/0510451001346915352.gif","caption":"dd\u3147\u3147\u3147\u3147\u3147\u3147\u3147"}
		,photoList:function(arr) 
		{
			if(!arr) return ;
			if(arr.length<=0) return ;
			
			for(var i in arr)
			{
				photo.afterUploadInsertData(arr[i], "list");
				photo.displayUsedPhoto("", arr[i].insertPhoto);
			}
		
			photo.displayRepresentPhoto(parseInt($("#aside_photo_list input[name='photo_represent']").index($("#aside_photo_list input[name='photo_represent']:checked")))-1);				// 대표사진
			//util.inputReload($("#aside_photo_list"));	// checkbox,radio 이미지화 갱신
		}
		
		// 워터마크 선택
		,evtClickedWatermark:function()
		{			
			var waterCnt = $(".photo_box:eq(0)").find(".watermark_img_li").length;

			if(waterCnt>1){
				var waterIndex = 0;
				$(".watermark_btns").show();
				$(document.body).on("click", ".watermark_btn_prev, .watermark_btn_next", 
					function(){
						var $this = $(this)
							,isPrev = $this.is(".watermark_btn_prev")
							,$parent = $this.closest(".watermark_img_box")
							,$waterLi = $parent.find(".watermark_img_li")
							,$inputImg = $parent.find(".watermark_image");
		
						if(isPrev){
							waterIndex--;
							if(waterIndex<0) waterIndex = waterCnt-1;
						}else{
							waterIndex++;
							if(waterIndex>=waterCnt) waterIndex = 0;
						}
	
						var file = $waterLi.hide().filter(":eq("+waterIndex+")").show().attr("data-file");
						$inputImg.val(file); // hidden 담기
					});
			}
		}
		
		// 워터마크
		,radioToImageForWatermark:function()
		{
			// 워터마크 이미지화
			return new DecoInput(".decoinput_watermark", [
		                                                     { size:{ width:28 ,height:21 } ,clss:"watermark_position_s watermark_position_s_n" }
															,{ size:{ width:27 ,height:21 } ,clss:"watermark_position_s watermark_position_s_tl" }
															,{ size:{ width:27 ,height:21 } ,clss:"watermark_position_s watermark_position_s_t" }
															,{ size:{ width:27 ,height:21 } ,clss:"watermark_position_s watermark_position_s_tr" }
															,{ size:{ width:27 ,height:21 } ,clss:"watermark_position_s watermark_position_s_l" }
															,{ size:{ width:26 ,height:21 } ,clss:"watermark_position_s watermark_position_s_c" }
															,{ size:{ width:27 ,height:21 } ,clss:"watermark_position_s watermark_position_s_r" }
															,{ size:{ width:27 ,height:21 } ,clss:"watermark_position_s watermark_position_s_bl" }
															,{ size:{ width:27 ,height:21 } ,clss:"watermark_position_s watermark_position_s_b" }
															,{ size:{ width:27 ,height:21 } ,clss:"watermark_position_s watermark_position_s_br" }
		                                                   ]).display();
		}
};



/*****************************************************************************
첨부파일 업로드
*****************************************************************************/
var attachFile = {
		
		// 파일 명만 빼오기
		getFilenameInfo:function(v)
		{
			if(!v) return ;
			
			var title = v.replace(/.*[\\|\/](.*)\.(\w{2,4})/,"$1|$2"); // $1-파일명, $2-파일확장자
			var temp = title.split("|")||[]
				, filename = temp[0]
				, ext = temp[1];
			
			return [filename, ext]||[];
		}		

		// 다운로드 경로 
		,makeDownloadLink:function(idxno)
		{
			if(!idxno) return ;
			
			return /*DOMAIN + */"/?mod=news&act=attachLoad&idxno=" + idxno;
		}	
		
		// 제목 출력
		,makeTitle:function(title, filename, filesize)
		{
			if(!title || !filename || !filesize) return "";
			
			return (title||filename) + " (" + filesize + ")";
		}

		// 선택한 파일명에서 이름만 추출하여 타이틀로 저장
		,insertTitleOfFilename:function($obj)
		{
			var temp = attachFile.getFilenameInfo($obj.val());
			$obj.parent("li").next(".file_title").find("input[name='file_title']").val(temp[0]||"");
		}
		
		// 본문내 삽입되어 있나?
		,isInsertTagBox:function()
		{
			if(article.isWysiwyg()===false) return false;
			
			var $editorDom = article.getEditorDom().find(".news_attach_table");
			
			if($editorDom.length<=0) return false;
			
			return $editorDom;
		}
		
		// 첨부파일 태그 가져오기
		,getAttachTags:function()
		{
			var $links = $("#aside_file_list .file_link:gt(0)")
				, tags = "";
			
			$links.each(function(i, ele){
				var link = $.trim($(ele).html());
				if(link) tags += "<li>"+link+"</li>";				
			});
			
			if(tags) tags = '<ul class="new_attach_ul">'+tags+'</ul>';			
			return tags;
		}
		
		// 파일 객체 이벤트 먹이기
		,evtFileInsertTag:function()
		{
			var $box = $("#aside_file_box")
				, $leftBtn = $box.find(".fa_left")
				, $centerBtn = $leftBtn.next(".fa_center")
				, $rightBtn = $centerBtn.next(".fa_right")
				, $removeBtn = $box.find(".fa_remove");
				
				// 좌중우 삽입
				$leftBtn.add($centerBtn).add($rightBtn).click(function(){
					var $this = $(this)
						, $align = $this.attr("class")
						, align = "";
					
					if($align.indexOf("fa_left")>=0) align = "left";
					else if($align.indexOf("fa_center")>=0) align = "center";
					else if($align.indexOf("fa_right")>=0) align = "right";
					
					attachFile.fileInsertTag(align);
				});
			
				// 본문에서 태그 삽입
				$removeBtn.click(function(){
					attachFile.removeBoxTag();
				});
		}
		
		// 파일 태그 삽입
		,fileInsertTag:function(align)
		{
			if(article.isWysiwyg()===false)
			{
				article.toWysiwyg();
			}
			
			align = align||"center";
			var aTags = attachFile.getAttachTags()
				, $editorDom = article.getEditorDom()
				, $editorDomFile = $editorDom.find(".news_attach_table")
				, tag =  '<table class="news_attach_table" align="'+align+'" width="'+(align=="center"?"100%":"300")+'">'
							+'<tr><td class="news_attach_td_header"><span>'+lang.attachTitle+'</span></td></tr>'
							+'<tr><td class="news_attach_td_content">'
							+aTags
							+'</td></tr>'
							+'</table><br />';
			
			if($editorDomFile.length>0)
			{
				// 사진이 이미 삽입되어 있다면, 정보만 갱신
				$editorDomFile.replaceWith(tag.replace(/<br \/>$/gi,""));
			}else{
				// 사진이 삽입되어 있지 않았다면, 삽입
				oEditors.getById["article_content"].exec("PASTE_HTML",[tag]);
			}
			
			util.setAutoHeightEditorAttach(); //편집창 늘리기
		}	
		
		// 태그 박스내 링크 개개 삭제
		,removeATag:function(file_idxno)
		{
			var $editorDomATag = article.getEditorDom().find(".news_attach_table a[data-idxno='"+file_idxno+"']").parent("li");
			$editorDomATag.remove();
			
			util.setAutoHeightEditorAttach(); //편집창 늘리기
		}
		
		// 태그 박스 제거
		,removeBoxTag:function()
		{
			if(!window.confirm(lang.attachConfirmRemoveTag)) return false;
			if(article.isWysiwyg()===false)
			{
				alert(lang.photoRequireWysiwygMode);
				return false;
			}
			var $editorDomTable = article.getEditorDom().find(".news_attach_table");
			$editorDomTable.remove();
			
			util.setAutoHeightEditorAttach(); //편집창 늘리기
		}
	
		// 파일업로드후 오른쪽에 삽입
		,displayFileData:function(json)
		{
			if(!json) json = [];
			if(json.length<=0) return false;
						
			var $target = $("#aside_file_box").css("display","block");
			for(var i in json)
			{
				var $clone = $target.children(".file_list:first").clone();
				var data = json[i]
					, parentIdxno = data.parentIdxno || ""
					, idxno = data.idxno || ""
					, title = decodeURIComponent(data.title) || "" 
					, content = decodeURIComponent(data.content) || ""
					, uploadDir = data.uploadDir
					, saveFilename = data.saveFilename || ""
					, filename = decodeURIComponent(data.filename) || ""
					, filesize = util.setUnitString(data.filesize) || "0"
					, link = attachFile.makeDownloadLink(idxno) // 다운로드 경로 (다시 정할것...임시)					
					, formName = "form_"+article.getPrimaryKeyOfForm();
				
					// order는 submit 할때나 할것임
		
				$clone.css("display","block")
							.find(".file_link > a").attr({"href":link, "title":filename,"data-idxno":idxno}).text(attachFile.makeTitle(title, filename, filesize))
							.end().find("a.fd_btn_modify").attr("href","javascript:void(0)").click((function(v){								
								return function(){ attachFile.fileUploadSlide(v); };								
							})($clone))
							.end().find("a.fd_btn_delete").attr("href","javascript:void(0)").click((function(v){ 
								return function(){ attachFile.deleteFile(v); };
							})($clone))
							.end().children(".file_form").attr("name", formName)
							.children("input[name='file_parent_idxno']").val(parentIdxno)
							.next("input[name='file_idxno']").val(idxno)
							.next("input[name='file_old_file']").val(uploadDir+saveFilename)
							.next(".file_options")
							.find(".file_file").change(function(){
								// 수정시 파일명만빼와서 타이틀에 담기
								attachFile.insertTitleOfFilename($(this));
							})
							.end().find("input[name='file_title']").val(title)
							.end().find("textarea[name='file_content']").val(content)
							.end().find(".fd_btn").click((function(v){ 
								return function(){ attachFile.fileUploadSlide(v); };
							})($clone));
				
				$clone.appendTo($target);
			}
		}

		// 수정창열고 닫기 - $box : 선택된 .file_list jquery 객체
		,fileUploadSlide:function($box)
		{
			if(!$box) return ;
			
			var $box2 = $box.find(".file_options").show().find("li").show().filter(".file_btn_save").find(".fd_btn").hide().closest(".file_form")
				,width = 450
				,height = 435
				,title = '<h3 class="edit_layer_title"><span class="icon_bullet ib_0_1230 elt_icon"></span>'+lang.fileName+lang.modify+'</h3>'
				,html = editSortable.replaceLayerHtmlTag(editSortable.vars.layerBox, lang.close, "", "")
				,output = "";
			
			// 몇번째 사진인가?
			$box2.find("input[name='file_order']").val(article.getIndex(".file_list", $box));
		
			output = $(html).find(".edit_layer_close").click(function(){
																			editSortable.closeEditLayer();
																			
																			$box2.find(".edit_layer_title").remove().end().find(".file_file").replaceWith('<input type="file" name="file_file[]" class="file_file">').end().find(".file_options > li").hide().parent().hide();
																			$box.append($box2)																
																		}).end().find(".edit_layer_frame").html($box2.prepend(title)).end();
			util.floatLayer(width,height,output);	// layer 띄우기
			
			/* 예전슬라이드
			$target = $box.find(".file_options");
			
			$target.slideToggle(100,function(){
				if($box.hasClass("file_list_selected")) $box.removeClass("file_list_selected");
				else{
					// 열때 나머진 닫히게
					$("#aside_file_list .file_list").removeClass("file_list_selected").find(".file_options").not($target).css("display", "none");
					// 색표시
					$box.addClass("file_list_selected");
				}				
			});
			*/
		}
		
		// insert 후 리스트
		,fileInsertList:function(arr)
		{
			// 탭메뉴 보이게
			article.showTabmenu("file");
			
			if(attachFile.displayFileData(arr)===false) return;
			
			// 본문에 삽입되어 있다면 갱신
			var $dom = attachFile.isInsertTagBox();
			if($dom===false) return ;
			attachFile.fileInsertTag($dom.attr("align"));
		}
		
		// 리스트
		,fileList:function(arr)
		{
			if(attachFile.displayFileData(arr)===false) return;
		}		
		
		// 전송
		,fileUpdateSubmit:function(form)
		{
			// 몇번째 파일인지 체크해서 담음 
			// form.file_order.value = article.getIndex(".file_form", form);
			
			var title = form.file_title;
			if(!title.value)
			{
				alert(lang.attachRequireTitle);
				title.focus();
				return false;
			}
			
			return true;
		}
		
		// 수정후 데이타 변경
		,updateFileData:function(arr)
		{
			if(!arr || arr.length<=0) return;
			
			var data = arr[0];
			if(data.order.length<=0) return ;

			$(".edit_layer_close").click(); // 창닫고 처리
			
			var order = parseInt(data.order, 10)+1
				, $form = $(".file_form:eq("+order+")")
				, $fileViewA = $form.prev(".file_view").find(".file_link a")
				, title = decodeURIComponent(data.title)
				//, content = decodeURIComponent(data.content)
				, filename = decodeURIComponent(data.filename)||""
				, uploadDir = data.uploadDir||""
				, saveFilename = data.saveFilename||""
				, filesize = util.setUnitString(data.filesize)||0
				, formTitle = attachFile.makeTitle(title, filename, filesize)							// 제목만들기
				, link = attachFile.makeDownloadLink(data.idxno||"")				// 링크생성
				, $dom = attachFile.isInsertTagBox()															// 본문에 삽입되어 있나?
				, contentAlink = $fileViewA.attr("href")||"";													// 본문 태그 갱신을 위해 링크 저장
		
			// 파일객체 초기화
			$form.find(".file_file").replaceWith('<input type="file" name="file_file[]" class="file_file" />');		
			
			// 제목변경
			var resultTitle = "";
			//파일업로드하여 변경된 제목
			if(formTitle) resultTitle = formTitle;
			// 파일업로드는 안하고 제목만 바꾼경우
			else if(!formTitle && title){
				var replace = $fileViewA.text().replace(/(.*) (\(.*\))$/, function(str, r1, r2){
					return title + " " + r2;
				});				
				resultTitle = replace;
			}
			$fileViewA.text(util.replaceHtmlEntities(resultTitle));
			if($dom!==false) $dom.find("a[href='"+contentAlink+"']").text(resultTitle);
			
			// 링크변경
			if(uploadDir && saveFilename)
			{
				$form.find("input[name='file_old_file']").val(uploadDir+saveFilename);	// 올드파일 경로
				//$fileViewA.attr("href", link);
				
				// 삽입되어 있다면 교체
				//if($dom!==false) $dom.find("a[href='"+contentAlink+"']").attr("href", link);
			}
		}
		
		// 삭제
		,deleteFile:function($fileList)
		{
			if(!window.confirm(lang.confirmDelete)) return false;
			
			var $form = $fileList.children(".file_form")			
				, fileLink = $fileList.find(".file_link > a").attr("href")												// url
				, order = article.getIndex(".file_form", $form)													// 몇번째 인지
				, parentIdxno = $form.children("input[name='file_parent_idxno']").val()||""
				, idxno = $form.children("input[name='file_idxno']").val()||""
				, oldFile = $form.children("input[name='file_old_file']").val()||"";

			if(!idxno || !parentIdxno) return false;
			
			if(!fileLink)
			{
				alert(lang.attachRequireErrorFilePath);
				return false;
			}
			
			// 삭제
			$.post("/?dummy=news-uploadDlt-file"
						, {mod:"news", act:"uploadDlt", temp_upload:"file", file_parent_idxno:parentIdxno, file_idxno:idxno, file_url:oldFile, file_order:order}
						, function(data, rst){
							if(rst == "success")
							{
								if(data.result == "success")
								{
									// 본문의 사진, 현재 박스도 삭제
									$fileList.remove();
									attachFile.removeATag(idxno);
									
								}else if(data.result == "error"){
									alert(data.msg);
									return false;
								}
								
							}else alert(lang.axError);							
						},"json");
		}
};



/*****************************************************************************
 영상
*****************************************************************************/
var video={
	
	// 펼치기 접기
	updateFormSlide:function()
	{
		
		var $this = $(this)||$(".vd_btn")
			,$box = $this.closest(".video_box")
			,$img = $box.find(".video_view").clone().find(".video_view_title").remove().end()
			,$box2 = $box.find(".video_options > li,.video_btn_save").show().filter(".video_door").hide().closest(".video_form")
			,width = 700
			,height = 620
			,title = '<h3 class="edit_layer_title"><span class="icon_bullet ib_0_1230 elt_icon"></span>'+lang.videoName+lang.modify+'</h3>'
			,html = editSortable.replaceLayerHtmlTag(editSortable.vars.layerBox, lang.close, "", "")
			,output = "";
				
		output = $(html).find(".edit_layer_close").click(function(){
																		editSortable.closeEditLayer();
																		
																		$box2.find(".video_view,.edit_layer_title").remove().end().find(".video_file").replaceWith('<input type="file" name="video_file[]" class="video_file">')
																		.end().find(".video_options > li,.video_btn_save").hide().filter(".video_door").show();
																		$box.append($box2)																
																	}).end().find(".edit_layer_frame").html($box2.prepend($img).prepend(title)).end();
		util.floatLayer(width,height,output);	// layer 띄우기
		
		/* 이전 열고닫기
		var $this =$(this) ||$(".vd_btn")
			, i=0;
		
		$this.closest(".video_options").children("li:lt(7)").slideToggle(100,function(){
			if(i++ == 5){
				if($this.text()==lang.modify){
					$this.text(lang.fold);
				}else{
					$this.text(lang.modify);
					$(this).closest(".video_box").removeClass("video_box_selected");
				}
			}
		});	
		*/	
	}

	// 해당 탭 보이게
	,viewTab:function(){
		article.showTabmenu("video");
	}
	
	// 링크만들기
	,makeUrl:function(uploadDir, filename)
	{
		return ((filename && uploadDir) ? PH_DOMAIN+"/news/video/"+uploadDir+filename : IM_DOMAIN+"/no_image_250.gif");
	}
	
	// 리스트 출력
	,displayData:function(arr){
		if((typeof arr != "object") || !arr || arr.length<=0) return false;		
		var $target = $("#aside_video_list");
		
		for(var i in arr){
			var $clone = $target.find(".video_box:first").clone()
				, data = arr[i]
				, idxno = data.idxno||""
				, articleIdxno = data.article_idxno||""
				, filename = data.filename||""
				, uploadDir = data.uploadDir||""
				, url = video.makeUrl(uploadDir, filename)
				, title = decodeURIComponent(data.title)||""
				, tag = decodeURIComponent(data.tag||"")
				, content = decodeURIComponent(data.content)||""
				, search = data.search||"Y"
				, representation = data.representation||"N";
			
			if(!idxno || !articleIdxno || !tag) continue;
		
			$clone.find(".va_left").click(function(){
				video.insertToContent("left", this);
			})																														// 좌중우 삽입
			.end().find(".va_center").click(function(){
				video.insertToContent("center", this);
			})
			.end().find(".va_right").click(function(){
				video.insertToContent("right", this);
			})
			.end().find(".va_remove").click(function(){
				video.removeInContent(this, "ok");
			})																														// 본문에서 제거
			.end().find(".va_delete").click(function(){
				video.deleteVideo(this);
			})																														// 삭제
			.end().find(".video_view_title").html($.parseHTML(title))
			.end().find(".video_view > img").attr({"src":url, "title":title})														// image src
			.end().find(".vd_btn").click(video.updateFormSlide)																		// 접었다 폈다.
			.end().find(".video_form")
			.children("input[name='video_parent_idxno']").val(articleIdxno)
			.next("input[name='video_idxno']").val(idxno)
			.next("input[name='video_old_file']").val(uploadDir+filename)
			.closest(".video_form").find("input[name='video_title']").val(title)
			.end().find("textarea[name='video_tag']").val(tag)
			.end().find("textarea[name='video_content']").val(util.replaceHtmlEntities(content))
			.end().find("input[name='video_search']").prop("checked", (search=="Y" ? true : false))
			.end().find("input[name='video_representation']").prop("checked", (representation=="Y" ? true : false));
			
			$clone.show().appendTo($target);
			
			util.inputReload($clone);	// checkbox,radio 이미지화 갱신
		} // end for		
	}
	
	// dom구조에서 데이타 뽑기
	,getDataFromDom:function(obj){
		if(!obj) return {};
		
		var $obj = $(obj).closest(".video_box")
			, idxno = $obj.find("input[name='video_idxno']").val()||""
			, articleIdxno = $obj.find("input[name='video_parent_idxno']").val()||""
			, title = $obj.find("input[name='video_title']").val()||""
			, tag = $obj.find("textarea[name='video_tag']").val()||""
			, content = $obj.find("textarea[name='video_content']").val()||""
			, search = $obj.find("input[name='video_search']").val()||""
			, representation = $obj.find("input[name='video_representation']").val()||""
			, oldFile = $obj.find("input[name='video_old_file']").val()||""
			,uploadDir = ""
			,filename = "";
		
		if(oldFile!=""){
			var tmp = oldFile.split("/");
			uploadDir = tmp[0]+"/";
			filename = tmp[1];
		}
		
		return {
			idxno:idxno
			,articleIdxno:articleIdxno
			,title:title
			,tag:tag
			,content:content
			,search:search	
			,representation:representation	
			,uploadDir:uploadDir
			,filename:filename
		};
	}
	
	// insert
	,insertToContent:function(align, obj)
	{	
		// 위지윅 모드가 아니라면 위지윅으로 전환
		if(article.isWysiwyg()===false)
		{
			article.toWysiwyg();
		}
		
		if(obj==="openers")
		{
			obj = $(".video_box:last").find(".va_center");
		}
		
		var $editorDom = article.getEditorDom()
			, data = video.getDataFromDom(obj)
			, idxno = data.idxno||""
			, tag = data.tag||""
			, content = decodeURIComponent(data.content)||""
			, $editorDomVideo = $editorDom.find("#news_video_table_"+idxno);
		
		if(!idxno || !tag) return ;
		
		align = align||"center";
		
		var html =  '<table class="news_video_table" align="'+align+'" id="news_video_table_'+idxno+'">'
						+'<tr><td>'
						+ tag
						+'</td></tr>'
						+'<tr><td class="news_video_table_caption">'+(content||"").replace(/\n|\r\n|\t/g,"<br />")+'</td></tr></table><br />';
				
		if($editorDomVideo.length>0){
			// 삽입되어 있다면교체
			$editorDomVideo.replaceWith(html.replace(/<br \/>$/gi,""));
		}else{
			// 사진이 삽입되어 있지 않았다면, 삽입
			oEditors.getById["article_content"].exec("PASTE_HTML",[html]);		
		}	
		
		util.setAutoHeightEditorAttach(); //편집창 늘리기
	}
	
	// 제거
	,removeInContent:function(obj, cofirm){
		var data = video.getDataFromDom(obj)
			, idxno = data.idxno||"";
		
		if(!idxno) return ;		
		if(cofirm=="ok")
		{
			if(!window.confirm(lang.videoConfirmRemovePhotoTag)) return false;
			if(article.isWysiwyg()===false)
			{
				alert(lang.photoRequireWysiwygMode);
				return false;
			}
		}
		
		var $editorDom = article.getEditorDom();		
		var $target = $editorDom.find("#news_video_table_"+idxno);
		$target.add($target.next("br")).remove();
		
		util.setAutoHeightEditorAttach(); //편집창 늘리기
	}
	
	// 본문 태그 교체
	,replaceTagInContent:function(data)
	{
		// 위지윅 모드가 아니라면 위지윅으로 전환
		if(article.isWysiwyg()===false)
		{
			article.toWysiwyg();
		}
		var idxno = data.idxno||""
			, tag = decodeURIComponent(data.tag||"")
			,content = decodeURIComponent(data.content||"");
		
		var $editorDom = article.getEditorDom().find("#news_video_table_"+idxno);
		if($editorDom.size()<=0) return ;
		
		$editorDom.find("tr:first > td").html($.parseHTML(tag))
		.end().find(".news_video_table_caption").html($.parseHTML((content||"").replace(/\n|\r\n|\t/g,"<br />")));
	}
	
	// 수정
	,updateSubmit:function(obj)
	{
		if(obj.video_title.value=="")
		{
			alert(lang.videoRequireTitle);
			obj.video_title.focus();
			return false;
		}
		
		if(obj.video_tag.value=="")
		{
			alert(lang.videoRequireTag);
			obj.video_tag.focus();
			return false;
		}
		/*
		if(obj["video_file[]"].value=="")
		{
			alert(lang.videoRequireFile);
			obj["video_file[]"].focus();
			return false;
		}
		*/
		//wmode=transparent
		//obj.video_tag.value = this.replaceWmodeYoutube(obj.video_tag.value);
		obj.submit();
	}
	
	// 업뎃후 갱신
	,updateDisplay:function(arr)
	{
		if((typeof arr != "object") || !arr || arr.length<=0) return false;

		$(".edit_layer_close").click(); // 창닫고 처리
		
		var data = arr[0]
			, idxno = data.idxno||""
			//, articleIdxno = data.article_idxno||""
			, filename = data.filename||""
			, uploadDir = data.uploadDir||""
			, url = video.makeUrl(uploadDir, filename)
			, title = decodeURIComponent(data.title)||""
			, tag = decodeURIComponent(data.tag||"")
			, content = decodeURIComponent(data.content)||""
			, search = data.search||"Y"
			, representation = data.representation||"Y"
			,$target = $("#aside_video_list").find("input[name='video_idxno'][value='"+idxno+"']").closest(".video_box");
															// 삭제
		$target.find("input[name='video_title']").val(util.replaceHtmlEntities(title))
		.end().find("textarea[name='video_tag']").val(tag)
		.end().find("textarea[name='video_content']").val(util.replaceHtmlEntities(content))
		.end().find("input[name='video_search']").prop("checked", (search=="Y" ? true : false))
		.end().find("input[name='video_representation']").prop("checked", (representation=="Y" ? true : false));
	
		// 잇다면 교체
		if(uploadDir && filename)
		{
			$target.find(".video_view > img").attr({"src":url, "title":title})												// image src
			.end().find("input[name='video_old_file']").val(uploadDir+filename)			
			.end().find(".video_file").replaceWith('<input type="file" name="video_file[]" class="video_file" />'); //ie 초기화가 reset밖에 없어 이렇게 대치
		}
		
		// 본문거 교체
		video.replaceTagInContent(data);
	}
	
	// 삭제
	,deleteVideo:function(obj)
	{
		var data = video.getDataFromDom(obj)
		, idxno = data.idxno||""
		, uploadDir = data.uploadDir||""
		, filename = data.filename||""
		, parentIdxxno = data.articleIdxno||""
		, representation = data.representation||""
		, $obj = $(obj);
	
		if(!idxno) return;
		if(!window.confirm(lang.confirmDelete)) return ;
		
		$.post(	"/?dummy=news-uploadDlt-video"
					,{mod:"news", act:"uploadDlt", temp_upload:"video", video_idxno:idxno, video_parent_idxno:parentIdxxno, video_url:uploadDir+filename, representation:representation}
					,function(data, rst){

						if(rst=="success")
						{
							if(data.result == "success")
							{
								$obj.closest(".video_box").fadeOut("normal", function(){
									var $self = $(this);
									$self.remove();
									video.removeInContent(obj, "not");
								});
								
							}else util.toast(data.msg);
						}else alert(lang.networkError);
					},"json");
	}
	
	// 본문에서 video 클릭시 오른쪽 폼 열고 닫기
	,evtAddVideoUploadForm:function()
	{		
		
		var $targets = article.getEditorDom().on("dblclick", ".news_video_table", function(){
			// 탭메뉴에서 탭메뉴 보이게
			video.viewTab();
			
			var $this = $(this)
				, idxno = this.id.replace("news_video_table_", "")
				, $list = $("#aside_video_list").find(".video_box")
				, $target = $list.find("input[name='video_idxno'][value='"+idxno+"']").closest(".video_box");
			
			$target.find(".vd_btn").click();
			
			/* 접기 열기일때,
			$list.removeClass("video_box_selected");
			
			// 해당 이미지의 오른쪽 에디터에서 이미지 표시,창열기
			$target.addClass("video_box_selected");
			
			// 다른창닫기	
			$(".video_options").each(function(i,ele){
				$(ele).children("li:lt(6)").css("display","none");
				$(ele).find(".vd_btn").text(lang.modify);
			});			
			
			// 해당 박스 펼치기 
			$target.find(".video_options").children("li:lt(6)").css("display", "block");
			$target.find(".vd_btn").text(lang.fold);
			
			try{
				// 펼쳐질때 꼭대기에 붙기
				var top = parseInt($target.position().top||0, 10)
					, $parent = $target.parent()
					, scrollTop = parseInt($parent.scrollTop(), 10);
				$target.parent().scrollTop(top+scrollTop);
			}catch(e){}	
			*/	
		});		
	}

	// youtube wmode 치환
	,replaceWmodeYoutube:function(tag)
	{
			if(tag.indexOf("www.youtube")<0 || tag.toLowerCase().indexOf("wmode=transparent")>=0) return tag;
			return tag.replace(/(http[s]?:\/\/www\.youtube(\-nocookie)?\.com\/.*)"/i,function(){
				var arg=arguments,s1=arg[0],s2=arg[1],s3=arg[2],s4=arg[arguments.length>4?4:3]				
					,t=s2.split('"');
			
				t[0]+=(t[0].indexOf("?")<0?"?":"&amp;")+"wmode=transparent";
				return s1.replace(s2, t.join('"'));
			});
	}
		
};




/*****************************************************************************
기사 오류 신고
*****************************************************************************/
var articleError={
	vars:{}

	// 전체선택
	,evtClickedAllCheck:function()
	{
		var $checkboxes = null;
		$(document.body).on("click", ".arl_error_btn_all_select", function(){
			var $target = $("#article_error_form").find("input[name='idxno[]']");
			/*
				,$checked = $target.filter(":checked")
				,$notChecked = $target.not($checked);
			
			if($checked.length>0) $checked.prop("checked", false);
			
			$notChecked.prop("checked", true);
			*/
			
			if($checkboxes===null){ $checkboxes = $(".arl_error_btn_all_select"); }
			$checkboxes.toggleClass("on");
			
			$target.click();
		});
	}
	
	// 삭제
	,evtDelete:function()
	{
		$(".arl_error_btn_delete").click(function(){
			if(!window.confirm(lang.confirmDelete)) return false;
			var f = document.article_error_form;
			var form = util.createHiddenForm({mod:f.mod.value,act:f.act.value,idxno:(this.getAttribute("data-idxno")||"")}, {method:"post", action:"/?dummy="+f.mod.value+"-"+f.act.value});
			document.body.appendChild(form);
			form.submit();
		});
	}
	
	// 댓글 리스트에서 삭제 전송
	,submitFromList:function(form)
	{
		if(!window.confirm(lang.confirmDelete)) return false;
		
		var $checked = $(form).find("input[name='idxno[]']:checked");
	
		if($checked.length<=0){
			alert(lang.validRequireCheckedItem);
			return false;
		}
		return true;
	}	
	
	// 보기
	,view:function()
	{
		var $btn = $(".arl_error_btn_view");
	
		$btn.on("click", function(){
			var href = this.href
				,width = 800
				,height = 800
				,parents = editSortable
				,html = parents.replaceLayerHtmlTag(parents.vars.layerBoxIframe, lang.close, href, (height-60))
				,output = "";
			
			output = $(html).find(".edit_layer_close").click(parents.closeEditLayer).end();
			util.floatLayer(width,height,output);	// layer 띄우기
			
			return false;
		});		
	}
};


/*****************************************************************************
인기검색어
*****************************************************************************/
var articleKeyword={
	vars:{}

	// 이벤트
	,evtAddContent:function()
	{
		var $form = $("#arl_keyword_form_box");
		$(document.body).on("click", ".arl_keyword_btn_add",
				function(){
					var width = 500
						,height = 300
						,parents = editSortable
						,html = parents.replaceLayerHtmlTag(parents.vars.layerBox, lang.close, "", "")
						,output = "";
					
					output = $(html).find(".edit_layer_close").click(function(){
																				parents.closeEditLayer();
																				$form.hide();
																				}).end().find(".edit_layer_frame").html($form.show()).end();
					util.floatLayer(width,height,output);	// layer 띄우기
				});
	}
	
	// 등록
	,submitContent:function(form)
	{
		var keyword = form.keyword.value
			,count = form.count.value;
		
		if(!keyword){
			alert(lang.keywordRequire);
			form.keyword.focus();
			return false;
		}
		
		if(count.length<=0 || !count.match(/^[0-9]+$/g)){
			alert(lang.keywordRequireCount);
			form.count.focus();
			return false;
		}
		
		var params = $(form).serialize();		
		$.post(	"/?dummay=news-bestKeywordCrt"
				,params
				,function(data, rst){
					if(rst == "success"){
						
						if(data.result == "success"){
							var $box = $("#arl_keyword_data_box")
								,$list = $box.find(".arl_keyword_data_count")
								,$target = null
								,total = false									// 여러번 돌았다면 더이상 찾을 값이 없다는 뜻.
								,ncount = Number(count)
								,idxno = data.data[0].idxno||0
								,html = '<tr>'
									+	'	<td scrop="row"><input type="checkbox" name="idxno[]" value="'+idxno+'" /></td>'
									+	'	<td>'+keyword+'</td>'
									+	'	<td class="arl_keyword_data_count" data-count="'+ncount+'">'+ncount+'</td>'
									+	'</tr>';
							
							if(!idxno) return false;
							
							if($list.length<=0){
								$target = $box;							
							}else{
								// 들어갈 자리 찾음
								$.each($list, function(i, ele){
									var $ele = $(ele)
										,cnt = Number(ele.getAttribute("data-count"))||0;
									
									if(ncount >= cnt){
										$target = $ele.closest("tr").prev("tr");
										return false;
									}
									total = i;
								});
								
								// 그래도 못찾았다면 맨 마지막에 덧붙임
								if(total>=0 && $target==null) $target = $box.find("tr:last");
							}

							// 제일 큰값일때, tbody에 바로 붙임
							if(total===false || $target.is("tbody")) $box.prepend(html);
							else $target.after(html);
							
							editSortable.closeEditLayer();
							
							form.keyword.value = "";
							form.count.value = "";
						}else alert(decodeURIComponent(data.msg));					
					}else alert(lang.axError);
				},"json");		
		
		return false;
	}
	
	// 삭제
	,evtDelete:function()
	{
		$(document.body).on("click",".arl_keyword_btn_delete",
						function(){
							if(!window.confirm(lang.confirmDelete)) return false;
							
							var $box = $("#arl_keyword_data_box").find("input[name='idxno[]']")
								,$checked = $box.filter(":checked")
								,idxno = [];
							
							if($checked.length<=0){
								alert(lang.validRequireCheckedItem);
								return false;
							}
							$.each($checked, function(i,ele){
								var value = ele.value||"";
								
								idxno.push(value);
							});
							
							$.post(	"/?dummy=news-bestKeywordDlt"
									,{mod:"news",act:"bestKeywordDlt","idxno[]":idxno}
									,function(data,rst){
										if(rst === "success"){
											if(data.result == "success"){
												$checked.closest("tr").fadeOut("fast", function(){
													$(this).remove();
												});
											}else alert(decodeURIComponent(data.msg));
										}else alert(lang.axError);
									},"json");
						});	
	}
	
	// 적용
	,evtApply:function()
	{
		$(document.body).on("click",".arl_keyword_btn_apply",
						function(){
							var $box = $("#arl_keyword_data_box").find("input[name='idxno[]']")
								,$checked = $box.filter(":checked")
								,idxno = [];
							
							if($checked.length<=0){
								alert(lang.validRequireSelectedItem);
								return false;
							}
							
							$.each($checked, function(i,ele){
								var value = ele.value||"";								
								idxno.push(value);
							});
							
							$.post(	"/?dummy=news-bestKeywordApply"
									,{mod:"news",act:"bestKeywordApply","idxno[]":idxno}
									,function(data,rst){
										if(rst === "success"){
											if(data.result == "success") util.toast(lang.toastApply);
											else alert(decodeURIComponent(data.msg));
										}else alert(lang.axError);
									},"json");
						});	
	}
};


/*****************************************************************************
게시판 설정
*****************************************************************************/
var bbsCfg={
	vars:{
		fileMaxCount:10
	}
	
	// 게시판 기본설정
	,submitForCongfig:function(form)
	{
		var limitNum = form.limit_num
			,commentNum = form.limit_comment_num
			,subjectCut = form.subject_cut
			,newPost = form.new_post
			,declaredNum = form.declared_num
			,uploadMaxNum = form.upload_max_num
			,uploadMaxSize = form.upload_max_size
			,uploadMaxTotal = form.upload_max_total;
		
		if(!limitNum.value || !util.onlyNumber(limitNum.value)){
			alert(lang.validOnlyNumber);
			limitNum.focus();
			return false;
		}
		
		if(!commentNum.value || !util.onlyNumber(commentNum.value)){
			alert(lang.validOnlyNumber);
			commentNum.focus();
			return false;
		}
		
		if(!subjectCut.value || !util.onlyNumber(subjectCut.value)){
			alert(lang.validOnlyNumber);
			subjectCut.focus();
			return false;
		}
		
		if(!newPost.value || !util.onlyNumber(newPost.value)){
			alert(lang.validOnlyNumber);
			newPost.focus();
			return false;
		}
		
		if(!uploadMaxNum.value || !util.onlyNumber(uploadMaxNum.value)){
			alert(lang.validOnlyNumber);
			uploadMaxNum.focus();
			return false;
		}
		
		if(!uploadMaxSize.value || !util.onlyNumber(uploadMaxSize.value)){
			alert(lang.validOnlyNumber);
			uploadMaxSize.focus();
			return false;
		}
		
		if(!uploadMaxTotal.value || !util.onlyNumber(uploadMaxTotal.value)){
			alert(lang.validOnlyNumber);
			uploadMaxTotal.focus();
			return false;
		}
		
		if(declaredNum.value){
			if(!util.onlyNumber(declaredNum.value)){
				alert(lang.validOnlyNumber);
				declaredNum.focus();
				return false;
			}
		}
		
		return true;
	}
	
	// 불량글 처리
	,evtClickBadPost:function()
	{
		var $num = $("#cfg_bbs_declared_num, #cfg_declared_check")
			,$post = $("#cfg_bbs_bad_post");
			
		// 로딩시...
		$num.prop("disabled", !$post.is(":checked"));
		
		// click
		$post.click(function(){
			$num.prop("disabled", !this.checked);
		});
	}
	
	// 리스트에서 버튼 활동
	,evtClickedListButtons:function()
	{
		$(".cfg_bbs_list_buttons").click(function(){
			var _this = this
				,$this = $(_this)
				,$parent = $this.closest("tr")
				//,idxno = $parent.attr("data-idxno")
				,bbsId = $parent.attr("data-bbs-id")
				,division = _this.getAttribute("data-division")
				//,parents = this
				,_act = "";
			
			switch(division){
				case "setting":
					location.href="/?mod=bbs&act=adminBbsConfigUptForm&bbs_id="+bbsId;
				break;
				case "move":
					var height = 400
						,html = editSortable.replaceLayerHtmlTag(editSortable.vars.layerBoxIframe, lang.close,  "/?mod=bbs&act=adminBbsMoveForm&bbs_id="+bbsId, (height-60))
						,output = $(html).find(".edit_layer_close").click(editSortable.closeEditLayer).end();
					util.floatLayer(500,height,output);
				break;
				case "empty":
				case "delete":
					if(division==="empty"){
						if(!window.confirm(lang.bbsConfirmEmpty)) return false;
						_act = "adminBbsEmpty";
					}
					
					if(division==="delete"){
						if(!window.confirm(lang.confirmDelete)) return false;
						_act = "adminBbsConfigDlt";
					}
					
					$.post(	"/"
							,{mod:"bbs",act:_act,bbs_id:bbsId}
							,function(data, rst){
								if(rst === "success"){
									if(data.result === "success"){
										if(division==="delete") location.reload(true);
										else util.toast(lang.bbsToastEmptied);
									}else alert(decodeURIComponent(data.msg));
								}else alert(lang.axError);
							},"json");
				break;
			}			
			
			return false;
		});
	}
	
	// tab event
	,evtCfgTab:function()
	{
		TabBox().setTarget("#content")
		.setVars("#cfg_bbs_tab_title_box", ".tab_menu", ".tab_item", ".cfg_bbs_tab_button", ".cfg_bbs_tab")
		.evtTab("click");
		//.visibleDefault(1);
	}
	
	// 게시판 등록 폼내 보이고,감출거
	,evtChangeFormContent:function()
	{
		var $form = $(document.bbsconfig_form)
			,$uploadTarget = $form.find("#cfg_bbs_upload_component_y")
			,$categoryTarget = $form.find("#cfg_bbs_category_str_y")
			,$voteTarget = $form.find("#cfg_bbs_use_vote_y")
			,$adminTypeTargetId = $form.find("#cfg_bbs_perm_admin_id_y")
			,$adminTypeTargetGroup = $form.find("#cfg_bbs_perm_admin_group_y");
		
		$form.find("input[name='upload_component'],input[name='use_category'],input[name='use_vote'],input[name='perm_admin_type']")
		.click(function(){
			var _this = this
				,name = _this.name
				,value = _this.value;
			
			switch(name){
				case "upload_component":
					$uploadTarget[(value==="Y"?"show":"hide")]();
				break;
				case "use_category":
					$categoryTarget[(value==="Y"?"show":"hide")]();
				break;
				case "use_vote":
					$voteTarget[(value==="Y"?"show":"hide")]();
				break;
				case "perm_admin_type":
					if(value === "U"){
						$adminTypeTargetId.show();
						$adminTypeTargetGroup.hide();
					}else{
						$adminTypeTargetId.hide();
						$adminTypeTargetGroup.show();
					}
				break;
			}
		});
	}
	
	// 아이디 찾기 팝업
	,evtSearchIdForManager:function()
	{
		var $button = $("#cfg_bbs_btn_id_search");
		
		$button.click(function(){
			member.evtFindIdByOpen("bbsCfg.evtInsertSelectId");
		});
	}
	
	// 찾은 아이디 필드에 넣기
	,evtInsertSelectId:function()
	{
		var $button = $(".mbr_btn_select")
		,input = opener.document.bbsconfig_form.perm_admin_id;
		
		$button.click(function(){
			var $this = $(this)
				,$parent = $this.closest("tr")
				,userId = $parent.attr("data-user-id")
				,value = input.value.split(",");
			
			if($.inArray(userId, value)<0){
				value.push(userId);				
			}else{
				if(!window.confirm(lang.mbrConfirmDuplId)) return false;
				
				// 아이디제외
				var result = [];
				for(var i=0, cnt=value.length; i<cnt; i++){
					if(value[i] !== userId) result.push(value[i]);
				}
				
				value = result;
			}
			
			input.value = value.join(",").replace(/^\,+/,"");
			
			util.toast(lang.toastAdded);
		});
	}
	
	// 게시판 등록
	,submitRegBBS:function(form)
	{
		var name = form.bbs_name				// 게시판명
			,id = form.bbs_id					// 테이블명
			,skin = form.theme_skin				// 스킨선택
			,comment = form.comment_skin		// 댓글스킨선택
			,upload = form.upload_component		// 첨부파일설정
			,category = form.use_category		// 카테고리 유무
			,num = form.limit_num				// 한페이지에 글 수
			,commentNum = form.limit_comment_num// 한페이지에 댓글수
			,subjectCut = form.subject_cut		// 제목 길이
			,newPost = form.new_post;			// new 아이콘 표시
						
		if(!name.value){
			alert(lang.bbsRequireBbsName);
			name.focus();
			return false;
		}
	
		if(!id.value){
			alert(lang.bbsRequireBbsId);
			id.focus();
			return false;
		}else{
			if(!id.value.match(/^\w+$/gi)){
				alert(lang.validRequireAlNum);
				id.focus();
				return false;
			}
		}
		
		if(!skin.value){
			alert(lang.bbsRequireBbsSkin);
			skin.focus();
			return false;
		}
		
		/*
		if(!comment.value){
			alert(lang.bbsRequireBbsComment);
			comment.focus();
			return false;
		}*/
		
		if($(upload).filter(":checked").val()==="Y"){
			var fileNum = form.upload_max_num
				,uploadSize = form.upload_max_size 
				,uploadTotal = form.upload_max_total;
			
			if(!fileNum.value || !util.onlyNumber(fileNum.value)){
				alert(lang.bbsRequireBbsUploadNum);
				fileNum.focus();
				return false;
			}else{
				if(Number(fileNum.value)>this.vars.fileMaxCount){
					alert(lang.validFileMaxCount.replace("[]", this.vars.fileMaxCount));
					fileNum.focus();
					return false;
				}
			}
			
			if(!uploadSize.value || !util.onlyNumber(uploadSize.value)){
				alert(lang.validOnlyNumber);
				uploadSize.focus();
				return false;
			}
			
			if(!uploadTotal.value || !util.onlyNumber(uploadTotal.value)){
				alert(lang.validOnlyNumber);
				uploadTotal.focus();
				return false;
			}
		}
				
		if($(category).filter(":checked").val()==="Y"){
			var categoryStr = form.category_str;
			if(!categoryStr.value){
				alert(lang.bbsRequireBbsCategory);
				categoryStr.focus();
				return false;
			}
		} 
		
		if(!num.value || !util.onlyNumber(num.value)){
			alert(lang.validOnlyNumber);
			num.focus();
			return false;
		}
		
		if(!commentNum.value || !util.onlyNumber(commentNum.value)){
			alert(lang.validOnlyNumber);
			commentNum.focus();
			return false;
		}
		
		if(!subjectCut.value || !util.onlyNumber(subjectCut.value)){
			alert(lang.validOnlyNumber);
			subjectCut.focus();
			return false;
		}
		
		if(!newPost.value || !util.onlyNumber(newPost.value)){
			alert(lang.validOnlyNumber);
			newPost.focus();
			return false;
		}
		
		return true;
	}
	
	// 이미지 삭제
	,evtDeleteImage:function()
	{
		$(".cfg_bbs_btn_img_delete").click(function(){
			
			if(!window.confirm(lang.confirmDelete)) return false;
			
			var _this = this
				,url = _this.getAttribute("href").replace(/^\/\?/i,"")
				,imgPath = _this.getAttribute("data-img-path")
				//,gid = _this.getAttribute("data-gid")
				,$this = $(_this);
		
			$.post(	"/"
					,url+"&img_path="+imgPath
					,function(data,rst){
						if(rst==="success"){
							if(data.result === "success"){
								$this.closest(".cfg_bbs_img_box").fadeOut(function(){$(this).remove();});
							}else alert(decodeURIComponent(data.msg));
						}else alert(lang.axError);
					},"json");
			
			return false;
		});
	}
	
	// 게시판 이동
	,submitBBSMove:function(form)
	{		
		if(!form.move_bbs_srl.value){
			alert(lang.bbsRequireMoveSelectBar);
			form.move_bbs_srl.focus();
			return false;
		}
		
		if(!window.confirm(lang.bbsConfirmMove)) return false;
		
		return true;
	}
	
	// 게시물 이동/복사
	,submitBBSMoveCopy:function(form)
	{
		var act = form.act.value
			,msg = act=="adminDataMove"?lang.bbsConfirmMove:lang.confirmLongTime;
		
		if(!form.move_bbs_srl.value){
			alert(lang.bbsRequireSelectSelectBar);
			form.move_bbs_srl.focus();
			return false;
		}
		
		if(!window.confirm(msg)) return false;
		
		return true;
	}
	
	// 카테고리 출력 - target : selectbar, print : 뿌려줄곳
	,getCategroyList:function(target, print)
	{
		if(!target || !print) return false;
		$(document.body).on("change",target,
							function(){
								var value = this.value
									,$print = $(print).empty();
								if(!value) return false;
								
								$.post(	"/"
										,{mod:"bbs", act:"axCategoryListSearch", bbs_srl:value}
										,function(data, rst){
											if(rst === "success"){
												if(data.result==="success"){
													var result = data.data;
													if(typeof result == "object"){
														var selectbar = document.createElement("select");
															selectbar.name="move_bbs_category";
															//selectbar.options[0] = new Option(lang.articleListAll,"",true,true);
														
														var i=0;
														for(var key in result){
															var text = decodeURIComponent(result[key])
																,options = new Option(text, key);
															selectbar.options[i++] = options;
														}
														$print.html(selectbar);
														selectbar=null;
														i=null;
													}
												}else alert(decodeURIComponent(data.msg));
											}else alert(lang.axError);
										},"json");
							});
	}
	
	
	//---------- 게시물 관리 ----------//
	// 전체 선택
	,evtClickedAllCheck:function(){
		article.evtAllCheck("#cfg_bbs_all_check", $("#bbs_list_form").find("input[name='chk_idxno[]']"));
	}
	
	// 선택된거 삭제
	,submitDeleteSelected:function(form)
	{
		if(!window.confirm(lang.confirmDelete)) return false;
		
		if($(form).find("input[name='chk_idxno[]']:checked").length<=0){
			alert(lang.validRequireCheckedItem);
			return false;
		}
		
		return true;
	}
	
	// 복사, 이동 버튼 이벤트
	,evtClickedButtons:function()
	{
		var $buttons = $("#cfg_bbs_btn_copy, #cfg_bbs_btn_move");
		
		$buttons.click(function(){
			var $checked = $("#bbs_list_form").find("input[name='chk_idxno[]']:checked");
			if($checked.length<=0){
				alert(lang.validRequireSelectedItem);
				return false;
			}
			
			var $this = $(this)
				,isBtnCopy = $this.is("#cfg_bbs_btn_copy")								// 복사 버튼인가?
				,act = isBtnCopy?"adminDataCopyForm":"adminDataMoveForm"
					
				,width = 500
				,height = 300
				,html = editSortable.replaceLayerHtmlTag(editSortable.vars.layerBoxIframe, lang.close, "about:blank", height-60)
				,output = ""
				,chkIdxno = [];
			
			output = $(html).find(".edit_layer_close").click(editSortable.closeEditLayer).end();
			
			util.floatLayer(width,height,output);	// layer 띄우기
			
			// 값 구하기
			$.each($checked,function(i, ele){
				var val = ele.value;
				if(val) chkIdxno.push(val);
			});			
			
			// post
			var form = util.createHiddenForm({mod:"bbs", act:act, "chk_idxno[]":chkIdxno}, {method:"post", action:"/?dummy=bbs-"+act, target:"edit_layer_frame"});
			document.body.appendChild(form);
			form.submit();
		});
	}
	
	/**
	 * 스팸차단
	 * @params 
	 *  - target : click event target
	 *  - params : {rule:"bbs" ...}
	 */
	,evtClickedIntercept:function(target, params)
	{
		var width = 500
			,height = 300
			,html = editSortable.replaceLayerHtmlTag(editSortable.vars.layerBox, lang.close, "", "")
			,output = ""
			,box = '<div id="spam_intercept" class="spam_intercept">'
				+'		<h3 class="edit_layer_title"><span class="icon_bullet ib_0_1230 elt_icon"></span>'+lang.spamFilter+'</h3>'
				+'		<div class="spam_intercept_box">'
				+'			<div class="spam_intercept_check">'
				+'				<label><input type="checkbox" name="id" value="" checked="checked" /> '+lang.id+' <span class="si_id_text"></span></label>&nbsp;&nbsp;&nbsp;'
				+'				<label><input type="checkbox" name="ip" value="" checked="checked" /> '+lang.ip+' <span class="si_ip_text"></span></label>'
				+'			</div>'
				+'			<div class="spam_intercept_buttons">'
				+'				<button type="button" class="btn_bg btn_bg_800 spam_intercept_btn"><span class="btn_bg btn_bg_in">'+lang.intercept+'</span></button>&nbsp;&nbsp;&nbsp;'
				+'				<button type="button" class="btn_bg btn_bg_800 spam_intercept_btn_delete"><span class="btn_bg btn_bg_in">'+lang.intercept+' &amp; '+lang.delte+'</span></button>'
				+'			</div>'
				+'		</div>'
				+'	</div>';// html 박스
		
		if(typeof params != "object") params={rule:"bbs"};
		
		$(document.body).on("click",target, function(){
			var _this = this
				,id = _this.getAttribute("data-id")
				,ip = _this.getAttribute("data-ip");
			
			output = $(html).find(".edit_layer_close").click(editSortable.closeEditLayer)
					.end().find(".edit_layer_frame").html(box)
					.find("input[name='id']").val(id)
					.end().find("input[name='ip']").val(ip)
					.end().find(".si_id_text").text("("+id+")")
					.end().find(".si_ip_text").text("("+ip+")")
					.end().find(".spam_intercept_btn, .spam_intercept_btn_delete").click(function(){
						var $this = $(this)
							,isDelete = $this.is(".spam_intercept_btn_delete")									// 차단? 차단후 삭제?
							,$checkbox = $this.closest(".spam_intercept_box").find(".spam_intercept_check")
							,$buttonBox = $this.closest(".spam_intercept_buttons")
							,after = isDelete?"dlt":"none"
							,id = $checkbox.find("input[name='id']:checked").val()||""
							,ip = $checkbox.find("input[name='ip']:checked").val()||"";
						
						if(after === "dlt"){
							if(!window.confirm(lang.confirmLongTime)) return false;
							$buttonBox.find("*").hide().end().addClass("intercept_load");				// 대기 이미지
						}
						
						// parameter
						params.mod = "configuration";
						params.act = "spamBlockProc";
						params.after = after;
						params.id = id;
						params.ip = ip;
						
						// post 전송함
						$.post(	"/"
								,params
								,function(data, rst){
									if(rst==="success"){
										if(data.result==="success"){
											location.reload(true);
										}else alert(decodeURIComponent(data.msg).replace(/<br>/g,"\n"));
									}else alert(lang.axError);
									
									if($buttonBox.hasClass("intercept_load")){
										$buttonBox.find("*").show().end().removeClass("intercept_load");
									}
								},"json");	
					}).end().end();
			
			// id가 없을때 안보이게
			output.find("input[name='id']").parent("label")[(id==""?"hide":"show")]();
			
			util.floatLayer(width,height,output);	// layer 띄우기
			
			output = null;
			
			util.inputReload(output);				// checkbox image
		});
	}
	
	// 게시물관리 전체 선택
	,evtClickedSingoAllCheck:function(){
		article.evtAllCheck("#cfg_bbs_all_check", $("#bbs_declare_list_form").find("input[name='chk_idxno[]']"));
	}
	
	// 게시물관리 전체 삭제
	,submitSingoAllDelete:function(form)
	{
		if(!window.confirm(lang.confirmDelete)) return false;
		
		if($(form).find("input[name='chk_idxno[]']:checked").length<=0){
			alert(lang.validRequireCheckedItem);
			return false;
		}
		
		return true;
	}
	
	// 게시물관리 개개 삭제
	,evtClickedSingoDelete:function()
	{
		var form = document.bbs_declare_list_form
			,mod = form.mod.value
			,act = form.act.value
			,mode = form.mode.value;
		$(".cfg_bbs_singo_btn_delete").click(function(){
			if(!window.confirm(lang.confirmDelete)) return false;
			var form = util.createHiddenForm({mod:mod,act:act,mode:mode,idxno:(this.getAttribute("data-idxno")||"")}, {method:"post", action:"/?dummy="+mod+"-"+act+"-"+mode});
			document.body.appendChild(form);
			form.submit();
		});
	}
	
	// 게시물신고 내용 보기
	,evtClickedSingoView:function()
	{
		var $btn = $(".cfg_bbs_singo_btn_view");
	
		$btn.on("click", function(){
			var href = this.href
				,width = 700
				,height = 500
				,parents = editSortable
				,html = parents.replaceLayerHtmlTag(parents.vars.layerBoxIframe, lang.close, href, (height-60))
				,output = "";
			
			output = $(html).find(".edit_layer_close").click(parents.closeEditLayer).end();
			util.floatLayer(width,height,output);	// layer 띄우기
			
			return false;
		});
	}
		
	// 댓글관리 전체선택
	,evtClickedAllCheckReply:function(){
		article.evtAllCheck(".cfg_bbs_all_check", $("#bbs_comment_list_form").find("input[name='chk_idxno[]']"));
	}
	

	/**
	 * 게시물 등급관리 레벨 저장
	 * $this : 현재 jquery 객체 
	 * send : 전송중인가-true라면 mouseout 할때 원래대로 안돌아감
	 * idxno : 게시물 idxno
	 * onLevel : 현재 레벨
	 */
	,saveLevelData:function($this, send, idxno, onLevel)
	{
		if(send === true || !idxno) return false;		
		$.post(	"/"
				,{mod:"bbs",act:"adminDataLevelUpt",idxno:idxno,up_level:onLevel}
				,function(data, rst){
					if(rst === "success"){
						if(data.result === "success"){											
							$this.attr("data-level", onLevel);							
							util.toast(lang.toastSaved);
						}else alert(decodeURIComponent(data.msg)||"");
					}else alert(lang.axError);
				},"json");
		
		return true;
	}
	
	/**
	 * 게시물 등급관리 타이틀 링크 이동
	 */
	,moveLevelData:function()
	{
		return true;
	}
};



/*****************************************************************************
게시판 사용자
*****************************************************************************/
var bbs={
	vars:{
		editMode : "TEXT"
		,isAdmin : false
	}
	
	// 첨부파일 삭제
	/*
	,evtClickedDeleteFile:function()
	{
		var bbsId = document.bbs_write_form.bbs_id.value;
		if(!bbsId) return false;
		
		$(".bbs_write_attach_btn_delete").click(function(){
			if(!window.confirm(lang.confirmDelete)) return false;
			
			var $this = $(this)
				,fileIdxno = this.getAttribute("data-file-idxno");
			if(!fileIdxno) return false;
			
			$.post(	"/"
					,{mod:"bbs", act:"attachDlt", bbs_id:bbsId, upload_idxno:fileIdxno}
					,function(data, rst){
						if(rst==="success"){
							if(data.result==="success"){
								$this.remove();
							}else alert(decodeURIComponent(data.msg));
						}else alert(lang.axError);						
					},"json");
			
			return false;
		});
	}*/

	// 캡챠 load
	,loadCaptcha:function()
	{
		if(util.loadCaptcha("bbs_write_captcha_box")===false) 
			return false;		
	}
	
	// 게시물 삭제
	,evtClickedDeleteFromView:function()
	{
		var $boxLayer = $("#bbs_pwd_box");
		$(".bbs_btn_delete").click(function(){
			var $this = $(this);
			if($this.hasClass("bbs_btn_delete_password")){									// 비회원 글쓴거 비번 입력레이어
				var width = 500
					,height = 300
					,html = editSortable.replaceLayerHtmlTag(editSortable.vars.layerBox, lang.close, "", "")
					,output = "";
				
				output = $(html).find(".edit_layer_close").click(function(){
					editSortable.closeEditLayer();
					//$boxLayer.hide();
				})
				.end().find(".edit_layer_frame").html($boxLayer.html()).end();
				
				util.floatLayer(width,height,output);	// layer 띄우기				

				return false;
			}else{
				if(!window.confirm(lang.confirmDelete)) return false;						// 회원 로그인 글쓴거 confirm창
				
				// post로 삭제
				var json = util.linkToJson($this.attr("href"));
				var form = util.createHiddenForm(json, {method:"post",action:"/?dummy="+json.mod+"-"+json.act});				
				document.body.appendChild(form);			
				form.submit();	
				return false;
			}
		});
	}
	
	// 레이어로 뜬 비번 확인 창 submit
	,submitDeletePwd:function(form)
	{
		if(!form.password.value){
			alert(lang.validRequirePassword);
			form.password.focus();
			return false;
		}
		return true;
	}
	
	// 게시물 추천 반대
	,evtClickedRecomView:function()
	{
		var view = document.getElementById("bbs_view_box")
			,bbsId = view.getAttribute("data-bbs-id")
			,idxno = view.getAttribute("data-idxno")
			,$btnPositive = $("#bbs_view_btn_positive")
			,$btnNegative = $("#bbs_view_btn_negative");
		
		$btnPositive.add($btnNegative).click(function(){
			var $this = $(this)
				,isPositive = $this.is("#bbs_view_btn_positive")
				,type = isPositive?"up":"down";
			
			$.post(	"/"
					,{mod:"bbs", act:"vote", bbs_id:bbsId, idxno:idxno, type:type}
					,function(data, rst){
						if(rst === "success"){
							if(data.result==="success"){
								var datas = data.data[0];
								if(!datas.up_count || !datas.down_count) return false;
								
								$btnPositive.find(".bbs_view_btn_count").text(datas.up_count||"0");
								$btnNegative.find(".bbs_view_btn_count").text(datas.down_count||"0");								
							}else util.toast(decodeURIComponent(data.msg));
						}else alert(lang.axError);
					},"json");
		});
	}
	
	// 신고
	,evtSingoFromBbsView:function()
	{
		var parentLayer = editSortable
			,width = 700
			,height = 650;
		$(document.body).on("click","#bbs_view_btn_singo",
							function(){
								var url = util.replaceURLToUser(this.href)
									,html = parentLayer.replaceLayerHtmlTag(parentLayer.vars.layerBoxIframe, lang.close, url, (height-60))
									,output = "";
								output = $(html).find(".edit_layer_close").click(parentLayer.closeEditLayer).end();
								util.floatLayer(width,height,output);	// layer 띄우기
								
								return false;
							});
	}
	
	// 댓글신고 전송
	,submitSingo:function(form)
	{
		if(!form.name.value){
			alert(lang.validRequireName);
			form.name.focus();
			return false;
		}
		
		if(!form.email.value){
			alert(lang.validRequireEmail);
			form.email.focus();
			return false;
		}
		
		return true;
	}
	
	// 비번확인
	,submitConfirmSecret:function(form)
	{
		if(!form.password.value){
			alert(lang.validRequirePassword);
			form.password.focus();
			return false;
		}
		return true;
	}
	
	/**
	 * 게시물 중요도 체크후 callback function
	 *  * target : 이벤트 객체
	 *  
	 *  * callback function parameter
	 *  	$this : 현재 jquery 객체 
	 *  	send : 전송중인가-true라면 mouseout 할때 원래대로 안돌아감
	 *  	idxno : 게시물 idxno
	 *  	onLevel : 현재 레벨
	 *  
	 * html 예제
	 * <span id="bbs_level_box" class="bbs_level_box" data-level="{if $row.level eq ''}1{else}{$row.level}{/if}">
		<input type="radio" name="level" id="bbs_level_input_1" class="bbs_level_input" value="1" {if $row.level eq "1" || $row.level eq ""}checked="checked"{/if} />
		<label for="bbs_level_input_1" class="bbs_level_label on" title="{$lang.bbs_level_title} 1" data-level="1" ><span class="bbs_level_text">{$lang.bbs_level_title} 1</span></label>
		
		<input type="radio" name="level" id="bbs_level_input_2" class="bbs_level_input" value="2" {if $row.level eq "2"}checked="checked"{/if} />
		<label for="bbs_level_input_2" class="bbs_level_label{if $row.level gte 2} on{/if}" title="{$lang.bbs_level_title} 2" data-level="2"><span class="bbs_level_text">{$lang.bbs_level_title} 2</span></label>
		
		<input type="radio" name="level" id="bbs_level_input_3" class="bbs_level_input" value="3" {if $row.level eq "3"}checked="checked"{/if} />
		<label for="bbs_level_input_3" class="bbs_level_label{if $row.level gte 3} on{/if}" title="{$lang.bbs_level_title} 3" data-level="3"><span class="bbs_level_text">{$lang.bbs_level_title} 3</span></label>
		
		<input type="radio" name="level" id="bbs_level_input_4" class="bbs_level_input" value="4" {if $row.level eq "4"}checked="checked"{/if} />
		<label for="bbs_level_input_4" class="bbs_level_label{if $row.level gte 4} on{/if}" title="{$lang.bbs_level_title} 4" data-level="4"><span class="bbs_level_text">{$lang.bbs_level_title} 4</span></label>
		
		<input type="radio" name="level" id="bbs_level_input_5" class="bbs_level_input" value="5" {if $row.level eq "5"}checked="checked"{/if} />
		<label for="bbs_level_input_5" class="bbs_level_label{if $row.level gte 5} on{/if}" title="{$lang.bbs_level_title} 5" data-level="5"><span class="bbs_level_text">{$lang.bbs_level_title} 5</span></label>
	 * </span>
	 * 
	 * <label> 대신에 <a href="~~~">이동시에는 태그 해도 됨
	 * 
	 * Exc ::: bbs.evtOverLevel("#bbs_level_box", function($this, send, idxno, onLevel){ --- code --- });
	 */
	,evtOverLevel:function(target, func)
	{
		var oldLevel = null												// 이미 선택되어 있던 레벨값
			,send = false;												// click event로 보내주었나? 안보내주었으면 oldLevel로 다시 돌아갈껏
		
		//-------- 기본 callback function ----------/
		if(!func || (typeof func)!=="function"){
			func = function(){};
		}
		
		$(document.body).on(
		{
			mouseenter:function(){	
				$(".ui-tooltip").remove();
				
				var $this = $(this)
					,$children = $this.find(".bbs_level_label")
					,idxno = $this.attr("data-idxno")||""
					,onLevel = null;
				
				oldLevel = Number($this.attr("data-level"))||0;				
						
				$children.off("mouseenter mouseleave click").on({
					mouseenter:function(){
						
						if(send === true) return false; 
						
						var $_this = $(this)
							,_level = ($children.index($_this)||0)+1;
					
						$children.removeClass("on");
						$children.filter(".bbs_level_label:lt("+(_level)+")").addClass("on");
						
						onLevel = _level;
						
						// tooltip
						util.showTooltip($this, {
							position: {
						        my: "center bottom-5"
						        ,at: "center top"
						        /* custom class 일때, 
						        ,using: function( position, feedback ) {
						          $( this ).css( position );
						          $( "<div>" ).addClass( "arrow" ).appendTo( this );
						        }*/
						      }
							,show: { effect: "", duration: 0 } 
							,hide: { effect: "", duration: 0 }
						});
					}
					,mouseleave:function(){
						onLevel = null;
					}
					,click:function(){						
						var result = func.apply(this, [$this, send, idxno, onLevel]);
						send = true;
						
						return result;
					}
				});
				
			}
			,mouseleave:function(){
				var $children = $(this).find(".bbs_level_label");
				$children.off("mouseenter mouseleave click");
				
				// 저장없이 나갔다면 원래 것으로 되돌려놓음
				if(send === false){					
					$children.removeClass("on").filter(".bbs_level_label:lt("+(oldLevel)+")").addClass("on");
				}
				
				oldLevel = null;
				send = false;
			}
		
		},target);
	}
	
	/**
	 * 글쓰기 폼내 레벨 선택
	 */
	,checkLevelData:function($this, send, idxno, onLevel)
	{
		if(!onLevel) return false;			
		return true;
	}
	
	// 프린트
	,openPrint:function(target)
	{
		$(target).click(function(){
			window.open(this.href, "print", "width=700,height=600")
			
			return false;
		});
	}
	
};





/*****************************************************************************
설문,투표(survey, vote, poll) - 등록
*****************************************************************************/
var pollReg={
	vars:{}
	
	// 항목 클릭시 이벤트
	,evtClickedItems:function()
	{
		var parents = this
			,$form = $(document.poll_form) 
			
			// 클릭할 객체
			,$questionType = $form.find("input[name='question_type']")
			,$etcCheck = $form.find("input[name='etc_check']")
			,$endWay = $form.find("input[name='end_way']")
			,$userReply = $form.find("input[name='use_reply']")
			
			
			// 변화가 있을 객체
			,$answerCntBox = $("#poll_answer_cnt_box")
			,$etcCheckBox = $("#poll_etc_check_box")
			,$etcTitleBox = $(".poll_etc_title_box")
			,$endWayPeriod = $("#poll_end_way_period")
			,$endPersonCnt = $("#poll_person_cnt")
			,$replyLengthBox = $("#poll_reply_length_box")
			
			// 투표항목
			,$questionsBox = $("#poll_questions_box")
			,$questionItems = $("#poll_question_sortable");
		
		// 질문 형식
		$questionType.click(function(){
			var val = this.value;
			
			if(val==="S"){
				$answerCntBox.hide().find("input").val("");
				$etcCheckBox.add($questionsBox).show();
			}else if(val==="M") $answerCntBox.add($etcCheckBox).add($questionsBox).show();				
			else if(val==="T"){
				$answerCntBox.add($etcCheckBox).add($etcTitleBox).add($questionsBox.find(".pq_li").not(":first").remove().end().end()).hide().find("input").val("");				
				$etcCheck.prop("checked", false);
			}
		});
	
		// 기타 항목
		$etcCheck.change(function(){
			$etcTitleBox[(this.checked===true?"show":"hide")]();
		});
				
		// 종료방법
		$endWay.click(function(){
			var val = this.value
				,$two = $endWayPeriod.add($endPersonCnt);
			
			$two.hide().find("input").val("");
			if(val==="T") $endWayPeriod.show();					// 기간 보임
			else if(val==="P") $endPersonCnt.show();			// 인원수 입력란 보임
		});

		// 투표항목 추가 이벤트
		$questionItems.sortable({
									axis:"y"
									,forcePlaceholderSize:true
									,placeholder: "ui-state-highlight"
								})
								// 추가 / 삭제
								.on("click", ".pq_btn_add, .pq_btn_remove"	
									 ,function(){
										var _this = this
											,$this = $(_this)
											,isAddButton = $this.is(".pq_btn_add")			// 덧붙이기 버튼인가?
											,$parent = $this.closest(".pq_li")
											,liCnt = $parent.siblings(".pq_li").length;
										
										// 추가라면
										if(isAddButton){
											if(liCnt>=49) return false;						// 50개까지만
											$parent.clone().find(".pq_question").val("").end().insertAfter($parent);
										}else{										
											if(liCnt<=0){		// 마지막 한개라면 메시지
												alert(lang.editcfgRequireNotRemove);
												return false;
											}											
											$parent.remove();
										}
									 });		
		
		// 달력
		picker.appendCalendar(["#poll_sdate","#poll_edate"], [	function(){
																	parents.changeDate("#poll_sdate", "#poll_edate", "#poll_days");
																}
																,function(){
																	parents.changeDate("#poll_sdate", "#poll_edate", "#poll_days");
																}]);
		
		// 댓글 여부
		$userReply.click(function(){
			$replyLengthBox[this.value=="Y"?"show":"hide"](); 
		});
	}
	
	/**
	 * 달력변경시 처리
	 * @params 
	 *  - dateSelector1 , dateSelector2 달력 표시할 필드
	 *  - printSelector 몇일간 날짜 표시
	 */
	,changeDate:function(dateSelector1, dateSelector2, printSelector)
	{
		if(!dateSelector1 || !dateSelector2) return false;
		
		var $dSelector1 = $(dateSelector1)
			,$dSelector2 = $(dateSelector2)
			,sDate = $dSelector1.val()||""
			,eDate = $dSelector2.val()||""
			,days = picker.getDaysPeriod(sDate,eDate);
		
		if(days==="empty") return false;
		
		if(!days || days==="error"){
			alert(lang.pollRequireWrongDate);
			$dSelector2.val("").focus();
			return false;
		}
		
		if(!printSelector) return "";
		$(printSelector).text(days);
	}
	
	// 전송
	,submitForContent:function(form)
	{
		var title = form.title
			,questions = document.getElementsByName("question[]")
			,$questionType = $(form.question_type).filter(":checked")
			,$etcCheck = $(form.etc_check).prop("checked")
			,$endWay = $(form.end_way).filter(":checked");
		
		if(!title.value){
			alert(lang.pollRequireTitle);
			title.focus();
			return false;
		}
		
		if($questionType.val()!=="T" && questions.length>0){
			for(var i=0, cnt=questions.length; i<cnt; i++){
				if(!questions[i].value){
					alert(lang.pollRequireQuestions);
					questions[i].focus();
					return false;
				}
			}
		}
		
		if($questionType.val()==="M"){
			var answer = form.answer_cnt;
			if(!answer.value || !util.onlyNumber(answer.value)){
				alert(lang.validOnlyNumber);
				answer.focus();
				return false;
			}
		}
		
		if($questionType.val()!=="T" && $etcCheck===true){
			var ectTitle = form.etc_title
				,etcLength = form.etc_length;
			
			if(!ectTitle.value){
				alert(lang.pollRequireEtcTitle);
				ectTitle.focus();
				return false;
			}
			
			if(!etcLength.value || !util.onlyNumber(etcLength.value)){
				alert(lang.validOnlyNumber);
				etcLength.focus();
				return false;
			}
		}
		
		if($endWay.val()==="T"){
			var sDate = form.sdate
				,eDate = form.edate
				,regexp = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
			
			if(!sDate.value || !sDate.value.match(regexp)){
				alert(lang.pollRequireWrongDate);
				sDate.focus();
				return false;
			}
			
			if(!eDate.value || !eDate.value.match(regexp)){
				alert(lang.pollRequireWrongDate);
				eDate.focus();
				return false;
			}
			
		}else if($endWay.val()==="P"){
			var personCnt = form.person_cnt;
			if(!personCnt.value || !util.onlyNumber(personCnt.value)){
				alert(lang.validOnlyNumber);
				personCnt.focus();
				return false;
			}
		}
		
		return true;
	}
	
	// 설문바로 종료
	,evtClickedNowFinish:function()
	{
		$(".poll_finish_now").click(function(){
			var $this = $(this)
				,$parentTr = $this.closest("tr")
				,idxno = $parentTr.attr("data-idxno");
			
			if(!idxno) return false;
			
			if(!window.confirm(lang.pollConfirmNowFinish)) return false;
			
			$.post(	"/"
					,{mod:"poll", act:"pollFinish", idxno:idxno}
					,function(data, rst){
						if(rst==="success"){
							if(data.result === "success"){
								$this.parent("div").remove();
							}else alert(decodeURIComponent(data.msg));
						}else alert(lang.axError);
					},"json");
		});
	}
	
	// 태그삽입
	,evtClickedCopyTag:function()
	{
		$("#poll_view_copy_input").click(function(){
			this.select();
			
			if(window.clipboardData){
				window.clipboardData.setData('Text',this.value);
				util.toast(lang.copiedDoPaste);
			}else util.toast(lang.controlCcopy);
		});
	}
		
	// 전체 선택
	,evtClickedAllCheckReplyList:function(){
		article.evtAllCheck(".arl_reply_btn_all_select", $("#poll_reply_list_form").find("input[name='re_idxno[]']"));
	}
	
	// 개개의 댓글 삭제
	,evtClickedListDelete:function()
	{
		articleReply.evtDelete("poll", "replyAllDlt");
	}
	
	// 댓글 리스트에서 전체 삭제 전송
	,submitFromList:function(form)
	{
		return articleReply.submitFromList(form);
	}
	
	// 차단
	,evtClickedIntercept:function(target, box)
	{
		var params = {rule:"poll"};
		bbsCfg.evtClickedIntercept(target, params);
	}
	
	// 전체선택
	,evtClickedAllCheck:function()
	{
		article.evtAllCheck("#poll_singo_btn_all_select", $("#poll_singo_form").find("input[name='idxno[]']"));
	}
	
	// 삭제
	,evtDelete:function()
	{
		$(".poll_singo_btn_delete").click(function(){
			if(!window.confirm(lang.confirmDelete)) return false;
			var f = document.poll_singo_form;
			var form = util.createHiddenForm({mod:f.mod.value,act:f.act.value,idxno:(this.getAttribute("data-idxno")||"")}, {method:"post", action:"/?dummy="+f.mod.value+"-"+f.act.value});
			document.body.appendChild(form);
			form.submit();
		});
	}
	
	// 보기
	,view:function()
	{
		var $btn = $(".poll_singo_btn_view");
	
		$btn.on("click", function(){
			var href = this.href
				,width = 700
				,height = 300
				,parents = editSortable
				,html = parents.replaceLayerHtmlTag(parents.vars.layerBoxIframe, lang.close, href, (height-60))
				,output = "";
			
			output = $(html).find(".edit_layer_close").click(parents.closeEditLayer).end();
			util.floatLayer(width,height,output);	// layer 띄우기
			
			return false;
		});		
	}
};





/*****************************************************************************
메인판 : 아이콘,타이틀 색상 변경
글쓰기 폼 : 약물(특수문자) 추가
*****************************************************************************/
var editStyleTitle={
	vars:{
		area:null
	}
	
	/**
	 * 특수문자 일반 input, textarea에 넣기 
	 * @params
	 *  target : 특수문자가 있는 이벤트 줄 영역 - jquery selector string
	 *  type : text(), html() 인지?
	 *  area : 특수문자 넣을 필드 document 객체	 
	 */
	,putChar:function(target, type)
	{
		if(!target) return false;
		if(!type) type="text";
		
		var parents = this;
		$(document.body).on("click", target, 
			function(e){
				var text = this.getAttribute("data-value")
					,area = parents.vars.area;
				
				if(!area) return false;
				if(!text){
					text = $.trim($(this)[type]().replace(/&lt;/g,"<").replace(/&gt;/g,">"));					
				}
				
				try{																					//ie
					area.focus();			
					var range = document.selection.createRange(); 
					range.text = text;
					
				}catch(e){ 																				//etc ...
					try{
						var orignPos = area.selectionStart+text.length 									// 처음 찍은 caret 위치 기억
							,oValue = area.value
							,oValueDeb = oValue.substring(0 , area.selectionStart)
							,oValueFin = oValue.substring(area.selectionEnd , area.textLength); 
						area.value = oValueDeb + text + oValueFin;
		
						area.setSelectionRange(orignPos, orignPos); 									//caret위치에 놓기
					}catch(e){
						area.value += text;
					}
				}
			return false;
		});
	}
	
	// 버튼에 클릭 이벤트
	,evtPutChar:function(btns)
	{
		var parents = this
			,target = "#arl_spchars_box button"
			,$box = $("#arl_spchars_box").draggable();
		
		// show
		$(btns).click(function(){
			var $this = $(this)
				,pos = $this.position();
		
			$box.css({"top":pos.top,"left":pos.left}).show();
			if (this.id == "arl_maintitle_btn_spchars") parents.vars.area = document.article_form["maintitle"];
			else parents.vars.area = document.article_form[this.id==="arl_title_btn_spchars" ? "title" : "sub_title"];
		});
		
		// hide
		$box.find("#arl_spchars_btn_close").click(function(){
			$box.hide();
		});
		
		// input,textarea 클릭시 area변환
		$("#arl_title, #arl_sub_title, #arl_maintitle").click(function(){
			parents.vars.area = this;
		});

		parents.putChar(target);
	}
};


/*****************************************************************************
폼양식-구독시청,제휴문의 등... 설정
*****************************************************************************/
var frmscfg={
	addPageEvent:function()
	{
		// 사용자등록폼
		var $customize = $("#cfg_form_customize_box")
			,customizeValue=$("input[name='use_customize']").click(function(){
				$customize[this.value=="Y"?"show":"hide"]();
			}).filter(":checked").val();		
		$customize[customizeValue=="Y"?"show":"hide"]();
		
		// 개인정보수집동의
		var $agreeContent = $("#cfg_form_agree_content_box");
		$("input[name='use_agree']").click(function(){
			$agreeContent[this.value==="Y"?"show":"hide"]();			
		});
				
		// 완료후 페이지 이동
		var $linkTypeMove = $("#cfg_form_link_type_move")
			,$linkTypeClose = $("#cfg_form_link_type_close");
		$("input[name='link_type']").click(function(){
			var val = this.value;
			if(val === "move"){
				$linkTypeMove.show();
				$linkTypeClose.hide();
			}else if(val === "close"){
				$linkTypeMove.add($linkTypeClose).hide();
			}else{
				$linkTypeMove.hide();
				$linkTypeClose.show();
			}
		});
		
		// 결제 모듈 사용
		var $payModule = $("#payment_code_box")
			,payModuleValue = $("input[name='use_payment']").click(function(){
				$payModule[this.value=="Y"?"show":"hide"]();
			}).filter(":checked").val();
		$payModule[payModuleValue=="Y"?"show":"hide"]();
	}

	// 삭제
	,evtClickedDelete:function()
	{
		$(".cfg_form_img_btn_delete").click(function(){
			if(!window.confirm(lang.confirmDelete)) return false;
			
			var $this = $(this)
				,link =  this.getAttribute("href").replace(/^\/\?/,"");
			
			$.post("/?dummy=form-formImageDlt"
					,link
					,function(data,rst){
						if(rst === "success"){
							if(data.result === "success"){
								$this.closest(".cfg_form_img_delete").fadeOut(function(){$(this).remove();});								
							}else alert(decodeURIComponent(data.msg));
						}else alert(lang.axError);
					},"json");
			
			return false;
		});
	}
	
	// 등록
	,submitReg:function(form)
	{
		if(!form.form_name.value){
			alert(lang.validRequireName);
			form.form_name.focus();
			return false;
		}
		
		if(!form.form_id.value){
			alert(lang.loginNotId);
			form.form_id.focus();
			return false;
		}
		
		return true;
	}
	
	// 전체선택
	,evtClickedAllCheck:function(){
		article.evtAllCheck("#cfg_form_all_check", $("#form_data_list_form").find("input[name='chk_idxno[]']"));
	}
	
	// 스팸차단
	,evtClickedIntercept:function(target)
	{
		var params = {rule:"form"};
		bbsCfg.evtClickedIntercept(target, params);
	}
	
	// 게시물신고 내용 보기
	,evtClickedView:function()
	{
		var $btn = $(".cfg_form_list_btn_view");
	
		$btn.on("click", function(){
			var href = this.href
				,width = 800
				,height = 600
				,parents = editSortable
				,html = parents.replaceLayerHtmlTag(parents.vars.layerBoxIframe, lang.close, href, (height-60))
				,output = "";
			
			output = $(html).find(".edit_layer_close").click(parents.closeEditLayer).end();
			util.floatLayer(width,height,output);	// layer 띄우기
			
			return false;
		});
	}
	
	// 엑셀 다운로드 내용 보기 
	,evtClickedExcelView:function()
	{
		$("#cfg_form_list_btn_excel").on("click", function(){
			var form = document.form_data_list_form
				,href = '/?mod=form&act=adminExcelForm&form_id=' + form.form_id.value + '&data_type=' + form.data_type.value
				,width = 800
				,height = 320
				,parents = editSortable
				,html = parents.replaceLayerHtmlTag(parents.vars.layerBoxIframe, lang.close, href, (height-60))
				,output = "";
			
			output = $(html).find(".edit_layer_close").click(parents.closeEditLayer).end();
			util.floatLayer(width,height,output);	// layer 띄우기
			
			return false;
		});
	}
	
	// 기간지정
	,evtClickedPeriod:function()
	{
		var $startDate = $("#cfg_form_start_date")
			,$endDate = $("#cfg_form_end_date")
			,$input = $startDate.add($endDate)
			,current = util.getCurrentDateTime("object")
			,date = current.year+"-"+current.month+"-"+current.date;
		
		// input 에는 달력 이벤트 안줌
		$input.datepicker("option", "showOn", "button").next("button").hide();
		
		$("input[name='search_term']").click(function(){
			var value = this.value;
			
			// readonly
			$input.prop("readonly", (value==="manual" ? false : true));
			
			if(!value || value==="manual"){
				$input.val("").next("button")[value==="manual"?"show":"hide"]();
			}else{
				var before = new Date()
				before.setMonth(current.month-parseInt(value,10)-1);
								
				var _year = before.getFullYear()
					,_month = util.strPad(before.getMonth()+1, 2, "0", "left")
					,_date = util.strPad(before.getDate(), 2, "0", "left")
					,_start = _year+"-"+_month+"-"+_date;
				
				$startDate.val(_start).next("button").hide();
				$endDate.val(date).next("button").hide();
			}
		});
	}
	
	// 엑셀 다운 폼 submit
	,submitExcel:function(form)
	{
		if(!form.search_form.value){
			alert(lang.formRequireSelect);
			form.search_form.focus();
			return false;
		}
		
		if(!$(form).find("input[name='search_term']:checked").val()) return true;			// 전체라면 다운로드
		
		if(!form.term_start.value){
			alert(lang.validRequirePeriod);
			form.term_start.focus();
			return false;
		}
		
		if(!form.term_end.value){
			alert(lang.validRequirePeriod);
			form.term_end.focus();
			return false;
		}
		
		return true;
	}
};




/*****************************************************************************
배너/팝업/플로팅이벤트 adContent -> adc
*****************************************************************************/
var adc={
	vars:{
		separator : "|"
		,editId : null												// 수정할 id
		,box : '<div class="adc_crt_edit_map" />'					// 생성된 박스
		,buttons : '<span class="adc_crt_edit_map_buttons"><button type="button" class="btn_com btn_com_0_699 adcmb_button adcmb_modify" title="수정">m</button><button type="button" class="btn_com btn_com_35_699 adcmb_button adcmb_delete" title="삭제">x</button></span>'		//생선된 박스의 버튼들
		,$textBox : null
		,act : "crt"												// 사진 업로드하고 이러저하게 자주 act값이 바뀌는데, 그것의 원래 값
		,iframe : '<iframe src="about:blank" name="adc_up_frame" id="adc_up_frame" width="0" height="0" frameborder="0"></iframe>'	// upload용 iframe
		,loadData : {}												// 수정시 데이타
	}	

	// 현재 날짜 입력해놓기
	,insertCurrentDatetime:function(target)
	{
		var $target = $(target);
		if(!$target.val()){
			$target.val(util.getCurrentDateTime());
		}
	}
	
	// 등록 전송
	,crtSubmit:function(form)
	{
		this.releaseForm(form);
		
		var contentType = $("input[name='content_type']:checked").val()
			,popupType = $("input[name='popup_type']:checked").val();
		
		if(!form.title.value){
			alert(lang.validRequireTitle);
			form.title.focus();
			return false;
		}
		
		if(contentType=="FILE"){
			if(form.act.value==="upt"){
				// 수정
				if($("#adc_crt_file_image").attr("src")=="" && !form.content_file.value){
					alert(lang.validRequireFile);
					form.content_file.focus();
					return false;
				}	
			}else{
				// 새로 등록
				if(!form.content_file.value){
					alert(lang.validRequireFile);
					form.content_file.focus();
					return false;
				}
			}
		}else if(contentType=="HTML"){
			if(!form.content_html.value){
				alert(lang.daumapiRequireTag);
				form.content_html.focus();
				return false;
			}	
		}
		
		var tStart = form.start.value
			,tEnd = form.end.value
			,regexp = /^(\d{4})\-\d{1,2}\-\d{1,2} \d{1,2}:\d{1,2}$/
			,regsplit = /\s|\-|\:/g;
		
		if(tEnd){
			if(!tStart.match(regexp)){
				alert(lang.validRequireStartDate);
				form.start.focus();
				return false;
			}
		}
		
		if(tEnd && tEnd!="0"){
			if(!tEnd.match(regexp)){
				alert(lang.validRequireEndDate);
				form.end.focus();
				return false;
			}
			
			var rsDate = tStart.split(regsplit)
				,reDate = tEnd.split(regsplit)
				,stime = new Date()
				,etime = new Date();
			
			stime.setFullYear(rsDate[0]);
			stime.setMonth(Number(rsDate[1])-1);
			stime.setDate(rsDate[2]);
			stime.setHours(rsDate[3]);
			stime.setMinutes(rsDate[4]);
			
			etime.setFullYear(reDate[0]);
			etime.setMonth(Number(reDate[1])-1);
			etime.setDate(reDate[2]);
			etime.setHours(reDate[3]);
			etime.setMinutes(reDate[4]);
			
			var gap = etime.getTime()-stime.getTime();
			if(gap<0){
				alert(lang.pollRequireWrongDate);
				form.end.focus();
				return false;
			}
		}
		
		if(popupType=="window"){
			if(!form.popup_width.value && !form.popup_height.value){
				alert(lang.adcRequirePopupSize);
				form.popup_width.focus();
				return false;
			}
			
			if(!util.onlyNumber(form.popup_width.value)){
				alert(lang.validOnlyNumber);
				form.popup_width.focus();
				return false;
			}
			
			if(!util.onlyNumber(form.popup_height.value)){
				alert(lang.validOnlyNumber);
				form.popup_height.focus();
				return false;
			}
		}	
		
		return true;
	}

	// 이미지 로딩되면 크기 재어오기
	// IE만 이미지 로딩된후 이벤트가 먹어져서 크기를 제대로 재어오지 못해서 inline으로 스크립트 작성함
	,getSizeLoadImage:function(_this)
	{
		var _w = _this.width
			,_h = _this.height;
		
		_this.setAttribute("data-display-width", _w);
		_this.setAttribute("data-display-height", _h);
		
		// 이미지맵 이벤트
		adc.map($(_this));
	}
	
	// 등록시 이벤트들
	,evtCrtForm:function()
	{
		var parents = this
			
			,$type = $("#adc_crt_type_html, #adc_crt_type_file")
			,$htmlBox = $("#adc_crt_html_box")
			,$fileBox = $("#adc_crt_attach_file_box")
			
			,$mapRadio = $("#adc_crt_image_link_total, #adc_crt_image_link_part")			
			
			,$popupType = $("#adc_crt_popup_type_layer, #adc_crt_popup_type_window")
			,$layer = $("#adc_crt_popup_layer_opt_box")
			,$window = $("#adc_crt_popup_window_opt_box")
			
			,$closeIcon = $("#adc_crt_popup_layer_icon")
			,$iconBox = $("#adc_crt_popup_layer_icon_box")
			
			,$attachFile = $("#adc_crt_attach_file")
			//,$attachImage = $("#adc_crt_file_image")
			
			,$previewBox = $("#adc_crt_image_preview_box")
			
			,$imgLinkSelect = $(".adcil_btns")
			,$imgLink = $("#adc_crt_image_link")
			,$imgLinkFile = $("#adc_crt_image_link_file")
			
			,$selectPopup = $("#adc_crt_image_link_popup")
			
			,$btnMapRegist = $("#adc_crt_img_link_btn_regist");
		
	
		// 입력부분 담아두기
		this.vars.$textBox = $("#adc_crt_image_link_box");
		
		// html, file 입력
		$type.click(function(){
			var isChecked = $(this).filter(":checked").is("#adc_crt_type_html");

			$htmlBox[isChecked===true?"show":"hide"]();
			$fileBox[isChecked===true?"hide":"show"]();
			
			// codemirror
			editCfg.addCodemirrorPlugin([{target:"#adc_crt_html",theme:"material",mode:"htmlmixed",height:"500px"}]);
		});
		
		// 전체 또는 이미지 맵 선택시
		$mapRadio.click(function(){
			var $this = $(this)
				,type = $this.attr("data-type");
			
			$btnMapRegist[type==="total"?"hide":"show"]();
			if(type==="total") parents.mapDeleteAll();									// 전체선택일때, 이전 데이타 모두 지움
		});
		
		// layer or window 선택
		$popupType.click(function(){
			var isChecked = $(this).filter(":checked").is("#adc_crt_popup_type_layer");

			$layer[isChecked===true?"show":"hide"]();
			$window[isChecked===true?"hide":"show"]();
		});
		
		// 닫기 아이콘 클릭시 아이콘 형태 선택 박스 열게
		$closeIcon.click(function(){
			var isChecked = $(this).prop("checked");

			$iconBox[isChecked===true?"show":"hide"]();
		});
		
		// 파일선택시 저장
		$attachFile.change(function(){
			var _this = this
				,form = document.adc_form
				,filename = _this.value	// 나중에 폼 name으로 바꿀것!!!
				,iframe = parents.vars.iframe;
		
			if(!(/\.(jpg|gif|png|jpeg|swf)$/ig).test(filename)){
				alert(lang.validSelectImageSwf);
				return false;
			}
			
			// swf 라면, 여기까지
			if((/\.swf$/ig).test(filename)){
				$previewBox.hide();
				return false;
			}
			
			// 이미지라면 미리보기후 맵잡을 준비
			$(document.body).append(iframe);
			
			form.act.value = "measure";
			form.target = "adc_up_frame";
			form.submit();
		});
		
		// 어떤형태의 링크인지 확인
		// link, popup, file, close, day_close
		$imgLinkSelect.click(function(){
			var $this = $(this)
				,type = $this.attr("data-type");
			
			if(type==="popup" || type==="close" || type==="day_close"){
				$imgLink.add($imgLinkFile).hide();
				$selectPopup[type==="popup"?"show":"hide"]();
			}else{
				$imgLink[type==="link"?"show":"hide"]();
				$imgLinkFile[type==="link"?"hide":"show"]();
				$selectPopup.hide();
			}
		});

		
		// 이미지 로딩되면 보이는 이미지의 넓이값 attribute에 추가 
		// $attachImage.load(parents.getSizeLoadImage);		
		$btnMapRegist.click(function(){

			// 맵 등록 수정
			var $popupSelect = $("#adc_crt_image_link_popup_select")
				,$linkText = $("#adcil_link_text")
				,$etcFile = $("#adcilf_attach")
				,$linkTarget = $(".adcil_btns_link");
			
			if(!parents.vars.editId){
				alert(lang.adcRequireMapInfo);
				return false;
			}
			
			// close, day_close 모두 등록 눌러야 저장되게...안그럼 radio클릭만으로 이전 정보 자체를 날려버림
			var type = $imgLinkSelect.filter(":checked").attr("data-type")
				,url = ""
				,target = "";
			
			if(!type) return false;
			if(type==="link"){
				url = $linkText.val();
				if(!url){
					alert(lang.adcRequireLink);
					$linkText.focus();
					return false;
				}
				
				target = $linkTarget.filter(":checked").attr("data-type");
			}else if(type==="popup"){
				url = $popupSelect.val();
				if(!url){
					alert(lang.adcRequireSelectPopup)
					$popupSelect.focus();
					return false;
				}
			}else if(type==="file"){
				if(!$etcFile.val()){
					alert(lang.validRequireFile);
					$etcFile.focus();
					return false;
				}
				
				parents.uploadAttachTmpFile();
				
				return false;
			}
			
			parents.insertData({
									type:type
									,url:url
									,target:target
								})
			return false;
		});
		
	}
	
	// 이미지맵의 파일일때 저장 
	,uploadAttachTmpFile:function()
	{
		var parents = this
			,iframe = this.vars.iframe
			,form = document.adc_form;
		
		$(document.body).append(iframe);
		
		form.act.value = "tmpFileUpload";
		form.target = "adc_up_frame";
		form.submit();
	}
	
	// 이미지맵의 임시파일저장후 리턴 값
	,afterUploadAttachTmpFile:function(filename)
	{
		// 성공이던 아니던 폼은 일단 초기화함
		this.releaseForm();
		$("#adc_up_frame").remove();
		
		if(!filename){
			alert(lang.attachRequireRetry);
			return false;
		}
		
		this.insertData({type:"file",url:filename,target:"self"});
	}
	
	// 이미지맵 입력폼 초기화
	,initInsertForm:function(data)
	{
		var parents = this
			,type = data.type||"link"
			,$btns = $(".adcil_btns")
			,$imgLink = $("#adc_crt_image_link")
			,$imgLinkFile = $("#adc_crt_image_link_file")
			,$selectPopup = $("#adc_crt_image_link_popup")
			,$filebox = $("#adcilf_uploaded_file");
		
		//$btns.filter("[data-type='"+type+"']").prop("checked", true);
		$btns.filter("[data-type='"+type+"']").click(); // 커스텀 radio box 라서 이렇게 처리 
		$filebox.hide();
		
		if(type==="popup" || type==="close" || type==="day_close"){
			$imgLink.add($imgLinkFile).hide();
			$selectPopup[type==="popup"?"show":"hide"]();
			
			if(type==="popup") $("#adc_crt_image_link_popup_select").val(data.url);
			
		}else{			
			$imgLink[type==="link"?"show":"hide"]();
			$imgLinkFile[type==="link"?"hide":"show"]();
			$selectPopup.hide();
			
			if(type==="link"){
				//$(".adcil_btns_link[data-type='"+(data.target||"self")+"']").prop("checked", true);
				util.releaseCustomInput($(".adcil_btns_link[data-type='"+(data.target||"self")+"']"),true);
				$("#adcil_link_text").val(data.url)
			}else if(type==="file"){
				var $attach = $("#adcilf_attach")
					,$delBtn = $("#adcilfuf_btn")
					,$filename = $("#adcilfuf_file");
				
				$attach.replaceWith($attach.clone());
				
				if(data.url){
					// 파일삭제
					$filebox.show();
					$filename.html(data.url);
					$delBtn.unbind("click").one("click", function(){
						var filename = data.url.replace(/(^[0-9]+)\..+?$/i,"$1");
						$.post("/?dummy=adcontent-fileDlt"
								,{mod:"adcontent", act:"fileDlt", banner_idxno:document.adc_form.idxno.value||"", filename:filename}
								,function(data,rst){
									if(rst==="success"){
										if(data.result==="success"){
											$filename.empty();
											$filebox.hide();
											parents.insertData({type:"file", url:"", target:""}, "no");
										}else alert(decodeURIComponent(data.msg));
									}else alert(lang.axError);
								},"json");
					});
				}
			}
		}
	}
	
	// 상위폼 초기화
	,releaseForm:function(form)
	{
		if(!form) form = document.adc_form;
	
		// 해제
		form.act.value = this.vars.act;
		form.target = "";
	}
	
	// 데이타 얻어오기
	,getHiddenData:function()
	{
		var $id = $("#input_"+this.vars.editId)
			,val = $id.val().split(this.vars.separator);
		
		return {id:$id, val:val};
	}
		
	// input type 에 넣음
	,insertData:function(data, isInit)
	{
		if(!data) data={};
		if(!this.vars.editId) return false;
		if(!isInit) isInit = "ok";
		
		var $data = this.getHiddenData()
			,$id = $data.id
			,val = $data.val;
		
		if(val.length<=0) return false;
		
		val.splice(4, 3, data.type, data.url, data.target)
		var value = val.join(this.vars.separator);
		
		$id.val(value);
		
		if(isInit==="ok") this.initInsertForm({type:"link", url:"", target:"self"});
		this.vars.editId = null;
		
		util.toast(lang.toastApply);
	}
	
	// 수정폼
	,modifyForm:function(id)
	{
		if(!id) return false;
		this.vars.editId = id;
		
		var $data = this.getHiddenData()
			,val = $data.val
			,type = val[4]||"link"
			,url = val[5]||""
			,target = val[6]||"self";
		this.initInsertForm({type:type, url:url, target:target});
		this.mapBlinkArea();
	}
	
	// 이미지 맵 잡기 위해 임시 저장
	,afterUploadTmpFile:function(json)
	{
		var form = document.adc_form
			,result = json.result||"error"
			,data = json.data||""
			,width = json.width||""
			,height = json.height||""
			,mime = json.mime||"";
		
		// 해제
		this.releaseForm(form);
		
		if(result === "error"){
			alert(data);
			return false;
		}
		
		// 나중에 폼 name으로 바꿀것!!!
		//$("#adc_crt_popup_size_width").val(width);
		//$("#adc_crt_popup_size_height").val(height);
		if(form.popup_width) form.popup_width.value = width;
		if(form.popup_height) form.popup_height.value = height;
		
		// 창 보이고, 이미지 미리보기 - 표시되는 사이즈 재오기
		$("#adc_crt_image_preview_box").show();
		$("#adc_crt_file_image").attr({"src":"data:"+mime+";base64,"+data, "data-width":width, "data-height":height});
		
		// 새로 올린것이니, 로딩된후 모든 이전에 저장된 맵 정보 날림
		// 이전 데이타 삭제
		this.mapDeleteAll();
	}
	

	// 비율대로 좌표 계산하기
	,mapCalcPositionRatio:function(val, ratio)
	{
		if(ratio === 1) return val;
		
		return Math.round(val * ratio);
	}
	
	// 비율대로 좌표 계산하기-축소
	,mapScalePositionRatio:function(val, ratio)
	{
		if(ratio === 1) return val;
		
		return Math.round(val / ratio);
	}
	
	/**
	 * input type="hidden" 생성
	 * id : string
	 * pos : object - 실제 위치
	 * kind : string -  링크,파일 등
	 * url : string - 링크, javascript function
	 * target : string - 현재창,새창,부모창
	 */
	,mapHidden:function($form, id, pos, kind, url, target)
	{
		var inputId = "input_"+id
			,val = [pos.x1, pos.y1, pos.x2, pos.y2, kind, url, target].join(this.vars.separator)
			,input = '<input type="hidden" name="link_url[]" id="'+inputId+'" class="adc_crt_image_map_data" value="'+val+'" />';
		
		$form.append(input);
	}
	
	// 생성된 맵 삭제
	,mapDelete:function(id)
	{
		var bId = "btn_"+id
			,inputId = "input_"+id;
		
		$("#"+id+",#"+bId+",#"+inputId).remove();
		this.initInsertForm({type:"link", url:"", target:"self"});
		util.toast(lang.toastDeleted);
	}
	
	// 생성된 맴 전체 삭제
	,mapDeleteAll:function()
	{
		$(".adc_crt_image_map_data, .adc_crt_edit_map, .adc_crt_edit_map_buttons").remove();
	}
	
	// 입력부분 깜빡임
	,mapBlinkArea:function()
	{
		var parents = this;
		parents.vars.$textBox.addClass("create_bgcolor");
		setTimeout(function(){
			parents.vars.$textBox.removeClass("create_bgcolor")
		},500);
	}
		
	// 이미지 맵 잡기
	,map:function(target)
	{		
		var parents = this
			,$img = !!target.jquery ? target : $(target)
			,width = Number($img.attr("data-width"))||0							// 실제 사이즈
			,height = Number($img.attr("data-height"))||0
			,dWidth = Number($img.attr("data-display-width"))||0				// 표시 사이즈
			,dHeight = Number($img.attr("data-display-height"))||0
			,ratio = width>dWidth ? Number((width/dWidth).toFixed(1)) : 1		// 실제 사이즈가 표시된 사이즈보다 클경우 비율 맞추기 위해
			,box = parents.vars.box
			,buttons = parents.vars.buttons
			,$imgmapRadio = $("#adc_crt_image_link_part")
			,$imgmapBtnRegist = $("#adc_crt_img_link_btn_regist")
			,$form = $("#adc_form");
					
		return {
			exe:function()
			{
				this.canvas().loadData().addEvent();
			}
		
			// 덧붙이기
			,canvas:function()
			{
				$img.next("#adc_crt_edit_canvas").remove().end().after('<div id="adc_crt_edit_canvas" class="adc_crt_edit_canvas" style="left:'+$img.position().left+'px;width:'+dWidth+'px;height:'+dHeight+'px"></div>');
				return this;
			}
			
			// 로드된 맵 데이타에 따라 그리기
			,loadData:function()
			{
				var _parent = this
					,$input = $(".adc_crt_image_map_data")
					,$canvas = $("#adc_crt_edit_canvas");
				
				// 전체선택이라면
				if($input.length<=0){
					parents.initInsertForm(parents.vars.loadData);					
					return this;
				}
				
				// 이미지 맵 설정으로 수정
				$imgmapRadio.not(":checked").prop("checked", true);
				$imgmapBtnRegist.show();
				
				$.each($input, function(i,ele){
					var $ele = $(ele)
						,id = ele.id.replace("input_","")
						,val = $ele.val().split(parents.vars.separator)||[]
						,x1 = val[0]||0
						,y1 = val[1]||0
						,x2 = val[2]||0
						,y2 = val[3]||0
						,type = val[4]||"link"
						,url = val[5]||""
						,target = val[6]||"self";
					
					_parent.display($canvas, id, {x1:x1, y1:y1, x2:x2, y2:y2});					
				});
				
				return this;
			}
			
			// 영역 그림
			,display:function($canvas, id, data)
			{
				if(!data) data={};
				
				var $box = $(parents.vars.box)
					,$buttons = $(parents.vars.buttons)
					,offsetGap = $canvas.position().left||0			// 절대 좌표이기에 캔바스보다 작은 이미지일경우 gap만큼 더해서 표시해줌
					,bId = "btn_"+id
					,x1 = (Number(parents.mapScalePositionRatio(data.x1, ratio))+offsetGap)||0
					,y1 = parents.mapScalePositionRatio(data.y1, ratio)||0
					,x2 = (Number(parents.mapScalePositionRatio(data.x2, ratio))+offsetGap)||0
					,y2 = parents.mapScalePositionRatio(data.y2, ratio)||0
					,width = Math.abs(x1-x2)
					,height = Math.abs(y1-y2);
			
				// 버튼 만들기
				$buttons.css({"top":y1+"px", "left":x2+"px"}).attr({"id":bId})
				.find(".adcmb_button").click(function(){
					var $this = $(this)
						,isModify = $this.is(".adcmb_modify");
					
					if(isModify===true){
						parents.modifyForm(id);
					}else{
						parents.mapDelete(id);
					}
				});
				
				// box 만들기
				$box.css({"top":y1+"px", "left":x1+"px", "width":width, "height":height}).attr({"id":id});
				
				$canvas.after($box);
				$box.after($buttons);
								
				return this;
			}
						
			// event
			,addEvent:function()
			{
				var _this = this
					,position = {x:0, y:0}
					,$box = null
					,start = false;
				
				$(document.body).off("mousedown mousemove mouseup touchstart touchmove touchend","#adc_crt_edit_canvas")
				.on({
						"mousedown touchstart":function(event)
						{
							start = true;
							
							var $this = $(this)
								,evt = touches.getEventObject(window.event || event)
								,$evtTarget = $(evt.target||evt.srcElement)
								,offsetGap = $evtTarget.position().left									// 상대위치기 때문에 값 left 값을 더해줘야 함
								,x = Math.round(evt.offsetX||(evt.pageX-$evtTarget.offset().left))
								,y = Math.round(evt.offsetY||(evt.pageY-$evtTarget.offset().top))
								,id = "acem_"+new Date().getTime();
							
							position.x = x;
							position.y = y;
							
							$box = $(box).css({"top":y, "left":x+offsetGap}).attr({"id":id})
							$this.after($box);
							
							//evt.cancelBubble = true;
							//evt.stopPropagation();
							//evt.preventDefault();
						}
					
						,"mousemove touchmove":function(event)
						{							
							if(start === true){
								var evt = touches.getEventObject(window.event || event)
									,$evtTarget = $(evt.target||evt.srcElement)
									,offsetGap = $evtTarget.position().left									// 상대위치기 때문에 값 left 값을 더해줘야 함
									,x = Math.round(evt.offsetX||(evt.pageX-$evtTarget.offset().left))
									,y = Math.round(evt.offsetY||(evt.pageY-$evtTarget.offset().top))
									//,width = Math.abs(x-position.x)-5
									//,height = Math.abs(y-position.y)-5
									,width = Math.abs(x-position.x)
									,height = Math.abs(y-position.y)
									,css = {};
								
								css = {"width":width, "height":height};
								
								if(position.x>x && position.y>y){				// 좌상
									css.left = position.x-width+offsetGap;
									css.top = position.y-height;
								}else if(position.x>x && position.y<y){			// 좌하
									css.left = position.x-width+offsetGap;						
								}else if(position.x<x && position.y>y){			// 우상	
									css.top = position.y-height;
								}
								
								$box.css(css);
							}
						}
						
						,"mouseup touchend":function(event)
						{							
							start = false;
							
							// $box기준으로 x1,y1,x2,y2 가져옴
							var width = $box.width()
								,height = $box.height();
							
							if(width<20 && height<20){
								$box.remove();
								return false;
							}
							
							var	$buttons = $(buttons)
								,evt = touches.getEventObject(window.event || event)
								,$evtTarget = $(evt.target||evt.srcElement)
								,offsetGap = $evtTarget.position().left									// 상대위치기 때문에 값 left 값을 빼줘야지 진짜 맵이 됨
								,pos = $box.css(["top","left"])
								,x1 = util.castIntFromCss(pos.left)
								,y1 = util.castIntFromCss(pos.top)
								,id = $box.attr("id")
								,bId = "btn_"+id
								,inputId = "input_"+id
								,info = { x1 : x1, y1 : y1, x2 : x1 + width, y2 : y1 + height }
								,real = { x1 : parents.mapCalcPositionRatio(info.x1, ratio)-offsetGap, y1 : parents.mapCalcPositionRatio(info.y1, ratio), x2 : parents.mapCalcPositionRatio(info.x2, ratio)-offsetGap, y2 : parents.mapCalcPositionRatio(info.y2, ratio)};
							
							// 수정 삭제 이벤트
							$buttons.css({"top":info.y1, "left":info.x2}).attr({"id":bId})
							.find(".adcmb_button").click(function(){
								var $this = $(this)
									,isModify = $this.is(".adcmb_modify");
								
								if(isModify===true){
									parents.modifyForm(id);
								}else{
									parents.mapDelete(id);
								}
							});
							
							$box.after($buttons);
							parents.mapHidden($form, id, real, "", "", "");
							parents.initInsertForm({type:"link", url:"", target:"self"});									// 폼 초기화
							parents.vars.editId = id;
							
							// 이미지맵으로 체크
							$imgmapRadio.not(":checked").click().prop("checked", true);
							$imgmapBtnRegist.show();
							
							parents.mapBlinkArea();																			// 글쓰기 폼 이펙트
							
							util.toast(lang.adcRequireLink);
						}
					},"#adc_crt_edit_canvas");
				
				return this;
			}
			
		}.exe();
	}
	
	// list에서 버튼 이벤트
	,evtClickedButtons:function()
	{
		$(".acli_buttons, .acli_buttons_ad").on("click", "button"
							, function(){
								var $this = $(this)
									,type = $this.attr("data-btn-type")
									,$parent = ((bannerKind === 'adcontrol')?$this.closest(".adccfg_list_items_ad"):$this.closest(".adccfg_list_items"))
									,bannerIdxno = $parent.attr("data-banner-idxno")
									,linkInfo = $parent.attr("data-link-info")
									,title = $.trim($parent.find(".acli_title").text())  ;

								switch(type){
									case "insert":
										var section = $parent.attr("data-section")
											,area = $parent.attr("data-area")
											,areaSize = $parent.attr("data-area-size")
											,targetStep = $parent.attr("data-target-step")
											,idxno = $parent.attr("data-idxno")
											,kind = $parent.attr("data-kind")
											,form = util.createHiddenForm({
															mod:"edit"
															,act:"bannerSelect"
															,banner_idxno:bannerIdxno
															,idxno:idxno
															,section:section
															,area:area
															,area_size:areaSize
															,target_step:targetStep
															,kind:kind
														}, {method:"post", action:"/?dummy=edit-bannerSelect"});
										document.body.appendChild(form);
										form.submit();
										break;
									case "down":
										location.href="/?mod=adcontent&act=download&banner_idxno="+bannerIdxno;
										break;
									case "linkInfo":					// 업로드된 파일 링크 복사
										var source = PH_DOMAIN+'/adcontent/content_file/'+linkInfo;
										util.copyExe(source);
										break;
									case "sourceCopy":					// 소스복사
										var _time = new Date().getTime()
											,_html = '<!--'+title+'-->'
												   + '<script type="text/javascript">var ___BANNER = "ban_'+_time+'";</script>'
											 	   + '<script type="text/javascript" charset="utf-8" src="'+PH_DOMAIN+'/adcontent/script/'+bannerIdxno+'.js?[_cache_refresh_]'+_time+'" id="ban_'+_time+'"></script>'
											 	   + '<!--//'+title+'-->';
											
											util.copyExe(_html);
										break;
									case "preview":
										if(!window.___popup) return false;
										
										var p = ___popup[bannerIdxno];
										if(!p) return false;
										if(!window.___currentTime) window.___currentTime = Math.floor(new Date().getTime()/1000);// 시간이 설정되지 않았다면 js 시간으로 설정함
										
										// 관리자만...										
										$(".layer_box").remove();				// 다른게 열려있다면 삭제
										banpop.vars.popup.view = "manager";
										banpop.float(p);
										break;
								}
																
								return false;
							});
	}
	
	// 기능성 배너 레이어
	,floatLayer:function(url)
	{
		var width = 800
			,height = 650
			,html = editSortable.replaceLayerHtmlTag(editSortable.vars.layerBoxIframe, lang.close, url, (height-60))
			,parents = this
			,output = "";
		output = $(html).find(".edit_layer_close").click(editSortable.closeEditLayer).end();
		util.floatLayer(width,height,output);	// layer 띄우기
	}
	
	// 기능성배너
	,submitEventBanner:function(form)
	{
		
		var idxno = $(form).find("input[name='idxno[]']:checked").map(function(){
						return this.value;
					}).get();
		
		if(!idxno.length){
			alert(lang.validRequireSelectedItem);
			return false;
		}
		
		this.floatLayer("about:blank");
		
		return true;
	}
	
	// 기능성 배너 - 배너 순서
	,evtSortable:function()
	{
		$("#adce_banners").sortable({
			axis:"y"
			,placeholder: "ui-state-highlight"
			,forcePlaceholderSize:true
			,update:function(event, ui){																				// sort
				// data 조합
			}
		});//.disableSelection();
	}
	
	// 삭제
	,evtClickedDelete:function()
	{
		var $b=$("#adce_banners").on("click", ".adce_btn_delete", 
					function(){
						if($b.find(".adce_banners_li").length<=1){
							alert("마지막 배너는 삭제 할 수 없습니다.");
							return false;
						}
						var $parent = $(this).closest(".adce_banners_li");
						$parent.fadeOut("fast", function(){
							$(this).remove();
						});
					});
		
		// 팝업으로 띄우기
		$("#cfg_event_btn_pop").click(function(){
			window.open(this.href,"event_banner_list_pop","width=1000,height=700,scrollbars=yes");
			return false;
		});
	}

	// 수정시 배너 추가
	,evtClickedAddForModify:function()
	{
		var $list=$("#adce_banners",opener.document)
			,html=	'<li class="adce_banners_li" data-idxno="@@@idxno@@@">'	// 쉼표와 <li 사이 tab(\t)이 있을경우 edge browser에서 오류 난다 ㅡㅡ;
					+'		@@@image@@@'
					+'		<div class="bar_bg bb_950 adceb_btns">'
					+'			<div class="bar_bg bar_bg_in">'
					+'				<input type="hidden" name="idxno[]" value="@@@idxno@@@">'
					+'				<input type="number" name="delay[]" value="5" size="5" maxlength="5" min="1" max="999" title="지연시간" placeholder="지연시간"> 초'
					+'				<button type="button" class="btn_com btn_com_166_110 adce_btn_delete">삭제</button>'
					+'			</div>'
					+'		</div>'
					+'	</li>';
		$(".acli_btn_add").click(function(){
			var $this=$(this)
				,$box=$this.closest(".adccfg_list_items")
				,ids=$list.find(".adce_banners_li").map(function(){ return this.getAttribute("data-idxno"); }).get()
				,preview=$box.find(".acli_preview").clone().find(".acli_type").remove().end().html()
				,idxno=$box.attr("data-banner-idxno");
	
			if(!idxno || $.inArray(idxno,ids)>=0){
				alert(lang.editRequireExistsSectionName);
				return false;
			}
			//$(html).clone().attr("data-idxno",idxno).prepend(preview).find("input[name='idxno[]']").val(idxno).end().appendTo($list); // IE에서 오류남
			$list.append(html.replace(/@@@image@@@/g,preview).replace(/@@@idxno@@@/g,idxno));
			util.toast(lang.toastAdded);
			return false;
		});
	}
	
	// 등록
	,submitEventCrt:function(form)
	{
		var $delay = $(form).find("input[name='delay[]']")
			,delayLen = $delay.map(function(){
									return this.value?this.value:null;
								}).get().length;
		
		// 지연시간을 입력하지 않았는지 체크
		if($delay.length!==delayLen){
			alert(lang.bannerRequireDelayTime);
			return false;
		}
		
		return true;
	}
	
	// 기능배너 수정
	,evtClickedEventModify:function()
	{
		var parents = this;
		$(".acli_btn_modify").click(function(){
			var $this = $(this)
				,url = $this.attr("href");
			
			if(!url) return false;
			
			parents.floatLayer(url);
			
			return false;
		});
		
		// 소스복사
		$(".acli_btn_copy").click(function(){
			var _html = $(this).closest(".adccfg_list_items").find(".acli_preview").clone()
						.find(".beb_ul,.beb_li").removeAttr("style").end()
						.find(".banner_box, .banner_finished").remove().end()
						.find("script").removeAttr("data-append").end().html();
			if(_html) util.copyExe($.trim(_html));
			
			return false;
		});
	}
	
	// ----- 플로팅 광고
	// 등록폼 띄위기
	,evtClickedFloatadRegForm:function(){
		 var parents = this 
		 	,$dialogBox = $("#float_ad_write") // 등록폼
		 	,form = document.float_ad_form
		 	,$btns = $("#float_ad_btn_reg, .float_ad_btn_modify")
		 	,$radiobox = $(".faw_wing,.faw_type,.faw_templ")
		 	,$checkbox = $(".faw_page");
		 
		 $btns.click(function(){
			 var $this=$(this)
			 	,act=$this.attr("data-act")==="crt"?"floatadCrt":"floatadUpt";
			 
			 $dialogBox.dialog({
				 modal:true
				 ,width:700
				 ,height:800
				 ,open:function(){
					 var filename = "" ,title = "" ,wing = "fix" ,type = "" ,startX = "" ,startY = ""
					 	,boxWidth = "" ,boxHeight = "" ,source = "" ,page = "view", templ="pc";
					 
					 // 수정일때
					 if(act==="floatadUpt"){	
						 var $dataBox = $this.closest(".float_ad_data_box")
						 	,filename = $dataBox.attr("data-filename")
						 	,title = $dataBox.attr("data-title")
						 	,templ = $dataBox.attr("data-templ")
						 	,wing = $dataBox.attr("data-wing")
						 	,type = $dataBox.attr("data-type")
						 	,startX = $dataBox.attr("data-start-x")
						 	,startY = $dataBox.attr("data-start-y")
						 	,boxWidth = $dataBox.attr("data-box-width")
						 	,boxHeight = $dataBox.attr("data-box-height")
						 	,source = $dataBox.attr("data-source")
						 	,page = $dataBox.attr("data-page");						 
					 }
					 
					 form.act.value=act;
					 form.action="/?dummy=adcontent-"+act;
					 form.filename.value = filename;
					 form.title.value = title;					 
					 form.start_x.value = startX;
					 form.start_y.value = startY;
					 form.box_width.value = boxWidth;
					 form.box_height.value = boxHeight;
					 form.source.value = source;
					
					 // image화 때문에 빡시네 ㅡㅡ;
					 $radiobox.filter("[value='"+wing+"']").click();
					 $radiobox.filter("[value='"+type+"']").click();
					 $radiobox.filter("[value='"+templ+"']").click();
					 $checkbox.filter(":checked").click()
					 var pageArr = page.split(",");
					 for(var i=0,t=pageArr.length;i<t;i++){
						 $checkbox.filter("[value='"+pageArr[i]+"']").click();
					 }					 
				 }
			 	,close:function(){
			 		// 한번더초기화
			 		$dialogBox.find("input[type='text'],input[type='number'],textarea").val("");
					form.act.value="floatadCrt";
					form.filename.value = "";
					form.action="/?dummy=adcontent-floatadCrt"
			 	}
			 });
			 
			 return false;
		 });
		 
		 // 노출페이지 이벤트
		 $checkbox.click(function(){
			var val=this.value;
			if(this.checked===true){
				if(val==="all")	$checkbox.filter("[value!='all']:checked").click();
				else $checkbox.filter("[value='all']:checked").click();
			}
		 });
		 
		 // 소스삽입 버튼
		 $("#faw_btn_source").click(function(){ 
			 /*
			 var width = 1020
				,height = 760
				,html = editSortable.replaceLayerHtmlTag(editSortable.vars.layerBoxIframe, lang.close, this.href, (height-60))
				,output = "";
			output = $(html).find(".edit_layer_close").click(editSortable.closeEditLayer).end();
			util.floatLayer(width,height,output);	// layer 띄우기
			*/
			 window.open(this.href, "adcontrolFloatad","width=960,height=760");
			 return false; 
		 });
	}
	
	// 등록
	,floatadReg:function(form){
		if(!form.title.value){
			alert(lang.validRequireTitle);
			form.title.focus();
			return false;
		}
		
		if(!form.source.value){
			alert(lang.adcRequireSourceValue);
			form.source.focus();
			return false;
		}
		
		if($(".faw_page").filter(":checked").length<=0){
			alert(lang.adcRequirePage);
			return false;
		}
		
		return true;
	}
	
	// textarea에 삽입
	,evtSubmitInsertSource:function(){
		try{
			var parents=this
				,textarea=opener.document.getElementById("faw_source") // parent
				,params=util.linkToJson(location.search.replace(/^\?/,""))
				,popRefer=params['pop_refer']||""
				,kind=params['kind']||"normal"; // normal,event,adcontrol
			
			if(popRefer!=="floatad") return false;
			
			$("button[data-btn-type='insert']").off("click").click(function(){
				try{
					var tag=""
						,$this=$(this)
						,$parent=$this.closest(".adccfg_list_items, .adccfg_list_items_ad")
						,title=$.trim($parent.find(".acli_title, a.link_gray").text())
						,idxno=$parent.attr("data-banner-idxno");
					
					switch(kind){
						case 'event':
							tag="[___EVT___]"+idxno+"[/___EVT___]";
							break;
							
						case 'adcontrol':
							tag="[___ADC___]"+idxno+"[/___ADC___]";
							break;
						
						case 'normal':
						default:
							
							tag="[___BAN___]"+idxno+"[/___BAN___]";
							break;
					}
					
					var val=textarea.value
						,addTag=(title?"<!-- "+title+" -->":"")+tag;
					
					// 있다면 삭제
					if(val.indexOf(tag)>=0){
						if(!window.confirm(lang.editRequireExistsSectionName+"\n"+lang.confirmDelete)) return false;
						
						textarea.value=$.trim(val.replace(addTag,""));
						util.toast(lang.toastDeleted);
						return false;
					}
					
					// 없다면 추가
					textarea.value=$.trim(val+"\n"+addTag);				
					util.toast(lang.toastAdded);
				}catch(e){ return false; }
							
				return false;
			});		
		}catch(e){}		
	}
	
};





/*****************************************************************************
pdf + hosu + 표지관리
*****************************************************************************/
// pdf + hosu + 표지관리 설정
var pdfcfg={
	vars:{
		limit:5
	}

	,submitHosu:function(form)
	{
		if(!form.hosu.value){
			alert(lang.hosuRequire);
			form.hosu.focus();
			return false;
		}
		
		if(!form.date.value){
			alert(lang.hosuRequireDate);
			form.date.focus();
			return false;
		}
		
		return true;
	}

	// 판형정보 dom추가,삭제
	,evtClickAddDelete:function()
	{
		var parents = this;
		$(document.body).on("click", ".cfg_pdf_pan_btn_add, .cfg_pdf_pan_btn_delete", 
							function(){
								var $this = $(this)
									,$ul = $this.closest("ul")
									,isAdd = $this.is(".cfg_pdf_pan_btn_add")
									,num = $(".cfg_pdf_pan_btn_add").length;
								
								if(isAdd){
									if(num>=parents.vars.limit){
										alert(lang.pdfRequireLimitOver.replace("[]",parents.vars.limit));
										return false;
									}
									
									var $clone = $ul.clone(true).find("input").val("").end();
									$ul.after($clone);
									
								}else{
									if(num<=1){
										alert(lang.pdfRequireLimit);
										return false;
									}
									
									$ul.remove();
								}
							});
	}

	// pdf set
	,submitPdfSet:function(form)
	{
		if(!form.media_name.value){
			alert(lang.pdfRequireMedianame);
			form.media_name.focus();
			return false;
		}
		
		if(!form.media_id.value){
			alert(lang.pdfRequireMediaid);
			form.media_id.focus();
			return false;
		}
		
		return true;
	}
	
	// 표지 등록
	,submitCoverReg:function(form)
	{
		if(!form.title.value){
			alert(lang.coverRequireName);
			form.title.focus();
			return false;
		}
		/*
		if(!form.code.value){
			alert(lang.coverRequireCode);
			form.code.focus();
			return false;
		}
		*/
		
		return true;
	}
};




/*****************************************************************************
통계관리 
*****************************************************************************/
var statistics={
	// 검색 기간 지정
	evtClickedPeriod:function()
	{
		var $startDate = $("#cfg_form_start_date")
			,$endDate = $("#cfg_form_end_date")
			,$input = $startDate.add($endDate)
			,$buttons = $("button[name='search_term']")
			,$actVal = $("input[name='act']");
		
		$buttons.click(function(){
			var value = this.value
				,period = util.onlyNumber(value)
				,startDate = new Date();
			if (period === null)
			{
				value = Number(value.replace("m",""));
				startDate.setMonth(startDate.getMonth()-parseInt(value,10));				
			}
			else
			{
				startDate.setDate((startDate.getDate()+1)-parseInt(value,10));
			}
				
			var _year = startDate.getFullYear()
				,_month = util.strPad(startDate.getMonth()+1, 2, "0", "left")
				,_date = util.strPad((startDate.getDate()-1||0), 2, "0", "left")
				,_start = _year+"-"+_month+"-"+_date
				
				,endDate = new Date(new Date().setDate(($actVal.val()=='sectionList')?new Date().getDate()-1:new Date().getDate()))
		        ,_eyear = endDate.getFullYear()
		        ,_emonth = util.strPad(endDate.getMonth()+1, 2, "0", "left")
		        ,_edate = util.strPad(endDate.getDate(), 2, "0", "left")
		        ,_end = _eyear+"-"+_emonth+"-"+_edate;		
				
			$startDate.val(_start);//.next("button").hide();
			$endDate.val(_end);//.next("button").hide();
		});
		
		// 선택되어 있게 함
		var searchTerm = util.linkToJson(location.search.replace(/^\?/,""))['search_term'];
		if(searchTerm){
			$buttons.filter("button[name='search_term'][value='"+searchTerm+"']").addClass("on");
		}
	}

	// 검색 전송
	,statisticsSearchSubmit:function(form)
	{		
		if(!form.start_date.value){
			alert(lang.validRequireStartDate);
			form.start_date.focus();
			return false;
		}
		
		if(!form.end_date.value){
			alert(lang.validRequireEndDate);
			form.end_date.focus();
			return false;
		}		
		
		return true;
	}
};




/*****************************************************************************
광고제어 
*****************************************************************************/
var adcontrol={
	// 등록
	regSubmit:function(form)
	{
		if(!form.ad_code.value){
			alert(lang.pdfRequireMedianame);
			form.ad_code.focus();
			return false;
		}
		
		if(!form.ad_title.value){
			alert(lang.validRequireTitle);
			form.ad_title.focus();
			return false;
		}
		/*
		if(!form.ad_content.value){
			alert(lang.validRequireContent);
			form.ad_content.focus();
			return false;
		}
		*/
		form.submit();
	}
		
	// 개개의 상태변경
	,clickedChangeState:function()
	{
		//?mod=adcontrol&amp;act=adControlStateChange&amp;idxno={$row[list].idxno}&cstate=A&amp;ad_code=
		$(".adctl_btn_state").click(function(){
			var $this = $(this)
				,idxno = $this.attr("data-idxno")
				,state = $this.attr("data-state")
				,code = $this.attr("data-code")
				,form = util.createHiddenForm(	{
													mod:"adcontrol"
													,act:"adControlStateChange"
													,idxno:idxno
													,cstate:state
													,ad_code:code
												}, 
												{method:"post", action:"/?dummy=adcontrol-adControlStateChange"});
				document.body.appendChild(form);
				form.submit();
		});
	}

	// 전체 변경
	,clickedChangeAll:function()
	{
		///?mod=adcontrol&amp;act=adControlStateUse&amp;ad_code=
		$(".adctl_btn_all").click(function(){
			var $this = $(this)
				,act = $this.attr("data-act")
				,code = $this.attr("data-code");
			
			if(!window.confirm(lang[act=="adControlStateUse"?"adctlConfirmUse":"adctlConfirmBlock"])) return false;
				
			var form = util.createHiddenForm(	{
										mod:"adcontrol"
										,act:act
										,ad_code:code
									}, 
									{method:"post", action:"/?dummy=adcontrol-"+act});
				document.body.appendChild(form);
				form.submit();
		});
	}
	
	// 광고제어 설정 등록
	,regSubmitCfg:function(form)
	{
		if(!form.item.value){
			alert(lang.pdfRequireMedianame);
			form.item.focus();
			return false;
		}
		
		form.submit();
	}
	
	
	// 매체 차단 상태 변경 
	,clickedChangeBlock:function()
	{
		//?mod=adcontrol&amp;act=adConfigBlockChange&amp;idxno={$row[list].idxno}&block=true
		$(".adctl_btn_state").click(function(){
			var $this = $(this)
				,idxno = $this.attr("data-idxno")
				,block = $this.attr("data-block")
				,form = util.createHiddenForm(	{
													mod:"adcontrol"
													,act:"adConfigBlockChange"
													,idxno:idxno
													,block:block
												}, 
												{method:"post", action:"/?dummy=adcontrol-adConfigBlockChange"});
				document.body.appendChild(form);
				form.submit();
		});
	}
};





/*****************************************************************************
캘린더 
*****************************************************************************/
var jsCal={
	vars:{}
	// config 폼내 보엿다 감췄다 할거
	,evtChangeFormContent:function()
	{
		var $category = $("#cfg_bbs_category_str_y")
			,$upload = $("#cfg_bbs_upload_component_y")
		$("input[name='use_category'], input[name='upload_component']").click(function(){
			var _this = this
				,name = _this.name
				,value = _this.value;
			if(name == "use_category") $category[value=="Y"?"show":"hide"]();
			else if(name == "upload_component") $upload[value=="Y"?"show":"hide"]();
		});
	}
	
	,submitConfigRegist:function(form)
	{
		if(!form.title.value){
			alert(lang.validRequireTitle);
			form.title.focus();
			return false;
		}
		
		if(!form.skin.value){
			alert(lang.editcfgRequireSectionSkin);
			form.skin.focus();
			return false;
		}
		
		if(!form.limit_num.value){
			form.limit_num.value="10";
		}
		return true;
	}
	
	// 달력초기값
	,insertCurrentDatetime:function(target)
	{
		var $target = $(target);
		if(!$target.val()){
			$target.val(util.getCurrentDateTime());
		}
	}
	
	// 일정등록
	,submitRegist:function(form)
	{
		if(document.getElementById("form_crt_category")){
			if(!form.category.value){
				alert(lang.validRequireSelectCategory);
				form.category.focus();
				return false;
			}
		}
		
		if(!form.subject.value){
			alert(lang.validRequireTitle);
			form.subject.focus();
			return false;
		}
		
		if(!form.start.value){
			alert(lang.validRequireStartDate);
			form.start.focus();
			return false;
		}
		
		if(!form.end.value){
			alert(lang.validRequireEndDate);
			form.end.focus();
			return false;
		}else{
			var endValue = form.end.value;
			if(!endValue.match(/^\d{4}\-\d{2}\-\d{2} \d{2}\:\d{2}$/)){
				form.end.value = endValue.replace(/(\d{4}\-\d{2}\-\d{2})/,"$1 23:59");
			}
		}
		
		return true;
	}
	
	,copyTags:function()
	{
		$("#jc_copy_tag,#jc_copy_tag2").click(function(){
			this.select();
			
			if(window.clipboardData){
				window.clipboardData.setData('Text',this.value);
				util.toast(lang.copiedDoPaste);
			}else util.toast(lang.controlCcopy);
		});
	}
};



/*****************************************************************************
결제 
*****************************************************************************/
var payments={
	vars:{}
	,evtClicked:function()
	{
		var parentLayer = editSortable
		,width = 650
		,height = 350;
		$(document.body).on("click","#cfg_pc_btn_write, .cfg_pc_btn_modify",
							function(){
								var url = this.href
									,html = parentLayer.replaceLayerHtmlTag(parentLayer.vars.layerBoxIframe, lang.close, url, (height-60))
									,output = "";
								output = $(html).find(".edit_layer_close").click(parentLayer.closeEditLayer).end();
								util.floatLayer(width,height,output);	// layer 띄우기
								
								return false;
							});
	}
	
	,submitReg:function(form)
	{
		if(!form.name.value){
			alert(lang.paymentsRequireTitle);
			form.name.focus();
			return false;
		}
		
		if(!form.module.value){
			alert(lang.paymentsRequireModule);
			form.module.focus();
			return false;
		}
		
		return true;
	}
	
	// 등록,수정후 레이어 닫기
	,afterSubmitAction:function()
	{
		//$(".edit_layer_close").trigger("click");
		location.reload(true);
	}
};



/*****************************************************************************
위젯 설정 
*****************************************************************************/
var widgetCfg = {
	copyTags:function()
	{
		$("#widget_copy_tag, #widget_copy_tag2, #widget_copy_tag3").click(function(){
			if(!this.value) return false;
			
			this.select();
		
			if(window.clipboardData){
				window.clipboardData.setData('Text',this.value);
				util.toast(lang.copiedDoPaste);
			}else util.toast(lang.controlCcopy);
		});
	}
};	



/*****************************************************************************
포토박스
*****************************************************************************/
var cfgPhotoBox = {
	vars:{
		isModify : false
		,$ul : null
		,$text : null
		,$dialog : null
		,category_idxno : null
		,state : null
	},

	submitPhoto:function(obj)
	{
		if(obj.title.value=="")
		{
			alert("제목을 입력해주세요.");
			obj.title.focus();
			return false;
		}

		return true;
	}
	
	// 데이터 삭제
	,evtDeletePhotobox:function()
	{
		var form = document.photobox_list_form;
		$("#cfg_photobox_list_box").on("click",".cfg_photobox_btn_delete",
										function(){
											if(!window.confirm(lang.confirmDelete)) return false;
											var _this = this
												,act = "photoDlt"
												,idxno = $(_this).closest(".cfg_photobox_list_li").attr("data-idxno");
											
											form.action = "/?dummy=photobox-"+act;
											form.act.value = act;
											form.idxno.value = idxno;
											
											form.submit();
										});
	}

	// 순서변경
	,evtSortablePhotobox:function()
	{
		$("#cfg_photobox_list_box").sortable({
			axis:"y"
			,placeholder: "ui-state-highlight"
			,forcePlaceholderSize:true
			,update:function(e, ui){
				var $li = $(this).find(".cfg_photobox_list_li")
					,photos = []
					,category = '';
				
				$li.each(function(i, ele){
					var attrData = ele.getAttribute("data-idxno");
					category = ele.getAttribute("data-category");
				
					photos.push(attrData);
				
					// 위에서 정보 모우고, 미리 변경될 파일명으로 교체
					//ele.setAttribute("data-idxno", attrData.replace(/_[0-9]{1}/i,'_'+(i+1)));
				});
				
				if(photos.length<=0) return false;
				
				$.post(	"/"
						,{mod:"photobox", act:"axPhotoboxSort", "photos[]":photos, "category":category}
						,function(data, rst){
							if(rst==="success"){
								if(data.result!=="success") 
									alert(decodeURIComponent(lang.msg));
							}else alert(lang.axError);
						},"json");
			}
		});
	}

	// 포토박스 카테고리 
	// 등록
	,evtClickedReg:function()
	{
		var parents = this
			,$ul = $("#cfg_category_list_box")
			,$dialog = $("#cfg_category_dialog")
			,$input = $dialog.find("#cfg_category_input");
			
		parents.vars.$ul = $ul;
		parents.vars.$dialog = $dialog;
		$("#content").on("click", "#cfg_category_btn_write, .cfg_category_btn_modify, .cfg_category_btn_delete"
						,function(){
							var $this = $(this)
								,isModify = $this.is(".cfg_category_btn_modify")
								,isDelete = $this.is(".cfg_category_btn_delete");
								
							// 삭제
							if(isDelete){
								if(!window.confirm(lang.confirmDelete)) return false;
								var $li = $this.closest(".cfg_category_list_li")
									,category_idxno = $li.attr("data-idxno");
								
								if(!category_idxno) return false;
								$.post(	"/?dummy=photobox-categoryDlt"
										,{mod:"photobox", act:"categoryDlt", category_idxno:category_idxno}
										,function(data, rst){
											if(rst === "success"){
												if(data.result === "success"){
													$li.fadeOut("fast",function(){ $(this).remove(); });
												}else alert(decodeURIComponent(data.msg));
											}else alert(lang.axError);
										},"json");
								
								return false;
							}
							
							// --- 수정 + 입력 --- //
							// 수정
							if(isModify){
								var $li = $this.closest("li")
									,$text = $li.find(".cfg_category_text")
									,text = $.trim($text.text());
								
								parents.vars.$text = $text;
								
								// 추가
								parents.vars.category_idxno = $li.attr("data-idxno");
								parents.vars.state = $li.attr("data-state");
							}
							
							// dialog 띄우기
							parents.vars.isModify = isModify;
							$dialog.dialog({
								modal:true
								,open:function(){
									if(isModify) 
									{
										$input.val(text);
										//$("input[name='state'][value=" + parents.vars.state + "]").attr("checked", true);
									}
								}
								,close:function(){
									$input.val("");	
									parents.vars.$text = null;
									// 추가
									parents.vars.category_idxno = null;
									parents.vars.state = null;
								}								
							});
						});
	}

	// 전송
	,evtCategorySubmit:function(form)
	{
		// 카테고리 명 
		var text = form.category.value;
		if(!text){
			alert(lang.editcfgRequireSectionTitle);
			form.category.focus();
			return false;
		}
		
		// 상태 
		var statechk = $("#form_photobox_category").find("input[name='state']").filter(":checked").val();
		
		// 기본 필수 파라미터
		text = util.stripTags(text);
		var parents = this
			,params = {
				mod : "photobox"
				,act : "categoryCrt"
				,category : text
				,state : statechk
			};
			
		if(this.vars.isModify){
			params.act = "categoryUpt";
			params.category_idxno = this.vars.category_idxno;
		}
		
		// 전송
		$.post(	"/?dummy=photobox-"+params.act
				,params
				,function(data, rst){
					if(rst === "success"){
						if(data.result === "success"){
							if(parents.vars.isModify){
								parents.vars.$text.text(text);
							}else{
								if(parents.vars.$ul.children(".cfg_category_list_li").length<=0){
									 location.reload(true);
									 return false;
								}
								
								parents.vars.$ul.append($(".cfg_category_list_li:eq(0)").clone().attr("data-idxno",data.data.cateidxno).find(".cfg_category_text").text(text).end());
							}
							
							parents.vars.$dialog.dialog("close");
						}else alert(decodeURIComponent(data.msg));
					}else alert(lang.axError);
				},"json");		
		
		return false;
	}
	
	// sort
	,evtCategorySort:function()
	{
		var $box = $("#cfg_category_list_box");
		$box.sortable({
			axis:"y"
			,placeholder: "ui-state-highlight"
			,forcePlaceholderSize:true
			,update:function(event, ui){
				// 카테고리 idxno 
				var codes = $box.find(".cfg_category_list_li").map(function(){ return $(this).attr("data-idxno"); }).get();
				$.post("/?dummy=photobox-axCategorySort"
						,{mod:"photobox", act:"axCategorySort", "lists[]":codes}
						,function(data, rst){
							if(rst === "success"){
								if(data.result === "success"){
									
								}else alert(decodeURIComponent(data.msg));
							}else alert(lang.axError);
						},"json");
			}
		});
	}
};



/*****************************************************************************
뉴스레터 
*****************************************************************************/
var newsletter={
	
	addEvent:function()
	{
		var $content = $("#content")
			,$ctrlBtn = $("#newsletter_ctrl_btn")
			,$btnViewSource = $("#ncb_viewsource");
	
		$content.css("position","relative").append($ctrlBtn); // 버튼 자리잡음
		
		
		
		// 소스 보기
		var vsUrl = $btnViewSource.attr("href");
		$btnViewSource.click(function(){
			var parentLayer = editSortable
				,width = 980
				,height = 450
				,html = parentLayer.replaceLayerHtmlTag(parentLayer.vars.layerBoxIframe, lang.close, vsUrl, (height-60))
				,output = "";
		
			output = $(html).find(".edit_layer_close").click(parentLayer.closeEditLayer).end();
			util.floatLayer(width,height,output);	// layer 띄우기
			
			return false;
		});
	}

	// 소스 퍼가기
	,evtClickedCopyTag:function()
	{
		var $select = $("#input_mail_content_copy");
		$("#input_mail_content_copy, #btn_mail_content_copy").click(function(){			
			$select.select();
			
			if(window.clipboardData){
				window.clipboardData.setData('Text',this.value);
				util.toast(lang.copiedDoPaste);
			}else util.toast(lang.controlCcopy);
		});
	}
	
	// 폼전송
	,send:function(form)
	{
		if(!form.subject.value){
			alert(lang.validRequireTitle);
			form.subject.focus();
			return false;
		}
		
		if(!form.send_address.value){
			alert(lang.requiredSentence);
			form.send_address.focus();
			return false;
		}
		
		if(form.extra_send_email){
			if(!form.extra_send_email.value){
				alert(lang.requiredSentence);
				form.extra_send_email.focus();
				return false;
			}
		}
		
		return true;
	}
	
	// 중복체크했나 객체
	,duplication:{
		email:false
	}
	
	/* 이메일 중복체크
	 * 이벤트 걸 버튼 id, 가지고갈 input, 중복(btn_dupl)
	 */
	, evtDuplicate:function(buttonId, target)
	{
		if(!buttonId || !target) return;
		
		var $button = $(buttonId)
			, $target = $(target);
	
		// add event listener!
		$button.click(function(){
				value = $target.val();
				if(value)
				{	
					var params = {mod:"newsletter", act:"axCheckDuplMail"};
					params['email'] = $("#email").val();
					
					$.post( "/?dummy=newsletter-axCheckDuplMail"
								, params
								, function(data, rst)
								{
									try{
										if(data.result == "success")
										{
											alert('신청 가능한 이메일 입니다.');
											newsletter.duplication['email'] = true;
											return false;
										}else{
											alert(decodeURIComponent(data.msg));
											$target.val("").focus();
										}
									}catch(e){
										alert(lang.axError);
									}
								},"json");						
				}else{
					alert(lang.validRequireEmail);
					$target.focus();
					return false;
				}
				delete value;
			});			
	}
	
	,sendQueueSubmit:function(form)
	{
			// 파일 첨부 확인 
			if (form.qmode.value == "exp") 
			{
				if (!form.exp_file.value)
				{
					alert("입력하실 TXT 파일을 선택 입력 해주세요");
					return false;
				}
			}

			if (!confirm("발송대기열을 입력 하시겠습니까?"))
			{
				return false;
			}
			return;
	}
};




/*****************************************************************************
뉴스스크랩
*****************************************************************************/
var newsScrap={
	evtClickedForm:function(){
		$(".avi_btn_scrap").click(function(){
			var parentLayer = editSortable
				,width = 800
				,height = 650
				,url = this.href
				,html = parentLayer.replaceLayerHtmlTag(parentLayer.vars.layerBoxIframe, lang.close, url, (height-60))
				,output = "";
		
			output = $(html).find(".edit_layer_close").click(parentLayer.closeEditLayer).end();
			util.floatLayer(width,height,output);	// layer 띄우기
			return false;
		});
	}
	
	// 폴더 등록
	,evtClickedRegDir:function(){
		var parents = this
			,$text = $("#scrap_add")
			,$btn = $("#scrap_add_btn")
			,$place = $("#sb_dir")
			,articleIdxno = $place.attr("data-request-article-idxno")||""
			,$aPlace = $("#sb_file"); // 기사 붙는 장소
		
		// 기사뷰인가?
		$place[articleIdxno?"addClass":"removeClass"]("a_view");
				
		// 등록
		$btn.click(function(){
			var txt = $.trim($text.val());
			if(!txt) return false;
			
			$.post("/?dummy=newsscrap-addDirCrt"
					,{mod:"newsscrap", act:"addDirCrt", dirname:txt}
					,function(data,rst){
						if(rst=="success"){
							if(data.result === "success"){
								$place.find(".clone").clone().removeClass("clone")
								.attr("data-idxno",data.data.idxno).find(".sbd_a").html(txt)
								.next("span").text("(0)")
								.end().end().appendTo($place);
								
								$text.val("").focus();
							}else alert(decodeURIComponent(data.msg));
						}else alert(lang.axError);
					},"json");			
		});
		
		// 스크랩, 수정, 삭제
		//sbd_a sbd_sr sbd_bm sbd_bd
		$(document.body).on("click", ".sbd_a, .sbd_sr, .sbd_bm, .sbd_bd, .sbd_ad", 
							function(){
								var $this = $(this)
									,$li = $this.closest(".sbd_li")
									,dIdxno = $li.attr("data-idxno");
							
								if($this.is(".sbd_a")){ // 폴더 클릭 ------------------------------------------------------------------------
									if(!dIdxno) return false;
									$li.addClass("over").siblings("li").removeClass("over");
									$.get("/",{mod:"newsscrap", act:"newsScrapList", dir_idxno:dIdxno}, 
											function(data, rst){
												if(data.result=="success" && rst=="success"){
													var d = data.data
														,arr = [];
													for(var len=d.length, i=0; i<len; i++){
														var html = '<li class="ellipsis sbd_li" data-idxno="'+d[i].idxno+'">'
																	+  '<a href="" class="link_blue sbd_ad">삭제</a>'
																	+ ' ['+d[i].article_reg_date.substr(0, 10)+'] '
																	+ '<a href="/?mod=news&act=articleView&idxno='+d[i].article_idxno+'" class="sbd_ta" target="_blank">'
																	+  d[i].article_title+'</a>'
																	+'</li>'
														arr.push(html)
													}
													
													if(arr.length>0) $aPlace.html(arr.join(""));
													
												}else $aPlace.html(decodeURIComponent(data.msg));
											},"json");
											
								}else if($this.is(".sbd_sr")){ // scrap ------------------------------------------------------------------------
									if(!dIdxno || !articleIdxno) return false;
									$.get("/",{mod:"newsscrap", act:"newsScrapCrt", dir_idxno:dIdxno, article_idxno:articleIdxno}, 
											function(data, rst){
												if(data.result=="success" && rst=="success"){
													alert("스크랩되었습니다.");
													$li.find(".tahoma").text("("+(data.data.count||0)+")")
												}else if(data.result=="exists") alert("이미 스크랩된 기사입니다.");
											},"json");
									
								}else if($this.is(".sbd_bm")){ // 수정 ------------------------------------------------------------------------
									var $a = $li.find(".sbd_a")
										,dirname = $.trim($a.text()||"");
									
									if(!dIdxno || !dirname) return false;									
									var dir = window.prompt("폴더 이름 수정",dirname);
									
									if(!dir) return false;	
									$.post("/",{mod:"newsscrap", act:"dirUpt", d_idxno:dIdxno, dirname:dir}, 
											function(data, rst){
												if(data.result=="success" && rst=="success" && data.data.dirname){
													$a.text(decodeURIComponent(data.data.dirname)||"");
												}
											},"json");
											
								}else if($this.is(".sbd_bd")){ // 삭제 ------------------------------------------------------------------------
									if(!dIdxno) return false;
									if(!window.confirm("폴더내 스크랩된 기사까지 모두 삭제 됩니다.\n\n삭제할까요?")) return false;
									$.get("/",{mod:"newsscrap", act:"dirDlt", d_idxno:dIdxno}, 
											function(data, rst){
												if(data.result=="success" && rst=="success"){
													$li.fadeOut();
												}
											},"json");
						
								}else if($this.is(".sbd_ad")){ // 기사삭제 ------------------------------------------------------------------------
									if(!dIdxno) return false;
									if(!window.confirm("삭제할까요?")) return false;
									var $placeOver = $place.find(".sbd_li.over")
										,dirIdxno = $placeOver.attr("data-idxno");
									$.get("/",{mod:"newsscrap", act:"newsScrapDlt", dir_idxno:dirIdxno, d_idxno:dIdxno}, 
											function(data, rst){
												if(data.result=="success" && rst=="success"){
													$li.fadeOut();
													$placeOver.find(".tahoma").text("("+data.data.count+")");
												}
											},"json");
								}
								
								return false;
							});
	}
};



/*****************************************************************************
인물정보
*****************************************************************************/
var indb={
	listHtml:function(param){
		if(!param.index || !param.text) return '';
		var html = 	'<div class="indb_dl_box" data-index="'+param.index+'" data-text="'+param.text+'">'
				+	'	<span class="idb_name">'+param.text+'</span>'
				+	'	<span class="idb_btns"><a href="" class="btn_com btn_com_0_549 idb_btn_m" title="수정">수정</a><a href="" class="btn_com btn_com_27_549 idb_btn_d" title="삭제">삭제</a></span>'
				+	'</div>';
		return html;
	}

	,evtClickedShowDialog:function(target)
	{
		var parents=this;
		$(target).click(function(){
			var $this=$(this)
				,dialog=$this.attr("data-dialog-target")
				,isRegion=(dialog=="#indb_dialog_region");
			
			$(dialog).dialog({
				width:650
	            ,maxHeight:700
	            ,modal: true
	            ,open:function(event, ui){
	            	var $dThis = $(this)
	            		$dialogList = $dThis.find(".indb_dialog_list");
	            	
	            	$dialogList.empty();	            	
	            	$.get(	"/"
	            			,{mod:"indb",act:(isRegion?"regionList":"divisionList")}
	            			,function(data,rst){
	            				if(rst === "success"){
	            					if(!data) return false;	            					
	            					for(var key in data){
	            						var html = parents.listHtml({text:data[key], index:key});
	            						if(!html) continue;
	            						$dialogList.append(html);
	            					}
	            				}else alert(decodeURIComponent(data.msg));
	            			},"json");
	            }
				,close:function(event, ui){			
					$(this).find(".indb_dialog_list").empty();					
				}
			});			
			
		});
	}
	
	// 수정,삭제 버튼
	,evtClickedBtnsMnD:function()
	{
		$(".indb_dialog_list").on("click",".idb_btn_m, .idb_btn_d",
								function(){
									var $this = $(this)
										,$dataBox = $this.closest(".indb_dl_box")
										,$parents = $dataBox.closest(".indb_dialog")
										,isModify = $this.is(".idb_btn_m")		// 수정 or 삭제
										,isRegion = $parents.is(".region")		// 출생지 or 구분
										,index = $dataBox.attr("data-index")||""
										,text = $dataBox.attr("data-text")||""
										,act = "";
									
									if(isRegion){ act = (isModify?"regionUpt":"regionDlt"); }
									else{ act = (isModify?"divisionUpt":"divisionDlt"); }
									
									if(isModify){
										text = window.prompt("수정할 문자를 입력하여 주세요.", text);
										if(!text) return false;									
									}else{
										if(!window.confirm(lang.confirmDelete)) return false;
									}
									
									$.post("/?dummy=indb-"+act
											,{mod:"indb", act:act, index:index, text:text}
											,function(data, rst){
												if(rst === "success" && data.result === "success"){
					            					if(data.data.index == index){
					            						if(isModify) $dataBox.attr({"data-index":index, "data-text":text}).find(".idb_name").html(text).end().toggleClass("create_bgcolor");					            							
					            						else $dataBox.fadeOut();
					            					}
					            				}else alert(decodeURIComponent(data.msg));
											},"json");
									
									return false;
								});
	}

	,formSubmit:function(form)
	{
		var text = form.text.value
			,act = form.act.value
			,parents = this;
		if(!text){
			alert(lang.validRequireContent);
			form.text.focus();
			return false;
		}
		//regionCrt
		$.post("/?dummy=indb-"+act
				,{mod:"indb", act:act, text:text}
				,function(data, rst){
					if(rst === "success"){
						if(data.result==="success"){							
							$(form).closest(".indb_dialog").find(".indb_dialog_list").append(parents.listHtml({text:text, index:data.data.index}));
							form.text.value="";
							form.text.focus();
						}else alert(decodeURIComponent(data.msg));
					}else alert(lang.axError);
				},"json");
		
		return false;
	}
	
	// 출생지,구분 ajax call
	// rValue, dValue 적용시킬 값
	,callRegionNDivision:function(rTarget, dTarget, rValue, dValue)
	{
		$.get(	"/"
    			,{mod:"indb",act:"calldata"}
    			,function(data,rst){
    				if(rst === "success"){
    					if(rTarget && data.region){
    						var options = '', region=data.region;
    						for(var item in region){
    							if(!item || !region[item]) continue;
    							options+='<option value="'+item+'">'+region[item]+'</option>';
    						}    						
    						$(rTarget).append(options).val(rValue);
    					}
    					
    					if(dTarget && data.division){
    						var options = '', division=data.division;
    						for(var item in division){
    							if(!item || !division[item]) continue;
    							options+='<option value="'+item+'">'+division[item]+'</option>';
    						}    						
    						$(dTarget).append(options).val(dValue);    						
    					}
    					
    				}else alert(decodeURIComponent(data.msg));
    			},"json");		
	}
	
	// 등록시 기본 이벤트
	,evtLoad:function()
	{
		// 출생지
		//picker.appendCalendar(["#indb_birth"], function(date){ this.value=date; }, false, {changeMonth:true, changeYear:true})
				
		// 사진파일선택
		$("#indb_file1").change(function(){
			if(!util.isFileOnlyImg(this.value)){
				alert(lang.validSelectImage);				
				return false;
			}
		});		
	}
	
	// 등록
	,indbSubmit:function(form)
	{
		if(!form.name.value || !form.name_han.value || !form.name_eng.value){
			alert("이름은 한글,한문,영문 모두 입력하여야 합니다.");
			return false;
		}
		
		if(!form.birth.value){
			alert("생년월일을 선택/입력하여 주세요.")
			form.birth.focus();
			return false;
		}
		
		if(!form.birth_region.value){
			alert("출생지를 선택하여 주세요.");
			form.birth_region.focus();
			return false;
		}
		
		if(!form.division.value){
			alert("구분을 선택하여 주세요.");
			form.division.focus();
			return false;
		}
		
		return true;
	}
		
};
