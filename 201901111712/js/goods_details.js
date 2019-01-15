
$(function(){

  setTimeout(function(){


      //默认选取每个类别第一个为其添加样式
      // $('.item').each(function(a,b){
      //   $(b).find('a').eq(0).addClass('imageColor')
      //   addClassStyle();
      // })
      //给每个类别子类添加样式
      // $('.clickName').on('click',function(){
      //   $(this).addClass('imageColor').siblings().removeClass('imageColor');
      //   addClassStyle();
      // })
      function addClassStyle(){
        var id="";
        var id1="";
        $('.imageColor').each(function(a,b){
          id+=$(b).attr('id')+",";          
        })
        id1=id.substr(0,id.length-1);
        $('.GoodsInventory').each(function(a,b){  
          var goodsId=$(b).attr('id');          
          if(id1===goodsId){
            $(b).addClass('bg').siblings().removeClass('bg');
            if($(b).hasClass('bg')){
              //console.log("$(this):",$(this).find('img').attr('src'))        
              var img=$(this).find('img').attr('src');
              var price=$(this).find('.price').text();
              var inventory=$(this).find('.inventory').text();
              // console.log("data-icon",$(this).find('img').attr('data-image'))
              // if(!$(this).find('img').attr('data-image')){
              //   $('.image1').attr('src',"images/shiping1.jpg");
              // }
              $('.image1').attr('src',img);
              $('.buying_price').text(price);
              $('.inventory1').text(inventory);
            }
          }

        })
      }
      //商品详情
      $('.shop-detail').on('click',function(ev) {
        $('.shop-evaluate-detail').fadeOut(300);
        $('.shop-detail-img').fadeIn(300);
        $('.shop-evaluate').find('span').removeClass('border');
        $(this).find('span').addClass('border')
      })
     
      $('.shop-evaluate').on('click',function(ev) {
        $('.shop-detail-img').fadeOut(300);
        $('.shop-evaluate-detail').fadeIn(300);
        $('.shop-detail').find('span').removeClass('border');
        $(this).find('span').addClass('border');
        GetComment();
      })
      
      //加入购物车
      $('.join-cart').on('click',function(ev) {
          var arr=[];
          var list=$('.goods-type>div');
          $(list).each(function(){
              var item=$(this).find('.jsonTxt .item');
              for (var i = 0; i < item.length; i++) {
                var specification=$(item[i]).find('.clickName');
                for (var j = 0; j < specification.length; j++) {
                  if($(specification[j]).hasClass('imageColor')){
                      arr.push($(specification[j]).attr('id'))
                  }
                }
              }
          })
          if(list.length!=arr.length){
            layer.msg("请选择规格");
            return;
          }
          var buying_price=$('.buying_price').text();
          var amount=$('.text-amount').val();
          var goods_id=$('.goods-content').attr('goods-id');
          var img=$('.image1').attr('src');
          var image=img.substr(27,img.length-1);
          var jsonText="";
          var item=$('.item>a');
              if(item.length>0){
                jsonText+="[";
                item.each(function(){
                    if($(this).hasClass('imageColor')){
                      jsonText+='{\"goods_specification_category_id\":\"'+$(this).attr('id')+'\"},';
                    }
                });
                jsonText=jsonText.substr(0,jsonText.length-1);
                jsonText+="]";
              }else{
                jsonText+="[]";

              }
          var obj={};
          obj.jsonText=jsonText;
         
          obj.goods_count=amount;
          obj.goods_id=goods_id;
          obj.buying_price=buying_price;
          obj.image=image;
          //"[{\"goods_specification_category_id\":\"c777c18d-b1bb-44e0-b8f1-b0a7a0b6a488\"},{\"goods_specification_category_id\":\"864f3561-6aab-4917-af59-16a8bd6fd665\"}]"
          
          obj.user_id=GetCookie('UserId');//"0cbc4f22-8585-4d3d-b089-38ec35ebb56d";
          $.ajax({
            url: IP+"/DataMobile/goods.ashx?Action=ShoppingCarAdd",
            type: "get",
            data:obj,
            dataType: "json",
            success: function (datajson){
                console.log(datajson);
                if(datajson.code=="100"){
                  layer.msg(datajson.message);                
                }
            }
          });          
      })
      //立即购买
      $('.now-buy').on('click',function(ev) {

          var user_id=GetUserId();
          console.log(user_id);
          if(user_id){
            var arr=[];
            var list=$('.goods-type>div');
            $(list).each(function(){
                var item=$(this).find('.jsonTxt .item');
                for (var i = 0; i < item.length; i++) {
                  var specification=$(item[i]).find('.clickName');
                  for (var j = 0; j < specification.length; j++) {
                    if($(specification[j]).hasClass('imageColor')){
                        arr.push($(specification[j]).attr('id'))
                    }
                  }
                }
            })
            if(list.length!=arr.length){
              layer.msg("请选择规格");
              return;
            }
            //店铺id
            var merchants_in_id=$('.goods').attr('merchants-in-id');
            var arr1=[];
            var arr2=[];
            var arrText1=[];//父节点
            var arrText2=[];//子节点
            var str="";//父节点+子节点 拼接的字符串
            //获取选中分类的父分类
            $('.goods-specification1').each(function(){
                arr1.push($(this).attr('goods-specification-category-id'));
                arrText1.push($.trim($(this).text()));
            });
            //获取选中的分类
            $('.imageColor').each(function(){
                arr2.push($(this).attr('id'));
                arrText2.push($.trim($(this).text()));
            })

            for (var i = 0,j=0; i < arrText1.length,j<arrText2.length; i++,j++) {
              str+=arrText1[i]+":"+arrText2[j]+","
            }
            
             str=str.substr(0,str.length-1);
            //商品id
            var goods_id=$('.goods-content').attr('goods-id');
            //购买价格
            var buying_price=$('.buying_price').text();
            //购买数量
            var buy_count=$('.text-amount').val();
            //
            var jsonText="[";
                jsonText+="{\"merchants_in_id\":\""+merchants_in_id+"\",";
                  jsonText+="\"goods\":";
                  jsonText+="["
                      jsonText+="{\"specifica\":";

                        if(arr1.length!=0&&arr2.length!=0){

                          jsonText+="[";
                            for (var i = 0,j=0; i < arr1.length,j<arr2.length; i++,j++) {
                              jsonText+="{\"goods_specification_category_id\":\""+arr1[i]+"\"},";
                              jsonText+="{\"goods_specification_category_id\":\""+arr2[j]+"\"},";
                            }
                          jsonText=jsonText.substr(0,jsonText.length-1);
                          jsonText+="],";
                        }else{
                          jsonText+="[],";
                        }

                    //  jsonText+="\"specificationsText\":\""+str+"\",";
                      jsonText+="\"goods_id\":\""+goods_id+"\",";
                      jsonText+="\"buying_price\":\""+buying_price+"\",";
                      jsonText+="\"buy_count\":\""+buy_count+"\"";

                    jsonText+="}";
                    
                  jsonText+="]"
                jsonText+="}";
                jsonText+="]";
                //"[{\"merchants_in_id\":\"9d610472-64ef-401b-859a-467a27e98401\",\"goods\":[{\"specifica\":[{\"goods_specification_category_id\":\"5b1435a2-0d28-4c99-af29-cc276c73de05\"},{\"goods_specification_category_id\":\"c777c18d-b1bb-44e0-b8f1-b0a7a0b6a488\"},{\"goods_specification_category_id\":\"f8f83d4a-a9af-4295-b467-5b676d8b898f\"},{\"goods_specification_category_id\":\"864f3561-6aab-4917-af59-16a8bd6fd665\"}],\"goods_id\":\"31fb769c-7e4d-4a02-8528-14757b45d1f8\",\"buying_price\":\"0.01 \",\"buy_count\":\"1\"}]}]"
               
            // var car={};
            // car.user_id="0cbc4f22-8585-4d3d-b089-38ec35ebb56d";
            // car.jsonText=jsonText;
            localStorage.setItem('jsonText',jsonText);
            location.href="order.html";
          }else{
            $('#preview').fadeIn();
            $('#preview').click(function(e){
                if (e.target.nodeName == 'SECTION') {
                    $('#preview').fadeOut(500);
                 }
            });
          }
          


      })
        
  },1000)      
})


new h_header().$mount('h-header');//把组件挂载到h-header标签上
new h_footer().$mount('h-footer');//把组件挂载到h-footer标签上
new h_login().$mount('h-login');//把组件挂载到h-login标签上
new h_up().$mount('h-up');//把组件挂载到h-up标签上
new Vue({
  el:'#app',
  data:{
      inventory:"1",
      totalPrice:0,
      goodsPrice:999.00,
      discount :50,
      goodsList:[],
      goods:{},
      sel: [],
      id: [],
      selected:'',
      im:''
  },
  mounted: function () {
        this.$nextTick(function () {
            this.GetDateils();
        });
    },
  methods:{
    /*
      加入购物车
    */
      joinCart:function() {
          layer.msg('已成功加入购物车');

          // var _this=this;
          // var str="";
          // _this.goodsList.forEach(function(item){
          //     //str=JSON.stringify(item)
          //     var goodsSpecificationCategory=item.GoodsSpecificationCategory;
          //     goodsSpecificationCategory.forEach(function(item1){
          //         var child=item1.child;
          //         child.forEach(function(item2){

          //             console.log(item2)
          //         })

          //     })
          // });
              //console.log("["+str+"]")
      },
      // 选中规格
      selectCategory:function(/*pid,id*/index,ind){
        var _this=this;
       //  console.log(pid,id)
       // // _this.selected=index;
       //  // _this.selected=true;
       //  _this.goodsList.forEach(function(shop,i1){
       //    var shop1=shop.GoodsSpecificationCategory;
       //    shop1.forEach(function(goods,i2){
       //      if(pid==goods.goods_specification_category_id){
       //          var child=goods.child;
       //          child.forEach(function(category_id,i3){
       //              if(id==category_id.goods_specification_category_id){
       //                // _this.selected=true;
       //                _this.selected=category_id.goods_specification_category_id;
       //              }
                    
       //          })
       //      }
       //    })
       //  })
       _this.sel[index] = ind; 
       _this.$set(_this.sel, index, ind)
      },
      //商品数量加减
      changeMoney: function (item, index) {
          var _this=this;
          var inventory=parseInt(item.inventory==""?1:item.inventory);
          var num=parseInt(_this.inventory);
          if(index>0){
              _this.inventory++;
              if(_this.inventory>inventory){
                  _this.inventory=inventory;
                  if(inventory==0){
                    alert("库存不足")
                    return;
                  }
                  layer.msg('最多能购买'+num+"件商品")
              }
          }else{
              _this.inventory--;
              if(_this.inventory<1){
                _this.inventory=1;
              }
          }
      },
      GetDateils:function(){
        var _this=this;
        var goods_id = GetQueryString("goods_id");
        $.ajax({
            url: IP+"/DataMobile/goods.ashx?Action=GetDetailByID&goods_id="+goods_id,
            type: "get",
            dataType: "json",
            success: function (datajson) {
              //{"code":"100","message":"查询成功","data":[{"goods_id":"31fb769c-7e4d-4a02-8528-14757b45d1f8","merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","name":"安卓商品2次","im":"07cac2ce5a7c46d09aa9c00af9339a32","is_collect":"0","original_price":"11.00","buying_price":"0.01","goods_category_id":"770d6ada-aacf-4f7e-8022-54aae7276c03","is_package":"1","courier_fees":"0.00","video":"","icon":"/Files/Goods/201808/1534783428704.11.png","instructions":"商品简介商品简介商品简介","inventory":"216","soldcount":"7","commentCount":"12","consistent_level":"2.6","logistics_service":"3.7","service_attitude":"4.1","comment_nick_name":"核核","comment_user_logo":"/Files/UserLogo/201809/1536242933209.4.jpg","comment_content":"安卓商品2两颗心一张图片","comment_create_time":"2018-08-22","state":"2","create_time":"2018-08-13","shop_name":"奔哥店铺","shop_logo":"/Files/MerchantsInLogo/201808/1535016767138.97.jpg","goods_category_name":"XO","SwiperImage":[{"goods_image_id":"9df85c67-aefe-4577-956a-a4069fbf6a47","url":"/Files/Goods/201808/1534167746705.46.png"}],"DetailImage":[{"goods_image_id":"0ef4e54f-c4cf-4504-9379-697b4a16bca1","url":"/Files/Goods/201808/1534167765488.67.png"},{"goods_image_id":"67099d6c-4ab4-48c7-8bd2-ec0fa144b033","url":"/Files/Goods/201808/1534167765465.23.png"},{"goods_image_id":"f7830085-ccae-4ff5-b5a5-bb196df6d9c0","url":"/Files/Goods/201808/1534167765494.53.png"}],"GoodsSpecificationCategory":[{"goods_specification_category_id":"5b1435a2-0d28-4c99-af29-cc276c73de05","name":"颜色分类","child":[{"goods_specification_category_id":"c777c18d-b1bb-44e0-b8f1-b0a7a0b6a488","name":"白色"}]},{"goods_specification_category_id":"f8f83d4a-a9af-4295-b467-5b676d8b898f","name":"鞋码","child":[{"goods_specification_category_id":"864f3561-6aab-4917-af59-16a8bd6fd665","name":"35"}]}],"GoodsInventory":[{"parentIds":"c777c18d-b1bb-44e0-b8f1-b0a7a0b6a488,864f3561-6aab-4917-af59-16a8bd6fd665","inventory":"216","price":"0.10","image":""}]}]}
               
              if(datajson.code=="100"){

                console.log(datajson);
                _this.goodsList=datajson.data;
                _this.goods=datajson.data[0];
                _this.im=datajson.data[0].im
                //_this.inventory=datajson.data[0].inventory;
                document.title=datajson.data[0].name;
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
      collectShop:function(shop_id){
       
        var _this=this;
        var user_id=GetUserId();
   

        $.ajax({
                url: IP+"/DataMobile/merchants_in.ashx?Action=MerchantsInFocusAdd&merchants_in_id="+shop_id+"&user_id="+user_id,
                type: "get",
                dataType: "json",
                success: function (datajson){
                    if(datajson.code=="100"){
                      alert(datajson.message);
                      // location.reload()
                    }
                    if(datajson.code=="101"){
                      alert("已经关注过该店铺了");
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

      
 //商品评价
      function GetComment(){
        //商品id
        var goods_id=$('.goods-content').attr('goods-id');
        var comment={};
        comment.goods_id=goods_id;
        comment.searchType='1';
        comment.pageIndex=1;
        comment.firstPageTime="";
        comment.pageSize=10;

          $.ajax({
              url: IP+"/DataMobile/goods_comment.ashx?Action=GetCommentList",
              type: "get",
              data:comment,
              dataType: "json",
              success: function (datajson){
                  console.log("评论",datajson);
                  if(datajson.code=="100"){
                      var data=datajson.data[0].GoodsCommentList;

                      var html="";
                             console.log("GetCommentList",data);
                          for (var i = 0; i < data.length; i++) {
                              html+="<li class='evaluate-item' goods-comment-id='"+data[i].goods_comment_id+"' user-id='"+data[i].user_id+"'>";
                              html+="   <div class='left'>";
                              html+="     <img src='http://122.112.209.170:8088"+data[i].logo+"' class='user-img'>";
                              html+="     <div class='date'>"+data[i].create_time+"</div>";
                              html+="   </div>";
                              html+="   <div class='right'>";
                              html+="     <div class='nickname'>"+data[i].nick_name+"</div>";
                              html += "     <div class='evaluate-star'>";
                              var consistent_level =parseInt( data[i].consistent_level);
                              for (var j = 0; j < consistent_level; j++) {
                                  html += "       <img src='imgs/star_s.png'>";
                              }
                              for (var l = 0; l < 5 - consistent_level; l++) {
                                  html += "       <img src='imgs/star_k.png'>";
                              }
                       
                             
                              html+="     </div>";
                              html+="    <div class='evaluate-content'>"+data[i].content+"</div>";
                              html += "       <div class='imgs'>";
                              var images = data[i].Image;
                              for (var m = 0; m < images.length; m++) {
                                  html += "<img src='"+images[m].url+"' >";
                              }
                             
                              //html+="         <img src='imgs/1.png' >";
                              //html+="         <img src='imgs/1.png' >";
                              //html+="         <img src='imgs/1.png' >";
                              //html+="         <img src='imgs/1.png' >";
                              html+="       </div>";
                              html+="       <div class='operate'>";
                              html += "         <a href='javascript:;'>浏览(<span class='num'>" + data[i].commentwatchcount + "</span>)</a>";
                              html += "         <a href='javascript:;' class='replay'>点赞</a>";

                              // html += "         <a href='javascript:;' class='replay' onclick='CommentRes(\'"+data[i].user_id+"\',\'"+data[i].goods_comment_id+"\')'>回复</a>";
                              html += "<a href=\"javascript:;\" class=\"replay\" onclick=\"CommentRes('"+data[i].user_id+"','"+data[i].goods_comment_id+"')\">回复</a>";

                      

                              html+="         <div class='reply-content'>";
                              html+="           <textarea  type='text' class='txt' id='addcoment' >回复张岩同学：写上你想说的</textarea>";
                              html+="           <input type='button' class='release' onclick='AddComment()' value='发布回复'>";
                              html+="         </div>";
                              html+="       </div>";

                              html+="<div class='evaluate-result'>";
                              html+="  <ul class='reply-ul'>";
                              html+= GetCommentlistBll(data[i].goods_comment_id, 1);
                            
                              html+=" </ul>";
                              html+="<div class='allreply'>查看全部回复</div>";
                              html+="</div>";


                              html+="       <div class='float'>";
                              html+="         <ul>";
                              // var specificationsText=data[i].specificationsText;
                              // var arr=specificationsText.split(',');
                              // for (var k = 0; k < arr.length; k++) {
                                
                              // html+="           <li>"+arr[k]+"</li>"
                              // }
                              html+="           <li>"+data[i].specificationsText+"</li>"
                              html+="         </ul>";
                              html+="       </div>";


                              html+="</div>"
                              html+="</li>";
                              //getCommentList(data[i].goods_comment_id,1,'');
                          }
                          $('.evaluate-list').html(html);
                          //回复
                          $('.replay').on('click',function(ev) {
                              ev.preventDefault();
                              $(this).parent().find('.reply-content').slideToggle('slow');
                          });
                          //用户评论
                          $('.release').on('click',function(){
                              // var goods_id =$('.goods-content').attr('goods-id');
                              // var goods_comment_id =$('.goods-content').attr('goods-comment-id');
                              // var user_id =$('.goods-content').attr('user-id');
                              // var content =$('.txt').val();
                              // var comments={};
                              //     comments.goods_id=goods_id;
                              //     comments.goods_comment_id=goods_comment_id;
                              //     comments.user_id=user_id;
                              //     comments.content=content;
                              // $.ajax({
                              //     url: apiUrl+"/DataMobile/goods_comment.ashx?Action=AgainCommentAdd",
                              //     type: "get",
                              //     data:comments,
                              //     dataType: "json",
                              //     success: function (datajson){
                              //         console.log.log();
                              //     }
                              //   });
                          })
                          //查看全部
                          $('.allreply').on('click',function(ev) {
                              var goods_comment_id=$('.evaluate-item').attr('goods-comment-id');
                              getCommentList(goods_comment_id,1,'');
                          });
                          
                          
                          function getCommentList(goods_comment_id,pageIndex,firstPageTime){
                              $.ajax({
                                  url: IP+"/DataMobile/goods_comment.ashx?Action=GetCommentListById&pageIndex="+pageIndex+"&firstPageTime="+firstPageTime+"&goods_comment_id="+goods_comment_id,
                                  type: "get",
                                  dataType: "json",
                                  success: function (datajson){
                                      console.log(datajson.data[0].goods_comment);
                                      var result=datajson.data[0].goods_comment;
                                      var html="";
                                      for (var i = 0; i < result.length; i++) {
                                          //html+=result[i].comment_content;
                                          $('.reply-commentator').text(result[i].nick_name);
                                          // html+="    <li> ";
                                          // html+="      <div class='result-left'>";
                                          // html+="        <span class='reply-commentator'>"+result[i].nick_name+"</span>";
                                          // html+="        <span>回复</span>";
                                          // html+="        <span class='commentator'>"+data[i].nick_name+"</span> ";
                                          // html+="      </div>";
                                          // html+="      <div class='result-right'>";
                                          // html+=result[i].comment_content;
                                          // html+="      </div>";
                                          // html+="    </li>";
                                      }
                                      //$('.allreply').html(html);
                                  }
                              });
                          }
                  }
                
              }
          }); 
      }