$(function(){

	const IP="https://bird.ioliu.cn/v1?url=http://122.112.209.170:8088";
	var verify;
	function settime(obj) { //发送验证码倒计时
	    if (countdown == 0) {
	        obj.attr('disabled', false);
	        //obj.removeattr("disabled"); 
	        obj.text("免费获取验证码");
	        countdown = 60;
	        return;
	    } else {
	        obj.attr('disabled', true);
	        obj.text("重新发送(" + countdown + ")");
	        countdown--;
	    }
	    setTimeout(function () {
	        settime(obj)
	    }, 1000)
	}
	$('.back').on('click',function(){
		history.go(-1);
	})
	//获取验证码	
	var countdown = 60;
	$('.get-validate').on('click', function () {
	    var phone = $(".phone").val();
	    var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
	    if (phone == "") {
	        layer.msg("请输入手机号");
	        return;
	    }
	    if (!reg.test(phone)) {
	        layer.msg(" 请输入有效的手机号");
	        return;
	    } else {
	        $.ajax({
	            url: IP+"/Data/Verify.ashx?Action=CheckNum&Account=" + phone,
	            type: 'get',
	            dataType: 'json',
	            success: function (result) {
	                console.log(result)
	                if (result.code == "100") {
	                    verify = result.result[0].value;

	                }
	            }
	        });
	        var obj = $(".code");
	        settime(obj);

	    }

	})

	//修改密码
	$('.modify').on('click', function () {
	    var phone = $('.phone').val();
	    var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
	    var validate = $('.validate').val();
	    var password = $('.password').val();
	    var password2 = $('.password2').val();
	    if (phone == "") {
	        layer.msg("请输入手机号");
	        return;
	    }
	    if (!reg.test(phone)) {
	        layer.msg(" 请输入有效的手机号");
	        return;
	    }
	    if(password!==password2){
	    	layer.msg("两次密码不一致");
	    	return;
	    }
	    if (validate == verify) {
	        $.ajax({
	            url:IP+ "/DataMobile/user.ashx?Action=ForgetPassWord&Account=" + phone + "&NewPassWord=" + password,
	            type: 'get',
	            async:false,
	            dataType: 'json',
	            success: function (result) {
	                if (result.code == "100") {
	                    var phone = $('.phone').val();
	                    var password = $('.password').val();

	                    $.ajax({
	                        url:IP+ "/DataMobile/user.ashx?Action=Login&account=" + phone + "&password=" + password,
	                        type: 'get',
	                        async:false,
	                        dataType: 'json',
	                        success: function (dataJson) {
	                         	console.log(dataJson)
	                            if (dataJson.code == "100") {
	                                var dataJson = dataJson.data[0];
	                                SetCookie("UserId", dataJson.user_id, 59);
	                                SetCookie("UserName", dataJson.nick_name, 59);
	                                SetCookie('WebIm',dataJson.im,1159)
	                                
	                                location.href="../h5.html";
	                            } else {
	                                layer.msg(dataJson.message);
	                            }

	                        }
	                    });
	                } else {
	                    layer.msg(result.message);
	                }

	            }
	        });
	    }
	    else {
	        layer.msg("验证码输入错误！");
	        return;
	    }

	})
})