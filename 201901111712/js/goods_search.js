
var vm = new Vue({
    el: "#app",
    data: {
        content: '',
        skipList: [],
        tabList:[{name:'商品',id:1},{name:'店铺',id:2}],
        recommendList:[],
        sortList: [{ name: "综合排序", num: 1 }, { name: "销量", num: 2 }, { name: "价格", num: 3 }, { name: "好评", num: 4 }]
    },
    mounted: function () {
        this.$nextTick(function () {
            //this.search();
            this.serachType();
            this.GetGoodsList("1");
        });
    },
    methods: {
    	serachType: function () {            
            var _this = this;
            var url = IP+"/DataMobile/home.ashx?Action=GetHome";
            $.ajax({
                url: url,
                type: 'post',
                async:false,
                dataType: 'json',
                success: function (result) {
                   
                    if (result.code == "100") {
                        _this.recommendList=result.data;
                        var result=result.data;
                        /*recommendList:[
                        {goods:[{name:'手机',id:1},{name:'超市',id:2},{name:'鞋子',id:3}],id:1},
                        {shop:[{name:'张店铺',id:1},{name:'李店铺',id:2},{name:'王店铺',id:3}],id:2}
                        ]*/
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
        GetGoodsList: function (searchType) {

            var _this = this;
            _this.sortList.forEach(function (item) {
                item.num = searchType;
            });
            var g_id = GetQueryString("g_id");
            var q = this.getUrlParam("q");            
            _this.content = q;
            var obj = {};
            obj.goods_specification_category_id = g_id;
            obj.pageIndex = 1;
            obj.firstPageTime = "";
            obj.searchType = searchType;
            obj.name = q;
            $.ajax({
                url: IP+ "/Data/goods.ashx?Action=GetGoodsList",
                type: 'get',
                data: obj,
                dataType: 'json',
                success: function (dataJson) {

                    if (dataJson.code == "100") {
                        console.log(dataJson)
                        _this.skipList = dataJson.data;
                       // $('.search').val(q);
                    } else {
                        alert(dataJson.message);
                    }

                }
            });
        },Goods_Dateils: function (id) {   

           location.href = "goods_details.html?goods_id="+id;
        },
        search: function () {
            var _this = this;
            var state = {title:'',url:window.location.href};
            var q="";
            if($('#0').hasClass('active')){
				history.pushState(state,'','goods_search.html?q='+$('.search').val()+'&ie=utf-8');
				q=_this.getUrlParam('q');
            }else{
            	history.pushState(state,'','shop_search.html?q='+$('.search').val()+'&ie=utf-8');
				q=_this.getUrlParam('q');
            }
          
          

            var obj = {};
            obj.goods_specification_category_id = '';
            obj.pageIndex = 1;
            obj.firstPageTime = "";
            obj.searchType = "1";
            obj.name = q;
            $.ajax({
                url: IP+ "/Data/goods.ashx?Action=GetGoodsList",
                type: 'get',
                data: obj,
                dataType: 'json',
                success: function (dataJson) {
                	console.log(dataJson)
                    if (dataJson.code == "100") {
                    	_this.skipList = dataJson.data;
                    } else {
                        alert(dataJson.message);
                    }

                }
            });
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
        }
    }
})
new h_header().$mount('h-header');//把组件挂载到h-header标签上
new h_footer().$mount('h-footer');//把组件挂载到h-footer标签上
new h_login().$mount('h-login');//把组件挂载到h-login标签上
new h_recommend().$mount('h-recommend');//把组件挂载到h-recommend标签上
// 6217680200780109
// 50023419880118185X
// 17301764656