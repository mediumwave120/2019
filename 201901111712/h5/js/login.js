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
	$('.submit').on('click',function() {
		if (verify == undefined) {
	        var phone = $('.phone').val();
	        var password = $('.password').val();
	        var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
	        if (!phone) {
	            layer.msg("请输入手机号");
	            return;
	        }
	        if (!password) {
	            layer.msg("请输入");
	            return;
	        }
	        if (!reg.test(phone)) {
	            layer.msg(" 请输入有效的手机号");
	            return;
	        } else {
	            $.ajax({
	                url: IP+"/DataMobile/user.ashx?Action=Login&account=" + phone + "&password=" + password,
	                type: 'get',
	                async:false,
	                dataType: 'json',
	                success: function (dataJson) {
	                    console.log("登录：",dataJson);
	                   
	                    if (dataJson.code == "100") {
	                        var dataJson = dataJson.data[0];
	                        SetCookie("UserId", dataJson.user_id, 1159);
	                        SetCookie("account", dataJson.account, 1159);
	                        SetCookie("UserName", dataJson.nick_name, 1159);
	                        SetCookie("PaySubAccount", dataJson.SubAccount, 1159);
	                        SetCookie("TradeMemcode", dataJson.TradeMemcode, 1159);
	                        SetCookie("SubAccount", dataJson.SubAccount, 1159);
                            SetCookie('IM',dataJson.im,1159)
                            SetCookie('IsSetPayPassword',dataJson.IsSetPayPassword,1159)
                            localStorage.setItem('UserLogo',dataJson.logo);
                            localStorage.setItem('UserName',dataJson.nick_name);
	                        localStorage.setItem('IM',dataJson.im);
	                        localStorage.setItem('UserId',dataJson.user_id);
	                        localStorage.setItem('Sign',dataJson.sign);
	                  //   	 var goods_id = GetCookie("goods_id")
                			// var codeid = GetCookie("CodeId");
	                  //   	location.href = "goodsDetail.html?goods_id=" + goods_id + "&UserId=" + response.data.user_id + "&CodeId=" + codeid;

                            location.href="index.html";
                            setTimeout(function(){
                            	location.href="../login.html";
                            },2000)
                            
	                    } else {
	                        layer.msg(dataJson.message);
	                    }

	                }
	            });
	        }
	    } else {
	        var phone = $('.phone').val();
	        var validate = $('.validate').val();
	        if (validate == verify) {
	            $.ajax({
	                url: IP+"/DataMobile/user.ashx?Action=AccountLogin&account=" + phone,
	                type: 'get',
	                dataType: 'json',
	                success: function (dataJson) {

	                    if (dataJson.code == "100") {
	                        var dataJson = dataJson.data;
	                        SetCookie("UserId", dataJson.user_id, 1159);
	                        SetCookie("UserName", dataJson.nick_name, 1159);
	                        SetCookie("PaySubAccount", dataJson.SubAccount, 1159);
	                        SetCookie("TradeMemcode", dataJson.TradeMemcode, 1159);
                            SetCookie('WebIm',dataJson.im,1159)
                           location.href="index.html";
	                    } else {
	                        layer.msg(dataJson.message);
	                    }

	                }, error: function () {
	                    layer.msg("网络连接错误！");
	                }
	            });
	        } else {

	            layer.msg("验证码输入错误！");
	            return;
	        }

	    }
	})
	var flag=true;
	$('.login-type').on('click',function(){
		if(flag){
			$('.pwd').hide();
			$(this).val('账户密码登录');
			$('.pwd2').show();
			flag=false;
		}else{
			$('.pwd').show();
			$(this).val('短信验证登录');
			$('.pwd2').hide();
			flag=true;
		}
	})
})