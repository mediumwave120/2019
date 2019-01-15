var vm=new Vue({
  el:'#app',
  data:{
      getCommentList:{},
      txt:""
  },
  mounted: function () {
    this.$nextTick(function () {
      this.getCommentListById();
    });
  },
  methods:{
    //评论详情
    getCommentListById:function(){ 
    //{"code":"100","message":"查询成功","firstPageTime":"2019/1/7 16:40:23","data":[{"goods_comment_id":"83aef0b6-5a76-4add-b4fe-c00a158e127f","content":"安卓商品2两颗心一张图片","user_id":"d98d22c2-4667-4fef-920b-9b51db57d367","nick_name":"核核","logo":"/Files/UserLogo/201809/1536242933209.4.jpg","name":"安卓商品2次","goods_id":"31fb769c-7e4d-4a02-8528-14757b45d1f8","icon":"/Files/Goods/201808/1534783428704.11.png","buying_price":"0.01","specificationsText":"红色,颜色:尺码:m","commentwatchcount":"14","additional_content":"安卓商品2一张图片","additional_time":"2018-08-22 14:08:20","create_time":"2018-08-22 12:00:21","CommentImage":[],"AdditionalImage":[],"goods_comment":[{"goods_comment_id":"88e5cf7f-4ea5-4c48-8f08-5bab92d8c66c","comment_content":"😳😳😳","user_id":"25d7a4ce-0371-44f1-aef2-eef283548f22","nick_name":"康熙大帝","user_logo":"/Files//201808/1535033816399.85.jpg","parent_nick_name":"康熙大帝","parent_user_id":"25d7a4ce-0371-44f1-aef2-eef283548f22","create_time":"2018-08-22 16:50:13"},{"goods_comment_id":"46b18f54-670e-4a52-bac1-e25b3091502b","comment_content":"好吃吗","user_id":"25d7a4ce-0371-44f1-aef2-eef283548f22","nick_name":"康熙大帝","user_logo":"/Files//201808/1535033816399.85.jpg","parent_nick_name":"","parent_user_id":"","create_time":"2018-08-22 16:49:32"},{"goods_comment_id":"8e9160f1-7e22-4865-a1fb-f892303e2eba","comment_content":"wtwyueue","user_id":"2f4c8269-ddf3-4dba-b3a5-e35d7bcf91a6","nick_name":"独孤求败","user_logo":"/Files//201807/1532534484233.66.jpg","parent_nick_name":"独孤求败","parent_user_id":"2f4c8269-ddf3-4dba-b3a5-e35d7bcf91a6","create_time":"2018-08-22 14:32:33"},{"goods_comment_id":"180e2542-b1d9-4300-9f2b-87acdee05ee3","comment_content":"w","user_id":"2f4c8269-ddf3-4dba-b3a5-e35d7bcf91a6","nick_name":"独孤求败","user_logo":"/Files//201807/1532534484233.66.jpg","parent_nick_name":"","parent_user_id":"","create_time":"2018-08-22 14:32:23"},{"goods_comment_id":"2b947887-1e85-4ef1-ae67-b185a5a17c06","comment_content":"qwwwww","user_id":"2f4c8269-ddf3-4dba-b3a5-e35d7bcf91a6","nick_name":"独孤求败","user_logo":"/Files//201807/1532534484233.66.jpg","parent_nick_name":"","parent_user_id":"","create_time":"2018-08-22 14:31:10"},{"goods_comment_id":"77a1845a-1301-4bd9-802a-5b4f31926845","comment_content":"w","user_id":"2f4c8269-ddf3-4dba-b3a5-e35d7bcf91a6","nick_name":"独孤求败","user_logo":"/Files//201807/1532534484233.66.jpg","parent_nick_name":"","parent_user_id":"","create_time":"2018-08-22 14:31:02"},{"goods_comment_id":"9d8a76c1-5ca8-4b0a-8e15-65ce6fd3b724","comment_content":"前二天退哦","user_id":"d98d22c2-4667-4fef-920b-9b51db57d367","nick_name":"核核","user_logo":"/Files/UserLogo/201809/1536242933209.4.jpg","parent_nick_name":"核核","parent_user_id":"d98d22c2-4667-4fef-920b-9b51db57d367","create_time":"2018-08-22 14:20:35"},{"goods_comment_id":"e2e806ce-7c3c-4f9a-91db-4d3a17698602","comment_content":"我我我我","user_id":"d98d22c2-4667-4fef-920b-9b51db57d367","nick_name":"核核","user_logo":"/Files/UserLogo/201809/1536242933209.4.jpg","parent_nick_name":"","parent_user_id":"","create_time":"2018-08-22 14:19:21"},{"goods_comment_id":"42711839-d2ee-4112-9b1e-5bdab938c6c0","comment_content":"去去去去","user_id":"d98d22c2-4667-4fef-920b-9b51db57d367","nick_name":"核核","user_logo":"/Files/UserLogo/201809/1536242933209.4.jpg","parent_nick_name":"","parent_user_id":"","create_time":"2018-08-22 14:19:00"},{"goods_comment_id":"fea53e20-22c3-4c26-8828-02b66321afb7","comment_content":"卡路里咯","user_id":"d98d22c2-4667-4fef-920b-9b51db57d367","nick_name":"核核","user_logo":"/Files/UserLogo/201809/1536242933209.4.jpg","parent_nick_name":"","parent_user_id":"","create_time":"2018-08-22 14:14:20"}]}]}     
      var _this=this;
      var goods_comment_id = GetQueryString("goods_comment_id");
      var obj={
        pageIndex:1,
        firstPageTime:"",
        goods_comment_id:goods_comment_id
      };
      $.ajax({
          url: IP+"/DataMobile/goods_comment.ashx?Action=GetCommentListById",
          type: "get",
          dataType: "json",
          data:obj,
          async:false,
          success: function (datajson) {
            
            console.log(datajson);
            var result=datajson.data[0];
            if(datajson.code=="100"){
              _this.getCommentList=result;
            }
          }
      });
    },
    goodsDetail:function (goods_id) {
      location.href="goods_detail.html?goods_id="+goods_id;
    },
    //添加回复
    send:function(goods_id,goods_comment_id){
      var _this=this;
      var obj={
        goods_id:goods_id,
        content:_this.txt,
        parent_user_id:"",
        parent_comment_id:goods_comment_id,
        user_id:GetUserId()
      };
      $.ajax({
          url: IP+"/DataMobile/goods_comment.ashx?Action=AgainCommentAdd",
          type: "get",
          dataType: "json",
          data:obj,
          async:false,
          success: function (datajson) {
            //{"code":"100","message":"评论成功","data":[{"create_time":"2019/1/7 16:40:59"}]}
            console.log(JSON.stringify(datajson))
            if(datajson.code==="100"){
              vm.getCommentListById();
              
            }
          }
      });
    }
  }
});
