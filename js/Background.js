/**
 * Created by Administrator on 2017/5/16.
 */
(function(){
    //背景类，就是所有的平铺背景；
    //一会这个类将有三个实例：
    window.Background=Class.extend({
        //初始化
        init:function(params){
            this.image=params.image;
            this.width=params.width;
            this.height=params.height;
            this.speed=params.speed;
            this.y=params.y;
            this.x=0;

            //图片个数
            this.amount=Math.ceil(game.canvas.width/this.width)+1;
        },
        update:function(){
          this.x-=this.speed;
            if(this.x<=-this.image.width){
                this.x=0;
            }
        },
        //渲染，这个函数，梅帧执行
        render:function(){
            //绘制2倍这个图片
            for(var i=0;i<this.amount*2;i++){
                game.ctx.drawImage(this.image,0,0,this.width,this.height,this.x+this.width*i,this.y,this.width,this.height);
            }
        }
    })
})();