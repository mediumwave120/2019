$(function(){
	$('.selected').on('click',function(){		
		if($('.select').is(':hidden')){
			$('.select').fadeIn(500);
		}else{
			$('.select').fadeOut(500);
		}
	})

	var swiper = new Swiper('.swiper-container', {
      autoplay: true,//可选选项，自动滑动
      loop:true,
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
          return '<span class="' + currentClass + '"></span>' +
                 ' / ' +
                 '<span class="' + totalClass + '"></span>';
        },
      },
      observer:true,
    });
    
    //打开规格
    // $('.spt,.join,.now').on('click',function(){
    //   $('.spt-pop').fadeIn(500);
    // })
    // //关闭规格
    // $('.close').on('click',function(){
    //   $('.spt-pop').fadeOut(500);
    // })

    var goods_id=GetQueryString('goods_id');
})

var vm=new Vue({
  el:'#app',
  data:{
      totalPrice:0,
      swiperList:[],
      goods:{},
      im:'',
      sel:[],
      goodsInventoryList:[],
      inventory:1,
      sptState:false,
      newId:[],
      spt:[],
      num:0
  },
  filters:{
    grade:function(value){
      if(value<"4.5" || value === "4.5"){
        return value+"低";
      }
      if (value > "4.5" && value < "4.8") {
         return value +" 中"
      }
      if (value === "4.8" || value > "4.8") {
          return value+" 高";
      }
    }
  },
  mounted: function () {
    this.$nextTick(function () {
        this.getDateils();
    });
  },
  methods:{
    /*
      加入购物车
    */
      joinCart:function() {
        var _this=this;
        var jsonText=[];
        _this.goodsInventoryList.forEach( function(goods, index) {
           if(goods.flag){
              _this.spt.forEach(function(pid, index) {
              var ccid={};
                  ccid.goods_specification_category_id=pid.goods_specification_category_id;
                  jsonText.push(ccid);
              pid.child.forEach( function(id, index) {
                var ccid={};
                if(id.flag){
                  ccid.goods_specification_category_id=id.goods_specification_category_id;
                  jsonText.push(ccid)
                }
              });
            });            
          }
        });

        var obj={};
          obj.jsonText=JSON.stringify(jsonText);
          obj.goods_count=_this.inventory;
          obj.goods_id=_this.goods.goods_id;
          obj.buying_price=_this.goods.buying_price;
          obj.image=_this.goods.icon;
          obj.user_id=GetCookie('UserId');//"0cbc4f22-8585-4d3d-b089-38ec35ebb56d";
          $.ajax({
            url: IP+"/DataMobile/goods.ashx?Action=ShoppingCarAdd",
            type: "get",
            data:obj,
            dataType: "json",
            success: function (datajson){
              //{"code":"100","message":"添加成功"}
                
                console.log(datajson);
                if(datajson.code=="100"){
                  alert(datajson.message); 
                  _this.sptState=!_this.sptState;               
                }
            }
          }); 
      },
      //立即购买
      nowBuy:function() {
        var _this=this;
        /*[{
        "merchants_in_id": "9d610472-64ef-401b-859a-467a27e98401",
        "goods": [{
          "specifica": [{
            "goods_specification_category_id": "5b1435a2-0d28-4c99-af29-cc276c73de05"
          }, {
            "goods_specification_category_id": "c777c18d-b1bb-44e0-b8f1-b0a7a0b6a488"
          }, {
            "goods_specification_category_id": "f8f83d4a-a9af-4295-b467-5b676d8b898f"
          }, {
            "goods_specification_category_id": "864f3561-6aab-4917-af59-16a8bd6fd665"
          }],
          "goods_id": "31fb769c-7e4d-4a02-8528-14757b45d1f8",
          "buying_price": "0.01 ",
          "buy_count": "1"
        }]
      }]*/
        var jsonList = [];
        var shop={};
            shop.merchants_in_id=_this.goods.merchants_in_id;
            var goodsList=[];
            var goodsobj={};
                goodsList.push(goodsobj);
                var spts=[];
                var goods=_this.goods.GoodsSpecificationCategory;                   
                    goods.forEach(function(item){
                      var sptobj={};
                      sptobj.goods_specification_category_id=item.goods_specification_category_id
                      spts.push(sptobj)                  
                        item.child.forEach(function(good) {
                          var sptobj={}; 
                          if(good.flag){                        
                            sptobj.goods_specification_category_id=good.goods_specification_category_id;
                            spts.push(sptobj)
                          }
                        })                                                 
                    })                   
                goodsobj.specifica= spts;
                goodsobj.goods_id=_this.goods.goods_id;  
                goodsobj.buying_price=_this.goods.buying_price;  
                goodsobj.buy_count=String(_this.inventory);  
            shop.goods=goodsList;
            jsonList.push(shop)
        localStorage.spt=JSON.stringify(jsonList);
        
        location.href="confirm_order.html"
      },
      // 选中规格
      selectCategory:function(/*pid,id*/index,ind,pid,cid,clist){
        var _this=this;
        //var newId=[];
        _this.sel[index] = ind; 
        _this.$set(_this.sel, index, ind);
        clist.forEach( function(child, index2) {
            child.flag=false;
        });
        _this.goodsInventoryList.forEach(function(goods){
          _this.newId[index]=cid;
          goods.flag=false;
          if(_this.newId.toString()==goods.parentIds){
              goods.flag=true;
              _this.goods.buying_price=goods.price;
              _this.goods.inventory=goods.inventory;
              _this.goods.icon=goods.image;
            
          }
        });

        _this.spt.forEach( function(spid, index) {
         // console.log(pid,spid.goods_specification_category_id)
          // if(pid==spid.goods_specification_category_id){
          //   spid.flag=true;

          // }
          spid.child.forEach( function(scid, index) {
            // scid.flag=false;
            if(cid==scid.goods_specification_category_id){
              scid.flag=true;
            }
           // console.log(cid,scid.goods_specification_category_id)
          });
        });
      },
      //商品数量加减
      changeMoney: function (item, index) {
        var _this=this;
        if(index>0){
            _this.inventory++;
            if(_this.inventory>item.inventory){
                alert("库存不足");
                _this.inventory=item.inventory;
                return;
            }
        }else{
            _this.inventory--;
            if (_this.inventory < 1) {
                _this.inventory = 1;
            }
        }
      },
      //打开规格
      openSpecification:function(num) {
        var _this=this;
          _this.sptState=!_this.sptState;
        if(num===0){
            _this.num=0;
        }
        if(num===1){
            _this.num=1;
        }
        if(num===2){
            _this.num=2;
        }

      },
      //关闭规格
      closeSpecification:function(argument) {
        var _this=this;
        _this.sptState=!_this.sptState;
      },
      //去评论
      goComment:function(goods_id){
        location.href="comment.html?goods_id="+goods_id;
      },
      //商品详情
      getDateils:function(){
        //{"code":"100","message":"查询成功","data":[{"goods_id":"8596c332-ef43-4c6a-8b80-10fd7cc94e44","merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","name":"农夫山泉 饮用水","im":"07cac2ce5a7c46d09aa9c00af9339a32","is_collect":"0","original_price":"36.00","buying_price":"0.01","goods_category_id":"6ac715b1-55ea-4ded-a4bf-e4fe8ba5cf7b","is_package":"1","courier_fees":"0.00","video":"","icon":"/Files/Goods/201810/1540986057294.11.jpg","instructions":"农夫山泉 饮用水","inventory":"6","soldcount":"3","commentCount":"8","consistent_level":"2.6","logistics_service":"3.7","service_attitude":"4.1","comment_nick_name":"解晓东","comment_user_logo":"/Files//201811/1541776647478.79.jpg","comment_content":"回复张岩同学：写上你想说的放到","comment_create_time":"2018-12-25","state":"2","create_time":"2018-10-31","shop_name":"奔哥店铺","shop_logo":"/Files/MerchantsInLogo/201808/1535016767138.97.jpg","goods_category_name":"农夫山泉","SwiperImage":[{"goods_image_id":"21041206-b0c3-4c5e-8141-aad643eba821","url":"/Files/Goods/201810/1540985641830.04.jpg"}],"DetailImage":[{"goods_image_id":"65912ffe-482c-4304-8ddb-0ff2ede28bda","url":"/Files/Goods/201810/1540986074764.8.jpg"},{"goods_image_id":"82999f3e-9638-4685-ba90-383821623cc2","url":"/Files/Goods/201810/1540986076468.92.jpg"},{"goods_image_id":"d0ec3859-0895-4e24-8c68-db0e3ac44406","url":"/Files/Goods/201810/1540986074804.86.jpg"}],"GoodsSpecificationCategory":[{"goods_specification_category_id":"ec50def6-bc47-493b-b38d-2aac744ff08c","name":"颜色","child":[{"goods_specification_category_id":"2e48084c-ad98-4a34-9786-fcd6ede31421","name":"纯净水 550ml*24瓶 整箱装"}]}],"GoodsInventory":[{"parentIds":"2e48084c-ad98-4a34-9786-fcd6ede31421","inventory":"0","price":"100.00","image":"/Files/Goods/201810/1540985641830.04.jpg"}]}]}
        var _this=this;
        var user_id=GetUserId();
        var goods_id = GetQueryString("goods_id");
        $.ajax({
            url: IP+"/DataMobile/goods.ashx?Action=GetDetailByID&goods_id="+goods_id+"&user_id="+user_id,
            type: "get",
            dataType: "json",
            success: function (datajson) {
              
              if(datajson.code=="100"){

                console.log(datajson.data[0]);
                //商品轮播图
                _this.swiperList=datajson.data[0].SwiperImage;
                //商品详情
                _this.goods=datajson.data[0];
                _this.im=datajson.data[0].im;
                //_this.inventory=datajson.data[0].inventory;
                document.title=datajson.data[0].name;
                //商品库存
                var result=datajson.data[0].GoodsInventory;
                result.forEach( function(goods, index) {
                  goods.flag=false;
                });

                _this.goodsInventoryList=result;
                //规格
                var spts=datajson.data[0].GoodsSpecificationCategory;
                spts.forEach( function(goods, index) {
                  // goods.flag=false;
                  goods.child.forEach( function(ele, index) {
                    ele.flag=false;
 
                  });
                });
                _this.spt=spts;

                // var obj={};
                //     obj.GoodsInventory=result;
                //     obj.GoodsSpecificationCategory=spts;
            
                //     localStorage.spt=JSON.stringify(obj);

              }
            }, error: function () {
                alert("后台错误！")
            }

        })
      },
      enterShop:function(shop_id){
        console.log(shop_id)//merchants_in_id
        location.href="shop.html?merchants_in_id="+shop_id;
      },
      //商品收藏
      goodsCollectAdd:function(goods_id){  

        var _this=this;
        var user_id=GetUserId();
        $.ajax({
                url: IP+"/DataMobile/goods.ashx?Action=GoodsCollectAdd&user_id="+user_id+"&goods_id="+goods_id,
                type: "get",
                dataType: "json",
                success: function (datajson){

                    if(datajson.code=="100"){
                      // alert(datajson.message);
                      // location.reload()
                      _this.getDateils();
                    }
                   
                }, error: function () {
                    alert("后台错误！")
                }

            })
      },
      //取消商品收藏
      goodsCollectDelete:function(goods_id){  
        var _this=this;
        var user_id=GetUserId();
        $.ajax({
                url: IP+"/DataMobile/goods.ashx?Action=GoodsCollectDelete&user_id="+user_id+"&goods_id="+goods_id,
                type: "get",
                dataType: "json",
                success: function (datajson){

                    if(datajson.code=="100"){
                      // alert(datajson.message);
                      // location.reload()
                      _this.getDateils();
                    }
                   
                }, error: function () {
                    alert("后台错误！")
                }

            })
      }
      

  }
});
function GetCommentlistBll(goods_comment_id,pageIndex)
{
      var html = "";
    var firstPageTime = $("#firstPageTime").text();
    var url = IP+"/DataMobile/goods_comment.ashx?Action=GetCommentListById&firstPageTime=" + firstPageTime + "&pageIndex=" + pageIndex + "&goods_comment_id=" + goods_comment_id;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        async:false,
        success: function (datajson)
        {
            console.log("回复评论",datajson);
            if (datajson.code == "100")
            {
              var result=datajson.data[0].goods_comment;
            
               for (var i = 0; i < result.length; i++) {
                      html += "    <li> ";
                       //查看回复列表
                            html+="      <div class='result-left'>";
                            html+="        <span class='reply-commentator'>"+result[i].nick_name+"</span>";
                            html+="        <span>回复</span>";
                            html += "        <span class='commentator'>" + result[i].parent_nick_name + "</span> ";

                            html += "      </div>";

                            html+="      <div class='result-right'>";
                            html+="        '"+result[i].comment_content+"'";
                            html+="      </div>";
                            html+="    </li>";

                          }

            }
        },error:function()
        {
          alert("网络错误！");
        }
    })
    return html;
}

function CommentRes(parent_user_id,parent_comment_id)
{
 $("#parent_user_id").html(parent_user_id);
 $("#parent_comment_id").html(parent_comment_id);
}

function AddComment(){
   var parent_comment_id=$("#parent_comment_id").text();
   var parent_user_id=$("#parent_user_id").text();
     var goods_id = GetQueryString("goods_id");
     var addcoment=$("#addcoment").val();
    var parajson={};
    parajson.user_id=GetUserId();
    parajson.parent_comment_id=parent_comment_id;
    parajson.parent_user_id=parent_user_id;
    parajson.goods_id=goods_id;
    parajson.content=addcoment;
    parajson.Action="AgainCommentAdd";
    var url=IP+"/DataMobile/goods_comment.ashx"
    $.ajax({
      url:url,
      data:parajson,
      type:"get",
      dataType:"json",
      async:false,
      success:function(datajson){
      alert(datajson.message);
        GetComment();
      },error:function()
      {
        alert("网络错误!")
      }
    })
}

      
 