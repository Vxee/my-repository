class DogAnimation {
    constructor(canvas, follow) { // follow 是否跟随鼠标移动
        canvas.width = window.innerWidth
        canvas.height = 200
        window.onresize = () => canvas.width = window.innerWidth;
        // 存放加载后狗的图片
        this.dogPictures = [];
        // 图片目录
        this.RES_PATH = "./images";
        this.IMG_COUNT = 8;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        // 记录上一帧的时间
        this.lastWalkingTime = Date.now();
        // 记录当前画的图片索引
        this.keyFrameIndex = -1;
        this.dog = {
            follow: follow,
            // 一步10px
            stepDistance: 10,
            // 狗的速度
            speed: 0.1,
            // 鼠标的x坐标
            mouseX: 0,
            // 往前走停留的位置
            frontStopX: -1,
            // 往回走停留的位置,
            backStopX: window.innerWidth,
            direct: 1
        };
        this.currentX = 0;
        this.start();
    }
    async start() {
        // 等待资源加载完
        await this.loadResources();
        this.pictureWidth = this.dogPictures[0].naturalWidth / 2;
        if (this.dog.follow) {
            this.recordMousePosition();
        }
        // 给下一帧注册一个函数
        window.requestAnimationFrame(this.walk.bind(this));
    }
    loadResources() {
        let imagesPath = [];
        // 准备图片的src
        for (let i = 0; i <= this.IMG_COUNT; i++) {
            imagesPath.push(`${this.RES_PATH}/${i}.png`);
        }
        let works = [];
        imagesPath.forEach(imgPath => {
            // 图片加载完之后触发promise的resolve
            works.push(new Promise(resolve => {
                let img = new Image();
                img.onload = () => resolve(img);
                img.src = imgPath;
            }));
        });
        return new Promise(resolve => {
            // 借助Promise.all知道了所有图片都加载好了
            Promise.all(works).then(dogPictures => {
                this.dogPictures = dogPictures;
                resolve();
            })
        }) // 这里再套一个Promise是为了让调用者能够知道处理好了
    }
    walk() {
        // 绘制狗的图片
        let now = Date.now();
        // 计算位移 = 时间 * 速度
        let diffDistance = (now - this.lastWalkingTime) * this.dog.speed;
        if (diffDistance < this.dog.stepDistance) {
            window.requestAnimationFrame(this.walk.bind(this));
            return;
        }
        // 获取下一张图片的索引
        let keyFrameIndex = ++this.keyFrameIndex % this.IMG_COUNT;
        let direct = 1,
            stopWalking = false;
        if (this.dog.follow) {
            // 如果鼠标在狗的前面则往前走
            if (this.dog.frontStopX > this.dog.mouseX) {
                direct = 1;
            }
            // 如果鼠标在狗的后面则往回走
            else if (this.dog.backStopX < this.dog.mouseX) {
                direct = -1;
            }
            // 如果鼠标在狗在的位置
            else {
                stopWalking = true;
                // 如果鼠标在小狗图片中间的右边，则direct为正，否则为负
                direct = this.dog.backStopX - this.dog.mouseX > this.pictureWidth / 2 ? 1 : -1;
                // 如果停住的话用0.png(后面还会加1)
                this.keyFrameIndex = -1;
            }
        }else{
            if(this.dog.direct == 1 && this.dog.mouseX >= (this.canvas.width- this.pictureWidth)){
                this.dog.direct = direct = -1;
            }
            if(this.dog.direct == -1 && this.dog.mouseX < 0){
                this.dog.direct = direct = 1;
            }
            direct = this.dog.direct;
        }


        let ctx = this.ctx;
        // 先清掉上一次画的内容
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.save();
        if (!stopWalking) {
            this.dog.mouseX += this.dog.stepDistance * direct;
        }
        // 反向绘制
        if (direct === -1) {
            ctx.scale(direct, 1);
        }

        let img = this.dogPictures[keyFrameIndex + 1];
        let drawX = 0;
        drawX = this.dog.mouseX * direct - (direct === -1 ? this.pictureWidth : 0);
        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, drawX, 20, 186, 162);
        ctx.restore();
        this.lastWalkingTime = now;
        window.requestAnimationFrame(this.walk.bind(this));
    }
    recordMousePosition() {
        window.addEventListener('mousemove', event => {
            // 要减去图片的宽度
            this.dog.frontStopX = event.clientX - this.pictureWidth;
            this.dog.backStopX = event.clientX;
        })
    }
}

let canvas1 = document.querySelector("#dog1");
let dogAnimation1 = new DogAnimation(canvas1, false);
let canvas = document.querySelector("#dog");
let dogAnimation = new DogAnimation(canvas, true);
