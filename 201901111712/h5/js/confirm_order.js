var vm=new Vue({
  el:'#app',
  data:{
  	addressList:[],
    shopList:[],
    sumPrice:"",
    msg:"",
    payState:false,
    payModeState:false,
    payModeWX:false,//微信支付
    payModeWallet:false,//钱包支付
    payModeText:"钱包支付",
    paramObj:{},
    qrCode:'',
    keys: [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0,'&times;'],
    // pwdList:[],
    pwdObj:{
      one:'',
      two:'',
      three:'',
      four:'',
      five:'',
      six:''
    },
    balance:0,
    //pwd:"",
    param:{//交易参数
      PayeesSubAccount:[],//卖家收款子账号账户
      OtherUserId:[],//卖家Userid（商家）
      account:[],//卖家手机号码（商家）
      PayeesTradeMemCode:[],//卖家（收款方）交易会员代码
      order_id:[],//卖家（收款方）交易会员代码
      order_num:[],//订单编号
      sum_price:""//订单编号
    }
  },
  mounted(){
  	this.$nextTick(function(argument) {
      this.orderList();
      this.selectBalance();
  	})
  },
  methods:{
      /*确认订单列表*/
      orderList:function(){
        //{"code":"100","message":"查询成功","data":[{"ShippingAddress":[{"shipping_address_id":"1cd54279-0630-4090-a275-943a631ff9d8","contact_people":"老子","contact_tel":"17311111111","area":"安徽省合肥市","detailed_address":"人民路1号","is_default_address":"1"}],"merchantsin":[{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","SubAccount":"200201808000004","TradeMemcode":"0000139759","user_id":"07cac2ce-5a7c-46d0-9aa9-c00af9339a32","account":"14752214432","GoodsList":[{"GoodsSpecificationList":[{"goods_specification_category_id":"5b1435a2-0d28-4c99-af29-cc276c73de05"},{"goods_specification_category_id":"c777c18d-b1bb-44e0-b8f1-b0a7a0b6a488"},{"goods_specification_category_id":"f8f83d4a-a9af-4295-b467-5b676d8b898f"},{"goods_specification_category_id":"864f3561-6aab-4917-af59-16a8bd6fd665"}],"goods_id":"31fb769c-7e4d-4a02-8528-14757b45d1f8","name":"安卓商品2次","icon":"","buying_price":"0.10","buy_count":"1","courier_fees":"0.00","specificationsText":"颜色分类:白色,鞋码:35"}],"goods_price":"0.10","courier_fees":"0.00","goods_count":"1","goods_sum_price":"0.10"}],"sum_price":"0.10"}]}
        
        //{"code":"100","message":"查询成功","data":[{"ShippingAddress":[{"shipping_address_id":"1cd54279-0630-4090-a275-943a631ff9d8","contact_people":"老子","contact_tel":"17311111111","area":"安徽省合肥市","detailed_address":"人民路1号","is_default_address":"1"}],"merchantsin":[{"merchants_in_id":"4a7e0182-371c-4ad9-995d-3f5db5730332","shop_name":"店铺名称","SubAccount":"200201808881168","TradeMemcode":"0000142611","user_id":"d98d22c2-4667-4fef-920b-9b51db57d367","account":"17717040720","GoodsList":[{"GoodsSpecificationList":[{"goods_specification_category_id":"2c415ecf-1731-43f8-9154-df529f2ef6c6"},{"goods_specification_category_id":"d698e392-c97f-4072-a621-bcbe1e0c46bb"},{"goods_specification_category_id":"6d0de03a-62d4-488d-99c1-a7acf33e6727"},{"goods_specification_category_id":"6143d9f4-b47e-42aa-9d7f-f9efffba13ed"}],"goods_id":"3beedbd2-bb26-4bd8-9af4-5a602f564e13","name":"匡威（帆布鞋）","icon":"/Files/Goods/201812/25f1c1cd1fe34342896f8f9e09731ad4.jpg","buying_price":"0.01","buy_count":"6","courier_fees":"0.00","specificationsText":"鞋码:颜色分类:38,白色"}],"goods_price":"0.06","courier_fees":"0.00","goods_count":"1","goods_sum_price":"0.06"},{"merchants_in_id":"a9b8dc80-fa86-4e78-9118-894ddf930734","shop_name":"枫木","SubAccount":"200201808780984","TradeMemcode":"0000143289","user_id":"0cbc4f22-8585-4d3d-b089-38ec35ebb56d","account":"17301764656","GoodsList":[{"GoodsSpecificationList":[{"goods_specification_category_id":"6ae9b4b1-297a-47a2-ac73-2df0cceeb98d"},{"goods_specification_category_id":"7a701a86-8397-4323-b568-a4f4369b7348"}],"goods_id":"85003b04-c1d9-4497-b0ab-95a191568c4a","name":"匡威帆布鞋","icon":"/Files/Goods/201812/8dcbe37a63b742359c83efbdacd977fd.jpg","buying_price":"0.01","buy_count":"1","courier_fees":"0.00","specificationsText":"38,黑色"}],"goods_price":"0.01","courier_fees":"0.00","goods_count":"1","goods_sum_price":"0.01"}],"sum_price":"0.07"}]}
        var _this=this;
        var jsonText=localStorage.spt;

        var user_id=GetUserId();
        var obj={};
            obj.user_id= user_id;
            obj.jsonText=jsonText;
        $.ajax({
          url: IP+"/DataMobile/goods.ashx?Action=GoodsSettlement",
          type: "get",
          data:obj,
          dataType: "json",
          success: function (datajson){
            
              console.log(datajson.data[0].merchantsin);
              if(datajson.code=="100"){
                 _this.addressList=datajson.data[0].ShippingAddress;
                 var shoplist=datajson.data[0].merchantsin;
                     shoplist.forEach(function(shop) {
                       shop.buyer_messages="选填：填写内容与商家确认";
                       shop.buyer_message="";
                       _this.param.PayeesSubAccount.push(shop.SubAccount);
                       _this.param.OtherUserId.push(shop.user_id);
                       _this.param.account.push(shop.account);
                       _this.param.PayeesTradeMemCode.push(shop.TradeMemcode);
                     })
                 _this.shopList=shoplist;
                 _this.sumPrice=datajson.data[0].sum_price;

              }
              if(datajson.code=="101"){
                  alert(datajson.message);
              }
          }
        }); 
      },
      /*确认订单列表*/
      payMode:function(){
        var _this=this;
        _this.payState=!_this.payState;
        _this.payModeState=!_this.payModeState;
      },
      payModeClose:function(type){
        var _this=this;
        _this.payModeState=!_this.payModeState;
        _this.payState=!_this.payState;
        if(type==1){
          _this.payModeText="钱包支付";
        }
        if(type==2){
          _this.payModeText="微信支付";
        }
      },
      payModeCloseAll:function(){
        var _this=this;
        _this.payState=!_this.payState;        
      },
      payModePwd:function(){
        var _this=this;
        _this.payModeWallet=!_this.payModeWallet;
        _this.payState=!_this.payState;
      },
      saveOrder:function(){
        var _this=this;
        var jsonList = [];
        //var shop_list=_this.shopList[0];
          _this.shopList.forEach(function(shop){
            var shopObj={};
              shopObj.merchants_in_id=shop.merchants_in_id;
              shopObj.courier_fees= shop.courier_fees; 
              shopObj.buyer_message= shop.buyer_message?shop.buyer_message:"选填：填写内容与商家确认"; 
              shopObj.goods_price=  shop.goods_price; 
              var goodsList=[];
              var goodsobj={};
                  goodsList.push(goodsobj);
                  var spts=[];
                  var goods=shop.GoodsList;                   
                      goods.forEach(function(item){                                     
                        item.GoodsSpecificationList.forEach(function(good) {
                          var sptobj={};                       
                            sptobj.goods_specification_category_id=good.goods_specification_category_id;
                            spts.push(sptobj)
                        })

                      goodsobj.goods_id=item.goods_id;  
                      goodsobj.buy_count=item.buy_count;  
                      goodsobj.buying_price=item.buying_price;  
                      goodsobj.specificationsText=item.specificationsText;  
                      goodsobj.specifica= spts; 
                      })                   
           
              shopObj.goods=goodsList;
              jsonList.push(shopObj)
          })
          
          var jsonText=JSON.stringify(jsonList)
         
          var order_obj={};
              order_obj.jsonText=jsonText;
              order_obj.sum_price=_this.sumPrice;
              order_obj.shipping_address_id=_this.addressList[0].shipping_address_id;
              order_obj.shopping_car_id=localStorage.shopping_car_id;
              order_obj.user_id=GetUserId();

              $.ajax({
                url: IP+"/DataMobile/goods.ashx?Action=OrderAdd",
                type: "post",
                data:order_obj,
                dataType: "json",
                success: function (datajson){
                  //{"code":"100","message":"订单生成成功","data":[{"id":"23dd12b6-599a-4900-9293-886acf006847","order_number":"201901071645385285782","sum_price":"0.10","state":"1"}]}
                 console.log(datajson)
                 //卖家
                 //SubAccount  "200201808780984"
                 //TradeMemcode "0000143289"
                 //account "17301764656"
                 //user_id "0cbc4f22-8585-4d3d-b089-38ec35ebb56d"

                 //订单id
                 //PayPassWord
                 
                  if(datajson.code=="100"){
                      var result=datajson.data[0];


                      _this.param.order_id.push(result.id);
                      _this.param.order_num.push(result.order_number);
                      _this.param.sum_price=parseFloat(result.sum_price)*100;
                      // var sub_account=localStorage.sub_account;
                      // var trade_mem_code=localStorage.trade_mem_code;
                      // _this.payState=!_this.payState;
                      // _this.paramObj.id=result.id;
                      // _this.paramObj.total_fee=parseFloat(result.sum_price)*100;
                      // _this.paramObj.otherUserId=shop.user_id;
                      // _this.paramObj.SubAccount=sub_account;
                      // _this.paramObj.TradeMemcode=trade_mem_code;

                      // _this.paramObj.payeesSubAccount=shop.SubAccount;
                      // _this.paramObj.payeesTradeMemCode=shop.TradeMemcode;
                      _this.payState=!_this.payState;
                           
                  }                  
              }
            });
      },
      walletPayOpen:function(){
        console.log("打开钱包支付")
        var _this=this;
        _this.payModeWallet=!_this.payModeWallet;
        _this.payState=!_this.payState;
      },
      walletPay:function(pwd){
        var _this=this;
        var money=_this.balance;
        if(money<_this.sumPrice){
          alert("余额不足，请充值");
          return;
        }
        

       if(pwd===""||pwd===undefined||pwd===null){
        
        return;
       }
        var obj={};
          /*买家的信息*/
          obj.loginUserId=GetUserId();//买家用户id
          obj.PaySubAccount=GetCookie('PaySubAccount');// 买家付款子账号账户
          obj.TradeMemcode=GetCookie('TradeMemcode'); // 买家交易会员代码
          
          /*卖家的信息*/
          obj.PayeesSubAccount=_this.param.PayeesSubAccount.toString();// 卖家收款子账号账户
          obj.OtherUserId=_this.param.OtherUserId.toString();//卖家Userid（商家）
          obj.account=_this.param.account.toString();//卖家手机号
          obj.PayeesTradeMemCode=_this.param.PayeesTradeMemCode.toString();//卖家（收款方）交易会员代码
          
          /**/
          obj.order_id=_this.param.order_id.toString();// 订单id
          obj.TradeAccount=_this.param.sum_price;// 交易金额  分
          obj.PayPassWord=pwd;// 支付密码

          $.ajax({
            url:IP+"/ThirdParty/HuaXia/HuaXiaHandler.ashx?Action=pay",
            type: "get",
            data:obj,
            dataType:'json',
            success:function(result){
              console.log(result)
              return;
              if(result.code=="100"){
                // alert("支付成功")
                // layer.msg(result.message);
                //layer.close(index);
                location.href="选择支付成功.html"
              }
            }

          })
      },
      selected:function(num) {
            var _this=this;
            if(num===11){
              num=0;
            }
            if(num===12){
              num="";
              _this.del();
            }
            if(_this.pwdObj.one===""){
              _this.pwdObj.one=num;             
            }else if(_this.pwdObj.two===""){
              _this.pwdObj.two=num;
            }else if(_this.pwdObj.three===""){
              _this.pwdObj.three=num;
            }
            else if(_this.pwdObj.four===""){
              _this.pwdObj.four=num;
            }
            else if(_this.pwdObj.five===""){
              _this.pwdObj.five=num;
            }else if(_this.pwdObj.six===""){
              _this.pwdObj.six=num;

            }else{

            }
            var pwd="";
             pwd+=_this.pwdObj.one;
             pwd+=_this.pwdObj.two;
             pwd+=_this.pwdObj.three;
             pwd+=_this.pwdObj.four;
             pwd+=_this.pwdObj.five;
             pwd+=_this.pwdObj.six;
            if(pwd.length===6){
              //alert(str)
              _this.walletPay(pwd);

            }                  
      },
      del:function(){
          var _this=this;
          if(_this.pwdObj.six || _this.pwdObj.six===0){
            _this.pwdObj.six="";
          }else if(_this.pwdObj.five || _this.pwdObj.five===0){
            _this.pwdObj.five="";
          }
          else if(_this.pwdObj.four || _this.pwdObj.four===0){
            _this.pwdObj.four="";
          }
          else if(_this.pwdObj.three || _this.pwdObj.three===0){
            _this.pwdObj.three="";
          }
          else if(_this.pwdObj.two || _this.pwdObj.two===0){
            _this.pwdObj.two="";
          }
          else if(_this.pwdObj.one || _this.pwdObj.one===0){
            _this.pwdObj.one="";
          }else{

          }
      },
      selectBalance:function(){
        var _this=this;
        var user_id=GetUserId();
        var sub_account=GetCookie('PaySubAccount');
        var trade_mem_code=GetCookie('TradeMemcode');
        var select_obj={};
          select_obj.loginUserId=user_id;
          select_obj.SubAccount=sub_account;
          select_obj.TradeMemcode=trade_mem_code;
        $.ajax({
              url: IP+"/ThirdParty/HuaXia/HuaXiaHandler.ashx?Action=selectBalance",
              type: "get",
              data:select_obj,
              dataType: "json",
              success: function (datajson){
                //{"?xml":{"@version":"1.0","@encoding":"GBK"},"CPMB2B":{"MessageData":{"Base":{"Version":"1.0","SignFlag":"1","SeverModel":"3"},"ResHeader":{"TransCodeId":"4636386531568354116","TransCode":"104020","Status":{"Code":"000000","Message":"交易成功"}},"DataBody":{"Account":"200201808780984","AccountName":null,"SubAccountMoney":"325","FreezeMoney":"4","Remark1":null,"Remark2":null}}}}               
                console.log(datajson);
                _this.balance=parseFloat(datajson.CPMB2B.MessageData.DataBody.SubAccountMoney/100);
                
              }
        }); 
      },
      WXCode:function() {
        var _this=this;
        var user_id=GetUserId();
        var param=_this.param;
     
        var obj={
            loginUserId:user_id,
            order_sn:param.order_id.toString(),
            total_fee:param.sum_price,
            pay_type:"1"
        };
        console.log(obj)
       
        $.ajax({
          url: IP1+"/ThirdParty/WX/WxPay.ashx?Action=QRCode",
          type: "get",
          data:obj,
          dataType: "json",
          success: function (datajson){
            
              console.log(datajson);
              if(datajson.result_code==="SUCCESS"){
                
                _this.qrCode="http://"+datajson.result;
              }
              
              
          }
        }); 
              
      },
      WXPay:function(){

        var _this=this;
       _this.WXCode();
        // var openids="";
        // var param=_this.paramObj;
        // console.log(param)
       
        // _this.H5Pay(openids,
        //   param.id,
        //   param.total_fee,
        //   param.otherUserId,
        //   param.SubAccount,
        //   param.TradeMemcode,
        //   param.payeesSubAccount,
        //   param.payeesTradeMemCode);
      },
      //调用微信支付
      /*
        id,订单id
        total_fee，订单总额
        otherUserId，商家用户id
        SubAccount, 子账号
        TradeMemcode, 交易会员代码
        payeesSubAccount, 商家子账户
        payeesTradeMemCode, 商家交易会员代码
      */
      H5Pay:function(openids,id,total_fee,otherUserId,SubAccount,TradeMemcode,payeesSubAccount,payeesTradeMemCode) {
        var ym="https://bird.ioliu.cn/v1?url=http://www.bjmc.shop/"
          $.ajax({
              type: "get",
              url: ym+"/ThirdParty/H5WX/wxh5.ashx?Action=WxPay",
              async: true,
              data: {
                  "openids": "",
                  "loginUserId": GetUserId(),
                  "order_sn": id,
                  "total_fee": total_fee,
                  "otherUserId": otherUserId,
                  "user_name": "",
                  "other_user_name": "",
                  "SubAccount": SubAccount,
                  "TradeMemCode": TradeMemcode,
                  "TradeAbstract": "",
                  "payeesSubAccount": payeesSubAccount,
                  "payeesTradeMemCode": payeesTradeMemCode,
                  
              },
              success: function (response) {
                //{"result_code":"SUCCESS","result":{"appid":"wxeea1e5da345dd2a5","partnerid":"1486489432","prepayid":"wx07164625032609802d28ba2f0449186271","mweb_url":"https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?prepay_id=wx07164625032609802d28ba2f0449186271&package=4112465096","noncestr":"FiNG5UWi3P7GL3BATVA4","sign":"4121BB156B0D6245E712566E450E31CD","timestamp":"1546850781","package":"Sign=WXPay"}}
               
                  //response = JSON.parse(response);

                  if (response.result_code == "SUCCESS") {
                      var item = response.result;
                      appid = item.appid;
                      noncestr = item.noncestr;
                      packages = item.package;
                      partnerid = item.partnerid;
                      sign = item.sign;
                      timestamp = item.timestamp;
                      var mweb_url = item.mweb_url;
                      //location.href=mweb_url;
                      //codingback(mweb_url)
                  }
                  else {
                      alertMessage(response.message);
                  }
              }
          })
      }
  }
})