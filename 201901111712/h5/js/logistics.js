const IP="https://bird.ioliu.cn/v1?url=http://122.112.209.170:8088";
$(function(){
	LogisticsDateils();
})
function LogisticsDateils(){
	var express_number=GetQueryString('express_number')
    var url=IP+"/Data/order.ashx?Action=LogisticsInfo&number="+express_number;
    $.ajax({
        url:url,
        type:"get",
        dataType:"json",
        success:function(datajson){
            //{"status":"0","msg":"ok","result":{"number":"3388448932708","type":"STO","list":[{"time":"2018-12-06 13:26:24","status":"草签-已签收"},{"time":"2018-12-06 07:39:07","status":"上海普陀东部公司-L岚皋20线(18017350261,021-66619888)-派件中"},{"time":"2018-12-06 06:56:22","status":"已到达-上海普陀东部公司"},{"time":"2018-12-06 06:54:07","status":"已到达-上海普陀东部公司"},{"time":"2018-12-06 02:04:16","status":"已到达-上海普陀东部公司"},{"time":"2018-12-06 02:02:16","status":"上海中转部-已发往-上海普陀东部公司"},{"time":"2018-12-05 19:45:40","status":"浙江杭州萧山分拨中心-已发往-上海中转部"},{"time":"2018-12-05 19:45:40","status":"浙江杭州萧山分拨中心-已进行装袋扫描"},{"time":"2018-12-05 19:45:19","status":"已到达-浙江杭州萧山分拨中心"},{"time":"2018-12-05 19:41:40","status":"已到达-浙江杭州萧山分拨中心"},{"time":"2018-12-05 14:21:29","status":"浙江省市场部二十一部-业务员2(13455667788,)-已收件"}],"deliverystatus":"3","issign":"1","expName":"申通快递","expSite":"www.sto.cn ","expPhone":"95543"}}
        	
            console.log(datajson.result.list)
                var html="";
                if(datajson.msg=="ok"){
                    
                    var result=datajson.result.list;
                    var html="";
                    	html+="<ul>";
                    for (var i = 0; i < result.length; i++) {
                        html+="<li>" ;
                        // if(i==0){
                        //     html+="<span>最新</span>";
                        // }
                        html+="<span></span>";
                        // html+=" <span class=\"date\">"+result[i].time+"</span>";
                    	// html+=" <span class=\"week\">周一</span>";
                    	// html+="<span class=\"time\">14:38:55</span>";
                        html+="<span class=\"text\">"+result[i].status+"</span>";
                        html+=" </li>";

                    }
                    html+=" <li><span>卖家发货</span></li>";
                    html+="</ul>";
                    $(".logistics-list").html(html);
                    $("#express_number").html(datajson.result.number);
                    $("#express_company").html(datajson.result.expName);
                    $("#express_tel").html(datajson.result.expPhone);
                }

            
        },error:function(){
            alert("网络错误！");

        }
    })

}