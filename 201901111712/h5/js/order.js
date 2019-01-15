const IP="https://bird.ioliu.cn/v1?url=http://122.112.209.170:8088";
const ip="http://122.112.209.170:8088";
$(function(){
    //个人信息数量
	GetUserDetailCount();
    //个人信息
	GetInfo();	
    //当月消费
    AmontThisMonth();
    //余额查询
    selectBalance();
})
//查询全部订单
//（1待付款 2待发货 3待收货 4待评价 5已完成 6已取消 7交易关闭）
function GetUserDetailCount(){
    //{"code":"100","message":"查询成功","data":[{"goods_collectCount":"4","goods_focusCount":"5","goods_watchCount":"78","merchants_in_state":"2","obligationCount":"126","sendgoodsCount":"16","forgoodsCount":"1","commentCount":"1"}]}
	var url=IP+"/DataMobile/goods.ashx?Action=GetUserDetailCount";
	var obj={};
		obj.user_id=localStorage.getItem('UserId');
	$.ajax({
        url: url,
        type: 'get',
        data:obj,
        dataType: 'json',
        success: function (result) {
        	if(result.code=="100"){
        		var list=result.data[0];
        		var html="";

                $('.one').find('.num').html(list.goods_collectCount);
                $('.two').find('.num').html(list.goods_focusCount);
                $('.three').find('.num').html(list.goods_watchCount);
        		$('.four').find('.num').html();

                if(parseInt(list.obligationCount)>0){
                    $('.one').find('.img').append("<img src=\"../imgs/daifukuan@3x.png\"><span>"+list.obligationCount+"</span>");
                }else{
                    $('.one').find('.img').append("<img src=\"../imgs/daifukuan@3x.png\">");
                }
                
                if(parseInt(list.sendgoodsCount)>0){
                    $('.two').find('.img').append("<img src=\"../imgs/daifahuo@3x.png\"><span>"+list.sendgoodsCount+"</span>");
                }else{
                    $('.two').find('.img').append("<img src=\"../imgs/daifahuo@3x.png\">");
                }
                if(parseInt(list.forgoodsCount)>0){
                    $('.three').find('.img').append("<img src=\"../imgs/daishouhuo@3x.png\"><span>"+list.forgoodsCount+"</span>");
                }else{
                    $('.three').find('.img').append("<img src=\"../imgs/daishouhuo@3x.png\">");
                }
                if(parseInt(list.commentCount)>0){
                    $('.four').find('.img').append("<img src=\"../imgs/daipjia@3x.png\"><span>"+list.commentCount+"</span>");
                }else{
                    $('.four').find('.img').append("<img src=\"../imgs/daipjia@3x.png\">");
                }
                // $('.one').find('.img span').html(list.obligationCount);
                // $('.two').find('.img span').html(list.sendgoodsCount);
                // $('.three').find('.img span').html(list.forgoodsCount);
                // $('.four').find('.img span').html(list.commentCount);



        		//$('.five').find('.img span').html(list.obligationCount);

        	}
        },error:function(err){
        	alert(err);
        }
    });
}
function GetInfo(){
    var user_logo=localStorage.getItem('UserLogo');
    var user_name=localStorage.getItem('UserName');
    var sign=localStorage.getItem('Sign');
    $('.top').find('.left>img').attr('src',ip+user_logo);
    $('.top').find('.center>.nickname').text(user_name);
    $('.top').find('.center>.autograph').text(sign);
    document.body.addEventListener('touchmove', function (event) {
    event.preventDefault();}, true);
}
//ThirdParty/HuaXia/HuaXiaHandler.ashx

function AmontThisMonth(){
    // /{"code":"100","message":"查询成功","result":"0"}
    var url=IP+"/ThirdParty/HuaXia/HuaXiaHandler.ashx?Action=AmontThisMonth";
    var obj={};
        obj.loginUserId=localStorage.getItem('UserId');
    $.ajax({
        url: url,
        type: 'get',
        data:obj,
        dataType: 'json',
        success: function (result) {
            
            if(result.code=="100"){
                var amont=parseFloat(result.result)/100;
                console.log(amont);
                $('#num1').html(amont.toFixed(2));
            }
        },error:function(err){
            alert(err);
        }
    });
}

function selectBalance(){
    //{"?xml":{"@version":"1.0","@encoding":"GBK"},"CPMB2B":{"MessageData":{"Base":{"Version":"1.0","SignFlag":"1","SeverModel":"3"},"ResHeader":{"TransCodeId":"5040709025246644038","TransCode":"104020","Status":{"Code":"000000","Message":"交易成功"}},"DataBody":{"Account":"200201808780984","AccountName":null,"SubAccountMoney":"325","FreezeMoney":"4","Remark1":null,"Remark2":null}}}}
    var url=IP+"/ThirdParty/HuaXia/HuaXiaHandler.ashx?Action=selectBalance";
    var obj={};
        obj.loginUserId=GetCookie('UserId');//用户id
        obj.SubAccount=GetCookie('SubAccount');//付款子账户
        obj.TradeMemcode=GetCookie('TradeMemcode');//交易会员代码
    $.ajax({
        url: url,
        type: 'get',
        data:obj,
        dataType: 'json',
        success: function (result) {
            
           var money=(parseFloat(result.CPMB2B.MessageData.DataBody.SubAccountMoney)/100);           
           $('#num2').html(money.toFixed(2));
           
            
        },error:function(err){
            alert(err);
        }
    });
}