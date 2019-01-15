var  CATEGORY={
	ip:"http://122.112.209.170:8088",
	apiUrl:"https://bird.ioliu.cn/v1?url=http://122.112.209.170:8088",
	init:function(){
		this.get_goods_category();
		console.log($('#app').width());
	},
	get_goods_category:function(){
		//{"code":"100","message":"查询成功","data":[{"goods_category_id":"21116e9d-dd40-4290-96d7-5989057a333f","name":"酒水饮料","SecondCategory":[{"goods_category_id":"1199ff72-8ecd-4ad4-888a-d3822187038b","name":"红酒","ThreeCategory":[{"goods_category_id":"516ce162-8d22-47f7-a132-30f6fe3d7989","name":"法国红酒","icon":"/Files//201810/1540908769476.85.jpg"},{"goods_category_id":"c589d126-c4f5-463d-80b9-852c8a4c8a36","name":"澳大利亚红酒","icon":"/Files/CategoryIcon/201810/1540908806656.56.jpg"}]},{"goods_category_id":"0328abb6-6dbd-4679-a2f2-c877dac28126","name":"洋酒","ThreeCategory":[{"goods_category_id":"770d6ada-aacf-4f7e-8022-54aae7276c03","name":"XO","icon":"/Files/CategoryIcon/201810/1540910487295.04.jpg"}]},{"goods_category_id":"f3a71643-809b-4379-8d6b-687d41b0ea1f","name":"水","ThreeCategory":[{"goods_category_id":"3b2734c8-04cd-42f2-9513-e6541092346d","name":"怡宝","icon":"/Files/CategoryIcon/201810/1540981383955.99.jpg"},{"goods_category_id":"6ac715b1-55ea-4ded-a4bf-e4fe8ba5cf7b","name":"农夫山泉","icon":"/Files//201810/1541003458459.44.jpg"},{"goods_category_id":"e27f7dd5-cffd-4f5f-9f77-ef5cfafa2d17","name":"阿尔卑斯","icon":"/Files/CategoryIcon/201810/1540981529585.94.jpg"},{"goods_category_id":"f05edba6-df4c-4f01-b3d5-6a860897d574","name":"娃哈哈","icon":"/Files/CategoryIcon/201810/1540981478527.32.jpg"}]},{"goods_category_id":"752b17b7-b2c2-41c9-a67e-c24c2d0c66e6","name":"白酒","ThreeCategory":[{"goods_category_id":"429de4ab-fbc3-480c-8a8a-0c42966e4799","name":"郎酒","icon":"/Files/CategoryIcon/201810/1540908413690.56.jpg"},{"goods_category_id":"69c9727f-b76a-4fac-83bc-5ec2174285c9","name":"歌天下","icon":"/Files/CategoryIcon/201810/1540908396356.56.jpg"}]}]},{"goods_category_id":"3c4da24e-9707-4773-a9b2-29f0b8ea2b7e","name":"食品","SecondCategory":[]},{"goods_category_id":"5c13a845-4d7e-4abd-b057-945bcc4485e6","name":"运动户外","SecondCategory":[{"goods_category_id":"75be7831-8a88-4146-84cb-2ac2f3c56f7c","name":"鞋子","ThreeCategory":[{"goods_category_id":"cd5b230d-72e0-446a-a8e2-763476be2cb3","name":"跑步鞋","icon":"/Files/CategoryIcon/201808/1533119885205.7.jpg"},{"goods_category_id":"e40a7739-aa60-4e6b-abb6-fc86a79b74d2","name":"皮鞋","icon":"/Files/CategoryIcon/201808/1533119929855.14.jpg"},{"goods_category_id":"f5ef658a-e1ec-49ae-a87e-8e95d738a54f","name":"帆布鞋","icon":"/Files/CategoryIcon/201808/1533119905187.16.jpg"},{"goods_category_id":"1f1ad45b-e781-4545-bdc5-da5d4a8093d2","name":"休闲鞋","icon":"/Files//201810/1540908676232.67.jpg"}]}]},{"goods_category_id":"d24996d6-77d4-480b-8b4f-0ff0812f5e71","name":"美食","SecondCategory":[{"goods_category_id":"bb826d62-f049-4421-ad7e-e0d9fe9d84f3","name":"传统糕点","ThreeCategory":[{"goods_category_id":"0f0e98ec-a7eb-40a8-b369-77cac917212d","name":"上海小糕点","icon":"/Files/CategoryIcon/201807/1532530883841.22.jpg"}]}]},{"goods_category_id":"da3c7d3d-9547-4b5a-bf07-bd520ab87749","name":"家用电器","SecondCategory":[{"goods_category_id":"41ea6382-34a3-4a3f-8894-7786bead83c3","name":"空调","ThreeCategory":[{"goods_category_id":"e7c9b56d-a726-436c-b404-5ed66fbd6f20","name":"TCL","icon":"/Files/CategoryIcon/201810/1540909701746.82.jpg"}]}]},{"goods_category_id":"dbd99ffa-3bc0-42db-bbd4-3899a5c6e50b","name":"美妆","SecondCategory":[]},{"goods_category_id":"6c8e460f-b815-4a32-a24e-c5e18f642532","name":"日用百货","SecondCategory":[{"goods_category_id":"47aeaffc-f19b-4f9a-9843-41eb3100428f","name":"衣架","ThreeCategory":[{"goods_category_id":"2f2e9c17-35d7-4480-ae2e-352f86d27a6c","name":"实木衣架","icon":"/Files/CategoryIcon/201810/1540907104299.33.jpg"},{"goods_category_id":"46bd4457-9c53-4b61-be3c-1af8134ecaa8","name":"塑料衣架","icon":"/Files/CategoryIcon/201810/1540907125713.4.jpg"}]}]},{"goods_category_id":"2619a816-4c5b-4001-8b1c-79b15cf5b3e9","name":"手机数码","SecondCategory":[{"goods_category_id":"5eb8bb03-23f1-4d4e-82a1-0e541488b257","name":"相机","ThreeCategory":[{"goods_category_id":"fb897a73-3cd7-4047-a5e1-134812d4ec1f","name":"摄像机","icon":"/Files/CategoryIcon/201810/1540910374096.75.jpg"}]},{"goods_category_id":"9c859380-5954-4afd-a61c-38b7cb6b128c","name":"手机","ThreeCategory":[{"goods_category_id":"01e3f449-6c63-44be-be13-398f357da915","name":"华为","icon":"/Files/CategoryIcon/201810/1540910565305.81.jpg"}]}]}]}
		var url = this.apiUrl+"/DataMobile/goods_category.ashx?Action=GetGoodsCategory";
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            success: function (result) {
                // console.log(JSON.stringify(result))
                var html="";
                var data=result.data;
                if (result.code == "100") {
                	for (var i = 0; i < data.length; i++) {
                		
                        html+="<li>";
			                html+="<a>"+data[i].name+"</a>";
			                html+="<div class=\"submenu\">";
			                    html+="<div class=\"leftdiv\">";
			                    var second_category=data[i].SecondCategory;
			                    for (var j = 0; j < second_category.length; j++) {
			                    	
			                        html+="<dl>";
			                            html+="<dt>";
			                                html+="<a href=\"\">"+second_category[j].name+"</a>";
			                            html+="</dt>";
			                            html+="<dd>";
			                            var three_category=second_category[j].ThreeCategory;
			                            	for (var k = 0; k < three_category.length; k++) {
			                            	html+="<div>";
			                            		
				                			   html+="<img src=\"http://122.112.209.170:8088"+three_category[k].icon+"\">";
				                               html+="<a href=\"\">"+three_category[k].name+"</a> ";
			                            	html+="</div>";
			                            	}
			                            html+="</dd>";
			                        html+="</dl>";
			                    }
			                    html+="</div>";
			                    html+="<div class=\"rightdiv\">";
			                    html+="</div>";
			                html+="</div>";
			            html+="</li>";

			            

                	}

                	$('.sidebar').html(html).height();
                	$('.leftdiv').width($(document).width()-80);
                	var w=$('.leftdiv').width();
                	$('.leftdiv').find('dd').width($(document).width()-80);
                	$('.leftdiv').find('dd div').width(w/3);
                	$('.sidebar').find('li').eq(0).find('.submenu').show();
                	$('.sidebar').find('li').eq(0).addClass('imageColor');
                	//$('.sidebar').find('li').eq(0).find('a').css({'color':'#e4393c'});
                	$('.sidebar').on('click','li',function(){
                		//$(this).eq(0).
                		$(this).find('.submenu').fadeIn(300).parent().siblings().find('.submenu').fadeOut(300);
                		
                	})
                	$('.sidebar li').on('click',function(){
				        $(this).addClass('imageColor').siblings().removeClass('imageColor');
				    })

				    $('.submenu').height($(document).height())
				    .css({"overflow-x": "hidden","overflow-y": "scroll"});
                }
            }
        });
	}
}
CATEGORY.init();