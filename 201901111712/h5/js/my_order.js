$(function(){

	getOrderListByUserId(GetQueryString('state'));
	$('.tab').on('click','div',function(){
		var this_class=$(this).attr('data-tab');
		$(this).addClass('active').siblings().removeClass('active');
		switch(this_class){
			case "one":
			  getOrderListByUserId("");
			  break;
			case "two":
			  getOrderListByUserId("1");
			  break;
			case "three":
			  getOrderListByUserId("2");
			  break;
			case "four":
			  getOrderListByUserId("3");
			  break;
			case "five":
			  getOrderListByUserId("4");
			  break;
			default:
			//
		}

	})


})

//查询全部订单
//（1待付款 2待发货 3待收货 4待评价 5已完成 6已取消 7交易关闭）
function getOrderListByUserId(state){
	document.title="我的订单";
	switch(state){
		case "1":
			$('.tab>div').eq(1).addClass('active').siblings().removeClass('active');
		  break;
		case "2":
		  $('.tab>div').eq(2).addClass('active').siblings().removeClass('active');
		  break;
		case "3":
		  $('.tab>div').eq(3).addClass('active').siblings().removeClass('active');
		  break;
		case "4":
		  $('.tab>div').eq(4).addClass('active').siblings().removeClass('active');
		  break;
		case "5":
		  $('.tab>div').eq(5).addClass('active').siblings().removeClass('active');
		  break;
		default:
	}
	var url=IP+"/DataMobile/goods.ashx?Action=GetOrderListByUserId";
	var obj={};
		obj.order_state=state;
		obj.pageIndex=1;
		obj.firstPageTime="";
		obj.user_id=localStorage.getItem('UserId');
	$.ajax({
        url: url,
        type: 'get',
        data:obj,
        dataType: 'json',
        success: function (result) {
            // ""全部 {"code":"100","firstPageTime":"2019/1/7 16:28:57","count":"348","message":"查询成功","data":[{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","is_comment":"0","courier_fees":"0.00","order_number":"201901071600230595101","area":"安徽省合肥市","detailed_address":"人民路1号","order_id":"7947ca8f-e476-4ca1-9b94-0f4c5a6d5dfa","express_number":"","sum_price":"0.10","SubAccount":"200201808000004","TradeMemcode":"0000139759","user_id":"07cac2ce-5a7c-46d0-9aa9-c00af9339a32","account":"14752214432","buyer_message":"","order_state":"1","GoodsList":[{"order_goods_id":"2ef047e4-0ca6-49ee-b2f1-1a51b1c41226","goods_id":"31fb769c-7e4d-4a02-8528-14757b45d1f8","name":"安卓商品2次","icon":"","buying_price":"0.10","original_price":"11.00","buy_count":"1","refund_state":"0","specificationsText":"颜色分类:白色,鞋码:35"}],"goods_count":"1"},{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","is_comment":"0","courier_fees":"0.00","order_number":"201901071557416226353","area":"安徽省合肥市","detailed_address":"人民路1号","order_id":"d6a35cbf-8013-4541-90f8-bc93dbf36b55","express_number":"","sum_price":"0.10","SubAccount":"200201808000004","TradeMemcode":"0000139759","user_id":"07cac2ce-5a7c-46d0-9aa9-c00af9339a32","account":"14752214432","buyer_message":"","order_state":"1","GoodsList":[{"order_goods_id":"a9c998c3-594c-44a7-8b5f-46c69ff4350a","goods_id":"31fb769c-7e4d-4a02-8528-14757b45d1f8","name":"安卓商品2次","icon":"","buying_price":"0.10","original_price":"11.00","buy_count":"1","refund_state":"0","specificationsText":"颜色分类:白色,鞋码:35"}],"goods_count":"1"},{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","is_comment":"0","courier_fees":"0.00","order_number":"201901071551285597858","area":"安徽省合肥市","detailed_address":"人民路1号","order_id":"92986d8c-48b6-4176-8dfd-f8a4f1966914","express_number":"","sum_price":"0.10","SubAccount":"200201808000004","TradeMemcode":"0000139759","user_id":"07cac2ce-5a7c-46d0-9aa9-c00af9339a32","account":"14752214432","buyer_message":"","order_state":"1","GoodsList":[{"order_goods_id":"1350a783-570a-47b8-a7d8-24a59035ad20","goods_id":"31fb769c-7e4d-4a02-8528-14757b45d1f8","name":"安卓商品2次","icon":"","buying_price":"0.10","original_price":"11.00","buy_count":"1","refund_state":"0","specificationsText":"颜色分类:白色,鞋码:35"}],"goods_count":"1"},{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","is_comment":"0","courier_fees":"0.00","order_number":"201901071550329346869","area":"安徽省合肥市","detailed_address":"人民路1号","order_id":"6a57a4d4-4c53-4732-8439-c07eca148c67","express_number":"","sum_price":"0.10","SubAccount":"200201808000004","TradeMemcode":"0000139759","user_id":"07cac2ce-5a7c-46d0-9aa9-c00af9339a32","account":"14752214432","buyer_message":"","order_state":"1","GoodsList":[{"order_goods_id":"65ebe4e3-8647-48b3-ba96-413a6a5dbe33","goods_id":"31fb769c-7e4d-4a02-8528-14757b45d1f8","name":"安卓商品2次","icon":"","buying_price":"0.10","original_price":"11.00","buy_count":"1","refund_state":"0","specificationsText":"颜色分类:白色,鞋码:35"}],"goods_count":"1"},{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","is_comment":"0","courier_fees":"0.00","order_number":"201901071550097781056","area":"安徽省合肥市","detailed_address":"人民路1号","order_id":"c9bbc859-3de1-46a9-aa44-bb55f1823cc4","express_number":"","sum_price":"0.10","SubAccount":"200201808000004","TradeMemcode":"0000139759","user_id":"07cac2ce-5a7c-46d0-9aa9-c00af9339a32","account":"14752214432","buyer_message":"","order_state":"1","GoodsList":[{"order_goods_id":"231cecb9-a00d-4a7c-9f85-8d724067811f","goods_id":"31fb769c-7e4d-4a02-8528-14757b45d1f8","name":"安卓商品2次","icon":"","buying_price":"0.10","original_price":"11.00","buy_count":"1","refund_state":"0","specificationsText":"颜色分类:白色,鞋码:35"}],"goods_count":"1"},{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","is_comment":"0","courier_fees":"0.00","order_number":"201901071549492002552","area":"安徽省合肥市","detailed_address":"人民路1号","order_id":"855cee6c-8c27-4c36-922d-570e68270237","express_number":"","sum_price":"0.10","SubAccount":"200201808000004","TradeMemcode":"0000139759","user_id":"07cac2ce-5a7c-46d0-9aa9-c00af9339a32","account":"14752214432","buyer_message":"","order_state":"1","GoodsList":[{"order_goods_id":"f2dbb8a8-c103-465b-8106-7e42a2048431","goods_id":"31fb769c-7e4d-4a02-8528-14757b45d1f8","name":"安卓商品2次","icon":"","buying_price":"0.10","original_price":"11.00","buy_count":"1","refund_state":"0","specificationsText":"颜色分类:白色,鞋码:35"}],"goods_count":"1"},{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","is_comment":"0","courier_fees":"0.00","order_number":"201901071549177167923","area":"安徽省合肥市","detailed_address":"人民路1号","order_id":"79a17bfe-3f3a-4870-a5e5-025123d28e7b","express_number":"","sum_price":"0.10","SubAccount":"200201808000004","TradeMemcode":"0000139759","user_id":"07cac2ce-5a7c-46d0-9aa9-c00af9339a32","account":"14752214432","buyer_message":"","order_state":"1","GoodsList":[{"order_goods_id":"a4b2e83e-96b7-476c-81cd-546bf37de00b","goods_id":"31fb769c-7e4d-4a02-8528-14757b45d1f8","name":"安卓商品2次","icon":"","buying_price":"0.10","original_price":"11.00","buy_count":"1","refund_state":"0","specificationsText":"颜色分类:白色,鞋码:35"}],"goods_count":"1"},{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","is_comment":"0","courier_fees":"0.00","order_number":"201901071548563720979","area":"安徽省合肥市","detailed_address":"人民路1号","order_id":"51cc0501-66c4-46ab-88aa-503d7815a01b","express_number":"","sum_price":"0.10","SubAccount":"200201808000004","TradeMemcode":"0000139759","user_id":"07cac2ce-5a7c-46d0-9aa9-c00af9339a32","account":"14752214432","buyer_message":"","order_state":"1","GoodsList":[{"order_goods_id":"5c872a74-e623-4963-a30c-c05c9cac2f80","goods_id":"31fb769c-7e4d-4a02-8528-14757b45d1f8","name":"安卓商品2次","icon":"","buying_price":"0.10","original_price":"11.00","buy_count":"1","refund_state":"0","specificationsText":"颜色分类:白色,鞋码:35"}],"goods_count":"1"},{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","is_comment":"0","courier_fees":"0.00","order_number":"201901071547239034792","area":"安徽省合肥市","detailed_address":"人民路1号","order_id":"aa64c18a-1f9b-4361-abc8-a1b06e35708c","express_number":"","sum_price":"0.10","SubAccount":"200201808000004","TradeMemcode":"0000139759","user_id":"07cac2ce-5a7c-46d0-9aa9-c00af9339a32","account":"14752214432","buyer_message":"","order_state":"1","GoodsList":[{"order_goods_id":"02b11d7e-3622-4689-b075-530a9092396d","goods_id":"31fb769c-7e4d-4a02-8528-14757b45d1f8","name":"安卓商品2次","icon":"","buying_price":"0.10","original_price":"11.00","buy_count":"1","refund_state":"0","specificationsText":"颜色分类:白色,鞋码:35"}],"goods_count":"1"},{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","is_comment":"0","courier_fees":"0.00","order_number":"201901071546370912539","area":"安徽省合肥市","detailed_address":"人民路1号","order_id":"4af4b2a5-ff16-495d-b4e5-3bcc3cff97f3","express_number":"","sum_price":"0.10","SubAccount":"200201808000004","TradeMemcode":"0000139759","user_id":"07cac2ce-5a7c-46d0-9aa9-c00af9339a32","account":"14752214432","buyer_message":"","order_state":"1","GoodsList":[{"order_goods_id":"2d5c3225-13bd-4001-add3-cf0485a715d2","goods_id":"31fb769c-7e4d-4a02-8528-14757b45d1f8","name":"安卓商品2次","icon":"","buying_price":"0.10","original_price":"11.00","buy_count":"1","refund_state":"0","specificationsText":"颜色分类:白色,鞋码:35"}],"goods_count":"1"}]}
        	//1{"code":"100","firstPageTime":"2019/1/7 16:30:54","count":"125","message":"查询成功","data":[{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","is_comment":"0","courier_fees":"0.00","order_number":"201901071600230595101","area":"安徽省合肥市","detailed_address":"人民路1号","order_id":"7947ca8f-e476-4ca1-9b94-0f4c5a6d5dfa","express_number":"","sum_price":"0.10","SubAccount":"200201808000004","TradeMemcode":"0000139759","user_id":"07cac2ce-5a7c-46d0-9aa9-c00af9339a32","account":"14752214432","buyer_message":"","order_state":"1","GoodsList":[{"order_goods_id":"2ef047e4-0ca6-49ee-b2f1-1a51b1c41226","goods_id":"31fb769c-7e4d-4a02-8528-14757b45d1f8","name":"安卓商品2次","icon":"","buying_price":"0.10","original_price":"11.00","buy_count":"1","refund_state":"0","specificationsText":"颜色分类:白色,鞋码:35"}],"goods_count":"1"},{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","is_comment":"0","courier_fees":"0.00","order_number":"201901071557416226353","area":"安徽省合肥市","detailed_address":"人民路1号","order_id":"d6a35cbf-8013-4541-90f8-bc93dbf36b55","express_number":"","sum_price":"0.10","SubAccount":"200201808000004","TradeMemcode":"0000139759","user_id":"07cac2ce-5a7c-46d0-9aa9-c00af9339a32","account":"14752214432","buyer_message":"","order_state":"1","GoodsList":[{"order_goods_id":"a9c998c3-594c-44a7-8b5f-46c69ff4350a","goods_id":"31fb769c-7e4d-4a02-8528-14757b45d1f8","name":"安卓商品2次","icon":"","buying_price":"0.10","original_price":"11.00","buy_count":"1","refund_state":"0","specificationsText":"颜色分类:白色,鞋码:35"}],"goods_count":"1"},{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","is_comment":"0","courier_fees":"0.00","order_number":"201901071551285597858","area":"安徽省合肥市","detailed_address":"人民路1号","order_id":"92986d8c-48b6-4176-8dfd-f8a4f1966914","express_number":"","sum_price":"0.10","SubAccount":"200201808000004","TradeMemcode":"0000139759","user_id":"07cac2ce-5a7c-46d0-9aa9-c00af9339a32","account":"14752214432","buyer_message":"","order_state":"1","GoodsList":[{"order_goods_id":"1350a783-570a-47b8-a7d8-24a59035ad20","goods_id":"31fb769c-7e4d-4a02-8528-14757b45d1f8","name":"安卓商品2次","icon":"","buying_price":"0.10","original_price":"11.00","buy_count":"1","refund_state":"0","specificationsText":"颜色分类:白色,鞋码:35"}],"goods_count":"1"},{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","is_comment":"0","courier_fees":"0.00","order_number":"201901071550329346869","area":"安徽省合肥市","detailed_address":"人民路1号","order_id":"6a57a4d4-4c53-4732-8439-c07eca148c67","express_number":"","sum_price":"0.10","SubAccount":"200201808000004","TradeMemcode":"0000139759","user_id":"07cac2ce-5a7c-46d0-9aa9-c00af9339a32","account":"14752214432","buyer_message":"","order_state":"1","GoodsList":[{"order_goods_id":"65ebe4e3-8647-48b3-ba96-413a6a5dbe33","goods_id":"31fb769c-7e4d-4a02-8528-14757b45d1f8","name":"安卓商品2次","icon":"","buying_price":"0.10","original_price":"11.00","buy_count":"1","refund_state":"0","specificationsText":"颜色分类:白色,鞋码:35"}],"goods_count":"1"},{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","is_comment":"0","courier_fees":"0.00","order_number":"201901071550097781056","area":"安徽省合肥市","detailed_address":"人民路1号","order_id":"c9bbc859-3de1-46a9-aa44-bb55f1823cc4","express_number":"","sum_price":"0.10","SubAccount":"200201808000004","TradeMemcode":"0000139759","user_id":"07cac2ce-5a7c-46d0-9aa9-c00af9339a32","account":"14752214432","buyer_message":"","order_state":"1","GoodsList":[{"order_goods_id":"231cecb9-a00d-4a7c-9f85-8d724067811f","goods_id":"31fb769c-7e4d-4a02-8528-14757b45d1f8","name":"安卓商品2次","icon":"","buying_price":"0.10","original_price":"11.00","buy_count":"1","refund_state":"0","specificationsText":"颜色分类:白色,鞋码:35"}],"goods_count":"1"},{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","is_comment":"0","courier_fees":"0.00","order_number":"201901071549492002552","area":"安徽省合肥市","detailed_address":"人民路1号","order_id":"855cee6c-8c27-4c36-922d-570e68270237","express_number":"","sum_price":"0.10","SubAccount":"200201808000004","TradeMemcode":"0000139759","user_id":"07cac2ce-5a7c-46d0-9aa9-c00af9339a32","account":"14752214432","buyer_message":"","order_state":"1","GoodsList":[{"order_goods_id":"f2dbb8a8-c103-465b-8106-7e42a2048431","goods_id":"31fb769c-7e4d-4a02-8528-14757b45d1f8","name":"安卓商品2次","icon":"","buying_price":"0.10","original_price":"11.00","buy_count":"1","refund_state":"0","specificationsText":"颜色分类:白色,鞋码:35"}],"goods_count":"1"},{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","is_comment":"0","courier_fees":"0.00","order_number":"201901071549177167923","area":"安徽省合肥市","detailed_address":"人民路1号","order_id":"79a17bfe-3f3a-4870-a5e5-025123d28e7b","express_number":"","sum_price":"0.10","SubAccount":"200201808000004","TradeMemcode":"0000139759","user_id":"07cac2ce-5a7c-46d0-9aa9-c00af9339a32","account":"14752214432","buyer_message":"","order_state":"1","GoodsList":[{"order_goods_id":"a4b2e83e-96b7-476c-81cd-546bf37de00b","goods_id":"31fb769c-7e4d-4a02-8528-14757b45d1f8","name":"安卓商品2次","icon":"","buying_price":"0.10","original_price":"11.00","buy_count":"1","refund_state":"0","specificationsText":"颜色分类:白色,鞋码:35"}],"goods_count":"1"},{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","is_comment":"0","courier_fees":"0.00","order_number":"201901071548563720979","area":"安徽省合肥市","detailed_address":"人民路1号","order_id":"51cc0501-66c4-46ab-88aa-503d7815a01b","express_number":"","sum_price":"0.10","SubAccount":"200201808000004","TradeMemcode":"0000139759","user_id":"07cac2ce-5a7c-46d0-9aa9-c00af9339a32","account":"14752214432","buyer_message":"","order_state":"1","GoodsList":[{"order_goods_id":"5c872a74-e623-4963-a30c-c05c9cac2f80","goods_id":"31fb769c-7e4d-4a02-8528-14757b45d1f8","name":"安卓商品2次","icon":"","buying_price":"0.10","original_price":"11.00","buy_count":"1","refund_state":"0","specificationsText":"颜色分类:白色,鞋码:35"}],"goods_count":"1"},{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","is_comment":"0","courier_fees":"0.00","order_number":"201901071547239034792","area":"安徽省合肥市","detailed_address":"人民路1号","order_id":"aa64c18a-1f9b-4361-abc8-a1b06e35708c","express_number":"","sum_price":"0.10","SubAccount":"200201808000004","TradeMemcode":"0000139759","user_id":"07cac2ce-5a7c-46d0-9aa9-c00af9339a32","account":"14752214432","buyer_message":"","order_state":"1","GoodsList":[{"order_goods_id":"02b11d7e-3622-4689-b075-530a9092396d","goods_id":"31fb769c-7e4d-4a02-8528-14757b45d1f8","name":"安卓商品2次","icon":"","buying_price":"0.10","original_price":"11.00","buy_count":"1","refund_state":"0","specificationsText":"颜色分类:白色,鞋码:35"}],"goods_count":"1"},{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","is_comment":"0","courier_fees":"0.00","order_number":"201901071546370912539","area":"安徽省合肥市","detailed_address":"人民路1号","order_id":"4af4b2a5-ff16-495d-b4e5-3bcc3cff97f3","express_number":"","sum_price":"0.10","SubAccount":"200201808000004","TradeMemcode":"0000139759","user_id":"07cac2ce-5a7c-46d0-9aa9-c00af9339a32","account":"14752214432","buyer_message":"","order_state":"1","GoodsList":[{"order_goods_id":"2d5c3225-13bd-4001-add3-cf0485a715d2","goods_id":"31fb769c-7e4d-4a02-8528-14757b45d1f8","name":"安卓商品2次","icon":"","buying_price":"0.10","original_price":"11.00","buy_count":"1","refund_state":"0","specificationsText":"颜色分类:白色,鞋码:35"}],"goods_count":"1"}]}
            //2.{"code":"100","firstPageTime":"2019/1/7 16:31:22","count":"16","message":"查询成功","data":[{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","is_comment":"0","courier_fees":"0.00","order_number":"201812191531402170448","area":"河北省石家庄市","detailed_address":"人民路21号田酷兔兔突突突兔兔V5图酷兔兔5句路途田考虑考虑","order_id":"18507b88-a05d-45fc-81d7-c58a9cb24357","express_number":"","sum_price":"0.01","SubAccount":"200201808000004","TradeMemcode":"0000139759","user_id":"07cac2ce-5a7c-46d0-9aa9-c00af9339a32","account":"14752214432","buyer_message":"","order_state":"2","GoodsList":[{"order_goods_id":"e754b59b-e0ed-4e38-9d84-6b806760f7b5","goods_id":"29b1deab-509d-4189-8632-317482659adc","name":"大美盛年","icon":"/Files/Goods/201812/a2a044f7ecc34548bb3b44e0d27c3fa5.jpg","buying_price":"0.01","original_price":"800.00","buy_count":"1","refund_state":"0","specificationsText":""}],"goods_count":"1"},{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","is_comment":"0","courier_fees":"0.00","order_number":"201812191529227173195","area":"河北省石家庄市","detailed_address":"人民路21号田酷兔兔突突突兔兔V5图酷兔兔5句路途田考虑考虑","order_id":"e7c2fd90-1730-4d7b-9add-cda0a24f1110","express_number":"","sum_price":"0.01","SubAccount":"200201808000004","TradeMemcode":"0000139759","user_id":"07cac2ce-5a7c-46d0-9aa9-c00af9339a32","account":"14752214432","buyer_message":"","order_state":"2","GoodsList":[{"order_goods_id":"a2ca46b1-90d5-4d27-bfce-6064dec39a6c","goods_id":"29b1deab-509d-4189-8632-317482659adc","name":"大美盛年","icon":"/Files/Goods/201812/a2a044f7ecc34548bb3b44e0d27c3fa5.jpg","buying_price":"0.01","original_price":"800.00","buy_count":"1","refund_state":"0","specificationsText":""}],"goods_count":"1"},{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","is_comment":"0","courier_fees":"0.00","order_number":"201812191524529515855","area":"河北省石家庄市","detailed_address":"人民路21号田酷兔兔突突突兔兔V5图酷兔兔5句路途田考虑考虑","order_id":"721f03ef-29ef-4400-8274-2004a7d3a17f","express_number":"","sum_price":"0.02","SubAccount":"200201808000004","TradeMemcode":"0000139759","user_id":"07cac2ce-5a7c-46d0-9aa9-c00af9339a32","account":"14752214432","buyer_message":"","order_state":"2","GoodsList":[{"order_goods_id":"3dcee270-8b87-41d6-b2db-988a6d3310d2","goods_id":"b6a2c993-ff09-427a-8599-e5e7d5469626","name":"美妆","icon":"/Files/Goods/201812/bea8b121b09b490ca9c88dcc7570e867.jpg","buying_price":"0.01","original_price":"10.00","buy_count":"1","refund_state":"0","specificationsText":""},{"order_goods_id":"bef33ea4-2623-4d66-8b6c-298b3372c772","goods_id":"29b1deab-509d-4189-8632-317482659adc","name":"大美盛年","icon":"/Files/Goods/201812/a2a044f7ecc34548bb3b44e0d27c3fa5.jpg","buying_price":"0.01","original_price":"800.00","buy_count":"1","refund_state":"0","specificationsText":""}],"goods_count":"2"},{"merchants_in_id":"db43698c-9a88-4769-ab28-c56ee37f4346","shop_name":"毛毛的店","is_comment":"0","courier_fees":"0.00","order_number":"201812191514304988988","area":"河北省石家庄市","detailed_address":"人民路21号田酷兔兔突突突兔兔V5图酷兔兔5句路途田考虑考虑","order_id":"13263216-78c1-42cb-a2a8-8c0ed958411b","express_number":"","sum_price":"0.01","SubAccount":"200201812452844","TradeMemcode":"0000515511","user_id":"70975a8d-9c96-4ca8-9f3e-2742dc890a04","account":"13818271583","buyer_message":"","order_state":"2","GoodsList":[{"order_goods_id":"b93b78a4-54a9-43db-974f-aacf725fa24f","goods_id":"605a2085-63ba-48ba-816c-5a8e4d192d8b","name":"大美盛年","icon":"/Files/Goods/201812/f37b666da90f42f2b91803a1d55b063c.jpg","buying_price":"0.01","original_price":"10000.00","buy_count":"1","refund_state":"0","specificationsText":""}],"goods_count":"1"},{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","is_comment":"0","courier_fees":"0.00","order_number":"201811281257555418862","area":"河北省石家庄市","detailed_address":"人民路21号田酷兔兔突突突兔兔V5图酷兔兔5句路途田考虑考虑","order_id":"3abd5343-f232-4f40-8f9c-f07a51a54761","express_number":"","sum_price":"0.01","SubAccount":"200201808000004","TradeMemcode":"0000139759","user_id":"07cac2ce-5a7c-46d0-9aa9-c00af9339a32","account":"14752214432","buyer_message":"不要了","order_state":"2","GoodsList":[{"order_goods_id":"17f3e0db-db45-4ce4-b538-6be56189a49a","goods_id":"7d652156-c796-4bc6-a201-3aaf876b1ef9","name":"怡宝","icon":"/Files/Goods/201811/1541500374345.22.jpg","buying_price":"0.01","original_price":"129.00","buy_count":"1","refund_state":"0","specificationsText":"颜色:纯净水 555ml*12 量贩装"}],"goods_count":"1"},{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","is_comment":"0","courier_fees":"0.00","order_number":"201811281223476242269","area":"黑龙江省双鸭山市","detailed_address":"人民路23号","order_id":"149484dc-08c8-4054-91bb-7a0244dd82cd","express_number":"","sum_price":"0.01","SubAccount":"200201808000004","TradeMemcode":"0000139759","user_id":"07cac2ce-5a7c-46d0-9aa9-c00af9339a32","account":"14752214432","buyer_message":"","order_state":"2","GoodsList":[{"order_goods_id":"e18dc69e-14b0-4732-90ba-6420a11b4ffb","goods_id":"7d652156-c796-4bc6-a201-3aaf876b1ef9","name":"怡宝","icon":"/Files/Goods/201811/1541500374345.22.jpg","buying_price":"0.01","original_price":"129.00","buy_count":"1","refund_state":"0","specificationsText":"颜色:纯净水 555ml*12 量贩装"}],"goods_count":"1"},{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","is_comment":"0","courier_fees":"0.00","order_number":"201811231050249541761","area":"安徽省合肥市","detailed_address":"人民路1号","order_id":"88d82704-d2bf-4bbf-a07a-1722c1f00e24","express_number":"","sum_price":"0.01","SubAccount":"200201808000004","TradeMemcode":"0000139759","user_id":"07cac2ce-5a7c-46d0-9aa9-c00af9339a32","account":"14752214432","buyer_message":"","order_state":"2","GoodsList":[{"order_goods_id":"22b00d4b-098a-47ed-a1f6-d5c152a8a57e","goods_id":"7d652156-c796-4bc6-a201-3aaf876b1ef9","name":"怡宝","icon":"/Files/Goods/201811/1541500374345.22.jpg","buying_price":"0.01","original_price":"129.00","buy_count":"1","refund_state":"0","specificationsText":"颜色:纯净水 555ml*12 量贩装"}],"goods_count":"1"},{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","is_comment":"0","courier_fees":"0.00","order_number":"201811211732566983665","area":"黑龙江省双鸭山市","detailed_address":"人民路23号","order_id":"1bdf925e-f901-46e9-b080-4d6c0d583c04","express_number":"","sum_price":"0.01","SubAccount":"200201808000004","TradeMemcode":"0000139759","user_id":"07cac2ce-5a7c-46d0-9aa9-c00af9339a32","account":"14752214432","buyer_message":"","order_state":"2","GoodsList":[{"order_goods_id":"f398fd08-22c5-4915-a309-02f2530322cb","goods_id":"7d652156-c796-4bc6-a201-3aaf876b1ef9","name":"怡宝","icon":"/Files/Goods/201811/1541500374345.22.jpg","buying_price":"0.01","original_price":"129.00","buy_count":"1","refund_state":"0","specificationsText":"颜色:纯净水 555ml*12 量贩装"}],"goods_count":"1"},{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","is_comment":"0","courier_fees":"0.00","order_number":"201811211658342523793","area":"安徽省合肥市","detailed_address":"人民路1号","order_id":"a40b0e22-fcec-44a1-92e7-027e3b8069da","express_number":"","sum_price":"0.01","SubAccount":"200201808000004","TradeMemcode":"0000139759","user_id":"07cac2ce-5a7c-46d0-9aa9-c00af9339a32","account":"14752214432","buyer_message":"","order_state":"2","GoodsList":[{"order_goods_id":"7b08dd95-dae7-40a5-89d3-e26848fbeb3a","goods_id":"7d652156-c796-4bc6-a201-3aaf876b1ef9","name":"怡宝","icon":"/Files/Goods/201811/1541500374345.22.jpg","buying_price":"0.01","original_price":"129.00","buy_count":"1","refund_state":"0","specificationsText":"颜色:纯净水 555ml*12 量贩装"}],"goods_count":"1"},{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","is_comment":"0","courier_fees":"0.00","order_number":"201811211654374359484","area":"安徽省合肥市","detailed_address":"人民路1号","order_id":"b2167486-905c-4812-9640-72aff2f3c1bb","express_number":"","sum_price":"0.01","SubAccount":"200201808000004","TradeMemcode":"0000139759","user_id":"07cac2ce-5a7c-46d0-9aa9-c00af9339a32","account":"14752214432","buyer_message":"","order_state":"2","GoodsList":[{"order_goods_id":"947e1555-44e7-43ee-a544-cf89f7ba0a48","goods_id":"7d652156-c796-4bc6-a201-3aaf876b1ef9","name":"怡宝","icon":"/Files/Goods/201811/1541500374345.22.jpg","buying_price":"0.01","original_price":"129.00","buy_count":"1","refund_state":"0","specificationsText":"颜色:纯净水 555ml*12 量贩装"}],"goods_count":"1"}]}
            //3.{"code":"100","firstPageTime":"2019/1/7 16:31:48","count":"1","message":"查询成功","data":[{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","is_comment":"0","courier_fees":"0.00","order_number":"201811291158485342777","area":"黑龙江省双鸭山市","detailed_address":"人民路23号","order_id":"375b49bc-c23b-45e4-b776-2fb4bfc73438","express_number":"3388448932708","sum_price":"0.01","SubAccount":"200201808000004","TradeMemcode":"0000139759","user_id":"07cac2ce-5a7c-46d0-9aa9-c00af9339a32","account":"14752214432","buyer_message":"","order_state":"3","GoodsList":[{"order_goods_id":"170224f1-743a-42a2-8474-e5cb79e5e881","goods_id":"7d652156-c796-4bc6-a201-3aaf876b1ef9","name":"怡宝","icon":"/Files/Goods/201811/1541500374345.22.jpg","buying_price":"0.01","original_price":"129.00","buy_count":"1","refund_state":"0","specificationsText":"颜色:纯净水 555ml*12 量贩装"}],"goods_count":"1"}]}
            //4.{"code":"100","firstPageTime":"2019/1/7 16:32:15","count":"1","message":"查询成功","data":[{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","is_comment":"0","courier_fees":"0.00","order_number":"201808221308432753592","area":"北京市北京市东城区","detailed_address":"龙路","order_id":"a0c9e271-b0dd-4f03-8c09-f6968ea16e67","express_number":"71313245530494","sum_price":"0.01","SubAccount":"200201808000004","TradeMemcode":"0000139759","user_id":"07cac2ce-5a7c-46d0-9aa9-c00af9339a32","account":"14752214432","buyer_message":"","order_state":"4","GoodsList":[{"order_goods_id":"995b1e30-c5d3-49d9-970a-6ee97708375b","goods_id":"2ae469f5-bd26-43d2-92e7-73262a9d2b7e","name":"安卓商品3","icon":"","buying_price":"0.01","original_price":"11.00","buy_count":"1","refund_state":"0","specificationsText":"颜色:白色,尺码:s"}],"goods_count":"1"}]}
            console.log(JSON.stringify(result))
        	if(result.code=="100"){
        		var list=result.data;
        		var html="";
        		for (var i = 0; i < list.length; i++) {
        			html+="<li>";
						html+="<div class=\"shop\">";
							html+="<span>"+list[i].shop_name+"</span>";
							html+="<img src=\"../imgs/ic_right_arrow.png\">";
							switch(list[i].order_state){
								case "1":
									html+="<span class=\"state\">等待买家付款</span>";
								  break;
								case "2":
								  html+="<span class=\"state\">等待卖家发货</span>";
								  break;
								case "3":
								  html+="<span class=\"state\">等待买家收货</span>";
								  break;
								case "4":
								  html+="<span class=\"state\">交易成功</span>";
								  break;
								case "5":
								  html+="<span class=\"state\">交易成功</span>";
								  break;
								case "6":
								  html+="<span class=\"state\">交易已取消</span>";
								  break;
								case "7":
								  html+="<span class=\"state\">交易关闭</span>";
								  break;
								default:
									;
							}							
						html+="</div>";
						html+="<div class=\"goods\" onclick=\"orderDetail('"+list[i].order_id+"','"+list[i].is_comment+"','"+list[i].express_number+"')\">";
							html+="<ul>";
								var good_list=list[i].GoodsList;
								for (var j = 0; j < good_list.length; j++) {
									
									html+="<li>";
										html+="<div class=\"goods-info\">";
                                            if(!good_list[j].icon){
                                                html+="<img src=\"../imgs/bajiamache.png\">";
                                            }else{

											     html+="<img src=\""+ip+good_list[j].icon+"\">";
                                            }
											html+="<div class=\"goods-name\">"+good_list[j].name+"</div>";
											html+="<div class=\"goods-spec\">"+good_list[j].specificationsText+"</div>";
											html+="<div class=\"goods-price\">";
												html+="<div class=\"one\">";
													html+="<span>¥</span><span>"+good_list[j].buying_price+"</span>";
												html+="</div>";
												html+="<div class=\"two\">";
													html+="<del><span>¥</span>"+good_list[j].original_price+"</del>";
												html+="</div>";
												html+="<div class=\"three\">";
													html+="<span   data-order_id = "+list[i].order_id +" data-user_id = "+list[i].user_id +" data-payeesSubAccount = "+ list[i].SubAccount+" data-payeesTradeMemCode = "+list[i].TradeMemcode +">"+good_list[j].buy_count+"</span>";
													// html+="<span>"+good_list[j].buy_count+"</span>";
												html+="</div>";
											html+="</div>";
										html+="</div>";
									html+="</li>";
								}
							html+="</ul>";
						html+="</div>";
						html+="<div class=\"calc\">";
							html+="<span class=\"total\">共<span>"+good_list.length+"</span>件商品</span>";
							html+="<span class=\"totals\">合计¥<span>"+list[i].sum_price+"</span>(含运费¥<span>"+list[i].courier_fees+"</span>)</span>";
						html+="</div>";
						html+="<div class=\"order-state\">";
							switch(list[i].order_state){
								case "1":
									html+="<button class=\"cancle\" onclick=\"cancleOrder('"+list[i].order_id+"')\">取消订单</button>";
									html+="<button class=\"pay\" onclick=\"buys(this)\">付款</button>";
								  break;
								case "2":
								  
								  break;
								case "3":
								  html+="<a href='logistics.html?express_number="+list[i].express_number+"'><button class=\"logistics\">查看物流</button></a>";
								  html+="<button class=\"confirm\"  onclick=\"orderConfirm('"+list[i].order_id+"')\">确认收货</button>"
								  break;
								case "4":
								  html+="<button class=\"del\"  onclick=\"delOrder('"+list[i].order_id+"')\">删除订单</button>";
								  html+="<a href='logistics.html?express_number="+list[i].express_number+"'><button class=\"logistics\">查看物流</button></a>"
								  html+="<button class=\"evaluate\">评价</button>"
								  break;
								case "5":
								  
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
        		}
        		$('.shopping-car').html(html)
        	}
        },error:function(err){
        	alert(err);
        }
    });
}

//------
function buys(tds){   
    openids = GetCookie("openids");
    tokennumber = GetCookie("tokennumber");
    var code = GetCookie("CodeId")
    var id = $(tds).parent().parent().children(".goods").find(".goods-price").find(".three").find("span").attr("data-order_id");
    var otherUserId = $(tds).parent().parent().children(".goods").find(".goods-price").find(".three").find("span").attr("data-user_id");
    var payeesSubAccount = $(tds).parent().parent().children(".goods").find(".goods-price").find(".three").find("span").attr("data-payeesSubAccount");
    var payeesTradeMemCode = $(tds).parent().parent().children(".goods").find(".goods-price").find(".three").find("span").attr("data-payeesTradeMemCode");
    var total_fee = $(tds).parent().parent().children(".calc").find(".totals").find("span").eq(0).text();
    if (is_weixin())
    {
        
        if (tokennumber == true || openids == "" || openids == null || openids == "undefined") {           
            getopenid(code,id,total_fee,otherUserId,SubAccount,TradeMemcode,payeesSubAccount,payeesTradeMemCode);
        }
        else {
            wx_pay(openids,id,total_fee,otherUserId,SubAccount,TradeMemcode,payeesSubAccount,payeesTradeMemCode);
        }
    }
    else {
        HfivePay(openids,id,total_fee,otherUserId,SubAccount,TradeMemcode,payeesSubAccount,payeesTradeMemCode);
    }

}

//调用微信支付
function getopenid(codeid,id,total_fee,otherUserId,SubAccount,TradeMemcode,payeesSubAccount,payeesTradeMemCode) {
    $.ajax({
        type: "get",
        url: IP+"/ThirdParty/H5WX/wxh5.ashx?Action=getopenid",
        async: true,
        data: {
            "code": codeid
        },
        success: function (response) {

            response = JSON.parse(response);

            if (response.result_code == "SUCCESS") {
                var item = response.result;
                token = item.token;
                openids = item.openids;

                wx_pay(openids,id,total_fee,otherUserId,SubAccount,TradeMemcode,payeesSubAccount,payeesTradeMemCode);
                var datetime = 7 * 24 * 3600;
                SetCookie("openids", openids, datetime);
                tokennumber = false;
                SetCookie("tokennumber", tokennumber);
                console.log(openids + "     ==============")
            }

            else {
                alertMessage(response.message);
            }
        }
    })

}

function wx_pay(openids,id,total_fee,otherUserId,SubAccount,TradeMemcode,payeesSubAccount,payeesTradeMemCode) {
    var order_sn = good_list.order_sn
    $.ajax({
        type: "get",
        url: IP+"/ThirdParty/H5WX/wxh5.ashx?Action=code",
        async: true,
        data: {
            "loginUserId": localStorage.getItem('UserId'),
            "order_sn": id,
            "total_fee": total_fee,
            "otherUserId": otherUserId,
            "user_name": "",
            "other_user_name": "",
            "SubAccount": SubAccount,
            "TradeMemCode": TradeMemcode,
            "TradeAbstract": "",
            "payeesSubAccount": payeesSubAccount,
            "payeesTradeMemCode": payeesTradeMemCode,
            "openids": openids
        },
        success: function (response) {

            response = JSON.parse(response);

            if (response.result_code == "SUCCESS") {
                var item = response.result;
                appid = item.appid;
                noncestr = item.noncestr;
                packages = item.package;
                partnerid = item.partnerid;
                sign = item.sign;
                timestamp = item.timestamp;
                token = item.token;
                onBridgeReady();
            }

            else {
                alertMessage(response.message);
            }
        }
    })
}

function onBridgeReady() {
    WeixinJSBridge.invoke(
       'getBrandWCPayRequest', {
           "appId": appid,     //公众号名称，由商户传入     
           "timeStamp": timestamp,         //时间戳，自1970年以来的秒数     
           "nonceStr": noncestr, //随机串     
           "package": packages,
           "signType": "MD5",         //微信签名方式：     
           "paySign": sign //微信签名 
       },
       function (res) {
           //alert(res.err_msg, "支付成功");
           if (res.err_msg == "get_brand_wcpay_request:ok") {
               buysforword();
           }
           else {
               alertMessage("支付失败");
           }
       });
}


function is_weixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}


//H5支付
function HfivePay(openids,id,total_fee,otherUserId,SubAccount,TradeMemcode,payeesSubAccount,payeesTradeMemCode) {
    $.ajax({
        type: "get",
        url: IP+"/ThirdParty/H5WX/wxh5.ashx?Action=WxPay",
        async: true,
        data: {
            "loginUserId": localStorage.getItem('UserId'),
            "order_sn": id,
            "total_fee": total_fee,
            "otherUserId": otherUserId,
            "user_name": "",
            "other_user_name": "",
            "SubAccount": SubAccount,
            "TradeMemCode": TradeMemcode,
            "TradeAbstract": "",
            "payeesSubAccount": payeesSubAccount,
            "payeesTradeMemCode": payeesTradeMemCode,
            "openids": openids
        },
        success: function (response) {

            response = JSON.parse(response);

            if (response.result_code == "SUCCESS") {
                var item = response.result;
                appid = item.appid;
                noncestr = item.noncestr;
                packages = item.package;
                partnerid = item.partnerid;
                sign = item.sign;
                timestamp = item.timestamp;
                var mweb_url = item.mweb_url;
                codingback(mweb_url)
            }
            else {
                alertMessage(response.message);
            }
        }
    })
}

function codingback(mweb_url) {
    var jsonText = escape(param.response);
    var jsonvalue = escape(param.jsonval);
    $.ajax({
        type: "get",
        url: IP+"/ThirdParty/H5WX/wxh5.ashx?Action=codingback",
        data: {
            "order_sn": order_sn,
            "jsonText": jsonText,
            "jsonval": jsonvalue,
            "CodeId": param.CodeId,
            "goods_id": param.goods_id,
            "user_id": param.user_id
        },
        async: true,
        success: function (item) {

            item = JSON.parse(item);

            if (item.code == "100") {            
                var jump = mweb_url + "&redirect_url=" + item.ryu;
                window.location.href = jump;               
            }
            else {
                alertMessage(item.message);
            }
        }       
    })    
    var jumps = "http://www.bjmc.shop/mache/is_over.html?this_class="+this_class;

    var jump = mweb_url + "&redirect_url=" + encodeURIComponent(jumps);
   

}


function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串 
    param = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            param[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
}

