
Array.prototype.unshift1 =function(){
  for(var i=0; i<arguments.length; i++){
    var ele = arguments[i];
    if(this.indexOf(ele) == -1){
        this.unshift(ele);
    }
}
};　
new Vue({
  el:'#app',
  data:{
    searchArr:[],
    searchText:"",
    searchList:[],
    searchTab:[{name:'商品',id:0},{name:'店铺',id:1}]
  },
  mounted(){
    this.$nextTick(function(){
      
      this.getSearchText();
      this.changTab(0);
    });
  },
  methods:{
    getSearchText:function(){
      var _this=this;
        _this.searchText=_this.getUrlParam('q');
        if(localStorage.searchList){
          _this.searchList=localStorage.searchList.split(',');
        }        
    },
    changTab:function(index){
      var _this=this;
      _this.searchTab.forEach(function(item){
        item.id=index;
      })
    },
    //
    search:function(text){
      var _this=this;
          _this.searchArr=_this.searchList;
          for(var i=0;i<_this.searchArr.length;i++){
            if(_this.searchArr[i]==_this.searchText){
              _this.searchArr.splice(i,1);
            }
          }
          _this.searchArr.unshift(_this.searchText);
          localStorage.searchList=_this.searchArr;
          if($('#0').hasClass('active')){
            if(!text){
              location.href="goods_search.html?q="+_this.searchText+"&ie=utf-8";
              
            }else{
              location.href="goods_search.html?q="+text+"&ie=utf-8";
            }
          }
          if($('#1').hasClass('active')){
            if(!text){
              location.href="shop_search.html?q="+_this.searchText+"&ie=utf-8";
            }else{
              location.href="shop_search.html?q="+text+"&ie=utf-8";
            }          
          }
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
    //删除缓存
    delHistory:function(){
      var _this=this;
      localStorage.searchList='';
      _this.searchList=[];
    }
  }
})

