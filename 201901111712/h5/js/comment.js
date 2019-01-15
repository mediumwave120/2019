$(function(){
	   //  //打开规格
    // $('.join,.now').on('click',function(){
    //   $('.spt-pop').fadeIn(500);
    // })
    // //关闭规格
    // $('.close').on('click',function(){
    //   $('.spt-pop').fadeOut(500);
    // })


})

var vm=new Vue({
  el:'#app',
  data:{
      goodsComment:{},
      isChoose1 :true,
      isChoose2 :false,
      isChoose3 :false,
      goods:{},
      goodsInventoryList:[],
      sel:[],
      inventory:1,
      newId:[],
      good:{}
  },
  mounted: function () {
    this.$nextTick(function () {
        this.getCommentList(1);
        this.goodsSpecifications();
    });
  },
  methods:{
    // 选中规格
    selectCategory:function(/*pid,id*/index,ind,pid,cid){
      var _this=this;
     
      _this.sel[index] = ind; 
      _this.$set(_this.sel, index, ind);
      var spt=JSON.parse(localStorage.spt);

      _this.goods.GoodsInventory.forEach(function(item){
    
        _this.newId[index]=cid;
        if(_this.newId.toString()==item.parentIds){
            _this.good.price=item.price;
            _this.good.inventory=item.inventory;
            _this.good.image=item.image;
        }

      }); 
    },
    //评论列表
    getCommentList:function(searchType){
      var _this=this;
      if(searchType==="1"){
        _this.isChoose1 = !_this.isChoose1;
        _this.isChoose2=false;
        _this.isChoose3=false;
      }
       if(searchType==="2"){
        _this.isChoose2 = !_this.isChoose2;
        _this.isChoose1=false;
        _this.isChoose3=false;
      }
       if(searchType==="3"){
        _this.isChoose3 = !_this.isChoose3;
        _this.isChoose1=false;
        _this.isChoose2=false;
      }
      var goods_id = GetQueryString("goods_id");
      var obj={};
          obj.goods_id=goods_id;
          obj.pageIndex=1;
          obj.firstPageTime="";
          obj.searchType=searchType;
        $.ajax({
            url: IP+"/DataMobile/goods_comment.ashx?Action=GetCommentList",
            type: "get",
            data:obj,
            dataType: "json",
            success: function (datajson) {
              //{"code":"100","message":"查询成功","firstPageTime":"2019/1/7 16:39:36","data":[{"all_count":"12","image_count":"12","additional_count":"5","GoodsCommentList":[{"goods_comment_id":"83aef0b6-5a76-4add-b4fe-c00a158e127f","content":"安卓商品2两颗心一张图片","create_time":"2018-08-22","user_id":"d98d22c2-4667-4fef-920b-9b51db57d367","reply_count":"14","nick_name":"核核","commentwatchcount":"14","additional_content":"安卓商品2一张图片","additional_time":"2018-08-22","logo":"/Files/UserLogo/201809/1536242933209.4.jpg","specificationsText":"红色,颜色:尺码:m","consistent_level":"2","Image":[{"url":"/Files/Comment/201808/1534939154806.92.jpg"}],"AdditionalImage":[{"url":"/Files/Comment/201808/1534946898368.14.jpg"}]},{"goods_comment_id":"f9ed74dd-28e1-4e01-af67-ca8918298ca9","content":"商品2两颗心一张图片","create_time":"2018-08-21","user_id":"d98d22c2-4667-4fef-920b-9b51db57d367","reply_count":"2","nick_name":"核核","commentwatchcount":"19","additional_content":"","additional_time":"","logo":"/Files/UserLogo/201809/1536242933209.4.jpg","specificationsText":"尺码:颜色:ll,红色","consistent_level":"2","Image":[{"url":"/Files/Comment/201808/1534868799534.89.jpg"}],"AdditionalImage":[]},{"goods_comment_id":"6e6cf425-04b2-4f65-aece-7be6b29b4513","content":"/Files/Comment/201808/1534866184600.08.jpg,/Files/Comment/201808/1534866188968.24.jpg","create_time":"2018-08-21","user_id":"d98d22c2-4667-4fef-920b-9b51db57d367","reply_count":"0","nick_name":"核核","commentwatchcount":"2","additional_content":"","additional_time":"","logo":"/Files/UserLogo/201809/1536242933209.4.jpg","specificationsText":"颜色:尺码:红色,m","consistent_level":"2","Image":[{"url":"商品3评价"}],"AdditionalImage":[]},{"goods_comment_id":"e64bc60c-672b-499b-bcf8-f69a61216198","content":"/Files/Comment/201808/1534866184600.08.jpg,/Files/Comment/201808/1534866188968.24.jpg","create_time":"2018-08-21","user_id":"d98d22c2-4667-4fef-920b-9b51db57d367","reply_count":"0","nick_name":"核核","commentwatchcount":"2","additional_content":"","additional_time":"","logo":"/Files/UserLogo/201809/1536242933209.4.jpg","specificationsText":"颜色:尺码:红色,m","consistent_level":"2","Image":[{"url":"商品3评价"}],"AdditionalImage":[]},{"goods_comment_id":"5a3afadd-9db3-43e2-96a0-a08d5deb470c","content":"22222","create_time":"2018-08-21","user_id":"d98d22c2-4667-4fef-920b-9b51db57d367","reply_count":"0","nick_name":"核核","commentwatchcount":"0","additional_content":"","additional_time":"","logo":"/Files/UserLogo/201809/1536242933209.4.jpg","specificationsText":"红色,颜色:ll,尺码","consistent_level":"4","Image":[{"url":"/Files/Comment/201808/1534865659884.01.jpg"}],"AdditionalImage":[]},{"goods_comment_id":"881c489f-e6b6-4338-b783-9337224a47c1","content":"/Files/Comment/201808/1534807312226.95.jpg","create_time":"2018-08-20","user_id":"d98d22c2-4667-4fef-920b-9b51db57d367","reply_count":"0","nick_name":"核核","commentwatchcount":"1","additional_content":"2222","additional_time":"2018-08-21","logo":"/Files/UserLogo/201809/1536242933209.4.jpg","specificationsText":"颜色:红色,尺码:m","consistent_level":"4","Image":[{"url":"2222"}],"AdditionalImage":[{"url":"/Files/Comment/201808/1534852170401.17.jpg"}]},{"goods_comment_id":"7d768a7d-09f1-4983-aac4-42f578018bf9","content":"啊啊啊啊啊啊啊啊啊😱💚","create_time":"2018-08-20","user_id":"d98d22c2-4667-4fef-920b-9b51db57d367","reply_count":"0","nick_name":"核核","commentwatchcount":"0","additional_content":"","additional_time":"","logo":"/Files/UserLogo/201809/1536242933209.4.jpg","specificationsText":"颜色:红色,尺码:l","consistent_level":"1","Image":[{"url":"/Files/MerchantsInLogo/201808/1534759827492.91.jpg"}],"AdditionalImage":[]},{"goods_comment_id":"bd3f904d-92fe-4af7-8cca-3512dbbe86d8","content":"啊啊啊啊啊啊啊啊啊😱💚","create_time":"2018-08-20","user_id":"d98d22c2-4667-4fef-920b-9b51db57d367","reply_count":"0","nick_name":"核核","commentwatchcount":"0","additional_content":"","additional_time":"","logo":"/Files/UserLogo/201809/1536242933209.4.jpg","specificationsText":"颜色:红色,尺码:l","consistent_level":"1","Image":[{"url":"/Files/MerchantsInLogo/201808/1534759827492.91.jpg"}],"AdditionalImage":[]},{"goods_comment_id":"168944af-ce68-43c2-af9d-5a495fd3e8ca","content":"哈哈哈22222","create_time":"2018-08-17","user_id":"d98d22c2-4667-4fef-920b-9b51db57d367","reply_count":"0","nick_name":"核核","commentwatchcount":"0","additional_content":"安卓商品2","additional_time":"2018-08-17","logo":"/Files/UserLogo/201809/1536242933209.4.jpg","specificationsText":"红色,尺码:颜色:l","consistent_level":"2","Image":[{"url":"/Files/Comment/201808/1534515940880.28.jpg"}],"AdditionalImage":[{"url":"/Files/Comment/201808/1534516624471.42.jpg"}]},{"goods_comment_id":"d75d98e0-5d19-4621-98d6-8e3991ca6ea9","content":"哦哦哦看","create_time":"2018-08-17","user_id":"d98d22c2-4667-4fef-920b-9b51db57d367","reply_count":"0","nick_name":"核核","commentwatchcount":"1","additional_content":"11111","additional_time":"2018-08-17","logo":"/Files/UserLogo/201809/1536242933209.4.jpg","specificationsText":"颜色:红色,尺码:ll","consistent_level":"2","Image":[{"url":"/Files/Comment/201808/1534515272702.23.jpg"}],"AdditionalImage":[{"url":"/Files/MerchantsInLogo/201808/1534515380867.32.jpg"},{"url":"/Files/MerchantsInLogo/201808/1534515380867.32.jpg"}]}]}]}
              
              console.log(datajson);
              if(datajson.code==="100"){
                _this.goodsComment=datajson.data[0];
                
              }
            }
        });
    },
    //商品规格列表 1280
    goodsSpecifications:function(){
      var _this=this;
      _this.goods=JSON.parse(localStorage.spt);
      _this.good=JSON.parse(localStorage.spt).GoodsInventory[0];
   
    },
    //评论详情
    commentDetail:function(goods_comment_id){
      location.href="comment_detail.html?goods_comment_id="+goods_comment_id;
    }
  }
});
