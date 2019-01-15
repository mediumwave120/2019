/// <reference path="../../index.html" />
const IP="https://bird.ioliu.cn/v1?url=http://122.112.209.170:8088";
const ip="";
// 商城头部组件
var h_header=Vue.extend({
	template:`
		<header>
			<div id="header">
		        <div class="top-wrap">
		          <div class="header-l">
		           <a href="javascript:;">欢迎您！</a> <span></span>	<a href="#" class="name"></a> 
		           <a href="javascript:;" class="login-state" @click="login">请登录</a> <span></span>
                   <a href="javascript:;" class="login-end " style="display:none;"  @click="deletelogin()">退出登录</a> 		        
                   <a href="pcpage/merchant/webim-live/imlogin.html" class="login-end " style="display:none;">消息</a> 		        
                   <a href="ucenter.html?admission" class="shop-enter">商家入驻</a>        
		        
		        </div>
		        <div class="header-r">
		           <a href="ucenter.html?collection">收藏夹</a> <span></span>
		           <a href="ucenter.html?my_order" >我的订单</a> <span></span>
		           <a href="https://kefu.easemob.com/webim/im.html?configId=4dee1854-7094-468e-b138-090fc9fa9c59">客服服务</a>
		        </div>
		        </div>
		        <div class="bottom-wrap" id="bottom-wrap">
		           <div class="aaaa">
			           <div class="bottom-l">
			              <a href="index.html">
			                <img src="imgs/logo.png">
			              </a>
			            </div>
			            <div class="bottom-c">
			              <div>
			                <div class="search-tab-box">
			                  <ul id="tab">
			                    <li 
			                    v-for="(tab_list,index) in tabList"
			                    :class="{'active':index==tab_list.id}"
			                    @click="changTab(index)"
			                    :id="index">{{tab_list.name}}</li>
			                  </ul>
			                  <input type="text" name="" class="search" placeholder="请输入想要找的宝贝" v-model="content" :value="content"/>
			                  <input type="button" name=""  value="搜索" class="SEARCH" @click="search()"/>
			                  <div class="tab-content">
			                    <ul v-for="(rl,index) in recommendList"   
			                    	:class="index==rl.id ?'hots':'hide'"
			                    	@click="changTab(index)">
									<li v-for="(goods,i) in rl.RecommendGoods" ><a :href="'goods_details.html?goods_id='+goods.goods_id" v-if="i<3" >{{goods.name}}</a></li>
									<li v-for="(shop,j) in rl.Merchants_In"   ><a :href="'shop.html?merchants_in_id='+shop.merchants_in_id" v-if="j<3"  >{{shop.shop_name}}</a></li>
			                    </ul>
			                  </div>
			                </div>
			              </div>
			            </div>
			            <div class="bottom-r">
			            	<a href="shopping_cart.html">
			               		<img src="imgs/购物车空.png">
			               		<span>我的购物车</span>
			               	</a>
			            </div>
		            </div>
		        </div>
	        </div>
	    </header>
	`,
	data(){
		return {
			content:'',
			tabList:[{name:'商品',id:1},{name:'店铺',id:2}],
			// goodsRecommendList:[{name:'手机',id:1},{name:'超市',id:2},{name:'鞋子',id:3}],
			// shopRecommendList:[{name:'张三店铺',id:1},{name:'李四店铺',id:2},{name:'王五店铺',id:3}],
			recommendList:[],
			tab:''
		}
	},
	mounted() {
        this.$nextTick(function () {
            this.GetSou();
            this.serachType();
            this.changTab(0);
        });
    },
	methods:{

		
		search:function(){
			var _this=this;
			//console.log(_this.content);
			
			if($('#0').hasClass('active')){
				location.href="goods_search.html?q="+_this.content+"&ie=utf-8";
            }else{
            	location.href="shop_search.html?q="+_this.content+"&ie=utf-8";
            	
            }
			
			
		},
		serachType: function () {            
            var _this = this;
            var url = IP+"/DataMobile/home.ashx?Action=GetHome";
            $.ajax({
                url: url,
                type: 'post',
                async:false,
                dataType: 'json',
                success: function (result) {
                	 //{"code":"100","message":"查询成功","data":[{"Swiper":[{"swiper_id":"22d39640-3f6c-4f05-95aa-fed2b2800881","image":"/Files/Swiper/201812/155a74b171bd441f9fd2048786bea6c1.png","goods_id":"605a2085-63ba-48ba-816c-5a8e4d192d8b","skip_url":""},{"swiper_id":"d7945ea2-ed0b-4790-8b25-ec641a15b403","image":"/Files/Swiper/201808/1533131041970.65.jpg","goods_id":"636d7d4c-fa5c-45a8-ae2c-71f6e5f79d84","skip_url":""},{"swiper_id":"ae5a5ae5-dfe1-49ec-a24d-f8679228a945","image":"/Files/Swiper/201810/1540911033956.43.jpg","goods_id":"7e1d89c0-040b-4208-9d5f-514448791b6d","skip_url":""},{"swiper_id":"36fa3a9a-a328-45b6-a4b7-0418bc143631","image":"/Files/Swiper/201810/1541003547960.46.jpg","goods_id":"7d652156-c796-4bc6-a201-3aaf876b1ef9","skip_url":""}],"Merchants_In":[{"merchants_in_id":"a9b8dc80-fa86-4e78-9118-894ddf930734","shop_name":"枫木","shop_logo":"/Files/MerchantsInLogo/201808/1534782486334.52.jpg"},{"merchants_in_id":"2fea90bc-5a48-4ef8-8313-92b140e7c9bb","shop_name":"22","shop_logo":"/Files/MerchantsInLogo/201810/1540308253952.98.jpg"},{"merchants_in_id":"1234567","shop_name":"皮卡丘的小店","shop_logo":"/Files/MerchantsInLogo/201807/1531935945970.97.jpg"},{"merchants_in_id":"ef9f4c03-1f6b-49a7-96ab-c48ad69d5e29","shop_name":"逆水寒旗舰店","shop_logo":"/Files/MerchantsInLogo/201807/1532355408545.26.png"},{"merchants_in_id":"0f3e9f84-68ab-4b99-8e94-6299a898b6af","shop_name":"七条龙旗舰店","shop_logo":"/Files/MerchantsInLogo/201807/1533046871584.jpg"},{"merchants_in_id":"eca658de-1a15-4214-9018-c5ae71aa9fdb","shop_name":"鑫叶家纺","shop_logo":"/Files/MerchantsInLogo/201809/1536920770279.2.jpg"},{"merchants_in_id":"4a7e0182-371c-4ad9-995d-3f5db5730332","shop_name":"店铺名称","shop_logo":"/Files/MerchantsInLogo/201808/1534412372532.5.jpg"},{"merchants_in_id":"db43698c-9a88-4769-ab28-c56ee37f4346","shop_name":"毛毛的店","shop_logo":"/Files/MerchantsInLogo/201812/7899ccb73b014e988fdaba6f22875493.jpg"},{"merchants_in_id":"9d610472-64ef-401b-859a-467a27e98401","shop_name":"奔哥店铺","shop_logo":"/Files/MerchantsInLogo/201808/1535016767138.97.jpg"}],"RecommendGoods_Category":[{"goods_category_id":"3c4da24e-9707-4773-a9b2-29f0b8ea2b7e","name":"食品","describe":"","icon":"/Files//201811/1543593504460.86.jpg"},{"goods_category_id":"dbd99ffa-3bc0-42db-bbd4-3899a5c6e50b","name":"美妆","describe":"","icon":"/Files/CategoryIcon/201811/1543587824611.53.jpg"},{"goods_category_id":"770d6ada-aacf-4f7e-8022-54aae7276c03","name":"XO","describe":"","icon":"/Files/CategoryIcon/201810/1540910487295.04.jpg"}],"RecommendGoods":[{"goods_id":"7e91a47e-bb42-45c7-a017-043e458e07c4","original_price":"10.00","buying_price":"0.01","name":"杂物","icon":"/Files/Goods/201901/588485ae136546aab7fed140e8025a9d.jpg"},{"goods_id":"85003b04-c1d9-4497-b0ab-95a191568c4a","original_price":"666.00","buying_price":"0.01","name":"匡威帆布鞋","icon":"/Files/Goods/201812/b87f873fae8c408f92b876827b9a60be.jpg"},{"goods_id":"3beedbd2-bb26-4bd8-9af4-5a602f564e13","original_price":"888.00","buying_price":"0.01","name":"匡威（帆布鞋）","icon":"/Files/Goods/201812/2f8c713d772241eba9efe8a38496f8d4.jpg"},{"goods_id":"b6a2c993-ff09-427a-8599-e5e7d5469626","original_price":"10.00","buying_price":"0.01","name":"美妆","icon":"/Files/Goods/201812/bea8b121b09b490ca9c88dcc7570e867.jpg"},{"goods_id":"605a2085-63ba-48ba-816c-5a8e4d192d8b","original_price":"10000.00","buying_price":"0.01","name":"大美盛年","icon":"/Files/Goods/201812/f37b666da90f42f2b91803a1d55b063c.jpg"},{"goods_id":"5064bc1e-7068-4214-9069-c59afc60fdd7","original_price":"800.00","buying_price":"499.00","name":"大美盛年","icon":"/Files/Goods/201812/3b14981907704209a03d4ce02e9b4b77.jpg"},{"goods_id":"4180c264-9822-4f71-8f23-74a3bbabe020","original_price":"10.00","buying_price":"0.01","name":"实木衣架","icon":"/Files/Goods/201811/1542982064283.46.jpg"},{"goods_id":"784fce16-2048-46c1-bb92-fe2baa5cfa00","original_price":"29.90","buying_price":"19.90","name":"实木衣架西服挂衣架","icon":"/Files/Goods/201810/1540993682881.64.jpg"},{"goods_id":"8596c332-ef43-4c6a-8b80-10fd7cc94e44","original_price":"36.00","buying_price":"0.01","name":"农夫山泉 饮用水","icon":"/Files/Goods/201810/1540986057294.11.jpg"},{"goods_id":"f7bc7960-39ba-428a-a7f2-7235e6c3119c","original_price":"1699.00","buying_price":"1699.00","name":"华为畅享9 Plus","icon":"/Files/Goods/201810/1540912438033.25.jpg"},{"goods_id":"7e1d89c0-040b-4208-9d5f-514448791b6d","original_price":"10.00","buying_price":"0.10","name":"智能家居","icon":"/Files/Goods/201811/1542902283898.64.png"},{"goods_id":"43077d1d-c1c1-42f9-93ec-95d4b25a7792","original_price":"500.00","buying_price":"329.00","name":"法国原瓶进口XO","icon":"/Files/Goods/201810/1541001226644.93.jpg"}],"HotGoods_Category":[{"goods_category_id":"770d6ada-aacf-4f7e-8022-54aae7276c03","name":"XO","describe":"","icon":"/Files/CategoryIcon/201810/1540910487295.04.jpg"},{"goods_category_id":"6ac715b1-55ea-4ded-a4bf-e4fe8ba5cf7b","name":"农夫山泉","describe":"","icon":"/Files//201810/1541003458459.44.jpg"},{"goods_category_id":"3c4da24e-9707-4773-a9b2-29f0b8ea2b7e","name":"食品","describe":"","icon":"/Files//201811/1543593504460.86.jpg"},{"goods_category_id":"01e3f449-6c63-44be-be13-398f357da915","name":"华为","describe":"","icon":"/Files/CategoryIcon/201810/1540910565305.81.jpg"},{"goods_category_id":"0f0e98ec-a7eb-40a8-b369-77cac917212d","name":"上海小糕点","describe":"","icon":"/Files/CategoryIcon/201807/1532530883841.22.jpg"},{"goods_category_id":"3b2734c8-04cd-42f2-9513-e6541092346d","name":"怡宝","describe":"","icon":"/Files/CategoryIcon/201810/1540981383955.99.jpg"},{"goods_category_id":"f5ef658a-e1ec-49ae-a87e-8e95d738a54f","name":"帆布鞋","describe":"","icon":"/Files/CategoryIcon/201808/1533119905187.16.jpg"},{"goods_category_id":"e40a7739-aa60-4e6b-abb6-fc86a79b74d2","name":"皮鞋","describe":"","icon":"/Files/CategoryIcon/201808/1533119929855.14.jpg"},{"goods_category_id":"2f2e9c17-35d7-4480-ae2e-352f86d27a6c","name":"实木衣架","describe":"","icon":"/Files/CategoryIcon/201810/1540907104299.33.jpg"},{"goods_category_id":"516ce162-8d22-47f7-a132-30f6fe3d7989","name":"法国红酒","describe":"","icon":"/Files//201810/1540908769476.85.jpg"},{"goods_category_id":"5c13a845-4d7e-4abd-b057-945bcc4485e6","name":"运动户外","describe":"","icon":"/Files//201810/1540909617781.94.jpg"}],"HotGoods":[{"goods_id":"31fb769c-7e4d-4a02-8528-14757b45d1f8","original_price":"11.00","buying_price":"0.01","name":"安卓商品2次","instructions":"商品简介商品简介商品简介","icon":"/Files/Goods/201808/1534783428704.11.png"},{"goods_id":"8596c332-ef43-4c6a-8b80-10fd7cc94e44","original_price":"36.00","buying_price":"0.01","name":"农夫山泉 饮用水","instructions":"农夫山泉 饮用水","icon":"/Files/Goods/201810/1540986057294.11.jpg"},{"goods_id":"29b1deab-509d-4189-8632-317482659adc","original_price":"800.00","buying_price":"0.01","name":"大美盛年","instructions":"美美","icon":"/Files/Goods/201812/a2a044f7ecc34548bb3b44e0d27c3fa5.jpg"},{"goods_id":"7d652156-c796-4bc6-a201-3aaf876b1ef9","original_price":"129.00","buying_price":"0.01","name":"怡宝","instructions":"250","icon":"/Files/Goods/201811/1541500406174.32.jpg"},{"goods_id":"7e1d89c0-040b-4208-9d5f-514448791b6d","original_price":"10.00","buying_price":"0.10","name":"智能家居","instructions":"智能家居，家居中的霸王机","icon":"/Files/Goods/201811/1542902283898.64.png"},{"goods_id":"85003b04-c1d9-4497-b0ab-95a191568c4a","original_price":"666.00","buying_price":"0.01","name":"匡威帆布鞋","instructions":"匡威陪伴，幸福一生","icon":"/Files/Goods/201812/b87f873fae8c408f92b876827b9a60be.jpg"},{"goods_id":"b6a2c993-ff09-427a-8599-e5e7d5469626","original_price":"10.00","buying_price":"0.01","name":"美妆","instructions":"美妆","icon":"/Files/Goods/201812/bea8b121b09b490ca9c88dcc7570e867.jpg"},{"goods_id":"784fce16-2048-46c1-bb92-fe2baa5cfa00","original_price":"29.90","buying_price":"19.90","name":"实木衣架西服挂衣架","instructions":"实木衣架西服挂衣架","icon":"/Files/Goods/201810/1540993682881.64.jpg"},{"goods_id":"70c70d88-62bc-4c8a-a9a1-2373f240a07e","original_price":"800.00","buying_price":"0.01","name":"大美盛年","instructions":"【漫漫红尘路  还你本色美】","icon":"/Files/Goods/201812/60881534250347eb9e8e3292b1b74eec.jpg"},{"goods_id":"605a2085-63ba-48ba-816c-5a8e4d192d8b","original_price":"10000.00","buying_price":"0.01","name":"大美盛年","instructions":"漫漫红尘路  还你本色美","icon":"/Files/Goods/201812/f37b666da90f42f2b91803a1d55b063c.jpg"}],"GetSou":[{"id":"bc8f85b3-5959-4130-9e07-51c48731c8fc","content":"华为"}]}]}
                	
                    if (result.code == "100") {
                        _this.recommendList=result.data;
                        var result=result.data;
                        /*recommendList:[
			        	{goods:[{name:'手机',id:1},{name:'超市',id:2},{name:'鞋子',id:3}],id:1},
						{shop:[{name:'张店铺',id:1},{name:'李店铺',id:2},{name:'王店铺',id:3}],id:2}
						]*/
						var recommendList=[];
						var obj1={},obj2={};
							obj1.RecommendGoods=result[0].RecommendGoods;
							obj1.id=1;
							obj2.Merchants_In=result[0].Merchants_In;
							obj2.id=2;
							recommendList.push(obj1,obj2)
						_this.recommendList=recommendList;
                     
                        // obj.name=result[0].RecommendGoods
                        // obj.id=result[0].RecommendGoods
                   
                        //_this.goods = result.data[0].RecommendGoods;
                        // _this.recommend_goods_category = result.data[0].Merchants_In;
                        //SetCookie("content", result.data[0].GetSou[0].content, 59);
                    }
                }
            });
        },
        changTab:function(index){
			var _this=this;
        	var q=_this.getUrlParam('q');
			_this.tabList.forEach(function(item){
				item.id=index;
				switch (index) {
					case 0:
						_this.content = q;
						break;
					case 1:
						_this.content = q;
						break;
					default:
						//_this.content = "duke3";
						break;
				}
			})
			_this.recommendList.forEach(function(item){
				item.id=index;
			})
		},
		GetSou:function(){
			var _this=this;
			_this.content=GetCookie('content')
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
			
			var url=location.href;
			var reg=/^.+:\/\/.+\/(.*)\.html(\?.*)?$/;
			var new_url=url.match(reg)[1];
			if(new_url=='payment_mode'){
			    location.href="/pcmall/index.html";
			}else
			{
			    location.reload();
			}
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
        }
	}
});
// 商城尾部组件
var h_footer=Vue.extend({
	template:`
		<footer>
			<div class="footer"> 
	           <dl>
	             <dt>帮助中心</dt>
	             <dd>忘记密码</dd>
	             <dd>修改密码</dd>
	             <dd>申请入驻商家</dd>
	           </dl>
	           <dl>
	             <dt>配送方式</dt>
	             <dd>查询物流</dd>
	             <dd>配送时间及运费</dd>
	             <dd></dd>
	           </dl>
	           <dl>
	             <dt>售后服务</dt>
	             <dd>退款申请</dd>
	             <dd>退货政策</dd>
	             <dd></dd>
	           </dl>
	           <dl>
	             <dt>付款方式</dt>
	             <dd>第三方支付</dd>
	             <dd>绑卡支付</dd>
	             <dd></dd>
	           </dl>
	           <dl>
	             <dt>关于我们</dt>
	             <dd>联系我们</dd>
	             <dd>反馈</dd>
	             <dd></dd>
	           </dl>
	        </div>
	        <p>八驾马车BAJIAMACHE</p>
	    </footer>
	`
});
//添加新地址
var add_address=Vue.extend({
	template:`
		<div class="address" style="display:none;">
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
                  			<textarea name="" id="" >详细地址，例如街道名称，门牌号码，楼层和房间号等</textarea>  
                		</span>
              		</li>
              		<li>
                		<span>邮政编码</span>
                		<span>
		                  <input type="text" placeholder="如果不确定，请填写000000">
		                </span>
		            </li>
		            <li>
		                <span>收货人姓名</span>
		                <span>
		                  	<input type="text" placeholder="长度不超过25个字">
		                </span>
		            </li>
		            <li>
		                <span>手机号码</span>
		                <span>
		                  	<input type="text" placeholder="">
		                </span>
		            </li>
		            <li>
		                <span>电话号码</span>
		                <span>
		                  	<input type="text" placeholder="">
		                </span>
		            </li>
		            <li>
		                <input type="button" value="保存">
		            </li>
		        </ul>
		    </div>
		</div>
	`
});
//编辑地址

//登录
var verify;
var h_login=Vue.extend({
	template:`
		<section id="preview">
	        <div id="preview-child">
	            <div class="preview-child">
	                <img src="imgs/loginbj1.png">
	                <div class="login">                   
	                    <a href="javascript:void(0)" class="vlogin">验证码登录</a>
	                </div>
	                <div class="triangle_border_up">
	                    <span class="lg">登录</span><span></span>
	                    <span class="sign-in">SIGN IN</span>
	                    <input type="text" name="" class="phone" placeholder="请输入手机号" value="17301764656">
	                    <input type="text" name="" class="validate" placeholder="请输入验证码" value="">
	                    <input type="password" name="" class="password" placeholder="请输入6-12位数字字母组合密码" value="123456">
	                    <div class="get-validate">|<button class="code">获取验证码</button></div>
	                    <div class="submit">
	                        <button class="now-login" @click="nowLogin()">马上登录</button>
	                        <button class="now-register">立即注册</button>
	                        <button class="finish-login">完成并登录</button>
	                    </div>
	                </div>
	            </div>
	            <div class="preview-img">
	                <img src="imgs/loginbj2.png"> 
	                <img src="imgs/bjmc.png" >           
	            </div>            
	        </div>
	    </section>
	`,
	data(){
		return {
		}
	},
	mounted: function () {
        this.$nextTick(function () {
            this.onloadM();
            this.GetUserText();
        });
    },
	methods:{
		nowLogin:function(){
			var _this=this;
		
			if (verify == undefined) {
			        var phone = $('.phone').val();
			        var password = $('.password').val();
			        var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
			        if (!phone) {
			            alert("请输入手机号");
			            return;
			        }
			        if (!password) {
			            alert("请输入");
			            return;
			        }
			        if (!reg.test(phone)) {
			            alert(" 请输入有效的手机号");
			            return;
			        } else {
			            $.ajax({
			                url: IP+"/DataMobile/user.ashx?Action=Login&account=" + phone + "&password=" + password,
			                type: 'get',
			                dataType: 'json',
			                success: function (dataJson) {
			                	//{"code":"100","message":"查询成功","data":[{"user_id":"0cbc4f22-8585-4d3d-b089-38ec35ebb56d","SubAccount":"200201808780984","TradeMemcode":"0000143289","CreateTime":"2018/8/20 16:43:22","BoothNo":"4617967148587129069","OutInAccount":"6217680200780109","OutInAccountName":"肖中波 ","IsOtherBank":"","TradeMemberProperty":"1","TradeMemBerName":"肖中波","PapersCode":"50023419880118185X","MessagePhone":"994C6A02266CE7667FC9D3D327F1B5CB","Email":"1658678242@qq.com","PayPassword":"","IsSetPayPassword":"1","account":"17301764656","password":"C4CA4238A0B923820DCC509A6F75849B","nick_name":"解晓东","logo":"/Files//201811/1541776647478.79.jpg","sex":"","im":"0cbc4f2285854d3db08938ec35ebb56d","sign":"我最崇拜朱健山计划iugytfrjqwwetyghopkjl","email":"","address":"","is_open_wallet":"1","type":"2"}]}
			                   
			                	
			                    if (dataJson.code == "100") {
			                        $('#preview').fadeOut();
			                        var dataJson = dataJson.data[0];
			                        SetCookie("UserId", dataJson.user_id, 1159);
			                        SetCookie("UserName", dataJson.nick_name, 1159);
			                        SetCookie("PaySubAccount", dataJson.SubAccount, 1159);
			                        SetCookie("TradeMemcode", dataJson.TradeMemcode, 1159);
                                    SetCookie("Is_Open_Wallet",dataJson.is_open_wallet,1159);
                                    SetCookie('IM',dataJson.im,1159)
                                    localStorage.setItem('UserLogo',dataJson.logo);
                                    localStorage.setItem('UserName',dataJson.nick_name);
			                        localStorage.setItem('IM',dataJson.im);
			                        $(".name").text(dataJson.nick_name);
			                        $(".login-state").text("");
			                        $(".login-end").show();
                                    location.reload();
			                    } else {
			                        alert(dataJson.message);
			                    }

			                }
			            });
			        }
			    } else {
			        var phone = $('.phone').val();
			        var validate = $('.validate').val();
			        if (validate == verify) {
			            $.ajax({
			                url:IP+"/DataMobile/user.ashx?Action=AccountLogin&account=" + phone,
			                type: 'get',
			                dataType: 'json',
			                success: function (dataJson) {

			                    if (dataJson.code == "100") {
			                        $('#preview').fadeOut();
			                        var dataJson = dataJson.data;
			                        SetCookie("UserId", dataJson.user_id, 1159);
			                        SetCookie("UserName", dataJson.nick_name, 1159);
			                        SetCookie("PaySubAccount", dataJson.SubAccount, 1159);
			                        SetCookie("TradeMemcode", dataJson.TradeMemcode, 1159);
                                    SetCookie("Is_Open_Wallet",dataJson.is_open_wallet,1159);
                                    SetCookie('WebIm',dataJson.im,1159)
			                        $(".name").text(dataJson.nick_name);
			                        $(".login-state").text("");
			                        $(".login-end").show();
                                    location.reload();
			                    } else {
			                        alert(dataJson.message);
			                    }

			                }, error: function () {
			                    alert("网络连接错误！");
			                }
			            });
			        } else {

			            alert("验证码输入错误！");
			            return;
			        }

			    }
		},
		GetUserText:function(){
			var name = GetUserName();
		    if (name != "" && name != undefined) {
		        $(".name").text(name);
		        $(".login-state").hide();
		        $(".login-end").show();


		    }
		},
		onloadM:function(){
			var flag = true;//验证码、密码登录切换
			$('.vlogin').on('click', function () {
			    if (flag) {
			        $(this).text('密码登录')

			        $('.validate').hide();;
			        $('.password').attr('placeholder', '请输入6-12位数字字母组合密码').show();

			        $('.get-validate').hide();
			        flag = false;
			    } else {
			        $(this).text('验证码登录')
			        $('.validate').attr('placeholder', '请输入验证码');
			        $('.get-validate').show();
			        flag = true;
			    }
			})
			//立即注册
			$('.now-register').on('click', function () {
			    $('.login').hide();
			    $('.lg').text('注册');
			    $('.sign-in').text('REGISTERED').css('left', '136px');
			    $('.password').show().css('top', '-130px');
			    $('.now-register,.now-login').hide();
			    $('.finish-login').show().css('top', '50px');
			    $('.get-validate').show();
			    $('.validate').attr('placeholder', '请输入验证码').show();
			})

			//完成注册并登录
			$('.finish-login').on('click', function () {
			    var phone = $('.phone').val();
			    var password = $('.password').val();
			    var validate = $('.validate').val();
			    if (validate == verify) {
			        $.ajax({
			            url:IP+ "/DataMobile/user.ashx?Action=RegisterUser&account=" + phone + "&password=" + password,
			            type: 'post',
			            dataType: 'json',
			            success: function (result) {
			                if (result.code == "100") {
			                    var phone = $('.phone').val();
			                    var password = $('.password').val();

			                    $.ajax({
			                        url:IP+ "/DataMobile/user.ashx?Action=Login&account=" + phone + "&password=" + password,
			                        type: 'post',
			                        dataType: 'json',
			                        success: function (dataJson) {
			                         
			                            if (dataJson.code == "100") {
			                                $('#preview').fadeOut();
			                                var dataJson = dataJson.data[0];
			                                SetCookie("UserId", dataJson.user_id, 59);
			                                SetCookie("UserName", dataJson.nick_name, 59);
			                                SetCookie("PaySubAccount", dataJson.SubAccount, 1159);
			                                SetCookie("TradeMemcode", dataJson.TradeMemcode, 1159);
			                                SetCookie("Is_Open_Wallet",dataJson.is_open_wallet,1159);
			                                SetCookie('WebIm',dataJson.im,1159)
			                                $(".name").text(name);
			                                console.log($(".login-end"));
			                                $(".login-end").css('display', 'block');
			                                location.reload();
			                            } else {
			                                alert(dataJson.message);
			                            }

			                        }
			                    });
			                } else {
			                    alert(result.message);
			                }

			            }
			        });
			    }
			    else {
			        alert("验证码输入错误！");
			        return;
			    }

			})
			//获取验证码
	
			var countdown = 60;
			$('.get-validate').on('click', function () {
			    var phone = $(".phone").val();
			    var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
			    if (phone == "") {
			        alert("请输入手机号");
			        return;
			    }
			    if (!reg.test(phone)) {
			        //$("#errMsg1").html(" 请输入有效的手机号");
			        //$("#errMsg1").show();
			        alert(" 请输入有效的手机号");
			        return;
			    } else {
			        $.ajax({
			            url: "/Data/Verify.ashx?Action=CheckNum&Account=" + phone,
			            type: 'post',
			            dataType: 'json',
			            success: function (result) {
			                console.log(result)
			                if (result.code == "100") {
			                    verify = result.result[0].value;

			                }
			            }
			        });
			        var obj = $(".code");
			        settime(obj);

			    }

			})
			function settime(obj) { //发送验证码倒计时
			    if (countdown == 0) {
			        obj.attr('disabled', false);
			        //obj.removeattr("disabled"); 
			        obj.text("免费获取验证码");
			        countdown = 60;
			        return;
			    } else {
			        obj.attr('disabled', true);
			        obj.text("重新发送(" + countdown + ")");
			        countdown--;
			    }
			    setTimeout(function () {
			        settime(obj)
			    }, 1000)
			}
			// function deletelogin()
			// {
			//     //DelCookie("UserName");
			//     //DelCookie("UserId");
			//     clearCookie();
			//     //foreachcookie()
			//     location.reload();
			 
			// }
			// $(function () {

			//     GetUserText()
			// })
			// function GetUserText()
			// {
			//     var name = GetUserName();
			//     if (name != "" && name != undefined) {
			//         $(".name").text(name);
			//         $(".login-state").hide();
			//         $(".login-end").show();


			//     }

			// }

		}
	}
});
//   window.onscroll=function(){
//      //滚动的距离,距离顶部的距离
//      var topScroll =document.body.scrollTop||document.documentElement.scrollTop;
//      //获取到导航栏id
//      var bignav  = document.getElementById("bottom-wrap");
//      //当滚动距离大于150px时执行 固定位置 距离
//      if(topScroll > 150){  
//          bignav.style.position = 'fixed';
//          bignav.style.top = 0+ 'px';
//          bignav.style.left = 192 + 'px';
//          bignav.classList.add("animated");
//          bignav.classList.add("fadeInDown");
//      }else{
//          //当滚动距离小于150让导航栏恢复原状
//          bignav.style.position = 'static';
//          bignav.style.top = '0px';
//          bignav.classList.remove("animated");
//          bignav.classList.remove("fadeInDown");
//      }
// }
//搜索路径
//<i class="glyphicon glyphicon-menu-right"></i>
var h_crumb=Vue.extend({
	template:`
		<div class="crumb">
			<div class="search-path">
				<ul>
					<li v-for="search_path in searchPathList" >
						<a :href="search_path.url">						
							<span class="left"></span><span class="center">{{search_path.name}}</span><span class="right"></span>				
						</a>
					</li>
				</ul>
				
			</div>
		</div>
	`,
	data(){
		return {
			searchPathList:[
				{name:'首页',url:'index.html',id:'1'},
				{name:'个人中心',url:'',id:'2'},
			]
		}
	},
	methods:{
		searchPath:function(){

		}
	}
});
//向上
var h_up=Vue.extend({
	template:` 
		<div  :class="{up:isActive}">
			<img src="../../imgs/up.png" alt="" @click="toTop(step)"/>
		</div>
	`,
	props:{
        step:{   //此数据是控制动画快慢的
            type:Number,
            default:50  
        }
    },
	data(){
		return {
			isActive:false
		}
	},
	created(){
        var h_up=this;
        window.onscroll=function(){
            if (document.documentElement.scrollTop>500) {
                h_up.isActive=true;
            }else {
                h_up.isActive=false;
            }
        }
    },
	methods:{
		toTop:function(i){
			//参数i表示间隔的幅度大小，以此来控制速度
                document.documentElement.scrollTop-=i;
                if (document.documentElement.scrollTop>0) {
                    var c=setTimeout(()=>this.toTop(i),16);
                }else {
                    clearTimeout(c);
                }
		}
	}
})

//推荐
var h_recommend=Vue.extend({
	template:`		
		<div class="recommend">
          <div>  
            <img src="imgs/新品推荐.png" alt="">
            <input type="button" value="换一批" @click="changeRecommend()">
          </div>
          <div class="goods-recommend">
              <ul>
                  <li v-for="(get_goods_list,index) in getGoodsList" v-if="index<3">
                    <div class="goods-img">
                      <img :src="'http://122.112.209.170:8088'+get_goods_list.icon" alt="">
                    </div>
                    <div class="goods-name">
                      <div>{{get_goods_list.name}}<!-- 窖藏30年<span class="classical">经典干红</span>干红清香型葡萄酒 --></div>
                    </div>
                    <div class="more" @click="location.href='goodsDetails.html?goods_id='+get_goods_list.goods_id">MORE</div>
                  </li>
              </ul>
          </div>
    	</div>
	`,
	data(){
		return{
			getGoodsList:[]
		}
	},
	mounted() {
        this.$nextTick(function () {
            this.changeRecommend();
        });
    },
	methods:{
		changeRecommend:function(){
			var _this=this;
			$.ajax({
	            url: IP+"/DataMobile/goods.ashx?Action=GoodsGetList&user_id="+GetUserId(),
	            type: "get",
	            dataType: "json",
	            success: function (datajson){
	            	console.log("datajsondatajsondatajsondatajson:",datajson);
	            	var t;
					var arr=datajson.data;
					for (var i = 0; i < arr.length; i++) {
						var rand=parseInt(Math.random()*arr.length);
						t = arr[rand];
					     arr[rand] =arr[i];
					     arr[i] = t;

					}
	                if(datajson.code=="100"){
	                	_this.getGoodsList=arr;

	                }
	            }, error: function () {
	                alert("后台错误！")
	            }

	        })									
		}
	}
});

