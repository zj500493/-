var oGoodsList = $(".shopping_nr_top ul")
var total = $("#goods_allnum");
var totalPrice =(".td_len1")
var totalAmount = ("#totalAmount")
var totalNum = 0
//console.log(totalAmount.html())
var goods = $.cookie("goods") ? JSON.parse($.cookie("goods")) : {}
if(goods != {}){
	$(".bottom1").css("display","none")
	for(var goodsId in goods){
		//总计部分,商品总的件数
		totalNum+=goods[goodsId].num
		//向购物车加入商品列表
		oGoodsList.append(
			'<li id="goods" data-id='+goods[goodsId].id+'>'+
				'<div class="checkbox">'+
					'<input type="checkbox" class="check" checked="checked" />'+
				'</div>'+
			   ' <div class="cbg shop_product">'+
			    	'<div class="shop_product_pic">'+
			            '<a href="##" target="_blank" title="哲初女装2016冬装新呢大衣单排扣中长款立领毛呢外套YH6051">'+
			                '<img src='+goods[goodsId].src+' width="112" border="0" alt="哲初女装2016冬装新呢大衣单排扣中长款立领毛呢外套YH6051">'+
			            '</a>'+
			        '</div>'+
			        '<div class="shop_product_name">'+
			            '<a href="##" title="哲初女装2016冬装新呢大衣单排扣中长款立领毛呢外套YH6051" target="_blank"> '+
			            '哲初女装2016冬装新呢大衣单排扣中长款立领毛呢外套YH6051 </a>'+
			        '</div>'+
			        '<div class="shop_product_size">'+
			           ' <span>颜色:'+goods[goodsId].color+' &nbsp;&nbsp;&nbsp;尺码:'+goods[goodsId].size+'</span>'+
			        '</div>'+
			    '</div>'+
			    '<div class="cbg shop_product_money">' +
			    	'<div class="cprice" style="line-height:20px;">'+
			    		'<del>￥2187.00</del><br><span>￥399 </span>'+
			    	'</div>'+
			    '</div>'+
			    '<div class="cbg shop_product_number">'+
			        '<span class="amount-widget" id="J_AmountWidget">'+
			            '<span class="increase">+</span>'+
			            '<span class="decrease">-</span>'+
			             '<input type="text"  name="goods_number" class="text" old="1" value='+goods[goodsId].num+' maxlength="3" title="请输入购买量">'+
			        '</span>'+
			    '</div>'+
			    '<div class="cbg shop_product_money00">￥'+goods[goodsId].num*399+'</div>'+
			    '<div class="cbg shop_product_close">'+
			        '<div class="middle">'+
			            '<a href="##"> 移入收藏夹</a><br>'+
			            '<a href="##"> 删除</a>'+
			        '</div>'+
			    '</div>'+
			    '<div class="cbg shop_product_tip">'+
			        '<div class="middle"></div>'+
			   ' </div>'+
			'</li>'
		)
		//总金额
		var allMoney = 0;
		allMoney += parseInt(subStr($(".shop_product_money00").html())) ;
	}
	total.html(totalNum)
	//totalPrice.html(allMoney)
	//totalAmount.html(allMoney)
}else{
	$(".bottom1").css("display","block")
}

/*改变商品数量*/
var add = $(".shop_product_number .increase")
var decrease = $(".shop_product_number .decrease")
var aGoodsNum = $(".shop_product_number .text")
var aMoney = $(".shop_product_money span")
var aTotalMoney = $(".shop_product_money00")

//增加商品数量

for(var i=0;i<add.length;i++){
	add[i].index = i;
	$(add[i]).click(function(){
		totalNum++
		var num = $(aGoodsNum[this.index]).val();
		num++;
		$(aGoodsNum[this.index]).val(num);
		//获取单价
		var str = $(aMoney[this.index]).html()
		var money = parseInt(subStr(str));
		//计算总价
		$(aTotalMoney[this.index]).html(num*money)
		total.html(totalNum)
		
		var goods = JSON.parse($.cookie("goods"));
		var goodId = $(this).parent().parent().parent().attr("data-id");
		if(goodId in goods){
			goods[goodId].num = num
		}
		$.cookie("goods",JSON.stringify(goods), {expires: 7, path: "/"})
	})
}

//减少商品数量
for(var i=0;i<decrease.length;i++){
	decrease[i].index = i;
	$(decrease[i]).click(function(){
		totalNum--;
		var num = $(aGoodsNum[this.index]).val();
		num--;
		$(aGoodsNum[this.index]).val(num);
		//获取单价
		var str = $(aMoney[this.index]).html()
		var money = parseInt(subStr(str));
		//计算总价
		$(aTotalMoney[this.index]).html(num*money)
		total.html(totalNum)
		
		var goods = JSON.parse($.cookie("goods"));
		var goodId = $(this).parent().parent().parent().attr("data-id");
		if(goodId in goods){
			goods[goodId].num = num
		}
		$.cookie("goods",JSON.stringify(goods), {expires: 7, path: "/"})
	})
}
//截取单价
function subStr(str){
	return str.substring(1)
}

//删除商品
var del = $(".shop_product_close a").last()
del.each(function(){
	$(this).click(function(){
		oGoodsList.children().eq($(this).index("li")).html("")
		var goods = JSON.parse($.cookie("goods"));
		var goodId = oGoodsList.children().eq($(this).index("li")).attr("data-id");
		delete goods[goodId];
		$.cookie("goods", JSON.stringify(goods), {expires: 7, path: "/"})
		console.log($.cookie("goods"))
	})
})

//选择商品

var aCheckBox = $(".checkbox");
aCheckBox.click(function(){
	goodsNum()
})
//全选功能
$(".select-all").click(function(){
	$(".check").prop("checked", $(this).prop("checked"));
	//计算商品总数
	goodsNum();
});

//清空购物车
var clear = $(".shopping_car_bottom_left .clear1");
clear.click(function(){
	oGoodsList.html("");
	$.cookie("goods", "", {expires: -1, path: "/"})
})
//跳入首页
$(".btn9").click(function(){
	location.href = "index.html"
})
//跳入支付页面
$(".jiesuan").click(function(){
	location.href = "pay.html"
})

//计算商品总数
function goodsNum(){
	var num=0;
	$(".check:checked").parent().parent().find(".shop_product_number").children().find("input").each(function(){
		num += parseInt($(this).val())
	})
	total.html(num)
}

