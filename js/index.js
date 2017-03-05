//banner图片淡入淡出
var oBanner = $("#banner")[0]
var aImage = $("#banner .image");
var aTab = $("#banner .search li");
fade(oBanner,aImage,aTab,"tab");


//hd_zppright右侧部分
var oList = $("#hd_zpp .list")[0];
var aTabs = $("#hd_zpp .tab li");
var aItem = $("#hd_zpp .list .item")
//fade(oList,aItem,aTabs,"tab_active")
for(var i=0; i<aTabs.length; i++) {
	aTabs[i].index = i;
	aTabs[i].onmouseover = function() {
		iNow = this.index;
		for(var i=0; i<aTabs.length; i++) {
			aTabs[i].className = "";
			startMove(aItem[i], {opacity: 0});
		}
		aTabs[iNow].className = "tab_active";
		startMove(aItem[iNow], {opacity: 100});
	}
}

//hd_zppright左侧部分鼠标移上的效果
//<a href="##"></a>
var aHovers = $("#hd_zpp .firstp").children();
var oHuan = $("#hd_zpp .huan");
var oFirstp1 = $(".firstp1")
var oFirstp1 = $(".firstp2")
var iSwitch = 1;
oHuan.click(function(){
	iSwitch*=-1
	if(iSwitch>0){
		oFirstp1.css("display","block");
		oFirstp2.css("display","none");
	}else{
		oFirstp1.css("display","none");
		oFirstp2.css("display","block");
	}
})
for(var i=0;i<aHovers.length;i++){
	$(aHovers[i]).mousemove(function(){
		
	})
}


//楼梯1右侧导航
var floor1 = $("#floor1 .hot_floor1").children().children();
for(var i=0;i<floor1.length;i++){
	floor1[i].index = i;
	$(floor1[i]).mouseover(function(){
		for(var i=0;i<floor1.length;i++){
			$(floor1[i]).removeClass("active_floor1").addClass("default");
			$(floor1[i]).children().first().removeClass("h5_num")
			$(floor1[i]).children().last().addClass("ul_active")
		}
		$(this).removeClass("default").addClass("active_floor1");
		$(this).children().first().addClass("h5_num")
		$(this).children().last().removeClass("ul_active")
	})
}

//吸顶效果
var oXiding = $("#xiding");
var aHd_zpp = $("#hd_zpp");
$(window).scroll(function(){
	var iScrollTop = $(window).scrollTop();
	var Top = $(aHd_zpp[0]).offset().top;
	if(iScrollTop >= Top){
		oXiding.css("display","block")
	}else{
		oXiding.css("display","none")
	}
})

//楼梯效果

//点击事件
var isClick = false;
$("#luoti ul .li_tab").click(function(){
	isClick = true;
	$(this).find("span").addClass("luoti_active").parent().siblings().find("span")
	.removeClass("luoti_active");
	var iTop = $(".luocheng").eq($(this).index()).offset().top;
	$("html,body").stop().animate({scrollTop:iTop},1000,function(){
		isClick = false;
	})
})
//滚动监听
var loutiNav = $("#luoti")
var louti = $(".luocheng")
$(window).scroll(function(){
	if(!isClick){
		var iScrollTop = $(window).scrollTop();
		if(iScrollTop > $($(".luocheng")[0]).offset().top -$($(".luocheng")[0]).outerHeight()/2){
			loutiNav.css("display","block")
		}else{
			loutiNav.css("display","none")
		}
		for(var i=0;i<louti.length;i++){
			if(iScrollTop >= $(louti[i]).offset().top - $(louti[i]).prev().outerHeight()/2){
				$($("#luoti ul li")[i]).find("span").addClass("luoti_active")
				.parent().siblings().find("span").removeClass("luoti_active");
			}
		}
	}
})

//返回顶部
$(".return").click(function(){
	 $(window).scrollTop(0);
	
})
