
new Vue({
  el:'#app',
  data:{
    goodsList:[],
    sortList:[{name:"综合",num:1},{name:"销量",num:2},{name:"价格",num:3},{name:"好评",num:4}],
    flag:true,
    skipList: [],
    searchText:""
  },
  mounted(){
    this.$nextTick(function(){
      //this.getMerchantsInId("1");
      this.getGoodsList("1");
    //this.changTab(1);
      //this.search();
    });
  },
  methods:{
    //商品搜索结果
    getGoodsList: function (searchType) {
        var _this = this;
        _this.sortList.forEach(function (item) {
            item.num = searchType;
        });
        if(searchType=="4"){
          searchType=5;
        }
        if(searchType=="3"){
          if(_this.flag){
            searchType=3;
            _this.flag=false;
          }else{
            searchType=4;
            _this.flag=true;
          }
        }
        var g_id = GetQueryString("g_id"); 
        if(!_this.searchText){
          _this.searchText = _this.getUrlParam("q");

        }           
        var obj = {};
        obj.goods_specification_category_id = g_id;
        obj.pageIndex = 1;
        obj.firstPageTime = "";
        obj.searchType = searchType;
        obj.name = _this.searchText;
        $.ajax({
            url: IP+ "/Data/goods.ashx?Action=GetGoodsList",
            type: 'get',
            data: obj,
            dataType: 'json',
            success: function (dataJson) {

                if (dataJson.code == "100") {
                    console.log(dataJson)
                    _this.goodsList = dataJson.data;
                   // $('.search').val(q);
                } else {
                    alert(dataJson.message);
                }

            }
        });
    },
    /*搜索*/
   search: function () {
        var _this = this;
        var obj = {};
        obj.goods_specification_category_id = '';
        obj.pageIndex = 1;
        obj.firstPageTime = "";
        obj.searchType = "1";
        obj.name = _this.searchText;
        $.ajax({
            url: IP+ "/Data/goods.ashx?Action=GetGoodsList",
            type: 'get',
            data: obj,
            dataType: 'json',
            success: function (dataJson) {
              console.log(dataJson)
                if (dataJson.code == "100") {
                  _this.goodsList = dataJson.data;
                  _this.getGoodsList('1')
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
    },
    deletelogin:function(){
      clearCookie();
        //foreachcookie()
        location.reload();
    }
  }
})
