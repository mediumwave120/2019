$(function(){
	document.title="购物 用八驾马车";
	$(".default").each(function(index){
		$(".default").eq(0).css({color:'#FD6503'});
	})
	$(".default").click(function(){
		$(this).css({color:'#FD6503'}).siblings().css({color:'#000'})
        var lis=$(".default")
        var divs=$(".tabcon")
        for(var i=0;i<lis.length;i++){
            if(lis[i]==this){
	        	switch (i) {
					case 0:
						$('.d1').find('img').attr('src',"../imgs/ic_home_selected.png");
						$('.d2').find('img').attr('src',"../imgs/ic_classify_normal.png");
						$('.d3').find('img').attr('src',"../imgs/ic_message_normal.png");
						$('.d4').find('img').attr('src',"../imgs/ic_shopping_cart_normal.png");
						$('.d5').find('img').attr('src',"../imgs/ic_mine_normal.png");
						$('#ifr').attr('src','home.html');
						document.title="购物 用八驾马车";
						$('#header').show();
						break;
					case 1:

						$('.d1').find('img').attr('src',"../imgs/ic_home_normal.png");
						$('.d2').find('img').attr('src',"../imgs/ic_classify_selected.png");
						$('.d3').find('img').attr('src',"../imgs/ic_message_normal.png");
						$('.d4').find('img').attr('src',"../imgs/ic_shopping_cart_normal.png");
						$('.d5').find('img').attr('src',"../imgs/ic_mine_normal.png");
						$('#ifr').attr('src','category.html');
						document.title="商品分类";
						$('#header').show();
						break;
					case 2:
						$('.d1').find('img').attr('src',"../imgs/ic_home_normal.png");
						$('.d2').find('img').attr('src',"../imgs/ic_classify_normal.png");
						$('.d3').find('img').attr('src',"../imgs/ic_message_selected.png");
						$('.d4').find('img').attr('src',"../imgs/ic_shopping_cart_normal.png");
						$('.d5').find('img').attr('src',"../imgs/ic_mine_normal.png");
						
						if(!localStorage.getItem("UserId")){
							location.href="login.html";
						}else{

							$('#ifr').attr('src','../im/index.html');
							$('#header').show();
							document.title="聊天";
						}
						break;
					case 3:
						$('.d1').find('img').attr('src',"../imgs/ic_home_normal.png");
						$('.d2').find('img').attr('src',"../imgs/ic_classify_normal.png");
						$('.d3').find('img').attr('src',"../imgs/ic_message_normal.png");
						$('.d4').find('img').attr('src',"../imgs/ic_shopping_cart_selected.png");
						$('.d5').find('img').attr('src',"../imgs/ic_mine_normal.png");
						
						if(!localStorage.getItem("UserId")){
							location.href="login.html";
						}else{

							$('#ifr').attr('src','shopping.html');
							$('#header').show();
							document.title="购物车";
						}
						break;
					case 4:
						$('.d1').find('img').attr('src',"../imgs/ic_home_normal.png");
						$('.d2').find('img').attr('src',"../imgs/ic_classify_normal.png");
						$('.d3').find('img').attr('src',"../imgs/ic_message_normal.png");
						$('.d4').find('img').attr('src',"../imgs/ic_shopping_cart_normal.png");
						$('.d5').find('img').attr('src',"../imgs/ic_mine_selected.png");
						
						if(!localStorage.getItem("UserId")){
							location.href="login.html";
						}else{
							$('#ifr').attr('src','order.html');
							document.title="个人中心";
							$('#header').hide();
						}
						break;
					default:
						// statements_def
						break;
				}
	     	

                $('.default').removeClass('active')
                $('.tabcon').removeClass('active')
                // console.log(i)
                lis.eq(i).addClass("active")
                divs.eq(i).addClass("active")

            }
        }
    })

	$("#ifr").load(function(){
		var mainheight = $(this).contents().find("body").height();
		var documentheight = ($(document).height())+45;
		var ua = navigator.userAgent.toLowerCase();    
	    // if (/iphone|ipad|ipod/.test(ua)) {
	    //        //alert("iphone"); 
	    //         $(this).height(documentheight-mainheight+350)       
	    // } else if (/android/.test(ua)) {
	    //         //alert("android");
	    // }
	            $(this).height(documentheight-105)    
		
		// if($(this).contents().find("body").height()>documentheight){
		// 	$(this).height(mainheight+documentheight);
		// }else{
		// 	$(this).height(documentheight-55)
		// }
		
	})

		//var state = param.state;

	// 	if (state == "state")
	// 	{
	// 	    $('.d1').find('img').attr('src', "../imgs/ic_home_normal.png");
	// 	    $('.d2').find('img').attr('src', "../imgs/ic_classify_normal.png");
	// 	    $('.d3').find('img').attr('src', "../imgs/ic_message_normal.png");
	// 	    $('.d4').find('img').attr('src', "../imgs/ic_shopping_cart_normal.png");
	// 	    $('.d5').find('img').attr('src', "../imgs/ic_mine_selected.png");

	// 	    if (!localStorage.getItem("UserId")) {
	// 	        location.href = "login.html";
	// 	    } else {
	// 	        $('#ifr').attr('src', 'order.html');
	// 	        $('#header').hide();
	// 	    }
	// 	    $('.default').removeClass('active')
	// 	    $('.tabcon').removeClass('active')
	// 	    // console.log(i)
	// 	    var lis = $(".default")
	// 	    var divs = $(".tabcon")
	// 	    lis.eq(4).addClass("active")
	// 	    divs.eq(4).addClass("active")
	// 	}

	// })

	// function GetRequest() {
	//     var url = location.search;
	//     param = new Object();
	//     if (url.indexOf("?") != -1) {
	//         var str = url.substr(1);
	//         strs = str.split("&");
	//         for (var i = 0; i < strs.length; i++) {
	//             param[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
	//         }
	//     }
	// }
})