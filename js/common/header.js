$(function(){
	//头部二级菜单
	var oLi = $("#tHeader .tHeader_nav li").last();
	var oDiv = $("#tHeader .webdhbox");
	erJiCaiDan(oLi,oDiv);
	
	var aLi = $("#bottomHeader .bRight .firstnav>li ")
	var aUl = $("#bottomHeader .bRight .firstnav ul")
	for(var i=0;i<aLi.length-1;i++){
		aLi[i].index = i;
		erJiCaiDan($(aLi[i]),$(aUl[aLi[i].index]));
	}
	
	var aPullDList = $("#bottomHeader .pullD .pullDList li");
	var oPullDCon = $("#bottomHeader .pullD .pullDCon ");
	var aPullDConin = $("#bottomHeader .pullD .pullDCon .pullDConin");
	var aH3 = $("#bottomHeader .pullD .pullDH3_t");
	for(var i=0;i<aPullDList.length;i++){
		aPullDList[i].index = i;
		$(aPullDList[i]).mouseenter(function(){
			mouseenter(aPullDList,aPullDConin,this.index);
		})
		$(aPullDList[i]).mouseleave(function(){
			mouseleave(aPullDList,aPullDConin,this.index);
		})
	}
	for(var i=0;i<aPullDConin.length;i++){
		aPullDConin[i].index = i;
		$(aPullDConin[i]).mouseenter(function(){
			mouseenter(aPullDList,aPullDConin,this.index);
		})
		$(aPullDConin[i]).mouseleave(function(){
			mouseleave(aPullDList,aPullDConin,this.index);
		})
	}
	
	
	/*jsonp去拿百度的数据*/
	var oInput = $("#middleHeader .txt");
	oInput.keyup(function(){
		$.ajax({
			url:"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+oInput.val()+"&json=1&p=3",
			dataType:"jsonp",
			jsonp:"cb",
			success:function(data){
				var lists = data.g;
				console.log(lists);
				var oUl = $("#tipList");
				oUl.html("");
				for(var i in lists){
					var oLi = $("<li></li>");
					oLi.html(lists[i].q);
					oUl.append(oLi)
				}
			}
		});
	})
	//显示登陆后的用户
	var info = $("#tHeader .tHeader_nav li").first();
	var loginInfo = $.cookie("loginInfo") ? JSON.parse($.cookie("loginInfo")) : {}
	if(loginInfo != {}){
		info.html(loginInfo.username+" 用户您好，欢迎光临韩都衣舍!")
	}
})
//模仿二级菜单功能
//鼠标移入事件调用
//obj1：第一级菜单对象；obj2：第二级菜单对象；index：索引
function mouseenter(obj1,obj2,index){
	for(var i=0;i<obj1.length;i++){
		$(obj1[i]).removeClass("menulihover");
	}
	$(obj1[index]).addClass("menulihover");
	$(obj1[index]).children().css("color","#FFFFFF");
	$(obj1[index]).children().first().css("marginLeft",10);
	$(obj1[index]).children().first().children().children().first().css("display","none");
	$(obj1[index]).children().first().children().children().last().css("display","block");
	obj2.parent().css("display","block");
	$(obj2[index]).css("display","block")
}
//鼠标移出事件调用
function mouseleave(obj1,obj2,index){
	$(obj1[index]).removeClass("menulihover");
	$(obj1[index]).children().css("color","#555555");
	$(obj1[this.index]).children().first().css({color:"#333333",marginLeft:0});
	$(obj1[index]).children().first().children().children().first().css("display","block");
	$(obj1[index]).children().first().children().children().last().css("display","none");
	obj2.parent().css("display","none");
	$(obj2[index]).css("display","none")
}
//实现二级菜单功能
//obj1：第一级菜单对象；obj2：第二级菜单对象；
function erJiCaiDan(obj1,obj2){
	obj1.mouseover(function(){
		obj2.css("display","block");
	})
	obj1.mouseout(function(){
			obj2.css("display","none");
	})
	obj2.mouseover(function(){
		obj2.css("display","block");
	})
	obj2.mouseout(function(){
		obj2.css("display","none");
	})
}


