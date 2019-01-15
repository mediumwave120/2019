




//Vue.component('header',h_header);
new h_header().$mount('h-header');//把组件挂载到h-header标签上
new h_footer().$mount('h-footer');//把组件挂载到h-footer标签上
new h_login().$mount('h-login');//把组件挂载到h-footer标签上

//
//用户id
var user_id=GetCookie('UserId');//"0cbc4f22-8585-4d3d-b089-38ec35ebb56d";

//console.log(order_json);
var vm=new Vue({
  el:'#app',
  data:{
      goodsNum:1,
      totalPrice:0,
      goodsPrice:999.00,
      discount :50,
      number:0,
      addressList:[],
      //order_list:order_json
      order_list:[],
      order_submit:[]
  },
  mounted(){
      this.$nextTick(function () {
          this.getOrder();
          this.getShoppingAddressList();
      });
  },
  methods:{
      getShoppingAddressList:function(){
        var _this=this;
          $.ajax({
          url: IP+"/DataMobile/user.ashx?Action=GetShippingAddressList&user_id="+user_id,
          type: "get",
          dataType: "json",
          success: function (datajson){
            //{"code":"100","message":"查询成功","data":[{"shipping_address_id":"1cd54279-0630-4090-a275-943a631ff9d8","contact_people":"老子","contact_tel":"17311111111","area":"安徽省合肥市","detailed_address":"人民路1号","is_default_address":"1"},{"shipping_address_id":"5395c397-8ef3-43ba-a3d2-abe612fb3698","contact_people":"小欧","contact_tel":"17301764656","area":"河北省石家庄市","detailed_address":"人民路21号田酷兔兔突突突兔兔V5图酷兔兔5句路途田考虑考虑","is_default_address":"0"},{"shipping_address_id":"57f6b63d-5947-4e34-bf33-c792603a0e59","contact_people":"李白","contact_tel":"17301764656","area":"山西省太原市杏花岭区","detailed_address":"世界路","is_default_address":"0"},{"shipping_address_id":"5e5d0362-8f83-4a66-bad6-d47db6e5cee8","contact_people":"夫子庙","contact_tel":"17301764656","area":"北京市北京市东城区","detailed_address":"数据库路","is_default_address":"0"},{"shipping_address_id":"e56f808d-d1b9-4619-96a7-7f3d23adecc5","contact_people":"李龙","contact_tel":"17301764656","area":"北京市北京市东城区","detailed_address":"套路8江淮信息科技江淮信息科技","is_default_address":"0"},{"shipping_address_id":"be8f2c1e-8f0d-4bf2-97f6-ce78b42ac982","contact_people":"肖","contact_tel":"17356663636","area":"北京市北京市东城区","detailed_address":"龙路","is_default_address":"0"}]}
            
             // console.log(datajson.data);
              if(datajson.code=="100"){
                  _this.addressList=datajson.data

                  
              }
              
          }
        }); 
      },
      getOrder:function(){
        var _this=this;
        
        var jsonText=localStorage.getItem('jsonText');
        var order_json=JSON.parse(jsonText);
        var json="";
        for (var i = 0; i < order_json.length; i++) {
          if(order_json[i].goods.length>0){
            console.log(order_json[i])
            json=order_json[i];
          }
          
        }
        var obj={};
            obj.user_id= user_id;
            obj.jsonText=jsonText;//"["+JSON.stringify(json)+"]";
        $.ajax({
          url: IP+"/DataMobile/goods.ashx?Action=GoodsSettlement",
          type: "post",
          data:obj,
          dataType: "json",
          success: function (datajson){
            //{"code":"100","message":"查询成功","data":[{"ShippingAddress":[{"shipping_address_id":"1cd54279-0630-4090-a275-943a631ff9d8","contact_people":"老子","contact_tel":"17311111111","area":"安徽省合肥市","detailed_address":"人民路1号","is_default_address":"1"}],"merchantsin":[{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","SubAccount":"200201808000004","TradeMemcode":"0000139759","user_id":"07cac2ce-5a7c-46d0-9aa9-c00af9339a32","account":"14752214432","GoodsList":[{"GoodsSpecificationList":[{"goods_specification_category_id":"c5aa8b20-1124-4e32-8234-06cd303e9b79"},{"goods_specification_category_id":"682362d5-4bbb-474e-8d84-41557d9e925f"},{"goods_specification_category_id":"1288d509-c531-4f21-bd69-57f72b4cf0b1"},{"goods_specification_category_id":"cf3b9258-9a3d-4cc2-97e1-e817d50fb9d2"},{"goods_specification_category_id":"cda6b0cd-a1a5-40fd-964f-eeebdbf55d17"},{"goods_specification_category_id":"fb55730b-f392-43ab-b430-3affcbeb465a"}],"goods_id":"7e91a47e-bb42-45c7-a017-043e458e07c4","name":"杂物","icon":"/Files/Goods/201901/901c2a8a2c0c411ebe230a87748c8109.png","buying_price":"0.01","buy_count":"1","courier_fees":"0.00","specificationsText":"颜色分类:白色,鞋码:35,白条分期:3期"}],"goods_price":"0.01","courier_fees":"0.00","goods_count":"1","goods_sum_price":"0.01"}],"sum_price":"0.01"}]}
              
              if(datajson.code=="100"){
                  _this.order_list=datajson.data[0].merchantsin;
                  _this.totalPrice=datajson.data[0].sum_price;
                  _this.order_submit=datajson.data[0].merchantsin;
                  //_this.totalPrice='';
              }
              if(datajson.code=="101"){
                  alert(datajson.message);
              }
              
          }
        }); 
      },
      /*
        确认商品信息
      */
      //减少
      minusNum:function() {
        if(this.goodsNum==1){
          this.goodsNum=1;
        }else{
          this.goodsNum--;
        }
      },
      plusNum:function(buying_price,buy_count){
        var _this=this;
        _this.totalPrice=0;
        this.goodsNum++;
        _this.totalPrice+=buying_price*buy_count;
      },
      //添加新地址
      addAddress:function() {
          layer.open({
            type: 1,
            title: false,
            // title: ['添加新地址','font-size:26px;background:#e23338;color:#fff;height:70px;line-height:70px;text-align:center;'],
            area: ['719px', '504px'], //宽高
            content: `
                <div class="address">
                  <h3>添加新地址</h3>
                  <div class="info">
                    <ul>
                      <li>
                        <span>新增收货地址</span>
                        <span>电话号码／手机号吗选填一项，其他均为必填项</span>
                      </li>
                       <li>
                        <span>所在地区</span>
                        <span> 
                          <form class="form-inline">
                            <div data-toggle="distpicker">
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
                          <textarea name="" id="" class="detailed_address">详细地址，例如街道名称，门牌号码，楼层和房间号等</textarea>  
                        </span>
                      </li>
                      <li>
                        <span>收货人姓名</span>
                        <span>
                          <input type="text" placeholder="长度不超过25个字" class="contact_people">
                        </span>
                      </li>
                      <li>
                        <span>手机号码</span>
                        <span>
                          <input type="text" placeholder="" class="contact_tel">
                        </span>
                      </li>
                       <li>
                        <input type="button" value="保存" id="save">
                      </li>
                    </ul>
                  </div>
                </div>
                <script src="js/plugins/distpicker/distpicker.data.js"><\/script>
                <script src="js/plugins/distpicker/distpicker.js"><\/script>
                <script src="js/plugins/distpicker/main.js"><\/script>
                <script>
                    var $distpicker = $('#distpicker');
                $distpicker.distpicker({
                  province: '北京市',
                  city: ''
                });
                $("#save").on('click',function(){
                    var province1=$("#province1").find("option:selected").text();
                    var city1=$("#city1").find("option:selected").text();
                    var area=province1+city1;
                    var detailed_address=$(".detailed_address").val();
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
                        obj.detailed_address=detailed_address;
                        obj.is_default_address="1";
                        obj.user_id=user_id;
                    $.ajax({
                      url: IP+"/DataMobile/user.ashx?Action=ShippingAddressAdd",
                      type: "get",
                      data:obj,
                      dataType: "json",
                      success: function (datajson){
                     
                          alert(datajson.message);
                      }
                    }); 
                })
                </script>
              `
          });
      },
      //编辑地址
      editAddress:function(item){
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
                      <span shipping-address-id="${item.shipping_address_id}" class="areas">所在地区</span>
                      <span> 
                        <form class="form-inline">
                          <div class="txt">${item.area}</div>
                          <div id="distpicker" style="display:none">
                            
                            <div class="form-group" >
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
                      <span>手机号码</span>
                      <span>
                        <input type="text" value='${item.contact_tel}' class="contact_tel">
                      </span>
                    </li>
                     <li>
                      <input type="button"  id="save" value="保存">
                    </li>
                  </ul>
                </div>
              </div>
              <script src="js/plugins/distpicker/distpicker.data.js"><\/script>
              <script src="js/plugins/distpicker/distpicker.js"><\/script>
              <script>
                $('.txt').on('click',function(){
                  $(this).hide();
                  $('#distpicker').show();
                })
                var $distpicker = $('#distpicker');
                $distpicker.distpicker({
                  province: '北京市',
                  city: ''
                });
                $("#save").on('click',function(){
                    var province1=$("#province1").find("option:selected").text();
                    var city1=$("#city1").find("option:selected").text();
                    var area=province1+city1;
                    var detailed_address=$(".detailed_address").val();
                    var contact_people=$(".contact_people").val();
                    var contact_tel=$(".contact_tel").val();
                    var shipping_address_id=$(".areas").attr("shipping-address-id");
                    if(!area) return alert("必须填写收货地址省市");
                    if(!detailed_address) return alert("必须填写收货地址的详细地址");
                    if(!contact_people) return alert("必须填写收货人");
                    if(!contact_tel) return alert("必须填写收货人电话");
                    var obj={};
                        obj.contact_people=contact_people;
                        obj.contact_tel=contact_tel;
                        obj.area=area;
                        obj.detailed_address=detailed_address;
                        obj.is_default_address="1";
                        obj.shipping_address_id=shipping_address_id;
                        obj.user_id=user_id;
                    $.ajax({
                      url: IP+"/DataMobile/user.ashx?Action=ShippingAddressUpdate",
                      type: "get",
                      data:obj,
                      dataType: "json",
                      success: function (datajson){
                     
                          
                          vm.getShoppingAddressList();
                      }
                    }); 
                })
                
            <\/script>
          `
        });
      },
      //移入编辑
      entryEdit:function(ev){

        console.log(ev);
        // var _this=this;
        // $(_this).find('.edit').show();
      },
      //移出
      entryUnEdit:function() {
        console.log(2);
      },
      //切换收货地址
      changeAddress:function(index) {
          this.number=index;
      },
      calcTotalPrice: function () {
            var _this = this;
            _this.totalPrice = 0;
            this.shopList.forEach(function (shop, index) {
                var goodsList = shop.GoodsList;
                goodsList.forEach(function (good, index) {
                    if (good.checkFlag) {
                        _this.totalPrice += good.buying_price * good.goods_count;
                    }
                })


            })
      },
      saveOrder:function(){
        var _this=this;
        var buyer_message=$('.shop_id .message').find('.buyer-message');
        var buyer_message_list=[];
        //商品总价
        var sum_price=$('.sum-price').text();
        //收货信息id
        var shipping_address_id="";
        $('.add-address').each(function(){
            if($(this).hasClass('active')){
                shipping_address_id=$(this).attr('shipping-address-id');
            }
        });
        //店铺子账户（---）
        var sub_account=$('.list-result').find('li').attr('sub-account');
        var account=$('#merchants_user_id').attr('account');
        var trade_mem_code=$('#merchants_user_id').attr('trade-mem-code');
        //店铺user_id
        var merchants_user_id=$('#merchants_user_id').attr('merchants-user-id');
        var jsonText="";
        var shop=$('.shop_id');
                jsonText+="[";
            for (var i = 0; i < shop.length; i++) {
                jsonText+="{";
                var shop_id=$(shop[i]).find('.goods-box a').attr('merchants-in-id');
                    var goods=$(shop[i]).find('.goods_id');
                    jsonText+="\"merchants_in_id\":\""+shop_id+"\",";            
                    jsonText+="\"courier_fees\":\"0.00\",";       
                    jsonText+="\"buyer_message\":\""+$(shop[i]).find('.message .buyer-message').val()+"\",";                   
                    jsonText+="\"goods_price\":\""+$(shop[i]).find('.goods_price').text()+"\",";                   
                        jsonText+="\"goods\":";
                            jsonText+="[";
                            for (var j = 0; j < goods.length; j++) {
                                                                    
                                //shipping_car_id+=$(goods[j]).attr('shopping-car-id')+',';
                                jsonText+="{\"goods_id\":\""+$(goods[j]).attr('goods-id')+"\",";
                                jsonText+="\"buy_count\":\""+$(goods[j]).find('.td-amount>.text-amount').text()+"\",";
                                jsonText+="\"buying_price\":\""+$(goods[j]).find('.td-price>span').text()+"\",";
                                //sum_price+=parseFloat($(goods[j]).find('.td-sum>span').text());
                                
                               jsonText+="\"specificationsText\":\""+$(goods[j]).find('.td-item>.content>p').text()+"\",";
                                jsonText+="\"specifica\":";
                                    var category_id=$(goods[j]).find('.td-item .category_id');
                                    if(category_id.length!=0){

                                      jsonText+="[";

                                      for (var k = 0; k < category_id.length; k++) {
                                          jsonText+='{';
                                          jsonText+="\"goods_specification_category_id\":\""+$(category_id[k]).attr('category-id')+"\"";    
                                          jsonText+='},';
                                      }
                                      jsonText=jsonText.substr(0,jsonText.length-1); 
                                      jsonText+="]";
                                    }else{
                                      jsonText+="[]";
                                    }
                                 jsonText+="},";
                                    
                                
                            }
                            jsonText=jsonText.substr(0,jsonText.length-1);
                            jsonText+="]";                
                jsonText+="},";
            }
                jsonText=jsonText.substr(0,jsonText.length-1);
            jsonText+="]";
            jsonText=jsonText.replace(/,]/g,"]")
            console.log(jsonText);
            //[{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","courier_fees":"0.00","buyer_message":"","goods_price":"0.01","goods":[{"goods_id":"7e91a47e-bb42-45c7-a017-043e458e07c4","buy_count":"1","buying_price":"0.01","specificationsText":"颜色分类:白色,鞋码:35,白条分期:3期","specifica":[{"goods_specification_category_id":"c5aa8b20-1124-4e32-8234-06cd303e9b79"},{"goods_specification_category_id":"682362d5-4bbb-474e-8d84-41557d9e925f"},{"goods_specification_category_id":"1288d509-c531-4f21-bd69-57f72b4cf0b1"},{"goods_specification_category_id":"cf3b9258-9a3d-4cc2-97e1-e817d50fb9d2"},{"goods_specification_category_id":"cda6b0cd-a1a5-40fd-964f-eeebdbf55d17"},{"goods_specification_category_id":"fb55730b-f392-43ab-b430-3affcbeb465a"}]}]}]
            return;
             var order_obj={};
                  order_obj.jsonText=jsonText;
                  order_obj.sum_price=sum_price;
                  order_obj.shipping_address_id=shipping_address_id;
                  order_obj.user_id=user_id;
               $.ajax({
                  url: IP+"/DataMobile/goods.ashx?Action=OrderAdd",
                  type: "post",
                  data:order_obj,
                  dataType: "json",
                  success: function (datajson){
                    console.log("提交订单：",datajson);
                    
                    if(datajson.code=="100"){
                    var result=datajson.data[0];
                      alert(datajson.message);
                      localStorage.setItem('order_id',result.id);
                      localStorage.setItem('sum_price',result.sum_price);
                      localStorage.setItem('sub_account',sub_account);
                      localStorage.setItem('merchants_user_id',merchants_user_id);
                      localStorage.setItem('account',account);
                      localStorage.setItem('trade_mem_code',trade_mem_code);
                      location.href="payment_mode.html";
                      
                    }

                      
                  }
                    
                }); 
            //buyer_message_list.push($(buyer_message[i]).val());
          // _this.order_submit.forEach(function(item,index){
          //     item.GoodsList.forEach(function(goods,ind){//buyer_message
          //       for (let i = 0; i < buyer_message.length; i++) {
          //         goods.buyer_message+=$(buyer_message[i]).val();//+=$(buyer_message[i]).val()
          //         console.log($(buyer_message[i]).val());

          //       }
          //     });
          // })
         
         //console.log(_this.order_submit)
          // //店铺id
          // var merchants_in_id=$('.list-result').find('li').attr('merchants-in-id');
        
          // var arr=[];
          // $('.category_id').each(function(){
          //     arr.push($(this).attr("category-id"));
          // });
          // //商品id
          // var goods_id=$('.goods_id').attr('goods-id');
          // //商品单价
          // var goods_price=$('.td-price').text();
          // //购买价格
          // var buying_price=$('.td-price').text();
          // //购买数量
          // var buy_count=parseInt($('.text-amount').text());
          // //购买总价
          // var sum_price=$('.sum-price').text();
          // //买家留言
          // var buyer_message=$('.buyer-message').val();
          // //收货信息id
          // var shipping_address_id="";
          // //店铺子账户（---）
          // var sub_account=$('.list-result').find('li').attr('sub-account');
          // //店铺user_id
          // var merchants_user_id=$('#merchants_user_id').attr('merchants-user-id');
          // //
          // var account=$('#merchants_user_id').attr('account');
          // var trade_mem_code=$('#merchants_user_id').attr('trade-mem-code');
          // $('.add-address').each(function(){
          //     if($(this).hasClass('active')){
          //       shipping_address_id=$(this).attr('shipping-address-id');
          //     }
          // });

          // var specificationsText=$('.specificationsText').text();
          // var jsonText="[";
          //     jsonText+="{\"merchants_in_id\":\""+merchants_in_id+"\",";
          //       jsonText+="\"goods\":";
          //       jsonText+="["

          //           jsonText+="{\"specifica\":";
          //             jsonText+="[";
          //               for (var i = 0; i < arr.length; i++) {
          //                 jsonText+="{\"goods_specification_category_id\":\""+arr[i]+"\"},";
          //               }
          //             jsonText=jsonText.substr(0,jsonText.length-1);
          //             jsonText+="],";
          //           jsonText+="\"specificationsText\":\""+specificationsText+"\",";
          //           jsonText+="\"goods_id\":\""+goods_id+"\",";
          //           jsonText+="\"buying_price\":\""+buying_price+"\",";
          //           jsonText+="\"buy_count\":\""+buy_count+"\"";

          //         jsonText+="}";
                  
          //       jsonText+="],"
          //           jsonText+="\"buyer_message\":\""+buyer_message+"\",";
          //           jsonText+="\"courier_fees\":\"0.00\",";
          //           jsonText+="\"goods_price\":\""+goods_price+"\"";
          //     jsonText+="}";
          //     jsonText+="]";
          //      console.log(jsonText)
               // var order_obj={};
               //    order_obj.jsonText=jsonText;
               //    order_obj.sum_price=sum_price;
               //    order_obj.shipping_address_id=shipping_address_id;
               //    order_obj.user_id=user_id;
               // $.ajax({
               //    url: apiUrl+"/DataMobile/goods.ashx?Action=OrderAdd",
               //    type: "post",
               //    data:order_obj,
               //    dataType: "json",
               //    success: function (datajson){
               //      console.log(datajson);
               //      if(datajson.code=="100"){
               //      var result=datajson.data[0];
               //        alert(datajson.message);
               //        localStorage.setItem('order_id',result.id);
               //        localStorage.setItem('sum_price',result.sum_price);
               //        localStorage.setItem('sub_account',sub_account);
               //        localStorage.setItem('merchants_user_id',merchants_user_id);
               //        localStorage.setItem('account',account);
               //        localStorage.setItem('trade_mem_code',trade_mem_code);
               //        location.href="选择支付方式.html";
                      
               //      }
                      
               //    }
               //  }); 
      }
  }
});

$('.td-item').hover(function() {
    $(this).find('.edit').show();
},function() {
    $(this).find('.edit').hide();
})


// $.ajax({
//                   url: apiUrl+"/DataMobile/goods.ashx?Action=ShippingAddressUpdate",
//                   type: "get",
//                   data:obj,
//                   dataType: "json",
//                   success: function (datajson){
//                       console.log(datajson.data[0].merchantsin[0]);
//                       if(datajson.code=="100"){
//                           _this.order_list=datajson.data[0].merchantsin;

//                           //_this.totalPrice='';
//                       }
                      
//                   }
//                 }); 
