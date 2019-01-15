$(function () {
  
    if (user_id == "" || user_id == undefined) {
     
        $('#preview').fadeIn();
        $('#preview').click(function(e){
            if (e.target.nodeName == 'SECTION') {
                $('#preview').fadeOut(500);
       
            }
        });
    }
    //$('.more img').show();//我的足迹多选按钮显示
    $(".login-state").text(GetUserName());
    Order(1, "");
   
    //店铺关注
   
    GoodsGetList();

      

    //交易订单
    $("#Myorder").on("click", function () {
        $("#pagination").remove();
        $("#all-order").append("<ul id=\"pagination\"  class=\"pagination\"></ul>");
    
        $(".all").attr("class","active");
        Order(1,"")
    })

    $("#goodscolles").on("click", function () {
        $("#pagination").remove();

        $("#shop-collection").append("<ul id=\"pagination\"  class=\"pagination\"></ul>");
        GetMerchantsInList(1);
    })
    $("#goodscolle").on("click", function () {
        //$("#pagination").remove();

        //$("#goods-collection").append("<ul id=\"pagination\"  class=\"pagination\"></ul>");
        GetGoodsCollectLis(1);

    })
    //我的足迹
    $("#footprints").on("click", function () {
        $("#pagination").remove();

        $(".myfoot").append("<ul id=\"pa\"  class=\"pagination\"></ul>");
        //我的足迹
        MyFootprint(1)
    })
       $('.btn-confirm').on('click',function(ev) {
   
            $('.step1').hide();
            $('.step2').show();   
        
    })
    //$("#Myreport").on("click", function () {
    //    RepoetGoods(1);
    //})
    ShippingAddress();//收货地址
    //添加收货地址
    $("#btn_adress").on("click", function () {
        var name = $("#name").val();
        var dateils_address = $("#dateils_address").val();
        var tel = $("#tel").val();
        var province1 = $("#province1").val();
        var city1 = $("#city1").val();
        var parajson = {};
        parajson.contact_people = name;
        parajson.contact_tel = tel;
        parajson.area = province1 + city1;
        parajson.detailed_address = dateils_address;
        parajson.is_default_address = 1;
        parajson.user_id = user_id;
        parajson.Action ="ShippingAddressAdd";
        $.ajax({
            url: IP+"/DataMobile/user.ashx",
            data:parajson,
            type: "post",
            dataType: "json",
            success: function (datajson) {
                ShippingAddress();
                alert(datajson.message);
            }, error: function () {
                alert("网络错误！");
            }
        })
    })
    //我的收藏
    GetGoodsCollectLis(1);
    //获取个人信息
    UserById();
    //经营类型/范围数据加载
    BusinessTypeList();
    //退货退款售后
    RefundList(1);
    //我的钱包
    TopUpList(1,1);

    //查询提现记录
    WithdrawalList(1);
    //投诉店铺
    ReportShopList(1);
    //举报商品
    ReportGoodsList(1);
    //退款原因列表
    GetGoodsRefundCause();
  


})
var user_id = GetUserId();
function Order(pageIndex, order_state)
{
    $(".order-detail").hide();
    $('.logistics-detail').hide();
    $('.list-order').show();
    $('.list-order-result').show();
    var firstPageTime = $("#firstPageTime").text();
    var parajson = {};
    parajson.user_id = user_id;
    parajson.pageIndex = pageIndex;
    parajson.firstPageTime = firstPageTime;
    parajson.order_state = order_state;
    var url = IP+"/DataMobile/goods.ashx?Action=GetOrderListByUserId";
    $.ajax({
        url: url,
        data: parajson,
        type: "post",
        dataType: "json",
        success: function (datajson) {
            console.log('sss',datajson);
            var result = datajson.data;
  
            var html="";
            for (var i = 0; i < result.length; i++) {
                //if (result[i].order_state == "1" || result[i].order_state == "2" || result[i].order_state == "3" || result[i].order_state == "4") {
                html += " <li>";
                html += " <ul>";
                html += "  <li class=\"td-item\">";
                html += "   <div class=\"img\">";
                html += "   <img src=\""+ result[i].GoodsList[0].icon + "\" >";
                html += "    </div>";
                html += "   <div class=\"con\">";
                html += "    <h4>" + result[i].GoodsList[0].name + "</h4>";
                html += "     <p>"+(result[i].GoodsList[0].specificationsText).substring(0,8)+"</p>";
                html += "   </div>";
                html += " </li>";
                html += "  <li class=\"td-price\">" + result[i].GoodsList[0].buying_price + "</li>";
                html += " <li class=\"td-amount\">" + result[i].GoodsList[0].buy_count + "</li>";
                html += " <li class=\"td-payment\">" + result[i].sum_price+ "</li>";
                var order_statel = result[i].order_state;
                var button = "";
                if (order_statel == "1") {
                    order_statel = "待付款";
                    button = " <div class=\"payment\" onclick=\"PaymentMode('" + result[i].order_id +"','" + result[i].sum_price +"','"+result[i].SubAccount+"','"+result[i].user_id+"','"+result[i].account+"','"+result[i].TradeMemcode+"')\">付款</div> <div class=\"cancle\" onclick=\"CancelOrder('" + result[i].order_id + "'," + pageIndex + ",'" + order_state + "')\">取消订单</div>";
                }
                if (order_statel == "2") {
                    order_statel = "待发货";
                    button = " <div class=\"payment\" onclick=\"CancelOrder('" + result[i].order_id + "'," + pageIndex + ",'" + order_state + "')\">取消订单</div>";
                }
                if (order_statel == "3") {
                    order_statel = "待收货";
                    // button = "    <div class=\"payment\" onclick=\"OrderConfirm('" + result[i].order_id +"')\">确认收货</div><div class=\"cancle\" onclick=\"CancelOrder('" + result[i].order_id + "'," + pageIndex + ",'" + order_state + "')\">取消订单</div><div class=\"cancle\" data-toggle=\"modal\" data-target=\"#Logistics\" onclick=\"LogisticsDateils('"+result[i].order_number+"')\">查看物流</div>";
                    button = "    <div class=\"payment\">确认收货</div><div class=\"cancle\" onclick=\"CancelOrder('" + result[i].order_id + "'," + pageIndex + ",'" + order_state + "')\">取消订单</div><div class=\"cancle\" data-toggle=\"modal\" data-target=\"#Logistics\" onclick=\"LogisticsDateils('803233298066974404')\">查看物流</div>";
                }
                if (order_statel == "4") {
                    order_statel = "待评价";
                    button = "<div class=\"btn-evaluate\" onclick=\"Comment('" + result[i].order_id + "')\">评价</div><div class=\"cancle\" data-toggle=\"modal\" data-target=\"#Logistics\">查看物流</div>";
                }
                if (order_statel == "5") {
                    order_statel = "已完成";
                    button = "<div class=\"payment\" onclick=\"OrderDelete('" + result[i].order_id + "',"+pageIndex+")\">删除订单</div>";
                }
                if (order_statel == "6") {
                    order_statel = "已取消";
                    button = "<div class=\"payment\"  onclick=\"OrderDelete('" + result[i].order_id + "'," + pageIndex + ")\">删除订单</div>";
                }
                if (order_statel == "7") {
                    order_statel = "交易关闭";
                    button = "<div class=\"payment\"  onclick=\"OrderDelete('" + result[i].order_id + "'," + pageIndex + ")\">删除订单</div>";
                }

                html += " <li class=\"td-state\">" + order_statel + "</li>";
                html += "  <li class=\"td-operate\">";
                html += "   <div class=\"inner\">";

                html += button;
                html += " <div class=\"payment\" onclick=\"SelectDetail('" + result[i].order_id + "'," + pageIndex + ",'" + order_state + "')\">订单详情</div>";

                //html += "   <div class=\"payment\">付款</div>";
                //html += "<div class=\"btn-evaluate\">评价</div>";
                //html+="   <div class=\"cancle\">取消订单</div>";

                html += "</div>";
                html += "  </li>";
                html += "  </ul>";
                html += "  <div class=\"evaluate\">";
                html += "  <div class=\"goods-score\">";
                html += "     <span>商品评分：</span>";

                    

                html += "                   <img src=\"imgs/star_s.png\" >";
                html += "                   <img src=\"imgs/star_s.png\"  onclick=\"EvaluImage(this,2)\" class=\"eval2\">";
                html += "                    <img src=\"imgs/star_s.png\"  onclick=\"EvaluImage(this,3)\" class=\"eval3\">";
                html += "                   <img src=\"imgs/star_s.png\"  onclick=\"EvaluImage(this,4)\" class=\"eval4\">";
                html += "                  <img src=\"imgs/star_s.png\"  onclick=\"EvaluImage(this,5)\" class=\"eval5\">";
                    

                html += "               </div>";
                html += "               <div class=\"evaluate-content\">";
                html += "                   <span>评论内容：</span>";
                html += "                   <textarea class=\"txt\" onchange=\"this.value=this.value.substring(0, 200)\" onkeydown=\"this.value=this.value.su1bstring(0, 200)\" onkeyup=\"Huitextarealength(this)\" placeholder=\"宝贝满足您的期待吗？说说您的使用心得，分享给想买的他们吧\"></textarea>";
                html += "                   <p class=\"textarea-numberbar\"><em class=\"textarea-length\">0</em>/<am>200</am></p>";
                html += "               </div>";
                html += "               <div class=\"evaluate-pic\">";
                html += "                   <span>评论图片：</span>";
                html += "                   <ul>";
                html += "                       <li>";
                html += "                           <img src=\"imgs/plus.jpg\" class=\"coment1\" />";
                html += "                           <input type=\"file\" onchange=\"ComentImage1()\" id=\"coment1\">";
                html += "                           <div class=\"imgs\">添加2之5张图片</div>";
                html += "                       </li>";
                html += "                       <li>";
                html += "                           <img src=\"imgs/plus.jpg\" class=\"coment2\">";
                html += "                           <input type=\"file\" id=\"coment2\" onchange=\"ComentImage2()\">";
                html += "                       </li>";
                html += "                       <li>";
                html += "                           <img src=\"imgs/plus.jpg\" class=\"coment3\">";
                html += "                           <input type=\"file\" id=\"coment3\" onchange=\"ComentImage3()\">";
                html += "                       </li>";
                html += "                   </ul>";
                html += "                   <div class=\"btn-release\">";
                html += "                       发布评价";
                html += "                   </div";
                html += "               </div>";
                html += "           </div>";
                html += " </li>";
                //}
            }
            //$("#pagination").remove();
            //$("#all-order").append("<ul id=\"pagination\"  class=\"pagination\"></ul>");
            $(".list-order-result").html(html);
     
            $("#firstPageTime").text(datajson.firstPageTime);

            $("#count").html(datajson.count);
           
            if (pageIndex == 1) {
                OrderPaging(order_state);
            }


            $('.btn-evaluate').on('click', function (ev) {
                //$('.evaluate').show();
                //$("span").parents("ul");

                $(this).parent().parent().parent().parent().find('.evaluate').slideToggle('slow');
                // $(this).parents().find('.evaluate').slideToggle('slow');
                //console.log($(this).parents('div').find('.evaluate'));
            });

        }, error: function () {
            alert("网络错误！");
        }

    })
}
//评价商品
function Comment(order_id)
{
    $("#Comment").modal("show");
    var url =IP+  "/DataMobile/goods.ashx?Action=GetOrderDetailByUserIdPC&user_id=" + user_id + "&order_id=" + order_id;
    $.ajax({
        url:url,
        type:"get",
        async:false,
        dataType:"json",
        success:function(datajson){
            console.log("评价商品",datajson);
            if(datajson.code=="100")
            {
                var result=datajson.data[0].GoodsList;
                var html="";
                for (var i = 0; i <result.length; i++) {
                    html+=" <div class=\"goods-commend\">";
                    html+="<span >商品：</span>";
                    html+="<img src=\""+result[i].icon+"\"/>";

                    html+=" </div>";
                    html+=" <div class=\"goods-score\">";
                    html+=" <div class=\"scores\">";
                    html+=" <span >商品评分：</span>";
                    html+="<img src=\"imgs/star_s.png\"  onclick=\"EvaluImage(this)\" class=\"goods_eval"+i+"\" >";
                    html+="<img src=\"imgs/star_s.png\" onclick=\"EvaluImage(this)\" class=\"goods_eval"+i+"\" >";
                    html+="<img src=\"imgs/star_s.png\"  onclick=\"EvaluImage(this)\" class=\"goods_eval"+i+"\">";
                    html+="<img src=\"imgs/star_s.png\"  onclick=\"EvaluImage(this)\" class=\"goods_eval"+i+"\">";
                    html+="<img src=\"imgs/star_k.png\"  onclick=\"EvaluImage(this)\" class=\"goods_eval"+i+"\" >";
                    html+="</div>";
                    html+="<div class=\"scores\">";
                    html+="<span >服务评分：</span>";
                    html+="<img src=\"imgs/star_s.png\"  onclick=\"EvaluImage(this)\" class=\"service_eval\" >";
                    html+="<img src=\"imgs/star_s.png\" onclick=\"EvaluImage(this)\" class=\"service_eval\" >";
                    html+="<img src=\"imgs/star_s.png\"  onclick=\"EvaluImage(this)\" class=\"service_eval\">";
                    html+="<img src=\"imgs/star_s.png\"  onclick=\"EvaluImage(this)\" class=\"service_eval\">";
                    html+="<img src=\"imgs/star_k.png\"  onclick=\"EvaluImage(this)\" class=\"service_eval\" >";
                    html+=" </div>";
                    html+="<div class=\"scores\">";
                    html+="<span >物流评分：</span>";
                    html+="<img src=\"imgs/star_s.png\"  onclick=\"EvaluImage(this)\" class=\"log_eval\" >";
                    html+="<img src=\"imgs/star_s.png\" onclick=\"EvaluImage(this)\" class=\"log_eval\" >";
                    html+="<img src=\"imgs/star_s.png\"  onclick=\"EvaluImage(this)\" class=\"log_eval\">";
                    html+="<img src=\"imgs/star_s.png\"  onclick=\"EvaluImage(this)\" class=\"log_eval\">";
                    html+="<img src=\"imgs/star_k.png\"  onclick=\"EvaluImage(this)\" class=\"log_eval\" >";
                    html+="</div>";
                                           
                    html+="</div>";
                              
                    html+="<div class=\"evaluate-content\">";
                    html+=" <span>评论内容：</span>";
                    html+="<textarea class=\"txt comment_s"+i+"\" onchange=\"this.value=this.value.substring(0, 200)\" onkeydown=\"this.value=this.value.substring(0, 200)\" onkeyup=\"Huitextarealength(this)\" placeholder=\"宝贝满足您的期待吗？说说您的使用心得，分享给想买的他们吧\"></textarea>";
                    html+="<p class=\"textarea-numberbar\"><em class=\"textarea-length\">0</em>/<am>200</am></p>";
                    html+="</div>";
                    html+="<div class=\"evaluate-pic\">";
                    html+="<span>评论图片：</span>";
                    html+="<ul>";
                    html+="<li>";
                    html+="<img src=\"imgs/plus.jpg\"  />";
                    html+="<input type=\"file\" data-img=\"\" class=\"comment_pic"+i+"\" onchange=\"ComentPicUplod(this)\">";
                    html+="<div class=\"imgs\">添加2之5张图片</div>";
                    html+="</li>";
                    html+="<li>";
                    html+="<img src=\"imgs/plus.jpg\" >";
                    html+="<input type=\"file\" data-img=\"\" class=\"comment_pic"+i+"\" onchange=\"ComentPicUplod(this)\" >";
                    html+="</li>";
                    html+="<li>";
                    html+="<img src=\"imgs/plus.jpg\" >";
                    html+="<input type=\"file\" data-img=\"\"  class=\"comment_pic"+i+"\"  onchange=\"ComentPicUplod(this)\">";
                    html+="</li>";
                    html+="</ul>";
                    html+="</div>";
                }
                html+="<div class=\"btn-release\" onclick=\"ReleaseComment('"+datajson.data[0].order_id+"')\">发布评价</div>"
            
        
                $(".evaluate-s").html(html);
            }
            
            
        },error:function(){

        }
    })

}
//评价商品
function ReleaseComment(order_id)
{
    var url =IP+  "/DataMobile/goods.ashx?Action=GetOrderDetailByUserIdPC&user_id=" + user_id + "&order_id=" + order_id;
    $.ajax({
        url:url,
        type:"post",
        dataType:"json",
        success:function(datajson){
            if(datajson.code=="100")
            {
                var result=datajson.data[0].GoodsList;
                var json="["
                for (var i = 0; i < result.length; i++) {
                    json+="{";
                    json+="\"order_goods_id\":\""+result[i].order_goods_id+"\",";
                    json+="\"goods_id\":\""+result[i].goods_id+"\",";
                    var consistent_level=$(".goods_eval"+i+"");
                    var consistent_count=0;
                    for (var j = 0; j < 5; j++) {
                        var src=consistent_level[j].src;
                        src=src.replace("http","");
                        if(src.indexOf("_s")!=-1)
                        {
                            consistent_count++;
                        }
                    }
                    json+="\"consistent_level\":\""+consistent_count+"\",";//商品评分
                    json+="\"is_anonymous\":\"0\",";
                    var content=$(".comment_s"+i+"").val();
                    json+="\"content\":\""+content+"\",";//评论内容
                    var goods_comment_info="";
                    var comment_pic=$(".comment_pic"+i+"");
                    for (var k = 0; k < comment_pic.length; k++) {
                        var   comment_image=comment_pic[k].dataset.img;
                      if(comment_image!="")
                      {
                          goods_comment_info+=comment_image+",";
                      }
                    }
                    goods_comment_info=goods_comment_info.substring(0,goods_comment_info.length-1);
                    json+="\"goods_comment_info\":\""+goods_comment_info+"\"";
                    json+="},";
                }
                json=json.substring(0,json.length-1);
                json+="]";
                var service_eval=$(".service_eval");
                var service_count=0;
                for (var j = 0; j < 5; j++) {
                    var src=service_eval[j].src;
                    src=src.replace("http","");
                    if(src.indexOf("_s")!=-1)
                    {
                        service_count++;
                    }
                }
                var log_eval=$(".log_eval");
                var log_count=0;
                for (var j = 0; j < 5; j++) {
                    var src=log_eval[j].src;
                    src=src.replace("http","");
                    if(src.indexOf("_s")!=-1)
                    {
                        log_count++;
                    }
                }
                var url="/DataMobile/goods_comment.ashx"
                var parajson={};
                parajson.Action="CommentAdd";
                parajson.merchants_in_id=datajson.data[0].merchants_in_id;
                parajson.order_id=datajson.data[0].order_id;
                parajson.jsonText=json;
                parajson.logistics_service=log_count;
                parajson.service_attitude=service_count;
                parajson.user_id=user_id;
                $.ajax({
                    url:url,
                    data:parajson,
                    type:"post",
                    dataType:"json",
                    success:function(datajson){
                        Order(1,4)
                        alert(datajson.message);
                        $("#Comment").modal("hide");
                    },error:function(){

                        alert("网络错误！");
                    }
                })

            }else
            {
                alert(datajson.message);
            }

        },error:function(){
            alert("网络错误！");
        }


    })

}
//评论图片上传
function ComentPicUplod(Obj)
{
    var files = document.querySelector("input[type=file]");

    var filename = $(Obj)[0].files[0];
    var formdata = new FormData();

    formdata.append("files", filename);
  
    $.ajax({
        url: IP+"/Data/FileIO.ashx?Action=upload&type=Comment",
        data: formdata,
        type: "post",
        processData: false,
        contentType: false,
        async: false,
        dataType: "JSON",
        success: function (datajson) {
            console.log(datajson);
            var images=datajson.result;
            $(Obj).prev().attr('src',images);
            $(Obj).attr("data-img",images);
        
        }

    })


}
//图片特孝
function EvaluImage(src)
{
    var image = src.src;
    if (image.indexOf("_s") !== -1) {
        image = image.replace("_s", "_k");
        var desc="";
        desc= $(src).next();
        for (var i = 0; i < 5; i++) {
            desc.attr('src',image);
            desc=desc.next();
        }
    } else {
        image = image.replace("_k", "_s");
        var desc="";
        desc= $(src).prev();
        for (var i = 0; i < 5; i++) {
            desc.attr('src',image);
            desc=desc.prev();
        }
    }
    $(src).attr("src", image);
   
}

//确认收货
function OrderConfirm(order_id)
{
    var url=IP+"/DataMobile/goods.ashx";
    var parajson={}
    parajson.Action="OrderConfirm";
    parajson.user_id=user_id;
    parajson.order_id=order_id;
    $.ajax({
        url:url,
        data:parajson,
        type:"post",
        dataType:"json",
        success:function(datajson){
            if(datajson.code=="100")
            {
                Order(1,3)
                alert(datajson.message);
            }
            if(datajson.code=="101")
            {
  
                alert(datajson.message);
            }
        },error:function(){
            alert("网络错误！");
        }
    })
}
//付款
function PaymentMode(id,sum_price,sub_account,merchants_user_id,account,trade_mem_code)
{


    localStorage.setItem('order_id',id);
    localStorage.setItem('sum_price',sum_price);
    localStorage.setItem('sub_account',sub_account);
    localStorage.setItem('merchants_user_id',merchants_user_id);
    localStorage.setItem('account',account);
    localStorage.setItem('trade_mem_code',trade_mem_code);
    location.href="payment_mode.html";
}
//删除订单
function OrderDelete(order_id,pageIndex)
{
    var url = IP+"/DataMobile/goods.ashx?Action=OrderDelete&order_id=" + order_id + "&user_id=" + user_id;
    $.ajax({
        url: url,
        type: "get",
        dataType: "json",
        success: function (datajson) {
            Order(pageIndex, "")
            alert(datajson.message);
        }, error: function () {
            alert("网络错误！");
        }

    })
}
//查询个人收藏商品
function GetGoodsCollectLis(pageIndex)
{
    var url =IP+"/DataMobile/user.ashx?Action=GetGoodsCollectListByUserId&user_id=" + user_id+"&pageIndex="+pageIndex;
    $.ajax({
        url: url,
        type: "get",
        dataType: "json",
        success: function (datajson)
        {
   
            if(datajson.code=="100")
            {

                var result=datajson.data;

                html = "";
                for (var i = 0; i < result.length; i++) {
                    html+=" <li>";
                    html+="  <ul>";
                    html+="  <li class=\"td-item\">";
                    html+=" <div class=\"img\" >";
                    html+="  <a href=\"goods_details.html?goods_id="+result[i].goods_id+"\"><img src=\""+ip+result[i].icon+"\" ></a>";
                    html+="  </div>";
                    html+="   <div class=\"con\">";
                    html+="  <h4>"+result[i].name+"</h4>";
                    html+="  <p>整箱24只</p>";
                    html+="   </div>";
                    html+="  </li>";
                    html+="   <li class=\"td-follower\">"+result[i].collect_count+"</li>";
                    html+="  <li class=\"td-manage\">";
                    html+="  <a href=\"shop.html?merchants_in_id="+result[i].merchants_in_id +"\">进店铺</a>";
                    html+= "  <a href=\"javascript: void(0)\">分享</a>";
                    html+="  </li>";
                    html+="  <li class=\"td-del\">";
                    html+="   <a href=\"javascript:void(0)\" onclick=\"DeleteGoodsCollect('"+result[i].goods_id+"')\">取消收藏</a>";
                    html+="  </li>";
                    html+="   <li class=\"td-all\">";
                    html+=" <img src=\"imgs/falsecheck.png\" class=\"select-img goodsvalueimage\" id=\""+result[i].goods_id+"\" onclick=\"CheckShop(this)\" >";
                    html+=" </li>";
                    html+=" </ul>";
                    html+= "</li>";
                }
       
                $("#goodscollection").html(html);
                $("#count").html(datajson.count);
                if (pageIndex == 1) {
                    GetGoodsCollectPaging();
                }
            }
        }, error: function () {
            alert("网络错误！");

        }

    })


}


//关注店铺列表
function GetMerchantsInList(pageIndex)
{
    var url = IP+"/DataMobile/user.ashx?Action=GetMerchantsInListByUserId&user_id=" + user_id + "&pageIndex=" + pageIndex;
    $.ajax({
        url: url,
        type: "get",
        dataType: "json",
        success: function (datajson) {
            var result = datajson.data;
            var html = "";
            for (var i = 0; i < result.length; i++) {
                html+="<li>";
                html+="      <ul>";
                html+="          <li class=\"td-item\">";
                html+="               <div class=\"img\">";
                html+="                    <img src=\""+ip+result[i].shop_logo+"\" >";
                html+="                </div>";
                html+="                <div class=\"con\">";
                html+="                       <h4>"+result[i].shop_name+"</h4>";
                html+="                        <p>整箱24只</p>";
                html+="                    </div>";
                html+="               </li>";
                //html+="               <li class=\"td-follower\">1000</li>";
                html+="               <li class=\"td-manage\">";
                html+="                   <a href=\"shop.html?merchants_in_id="+result[i].merchants_in_id +"\">进店铺</a>";
                html += "                  <a href=\"javascript:void(0)\" onclick=\"DeleteShopColle('" + result[i].merchants_in_id + "')\">取消关注</a>";
                html+="              </li>";
                html+="          <li class=\"td-del\">";
                //html+="             <a href=\"#\">删除</a>";
                html+="         </li>";
                html+="        <li class=\"td-all\">";
                html+="          <img src=\"imgs/falsecheck.png\" class=\"select-img imagevalue\" id=\""+result[i].merchants_in_id +"\" onclick=\"CheckShop(this)\" >";
                html+="         </li>";
                html+="     </ul>";
                html += "      </li>";

            }
            $("#Merchants").html(html);
            $("#count").html(datajson.count);
            if (pageIndex == 1) {
                GetMerchantsInPaging();
            }
        }, error: function () {
            alert("网络错误！");

        }

    })
}
//多选按钮
var flag=true;
function CheckShop(Obj)
{

        if(flag){
            $(Obj).attr('src','imgs/truecheck.png');
     
                flag=false;
        }else{
            $(Obj).attr('src','imgs/falsecheck.png');
            flag=true;
        }
   
}
//店铺全选按钮
var flagq=true;
function QcheckFunction()
{
    if(flagq)
    {
        $(".imagevalue").attr("src",'imgs/truecheck.png');
       
        flagq=false;
    }
    else{
        $(".imagevalue").attr('src','imgs/falsecheck.png');
        flagq=true;
    }
}
//全选按钮删除店铺功能
function DeleteShopColleBll()
{
 
    var shopid="";
    var imagelength= $(".imagevalue").length;
    for (var i = 0; i < imagelength; i++) {
        var image=  document.getElementsByClassName("imagevalue")[i].src.replace("http://","");
        if(image.indexOf("true")!=-1)
        {
            shopid+=$(".imagevalue")[i].id+",";
           
        }
    }
    shopid=shopid.substring(0,shopid.length-1);
    if(shopid!="")
    {
        DeleteShopColle(shopid);
    }
    else
    {
        alert("您未选择任何店铺！");
    }

}
//商品全选按钮
var goods_flag=true;
function QGoodscheckFunction()
{
    
    if(goods_flag)
    {
        $(".goodsvalueimage").attr("src",'imgs/truecheck.png');
       
        goods_flag=false;
    }
    else{
        $(".goodsvalueimage").attr('src','imgs/falsecheck.png');
        goods_flag=true;
    }
}
//商品收藏全选删除
function DeleteGoodsColleBll()
{
    
    var goodsid="";
    var imagelength= $(".goodsvalueimage").length;
    for (var i = 0; i < imagelength; i++) {
        var image=  document.getElementsByClassName("goodsvalueimage")[i].src.replace("http://","");
        if(image.indexOf("true")!=-1)
        {
            goodsid+=$(".goodsvalueimage")[i].id+",";
           
        }
    }
    goodsid=goodsid.substring(0,goodsid.length-1);
    if(goodsid!="")
    {
        DeleteGoodsCollect(goodsid);
    }
    else
    {
        alert("您未选择任何商品！");
    }
}
function DeleteGoodsCollect(id)
{
    var parajson = {};
    parajson.Action = "GoodsCollectDelete";
    parajson.user_id = user_id;
    parajson.goods_id = id;
    var url = IP+"/DataMobile/goods.ashx";
    $.ajax({
        url: url,
        data: parajson,
        type: "post",
        dataType: "json",
        success: function (datajson) {
            GetGoodsCollectLis(1);
            alert(datajson.message);

        }, error: function () {
            alert("网络错误！");
        }
    })
}

//店铺取消关注
function DeleteShopColle(id)
{
    var url =IP+ "/DataMobile/merchants_in.ashx?Action=MerchantsInFocusDelete&merchants_in_id=" + id + "&user_id=" + user_id;
    $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        success: function (datajson) {
            GetMerchantsInList(1);
            alert(datajson.message);
        }, error: function () {
            alert("网络错误！");
        }
    })
}
//举报列表
//function RepoetGoods(pageIndex)
//{
//    //var firstPageTime = $("#firstPageTime").text();
//    var parajson = {};
//    parajson.Action = "GetReportGoodsByid";
//    parajson.user_id = user_id;
//    //parajson.pageIndex = pageIndex;
//    //parajson.firstPageTime = firstPageTime;
//    var url = "/DataMobile/report_complaints.ashx";
//    $.ajax({
//        url: url,
//        data: parajson,
//        type: "post",
//        dataType: "json",
//        success: function (datajson) {
     
//            var html="";
//            if (datajson.code == "100")
//            {
//                var result = datajson.data;
//                for (var i = 0; i < result.length; i++) {
//                    html+="  <li>";
//                    html+=" <ul>";
//                    html+="<li class=\"td-item\">";
//                    html+="<div class=\"img\">";
//                    html+=" <img src=\""+result[i].icon+"\" >";
//                    html+=" </div>";
//                    html+="<div class=\"con\">";
//                    html+="<h4>"+result[i].name+"</h4>";
          
//                    html+=" </div>";
//                    html+=" </li>";
//                    html += " <li class=\"td-time\">" + result[i].create_time + "</li>";
//                    var state = result[i].audit_state;
//                    if (state == "1")
//                    {
//                        state = "待处理";
//                    }
//                    if (state == "2") {
//                        state = "已处理";
//                    }
//                    if (state == "3") {
//                        state = "驳回";
//                    }
//                    html+="<li class=\"td-result\">"+state+"</li>";
//                    html+="<li class=\"td-operate\">";
//                    html+="<div class=\"del\">取消举报</div>";
//                    html+="</li>";
//                    html+="</ul>";
//                    html += "</li>";

//                }
//                $("#reportgoods").html(html);
//            }
//        }, error: function () {
//            alert("网络错误！");
//        }
//    })
//}
//收货地址列表
function ShippingAddress()
{
    var url = IP+"/DataMobile/user.ashx?Action=GetShippingAddressList&user_id=" + user_id;
    $.ajax({
        url: url,
        type: "get",
        dataType: "json",
        success: function (datajson) {
            console.log(datajson);
            if (datajson.code == "100")
            {
                var result = datajson.data;
                var html = "";
                for (var i = 0; i <result.length; i++) {
                    html+="<li>";
                    html+="<ul>";
                    html+="<li class=\"td-name\">"+result[i].contact_people+"</li>";
                    html+="   <li class=\"td-mode\">"+result[i].contact_tel+"</li>";
                    html+="   <li class=\"td-address\">"+result[i].area+"</li>";
                    html+=" <li class=\"td-detail-address\">"+result[i].detailed_address+"</li>";
                    html+=" <li class=\"td-code\">020004</li>";
                    html+="<li class=\"td-operate\">";
                    html+=" <div class=\"inner\">";
                    html+="  <div class=\"edit\" onclick=\"AresUpdate('"+result[i].shipping_address_id+"')\">编辑</div>";
                    html+="  <div class=\"del\" onclick=\"DeleteAddress('"+result[i].shipping_address_id+"')\">删除</div>";
                    html+="</div>";
                    html+="</li>";
                    html+=" </ul>";
                    html += " </li>";
                }
                $("#addresslist").html(html);
            }
        }, error: function () {
            alert("网络错误！");
        }
    })
}
//删除收货地址
function DeleteAddress(id)
{
    var url = IP+"/DataMobile/user.ashx?Action=ShippingAddressDelete&user_id=" + user_id + "&shipping_address_id=" + id;
    $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        success: function (datajson) {
            ShippingAddress()
            alert(datajson.message);
        }, error: function () {
            alert("网络错误！");
        }
    })
}
//获取个人详细信息
function UserById()
{
    var url = IP+"/DataMobile/user.ashx?Action=GetUserByUserIdOrIm&id=" + user_id;
    $.ajax({
        url: url,
        type: "get",
        dataType: "json",
        success: function (datajson) {
     
            if (datajson.code == "100")
            {
                var result = datajson.data;
                $(".user-img").html("<img src=\"" +ip+ result.logo + "\">");
                $(".userimg").html("<img src=\"" +ip+ result.logo + "\">");
                $(".username").html(result.nick_name);
                $(".account").html(result.account.substring(0,3)+"****"+result.account.substring(7,11));
                $("#user_name").val(result.nick_name);
                var sign=result.sign
                if(sign.length>16)
                {
                    sign=sign.substring(0,16)+"...";
                }
              
                $(".sign").html(sign);
                $("#sign").val(result.sign);
                if (result.password != "") {
                    $(".text-binding").html("已设置");
                } else {
                    $(".text-binding").html("未设置");
                }
            }
        }, error: function () {
            alert("网络错误！");
        }
    })
}

//我的足迹
function MyFootprint(pageIndex)
{
    var url = IP+"/DataMobile/user.ashx?Action=GetGoodsWatchListByUserId&user_id=" + user_id + "&pageIndex=" + pageIndex;
    $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        success: function (datajson) {
         
            if (datajson.code == "100")
            {
                var result = datajson.data;
                var html="";
                for (var i = 0; i <result. length; i++) {
                    html+="  <li>";
                    html+="         <div class=\"more\">";
                    html += "               <img src=\"imgs/组22.png\"  class=\"change\">";
                    html+="           </div>";
                    html+="           <div class=\"goods-img\">";
                    html += "            <img src=\"" +ip+ result[i].icon + "\" >";
                    html+="        </div>";
                    html += "        <div class=\"goods-name\">";
                    var name = result[i].name;
                    if (name.length > 8)
                    {
                        name = name.substring(0, 8);
                    }
                    //html+="          <div>窖藏30年<span class=\"classical\">经典干红</span>干红清香型葡萄酒</div>";
                    html += "          <div>"+name+"</div>";
                    //html += "           <p>AFTER 30 YEARSRED</p>";
                    html += "           <p><a href=\"javascript: void(0)\" style=\"color:red;\" onclick=\"DeleteMyFootprint('"+result[i].goods_id+"',"+pageIndex+")\">删除</a></p>";
                    html+="        </div>";
                    html+="        <div class=\"goods-price\">";
                    html+="          <span>"+result[i].buying_price+" </span>";
                    html+="         <span>RMB</span>";
                    html+="      </div>";
                    html+="    </li>";
                }
                $("#myfood").html(html);
                $("#count").html(datajson.count);
                if (pageIndex == 1)
                {
                    GetMyFoot();
                }
            }
        }, error: function () {
            alert("网络错误！");
        }

    })

}
//删除我的足迹
function DeleteMyFootprint(goods_id, pageIndex)
{
    var url = IP+"/DataMobile/user.ashx?Action=DeleteGoodsWatchList&user_id=" + user_id + "&goods_id=" + goods_id;
    $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        success: function (datajson) {
            MyFootprint(pageIndex)
            alert(datajson.message);

        }, error: function () {
            alert("网络错误！");
        }
    })
}
//经营范围/经营类型
function BusinessTypeList()
{
    var url =IP+ "/DataMobile/merchants_in.ashx?Action=GetBusinessTypeList";
    $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        success: function (datajson) {
            if (datajson.code == "100")
            {
                var business_type = datajson.data[0].BusinessType;
                var html = "";
                for (var i = 0; i < business_type.length; i++) {
                    html += "<option value='" + business_type[i].business_type_id + "'>" + business_type[i].title+ "</option>";
                }
                $("#BusinessType").html(html);
                var business_scope = datajson.data[0].BusinessScope;
                var scope = "";
                for (var i = 0; i < business_scope.length; i++) {
                    scope += "<option value='" + business_scope[i].business_scope_id + "'>" + business_scope[i].title + "</option>";
                }
                $("#BusinessScope").html(scope);
            }
        }

    })
}
//上传营业执照
var bussion;
function UplodImage()
{
    var files = document.querySelector("input[type=file]");

    var filename = $("#Imagess")[0].files[0];
    var formdata = new FormData();

    formdata.append("files", filename);
  
    $.ajax({
        url: IP+"/Data/FileIO.ashx?Action=upload&type=Business",
        data: formdata,
        type: "post",
        processData: false,
        contentType: false,
        async: false,
        dataType: "JSON",
        success: function (datajson) {
            console.log(datajson);
            bussion = datajson.result;
            
        }

    })

}
//店铺logo图片
var shop_logo;
function UplodShopImage()
{
    var files = document.querySelector("input[type=file]");

    var filename = $("#shop_images")[0].files[0];
    var formdata = new FormData();

    formdata.append("files", filename);
    var image = "";
    $.ajax({
        url: IP+"/Data/FileIO.ashx?Action=upload&type=MerchantsInLogo",
        data: formdata,
        type: "post",
        processData: false,
        contentType: false,
        async: false,
        dataType: "JSON",
        success: function (datajson) {
     
            shop_logo = datajson.result;
            $(".shop-logo").attr("src",ip+shop_logo);

        }

    })
}
//商家入驻
function BtnTenants() {
    var name = $("#zname").val();
    var id_number = $("#id_number").val();
    var organization_code = $("#organization_code").val();
    var shop_name = $("#shop_name").val();
    var charge_people_name = $("#charge_people_name").val();
    var charge_people_tel = $("#charge_people_tel").val();
    var BusinessType = $("#BusinessType").val();
    var BusinessScope = $("#BusinessScope").val();
    var type = $('input[name="colors"]:checked').val();
    var parajson = {};
    parajson.user_id = user_id;
    parajson.name = name;
    parajson.id_number = id_number;
    if (type == "2")
    {
        parajson.organization_code = organization_code;
    }
  
    parajson.shop_name = shop_name;
    parajson.charge_people_name = charge_people_name;
    parajson.business_type_id = BusinessType;
    parajson.business_scope_id = BusinessScope;
    parajson.type = type;
    parajson.charge_people_tel = charge_people_tel;
    parajson.organization_image = bussion;
    parajson.shop_logo = shop_logo;
    parajson.Action = "MerchantsInAdd";
    $.ajax({
        url: IP+"/DataMobile/merchants_in.ashx",
        data: parajson,
        type: "post",
        dataType: "json",
        success: function (datajson) {
            alert(datajson.message);
        }, error: function () {
            alert("网络错误！");
        }
      })
}
//平台客服图片上传
var feedback_image;
var feedback_image1;
var feedback_image2;
var feedback_image3;
function ServiceImage(obj)
{
  
    var files = document.querySelector("input[type=file]");

    var filename = $("#"+obj.id+"")[0].files[0];
    var formdata = new FormData();

    formdata.append("files", filename);
    var image = "";
    $.ajax({
        url: IP+"/Data/FileIO.ashx?Action=upload&type=FeedBack",
        data: formdata,
        type: "post",
        processData: false,
        contentType: false,
        async: false,
        dataType: "JSON",
        success: function (datajson) {
            if(obj.id=="service")
            {
                feedback_image = datajson.result;
            }
            if(obj.id=="service1")
            {
                feedback_image1 = datajson.result;
                $(".service_image1").attr("src",feedback_image1);
            }
            if(obj.id=="service2")
            {
                feedback_image2 = datajson.result;
                $(".service_image2").attr("src",feedback_image2);
            }
            if(obj.id=="service3")
            {
                feedback_image3 = datajson.result;
                $(".service_image3").attr("src",feedback_image3);
            }

        }

    })
}
//提交反馈意见
function btnFeedBack()
{
    var feedback_content = $("#feedback_content").val();
    var feedback_contact = $("#feedback_contact").val();
    var parajson = {};
    parajson.user_id = user_id;
    parajson.feedback_content = feedback_content;
    parajson.feedback_contact = feedback_contact;
    if(feedback_image1!=undefined)
    {
        feedback_image=feedback_image+","+feedback_image1;
    }
    if(feedback_image2!=undefined)
    {
        feedback_image=feedback_image+","+feedback_image2;
    }
    if(feedback_image3!=undefined)
    {
        feedback_image=feedback_image+","+feedback_image3;
    }
    parajson.feedback_image = feedback_image;
    parajson.Action = "Add";
    $.ajax({
        url: IP+"/DataMobile/feedback.ashx",
        data: parajson,
        type: "post",
        dataType: "json",
        success: function (datajson) {
            if (datajson.code == "100") {
                alert("提交成功");
            }
            else {
                alert("提交失败");
            }
        }, error: function () {
            alert("网络错误");
        }
    })
}
//退款列表
function RefundList(pageIndex)
{
    var firstPageTime = $("#firstPageTime").text();
    var parajson = {};
    parajson.Action = "GetGoodsRefundListByUserId";
    parajson.user_id = user_id;
    parajson.pageIndex = pageIndex;
    parajson.firstPageTime = firstPageTime;
    var url = IP+"/DataMobile/goods.ashx";
    $.ajax({
        url: url,
        data: parajson,
        type: "post",
        dataType: "json",
        success: function (datajson) {
            console.log("yyy",datajson);
            if (datajson.code == "100")
            {
                var html = "";
                var result = datajson.data;
                for (var i = 0; i < result.length; i++) {
                    html+=" <li>";
                    html+="  <ul>";
                    html+="  <li class=\"td-item\">";
                    html+="          <div class=\"img\">";
                    html += "           <img src=\"" +ip+result[i].icon + "\" >";
                    html+="       </div>";
                    html+="       <div class=\"con\">";
                    html += "         <h4>" + result[i].name + "</h4>";
                    html+="         <p>"+result[i].specificationsText+"</p>";
                    html+="      </div>";
                    html+="   </li>";
                    html += "   <li class=\"td-price\">" + result[i].salesreturn_money + "</li>";
                    var state = result[i].refund_state;
                    if (state == "1")
                    {
                        state = "申请中";
                    }
                    if (state == "2")
                    {
                        state = "审核通过";
                    }
                    if (state == "3")
                    {
                        state = "已拒绝";
                    }
                    html += "   <li class=\"td-state\">" + state + "</li>";
                    //html+="   <li class=\"td-confirm\">正在确认</li>";
                    html+="  <li class=\"td-operate\">";
                    html+="     <div class=\"inner\">";
                    //html+="        <div class=\"cancle-order\">取消订单</div>";
                    html+="        <div class=\"cancle-order\" onclick=\"ReturnDateils('"+result[i].chargeback_number+"','"+result[i].name+"','"+result[i].refund_state+"','"+result[i].specificationsText+"','"+result[i].create_time+"','"+result[i].icon+"','"+result[i].salesreturn_money+"')\">查看详细</div>";
                    html+="    </div>";
                    html+="   </li>";
                    html+=" </ul>";
                    html+=" </li>";
                }
                $("#refundList").html(html);
                $("#firstPageTime").html(datajson.firstPageTime);
                $("#refundcount").html(datajson.count);
                if(pageIndex==1)
                {
                    RefundPaging();
                }
            }
        }, error: function () {
            alert("网络错误！");
        }

    })
}
//退款详细
function ReturnDateils(order_number,goods_name,refund_state,specificationsText,time,icon,money){
    $("#refrund").modal("show");
    $("#sa_state").html(refund_state);
    $("#order_number").html(order_number);
    $("#icon").attr("src",icon);
    $("#goods_name").html(goods_name+"&nbsp;&nbsp;&nbsp;"+specificationsText);
    $("#money").html(money);
    $("#time").html(time);
   
  
}
//取消订单
function CancelOrder(order_id, pageIndex, order_state)
{
    var url =IP+ "/DataMobile/goods.ashx?Action=OrderClose&order_id=" + order_id + "&user_id=" + user_id;
    $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        success: function (datajson) {
            if (datajson.code == "100") {
                Order(pageIndex, order_state)
                alert("取消成功");
            } else {
                alert("取消失败");
            }
        }, error: function () {
            alert("网络错误！");
        }

    })
}
//订单详情
function SelectDetail(order_id) {
    $('.list-order').hide();
    $('.list-order-result').hide();
    $('.order-detail').show();
    $('.logistics-detail').hide();
    var url =IP+  "/DataMobile/goods.ashx?Action=GetOrderDetailByUserIdPC&user_id=" + user_id + "&order_id=" + order_id;
    $.ajax({
        url: url,
        type: "get",
        dataType: "json",
        success: function (datajson) {
          
            if (datajson.code == "100")
            {
                var result = datajson.data[0];
                $("#order_id").html(result.order_number);
                $("#order_name").val(result.contact_people);
                $("#order_address").val(result.area  + result.detailed_address);
                $("#contact_tel").val(result.contact_tel);
                var state = "";
                var type_state = "";
                var Jdlist
                switch (result.order_state) {
                    case "1": state = "待付款";
                        type_state = "<a href=\"javascript:void(0)\" onclick=\"refund('"+result.order_id+"')\" data-toggle=\"modal\" data-target=\"#myModal\">申请退款</a>";
                        Jdlist+= "<ul>";
                        Jdlist+= "<li>";
                        Jdlist+= "<div class=\"step1\">";
                        Jdlist+="<span>下单</span>";
                                                     
                                                        Jdlist+= " </div>";
                                                        Jdlist+= " </li>";
                                                        Jdlist+= "<li>";
                                                        Jdlist+= " <div class=\"step2\">";
                                                        Jdlist+= "  <span>付款</span>";
                                                
                                                        Jdlist+= "</div>";
                                                        Jdlist+= " </li>";
                                                        Jdlist+= " <li>";
                                                        Jdlist+= "   <div class=\"step3\">";
                                                        Jdlist+= "    <span>配货</span>";
                                                   
                                                        Jdlist+= " </div>";
                                                        Jdlist+= " </li>";
                                                        Jdlist+= " <li>";
                                                        Jdlist+= "   <div class=\"step4\">";
                                                        Jdlist+= "     <span>交易成功</span>";
                                                
                                                        Jdlist+= " </div>";
                                                        Jdlist+= " </li>";
                                                        Jdlist+= " <li>";
                                                        Jdlist+= "    <div class=\"step5\">";
                                                        Jdlist+= "  <span>评价</span>";
                                                        Jdlist+= "   </div>";
                                                        Jdlist+= " </li>";
                                                        Jdlist+= " </ul>";
                        break;
                    case "2": state = "待发货";
                        type_state = "<a href=\"javascript:void(0)\" onclick=\"refund('"+result.order_id+"')\" data-toggle=\"modal\" data-target=\"#myModal\">申请退款</a>";
                        Jdlist+= "<ul>";
                        Jdlist+= "<li>";
                        Jdlist+= "<div class=\"step1\">";
                        Jdlist+="<span>下单</span>";
                                                     
                        Jdlist+= " </div>";
                        Jdlist+= " </li>";
                        Jdlist+= "<li>";
                        Jdlist+= " <div class=\"step2\">";
                        Jdlist+= "  <span>付款</span>";
                                                
                        Jdlist+= "</div>";
                        Jdlist+= " </li>";
                
                    
                        Jdlist+= " </ul>";
                        break;
                    case "3": state = "待收货";
                        type_state = "<a href=\"javascript:void(0)\" onclick=\"refund('"+result.order_id+"')\" data-toggle=\"modal\" data-target=\"#myModal\">申请退款</a>";
                        Jdlist+= "<ul>";
                        Jdlist+= "<li>";
                        Jdlist+= "<div class=\"step1\">";
                        Jdlist+="<span>下单</span>";
                                                     
                        Jdlist+= " </div>";
                        Jdlist+= " </li>";
                        Jdlist+= "<li>";
                        Jdlist+= " <div class=\"step2\">";
                        Jdlist+= "  <span>付款</span>";
                                                
                        Jdlist+= "</div>";
                        Jdlist+= " </li>";
                        Jdlist+= " <li>";
                        Jdlist+= "   <div class=\"step3\">";
                        Jdlist+= "    <span>送货中</span>";
                                                   
                        Jdlist+= " </div>";
                        Jdlist+= " </li>";
                     
                        Jdlist+= " </ul>";
                        break;
                    case "4": state = "待评价";
                        type_state = "<a href=\"javascript:void(0)\">申请退款</a>";
                        Jdlist+= "<ul>";
                        Jdlist+= "<li>";
                        Jdlist+= "<div class=\"step1\">";
                        Jdlist+="<span>下单</span>";
                                                     
                        Jdlist+= " </div>";
                        Jdlist+= " </li>";
                        Jdlist+= "<li>";
                        Jdlist+= " <div class=\"step2\">";
                        Jdlist+= "  <span>付款</span>";
                                                
                        Jdlist+= "</div>";
                        Jdlist+= " </li>";
                        Jdlist+= " <li>";
                        Jdlist+= "   <div class=\"step3\">";
                        Jdlist+= "    <span>送货中</span>";
                                                   
                        Jdlist+= " </div>";
                        Jdlist+= " </li>";
                        Jdlist+= " <li>";
                        Jdlist+= "   <div class=\"step4\">";
                        Jdlist+= "     <span>交易成功</span>";
                                                
                        Jdlist+= " </div>";
                        Jdlist+= " </li>";
                        Jdlist+= " <li>";
                        Jdlist+= "    <div class=\"step5\">";
                        Jdlist+= "  <span>评价</span>";
                        Jdlist+= "   </div>";
                        Jdlist+= " </li>";
                        Jdlist+= " </ul>";
                        break;
                    case "5": state = "已完成";
                        type_state = "<a href=\"javascript:void(0)\">申请退款</a>";
                        break;
                    case "6": state = "已取消";
                        type_state = "";
                        break;
                    case "7": state = "交易关闭";
                        break;
                    default:

                }
                $("#order_state").html(state);
                var goods = result.GoodsList;
                var html="";
                for (var i = 0; i < goods.length; i++) {
                    html+="<ul>";
                    html+="<li>";
                    html+=" <div class=\"goods-img\">";
                    html += "<img src=\"" + ip+goods[i].icon+ "\">";
                    html+="</div>";
                    html+="<div>"+goods[i].name+"</div>";
                    html+="</li>";
                    html+="<li>"+goods[i].buying_price+"元</li>";
                    html+="<li><span>"+datajson.data[0].create_time+"</span></li>";
                    html += "<li><a href=\"javascript:void(0)\" onclick=\"refund('"+result.order_id+"','"+goods[i].order_goods_id+"')\" data-toggle=\"modal\" data-target=\"#myModal\">申请退款</a><span>&gt;</span></li>";
                    html += "</ul>";
                                            
                }
                $("#ordergoodslist").html(html);
            }
        }, error: function () {
            alert("网络错误！");
        }
    })

}

//充值记录查询
function TopUpList(pageIndex) {
    var url = IP+"/ThirdParty/HuaXia/HuaXiaHandler.ashx?Action=dealList&page=" + pageIndex + "&loginUserId=" + user_id ;
    $.ajax({
        url: url,
        type: "get",
        dataType: "json",
        success: function (datajson) {
            if (datajson.code == "100")
            {
                var html = "";
                var result = datajson.result;
                for (var i = 0; i < result.length; i++) {
                    if (result[i].order_type == "2"){
                        html+=" <li>";
                        html+="<ul>";
                        html += "<li class=\"td-num\">" + result[i].transCodeId + "</li>";
                        html += " <li class=\"td-time\">" + result[i].order_time + "</li>";
                        var type = result[i].paytype;
                        if (type == "1")
                        {
                            type = "微信支付";
                        }
                        if (type == "2")
                        {
                            type = "零钱支付";
                        }
                        if (type == "4")
                        {
                            type = "微信充值";
                        }
                        if (type == "5")
                        {
                            type = "绑卡充值";
                        }
                        html += " <li class=\"td-mode\">" + type + "</li>";
                        var money =parseFloat( result[i].order_money / 100);
                        html += "<li class=\"td-amount\">" + money + "</li>";
                        html+="<li class=\"td-state\">****</li>";
                        html+="</ul>";
                        html+="</li>";
                    }
                }
                if (html == "")
                {
                    html = "<ul><li><div>暂无数据</li></ul>";
                }
              
                    $("#TupUplist").html(html);
                $("#toucount").html(datajson.count);
                if (pageIndex == 1)
                {
                    TopUpPaging();
                }
            }
        }, error: function () {
            alert("网络错误！")
        }
    })
}


//查询提现记录
function WithdrawalList(pageIndex)
{
    var url =IP+ "/ThirdParty/HuaXia/HuaXiaHandler.ashx?Action=dealList&page=" + pageIndex + "&loginUserId=" + user_id;
    $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        success: function (datajson) {
            if (datajson.code == "100") {
                var html = "";
                var result = datajson.result;
                for (var i = 0; i < result.length; i++) {
                    if (result[i].order_type == "4"){
                        html += " <li>";
                        html += "<ul>";
                        html += "<li class=\"td-num\">" + result[i].payCode + "</li>";
                        html += " <li class=\"td-time\">" + result[i].order_time + "</li>";
                   
                        html += " <li class=\"td-card\">****</li>";
                        var money = parseFloat(result[i].order_money / 100);
                        html += "<li class=\"td-amount\">" + money + "</li>";
                        html += "<li class=\"td-state\">****</li>";
                        html += "</ul>";
                        html += "</li>";
                 
                    }
                }
                if (html == "") {
                    html = "<ul><li><div>暂无数据</li></ul>";
                }

                $("#withdrawal").html(html);
                $("#withcount").html(datajson.count);
                if (pageIndex == 1) {
                    TopUpPaging();
                }
            }
        }, error: function () {
            alert("网络错误！")
        }
    })
}
//更换头像
function UploadPicture()
{
    var files = document.querySelector("input[type=file]");

    var filename = $("#user_logo")[0].files[0];
    var formdata = new FormData();

    formdata.append("files", filename);

    $.ajax({
        url: IP+"/Data/FileIO.ashx?Action=upload&type=UserLogo",
        data: formdata,
        type: "post",
        processData: false,
        contentType: false,
        async: false,
        dataType: "JSON",
        success: function (datajson) {
           
           var user_logo = datajson.result;
           if (user_logo != "")
           {
               var parajson = {};
               parajson.Action = "ChangeUserLogo";
               parajson.UserId = user_id;
               parajson.UserLogo = user_logo;
               $.ajax({
                   url: IP+"/DataMobile/user.ashx",
                   data: parajson,
                   type: "post",
                   dataType: "json",
                   success: function (datajosn)
                   {
                       $(".user-img").html(" <img src=\"" +ip+ user_logo + "\">");
                       $(".userimg").html(" <img src=\"" +ip+ user_logo + "\">");
                       alert(datajson.message);
                   }, error: function ()
                   {
                       alert("网络错误！");
                   }
               })
           }
            
        }

    })
}

//修改个人信息
function InforMation()
{
    var user_name = $("#user_name").val();
    var sign = $("#sign").val();
    $.ajax({
        url: IP+"/DataMobile/user.ashx?Action=ChangeNickName&NickName=" + user_name + "&UserId=" + user_id,
        type: "post",
        dataType: "json",
        success: function (datajson) {
            if (datajson.code == "100")
            {
                $.ajax({
                    url: "/DataMobile/user.ashx?Action=ChangeUserSign&UserSign=" + sign + "&UserId=" + user_id,
                    type: "post",
                    dataType: "json",
                    success: function (datajson) {
                        if (datajson.code == "100") {
                            $(".username").html(user_name);
                            $(".sign").html(sign);
                            alert(datajson.message);
                        }
                    }, error: function () {
                        alert("网络错误！");
                    }
                })
            }
        }, error: function () {
            alert("网络错误！");
        }
    })
}


//上传第一张评论图片
var comment_image1;
function ComentImage1()
{
    var files = document.querySelector("input[type=file]");

    var filename = $("#coment1")[0].files[0]; 
    var formdata = new FormData();

    formdata.append("files", filename);
    $.ajax({
        url: IP+"/Data/FileIO.ashx?Action=upload&type=Comment",
        data: formdata,
        type: "post",
        processData: false,
        contentType: false,
        async: false,
        dataType: "JSON",
        success: function (datajson) { 
            comment_image1 = datajson.result;
        }
    })
}
//上传第二张评论图片
var comment_image2;
function ComentImage2() {
    var files = document.querySelector("input[type=file]");

    var filename = $("#coment1")[0].files[0];
    var formdata = new FormData();

    formdata.append("files", filename);
    $.ajax({
        url: IP+"/Data/FileIO.ashx?Action=upload&type=Comment",
        data: formdata,
        type: "post",
        processData: false,
        contentType: false,
        async: false,
        dataType: "JSON",
        success: function (datajson) {
            comment_image2 = datajson.result;
        }
    })
}
//上传第三张评论图片
var comment_image3;
function ComentImage3() {
    var files = document.querySelector("input[type=file]");

    var filename = $("#coment1")[0].files[0];
    var formdata = new FormData();

    formdata.append("files", filename);
    $.ajax({
        url: IP+"/Data/FileIO.ashx?Action=upload&type=Comment",
        data: formdata,
        type: "post",
        processData: false,
        contentType: false,
        async: false,
        dataType: "JSON",
        success: function (datajson) {
            comment_image3 = datajson.result;
        }
    })
}
//添加评论

//修改收货地址
function AresUpdate(id)
{
    var item={};
    var url =IP+"/DataMobile/user.ashx?Action=GetShippingAddressList&user_id=" + user_id;
    $.ajax({
        url: url,
        type: "GET",
        async:false,
        dataType: "json",
        success: function (datajson) {
            console.log(datajson);
            if (datajson.code == "100")
            {
                var result=datajson.data;
                for (var i = 0; i < result.length; i++) {
                    if(result[i].shipping_address_id==id)
                    {
                        item=result[i];
            
                        layer.open({
                            type: 1,
                            title: false,
                            area: ['719px', '504px'], //宽高
                            content: `
                                <div class="address">
                            <h3>编辑地址</h3>
                            <div class="info">
                              <ul>
                                <li>
                                  <span>编辑收货地址</span>
                                  <span>电话号码／手机号吗选填一项，其他均为必填项</span>
                                </li>
                                 <li>
                                  <span>所在地区</span>
                                  <span> 
                                    <form class="form-inline">
                                      <div id="distpicker">
                                        <div class="form-group">
                                          <label class="sr-only" for="province1">Province</label>
                                          <select class="form-control" id="province1"></select>
                                        </div>
                                        <div class="form-group">
                                          <label class="sr-only" for="city1">City</label>
                                          <select class="form-control" id="city1"></select>
                                        </div>
                                      </div>
                                    </form>
                                  </span>
                                </li>
                                 <li>
                                  <span>详细地址</span>
                                  <span>
                                    <textarea style='font-size:16px;' class="detailed_address">${item.detailed_address}</textarea>  
                                  </span>
                                </li>
                              
                                <li>
                                  <span>收货人姓名</span>
                                  <span>
                                    <input type="text" value='${item.contact_people}' class="contact_people">
                                  </span>
                                </li>
                                <li>
                                  <span>联系电话</span>
                                  <span>
                                    <input type="text" value='${item.contact_tel}' class="contact_tel">
                                  </span>
                                </li>
                               
                                 <li>
                                  <input type="button" value="保存" id="save">
                                 <input type="text" style='display:none' value='${item.shipping_address_id}' id="shipping_address_id">
                                </li>
                              </ul>
                            </div>
                          </div>
             <script src="js/plugins/distpicker/distpicker.data.js"><\/script>
             <script src="js/plugins/distpicker/distpicker.js"><\/script>
             <script>
               var $distpicker = $('#distpicker');
                        $distpicker.distpicker({
                            province: '贵州省',
                            city: '贵阳市'
                        });
                        $("#save").on('click',function(){
                            var province1=$("#province1").find("option:selected").text();
                            var city1=$("#city1").find("option:selected").text();
                            var area=province1+city1;
                            var detailed_address=$(".detailed_address").val();
                            var shipping_address_id=$("#shipping_address_id").val();
                            var contact_people=$(".contact_people").val();
                            var contact_tel=$(".contact_tel").val();
                            if(!area) return alert("必须填写收货地址省市");
                            if(!detailed_address) return alert("必须填写收货地址的详细地址");
                            if(!contact_people) return alert("必须填写收货人");
                            if(!contact_tel) return alert("必须填写收货人电话");
                            var obj={};
                            obj.contact_people=contact_people;
                            obj.contact_tel=contact_tel;
                            obj.area=area;
                            obj.shipping_address_id=shipping_address_id;
                            obj.detailed_address=detailed_address;
                            obj.is_default_address="1";
                            obj.user_id=user_id;
                            $.ajax({
                                url: IP+"/DataMobile/user.ashx?Action=ShippingAddressUpdate",
                                type: "get",
                                data:obj,
                                dataType: "json",
                                success: function (datajson){
                                    ShippingAddress()
                                    alert(datajson.message);
                                }
                            }); 
                        })
                        <\/script>
                        `
                        });

                    }
                }
            
        }
    }, error: function () {
        alert("网络错误！");
    }
    })
}
//投诉列表
function ReportShopList(pageIndex)
{
    var url=IP+"/DataMobile/report_complaints.ashx";
    var firstPageTime = $("#firstPageTime").text();
    var parajson={};
    parajson.Action="GetComplaintsByUserId";
    parajson.pageIndex=pageIndex;
    parajson.firstPageTime=firstPageTime;
    parajson.user_id=user_id;
    $.ajax({
        url:url,
        data:parajson,
        type:"post",
        dataType:"json",
        success:function(datajson){
 
            if(datajson.code=="100")
            {
                var html="";
                var result=datajson.data;
                for (var i = 0; i <result.length; i++) {
                    html+=" <li>";
                    html+=" <ul>";
                    html+=" <li class=\"td-item\">";
                    html+="  <div class=\"img\">";
                    var iconImage=result[i].icon;
                    for (var j = 0; j < iconImage.length; j++) {
                        html+="  <img src=\""+ip+iconImage[j].icon+"\" >";
                    }
                    //html+="  <img src="imgs/1.png" alt="">";
                    html+=" </div>";
                    html+=" <div class=\"con\">";
                    //html+="  <h4>红酒整箱张裕 葡萄酒赤霞珠干红【整箱6瓶】</h4>";
                    //html+="  <p>整箱24只</p>";
                    html+="  </div>";
                    html+="  </li>";
                    html+=" <li class=\"td-theme\">"+result[i].account+"</li>";
                    html+=" <li class=\"td-time\">"+result[i].describe+"</li>";
                    html+=" <li class=\"td-state\">"+result[i].create_time+"</li>";
                    html+="  <li class=\"td-operate\">";
                    html+=" <div class=\"del\" onclick=\"DeleteReportShop('"+result[i].complaints_id+"')\">撤销投诉</div>";
                    html+=" </li>";
                    html+=" </ul>";
                    html+=" </li>";

                }
                $("#report_list").html(html);
                $("#report_shop_count").html(datajson.count);
                if(pageIndex==1)
                {
                    ReportShopPaging();
                }
            }
       

        },error:function(){
            alert("网络错误！");
        }
    })
}
//撤销投诉
function DeleteReportShop(complaints_id)
{
    var url=IP+"/DataMobile/report_complaints.ashx?Action=ComplaintsRecall&user_id="+user_id+"&complaints_id="+complaints_id;
    $.ajax({
        url:url,
        type:"post",
        dataType:"json",
        success:function(datajson){
            if(datajson.code=="100")
            {
                ReportShopList(1);
                alert(datajson.message);
            }
        },error:function(datajson)
        {
            console.log(datajson);
            alert("后网络错误！");
        }
    })
    

}

//修改版举报商品
function ReportGoodsList(pageIndex)
{
    var url=IP+"/DataMobile/report_complaints.ashx";
    var firstPageTime=$("#firstPageTime").val();
    var parajson={};
    parajson.Action="GetReportByUserId";
    parajson.user_id=user_id;
    parajson.firstPageTime=firstPageTime;
    parajson.pageIndex=pageIndex;
    $.ajax({
        url:url,
        data:parajson,
        type:"post",
        dataType:"json",
        success:function(datajson){
            if(datajson.code=="100")
            {
                var html="";
                var result=datajson.data;
                for (var i = 0; i <result.length; i++) {
                    html+=" <li>";
                    html+=" <ul>";
                    html+=" <li class=\"td-item\">";
                    html+="  <div class=\"img\">";
                    var iconImage=result[i].icon;
                    for (var j = 0; j < iconImage.length; j++) {
                        html+="  <img src=\""+ip+iconImage[j].icon+"\" >";
                 
                    }
          
                    html+=" </div>";
        
                    html+="  </li>";
                    html+=" <li class=\"td-operate\">"+result[i].account+"</li>";
                    html+=" <li class=\"td-operate\">"+result[i].describe+"</li>";
                    html+=" <li class=\"td-operate\">"+result[i].create_time+"</li>";
                    //html+="  <li class=\"td-operate\">";
                    //html+=" <div class=\"del\" onclick=\"DeleteReportShop('"+result[i].complaints_id+"')\">撤销举报</div>";
                    //html+=" </li>";
                    html+=" </ul>";
                    html+=" </li>";

                }
                $("#reportgoods").html(html);
                $("#report_goods_count").html(datajson.count);
                if(pageIndex==1)
                {
                    ReportGoodsPaging();
                }
            }
        },error:function(){

            alert("网络错误！");
        }
    })

}
//修改密码
function UpdatePassWord()
{
    var old_password=$("#old_password").val();
    var password=$("#password").val();
    var url=apiUrl+"/DataMobile/user.ashx";
    var parajson={};
    parajson.user_id=user_id;
    parajson.Action="ChangePassWord";
    parajson.OldPassWord=old_password;
    parajson.NewPassWord=password;
    $.ajax({
        url:IP+url,
        data:parajson,
        type:"post",
        dataType:"json",
        success:function(datajson){
            alert(datajson.message);
            $("#UpdatePassWord").modal("hide");
        },error:function(){
            alert("网络错误！");
        }
    })

}
//退款原因列表
function GetGoodsRefundCause(){
    var url=IP+"/DataMobile/goods.ashx?Action=GetGoodsRefundCause&user_id="+user_id
    $.ajax({
        url:url,
        type:"post",
        dataType:"json",
        success:function(datajson){
            if(datajson.code=="100")
            {
                var html="";
                var result=datajson.data;
                for (var i = 0; i <result.length; i++) {
                    html+="<option value=\""+result[i].salesreturn+"\">"+result[i].salesreturn_cause_text+"</option>";
                }
                $("#return_list").html(html);
            }

        },error:function(){

            alert("网络错误！");
        }
    })
}
//加载退款商品类容
function refund(order_id,order_goods_id) {
    var url =IP+ "/DataMobile/goods.ashx?Action=GetOrderDetailByUserIdPC&user_id=" + user_id + "&order_id=" + order_id;
    $.ajax({
        url: url,
        type: "get",
        dataType: "json",
        success: function (datajson) {
   
            if (datajson.code == "100")
            {
                var result = datajson.data[0];
                $(".order_id").html(result.order_number);
                $(".order_name").val(result.contact_people);
                $(".order_address").val(result.area  + result.detailed_address);
                $(".contact_tel").val(result.contact_tel);
                $(".merchants_in_id").html(result.merchants_in_id);         
       
                var goods = result.GoodsList;
                var html="";
                var myDate=new Date();
             
                for (var i = 0; i < goods.length; i++) {
                    if(goods[i].order_goods_id==order_goods_id)
                    {
                        html+="<ul>";
                        html+=" <li>";
                        html+="<div class=\"goods-img\">";
                        html += "<img src=\"" + goods[i].icon+ "\">";
                        html+=" </div>";
                        html+="<div>"+goods[i].name+"</div>";
                        html+=" </li>";
                        html+="<li>"+result.order_sum_price+"元</li>";
                        html+="<li>"+myDate.getFullYear()+"-"+myDate.getMonth()+"-"+myDate.getDay()+"&nbsp;("+myDate.getHours()+":"+myDate.getMinutes()+")</li>";
                        html+=" </ul>";
                        $(".order_sum_price").html(goods[i].buying_price);
                        $(".order_goods_id").html(goods[i].order_goods_id);
                        $(".refund_state").html(goods[i].refund_state);
                    } 
                                                        
                }
                $("#return_order").html(html);
            }
        }, error: function () {
            alert("网络错误！");
        }
    })
}
//退款图片1
var salesreturn_voucher_img1;
function ReturnImage1(){

    var files = document.querySelector("input[type=file]");

    var filename = $("#salesreturn_voucher_img1")[0].files[0];
    var formdata = new FormData();

    formdata.append("files", filename);
    $.ajax({
        url: IP+"/Data/FileIO.ashx?Action=upload&type=SalesReturn",
        data: formdata,
        type: "get",
        processData: false,
        contentType: false,
        async: false,
        dataType: "JSON",
        success: function (datajson) {
            salesreturn_voucher_img1 = datajson.result;
            $(".salesreturn_voucher_img1").attr("src",ip+salesreturn_voucher_img1);
        }
    })

}
//退款图片2
var salesreturn_voucher_img2;
function ReturnImage2(){
    
    var files = document.querySelector("input[type=file]");

    var filename = $("#salesreturn_voucher_img2")[0].files[0];
    var formdata = new FormData();

    formdata.append("files", filename);
    $.ajax({
        url: IP+"/Data/FileIO.ashx?Action=upload&type=SalesReturn",
        data: formdata,
        type: "get",
        processData: false,
        contentType: false,
        async: false,
        dataType: "JSON",
        success: function (datajson) {
            salesreturn_voucher_img2 = datajson.result;
            $(".salesreturn_voucher_img2").attr("src",ip+salesreturn_voucher_img2);
        }
    })
}
//退款图片3
var salesreturn_voucher_img3;
function ReturnImage3(){
    
    var files = document.querySelector("input[type=file]");

    var filename = $("#salesreturn_voucher_img3")[0].files[0];
    var formdata = new FormData();

    formdata.append("files", filename);
    $.ajax({
        url: IP+"/Data/FileIO.ashx?Action=upload&type=SalesReturn",
        data: formdata,
        type: "get",
        processData: false,
        contentType: false,
        async: false,
        dataType: "JSON",
        success: function (datajson) {
            salesreturn_voucher_img3 = datajson.result;
            $(".salesreturn_voucher_img3").attr("src",ip+salesreturn_voucher_img3);
        }
    })
}

//提交退款申请
function BtnReturnMoney()
{
    var url=IP+"/DataMobile/goods.ashx";
    var salesreturn_cause_id=$("#return_list").val();
    var salesreturn_explain=$("#salesreturn_explain").val();
    var salesreturn_money=$(".order_sum_price").text();
    var order_goods_id=$(".order_goods_id").text();
    var merchants_in_id=$(".merchants_in_id").text();
    var  refund_state=$(".refund_state").text();
    var parajson={};
    parajson.Action="GoodsRefundAdd";
    parajson.salesreturn_cause_id=salesreturn_cause_id;
    parajson.salesreturn_explain=salesreturn_explain;
    parajson.receive_state=refund_state;
    if(refund=="3")
    {
        parajson.type=2;
    }
    else{
        parajson.type=1;
    }
    parajson.order_goods_id=order_goods_id;
    parajson.user_id=user_id;
    parajson.salesreturn_money=salesreturn_money;
    parajson.merchants_in_id=merchants_in_id;

    if(salesreturn_voucher_img1!=undefined)
    {
        parajson.salesreturn_voucher_img1=salesreturn_voucher_img1;
    }
    if(salesreturn_voucher_img2!=undefined)
    {
        parajson.salesreturn_voucher_img2=salesreturn_voucher_img2;
    }
    if(salesreturn_voucher_img3!=undefined)
    {
        parajson.salesreturn_voucher_img3=salesreturn_voucher_img3;
    }
    $.ajax({
        url:url,
        data:parajson,
        type:"get",
        dataType:"json",
        success:function(datajson){
            if(datajson.code=="100")
            {

                alert(datajson.message);
                $("#myModal").modal("hide");
            }else
            {
                alert(datajson.message);
                $("#myModal").modal("hide");
            }
        },error:function()
        {
            alert("网络错误！");
        }
    })
}
////查看物流
function LogisticsDateils(number)
{
    var url=IP+"/Data/order.ashx?Action=LogisticsInfo&number="+number;
    $.ajax({
        url:url,
        type:"get",
        dataType:"json",
        success:function(datajson){
                var html="";
                if(datajson.msg=="ok"){
                    
                    var result=datajson.result.list;
                    if(datajson.result.issign=="0"){
                        alert('还没有签收');
                    }
                    switch(datajson.result.deliverystatus){
                        case "1"://在途中
                          //
                          $('.step-1').css({'background-image':'url(../../imgs/logistics-1.png)','background-position':'0 0'});
                          $('#tilte').text("您的快件已发货，请耐心等待...");
                          break;
                        case "2"://正在派件
                          //
                          $('.step-1').css({'background-image':'url(../../imgs/logistics-1.png)','background-position':'0 0','color':'red'});
                          $('.step-2').css({'background-image':'url(../../imgs/logistics-1.png)','background-position':'-227px 0','color':'red'});
                          $('.step-3').css({'background-image':'url(../../imgs/logistics-1.png)','background-position':'-454px 0','color':'red'});
                          $('#tilte').text("您的快件正在派件，请耐心等待...");
                          break;
                        case "3"://已签收
                          //
                          $('.step-1').css({'background-image':'url(../../imgs/logistics-1.png)','background-position':'0 0','color':'red'});
                          $('.step-2').css({'background-image':'url(../../imgs/logistics-1.png)','background-position':'-227px 0','color':'red'});
                          $('.step-3').css({'background-image':'url(../../imgs/logistics-1.png)','background-position':'-454px 0','color':'red'});
                          $('.step-4').css({'background-image':'url(../../imgs/logistics-1.png)','background-position':'-681px 0','color':'red'});
                          $('#tilte').text("您的快件已签收，期待再次为您服务");
                          break;
                        case "4"://派送失败
                          //
                          break;
                        default://什么玩意
                          //
                    }
                    for (var i = 0; i < result.length; i++) {

                        html+="<li>" ;
                        if(i==0){
                            html+="<span>最新</span>";
                        }
                        html+="<span></span>";
                        html+=" <span class=\"date\">"+result[i].time+"</span>";
                    // html+=" <span class=\"week\">周一</span>";
                    // html+="<span class=\"time\">14:38:55</span>";
                        html+="<span class=\"text\">"+result[i].status+"</span>";
                        html+=" </li>";

                    }

                    $("#logiction_list").html(html);
                    $("#express_number").html(datajson.result.number);
                    $("#express_company").html(datajson.result.expName);
                    $("#express_tel").html(datajson.result.expPhone);
                }

            
        },error:function(){
            alert("网络错误！");

        }
    })

}
//新品推荐
function GoodsGetList()
{
    var url=IP+"/DataMobile/goods.ashx?Action=GoodsGetList&user_id="+user_id;
    $.ajax({
        url:url,
        type:"GET",
        dataType:"json",
        success:function(datajson)
        {
            var t;
            var arr=datajson.data;
            for (var i = 0; i < arr.length; i++) {
                var rand=parseInt(Math.random()*arr.length);
                t = arr[rand];
                arr[rand] =arr[i];
                arr[i] = t;

            }
            console.log('新品',datajson)
            if(datajson.code=="100")
            {
                var html="";
                var result=datajson.data;
                for (var i = 0; i < 3; i++) {
                    html+=" <li>";
                    html+=" <div class=\"goods_img\">";
                    html+="      <img src=\""+result[i].icon+"\" >";
                    html+="  </div>";
                    html+=" <div class=\"goods_name\">";
                    html+="  <div>"+result[i].name+"<span class=\"classical\">&nbsp;&nbsp;购买价</span>"+result[i].buying_price+"元</div>";
                    html+="</div>";
                    html+="<div class=\"more\">MORE</div>";
                    html+=" </li>";
                }
            }else
            {
                alert(datajson.message);
            }
            $("#GoodsGetList").html(html);
        },error:function()
        {
            alert("网络错误！");
        }
    })

}
















//判断账号安全等级
//function PassWordSecurity(password)
//{
//    var digital=/[0-9]/;
//    var english=/[a-z]/i;
//    var both=new RegExp(/^[0-9A-Za-z]+$/);
//    //var both=new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$));
//    var punctuation=/\W/g;
//    //alert(digital.test(password));
//    //alert(english.test(password));
//    //alert(both.test(password));
//    //alert(punctuation.test(password));
//    var state="";
//    if(digital.test(password))
//    {
//        alert(123)
//        state="低";
//    }
//    if(english.test(password))
//    {
//        state="低";
//    }
//    if(punctuation.test(password))
//    {
//        state="低";
//    }
//    if(digital.test(password)&&punctuation.test(password))
//    {
       
//        state="中";
//    }
//    if(both.test(password))
//    {
//        state="中";
//    }
    
//}

