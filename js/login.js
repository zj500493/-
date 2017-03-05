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


//登录检测
var oBtn = $("#login .btn");
var oUsername = $("#login .unsername");
var oPwd = $("#login .pwd")
var oPanduan = $("#login .loginInfo div").last()
var oRadomcode = $("#login .radomcode")
var oCheckcode = $("#login .checkcode")

oRadomcode.html(code(4))
oRadomcode.click(function(){
	oRadomcode.html(code(4))
})
if($.cookie("userInfo")){
	var user = JSON.parse($.cookie("userInfo"))
	oUsername.val( user.username) ;
	oPwd.val(user.pwd);
}
	

oBtn.click(function(){
	var value = toLower(oCheckcode.val())
	var value1 = toLower(oRadomcode.html())
	if(/^\d*$/.test(oUsername.val())){
		if(!(/^1[3|4|5|7|8]\d{9}$/.test(oUsername.val()))){//手机号码验证
			oPanduan.addClass("panduan");
			oPanduan.html("输入的手机号不正确");
			oRadomcode.html(code(4))
		}else if(/^\d*$/.test(oPwd.val()) ||/^\D*$/.test(oPwd.val()) ){//密码验证
			oPanduan.addClass("panduan");
			oPanduan.html("密码不正确")
			oRadomcode.html(code(4))
		}else if(value != value1){//验证码验证
			oPanduan.addClass("panduan");
			oPanduan.html("验证码不正确")
			oRadomcode.html(code(4))
		}else{
			//oPanduan.removeClass("panduan");
			oPanduan.html("");
		}
	}else{//邮箱验证
		if(!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(oUsername.val()))){
			oPanduan.addClass("panduan");
			oPanduan.html("输入的邮箱格式不正确")
			oRadomcode.html(code(4))
		}else if(/^\d*$/.test(oPwd.val()) ||/^\D*$/.test(oPwd.val()) ){//密码验证
			oPanduan.addClass("panduan");
			oPanduan.html("密码不正确")
			oRadomcode.html(code(4))
		}else if(value != value1){//验证码验证
			oPanduan.addClass("panduan");
			oPanduan.html("验证码不正确")
			oRadomcode.html(code(4))
		}else{
			//oPanduan.removeClass("panduan");
			oPanduan.html("");
		}
	}
	if(!(oPanduan.html())){
		$.ajax({
			url:"../data/loginInfo.json",
			type:"get",
			success:function(data){
				var msg = data;
				var iSwitch = true;
				for(var info in msg){
					if(msg[info].username==oUsername.val()&&msg[info].pwd == oPwd.val()){
						iSwitch = false;
						location.href = "index.html";
					}
				}
				if(iSwitch){
					oPanduan.addClass("panduan");
					oPanduan.html("用户名或密码错误")
				}
			}
		})
		var userInfo = {}
		userInfo.username = oUsername.val();
		if($("#login .checkbox")[0].checked){
			$.cookie("userInfo", JSON.stringify(userInfo), {path: "/"})
		}
		
		var loginInfo = {}
		loginInfo.username = oUsername.val();
		loginInfo.pwd = oPwd.val();
		$.cookie("loginInfo", JSON.stringify(loginInfo), {expires: 7, path: "/"})
	}
	
})

		

