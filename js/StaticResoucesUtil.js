/**
 * Created by Administrator on 2017/5/5.
 */
(function(){
    //静态资源管理类，这个类用于加载所有的静态图片，音乐。
    window.StaticResoucesUtil=Class.extend({
        init:function(){
            this.images=new Object();
        },
        //读取图片
        //调用loadImages有两个参数
        //第一个是JSON;表示读取的列表
        //第二个是回调函数，回调函数又接受3个参数:已经加载的数量、总数量、图片对象；
        loadImages:function(jsonURL,callback){
            //备份this
            var self=this;
            //先要去读取json文件，用什么读？AJAX
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange=function(){

                if(xhr.readyState==4){
                    if(xhr.status>=200 && xhr.status<300||xhr.status==304){
                        var alreayLoadNumber=0;//已经加载好的图片数量
                        //将json文件里面的纯文本，转为json对象
                        var jsonObj=JSON.parse(xhr.responseText);
                        console.log(jsonObj.images);
                        //循环语句，去挨个向每个图片发出请求
                        for(var i=0;i<jsonObj.images.length;i++){
                            //创建一个图片
                            var image=new Image();
                            //一旦设置src属性，请求发出
                            image.src=jsonObj.images[i].src;
                            image.index=i;
                            image.onload=function(){
                                alreayLoadNumber++;//让已经加载好的图片数量加一;
                                //保存在自己的images属性里
                                self.images[jsonObj.images[this.index].name]=this;
                                callback(alreayLoadNumber,jsonObj.images.length,self.images)
                            }
                        }
                    }
                }
            }
            xhr.open("get",jsonURL,true);
            xhr.send(null);
        }
    })
})();