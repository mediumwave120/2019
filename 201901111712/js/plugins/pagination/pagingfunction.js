
//订单分页
function OrderPaging(order_state) {

    var totalNum = parseInt($("#count").text());//总的条数
    new Page({
        id: 'pagination',
        pageTotal: Math.ceil(totalNum / 10), //必填,总页数
        pageAmount: 10,  //每页多少条
        dataTotal: totalNum, //总共多少条数据
        curPage: 1, //初始页码,不填默认为1
        pageSize: 5, //分页个数,不填默认为5
        showPageTotalFlag: true, //是否显示数据统计,不填默认不显示
        showSkipInputFlag: true, //是否支持跳转,不填默认不显示
        getPage: function (page) {
            //获取当前页数

            Order(page, order_state);
        }
    })
}

//个人收藏商品分页
function GetGoodsCollectPaging() {

    var totalNum = parseInt($("#count").text());//总的条数
    new Page({
        id: 'collectpaging',
        pageTotal: Math.ceil(totalNum / 10), //必填,总页数
        pageAmount: 10,  //每页多少条
        dataTotal: totalNum, //总共多少条数据
        curPage: 1, //初始页码,不填默认为1
        pageSize: 5, //分页个数,不填默认为5
        showPageTotalFlag: true, //是否显示数据统计,不填默认不显示
        showSkipInputFlag: true, //是否支持跳转,不填默认不显示
        getPage: function (page) {
            //获取当前页数

            GetGoodsCollectLis(page);
        }
    })
}

//个人关注店铺分页

function GetMerchantsInPaging() {

    var totalNum = parseInt($("#count").text());//总的条数
    new Page({
        id: 'pagination',
        pageTotal: Math.ceil(totalNum / 10), //必填,总页数
        pageAmount: 10,  //每页多少条
        dataTotal: totalNum, //总共多少条数据
        curPage: 1, //初始页码,不填默认为1
        pageSize: 5, //分页个数,不填默认为5
        showPageTotalFlag: true, //是否显示数据统计,不填默认不显示
        showSkipInputFlag: true, //是否支持跳转,不填默认不显示
        getPage: function (page) {
            //获取当前页数

            GetMerchantsInList(page);
        }
    })
}
function GetMyFoot() {

    var totalNum = parseInt($("#count").text());//总的条数
    new Page({
        id: 'pa',
        pageTotal: Math.ceil(totalNum / 10), //必填,总页数
        pageAmount: 10,  //每页多少条
        dataTotal: totalNum, //总共多少条数据
        curPage: 1, //初始页码,不填默认为1
        pageSize: 5, //分页个数,不填默认为5
        showPageTotalFlag: true, //是否显示数据统计,不填默认不显示
        showSkipInputFlag: true, //是否支持跳转,不填默认不显示
        getPage: function (page) {
            //获取当前页数

            MyFootprint(page);
        }
    })
}
function TopUpPaging()
{
    var totalNum = parseInt($("#toucount").text());//总的条数
    new Page({
        id: 'tupuppaging',
        pageTotal: Math.ceil(totalNum / 10), //必填,总页数
        pageAmount: 10,  //每页多少条
        dataTotal: totalNum, //总共多少条数据
        curPage: 1, //初始页码,不填默认为1
        pageSize: 5, //分页个数,不填默认为5
        showPageTotalFlag: true, //是否显示数据统计,不填默认不显示
        showSkipInputFlag: true, //是否支持跳转,不填默认不显示
        getPage: function (page) {
            //获取当前页数

            TopUpList(page);
        }
    })
}
function WithdrawalPaging()
{
    var totalNum = parseInt($("#withcount").text());//总的条数
    new Page({
        id: 'withpaging',
        pageTotal: Math.ceil(totalNum / 10), //必填,总页数
        pageAmount: 10,  //每页多少条
        dataTotal: totalNum, //总共多少条数据
        curPage: 1, //初始页码,不填默认为1
        pageSize: 5, //分页个数,不填默认为5
        showPageTotalFlag: true, //是否显示数据统计,不填默认不显示
        showSkipInputFlag: true, //是否支持跳转,不填默认不显示
        getPage: function (page) {
            //获取当前页数

            WithdrawalList(page);
        }
    })
      
}

//投诉店铺分页
function ReportShopPaging()
{
    
    var totalNum = parseInt($("#report_shop_count").text());//总的条数
    new Page({
        id: 'ReportShopPagin',
        pageTotal: Math.ceil(totalNum / 10), //必填,总页数
        pageAmount: 10,  //每页多少条
        dataTotal: totalNum, //总共多少条数据
        curPage: 1, //初始页码,不填默认为1
        pageSize: 5, //分页个数,不填默认为5
        showPageTotalFlag: true, //是否显示数据统计,不填默认不显示
        showSkipInputFlag: true, //是否支持跳转,不填默认不显示
        getPage: function (page) {
            //获取当前页数

            ReportShopList(page);
        }
    })
}
//举报商品分页
function ReportGoodsPaging() {

    var totalNum = parseInt($("#report_goods_count").text());//总的条数
    new Page({
        id: 'reportgoodspagin',
        pageTotal: Math.ceil(totalNum / 10), //必填,总页数
        pageAmount: 10,  //每页多少条
        dataTotal: totalNum, //总共多少条数据
        curPage: 1, //初始页码,不填默认为1
        pageSize: 5, //分页个数,不填默认为5
        showPageTotalFlag: true, //是否显示数据统计,不填默认不显示
        showSkipInputFlag: true, //是否支持跳转,不填默认不显示
        getPage: function (page) {
            //获取当前页数

            ReportGoodsList(page);
        }
    })
}
function RefundPaging() {
    var totalNum = parseInt($("#refundcount").text());//总的条数
    new Page({
        id: 'refundpaging',
        pageTotal: Math.ceil(totalNum / 10), //必填,总页数
        pageAmount: 10,  //每页多少条
        dataTotal: totalNum, //总共多少条数据
        curPage: 1, //初始页码,不填默认为1
        pageSize: 5, //分页个数,不填默认为5
        showPageTotalFlag: true, //是否显示数据统计,不填默认不显示
        showSkipInputFlag: true, //是否支持跳转,不填默认不显示
        getPage: function (page) {
            //获取当前页数

            RefundList(page);
        }
    })

}
