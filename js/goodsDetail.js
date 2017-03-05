var oPullDList = $("#bottomHeader .pullD .pullDList")
var oH2 = $("#bottomHeader .pullD h2")
var oPullDCon = $("#bottomHeader .pullD .pullDCon")
oH2.mouseover(function(){
	oPullDList.css("display","block");
})
oH2.mouseout(function(){
	oPullDList.css("display","none");
})
oPullDList.mouseover(function(){
	oPullDList.css("display","block");
})
oPullDList.mouseout(function(){
	oPullDList.css("display","none");
})
oPullDCon.mouseover(function(){
	oPullDList.css("display","block");
})
oPullDCon.mouseout(function(){
	oPullDList.css("display","none");
})

//获取商品信息
var goodsInfo = JSON.parse($.cookie("goodsInfo"))
if(goodsInfo){
	$(".zoomPad").prepend('<img id="masterImage" goodsId='+goodsInfo.id+' width="480" src='+goodsInfo.src+' title="">')
	$(".gallery li a").first().append('<img src='+goodsInfo.src+'>');
	$(".zoomWrapperImage").append('<img src='+goodsInfo.src+'>')
	//oZoomImg.children().first().attr("src",goodsInfo.src) ;
}



/*放大镜效果*/
var oZoompad = $(".zoomPad");//存放小图的盒子
var oZoompud = $(".zoomPup");//放大镜
var oZoomWindow = $(".zoomWindow");//显示图片的部分
var oZoomImg = $(".zoomWrapperImage");//存放大图的盒子
var aGalleNav = $(".gallery_nav li");
//选项卡，点击出现相应的图片
for(var i=0;i<aGalleNav.length;i++){
	$(aGalleNav[i]).click(function(){
		for(var i=0;i<aGalleNav.length;i++){
			$(aGalleNav[i]).removeClass("gallery_active");
			$(aGalleNav[i]).children().find("s").removeClass("s_active");
		}
		$(this).addClass("gallery_active");
		$(this).children().find("s").addClass("s_active");
		var src = $(this).children().find("img").attr("src");
		oZoompad.children().first().attr("src",src) ;
		oZoomImg.children().first().attr("src",src) ;
	})
}
//实现放大镜效果
oZoompad.parent().mouseover(function(){
	oZoompud.css("display","block");
	oZoomImg.css("display","block")
	oZoomWindow.css("display","block")
})
oZoompad.parent().mouseout(function(){
	oZoompud.css("display","none");
	oZoomImg.css("display","none")
	oZoomWindow.css("display","none")
})
oZoompad.parent().mousemove(function(evt){
	var e = evt;
	//遮罩层位置
	var iLeft =e.pageX - oZoompud.width()/2 - oZoompad.parent().offset().left;
	var iTop = e.pageY - oZoompud.height()/2 - oZoompad.parent().offset().top;
	//遮罩层移动最大宽高
	var iSmallMaxLeft = oZoompad.parent().width() - oZoompud.width();
	var iSmallMaxTop = oZoompad.parent().height() - oZoompud.height();
	
	if(iLeft<0) {
		iLeft = 0;
	} else if(iLeft>iSmallMaxLeft) {
		iLeft = iSmallMaxLeft;
	}

	if(iTop<0) {
		iTop = 0;
	} else if(iTop>iSmallMaxTop) {
		iTop = iSmallMaxTop;
	}
	var bigImgLeft = -iLeft/iSmallMaxLeft*(oZoomImg.children().width()-oZoomWindow.width());
	var bigImgTop = -iTop/iSmallMaxTop*(oZoomImg.children().height()-oZoomWindow.height());
	oZoompud.css({left:iLeft,top:iTop})
	oZoomImg.children().css({left:bigImgLeft,top:bigImgTop})

})

/*选择所买的颜色与尺寸*/
var goods = $("#goods_detail_3 .goods_attr")
var aSize = $(goods[0]).children().last().children();
var aColor =$(goods[1]).children().last().children();	
var color = "";
var size = "";
aSize.each(function(){
	if($(this).attr("class") == "sel"){
		size = $(this).children().first().html()
		$("#GoodsAttrSelectedString").html("你已选择了  ["+size+"] ["+color+"]")
	}
	$(this).click(function(){
		aSize.each(function(){
			$(this).removeClass("sel");
		})
		var attr = $(this).attr("class");
		if(attr!="b"){
			$(this).addClass("sel")
			size = $(this).children().first().html()
			$("#GoodsAttrSelectedString").html("你已选择了  ["+size+"] ["+color+"]")
		}else{
			size = ""
			$("#GoodsAttrSelectedString").html("你已选择了  ["+size+" ] ["+color+"]")
		}
		
	})
})
aColor.each(function(){
	if($(this).attr("class") == "sel"){
		color = $(this).children().first().html()
		$("#GoodsAttrSelectedString").html("你已选择了  ["+size+"] ["+color+"]")
	}
	$(this).click(function(){
		aSize.each(function(){
			$(this).removeClass("sel");
		})
		var attr = $(this).attr("class");
		if(attr!="b"){
			$(this).addClass("sel")
			color = $(this).children().first().html()
			$("#GoodsAttrSelectedString").html("你已选择了  ["+size+"] ["+color+"]")
		}else{
			color = ""
			$("#GoodsAttrSelectedString").html("你已选择了  ["+color+" ] ["+color+"]")
		}
	})
})
/*所买商品的数量*/
var add = $("#goods_detail_2 .increase")
var decrease = $("#goods_detail_2 .decrease")
var goodsNum = $("#goods_detail_2 #goodsNumber")
var num = parseInt(goodsNum.val())
add.click(function(){
	num = parseInt(goodsNum.val())
	num+=1
	goodsNum.val(num)
})
decrease.click(function(){
	num = parseInt(goodsNum.val())
	num-=1
	if(num<1){
		num = 1;
	}
	goodsNum.val(num)
})

/*加入购物车*/
var oBtn = $("#goods_detail_2 .detail_btn_set").last()
var goods = {}
var goodsId = oZoompad.find("img").attr("goodsId")
var src = aGalleNav.first().children().find("img").attr("src")
oBtn.click(function(){
	var goods = $.cookie("goods") ? JSON.parse($.cookie("goods")) : {}
	if(goodsId in goods){
		goods[goodsId].num += num;
	}else{
		if(size&&color){
			goods[goodsId] = {
				id:goodsId,
				src:src,
				color:color,
				size:size,
				num:num
			}
		}else if(!size){
			alert("你没选择尺寸")
		}else{
			alert("你没选择颜色")
		}
	}
	$.cookie("goods",JSON.stringify(goods),{expires: 7, path: "/"})
	console.log($.cookie("goods"))
	location.href = "gouwuche.html"
})
