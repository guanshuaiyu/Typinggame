function game(){
this.clientw=document.documentElement.clientWidth;
this.clienth=document.documentElement.clientHeight;
// this.letterArr=[{url:"img/a.jpg",code:"65"},]
this.letterArr=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
this.letterLen=5;
this.speed=1;

this.spans=[];
this.currArr=[];
this.currPosArr=[];

this.die=10;
this.sore=0;
this.num=10;
this.currSore=0;

this.aa=1;
this.soreEle=document.getElementsByClassName('sore')[0].getElementsByTagName("span")[1];
this.dieEle=document.getElementsByClassName('die')[0].getElementsByTagName("span")[1];
}
game.prototype =  {
	play:function(){
		// 将字母显示到body里面
		this.getLetter(this.letterLen);
		this.move();
		this.key();
	},
	key:function(){
			var that=this;
		document.onkeydown = function(e){
			var ev = e||window.event;
			var code=String.fromCharCode(ev.keyCode+32);
			for (var i = 0; i < that.spans.length; i++) {
			console.log(code,that.spans[i].innerHTML);
				if(that.spans[i].innerHTML==code){
					document.body.removeChild(that.spans[i]);
					that.spans.splice(i,1);

					that.currArr.splice(i,1);
					that.currPosArr.splice(i,1);

					that.getLetter(1);
					that.sore++;
					that.currSore++;
					that.soreEle.innerHTML=that.sore;
					if (that.currSore%that.num==0) {
						clearInterval(that.t);
						that.aa++;
						$("#zhezhao1").css({display : 'block'});
						$("#zhezhao1").css({zIndex : '100'});
						$("#b2").click (function(){
							$("#zhezhao1").css({display : 'none'});
							that.next();
						});
						// alert("第"+that.aa+"关");
					}
					break;
				} 
			};
		}
	},
	next:function(){
		clearInterval(this.t);
		for (var i = 0; i < this.spans.length; i++) {
			document.body.removeChild(this.spans[i]);
		}
		this.currArr.splice(i,1);
		this.currPosArr.splice(i,1);
		this.spans=[];
		this.currSore=0;
		this.speed+=0.1;
		// that.dieEle.innerHTML ++;
		if (this.speed>10) {this.speed=10};
		this.letterLen++;
		if (this.letterLen==27) {this.letterLen=26};
		this.num+=10;
		this.play();
	},
	move:function(){
		var that = this;
		clearInterval(this.t);
		this.t=setInterval(function(){
			for (var i = 0; i < that.spans.length; i++) {
				var left=that.spans[i].offsetLeft+that.speed;
				that.spans[i].style.left=left+"px";
				if (left>that.clientw) {
					document.body.removeChild(that.spans[i]);
					that.spans.splice(i,1);
					that.getLetter(1);
					that.currArr.splice(i,1);
					that.currPosArr.splice(i,1);
					that.die--;
					that.dieEle.innerHTML=that.die;
					if (that.die==0) {
						clearInterval(that.t);
						$("#zhezhao").css({display : 'block'});
						$("#zhezhao").css({zIndex : '100'});
						$("#b1").click(function(){
							$("#zhezhao").css({display : 'none'});
							that.die=10;
							that.dieEle.innerHTML=that.die;
							that.restart();
						})
					};
				};
			}
		},60)
	},
	restart:function(){
		clearInterval(this.t);
		for (var i = 0; i < this.spans.length; i++) {
			document.body.removeChild(this.spans[i]);
		}
		this.currArr.splice(i,1);
		this.currPosArr.splice(i,1);
		this.spans=[];
		this.currSore=0;
		this.speed+=0.1;
		if (this.speed>10) {this.speed=10};
		this.letterLen++;
		if (this.letterLen==27) {this.letterLen=26};
		this.num+=10;
		this.play();
	},
	getLetter:function(num){
		//先获取到指定的字母
		var arr=this.getRand(num);
		var posArr=[];
		for (var i = 0; i < arr.length; i++) {
			var span = document.createElement("span");
			span.innerHTML=arr[i];
			var x = (10+(this.clientw-500)*Math.random());
			var y = (650*Math.random());
			var width=30;
			while(this.check1(posArr,x,width)){
				x = (10+(this.clientw-500)*Math.random());
			}
			posArr.push({minx:x,maxx:x+width});
			this.currPosArr.push({minx:x,maxx:x+width});
			span.style.cssText="width:150px;height:100px;position:absolute;left:"+x+"px;top:"+y+"px;background:url(./img/"+arr[i]+".gif) no-repeat center center;background-size:contain;font-size:0px;";
			document.body.appendChild(span);
			this.spans.push(span);
		};
	},
	check1:function(arr,x,width){
		for (var i = 0; i < arr.length; i++) {
			if (!(x+width<arr[i].minx||arr[i].maxx+width<x)) {
				return true;
			}
		}return false;
	},
	getRand:function(num){
		var arr =[];
		for (var i = 0; i < num; i++) {
			var rand=Math.floor(Math.random()*this.letterArr.length);
			while(this.check(this.currArr,this.letterArr[rand])){
				rand=Math.floor(Math.random()*this.letterArr.length);
			}
			arr.push(this.letterArr[rand]);
			this.currArr.push(this.letterArr[rand]);
		}
		return arr;
	},
	check:function(arr,val){
		for (var i = 0; i < arr.length; i++) {
			if(arr[i]==val){
				return true;
			}
		}return false;
	}
};