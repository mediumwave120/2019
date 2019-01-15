const IP="https://bird.ioliu.cn/v1?url=http://122.112.209.170:8088";
const ip="http://122.112.209.170:8088";
$(function(){

	getGoodsCollectListByUserId();

})


function getGoodsCollectListByUserId(){
	//{"code":"100","message":"查询成功","count":"4","data":[{"goods_collect_id":"253cd783-0e60-4843-a92b-b036fc0728cc","buying_price":"0.01","goods_id":"605a2085-63ba-48ba-816c-5a8e4d192d8b","merchants_in_id":"db43698c-9a88-4769-ab28-c56ee37f4346","collect_count":"2","is_soldout":"0","user_id":"0cbc4f22-8585-4d3d-b089-38ec35ebb56d","name":"大美盛年","icon":"/Files/Goods/201812/f37b666da90f42f2b91803a1d55b063c.jpg"},{"goods_collect_id":"f4a0f305-8c3a-422b-bd27-b344e32db892","buying_price":"0.01","goods_id":"6f1a51d3-473d-420e-99a2-94d18146eb12","merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","collect_count":"1","is_soldout":"1","user_id":"0cbc4f22-8585-4d3d-b089-38ec35ebb56d","name":"测试","icon":"/Files/Goods/201808/1535019102748.46.jpg"},{"goods_collect_id":"97c20ac4-2ac5-4690-afa9-555e52852768","buying_price":"100.00","goods_id":"0a1e0812-01ee-4335-8636-9b6a34ed4d0d","merchants_in_id":"eca658de-1a15-4214-9018-c5ae71aa9fdb","collect_count":"1","is_soldout":"0","user_id":"0cbc4f22-8585-4d3d-b089-38ec35ebb56d","name":"红酒","icon":"/Files/Goods/201811/1543313912544.49.jpg"},{"goods_collect_id":"675470cb-bafe-4dbc-ac4f-441031446da4","buying_price":"1499.00","goods_id":"30091c31-97cf-4898-8165-20a96cfa070f","merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","collect_count":"1","is_soldout":"0","user_id":"0cbc4f22-8585-4d3d-b089-38ec35ebb56d","name":"户外专用鞋","icon":"/Files/Goods/201810/1539788119690.19.png"}]}
	var user_id=localStorage.getItem('UserId');
	var url=IP+"/DataMobile/user.ashx?Action=GetGoodsCollectListByUserId";
	var collect_list={};
		collect_list.pageIndex=1;
		collect_list.user_id=user_id;
	$.ajax({
        url: url,
        type: 'get',
        data:collect_list,
        dataType: 'json',
        success: function (result) {
        	
        	if(result.code=="100"){
        		console.log(result);
        		var result=result.data;
        		var html="";
        		html+="<ul>";
        			for (var i = 0; i < result.length; i++) {
        				
						html+="<li onclick=\"skipDetail('"+result[i].goods_id+"','"+result[i].is_soldout+"')\">";
							html+="<div class=\"favorite-info\">";
								html+="<img src=\""+ip+result[i].icon+"\">";
								html+="<div class=\"favorite-name\">"+result[i].name+"</div>";
								html+="<div class=\"favorite-num\"><span>"+result[i].collect_count+"</span>人收藏</div>";
								html+="<div class=\"favorite-price\">";
									html+="<div class=\"one\">";
										html+="<span>¥</span><span>"+result[i].buying_price+"</span>";
									html+="</div>";
								html+="</div>";
							html+="</div>";
						html+="</li>";
        			}
				html+="</ul>";
        		$('.favorite').html(html);
        		
        	}
        }
    });
}
//商品详情
function skipDetail(goods_id,is_soldout) {
	if(is_soldout==="1"){
		alert("该商品已下架");
		return;
	}
	location.href="http://122.112.209.170:8088/mache/goodsDetail.html?goods_id="+goods_id;
}