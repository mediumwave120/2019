$(function() {
	getGoodsRefundCause();
	var order_id=GetQueryString('order_id');
	var order_goods_id=GetQueryString('order_goods_id');
	getGoodsRefundPrice(order_goods_id);
	getOrderDetailByUserId(order_id,order_goods_id)

})

$('.select-list').on('click',function(e) {
	var pop=$(this).next();
		$(pop).fadeIn(500);
		$('.pop').click(function(e){
		    if (e.target.nodeName == 'DIV') {
		        $('.pop').fadeOut(500);
		     }
		});	
})
$('.list').on('click','li',function(){
	console.log($(this).text())
	var select_value=$(this).text();
	$('.select-list').find('span').text(select_value);
	$('.pop').fadeOut(500);
})
//退款原因列表
function getGoodsRefundCause() {
	var user_id=localStorage.getItem('UserId');
	var url=IP+"/DataMobile/goods.ashx?Action=GetGoodsRefundCause";
	$.ajax({
        url: url,
        type: 'get',
        data:{
        	user_id:user_id
        },
        dataType: 'json',
        success: function (result) {
            console.log(JSON.stringify(result));
        	//console.log(result);
        	if(result.code=="100"){
        		var result=result.data;
        		var html="";
        		for (var i = 0; i < result.length; i++) {
        			
        			html+="<li>"+result[i].salesreturn_cause_text+"</li>"
        		}
        	}
        	$('.list').html(html);
        }
     });
}
//商品详情
function getOrderDetailByUserId(order_id,order_goods_id) {
	var user_id=localStorage.getItem('UserId');
	var url=IP+"/DataMobile/goods.ashx?Action=GetOrderDetailByUserId";
	var order_detail={};
		order_detail.order_id=order_id;
		order_detail.user_id=user_id;
	$.ajax({
        url: url,
        type: 'get',
        data:order_detail,
        dataType: 'json',
        success: function (result) {
        	var result=result.data[0].GoodsList;
        	//console.log(result);
        	var html="";
        	for (var i = 0; i < result.length; i++) {       		
        		if(result[i].order_goods_id==order_goods_id){
        			html+="<img src=\""+ip+result[i].icon+"\">";
					html+="<div class=\"goods-name\">"+result[i].name+"</div>";
					html+="<div class=\"goods-spec\">"+result[i].specificationsText+"</div>";
        		}
        	}
        	$('.goods-info').html(html);
        	
        }
    });
}
//退款金额
function getGoodsRefundPrice(order_goods_id) {
	var user_id=localStorage.getItem('UserId');
	var url=IP+"/DataMobile/goods.ashx?Action=GetGoodsRefundPrice";
	var order_detail={};
		order_detail.order_goods_id=order_goods_id;
		order_detail.user_id=user_id;
	$.ajax({
        url: url,
        type: 'get',
        data:order_detail,
        dataType: 'json',
        success: function (result) {
        	
        	//console.log(result);
        	if(result.code=="100"){
        		$('.money').html(result.data[0].price);
        		
        	}
        }
    });
}
/*
退款图片
*/
//
$('.file1').on('change',function() {
	var file=this.files[0]   // 获取input上传的图片数据;
    var img=new Image()  ;
    var url=window.URL.createObjectURL(file);  // 得到bolb对象路径，可当成普通的文件路径一样使用，赋值给src;
    $('.tuikuan1').attr('src',url);
	var formdata = new FormData();
	console.log(file);
	formdata.append("files", file);
	$.ajax({
        url: IP+"/Data/FileIO.ashx?Action=upload&type=SalesReturn",
        data: formdata,
        type: "get",
        processData: false,
        contentType: false,
        async: false,
        dataType: "JSON",
        success: function (datajson) {
            console.log(datajson);
            //var images=datajson.result;
            // $(Obj).prev().attr('src',images);
            // $(Obj).attr("data-img",images);
        
        }

    })
		
})
$('.file2').on('change',function() {
	var file=this.files[0]  
    var img=new Image()  ;
        url=window.URL.createObjectURL(file)  
         $('.tuikuan2').attr('src',url);
})
$('.file3').on('change',function() {
	var file=this.files[0]   // 获取input上传的图片数据;
    var img=new Image()  ;
        url=window.URL.createObjectURL(file) 
         $('.tuikuan3').attr('src',url);
})

//退款提交
$('.submit').on('click',function() {
	var order_goods_id=GetQueryString('order_goods_id');
	var user_id=localStorage.getItem('UserId');
	var url=IP+"/DataMobile/goods.ashx?Action=GoodsRefundAdd";
	var order_detail={};
		order_detail.order_goods_id=order_goods_id;
		order_detail.user_id=user_id;
	$.ajax({
        url: url,
        type: 'get',
        data:order_detail,
        dataType: 'json',
        success: function (result) {
        	
        	//console.log(result);
        	if(result.code=="100"){
        		$('.money').html(result.data[0].price);
        		
        	}
        }
    });
})