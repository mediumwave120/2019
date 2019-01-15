new Vue({
	el:'#app',
	data:{
		recommendGoodsList:[]
	},
	mounted:function(){
		this.$nextTick(function(){
			this.recommendGoods();
		})
	},
	methods:{
		recommendGoods:function(){
			var _this=this;
				
			$.ajax({
	            url: IP+"/DataMobile/home.ashx?Action=GetHome",
	            type: 'post',
	            dataType: 'json',
	            success: function (result) {
	            	console.log(result.data[0].RecommendGoods);
	            	if(result.code==="100"){
	            		var result=result.data[0].RecommendGoods;
	            		_this.recommendGoodsList=result;
	            	}
	            }
	        });
		}
	}
})