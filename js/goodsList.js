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

/*中间内容导航部分*/
var aNav = $(".cataClass_0317 dd");
for(var i=0;i<aNav.length;i++){
	$(aNav[i]).mouseover(function(){
		$(this).children().css("display","block")
	})
	$(aNav[i]).mouseout(function(){
		$(this).children().css("display","none")
	})
}

/*商品列表加载*/
var aDiv = $(".product ");
$.ajax({
	type:"get",
	url:"../data/goods1.json",
	success:function(data){
		var goodsInfo = data;
		for(var goods in goodsInfo){
			
			var i = goodsInfo[goods].id
			$(aDiv[i]).append(
				'<div class="product-iWrap">'+
	                '<div class="productImg-wrap">'+
	                    '<a href='+goodsInfo[goods].href+' title="Soneed韩版2016夏装新款女装黑色透视拼接修身包臀半身裙UB3258媱" class="productImg" target="_blank">'+
	                    	'<img src='+goodsInfo[goods].src+' alt="Soneed韩版2016夏装新款女装黑色透视拼接修身包臀半身裙UB3258媱">'+
	                    '</a>'+
	                '</div>'+
	                '<p class="productPrice" style="width:100%; text-align:center">'+
	                    '<em title="￥208" style="float:none"><b>¥</b>'+goodsInfo[goods].price+'</em>'+
	                    '<del title="市场价 624.00" style="float:none">'+goodsInfo[goods].oldPrice+'</del>'+
	                '</p>'+
	            '</div>'
	        )
		}
	}
});
var goodsInfo = {}
aDiv.each(function(){
	$(this).click(function(){
		goodsInfo.id = $(this).index()
		goodsInfo.src = $(this).find("img").attr("src")
		goodsInfo.price = $(this).find("em").text()
		goodsInfo.oldPrice = $(this).find("del").text()
		
		$.cookie("goodsInfo",JSON.stringify(goodsInfo),{expries:7,path:"/"})
	})
})