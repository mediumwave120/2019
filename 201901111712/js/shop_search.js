new h_header().$mount('h-header');//把组件挂载到h-header标签上
new h_footer().$mount('h-footer');//把组件挂载到h-footer标签上
new h_login().$mount('h-login');//把组件挂载到h-login标签上
var vm=new Vue({
	el:'#app',
	data:{
		shopList:[],
		getGoodsList:[],
		sortList:[{name:"综合排序",num:1},{name:"销量",num:2},{name:"信用",num:3},{name:"好评",num:4}],
		flag:true,
		isActive:-1,
		content: '',
        skipList: [],
        tabList:[{name:'商品',id:1},{name:'店铺',id:2}],
        recommendList:[],
	},
	mounted(){
		this.$nextTick(function(){
			this.getMerchantInList("1");
			this.getRecommend();
			this.serachType();
			this.changTab(1);
		});
	},
	methods:{
		serachType: function () {            
            var _this = this;
            var url = IP+"/DataMobile/home.ashx?Action=GetHome";
            $.ajax({
                url: url,
                type: 'post',
                async:false,
                dataType: 'json',
                success: function (result) {
                	//{"code":"100","message":"查询成功","data":[{"Swiper":[{"swiper_id":"22d39640-3f6c-4f05-95aa-fed2b2800881","image":"/Files/Swiper/201812/155a74b171bd441f9fd2048786bea6c1.png","goods_id":"605a2085-63ba-48ba-816c-5a8e4d192d8b","skip_url":""},{"swiper_id":"d7945ea2-ed0b-4790-8b25-ec641a15b403","image":"/Files/Swiper/201808/1533131041970.65.jpg","goods_id":"636d7d4c-fa5c-45a8-ae2c-71f6e5f79d84","skip_url":""},{"swiper_id":"ae5a5ae5-dfe1-49ec-a24d-f8679228a945","image":"/Files/Swiper/201810/1540911033956.43.jpg","goods_id":"7e1d89c0-040b-4208-9d5f-514448791b6d","skip_url":""},{"swiper_id":"36fa3a9a-a328-45b6-a4b7-0418bc143631","image":"/Files/Swiper/201810/1541003547960.46.jpg","goods_id":"7d652156-c796-4bc6-a201-3aaf876b1ef9","skip_url":""}],"Merchants_In":[{"merchants_in_id":"a9b8dc80-fa86-4e78-9118-894ddf930734","shop_name":"枫木","shop_logo":"/Files/MerchantsInLogo/201808/1534782486334.52.jpg"},{"merchants_in_id":"2fea90bc-5a48-4ef8-8313-92b140e7c9bb","shop_name":"22","shop_logo":"/Files/MerchantsInLogo/201810/1540308253952.98.jpg"},{"merchants_in_id":"1234567","shop_name":"皮卡丘的小店","shop_logo":"/Files/MerchantsInLogo/201807/1531935945970.97.jpg"},{"merchants_in_id":"ef9f4c03-1f6b-49a7-96ab-c48ad69d5e29","shop_name":"逆水寒旗舰店","shop_logo":"/Files/MerchantsInLogo/201807/1532355408545.26.png"},{"merchants_in_id":"0f3e9f84-68ab-4b99-8e94-6299a898b6af","shop_name":"七条龙旗舰店","shop_logo":"/Files/MerchantsInLogo/201807/1533046871584.jpg"},{"merchants_in_id":"eca658de-1a15-4214-9018-c5ae71aa9fdb","shop_name":"鑫叶家纺","shop_logo":"/Files/MerchantsInLogo/201809/1536920770279.2.jpg"},{"merchants_in_id":"4a7e0182-371c-4ad9-995d-3f5db5730332","shop_name":"店铺名称","shop_logo":"/Files/MerchantsInLogo/201808/1534412372532.5.jpg"},{"merchants_in_id":"db43698c-9a88-4769-ab28-c56ee37f4346","shop_name":"毛毛的店","shop_logo":"/Files/MerchantsInLogo/201812/7899ccb73b014e988fdaba6f22875493.jpg"},{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","shop_logo":"/Files/MerchantsInLogo/201808/1535016767138.97.jpg"}],"RecommendGoods_Category":[{"goods_category_id":"3c4da24e-9707-4773-a9b2-29f0b8ea2b7e","name":"食品","describe":"","icon":"/Files//201811/1543593504460.86.jpg"},{"goods_category_id":"dbd99ffa-3bc0-42db-bbd4-3899a5c6e50b","name":"美妆","describe":"","icon":"/Files/CategoryIcon/201811/1543587824611.53.jpg"},{"goods_category_id":"770d6ada-aacf-4f7e-8022-54aae7276c03","name":"XO","describe":"","icon":"/Files/CategoryIcon/201810/1540910487295.04.jpg"}],"RecommendGoods":[{"goods_id":"7e91a47e-bb42-45c7-a017-043e458e07c4","original_price":"10.00","buying_price":"0.01","name":"杂物","icon":"/Files/Goods/201901/588485ae136546aab7fed140e8025a9d.jpg"},{"goods_id":"85003b04-c1d9-4497-b0ab-95a191568c4a","original_price":"666.00","buying_price":"0.01","name":"匡威帆布鞋","icon":"/Files/Goods/201812/b87f873fae8c408f92b876827b9a60be.jpg"},{"goods_id":"3beedbd2-bb26-4bd8-9af4-5a602f564e13","original_price":"888.00","buying_price":"0.01","name":"匡威（帆布鞋）","icon":"/Files/Goods/201812/2f8c713d772241eba9efe8a38496f8d4.jpg"},{"goods_id":"b6a2c993-ff09-427a-8599-e5e7d5469626","original_price":"10.00","buying_price":"0.01","name":"美妆","icon":"/Files/Goods/201812/bea8b121b09b490ca9c88dcc7570e867.jpg"},{"goods_id":"605a2085-63ba-48ba-816c-5a8e4d192d8b","original_price":"10000.00","buying_price":"0.01","name":"大美盛年","icon":"/Files/Goods/201812/f37b666da90f42f2b91803a1d55b063c.jpg"},{"goods_id":"5064bc1e-7068-4214-9069-c59afc60fdd7","original_price":"800.00","buying_price":"499.00","name":"大美盛年","icon":"/Files/Goods/201812/3b14981907704209a03d4ce02e9b4b77.jpg"},{"goods_id":"4180c264-9822-4f71-8f23-74a3bbabe020","original_price":"10.00","buying_price":"0.01","name":"实木衣架","icon":"/Files/Goods/201811/1542982064283.46.jpg"},{"goods_id":"784fce16-2048-46c1-bb92-fe2baa5cfa00","original_price":"29.90","buying_price":"19.90","name":"实木衣架西服挂衣架","icon":"/Files/Goods/201810/1540993682881.64.jpg"},{"goods_id":"8596c332-ef43-4c6a-8b80-10fd7cc94e44","original_price":"36.00","buying_price":"0.01","name":"农夫山泉 饮用水","icon":"/Files/Goods/201810/1540986057294.11.jpg"},{"goods_id":"f7bc7960-39ba-428a-a7f2-7235e6c3119c","original_price":"1699.00","buying_price":"1699.00","name":"华为畅享9 Plus","icon":"/Files/Goods/201810/1540912438033.25.jpg"},{"goods_id":"7e1d89c0-040b-4208-9d5f-514448791b6d","original_price":"10.00","buying_price":"0.10","name":"智能家居","icon":"/Files/Goods/201811/1542902283898.64.png"},{"goods_id":"43077d1d-c1c1-42f9-93ec-95d4b25a7792","original_price":"500.00","buying_price":"329.00","name":"法国原瓶进口XO","icon":"/Files/Goods/201810/1541001226644.93.jpg"}],"HotGoods_Category":[{"goods_category_id":"770d6ada-aacf-4f7e-8022-54aae7276c03","name":"XO","describe":"","icon":"/Files/CategoryIcon/201810/1540910487295.04.jpg"},{"goods_category_id":"6ac715b1-55ea-4ded-a4bf-e4fe8ba5cf7b","name":"农夫山泉","describe":"","icon":"/Files//201810/1541003458459.44.jpg"},{"goods_category_id":"3c4da24e-9707-4773-a9b2-29f0b8ea2b7e","name":"食品","describe":"","icon":"/Files//201811/1543593504460.86.jpg"},{"goods_category_id":"01e3f449-6c63-44be-be13-398f357da915","name":"华为","describe":"","icon":"/Files/CategoryIcon/201810/1540910565305.81.jpg"},{"goods_category_id":"0f0e98ec-a7eb-40a8-b369-77cac917212d","name":"上海小糕点","describe":"","icon":"/Files/CategoryIcon/201807/1532530883841.22.jpg"},{"goods_category_id":"3b2734c8-04cd-42f2-9513-e6541092346d","name":"怡宝","describe":"","icon":"/Files/CategoryIcon/201810/1540981383955.99.jpg"},{"goods_category_id":"f5ef658a-e1ec-49ae-a87e-8e95d738a54f","name":"帆布鞋","describe":"","icon":"/Files/CategoryIcon/201808/1533119905187.16.jpg"},{"goods_category_id":"e40a7739-aa60-4e6b-abb6-fc86a79b74d2","name":"皮鞋","describe":"","icon":"/Files/CategoryIcon/201808/1533119929855.14.jpg"},{"goods_category_id":"2f2e9c17-35d7-4480-ae2e-352f86d27a6c","name":"实木衣架","describe":"","icon":"/Files/CategoryIcon/201810/1540907104299.33.jpg"},{"goods_category_id":"516ce162-8d22-47f7-a132-30f6fe3d7989","name":"法国红酒","describe":"","icon":"/Files//201810/1540908769476.85.jpg"},{"goods_category_id":"5c13a845-4d7e-4abd-b057-945bcc4485e6","name":"运动户外","describe":"","icon":"/Files//201810/1540909617781.94.jpg"}],"HotGoods":[{"goods_id":"31fb769c-7e4d-4a02-8528-14757b45d1f8","original_price":"11.00","buying_price":"0.01","name":"安卓商品2次","instructions":"商品简介商品简介商品简介","icon":"/Files/Goods/201808/1534783428704.11.png"},{"goods_id":"8596c332-ef43-4c6a-8b80-10fd7cc94e44","original_price":"36.00","buying_price":"0.01","name":"农夫山泉 饮用水","instructions":"农夫山泉 饮用水","icon":"/Files/Goods/201810/1540986057294.11.jpg"},{"goods_id":"29b1deab-509d-4189-8632-317482659adc","original_price":"800.00","buying_price":"0.01","name":"大美盛年","instructions":"美美","icon":"/Files/Goods/201812/a2a044f7ecc34548bb3b44e0d27c3fa5.jpg"},{"goods_id":"7d652156-c796-4bc6-a201-3aaf876b1ef9","original_price":"129.00","buying_price":"0.01","name":"怡宝","instructions":"250","icon":"/Files/Goods/201811/1541500406174.32.jpg"},{"goods_id":"7e1d89c0-040b-4208-9d5f-514448791b6d","original_price":"10.00","buying_price":"0.10","name":"智能家居","instructions":"智能家居，家居中的霸王机","icon":"/Files/Goods/201811/1542902283898.64.png"},{"goods_id":"85003b04-c1d9-4497-b0ab-95a191568c4a","original_price":"666.00","buying_price":"0.01","name":"匡威帆布鞋","instructions":"匡威陪伴，幸福一生","icon":"/Files/Goods/201812/b87f873fae8c408f92b876827b9a60be.jpg"},{"goods_id":"b6a2c993-ff09-427a-8599-e5e7d5469626","original_price":"10.00","buying_price":"0.01","name":"美妆","instructions":"美妆","icon":"/Files/Goods/201812/bea8b121b09b490ca9c88dcc7570e867.jpg"},{"goods_id":"784fce16-2048-46c1-bb92-fe2baa5cfa00","original_price":"29.90","buying_price":"19.90","name":"实木衣架西服挂衣架","instructions":"实木衣架西服挂衣架","icon":"/Files/Goods/201810/1540993682881.64.jpg"},{"goods_id":"70c70d88-62bc-4c8a-a9a1-2373f240a07e","original_price":"800.00","buying_price":"0.01","name":"大美盛年","instructions":"【漫漫红尘路  还你本色美】","icon":"/Files/Goods/201812/60881534250347eb9e8e3292b1b74eec.jpg"},{"goods_id":"605a2085-63ba-48ba-816c-5a8e4d192d8b","original_price":"10000.00","buying_price":"0.01","name":"大美盛年","instructions":"漫漫红尘路  还你本色美","icon":"/Files/Goods/201812/f37b666da90f42f2b91803a1d55b063c.jpg"}],"GetSou":[{"id":"bc8f85b3-5959-4130-9e07-51c48731c8fc","content":"华为"}]}]}
                
                    if (result.code == "100") {
                        _this.recommendList=result.data;
                        var result=result.data;
						var recommendList=[];
						var obj1={},obj2={};
							obj1.RecommendGoods=result[0].RecommendGoods;
							obj1.id=1;
							obj2.Merchants_In=result[0].Merchants_In;
							obj2.id=2;
							recommendList.push(obj1,obj2)
						_this.recommendList=recommendList;
                     
                    }
                }
            });
        },
		//GetMerchantInList
		getMerchantInList:function(searchType){
			var _this=this;
			 _this.sortList.forEach(function(item){
			 	item.num =searchType;
			 }) ;
			 var q=this.getUrlParam('q');
			var obj={};
				obj.pageIndex=1;
				obj.firstPageTime="";
				obj.searchType=searchType;
				obj.business_type_id="";
				obj.name=q;
				obj.user_id = GetUserId();//'0cbc4f22-8585-4d3d-b089-38ec35ebb56d';//GetUserId();
			$.ajax({
	            url: IP+"/DataMobile/merchants_in.ashx?Action=GetMerchantsInList",
	            type: "get",
	            data:obj,
	            dataType: "json",
	            success: function (datajson){
	            	//{"code":"100","firstPageTime":"2019/1/8 10:32:25","message":"查询成功","data":[{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","shop_logo":"/Files/MerchantsInLogo/201808/1535016767138.97.jpg","Goods":[{"goods_id":"43077d1d-c1c1-42f9-93ec-95d4b25a7792","icon":"/Files/Goods/201810/1541001226644.93.jpg"},{"goods_id":"784fce16-2048-46c1-bb92-fe2baa5cfa00","icon":"/Files/Goods/201810/1540993682881.64.jpg"},{"goods_id":"7e1d89c0-040b-4208-9d5f-514448791b6d","icon":"/Files/Goods/201811/1542902283898.64.png"},{"goods_id":"7e91a47e-bb42-45c7-a017-043e458e07c4","icon":"/Files/Goods/201901/588485ae136546aab7fed140e8025a9d.jpg"},{"goods_id":"8596c332-ef43-4c6a-8b80-10fd7cc94e44","icon":"/Files/Goods/201810/1540986057294.11.jpg"},{"goods_id":"b6a2c993-ff09-427a-8599-e5e7d5469626","icon":"/Files/Goods/201812/bea8b121b09b490ca9c88dcc7570e867.jpg"},{"goods_id":"f7bc7960-39ba-428a-a7f2-7235e6c3119c","icon":"/Files/Goods/201810/1540912438033.25.jpg"},{"goods_id":"a3728bba-30ff-4ab7-aae5-46512549aeae","icon":""},{"goods_id":"a6605f09-5fc0-44e9-91b9-f98f5ba1a318","icon":"/Files/Goods/201810/1540982234885.1.jpg"},{"goods_id":"7d652156-c796-4bc6-a201-3aaf876b1ef9","icon":"/Files/Goods/201811/1541500406174.32.jpg"},{"goods_id":"29b1deab-509d-4189-8632-317482659adc","icon":"/Files/Goods/201812/a2a044f7ecc34548bb3b44e0d27c3fa5.jpg"},{"goods_id":"30091c31-97cf-4898-8165-20a96cfa070f","icon":"/Files/Goods/201810/1539788119690.19.png"},{"goods_id":"31fb769c-7e4d-4a02-8528-14757b45d1f8","icon":"/Files/Goods/201808/1534783428704.11.png"}]}]}
	            	
	            	console.log(datajson)
	                if(datajson.code=="100"){
	                	_this.shopList=datajson.data;

	                }
	            }, error: function () {
	                alert("后台错误！")
	            }

	        })
		},
		getRecommend:function(){
			var _this=this;
			$.ajax({
	            url: IP+"/DataMobile/home.ashx?Action=GetHome",
	            type: "get",
	            dataType: "json",
	            success: function (datajson){
	            	//{"code":"100","message":"查询成功","data":[{"Swiper":[{"swiper_id":"22d39640-3f6c-4f05-95aa-fed2b2800881","image":"/Files/Swiper/201812/155a74b171bd441f9fd2048786bea6c1.png","goods_id":"605a2085-63ba-48ba-816c-5a8e4d192d8b","skip_url":""},{"swiper_id":"d7945ea2-ed0b-4790-8b25-ec641a15b403","image":"/Files/Swiper/201808/1533131041970.65.jpg","goods_id":"636d7d4c-fa5c-45a8-ae2c-71f6e5f79d84","skip_url":""},{"swiper_id":"ae5a5ae5-dfe1-49ec-a24d-f8679228a945","image":"/Files/Swiper/201810/1540911033956.43.jpg","goods_id":"7e1d89c0-040b-4208-9d5f-514448791b6d","skip_url":""},{"swiper_id":"36fa3a9a-a328-45b6-a4b7-0418bc143631","image":"/Files/Swiper/201810/1541003547960.46.jpg","goods_id":"7d652156-c796-4bc6-a201-3aaf876b1ef9","skip_url":""}],"Merchants_In":[{"merchants_in_id":"a9b8dc80-fa86-4e78-9118-894ddf930734","shop_name":"枫木","shop_logo":"/Files/MerchantsInLogo/201808/1534782486334.52.jpg"},{"merchants_in_id":"2fea90bc-5a48-4ef8-8313-92b140e7c9bb","shop_name":"22","shop_logo":"/Files/MerchantsInLogo/201810/1540308253952.98.jpg"},{"merchants_in_id":"1234567","shop_name":"皮卡丘的小店","shop_logo":"/Files/MerchantsInLogo/201807/1531935945970.97.jpg"},{"merchants_in_id":"ef9f4c03-1f6b-49a7-96ab-c48ad69d5e29","shop_name":"逆水寒旗舰店","shop_logo":"/Files/MerchantsInLogo/201807/1532355408545.26.png"},{"merchants_in_id":"0f3e9f84-68ab-4b99-8e94-6299a898b6af","shop_name":"七条龙旗舰店","shop_logo":"/Files/MerchantsInLogo/201807/1533046871584.jpg"},{"merchants_in_id":"eca658de-1a15-4214-9018-c5ae71aa9fdb","shop_name":"鑫叶家纺","shop_logo":"/Files/MerchantsInLogo/201809/1536920770279.2.jpg"},{"merchants_in_id":"4a7e0182-371c-4ad9-995d-3f5db5730332","shop_name":"店铺名称","shop_logo":"/Files/MerchantsInLogo/201808/1534412372532.5.jpg"},{"merchants_in_id":"db43698c-9a88-4769-ab28-c56ee37f4346","shop_name":"毛毛的店","shop_logo":"/Files/MerchantsInLogo/201812/7899ccb73b014e988fdaba6f22875493.jpg"},{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","shop_logo":"/Files/MerchantsInLogo/201808/1535016767138.97.jpg"}],"RecommendGoods_Category":[{"goods_category_id":"3c4da24e-9707-4773-a9b2-29f0b8ea2b7e","name":"食品","describe":"","icon":"/Files//201811/1543593504460.86.jpg"},{"goods_category_id":"dbd99ffa-3bc0-42db-bbd4-3899a5c6e50b","name":"美妆","describe":"","icon":"/Files/CategoryIcon/201811/1543587824611.53.jpg"},{"goods_category_id":"770d6ada-aacf-4f7e-8022-54aae7276c03","name":"XO","describe":"","icon":"/Files/CategoryIcon/201810/1540910487295.04.jpg"}],"RecommendGoods":[{"goods_id":"7e91a47e-bb42-45c7-a017-043e458e07c4","original_price":"10.00","buying_price":"0.01","name":"杂物","icon":"/Files/Goods/201901/588485ae136546aab7fed140e8025a9d.jpg"},{"goods_id":"85003b04-c1d9-4497-b0ab-95a191568c4a","original_price":"666.00","buying_price":"0.01","name":"匡威帆布鞋","icon":"/Files/Goods/201812/b87f873fae8c408f92b876827b9a60be.jpg"},{"goods_id":"3beedbd2-bb26-4bd8-9af4-5a602f564e13","original_price":"888.00","buying_price":"0.01","name":"匡威（帆布鞋）","icon":"/Files/Goods/201812/2f8c713d772241eba9efe8a38496f8d4.jpg"},{"goods_id":"b6a2c993-ff09-427a-8599-e5e7d5469626","original_price":"10.00","buying_price":"0.01","name":"美妆","icon":"/Files/Goods/201812/bea8b121b09b490ca9c88dcc7570e867.jpg"},{"goods_id":"605a2085-63ba-48ba-816c-5a8e4d192d8b","original_price":"10000.00","buying_price":"0.01","name":"大美盛年","icon":"/Files/Goods/201812/f37b666da90f42f2b91803a1d55b063c.jpg"},{"goods_id":"5064bc1e-7068-4214-9069-c59afc60fdd7","original_price":"800.00","buying_price":"499.00","name":"大美盛年","icon":"/Files/Goods/201812/3b14981907704209a03d4ce02e9b4b77.jpg"},{"goods_id":"4180c264-9822-4f71-8f23-74a3bbabe020","original_price":"10.00","buying_price":"0.01","name":"实木衣架","icon":"/Files/Goods/201811/1542982064283.46.jpg"},{"goods_id":"784fce16-2048-46c1-bb92-fe2baa5cfa00","original_price":"29.90","buying_price":"19.90","name":"实木衣架西服挂衣架","icon":"/Files/Goods/201810/1540993682881.64.jpg"},{"goods_id":"8596c332-ef43-4c6a-8b80-10fd7cc94e44","original_price":"36.00","buying_price":"0.01","name":"农夫山泉 饮用水","icon":"/Files/Goods/201810/1540986057294.11.jpg"},{"goods_id":"f7bc7960-39ba-428a-a7f2-7235e6c3119c","original_price":"1699.00","buying_price":"1699.00","name":"华为畅享9 Plus","icon":"/Files/Goods/201810/1540912438033.25.jpg"},{"goods_id":"7e1d89c0-040b-4208-9d5f-514448791b6d","original_price":"10.00","buying_price":"0.10","name":"智能家居","icon":"/Files/Goods/201811/1542902283898.64.png"},{"goods_id":"43077d1d-c1c1-42f9-93ec-95d4b25a7792","original_price":"500.00","buying_price":"329.00","name":"法国原瓶进口XO","icon":"/Files/Goods/201810/1541001226644.93.jpg"}],"HotGoods_Category":[{"goods_category_id":"770d6ada-aacf-4f7e-8022-54aae7276c03","name":"XO","describe":"","icon":"/Files/CategoryIcon/201810/1540910487295.04.jpg"},{"goods_category_id":"6ac715b1-55ea-4ded-a4bf-e4fe8ba5cf7b","name":"农夫山泉","describe":"","icon":"/Files//201810/1541003458459.44.jpg"},{"goods_category_id":"3c4da24e-9707-4773-a9b2-29f0b8ea2b7e","name":"食品","describe":"","icon":"/Files//201811/1543593504460.86.jpg"},{"goods_category_id":"01e3f449-6c63-44be-be13-398f357da915","name":"华为","describe":"","icon":"/Files/CategoryIcon/201810/1540910565305.81.jpg"},{"goods_category_id":"0f0e98ec-a7eb-40a8-b369-77cac917212d","name":"上海小糕点","describe":"","icon":"/Files/CategoryIcon/201807/1532530883841.22.jpg"},{"goods_category_id":"3b2734c8-04cd-42f2-9513-e6541092346d","name":"怡宝","describe":"","icon":"/Files/CategoryIcon/201810/1540981383955.99.jpg"},{"goods_category_id":"f5ef658a-e1ec-49ae-a87e-8e95d738a54f","name":"帆布鞋","describe":"","icon":"/Files/CategoryIcon/201808/1533119905187.16.jpg"},{"goods_category_id":"e40a7739-aa60-4e6b-abb6-fc86a79b74d2","name":"皮鞋","describe":"","icon":"/Files/CategoryIcon/201808/1533119929855.14.jpg"},{"goods_category_id":"2f2e9c17-35d7-4480-ae2e-352f86d27a6c","name":"实木衣架","describe":"","icon":"/Files/CategoryIcon/201810/1540907104299.33.jpg"},{"goods_category_id":"516ce162-8d22-47f7-a132-30f6fe3d7989","name":"法国红酒","describe":"","icon":"/Files//201810/1540908769476.85.jpg"},{"goods_category_id":"5c13a845-4d7e-4abd-b057-945bcc4485e6","name":"运动户外","describe":"","icon":"/Files//201810/1540909617781.94.jpg"}],"HotGoods":[{"goods_id":"31fb769c-7e4d-4a02-8528-14757b45d1f8","original_price":"11.00","buying_price":"0.01","name":"安卓商品2次","instructions":"商品简介商品简介商品简介","icon":"/Files/Goods/201808/1534783428704.11.png"},{"goods_id":"8596c332-ef43-4c6a-8b80-10fd7cc94e44","original_price":"36.00","buying_price":"0.01","name":"农夫山泉 饮用水","instructions":"农夫山泉 饮用水","icon":"/Files/Goods/201810/1540986057294.11.jpg"},{"goods_id":"29b1deab-509d-4189-8632-317482659adc","original_price":"800.00","buying_price":"0.01","name":"大美盛年","instructions":"美美","icon":"/Files/Goods/201812/a2a044f7ecc34548bb3b44e0d27c3fa5.jpg"},{"goods_id":"7d652156-c796-4bc6-a201-3aaf876b1ef9","original_price":"129.00","buying_price":"0.01","name":"怡宝","instructions":"250","icon":"/Files/Goods/201811/1541500406174.32.jpg"},{"goods_id":"7e1d89c0-040b-4208-9d5f-514448791b6d","original_price":"10.00","buying_price":"0.10","name":"智能家居","instructions":"智能家居，家居中的霸王机","icon":"/Files/Goods/201811/1542902283898.64.png"},{"goods_id":"85003b04-c1d9-4497-b0ab-95a191568c4a","original_price":"666.00","buying_price":"0.01","name":"匡威帆布鞋","instructions":"匡威陪伴，幸福一生","icon":"/Files/Goods/201812/b87f873fae8c408f92b876827b9a60be.jpg"},{"goods_id":"b6a2c993-ff09-427a-8599-e5e7d5469626","original_price":"10.00","buying_price":"0.01","name":"美妆","instructions":"美妆","icon":"/Files/Goods/201812/bea8b121b09b490ca9c88dcc7570e867.jpg"},{"goods_id":"784fce16-2048-46c1-bb92-fe2baa5cfa00","original_price":"29.90","buying_price":"19.90","name":"实木衣架西服挂衣架","instructions":"实木衣架西服挂衣架","icon":"/Files/Goods/201810/1540993682881.64.jpg"},{"goods_id":"70c70d88-62bc-4c8a-a9a1-2373f240a07e","original_price":"800.00","buying_price":"0.01","name":"大美盛年","instructions":"【漫漫红尘路  还你本色美】","icon":"/Files/Goods/201812/60881534250347eb9e8e3292b1b74eec.jpg"},{"goods_id":"605a2085-63ba-48ba-816c-5a8e4d192d8b","original_price":"10000.00","buying_price":"0.01","name":"大美盛年","instructions":"漫漫红尘路  还你本色美","icon":"/Files/Goods/201812/f37b666da90f42f2b91803a1d55b063c.jpg"}],"GetSou":[{"id":"bc8f85b3-5959-4130-9e07-51c48731c8fc","content":"华为"}]}]}
	            	
	                if(datajson.code=="100"){
	                	//RecommendGoods
	                	//_this.getGoodsList=
	                	var re=datajson.data[0];
	                	//for (var i = 0; i < re.length; i++) {
	                		console.log(re.RecommendGoods);
	                		_this.getGoodsList=re.RecommendGoods;
	                	//}
	                }
	            }, error: function () {
	                alert("后台错误！")
	            }

	        })
		},
		changeRecommend:function(){
			var _this=this;
			var t;
			var arr=_this.getGoodsList;
			for (var i = 0; i < arr.length; i++) {
				var rand=parseInt(Math.random()*arr.length);
				t = arr[rand];
			     arr[rand] =arr[i];
			     arr[i] = t;

			}
			_this.getGoodsList=arr;
			_this.getMerchantInList("1");
			
		},
		search: function () {
            var _this = this;
            if($('#0').hasClass('active')){
				location.href="goods_search.html?q="+_this.content+"&ie=utf-8";
            }else{
            	location.href="shop_search.html?q="+_this.content+"&ie=utf-8";
            	
            }
   //          var state = {title:'',url:window.location.href};
   //          var q="";
   //          if($('#0').hasClass('active')){
			// 	history.pushState(state,'','list.html?q='+$('.search').val()+'&ie=utf-8');
			// 	q=_this.getUrlParam('q');
   //          }else{
   //          	history.pushState(state,'','shop_search.html?q='+$('.search').val()+'&ie=utf-8');
			// 	q=_this.getUrlParam('q');
   //          }
          
       
   //          var obj={};
			// 	obj.pageIndex=1;
			// 	obj.firstPageTime="";
			// 	obj.searchType="1";
			// 	obj.business_type_id="";
			// 	obj.name=q;
			// 	obj.user_id = GetUserId();//'0cbc4f22-8585-4d3d-b089-38ec35ebb56d';//GetUserId();
			// $.ajax({
	  //           url: _this.apiUrl+"/DataMobile/merchants_in.ashx?Action=GetMerchantsInList",
	  //           type: "get",
	  //           data:obj,
	  //           dataType: "json",
	  //           success: function (datajson){
	  //           	console.log(datajson)
	  //               if(datajson.code=="100"){
	  //               	_this.shopList=datajson.data;

	  //               }
	  //           }, error: function () {
	  //               alert("后台错误！")
	  //           }

	  //       })
        },
        getUrlParam: function (key) {
            // 获取参数
            var url = window.location.search;
            // 正则筛选地址栏
            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
            // 匹配目标参数
            var result = url.substr(1).match(reg);
            //返回参数值
            return result ? decodeURIComponent(result[2]) : null;
        },
        changTab:function(index){
			var _this=this;
        	var q=_this.getUrlParam('q');
			_this.tabList.forEach(function(item){
				item.id=index;
				switch (index) {
					case 0:
						_this.content = q;
						break;
					case 1:
						_this.content = q;
						break;
					default:
						//_this.content = "duke3";
						break;
				}
			})
			// if($('#tab').find('li').eq(0).hasClass('active')){
			// 	$('.tab-content').find('ul').eq(0).addClass('hots').removeClass('hide');
			// }
			_this.recommendList.forEach(function(item){
				item.id=index;
			})
		},
		GetSou:function(){
			var _this=this;
			_this.content=GetCookie('content')
		},
		login:function(){
			$('#preview').fadeIn();
			$('#preview').click(function(e){
			    if (e.target.nodeName == 'SECTION') {
			        $('#preview').fadeOut(500);
			     }
			});
		},
		deletelogin:function(){
			clearCookie();
		    //foreachcookie()
		    location.reload();
		}
	}
})

var url=location.href;
var reg=/^.+:\/\/.+\/(.*)\.html(\?.*)?$/;
var new_url=url.match(reg)[1];
if(new_url=='shop_search'){
	$('#1').addClass('active');
	$('#0').removeClass('active')
}