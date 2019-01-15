var HOME={
	ip:"http://122.112.209.170:8088",
	apiUrl:"https://bird.ioliu.cn/v1?url=http://122.112.209.170:8088",
	init:function(){
		this.swiper_get_list();
		this.get_home();
	},
	swiper_get_list:function(){
		var url = this.apiUrl+"/Data/swiper.ashx?Action=GetList";
		// {"code":"100","message":"查询成功","data":[{"id":"22d39640-3f6c-4f05-95aa-fed2b2800881","title":"鼻涕虫","type":"1","image":"/Files/Swiper/201812/155a74b171bd441f9fd2048786bea6c1.png","skip_url":"","state":"1","sort":"1","create_time":"2018-12-10 17:39:40"},{"id":"d7945ea2-ed0b-4790-8b25-ec641a15b403","title":"小龙虾美食节","type":"1","image":"/Files/Swiper/201808/1533131041970.65.jpg","skip_url":"","state":"1","sort":"1","create_time":"2018-08-01 13:44:36"},{"id":"ae5a5ae5-dfe1-49ec-a24d-f8679228a945","title":"郎酒","type":"1","image":"/Files/Swiper/201810/1540911033956.43.jpg","skip_url":"","state":"1","sort":"1","create_time":"2018-07-31 14:37:04"},{"id":"5dfa6f94-fa42-4424-b615-8272460e34a6","title":"轮播图3","type":"2","image":"/Files/Swiper/201808/1534788192638.94.png","skip_url":"","state":"0","sort":"1","create_time":"2018-07-17 11:01:12"},{"id":"36fa3a9a-a328-45b6-a4b7-0418bc143631","title":"怡宝矿泉水","type":"1","image":"/Files/Swiper/201810/1541003547960.46.jpg","skip_url":"","state":"1","sort":"1","create_time":"2018-07-13 15:07:34"}]}
		$.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            success: function (result) {
            	
                if (result.code == "100") {
                    var result=result.data;
                    var html="";
                        html+="<div class=\"swiper-container\">";
						    html+="<div class=\"swiper-wrapper\" >";
						      for (var i = 0; i < result.length; i++) {
						      	  if(result[i].type=="1"){
								      html+="<div class=\"swiper-slide\">";
								      	html+="<img src='http://122.112.209.170:8088"+result[i].image+"' >";
								      html+="</div>";
						      	  	
						      	  }
						  	  }
						    html+="</div>";
						    html+="<div class=\"swiper-pagination\"></div>";
	  					html+="</div>";
	  					$('.swiper').html(html);
	  					var swiper = new Swiper('.swiper-container', {
					      autoplay: true,//可选选项，自动滑动
					      pagination: {
					        el: '.swiper-pagination'
					      },
					      observer:true,
					    });
					    //alert($(document).width())
	  					// $('.swiper').width($(document).width()/2);
	  					// alert($(document).width()/2)
                }
            }
        });
	},
	get_home:function(){
		//{"code":"100","message":"查询成功","data":[{"Swiper":[{"swiper_id":"22d39640-3f6c-4f05-95aa-fed2b2800881","image":"/Files/Swiper/201812/155a74b171bd441f9fd2048786bea6c1.png","goods_id":"605a2085-63ba-48ba-816c-5a8e4d192d8b","skip_url":""},{"swiper_id":"d7945ea2-ed0b-4790-8b25-ec641a15b403","image":"/Files/Swiper/201808/1533131041970.65.jpg","goods_id":"636d7d4c-fa5c-45a8-ae2c-71f6e5f79d84","skip_url":""},{"swiper_id":"ae5a5ae5-dfe1-49ec-a24d-f8679228a945","image":"/Files/Swiper/201810/1540911033956.43.jpg","goods_id":"7e1d89c0-040b-4208-9d5f-514448791b6d","skip_url":""},{"swiper_id":"36fa3a9a-a328-45b6-a4b7-0418bc143631","image":"/Files/Swiper/201810/1541003547960.46.jpg","goods_id":"7d652156-c796-4bc6-a201-3aaf876b1ef9","skip_url":""}],"Merchants_In":[{"merchants_in_id":"a9b8dc80-fa86-4e78-9118-894ddf930734","shop_name":"枫木","shop_logo":"/Files/MerchantsInLogo/201808/1534782486334.52.jpg"},{"merchants_in_id":"2fea90bc-5a48-4ef8-8313-92b140e7c9bb","shop_name":"22","shop_logo":"/Files/MerchantsInLogo/201810/1540308253952.98.jpg"},{"merchants_in_id":"1234567","shop_name":"皮卡丘的小店","shop_logo":"/Files/MerchantsInLogo/201807/1531935945970.97.jpg"},{"merchants_in_id":"ef9f4c03-1f6b-49a7-96ab-c48ad69d5e29","shop_name":"逆水寒旗舰店","shop_logo":"/Files/MerchantsInLogo/201807/1532355408545.26.png"},{"merchants_in_id":"0f3e9f84-68ab-4b99-8e94-6299a898b6af","shop_name":"七条龙旗舰店","shop_logo":"/Files/MerchantsInLogo/201807/1533046871584.jpg"},{"merchants_in_id":"eca658de-1a15-4214-9018-c5ae71aa9fdb","shop_name":"鑫叶家纺","shop_logo":"/Files/MerchantsInLogo/201809/1536920770279.2.jpg"},{"merchants_in_id":"4a7e0182-371c-4ad9-995d-3f5db5730332","shop_name":"店铺名称","shop_logo":"/Files/MerchantsInLogo/201808/1534412372532.5.jpg"},{"merchants_in_id":"db43698c-9a88-4769-ab28-c56ee37f4346","shop_name":"毛毛的店","shop_logo":"/Files/MerchantsInLogo/201812/7899ccb73b014e988fdaba6f22875493.jpg"},{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","shop_logo":"/Files/MerchantsInLogo/201808/1535016767138.97.jpg"}],"RecommendGoods_Category":[{"goods_category_id":"3c4da24e-9707-4773-a9b2-29f0b8ea2b7e","name":"食品","describe":"","icon":"/Files//201811/1543593504460.86.jpg"},{"goods_category_id":"dbd99ffa-3bc0-42db-bbd4-3899a5c6e50b","name":"美妆","describe":"","icon":"/Files/CategoryIcon/201811/1543587824611.53.jpg"},{"goods_category_id":"770d6ada-aacf-4f7e-8022-54aae7276c03","name":"XO","describe":"","icon":"/Files/CategoryIcon/201810/1540910487295.04.jpg"}],"RecommendGoods":[{"goods_id":"7e91a47e-bb42-45c7-a017-043e458e07c4","original_price":"10.00","buying_price":"0.01","name":"杂物","icon":"/Files/Goods/201901/588485ae136546aab7fed140e8025a9d.jpg"},{"goods_id":"85003b04-c1d9-4497-b0ab-95a191568c4a","original_price":"666.00","buying_price":"0.01","name":"匡威帆布鞋","icon":"/Files/Goods/201812/b87f873fae8c408f92b876827b9a60be.jpg"},{"goods_id":"3beedbd2-bb26-4bd8-9af4-5a602f564e13","original_price":"888.00","buying_price":"0.01","name":"匡威（帆布鞋）","icon":"/Files/Goods/201812/2f8c713d772241eba9efe8a38496f8d4.jpg"},{"goods_id":"b6a2c993-ff09-427a-8599-e5e7d5469626","original_price":"10.00","buying_price":"0.01","name":"美妆","icon":"/Files/Goods/201812/bea8b121b09b490ca9c88dcc7570e867.jpg"},{"goods_id":"605a2085-63ba-48ba-816c-5a8e4d192d8b","original_price":"10000.00","buying_price":"0.01","name":"大美盛年","icon":"/Files/Goods/201812/f37b666da90f42f2b91803a1d55b063c.jpg"},{"goods_id":"5064bc1e-7068-4214-9069-c59afc60fdd7","original_price":"800.00","buying_price":"499.00","name":"大美盛年","icon":"/Files/Goods/201812/3b14981907704209a03d4ce02e9b4b77.jpg"},{"goods_id":"4180c264-9822-4f71-8f23-74a3bbabe020","original_price":"10.00","buying_price":"0.01","name":"实木衣架","icon":"/Files/Goods/201811/1542982064283.46.jpg"},{"goods_id":"784fce16-2048-46c1-bb92-fe2baa5cfa00","original_price":"29.90","buying_price":"19.90","name":"实木衣架西服挂衣架","icon":"/Files/Goods/201810/1540993682881.64.jpg"},{"goods_id":"8596c332-ef43-4c6a-8b80-10fd7cc94e44","original_price":"36.00","buying_price":"0.01","name":"农夫山泉 饮用水","icon":"/Files/Goods/201810/1540986057294.11.jpg"},{"goods_id":"f7bc7960-39ba-428a-a7f2-7235e6c3119c","original_price":"1699.00","buying_price":"1699.00","name":"华为畅享9 Plus","icon":"/Files/Goods/201810/1540912438033.25.jpg"},{"goods_id":"7e1d89c0-040b-4208-9d5f-514448791b6d","original_price":"10.00","buying_price":"0.10","name":"智能家居","icon":"/Files/Goods/201811/1542902283898.64.png"},{"goods_id":"43077d1d-c1c1-42f9-93ec-95d4b25a7792","original_price":"500.00","buying_price":"329.00","name":"法国原瓶进口XO","icon":"/Files/Goods/201810/1541001226644.93.jpg"}],"HotGoods_Category":[{"goods_category_id":"770d6ada-aacf-4f7e-8022-54aae7276c03","name":"XO","describe":"","icon":"/Files/CategoryIcon/201810/1540910487295.04.jpg"},{"goods_category_id":"6ac715b1-55ea-4ded-a4bf-e4fe8ba5cf7b","name":"农夫山泉","describe":"","icon":"/Files//201810/1541003458459.44.jpg"},{"goods_category_id":"3c4da24e-9707-4773-a9b2-29f0b8ea2b7e","name":"食品","describe":"","icon":"/Files//201811/1543593504460.86.jpg"},{"goods_category_id":"01e3f449-6c63-44be-be13-398f357da915","name":"华为","describe":"","icon":"/Files/CategoryIcon/201810/1540910565305.81.jpg"},{"goods_category_id":"0f0e98ec-a7eb-40a8-b369-77cac917212d","name":"上海小糕点","describe":"","icon":"/Files/CategoryIcon/201807/1532530883841.22.jpg"},{"goods_category_id":"3b2734c8-04cd-42f2-9513-e6541092346d","name":"怡宝","describe":"","icon":"/Files/CategoryIcon/201810/1540981383955.99.jpg"},{"goods_category_id":"f5ef658a-e1ec-49ae-a87e-8e95d738a54f","name":"帆布鞋","describe":"","icon":"/Files/CategoryIcon/201808/1533119905187.16.jpg"},{"goods_category_id":"e40a7739-aa60-4e6b-abb6-fc86a79b74d2","name":"皮鞋","describe":"","icon":"/Files/CategoryIcon/201808/1533119929855.14.jpg"},{"goods_category_id":"2f2e9c17-35d7-4480-ae2e-352f86d27a6c","name":"实木衣架","describe":"","icon":"/Files/CategoryIcon/201810/1540907104299.33.jpg"},{"goods_category_id":"516ce162-8d22-47f7-a132-30f6fe3d7989","name":"法国红酒","describe":"","icon":"/Files//201810/1540908769476.85.jpg"},{"goods_category_id":"5c13a845-4d7e-4abd-b057-945bcc4485e6","name":"运动户外","describe":"","icon":"/Files//201810/1540909617781.94.jpg"}],"HotGoods":[{"goods_id":"31fb769c-7e4d-4a02-8528-14757b45d1f8","original_price":"11.00","buying_price":"0.01","name":"安卓商品2次","instructions":"商品简介商品简介商品简介","icon":"/Files/Goods/201808/1534783428704.11.png"},{"goods_id":"8596c332-ef43-4c6a-8b80-10fd7cc94e44","original_price":"36.00","buying_price":"0.01","name":"农夫山泉 饮用水","instructions":"农夫山泉 饮用水","icon":"/Files/Goods/201810/1540986057294.11.jpg"},{"goods_id":"29b1deab-509d-4189-8632-317482659adc","original_price":"800.00","buying_price":"0.01","name":"大美盛年","instructions":"美美","icon":"/Files/Goods/201812/a2a044f7ecc34548bb3b44e0d27c3fa5.jpg"},{"goods_id":"7d652156-c796-4bc6-a201-3aaf876b1ef9","original_price":"129.00","buying_price":"0.01","name":"怡宝","instructions":"250","icon":"/Files/Goods/201811/1541500406174.32.jpg"},{"goods_id":"7e1d89c0-040b-4208-9d5f-514448791b6d","original_price":"10.00","buying_price":"0.10","name":"智能家居","instructions":"智能家居，家居中的霸王机","icon":"/Files/Goods/201811/1542902283898.64.png"},{"goods_id":"85003b04-c1d9-4497-b0ab-95a191568c4a","original_price":"666.00","buying_price":"0.01","name":"匡威帆布鞋","instructions":"匡威陪伴，幸福一生","icon":"/Files/Goods/201812/b87f873fae8c408f92b876827b9a60be.jpg"},{"goods_id":"b6a2c993-ff09-427a-8599-e5e7d5469626","original_price":"10.00","buying_price":"0.01","name":"美妆","instructions":"美妆","icon":"/Files/Goods/201812/bea8b121b09b490ca9c88dcc7570e867.jpg"},{"goods_id":"784fce16-2048-46c1-bb92-fe2baa5cfa00","original_price":"29.90","buying_price":"19.90","name":"实木衣架西服挂衣架","instructions":"实木衣架西服挂衣架","icon":"/Files/Goods/201810/1540993682881.64.jpg"},{"goods_id":"70c70d88-62bc-4c8a-a9a1-2373f240a07e","original_price":"800.00","buying_price":"0.01","name":"大美盛年","instructions":"【漫漫红尘路  还你本色美】","icon":"/Files/Goods/201812/60881534250347eb9e8e3292b1b74eec.jpg"},{"goods_id":"605a2085-63ba-48ba-816c-5a8e4d192d8b","original_price":"10000.00","buying_price":"0.01","name":"大美盛年","instructions":"漫漫红尘路  还你本色美","icon":"/Files/Goods/201812/f37b666da90f42f2b91803a1d55b063c.jpg"}],"GetSou":[{"id":"bc8f85b3-5959-4130-9e07-51c48731c8fc","content":"华为"}]}]}
		var url = this.apiUrl+"/DataMobile/home.ashx?Action=GetHome";
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'json',
            success: function (result) {
            	console.log(result.data);
                var merchants_in=result.data[0].Merchants_In;
                var sou=result.data[0].GetSou[0];
                var searchText="";
	                searchText+="<div class=\"top\">";
				        searchText+="<a  href=\"javascript:;\" @click=\"history.go(-1)\" class=\"city\">上海</a>";
				        searchText+="<a target=\"_parent\" href=\"search.html?q="+sou.content+"\" class=\"search\">";
				          searchText+="<img src=\"../imgs/search-5@2x.png\">";
				          searchText+="<input type=\"text\"  readonly value=\""+sou.content+"\"> ";  		        	
				        searchText+="</a>";   
				    searchText+="</div>";
				$('.header').html(searchText) ;   
                var html="<ul>";
                    for (var i = 0; i < merchants_in.length; i++) {
                    	html+="<li>";	  			
                    		html+="<a target=\"_parent\" href=\"shop.html?merchants_in_id="+merchants_in[i].merchants_in_id+"\">";	  			
							  	html+="<div class=\"shop-img\">";
							  		html+="<img src=\"http://122.112.209.170:8088"+merchants_in[i].shop_logo+"\">";
							  	html+="</div>";
							  	html+="<div class=\"shop-name\">";
							  		html+=merchants_in[i].shop_name;
							  	html+="</div>";
						  	html+="</a>";
				  		html+="</li>";
                    }
                    html+="<li>";
                    		html+="<a target=\"_parent\"  href=\"shop_list.html\">";		  			
							  	html+="<div class=\"shop-img\">";
							  		html+="<img src=\"../imgs/home_more_icon.png\">";
							  	html+="</div>";
							  	html+="<div class=\"shop-name\">";
							  		html+="更多"; 
							  	html+="</div>";
						  	html+="</a>";
				  		html+="</li>";
                html+="</ul>";
                $('.shop').html(html);

                //热卖榜单
                var hot_goods_category=result.data[0].HotGoods_Category;
                var goods_category="";
                	for (var i = 0; i < hot_goods_category.length; i++) {
                		if(i<3){

                    		goods_category+="<div>"
		                    goods_category+="<div class=\"category-img\">";
					  			goods_category+="<img src=\"http://122.112.209.170:8088"+hot_goods_category[i].icon+"\">";
					  		goods_category+="</div>"
					  		goods_category+="<div class=\"category-name\">";
					  			goods_category+=hot_goods_category[i].name;
					  		goods_category+="</div>";
                    		goods_category+="</div>";
                		}
                	}
                $('.hots-goods-category').html(goods_category);
                //热卖商品
                var hots_goods="";
                var hot_goods=result.data[0].HotGoods
                    hots_goods+="<ul>";
                    	for (var j = 0; j < hot_goods.length; j++) {
                    		
				  			hots_goods+="<li>";
				  				hots_goods+="<a target=\"_parent\" href=\"goods_detail.html?goods_id="+hot_goods[j].goods_id+"\">"
				  				hots_goods+="<div class=\"goods-category-img\">";
				  					hots_goods+="<img src=\"http://122.112.209.170:8088"+hot_goods[j].icon+"\">";
				  				hots_goods+="</div>";
				  				hots_goods+="<div class=\"goods-category-name\">";
				  					hots_goods+=hot_goods[j].name;
				  				hots_goods+="</div>";
				  				hots_goods+="<div class=\"goods-category-price\">";
				  					hots_goods+="<span>¥"+hot_goods[j].buying_price+"</span>";
				  					hots_goods+="<del>¥"+hot_goods[j].original_price+"</del>";
				  				hots_goods+="</div>";
				  				hots_goods+="</a>"
				  			hots_goods+="</li>";
                    	}
			  		hots_goods+="</ul>";

                    $('.hots-goods').html(hots_goods);

                //为您推荐
                var recommend=result.data[0].RecommendGoods_Category;
                var recommend_category="";
                    for (var l = 0; l < recommend.length; l++) {
                		if(l<3){

                    		recommend_category+="<div>"
		                    recommend_category+="<div class=\"category-img\">";
					  			recommend_category+="<img src=\"http://122.112.209.170:8088"+recommend[l].icon+"\">";
					  		recommend_category+="</div>"
					  		recommend_category+="<div class=\"category-name\">";
					  			recommend_category+=recommend[l].name;
					  		recommend_category+="</div>";
                    		recommend_category+="</div>";
                		}
                	}
                $('.recommend-category').html(recommend_category);

                //推荐商品 recommend-goods
                var recommend_goods="";
                var recommend_goods_list=result.data[0].RecommendGoods;
                    recommend_goods+="<ul>";
                    	for (var k = 0; k < recommend_goods_list.length; k++) {
                    		
				  			recommend_goods+="<li>";
				  				recommend_goods+="<a target=\"_parent\" href=\"goods_detail.html?goods_id="+recommend_goods_list[k].goods_id+"\">"
					  				recommend_goods+="<div class=\"category-img\">";
					  					recommend_goods+="<img src=\"http://122.112.209.170:8088"+recommend_goods_list[k].icon+"\">";
					  				recommend_goods+="</div>";
					  				recommend_goods+="<div class=\"category-name\">";
					  					recommend_goods+=recommend_goods_list[k].name;
					  				recommend_goods+="</div>";
					  				recommend_goods+="<div class=\"category-price\">";
					  					recommend_goods+="<span>¥"+recommend_goods_list[k].buying_price+"</span>";
					  					recommend_goods+="<del>¥"+recommend_goods_list[k].original_price+"</del>";
					  				recommend_goods+="</div>";
				  				recommend_goods+="</a>"
				  			recommend_goods+="</li>";
                    	}
			  		recommend_goods+="</ul>";

                    $('.recommend-goods').html(recommend_goods);
            }
        });
	}
	

}
HOME.init();
