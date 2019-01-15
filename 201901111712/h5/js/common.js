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
// document.documentElement.style.overflow='hidden';
document.body.addEventListener('touchmove',function (event) {event.preventDefault();}, true);
const IP="https://bird.ioliu.cn/v1?url=http://122.112.209.170:8088";
const IP1="https://bird.ioliu.cn/v1?url=http://122.112.209.170:8084";
const ip="http://122.112.209.170:8088";

//取消订单
function cancleOrder(order_id){
    var order_id=order_id;
    var user_id=localStorage.getItem('UserId');
    var url=IP+"/DataMobile/goods.ashx?Action=OrderClose";
    var order={};
        order.order_id=order_id;
        order.user_id=user_id;
    $.ajax({
        url: url,
        type: 'get',
        data:order,
        dataType: 'json',
        success: function (result) {
            if(result.code=="100"){
                alert(result.message);
                var url=location.href;
                var reg=/^.+:\/\/.+\/(.*)\.html(\?.*)?$/;
                var new_url=url.match(reg)[1];
                if(new_url=="order_detail"){
                    history.go(-1);
                    location.reload(); 
                }
                getOrderListByUserId("");
            }
        }
    });
}
//删除订单
function delOrder(order_id){
    var order_id=order_id;
    var user_id=localStorage.getItem('UserId');
    var url=IP+"/DataMobile/goods.ashx?Action=OrderDelete";
    var del_order={};
        del_order.order_id=order_id;
        del_order.user_id=user_id;
    $.ajax({
        url: url,
        type: 'get',
        data:del_order,
        dataType: 'json',
        success: function (result) {
            if(result.code=="100"){
                alert(result.message);
                getOrderListByUserId("");
            }
        }
    });
}
//确认收货
function orderConfirm(){
    var order_id=order_id;
    var user_id=localStorage.getItem('UserId');
    var url=IP+"/ThirdParty/HuaXia/HuaXiaHandler.ashx?Action=OrderConfirm";
    var del_order={};
        del_order.order_id=order_id;
        del_order.loginUserId=user_id;
    $.ajax({
        url: url,
        type: 'get',
        data:del_order,
        dataType: 'json',
        success: function (result) {
            if(result.code=="100"){
                alert(result.message);
                getOrderListByUserId("");
            }
        }
    });
}
//订单详情
function orderDetail(order_id,is_comment,express_number) {
    location.href="order_detail.html?order_id="+order_id+"&is_comment="+is_comment+"&express_number="+express_number;
}
