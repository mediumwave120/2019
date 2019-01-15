var vm=new Vue({     
    el:'#app',     
    data: {         
        shopList: [],//购物车列表         
        totalPrice: 0,//购物车总计
        shop:{
            shopCheck:false
        },
        goods:{
            goodsCheck:false
        },
        checkeAll: false
    },     
    filters: {         
        formatMoney: function (value) {
            return "￥ " + value.toFixed(2);         
        }     
    },     
    mounted: function () {
        this.$nextTick(function () {             
            this.getShoppingCartList();        
        });     
    },        
    methods: {            
        //获取购物车列表         
        getShoppingCartList: function() { 
        //{"data":{"code":"100","firstPageTime":"2019/1/7 16:21:25","message":"查询成功","data":[{"merchants_in_id":"4a7e0182-371c-4ad9-995d-3f5db5730332","shop_name":"店铺名称","GoodsList":[{"shopping_car_id":"add339f5-1c91-4723-9b42-3f1572d416df","goods_count":"1","goods_id":"3beedbd2-bb26-4bd8-9af4-5a602f564e13","name":"匡威（帆布鞋）","is_soldout":"0","courier_fees":"0.00","icon":"/Files/Goods/201812/25f1c1cd1fe34342896f8f9e09731ad4.jpg","GoodsSpecificationList":[{"goods_specification_category_id":"2c415ecf-1731-43f8-9154-df529f2ef6c6"},{"goods_specification_category_id":"d698e392-c97f-4072-a621-bcbe1e0c46bb"},{"goods_specification_category_id":"6d0de03a-62d4-488d-99c1-a7acf33e6727"},{"goods_specification_category_id":"6143d9f4-b47e-42aa-9d7f-f9efffba13ed"}],"inventory":"130","buying_price":"0.01","specificationsText":"鞋码:38,颜色分类:白色"}],"goods_count":"1"},{"merchants_in_id":"a9b8dc80-fa86-4e78-9118-894ddf930734","shop_name":"枫木","GoodsList":[{"shopping_car_id":"8c1084de-a0c9-4f43-819b-5b43eed09ada","goods_count":"1","goods_id":"85003b04-c1d9-4497-b0ab-95a191568c4a","name":"匡威帆布鞋","is_soldout":"0","courier_fees":"0.00","icon":"/Files/Goods/201812/8dcbe37a63b742359c83efbdacd977fd.jpg","GoodsSpecificationList":[{"goods_specification_category_id":"44425bc3-38ce-4ab7-b388-07e44c91cccd"},{"goods_specification_category_id":"7a701a86-8397-4323-b568-a4f4369b7348"},{"goods_specification_category_id":"f010d66b-9351-47dc-a764-e1650c9ab9e4"},{"goods_specification_category_id":"6ae9b4b1-297a-47a2-ac73-2df0cceeb98d"}],"inventory":"20","buying_price":"0.01","specificationsText":"颜色分类:黑色,鞋码:38"},{"shopping_car_id":"d73b1f3e-bbb2-4a64-819c-56d2ca2d0ff8","goods_count":"1","goods_id":"85003b04-c1d9-4497-b0ab-95a191568c4a","name":"匡威帆布鞋","is_soldout":"0","courier_fees":"0.00","icon":"/Files/Goods/201812/8dcbe37a63b742359c83efbdacd977fd.jpg","GoodsSpecificationList":[{"goods_specification_category_id":"6ae9b4b1-297a-47a2-ac73-2df0cceeb98d"},{"goods_specification_category_id":"7a701a86-8397-4323-b568-a4f4369b7348"}],"inventory":"20","buying_price":"0.01","specificationsText":"黑色,38"},{"shopping_car_id":"341fcd24-4ddb-41d6-9dbe-d2d721fd7686","goods_count":"1","goods_id":"85003b04-c1d9-4497-b0ab-95a191568c4a","name":"匡威帆布鞋","is_soldout":"0","courier_fees":"0.00","icon":"/Files/Goods/201812/ea33116947cb466c8bcdad3671438163.jpg","GoodsSpecificationList":[{"goods_specification_category_id":"f010d66b-9351-47dc-a764-e1650c9ab9e4"},{"goods_specification_category_id":"44425bc3-38ce-4ab7-b388-07e44c91cccd"},{"goods_specification_category_id":"0ee22aa6-61bf-412c-9844-26322ad5b136"},{"goods_specification_category_id":"7a701a86-8397-4323-b568-a4f4369b7348"}],"inventory":"20","buying_price":"0.01","specificationsText":"颜色分类:黑色,鞋码:37"}],"goods_count":"3"},{"merchants_in_id":"db43698c-9a88-4769-ab28-c56ee37f4346","shop_name":"毛毛的店","GoodsList":[{"shopping_car_id":"14dd7136-c227-4fa9-b3da-4fe458c5e1cf","goods_count":"3","goods_id":"605a2085-63ba-48ba-816c-5a8e4d192d8b","name":"大美盛年","is_soldout":"0","courier_fees":"0.00","icon":"da90f42f2b91803a1d55b063c.jpg","GoodsSpecificationList":[],"inventory":"92","buying_price":"0.01","specificationsText":""},{"shopping_car_id":"5fd27bb3-f46d-4f22-9c9e-42be737275b0","goods_count":"3","goods_id":"70c70d88-62bc-4c8a-a9a1-2373f240a07e","name":"大美盛年","is_soldout":"0","courier_fees":"0.00","icon":"/Files/Goods/201812/60881534250347eb9e8e3292b1b74eec.jpg","GoodsSpecificationList":[],"inventory":"98","buying_price":"0.01","specificationsText":""}],"goods_count":"2"}]},"status":200,"statusText":"OK","headers":{"content-type":"application/json; charset=utf-8"},"config":{"transformRequest":{},"transformResponse":{},"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1,"headers":{"Accept":"application/json, text/plain, */*"},"method":"get","params":{"pageIndex":1,"firstPageTime":"","user_id":"0cbc4f22-8585-4d3d-b089-38ec35ebb56d"},"url":"https://bird.ioliu.cn/v1?url=http://122.112.209.170:8088/DataMobile/goods.ashx?Action=GetShoppingCarListByUserId"},"request":{}} 
        	document.title="我的购物车";           
            var _this = this;             
            var url =IP+"/DataMobile/goods.ashx?Action=GetShoppingCarListByUserId";;
            var obj={};           
                obj.pageIndex=1;           
                obj.firstPageTime="";
                //obj.pageSize=1;
                obj.user_id=GetCookie('UserId')//0cbc4f22-8585-4d3d-b089-38ec35ebb56d";
                axios.get(url, {params:obj})
                .then(function (datajson) {
                    console.log(datajson)
	                var result=datajson.data.data;
					if(datajson.data.code=="101"){        
                		location.href="../h5/login.html";                                                         
                	}
	                if(datajson.data.code=="100"){                                     
		                    result.forEach(function(shop,index1){                          
		                    //给商家添加一个属性
		                    shop.shopCheck=true;                         
		                    var shopList=shop.GoodsList;                          
		                    shopList.forEach(function(goods,index2){
		                        goods.goodsCheck=true;
		                        shop.shopCheck =  shop.shopCheck && goods.is_soldout=='1';
		                        goods.goodsCheck =  goods.goodsCheck && goods.is_soldout=='1';
		                    })
		                })
		                _this.shopList=result;
		            }
				})
				.catch(function (error) {
					console.log(error);
				});
        },
        //商品数量加减
        changeMoney: function (item,index) {
            var _this=this;
            if(index>0){
                item.goods_count++;
                if(item.goods_count>item.inventory){
                    alert("库存不足");
                    item.goods_count=item.inventory;
                    return;
                }
            }else{
                item.goods_count--;
                if (item.goods_count < 1) {
                    item.goods_count = 1;
                }
            }
            _this.calcTotalPrice();
        },
        // 购物车全选/全不选事件。只更新所有商品状态，然后通知店铺及购物车更新状态。
        checkedAll: function () { 
            var _this = this;
            if (_this.checkeAll) { // 购物车当前选中状态，则将所有商品置为全不选
                _this.shopList.forEach(function (shop) {
                    shop.GoodsList.forEach(function (goods) {
                        goods.goodsCheck = false;
                    });
                    _this.noteToShop(shop);
                });
            } else {
                _this.shopList.forEach(function (shop) {
                    shop.GoodsList.forEach(function (goods,index) {
                        if(goods.is_soldout=="0"){
                            goods.goodsCheck = true;
                        }
                    });
                    _this.noteToShop(shop);
                });
            }
        },
        // 店铺全选/全不选。更新店铺所有商品状态，然后通知店铺及购物车更新状态。
        selectShop: function (shop) { 
            var _this = this;           
            if (shop.shopCheck) { // 店铺当前为选中的情况，将所有商品置为全不选
                shop.GoodsList.forEach(function (goods, index) {
                    if(goods.is_soldout==='0'){
                        goods.goodsCheck = false;
                    }
                })
                //shop.shopCheck = false;
            } else {
                shop.GoodsList.forEach(function (goods, index) {
                    //没有下架
                    if(goods.is_soldout==='0'){
                        goods.goodsCheck = true;
                    }

                })
                //shop.shopCheck = true;
            }
            //shop.shopCheck = !shop.shopCheck;
            _this.noteToShop(shop);
        },
        // 商品选择/不选事件。只更新本商品状态，然后通知店铺及购物车更新状态。
        selectGoods:function(goods,shop){
            var _this=this;
            goods.goodsCheck=!goods.goodsCheck;
            _this.noteToShop(shop);
        },
        // 通知店铺更新状态。根据店铺所有商品状态来更新店铺状态。再通知购物车更新状态。
        noteToShop:function(shop){
            var _this = this;
            
            //var shopping_car_id_new=[];
            shop.shopCheck = true;//统一重置店铺状态为选中

            for (let i = 0; i < shop.GoodsList.length; i++) {
                const goods = shop.GoodsList[i];
                if (!goods.goodsCheck) {
                    shop.shopCheck = false;
                    break;
                }
            }
            
            _this.noteToCart();
        },
        //通知购物车更新状态。根据购物车内所有店铺的状态来更新购物车状态。
        noteToCart:function(){
            var _this = this;
            _this.checkeAll = true;
            for (let i = 0; i < _this.shopList.length; i++) {
                const shop = _this.shopList[i];
                if (!shop.shopCheck) {

                    _this.checkeAll = false;
                    break;
                }
            }
            _this.calcTotalPrice();
        },
        //计算价格
        calcTotalPrice:function(){
            var _this = this;
            _this.totalPrice = 0;
            _this.shopList.forEach(function (shop, index) {
                var goodsList = shop.GoodsList;
                goodsList.forEach(function (goods, index) {
                   if(goods.is_soldout=="0"){
                        if (goods.goodsCheck) {
                            _this.totalPrice += goods.buying_price * goods.goods_count;                                                     
                        }
                   }
                })
            })
        },
        //结算
        balance:function(){
            var _this=this;
            var jsonList = [];
            var shopping_car_id=[];
            _this.shopList.forEach( function(shop, index) {
                var blShop = {};
                var blGoodsList = [];
                shop.GoodsList.forEach( function(goods, index) {
                    if(goods.goodsCheck){
                        var blGoods = {};
                        blGoods.goods_id = goods.goods_id;
                        // TODO 补齐
                        blGoods.buy_count = goods.goods_count;
                        blGoods.buying_price = goods.buying_price;
                        blGoods.courier_fees = goods.courier_fees;
                        var specificaList=[];
                        goods.GoodsSpecificationList.forEach(function(category_id, index) {
                            var categoryId={};
                                categoryId.goods_specification_category_id=category_id.goods_specification_category_id;
                                
                                specificaList.push(categoryId);

                        });
                        blGoods.specifica=specificaList;
                        blGoodsList.push(blGoods);
                        shopping_car_id.push(goods.shopping_car_id);
                    }
                });
                if(blGoodsList.length>0){
                    blShop.merchants_in_id = shop.merchants_in_id;
                    blShop.goods = blGoodsList;
                    jsonList.push(blShop);
                }


            });
           console.log(JSON.stringify(jsonList))
            localStorage.setItem('spt',JSON.stringify(jsonList));
            localStorage.setItem('shopping_car_id',shopping_car_id.toString());
            top.location.href="confirm_order.html";
        }  
    }
});