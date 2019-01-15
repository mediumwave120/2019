const IP="https://bird.ioliu.cn/v1?url=http://122.112.209.170:8088";
const ip="http://122.112.209.170:8088";
$(function(){
	//我的足迹
	getGoodsWatchListByUserId();

})

//我的足迹
function getGoodsWatchListByUserId(){
	//{"code":"100","message":"查询成功","count":"77","data":[{"goods_collect_id":"c87bdcda-b9c9-4ceb-83d9-e6421eb7d23a","goods_id":"3beedbd2-bb26-4bd8-9af4-5a602f564e13","original_price":"888.00","buying_price":"0.01","is_soldout":"0","icon":"/Files/Goods/201812/2f8c713d772241eba9efe8a38496f8d4.jpg","name":"匡威（帆布鞋）"},{"goods_collect_id":"f14d9197-8331-4a57-ad7c-cebbcd23c023","goods_id":"31fb769c-7e4d-4a02-8528-14757b45d1f8","original_price":"11.00","buying_price":"0.01","is_soldout":"0","icon":"/Files/Goods/201808/1534783428704.11.png","name":"安卓商品2次"},{"goods_collect_id":"f658289a-01a7-4962-a0d5-79455314bef0","goods_id":"7e91a47e-bb42-45c7-a017-043e458e07c4","original_price":"10.00","buying_price":"0.01","is_soldout":"0","icon":"/Files/Goods/201901/588485ae136546aab7fed140e8025a9d.jpg","name":"杂物"},{"goods_collect_id":"11c14075-a4a2-4ec9-b3d9-cef24bb2de11","goods_id":"85003b04-c1d9-4497-b0ab-95a191568c4a","original_price":"666.00","buying_price":"0.01","is_soldout":"0","icon":"/Files/Goods/201812/b87f873fae8c408f92b876827b9a60be.jpg","name":"匡威帆布鞋"},{"goods_collect_id":"4423ad07-05ba-4cf3-b735-bb8dc129c7db","goods_id":"7e1d89c0-040b-4208-9d5f-514448791b6d","original_price":"10.00","buying_price":"0.10","is_soldout":"0","icon":"/Files/Goods/201811/1542902283898.64.png","name":"智能家居"},{"goods_collect_id":"b9bbc67f-ea4f-46f4-9df6-56d6671bab1d","goods_id":"784fce16-2048-46c1-bb92-fe2baa5cfa00","original_price":"29.90","buying_price":"19.90","is_soldout":"0","icon":"/Files/Goods/201810/1540993682881.64.jpg","name":"实木衣架西服挂衣架"},{"goods_collect_id":"1b514f6f-2f1b-4e94-8b42-ece2032ebb7e","goods_id":"605a2085-63ba-48ba-816c-5a8e4d192d8b","original_price":"10000.00","buying_price":"0.01","is_soldout":"0","icon":"/Files/Goods/201812/f37b666da90f42f2b91803a1d55b063c.jpg","name":"大美盛年"},{"goods_collect_id":"2b81a630-e480-4dc0-96a2-8997594e6640","goods_id":"8596c332-ef43-4c6a-8b80-10fd7cc94e44","original_price":"36.00","buying_price":"0.01","is_soldout":"0","icon":"/Files/Goods/201810/1540986057294.11.jpg","name":"农夫山泉 饮用水"},{"goods_collect_id":"9039a90e-be20-4e5a-a161-e301a4b039c7","goods_id":"7d652156-c796-4bc6-a201-3aaf876b1ef9","original_price":"129.00","buying_price":"0.01","is_soldout":"0","icon":"/Files/Goods/201811/1541500406174.32.jpg","name":"怡宝"},{"goods_collect_id":"29b50c9b-4fd7-49cc-ad08-c0c7feffd2ad","goods_id":"9b146e72-980d-4c2f-b919-0e764da62294","original_price":"1.00","buying_price":"0.01","is_soldout":"0","icon":"/Files/Goods/201812/cbf24c20c6a2457982d0f643246b20c4.png","name":"测试"}]}
	var user_id=localStorage.getItem('UserId');
	var url=IP+"/DataMobile/user.ashx?Action=GetGoodsWatchListByUserId";
	var footprint_list={};
		footprint_list.pageIndex=1;
		footprint_list.user_id=user_id;
	$.ajax({
        url: url,
        type: 'get',
        data:footprint_list,
        dataType: 'json',
        success: function (result) {
        	
        	if(result.code=="100"){
        		console.log(result);
        		var result=result.data;
        		var html="";
        		html+="<ul>";
        			for (var i = 0; i < result.length; i++) {
						html+="<li>";
							html+="<div class=\"footprint\">";					
								html+="<div class=\"footprint-info\">";
									html+="<img src=\""+ip+result[i].icon+"\">";
									html+="<div class=\"footprint-name\">"+result[i].name+"</div>";
									html+="<div class=\"footprint-price\">";
										html+="<div class=\"one\">";
											html+="<span>¥</span><span>"+result[i].buying_price+"</span>";
											html+="<del><span>¥</span><span>"+result[i].original_price+"</span></del>";
										html+="</div>";
									html+="</div>";
								html+="</div>";			
							html+="</div>";
						html+="</li>";
        			}
				html+="</ul>";
        		$('.footprint-list').html(html);       		
        	}
        }
    });
}
