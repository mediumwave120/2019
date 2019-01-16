
new Vue({
  el:'#app',
  data:{
    shopList:[],
    sortList:[{name:"综合",num:1},{name:"销量",num:2},{name:"信用",num:3},{name:"筛选",num:4}],
    content: '',
    flag:true,
    skipList: [],
    followState:false,//关注状态
    searchText:""
  },
  mounted(){
    this.$nextTick(function(){
      this.getMerchantsInList("1");
    });
  },
  methods:{
    
    getMerchantsInList:function(searchType){
      var _this=this;
      _this.sortList.forEach(function(item){
        item.num =searchType;
       }) ;
      
      var user_id=GetUserId();
      var obj={};
      if(!_this.searchText){
        _this.searchText=_this.getUrlParam('q');
      }
        obj.name=_this.searchText;
        obj.pageIndex=1;
        obj.searchType=searchType;
        obj.business_type_id="";
        obj.firstPageTime="";
      $.ajax({
              url: IP+"/DataMobile/merchants_in.ashx?Action=GetMerchantsInList",
              type: "get",
              data:obj,
              dataType: "json",
              success: function (datajson){
                console.log(datajson.data)
                //{"code":"100","firstPageTime":"2019/1/10 17:06:04","message":"查询成功","data":[{"merchants_in_id":"db43698c-9a88-4769-ab28-c56ee37f4346","shop_name":"毛毛的店","shop_logo":"/Files/MerchantsInLogo/201812/7899ccb73b014e988fdaba6f22875493.jpg","Goods":[{"goods_id":"5064bc1e-7068-4214-9069-c59afc60fdd7","icon":"/Files/Goods/201812/3b14981907704209a03d4ce02e9b4b77.jpg"},{"goods_id":"605a2085-63ba-48ba-816c-5a8e4d192d8b","icon":"/Files/Goods/201812/f37b666da90f42f2b91803a1d55b063c.jpg"},{"goods_id":"70c70d88-62bc-4c8a-a9a1-2373f240a07e","icon":"/Files/Goods/201812/60881534250347eb9e8e3292b1b74eec.jpg"}]},{"merchants_in_id":"2fea90bc-5a48-4ef8-8313-92b140e7c9bb","shop_name":"22","shop_logo":"/Files/MerchantsInLogo/201810/1540308253952.98.jpg","Goods":[{"goods_id":"9b146e72-980d-4c2f-b919-0e764da62294","icon":"/Files/Goods/201812/cbf24c20c6a2457982d0f643246b20c4.png"}]},{"merchants_in_id":"eca658de-1a15-4214-9018-c5ae71aa9fdb","shop_name":"鑫叶家纺","shop_logo":"/Files/MerchantsInLogo/201809/1536920770279.2.jpg","Goods":[{"goods_id":"4180c264-9822-4f71-8f23-74a3bbabe020","icon":"/Files/Goods/201811/1542982064283.46.jpg"},{"goods_id":"0a1e0812-01ee-4335-8636-9b6a34ed4d0d","icon":"/Files/Goods/201811/1543313912544.49.jpg"}]},{"merchants_in_id":"a9b8dc80-fa86-4e78-9118-894ddf930734","shop_name":"枫木","shop_logo":"/Files/MerchantsInLogo/201808/1534782486334.52.jpg","Goods":[{"goods_id":"85003b04-c1d9-4497-b0ab-95a191568c4a","icon":"/Files/Goods/201812/b87f873fae8c408f92b876827b9a60be.jpg"}]},{"merchants_in_id":"4a7e0182-371c-4ad9-995d-3f5db5730332","shop_name":"店铺名称","shop_logo":"/Files/MerchantsInLogo/201808/1534412372532.5.jpg","Goods":[{"goods_id":"3beedbd2-bb26-4bd8-9af4-5a602f564e13","icon":"/Files/Goods/201812/2f8c713d772241eba9efe8a38496f8d4.jpg"}]},{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","shop_logo":"/Files/MerchantsInLogo/201808/1535016767138.97.jpg","Goods":[{"goods_id":"43077d1d-c1c1-42f9-93ec-95d4b25a7792","icon":"/Files/Goods/201810/1541001226644.93.jpg"},{"goods_id":"784fce16-2048-46c1-bb92-fe2baa5cfa00","icon":"/Files/Goods/201810/1540993682881.64.jpg"},{"goods_id":"7e1d89c0-040b-4208-9d5f-514448791b6d","icon":"/Files/Goods/201811/1542902283898.64.png"},{"goods_id":"7e91a47e-bb42-45c7-a017-043e458e07c4","icon":"/Files/Goods/201901/588485ae136546aab7fed140e8025a9d.jpg"},{"goods_id":"8596c332-ef43-4c6a-8b80-10fd7cc94e44","icon":"/Files/Goods/201810/1540986057294.11.jpg"},{"goods_id":"b6a2c993-ff09-427a-8599-e5e7d5469626","icon":"/Files/Goods/201812/bea8b121b09b490ca9c88dcc7570e867.jpg"},{"goods_id":"f7bc7960-39ba-428a-a7f2-7235e6c3119c","icon":"/Files/Goods/201810/1540912438033.25.jpg"},{"goods_id":"a3728bba-30ff-4ab7-aae5-46512549aeae","icon":""},{"goods_id":"a6605f09-5fc0-44e9-91b9-f98f5ba1a318","icon":"/Files/Goods/201810/1540982234885.1.jpg"},{"goods_id":"7d652156-c796-4bc6-a201-3aaf876b1ef9","icon":"/Files/Goods/201811/1541500406174.32.jpg"},{"goods_id":"29b1deab-509d-4189-8632-317482659adc","icon":"/Files/Goods/201812/a2a044f7ecc34548bb3b44e0d27c3fa5.jpg"},{"goods_id":"30091c31-97cf-4898-8165-20a96cfa070f","icon":"/Files/Goods/201810/1539788119690.19.png"},{"goods_id":"31fb769c-7e4d-4a02-8528-14757b45d1f8","icon":"/Files/Goods/201808/1534783428704.11.png"}]},{"merchants_in_id":"0f3e9f84-68ab-4b99-8e94-6299a898b6af","shop_name":"七条龙旗舰店","shop_logo":"/Files/MerchantsInLogo/201807/1533046871584.jpg","Goods":[]},{"merchants_in_id":"ef9f4c03-1f6b-49a7-96ab-c48ad69d5e29","shop_name":"逆水寒旗舰店","shop_logo":"/Files/MerchantsInLogo/201807/1532355408545.26.png","Goods":[]},{"merchants_in_id":"1234567","shop_name":"皮卡丘的小店","shop_logo":"/Files/MerchantsInLogo/201807/1531935945970.97.jpg","Goods":[]},{"merchants_in_id":"2","shop_name":"小惠店1","shop_logo":"/Files/MerchantsInLogo/201809/1535983259387.26.jpg","Goods":[]}]}                               
                  if(datajson.code=="100"){
                    _this.shopList=datajson.data;
                  }
              }, error: function () {
                  alert("后台错误！")
              }

          })
    },
    
    /*搜索*/
    search: function () {
      var _this = this;
      var q=_this.searchText;     
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
            console.log(datajson)
              if(datajson.code=="100"){
                // _this.shopList=datajson.data;
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
