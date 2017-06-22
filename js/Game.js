/**
 * Created by Administrator on 2017/5/5.
 */
(function(){
    window.Game = Class.extend({
        //游戏类。最最核心的类。
        init : function(paramsJSON){
            var self=this;
            //fps表示frames per seceond每秒多少帧
            //默认值为60
            this.fps = paramsJSON.fps || 60;
            //定时器
            this.timer=null;
            //我的帧工具
            this.frameUtil=new FrameUtil();

            //得到canvas
            this.canvas=document.getElementById(paramsJSON.canvasId);
            //得到上下文
            this.ctx=this.canvas.getContext("2d");

            //所有图片
            this.images=null;
            //实例化一个静态资源管理工具
            this.sr = new StaticResoucesUtil();
            //命令这个静态资源管理工具，开始加载图片
            this.sr.loadImages("R.json",function(alreayLoadNum,allNum,imagesObj){
                self.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
                self.ctx.font="50px 黑体";
                //self.ctx.fillText("正在加载。。。 "+"----------"+ allNum,130,150);
               //如果已经加载的图片个数，等于了图片总数进行游戏
                if(alreayLoadNum==allNum){
                    self.images=imagesObj;
                    self.run();

                }
            });
        },
        //开始游戏
        run:function(){
            //备份this
            var self = this;
            //定时器
            this.timer=setInterval(function(){
                //主循环
                self.mainloop();
            },1000 / self.fps);

            //自己的一些演员，罗列出来
            this.fangzi=new Background({
                "image":this.images.fangzi,
                "width":300,
                "height":256,
                "speed":1,
                "y":270
            });

            //自己的一些演员，罗列出来（房子）
            this.bg3=new Background({
                "image":this.images.bg3,
                "width":48,
                "height":48,
                "speed":3,
                "y":360
            });

            //自己的一些演员，罗列出来（树）
            this.bg2=new Background({
                "image":this.images.bg2,
                "width":300,
                "height":256,
                "speed":2,
                "y":335
            });

            //自己的一些演员，罗列出来（路）
            this.bg3=new Background({
                "image":this.images.bg3,
                "width":48,
                "height":48,
                "speed":3,
                "y":this.canvas.height-48
            });

            //自己的一些演员，罗列出来（鸟）
            this.bird=new Bird();
        },
        //主循环
        mainloop:function(){
            //里面的语句，每帧执行.
            //console.log(Math.random())
            this.frameUtil.update();
            //console.log(this.frameUtil.realFps)

            //清屏
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
            //打印fps
            this.ctx.font="16px Consolas";
            this.ctx.fillText(" FPS / " + this.frameUtil.realFps,10,10);
            //打印帧编号
            this.ctx.fillText(" FNO / "+this.frameUtil.currentFrame,10,30);

            //this.ctx.drawImage(this.images.bird,200,200);

            this.fangzi.render();
            this.fangzi.update();

            this.bg2.render();
            this.bg2.update();

            this.bg3.render();
            this.bg3.update();

            //鸟的更新和渲染
            this.bird.render();
            this.bird.update();
        },


        //暂停游戏
        paus:function(){
            clearInterval(this.timer);
        }
    })
})();