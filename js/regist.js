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
//选择注册方式
var aInputs = $("#register .register_style .btns input");
var aSpans = $("#register .register_style .regtip span");
var aForms = $("#regDiv form")
for(var i=0;i<aInputs.length;i++){
	aInputs[i].index = i;
	$(aInputs[i]).click(function(){
		for(var i=0;i<aInputs.length;i++){
			$(aInputs[i]).removeClass("regactive");
			$(aSpans[i]).css("display","none")
			$(aForms[i]).css("display","none")
		}
		$(this).addClass("regactive");
		$(aSpans[this.index]).css("display","block")
		$(aForms[this.index]).css("display","block")
	})
}

//手机注册

var aTexts = $("#regDiv .regpost1 .txt");
var phoneReg = /^1[3|4|5|7|8]\d{9}$/
var bPhone = false;
var bPwd = false;
var bRepwd = false;

//手机号码验证
$(aTexts[0]).blur(function(){
	if($(this).parent().find("span").length>1){
		$($(this).parent().find("span")[1]).remove();
	}
	var value = this.value;
	if(phoneReg.test(value)){
		$(this).parent().append('<span><img src="../img/register/keyizhuce.gif"/></span>')
	}else{
		$(this).parent().append("<span class='panduan'>你输入的号码不匹配</span>")
		bPhone = true;
	}
})
//发送短信验证码
$(aTexts[1]).blur(function(){
	
})
//密码验证
$(aTexts[2]).blur(function(){
	if($(this).parent().find("span").length>1){
		$($(this).parent().find("span")[1]).remove();
	}
	var value = this.value;
	if(value.length < 8){
		$(this).parent().append("<span class='panduan'>密码长度不能小于8位</span>")
	}else if(/^\d{7,24}$/.test(value) ||/^\D{7,24}$/.test(value) || value.length > 24){
		$(this).parent().append("<span class='panduan'>密码必须为8-24位字母与数字组合</span>")
	}else{
		$(this).parent().append('<span><img src="../img/register/keyizhuce.gif"/></span>')
		bPwd = true;
	}
})
//确认密码验证
$(aTexts[3]).blur(function(){
	if($(this).parent().find("span").length>1){
		$($(this).parent().find("span")[1]).remove();
	}
	if(this.value == aTexts[2].value){
		$(this).parent().append('<span><img src="../img/register/keyizhuce.gif"/></span>')
		bRepwd = true;
	}else{
		$(this).parent().append("<span class='panduan'>两次输入密码不一致</span>")
	}
})
//注册
$(".regpost1 .register_list_submit").click(function(){
	if(bPhone&&bPwd&&bRepwd){
		alert("注册成功");
	}else{
		alert("有错误存在，不能注册");
		return false;
	}
})

//邮箱注册

var aText = $("#regDiv .regpost2 .txt");
var emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
var bEmail =false;
var bcode = false;
//邮箱验证
$(aText[0]).blur(function(){
	if($(this).parent().find("span").length>1){
		$($(this).parent().find("span")[1]).remove();
	}
	if(emailReg.test(this.value)){
		$(this).parent().append('<span><img src="../img/register/keyizhuce.gif"/></span>')
		bEmail = true;
	}else{
		$(this).parent().append("<span class='panduan'>邮箱格式不正确</span>")
	}
})
//密码验证
$(aText[1]).blur(function(){
	if($(this).parent().find("span").length>1){
		$($(this).parent().find("span")[1]).remove();
	}
	var value = this.value;
	if(value.length < 8){
		$(this).parent().append("<span class='panduan'>密码长度不能小于8位</span>")
	}else if(/^\d{7,24}$/.test(value) ||/^\D{7,24}$/.test(value) || value.length > 24){
		$(this).parent().append("<span class='panduan'>密码必须为8-24位字母与数字组合</span>")
	}else{
		$(this).parent().append('<span><img src="../img/register/keyizhuce.gif"/></span>')
		bPwd = true;
	}
})
//确认密码验证
$(aText[2]).blur(function(){
	if($(this).parent().find("span").length>1){
		$($(this).parent().find("span")[1]).remove();
	}
	if(this.value == aTexts[2].value){
		$(this).parent().append('<span><img src="../img/register/keyizhuce.gif"/></span>')
		bRepwd = true;
	}else{
		$(this).parent().append("<span class='panduan'>两次输入密码不一致</span>")
	}
})
//验证码
var oRadomCode = $("#regDiv .regpost2 .radomcode");
var oCheckCode = $("#regDiv .regpost2 .checkcode")
oRadomCode.html(code(4))
oRadomCode.click(function(){
	oRadomCode.html(code(4))
})
oCheckCode.blur(function(){
	var value = toLower(this.value);
	var value1 = toLower(oRadomCode.html());
	if($(this).parent().find("span").length>2){
		$($(this).parent().find("span")[2]).remove();
	}
	if(value == value1){
		$(this).parent().append('<span><img src="../img/register/keyizhuce.gif"/></span>')
		bcode =true;
	}else{
		$(this).parent().append("<span class='panduan'>输入的验证码不正确</span>")
		oRadomCode.html(code(4))
	}
})

//注册
$(".regpost1 .register_list_submit").click(function(){
	if(bEmail&&bPwd&&bRepwd&&bcode){
	}else{
		alert("有错误存在，不能注册");
		return false;
	}
})





