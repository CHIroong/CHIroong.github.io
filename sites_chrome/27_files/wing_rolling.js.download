	function wingRollStart(aR){
		return setInterval(function(){ aR.changeNum() },aR.getTerm());
	}
	function headhunting(){
		window.open('http://img.etnews.com/Et/etnews/banner/20150521/etheadhunting.html','','width=740,height=1056,scrollbars=yes,resizable=yes,toolbars=no');
		return false;
	}
	var classRolling = function(){
		this.cname = "";
		this.rTerm = 2000;
		this.rollerObj = null;
		this.rollerCnt = 0;
		this.current = 1;
		this.timer = null;

		// 초기값 설정
		this.init = function(cname,rterm) {
			this.cname = cname;
			this.rTerm = rterm;
			this.rollerObj = $(cname);
			this.rollerCnt = $(cname).length;

			this.showNum(1);
		};

		this.showNum = function(num){
			for (var i=0;i<this.rollerCnt;i++) {
				if ((num-1)==i) {
					this.rollerObj.eq(i).show();
				} else {
					this.rollerObj.eq(i).hide();
				}
				this.rollerObj.eq(i).attr("style","visibility:visible");
			};
		};

		this.startTimer = function(){
			alert(this.current);
			this.timer = setInterval(function(){
				this.rollerObj = $(this.cname);
				//현재 위치 숨기기
				this.rollerObj.eq(this.current-1).hide();
				// 다음위치
				this.current++;
				if (this.current>this.rollerCnt) {
					// 마지막
					this.current = 1;
				};
				//다음 보이기
				this.rollerObj.eq(this.current-1).show();
			},2000);
		};

		this.changeNum = function(){
			//현재 위치 숨기기
			this.rollerObj.eq(this.current-1).hide();
			//Thread.sleep(500);
			// 다음위치
			this.current = this.current + 1;

			if (this.current>this.rollerCnt) {
				// 마지막
				this.current = 1;
			};
			//다음 보이기
			this.rollerObj.eq(this.current-1).show();
			
		};
			
		this.mouseOver = function(){
		};

		this.getTerm = function(){
			return this.rTerm;
		};
		this.getRoller = function(){
			return this.rollerObj;
		};
		this.getCnt = function(){
			return this.rollerCnt;
		};
		this.setTimer = function(timer){
			this.timer = timer;
		};
		this.stop = function(){
			clearInterval(this.timer);
		};
	}
	$(document).ready(function(){
		var divObj = $("#wingLeft3");
		if (divObj && (Math.floor(Math.random() * (10)) % 2))
		{
			divObj.append($(".wingRoll").eq(0));
		}
		var aRoll = new classRolling();
		aRoll.init(".wingRoll",3000);
		if (aRoll.getCnt()>1)
		{
			aRoll.setTimer(wingRollStart(aRoll));
			aRoll.getRoller().bind("mouseover",function(){aRoll.stop();});
			aRoll.getRoller().bind("mouseout",function(){aRoll.setTimer(wingRollStart(aRoll));});
		}
	});
