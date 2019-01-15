new h_header().$mount('h-header');//把组件挂载到h-header标签上
new h_footer().$mount('h-footer');//把组件挂载到h-footer标签上
new h_login().$mount('h-login');//把组件挂载到h-login标签上
var vm=new Vue({
	el:"#app",
	data:{
		
		content:'',
			tabList:[{name:'商品',id:1},{name:'店铺',id:2},{name:'嘟客',id:3}],
			recommendList:[{goods:[{name:'手机',id:1},{name:'超市',id:2},{name:'鞋子',id:3}],id:1},
				 {shop:[{name:'张三店铺',id:1},{name:'李四店铺',id:2},{name:'王五店铺',id:3}],id:2},
				 {duke:[{name:'duke1',id:1},{name:'duke2',id:2},{name:'duke3',id:3}],id:2}]
	},
	mounted: function () {
        this.$nextTick(function () {
            //this.search();
            this.getUrl();
            this.search_category_id();
            this.changTab(0);
        });
    },
	methods:{
		changTab:function(index){
			var _this=this;
			_this.tabList.forEach(function(item){
				item.id=index;
				switch (index) {
					case 0:
						_this.content = $('.search').val();
						break;
					case 1:
						_this.content = "张三店铺";
						break;
					default:
						_this.content = "duke3";
						break;
				}
			})
			_this.recommendList.forEach(function(item){
				item.id=index;
			})
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
		},
		search_category_id:function(){
			var _this=this;
			var g_id=GetQueryString("g_id");
			console.log(g_id);
			var obj={};
				obj.goods_specification_category_id=g_id;
				obj.pageIndex=1;
				obj.firstPageTime="";
				obj.searchType="1";
				obj.name="";
			$.ajax({
                url: IP+"/Data/goods.ashx?Action=GetGoodsList",
                type: 'get',
                data:obj,
                dataType: 'json',
                success: function (dataJson) {

                    if (dataJson.code == "100") {
                    	console.log(dataJson)
                    } else {
                        //alert(dataJson.message);
                    }

                }
            });
            //https://s.taobao.com/search?q=%E6%89%8B%E6%9C%BA&imgfile=&js=1&stats_click=search_radio_all%3A1&initiative_id=staobaoz_20181213&ie=utf8
            //https://s.taobao.com/search?q=%E8%A1%A3%E6%9C%8D&imgfile=&js=1&stats_click=search_radio_all%3A1&initiative_id=staobaoz_20181213&ie=utf8
            //https://s.taobao.com/search?q=%E7%94%B5%E8%A7%86&imgfile=&ie=utf8
            //https://s.taobao.com/search?q=%E7%94%B5%E8%84%91&imgfile=&ie=utf8
            //http://localhost:8080/search.html?q=%E6%89%8B%E6%9C%BA
		},
		search:function(){
			var _this=this;
			// var searchText=_this.getUrlParam('q');
			 var search_text=$('.search').val();
			 location.hash='q='+search_text;
			 //$('.search').val(this.getUrlParam(q));

			// console.log(search_text)
			// var obj={};
			// 	obj.goods_specification_category_id="";
			// 	obj.parent_goods_specification_category_id="";
			// 	obj.pageIndex=1;
			// 	obj.firstPageTime="";
			// 	obj.searchType="1";
			// 	obj.name=search_text;
			// $.ajax({
   //              url: _this.apiUrl+"/DataMobile/goods.ashx?Action=GetGoodsListByCategoryID",
   //              type: 'get',
   //              data:obj,
   //              dataType: 'json',
   //              success: function (dataJson) {
   //              	location.reload();

   //                  if (dataJson.code == "100") {

   //                  } else {
   //                      alert(dataJson.message);
   //                  }

   //              }
   //          });
		},
		getUrlParam:function(key){
			// 获取参数
		    var url = window.location.search;
		    // 正则筛选地址栏
		    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
		    // 匹配目标参数
		    var result = url.substr(1).match(reg);
		    //返回参数值
		    return result ? decodeURIComponent(result[2]) : null;
		},
		getUrl:function(){
			var url = window.location.search;
			var r=url.split('=');
			var rr=r[0].substr(1);
			if(rr=="goods"){
				console.log('goods');
				$()
			}
		}
	}
})

// 6217680200780109
// 50023419880118185X
// 17301764656