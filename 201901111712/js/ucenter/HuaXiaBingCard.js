$(function () {

    //$("#BindCard").on("click", function () {
    //    var bankcard = $("#bankcard option:selected").text();
    //    var EngLish = /\(([^()]+)\)/g;
    //    var r = EngLish.exec(bankcard);
    //    var pay_code=r[i];
   
    //})
    SelectBalance();//查询余额

    if (GetCookie("Is_Open_Wallet") == 0)
    {
        $("#detail").hide();
        $(".my_money").hide();
    }else
    {
        $(".money_open").hide();
    }

     $(".btn-hideg").hide();
    BindList();//查询绑卡操作
    $(".get_validate").on("click", function () {
        BindCard();
    })
})

var user_id = GetUserId();
var unique_code;
var member_id;
function BindCard()
{

    var bank_name = $("#bank_name").val();
    var bank_card = $("#bank_card").val();//银行卡//开户账号
    var bank_number = $("#bank_number").val();
    var bank_phone = $("#bank_phone").val();
    var url =IP+ "/ThirdParty/HuaXia/HuaXiaHandler.ashx";
    var parajson = {};
    parajson.loginUserId = user_id;
    parajson.acc_no = bank_card;
    parajson.card_holder = bank_name;
    parajson.mobile = bank_phone;
    parajson.id_card = bank_number;
    parajson.Action = "readyBankCardBind";
    $.ajax({
        url: url,
        data: parajson,
        type: "get",
        dataType: "json",
        success: function (datajson) {
       
            if (datajson.resp_code == "0000")
            {
                $("#BankCode").modal("show");
                   var obj = $(".get_validate");
                    settime(obj);
                 unique_code = datajson.unique_code;
                 member_id = datajson.member_id;
                 var version = datajson.version;
                //var terminal_id = datajson.terminal_id;
                //var trans_serial_no = datajson.trans_serial_no;
               
                
            }

        }, error: function () {
            alert("网络错误！");
        }
    })

 
    
}
function BtnBingCard()
{
    $("#BankCode").modal("hide");
    var url = IP+"/ThirdParty/HuaXia/HuaXiaHandler.ashx";
    var PaySubAccount = GetCookie("PaySubAccount");//子账户会员号
    var TradeMemcode = GetCookie("TradeMemcode");//交易会员号
    var SettleAccountName = $("#bank_name").val();//姓名
    var PapersCode = $("#bank_number").val();
    var sms_code = $("#sms_code").val();//短信验证号码
    var acc_no = $("#bank_card").val();
    var mobile = $("#bank_phone").val();//银行预留手机号


    var bankcard = $("#bankcard option:selected").text();
    var EngLish = /\(([^()]+)\)/g;
    var r = EngLish.exec(bankcard);
    var pay_code = r[1];//银行英文缩写
    var china = new RegExp('[\u4e00-\u9fa5]+$', 'g');
    var pay_bank = bankcard.split('(')[0];//银行名称
    var id_holder = $("#bank_name").val();
    var id_card = $("#bank_number").val();//身份证号
    var PayBankNumber = $("#bankcard option:selected").val();//支付行号
    var IsOtherBank = 1;
    var marajson = {};
    marajson.Action = "personalAccountBind";
    marajson.loginUserID = user_id;
    marajson.SubAccount = PaySubAccount;
    marajson.TradeMemCode = TradeMemcode;
    marajson.IsOtherBank = IsOtherBank;
    marajson.SettleAccountName = SettleAccountName;
    marajson.SettleAccount = acc_no;
    marajson.PapersCode = PapersCode;
    marajson.PayBankNumber = PayBankNumber;
    marajson.sms_code = sms_code;//短信验证码
    marajson.unique_code = unique_code;
    marajson.pay_bank = pay_bank;
    marajson.pay_code = pay_code;
    marajson.acc_no = acc_no;
    marajson.id_card = id_card;
    marajson.id_holder = id_holder;
    marajson.mobile = mobile;
    $.ajax({
        url: url,
        data: marajson,
        type: "get",
        dataType: "json",
        success: function (datajson) {
           var status=datajson.CPMB2B.MessageData.ResHeader.Status;
           if (status.Code === "000000") {
               alert('绑卡成功');
           } else {
               alert(datajson.message);
           }

        }, error: function ()
        {
            alert("网络错误！");
        }
    })

}
var countdown = 60;
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

var paybanknumber;//支付行号
var user_name;
var CusPayMoney;
function BindList()
{
    var url = IP+"/ThirdParty/HuaXia/HuaXiaHandler.ashx?Action=selectBind_ID&loginUserId=" + user_id;
    $.ajax({
        url: url,
        type: "get",
        dataType: "json",
        success: function (datajson) {
       
            if (datajson.code == "100")
            {
                if (datajson.result.length > 0) {
                    $("#Bind_Id").html(datajson.result[0].Bind_Id);
                    $(".id_card").html(datajson.result[0].card_no);
                    $("#T_bank").html(datajson.result[0].card_no);
                    paybanknumber=datajson.result[0].paybanknumber;
                    user_name=datajson.result[0].user_name;

                    $(".btn-hideg").hide();
                }
                
            }
            else {
                $(".btn-hideg").show();
            }
        }, error: function () {
            alert("网络错误！");
        }
    })

}

var business_no;
function TouUpMoney()
{
    var url = IP+"/ThirdParty/HuaXia/HuaXiaHandler.ashx";
    var Bind_id = $("#Bind_Id").text();
    var txn_amt = $("#txn_amt").val();
    var payPassWord = $("#payPassWord").val();
    var parajson = {};
    parajson.Action = "readyPay";
    parajson.loginUserId = user_id;
    parajson.Bind_id = Bind_id;
    parajson.txn_amt = txn_amt;
    parajson.payPassWord = payPassWord;
    $.ajax({
        url: url,
        data: parajson,
        type: "get",
        dataType: "json",
        success: function (datajson) {
            if (datajson.resp_code == "0000")
            {
                $("#Top_Up").modal("hide");
                business_no = datajson.business_no;
                $("#Top_Up_Phone").modal("show");
                var obj = $(".top_up_validate");
                settime(obj);
            }
        }, error: function () {
            alert("网络错误！");
        }

    })
}
function BtnTopUp() {
    var url = IP+"/ThirdParty/HuaXia/HuaXiaHandler.ashx";
    var SubAccount = GetCookie("PaySubAccount");//子账户会员号
    var TradeMemCode = GetCookie("TradeMemcode");//交易会员号
    var txn_amt = $("#txn_amt").val();
    var top_validate = $("#top_validate").val();//验证码
    var parajson = {};
    parajson.SubAccount = SubAccount;
    parajson.TradeMemCode = TradeMemCode;
    parajson.Action = "surePay";
    parajson.business_no = business_no;
    parajson.txn_amt = txn_amt;
    parajson.loginUserId = user_id;
    parajson.sms_code = top_validate;
    $.ajax({
        url: url,
        data: parajson,
        type: "get",
        dataType: "json",
        success: function (datajson) {
           var status=datajson.CPMB2B.MessageData.ResHeader.Status;
           if(status.Code=="000000"){
               $("#Top_Up_Phone").modal("hide");
               SelectBalance();
                alert('充值成功');
           }
        }, error: function () {
            alert("网络错误！");
        }
    })

}
//开通钱包
function KMyMoney()
{
    var name = $("#k_name").val();
    var phone = $("#k_phone").val();
    var email = $("#k_email").val();
    var number = $("#k_number").val();
    var url = IP+"/ThirdParty/HuaXia/HuaXiaHandler.ashx";
    var parajson = {};
    parajson.Action = "openPersonalAccount";
    parajson.TradeMemBerName = name;
    parajson.PapersCode = number;
    parajson.MessagePhone = phone;
    parajson.Email = email;
    parajson.loginUserId = user_id;
    $.ajax({
        url: url,
        data: parajson,
        type: "get",
        dataType: "json",
        success: function (datajson) {
            alert(datajson.message)
         
        }, error: function () {
            alert("网络错误！");
        }
    })
}
//查询手续费
var otherBankCost;
var MerOtherPayMoney;
function CalculatTionFee()
{
    var OutComeMoney = $("#OutComeMoney").val();
    var SubAccount = GetCookie("PaySubAccount");//子账户会员号
    var TradeMemCode = GetCookie("TradeMemcode");//交易会员号
    var url = apiUrl + "/ThirdParty/HuaXia/HuaXiaHandler.ashx";
    var parajson = {};
    parajson.SubAccount = SubAccount;
    parajson.Action = "CalculatTionFee";
    parajson.TradeMemCode = TradeMemCode;
    parajson.OutComeMoney = OutComeMoney;
    parajson.loginUserId=user_id;
    $.ajax({
        url: IP+url,
        data: parajson,
        type: "get",
        dataType: "json",
        success: function (datajson) {
            console.log("手续费",datajson);
            if(datajson.CPMB2B.MessageData.ResHeader.Status.Code=="000000")
            {
                otherBankCost=datajson.CPMB2B.MessageData.DataBody.OtherBankCost;
                MerOtherPayMoney=datajson.CPMB2B.MessageData.DataBody.MerOtherPayMoney;
                 CusPayMoney=datajson.CPMB2B.MessageData.DataBody.CusPayMoney;
            }

        }, error: function () {
            alert("网络错误！");
        }

    })
}
//申请提现
function ApplyWithdrawal()
{
     var url = IP + "/ThirdParty/HuaXia/HuaXiaHandler.ashx";
    var SubAccount = GetCookie("PaySubAccount");//子账户会员号
    var TradeMemCode = GetCookie("TradeMemcode");//交易会员号
    var OutComeMoney = $("#OutComeMoney").val();//提现金额
    var payPassword = $("#payPassword").val();//支付密码
    var OutAccount = $("#T_bank").text();//银行卡
    var money=(parseFloat(OutComeMoney)+parseFloat(CusPayMoney))*100;
    OutComeMoney=parseFloat(OutComeMoney)*100;
   
    var parajson={};
    parajson.SubAccount=SubAccount;
    parajson.TradeMemCode=TradeMemCode;
    parajson.OutComeMoney=OutComeMoney;
    parajson.payPassword=payPassword;
    parajson.OutAccount=OutAccount;
    parajson.PayBankNumber=paybanknumber;
    parajson.OutAccountName=user_name;
    parajson.OtherBankCost=otherBankCost;
    parajson.MerOtherPayMoney=MerOtherPayMoney;
    parajson.CusPayMoney=CusPayMoney;
    parajson.Action="superNetOutMoney";
    parajson.loginUserId = user_id;
    parajson.SumSubMoney=OutComeMoney+parseFloat(CusPayMoney);
    $.ajax({
        url:url,
        data:parajson,
        type:"get",
        dataType:"json",
        success:function(datajson)
        {
            $("#T_PayPassWord").modal("hide");
        if(datajson.CPMB2B.MessageData.ResHeader.Status.Code=="000000")
        {
            alert("提现已申请！");
            SelectBalance();
        }else
        {
       alert("提现失败");

        }
        },error:function()
        {
            alert("网络错误！");
        }
    })
}
//查询余额
function SelectBalance() {
    var user_id = GetCookie('UserId');
    var sub_account = GetCookie('PaySubAccount');
    var trade_mem_code = GetCookie('TradeMemcode');
    var select_obj = {};
    select_obj.loginUserId = user_id;
    select_obj.SubAccount = sub_account;
    select_obj.TradeMemcode = trade_mem_code;

    var url = IP + "/ThirdParty/HuaXia/HuaXiaHandler.ashx?Action=selectBalance";

    $.ajax({
        url: url,
        type: "get",
        data: select_obj,
        dataType: "json",
        success: function (datajson) {

            if (datajson.CPMB2B.MessageData.ResHeader.Status.Code == "000000") {
                var money = parseFloat(datajson.CPMB2B.MessageData.DataBody.SubAccountMoney) / 100;
                $("#Banace").text(money);
            }
        }, error: function () {
            alert("网络错误！");
        }
    })
}