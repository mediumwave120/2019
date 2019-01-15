$(function(){
	var order_id=GetQueryString('order_id');
	var is_comment=GetQueryString('is_comment');
	var express_number=GetQueryString('express_number');
	getOrderDetailByUserId(order_id,is_comment,express_number);

})

//订单详情
function getOrderDetailByUserId(order_id,is_comment,express_number){
	document.title="订单详情";
	var user_id=localStorage.getItem('UserId');
	var url=IP+"/DataMobile/goods.ashx?Action=GetOrderDetailByUserId";
	var order_detail={};
		order_detail.order_id=order_id;
		order_detail.user_id=user_id;
	$.ajax({
        url: url,
        type: 'get',
        data:order_detail,
        dataType: 'json',
        success: function (result) {
        	//{"code":"100","message":"查询成功","data":[{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","contact_people":"小欧","contact_tel":"17301764656","area":"河北省石家庄市","detailed_address":"人民路21号田酷兔兔突突突兔兔V5图酷兔兔5句路途田考虑考虑","order_number":"201812191531402170448","create_time":"2018-12-19 15:31:40","pay_time":"2018-12-19 15:32:31","pay_number":"5163688404126695734","order_id":"18507b88-a05d-45fc-81d7-c58a9cb24357","order_state":"2","sum_price":"0.01","courier_fees":"0.00","order_sum_price":"0.01","im":"07cac2ce5a7c46d09aa9c00af9339a32","account":"14752214432","deliver_time":"","GoodsList":[{"order_goods_id":"e754b59b-e0ed-4e38-9d84-6b806760f7b5","goods_id":"29b1deab-509d-4189-8632-317482659adc","name":"大美盛年","icon":"/Files/Goods/201812/a2a044f7ecc34548bb3b44e0d27c3fa5.jpg","buying_price":"0.01","buy_count":"1","refund_state":"0","specificationsText":""}]}]}
        	
        	if(result.code=="100"){
        		var result=result.data[0];
        		console.log(result);
        		var html="";
        		html+="<div class=\"order-state\">";
        			//1 等待买家付款  2 等待卖家发货 3 等待买家收货 4 交易成功 5 交易成功 6 交易已取消 7 交易已关闭
        			switch(result.order_state){
        				case "1":
							html+="<div class=\"left\">等待买家付款</div>";
							break;
						case "2":
							html+="<div class=\"left\">等待卖家发货</div>";
							break;
						case "3":
							html+="<div class=\"left\">等待买家收货</div>";
							break;
						case "4":
							html+="<div class=\"left\">交易成功</div>";
							break;
						case "5":
							html+="<div class=\"left\">交易成功</div>";
							break;
						case "6":
							html+="<div class=\"left\">交易已取消</div>";
							break;
						case "7":
							html+="<div class=\"left\">交易已关闭</div>";
							break;
						default:;
        			}
					// html+="<div class=\"left\">等待买家付款</div>";
					html+="<div class=\"right\">";
						html+="<img src=\"../imgs/order_detail_icon.png\">";
					html+="</div>";
				html+="</div>";

				html+="<div class=\"personal-info\">";
					html+="<div class=\"top\">";
						html+="<span>收货人：</span><span>"+result.contact_people+"</span>";
						html+="<span class=\"right\">"+result.contact_tel+"</span>";
					html+="</div>";
					html+="<div class=\"bottom\">";
						html+="<img src=\"../imgs/dizhi-2@3x.png\">";
						html+="<span class=\"address\">收货地址：<span>"+result.area+result.detailed_address+"</span></span>";				
					html+="</div>";
				html+="</div>";

				html+="<ul class=\"order\">";
					html+="<li>";
						html+="<div class=\"shop\">";
							html+="<span>"+result.shop_name+"</span>";
						html+="</div>";
						html+="<div class=\"goods\">";
							html+="<ul>";
								var goods=result.GoodsList;
								for (var i = 0; i < goods.length; i++) {									
									html+="<li>";
										html+="<div class=\"goods-info\">";
											html+="<img src=\""+ip+goods[i].icon+"\">";
											html+="<div class=\"goods-name\">"+goods[i].name+"</div>";
											html+="<div class=\"goods-spec\">"+goods[i].specificationsText+"</div>";
											html+="<div class=\"goods-price\">";
												html+="<div class=\"one\">";
													html+="<span>¥</span><span>"+goods[i].buying_price+"</span>";
												html+="</div>";
												html+="<div class=\"two\">";
													html+="<span>"+goods[i].buy_count+"</span>";
												html+="</div>";
											html+="</div>";
										html+="</div>";
										
										if(result.order_state=="1"||result.order_state=="6"||result.order_state=="7"){
											html+="<div class=\"state\"></div>";
										}else{
											html+="<div class=\"state\"><a href=\"refund.html?order_id="+result.order_id+"&order_goods_id="+goods[i].order_goods_id+"\"><button>退款</button></a></div>";
										}
									html+="</li>";						
								}
							html+="</ul>";
							
						html+="</div>";
						html+="<div class=\"calc\">";
							html+="<div class=\"goods-price\">";
								html+="<span>商品总价</span>";
								html+="<span>¥<b>"+result.order_sum_price+"</b></span>";
							html+="</div>";
							html+="<div class=\"freight\">";
								html+="<span>运费（快递）</span>";
								html+="<span>¥<b>"+result.courier_fees+"</b></span>";
							html+="</div>";
							html+="<div class=\"order-total\">";
								html+="<span>订单总价</span>";
								html+="<span>¥<b>"+result.sum_price+"</b></span>";
							html+="</div>";
						html+="</div>";
						html+="<div class=\"pay-state\">";
							if(result.order_state=="1"){
								html+="<span>需付款</span>";								
							}else{

								html+="<span>已付款</span>";								
							}
							html+="<span>¥<b>"+result.sum_price+"</b></span>";
						html+="</div>";
						html+="<div class=\"contact\">";
							html+="<div class=\"seller\">联系卖家</div>";
							html+="<a class=\"call\" href=\"tel:"+result.account+"\"><div >拨打电话 </div></a> ";
						html+="</div>";
						html+="<div class=\"item\">";
							html+="<div class=\"order-num\">";
								html+="<span>订单编号：</span>";
								html+="<span>"+result.order_number+"</span>";
							html+="</div>";
							html+="<div class=\"order-time\">";
								html+="<div class=\"create-time\">创建时间：<span>"+result.create_time+"</span></div>";									
								if(result.order_state==="2"){
									html+="<div class=\"pay-time\">付款时间：<span>"+result.pay_time+"</span></div>";
								}
								if(result.order_state!=="1" && result.order_state!=="2"){
									html+="<div class=\"pay-time\">付款时间：<span>"+result.pay_time+"</span></div>";
									html+="<div class=\"send-time\">发货时间：<span>"+result.deliver_time+"</span></div>";
								}
								
							html+="</div>";
						html+="</div>";
						html+="<div class=\"order-state1\">";
							switch(result.order_state){
								case "1":
									html+="<button class=\"cancle\" onclick=\"cancleOrder('"+result.order_id+"')\">取消订单</button>";
									html+="<button class=\"pay\" onclick=\"buys(this)\">付款</button>";
								  break;
								case "2":
								  
								  break;
								case "3":
								  html+="<button class=\"confirm\"  onclick=\"orderConfirm('"+result.order_id+"')\">确认收货</button>"
								  break;
								case "4":
								  html+="<button class=\"del\"  onclick=\"delOrder('"+result.order_id+"')\">删除订单</button>";
								  html+="<a href='logistics.html?express_number="+express_number+"'><button class=\"logistics\">查看物流</button></a>"
								  html+="<button class=\"evaluate\">评价</button>"
								  break;
								case "5":
								  //是否评价 is_comment 
								  //删除订单  查看物流  追评 
								  html+="<button class=\"del\"  onclick=\"delOrder('"+result.order_id+"')\">删除订单</button>";
								  html+="<a href='logistics.html?express_number="+express_number+"'><button class=\"logistics\">查看物流</button></a>"
								  if(is_comment=="1"){
								  	html+="<a href=''></a>"
								  }else{
								  	html+="<a href='logistics.html?express_number="+express_number+"'><button class=\"evaluate\">追评</button></a>"
								  }

								  break;
								case "6":
								  
								  break;
								case "7":
								  
								  break;
								default:
									;
							}
						html+="</div>";
					html+="</li>";	
				html+="</ul>";
        		$('.detail').html(html);
        	}
        }
    });
}
