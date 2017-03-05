//导入共用的htmlyem
//url：页面的路径
//id：将要导入的内容放在什么地方
function loadHtml(url,id){
	$.ajax({
		url:url,
		async:false,
		success:function(data){
			$("#"+id).html(data);
		}
	});
}

//淡入淡出 
//obj:存放所有图片的盒子
//aImg：所有的图片对象；
//aTab：选项卡数组
//className：显示当前图片对应的class属性
function fade(obj,aImg,aTab,className){
	var iNow = 0;
	autoPlay();//自动播放
	for(var i=0; i<aTab.length; i++) {
		aTab[i].index = i;
		aTab[i].onmouseover = function() {
			iNow = this.index;
			tab();
		}
	}
	obj.onmouseover = function() {
		clearInterval(obj.timer);
	}
	obj.onmouseout = function() {
		autoPlay();
	}
	function autoPlay(){
		clearInterval(obj.timer)
		obj.timer = setInterval(function(){
			iNow++;
			if(iNow == aTab.length){
				iNow = 0;
			}
			tab();
		},2500)
	}
	function tab() {
		for(var i=0; i<aTab.length; i++) {
			aTab[i].className = "";
			startMove(aImg[i], {opacity: 0});
		}
		aTab[iNow].className = className;
		startMove(aImg[iNow], {opacity: 100});
	}

}

/*
 	完美动画函数：
 		obj:要运动的节点对象
 		json:{属性：目标值，属性：目标值....}  (透明度使用属性：opacity:100) 透明度的值是0-100；  里面的opacity 和  filter会自动做转换。
 		fn：回调函数，在运动执行完毕后执行。
*/
function startMove(obj, json, fn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var bStop = true;//这一次运动都结束了——>所有的值都到了
		for(var attr in json) {
			// 取当前值
			var iCur = 0;
			if(attr=="opacity") {
				iCur = parseInt(parseFloat(getStyle(obj, attr))*100);
			} else {
				iCur = parseInt(getStyle(obj, attr));
			}

			// 计算速度
			var iSpeed = (json[attr]-iCur)/8;
			iSpeed = iSpeed>0? Math.ceil(iSpeed) : Math.floor(iSpeed);

			// 检测停止
			if(iCur!=json[attr]) {//每隔30ms都会赋值为true，都会检测停止
				bStop = false;
			} 

			if(attr=="opacity") {
				obj.style.filter = "alpha(opacity:"+(iCur+iSpeed)+")"
				obj.style.opacity = (iCur + iSpeed)/100;
			} else {
				obj.style[attr] = iCur + iSpeed + "px";
			}
		}
		if(bStop) {
			clearInterval(obj.timer);
			if(fn) {
				fn();
			}
		}
	}, 30)
}

function getStyle(obj, name) {
	if(window.getComputedStyle) {
		return getComputedStyle(obj, null)[name];
	} else {
		return obj.currentStyle[name]
	}
}

function getByClass(oParent, sClass) {
	var aEle = oParent.getElementsByTagName("*");
	var aResult = [];
	for(var i=0; i<aEle.length; i++) {
		if(aEle[i].className == sClass) {
			aResult.push(aEle[i]);
		}
	}
	return aResult;
}


/*随机验证码*/
function code(n) {
	var str = "";
	for(var i=0; i<n; i++) {
		var gaiLv = Math.random();
		var gaiLv1 = Math.random();
		if(gaiLv>=0.5) {
			str += parseInt(Math.random()*10);
		} else {
			if(gaiLv1>=0.5) {
				str += String.fromCharCode(parseInt(Math.random()*26)+65);
			} else {
				str += String.fromCharCode(parseInt(Math.random()*26)+97);
			}
		}
	}
	return str;
}
	/*大写转小写*/
function toLower(str) {
	var str1 = "";
	var str2 = "";
	for(var i=0; i<str.length; i++) {
		if(str[i]>="A"&&str[i]<="Z") {
			str2 = str[i].toLowerCase();
		} else {
			str2 = str[i];
		}
		str1 += str2;
	}
	return str1;
}
