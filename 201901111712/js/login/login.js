var apiUrl="https://bird.ioliu.cn/v1?url=http://122.112.209.170:8088"
var flag = true;//验证码、密码登录切换
$('.vlogin').on('click', function () {
    if (flag) {
        $(this).text('密码登录')

        $('.validate').hide();;
        $('.password').attr('placeholder', '请输入6-12位数字字母组合密码').show();

        $('.get-validate').hide();
        flag = false;
    } else {
        $(this).text('验证码登录')
        $('.validate').attr('placeholder', '请输入验证码');
        $('.get-validate').show();
        flag = true;
    }
})
//立即注册
$('.now-register').on('click', function () {
    $('.login').hide();
    $('.lg').text('注册');
    $('.sign-in').text('REGISTERED').css('left', '136px');
    $('.password').show().css('top', '-130px');
    $('.now-register,.now-login').hide();
    $('.finish-login').show().css('top', '50px');
    $('.get-validate').show();
    $('.validate').attr('placeholder', '请输入验证码').show();
})

//完成注册并登录
$('.finish-login').on('click', function () {
    var phone = $('.phone').val();
    var password = $('.password').val();
    var validate = $('.validate').val();
    if (validate == verify) {
        $.ajax({
            url: apiUrl+"/DataMobile/user.ashx?Action=RegisterUser&account=" + phone + "&password=" + password,
            type: 'post',
            dataType: 'json',
            success: function (result) {
                if (result.code == "100") {
                    var phone = $('.phone').val();
                    var password = $('.password').val();

                    $.ajax({
                        url:  apiUrl+"/DataMobile/user.ashx?Action=Login&account=" + phone + "&password=" + password,
                        type: 'post',
                        dataType: 'json',
                        success: function (dataJson) {
                            if (dataJson.code == "100") {
                                var dataJson = dataJson.data[0];
                                SetCookie("UserId", dataJson.id, 59);
                                SetCookie("UserName", dataJson.nick_name, 59);
                                $(".name").text(name);
                                console.log($(".login-end"));
                                $(".login-end").css('display', 'block');
                            }

                        }
                    });
                }

            }
        });
    }
    else {
        alert("验证码输入错误！");
        return;
    }

})
//获取验证码
var verify;
var countdown = 60;
$('.get-validate').on('click', function () {
    var phone = $(".phone").val();
    var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    if (phone == "") {
        alert("请输入手机号");
        return;
    }
    if (!reg.test(phone)) {
        //$("#errMsg1").html(" 请输入有效的手机号");
        //$("#errMsg1").show();
        alert(" 请输入有效的手机号");
        return;
    } else {
        $.ajax({
            url:  apiUrl+"/Data/Verify.ashx?Action=CheckNum&Account=" + phone,
            type: 'post',
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
$(function () {

    var name = GetUserName();
    if (name != "" && name != undefined) {
        $(".name").text(name);
        $(".login-state").hide();
        $(".login-end").show();


    }

})
function GetUserName() {
    var UserName = GetCookie("UserName");
    if (UserName != "" && UserName != undefined) {
        return UserName;
    } else {

    }
}
function SetCookie(name, value, time) {
    var exp = new Date();
    exp.setTime(exp.getTime() + parseInt(time) * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
function GetCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null)
        return unescape(arr[2]);
    return null;
}