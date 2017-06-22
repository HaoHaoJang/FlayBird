/**
 * Created by Administrator on 2017/5/16.
 */
(function(){
    window.Bird = Class.extend({
        init : function(){
            this.x=(game.canvas.width-85)/2;
            this.y=100;
            this.w=85;
            this.h=60;

            //翅膀形态，合法值0,1,2;
            this.state=0;

            this.dy=1;

            this.dropStatFram=game.frameUtil.currentFrame;
        },

        update : function(){
            if(game.frameUtil.currentFrame %  5==0){
                this.state++;
                if(this.state>2){
                    this.state=0;
                }
            }
            //dy在变化
            this.dy=0.01*Math.pow(game.frameUtil.currentFrame-this.dropStatFram,2);
            this.y+=this.dy;
        },

        render:function(){
            game.ctx.save();
            game.ctx.rotate((Math.PI/180)*25);
            game.ctx.drawImage(game.images.bird,this.state*this.w,0,this.w,this.h,this.x,this.y,this.w,this.h)
            game.ctx.restore();
        }
    })
})();