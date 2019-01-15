new h_header().$mount('h-header');//把组件挂载到h-header标签上
new h_footer().$mount('h-footer');//把组件挂载到h-footer标签上
new h_login().$mount('h-login');//把组件挂载到h-footer标签上
$(function(){

	selectBalance();
	// $.ajax({
	// 	url:"122.112.209.170:8058/ThirdParty/HuaXia/HuaXiaHandler.ashx?Action=pay",
	// 	dataType:'json',
	// 	success:function(){
			
	// 	}

	// })
	var sum_price=localStorage.getItem("sum_price");
	var order_id=localStorage.getItem("order_id");

	$('.sum_price').text(sum_price);
	$('.order_id').text(order_id);
	var money=parseFloat($('.money').text());
	var sum_price=parseFloat($('.sum_price').text());
	$('#pay').on('click',function(){
		if(money<sum_price){
			alert('账户余额不足');
		}else{
			layer.prompt({title: '输入口令，并确认', formType: 1}, function(pass, index){
				//alert(pass);
			  //layer.close(index);
			  // layer.prompt({title: '随便写点啥，并确认', formType: 2}, function(text, index){
			  //   layer.close(index);
			  //   layer.msg('演示完毕！您的口令：'+ pass +'<br>您最后写下了：'+text);
			  // });
				var obj={};
					obj.loginUserId=GetCookie('UserId');//用户id
					obj.PaySubAccount=GetCookie('PaySubAccount');//付款子账户
					obj.TradeMemcode=GetCookie('TradeMemcode');//交易会员代码
					
					obj.PayeesSubAccount=localStorage.getItem('sub_account');//
					obj.OtherUserId=localStorage.getItem('merchants_user_id');//
					obj.TradeAccount=parseFloat(localStorage.getItem('sum_price')*100);//
					obj.account=localStorage.getItem('account');//
					obj.PayeesTradeMemCode=localStorage.getItem('trade_mem_code');//
					obj.order_id=localStorage.getItem('order_id');//
					obj.PayPassWord=pass;
					//console.log(obj);

					$.ajax({
						url:IP+"/ThirdParty/HuaXia/HuaXiaHandler.ashx?Action=pay",
						type: "get",
						data:obj,
						dataType:'json',
						success:function(result){
							console.log(result)
							if(result.code=="100"){
								// alert("支付成功")
								// layer.msg(result.message);
								//layer.close(index);
								location.href="选择支付成功.html"
							}else{

								layer.close(index);
							}
						}

					})
			});
			
		}
	})
});

function selectBalance(){
	var user_id=GetCookie('UserId');
	var sub_account=GetCookie('PaySubAccount');
	var trade_mem_code=GetCookie('TradeMemcode');
	var select_obj={};
		select_obj.loginUserId=user_id;
		select_obj.SubAccount=sub_account;
		select_obj.TradeMemcode=trade_mem_code;
	$.ajax({
      	url: IP+"/ThirdParty/HuaXia/HuaXiaHandler.ashx?Action=selectBalance",
      	type: "get",
      	data:select_obj,
      	dataType: "json",
      	success: function (datajson){
      		//{"?xml":{"@version":"1.0","@encoding":"GBK"},"CPMB2B":{"MessageData":{"Base":{"Version":"1.0","SignFlag":"1","SeverModel":"3"},"ResHeader":{"TransCodeId":"4636386531568354116","TransCode":"104020","Status":{"Code":"000000","Message":"交易成功"}},"DataBody":{"Account":"200201808780984","AccountName":null,"SubAccountMoney":"325","FreezeMoney":"4","Remark1":null,"Remark2":null}}}}
      		
        	console.log(datajson);
        	var money=parseFloat(datajson.CPMB2B.MessageData.DataBody.SubAccountMoney/100);
        	$('.money').text(money);
          
      	}
	}); 
}