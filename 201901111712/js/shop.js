
new Vue({
	el:'#app',
	data:{
		shop:{},
		sortList:[{name:"综合排序",num:1},{name:"销量",num:2},{name:"价格",num:3},{name:"好评",num:4}],
		content: '',
        skipList: [],
        tabList:[{name:'商品',id:1},{name:'店铺',id:2}],
        recommendList:[]
	},
	mounted(){
		this.$nextTick(function(){
			this.getMerchantsInId("1");
			
			this.changTab(1);
			//this.search();
		});
	},
	methods:{
		getMerchantsInId:function(searchType){
			var _this=this;
			_this.sortList.forEach(function(item){
			 	item.num =searchType;
			 }) ;
			var user_id=GetUserId();
			var merchants_in_id = GetQueryString("merchants_in_id");
			var obj={};
				obj.user_id=user_id;
				obj.merchants_in_id=merchants_in_id;
				obj.name="";
				obj.pageIndex=1;
				obj.searchType=searchType;
			$.ajax({
	            url: IP+"/DataMobile/merchants_in.ashx?Action=GetMerchantsInHome",
	            type: "get",
	            data:obj,
	            dataType: "json",
	            success: function (datajson){
	            	//{"code":"100","firstPageTime":"2019/1/8 10:29:49","count":"13","message":"查询成功","data":[{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","address":"","focuscount":"7","is_focus":"1","shop_logo":"/Files/MerchantsInLogo/201808/1535016767138.97.jpg","shop_image":"/Files/MerchantsInLogo/201808/1535016779613.59.jpg","Goods":[{"goods_id":"7e91a47e-bb42-45c7-a017-043e458e07c4","name":"杂物","original_price":"10.00","buying_price":"0.01","instructions":"不可多得","icon":"/Files/Goods/201901/588485ae136546aab7fed140e8025a9d.jpg"},{"goods_id":"b6a2c993-ff09-427a-8599-e5e7d5469626","name":"美妆","original_price":"10.00","buying_price":"0.01","instructions":"美妆","icon":"/Files/Goods/201812/bea8b121b09b490ca9c88dcc7570e867.jpg"},{"goods_id":"7e1d89c0-040b-4208-9d5f-514448791b6d","name":"智能家居","original_price":"10.00","buying_price":"0.10","instructions":"智能家居，家居中的霸王机","icon":"/Files/Goods/201811/1542902283898.64.png"},{"goods_id":"43077d1d-c1c1-42f9-93ec-95d4b25a7792","name":"法国原瓶进口XO","original_price":"500.00","buying_price":"329.00","instructions":"法国原瓶进口XO","icon":"/Files/Goods/201810/1541001226644.93.jpg"},{"goods_id":"784fce16-2048-46c1-bb92-fe2baa5cfa00","name":"实木衣架西服挂衣架","original_price":"29.90","buying_price":"19.90","instructions":"实木衣架西服挂衣架","icon":"/Files/Goods/201810/1540993682881.64.jpg"},{"goods_id":"8596c332-ef43-4c6a-8b80-10fd7cc94e44","name":"农夫山泉 饮用水","original_price":"36.00","buying_price":"0.01","instructions":"农夫山泉 饮用水","icon":"/Files/Goods/201810/1540986057294.11.jpg"},{"goods_id":"f7bc7960-39ba-428a-a7f2-7235e6c3119c","name":"华为畅享9 Plus","original_price":"1699.00","buying_price":"1699.00","instructions":"新品上市：① 购机赠自拍杆 ② 前1000名晒单赠移动电源 ③ 购机赠360元优惠券包 麒麟710全新八核芯片，6.5英寸全面屏，4000毫安大电池，1600万AI智慧四摄，搭载GPU Turbo 技术。","icon":"/Files/Goods/201810/1540912438033.25.jpg"},{"goods_id":"29b1deab-509d-4189-8632-317482659adc","name":"大美盛年","original_price":"800.00","buying_price":"0.01","instructions":"美美","icon":"/Files/Goods/201812/a2a044f7ecc34548bb3b44e0d27c3fa5.jpg"},{"goods_id":"7d652156-c796-4bc6-a201-3aaf876b1ef9","name":"怡宝","original_price":"129.00","buying_price":"0.01","instructions":"250","icon":"/Files/Goods/201811/1541500406174.32.jpg"},{"goods_id":"a3728bba-30ff-4ab7-aae5-46512549aeae","name":"法国进口红酒 拉菲（LAFITE）传奇波尔多干红葡萄酒 750ml","original_price":"88.00","buying_price":"59.80","instructions":"法国进口红酒 拉菲（LAFITE）传奇波尔多干红葡萄酒","icon":""}]}]}
	            	
	                if(datajson.code=="100"){
	                	_this.shop=datajson.data[0];
	                	//_this.shopList=datajson.data;
	                	// _this.recommendList=result.data;
      //                   var result=result.data;
						// var recommendList=[];
						// var obj1={},obj2={};
						// 	obj1.RecommendGoods=result[0].RecommendGoods;
						// 	obj1.id=1;
						// 	obj2.Merchants_In=result[0].Merchants_In;
						// 	obj2.id=2;
						// 	recommendList.push(obj1,obj2)
						// _this.recommendList=recommendList;
	                }
	            }, error: function () {
	                alert("后台错误！")
	            }

	        })
		},
		follow:function(follow){
			var _this=this;
			var user_id=GetUserId();
			var merchants_in_id = GetQueryString("merchants_in_id");
			if(follow=="0")	{
				console.log(follow);
				$.ajax({
		            url: IP+"/DataMobile/merchants_in.ashx?Action=MerchantsInFocusAdd&merchants_in_id="+merchants_in_id+"&user_id="+user_id,
		            type: "get",
		            dataType: "json",
		            success: function (datajson){
		            	console.log(datajson)
		            	console.log($('.follow').text());
		                if(datajson.code=="100"){
		                	// _this.$refs.follow.innerText=""
		                	alert(datajson.message);
		                	location.reload()
		                }
		            }, error: function () {
		                alert("后台错误！")
		            }

		        })
			}
			if(follow=="1")	{
				console.log(follow);
				$.ajax({
		            url: IP+"/DataMobile/merchants_in.ashx?Action=MerchantsInFocusDelete&merchants_in_id="+merchants_in_id+"&user_id="+user_id,
		            type: "get",
		            dataType: "json",
		            success: function (datajson){
		                if(datajson.code=="100"){
		                	alert(datajson.message);
		                	location.reload()
		                }
		            }, error: function () {
		                alert("后台错误！")
		            }

		        })

			}
	
		
		},
		unFollow:function(){
			var _this=this;
			var user_id=GetUserId();
			var merchants_in_id = GetQueryString("merchants_in_id");
			

				$.ajax({
		            url: IP+"/DataMobile/merchants_in.ashx?Action=MerchantsInFocusDelete&merchants_in_id="+merchants_in_id+"&user_id="+user_id,
		            type: "get",
		            dataType: "json",
		            success: function (datajson){
		                if(datajson.code=="100"){
		                	// _this.$refs.follow.innerText=""
		                	$('.follow_num').text(parseInt($('.follow_num').text())-1);
		                	$('.un_follow').text("关注");
		                }
		            }, error: function () {
		                alert("后台错误！")
		            }

		        })
			
		},
		Goods_Dateils:function(id) {
			location.href = "goods_details.html?goods_id="+id;
		},
		changTab:function(index){
			var _this=this;
			_this.tabList.forEach(function(item){
				item.id=index;
				switch (index) {
					case 0:
						_this.content = _this.getUrlParam('q');
						break;
					case 1:
						_this.content = _this.getUrlParam('q');

						break;
					default:
						break;
				}
			})
			_this.recommendList.forEach(function(item){
				item.id=index;
			})
		},
		search: function () {
            var _this = this;
            var state = {title:'',url:window.location.href};
            var q="";
            if($('#0').hasClass('active')){
				history.pushState(state,'','goods_search.html?q='+$('.search').val()+'&ie=utf-8');
				q=_this.getUrlParam('q');
            }else{
            	//history.pushState(state,'','shop.html?q='+$('.search').val()+'&ie=utf-8');
            	location.href="shop_search.html?q="+$('.search').val()+'&ie=utf-8';
				q=_this.getUrlParam('q');
            }
          
            
            // var searchText = _this.getUrlParam('q');
            // $('.search').val(searchText);


            var obj={};
				obj.pageIndex=1;
				obj.firstPageTime="";
				obj.searchType="1";
				obj.business_type_id="";
				obj.name=q;
				obj.user_id = GetUserId();//'0cbc4f22-8585-4d3d-b089-38ec35ebb56d';//GetUserId();
			$.ajax({
	            url: IP+"/DataMobile/merchants_in.ashx?Action=GetMerchantsInList",
	            type: "get",
	            data:obj,
	            dataType: "json",
	            success: function (datajson){
	            	
	                if(datajson.code=="100"){
	                	_this.shopList=datajson.data;

	                }
	            }, error: function () {
	                alert("后台错误！")
	            }

	        })
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
new h_header().$mount('h-header');//把组件挂载到h-header标签上
new h_footer().$mount('h-footer');//把组件挂载到h-footer标签上
new h_login().$mount('h-login');//把组件挂载到h-login标签上
new h_recommend().$mount('h-recommend');//把组件挂载到h-recommend标签上