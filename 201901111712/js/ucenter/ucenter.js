//评价回复
$('.btn-evaluate').on('click',function(ev) {
      ev.preventDefault();
      //$("span").parents("ul");
      $(this).parent().parent().parent().parent().find('.evaluate').slideToggle('slow');
      //$(this).parents().find('.evaluate').slideToggle('slow');
      console.log($(this).parents('div').find('.evaluate'));
  });

  var Huitextarealength = function (obj){
    var html = $(obj).parent();
    var tatal = html.find('am').html();
    var sets = $(obj).val().length;

    if(sets*1>tatal*1){
        var str = '<div style="width: auto; right: 4%;color: red;">内容超出限制</div>';
        $(obj).after(str);
        html.find('em').css({color:'red'});
    }else {
        $(obj).parent().find('div').remove();
        html.find('em').css({color:'black'});
    }
    //设置已输入数量
    html.find('em').html(sets);
  }

//充值
$('.btn-confirm').on('click',function(ev) {
  var val=$('.input input').val();
  if(!val){   
    return;
  }
  if(!isNaN(val)){
    $('.step1').hide();
    $('.step2').show();   
  }

 
})
//单选
var flag=true;
$('.select-img').on('click',function() {
  if(flag){
    $(this).attr('src','imgs/组23.png');
    flag=false;
  }else{
    $(this).attr('src','imgs/组22.png');
    flag=true;
  }
})




//银行卡选择 bank-card  wechat
$('.bank-card').on('click',function(ev) {
  ev.preventDefault();
  $('.select').text($(this).text());
  $('.list').show();
  $('.wechat-num').hide();
})
$('.wechat').on('click',function(ev) {
  ev.preventDefault();
  $('.select').text($(this).text());
  $('.list').hide();
  $('.wechat-num').show();
})

//我的足迹
$('.goods-manage').on('click',function(ev) {
  $('.more img').hide();
})
$('.goods-del').on('click',function(ev) {
  $('.more img').show();
})
$('.change').on('click',function(ev) {
  ev.preventDefault();
  $(this).attr('src','imgs/组23.png').css('margin-right','-7px');
})
//订单详情
//order - detail
//查看物流
$('.check-logistics').on('click',function(ev) {
  $('.list-order').hide();
  $('.list-order-result').hide();
  $('.order-detail').hide();
  $('.logistics-detail').show();
})
//交易订单 全部
$('.all').on('click',function(ev) {
    $('.order-detail').hide();
    $('.logistics-detail').hide();
    $('.list-order').show();
    $('.list-order-result').show();
})
//我的收藏
var collection = location.href;
var collection_url = collection.split('?');
var tab_collection = collection_url[1];
$('a[href="#' + tab_collection + '"]').tab('show');


//商家入驻
var admission=location.href;
var admission_url=admission.split('?');
var tab_admission=admission_url[1];
$('a[href="#'+tab_admission+'"]').tab('show');

//我的订单
var my_order=location.href;
var my_order_url=my_order.split('?');
var tab_order=my_order_url[1];
$('a[href="#'+tab_order+'"]').tab('show');
// var my_path=my_order.split('/');
// console.log(my_path[3]);
// var a1=my_order.lastIndexOf('/');
// var a2=my_order.lastIndexOf('.');
// console.log(a1,a2,my_order.substr(a1,a2));


//上传营业执照图片
$('.business-license').change(function(e){
    //读取文件对象
    var reads= new FileReader();
    var file = e.currentTarget.files[0];
    reads.readAsDataURL(file);
    reads.onload=function (e) {
        $('.business-license-img').attr('src',this.result);
    };
})


//平台客服
$('.service').change(function (e) {
    //读取文件对象
    var reads = new FileReader();
    var file = e.currentTarget.files[0];
    reads.readAsDataURL(file);
    reads.onload = function (e) {
        $('.service_image').attr('src', this.result);
    };
})

//上传商家入驻信息
$('.shop-enter').on('click',function(){
  var dataURI=$('.business-license-img').attr('src');
  var date=new Date();
      console.log(date.getTime())
})

$(function(){
  //个人 企业
  if($('#personal:checked')){
    $('.code').hide();
  }else{
    $('.code').show();
  }
  //个人
  $('#personal').on('click',function(){
    $('.code').hide();
  })
  //企业
  $('#company').on('click',function(){
    $('.code').show();
  })
})
new h_header().$mount('h-header');//把组件挂载到h-header标签上
new h_footer().$mount('h-footer');//把组件挂载到h-footer标签上
new h_login().$mount('h-login');//把组件挂载到h-login标签上
new h_crumb().$mount('h-crumb');//把组件挂载到h-crumb标签上
new h_recommend().$mount('h-recommend');//把组件挂载到h-recommend标签上


function getElementClass(classnames) {
    var classobj = new Array();
    var classint = 0;
    var tags = document.getElementsByTagName("*");
    for (var i in tags) {
        if (tags[i].nodeType == 1) {
            if(tags[i].getAttribute('class')==classnames){
                classobj[classint]=tags[i];
                classint++;
            }
        }
    }
    return classobj;
}

var reg=/^.+:\/\/.+\/(.*)\.html(\?.*)?$/;
var arr=my_order.match(reg);
if(arr[1]=="ucenter"){
  var arr=$('.crumb>.search-path').find('ul>li');
  var i=arr[arr.length-1];
  $(i).find('.center').text('个人中心');
}