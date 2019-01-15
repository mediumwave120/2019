const IP="https://bird.ioliu.cn/v1?url=http://122.112.209.170:8088";
const ip="http://122.112.209.170:8088";
$(function(){

	getGoodsRefundListByUserId();

})

//查询全部订单
//（1待付款 2待发货 3待收货 4待评价 5已完成 6已取消 7交易关闭）
function getGoodsRefundListByUserId(){
    //{"code":"100","firstPageTime":"2019/1/7 16:47:05","count":"9","message":"查询成功","data":[{"order_goods_salesreturn_id":"ddda9e98-4a8e-4e75-aac9-cf684b9fad88","buy_count":"1","salesreturn_money":"0.01","refund_state":"退款成功","deal_time":"2018/11/2 13:52:23","specificationsText":"鞋码:39,颜色分类:灰/红色","salesreturn_cause_text":"7天无理由","create_time":"2018-11-02 13:50:58","chargeback_number":"201811021350588758533","goods_id":"30091c31-97cf-4898-8165-20a96cfa070f","account":"14752214432","im":"07cac2ce5a7c46d09aa9c00af9339a32","name":"户外专用鞋","icon":"/Files/Goods/201810/1539788119690.19.png","merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺"},{"order_goods_salesreturn_id":"8a2ea211-55cc-4c8b-871d-6f5ee994e6eb","buy_count":"1","salesreturn_money":"0.01","refund_state":"退款成功","deal_time":"2018/10/26 13:27:17","specificationsText":"颜色分类:白色,鞋码:35","salesreturn_cause_text":"7天无理由","create_time":"2018-10-19 10:42:31","chargeback_number":"201810191042319638381","goods_id":"30091c31-97cf-4898-8165-20a96cfa070f","account":"14752214432","im":"07cac2ce5a7c46d09aa9c00af9339a32","name":"户外专用鞋","icon":"/Files/Goods/201810/1539788119690.19.png","merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺"},{"order_goods_salesreturn_id":"1ad42706-9bb1-4cba-8d07-6077dbf5e12a","buy_count":"1","salesreturn_money":"0.01","refund_state":"退款成功","deal_time":"2018/11/2 14:19:14","specificationsText":"鞋码:39,白色,颜色分类","salesreturn_cause_text":"做工问题","create_time":"2018-10-19 10:15:33","chargeback_number":"201810191015336022450","goods_id":"30091c31-97cf-4898-8165-20a96cfa070f","account":"14752214432","im":"07cac2ce5a7c46d09aa9c00af9339a32","name":"户外专用鞋","icon":"/Files/Goods/201810/1539788119690.19.png","merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺"},{"order_goods_salesreturn_id":"54cc1a0e-b593-40a2-b26f-ec6348277df3","buy_count":"1","salesreturn_money":"1299.00","refund_state":"退款成功","deal_time":"2018/9/20 13:46:18","specificationsText":"颜色:红色,运行内存:6G,系统内存:64G","salesreturn_cause_text":"7天无理由","create_time":"2018-09-20 13:45:23","chargeback_number":"201809201345232948395","goods_id":"7bf8f77e-f3b4-4d49-b7e0-08f58bf0cef3","account":"14752214432","im":"07cac2ce5a7c46d09aa9c00af9339a32","name":"小米6X","icon":"/Files/Goods/201809/1537369608250.07.jpg","merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺"},{"order_goods_salesreturn_id":"cba5c6d7-f2e3-453e-913e-163daeec9d4f","buy_count":"1","salesreturn_money":"0.01","refund_state":"退款成功","deal_time":"2018/9/6 10:43:41","specificationsText":"斤:1kg,两:1g","salesreturn_cause_text":"做工问题","create_time":"2018-09-06 10:35:51","chargeback_number":"201809061035515367049","goods_id":"6f1a51d3-473d-420e-99a2-94d18146eb12","account":"14752214432","im":"07cac2ce5a7c46d09aa9c00af9339a32","name":"测试","icon":"/Files/Goods/201808/1535019102748.46.jpg","merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺"},{"order_goods_salesreturn_id":"2486daf7-17a1-44e6-bb88-69ff2cd6a0a8","buy_count":"1","salesreturn_money":"0.01","refund_state":"退款成功","deal_time":"2018/11/2 14:19:21","specificationsText":"斤:1kg,两:1g","salesreturn_cause_text":"7天无理由","create_time":"2018-08-24 15:42:53","chargeback_number":"201808241542539868190","goods_id":"6f1a51d3-473d-420e-99a2-94d18146eb12","account":"14752214432","im":"07cac2ce5a7c46d09aa9c00af9339a32","name":"测试","icon":"/Files/Goods/201808/1535019102748.46.jpg","merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺"},{"order_goods_salesreturn_id":"b9407380-e882-4652-a862-e650356e3bb0","buy_count":"2","salesreturn_money":"0.01","refund_state":"退款成功","deal_time":"2018/8/22 13:55:55","specificationsText":"颜色:白色,尺码:s","salesreturn_cause_text":"7天无理由","create_time":"2018-08-22 13:43:27","chargeback_number":"201808221343279009886","goods_id":"2ae469f5-bd26-43d2-92e7-73262a9d2b7e","account":"14752214432","im":"07cac2ce5a7c46d09aa9c00af9339a32","name":"安卓商品3","icon":"/Files/Goods/201808/1534167755174.21.png","merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺"},{"order_goods_salesreturn_id":"c4cbe0ea-57dd-4972-bdbc-01ca0ce54c7e","buy_count":"2","salesreturn_money":"0.01","refund_state":"退款成功","deal_time":"2018/8/20 18:26:41","specificationsText":"颜色:白色,尺码:s","salesreturn_cause_text":"7天无理由","create_time":"2018-08-20 18:25:18","chargeback_number":"201808201825187208002","goods_id":"2ae469f5-bd26-43d2-92e7-73262a9d2b7e","account":"14752214432","im":"07cac2ce5a7c46d09aa9c00af9339a32","name":"安卓商品3","icon":"/Files/Goods/201808/1534167755174.21.png","merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺"},{"order_goods_salesreturn_id":"66f62b01-8fe9-494c-937e-574737eba5be","buy_count":"1","salesreturn_money":"0.01","refund_state":"退款成功","deal_time":"2018/9/3 14:13:48","specificationsText":"颜色分类:40,鞋码:白色","salesreturn_cause_text":"7天无理由","create_time":"2018-08-20 18:17:15","chargeback_number":"201808201817155889370","goods_id":"3b503655-57ab-41d7-af8d-20916e80410d","account":"18935460125","im":"67105e6dc1a74e8285a66caddbd6e25b","name":"阿迪达斯帆皮鞋","icon":"/Files/Goods/201808/1533131513192.56.jpg","merchants_in_id":"494c0498-6725-42bf-b7de-637e8aecb88a","shop_name":"稻草人旗舰店"}]}
	document.title="退款/售后";

	var url=IP+"/DataMobile/goods.ashx?Action=GetGoodsRefundListByUserId";
	var obj={};
		obj.pageIndex=1;
		obj.firstPageTime="";
		obj.user_id=localStorage.getItem('UserId');
	$.ajax({
        url: url,
        type: 'get',
        data:obj,
        dataType: 'json',
        success: function (result) {
        	
        	if(result.code=="100"){
        		var list=result.data;
        		var html="";
        		for (var i = 0; i < list.length; i++) {
        			html+="<li>";
						html+="<div class=\"shop\">";
							html+="<span>"+list[i].shop_name+"</span>";
							html+="<img src=\"../imgs/ic_right_arrow.png\">";			
						html+="</div>";
						html+="<div class=\"goods\">";
							html+="<ul>";
								html+="<li>";
									html+="<div class=\"goods-info\">";
										html+="<img src=\""+ip+list[i].icon+"\">";
										html+="<div class=\"goods-name\">"+list[i].name+"</div>";
										html+="<div class=\"goods-spec\">"+list[i].specificationsText+"</div>";
									html+="</div>";
									html+="<div class=\"state\"><img src=\"../imgs/tkuan@3x.png\" /><span>退款成功</span></div>";
								html+="</li>";
								
							html+="</ul>";
						html+="</div>";
						html+="<div class=\"order-state\">";
							html+="<a href='logistics.html?express_number="+list[i].express_number+"'><button class=\"logistics\">查看详情</button></a>";							
						html+="</div>";
					html+="</li>";					
        		}
        		$('.customer-service').html(html)
        	}
        },error:function(err){
        	alert(err);
        }
    });
}
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