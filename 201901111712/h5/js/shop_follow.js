const IP="https://bird.ioliu.cn/v1?url=http://122.112.209.170:8088";
const ip="http://122.112.209.170:8088";
$(function(){

	getMerchantsInListByUserId();

})


function getMerchantsInListByUserId(){
	//{"code":"100","message":"查询成功","count":"5","data":[{"goods_focus_id":"c192946a-f49f-4753-bb82-8c24c17ee74e","user_id":"0cbc4f22-8585-4d3d-b089-38ec35ebb56d","merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","shop_logo":"/Files/MerchantsInLogo/201808/1535016767138.97.jpg"},{"goods_focus_id":"f2a855e2-1d82-4464-ba9d-62f06b0136ed","user_id":"0cbc4f22-8585-4d3d-b089-38ec35ebb56d","merchants_in_id":"db43698c-9a88-4769-ab28-c56ee37f4346","shop_name":"毛毛的店","shop_logo":"/Files/MerchantsInLogo/201812/7899ccb73b014e988fdaba6f22875493.jpg"},{"goods_focus_id":"88964656-b7ca-4c00-a50d-cd67a2742afe","user_id":"0cbc4f22-8585-4d3d-b089-38ec35ebb56d","merchants_in_id":"1234567","shop_name":"皮卡丘的小店","shop_logo":"/Files/MerchantsInLogo/201807/1531935945970.97.jpg"},{"goods_focus_id":"3c910833-a316-4510-8ce6-594442bb60f8","user_id":"0cbc4f22-8585-4d3d-b089-38ec35ebb56d","merchants_in_id":"eca658de-1a15-4214-9018-c5ae71aa9fdb","shop_name":"鑫叶家纺","shop_logo":"/Files/MerchantsInLogo/201809/1536920770279.2.jpg"},{"goods_focus_id":"a3a58cdd-dee9-4214-8daa-ee9f6a1bac01","user_id":"0cbc4f22-8585-4d3d-b089-38ec35ebb56d","merchants_in_id":"2","shop_name":"小惠店1","shop_logo":"/Files/MerchantsInLogo/201809/1535983259387.26.jpg"}]}
	var user_id=localStorage.getItem('UserId');
	var url=IP+"/DataMobile/user.ashx?Action=GetMerchantsInListByUserId";
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
        				
						html+="<li>";
							html+="<a target=\"_parent\" href=\"http://122.112.209.170:8088/mache/storeDetail.html?merchants_in_id="+result[i].merchants_in_id+"\">";	  			
								html+="<div class=\"follow-info\">";
									html+="<img src=\""+ip+result[i].shop_logo+"\">";
									html+="<div class=\"follow-name\">"+result[i].shop_name+"</div>";
									//html+="<div class=\"follow-num\"><span>"+result[i].collect_count+"</span>人收藏</div>";
								html+="</div>";
							html+="</a>"
						html+="</li>";
        			}
				html+="</ul>";
        		$('.follow').html(html);
        		
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