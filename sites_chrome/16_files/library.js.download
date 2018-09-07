/**
 * 모바일/PC 등 공통으로 load해야할 효과(?)관련 모음
 * prototype 형태
*/


/*****************************************************************************
탭박스 이벤트 - 각자 부르는게 있어서 prototype 으로...

	방법1 : 
	TabBox().setTarget(".edit_box:eq(0)").evtTab("mouseenter").visibleDefault(1).setInterval(1).evtTabChange();
	
	방법2 : 
	new TabBox().setTarget(".edit_box:eq(0)").evtTab("mouseenter").visibleDefault(1).setInterval(1).evtTabChange();
	
	방법3 :
	var tab = new TabBox();
	tab.setTarget(".edit_box:eq(1)");
	tab.evtTab("mouseenter");
	tab.setSelectedIndex(2);
	tab.visibleDefault();
	tab.evtTabChange();
	
	방법4
	var tab = new TabBox();
	tab.setTarget(".edit_box:eq(2)").evtTab("mouseenter").setSelectedIndex(2).visibleDefault().evtTabChange();
*****************************************************************************/
function TabBox()
{
	// 함수 형태로 불러도 실행되게...
	if(!(this instanceof TabBox)) return new TabBox();

	// 클래스명이 모두 같기때문에 특정 한 탭만 할때 parent 객체 선언 - default : body
	this.$target = null;
		
	// 타겟변수
	this.vars = {
			box : ".edit_tab, .norm_tab"						// .edit_tab 박스안에 tab_menu와 tab_content가 있어야 된다. norm_*은 에디터 메뉴 안나오는 탭
			,menu : ".tab_menu"
			,item : ".tab_item"
			,button : ".tab_button, .tab_no_button"
			,contentBox : ".tab_content, .norm_content"
		};
		
	this.selectedIndex = 0;				// 미리 선택되어 있는거
	this.interval = 5;					// 바뀌는 시간 초

	return this;
}

TabBox.prototype={
	// 타겟 재지정 - 어디부터 탐색할 것이냐?
	setTarget:function(target)
	{
		if(!target) target = document.body;
		this.$target = $(target);
		
		return this;
	}
	
	// 재 지정 - 탭메뉴상위box객체,탭 메뉴,탭 박스, 탭 버튼 강제
	,setVars:function(box, menu, item, button, contentBox)
	{
		if(box) this.vars.box = box;
		if(menu) this.vars.menu = menu;
		if(item) this.vars.item = item;
		if(button) this.vars.button = button;
		if(contentBox) this.vars.contentBox = contentBox;

		return this;
	}
	
	// index 설정
	,setSelectedIndex:function(idx)
	{
		this.selectedIndex = parseInt(idx, 10);
		
		return this;
	}
	
	// 탭이 시간마다 바뀌나-간격? 
	,setInterval:function(interval)
	{
		if(!isNaN(interval)) this.interval = interval;
		
		return this;
	}
	
	/**
	 * 이벤트 발생시 보이게
	 * @params
	 *  - e : 마우스 이벤트 또는 강제 지정 jquery 객체 - 탭안의 a 태그에 걸어주면 됨 
	 */
	,visibleBox:function(e)
	{
		var $this = (e.type=="undefined"||!e.type) ? e : $((e.target||window.event.srcElement))	// 마우스 이벤트가 아닐때는 전달된 변수로 대입
			,$parent = $this.closest(this.vars.item)			// 상위 li
			,$parentBox = $parent.closest(this.vars.menu)		// 상위 박스
			,$rootBox = $parentBox.closest(this.vars.box);		// 탭 박승의 최상위 박스
		
		// 이미 선택된거라면 빠져나옴
		if($parent.is(".on,.over")) return this;
		
		// 선택된 인덱스
		this.selectedIndex = $parent.index()||0;
		
		// 셀렉트 된거 삭제
		$parentBox.children(this.vars.item).add($rootBox.find(this.vars.contentBox)).filter(".on,.over").removeClass("on over");
		
		// 현재 포커스된거 선택
		$parent.add($rootBox.find(this.vars.contentBox).eq(this.selectedIndex)).addClass("on over");		
		
		return this;
	}
	
	/**
	 * 로드될때 기본으로 보일 탭
	 * @params
	 *  - index : 있다면 사용하고 없다면 this.selectedIndex 사용
	 */
	,visibleDefault:function(index)
	{
		if(!index) index = this.selectedIndex||0;
		var	$obj = this.$target.find(this.vars.box)
			,parents = this;
		
		$obj.each(function(i, ele){
			var $ele = $(ele)
				,$items = $ele.find(parents.vars.item)
				,tmpIndex = ($items.length < (index+1)) ? 0 : index;			// 탭갯수가 입려한 인덱스보다 적을때, 0 선택				
			
			var $e = $items.eq(tmpIndex).find(parents.vars.button);
			
			parents.visibleBox.call(parents, $e);			
		});
		
		return this;
	}
	
	/**
	 * 탭 클릭 이벤트
	 * @params 
	 *  - evtName : 이벤트 이름 - click, mouseenter 등 
	 */
	,evtTab:function(evtName)
	{
		if(!evtName) evtName="mouseenter touchstart";
	
		var parents = this;
		this.$target.off("mouseenter touchstart click mouseover focus",this.vars.button).on(evtName, this.vars.button, function(event){ 
															parents.visibleBox.call(parents, event); 
															//return false;
															//mobile page에서 이영역만 상하 swipe 되지 않아 주석함 2014.12.02
														} );
		
		return this;
	}
	
	/**
	 * 시간마다 바뀌게
	 */
	,evtTabChange:function()
	{
		var parents = this
			,$target = parents.$target
			,$items = $target.find(parents.vars.item)
			,length = $items.length
			,interval = parents.interval * 1000
			,dummyTime = null;
		
		// bind 함
		$target.on(
			{
				// 커스텀 이벤트 등록
				tabBoxChange:function(){
					dummyTime = setInterval(function(){
						if((length-1) <= parents.selectedIndex) parents.selectedIndex = 0;
						else parents.selectedIndex++;
						
						var $e = $items.eq(parents.selectedIndex);
						parents.visibleBox.call(parents, $e);
					 }, interval);					
				}
				,mouseenter:function(){
					clearTimeout(dummyTime);
				}
				,mouseleave:function(){
					$(this).trigger("tabBoxChange");
				}
			});
		
		// 트리거 호출
		$target.trigger("tabBoxChange");
		
		return this;
	}
	
	/**
	 * 많이 쓸거 같은거 미리 선언
	 * @params
	 *  - target : 이벤트 줄 탭의 전체 박스(id or class css표기법) - target이 없다면 document.body 에서 시작하여 edit_tab을 전부 탐색하여 적용함
	 *  - evtType : click, mouseenter 등
	 *  - defaultTabNum : 로딩될때 보일 탭 인덱스 (0부터 시작)
	 *  - interval : 시간마다 바뀌는 탭이라면 초단위 지정. 없다면 바뀌지 않음
	 *  
	 *  예 :: new TabBox().defaultChange("","","",1);
	 */
	,defaultChange:function(target, evtType, defaultTabNum, interval)
	{
		var tab = this.setTarget(target).evtTab(evtType).visibleDefault(defaultTabNum);
		
		if(interval) tab.setInterval(interval).evtTabChange();
	}
	
	/**
	 * 클릭해서 탭변경하는거
	 * @params
	 *  - target : 최상의 tab box selector
	 */
	,defaultClick:function(target)
	{
		this.setTarget().setVars(target).evtTab("click").visibleDefault(0);
	}
};







/**
EX) http://dev.ndsoftnews.com/x.html

*** css & html tag example ***
*** 공통 css ***
.transition_all{-webkit-transition:all .5s ease-in-out;-moz-transition:all .5s ease-in-out;-o-transition:all .5s ease-in-out;-ms-transition:all .5s ease-in-out;transition:all .5s ease-in-out;}

*** horizon ***
.box{margin:1em auto;overflow:hidden;height:120px;width:100%;text-align:center;}
.list{margin:.5em 0 0 0;position:relative;overflow:hidden;height:85px;z-index:1;border:1px solid #ccc}
.slide:nth-of-type(n+2){-webkit-transform:translate3d(100%, 0, 0);-moz-transform:translate3d(100%, 0, 0);-o-transform:translate3d(100%, 0, 0);-ms-transform:translate3d(100%, 0, 0);transform:translate3d(100%, 0, 0);}
.box ul{position:absolute;float:left;margin-top:.3em;width:100%}
.box ul li{float:left;width:33.3%;text-align:center;}
.box ul li img{max-width:80%;max-height:80%}
.btn{clear:both;text-align:center}

.box .article_list{width:95%;height:100%;font-size:9pt}
.box .article_list li{clear:left;width:100%;text-align:left;padding:.3em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

<div class="box" data-type="horizon" data-default-idxno="2">
	<div class="list">
		<ul class="no_type slide">
			<li>
				<img src="http://toristudio.co.kr/_files/0066396001357709509.jpg" />
			</li>
			<li>
				<img src="http://toristudio.co.kr/_files/0066396001357709509.jpg" />
			</li>
			<li>
				<img src="http://toristudio.co.kr/_files/0066396001357709509.jpg" />
			</li>
		</ul>
		<ul class="no_type slide">
			<li>
				<ul class="border_box no_type article_list">
					<li><a href="">‘국정원 댓글’ 수백명 동원 정황 포착…검찰, 포털서 정보 넘겨받아</a></li>
					<li><a href="">원세훈 전 원장 29일 밤 늦게까지 조사한 뒤 돌려보내</a></li>
					<li><a href="">압수수색영장 발부받아 다음·네이버에서 활동내역 파악</a></li>
				</ul>
			</li>
		</ul>
		<ul class="no_type slide">
			<li>
				<img src="http://toristudio.co.kr/_files/0410275001357709499.jpg" />
			</li>
			<li>
				<img src="http://toristudio.co.kr/_files/0410275001357709499.jpg" />
			</li>
			<li>
				<img src="http://toristudio.co.kr/_files/0410275001357709499.jpg" />
			</li>
		</ul>
		<ul class="no_type slide">
			<li>
				<ul class="border_box no_type article_list">
					<li><a href="">‘국정원 댓글’ 수백명 동원 정황 포착…검찰, 포털서 정보 넘겨받아</a></li>
					<li><a href="">원세훈 전 원장 29일 밤 늦게까지 조사한 뒤 돌려보내</a></li>
					<li><a href="">압수수색영장 발부받아 다음·네이버에서 활동내역 파악</a></li>
				</ul>
			</li>
		</ul>
	</div>
	
	<div class="btn">
		<button type="button" class="prev">이전</button>
		<span class="page">1/5</span>
		<button type="button" class="next">다음</button>
	</div>
</div>


*** 3d spinner ***
.spinner3d{margin:3em auto 20px auto;width:100%;height:130px}
.spinner_box{width:100%;height:100%;overflow:hidden;border:1px solid #ccc;}
.spinner{-webkit-transform-style:preserve-3d;-moz-transform-style:preserve-3d;-o-transform-style:preserve-3d;transform-style:preserve-3d;position:relative;margin:0 auto;height:100%;width:100%;background-color:red}
.spinner_list{position:absolute;height:100%;width:100%;padding:0px;font-size:9pt}
.spinner_list img{width:100%;height:100%}
.spinner_list ul{height:100%;background-color:#fff;font-size:9pt}
.spinner_btn{margin:1em auto;text-align:center}

.spinner3d .article_list{}
.spinner3d .article_list li{padding:1em;}
.spinner3d .article_list li a{display:block;width:95%;height:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}

<div class="spinner3d" data-type="spinner3d" data-default-idxno="0"><!-- 영역구분용(이 박스 안에 있어야 함) -->
	<div class="border_box spinner_box"><!-- 3d css & touch -->
		<div class="border_box spinner"><!-- 회전 -->
			<div class="border_box spinner_list">
				<ul class="border_box no_type article_list">
					<li><a href="">‘국정원 댓글’ 수백명 동원 정황 포착…검찰, 포털서 정보 넘겨받아</a></li>
					<li><a href="">원세훈 전 원장 29일 밤 늦게까지 조사한 뒤 돌려보내</a></li>
					<li><a href="">압수수색영장 발부받아 다음·네이버에서 활동내역 파악</a></li>
				</ul>
			</div>
			<div class="border_box spinner_list">
				<img src="http://toristudio.co.kr/image/info-camera.jpg" />
			</div>
			<div class="border_box spinner_list article_list">
				<ul class="border_box no_type">
					<li>로드걸 임지혜 비키니 공개</li>
					<li>휴대전화 보조금 빙하기에도 번호이동 급증</li>
					<li>1주택자 소유 오피스텔도 5년간 양도세 면제</li>
				</ul>
			</div>
			<div class="border_box spinner_list">
				<img src="http://toristudio.co.kr/image/introduce-photo.jpg" />
			</div>
		</div>
	</div>

	<div class="spinner_btn">
		<button type="button" class="spinner_prev">이전</button>
		<span class="spinner_page">1/5</span>
		<button type="button" class="spinner_next">다음</button>
	</div>
</div>
**/
/**
events
@params
	- target : object = {
								root : ".spinner3d" : string - element id or class name ... (최상위 박스)
								,box : ".spinner_box" : string - element id or class name ... (그다음 박스)
								,slide : ".spinner" : string - element id or class name ... slide 부분
								,list : ".spinner_list" : string - element id or class name ...
								,btn : {prev:".spinner_prev", next:".spinner_next"} : object={prev:"", next:"", number:""} - 다음,이전 클릭 버튼,넘버링아이콘
								,page : ".spinner_page" : string - 1/5 : 5 페이지중 현재 1페이지
							}
	- opt : object = {
						auto:true or false 					// 자동으로 움직이나 - 자동움직임은 추후 할까?ㅋ
						,interval : 2000 or milliseconds 	// 간격
						,type : "horizon", "vertical", "spinner3d", "horizonMulti", " horizonPart" // data-type : 움직이는 형태 horizon:가로로있는 형태, horizonMulti : 한슬라이드에 여러 단이 있을경우, horizonPart : 여러단중 한 부분의 단만 슬라이드, vertical:세로로로 있는 형태(아직ㅋ), spinner3d:정육면체
						,defaultIdx : 0 or number 					// data-default-idxno : 로딩시 보일 객체 순번 (0부터시작)
						,func : {									// 터치시작,움직임,끝났을때 실행될 이벤트
									start:function(){}
									,move:function(){}
									,end:function(){}
								}
					 } - slide 옵션
					 
	- isEdit : 편집모드인가? 편집모드에서 cube는 z 값 때문에 편집이 불가능해서 slide로 보여짐 
					 
@사용법
// 옆으로 slide, 3d 스피너
var horizon = new Slide({
							root:".box"
							,box:".list"
							,slide:".slide"								// touch event
							,btn : {prev:".prev", next:".next", number:""}
							,page : ".page"
						}
						,{
							// options 
						},true or false or blank)
	,spinner3d = new Slide( {
								root : ".spinner3d"
								,box : ".spinner_box"					// touch event
								,slide : ".spinner"
								,list : ".spinner_list"
								,btn : {prev:".spinner_prev", next:".spinner_next"}
								,page : ".spinner_page"
							}
							,{
								// options
							},true or false or blank);

$(function(){
	horizon.exe();	
	spinner3d.exe();
});
*/
function Slide(target, opt, isEdit){
	//if(!(this instanceof Slide)) return new Slide();
	if(!target) target={};
	if(!opt) opt={};
	if(!opt.func) opt.func={};
	if(!isEdit) isEdit = false;
	
	// element 이름	
	this.target = target;
	this.isSupportGpu = false;											// support 3d gpu ?
	this.opt = {
				auto:opt.auto||false
				,interval:opt.interval||0
				,type:opt.type||"horizon"
				,defaultIdx:opt.defaultIdx||0
				,func:	{
							start:opt.func.start||function(){}
							,move:opt.func.move||function(){}
							,end:opt.func.end||function(){}
						}
				};
	
	// 3d cube는 편집모드에서는 못함
	this.isEdit = isEdit;

	// 외부에서 사용될 슬라이드 함수
	this.funcs = null;
	
	return this;
}

Slide.prototype={

	_set:function(name,value)
	{
		this[name] = value;
		return this;
	}
	
	,_get:function(name)
	{
		return this[name];
	}
	
	,setOption:function(opt)
	{
		this._set('opt', opt||{});
		return this;
	}
	
	,browser:function()
	{
		return util.browser();
	}
		
	,init:function()
	{
		var parents = this
			,$w=$(window);
		this.isSupportGpu = ($("#check3d").css("top")==="0px");
		
		// 이벤트 먹일꺼 찾아다님
		$(this.target.root).each(function(i, ele){
			var $root = $(ele);
			if($root.attr("data-is-slide")!="1"){ // 2중으로 덮어쓰지 않게 실행
				var $target = {
						$root : $root
						,$box : parents.target.box ? $root.find(parents.target.box) : null
						,$slide : parents.target.slide ? $root.find(parents.target.slide) : null
						,$list : parents.target.list ? $root.find(parents.target.list) : null
						,$btn : {
									prev:parents.target.btn.prev ? $root.find(parents.target.btn.prev) : null
									,next:parents.target.btn.next ? $root.find(parents.target.btn.next) : null
									,number:parents.target.btn.number ? $root.find(parents.target.btn.number) : null
								}
						,$page : parents.target.page ? $root.find(parents.target.page) : null
					};
				
				parents.opt.type = $root.attr("data-type")||(parents.opt.type||"horizon");//parents.opt.type//kimyh 2015.05.15
				parents.opt.defaultIdx = Number($root.attr("data-default-idxno")||(parents.opt.defaultIdx||0));//parents.opt.defaultIdx//kimyh 2015.05.15
				var opt = parents.opt;
				
				// 슬라이드:모바일때 반응형 웹이기에 이미지 height값을 수시로 세팅해줘야 함
				// .m_slide_horizon_list : absolute 되는 부분의 height:auto 로 둬야 함
				// cube 형태가 아닌것
				if($target.$root.is(".m_slide_horizon")){
				//if(parents.opt.type!='spinner3d'){
					// height 자동 리사이즈 적용안할 박스 class="m_slide_horizon m_not_height"
					if(!$target.$root.is(".m_not_height")){
						$w.on("load resize",function(){
							$target.$box.css("height",(util.arrayMaxMin($target.$slide.map(function(){ return $(this).height(); }).get()))+"px");
						});
					}
				}
				
				// 함수 실행 - 다중이기에 변수로 다 넘김
				parents[parents.opt.type]($target, opt);
				$root.attr("data-is-slide","1");	// 실행한거 표시함
			}

			$root = null;
		});
		return this;
	}
	
	// 실행
	,exe:function()
	{
		if(!this.target.root) return false;
		
		this.init();
		return this;
	}
	
	// listener
	,listener:function($slide, func)
	{
		if(!$slide) return false;
		if(!func) func = {};
		$slide.off().on({
							"mousedown touchstart":func.start
							,"mousemove touchmove":func.move
							,"mouseup touchend":func.end
						});
	}
	
	// 이벤트 알아내기
	,getEventObject:function(e)
	{
		var evt = window.event||e;
			evt = evt.targetTouches?evt.targetTouches[0]:evt;  	// jquery touch event
		return evt;
	}
	
	/*
		horizon 하고 같지만 단 한 부분이 슬라이드 되는 박스용
	*/
	,horizonPart:function($target, opt){
		var startNum = Number($target.$root.attr("data-slide-start"))||1				// 슬라이드될 부분 시작 단번호 (1부터 시작)
			,endNum = Number($target.$root.attr("data-slide-end"))||1					// 슬라이드될 부분 끝
			,width = $target.$root.attr("data-slide-width")||"480"						// 슬라이드될 부분 넓이 고정
			,$slide = $target.$slide																	// 슬라이드 dom
			,parents = this
			,slideClassName = parents.target.slide.replace(".","")
			,wrap = '<div class="td" style="position:relative;overflow:hidden;width:'+width+'px;" />'
			,filterArr = [];
	
		if((endNum-startNum)<0) return false;
	
		//for(var i=startNum; i<=endNum; i++)	filterArr.push("[data-num='"+i+"']");	// 걸러낼 것

		startNum -= 1;
		endNum -= 1;
		if(startNum<=0) startNum=0;
		for(var i=startNum; i<=endNum; i++)	filterArr.push(".edit_box_title:eq("+i+")");	// 걸러낼 것
		var filter = filterArr.join(",");
	
		var $parent = $slide.closest(".edit_box_title");
		$parent.not(filter).find(parents.target.slide).removeClass(slideClassName);																		// 슬라이드 안되어야 할것
		$parent.filter(filter).wrapAll(wrap).find(parents.target.slide).parent().wrap('<div class="virtual_table full" style="position:relative"><div class="tr">');		// 슬라이드 되어야 할것 position:relative 은 ff에서 말을 안들어 추가
		//--> 테이블 재새성함
	
		$target.$slide = $target.$root.find(parents.target.slide);				// 재 할당
		this.horizon($target, opt);														// 호출
	}
	
	/*
		horizon 하고 같지만 단이 여러개가 한 슬라이드.
		총 단 갯수의/n 이 한 슬라이드
		만약 data-slide-count 가 2 이고, 총 slide 수가 5개라면 3 개 슬라이드와 2개 슬라이드로 나뉜다.
		 data-slide-count 3이고 총 slide 수가 6개라면 2단씩 3장의 슬라이드가 됨
	*/
	,horizonMulti:function($target, opt){
		var slideCount = Number($target.$root.attr("data-slide-count"))||0				// 슬라이드 갯수
			$slide = $target.$slide																		// 슬라이드 dom
			,count = $slide.length||0																	// 총 슬라이드 수
			,interval = Math.ceil(count/slideCount)||0											// 슬라이드의 어디까지인지
			,$dummy = null
			,parents = this
			,slideClassName = parents.target.slide.replace(".","")
			,wrap = '<div class="td '+slideClassName+'" style="width:100%" />';
		
		// 슬라이드 분배
		for(var i=0; i<slideCount; i++){
			var divide = i*interval
				, sum = interval+divide;
			$slide.slice(divide, ((i+1)===slideCount && sum!==count?count:sum)).closest(".edit_box_title").wrapAll(wrap).find(parents.target.slide).removeClass(slideClassName).parent().wrapAll('<div class="virtual_table full"><div class="tr">');
		}
		//--> 테이블 재새성함
	
		$target.$slide = $target.$root.find(parents.target.slide);				// 재 할당
		this.horizon($target, opt);														// 호출
	}
	
	// 가로로 긴거
	,horizon:function($target, opt)
	{
		var parents = this
			,interval = 30						// 30%이상이면 넘김
			,start = null
			,startY = null
			,slideStart = false					// slide 시작
			,slideStop = true					// slide 멈춤(true 멈춤, false 안멈춤)
			,boxWidth = 0
			,total = $target.$slide.length
			,defaultIdx = opt.defaultIdx;
		
		/**
		여기서만 필요한 함수
		**/
		var funcs={				
			// 기본 페이지 표시
			putPage:function(c,t){
				$target.$page.text(c+" / "+t);
				return this;
			}
			
			// 로딩되면 순서 맞춤
			,sortPageLoad:function(idx){
				var cssSelected = cssHiddenLeft = cssHiddenRight = {}
					,browser = parents.browser(); 
				
				//translate3d 요소가 없는거
				if(browser.name === "opera" || (browser.name === "msie" && browser.version <= 9)){
					cssSelected={"left":"0"};
					cssHiddenLeft={"left":"-100%"};
					cssHiddenRight={"left":"100%"};
				}else{
					cssSelected={"transform":"translate3d(0, 0, 0)"};
					cssHiddenLeft={"transform":"translate3d(-100%, 0, 0)"};
					cssHiddenRight={"transform":"translate3d(100%, 0, 0)"};
				}
				
				$target.$slide.removeClass("selected").show();											// 중복되는 거 때문에 리스트 모두가 display:none 순서맞추면서 show 함.			
				$target.$slide.eq(idx).css(cssSelected).addClass("selected")
					.end().filter(":lt("+idx+")").css(cssHiddenLeft)
					.end().filter(":gt("+idx+")").css(cssHiddenRight);

				// 접근성 위해 선택된 탭만 tabindex 생성. 숨겨진 탭은 tabindex="-1" by kimyunho 2016.12.19
				$target.$slide.not(".selected").find("a").attr("tabindex","-1").end().end().filter(".selected").find("a").removeAttr("tabindex");
								
				return this;
			}
			
			// 버튼 클릭시
			,evtClickedButton:function(mode){				
				var last = total-1;																		// index = $target.$slide.filter(".selected").index() : 상위 객체가 많아 쓰기 어려움
				
				if(mode==="next"){
					if(defaultIdx>=last) defaultIdx = 0;
					else defaultIdx++;
				}else{
					if(defaultIdx<=0) defaultIdx = last;
					else defaultIdx--;
				}
				
				this.sortPageLoad(defaultIdx).putPage(defaultIdx+1, total);
				opt.func.end.call(parents);																// 이벤트 끝나고 실행됨
				return this;
			}
			
			// 슬라이드 하단에 넘버링하는 아이콘 또는 숫자
			,numbering:function(idx){
				var _parents = this;

				// 클릭이벤트
				function evtClicked(){								
					$target.$btn.number = $target.$root.find(parents.target.btn.number);	// 재설정				
					_parents.changeNumbering(idx);
					
					$target.$slide.addClass("transition_all");	// animation
					$target.$btn.number.on("click",function(){
						var $this = $(this)
							,index = $this.index();
						_parents.putPage(index+1,total).sortPageLoad(index).changeNumbering(index);
						defaultIdx = index;
					});
				}
				if($target.$btn.number.length===1 && total>1){
					for(var i=total;i>1; i--){
						$target.$btn.number.addClass("number_1").after($target.$btn.number.clone().removeClass("number_1").addClass("number_"+i).text(i))
					}

					evtClicked();
				}else if(total>1 && total===$target.$btn.number.length) evtClicked();			// 버튼 추가할것없이 이벤트만 추가
				else if($target.$btn.number.length>0 && total<=1) $target.$btn.number.remove(); // 넘버링할것이 없다면 제거
				return this;
			}
			
			// 넘버링 이동
			,changeNumbering:function(idx){
				if($target.$btn.number.length>0 && total>1){
					$target.$btn.number.removeClass("on").eq(idx).addClass("on");
				}
				return this;
			}
		};
		
		// 기본으로 보일 레이어
		funcs.putPage(defaultIdx+1,total).sortPageLoad(defaultIdx);
		
		// 이전,다음 버튼 클릭
		$target.$btn.prev.add($target.$btn.next).on("click",
													function(evt){
														var $this = $(this)
															,isNext = $this.is(parents.target.btn.next)?"next":"prev"
															,e = evt||window.event;
														
														// animation
														$target.$slide.addClass("transition_all");
														funcs.evtClickedButton(isNext).changeNumbering(defaultIdx);				
														
														e.preventDefault();
													});		

		// 슬라이드 하단에 넘버링하는 아이콘 또는 숫자
		funcs.numbering(defaultIdx);
		

		// touch slide
		parents.listener(
			$target.$slide
			,{
			start:function(event){
				// animation
				$target.$slide.removeClass("transition_all");
				
				// 마우스일때
				if(event.type === "mousedown"){
					event.preventDefault();
					event.stopPropagation();
				}
				
				var evt = parents.getEventObject(event)
					,x = evt.clientX
					,y = evt.clientY
					,$this = $(this);
			
				slideStart = true;
				boxWidth = $this.width();
				start = x;							// 시작점
				startY = y;
				
				opt.func.start.call(parents);
			}
			
			,move:function(event){
				if(slideStart === true){
					
					var $this = $(this);
					slideStop = false;				
					
					var evt = parents.getEventObject(event)
						,x = evt.clientX
						,y = evt.clientY
						,_x = ((start-x)/boxWidth)*-100
						,absX = Math.abs(start-x)
						,absY = Math.abs(startY-y);
					
					// 모바일에서 scroll에 방해가 되서 어느정도 swipe 해야 움직임 있게 함
					//if(absX>interval && absY<(interval*3)){
						
						// touch 이고 어느정도 드래그가 있을때 자식객체로 다른 이벤트 전달 못하게함
						if(event.type === "touchmove" && absX>2){
							event.preventDefault();
							event.stopPropagation();
						}
					
						// _x가 0보다 작으면 앞,크면 뒤에 리스트 같이 움직임
						$this.css({"transform":"translate3d("+_x+"%, 0, 0)"})[_x>0?"prev":"next"](parents.target.slide).css({"transform":"translate3d("+((_x>0?-100:100)+_x)+"%, 0, 0)"});			
					
						if(Math.abs(_x) > interval){
							// animation
							$target.$slide.addClass("transition_all");
	
							if(_x >= 0){
								defaultIdx--;
								if(defaultIdx<0) defaultIdx=total-1;
							}else{
								defaultIdx++;
								if(defaultIdx>=total) defaultIdx=0;
							}
							
							funcs.putPage(defaultIdx+1,total).sortPageLoad(defaultIdx).changeNumbering(defaultIdx);
							
							slideStart = false;
							slideStop = true;
						}
						
						opt.func.move.call(parents);
					//}// end if Math.abs				
				}
			}
			
			,end:function(event){
				// a 태그시 이벤트전달 범위에 이상이 있다면 관리자/일반페이지 잘 분배해서 작업할것.(관리자페이지에서 기사 순서 바꾸는 것에서 에러나서 주석함)
				//event.preventDefault();
				//event.stopPropagation();
				
				if(slideStop===false){
					funcs.putPage(defaultIdx+1,total).sortPageLoad(defaultIdx);
				}

				slideStart = false;
				slideStop = true;
				boxWidth = 0;
				start = 0;
				startY = 0;

				parents.opt.func.end.call(parents);	
			}
		});
	}
	
	// horizon 보완한것인데 모바일 위주일때 사용함
	,horizon2:function($target, opt)
	{
		var parents = this
			,interval = 30						// 이상이면 넘김
			,start = null
			,startY = null
			,slideStart = false					// slide 시작
			,slideDirect = 0					// 왼쪽,오른쪽 방향			
			,slideXY=""							// 상하 방향
			,boxWidth = 0
			,total = $target.$slide.length
			,defaultIdx = opt.defaultIdx
			,$targetSiblings = {				// 제일 처음과 끝 객체
				$first:$target.$slide.first()
				,$last:$target.$slide.last()
			}
			,$parentBox = $target.$slide.parent()
			,isParentBox = $parentBox.is(".edit_box_title");

		// 박스로 슬라이드 만들때 범위 재 탐색
		if(isParentBox){
			$targetSiblings = {				// 제일 처음과 끝 객체
				$first:$parentBox.first().find(parents.target.slide)
				,$last:$parentBox.last().find(parents.target.slide)
			};
		}
	
		/**
		여기서만 필요한 함수
		**/
		var funcs={				
			// 기본 페이지 표시
			putPage:function(c,t){
				$target.$page.text(c+" / "+t);
				return this;
			}
			
			// 로딩되면 순서 맞춤
			,sortPageLoad:function(idx){
				var cssSelected = cssHiddenLeft = cssHiddenRight = {}
					,browser = parents.browser(); 
				
				//translate3d 요소가 없는거
				if(browser.name === "opera" || (browser.name === "msie" && browser.version <= 9)){
					cssSelected={"left":"0"};
					cssHiddenLeft={"left":"-100%"};
					cssHiddenRight={"left":"100%"};
				}else{
					cssSelected={"transform":"translate3d(0, 0, 0)","opacity":"1","z-index":2};								// 선택된것만 보임
					cssHiddenLeft={"transform":"translate3d(-100%, 0, 0)","opacity":"0","z-index":1};					// 나머진 감춤
					cssHiddenRight={"transform":"translate3d(100%, 0, 0)","opacity":"0","z-index":1};					// 나머진 감춤
				}

				// 중복되는 거 때문에 리스트 모두가 display:none 순서맞추면서 show 함.										
				$target.$slide.removeClass("selected").show().eq(idx).css(cssSelected).addClass("selected")
				.end().not(":eq("+idx+")").css(slideDirect>0?cssHiddenLeft:cssHiddenRight);		
				
				defaultIdx = idx; // 저장

				// 접근성 위해 선택된 탭만 tabindex 생성. 숨겨진 탭은 tabindex="-1" by kimyunho 2016.12.19
				$target.$slide.not(".selected").find("a").attr("tabindex","-1").end().end().filter(".selected").find("a").removeAttr("tabindex");

				return this;
			}
			
			// 버튼 클릭시
			,evtClickedButton:function(mode){				
				var last = total-1;																		// index = $target.$slide.filter(".selected").index() : 상위 객체가 많아 쓰기 어려움
				
				if(mode==="next"){
					if(defaultIdx>=last) defaultIdx = 0;
					else defaultIdx++;
				}else{
					if(defaultIdx<=0) defaultIdx = last;
					else defaultIdx--;
				}
				
				this.sortPageLoad(defaultIdx).putPage(defaultIdx+1, total);
				opt.func.end.call(parents, this, $target.$slide, defaultIdx);																// 이벤트 끝나고 실행됨
				return this;
			}

			// 슬라이드 하단에 넘버링하는 아이콘 또는 숫자
			,numbering:function(idx){
				var _parents = this;

				// 클릭이벤트
				function evtClicked(){								
					$target.$btn.number = $target.$root.find(parents.target.btn.number);	// 재설정				
					_parents.changeNumbering(idx);
					
					$target.$slide.addClass("transition_all");	// animation
					$target.$btn.number.on("click",function(){
						var $this = $(this)
							,index = $this.index();
						_parents.putPage(index+1,total).sortPageLoad(index).changeNumbering(index);
						defaultIdx = index;
					});
				}
				if($target.$btn.number.length===1 && total>1){
					for(var i=total;i>1; i--){
						$target.$btn.number.addClass("number_1").after($target.$btn.number.clone().removeClass("number_1").addClass("number_"+i).text(i))
					}

					evtClicked();
				}else if(total>1 && total===$target.$btn.number.length) evtClicked();			// 버튼 추가할것없이 이벤트만 추가
				else if($target.$btn.number.length>0 && total<=1) $target.$btn.number.remove(); // 넘버링할것이 없다면 제거
				return this;
			}
			
			// 넘버링 이동
			,changeNumbering:function(idx){
				if($target.$btn.number.length>0 && total>1){
					$target.$btn.number.removeClass("on").eq(idx).addClass("on");
				}
				return this;
			}
		};
	
		// 기본으로 보일 레이어
		funcs.putPage(defaultIdx+1,total).sortPageLoad(defaultIdx);

		// 담아둠
		this._set("funcs", funcs);
		
		// 이전,다음 버튼 클릭
		$target.$btn.prev.add($target.$btn.next).on("click",
													function(evt){
														var $this = $(this)
															,isNext = $this.is(parents.target.btn.next)?"next":"prev"
															,e = evt||window.event;
														
														// animation
														$target.$slide.addClass("transition_all");
														funcs.evtClickedButton(isNext).changeNumbering(defaultIdx);				
														
														e.preventDefault();
													});		

		// 슬라이드 하단에 넘버링하는 아이콘 또는 숫자
		funcs.numbering(defaultIdx);
		
		// touch slide
		parents.listener(
			$target.$slide
			,{
			start:function(event){
				// animation
				$target.$slide.removeClass("transition_all");
				
				// 마우스일때
				if(event.type === "mousedown"){
					event.preventDefault();
					event.stopPropagation();
				}
				
				var evt = parents.getEventObject(event)
					,x = evt.clientX
					,y = evt.clientY
					,$this = $(this);

				slideStart = true;
				boxWidth = $this.width();
				start = x;							// 시작점
				startY = y;
				slideXY = "";
				slideDirect = 0;

				opt.func.start.call(parents, this, $target.$slide, defaultIdx);
			}
			
			,move:function(event){

				if(slideStart===true && slideXY!="Y"){

					var $this = $(this) 
						//$this = 
						,evt = parents.getEventObject(event)
						,x = evt.clientX
						,y = evt.clientY
						,_x = ((start-x)/boxWidth)*-100
						,dirX = start-x
						,dirY = startY-y
						,absX = Math.abs(dirX)
						,absY = Math.abs(dirY);

					// x,y축 방향 결정
					if(absX<absY && slideXY=="") slideXY = "Y"; // 터치아웃 할때까지, 가로축 상하스크롤
					else slideXY = "X";	// 좌우 슬라이드

					if(slideXY=="X"){
						slideDirect = dirX;
				
						// touch 이고 어느정도 드래그가 있을때 자식객체로 다른 이벤트 전달 못하게함
						if(event.type === "touchmove" && absX>2){
							event.preventDefault();
							event.stopPropagation();
						}

						// _x가 0보다 작으면 앞,크면 뒤에 리스트 같이 움직임
						var $t = null;
						if($targetSiblings.$first.is($this) && _x>0)		$t = $targetSiblings.$last;
						else if($targetSiblings.$last.is($this) && _x<0)	$t = $targetSiblings.$first;
						else{
							if(isParentBox)	$t = $parentBox.find($this).parent()[_x>0?"prev":"next"]().find(parents.target.slide);	// 박스가 슬라이드 될때.
							else			$t = $this[_x>0?"prev":"next"](parents.target.slide);							
						}
			
						$this.css({"transform":"translate3d("+_x+"%, 0, 0)"});
						$t.css({"transform":"translate3d("+((_x>0?-100:100)+_x)+"%, 0, 0)","opacity":1});		
						
						//$this.css({"transform":"translate3d("+_x+"%, 0, 0)"})[_x>0?"prev":"next"](parents.target.slide).css({"transform":"translate3d("+((_x>0?-100:100)+_x)+"%, 0, 0)"});			

						opt.func.move.call(parents, this, $target.$slide, defaultIdx);
					} // end if slideXY

				}// end slideStart
			}
			
			,end:function(event){
				// a 태그시 이벤트전달 범위에 이상이 있다면 관리자/일반페이지 잘 분배해서 작업할것.(관리자페이지에서 기사 순서 바꾸는 것에서 에러나서 주석함)
				//event.preventDefault();
				//event.stopPropagation();

				if(Math.abs(slideDirect)>=interval){
					if(slideDirect < 0){
						defaultIdx--;
						if(defaultIdx<0) defaultIdx=total-1;
					}else{
						defaultIdx++;
						if(defaultIdx>=total) defaultIdx=0;
					}
					
					$target.$slide.addClass("transition_all");	// animation
				}
				
				funcs.putPage(defaultIdx+1,total).sortPageLoad(defaultIdx).changeNumbering(defaultIdx);
				
				slideStart = false;
				boxWidth = 0;
				start = 0;
				startY = 0;
				slideDirect = 0;
				slideXY = "";

				parents.opt.func.end.call(parents, this, $target.$slide, defaultIdx);	
			}
		});
	}
	
	// 3d 정육면체
	,spinner3d:function($target, opt)
	{
		var parents = this
			,interval = 30						// 30도이상이면 넘김
			,start = null
			,startY = null
			,slideStart = false					// slide 시작
			,slideStop = true					// slide 멈춤(true 멈춤, false 안멈춤)
			,total = $target.$list.length
			,defaultIdx = opt.defaultIdx
			,degrade = 90
			,lastDegrade = 0					// 마지막 각도
			,boxWidth = $target.$slide.width()
			,transZPosition = boxWidth/2		// z축 위치
			,perspective = boxWidth*2;			// 3d 깊이
		
		/**
		여기서만 필요한 함수
		**/
		var funcs={
			vars:{
				index:defaultIdx
				,is3dSupport : true
			}
			
			// 3d 모형 지원하는가? 그래도 관리자 편집모드에서는 cube는 편집이 불가하여 지원않는걸로 처리 
			,is3dSupportBrowser:function()
			{
				var browser =  parents.browser();
				return (browser.name === "opera" || browser.name === "msie" || parents.isEdit===true || parents.isSupportGpu===false) ? false : true;
			}
			
			// 로딩되면 각도/위치 맞춤
			,init:function(){
				// 브라우저 지원?
				this.is3dSupport = this.is3dSupportBrowser();				
				if(this.is3dSupport===false) return this;
			
				//translate3d 요소가 없는거
				$target.$box.css({"perspective":perspective+"px"});
				$target.$list.css({
					"transform":function(i,value){
						var deg = i*degrade;
						return "rotateY("+deg+"deg) translateZ("+transZPosition+"px)";
					}
				});				
				return this;
			}
			
			// set index
			,setIndex:function(idx){
				this.vars.index = idx;
				return this;				
			}
			
			// 기본 페이지 표시
			,putPage:function(c,t){
				$target.$page.text(c+" / "+t);
				return this;
			}
			
			// page 계산
			,computePage:function(mode){
				var index = this.vars.index
					,last = total-1;
				if(mode==="next"){
					if(index>=last) index = 0;
					else index++;
				}else{
					if(index<=0) index = last;
					else index--;
				}
				return index;
			}
			
			// 로딩되면 순서 맞춤-중복되는 거 때문에 리스트 모두가 display:none 순서맞추면서 show 함.
			,sortPageLoad:function(){
				//translate3d 요소가 없는거
				if(this.is3dSupport===false){
					$target.$list.css({"left":"-100%"}).eq(this.vars.index).css({"left":"0"}).show();	
					$target.$slide.css({"overflow":"hidden"});
				}else{
					$target.$list.show();
					$target.$slide.css({"transform":"translateZ(-"+transZPosition+"px) rotateY("+lastDegrade+"deg)"});
				}
				return this;
			}
			
			// 버튼 클릭시
			,evtClickedButton:function(mode){
				var index = this.computePage(mode);
				
				lastDegrade = lastDegrade + (degrade * (mode==="next"?-1:1));				
				this.setIndex(index).sortPageLoad().putPage(index+1, total);
				opt.func.end.call(parents);									// event 끝나고 실행
				return this;
			}
			
			// resize
			,evtResizeInit:function(){
				var _parents = this;
				$(window).on({
					"cubeReload":function(){
							boxWidth = $target.$slide.width();
							transZPosition = boxWidth/2;		// z축 위치
							perspective = boxWidth*2;			// 3d 깊이

							_parents.init().sortPageLoad();
						}
						,"resize":function(){					// pc
							if("orientation" in window) return false;

							$(this).trigger("cubeReload");
						}
						,"orientationchange":function(){		// mobile
							$(this).trigger("cubeReload");
						}
				});
				return this;
			}
		};
		
		// 기본으로 보일 레이어
		lastDegrade = defaultIdx * degrade * -1;
		funcs.init().setIndex(defaultIdx).putPage(defaultIdx+1,total).sortPageLoad().evtResizeInit();
		
		// 버튼 클릭시
		$target.$btn.prev.add($target.$btn.next).on("click",
									function(evt){
										var $this = $(this)
											,isNext = $this.is(parents.target.btn.next)?"next":"prev"
											,e = evt||window.event;
										
										// animation
										((funcs.is3dSupport===false)?$target.$list : $target.$slide);//.addClass("transition_all"); 이상한 움직임때문에 주석
										funcs.evtClickedButton(isNext);	
										
										e.preventDefault();
									});
									
		// 지원안한다면 끝~
		if(funcs.is3dSupport===false) return ;
		
		// touch slide
		parents.listener(
			$target.$box
			,{
			start:function(event){
				// animation
				$target.$slide.removeClass("transition_all");
				
				// 마우스일때
				if(event.type === "mousedown"){
					event.preventDefault();
					event.stopPropagation();
				}
				
				var evt = parents.getEventObject(event)
					,x = evt.clientX
					,y = evt.clientY;
				
				slideStart = true;
				start = x;							// 시작점
				startY = y;
				
				opt.func.start.call(parents);	
			}
			
			,move:function(event){
				if(slideStart === true){
					
					var slideStop = false
						,evt = parents.getEventObject(event)
						,x = evt.clientX
						,y = evt.clientY
						,_tx = (start-x)
						,operator = _tx>=0 ? -1 : 1
						,absX = Math.abs(start-x)
						,absY = Math.abs(startY-y);
						
						_x = Math.abs(_tx / 4); 
					
					// 모바일에서 scroll에 방해가 되서 어느정도 swipe 해야 움직임 있게 함
					//if(absX>interval && absY<(interval*3)){
						
						// touch 이고 어느정도 드래그가 있을때 자식객체로 다른 이벤트 전달 못하게함
						if(event.type === "touchmove" && Math.abs(start-x)>2){
							event.preventDefault();
							event.stopPropagation();
						}
						
						$target.$slide.css({"transform":"translateZ(-"+transZPosition+"px) rotateY("+(lastDegrade + (_x*operator))+"deg)"});
						
						if(Math.abs(_x) > interval){
							// animation
							$target.$slide.addClass("transition_all");
							
							// 기본
							var mode = (_tx<0) ? "prev" : "next"
								,index = funcs.computePage(mode);
							
							funcs.vars.index = index;
							lastDegrade = lastDegrade + (degrade*operator);
							
							funcs.sortPageLoad().putPage(index+1, total);
							
							slideStart = false;
							slideStop = true;
						}
						
						opt.func.move.call(parents);	
					//}// end if Math.abs	
				}
			}
			
			,end:function(event){
				//event.preventDefault();
				//event.stopPropagation();
				
				if(slideStop===false){
					lastDegrade = funcs.vars.index * degrade * -1;
					funcs.sortPageLoad().putPage(funcs.vars.index+1, total);
				}
				
				slideStart = false;
				slideStop = true;
				start = 0;
				startY = 0;
				
				parents.opt.func.end.call(parents);	
			}
		});
	}
};



/*****************************************************************************
- form 태그 이미지화 - 페이지 전체 
현재는 input type="checkbox, radio" 만 적용

샘플 html tag :
<input type="checkbox" id="a1" checked="checked" value="a1"/><label for="a1">일반a</label>

사용법 : 
var input = new Input();
input.display();
*****************************************************************************/
function Input(target)
{
	if(!(this instanceof Input)) return new Input();
	
	this.target = "input";
	this.clss = {
		checkbox:"checkbox"
		,checkboxOn:"checkbox_on"
		,radio:"radio"
		,radioOn:"radio_on"
	};
	this.replaceTag = '<button type="button" class="input_replace_tag" title="checkbox"></button>';
	this.escape = "escape_input";																				// class 라면 변환하지 않음
	
	return this;
}

Input.prototype={
	// selector
	setTarget:function(target){
		this.target = target;
		return this;
	}

	// 클래스 지정
	,setClassname:function(object){
		if(!object || (typeof object) !=="object") return this;
		for(var i in object) this.clss[i] = object[i];
		return this;
	}

	// 만들기
	,display:function(){
		//return false;
		var parents = this
			,$inputs = null;
		
		// 부분 교체를 위해 target이 escape되는 것과 같이 씌였다면 그건 변경하는 객체라고 판단
		if(((typeof parents.target)==="string") && parents.target.indexOf(parents.escape)>=0) $inputs = jQuery(parents.target);
		else{
			$inputs = jQuery(parents.target).not("."+parents.escape);
		}
		
		// 나중에 수정하더라도 우선 checkbox, radio로 범위 줄임
		$inputs = $inputs.filter(":radio,:checkbox")
		
		jQuery.each($inputs, function(i, ele){
			var type = (this.type||this.tagName).toLowerCase()||"";
			if(!type) return false;

			if(type in parents) parents[type](this);
		});
		
		return this;
	}
	
	// 재 갱신
	,reload:function(){
		this.removeAll().display();
		return this;
	}

	// 제거
	,removeAll:function(){
		jQuery(this.target).unbind("change").nextAll(".input_replace_tag").remove();
		return this;
	}

	,checked:function(_target){
		var parents = this
			,$checkbox = jQuery(_target)
			,checked = _target.checked
			,$replace = jQuery(parents.replaceTag)
			,type = _target.type
			,clss = ""
			,clssOn = type === "checkbox"?"checkboxOn":"radioOn";
		
		// 체크박스일때,
		if(type === "checkbox"){
			clss = checked===true?this.clss.checkbox+" "+this.clss.checkboxOn:this.clss.checkbox;
		}else if(type === "radio"){
			clss = checked===true?this.clss.radio+" "+this.clss.radioOn:this.clss.radio;
		}
		
		// 교체된 버튼 - IE8은 label로 변경된 input엔 change가 안먹는데 다른걸로 먹인것은 change 이벤트가 먹는다 ㅡㅡ;
		$replace.addClass(clss).click(function(e){
			var _$checkbox = $checkbox.trigger("click");
			if(type == "radio") _$checkbox.trigger("click");			// 라디오 교체된 이미지는 한번 클릭시 잘 안먹어서 꼼수
			(e||window.event).preventDefault();
		});

		// 원래 체크박스
		$checkbox.change(function(){ 
			// 라디오일때는 같은 이름 해제
			if(type === "radio"){
				parents.radioRelease(_target);
				this.checked = true;
			}

			$replace[(this.checked===true?"addClass":"removeClass")](parents.clss[clssOn]);
		}).addClass("blind").after($replace);
	}

	// 체크박스
	,checkbox:function(_target){
		this.checked(_target);
	}

	// 라디오버튼 - 다른거 해제
	,radioRelease:function(_target){
		var name = _target.name;
		if(!name) return false;

		var $form = jQuery(_target).closest("form");
		$form.find("input[name='"+name+"']:radio").not(_target).prop("checked", false).next(".input_replace_tag").removeClass(this.clss.radioOn);
	}

	// 라디오버튼
	,radio:function(_target){
		this.checked(_target);
	}
	
	/**
	 체크/라디오 박스 체크하기/해제하기(커스텀 이미지 된것 or 일반)	 
	 */
	,checkOrRelease:function(target, checked)
	{
		if(!target) return this;
		if(!checked) checked = false;
		$(target).filter(".blind").click()
		.end().not(".blind").prop("checked", checked);
	}
};



/*****************************************************************************
form 태그 이미지화 - 원하는 것만 (전체를 이미지로 만듬)
현재는 input type="checkbox, radio" 만 적용

샘플 html tag :
<input type="radio" id="a1" class="escape_input watermark" checked="checked" value="a1" /><label for="a1">일반a</label>

사용법 : 
var decoInput = new DecoInput();
decoInput.display();

params :
target - 이미지로 변경할 객체
label - <label> 의 class명 : 비동기적으로 처리할때 selector 역할
data - 어떻게 바꿀것인가?
예) [
		{ 
			size:{width:100, height:100}	-> 이미지 크기
			,clss:"watermark1"	-> 평상시 이미지, 클릭또는 선택되었을때 이미지 (선택되었거나 hover는 selected 클래스를 사용. (ex) class="watermark1 selected")
		}
		...
	];
*****************************************************************************/
function DecoInput(target, data)
{
	if(!(this instanceof DecoInput)) return new DecoInput();
	
	if(!target || !data || (typeof data!=="object")) return false;
	
	this.target = target;
	this.$target = null;
	this.data = data;
	
	return this;
}

DecoInput.prototype={
	getTarget:function(){
		if(!this.target) return false;
		
		this.$target = jQuery(this.target).filter(":radio, :checkbox");
		return this;
	}

	// 만들어 내기
	,display:function(){
		var parents = this;
		
		if(!parents.$target) this.getTarget();
		
		var $target = parents.$target.not(".blind")
			,clsses = [];
	
		if($target.length<=0) return false;

		jQuery.each($target, function(i){
			var _this = this
				,$this = jQuery(_this)
				,id = _this.id
				,$input = $this.addClass("blind")
				,$parent = $input.parent()
				,isLabel = $parent.is("label")
				,$label = (isLabel) ? $parent : $input.siblings("label[for='"+id+"']")
				,text = $label.text()
				,data = parents.data[i]||false
				,checked = _this.checked;
			
			if(data){
				var width = data.size.width||0
					,height = data.size.height||0
					,clss = data.clss;
				
				if(width && height && clss){
					$label.attr({"title":text}).css({"width":width+"px", "height":height+"px"}).addClass(clss)[checked?"addClass":"removeClass"]("selected").off("click");
					
					clsses.push(clss);
				}
			}
		});
		
		//clsses.push(parents.target.replace(/\./,""));
		var unique = "."+jQuery.unique(clsses).join(",.").replace(/\s/g,".");
	
		// 클릭 - 무조건 label클릭
		jQuery(document.body).on("click", unique,
										function(){
											var _this = this
												,_for = _this.getAttribute("for")
												,$this = jQuery(_this)
												,$child = $this.children(":checkbox, :radio")
												,hasInput = $child.length>0
												,$input = hasInput?$child:$this.siblings("input[id='"+_for+"']");
											
											$this.addClass("selected").siblings("label").removeClass("selected");
											$input.prop("checked", true);//IE8은 label클릭해도 checkbox,radio의 change,click trigger가 일어나지 않는다;;;
										});
		
		return this;
	}
	
	// 만들어낸거 체크박스 갱신하기
	,reload:function($target){
		var parents = this;
		
		if(!$target){
			if(!parents.$target) this.getTarget();
			$target = parents.$target.filter(".blind");
		}
		
		jQuery.each($target, function(){
			var _this = this
				,$this = jQuery(_this)
				,id = _this.id
				,checked = _this.checked
				,$parent = $this.parent()
				,$label = ($parent.is("label")) ? $parent : $this.siblings("label[for='"+id+"']");
			
			$label[checked?"addClass":"removeClass"]("selected");
		});
		
		return this;
	}
};


/*****************************************************************************
환경설정 - 자동 페이지 만들기
*****************************************************************************/
function Configuration()
{
	if(!(this instanceof Configuration)) return new Configuration();
	
	this.$place = $("#widget_box");													// 뿌릴곳
	this.$nav = $("#nav").find(".adm_nav_child_config");							// 환경설정 메뉴
}

Configuration.prototype = {
	
	// 실행
	exe:function()
	{
		this.getMenus();
	}

	// href
	,makehref:function($obj, clssname)
	{
		var href = $obj.attr("href")
			,clss = ""
			,target = "_blank";
		if(href.indexOf("javascript")==0){
			clss = ' cursor_none text_underline_none ';
			target = "";
		}
		
		if($obj.hasClass("nd")){
			clss += " nd ";
		}
		
		return '<a href="'+href+'" class="'+clss+' '+clssname+'" target="'+target+'">'+$obj.text()+'</a>';
	}
		
	// 메뉴 모우기		메뉴1>메뉴2>메뉴3>메뉴4
	,getMenus:function()
	{
		var $nav = this.$nav
			,dom=[];
		
		for(var i=0,cnt=$nav.length; i<cnt; i++){
			var $adm = $($nav[i])
				,$admA = $adm.children("a")
				,$submenu = $adm.children(".adm_sub_menu").children("li");
			
			dom.push('<li class="w_child">'+this.makehref($admA, 'widget_title'));									// 최상단 메뉴명 (메뉴1) - 이건 감춤 환경설정 메뉴만 보임
			
			var sCnt = $submenu.length;
			
			if(sCnt<=0) continue;
			dom.push('<ul class="no_type w_submenu">');
			for(var j=0; j<sCnt; j++){
				var $sub2 = $($submenu[j])
					,$sub2A = $sub2.children("a")
					,$sub2menu = $sub2.children(".adm_sub_menu2").children("li")
					,borderNone = j==0?" border_none":"";															// 첫번째것은 보더 없앰
				dom.push('<li class="w_submenu_child'+borderNone+'">'+this.makehref($sub2A, 'w_submenu2_link')+'</li>');				// 메뉴2
				
				var s2Cnt = $sub2menu.length;
				if(s2Cnt<=0) continue;
				dom.push('<ul class="no_type w_submenu2">');
				for(var k=0; k<s2Cnt; k++){
					var $sub3 = $($sub2menu[k])
						,$sub3A = $sub3.children("a")
						,$sub3menu = $sub3.children(".adm_sub_menu3").children("li");
					dom.push('<li class="w_submenu2_child">'+this.makehref($sub3A, 'w_submenu3_link')+'</li>');		// 메뉴3
										
					var s3Cnt = $sub3menu.length;
					if(s3Cnt<=0) continue;
					dom.push('<ul class="no_type w_submenu3">');
					for(var l=0; l<s3Cnt; l++){
						var $sub4 = $($sub3menu[l])
							,$sub4A = $sub4.children("a");
						dom.push('<li class="w_submenu3_child">'+this.makehref($sub4A, 'w_submenu4_link')+'</li>');	// 메뉴4
					}// end l
					dom.push('</ul>');
				}// end k
				dom.push('</ul>');
				
			}// end j
			dom.push('</ul>');
			
			dom.push('</li>');
			
		}// end i
		this.$place.append(dom.join("\n"));
	}		
};


/*****************************************************************************
뭔가를 띄워서 위치 시키는 라이브러리 (예, wing banner, 특정위치 배너)
*** 주의 : 배너 태그는 제일 하단(footer.tpl)에 되도록 써주는게 좋음(wing의 모체 객체를 탐색해야 하기 때문에).
*****************************************************************************/
/**
@data : 각 배너에 data-*형태로 설정해둠.
 - data-wing [right|left|empty] (default:empty) : right 컨텐츠 최 오른쪽, left 컨텐츠 최 왼쪽. empty는 아무것도 안쓰는거. 
 - data-type [fix|scroll](default : fix) : fix 그 위치 그대로 있음, scroll 스크롤 따라 움직임.
 - data-start-x (default:0) : 시작위치. left 축. number 형만 가능.  - wing 일때 -10 주면 x 축으로 -10px, 10px 이면 +10px 이동. 안주거나 0 이면 가장자리에 자리잡음.
 - data-start-y (default:0) : 시작위치. top 축. number 형만 가능. - wing 일때 0과 같음.
 - data-width (default:0) : 넓이. 설정되어 있지 않다면, target 객체 측정.
 - data-height (default:0) : 높이. 설정되어 있지 않다면, target 객체 측정.

@sample
 - 오른쪽에 위치한 윙배너
   : scroll 따라 움직이고 오른쪽 윙에 넓이에 따라 위치한 곳에서 -50만큼 더 들어감. 시작 top 위치는 50px 인 동시에 scroll일때는 상단 50px을 항상 유지 한다.
   width, height는 되도록이면 정확히 써준다.
   
예 ::: 
<div class="float_banner" data-wing="right" data-type="scroll" data-start-x="0" data-start-y="50" data-width="450" data-height="304">
	<img src="http://www.kyeongin.com/popupManagerVer2/attach/popup_42.jpg" />
</div>
<script>new FloatLib().call(".float_banner",".container");// 이 메서드는 header.tpl에서 항상 호출되고 있음.</script>
*/
function FloatLib(){
	if(!(this instanceof FloatLib)) return new FloatLib();

	this.target = null;						// 배너객체 selector
	this.$target = null;					// 배너객체 jquery selector
	this.parentTarget = null;			// 부모객체 selector
	this.$parentTarget = null;			// 부모객체 jquery selector
	this.parentInfo = { width:0, top:0, left:0 };	// 부모객체 위치값
	this.$scrolls = [];					// scroll 되는 객체
	
	this.isLoaded = true;				// 첫 로딩인가? resize될때는 실행안되게

	return this;
}

FloatLib.prototype={
	/*
	띄울 target 지정.
	@param
		- target : 배너 객체들
		- parentTarget : 윙배너시 모체가 될 컨텐츠 객체(option)
	*/
	setTarget:function(target,parentTarget){
		this.target = target;
		this.$target = $(target);
		
		if(!parentTarget) return this;

		this.parentTarget = parentTarget;
		this.$parentTarget =$(parentTarget);

		return this;
	}

	// 모체 객체 크기 재어옴
	,getParentInfo:function(){
		var $parentTarget = this.$parentTarget
			,position = $parentTarget.offset();
		if(!$parentTarget || $parentTarget.length<=0) return false;

		this.parentInfo = {
									width:Number($parentTarget.width())
									,top:Number(position.top)
									,left:Number(position.left)
								}
		return this;
	}

	// 옵션 추출
	,getOptions:function($this){
		return {
					wing:$this.attr("data-wing")||""
					,type:$this.attr("data-type")||"fix"
					,startX:Number($this.attr("data-start-x"))||0
					,startY:Number($this.attr("data-start-y"))||0
					,width:Number($this.attr("data-width")||this.$target.width())
					,height:Number($this.attr("data-height")||this.$target.height())
				};
	}

	// 위치 잡음
	,setPosition:function(){
		// parentTarget info 
		if(this.parentTarget)	this.getParentInfo();

		var parents = this
			,parentInfo = parents.parentInfo;

		$.each(this.$target, function(i, ele){
			var $this = $(ele)
				,opt = parents.getOptions($this);

			// 일반
			$this.css({
							"position":(opt.type=="scroll"?"fixed":"absolute")
							,"left":opt.startX+"px"
							,"top":opt.startY+"px"
							,"width":((opt.width||parentInfo.width)+1)+"px"
						});
			if(opt.height) $this.css("height",opt.height+"px");
									
			// 윙 배너일때,
			if(opt.wing=="left" || opt.wing=="right"){
				$this.css({ 
					"top":opt.startY+"px"
					,"left":(parentInfo.left+opt.startX+(opt.wing=="left"?opt.width*-1:parentInfo.width))+"px" 
				});
			}
		
			// scroll 되는 객체
			if(opt.type=="scroll" && opt.startY>0 && parents.isLoaded===true){
				parents.$scrolls.push($this);
			}
		});
	}

	// 실행
	,exe:function(){
		this.setPosition();

		var parents = this
			,$header=null;
		$(window).on({
						resize:function(){ 
											parents.isLoaded = false; // 리사이즈일때 실행안함
											parents.setPosition();
										  }
						,load:function(){ 
											parents.isLoaded = false; // 다른작업없이 위치값만 다시 잡음
											parents.setPosition();

											// float header 가 스크롤시 나타날때 박스 높이 만큼 띄울려고
											$header=$("#float_header");
										  }	
						,scroll:function(){ 
										if(parents.$scrolls.length>0){
											$.each(parents.$scrolls, function(i,ele){
												var $this = $(ele)
													,scrollTop = document.body.scrollTop||document.documentElement.scrollTop
													,startY = Number($this.attr("data-start-y"));
												
												$this.css("top", (scrollTop>=startY?(($header&&$header.height())||0)+"px":(startY-scrollTop)+"px"));											
											});
										}//end if
									  }
					 });
	}

	/*
		단축 메서드
		@param
		 - target : 플로팅할 배너
		 - parentTarget : 만약 wing 배너라면 모체가 될 객체.
	*/
	,call:function(target, parentTarget){
		this.setTarget(target, parentTarget).exe();
	}
};



/*****************************************************************************
캘린더
*****************************************************************************/
var ___LOADED_CSS=false
	,jsCalendar = {
	create:function(){
		this.listVisible = false;	// 하단 행사리스트 보이게 (type boolean)
		this.listNum = 3;			// 하단 리스트 갯수
		this.year = "";
		this.month = "";
		this.date = "";
	
		this.skinClass = "";			// 스킨명, 한화면에 다른 종류의 달력 스킨을 뿌릴때 대비해서
		this.cssUrl = "jsCalendar.css";			// css link			
		this.params = null;						// type json
		this.func = null;							// type funcion
	
		this.target = null;							// 현재 객체
	
		this.markInDays = false;				// 달력내 일정 표시
		this.clicked = false;						// 이전달,다음달 클릭 이벤트
		
		this.configIdxno = "";						// 캘린더 고유번호
	}
};
	
	
jsCalendar.create.prototype = {
	bind:function(evt, obj, func){
		if(obj.addEventListener)	obj.addEventListener(evt, func, false);
		else						obj.attachEvent("on"+evt, func);
		return this;
	},
	
	unbind:function(evt, obj, func){
		if(obj.removeEventListener)	obj.removeEventListener(evt, func, false);
		else									obj.detachEvent("on"+evt, func);
		return this;
	},
	
	// 고유번호
	setConfigIdxno:function(v){
		this.configIdxno=v;
		return this;
	},
	
	// 하단 목록 갯수
	setListNum:function(v){
		this.listNum = v;
		return this;
	},
	
	// 하단 목록 보이나?
	setListVisible:function(v){
		this.listVisible = v;
		return this;
	},
	
	setInitDate:function(y,m,d){
		this.year = y;
		this.month = m;
		this.date = d;
		return this;
	},
	
	setParams:function(params){
		this.params = params;
		return this;
	},
	
	setCssUrl:function(url){
		this.cssUrl = url;
		return this;
	},
	
	setSkinClass:function(skin){
		this.skinClass = skin;
		return this;
	},
		
	setFunction:function(func){
		this.func = func;
		return this;
	},
	
	/*
	달력 日옆에 일정표시
	@params : (boolean)v
	*/
	setMarkInDays:function(v){
		this.markInDays = v;
		return this;
	},
	
	// custom getElementById
	getElementsClassName:function(clss){
		var obj = null
			,result = null;
	
		if(this.target.querySelectorAll){
			obj = this.target.querySelectorAll("."+clss);
			result = obj[0];
		}else{
			throw "IE8 이상만 지원합니다.";
		}
	
		return result;
	},
	
	// 그달의 마지막 날과 1일의 요일
	getMaxDateAndWeek:function(custom, y, m){
		custom.setFullYear(y);
		custom.setMonth(m);					
		custom.setDate(1);
		
		var date = new Date(custom-86400000);	// 그달의 마지막날 .. 여기서 계산이 이상해지는지 매월 1일의 요일을 구하는데는 아래서 한번더 월을 세팅후 다시 불러들여야 함.
	
		//custom.setMonth(m-1);					// 그 달의 첫번째 날의 요일 (안맞음)
	
		return {max:date.getDate(), week:new Date(y, m-1, 1).getDay()};
	},
	
	// 이전달, 다음달
	move:function(mode){
		var prev = new Date(this.year, this.month-1, this.date);
		prev.setMonth(prev.getMonth()+(mode=="prev"?-1:+1));
	
		this.year = prev.getFullYear();
		this.month = prev.getMonth()+1;
		this.date = prev.getDate();
	
		this.display();
	},
	
	// a 태그에서 className 없애기
	removeClass:function(v){
		var a = this.getElementsClassName("js_c_display").querySelectorAll("."+v);
	
		for(var i=0; i<a.length; i++){
			var obj = a[i];
			obj.className = obj.className.replace(v, "");
			
			/*
			var reg = new RegExp(v+"( |$)");
			if(obj.className.match(reg))
				obj.className = obj.className.replace(v, "");
			*/
		}
	},
	
	addClass:function(cls, v){// a 태그에서 className 붙이기
	
		var li = this.getElementsClassName("js_c_display").querySelectorAll("."+cls)
			,$obj = null;
	
		for(var i=0; i<li.length; i++){
			var obj = li[i];
			obj.className = obj.className.replace(v,"") + " "+v;
			$obj = obj.childNodes[0];
	
			/*
			var reg = new RegExp(cls+"( |$)");
			if(obj.className.match(reg)){
				if(obj.tagName.toLowerCase()=="li"){
					obj.className = obj.className + " "+v;
					$obj = obj.childNodes[0];
				}
			}//end if
			*/
		}// end for
	
		return $obj;
	},
	
	ajax:function(url, params, func){
		var REQ;
	
		try{
			REQ = new XMLHttpRequest;
		}catch(e){
			REQ = new ActiveXObject("Msxml2.XMLHTTP");
			if(!REQ) REQ = new ActiveXObject("Microsoft.XMLHTTP");
			if(!REQ){
				alert("호환되지 않는 브라우저 입니다.\n");
				return;
			}
		}
	
		REQ.onreadystatechange = (function(){
											if (REQ.readyState == 4) {
												if (REQ.status == 200) {
													// 외부 함수 실행
													return (function(){
																func(REQ);
															})();
												} else {
													alert("작업중 오류가 발생 했습니다.\n다시 시도해 주세요.");//REQ.statusText
												}
											}
									});	
			 
		REQ.open("GET", url, true);
		REQ.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
		REQ.setRequestHeader("Content-Type","application/json");
		REQ.setRequestHeader("Accept","application/json");
		REQ.send(params);
	},
	
	// array check
	inArrayNumber:function(arr, v){
		if(!arr || !(typeof arr==="object")) return false;
		v = Number(v);
		for(var i=0, cnt=arr.length; i<cnt; i++){
			if(Number(arr[i])===v) return true;
		}
		return false;
	},
	
	// 리스트
	printList:function(data){
		if(!data.year  && !data.month && !data.date) return;		
		//this.getElementsClassName("js_c_display_list").innerHTML="<br /><center style='color:#dbdbdb'>로딩중</center>";
	
		var listNum = this.listNum, parents = this;
		this.ajax(	"/?dummy="+Math.random()+"&mod=calendar&act=axCalView&config_idxno="+this.configIdxno+"&year="+data.year+"&month="+data.month+"&day="+data.date,  
					"", 
					function(v){
						//alert(v.responseText);
	
						var obj = parents.getElementsClassName("js_c_display_list");
						//var json = eval("("+v.response+")"); //JSON.stringify
						var json =JSON.parse(v.responseText);
						
						// data 가 있다면 뿌림
						obj.innerHTML = "";
						if(parseInt(json.result, 10) > 0){
						
							var top = document.createElement("div");		// 상단
							var middle = document.createElement("div");		// 중간 컨텐츠
							var bottom = document.createElement("div");		// 하단
	
							top.className = "js_c_list_top";
							middle.className = "js_c_list_middle";
							bottom.className = "js_c_list_bottom";
							
							// 타이틀
							top.appendChild(document.createTextNode(data.month+lang.monthSubfix+" "+data.date+lang.daySubfix));
							
							// 컨텐츠 a 태그
							var _totalCount = 0;
							for(var i=0; i<json.data.length; i++){
								var list = json.data[i];
								
								if(!parents.inArrayNumber(list.day, data.date) || _totalCount>=listNum) continue;
								
								var a = document.createElement("a");
								a.className = "js_c_list_content_a cal_day";
								a.setAttribute("href", "/?mod=calendar&act=view&config_idxno="+parents.configIdxno+"&idxno="+list.idxno+"&year="+data.year+"&month="+data.month+"&day="+data.date);
																
								var icon = document.createElement("span");
								icon.className = "icon_bullet ib_0_2110";
								icon.style.marginRight = "5px";								
								a.appendChild(icon);
								
								//a.appendChild(document.createTextNode(decodeURIComponent(list.subject)));
								var text = document.createElement("span");
								text.innerHTML = decodeURIComponent(list.subject);
								
								a.appendChild(text);
								middle.appendChild(a);
								
								_totalCount++;
							}
	
							// 검색 결과가 출력결과 보다 많을 경우 more 버튼
							//if(parseInt(json.result, 10) > listNum){
							if(_totalCount>=listNum){
								var a = document.createElement("a");
								a.className = "js_c_list_content_a_more cal_day";
								a.setAttribute("href", "/?mod=calendar&act=list&config_idxno="+parents.configIdxno+"&year="+data.year+"&month="+data.month+"&day="+data.date);
								a.appendChild(document.createTextNode("더보기"));
								middle.appendChild(a);
							}else if(_totalCount<=0){
								middle.appendChild(document.createTextNode("일정이 없습니다."));
							}					
	
							obj.appendChild(top);
							obj.appendChild(middle);
							obj.appendChild(bottom);
	
							parents.contentsVisible(top, middle, bottom);
						}
					}
				 );
	},
	
	// fade
	contentsVisible:function(top, middle, bottom){
		var k = 0;
		var si = setInterval(function(){
								if(k>100) clearTimeout(si);
								else{
									// ie
									top.style.filter="alpha(opacity="+k+")";
									middle.style.filter="alpha(opacity="+k+")";
									bottom.style.filter="alpha(opacity="+k+")";
									
									// etc
									top.style.opacity = k/100;
									middle.style.opacity = k/100;
									bottom.style.opacity = k/100;
								}
								k+=10;
							 }, 50);
	},
	
	clickEvt:function(data){			// 날짜 클릭시
		this.removeClass("js_c_selected_day");
		this.addClass("js_c_h_"+data.date, "js_c_selected_day");
	
		this.date = data.date;			// 가리킨 날짜로 갱신 
	
		// 리스트 보이게 라면
		if(this.listVisible == true)	this.printList(data); 
		else location.href="/?mod=calendar&act=list&config_idxno="+this.configIdxno+"&year="+data.year+"&month="+data.month+"&day="+data.date;	
	},
	
	// 게시물 있는거 볼드처리
	isData:function(maxDay){
		if(!this.year || !this.month) return;
	
		var parents = this
			,markInDays = parents.markInDays;
	
		this.ajax(	"/?dummy="+Math.random()+"&mod=calendar&act=axCalView&config_idxno="+this.configIdxno+"&year="+this.year+"&month="+this.month+"&day="+maxDay, 
					"", 
					function(v){
						var json = JSON.parse(v.responseText);
						if(parseInt(json.result, 10) > 0){
							for(var i=0,_cnt=json.data.length; i<_cnt; i++){
								var dt = json.data[i]
									,days = dt.day;
	
								for(var j=0, _jCnt=days.length; j<_jCnt; j++){
									var clsName = "js_c_h_"+Number(days[j])
										,$obj = parents.addClass(clsName, " js_c_is_data");
	
									//내용을 표시한다면,
									if(markInDays===true && $obj){
										var subject = dt.subject||"";
										if(subject){
											var a = document.createElement("a");
											a.className = "js_c_mark_a";
											a.setAttribute("href", "/?mod=calendar&act=axCalView&config_idxno="+parents.configIdxno+"&year="+parents.year+"&month="+parents.month+"&day="+parents.date+"&idxno="+dt.idxno);
											a.appendChild(document.createTextNode(decodeURIComponent(subject)));
											$obj.parentNode.appendChild(a);
										}
									}
								}//end for _jCnt;
							}//end for
						}//end if
					}//end function
				 );
	
	},
	
	display:function(){
		var parents = this;
	
		this.getElementsClassName("js_c_display").innerHTML = "";
	
		var now = new Date();
		
		if(!this.year) this.year = now.getFullYear();
		if(!this.month) this.month = now.getMonth()+1;
		if(!this.date) this.date = now.getDate();
	
		var custom = this.getMaxDateAndWeek(now, this.year, this.month);
	
		this.getElementsClassName("js_c_year").innerHTML = this.year;
		this.getElementsClassName("js_c_month").innerHTML = this.month;
	
		var week = custom.week				// 1부터 시작하게 끔 (일 1 ~ 토 7)
			,max = custom.max
			,maxLoop = Math.ceil((custom.max+week)/7)*7;//마지막 빈값이라도 채울려면
	
		for(var i=1, j=0; i<=maxLoop; i++){				
			var ul, li, a, txt, funParams;
		
			li = document.createElement("li");
	
			a = document.createElement("a");
			a.setAttribute("href", "javascript:void(0);");
	
			// sunday
			if(i % 7 == 1){
				txt = (i > week) ? j++ : "";		
				ul = document.createElement("ul");
				ul.className = "js_c_date";				
				
				a.className = "cal_sun";// + (this.date==j?" js_c_selected_day":"");
			}else{
				txt = (i > week) ? j++ : "";
				a.className = "cal_day";// + (this.date==j?" js_c_selected_day":"");
			}
	
			// a 태그 이벤트
			if(	j > 0 && j<=max && 
				(typeof this.func == "function")
			  ){
				funParams = {year:this.year, month:this.month, date:j};
				/*
				a.onclick = (function(parent, v){
									return function(){
												parent.func(v);
											};
							})(this, funParams);
				*/
				this.bind("click", a, (function(parent, v){
												return function(){
															parent.func(v);
														};
										})(this, funParams));
			}// end if
			
			li.className = "js_c_h_li js_c_h_"+j + (i%7==1?" js_c_h_first":"") + (i%7==0?" js_c_h_last":"") + (this.date==j?" js_c_selected_day":"");
	
			a.appendChild(document.createTextNode((j<=0||j>max?"　":j))); // 빈값나오는 곳.숫자는 표기안함(1미만, max날 초과한 날짜)
			li.appendChild(a);
	
			ul.appendChild(li);
	
			this.getElementsClassName("js_c_display").appendChild(ul);
		}//end for
	
		// 이전,다음 클릭 이벤트
		var btnPrev = this.getElementsClassName("js_c_pre")
			,btnNext = this.getElementsClassName("js_c_next");
	
		if(this.clicked===false){	// 계속 이벤트가 먹고 removeEventListener 가 안 먹어서 ㅡㅡ;
			this.bind("click", btnPrev, function(){ parents.move("prev"); });		// 추가함
			this.bind("click", btnNext, function(){ parents.move("next"); });
			this.clicked = true;
		}
	
		// 행사 있는거 볼드 처리
		this.isData(custom.max);
	
		// 리스트
		if(this.listVisible == true) this.printList({year:this.year, month:this.month, date:(this.date)});
	
		return this;
	},
	
	print:function(){
		var id = "js_calendar_"+(Math.random()*100)
			//,css = '<link href="'+this.cssUrl+'" rel="stylesheet" type="text/css">'
			$target = document.getElementById("_js_cal_place_"+this.configIdxno)
			,html = '<div id="'+id+'" class="js_calendar '+this.skinClass+'">'
				+	'	<div class="js_calendar_title"></div>'
				+	'	<div class="js_c_bg_top"></div>'
				+	'	<div class="js_c_bg_middle">'
				+	'		<div class="js_c_year_month">'
				+	'			<a href="javascript:void(0);" class="js_c_pre">&lt;</a><span class="js_c_year cal_c"></span><span class="js_c_month cal_b"></span><a href="javascript:void(0);" class="js_c_next">&gt;</a>'
				//+	'			<p class="js_c_month cal_b"><p>'
				+	'		</div>'
				+	'		<ul class="js_c_header">'
				+	'			<li class="js_c_h_li js_c_h_sun js_c_h_first">일</li>'
				+	'			<li class="js_c_h_li js_c_h_mon">월</li>'
				+	'			<li class="js_c_h_li js_c_h_tue">화</li>'
				+	'			<li class="js_c_h_li js_c_h_wed">수</li>'
				+	'			<li class="js_c_h_li js_c_h_thu">목</li>'
				+	'			<li class="js_c_h_li js_c_h_fri">금</li>'
				+	'			<li class="js_c_h_li js_c_h_sat js_c_h_last">토</li>'
				+	'		</ul>'
				+	'		<div class="js_c_display"></div>'
				+	'	</div>'
				+	'	<div class="js_c_bg_bottom"></div>'
				+	'	<div class="js_c_display_list"></div>'
				+	'</div>';
	
		// css는 한곳에 둘거라 한번만 로딩 되게 하려고
		if(___LOADED_CSS===false){
			//html = css+html;
			
			// css 호출
			var css = document.createElement("link");
			css.setAttribute("href", this.cssUrl);
			css.setAttribute("rel", "stylesheet");
			css.setAttribute("type", "text/css");
			document.getElementsByTagName("head")[0].appendChild(css);	
			
			___LOADED_CSS=true;
		}
	
		//document.write(html);
		$target.innerHTML = html;
		this.target = document.getElementById(id);
		return this;
	}
	
	// 실행
	,exe:function(date, idxno, css, skin, num, visiblie)
	{
		var _date = [];
		if(!css) css=IM_DOMAIN+"/css/js_calendar.css";
		if(!num) num=5;
		if(date) _date=date.split("-");
		if(!idxno) return false;
			
		this.setConfigIdxno(idxno)									// 캘린더 번호
		.setCssUrl(css)												// css file
		.setSkinClass(skin||"")										// skin class name
		.setListNum(num)											// 리스트 갯수
		.setListVisible(!!visiblie)									// 리스트 보이나?
		.setInitDate(_date[0],_date[1],_date[2])					// 다른 날짜 부르고 싶다면 호출
		//.setMarkInDays(true)										// 일정 내용 표시?
		.print()													// 데이터 뿌려질 곳 만듬
		.setFunction(this.clickEvt)									// 리스트 보이면  클릭이벤트
		.display();													// 뿌려줌
	}
	
	/**
	 * 메인 html 삽입 - 오늘날짜만 출력
	 * 
	 * @param
	 *  - idxno : 캘린더 코드
	 *  - list  : 리스트 출력할것인가? true or false
	 *  - num   : 리스트 출력 갯수
	 *  - skin  : skin 명
	 */
	,html:function(idxno,list,num,skin){
		if(!idxno) return false;
		if(!num) num=3;
		if(!list) num=false;
		
		this.setConfigIdxno(idxno)									// 캘린더 번호
		.setCssUrl(IM_DOMAIN+"/css/js_calendar.css")
		.setSkinClass(skin||"jc_blue")										// skin class name
		.setListNum(num)											// 리스트 갯수
		.setListVisible(!!list)									// 리스트 보이나?
		.print()													// 데이터 뿌려질 곳 만듬
		.setFunction(this.clickEvt)									// 리스트 보이면  클릭이벤트
		.display();													// 뿌려줌
	}
};


/*****************************************************************************
위젯 - 사용 안하지만 냅둠
@param
 - url : 
*****************************************************************************/
function Widget(url, target, api){
	if(!(this instanceof Widget)) return new Widget();

	this.url = url;
	this.target = target;
	this.api = api||"after";
	
}

Widget.prototype={
	
	isValidate:function(){
		if(!this.url || !this.target) return false;
		return true;
	}

	,exe:function(){
		if(!this.isValidate()) return false;
		var parents = this
			,params = document.cookie.indexOf("template=m")>0 ? mUtil.linkToJson(this.url) : util.linkToJson(this.url);
		
		return $.get("/"
			,params
			,function(data, rst){
				if(rst === "success"){
					var $target = $(parents.target)
						,$append = $target[parents.api](decodeURIComponent(data));
					
					// 관리자일때 복구모드일때, 미리보기창/버튼 높이 조절
					if(location.search.indexOf("&act=recoverBoxPreview")>0){
						var $parent = $append.closest("#edit_recover_box");
						if($parent.length<=0) return false; 
						
						var height = $parent.height();
						$parent.closest("#edit_recover_box_clone").height(height).next("#edit_recover_box_button").css("top",(height+98)+"px");					
					}
				}
			},"html");
	}
	
};

// 간단히 붙이기만 하면 되서...
var wigetLib={
	append:function(){
		var id = ___WIDGET
			,tag = WIDGET_TAG
			,$target = $("#"+id);
		$target.after(decodeURIComponent(tag)||"");
	}
}



/*****************************************************************************
배너/팝업 일반사용자 - 모바일 때문에 이리로 옮김
*****************************************************************************/
var banpop={
	vars:{
		popup:{
			isRelative:false				// 위치를 본문 넓이 기준(true) or 창 넓이 기준(false) : layer 팝업만 적용
			,bodyWidth:0
			,bodyLeft:0
			,screenWidth:0
			,popname:"popup_"
			,width:{ window:[],layer:[] }
			,height:{ window:[],layer:[] }
			,top:{ window:[],layer:[] }
			,left:{ window:[],layer:[] }
			,order:0						// z-index용 순차적
			,view:"normal"					// 일반 : normal or 관리자 : manager
		}
	}	

	// 배너 로드-그냥 만들어둠
	,loadBanner:function(width,height,src,wmode)
	{
		if(!width || !height || !src) return false;
		
		if(!wmode) wmode="window";
		var tag = '<div class="banner_box">'
				+ '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="'+width+'" height="'+height+'">'
	            + '<param name="movie" value="'+src+'">'
	            + '<param name="quality" value="high" /><param name="allowScriptAccess" value="always" />'
	            + '<param name="wmode" value="'+wmode+'" /><param name="allowFullScreen" value="true" />'
	            + '<!--[if !IE]> <-->'
	            + '<object type="application/x-shockwave-flash" data="'+src+'" width="'+width+'" height="'+height+'">'
	            + '<param name="quality" value="high" />'
	            + '<param name="allowScriptAccess" value="always" />'
	            + '<param name="wmode" value="'+wmode+'" />'
	            + '<param name="allowFullScreen" value="true" />'
	            + '<!--> <![endif]-->'
	            + '<p>배너</p>'
	            + '<!--[if !IE]> <-->'
	            + '</object><!-->'
	            + '<![endif]-->'
	            + '</object>'
	            + '</div>';
		document.write(tag);
	}
	
	/**
	 * 배너 효과
	 * 태그 작성 예::: banpop.banner(".banner_event_box");
	 <div class="boder_box banner_event_box" data-type="slide" data-idxno="3" data-speed="0.3">		
		<div class="boder_box beb_box">
			<ul class="no_type beb_ul">
				<li class="beb_li" data-delay="1"><a href=""><img src="http://sample.ndsoftnews.com/template_sian/download.php?idxno=856&file_extension=jpg&filename=Untitled-1.jpg" alt="배너 : 제목" /></a></li>
				<li class="beb_li" data-delay="1"><a href=""><img src="http://sample.ndsoftnews.com/template_sian/download.php?idxno=854&file_extension=jpg&filename=250%B0%E6%B3%B2%B5%B5%B9%CE%BD%C5%B9%AE.jpg" alt="배너 : 제목" /></a></li>
				<li class="beb_li" data-delay="1"><a href=""><img src="http://sample.ndsoftnews.com/template_sian/download.php?idxno=846&file_extension=jpg&filename=330%C6%F7%C5%E4.jpg" alt="배너 : 제목" /></a></li>
				<li class="beb_li" data-delay="1"><a href=""><img src="http://sample.ndsoftnews.com/template_sian/download.php?idxno=848&file_extension=jpg&filename=675_weeklyjournal.jpg" alt="배너 : 제목" /></a></li>
				<li class="beb_li" data-delay="5"><iframe width="640" height="360" src="http://www.youtube.com/embed/dykTgBpgbVs?feature=player_detailpage" frameborder="0" allowfullscreen></iframe></li>
			</ul>
		</div>
		<div class="beb_buttons">
			<button type="button" class="beb_btns beb_btn_prev">뒤로</button>
			<button type="button" class="beb_btns beb_btn_stop">멈춤</button>
			<button type="button" class="beb_btns beb_btn_next">앞으로</button>
		</div>
	 </div>
	 */
	,effect:function()
	{
		var savePrefix = "banner_order_";

		// 배너 넓이 
		function setSizeInfo($this){
			var idxno = $this.attr("data-idxno")
				 ,$ul = $this.find(".beb_ul")
				 ,$li = $ul.find(".beb_li")
				 ,boxWidth = $this.innerWidth()||$this.closest("#float_side_box").width()	// 윙 사이드의 배너일경우 재측정
				 ,liCount = $li.length||0;

			// 관리자 페이지가 아닐때 실제 노출중인 것만 찾음
			if(ADM_DOMAIN.indexOf(location.host)<0){
				$.each($li,function(){
					var $this=$(this), len=$this.find(".banner_box").length;
					if(!len) $this.remove();
				});
				$li = $ul.find(".beb_li");
				liCount = $li.length||0;
			}

			// 부모박스 기준으로 ul 최대 넓이 지정
			$ul.width(boxWidth*liCount);

			// 배너마다 넓이가 다를수 있으니 부모박스 넓이기준으로함
			$li.width(boxWidth);

			return {
						idxno : idxno
						,$ul : $ul
						,$li : $li
						,boxWidth : boxWidth
						,liCount : liCount
					};
		}

		return {
			// 순서대로 하나의 배너만 보임 
			order:function(){
				var _this = this
					,$this = $(_this)
					,$info = setSizeInfo($this)
					,idxno = $info.idxno
					,$li =$info.$li
					,liCount = $info.liCount-1
					,saveKey = savePrefix+idxno
					,order = Number(util.localStorage.getItem(saveKey))||0;

				// 랜덤 선택된것만 보임, 버튼 없앰
				$li.css("display","list-item").not(":eq("+order+")").css("display","none");

				util.localStorage.setItem(saveKey, (order>=liCount ? 0 : order+1));
			}

			// random banner
			,random:function(){
				var _this = this
					,$this = $(_this)
					,$info = setSizeInfo($this)
					,$li =$info.$li
					,liCount = $info.liCount
					,random = Math.floor(Math.random()*liCount);

					// 랜덤 선택된것만 보임, 버튼 없앰
				$li.css("display","list-item").not(":eq("+random+")").css("display","none");
			}
			
			// random 배너 선택후 슬라이드
			,randomSlide:function(){
				banpop.effect()['slide'].call(this, true);
			}

			// slide banner
			// rand true or false
			,slide:function(rand){
				var _this = this
					,$this = $(_this)
					,$info = setSizeInfo($this)
					,$ul = $info.$ul
					,$li =$info.$li.css("display","list-item")
					,$btnBox = $this.find(".beb_buttons")
					,$btnStop = $btnBox.find(".beb_btn_stop")
					,$btnCurrent = null						// 현재 선택된 버튼 prev,next,play,stop of buttons
					,speed = Number(_this.getAttribute("data-speed"))||.3
					,delayInfo = $li.map(function(){ return Number(this.getAttribute("data-delay"))||5; }).get()
					,boxWidth =$info.boxWidth
					,liCount = $info.liCount
					,count = (rand===true?Math.floor(Math.random()*(liCount)):-1)	// 처음부터 +1 하고 시작하기에 -1초기값-random일때는 배너수중 1개
					,delay = null													// 멈춰잇는 시간(초)
					,left = boxWidth												// 움직이는 간격
					,si = null														// setInterval 변수 : animate complete에서 delay로 해결하려 했는데 뭔가 잘 안풀림
					,tmpDelay = null												// next, prev 시 delay 없이 넘김
					,firstBtnClicked = 0;											// prev,next로 이동하는가 - rotate에서 또한번 +,- 하기에 처음만 실행되어야 함

				/**** function //s ****/
				/*
					다음 배너
					@params
					 loop : 반복될것인가
					 mode : + or -
				*/
				function rotate(loop, mode){
					if(!mode) mode="+";
					if(mode==="+") count++;
					else  count--;

					if(count>=liCount || count<=0) count = 0;					// 지연시간 담은 배열찾기 key
					var front = count+1;													// 지연후 움직여야 하는 거리 미리 담아둠
					if(count>=(liCount-1)) front = 0;
					left = boxWidth*front*-1;
					delay = tmpDelay===null?delayInfo[count]:tmpDelay;

					si = setTimeout(function(){
						$ul.animate({ marginLeft:left }
										,speed*1000,
										function(){
											if(loop===false) $btnCurrent.prop("disabled", false);
											tmpDelay = null;
										});//.delay(delay*1000);	
						if(loop!==false) rotate();
					},delay*1000);								
				}

				// stop
				function stop(){
					firstBtnClicked++;

					//$ul.stop(true, false);
					clearTimeout(si);
					tmpDelay=null;
					$btnStop.addClass("beb_btn_start").text("play");
				}

				// restart
				function start(){
					firstBtnClicked = 0;

					count--;
					if(count<=0) count=0;

					tmpDelay=null;
					rotate();

					$btnStop.removeClass("beb_btn_start").text("멈춤");
				}
				
				// 이전
				function prev(){
					stop();

					if(firstBtnClicked===1) count--;			// 처음만 이미 증가된값을 감소시킴
					if(count<=0) count=liCount;

					tmpDelay=0;
					rotate(false,"-");

					$btnCurrent.prop("disabled", true);
				}

				// 이후
				function next(){
					stop();

					if(firstBtnClicked===1) count--;
					if(count>=liCount) count=0;

					tmpDelay=0;
					rotate(false);

					$btnCurrent.prop("disabled", true);
				}
				/**** function //e ****/

				// 처음 배너를 보이지 않는다는 것은 랜덤 배너의 슬라이드라는 것-처음보일배너 설정
				if(count>=0 && rand===true){
					var _boxWidth = boxWidth*(count>=liCount?liCount-1:count)*-1;
					count--;
					$ul.css("margin-left",_boxWidth+"px");
				}
				
				// 실행
				rotate();						
				
				// 버튼보임
				$btnBox.find(".beb_btns").unbind("click")
				.click(function(){
					var $this = $(this);
	
					$btnCurrent = $this;
					if($this.is(".beb_btn_prev")) prev();
					else if($this.is(".beb_btn_next")) next();
					else if($this.is(".beb_btn_stop")){
						if($this.is(".beb_btn_start")) start();
						else stop();
					}
				});

				// mouseover event
				$ul.on({
							mouseenter:stop
							,mouseleave:start
						});
			}
		};
	}
	
	// 배너 append
	,append:function()
	{
		var id = ___BANNER
			,status = bannerStatus
			,time = ___currentTime
			,sTime = startTime
			,eTime = endTime
			,content = decodeURIComponent(bannerContent)
			,title = typeof bannerTitle == "undefined" ? "":decodeURIComponent(bannerTitle)
			,$target = $("#"+id)
			,explain = "\n<br />"+util.timestampToDatetime(sTime).strDateTime.substring(0,16)+"~"+util.timestampToDatetime(eTime).strDateTime.substring(0,16);

		if(!id || $target.length<=0 || $target.attr("data-append")=="true") return false; // 객체가 없거나 시작전일때, 중단
		
		// 예정,종료 배너
		else if(sTime > time || time > eTime || status=="0"){	
			if(location.href.indexOf(ADM_DOMAIN)<0) return false;	// 관리자가 아니라면 종료 메시지 안띄우기
			var adcMsg=""
				,adcClass="";
			if(sTime > time && status!="0"){
				adcMsg = lang.adcLater;
				adcClass = "later";
			}else if(time > eTime || status=="0"){
				adcMsg = lang.adcEnd;
				adcClass = "finish";
			}
			
			$target.attr("data-append","true").after('<div class="align_center banner_finished"><strong class="'+adcClass+'">'+adcMsg+' "'+title+'"</strong>'+explain+'</div>');	// 종료 메시지 띄우고 종료
			bannerTitle="";//초기화
			
			return false;
		}
		
		$target.attr("data-append","true").after(content);
	}
	
	// 외부 배너 append
	,adAppend:function()
	{
		var id = ___AD_BANNER
			,status = bannerStatus
			,adcode = bannerAdCode 
			,content = decodeURIComponent(bannerContent)
			,$target = $("#"+id);
		
		if(!id || status=="0" || $target.length<=0 || ___adBlockList.indexOf(adcode)>=0) return false; // 객체가 없거나 상태가N일때, 광고매체가 차단되었을 경우 중단
		
		$target.after(content);
	}

	// 배너호출
	,banner:function(target)
	{	
		var parents = this
			,$target = !!target.jquery?target:$(target);

		$.each($target, function(i, ele){
			var type = ele.getAttribute("data-type")||"random";
			parents.effect()[type].call(this);
		});
	}
	
	/****** 팝업 띄우기 
	var ___popup = [{},...];
	
	* json 내용 *
		idxno - 팝업 idxno 고유번호 
		title - 팝업의 제목 
		start - 팝업 시작일시
		end - 팝업 종료일시 
		status - 진행상태 (1=진행, 0=종료)
		popup_type - 팝업형태 (layer=레이어, window=윈도우)
		popup_size - auto (사용안함)
		popup_width - 팝업창크기(가로)
		popup_height - 팝업창크기(세로)
		position - auto (사용안함)
		x_position - 창의 x 위치 
		y_position - 창의 y 위치 
		apply_page - 적용페이지 (main, section, list, view 값이 입력 되어있음 , php에서 페이지 구분해서 json으로 만들어 줍니다.) 
		bottom_close - 하단표시 창닫기 출력여부 (Y=출력, N=출력안함)
		bottom_close_expire - **동안 열지않기 (none=사용안함, day=하루동안 열지않기, days=몇일동안 열지않기)
		layer_border - 레이어 팝업인 경우 외곽선 (Y=사용함, N=사용안함)
		layer_move - 레이어 팝업인 경우 드래그 가능 (Y=사용함, N=사용안함)
		layer_scroll - 레이어 팝업인 경우 스크롤 따라다니기 (Y=사용함, N=사용안함)
		layer_close - 레이어 팝업인 경우 닫기 아이콘 (Y=사용함, N=사용안함)
		layer_close_icon - 레이어 팝업인 경우 닫기 아이콘 유형 
		layer_close_position - 레이어 팝업인 경우 닫기 아이콘 출력 위치 (TL-상/좌, TR-상/우, BL-하/좌, BR-하/우)
		window_scroll - 윈도우 팝업인 경우 스크롤 활성화 (Y=사용함, N=사용안함)
		content - 출력 HTML 내용
	*****/
	,float:function(j)
	{
		// json 값
		var current = ___currentTime
			,start = Number(j.start)||0
			,end = Number(j.end)||(new Date().getTime()+100)	// 종료일이 기입되지 않았다면, 현재보다 100씩더해서 계속 늘림 
			,status = j.status||"0";
			
		if(this.vars.popup.view!="manager" && (status=="0" || current < start || (current > end && end!==0))) return false;												// 종료 or 기간이 아니라면 통과
			
		var	parents = this
			,idxno = j.idxno||"0"
			,oriTitle = j.title||""
			,title = decodeURIComponent(j.title)||""
			,popupType = j.popup_type||"window"
			,popupSize = j.popup_size||"auto"
			,popupWidth = Number(j.popup_width)||0
			,popupHeight = (Number(j.popup_height)||0) + 32
			,position = j.position||"auto"
			,xPosition = Number(j.x_position)||0
			,yPosition = Number(j.y_position)||0
			,applyPage = j.apply_page||"main"
			,bottomClose = j.bottom_close||"N"
			,bottomCloseExpire = j.bottom_close_expire||"none"
			,layerBorder = j.layer_border||"N"
			,layerMove = j.layer_move||"N"
			,layerScroll = j.layer_scroll||"N"
			,layerClose = j.layer_close||"N"
			,layerCloseIcon = j.layer_close_icon||""
			,layerClosePosition = j.layer_close_position||"BR"
			,windowScroll = j.window_scroll||"Y"
			,content = decodeURIComponent(j.content)||""
			,popupUrl = j.popup_url||""// + (parents.vars.popup.view=="manager"?"?edit_mode=preview":"")||""
			,top = 0
			,left = 0
			,popname = parents.vars.popup.popname+idxno
			,isRelative = parents.vars.popup.isRelative			// 창기준
			,bodyLeft = parents.vars.popup.bodyLeft||0			// 왼쪽 여백
			,_type = popupType; 								// default: 각자띄움 - 팝업과 레이어가 위치값을 공유하여 차례로 띄울려면 "window" or 공유하지 않고 각자 띄울려면 popupType;
	
		if(bottomClose=="N" && bottomCloseExpire=="none") popupHeight-=32;	// 바닥에 어떤 표시도 없다면 높이 줄임
	
		var type = {		
			calcPosition:function(){
				// x,y 가 0일때는 auto로 간주
				if((xPosition===0 && yPosition===0)/* || position=="auto"*/){
					var maxHeight = util.arrayMaxMin(parents.vars.popup.height[_type],"max")
						,maxTop = util.arrayMaxMin(parents.vars.popup.top[_type],"max")
						,initLeft = popupType=="window"?0:bodyLeft
						,prevWidth = parents.vars.popup.width[_type][parents.vars.popup.width[_type].length-1]||0
						,prevLeft = parents.vars.popup.left[_type][parents.vars.popup.left[_type].length-1]||initLeft;			// 바로 이전 팝업 넓이를 left값으로 정함-window:0, layer:content의 left
		
					left = prevLeft+prevWidth;
					
					// 페이지 넓이보다 자리잡은 left값이 크다면 화면상 한단계 내림
					if(left>parents.vars.popup[popupType=="window"?"screenWidth":"bodyWidth"]){
						top += maxHeight;						
						left = initLeft;
						
						// 다음 단계이니까 초기화 함
						parents.vars.popup.width[_type] = [];
						parents.vars.popup.height[_type] = [];
						parents.vars.popup.top[_type] = [];
						parents.vars.popup.left[_type] = [];
					}else{
						top = (maxTop||0);
					}
					
					// 변화된값 배열에 넣기 위해 조작
					xPosition = left;
					yPosition = top;
					
					// 변수에 담음
					parents.vars.popup.width[_type].push(popupWidth||0);
					parents.vars.popup.height[_type].push(popupHeight||0);
					parents.vars.popup.top[_type].push(yPosition||0);
					parents.vars.popup.left[_type].push(xPosition||0);
										
				}else{
					top = yPosition;
					left = (_type=="layer"&&isRelative?bodyLeft:0)+xPosition;
				}
			}
		
			// 관리자 미리보기시 중앙에
			,setPositionCenter:function(){
				var _width = (document.body.clientWidth/2)-(popupWidth/2)
					,_scrollTop = document.body.scrollTop;
				
				top = _scrollTop + 50;
				left = _width;
			}
			
			// 띄울 페이지 applyPage
			,isApplyPage:function()
			{
				// 관리자 통과
				if(parents.vars.popup.view=="manager") return true;
				
				var params = util.linkToJson(location.search.replace("?",""))
					,mod = params.mod||""
					,act = params.act||""
					,section = params.section||"";
				
				// 메인
				if(((mod=="main" && act=="index" && !section) || (!mod && !act && !section)) && applyPage.indexOf("main")>=0) return true;
				// 섹션
				else if(mod=="main" && act=="index" && section && applyPage.indexOf("section")>=0) return true;
				// 기사 리스트
				else if(mod=="news" && act=="articleList" && applyPage.indexOf("list")>=0) return true;
				// 기사뷰
				else if(mod=="news" && act=="articleView" && applyPage.indexOf("view")>=0) return true;
			}
		
			,window:function(){
				if(this.isApplyPage()!==true) return false;
				
				this.calcPosition(); // 위치 계산

				// msie,edge browser는 창이 약간 더 넓어 줄이나, edge는 322px 이하로는 안 줄어든다 ㅡㅡ;
				window.open(popupUrl, popname, "width="+(util.browser().name=="msie"?popupWidth-6:popupWidth)+",height="+popupHeight+",scrollbars="+(windowScroll=="Y"?"yes":"no")+",resizable=yes,top="+top+",left="+left);
			}
		
			,layer:function(){
				if(this.isApplyPage()!==true) return false;
				
				this.calcPosition(); // 위치 계산
			
				var $content = $(content);	
				
				$content.attr({"id":popname})
				.css({"top":top+"px","left":left+"px","width":popupWidth+"px","height":popupHeight+"px","z-index":parents.vars.popup.order}).addClass("layer_box"+(layerScroll=="Y"?" layer_box_fixed":"")+(layerBorder=="Y"?" layer_box_border":""))
				.find(".popup_close_box").addClass("layer_close_box");
				
				// 드래그 가능
				if(layerMove=="Y") $content.addClass("layer_box_cursor_move").draggable();				
				
				// 창닫기-icon 닫기 버튼은 별개다
				//if(bottomClose=="Y"){	
				var $btnClose = $content.find(".popup_close, .popup_close_map, .popup_icon_close");
				$btnClose.each(function(){
					var _$this = $(this);
					if(_$this.is(".popup_close") && bottomClose=="Y") _$this.text(lang.adcClose);
					else if(_$this.is(".popup_icon_close")) _$this.addClass("layer_position_"+layerClosePosition);						
				});
				
				$btnClose.click(function(){
					parents.evtClose(popupType, idxno);	
					return false;
				});
				//}
				
				// 이미지내 링크가 창닫기 라면
				$content.find("a[href*='javascript:window.close()']").click(function(){
					parents.evtClose(popupType, idxno);	
					return false;
				});
				
				// 하루, 몇일동안 열지 않기
				parents.daysNotOpen(bottomCloseExpire, $content.find(".popup_day_close, .popup_day_close_map"), j);
			
				$content.appendTo(document.body);
				
				// 관리자 미리보기시 중앙에
				if(parents.vars.popup.view=="manager"){
					this.setPositionCenter();	
					$content.removeClass("layer_box_fixed").css({"top":top+"px", "left":left+"px"});
				}
			}				
		};
	
		type[popupType]();		
	}
	
	// 팝업띄우기
	// @ isRelative : true->본문 컨텐츠(#content) 안에서만 위치함, false(default)->브라우저 전체넓이에서 위치함 => layer 팝업만 적용됨
	,popup:function(isRelative)
	{
		//try{
			var parents = this;
			$(window).on("load", function(){
				if(!window.___popup) return ;
				if($.isArray(___popup)===false && ___popup.length>0) return ;
				if(!window.___currentTime) ___currentTime = Math.floor(new Date().getTime()/1000);// 시간이 설정되지 않았다면 js 시간으로 설정함
								
				var $content = $("#content");
				if($content.length<=0) return false;
				parents.vars.popup.isRelative = isRelative||false;
				parents.vars.popup.bodyWidth = $content.innerWidth();
				parents.vars.popup.bodyLeft = $content.offset().left;
				parents.vars.popup.screenWidth = window.screen.width;
				parents.vars.popup.order = 0;							// ___popup.length;	// z-index - 최근것이 위로 할때
				
				window.___popup.reverse();								// 설정한 차례로 띄우기
				for(var i=0,cnt=___popup.length; i<cnt; i++){
					// 쿠키인지 판단후 열기
					var coo = "";
					try{		coo=util.getCookie(parents.vars.popup.popname+___popup[i].idxno); }
					catch(e){	coo=mUtil.getCookie(parents.vars.popup.popname+___popup[i].idxno); }

					if(!coo){
						parents.vars.popup.order++;						// parents.vars.popup.order--; 최근것을 위로 할때
						parents.float(___popup[i]);
					}
				}
			});
		//}catch(e){}		
	}
	
	
	// 창닫기
	,evtClose:function(mode, idxno)
	{
		if(mode=="layer"){
			var layerId = banpop.vars.popup.popname+idxno;
			
			$("#"+layerId).fadeOut("fast", function(){
				$(this).remove();
			});
		}else window.close();
	}
	
	// cookie
	,evtCookieClose:function(name, days)
	{
		try{
			util.setCookie(name, "popup", days);
		}catch(e){
			mUtil.setCookie(name, "popup", days);
		};
	}
	
	// 하루,몇일동안 열지 않기
	,daysNotOpen:function(expire, $btn, p)
	{
		var parents = this
			,idxno = p.idxno
			,isClickedMap = false;
		
		if(expire!="none"){
			if($btn.is(".popup_day_close")){
				// 하루동안
				if(expire=="day"){
					$btn.click(function(){
						parents.evtCookieClose(parents.vars.popup.popname+idxno, "1");
						parents.evtClose(p.popup_type, p.idxno);
						return false;
					})
					// 닫기 태그 안에 암것두 없는 거 찾아 닫기 텍스트 넣어주기
					.not(":has(*)").text(lang.adcDay+" "+lang.adcNotOpen);
				}
				// 몇일동안 daySubfix
				else if(expire=="days"){
					var select = '<select name="days" class="float_left">'
								+'	<option value="1">'+lang.adcDay+'</option>'
								+'	<option value="2">2'+lang.daySubfix+'</option>'
								+'	<option value="3">3'+lang.daySubfix+'</option>'
								+'	<option value="4">4'+lang.daySubfix+'</option>'
								+'	<option value="5">5'+lang.daySubfix+'</option>'
								+'	<option value="6">6'+lang.daySubfix+'</option>'
								+'	<option value="7">7'+lang.daySubfix+'</option>'
								+'</select>';
					$btn.not(":has(*)").before(select).text(lang.adcNotOpen).click(function(){
						var $this = $(this)
							,days = $this.prev("select").val();
						
						parents.evtCookieClose(parents.vars.popup.popname+idxno, days);
						parents.evtClose(p.popup_type, p.idxno);
						return false;
					});					
				}
			}else{
				// 이미지맵일때, 하루동안 열지않기
				$btn.click(function(){
					parents.evtCookieClose(parents.vars.popup.popname+idxno, "1");
					parents.evtClose(p.popup_type, p.idxno);	
					return false;
				});	
				
				isClickedMap = true;
			}
		}
		
		// expire 값이랑 관계없이 이미지맵을 찾아 처리
		if(isClickedMap===false && $btn.is(".popup_day_close_map")){
			// 이미지맵일때, 하루동안 열지않기
			$btn.click(function(){
				parents.evtCookieClose(parents.vars.popup.popname+idxno, "1");
				parents.evtClose(p.popup_type, p.idxno);	
				return false;
			});	
		}
	}
	
	// window popup control
	,popupControl:function()
	{
		if(!___popup) return ;
		if((typeof ___popup)!=="object") return ;
		
		var parents = this
			,p = ___popup		
			,title = decodeURIComponent(p.title)||"" 
			,popupType = p.popup_type||"window"
			,bottomClose = p.bottom_close||"Y"
			,bottomCloseExpire = p.bottom_close_expire||"day"	// : day,days,none
			,$btnClose = $(".popup_close, .popup_close_map, .popup_icon_close")
			,$btnDayClose = $(".popup_day_close, .popup_day_close_map");
		
		if(popupType!="window") return ;
		
		// 윈도우 바 타이틀 교체
		document.title = title;
	
		// 창닫기
		if(bottomClose=="Y"){
			$btnClose.each(function(){
				var _$this = $(this);
				if(_$this.is(".popup_close")) _$this.text(lang.adcClose);
			});
			
			$btnClose.click(function(){
				parents.evtClose(p.popup_type, p.idxno);	
				return false;
			});
		}
		
		// 하루, 몇일동안 열지 않기
		this.daysNotOpen(bottomCloseExpire, $btnDayClose, p);
		
	}

	/*
	로딩형 스크립트 일때.
	예:::구글 애드센스 등
	*/
	,appendLoadScriptType:function(ad){
		var isLoadScript = (ad.match(/<script.*src=/igm)||"").length>0; // 로딩형 스크립트 소스인가?
		if(!isLoadScript || !ad) return '';

		var $ad = $(ad)
			,$script = $ad.find("script")
			,script = $script.map(function(){return this.src;}).get()
			,slen = script.length
			,$target=$("#"+$ad.attr("id"));	
		
		if($target.length<=0){
			// script를 둘러싼 id 객체
			console.log("target id를 지정하여 주세요!");
			return false;
		}

		$script.remove();
		if(slen>0){
			for(var i=0;i<slen;i++){
				var iframe = document.createElement('iframe');
				iframe.id = "__ad_fram_"+Math.floor((Math.random() * 100))+"__";
				iframe.frameBorder="0";
				iframe.width="100%";
				iframe.height="100%";
				iframe.scrolling="no";
				iframe.marginWidth="0";
				iframe.marginHeight="0";
				//iframe.src="javascript:document.write('<script>document.domain=\"cctoday.co.kr\"\x3C/script>')";
				$target.append(iframe);	
			
				try{
					var doc = (iframe.contentDocument||iframe.contentWindow);
					if(doc.document) doc=doc.document;
					
					doc.open();
					doc.write('<script src="'+script[i]+'">\x3C/script>');
					doc.close();
				}catch(e){
					//var doc = iframe.document;
					//var doc = iframe.contentWindow.document;
					//IE10이하에서 a	ccess deny 가 나옴;;; 해결책 찾을때까지 영역을 없앰
					$target.remove();				
				}//end try
			}
		}//end if
	}

	/* 본문에 오른쪽등에 붙이기
	@param ad - rawurlencode string
	ex) 일반적인거.
		banpop.appendBanner("<?php echo rawurlencode('<div style=\'float:right;width:200px;\'>광고소스</div>')?>");
		
		스크립트 링크이고, 광고제어 사용시
		var ___RIGHTBAN = "{rawurlencode('<div id=\'__ad_right__\' class=\'not_print\' style=\'float:right;width:250px;\'>')}"
						+ "{rawurlencode({$adLoader->getAd(10)})}"
						+ "{rawurlencode('</div>')}";	
	*/
	,appendBanner:function(ad, target, max){	
		if(!ad) return false;
		if(!target) target = "#arl_view_content";
		if(!max) max = 200;
	
		var $articleBody = $(target)
			,content = $articleBody.html().toLowerCase()
			,indexT = content.indexOf("<table ")
			,indexI = content.indexOf("<iframe ")
			,index = 0
			,ad = decodeURIComponent(ad);
		
		if(indexT>=0 && indexI>=0)	index = [indexT,indexI].sort(function(a,b){return a-b})[0];		 // 둘다 값이 있다면 제일 작은쪽
		else if(indexT<0 && indexI<0) index = 0;																	 // 둘다 없다면 0
		else index = (indexT>=0?indexT:indexI);																	 // 둘중에 하나 값이 있다면 있는 놈이 값
	
		if(index>max || index<=0){
			$articleBody.prepend(ad);
		}else{
			var $table = $articleBody.find("table,iframe").eq(0);
			$table.after(ad);
		}
		
		// 로딩형 스크립트 소스라면,
		this.appendLoadScriptType(ad);		
	}

	/*
	가운데 단락에 배치
	@param
	 - ad : 광고소스
	 - target : 기사 영역
	 - position : 어느단락 center(본문중앙정도) | number (단락수)
	 - align : 광고 배치 left | center | right
	 - close : default false , true -> close btn

	 	스크립트 링크이고, 광고제어 사용시
			var ___BAN___ = "{rawurlencode({$adLoader->getAd(10)})}";	
			banpop.appendBanInArlPosition(___POS_BAN___, "#m_a_content", "center", "right", true);
			-본문내 사진이 있고 close => true라면 absolute가 됨
	*/
	,appendBanInArlPosition:function(ad, target, position, align, close){
		if(!ad) return false;
		if(!target) return false;
		if(!position) position="center";
		if(!align) align="right";
		if(!close) close=false;
		if(position!="center"){
			if(String(position).match(/^\d+$/gi)) position=Number(position); 
		}

		var parents = this
			,$target = $(target)
			,text = $target.html().replace(/^\s+|\s+$|\n/g,"")
			,articleType = $target.attr("data-article-type")
			,pm = (text.indexOf("<img ")>=0 || text.indexOf("<iframe ")>=0) // 사진,영상 있는가?
			,max = pm?500 : 200 // 글자수가 넘지 않으면 이미지 기사로 간주
			,pmpos = ""			// 사진있을때는 float
			,pmright = 0;		// 사진있을때 right위치

		if(articleType==="P" || text.length<max) return false;
	
		if(pm && close) pmpos = "float";	// 사진이 있다면 - 닫기버튼이 나오게 된다면

		var match = text.match(/<br>|<\/div>|<p>/img);		// 매칭된것이 없다면 화보형태라고 봄
		if(!match) return false;

		var len = match.length
			//,half = len-(position=="center"?Math.floor(len/2):(position>=len?1:len-position))
			,half = (position=="center"?Math.floor(len/2):position)
			,finder = match[0]
			,$br = $target.find("br,div,p").eq(half);

		if($br.length<=0) return false;

		// float는 무조건 x 닫기 버튼 활성화
		var $htmlBox = $('<div class="not_print banner_article_inner_box '+align+' '+(close||(pmpos=="float")?'close':'')+' '+pmpos+'">'+decodeURIComponent(ad)+'<button type="button" class="baib_btn_close" title="'+lang.close+'">'+lang.close+'</button></div>');
		if(close||pm) $htmlBox.find(".baib_btn_close").click(function(){ $htmlBox.fadeOut(); });
		setTimeout(function(){ 
			$br.before($htmlBox); 
			
			// 로딩형 스크립트 소스라면,
			parents.appendLoadScriptType(ad);		
			
			// 본문내 사진이 있다면
			if(pmpos=="float") $htmlBox.css("left", $target.position().left+($target.width()-$htmlBox.width())+"px"); 
		}, 0);
	}
};


/*****************************************************************************
가로로 움직이는 갤러리
*****************************************************************************/
/*
- 가로로 움직이는 갤러리
@params : 옵션이며 없다면 기본값으로 적용됨
	target : 움직일 부모 객체 (css selector default : .vertical_motion)
	mover : 마우스오버할 target 의 '자식' 객체 (css selector default : .vm_list)

@html data-* : 옵션이며 없다면 기본값으로 적용됨
	data-min : 최소넓이값(string numberic type default : "130") 
	data-motion-auto : 자동으로 움직일것인가? (string default : "true" ... or "false") 
	data-delay : 모션후 멈춤 시간 (string numberic type default : "3" per second)
	data-speed : 모션 동작 속도 (numberic type defalut : "200" pe millisecond)
	data-start-index : 몇번째 박스부터 시작 할 것인가?(numberic type default : 0) - 0부터 시작함

@sample
ul.vertical_motion, li.vm_list 의 타겟 class 는 기본으로 세팅되어 있으며 다른 것으로 하고 싶다면 
vm.setTarget("option1","option2") 또는 verticalMotion("option1","option2").exe()로 정의함.

<style>
.vertical_motion{margin:0;padding:0;list-style:none;}
.vertical_motion .vm_list{float:left;margin-right:5px;overflow:hidden;}	
.vertical_motion .vm_list img{vertical-align:middle}
.vertical_motion .vm_list.last{margin-right:0}
</style>
<ul class="height_auto vertical_motion" data-min="130" data-motion-auto="true" data-delay="3" data-speed="200" data-start-index="0">
	<li class="vm_list">1번째 박스</li>
	<li class="vm_list">2번째 박스</li>
	<li class="vm_list">3번째 박스</li>
	<li class="vm_list">4번째 박스</li>
</ul>

// verticalMotion().exe();
var vm = new verticalMotion();
vm.exe();		// 실행
vm.setTarget(".vertical_motion2", ".vm_list2");		// 실행 2

*/
function verticalMotion(target, mover){
	if(!(this instanceof verticalMotion)) return new verticalMotion();
	
	this.target = target||".vertical_motion";
	this.$target = null;
	this.mover = mover||".vm_list";
	this.$mover = null;
	
	this.vars={
		rmargin:0
		,fwidth:null
		,min:130
		,mauto:true
		,delay:1
		,speed:200
		,index:0
		,si:{}
	};
	
	return this;
}

verticalMotion.prototype={
	// 스크립트로 옵션설정
	set:function(key, val){
		this.vars[key] = val;
		return this;
	}
	
	// 타겟 새로 세팅
	,setTarget:function(target, mover){
		if(!target) return this;
		this.target = target;
	
		if(mover) this.mover = mover;
	
		return this.exe();
	}
	
	// 움직임
	,motion:function(opts, current){
		opts.$mover.stop().animate({"width":opts.min+"px"}, opts.speed).removeClass("on").filter(current).stop().animate({"width":opts.max+"px"}, opts.speed).addClass("on");
	
		return this;
	}
	
	// 자동			
	,autoMotion:function(opts){
		var parents=this;
		parents.vars.si[opts.rand]=setInterval(function(){ 
							parents.motion(opts, opts.$mover.eq(opts.index));
							opts.index++;
							if(opts.index>=opts.len) opts.index=0;
						}, opts.delay);
	
		return this;
	 }
	
	// 해당 모션의 옵션 가져오기
	,exe:function(){			
		var parents = this
			,vars = parents.vars
			,$targets = $(parents.target);
	
		if($targets.length<=0) return false;
		$.each($targets, function(i, ele){
										var $target = $(ele)
											,$mover = $target.find(parents.mover)
											,opts={
														$target:$target
														,$mover:$mover
														,rmargin : Number($mover.eq(0).css("margin-right").replace("px",""))||vars.rmargin
														,fwidth : Number($target.innerWidth()||($target.parent().innerWidth())) // 값이 없다면 부모객체의 넓이가 기준이 됨
														,min : Number($target.attr("data-min"))||vars.min
														,mauto : $target.attr("data-motion-auto") ? $target.attr("data-motion-auto")=="true" : vars.mauto
														,delay : (Number($target.attr("data-delay"))||vars.delay)*1000
														,speed : (Number($target.attr("data-speed"))||vars.speed)
														,index : (Number($target.attr("data-start-index"))||vars.index)
														,rand:"r_"+Math.round(Math.random()*1000)
														,max: Number($target.attr("data-max"))||0
														,len:null
													};
	
										parents.setDisplay(opts);
									});
	
		return this;
	}
	
	// 옵션에 따라 객체 자리잡음
	,setDisplay:function(opts){
		if(!opts.$target || !opts.$mover){
			alert("이벤트를 처리할 타겟을 지정해 주세요.");
			return this;
		}
	
		var parents = this 
			,len = opts.$mover.length
			,min = opts.min
			,lenm = len-1
			,max = opts.fwidth-(((lenm)*min) + (opts.rmargin*lenm))
			,si = null;
		if(!max||max<=0) max=opts.max;		// 임시방편 : display=none일때 값을 못 가져옴

		opts.max=max;
		opts.len = len;
		opts.$mover.css("width",min+"px").eq(opts.index).css("width", max+"px").addClass("on").end().last().addClass("last")
		.end().off().on({
							mouseenter:function(){
								if(parents.vars.si[opts.rand]) clearInterval(parents.vars.si[opts.rand]);
	
								opts.index=opts.$mover.index(this);
								parents.motion(opts, this);
							}
							,mouseleave:function(){
								if(opts.mauto===true) parents.autoMotion(opts);
							}
						});
		
		if(opts.mauto===true) parents.autoMotion(opts);	// motion auto라면
		//if(opts.index>0) parents.motion(opts, opts.$mover.eq(opts.index)); // start-index 가 있다면
		return this;
	}
};



/*****************************************************************************
폼 유효성 검사
*****************************************************************************/
//$ = jQuery.noConflict();
/*
 * 2012.08.02
 * formValidate 
 */
var formValidate = function(v, r){
	this.selector = null;
	this.required = null;
	this.clickedBtn = false; //submit 버튼을 클릭했나?
	this.checkTags=new Array("text", "select", "radio", "checkbox", "textarea", "color", "date", "datetime", "datetime-local", "email", "file", "hidden", "month", "number", "password", "range", "search", "tel", "time", "url", "week");
	this.langString = {
						require:"필수",
						sentence:"필수 항목입니다."
					  };
};

formValidate.prototype={
	/*
		f (form id : jquery형식또는 아이디명만도 가능),
		r (필수요소+메시지) : 
			name : 검사할 폼 이름
			msg : 에러 메시지
			kind : validate 할 종류
					(	
						companyNum:사업자번호
						identify:주민번호, 
						telephone:전화번호, 
						number:숫자만, 
						alphabet:알파벳만, 
						korean:한글만, 
						num-alp:영문숫자만, 
						email:이메일, 
						zipcode:우편번호(000-000), 
						url:http:주소, 
						over-숫자:숫자의 글자수 이상, 
						under-숫자:숫자의 글자수 이하
						date : 날짜형식 (0000-00-00)
						datetime : 날짜+시간 (0000-00-00 00:00)
						num-alp-32:대영문+소영문+숫자 8~32자
						blank : 있나 없나만 체크
					)
			* 검사할 폼 이름이 여러개 필드가 한개의 항목일경우 쉼표로 구분해 표시 (예) 주민번호일경우 ident1,ident2 ... 전화번호 tel1,tel2,tel3  -> 중간 끊음 표시는 '-'로 통일된다
			* 검사조건(kind)은 array형태로 여러개 지정 가능('number,over-5,under-15' : 쉼표로 구분) : 숫자이면서 5글자 이상 15글자 이하면 ok
	*/
	setVariables:function(f, r)
	{
		if (typeof r != "object" || !r)
		{
			alert("필수요소는 [{name:\"폼이름1,폼이름2\", kind:\"검사조건1,검사조건2\", msg:\"메시지\"},{}....] 형태로 전달해 주세요.");
			return false;
		}

		this.tags = "input, select, textarea";
		this.selector = !f.jquery ? $("#"+f) : f;
		this.required = r;

		return true;
	},

	//해당 객체의 조건 가져오기 *** 폼여러개가 한항목일경우 처리 미흡
	search:function(n)
	{ //태그 name
		var t = n.split(",");
		var rtn = [];
		var parent = this;
		$.each(t, 
				function(idx, vals)
				{			
					rtn.push($('[name="'+vals+'"]', parent.selector));
				});

		return rtn;
	},

	//submit button click
	checked:function()
	{
		var rtn = 0;//결과값
		var parent = this;
		$.each(this.required, 
				function(idx, vals)
				{
					var tmp = String(vals.kind).toLowerCase().split(",");						
					
					for(var i=0; i<tmp.length; i++)
					{
						var k = $.trim(tmp[i]);
						if (k)
						{
							var obj = parent.search(vals.name);
							if (!parent.allocTerm(k, vals, obj[0]))
							{
								rtn++;
								return false;
							}
						}
					}
				});
		return (rtn>0?false:true);
	},

	//실시간 체크
	checkedSameElement:function(ele)
	{
		var parent = this;
		$.each(this.required, 
				function(idx, vals)
				{
					if (vals.name==ele.name)
					{
						var tmp = String(vals.kind).toLowerCase().split(",");						
						
						for (var i=0; i<tmp.length; i++)
						{
							var k = $.trim(tmp[i]);
							if (k)
							{
								var obj = parent.search(vals.name);
								if (!parent.allocTerm(k, vals, obj)) return false;
								else $("#validate_form_layer").remove();
							}
						}
					}
				});
	},

	//검사할 조건 분배
	allocTerm:function(k, term, obj)
	{
		switch(k)
		{								
			case "identify"://주민번호
				return this.checkIdent(term, obj);

			case "company_num":		//사업자번호
			case "telephone":		//전화번호
			case "number":			//숫자만
			case "alphabet":		//알파벳만
			case "korean":			//한글만
			case "num-alp":			//영문숫자만
			case "email":			//이메일
			case "zipcode":			//우편번호
			case "url":				//http 주소
			case "date":				//날짜
			case "datetime":		//날짜 + 일시
			case 'num-alp-32':		// 대영문+소영문+숫자 8~32자
				return this.checkValues(term, obj, k);
								
			case "blank":	//공백인가
			default:
				var num = null;
				if(k.indexOf("over")>=0)
				{			//글자수 이상
					num = parseInt(k.replace("over-",""));
					return this.strlenLimit(term, obj, 'over', num);

				}
				else if(k.indexOf("under")>=0)
				{	//글자수 이하
					num = parseInt(k.replace("under-",""));
					return this.strlenLimit(term, obj, 'under', num);

				}
				else								//비어있나
					return this.checkDefault(term, obj);
		}
		return true;
	},


	//=========================조건체크=========================//		
	//글자수
	strlenLimit:function(term, obj, m, num)
	{
		var val = this.isBlank(term, obj);
		if(!val || val===false) return this.alert(term, obj);
		else{
			if (m=="over")
			{
				if(parseInt(num) > $.trim(val).length)	return this.alert(term, obj);
				else									return true;
			}
			else
			{
				if (parseInt(num) < $.trim(val).length)	return this.alert(term, obj);
				else									return true;
			}
		}
	},

	//주민번호
	checkIdent:function(term, obj)
	{
		// check JuminNumber-type and sex_digit 
		// http://nom3203.egloos.com/2400685
		var jumin = this.isBlank(term, obj);
		if(jumin===false || jumin=="") return this.alert(term, obj);

		fmt = /^\d{6}-[1234]\d{6}$/;
		if (!fmt.test(jumin)) return this.alert(term, obj);
		
		// check date-type
		birthYear = (jumin.charAt(7) <= "2") ? "19" : "20";
		birthYear += jumin.substr(0, 2);
		birthMonth = jumin.substr(2, 2) - 1;
		birthDate = jumin.substr(4, 2);
		birth = new Date(birthYear, birthMonth, birthDate);

		if ( birth.getYear() % 100 != jumin.substr(0, 2) ||
		birth.getMonth() != birthMonth ||
		birth.getDate() != birthDate) {
			return this.alert(term, obj);
		}
		
		// Check Sum code
		buf = new Array(13);
		for (i = 0; i < 6; i++) buf[i] = parseInt(jumin.charAt(i));
		for (i = 6; i < 13; i++) buf[i] = parseInt(jumin.charAt(i + 1));

		multipliers = [2,3,4,5,6,7,8,9,2,3,4,5];
		for (i = 0, sum = 0; i < 12; i++) sum += (buf[i] *= multipliers[i]);

		if ((11 - (sum % 11)) % 10 != buf[12])  return this.alert(term, obj);

		return true;
	},

	//체크
	checkValues:function(term, obj, reg)
	{
		var v = '';
		switch(reg)
		{
			case 'company_num':	v = /^[0-9]{3}\-[0-9]{2}\-[0-9]{5}$/ig; break;//사업자번호
			case 'number':		v = /^[0-9]+$/ig; break;				//숫자만
			case 'alphabet':	v = /^[a-z\s]+$/ig; break;				//알파벳
			case 'korean':		v = /^[ㄱ-ㅎ가-힣\s]+$/ig; break;		//한글
			//case 'num-alp':		v = /^\w*$/ig; break;					//숫자+영문
			case 'num-alp':		v = /[0-9a-zA-Z\{\}\[\]\/?.,;:|\)*~`!^\-_+&lt;&gt;@\#$%&amp;\\\=\(\'\"]/ig; break;		//숫자+영문+특수문자
			case 'telephone':	v = /^[0-9]{2,3}\-[0-9]{3,4}\-[0-9]{4}$/ig; break;					//전화번호
			case 'email':		v = /^[\w\~\-\.]+\@[\w\~\-]+(\.[\w\~\-]+)+\s*$/ig; break;					//이메일
			//case 'zipcode':	v = /^[0-9]{3}\-[0-9]{3}$/ig; break;					//우편번호
			case 'zipcode':	v = /^[0-9]{5}$/ig; break;					//우편번호
			case 'url':			v = /^http\:\/\/./ig; break;					//url
			case 'date':		v = /^\d{4}\-\d{2}\-\d{2}/ig; break;		//날짜
			case 'datetime':		v = /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}$/ig; break;		//날짜+시간
			//case 'num-alp-32':	v = /^.*(?=^.{8,32}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/; break; // 대영문+소영문+숫자 8~32자
			case 'num-alp-32':	v = /^.*(?=^.{8,32}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[`~\!@#\$%\^\&\*\(\)_\-\+\=\|\{\}\[\]\?\.,]).*$/i; break; // 영문+특문+숫자 8~32자
		}

		var val = this.isBlank(term, obj);
		if(val===false || v=="") return this.alert(term, obj);
		else
		{
			if(!val.match(v)) return this.alert(term, obj);
			else return true;
		}
	},

	//defaulut
	checkDefault:function(term, obj)
	{
		if(this.isBlank(term, obj)===false){
			return this.alert(term, obj);
		}
		return true;
	},

	//공백인가? 아니면 값 가져오기 *** 폼여러개가 한항목일경우 처리 미흡
	isBlank:function(term, obj)
	{	
		var val = [];
		var parent = this;
		var rtn = true;
		obj = $(obj);
		
		var types = String(obj.attr("type")).toLowerCase()||"";
		if(types=="checkbox" || types=="radio")
		{
			rtn = false;
			$.each(obj, function(idx, vals)
							   {
									if($(vals).attr("checked")=="checked")
									{
										val.push(parent.getValue(vals));
										rtn = true;
										//return false;
									}
							   });
		}
		else
		{
			$.each(obj, function(idx, vals)
				{
					var tmp = parent.getValue(vals);
					if(tmp)	val.push($.trim(tmp));
					else{
						rtn = false;
						return false;
					}
				 });
		}

		val = val.join("-");
		if(val=="" || rtn===false) return false;			
		return val;
	},

	//메시지 출력
	alert:function(term, obj)
	{
		var target = obj[0];
		var msg = term.msg;
	
		if(!msg){
			try
			{
				msg = "["+this.langString.require+"] "+(obj.attr("title")||$("label[for='"+(obj.attr("id"))+"']").text());
			}
			catch(e)
			{
				msg = this.langString.sentence;
			}
		}
		
		//빈공란 찾기
		$.each(obj, function(idx, vals)
						{
							if($(this).val()=="")
							{
								target = vals;
								return false;
							}
						});
		
		//버튼 클릭했다면...
		if(this.clickedBtn==true) alert(msg);
		try
		{
			//포커스 아웃일때 msg
			if(this.clickedBtn==true)	target.focus();
			else						this.printNotValidate(target, msg);
			
			//포커스로 표현하기 위해 무조건 원상태로 돌려놓음
			this.clickedBtn = false; 
		}catch(e){}
		return false;
	},

	getValue:function(obj)
	{
		obj = $(obj);
		var rtn = false;
		var type = String(this.typeOfInput(obj)).toLowerCase();
		if(type=="checkbox" || type=="radio"){
			obj.each(function()
								{
									if ($(this).attr("checked")=="checked" || $(this).attr("checked")==true)
									{
										rtn = $(this).val();
										return false;
									}
							   });
			return rtn;
		}else{
			// 전화번호와 같이 2개이상의 필드로 구성되었을떄...
			if(obj.size()>1)
			{
				var result = [];
				$.each(obj, function(idx, ele)
				{
					result.push(ele.value);
				});
				return result.join("-");
			}else return obj.val();
		}
	},

	//checkbox,radio 등 구분해야;;;
	typeOfInput:function(obj)
	{
		obj = $(obj).attr("type");
		//return String(obj.attr("type")).toLowerCase()=="input"?obj.attr("type"):false;
		return $.inArray(String(obj).toLowerCase(), this.checkTags)>=0 ? obj: false;
	},

	//레이어로 표시
	printNotValidate:function(target, msg)
	{
		var obj = target.length>1 ? target[target.length-1] : target[0];
		$("#validate_form_layer").remove();

		var pos = $(obj).position();
		$(document.body).append($('<div id="validate_form_layer"><span>'+msg+'</span></div>'));
		$("#validate_form_layer").css(	{
										 "position":"absolute",
										 "padding":".5em 1em .3em",
										 "border":"none",
										 "top":(pos.top-3)+"px",
										 "color":"#fff",
										 "font-family":"dotum",
										 "font-size":"11px",
										 "left":($(obj).width()+pos.left+15)+"px",
										 "background-color":"#78787f",
										 "box-shadow":"0 2px 2px #000",
										 "white-space":"nowrap",
										 "cursor":"pointer"
										 })
										 .attr("title","close")
										 .click(function()
												 	{
											 			$(this).remove();
												 	});
	}
	
	// 폼 필수 값 빼오기
	,getFormRequireObject:function(formName)
	{
		var result = [];
		var $form = $(formName);
		var requireElements = "input[name!='checkbox'][name!='radio'][required='required'], select[required='required'], textarea[required='required']";	
		
		$(requireElements, $form).each(function(idx, ele)
				{
					var obj = {};
						
					obj.name = ele.name;
					obj.msg = "";
					obj.kind = "blank";
					result.push(obj);				
				});
		return result;				
	}
	
	// db에서 빼온 정보로 form validate조건 만듬.
	,makeJsonValidateForm:function(form, json)
	{
		if(json.length <= 0) return new Array();
		
		var formRequire = ["user_email","tel[]", "zipcode[]"];
		var result = [];		
		var exists = []; // 여따 따로 만들어서 존재 여부만 판별
		
		$(json).each(function(idx, ele)
		{
			if($.inArray(ele.element, exists)<0)
			{
					// 해당 폼에 있는 것만 체크하기 
					if($("[name='"+ele.element+"']", "#"+form).size()>0)
					{
						var obj = {};					
						obj.name = ele.element;
						
						// 문구
						switch(ele.validate){
							case "num-alp-32": obj.msg = lang.validRequirePasswordMixRegexp; break;
							default: obj.msg = ($.inArray(ele.element, formRequire)>=0)?lang.mbrRequireFormValidate:""; break;
						}
						
						obj.kind = (ele.element=="tel[]"||ele.element=="mobile[]" ? "telephone" : (ele.element=="zipcode[]")?"zipcode":
																											  (util.validateOpt[ele.validate]||ele.validate)); // 속한게 없다면 그냥 그대로 출력
						result.push(obj);
						exists.push(ele.element);
					}
			}
		});
		exists = null;
		return result; 
	}
};

/*
  		사용법
  		- msg 값이 없다면 label 값을 읽어 드리고 그래도 없다면 "필수 항목입니다" 만 출력
  		var validate = new formValidate();
  		validate.langString.require="{$lang.valid_required}";
  		validate.langString.sentence="{$lang.valid_required_sentence}";
		var validateTerm =	[						
								{name:"user_id",msg:"[필수] 아이디-5자이상,영문만허용", kind:"over-5,alphabet"},
								{name:"company",msg:"[필수] 회사명-5자이하", kind:"under-5"},
								{name:"user_password",msg:"[필수] 비밀번호", kind:"blank"},
								{name:"tel1,tel2,tel3",msg:"[필수] 전화번호(형식:042-622-1111)", kind:"telephone"},
								{name:"ftp_info",msg:"[필수] FTP정보입력",kind:"blank"},
								{name:"main_service",msg:"[필수] 주 서비스 종류", kind:"blank"}
							];
		if(validate.setVariables("form", validateTerm)===true){
			//실시간 체크
			$(validate.tags).bind("focusin, keydown, keyup", 
										function(evt){
													validate.clickedBtn=false;
													validate.checkedSameElement(evt.currentTarget||window.event.srcElement)
												   });

			//form submit button click
			$("#submit-button").bind("click keydown", 
										function(){
													validate.clickedBtn=true;
													if(validate.checked()===true){														
														alert("전송");
														document.form.submit();
													}
												   });
		}
 */
