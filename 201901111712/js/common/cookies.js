function DelCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = GetCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
function GetUserName() {
    var UserName = GetCookie("UserName");
    if (UserName != "" && UserName != undefined) {
        return UserName;
    } else {

    } } 
function GetUserId() {     
    var UserId = GetCookie("UserId");     
    if(UserId != "" && UserId != undefined) {         
        return UserId;     
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
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
//清除当前页面cookie
function clearCookie() {
    var keys = document.cookie.match(/[^=;]+(?=\=)/g);
    if (keys)
    {
        for (var i = keys.length; i--;) {
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        }
    }
}
//清除浏览器所有cookie
function foreachcookie()
{
    var strCookie = document.cookie;
    var arrCookie = strCookie.split(";")
    for (var i = 0; i <arrCookie. length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr.length > 0)
        {
            DelCookie(arr[0]);
        }
    }
}

document.body.addEventListener('touchmove',function (event) {event.preventDefault();}, true);