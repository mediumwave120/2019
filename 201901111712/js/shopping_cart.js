new h_header().$mount('h-header');//把组件挂载到h-header标签上 
new h_footer().$mount('h-footer');//把组件挂载到h-footer标签上 
new h_login().$mount('h-login');//把组件挂载到h-login标签上 
var vm=new Vue({     
        el:'#app',     
        data: {         
        shopList: [],//商品列表         
        totalPrice: 0,//购物车总计
        showText: false,//显示         
        hideText: true,//隐藏         
        checkFlag: false, //购物车状态         
        selectNum: 0,         
        goodsArr: [],         
        checkeAll: false,
        total: 0,         
        abd:'haode',
        checks:true     
    },     
    filters: {         
        formatMoney: function (value) {
            return "￥ " + value.toFixed(2);         
        }     
    },     
    mounted: function () {
        this.$nextTick(function () {             
            this.getShoppingCartList();
            //this.goodsCollectlist();         
        });     
    },        
    methods: {         
        overShow:function(){},
        outHide:function(){},         
        //获取购物车列表         
        getShoppingCartList: function() {             
            var _this = this;             
            var url =IP+"/DataMobile/goods.ashx?Action=GetShoppingCarListByUserId";;
            var obj={};           
                obj.pageIndex=1;           
                obj.firstPageTime="";
                //obj.pageSize=1;
                obj.user_id=GetCookie('UserId')//0cbc4f22-8585-4d3d-b089-38ec35ebb56d";
                $.ajax({             
                    url: url,             
                    type: "get",             
                    data:obj,
                    dataType: "json",             
                    success: function (datajson){
                        //{"code":"100","firstPageTime":"2019/1/8 10:33:32","message":"查询成功","data":[{"merchants_in_id":"4a7e0182-371c-4ad9-995d-3f5db5730332","shop_name":"店铺名称","GoodsList":[{"shopping_car_id":"add339f5-1c91-4723-9b42-3f1572d416df","goods_count":"1","goods_id":"3beedbd2-bb26-4bd8-9af4-5a602f564e13","name":"匡威（帆布鞋）","is_soldout":"0","courier_fees":"0.00","icon":"/Files/Goods/201812/25f1c1cd1fe34342896f8f9e09731ad4.jpg","GoodsSpecificationList":[{"goods_specification_category_id":"2c415ecf-1731-43f8-9154-df529f2ef6c6"},{"goods_specification_category_id":"d698e392-c97f-4072-a621-bcbe1e0c46bb"},{"goods_specification_category_id":"6d0de03a-62d4-488d-99c1-a7acf33e6727"},{"goods_specification_category_id":"6143d9f4-b47e-42aa-9d7f-f9efffba13ed"}],"inventory":"130","buying_price":"0.01","specificationsText":"鞋码:38,颜色分类:白色"}],"goods_count":"1"},{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","GoodsList":[{"shopping_car_id":"1c82f71e-18a1-484a-9eae-30c703556c6c","goods_count":"2","goods_id":"31fb769c-7e4d-4a02-8528-14757b45d1f8","name":"安卓商品2次","is_soldout":"0","courier_fees":"0.00","icon":"","GoodsSpecificationList":[{"goods_specification_category_id":"f8f83d4a-a9af-4295-b467-5b676d8b898f"},{"goods_specification_category_id":"c777c18d-b1bb-44e0-b8f1-b0a7a0b6a488"},{"goods_specification_category_id":"5b1435a2-0d28-4c99-af29-cc276c73de05"},{"goods_specification_category_id":"864f3561-6aab-4917-af59-16a8bd6fd665"}],"inventory":"216","buying_price":"0.10","specificationsText":"颜色分类:白色,鞋码:35"}],"goods_count":"1"},{"merchants_in_id":"a9b8dc80-fa86-4e78-9118-894ddf930734","shop_name":"枫木","GoodsList":[{"shopping_car_id":"8c1084de-a0c9-4f43-819b-5b43eed09ada","goods_count":"1","goods_id":"85003b04-c1d9-4497-b0ab-95a191568c4a","name":"匡威帆布鞋","is_soldout":"0","courier_fees":"0.00","icon":"/Files/Goods/201812/8dcbe37a63b742359c83efbdacd977fd.jpg","GoodsSpecificationList":[{"goods_specification_category_id":"44425bc3-38ce-4ab7-b388-07e44c91cccd"},{"goods_specification_category_id":"7a701a86-8397-4323-b568-a4f4369b7348"},{"goods_specification_category_id":"f010d66b-9351-47dc-a764-e1650c9ab9e4"},{"goods_specification_category_id":"6ae9b4b1-297a-47a2-ac73-2df0cceeb98d"}],"inventory":"20","buying_price":"0.01","specificationsText":"颜色分类:黑色,鞋码:38"},{"shopping_car_id":"d73b1f3e-bbb2-4a64-819c-56d2ca2d0ff8","goods_count":"1","goods_id":"85003b04-c1d9-4497-b0ab-95a191568c4a","name":"匡威帆布鞋","is_soldout":"0","courier_fees":"0.00","icon":"/Files/Goods/201812/8dcbe37a63b742359c83efbdacd977fd.jpg","GoodsSpecificationList":[{"goods_specification_category_id":"6ae9b4b1-297a-47a2-ac73-2df0cceeb98d"},{"goods_specification_category_id":"7a701a86-8397-4323-b568-a4f4369b7348"}],"inventory":"20","buying_price":"0.01","specificationsText":"黑色,38"},{"shopping_car_id":"341fcd24-4ddb-41d6-9dbe-d2d721fd7686","goods_count":"1","goods_id":"85003b04-c1d9-4497-b0ab-95a191568c4a","name":"匡威帆布鞋","is_soldout":"0","courier_fees":"0.00","icon":"/Files/Goods/201812/ea33116947cb466c8bcdad3671438163.jpg","GoodsSpecificationList":[{"goods_specification_category_id":"f010d66b-9351-47dc-a764-e1650c9ab9e4"},{"goods_specification_category_id":"44425bc3-38ce-4ab7-b388-07e44c91cccd"},{"goods_specification_category_id":"0ee22aa6-61bf-412c-9844-26322ad5b136"},{"goods_specification_category_id":"7a701a86-8397-4323-b568-a4f4369b7348"}],"inventory":"20","buying_price":"0.01","specificationsText":"颜色分类:黑色,鞋码:37"}],"goods_count":"3"},{"merchants_in_id":"db43698c-9a88-4769-ab28-c56ee37f4346","shop_name":"毛毛的店","GoodsList":[{"shopping_car_id":"14dd7136-c227-4fa9-b3da-4fe458c5e1cf","goods_count":"3","goods_id":"605a2085-63ba-48ba-816c-5a8e4d192d8b","name":"大美盛年","is_soldout":"0","courier_fees":"0.00","icon":"da90f42f2b91803a1d55b063c.jpg","GoodsSpecificationList":[],"inventory":"92","buying_price":"0.01","specificationsText":""},{"shopping_car_id":"5fd27bb3-f46d-4f22-9c9e-42be737275b0","goods_count":"3","goods_id":"70c70d88-62bc-4c8a-a9a1-2373f240a07e","name":"大美盛年","is_soldout":"0","courier_fees":"0.00","icon":"/Files/Goods/201812/60881534250347eb9e8e3292b1b74eec.jpg","GoodsSpecificationList":[],"inventory":"98","buying_price":"0.01","specificationsText":""}],"goods_count":"2"}]}
                        
                        if(datajson.code=="101"){                    
                            $('#preview').fadeIn();
                            $('#preview').click(function(e){                         
                            if (e.target.nodeName== 'SECTION') {                             
                                $('#preview').fadeOut(500);
                            }                     
                        });                
                    }
                    //layer.msg(datajson.message);                 
                    console.log(datajson)
                    if(datajson.code=="100"){                                     
                        var result=datajson.data;
                        result.forEach(function(shop,index1){                          
                        //给商家添加一个属性
                        shop.hidden=true;                         
                        var shopList=shop.GoodsList;                          
                        shopList.forEach(function(goods,index2){
                            goods.checkFlag=true;
                            shop.hidden =  shop.hidden && goods.is_soldout=='1';
                            goods.checkFlag =  goods.checkFlag && goods.is_soldout=='1';
                        })
                    })
                    _this.shopList=result;
                }
            }
          });  
        },
        //商品数量加减
        changeMoney: function (item, index,pos) {
            var _this=this;
            var inventory=parseInt(item.inventory==""?0:item.inventory);
            var numArr=$('.td-amount').find('.text-amount');
            var shoppingCarId=$('.td-amount').find('.text-amount')//.attr('shopping-car-id1');
            var num=0;
            for (var j = 0; j < shoppingCarId.length; j++) {
                if(item.shopping_car_id==$(shoppingCarId[j]).attr('shopping-car-id1')){
                    num=j;
                    break;
                }
            }
            num=parseInt($(numArr[num]).val());
            var shop=$('.shop-list');
            if (index > 0) {
                item.goods_count++;
                if(num>inventory-1){
                    alert("库存不足");                    
                    item.goods_count=inventory;
                    return;
                }
            } else {
                item.goods_count--;
                if (item.goods_count < 1) {
                    item.goods_count = 1;
                }
            }
            this.calcTotalPrice();
        },
        goodsCollectlist(){
            var _this=this;
            var url = IP+"/DataMobile/user.ashx?Action=GetGoodsCollectListByUserId";
            var obj={};
            obj.user_id=GetCookie('UserId');//"0cbc4f22-8585-4d3d-b089-38ec35ebb56d";
            obj.pageIndex=1;
            obj.pageSize=10;
            var goods_id=[];
            $.ajax({
                url: url,
                type: "get",
                data:obj,
                dataType: "json",
                success: function (datajson){
                    //console.log(datajson);
                    var result=datajson.data;
                    if(datajson.code=="100"){
                        for (var i = 0; i < result.length; i++) {
                            goods_id.push(result[i].goods_id);;
                            // console.log(result[i].goods_id);
                        }
                    }
                   
                }
            }); 
            return goods_id;
        },
        goodsCollectAdd:function(goods_id){
          var _this=this;
          var url = IP+"/DataMobile/goods.ashx?Action=GoodsCollectAdd";
          var obj={};
          obj.user_id=GetCookie('UserId');//"0cbc4f22-8585-4d3d-b089-38ec35ebb56d";
          obj.goods_id=goods_id;
          $.ajax({
            url: url,
            type: "get",
            data:obj,
            dataType: "json",
            success: function (datajson){
                var favorite=$('.favorite');
                if(datajson.code=="100"){
                    for (var i = 0; i < favorite.length; i++) {
                        var page_goods_id=$(favorite[i]).attr('favorite');
                        if(goods_id==page_goods_id){
                            $(favorite[i]).text("移chu收藏");
                        }
                        
                    }
                    layer.msg(datajson.message);
                }
                if(datajson.code=="101"){
                    for (var i = 0; i < favorite.length; i++) {
                        var page_goods_id=$(favorite[i]).attr('favorite');
                        if(goods_id==page_goods_id){
                            $(favorite[i]).text("移出收藏");
                        }
                        
                    }
                    layer.msg("已经收藏过了")
                }
               
            }
          });  
        },
        selectShop: function (shop) { // 店铺全选/全不选。更新店铺所有商品状态，然后通知店铺及购物车更新状态。
            var _this = this;           
            if (shop.checkFlag) { // 店铺当前为选中的情况，将所有商品置为全不选
                shop.GoodsList.forEach(function (good, index) {
                    if(good.is_soldout=='0'){
                        good.checkFlag = false;
                        //_this.joinJson(shop);
                    }
                })
                shop.checkFlag = false;
            } else {
                shop.GoodsList.forEach(function (good, index) {
                    //没有下架
                    if(good.is_soldout=='0'){
                        good.checkFlag = true;
                    }

                })
                shop.checkFlag = true;
            }
            
            _this.noteToShop(shop);

            //console.log(_this.checkFlag);
            console.log(_this.shopList);
        },
        selectGoods: function (selectGoods, selectShop) { // 商品选择/不选事件。只更新本商品状态，然后通知店铺及购物车更新状态。
            if(selectGoods.is_soldout=='0'){
                selectGoods.checkFlag = !selectGoods.checkFlag;
                this.noteToShop(selectShop);
                //console.log(selectGoods)
            }
        },
        checkedAll: function () { // 购物车全选/全不选事件。只更新所有商品状态，然后通知店铺及购物车更新状态。
            var _this = this;

            if (_this.checkFlag) { // 购物车当前选中状态，则将所有商品置为全不选
                _this.shopList.forEach(function (shop) {
                    shop.GoodsList.forEach(function (good) {
                        good.checkFlag = false;
                    });
                    _this.noteToShop(shop);
                });
            } else {
                _this.shopList.forEach(function (shop) {
                    shop.GoodsList.forEach(function (good,index) {
                        if(good.is_soldout=="0"){
                            good.checkFlag = true;

                        }
                    });
                    _this.noteToShop(shop);
                });
            }
        },
        noteToShop: function (shop) { // 通知店铺更新状态。根据店铺所有商品状态来更新店铺状态。再通知购物车更新状态。
            var _this = this;
            shop.checkFlag = true;
            for (let i = 0; i < shop.GoodsList.length; i++) {
                const good = shop.GoodsList[i];
                if (!good.checkFlag) {
                    shop.checkFlag = false;
                    break;
                }else{
                    //console.log(good)

                }
            }
            _this.noteToCart();
        },
        noteToCart: function () { // 通知购物车更新状态。根据购物车内所有店铺的状态来更新购物车状态。
            var _this = this;
            _this.checkFlag = true;
            for (let i = 0; i < _this.shopList.length; i++) {
                const shop = _this.shopList[i];
                if (!shop.checkFlag) {
                    _this.checkFlag = false;
                    break;
                }
            }

            this.calcTotalPrice();
        },
        calcTotalPrice: function () {
            var _this = this;
            _this.totalPrice = 0;
            this.shopList.forEach(function (shop, index) {
                var goodsList = shop.GoodsList;
                goodsList.forEach(function (goods, index) {
                   if(goods.is_soldout=="0"){

                        if (goods.checkFlag) {
                            _this.totalPrice += goods.buying_price * goods.goods_count;
                        }
                   }
                })


            })
        },
        delGoods: function (shopping_car_id) {         
            var _this=this;
            var url = IP+"/DataMobile/goods.ashx?Action=ShoppingCarDelete&user_id="+GetCookie('UserId')+"&shopping_car_id="+shopping_car_id;
            $.ajax({
                url: url,
                type: "get",
                dataType: "json",
                success: function (datajson){
                    console.log(datajson);
                    //layer.msg(datajson.message);
                    if(datajson.code=="100"){
                        vm.getShoppingCartList();
                    }
                }
              });  
        },
        deleteSelected:function(){
            var _this=this;
            var url = IP+"/DataMobile/goods.ashx?Action=ShoppingCarDelete&user_id="+GetCookie('UserId')+"&shopping_car_id=";
            var shop_list=$('.shop-list');
            for (var i = 0; i < shop_list.length; i++) {
                //判断店铺是否被选中
                var goods=$(shop_list[i]).find('.goods-item>ul');
                for (var j = 0; j < goods.length; j++) {
                    if($(goods[j]).find('span').hasClass('check')){
                        var id=$(goods[j]).attr('shopping-car-id');
                        console.log(id)
                        var URL=url+id;
                        $.ajax({
                            url: URL,
                            type: "get",
                            dataType: "json",
                            success: function (datajson){
                                console.log(datajson);
                                //layer.msg(datajson.message);
                                if(datajson.code=="100"){
                                    vm.getShoppingCartList();
                                }
                        }
                      });
                    }
                }

            }
        },
        balance:function(){
            var _this=this;

            var shop=$('.shop-list');
            //购买总价
            var sum_price=0;//$('.sum-price').text();
            var shipping_car_id="";
            var jsonText="";
             jsonText+="[";
            for (var i = 0; i < shop.length; i++) {

                jsonText+="{";
                var shop_id=$(shop[i]).find('.goods-box a').attr('merchants-in-id');
                //判断店铺是否被选中
                    var goods=$(shop[i]).find('.goods-item>ul');
                if($(shop[i]).find('.goods-box>span').hasClass('check')){
                    jsonText+="\"merchants_in_id\":\""+shop_id+"\",";
                    if(goods.length>0){

                        jsonText+="\"goods\":";
                            jsonText+="[";
                            for (var j = 0; j < goods.length; j++) {
                                if($(goods[j]).attr('is-soldout')=='0'){
                                    if($(goods[j]).find('span').hasClass('check')){
                                        jsonText+='{';
                                        console.log('if',$(goods[j]).attr('goods-id'));
                                        shipping_car_id+=$(goods[j]).attr('shopping-car-id')+',';
                                        jsonText+="\"goods_id\":\""+$(goods[j]).attr('goods-id')+"\",";
                                        jsonText+="\"buy_count\":\""+$(goods[j]).find('.td-amount>input').val()+"\",";
                                        jsonText+="\"buying_price\":\""+$(goods[j]).find('.td-price>span').text()+"\",";
                                        jsonText+="\"courier_fees\":\"0.00\",";
                                        jsonText+="\"specifica\":";
                                            var category_id=$(goods[j]).find('.td-check>div');
                                            if(category_id.length>0){

                                                jsonText+="[";
                                                for (var k = 0; k < category_id.length; k++) {
                                                    jsonText+='{';
                                                    jsonText+="\"goods_specification_category_id\":\""+$(category_id[k]).attr('goods-specification-category-id')+"\"";    
                                                    jsonText+='},';
                                                }
                                                jsonText=jsonText.substr(0,jsonText.length-1); 
                                                jsonText+="]";
                                            }else{
                                                jsonText+="[]";
                                            }
                                        jsonText+="},";
                                    }
                                }
                            }
                            if(jsonText.charAt(jsonText.length-1)==='['){
                                jsonText+="[";
                            }
                            jsonText=jsonText.substr(0,jsonText.length-1);
                            jsonText+="]";
                    }
                }else{
                    jsonText+="\"merchants_in_id\":\""+shop_id+"\",";
                    if(goods.length>0){

                        jsonText+="\"goods\":";
                            jsonText+="[";
                            for (var j = 0; j < goods.length; j++) {
                                if($(goods[j]).attr('is-soldout')=='0'){
                                    if($(goods[j]).find('span').hasClass('check')){
                                        jsonText+='{';
                                        console.log('else',$(goods[j]).attr('goods-id'))
                                        shipping_car_id+=$(goods[j]).attr('shopping-car-id')+',';
                                        jsonText+="\"goods_id\":\""+$(goods[j]).attr('goods-id')+"\",";
                                        jsonText+="\"buy_count\":\""+$(goods[j]).find('.td-amount>input').val()+"\",";
                                        jsonText+="\"buying_price\":\""+$(goods[j]).find('.td-price>span').text()+"\",";
                                        jsonText+="\"courier_fees\":\"0.00\",";
                                        jsonText+="\"specifica\":";
                                            var category_id=$(goods[j]).find('.td-check>div');
                                            if(category_id.length>0){

                                                jsonText+="[";
                                                for (var k = 0; k < category_id.length; k++) {
                                                    jsonText+='{';
                                                    jsonText+="\"goods_specification_category_id\":\""+$(category_id[k]).attr('goods-specification-category-id')+"\"";    
                                                    jsonText+='},';
                                                }
                                                jsonText=jsonText.substr(0,jsonText.length-1); 
                                                jsonText+="]";
                                            }else{
                                                jsonText+="[]";
                                            }
                                        jsonText+="},";
                                    }
                                }
                            }
                            if(jsonText.charAt(jsonText.length-1)==='['){
                                jsonText+="[";
                            }
                            jsonText=jsonText.substr(0,jsonText.length-1);
                            jsonText+="]";
                    }
                }
                jsonText+="},";
            }
            jsonText=jsonText.substr(0,jsonText.length-1);
            jsonText+="]";
            //[{"merchants_in_id":"4a7e0182-371c-4ad9-995d-3f5db5730332","goods":[{"goods_id":"3beedbd2-bb26-4bd8-9af4-5a602f564e13","buy_count":"1","buying_price":"0.01","courier_fees":"0.00","specifica":[{"goods_specification_category_id":"2c415ecf-1731-43f8-9154-df529f2ef6c6"},{"goods_specification_category_id":"d698e392-c97f-4072-a621-bcbe1e0c46bb"},{"goods_specification_category_id":"6d0de03a-62d4-488d-99c1-a7acf33e6727"},{"goods_specification_category_id":"6143d9f4-b47e-42aa-9d7f-f9efffba13ed"}]}]},{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","goods":[{"goods_id":"31fb769c-7e4d-4a02-8528-14757b45d1f8","buy_count":"2","buying_price":"0.10","courier_fees":"0.00","specifica":[{"goods_specification_category_id":"f8f83d4a-a9af-4295-b467-5b676d8b898f"},{"goods_specification_category_id":"c777c18d-b1bb-44e0-b8f1-b0a7a0b6a488"},{"goods_specification_category_id":"5b1435a2-0d28-4c99-af29-cc276c73de05"},{"goods_specification_category_id":"864f3561-6aab-4917-af59-16a8bd6fd665"}]}]},{"merchants_in_id":"a9b8dc80-fa86-4e78-9118-894ddf930734","goods":[{"goods_id":"85003b04-c1d9-4497-b0ab-95a191568c4a","buy_count":"1","buying_price":"0.01","courier_fees":"0.00","specifica":[{"goods_specification_category_id":"44425bc3-38ce-4ab7-b388-07e44c91cccd"},{"goods_specification_category_id":"7a701a86-8397-4323-b568-a4f4369b7348"},{"goods_specification_category_id":"f010d66b-9351-47dc-a764-e1650c9ab9e4"},{"goods_specification_category_id":"6ae9b4b1-297a-47a2-ac73-2df0cceeb98d"}]},{"goods_id":"85003b04-c1d9-4497-b0ab-95a191568c4a","buy_count":"1","buying_price":"0.01","courier_fees":"0.00","specifica":[{"goods_specification_category_id":"6ae9b4b1-297a-47a2-ac73-2df0cceeb98d"},{"goods_specification_category_id":"7a701a86-8397-4323-b568-a4f4369b7348"}]},{"goods_id":"85003b04-c1d9-4497-b0ab-95a191568c4a","buy_count":"1","buying_price":"0.01","courier_fees":"0.00","specifica":[{"goods_specification_category_id":"f010d66b-9351-47dc-a764-e1650c9ab9e4"},{"goods_specification_category_id":"44425bc3-38ce-4ab7-b388-07e44c91cccd"},{"goods_specification_category_id":"0ee22aa6-61bf-412c-9844-26322ad5b136"},{"goods_specification_category_id":"7a701a86-8397-4323-b568-a4f4369b7348"}]}]},{"merchants_in_id":"db43698c-9a88-4769-ab28-c56ee37f4346","goods":[{"goods_id":"605a2085-63ba-48ba-816c-5a8e4d192d8b","buy_count":"3","buying_price":"0.01","courier_fees":"0.00","specifica":[]},{"goods_id":"70c70d88-62bc-4c8a-a9a1-2373f240a07e","buy_count":"3","buying_price":"0.01","courier_fees":"0.00","specifica":[]}]}]
            
            //将json字符串转换成json对象
            var json=JSON.parse(jsonText);
            var arr=[];
            for (var i = 0; i < json.length; i++) {
                if(json[i].goods.length>0){
                    //把goods的长度大于0的元素添加到新数组
                    arr.push(json[i]);
                }
            }
            console.log(arr)
            var str_json=JSON.stringify(arr);
            shipping_car_id=shipping_car_id.substr(0,shipping_car_id.length-1);
            localStorage.setItem('jsonText',str_json);
            localStorage.setItem('shippingCarId',shipping_car_id);
            location.href="order.html";
        },
        joinJson: function(shop) {
           
        }        
    }
});


