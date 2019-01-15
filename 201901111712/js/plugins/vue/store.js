var store = new Vuex.Store({
    state:{
        NewMsg:{
            Msgs:[
                {
                    title:'暂无消息',
                    content:'暂无消息！',
                    url:'#no_msg',
                    id:'no_msg'
                }
            ]
        },
    },
    mutations:{
        modifyMsg (state,Obj){
            if(state.NewMsg.Msgs[0].id === 'no_msg'){
                state.NewMsg.Msgs.shift();
            }
            var obj = {
                title:Obj.title,
                content:Obj.content
            };
            obj.id = 'Msg_' + Obj.id;
            obj.url = '#' + obj.id;
            state.NewMsg.Msgs.push(obj);
        }
    },
    actions:{
        fetchMsg (context){
            $.ajax({
                    url:'PHP/GetMsgs.php',
                    type:'GET',
                    data:{},
                    dataType:'json',

                    success:function(response){
                        if ( typeof response === 'string') {
                            response = JSON.parse(response);
                        }
                        console.log(response);
                        $(response).each(function(k,v){
                            // console.log(v.id+v.title+v.content);
                            context.commit('modifyMsg',v);
                        });
                    }
                });
        }
    }
});