//import PhaserMatterCollisionPlugin from "../js/phaser-matter-collision.js"

//開放性血量、敵人
class HealthBar {

    constructor (scene, x, y)
    {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        this.value = 100;
        this.p = 76 / 100;

        this.draw();

        scene.add.existing(this.bar);
    }

    decrease (amount)
    {
        this.value -= amount;

        if (this.value < 0)
        {
            this.value = 0;
        }

        this.draw();

        return (this.value === 0);
    }

    draw ()
    {
        this.bar.clear();

        //  BG
        this.bar.fillStyle(0x000000);
        this.bar.fillRoundedRect(5, 5, 80, 16, 5).setDepth(1);

        //  Health

        this.bar.fillStyle(0xaaaaaa);
        this.bar.fillRoundedRect(7, 7, 76, 12, 5).setDepth(2);

        if (this.value < 30){
            this.bar.fillStyle(0xff6600);
        }
        else{
            this.bar.fillStyle(0x66ff00);
        }

        var d = Math.floor(this.p * this.value);

        this.bar.fillRoundedRect(7, 7, d, 12, 5).setDepth(2);
    }

}

class Clock {

    constructor (scene, x, y)
    {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.draw();

        scene.add.existing(this.bar);
    }

    draw ()
    {
        this.bar.clear();

        //  BG
        this.bar.fillStyle(0x776666);
        this.bar.fillRoundedRect(790, 8, 170, 20, 5).setDepth(2);

        //  Health

        this.bar.fillStyle(0x000000);
        this.bar.fillRoundedRect(792, 10, 166, 16, 5).setDepth(3);
    }

}

class Enemy extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y)
    {
        super(scene, x, y);

        this.setTexture('cards');
        
        this.startX = x;
        this.startY = y;
        this.setPosition(x, y);

        //this.play('lroam');

        scene.add.existing(this);

        //this.on('animationcomplete', this.animComplete, this);

        this.enemyDirec = false;

        this.alive = true;
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);
    }
}

class Player extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y)
    {
        super(scene, x, y);

        this.setTexture('alice');
        this.setPosition(x, y);

        this.play('lwalk');

        scene.add.existing(this);

        //this.on('animationcomplete', this.animComplete, this);

        this.alive = true;

        this.hp = new HealthBar(scene, x - 40, y - 110);
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);
    }

    damage (amount)
    {
        if (this.hp.decrease(amount))
        {
            this.alive = false;
        }
    }
}

//鍵盤變數
var cursors;

//場景
var load = {
    key: 'load',

    preload: function(){
        /*
        var loadText = this.add.text(config.width/2 , 100 ,'load',{
            color: '#ff0',
            fontFamily: 'Tahoma',
            fontSize: 40,
            resolution: 2
        }).setOrigin(0.5, 0.5);
        */

        //開始畫面資源加載
        this.load.image('sbg','assets/start/startbackground.png');
        this.load.image('title','assets/start/title.png');
		this.load.image('startbutton','assets/start/start.png');

        //主畫面資源加載
        this.load.image('mbg','assets/main/mainbackground.jpg');
		this.load.image('ExtroversionButton','assets/main/Extroversion.png');
        this.load.image('ExtroversionButton2','assets/main/Extroversion2.png');
		this.load.image('NeuroticismButton','assets/main/Neuroticism.png');
        this.load.image('NeuroticismButton2','assets/main/Neuroticism2.png');
		this.load.image('AgreeablenessButton','assets/main/Agreeableness.png');
        this.load.image('AgreeablenessButton2','assets/main/Agreeableness2.png');
		this.load.image('ConscientiousnessButton','assets/main/Conscientiousness.png');
        this.load.image('ConscientiousnessButton2','assets/main/Conscientiousness2.png');
		this.load.image('ExperienceButton','assets/main/Experience.png');
        this.load.image('ExperienceButton2','assets/main/Experience2.png');

        //開放性資源加載
        this.load.image('expstart','assets/experience/expstart.png');
		this.load.image('expgoal','assets/experience/treehole.png');
		this.load.image('expgoal2','assets/experience/worm.png');
		this.load.image('expgoal3','assets/experience/queenandsol/queen.png');
		this.load.image('tunel','assets/experience/tunel.png');
		this.load.image('boundary_tiles','assets/experience/invisible.png');
        this.load.image('base_tiles', 'assets/experience/[A]Grass1-Grass2_pipo.png')
        this.load.image('bush_tiles', 'assets/experience/tree/tree.png')
        this.load.image('yard_tiles', 'assets/experience/origion.png')
        this.load.image('pussss_tiles', 'assets/experience/smoke/smoke.png')
        this.load.tilemapTiledJSON('tilemap', 'assets/experience/base_tiles.json')
        this.load.image('expIntroduce0','assets/experience/exp_introduce0.png');
        this.load.image('expIntroduce1','assets/experience/exp_introduce1.png');
        this.load.image('expIntroduce2','assets/experience/exp_introduce2.png');
        this.load.image('expIntroduce3','assets/experience/exp_introduce3.png');
        this.load.image('expIntroduce4','assets/experience/exp_introduce4.png');
        this.load.image('expIntroduce5','assets/experience/exp_introduce5.png');
		this.load.spritesheet('cards','assets/experience/Card.png',{
            frameWidth: 32,
            frameHeight: 32,
        });
		this.load.spritesheet('CardStraight','assets/experience/CardStraight.png',{
            frameWidth: 32,
            frameHeight: 32,
        });
		this.load.spritesheet('alice','assets/experience/Alice.png',{
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.audio('walk',['assets/experience/aud/414336__mativve__walking-3.wav'])
        this.load.audio('hurt',['assets/experience/aud/371061__planetronik__video-game-bass.wav'])
        this.load.tilemapTiledJSON('expmap', 'assets/experience/maze.json');

        //盡責性資源加載
        this.load.image('conbg0','assets/conscientiousness/back0.png');
        this.load.image('conbg1','assets/conscientiousness/back1.png');
        this.load.image('conbg2','assets/conscientiousness/back2.png');
        this.load.image('platform','assets/conscientiousness/platform.png');
        this.load.image('contile','assets/conscientiousness/ConTile.png');
        this.load.image('brick','assets/conscientiousness/brick.png');
        this.load.image('brickbuild','assets/conscientiousness/brickbuild.png');
        this.load.image('wood','assets/conscientiousness/wood.png');
        this.load.image('woodbuild','assets/conscientiousness/woodbuild.png');
        this.load.image('thatch','assets/conscientiousness/thatch.png');
        this.load.image('thatchbuild','assets/conscientiousness/thatchbuild.png');
        this.load.image('backin','assets/conscientiousness/back_in.png');
        this.load.image('backout','assets/conscientiousness/back_out.png');
        this.load.image('buildin','assets/conscientiousness/build_in.png');
        this.load.image('buildout','assets/conscientiousness/build_out.png');
        this.load.image('defensein','assets/conscientiousness/defense_in.png');
        this.load.image('defenseout','assets/conscientiousness/defense_out.png');
        this.load.image('leftin','assets/conscientiousness/left_in.png');
        this.load.image('leftout','assets/conscientiousness/left_out.png');
        this.load.image('rightin','assets/conscientiousness/right_in.png');
        this.load.image('rightout','assets/conscientiousness/right_out.png');
        this.load.image('menuin','assets/conscientiousness/menu_in.png');
        this.load.image('menuout','assets/conscientiousness/menu_out.png');
        this.load.image('nextin','assets/conscientiousness/next_in.png');
        this.load.image('nextout','assets/conscientiousness/next_out.png');
        this.load.image('closein','assets/conscientiousness/close_in.png');
        this.load.image('closeout','assets/conscientiousness/close_out.png');
        this.load.image('village','assets/conscientiousness/pig_village.png');
        this.load.image('pig1','assets/conscientiousness/pig1.png');
        this.load.image('pig2','assets/conscientiousness/pig2.png');
        this.load.image('pig3','assets/conscientiousness/pig3.png');
        this.load.image('pig4','assets/conscientiousness/pig4.png');
        this.load.image('pig5','assets/conscientiousness/pig5.png');
        this.load.image('pig6','assets/conscientiousness/pig6.png');
        this.load.image('pig7','assets/conscientiousness/pig7.png');
        this.load.image('pig8','assets/conscientiousness/pig8.png');
        this.load.image('pig9','assets/conscientiousness/pig9.png');
        this.load.image('pig0','assets/conscientiousness/pig0.png');
        this.load.image('tumb','assets/conscientiousness/tumb.png');
        this.load.image('conIntroduce0a','assets/conscientiousness/con_introduce0a.png')
        this.load.image('conIntroduce0b','assets/conscientiousness/con_introduce0b.png')
        this.load.image('conIntroduce0c','assets/conscientiousness/con_introduce0c.png')
        this.load.image('conIntroduce1','assets/conscientiousness/con_introduce1.png');
        this.load.image('conIntroduce2','assets/conscientiousness/con_introduce2.png');
        this.load.image('conIntroduce3','assets/conscientiousness/con_introduce3.png');
        this.load.image('conIntroduce4','assets/conscientiousness/con_introduce4.png');
        this.load.image('conIntroduce5','assets/conscientiousness/con_introduce5.png');
        this.load.image('conIntroduce6','assets/conscientiousness/con_introduce6.png');
        this.load.image('conIntroduce7','assets/conscientiousness/con_introduce7.png');
        this.load.image('congoal1','assets/conscientiousness/lv1_goal.png');
        this.load.image('congoal2','assets/conscientiousness/lv2_goal.png');
        this.load.image('congoal3','assets/conscientiousness/lv3_goal.png');
        this.load.image('maprole','assets/conscientiousness/maprole.png');

        this.load.tilemapTiledJSON('conmap','assets/conscientiousness/conmap32x32_w320h144.json');
        this.load.tilemapTiledJSON('conmap_end','assets/conscientiousness/conmap_end.json');
        this.load.spritesheet('conrobot','assets/conscientiousness/Pig.png',{
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.spritesheet('wolve','assets/conscientiousness/wolve.png',{
            frameWidth: 880,
            frameHeight: 880,
        });
        this.load.spritesheet('consmoke','assets/conscientiousness/consmoke.png',{
            frameWidth: 880,
            frameHeight: 880,
        });

        //神經質資源加載
        this.load.image('testbg','assets/neuroticism/assets/test1.png');//背景
        this.load.image('mask','assets/neuroticism/assets/mask.png');
        this.load.image('neuground','assets/neuroticism/assets/item/ground.png');//地板顏料
        this.load.image('goldenkey','assets/neuroticism/assets/item/goldenkey.png');
        //this.load.image('ironkey','assets/neuroticism/assets/item/ironkey.png');
        //this.load.image('woodenkey','assets/neuroticism/assets/item/woodenkey.png');
        this.load.image('neuUI','assets/neuroticism/assets/item/itemUI.png');
        this.load.image('passion','assets/neuroticism/assets/item/passion.png');
        this.load.tilemapTiledJSON('neumap','assets/neuroticism/assets/item/castle.json');//配置地圖
        this.load.image('neuIntroduce0','assets/neuroticism/assets/item/neu_introduce0.png');
        this.load.image('neuIntroduce1','assets/neuroticism/assets/item/neu_introduce1.png');
        this.load.image('neuIntroduce2','assets/neuroticism/assets/item/neu_introduce2.png');
        this.load.image('neuIntroduce3','assets/neuroticism/assets/item/neu_introduce3.png');
        this.load.image('neuIntroduce4','assets/neuroticism/assets/item/neu_introduce4.png');
        this.load.image('neuIntroduce5','assets/neuroticism/assets/item/neu_introduce5.png');
        this.load.image('neuIntroducea','assets/neuroticism/assets/item/neu_introducea.png');
        this.load.image('neuIntroduceb','assets/neuroticism/assets/item/neu_introduceb.png');
        this.load.image('block', 'assets/neuroticism/assets/item/block.png');
        this.load.image('bell', 'assets/neuroticism/assets/item/bell.png');
        this.load.image('goose', 'assets/neuroticism/assets/item/goose.png');
        this.load.image('harp', 'assets/neuroticism/assets/item/harp.png');
        this.load.image('coin', 'assets/neuroticism/assets/item/coin.png');
        this.load.image('rat', 'assets/neuroticism/assets/item/rat.png');
        this.load.image('cocroach', 'assets/neuroticism/assets/item/cocroach.png');
        this.load.image('giantSleep', 'assets/neuroticism/assets/item/giant.png');
        this.load.image('giantRun', 'assets/neuroticism/assets/item/giant1.png');
        this.load.image('madefrom', 'assets/neuroticism/assets/item/madefrom.png');
        this.load.image('kulu', 'assets/neuroticism/assets/item/kulu.png');
        this.load.image('barrier', 'assets/neuroticism/assets/item/passion.png');
        this.load.spritesheet('player','assets/neuroticism/assets/item/player2.png',
        {
            frameWidth: 64,
            frameHeight: 64,
        });//角色
        this.load.image('deathimage', 'assets/neuroticism/assets/item/deathimage.png');
        this.load.image('background', 'assets/neuroticism/assets/item/background.png');
        //音源
        this.load.audio('snore', 'assets/neuroticism/assets/item/snore.mp3');
        this.load.audio('footstep', 'assets/neuroticism/assets/item/footstep.mp3');
        this.load.audio('harpSound', 'assets/neuroticism/assets/item/harp.mp3');


        //監聽load進度
        var pergressText = this.make.text({
            x: this.game.config.width / 2,
            y: this.game.config.height / 2,
            text: '0%',
            style: {
              font: '64px monospace',//大小
              fill: '#ffffff'
            }
          }).setOrigin(0.5, 0.5);
        this.load.on('progress', function (value) {
            pergressText.setText(parseInt(value * 100) + '%');
        });

        //設定停留時間，最少三秒
        this.load.on('complete',function(){
            onLoad();
        });
        var loadArrow = false;
        setTimeout(function(){
            loadArrow = true;
        },1000);
        //加載完畢

        function onLoad(){
            if(loadArrow){
                game.scene.start('start');
                //game.scene.start('main');
                //game.scene.start('experience3');
                //game.scene.start('conscientiousness');
                //game.scene.start('conscientiousnessEnd');
                //game.scene.start('neuroticism');
            }
            else{
                setTimeout(onLoad,1000);
            }
        }
    },
}

var neuFirstTime = true;

var start = {
    key: 'start',

    create: function(){
        //init
        expFirstTime = true;
        //添加背景
        var bg = this.add.image(game.config.width/2,game.config.height/2,'sbg');
        bg.displayWidth = game.config.width;
        bg.displayHeight = game.config.height;
        //添加標題
        var title = this.add.image(game.config.width*0.5,game.config.height*0.25, 'title'); 
        title.setScale(0.3);
        //開始選項
        /*
        var startbutton2 = this.add.sprite(game.config.width*0.5,game.config.height*0.5, 'startbutton2')
        startbutton2.setScale(0.4);
        startbutton2.alpha = 0;
        */
        var startbutton = this.add.sprite(game.config.width*0.5,game.config.height*0.75, 'startbutton')
        .setInteractive()
        .on('pointerdown', function (event) {
            game.scene.stop('start');
            game.scene.start('main');
        })
        .on('pointerover', function (event) {
            //startbutton2.alpha = 1;
            //this.setTint(0xff0000)
        })
        .on('pointerout', function (event) {
            //startbutton2.alpha = 0;
            //this.clearTint();
        });
        startbutton.setScale(0.6);
        //設定選項
        /*
        var settingbutton2 = this.add.sprite(game.config.width*0.5,game.config.height*0.7, 'setting2')
        settingbutton2.setScale(0.4);
        settingbutton2.alpha = 0;
        */
       /*
        var settingbutton = this.add.sprite(game.config.width*0.6,game.config.height*0.75, 'setting')
        .setInteractive()
        .on('pointerdown', function (event) {
            alert('coming soon');
        })
        .on('pointerover', function (event) {
            /*
            settingbutton2.alpha = 1;
            this.setTint(0xff0000)
            */
        //})
        //.on('pointerout', function (event) {
            /*
            settingbutton2.alpha = 0;
            this.clearTint();
            */
        //});
        //settingbutton.setScale(0.4);

        //結束選項
        /*
        var exitbutton2 = this.add.sprite(game.config.width*0.5,game.config.height*0.9, 'exit2');
        exitbutton2.setScale(0.8);
        exitbutton2.alpha = 0;
        var exitbutton = this.add.sprite(game.config.width*0.5,game.config.height*0.9, 'exit')
        .setInteractive()
        .on('pointerdown', function (event) {
            alert('coming soon');
        })
        .on('pointerover', function (event) {
            exitbutton2.alpha = 1;
            this.setTint(0xff0000)
        })
        .on('pointerout', function (event) {
            exitbutton2.alpha = 0;
            this.clearTint();
        });
        exitbutton.setScale(0.8);
        */
    },
}

var conLevel = 1;

var main = {
    key: 'main',

    create: function(){
        //背景
        var bg = this.add.image(game.config.width/2,game.config.height/2,'mbg');
        bg.displayWidth = game.config.width;
        bg.displayHeight = game.config.height;
        //傳送門
        var game1 = this.add.sprite(game.config.width*0.3,game.config.height*0.3,'ExperienceButton')
        .setInteractive()
        .setScale(0.15)
        .on('pointerdown', function (event) {
            game.scene.stop('main');
            game.scene.start('experience1');
        })
        .on('pointerover', function (event) {
            game1a.alpha = 1;
        })
        .on('pointerout', function (event) {
            this.clearTint();
            game1a.alpha = 0;
        });
        var game1a = this.add.sprite(game.config.width*0.3,game.config.height*0.3,'ExperienceButton2')
        .setScale(0.3);
        game1a.alpha = 0

        var game2 = this.add.sprite(game.config.width*0.8,game.config.height*0.73,'ExtroversionButton')
        .setInteractive()
        .setScale(0.15)
        .on('pointerdown', function (event) {
            //game.scene.start('ExtroversionButton');
            alert('coming soon');
        })
        .on('pointerover', function (event) {
            game2a.alpha = 1;
        })
        .on('pointerout', function (event) {
            this.clearTint();
            game2a.alpha = 0;
        });

        var game2a = this.add.sprite(game.config.width*0.8,game.config.height*0.73,'ExtroversionButton2')
        .setScale(0.15);//跟game5位置互換
        game2a.alpha = 0;

        var game3 = this.add.sprite(game.config.width*0.2,game.config.height*0.73,'ConscientiousnessButton')
        .setInteractive()
        .setScale(0.15)
        .on('pointerover', function (event) {
            game3a.alpha = 1;
        });
        var game3a = this.add.sprite(game.config.width*0.2,game.config.height*0.73,'ConscientiousnessButton2')
        .setInteractive()
        .setScale(0.3)
        .on('pointerdown', function (event) {
            conLevel = 1;
            game.scene.stop('main')
            game.scene.start('conscientiousness');
        })
        .on('pointerout', function (event) {
            game3a.alpha = 0;
        });
        game3a.alpha = 0;
        
        var game4 = this.add.sprite(game.config.width*0.5,game.config.height*0.73,'AgreeablenessButton')
        .setInteractive()
        .setScale(0.15)
        .on('pointerdown', function (event) {
            //game.scene.start('agreeableness');
            alert('coming soon');
        })
        .on('pointerover', function (event) {
            game4a.alpha = 1;
        })
        .on('pointerout', function (event) {
            this.clearTint();
            game4a.alpha = 0;
        });
        var game4a = this.add.sprite(game.config.width*0.5,game.config.height*0.73,'AgreeablenessButton2')
        .setScale(0.15);
        game4a.alpha = 0;

        var game5 = this.add.sprite(game.config.width*0.7,game.config.height*0.3,'NeuroticismButton')
        .setInteractive()
        .setScale(0.15)
        .on('pointerdown', function (event) {
            game.scene.stop('main')
            game.scene.start('neuroticism');
        })
        .on('pointerover', function (event) {
            game5a.alpha = 1;
        })
        .on('pointerout', function (event) {
            this.clearTint();
            game5a.alpha = 0;
        });
        var game5a = this.add.sprite(game.config.width*0.7,game.config.height*0.3,'NeuroticismButton2')
        .setScale(0.3);
        game5a.alpha = 0
    },

    
}

var CardHL = []
var CardHR = []
var CardVU = []
var CardVD = []
var Alice
var amountHL, amountHR, amountVU, amountVD
var bushes,boundary,text1,tile,mist,i;
var expFirstTime = true, expstate = 1, lastState = 0, inBush = false;
var movability, invincible, moveFlag, entrance, expGoEnd1 = false;
var soundFlag, walk, walkFlag, hurt;
var exprestart, exptimeout = false, hit1, hit2;
var lastAttachment = false, attachment = false, change = false;
var timeText, sceneTimedEvent, audioEvent, TimedEvent;

//時間參數
var exptimeLock = false, expgametime, exptimeFlag = false;

var flashingEvent;
var flashFlag = false;

var experience1 = {

    key: 'experience1',

    create: function(){
        //init
        expstate = 1, lastState = 0, inBush = false, lastAttachment = false, attachment = false;
        exptimeLock = false, expgametime, exptimeFlag = false;
        soundFlag = true, walk, walkFlag = false;

        const map = this.make.tilemap({key: 'tilemap'});//可設置長寬//used
        const tileset1 = map.addTilesetImage('standard_tiles', 'base_tiles');
        const tileset2 = map.addTilesetImage('tree', 'bush_tiles');
        const tileset3 = map.addTilesetImage('Town', 'bush_tiles');
        // create the layers we want in the right order
        map.createStaticLayer('Background1', tileset1)

        var goal = this.physics.add.sprite(game.config.width*0.94,game.config.height*0.92,'expgoal')
            .setScale(0.2);
        
        //人物生成
        Alice = new Player(this, 64, 64)
        //啟動物理
        this.physics.world.enable(Alice)
        //邊界碰撞
        Alice.body.setCollideWorldBounds(true);
        //機器人動畫

        this.anims.create({
            key: 'lwalk',
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("alice", {frames:[0,1,2,1]}),
            repeat: -1
        })
        this.anims.create({
            key: 'rwalk',
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("alice", {frames:[3,4,5,4]}),
            repeat: -1
        })

        //鍵盤
        cursors = this.input.keyboard.createCursorKeys();

        movability = true

        walk = this.sound.add('walk', {loop: false});
 
        bushes = map.createLayer('obstacle1', tileset2, 0, 0);//不打bushes = 機器人不會動

        //碰撞
        boundary = map.createStaticLayer('boundaries', tileset3)
        boundary.setCollisionFromCollisionGroup(true, false, 'boundaries')//used
        
        map.setCollisionFromCollisionGroup(true, false, 'obstacle1')//used
        this.physics.add.collider(Alice, boundary, attach, null, null, this);
        this.physics.add.overlap(Alice, bushes, pickbomb, attach, null, this);
        this.physics.add.overlap(Alice, goal, win, null, null, this);

        //UI
        if(expFirstTime){
            exptimeFlag = true
            this.scene.launch('experienceUI');
            expFirstTime = false
        }

        //時間顯示
        const clock = new Clock(this);
        // 2:30 in seconds
        this.initialTime = 30;
        text1 = this.add.text(800, 10, 'Countdown: ' + formatTime(this.initialTime)).setTint(0x66ff00).setDepth(4);
        //時間顯示
        // 2:30 in seconds
        //this.initialTime = 30;
        //text1 = this.add.text(800, 10, 'Countdown: ' + formatTime(this.initialTime));

        // Each 1000 ms call onEvent
        //sceneTimedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });

        function win() {
            //console.log('win');
            expstate = 1, lastState = 0, inBush = false, lastAttachment = false, attachment = false;
            game.scene.stop('experience1')
            game.scene.start('experience2')
        }
        function attach() {
            tile = bushes.getTileAtWorldXY(Alice.x, Alice.y)
            //console.log("tile "+tile);
            if(tile){
                lastAttachment = attachment
                attachment = true
                //console.log("tile "+tile + " last "+lastAttachment+" attach "+attachment);
                return true
            }
            else {
                lastAttachment = attachment
                attachment = false
                if(lastAttachment == true && attachment == false){
                    inBush = false
                }
                //console.log("tile "+tile + " last "+lastAttachment+" attach "+attachment);
                return false
            }
            //if true turn into false, inBush = false
        }
        function pickbomb() {
            inBush = true
            Alice.damage(0.01);
        }
    },

    update: function(){
        if(Alice.alive == false){
            expstate = 1, lastState = 0, inBush = false, lastAttachment = false, attachment = false;
            game.scene.stop('experience1')
            game.scene.start('experience1')
        }
        //開始遊戲開始計時跟動
        if(movability && !exptimeFlag){
            exptimeFlag = true;
            // Each 1000 ms call onEvent
            sceneTimedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });
        }

        function onAudioEvent (){
            if(walkFlag && soundFlag){
                soundFlag = false;
                walkFlag = false;
                walk.play();
                setTimeout(() => {
                    soundFlag = true
                }, 220);
            }
        }

        function animation() {
            if(expstate == 0 && lastState == 1){
                Alice.play('lwalk');
            }
            else if(expstate == 1 && lastState == 0){
                Alice.play('rwalk');
            }
        }

        animation();

        if(!movability){
            Alice.body.setVelocityX(0);
            Alice.body.setVelocityY(0);
        }
        else if(inBush == false){
            if(cursors.left.isDown){
                lastState = expstate
                expstate=0;
                Alice.body.setVelocityX(-200);
                walkFlag = true;
            }
            else if(cursors.right.isDown){
                lastState = expstate
                expstate=1;
                Alice.body.setVelocityX(200);
                walkFlag = true;
            }
            else{
                Alice.body.setVelocityX(0);
            }

            if(cursors.up.isDown){
                expstate = lastState
                Alice.body.setVelocityY(-200);
                walkFlag = true;
            }
            else if(cursors.down.isDown){
                expstate = lastState
                Alice.body.setVelocityY(200);
                walkFlag = true;
            }
            else{
                Alice.body.setVelocityY(0);
            }
        }
        else {
            if(cursors.left.isDown){
                lastState = expstate
                expstate=0;
                Alice.body.setVelocityX(-20);
                walkFlag = true;
            }
            else if(cursors.right.isDown){
                lastState = expstate
                expstate=1;
                Alice.body.setVelocityX(20);
                walkFlag = true;
            }
            else{
                Alice.body.setVelocityX(0);
            }

            if(cursors.up.isDown){
                expstate = lastState
                Alice.body.setVelocityY(-20);
                walkFlag = true;
            }
            else if(cursors.down.isDown){
                expstate = lastState
                Alice.body.setVelocityY(20);
                walkFlag = true;
            }
            else{
                Alice.body.setVelocityY(0);
            }
        }
        
        animation();
        onAudioEvent();
    },
}

function formatTime(seconds){
    // Minutes
    var minutes = Math.floor(seconds/60);
    // Seconds
    var partInSeconds = seconds%60;
    // Adds left zeros to seconds
    partInSeconds = partInSeconds.toString().padStart(2,'0');
    // Returns formated time
    return `${minutes}:${partInSeconds}`;
}

function onEvent (stage)
{
    if(this.initialTime>0){
        this.initialTime -= 1; // One second
        text1.setText('Countdown: ' + formatTime(this.initialTime)).setTint(0x66ff00);
    }
    else {
        movability = false
        this.add.text(370, 350, 'Time is up', { font: '32px monospace', fill: '#ff0000' }).setScale(1.5).setStroke('#000000', 4)
        exptimeout = true;
        setTimeout(() => {
            expstate = 1, lastState = 0, inBush = false, lastAttachment = false, attachment = false;
            Alice.alive = false;
        }, 1000);
    }
}

function flashEvent (stage)
{
    if(flashFlag == true){
        if(Alice.alpha == 1){
            Alice.alpha = 0.6;
        }
        else if(Alice.alpha == 0.6){
            Alice.alpha = 0.2;
        }
        else if(Alice.alpha == 0.2){
            Alice.alpha = 0.6;
        }
    }
}

var experience2 = {

    key: 'experience2',

    create: function(){
        expstate = 1, lastState = 0, inBush = false, lastAttachment = false, attachment = false;
        soundFlag = true, walk, walkFlag = false;
        const map = this.make.tilemap({key: 'tilemap'});//可設置長寬//used
        const tileset1 = map.addTilesetImage('origion', 'yard_tiles');
        const tileset2 = map.addTilesetImage('origion', 'yard_tiles');
        const tileset3 = map.addTilesetImage('smoke', 'pussss_tiles');
        // create the layers we want in the right order
        map.createStaticLayer('Background2', tileset1)

        //起點、終點生成
        var goal = this.physics.add.sprite(game.config.width*0.94,game.config.height*0.92,'expgoal2')
            .setScale(0.2);
        
        //通道生成
        var tunel1 = this.physics.add.sprite(game.config.width*0.22,game.config.height*0.33,'tunel')
            .setScale(1);
        var tunel2 = this.physics.add.sprite(game.config.width*0.73,game.config.height*0.95,'tunel')
            .setScale(1);
        
        //人物生成
        Alice = new Player(this, 64, 64)
        //啟動物理
        this.physics.world.enable(Alice)
        //邊界碰撞
        Alice.body.setCollideWorldBounds(true);
        //機器人動畫
        this.anims.create({
            key: 'lwalk',
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("alice", {frames:[0,1,2,1]}),
            repeat: -1
        })
        this.anims.create({
            key: 'rwalk',
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("alice", {frames:[3,4,5,4]}),
            repeat: -1
        })
        Alice.play('rwalk');

        //鍵盤
        cursors = this.input.keyboard.createCursorKeys();

        walk = this.sound.add('walk', {loop: false});
        
        movability = true
 
        bushes = map.createLayer('obstacle2_1', tileset2, 0, 0);//不打bushes = 機器人不會動

        mist = map.createLayer('obstacle2_3', tileset3, 0, 0);//不打bushes = 機器人不會動

        //碰撞
        boundary = map.createStaticLayer('boundaries', tileset3)
        boundary.setCollisionFromCollisionGroup(true, false, 'boundaries')//used
        
        map.setCollisionFromCollisionGroup(true, false, 'obstacle2_1')//used
        map.setCollisionFromCollisionGroup(true, false, 'obstacle2_3')//used
        this.physics.add.collider(Alice, boundary, attach, null, null, this);
        this.physics.add.overlap(Alice, bushes, pickbomb, attach, null, this);
        this.physics.add.overlap(Alice, mist, poison, attachMist, null, this);
        this.physics.add.overlap(Alice, tunel1, to2, null, null, this);
        this.physics.add.overlap(Alice, tunel2, to1, null, null, this);
        this.physics.add.overlap(Alice, goal, win, null, null, this);

        //時間顯示
        const clock = new Clock(this);
        // 2:30 in seconds
        this.initialTime = 30;
        text1 = this.add.text(800, 10, 'Countdown: ' + formatTime(this.initialTime)).setTint(0x66ff00).setDepth(4);

        // Each 1000 ms call onEvent
        sceneTimedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });

        //audioEvent = this.time.addEvent({ delay: 1000, callback: onAudioEvent, callbackScope: this, loop: true });

        
        function to2() {
            //console.log('win');
            if(entrance != 2){
                Alice.x = tunel2.x
                Alice.y = tunel2.y
                entrance = 1;
                setTimeout(() => {
                    entrance = 0
                }, 2500);
            }
        }
        function to1() {
            //console.log('win');
            if(entrance != 1){
                Alice.x = tunel1.x
                Alice.y = tunel1.y
                entrance = 2;
                setTimeout(() => {
                    entrance = 0
                }, 2500);
            }
        }
        function win() {
            //console.log('win');
            expstate = 1, lastState = 0, inBush = false, lastAttachment = false, attachment = false;
            game.scene.stop('experience2')
            game.scene.start('experience3');
        }
        function attachMist() {
            const tile = mist.getTileAtWorldXY(Alice.x, Alice.y)
            //console.log("tile "+tile);
            if(tile){
                return true
            }
            else {
                return false
            }
            //if true turn into false, inBush = false
        }
        function attach() {
            const tile = bushes.getTileAtWorldXY(Alice.x, Alice.y)
            //console.log("tile "+tile);
            if(tile){
                lastAttachment = attachment
                attachment = true
                //console.log("tile " + tile + " last " + lastAttachment + " attach " + attachment);
                return true
            }
            else {
                lastAttachment = attachment
                attachment = false
                if(lastAttachment == true && attachment == false){
                    inBush = false
                }
                //console.log("tile "+tile + " last "+lastAttachment+" attach "+attachment);
                return false
            }
            //if true turn into false, inBush = false
        }
        function pickbomb() {
            inBush = true
            Alice.damage(0.01);
        }
        function poison() {
            Alice.damage(0.05);
        }
    },

    update: function(){
        if(Alice.alive == false){
            expstate = 1, lastState = 0, inBush = false, lastAttachment = false, attachment = false;
            game.scene.stop('experience2')
            game.scene.start('experience2')
        }

        function onAudioEvent (){
            if(walkFlag && soundFlag){
                soundFlag = false;
                walkFlag = false;
                walk.play();
                setTimeout(() => {
                    soundFlag = true
                }, 220);
            }
        }


        function animation() {
            if(expstate == 0 && lastState == 1){
                Alice.play('lwalk');
            }
            else if(expstate == 1 && lastState == 0){
                Alice.play('rwalk');
            }
        }
        //console.log("sp " + Alice.body.speed);
        //console.log("ro " + Alice.body.rotation);
        //console.log(Alice.body.velocity);

        animation();

        if(!movability){
            Alice.body.setVelocityX(0);
            Alice.body.setVelocityY(0);
        }
        else if(inBush == false){
            if(cursors.left.isDown){
                lastState = expstate
                expstate=0;
                Alice.body.setVelocityX(-200);
                walkFlag = true;
            }
            else if(cursors.right.isDown){
                lastState = expstate
                expstate=1;
                Alice.body.setVelocityX(200);
                walkFlag = true;
            }
            else{
                Alice.body.setVelocityX(0);
            }

            if(cursors.up.isDown){
                expstate = lastState
                Alice.body.setVelocityY(-200);
                walkFlag = true;
            }
            else if(cursors.down.isDown){
                expstate = lastState
                Alice.body.setVelocityY(200);
                walkFlag = true;
            }
            else{
                Alice.body.setVelocityY(0);
            }
        }
        else {
            if(cursors.left.isDown){
                lastState = expstate
                expstate=0;
                Alice.body.setVelocityX(-20);
                walkFlag = true;
            }
            else if(cursors.right.isDown){
                lastState = expstate
                expstate=1;
                Alice.body.setVelocityX(20);
                walkFlag = true;
            }
            else{
                Alice.body.setVelocityX(0);
            }

            if(cursors.up.isDown){
                expstate = lastState
                Alice.body.setVelocityY(-20);
                walkFlag = true;
            }
            else if(cursors.down.isDown){
                expstate = lastState
                Alice.body.setVelocityY(20);
                walkFlag = true;
            }
            else{
                Alice.body.setVelocityY(0);
            }
        }
        
        animation();
        onAudioEvent();
    },
}

var experience3 = {

    key: 'experience3',

    create: function(){
        expstate = 1, lastState = 0, inBush = false, lastAttachment = false, attachment = false,invincible = false, moveFlag = false, change = false, entrance = 0, flashFlag = false;
        soundFlag = true, walk, walkFlag = false;
        for( i = amountHL; i >= 0; i--)
            CardHL.pop();
        for( i = amountHR; i >= 0; i--)
            CardHR.pop();
        for( i = amountVU; i >= 0; i--)
            CardVU.pop();
        for( i = amountVD; i >= 0; i--)
            CardVD.pop();
        amountHL = 0, amountHR = 0, amountVU = 0, amountVD = 0;
        //console.log('1'+CardHL);

        const map = this.make.tilemap({key: 'tilemap'});//可設置長寬//used
        const tileset1 = map.addTilesetImage('origion', 'yard_tiles');
        const tileset2 = map.addTilesetImage('origion', 'yard_tiles');
        const tileset3 = map.addTilesetImage('origion', 'yard_tiles');
        // create the layers we want in the right order
        map.createStaticLayer('Background3', tileset1)

        //起點、終點生成
        var goal = this.physics.add.sprite(game.config.width*0.94,game.config.height*0.92,'expgoal3')
        .setScale(0.5);
        
        //通道生成
        var tunel1 = this.physics.add.sprite(game.config.width*0.14,game.config.height*0.81,'tunel')
            .setScale(1);
        var tunel2 = this.physics.add.sprite(game.config.width*0.795,game.config.height*0.6,'tunel')
            .setScale(1);
        
        //人物生成
        Alice = new Player(this, game.config.width*0.06,game.config.height*0.08)
        .setScale(0.85)
        .setAlpha(1);
        amountHL = CardHL.push(new Enemy(this, 144, 176))
        amountHL = CardHL.push(new Enemy(this, 144, 368))
        amountHL = CardHL.push(new Enemy(this, 144, 560))
        amountHL = CardHL.push(new Enemy(this, 304, 624))
        amountHL = CardHL.push(new Enemy(this, 304, 496))
        amountHL = CardHL.push(new Enemy(this, 736, 528))//23, 16
        amountHL = CardHL.push(new Enemy(this, 784, 624))//24, 19
        amountHL = CardHL.push(new Enemy(this, 336, 304))//10, 9
        amountHL = CardHL.push(new Enemy(this, 592, 368))//15, 11
        amountHL = CardHL.push(new Enemy(this, 848, 720))//26, 22
        amountHL = CardHL.push(new Enemy(this, 976, 432))//26, 22
        amountHL = CardHL.push(new Enemy(this, 176, 688))//5, 21
        amountHL = CardHL.push(new Enemy(this, 976, 560))//30, 17
        //amountHL = CardHL.push(new Enemy(this, 688, 304))//21, 9

        amountHR = CardHR.push(new Enemy(this, 80, 272))
        amountHR = CardHR.push(new Enemy(this, 48, 464))
        amountHR = CardHR.push(new Enemy(this, 208, 688))
        amountHR = CardHR.push(new Enemy(this, 208, 560))
        amountHR = CardHR.push(new Enemy(this, 592, 496))//18, 15
        amountHR = CardHR.push(new Enemy(this, 720, 592))//22, 18
        //amountHR = CardHR.push(new Enemy(this, 400, 336))//12, 10
        amountHR = CardHR.push(new Enemy(this, 656, 368))//20, 11
        amountHR = CardHR.push(new Enemy(this, 688, 688))//21, 21
        amountHR = CardHR.push(new Enemy(this, 816, 688))//25, 21
        //amountHR = CardHR.push(new Enemy(this, 880, 240))//27, 7
        amountHR = CardHR.push(new Enemy(this, 880, 496))//27, 15
        //amountHR = CardHR.push(new Enemy(this, 592, 176))//18, 5

        amountVU = CardVU.push(new Enemy(this, 176, 144))
        amountVU = CardVU.push(new Enemy(this, 368, 144))
        amountVU = CardVU.push(new Enemy(this, 400, 656))
        amountVU = CardVU.push(new Enemy(this, 528, 656))
        amountVU = CardVU.push(new Enemy(this, 624, 688))//19, 21
        //amountVU = CardVU.push(new Enemy(this, 816, 240))//25, 7

        amountVD = CardVD.push(new Enemy(this, 272, 48))
        amountVD = CardVD.push(new Enemy(this, 464, 48))
        amountVD = CardVD.push(new Enemy(this, 368, 496))
        amountVD = CardVD.push(new Enemy(this, 464, 560))//14, 17
        amountVD = CardVD.push(new Enemy(this, 560, 528))//17, 16
        amountVD = CardVD.push(new Enemy(this, 656, 624))//20, 19

        //console.log('2'+CardHL);

        //啟動物理
        this.physics.world.enable(Alice)
        this.physics.world.enable(CardHL)
        this.physics.world.enable(CardHR)
        this.physics.world.enable(CardVU)
        this.physics.world.enable(CardVD)
        //邊界碰撞
        Alice.body.setCollideWorldBounds(true);
        
        for( i = 0; i < amountHL; i++){
            CardHL[i].body.setCollideWorldBounds(true);
        }
        for( i = 0; i < amountHR; i++){
            CardHR[i].body.setCollideWorldBounds(true);
        }
        for( i = 0; i < amountVU; i++){
            CardVU[i].body.setCollideWorldBounds(true);
        }
        for( i = 0; i < amountVD; i++){
            CardVD[i].body.setCollideWorldBounds(true);
        }

        //機器人動畫
        this.anims.create({
            key: 'lwalk',
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("alice", {frames:[0,1,2,1]}),
            repeat: -1
        })
        this.anims.create({
            key: 'rwalk',
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("alice", {frames:[3,4,5,4]}),
            repeat: -1
        })
        Alice.play('rwalk');
        this.anims.create({
            key: 'lroam',
            frameRate: 15,
            frames: this.anims.generateFrameNumbers("cards", {frames:[0,1,2,1]}),
            repeat: -1
        })
        this.anims.create({
            key: 'rroam',
            frameRate: 15,
            frames: this.anims.generateFrameNumbers("cards", {frames:[3,4,5,4]}),
            repeat: -1
        })
        this.anims.create({
            key: 'uroam',
            frameRate: 15,
            frames: this.anims.generateFrameNumbers("CardStraight", {frames:[0,1,2,1]}),
            repeat: -1
        })
        this.anims.create({
            key: 'droam',
            frameRate: 15,
            frames: this.anims.generateFrameNumbers("CardStraight", {frames:[3,4,5,4]}),
            repeat: -1
        })
        
        //console.log('3'+CardHL);

        for( i = 0; i < amountHL; i++)
            CardHL[i].play('lroam');
        for( i = 0; i < amountHR; i++)
            CardHR[i].play('rroam');
        for( i = 0; i < amountVU; i++)
            CardVU[i].play('uroam');
        for( i = 0; i < amountVD; i++)
            CardVD[i].play('droam');
        //鍵盤
        cursors = this.input.keyboard.createCursorKeys();
        
        movability = true

        walk = this.sound.add('walk', {loop: false});
        hurt = this.sound.add('hurt', {loop: false});
 
        bushes = map.createLayer('obstacle3', tileset2, 0, 0);//不打bushes = 機器人不會動

        //碰撞
        bushes.setCollisionFromCollisionGroup(true, false, 'obstacle3')//used
        this.physics.add.overlap(Alice, tunel1, to2, null, null, this);
        this.physics.add.overlap(Alice, tunel2, to1, null, null, this);
        
        this.physics.add.overlap(Alice, bushes, pickbomb, attach, null, this);
        this.physics.add.overlap(Alice, goal, win, null, null, this);
        for( i = 0; i < amountHL; i++){
            this.physics.add.overlap(Alice, CardHL[i], hit, null, null, this);
            //this.physics.add.overlap(CardHL[i], bushes, enemyHit, null, null, this);
        }
        for( i = 0; i < amountHR; i++){
            this.physics.add.overlap(Alice, CardHR[i], hit, null, null, this);
            //this.physics.add.overlap(CardHR[i], bushes, enemyHit, null, null, this);
        }
        for( i = 0; i < amountVU; i++){
            this.physics.add.overlap(Alice, CardVU[i], hit, null, null, this);
            //this.physics.add.overlap(CardVU[i], bushes, enemyHit, null, null, this);
        }
        for( i = 0; i < amountVD; i++){
            this.physics.add.overlap(Alice, CardVD[i], hit, null, null, this);
            //this.physics.add.overlap(CardVD[i], bushes, enemyHit, null, null, this);
        }

        //時間顯示
        const clock = new Clock(this);
        // 2:30 in seconds
        this.initialTime = 120;
        text1 = this.add.text(800, 10, 'Countdown: ' + formatTime(this.initialTime)).setTint(0x66ff00).setDepth(4);

        // Each 1000 ms call onEvent
        sceneTimedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });

        //閃爍
        flashFlag = false
        flashingEvent = this.time.addEvent({ delay: 100, callback: flashEvent, callbackScope: this, loop: true });

        
        function hit() {
            if(invincible == false){
                Alice.alpha = 0.6;
                hurt.play();
                Alice.damage(0.1);
                if((movability == true) && (moveFlag == false)){
                    moveFlag = true
                    movability = false
                    hit1 = setTimeout(() => {
                        //if(!exprestart){
                        movability = true;
                        exprestart = true;
                        invincible = true;
                        flashFlag = true;
                        moveFlag = false;
                        //}
                        //console.log("movability = true");
                        hitBack();
                    }, 2000);
                }
            }
            /*
            else {
                hit2 = setTimeout(() => {
                    //if(exprestart){
                        invincible = false;
                        flashFlag = false;
                        Alice.alpha = 1;
                        exprestart = true;
                    //}
                    //console.log("movability = true");
                }, 1000);
            }
            */
        }

        function hitBack() {
            hit2 = setTimeout(() => {
                //if(exprestart){
                    invincible = false;
                    flashFlag = false;
                    Alice.alpha = 1;
                    exprestart = true;
                //}
                //console.log("movability = true");
            }, 1000);
        }
        
        /*
        function hit() {
            console.log('hit');
            Alice.damage(0.1);
            flashFlag = true
            if((flashFlag == true) && (moveFlag == false)){
                moveFlag = true
                movability = false
                console.log("movability = f");
                setTimeout(() => {
                    movability = true;
                    moveFlag = false;
                    flashFlag = false;
                    Alice.alpha = 1;
                    console.log("movability = true");
                }, 1500);
            }
        }*/
        function to2() {
            //console.log('win');
            if(entrance != 2){
                Alice.x = tunel2.x
                Alice.y = tunel2.y
                entrance = 1;
                setTimeout(() => {
                    entrance = 0
                }, 2500);
            }
        }
        function to1() {
            //console.log('win');
            if(entrance != 1){
                Alice.x = tunel1.x
                Alice.y = tunel1.y
                entrance = 2;
                setTimeout(() => {
                    entrance = 0
                }, 2500);
            }
        }
        function win() {
            //console.log('win');
            expstate = 1, lastState = 0, inBush = false, lastAttachment = false, attachment = false;
            change = true;
        }
        function attach() {
            tile = bushes.getTileAtWorldXY(Alice.x, Alice.y)
            //console.log("tile "+tile);
            if(tile){
                lastAttachment = attachment
                attachment = true
                //console.log("tile "+tile + " last "+lastAttachment+" attach "+attachment);
                return true
            }
            else {
                lastAttachment = attachment
                attachment = false
                if(lastAttachment == true && attachment == false){
                    inBush = false
                }
                //console.log("tile "+tile + " last "+lastAttachment+" attach "+attachment);
                return false
            }
            //if true turn into false, inBush = false
        }
        function pickbomb() {
            inBush = true
            Alice.damage(0.01);
        }
    },

    update: function(){
        console.log(flashFlag,invincible);

        if(change == true){
            expstate = 1, lastState = 0, inBush = false, lastAttachment = false, attachment = false;
            clearTimeout(hit1);
            clearTimeout(hit2);
            movability = false;
            game.scene.pause('experience3');
            this.scene.launch('experienceEndUI');
            
        }
        else {
            if(Alice.alive == false){
                expstate = 1, lastState = 0, inBush = false, lastAttachment = false, attachment = false;
                clearTimeout(hit1);
                clearTimeout(hit2);
                if(exptimeout){
                    this.add.text(370, 350, 'Try again', { font: '32px monospace', fill: '#ff0000' }).setScale(1.5).setStroke('#000000', 4);
                }
                game.scene.stop('experience3')
                for( i = 0; i < amountHL; i++)
                    CardHL.pop();
                for( i = 0; i < amountHR; i++)
                    CardHR.pop();
                for( i = 0; i < amountVU; i++)
                    CardVU.pop();
                for( i = 0; i < amountVD; i++)
                    CardVD.pop();
                exprestart = true;
                //setTimeout(() => {
                    game.scene.start('experience3');
                //}, 2500);
            }
            
            function animation() {
                if(expstate == 0 && lastState == 1){
                    Alice.play('lwalk');
                }
                else if(expstate == 1 && lastState == 0){
                    Alice.play('rwalk');
                }
            }
            function onAudioEvent (){
                if(walkFlag && soundFlag){
                    soundFlag = false;
                    walkFlag = false;
                    walk.play();
                    setTimeout(() => {
                        soundFlag = true
                    }, 220);
                }
            }

            animation();

            if(!movability){
                Alice.body.setVelocityX(0);
                Alice.body.setVelocityY(0);
            }
            else if(inBush == false){
                if(cursors.left.isDown){
                    lastState = expstate
                    expstate=0;
                    Alice.body.setVelocityX(-200);
                    walkFlag = true;
                }
                else if(cursors.right.isDown){
                    lastState = expstate
                    expstate=1;
                    Alice.body.setVelocityX(200);
                    walkFlag = true;
                }
                else{
                    Alice.body.setVelocityX(0);
                }
    
                if(cursors.up.isDown){
                    expstate = lastState
                    Alice.body.setVelocityY(-200);
                    walkFlag = true;
                }
                else if(cursors.down.isDown){
                    expstate = lastState
                    Alice.body.setVelocityY(200);
                    walkFlag = true;
                }
                else{
                    Alice.body.setVelocityY(0);
                }
            }
            else {
                if(cursors.left.isDown){
                    lastState = expstate
                    expstate=0;
                    Alice.body.setVelocityX(-20);
                    walkFlag = true;
                }
                else if(cursors.right.isDown){
                    lastState = expstate
                    expstate=1;
                    Alice.body.setVelocityX(20);
                    walkFlag = true;
                }
                else{
                    Alice.body.setVelocityX(0);
                }
    
                if(cursors.up.isDown){
                    expstate = lastState
                    Alice.body.setVelocityY(-20);
                    walkFlag = true;
                }
                else if(cursors.down.isDown){
                    expstate = lastState
                    Alice.body.setVelocityY(20);
                    walkFlag = true;
                }
                else{
                    Alice.body.setVelocityY(0);
                }
            }
            
            animation();
            onAudioEvent();
        }
        for( i = 0; i < amountHL; i++){
            if(CardHL[i].enemyDirec == false){
                CardHL[i].x--;
                if(CardHL[i].x == CardHL[i].startX - 96){
                    CardHL[i].play('rroam')
                    CardHL[i].enemyDirec = true
                }
            }
            else if(CardHL[i].enemyDirec == true){
                CardHL[i].x++;
                if(CardHL[i].x == CardHL[i].startX){
                    CardHL[i].play('lroam')
                    CardHL[i].enemyDirec = false
                }
            }
        }
        
        for( i = 0; i < amountHR; i++){
            if(CardHR[i].enemyDirec == false){
                CardHR[i].x++;
                if(CardHR[i].x == CardHR[i].startX + 96){
                    CardHR[i].play('lroam')
                    CardHR[i].enemyDirec = true
                }
            }
            else if(CardHR[i].enemyDirec == true){
                CardHR[i].x--;
                if(CardHR[i].x == CardHR[i].startX){
                    CardHR[i].play('rroam')
                    CardHR[i].enemyDirec = false
                }
            }
        }
        
        for( i = 0; i < amountVU; i++){
            if(CardVU[i].enemyDirec == false){
                CardVU[i].y--;
                if(CardVU[i].y == CardVU[i].startY - 96){
                    CardVU[i].play('uroam')
                    CardVU[i].enemyDirec = true
                }
            }
            else if(CardVU[i].enemyDirec == true){
                CardVU[i].y++;
                if(CardVU[i].y == CardVU[i].startY){
                    CardVU[i].play('droam')
                    CardVU[i].enemyDirec = false
                }
            }
        }
        
        for( i = 0; i < amountVD; i++){
            if(CardVD[i].enemyDirec == false){
                CardVD[i].y++;
                if(CardVD[i].y == CardVD[i].startY + 96){
                    CardVD[i].play('droam')
                    CardVD[i].enemyDirec = true
                }
            }
            else if(CardVD[i].enemyDirec == true){
                CardVD[i].y--;
                if(CardVD[i].y == CardVD[i].startY){
                    CardVD[i].play('uroam')
                    CardVD[i].enemyDirec = false
                }
            }
        }
    },
}

//開放性UI
//開放性商店
var backButton;

//開放性遊戲介紹
var expMoveAllow;
var expFrame;
var expIntroduce0;
var expIntroduce1;
var expIntroduce2;
var expIntroduce3;
var expIntroduce4;
var expIntroduce5;
var expIntroduceCount = 1;

var rightIn, rightOut;
var leftIn, leftOut;
var menuIn, menuOut;
var closeIn, closeOut;
var expCloseToRightFlag = true;

//時間參數
var expTimeLock = false;
var congametime;
var expTimeFlag = false

//開放性UI
var experienceUI = {
    key: 'experienceUI',

    create: function(){
        var Buttonflag = false;
        
        //back鈕
        backButton = this.add.sprite(250, 650, 'backout')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerover', function (event) {
            backin.alpha = 0.8
            backButton.alpha = 0
        })
        var backin = this.add.sprite(250, 650, 'backin')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerdown', function (event) {
            Buttonflag = false
            build.alpha = 1;
            backin.alpha = 0;
            backButton.alpha = 0.8;
            createShoppage(0);
            expTimeLock = false;
        })
        .on('pointerout', function (event) {
            if(Buttonflag == true){
                backin.alpha = 0;
                backButton.alpha = 0.8;
            }
        });
        
        //遊戲介紹
        expFrame = this.add.rectangle(game.config.width*0.5, game.config.height*0.5, game.config.width-100, game.config.height-100, 0xFFC78E)
        .setStrokeStyle(5, 0x000000)
        .setOrigin(0.5,0.5)
        .setAlpha(1) //透明度
        expIntroduce0 = this.add.image(game.config.width*0.52, game.config.height*0.35,'expIntroduce0')
        .setScale(0.24)
        .setAlpha(0)
        expIntroduce1 = this.add.image(game.config.width*0.52, game.config.height*0.35,'expIntroduce1')
        .setScale(0.24)
        .setAlpha(0)
        expIntroduce2 = this.add.image(game.config.width*0.5, game.config.height*0.45,'expIntroduce2')
        .setScale(0.24)
        .setAlpha(0)
        expIntroduce3 = this.add.image(game.config.width*0.5, game.config.height*0.45,'expIntroduce3')
        .setScale(0.24)
        .setAlpha(0)
        //右按鈕
        rightOut = this.add.sprite(game.config.width*0.85, game.config.height*0.87,'rightout')
        .setScale(0.25)
        .setInteractive()
        .on('pointerover', function (event) {
            rightIn.alpha = 1
            rightOut.alpha = 0
        })
        rightIn = this.add.sprite(game.config.width*0.85, game.config.height*0.87,'rightin')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerdown', function (event) {
            expIntroduceCount++;
        })
        .on('pointerout', function (event) {
            rightIn.alpha = 0;
            rightOut.alpha = 1;
        })
        //左按鈕
        leftOut = this.add.sprite(game.config.width*0.15, game.config.height*0.87,'leftout')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerover', function (event) {
            leftIn.alpha = 1
            leftOut.alpha = 0
        })
        leftIn = this.add.sprite(game.config.width*0.15, game.config.height*0.87,'leftin')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerdown', function (event) {
            expIntroduceCount--;
        })
        .on('pointerout', function (event) {
            leftIn.alpha = 0;
            leftOut.alpha = 1;
        })
        //close按鈕
        closeOut = this.add.sprite(game.config.width*0.85, game.config.height*0.87,'closeout')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerover', function (event) {
            closeIn.alpha = 1;
            closeOut.alpha = 0;
        })
        closeIn = this.add.sprite(game.config.width*0.85, game.config.height*0.87,'closein')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerdown', function (event) {
            expIntroduceCount++;
        })
        .on('pointerout', function (event) {
            closeIn.alpha = 0;
            closeOut.alpha = 1;
        })

        //初始化變數
        expMoveAllow = false;
        expTimeLock = false;
        expTimeFlag = false;
        expIntroduceCount = 0;
        expCloseToRightFlag = true;
    },

    update: function(){
        //遊戲介紹前後頁控制
        if(expIntroduceCount == 0){
            expIntroduce0.alpha = 1;
            expIntroduce1.alpha = 0;
            leftIn.alpha = 0;
            leftOut.alpha = 0;
            closeIn.alpha = 0;
            closeOut.alpha = 0;
            if(expCloseToRightFlag == false){
                expCloseToRightFlag = true;
            }
        }
        else if(expIntroduceCount == 1){
            expIntroduce0.alpha = 0;
            expIntroduce1.alpha = 1;
            expIntroduce2.alpha = 0;
            closeIn.alpha = 0;
            closeOut.alpha = 0;
            if(expCloseToRightFlag == true){
                leftOut.alpha = 1;
                rightOut.alpha = 1;
                expCloseToRightFlag = false;
            }
        }
        else if(expIntroduceCount == 2){
            expIntroduce1.alpha = 0;
            expIntroduce2.alpha = 1;
            rightIn.alpha = 0;
            rightOut.alpha = 0;
            if(expCloseToRightFlag == false){
                closeIn.alpha = 1;
                expCloseToRightFlag = true;
            }
        }
        else if(expIntroduceCount == 3){
            expIntroduce2.alpha = 0;
            closeIn.alpha = 0;
            closeOut.alpha = 0;
            leftIn.alpha = 0;
            leftOut.alpha = 0;
            expFrame.alpha = 0;
            expMoveAllow = true;
            exptimeFlag = false;
            expIntroduceCount++; //跳出此if
        }
        else{
            closeIn.alpha = 0;
            closeOut.alpha = 0;
        }
    }
}

var end1Frame, end2Frame;
var endText1, endText2;
var conControl = 1;
var expGoEnd2 = false;
var expEndflag = true;

var experienceEndUI = {
    key: 'experienceEndUI',

    create: function(){
        var Buttonflag = false;
        
        //back鈕
        backButton = this.add.sprite(250, 650, 'backout')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerover', function (event) {
            backin.alpha = 0.8
            backButton.alpha = 0
        })
        var backin = this.add.sprite(250, 650, 'backin')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerdown', function (event) {
            Buttonflag = false
            build.alpha = 1;
            backin.alpha = 0;
            backButton.alpha = 0.8;
            createShoppage(0);
            expTimeLock = false;
        })
        .on('pointerout', function (event) {
            if(Buttonflag == true){
                backin.alpha = 0;
                backButton.alpha = 0.8;
            }
        });
        
        //遊戲介紹
        expFrame = this.add.rectangle(game.config.width*0.5, game.config.height*0.5, game.config.width-100, game.config.height-100, 0xFFC78E)
        .setStrokeStyle(5, 0x000000)
        .setOrigin(0.5,0.5)
        .setAlpha(1) //透明度
        expIntroduce3 = this.add.image(game.config.width*0.5, game.config.height*0.45,'expIntroduce3')
        .setScale(0.24)
        .setAlpha(0)
        expIntroduce4 = this.add.image(game.config.width*0.5, game.config.height*0.45,'expIntroduce4')
        .setScale(0.24)
        .setAlpha(0)
        expIntroduce5 = this.add.image(game.config.width*0.5, game.config.height*0.45,'expIntroduce5')
        .setScale(0.24)
        .setAlpha(0)
        //右按鈕
        rightOut = this.add.sprite(game.config.width*0.85, game.config.height*0.87,'rightout')
        .setScale(0.25)
        .setInteractive()
        .on('pointerover', function (event) {
            rightIn.alpha = 1
            rightOut.alpha = 0
        })
        rightIn = this.add.sprite(game.config.width*0.85, game.config.height*0.87,'rightin')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerdown', function (event) {
            expIntroduceCount++;
        })
        .on('pointerout', function (event) {
            rightIn.alpha = 0;
            rightOut.alpha = 1;
        })
        //左按鈕
        leftOut = this.add.sprite(game.config.width*0.15, game.config.height*0.87,'leftout')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerover', function (event) {
            leftIn.alpha = 1
            leftOut.alpha = 0
        })
        leftIn = this.add.sprite(game.config.width*0.15, game.config.height*0.87,'leftin')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerdown', function (event) {
            expIntroduceCount--;
        })
        .on('pointerout', function (event) {
            leftIn.alpha = 0;
            leftOut.alpha = 1;
        })
        //close按鈕
        closeOut = this.add.sprite(game.config.width*0.85, game.config.height*0.87,'closeout')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerover', function (event) {
            closeIn.alpha = 1;
            closeOut.alpha = 0;
        })
        closeIn = this.add.sprite(game.config.width*0.85, game.config.height*0.87,'closein')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerdown', function (event) {
            expIntroduceCount++;
        })
        .on('pointerout', function (event) {
            closeIn.alpha = 0;
            closeOut.alpha = 1;
        })
        //Menu按鈕
        menuOut = this.add.sprite(game.config.width*0.85, game.config.height*0.87, 'menuout')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerover', function (event) {
            menuIn.alpha = 1;
            menuOut.alpha = 0;
        })
        menuIn = this.add.sprite(game.config.width*0.85, game.config.height*0.87, 'menuin')
        .setScale(0.25)
        .setAlpha(0)
        .setInteractive()
        .on('pointerout', function (event) {
            menuIn.alpha = 0;
            menuOut.alpha = 1;
        })
        .on('pointerdown', function (event) {
            expIntroduceCount++;
        });

        //初始化變數
        expMoveAllow = false;
        expTimeLock = false;
        expTimeFlag = false;
        expIntroduceCount = 0;
        expGoEnd2 = false;
        expCloseToRightFlag = true;
    },

    update: function(){
        //遊戲介紹前後頁控制
        if(expIntroduceCount == 0){
            expIntroduce3.alpha = 1;
            expIntroduce4.alpha = 0;
            leftIn.alpha = 0;
            leftOut.alpha = 0;
            menuIn.alpha = 0;
            menuOut.alpha = 0;
            console.log('flag' + expCloseToRightFlag);
            if(expCloseToRightFlag == false){
                rightOut.alpha = 1;
                expCloseToRightFlag = true;
            }
        }
        else if(expIntroduceCount == 1){
            expIntroduce3.alpha = 0;
            expIntroduce4.alpha = 1;
            expIntroduce5.alpha = 0;
            //closeOut.alpha = 1;
            menuIn.alpha = 0;
            menuOut.alpha = 0;
            //console.log('flag:' + expCloseToRightFlag);
            if(expCloseToRightFlag == true){
                leftOut.alpha = 1;
                rightOut.alpha = 1;
                console.log('closeOut' + closeOut.alpha);
                expCloseToRightFlag = false;
            }
        }
        else if(expIntroduceCount == 2){
            expIntroduce4.alpha = 0;
            expIntroduce5.alpha = 1;
            rightIn.alpha = 0;
            rightOut.alpha = 0;
            console.log('flag' + expCloseToRightFlag);
            if(expCloseToRightFlag == false){
                menuOut.alpha = 1;
                expCloseToRightFlag = true;
            }
        }
        else if(expIntroduceCount == 3){
            expIntroduce5.alpha = 0;
            leftIn.alpha = 0;
            leftOut.alpha = 0;
            expFrame.alpha = 0;
            expMoveAllow = true;
            exptimeFlag = false;
            expIntroduceCount++; //跳出此if
            game.scene.stop('experienceUI')
            game.scene.stop('experience3')
            game.scene.stop('experienceEndUI')
        
            game.scene.start('main')
        }
        else{
            menuIn.alpha = 0;
            menuOut.alpha = 0;
        }
    }
}

//盡責性
var conwidth;
var conheight;
var constate;
var conflag;
var contmp;
var onGround;
var conGoEnd1 = false;
var conmoveAllow = false;
var remainTime = 180;
var roleX,roleY;
var conmap

//盡責性場景
var conscientiousness = {
    key: 'conscientiousness',
    physics: {
        matter: {
            gravity: { y: 1 },
            //debug: true
        },
    },

    create: function(){
        //背景
        //game.config.width可改this.scale.width
        var width = this.scale.width;
        var height = this.scale.height;
        var conbg0 = this.add.image(width * 0.5, height * 0.5, 'conbg0')
            .setScrollFactor(0);
        conbg0.displayWidth = width;
        conbg0.displayHeight = height;
        createAllbackground(this, 10, 'conbg1', 0.2, 0.2, height*3, 1.5);
        createAllbackground(this, 10, 'conbg2', 0.4, 0.2, height*3, 1.2);
        //createAllbackground(this, 10, 'conbg3', 0.6, 0.2, height*3, 1);
        //createAllbackground(this, 10, 'conbg4', 0.8, 0.2, height*3, 1);
        
        //鍵盤
        cursors = this.input.keyboard.createCursorKeys();

        //camera大小
        this.cameras.main.setBounds(0,0,width*10,height*3);

        //map
        conmap = this.make.tilemap({ key: 'conmap', tileWidth: 32, tileHeight: 32});
        var contileset = conmap.addTilesetImage('ConTile', 'contile' ,32,32,0,0);
        var GroundLayer = conmap.createDynamicLayer('Ground',contileset,0,0);
        var ItemLayer = conmap.createDynamicLayer('Item',contileset,0,0);
        var WallLayer = conmap.createDynamicLayer('Wall',contileset,0,0);
        WallLayer.setCollisionByProperty({ collides: true });
        var Item2Layer = conmap.createDynamicLayer('Item2',contileset,0,0);
        this.matter.world.convertTilemapLayer(WallLayer);
        var ObjectLayer = conmap.getObjectLayer('Object');
        ObjectLayer.objects.forEach(objData => {
            var {x=0, y=0, name} = objData;
            switch(name){
                case 'thatch':
                {
                    var thatch = this.matter.add.sprite(x,y,'thatch',undefined, {
                        isStatic: true,
                        isSensor: true
                    })
                    thatch.setScale(2);
                    thatch.name = 'thatch'
                    break;
                }

                case 'wood':
                {
                    var wood = this.matter.add.sprite(x,y,'wood',undefined, {
                        isStatic: true,
                        isSensor: true
                    })
                    wood.setScale(2);
                    wood.name = 'wood'
                    break;
                }

                case 'brick':
                {
                    var brick = this.matter.add.sprite(x,y,'brick',undefined, {
                        isStatic: true,
                        isSensor: true
                    })
                    brick.setScale(2);
                    brick.name = 'brick'
                    break;
                }

            }


        })

        //人物
        this.conrobot = this.matter.add.sprite(0 ,0, "conrobot", 0);
        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        const { width: w, height: h } = this.conrobot;
        const mainBody = Bodies.rectangle(0, 0, w-40, h, { chamfer: { radius: 5 } });
        this.sensors = { //45
            bottom: Bodies.rectangle(0, h * 0.5, w * 0.45, 2, { isSensor: true }),
            /*
            left: Bodies.rectangle(-w * 0.25, -20, 2, h * 0.2 , { isSensor: true }),
            right: Bodies.rectangle(w * 0.25, -20, 2, h * 0.2, { isSensor: true })
            */
        };
        const compoundBody = Body.create({
            //parts: [mainBody, this.sensors.bottom, this.sensors.left, this.sensors.right],
            parts: [mainBody, this.sensors.bottom],
            frictionStatic: 0,
            frictionAir: 0.02,
            friction: 0,
        });

        this.conrobot.setExistingBody(compoundBody)
            .setScale(2)
            .setOrigin(0.5)
            .setFixedRotation()
            .setPosition(conmap.widthInPixels * 0.5, conmap.heightInPixels * 0.4)
    
        this.anims.create({
            key: 'piglwalk',
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("conrobot", {frames:[1,2,3,2]}),
            repeat: -1
        })
        this.anims.create({
            key: 'pigrwalk',
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("conrobot", {frames:[6,7,8,7]}),
            repeat: -1
        })
        this.anims.create({
            key: 'lstand',
            frameRate: 20,
            frames: this.anims.generateFrameNumbers("conrobot", {frames:[0]}),
            repeat: -1
        })
        this.anims.create({
            key: 'rstand',
            frameRate: 20,
            frames: this.anims.generateFrameNumbers("conrobot", {frames:[5]}),
            repeat: -1
        })
        this.anims.create({
            key: 'ljump',
            frameRate: 20,
            frames: this.anims.generateFrameNumbers("conrobot", {frames:[4]}),
            repeat: -1
        })
        this.anims.create({
            key: 'rjump',
            frameRate: 20,
            frames: this.anims.generateFrameNumbers("conrobot", {frames:[9]}),
            repeat: -1
        })

        //UI
        this.scene.launch('conscientiousnessUI');

        //鏡頭設定
        this.cameras.main.startFollow(this.conrobot);
        this.cameras.main.setBounds(0, 0, conmap.widthInPixels, conmap.heightInPixels);

        this.matterCollision.addOnCollideActive({
            objectA: [mainBody],
            callback: ({ gameObjectA, gameObjectB }) => {
                if(gameObjectB.name == 'thatch'){
                    gameObjectB.destroy();
                    thatchCount++;
                }
                if(gameObjectB.name == 'wood'){
                    gameObjectB.destroy();
                    woodCount++;
                }
                if(gameObjectB.name == 'brick'){
                    gameObjectB.destroy();
                    brickCount++;
                }
            },
            context: this
        });
        
        /*
        this.matterCollision.addOnCollideStart({
            objectA: [this.sensors.bottom],
            callback: onSensorCollide,
            context: this
        });
        */
        this.matterCollision.addOnCollideActive({
            objectA: [this.sensors.bottom],
            callback: onSensorCollide,
            context: this
        });
        
        //遊戲變數初始設定
        conwidth = width;
        conheight = height;
        constate = 3;
        conflag = true;
        contmp = constate;
        onGround = true;
        conGoEnd1 = false
        remainTime = 180
    },

    update: function(){
        var cam = this.cameras.main;
        var moveForce = 0.01;
        var velocity = this.conrobot.body.velocity;
        //0 = l stand    1 = l walk    2 = l jump
        //3 = r stand    4 = r walk    5 = r jump
        if(conflag == true){
            conflag = false
            if(constate < 3){
                if(constate == 1){
                    this.conrobot.play('piglwalk');
                }
                else if(constate == 2){
                    this.conrobot.play('ljump');
                }
                else if(constate == 0){
                    this.conrobot.play('lstand');
                }
            }
            else if(constate > 2){
                if(constate == 4){
                    this.conrobot.play('pigrwalk');
                    
                }
                else if(constate == 5){
                    this.conrobot.play('rjump');
                    //cam.shake(100, 0.05); //畫面震動
                    //cam.fade(250, 0, 0, 0); //畫面轉黑
                }
                else if(constate == 3){
                    this.conrobot.play('rstand');
                }
            }
        }

        //移動
        if(conmoveAllow == true){
            if(cursors.left.isDown){
                //conrobot.body.setVelocityX(-300);
                //conrobot.setAccelerationX(-acceleration);
                this.conrobot.applyForce({ x: -moveForce, y: 0 });
                if(constate > 2){
                    constate = constate - 3;
                }
                else if(onGround){
                    constate = 1;
                }
            }
            else if(cursors.right.isDown){
                //conrobot.setAccelerationX(acceleration);
                //conrobot.body.setVelocityX(300);
                this.conrobot.applyForce({ x: moveForce, y: 0 });
                if(constate < 3){
                    constate = constate + 3;
                }
                else if(onGround){
                    constate = 4;
                }
            }
            else if(onGround){
                //conrobot.setAccelerationX(0);
                if(constate < 3){
                     constate = 0;
                }
                else{
                    constate = 3;
                }
            }
            if(cursors.up.isDown){
                //conrobot.body.setVelocityY(-850); //800
                if(onGround == true){
                    this.conrobot.setVelocityY(-25);
                }
                onGround = false;
                if(constate < 3){
                    constate = 2;
                }
                else{
                    constate = 5;
                }
            }
        }

        //紀錄位置
        roleX = this.conrobot.x;
        roleY = this.conrobot.y;

        //state更改判斷
        if(constate != contmp){
            conflag = true;
        }
        contmp = constate;

        //速度判斷
        if(velocity.x > 5){
            this.conrobot.setVelocityX(5);
        }
        else if(velocity.x < -5){
            this.conrobot.setVelocityX(-5);
        }

        //結局跳轉判斷
        if(conGoEnd1 == true){
            game.scene.start('conscientiousnessEnd');
            game.scene.stop('conscientiousness');
            game.scene.stop('conscientiousnessUI');
        }
    },
}

//創立盡責性背景
var createAllbackground = (scene, count, texture, scrollFactor, scale, y, yh) =>{
    let x = scene.scale.width*0.5
    var bg;
    for(let i=0;i<count;i++){
        bg = scene.add.image(x , y, texture)
            .setScale(scale)
            .setOrigin(1,1)
        bg.scrollFactorX = scrollFactor;
        bg.displayWidth = scene.scale.width;
        bg.displayHeight = scene.scale.height * yh;
        x = x + scene.scale.width;
    }
}

//判斷落地
function onSensorCollide ({ bodyA, bodyB, pair })  {
    if (bodyA === this.sensors.bottom) {
        onGround = true;
    }
}

//盡責性UI
//UI
var brickCount = 0;
var woodCount = 0;
var thatchCount = 0;
var brickLabel;
var woodLabel;
var thatchLabel;
var buildcount = 0;
var buildcontent = [0,0,0];
var maprole;

//盡責性商店
var createShopAllow = false;

var outsideframe;
var backButton;
var defenseButton;
var buildButton;

var thatchframe;
var thatchbuild;
var thatchicon;
var thatchicon2;
var thatchtext;
var thatchtext2;

var woodframe;
var woodbuild;
var woodicon;
var woodicon2;
var woodtext;
var woodtext2;

var brickframe;
var brickbuild;
var brickicon;
var brickicon2;
var bricktext;
var bricktext2;

var selectThatchframe;
var selectWoodframe;
var selectBrickframe;

var horizon;
var village;
var redpoint1,redpoint2,redpoint3;

var build1thatch;
var build1wood;
var build1brick;
var build2thatch;
var build2wood;
var build2brick;
var build3thatch;
var build3wood;
var build3brick;

//盡責性遊戲介紹
var conFrame;
var conIntroduce0;
var conIntroduce1;
var conIntroduce2;
var conIntroduce3;
var conIntroduce4;
var conIntroduceCount = 1;
var rightIn, rightOut;
var leftIn, leftOut;
var menuIn, menuOut;
var closeIn, closeOut;
var CloseToRightFlag = true;
var congoal1, congoal2, congoal3;

//時間參數
var contimeLock = false;
var congametime;
var contimeFlag = false
var sceneTimedEvent;

//盡責性UI
var conscientiousnessUI = {
    key: 'conscientiousnessUI',

    create: function(){
        //時間顯示
        this.initialTime = 180;
        congametime = this.add.text(game.config.width*0.5, game.config.height*0.05, '' + formatTime(this.initialTime),{
            fontSize: '48px',
            color: '#FFF'
        })
        .setOrigin(0.5,0.5);

        //小地圖
        var smallmap = this.add.rectangle(game.config.width*0.1 + 30, game.config.height*0.9, 200, 90, 0x4f4f4f)
        .setStrokeStyle(2, 0xFFC78E);

        maprole = this.add.image(game.config.width*0.1, game.config.height*0.9, 'maprole')
        .setScale(0.02)

        //蒐集物資條
        var thatchUI = this.add.image(32,32,'thatch')
        .setOrigin(0.5,0.5)
        .setScale(1); 
        thatchLabel = this.add.text(32,-12, ':0',{
            fontSize: '32px',
            color: '#FFF'
        })    

        var woodUI = this.add.image(32,64,'wood')
        .setOrigin(0.5,0.5)
        .setScale(1); 
        woodLabel = this.add.text(32,20, ':0',{
            fontSize: '32px',
            color: '#FFF'
        })      

        var brickUI = this.add.image(32,96,'brick')
        .setOrigin(0.5,0.5)
        .setScale(1); 
        brickLabel = this.add.text(32,52, ':0',{
            fontSize: '32px',
            color: '#FFF'
        })      

        var Buttonflag = false;

        //建造鈕
        var build = this.add.sprite(game.config.width*0.9,game.config.height*0.9, 'buildout')
        .setScale(0.33)
        .setInteractive()
        .on('pointerover', function (event) {
            buildin.alpha = 1;
            build.alpha = 0;
        })
        var buildin = this.add.sprite(game.config.width*0.9,game.config.height*0.9, 'buildin')
        .setScale(0.33)
        .setInteractive()
        .setAlpha(0)
        .on('pointerdown', function (event) {
            if(createShopAllow == true){
                buildin.alpha = 0;
                Buttonflag = true;
                createShoppage(1);
                contimeLock = true;
                conmoveAllow = false;
            }
        })
        .on('pointerout', function (event) {
            if(Buttonflag == false){
                build.alpha = 1
                buildin.alpha = 0;
            }
        });

        //商店
        outsideframe = this.add.rectangle(game.config.width*0.5, game.config.height*0.5, game.config.width-100, game.config.height-100, 0xa6a6a6)
        .setOrigin(0.5,0.5)
        .setAlpha(0) //透明度
        outsideframe.setStrokeStyle(2, 0x545454);
        /*
        this.tweens.add({

            targets: outsideframe,
            scaleX: 1,
            scaleY: 1,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
    
        });
        */
        //back鈕
        backButton = this.add.sprite(250, 650, 'backout')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerover', function (event) {
            backin.alpha = 0.8
            backButton.alpha = 0
        })
        var backin = this.add.sprite(250, 650, 'backin')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerdown', function (event) {
            Buttonflag = false
            build.alpha = 1;
            backin.alpha = 0;
            backButton.alpha = 0.8;
            createShoppage(0);
            contimeLock = false;
            conmoveAllow = true;
        })
        .on('pointerout', function (event) {
            if(Buttonflag == true){
                backin.alpha = 0;
                backButton.alpha = 0.8;
            }
        });
        //build鈕(商店內)
        buildButton = this.add.sprite(500, 650, 'buildout')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerover', function (event) {
            buildin2.alpha = 0.8
            buildButton.alpha = 0
        })
        var buildin2 = this.add.sprite(500, 650, 'buildin')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerdown', function (event) {
            if(selectThatchframe.alpha == 1){
                if(thatchCount < 10){
                    alert('茅草收集不夠');
                }
                else if(buildcount >= 3){
                    alert('建造數量已達上限');
                }
                else{
                    thatchCount = thatchCount - 10;
                    buildcount++;
                    buildcontent[buildcount] = 1;
                    changeredpoint(buildcount);
                    createBuild(buildcount, buildcontent[buildcount]);
                }
            }
            else if(selectWoodframe.alpha == 1){
                if(woodCount < 15){
                    alert('木頭收集不夠');
                }
                else if(buildcount >= 3){
                    alert('建造數量已達上限');
                }
                else{
                    woodCount = woodCount - 15;
                    buildcount++;
                    buildcontent[buildcount] = 2;
                    changeredpoint(buildcount);
                    createBuild(buildcount, buildcontent[buildcount]);
                }
            }
            else if(selectBrickframe.alpha == 1){
                if(brickCount < 20){
                    alert('磚頭收集不夠');
                }
                else if(buildcount >= 3){
                    alert('建造數量已達上限');
                }
                else{
                    brickCount = brickCount - 20;
                    buildcount++;
                    buildcontent[buildcount] = 3;
                    changeredpoint(buildcount);
                    createBuild(buildcount, buildcontent[buildcount]);
                }
            }
        })
        .on('pointerout', function (event) {
            if(Buttonflag == true){
                buildin2.alpha = 0;
                buildButton.alpha = 0.8;
            }
        });
        //前往防禦頁面鈕
        defenseButton = this.add.sprite(750, 650, 'defenseout')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerover', function (event) {
            defensein.alpha = 0.8
            defenseButton.alpha = 0
        })
        var defensein = this.add.sprite(750, 650, 'defensein')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerdown', function (event) {
            conGoEnd1 = true;
        })
        .on('pointerout', function (event) {
            if(Buttonflag == true){
                defensein.alpha = 0;
                defenseButton.alpha = 0.8;
            }
        });


        //建造茅草堆框
        thatchframe = this.add.rectangle(212, game.config.height*0.5, 280, 350, 0x7D7D7D)
        .setOrigin(0.5,0.5)
        .setAlpha(0) //透明度
        .setStrokeStyle(2, 0x2B2B2B)
        .setInteractive()
        /*
        .on('pointerover', () => { 
            selectThatchframe.alpha = 1;
        })
        .on('pointerout', function (event) {
            selectThatchframe.alpha = 0;
        })
        */
        .on('pointerdown', function (event) {
            selectThatchframe.alpha = 1;
            selectWoodframe.alpha = 0;
            selectBrickframe.alpha = 0;
        });
        thatchbuild = this.add.image(202, game.config.height*0.4, 'thatchbuild')
        .setOrigin(0.5,0.5)
        .setScale(1.2)
        .setAlpha(0);
        selectThatchframe = this.add.rectangle(212, game.config.height*0.5, 270, 340)
        .setStrokeStyle(4, 0xFFD306)
        .setAlpha(0);
        thatchicon = this.add.image(162, game.config.height*0.65, 'thatch')
        .setOrigin(0.5,0.5)
        .setScale(1.5)
        .setAlpha(0);
        thatchtext = this.add.text(172, game.config.height*0.63, ' ×10',{
            fontSize: '48px',
            color: '#000'
        })
        .setAlpha(0);

        //建造木柵欄框
        woodframe = this.add.rectangle(512, game.config.height*0.5, 280, 350, 0x7D7D7D)
        .setOrigin(0.5,0.5)
        .setAlpha(0) //透明度
        .setStrokeStyle(2, 0x2B2B2B)
        .setInteractive()
        /*
        .on('pointerover', () => { 
            selectWoodframe.alpha = 1;
        })
        .on('pointerout', function (event) {
            selectWoodframe.alpha = 0;
        })
        */
        .on('pointerdown', function (event) {
            selectThatchframe.alpha = 0;
            selectWoodframe.alpha = 1;
            selectBrickframe.alpha = 0;
        });
        woodbuild = this.add.image(512, game.config.height*0.45, 'woodbuild')
        .setOrigin(0.5,0.5)
        .setScale(0.75)
        .setAlpha(0);
        selectWoodframe = this.add.rectangle(512, game.config.height*0.5, 270, 340)
        .setStrokeStyle(4, 0xFFD306)
        .setAlpha(0);
        woodicon = this.add.image(462, game.config.height*0.65, 'wood')
        .setScale(1.5)
        .setAlpha(0);
        woodtext = this.add.text(472, game.config.height*0.63, ' ×15',{
            fontSize: '48px',
            color: '#000'
        })
        .setAlpha(0);

        //建造磚頭牆框
        brickframe = this.add.rectangle(812, game.config.height*0.5, 280, 350, 0x7D7D7D)
        .setOrigin(0.5,0.5)
        .setAlpha(0) //透明度
        .setStrokeStyle(2, 0x2B2B2B)
        .setInteractive()
        /*
        .on('pointerover', () => { 
            selectBrickframe.alpha = 1;
        })
        .on('pointerout', function (event) {
            selectBrickframe.alpha = 0;
        })
        */
        .on('pointerdown', function (event) {
            selectThatchframe.alpha = 0;
            selectWoodframe.alpha = 0;
            selectBrickframe.alpha = 1;
        });
        brickbuild = this.add.image(812, game.config.height*0.45, 'brickbuild')
        .setOrigin(0.5,0.5)
        .setScale(0.9)
        .setAlpha(0);
        selectBrickframe = this.add.rectangle(812, game.config.height*0.5, 270, 340)
        .setStrokeStyle(4, 0xFFD306)
        .setAlpha(0);
        brickicon = this.add.image(762, game.config.height*0.65, 'brick')
        .setScale(1.5)
        .setAlpha(0);
        bricktext = this.add.text(772, game.config.height*0.63, ' ×20',{
            fontSize: '48px',
            color: '#000'
        })
        .setAlpha(0);

        //商店左上資源進度
        thatchicon2 = this.add.image(100, 90, 'thatch')
        .setOrigin(0.5,0.5)
        .setAlpha(0);
        thatchtext2 = this.add.text(100, 84, ' : ',{
            fontSize: '24px',
            color: '#000'
        })
        .setAlpha(0);
        woodicon2 = this.add.image(100, 126, 'wood')
        .setOrigin(0.5,0.5)
        .setAlpha(0);
        woodtext2 = this.add.text(100, 120, ' : ',{
            fontSize: '24px',
            color: '#000'
        })
        .setAlpha(0);
        brickicon2 = this.add.image(100, 162, 'brick')
        .setOrigin(0.5,0.5)
        .setAlpha(0);
        bricktext2 = this.add.text(100, 156, ' : ',{
            fontSize: '24px',
            color: '#000'
        })
        .setAlpha(0);

        //商店防禦預覽圖
        horizon = this.add.graphics()
        .lineStyle(10, 0x00ff00, 1)
        .lineBetween(200, 150, 900, 150)
        .setAlpha(0);
        //警告線
        redpoint1 = this.add.graphics()
        .lineStyle(10, 0xff0000, 1)
        .lineBetween(600, 150, 625, 150)
        .setAlpha(0);
        redpoint2 = this.add.graphics()
        .lineStyle(10, 0xff0000, 1)
        .lineBetween(700, 150, 725, 150)
        .setAlpha(0);
        redpoint3 = this.add.graphics()
        .lineStyle(10, 0xff0000, 1)
        .lineBetween(800, 150, 825, 150)
        .setAlpha(0);
        village = this.add.image(400, 108, 'village')
        .setOrigin(0.5, 0.5)
        .setScale(0.5)
        .setAlpha(0);
        //預覽建造物
        build1thatch = this.add.image(612, 125, 'thatchbuild')
        .setScale(0.25)
        .setOrigin(0.5,0.5)
        .setAlpha(0);
        build2thatch = this.add.image(712, 125, 'thatchbuild')
        .setScale(0.25)
        .setOrigin(0.5,0.5)
        .setAlpha(0);
        build3thatch = this.add.image(812, 125, 'thatchbuild')
        .setScale(0.25)
        .setOrigin(0.5,0.5)
        .setAlpha(0);
        build1wood = this.add.image(612, 125, 'woodbuild')
        .setScale(0.15)
        .setOrigin(0.5,0.5)
        .setAlpha(0);
        build2wood = this.add.image(712, 125, 'woodbuild')
        .setScale(0.15)
        .setOrigin(0.5,0.5)
        .setAlpha(0);
        build3wood = this.add.image(812, 125, 'woodbuild')
        .setScale(0.15)
        .setOrigin(0.5,0.5)
        .setAlpha(0);
        build1brick = this.add.image(612, 125, 'brickbuild')
        .setScale(0.20)
        .setOrigin(0.5,0.5)
        .setAlpha(0);
        build2brick = this.add.image(712, 125, 'brickbuild')
        .setScale(0.20)
        .setOrigin(0.5,0.5)
        .setAlpha(0);
        build3brick = this.add.image(812, 125, 'brickbuild')
        .setScale(0.20)
        .setOrigin(0.5,0.5)
        .setAlpha(0);
        
        //遊戲介紹
        conFrame = this.add.rectangle(game.config.width*0.5, game.config.height*0.5, game.config.width-100, game.config.height-100, 0xFFC78E)
        .setStrokeStyle(5, 0x000000)
        .setOrigin(0.5,0.5)
        .setAlpha(1) //透明度
        if(conLevel == 1){
            conIntroduce0 = this.add.image(game.config.width*0.5, game.config.height*0.48,'conIntroduce0a')
        }
        else if(conLevel == 2){
            conIntroduce0 = this.add.image(game.config.width*0.5, game.config.height*0.48,'conIntroduce0b')
        }
        else if(conLevel == 3){
            conIntroduce0 = this.add.image(game.config.width*0.5, game.config.height*0.48,'conIntroduce0c')
        }
        conIntroduce0.setScale(0.3)
        .setAlpha(0)
        conIntroduce1 = this.add.image(game.config.width*0.5, game.config.height*0.5,'conIntroduce1')
        .setScale(0.24)
        .setAlpha(0)
        conIntroduce2 = this.add.image(game.config.width*0.5, game.config.height*0.45,'conIntroduce2')
        .setScale(0.24)
        .setAlpha(0)
        conIntroduce3 = this.add.image(game.config.width*0.5, game.config.height*0.45,'conIntroduce3')
        .setScale(0.24)
        .setAlpha(0)
        conIntroduce4 = this.add.image(game.config.width*0.5, game.config.height*0.45,'conIntroduce4')
        .setScale(0.22)
        .setAlpha(0)
        //關卡目標
        congoal1 = this.add.image(game.config.width*0.5, game.config.height*0.45,'congoal1')
        .setAlpha(0)
        .setScale(0.5)
        congoal2 = this.add.image(game.config.width*0.5, game.config.height*0.45,'congoal2')
        .setAlpha(0)
        .setScale(0.5)
        congoal3 = this.add.image(game.config.width*0.5, game.config.height*0.45,'congoal3')
        .setAlpha(0)
        .setScale(0.5)
        //右按鈕
        rightOut = this.add.sprite(game.config.width*0.85, game.config.height*0.87,'rightout')
        .setScale(0.25)
        .setInteractive()
        .on('pointerover', function (event) {
            rightIn.alpha = 1
            rightOut.alpha = 0
        })
        rightIn = this.add.sprite(game.config.width*0.85, game.config.height*0.87,'rightin')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerdown', function (event) {
            conIntroduceCount++;
        })
        .on('pointerout', function (event) {
            rightIn.alpha = 0;
            rightOut.alpha = 1;
        })
        //左按鈕
        leftOut = this.add.sprite(game.config.width*0.15, game.config.height*0.87,'leftout')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerover', function (event) {
            leftIn.alpha = 1
            leftOut.alpha = 0
        })
        leftIn = this.add.sprite(game.config.width*0.15, game.config.height*0.87,'leftin')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerdown', function (event) {
            conIntroduceCount--;
        })
        .on('pointerout', function (event) {
            leftIn.alpha = 0;
            leftOut.alpha = 1;
        })
        //close按鈕
        closeOut = this.add.sprite(game.config.width*0.85, game.config.height*0.87,'closeout')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerover', function (event) {
            closeIn.alpha = 1;
            closeOut.alpha = 0;
        })
        closeIn = this.add.sprite(game.config.width*0.85, game.config.height*0.87,'closein')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerdown', function (event) {
            conIntroduceCount++;
        })
        .on('pointerout', function (event) {
            closeIn.alpha = 0;
            closeOut.alpha = 1;
        })

        //初始化變數
        conmoveAllow = false;
        buildcount = 0;
        buildcontent = [0,0,0];
        contimeLock = false;
        contimeFlag = false;
        brickCount = 0;
        woodCount = 0;
        thatchCount = 0;
        conIntroduceCount = 0;
        CloseToRightFlag = true;
        createShopAllow = false;
    },

    update: function(){
        if(Math.floor(thatchCount/10) > 0){
            thatchLabel.text =  '\n :' + thatchCount + '/60('+ Math.floor(thatchCount/10) +')';
        }
        else{
            thatchLabel.text =  '\n :' + thatchCount + '/60';
        }
        thatchtext2.text =  ' :' + thatchCount; 
        if(Math.floor(woodCount/15) > 0){
            woodLabel.text =  '\n :' + woodCount + '/60('+ Math.floor(woodCount/15) +')';
        }
        else{
            woodLabel.text =  '\n :' + woodCount + '/60';
        }
        woodtext2.text =  ' :' + woodCount;
        if(Math.floor(brickCount/20) > 0){
            brickLabel.text =  '\n :' + brickCount + '/60('+ Math.floor(brickCount/20) +')';
        }
        else{
            brickLabel.text =  '\n :' + brickCount + '/60';
        }
        bricktext2.text =  ' :' + brickCount;

        //開始遊戲開始計時跟動
        if(conmoveAllow == true && contimeFlag == false){
            contimeFlag = true;
            sceneTimedEvent = this.time.addEvent({ delay: 1000, callback: contimeEvent, callbackScope: this, loop: true });
        }

        //小地圖
        maprole.x = 40 + (roleX / conmap.widthInPixels) * game.config.width * 0.18;
        maprole.y = game.config.height * 0.85 + (roleY / conmap.heightInPixels) * game.config.height * 0.1;
        
        //遊戲介紹前後頁控制
        if(conIntroduceCount == 0){
            conIntroduce0.alpha = 1;
            conIntroduce1.alpha = 0;
            leftIn.alpha = 0;
            leftOut.alpha = 0;
            if(CloseToRightFlag == false){
                CloseToRightFlag = true;
            }
        }
        else if(conIntroduceCount == 1){
            conIntroduce0.alpha = 0;
            conIntroduce1.alpha = 1;
            conIntroduce2.alpha = 0;
            if(CloseToRightFlag == true){
                leftOut.alpha = 1;
                CloseToRightFlag = false;
            }
        }
        else if(conIntroduceCount == 2){
            conIntroduce1.alpha = 0;
            conIntroduce2.alpha = 1;
            conIntroduce3.alpha = 0;
            if(CloseToRightFlag == false){
                rightIn.alpha = 1;
                CloseToRightFlag = true;
            }
        }
        else if(conIntroduceCount == 3){
            conIntroduce2.alpha = 0;
            conIntroduce3.alpha = 1;
            conIntroduce4.alpha = 0;
            if(CloseToRightFlag == true){
                rightIn.alpha = 1;
                CloseToRightFlag = false;
            }
        }
        else if(conIntroduceCount == 4){
            conIntroduce3.alpha = 0;
            conIntroduce4.alpha = 1;
            congoal1.alpha = 0;
            congoal2.alpha = 0;
            congoal3.alpha = 0;
            closeIn.alpha = 0;
            closeOut.alpha = 0;
            if(CloseToRightFlag == false){
                rightIn.alpha = 1;
                CloseToRightFlag = true;
            }
        }
        else if(conIntroduceCount == 5){
            conIntroduce4.alpha = 0;
            if(conLevel == 1){
                congoal1.alpha = 1;
            }
            else if(conLevel == 2){
                congoal2.alpha = 1;
            }
            else if(conLevel == 3){
                congoal3.alpha = 1;
            }
            rightIn.alpha = 0;
            rightOut.alpha = 0;
            if(CloseToRightFlag == true){
                closeIn.alpha = 1;
                CloseToRightFlag = false;
            }
        }
        else if(conIntroduceCount == 6){
            congoal1.alpha = 0;
            congoal2.alpha = 0;
            congoal3.alpha = 0;
            closeIn.alpha = 0;
            closeOut.alpha = 0;
            leftIn.alpha = 0;
            leftOut.alpha = 0;
            conIntroduce3.alpha = 0;
            conFrame.alpha = 0;
            conmoveAllow = true;
            createShopAllow = true;
            conIntroduceCount++; //跳出此if
        }
        else{
            closeIn.alpha = 0;
            closeOut.alpha = 0;
        }
    }

}

function contimeEvent(stage)
{
    if(this.initialTime>0){
        if(contimeLock == false){
            this.initialTime -= 1; // One second
            congametime.setText(''+ formatTime(this.initialTime),)
        }
    }
    else {
        conmoveAllow = false;
        congametime.setX(game.config.width * 0.5)
        .setY(game.config.height * 0.5)
        .setColor('#FFF')
        .setText('\n時間到，請按BUILD建造建築');     
    }
    remainTime = this.initialTime;
}

var createShoppage = (alpha) => {
    outsideframe.alpha = alpha;
    backButton.alpha = alpha;
    defenseButton.alpha = alpha;
    buildButton.alpha = alpha;

    brickframe.alpha = alpha;
    brickbuild.alpha = alpha;
    brickicon.alpha = alpha;
    bricktext.alpha = alpha;

    woodframe.alpha = alpha;
    woodbuild.alpha = alpha;
    woodicon.alpha = alpha;
    woodtext.alpha = alpha;
    
    thatchframe.alpha = alpha;
    thatchbuild.alpha = alpha;
    thatchicon.alpha = alpha;
    thatchtext.alpha = alpha;

    thatchicon2.alpha = alpha;
    thatchtext2.alpha = alpha;
    woodicon2.alpha = alpha;
    woodtext2.alpha = alpha;
    brickicon2.alpha = alpha;
    bricktext2.alpha = alpha;

    if(alpha == 0){
        selectThatchframe.alpha = alpha;
        selectWoodframe.alpha = alpha;
        selectBrickframe.alpha = alpha;
    }

    horizon.alpha = alpha;
    village.alpha = alpha;

    if(buildcount == 0){
        redpoint1.alpha = alpha;
        redpoint2.alpha = alpha;
        redpoint3.alpha = alpha;
    }
    else if(buildcount == 1){
        redpoint2.alpha = alpha;
        redpoint3.alpha = alpha;
    }
    else if(buildcount == 2){
        redpoint3.alpha = alpha;
    }
    
    if(buildcontent[1] == 1) build1thatch.alpha = alpha;
    else if(buildcontent[1] == 2)   build1wood.alpha = alpha;
    else if(buildcontent[1] == 3)   build1brick.alpha = alpha;
    if(buildcontent[2] == 1)   build2thatch.alpha = alpha;
    else if(buildcontent[2] == 2)   build2wood.alpha = alpha;
    else if(buildcontent[2] == 3)   build2brick.alpha = alpha;
    if(buildcontent[3] == 1)   build3thatch.alpha = alpha;
    else if(buildcontent[3] == 2)   build3wood.alpha = alpha;
    else if(buildcontent[3] == 3)   build3brick.alpha = alpha;
}

//建築物預覽紅條改變
var changeredpoint = (count) =>{
    if(count == 1){
        redpoint1.alpha = 0;
    }
    else if(count == 2){
        redpoint2.alpha = 0;
    }
    else if(count == 3){
        redpoint3.alpha = 0;
    }
}

//建築物預覽建造
var createBuild = (count, content) => {
    if(count == 1){
        if(content == 1){
            build1thatch.alpha = 1
        }
        else if(content == 2){
            build1wood.alpha = 1
        }
        else if(content == 3){
            build1brick.alpha = 1
        }
    }
    else if(count == 2){
        if(content == 1){
            build2thatch.alpha = 1
        }
        else if(content == 2){
            build2wood.alpha = 1
        }
        else if(content == 3){
            build2brick.alpha = 1
        }
    }
    else if(count == 3){
        if(content == 1){
            build3thatch.alpha = 1
        }
        else if(content == 2){
            build3wood.alpha = 1
        }
        else if(content == 3){
            build3brick.alpha = 1
        }
    }
}

//盡責性結局
var wolve;
var wolveXtmp;
var consmoke,consmoke2;
var pig1,pig2,pig3,pig4,pig5,pig6,pig7,pig8,pig9,pig0;
var alive = [true,true,true,true,true,true,true,true,true,true];
var lock = [true,true,true,true,true,true,true,true,true,true];
var tumb = [ , , , , , , , , , ];
var cam;
var endBuild1,endBuild2,endBuild3;
var counterRunAwayPig = 0;
var conGoEnd2 = false;
var remainflag = true;

var conscientiousnessEnd = {
    key: 'conscientiousnessEnd',

    create: function(){
        var width = this.scale.width;
        var height = this.scale.height;
        var conbg0 = this.add.image(width * 0.5, height * 0.5, 'conbg0')
            .setScrollFactor(0);
        conbg0.displayWidth = width;
        conbg0.displayHeight = height;
        createAllbackground(this, 10, 'conbg1', 0.2, 0.2, height, 1.5);
        createAllbackground(this, 10, 'conbg2', 0.4, 0.2, height, 1.2);

        //鍵盤
        cursors = this.input.keyboard.createCursorKeys();

        //camera
        this.cameras.main.setBounds(64,0,width*5-64,height);
        cam = this.cameras.main;
        cam.centerOnX(game.config.width*2.5);

        //地圖
        var conmap_end = this.make.tilemap({ key: 'conmap_end', tileWidth: 32, tileHeight: 32});
        var contileset = conmap_end.addTilesetImage('ConTile', 'contile' ,32,32,0,0);
        var GroundLayer = conmap_end.createDynamicLayer('Ground',contileset,0,0);
        GroundLayer.setCollisionByProperty({ collides: true });
        
        //debug用 draw tiled (arcade模式)
        /*
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        GroundLayer.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });
        */

        //建物
        if(buildcontent[1]==1){
            endBuild1 = this.physics.add.staticImage(game.config.width*3.5, 510, 'thatchbuild')
            .setScale(1.1)
            .setSize(220,200)
            endBuild1.name = 'thatch';
        }
        else if(buildcontent[1]==2){
            endBuild1 = this.physics.add.staticImage(game.config.width*3.5, 495, 'woodbuild')
            .setScale(0.9)
            .setSize(250,220)
            endBuild1.name = 'wood';
        }
        else if(buildcontent[1]==3){
            endBuild1 = this.physics.add.staticImage(game.config.width*3.5, 505, 'brickbuild')
            .setSize(215,220)
            endBuild1.name = 'brick';
        }
        if(buildcontent[2]==1){
            endBuild2 = this.physics.add.staticImage(game.config.width*4, 510, 'thatchbuild')
            .setScale(1.1)
            .setSize(220,200)
            endBuild2.name = 'thatch';
        }
        else if(buildcontent[2]==2){
            endBuild2 = this.physics.add.staticImage(game.config.width*4, 495, 'woodbuild')
            .setScale(0.9)
            .setSize(250,220)
            endBuild2.name = 'wood';
        }
        else if(buildcontent[2]==3){
            endBuild2 = this.physics.add.staticImage(game.config.width*4, 505, 'brickbuild')
            .setSize(215,220)
            endBuild2.name = 'brick';
        }
        if(buildcontent[3]==1){
            endBuild3 = this.physics.add.staticImage(game.config.width*4.5, 510, 'thatchbuild')
            .setScale(1.1)
            .setSize(220,200)
            endBuild3.name = 'thatch';
        }
        else if(buildcontent[3]==2){
            endBuild3 = this.physics.add.staticImage(game.config.width*4.5, 495, 'woodbuild')
            .setScale(0.9)
            .setSize(250,220)
            endBuild3.name = 'wood';
        }
        else if(buildcontent[3]==3){
            endBuild3 = this.physics.add.staticImage(game.config.width*4.5, 505, 'brickbuild')
            .setSize(215,220)
            endBuild3.name = 'brick';
        }

        //豬村
        this.add.image(width*2.5, 350, 'village')
        .setOrigin(0.5,0.5)
        .setScale(3.5);
        //狼
        wolve = this.physics.add.sprite(game.config.width*4.9 , 350, 'wolve')
        .setSize(670, 750)
        .setScale(0.3)
        .setAlpha(0)
        wolve.setGravityY(1000);
        this.anims.create({
            key: 'wolvewalk',
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("wolve", {frames:[1,2,3,0]}),
            repeat: -1
        })
        wolve.play('wolvewalk');

        //豬
        pig1 = this.physics.add.sprite(game.config.width*2.5, 550, 'pig1')
        .setSize(32, 56)
        .setAlpha(0)
        .setScale(2);
        pig1.setGravityY(1000);
        pig1.name = '1';

        pig2 = this.physics.add.sprite(game.config.width*2.5, 500, 'pig2')
        .setSize(32, 56)
        .setAlpha(0)
        .setScale(2);
        pig2.setGravityY(1000);
        pig2.name = '2';

        pig3 = this.physics.add.sprite(game.config.width*2.5, 500, 'pig3')
        .setSize(32, 48)
        .setAlpha(0)
        .setScale(2);
        pig3.setGravityY(1000);
        pig3.name = '3';

        pig4 = this.physics.add.sprite(game.config.width*2.5, 500, 'pig4')
        .setSize(32, 48)
        .setAlpha(0)
        .setScale(2);
        pig4.setGravityY(1000);
        pig4.name = '4';

        pig5 = this.physics.add.sprite(game.config.width*2.5, 500, 'pig5')
        .setSize(32, 48)
        .setAlpha(0)
        .setScale(2);
        pig5.setGravityY(1000);
        pig5.name = '5';

        pig6 = this.physics.add.sprite(game.config.width*2.5, 500, 'pig6')
        .setSize(32, 48)
        .setAlpha(0)
        .setScale(2);
        pig6.setGravityY(1000);
        pig6.name = '6';

        pig7 = this.physics.add.sprite(game.config.width*2.5, 500, 'pig7')
        .setSize(22, 48)
        .setAlpha(0)
        .setScale(2);
        pig7.setGravityY(1000);
        pig7.name = '7';

        pig8 = this.physics.add.sprite(game.config.width*2.5, 500, 'pig8')
        .setSize(32, 48)
        .setAlpha(0)
        .setScale(2);
        pig8.setGravityY(1000);
        pig8.name = '8';

        pig9 = this.physics.add.sprite(game.config.width*2.5, 500, 'pig9')
        .setSize(32, 48)
        .setAlpha(0)
        .setScale(2);
        pig9.setGravityY(1000);
        pig9.name = '9';

        pig0 = this.physics.add.sprite(game.config.width*2.5, 500, 'pig0')
        .setSize(32, 48)
        .setAlpha(0)
        .setScale(2);
        pig0.setGravityY(1000);
        pig0.name = '0';

        //煙霧
        consmoke = this.physics.add.sprite(game.config.width*2.5, 500, 'consmoke')
        .setScale(0.3)
        .setAlpha(0)
        this.anims.create({
            key: 'flow',
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("consmoke", {frames:[0,1,2]}),
            repeat: -1
        })
        consmoke.play('flow');

        consmoke2 = this.physics.add.sprite(game.config.width*2.5, 500, 'consmoke')
        .setScale(0.4)
        .setAlpha(0)
        this.anims.create({
            key: 'flow2',
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("consmoke", {frames:[1,2,0]}),
            repeat: -1
        })
        consmoke2.play('flow2');

        //墳墓
        for(var i=0; i<10; i++){
            tumb[i] = this.add.image(game.config.width*2.5, 565, 'tumb')
            .setScale(1.5)
            .setAlpha(0)
            if(i == 7){
                tumb[i].setScale(1);
                tumb[i].y = 579;
            }
        }

        //UI
        this.scene.launch('conscientiousnessEndUI');

        //碰撞設定
        this.physics.add.collider(wolve, GroundLayer);
        this.physics.add.collider(pig1, GroundLayer);
        this.physics.add.collider(pig2, GroundLayer);
        this.physics.add.collider(pig3, GroundLayer);
        this.physics.add.collider(pig4, GroundLayer);
        this.physics.add.collider(pig5, GroundLayer);
        this.physics.add.collider(pig6, GroundLayer);
        this.physics.add.collider(pig7, GroundLayer);
        this.physics.add.collider(pig8, GroundLayer);
        this.physics.add.collider(pig9, GroundLayer);
        this.physics.add.collider(pig0, GroundLayer);

        this.physics.add.collider(wolve, endBuild1, breakBuild);
        this.physics.add.collider(wolve, endBuild2, breakBuild);
        this.physics.add.collider(wolve, endBuild3, breakBuild);

        this.physics.add.collider(wolve, pig1, eatpig);
        this.physics.add.collider(wolve, pig2, eatpig);
        this.physics.add.collider(wolve, pig3, eatpig);
        this.physics.add.collider(wolve, pig4, eatpig);
        this.physics.add.collider(wolve, pig5, eatpig);
        this.physics.add.collider(wolve, pig6, eatpig);
        this.physics.add.collider(wolve, pig7, eatpig);
        this.physics.add.collider(wolve, pig8, eatpig);
        this.physics.add.collider(wolve, pig9, eatpig);
        this.physics.add.collider(wolve, pig0, eatpig);

        //初始化變數
        alive = [true,true,true,true,true,true,true,true,true,true];
        lock = [true,true,true,true,true,true,true,true,true,true];
        counterRunAwayPig = 0;
        wolveXtmp = 0
        conGoEnd2 = false
        remainflag = true;
    },

    update: function(){
        //控制camera
        cam = this.cameras.main;
        if(cursors.left.isDown){
            cam.scrollX -= 10;
        }
        else if(cursors.right.isDown){
            cam.scrollX += 10;
        }

        //豬的速度與跳高
        //被抓到順序 4 1 7 5 6 2 9 8 0 3
        if(alive[1] == true){
            pigRun(pig1, -55, -170, 1, 0);
        }
        if(alive[2] == true){
            pigRun(pig2, -78, -150, 2, 1000);
        }
        if(alive[3] == true){
            pigRun(pig3, -120, -110, 3, 2000);
        }
        if(alive[4] == true){ 
            pigRun(pig4, -53, -160, 4, 3000);
        }
        if(alive[5] == true){ 
            pigRun(pig5, -68, -130, 5, 4000);
        }
        if(alive[6] == true){ 
            pigRun(pig6, -81, -90, 6, 5000);
        }
        if(alive[7] == true){
            pigRun(pig7, -69, -140, 7, 6000);
        }
        if(alive[8] == true){ 
            pigRun(pig8, -120, -130, 8, 7000);
        }
        if(alive[9] == true){
            pigRun(pig9, -110, -160, 9, 8000);
        }
        if(alive[0] == true){
            pigRun(pig0, -160, -150, 0, 9000);
        }

        //判斷狼的位置並顯示結果
        if(wolve.x == 196.5){
            wolve.stop();
            wolve.setVelocityX(0);
            wolve.x = 197;
            setTimeout(function(){
                counterEscapePig();
                conEndControl();
            },2000);
        }
        else if(wolve.x > 197){
            //判斷剩餘時間決定狼何時出發
            if(remainflag == true){
                var number = Math.ceil(remainTime/30);
                setTimeout(function(){
                    remainflag = false;
                }, 1800 * number);
            }
            else{
                wolve.setVelocityX(-200);
                wolve.alpha = 1;
            }
        }

        if(wolveXtmp != wolve.x){
            consmoke.alpha = 0;
            consmoke2.alpha = 0;
        }
        wolveXtmp = wolve.x

        if(conGoEnd2 == true){
            if(conLevel == 1 || conLevel == 2){
                game.scene.start('conscientiousness');
                game.scene.stop('conscientiousnessEnd');
                game.scene.stop('conscientiousnessEndUI');
                conLevel++;
            }
            else if(conLevel == 3){
                game.scene.start('main');
                game.scene.stop('conscientiousnessEnd');
                game.scene.stop('conscientiousnessEndUI');
            }  
        }
    },
}

function breakBuild(wolve, build){
    consmoke.x = (build.x + wolve.x) / 2;
    consmoke2.x = consmoke.x;
    consmoke.alpha = 1;
    consmoke2.alpha = 0.8;
    if(build.name == 'thatch')
    {
        setTimeout(function(){
            build.destroy();
        },3000);
    }
    else if(build.name == 'wood')
    {
        setTimeout(function(){
            build.destroy();
        },6000);
    }
    else if(build.name == 'brick')
    {
        setTimeout(function(){
            build.destroy();
        },9000);
    }
}

function pigRun(pig, speed, highjump, num, delay){
    var onGounnd = pig.body.blocked.down;
    if(lock[num] == false){
        pig.alpha += 0.01 
        if(pig.alpha == 1){
            pig.setVelocityX(speed);
            if(onGounnd){
                pig.setVelocityY(highjump)
            }
        }
    }
    else{
        setTimeout(function(){
            lock[num] = false;
        },delay);
    }
}

function counterEscapePig(){
    for(var i=0; i<10; i++){
        if(alive[i] == true){
            counterRunAwayPig++;
        }
    }
}

function eatpig(wolve , pig){
    if(pig.name == '1'){
        alive[1] = false
        tumb[1].alpha = 1;
        tumb[1].x = pig.x;
    }
    else if(pig.name == '2'){
        alive[2] = false
        tumb[2].alpha = 1;
        tumb[2].x = pig.x;
    }
    else if(pig.name == '3'){
        alive[3] = false
        tumb[3].alpha = 1;
        tumb[3].x = pig.x;
    }
    else if(pig.name == '4'){
        alive[4] = false
        tumb[4].alpha = 1;
        tumb[4].x = pig.x;
    }
    else if(pig.name == '5'){
        alive[5] = false
        tumb[5].alpha = 1;
        tumb[5].x = pig.x;
    }
    else if(pig.name == '6'){
        alive[6] = false
        tumb[6].alpha = 1;
        tumb[6].x = pig.x;
    }
    else if(pig.name == '7'){
        alive[7] = false
        tumb[7].alpha = 1;
        tumb[7].x = pig.x;
    }
    else if(pig.name == '8'){
        alive[8] = false
        tumb[8].alpha = 1;
        tumb[8].x = pig.x;
    }
    else if(pig.name == '9'){
        alive[9] = false
        tumb[9].alpha = 1;
        tumb[9].x = pig.x;
    }
    else if(pig.name == '0'){
        alive[0] = false
        tumb[0].alpha = 1;
        tumb[0].x = pig.x;
    }
    pig.destroy();
}

var end1Frame, end2Frame;
var endText1, endText2;
var conControl = 1;
var conEndflag = true;
var conIntroduce5,conIntroduce6,conIntroduce7;

var conscientiousnessEndUI = {
    key: 'conscientiousnessEndUI',

    create: function(){

        //End場景1 總共逃走幾隻小豬
        end1Frame = this.add.rectangle(game.config.width*0.5, game.config.height*0.5, game.config.width*0.4, game.config.height*0.4, 0xFFC78E)
        .setStrokeStyle(5, 0x000000)
        .setAlpha(0);

        //End場景2 介紹盡責性
        end2Frame = this.add.rectangle(game.config.width*0.5, game.config.height*0.5, game.config.width*0.8, game.config.height*0.8, 0xFFC78E)
        .setStrokeStyle(5, 0x000000)
        .setAlpha(0);

        endText1 = this.add.text(game.config.width*0.5, game.config.height*0.35, '',{
            fontSize: '48px',
            color: '#000'
        })
        .setOrigin(0.5,0.5)
        .setAlpha(0);

        endText2 = this.add.text(game.config.width*0.5, game.config.height*0.45, '',{
            fontSize: '32px',
            color: '#000'
        })
        .setOrigin(0.5,0.5)
        .setAlpha(0);

        conIntroduce5 = this.add.image(game.config.width*0.5, game.config.height*0.42, 'conIntroduce5')
        .setScale(0.25)
        .setOrigin(0.5, 0.5)
        .setAlpha(0)

        conIntroduce6 = this.add.image(game.config.width*0.5, game.config.height*0.42, 'conIntroduce6')
        .setScale(0.25)
        .setOrigin(0.5, 0.5)
        .setAlpha(0)

        conIntroduce7 = this.add.image(game.config.width*0.5, game.config.height*0.42, 'conIntroduce7')
        .setScale(0.25)
        .setOrigin(0.5, 0.5)
        .setAlpha(0)

        //右箭頭按鈕
        rightOut = this.add.sprite(game.config.width*0.5, game.config.height*0.6, 'rightout')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerover', function (event) {
            rightIn.alpha = 1;
            rightOut.alpha = 0;
        })
        rightIn = this.add.sprite(game.config.width*0.5, game.config.height*0.6, 'rightin')
        .setScale(0.25)
        .setAlpha(0)
        .setInteractive()
        .on('pointerout', function (event) {
            if(conEndflag == true){
                rightIn.alpha = 0;
                rightOut.alpha = 1;
            }
            else {
                rightIn.alpha = 0;
                rightOut.alpha = 0;
            }
        })
        .on('pointerdown', function (event) {
            if(conControl == 1){
                conControl = 2;
                conEndControl();
                conEndflag = false;
            }
        });
        //左箭頭按鈕
        leftOut = this.add.sprite(game.config.width*0.2, game.config.height*0.8, 'leftout')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerover', function (event) {
            leftIn.alpha = 1;
            leftOut.alpha = 0;
        })
        leftIn = this.add.sprite(game.config.width*0.2, game.config.height*0.8, 'leftin')
        .setScale(0.25)
        .setAlpha(0)
        .setInteractive()
        .on('pointerout', function (event) {
            if(conEndflag == false){
                leftIn.alpha = 0;
                leftOut.alpha = 1;
            }
            else {
                leftIn.alpha = 0;
                leftOut.alpha = 0;
            }
        })
        .on('pointerdown', function (event) {
            if(conControl == 2){
                conControl = 1;
                conEndControl();
                conEndflag = true;
            }
        });
        //Menu按鈕
        if(conLevel == 1 || conLevel == 2){
            //如果不是第三關，menu圖片換成next
            menuOut = this.add.sprite(game.config.width*0.8, game.config.height*0.8, 'nextout')
            menuIn = this.add.sprite(game.config.width*0.8, game.config.height*0.8, 'nextin')
        }
        else{
            menuOut = this.add.sprite(game.config.width*0.8, game.config.height*0.8, 'menuout')
            menuIn = this.add.sprite(game.config.width*0.8, game.config.height*0.8, 'menuin')
        }
        menuOut.setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerover', function (event) {
            menuIn.alpha = 1;
            menuOut.alpha = 0;
        })
        menuIn.setScale(0.25)
        .setAlpha(0)
        .setInteractive()
        .on('pointerout', function (event) {
            menuIn.alpha = 0;
            menuOut.alpha = 1;
        })
        .on('pointerdown', function (event) {
            conGoEnd2 = true;
        });

        conControl = 1
        conEndflag = true;
    },

    update: function(){
        if(conControl == 1){
            endText1.y = game.config.height*0.33;
            endText2.y = game.config.height*0.45;
            endText1.text =  '\n結果'
            endText2.text =  '\n總共有' + counterRunAwayPig + '隻小豬成功逃脫\n\n' + '總共有' + (10-counterRunAwayPig) + '隻小豬未能逃脫';
            conIntroduce5.alpha = 0;
            conIntroduce6.alpha = 0;
            conIntroduce7.alpha = 0;
        }
        else if(conControl == 2){
            endText1.alpha = 0;
            endText2.alpha = 0;
            if(conLevel == 1){
                conIntroduce5.alpha = 1;
            }
            else if(conLevel == 2){
                conIntroduce6.alpha = 1;
            }
            else if(conLevel == 3){
                conIntroduce7.alpha = 1;
            }
                
        }
    },
    //https://www.verywellmind.com/the-big-five-personality-dimensions-2795422
}

function conEndControl(){
    end1Frame.alpha = 0; 
    endText1.alpha = 0;
    endText2.alpha = 0;
    rightOut.alpha = 0;
    rightIn.alpha = 0;
    leftOut.alpha = 0;
    leftIn.alpha = 0;
    menuOut.alpha = 0;
    menuIn.alpha = 0;
    end2Frame.alpha = 0; 

    if(conControl == 1){
        end1Frame.alpha = 1; 
        endText1.alpha = 1;
        endText2.alpha = 1;
        rightOut.alpha = 1;
    }
    else if(conControl == 2){
        end2Frame.alpha = 1; 
        endText1.alpha = 1;
        endText2.alpha = 1;
        menuOut.alpha = 1;
        leftOut.alpha = 1;
    }
}

var player;
var cameras;
var background;
var block;
var bellUp;
var bellDown;
var bellLeft;
var bellRight;
var getGoose;
var getCoin;
var getHarp;
var goose;
var harp;
var coin;
var rat;
var rat1;
var rat2;
var rat3;
var rat4;
var rat5;
var cocroach;
var giant;
var giantIsAwake;
var giantStuck;
var giantPostX;
var giantPostY;
var giantSleep;
var pointer;
var circle;
var snore;
var footstep;
var harpSound;
var playerSite;
var giantSite;
var siteFlag;
var tmpSite;
var barrier1;
var barrier2;
var barrier3;
var barrier4;

//神經質射線變數
var raycaster;
var ray;
var graphics;
var slices;
var maskGraphics;
var mask;
var fow;
var intersections;
var tilemapLayer;
var topTilemapLayer;
var neuflag;
var neustate;
var neutmp;
var neustatex;
var neustatey;
var targetsCategory;
var giantCategory;
var showGoose;
var showCoin;
var showHarp;
var gooseText
var coinText
var harpText
var deadText
var playHarp
var giantAwake
var catchFlag

//神經質UI
var text;
var textFlag;
var deathimage;
var passionscale;
var refreshtime;
var refreshtimer = 0;
var refreshx = 0;
var refreshV;
var refreshscale = 0.01;
var refreshflag = false;
var neuUI;
var passion;


var timeline;


//神經質遊戲介紹
var neuMoveAllow;
var neuFrame;
var neuIntroFlag;
var neuLastArea;
var neuIntroduce0;
var neuIntroduce1;
var neuIntroduce2;
var neuIntroduce3;
var neuIntroduce4;
var neuIntroduce5;
var neuIntroducea;
var neuIntroduceb;
var neuIntroduceCount = 1;
var neuIntroduceGooseCount;

var neuCloseToRightFlag = true;

//時間參數
var neuTimeLock = false;
var neuTimeFlag = false;

//神經質 
var neuroticism = {
    key: 'neuroticism',

    physics: {
        matter: {
            gravity: { y: 1 },
            //debug: true
        },
    },
    
    create: function(){
        //去除重力
        this.matter.world.disableGravity();

        //set world bounds
        this.matter.world.setBounds(0,0,82,128,32);

        //創建場景
        //背景
        background = this.add.image(this.scale.width*0.5, this.scale.height*0.5, 'background')
        .setDepth(-1);
        
        //場景
        const neumap = this.make.tilemap({ key: 'neumap'});
        const neutileset = neumap.addTilesetImage('ground', 'neuground' ,32,32,0,0);
        //const neutileset2 = neumap.addTilesetImage('wall', 'neuground' ,32,32,0,0);
        const neulayer1 = neumap.createStaticLayer('ground',neutileset,0,0);
        const walllayer = neumap.createStaticLayer('wall',neutileset,0,0);
        const furniture = neumap.createStaticLayer('furniture',neutileset,0,0);

        //未通關障礙物
        barrier1 = this.matter.add.image(166, 1905, 'barrier')
        .setDepth(1)
        .setStatic(true)
        .setScale(1.05)
        barrier2 = this.matter.add.image(2496, 1264, 'barrier')
        .setDepth(1)
        .setStatic(true)
        .setScale(1.05)
        barrier3 = this.matter.add.image(1743, 1027, 'barrier')
        .setDepth(1)
        .setStatic(true)
        .setScale(1.05)
        .setAngle(90)
        barrier4 = this.matter.add.image(2096, 1264, 'barrier')
        .setDepth(1)
        .setStatic(true)
        .setScale(1.05)
        .setAlpha(0);

        //場景與角色碰撞
        walllayer.setCollisionByProperty({collides: true});
        this.matter.world.convertTilemapLayer(walllayer);

        //控制
        cursors = this.input.keyboard.createCursorKeys();

        var loopMarker = {
            name: 'loop',
            start: 0,
            config: {
                loop: true
            }
        };

        snore = this.sound.add('snore');
        snore.addMarker(loopMarker);
        snore.play('loop', {
            delay: 0
        });

        footstep = this.sound.add('footstep');
        footstep.addMarker(loopMarker);
        footstep.play('loop', {
            delay: 0
        });
        footstep.volume = 0;

        harpSound = this.sound.add('harpSound');
        

        //打呼隨機參數
        refreshtime = Phaser.Math.FloatBetween(1,7);
        refreshV = Phaser.Math.FloatBetween(0.01,0.022);
        //console.log('refreshtime: ' + refreshtime);
        //console.log('refreshV: ' + refreshV);
        snore.volume = 1 - (refreshV * 30);
        //console.log('snore volume: ' + snore.volume);
        
        //走路動畫
        this.anims.create(
            {
                key: 'walk',
                frameRate: 10,
                frames: this.anims.generateFrameNumbers("player",{frames:[0,1,2,3]}),
                repeat: -1
            }
        )
        //等待動畫
        this.anims.create(
            {
                key: 'stay',
                frameRate: 20,
                frames: this.anims.generateFrameNumbers("player",{frames:[3]}),
                repeat: -1
            }
        )

        //創建雷射發射器
        raycaster = this.raycasterPlugin.createRaycaster();
        
        //互動物件放置
        targetsCategory = this.matter.world.nextCategory();

        //raycaster.mapGameObjects([ barrier1 ], true);
        //raycaster.mapGameObjects([ barrier2 ], true);

        const objectsLayer = neumap.getObjectLayer('object')

        objectsLayer.objects.forEach(objData => {
            const {x = 0, y = 0, name} = objData

            switch (name)
            {
                case '1':
                {
                    block = this.matter.add.image(x, y, 'kulu')
                    .setDepth(2)
                    block.name = 'block'

                    block.setCollisionCategory(targetsCategory);

                    raycaster.mapGameObjects([ block ], true);

                    break
                }
                
                case 'bellUp':
                {
                    bellUp = this.matter.add.image(x, y, 'bell')
                    .setDepth(2)
                    .setStatic(true)
                    
                    bellUp.name = 'bellUp'

                    bellUp.setCollisionCategory(targetsCategory);

                    timeline = this.tweens.timeline({
                        targets: bellUp,
                        loop: -1,
                        tweens: [
                            {x: bellUp.x, y: bellUp.y - 160, ease: 'Sine.easeINOut', duration: 1200, yoyo: true}
                        ]
                    })

                    raycaster.mapGameObjects([ bellUp ], true);

                    break
                }

                case 'bellDown':
                {
                    bellDown = this.matter.add.image(x, y, 'bell')
                    .setDepth(2)
                    .setStatic(true)
                    
                    bellDown.name = 'bellDown'

                    bellDown.setCollisionCategory(targetsCategory);

                    timeline = this.tweens.timeline({
                        targets: bellDown,
                        loop: -1,
                        tweens: [
                            {x: bellDown.x, y: bellDown.y + 160, ease: 'Sine.easeINOut', duration: 600, yoyo: true}
                        ]
                    })

                    raycaster.mapGameObjects([ bellDown ], true);

                    break
                }
                
                case 'bellLeft':
                {
                    bellLeft = this.matter.add.image(x, y, 'bell')
                    .setDepth(2)
                    .setStatic(true)
                    
                    bellLeft.name = 'bellLeft'

                    bellLeft.setCollisionCategory(targetsCategory);

                    timeline = this.tweens.timeline({
                        targets: bellLeft,
                        loop: -1,
                        tweens: [
                            {x: bellLeft.x - 160, y: bellLeft.y, ease: 'Sine.easeINOut', duration: 1200, yoyo: true}
                        ]
                    })

                    raycaster.mapGameObjects([ bellLeft ], true);

                    break
                }

                case 'bellRight':
                {
                    bellRight = this.matter.add.image(x, y, 'bell')
                    .setDepth(2)
                    .setStatic(true)
                    
                    bellRight.name = 'bellRight'

                    bellRight.setCollisionCategory(targetsCategory);

                    timeline = this.tweens.timeline({
                        targets: bellRight,
                        loop: -1,
                        tweens: [
                            {x: bellRight.x + 160, y: bellRight.y, ease: 'Sine.easeINOut', duration: 1200, yoyo: true}
                        ]
                    })

                    raycaster.mapGameObjects([ bellRight ], true);

                    break
                }

                case 'rat' :
                {
                    for(var i = 0; i < 3; i++){
                        //console.log(i)
                        rat = this.matter.add.image(x, y, 'rat')
                        .setDepth(2)
                        .setStatic(true)
                        
                        rat.name = 'rat'
                        //console.log(rat.x)
                        //console.log(rat.y)
                        rat.setCollisionCategory(targetsCategory);
                        
                        timeline = this.tweens.timeline({
                            targets: rat,
                            loop: -1,
                            delay: i * 1000,
                            tweens: [
                                {
                                    x: rat.x + 300,
                                    ease: 'Sine.easeInOut',
                                    duration: 2000,
                                    yoyo: true
                                },
                                {
                                    y: rat.y - 150,
                                    ease: 'Sine.easeOut',
                                    duration: 1000,
                                    offset: 0
                                },
                                {
                                    y: rat.y,
                                    ease: 'Sine.easeIn',
                                    duration: 1000
                                },
                                {
                                    y: rat.y + 150,
                                    ease: 'Sine.easeOut',
                                    duration: 1000,
                                    //offset: 0
                                },
                                {
                                    y: rat.y,
                                    ease: 'Sine.easeIn',
                                    duration: 1000,
                                }
                            ]
                        })

                        raycaster.mapGameObjects([ rat ], true);
                    }
                    
                    break
                }

                case 'cocroach' :
                {
                    for(var i = 0; i < 3; i++){

                        cocroach = this.matter.add.image(x, y, 'cocroach')
                        .setDepth(2)
                        .setStatic(true)
                        
                        cocroach.name = 'cocroach'
                        //console.log(cocroach.x)
                        //console.log(cocroach.y)
                        cocroach.setCollisionCategory(targetsCategory);
                        
                        timeline = this.tweens.timeline({
                            targets: cocroach,
                            loop: -1,
                            delay: i * 1300,
                            tweens: [
                                {
                                    x: cocroach.x + 200,
                                    ease: 'Sine.easeInOut',
                                    duration: 2000,
                                    yoyo: true
                                },
                                {
                                    y: cocroach.y - 100,
                                    ease: 'Sine.easeOut',
                                    duration: 1000,
                                    offset: 0
                                },
                                {
                                    y: cocroach.y,
                                    ease: 'Sine.easeIn',
                                    duration: 1000,
                                },
                                {
                                    y: cocroach.y + 100,
                                    ease: 'Sine.easeOut',
                                    duration: 1000,
                                    offset: 0
                                },
                                {
                                    y: cocroach.y,
                                    ease: 'Sine.easeIn',
                                    duration: 1000,
                                }
                            ]
                        })

                        raycaster.mapGameObjects([ cocroach ], true);
                    }
                    
                    break
                }

                case 'spawn' :
                {
                    player = this.matter.add.sprite( x, y,'player')
                    .setScale(0.45,0.45)
                    .setCollisionCategory(targetsCategory)
                    //.setCollidesWith([targetsCategory]);
                    player.body.onWorldBounds = false;
                }

            }
        })

        this.physics.add.collider(walllayer,player);

        this.tween = this.tweens.addCounter({
            from: 260,
            to: 260,
            duration: 3000,
            delay: 2000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });

        giantCategory = this.matter.world.nextCategory();

        //巨人
        giantSleep = this.add.sprite( 2400, 704, 'giantSleep')
        .setDepth(6)
        
        giant = this.matter.add.sprite(2044, 726, 'giantRun')
        .setScale(1.7)
        .setDepth(0)
        .setAlpha(0.5)
        //.setCollidesWith([targetsCategory,giantCategory])

        giantIsAwake = false;

        giantStuck = this.time.addEvent({ delay: 2000, callback: giantStuckEvent, callbackScope: this, loop: true });

        goose = this.matter.add.sprite( 67, 2037, 'goose')
        .setDepth(4)
        coin = this.matter.add.sprite( 2490, 1347, 'coin')
        .setDepth(4)
        harp = this.matter.add.sprite( 1899, 573, 'harp')// 2410, 470
        .setDepth(4)

        //加按鍵
        pointer = this.input.activePointer;

        //死亡畫面
        deathimage = this.add.image(player.x , player.y, 'deathimage')
        .setAlpha(0)
        .setDepth(100);

        //創建雷射
        ray = raycaster.createRay({
            origin: {
                x: player.x,
                y: player.y
            },
        });
  
        //map tilemap layer
        raycaster.mapGameObjects(walllayer, false, {
            collisionTiles: [15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34] //array of tile types which collide with rays
        });

        //enable ray's matter physics body
        ray.enablePhysics('matter');

        
        //set ray cone size (angle)
        ray.setConeDeg(30);
        //cast ray in a cone
        intersections = ray.castCone();

        //draw rays
        graphics = this.add.graphics({ lineStyle: { width: 0, color: 0xffffff,alpha:0}, fillStyle: { color: 0xffffff, alpha: 0.3 } })
        //create field of view
        createFOV(this);

        //set depths
        neulayer1.setDepth(1);
        walllayer.setDepth(2);
        fow.setDepth(3);
        player.setDepth(4);
        furniture.setDepth(6);
        graphics.setDepth(5);

        //draw rays
        draw();
  
        //set ray position
        ray.setOrigin(player.x, player.y);
        //cast ray in all directions
        intersections = ray.castCone();
        //redraw
        draw();

        //UI
        this.scene.launch('neuroticismUI');


        // 事件觸發
        this.matterCollision.addOnCollideActive({
            objectA: [player],
            callback: ({ gameObjectA, gameObjectB }) => {
                //console.log('0000000');
                if( gameObjectB.name == 'block'){
                    //deathimage.alpha = 1;
                }
                else if(gameObjectB.name == 'bellDown' || gameObjectB.name == 'bellUp' || gameObjectB.name == 'bellLeft' || gameObjectB.name == 'bellRight' || gameObjectB.name == 'rat' || gameObjectB.name == 'cocroach')
                {
                    if(refreshscale < 1 && refreshflag == false)
                    {
                        refreshscale += 0.025;
                        refreshflag = true;
                    }
                    else
                    {
                        refreshflag = false;
                    }
                }
            }
        })

        //遊戲變數初始設定
        neuflag = true;
        neustate = 0;
        neutmp = 0;
        neustatex = 0;
        neustatey = 0;
        getGoose = false;
        getCoin = false;
        getHarp = false;
        playerSite = 0;
        giantSite = 0;
        siteFlag = false;
        neuFirstTime = true;
        catchFlag = false;
        neuIntroFlag = 0;
        neuLastArea = 0;
    },

    update: function(){
        //console.log('mainupdate')
        //固定角色不旋轉
        player.setAngularVelocity(0);

        var pointer = this.input.activePointer;

        //雷射原點
        ray.setOrigin(player.x, player.y);
        //console.log('x')
        //console.log(player.x)
        //console.log('y')
        //console.log(player.y)
        //cast ray in a cone
        intersections = ray.castCone();
        //redraw
        draw();

        ray.setAngle(Phaser.Math.Angle.Between(this.scale.width*0.5,this.scale.height*0.5,pointer.x,pointer.y));
        player.rotation = Phaser.Math.Angle.Between(this.scale.width*0.5,this.scale.height*0.5,pointer.x,pointer.y);
        
        //鏡頭追蹤角色
        this.cameras.main.scrollX =  player.x - 512;
        this.cameras.main.scrollY =  player.y - 384;
        deathimage.x = player.x;
        deathimage.y = player.y;
        background.x = player.x;
        background.y = player.y;

        refresh();

        if(neuflag == true)
        {
            neuflag = false;
            if(neustate != 0)
            {
                player.play('walk');
                footstep.volume = 0.4;
                if(refreshscale < 1)
                {
                    refreshscale += refreshV;
                }
            }
            else
            {
                player.play('stay');
                footstep.volume = 0;
                if(refreshscale > 0.01)
                {
                    refreshscale -=0.005;
                }
            }
        }

        if(cursors.left.isDown){
            player.setVelocityX(-4);
            if(neustatex == 0)
            {
                neustatex = 1;
            }
        }
        else if(cursors.right.isDown){
            player.setVelocityX(4);
            if(neustatex == 0)
            {
                neustatex = 1;
            }
        }else 
        {
            player.setVelocityX(0);
            if(neustatex != 0)
            {
                neustatex = 0;
            }
        }

        if(cursors.up.isDown){
            player.setVelocityY(-4);
            if(neustatey == 0)
            {
                neustatey = 1;
            }
        }
        else if(cursors.down.isDown){
            player.setVelocityY(4);
            if(neustatey == 0)
            {
                neustatey = 1;
            }
        }else 
        {
            player.setVelocityY(0);
            if(neustatey != 0)
            {
                neustatey = 0;
            }
        }
        neustate = neustatex + neustatey;
        if(neustate > 0)
        {
            if(refreshscale < 1)
                refreshscale += refreshV;
        }
        else 
        {
            if(refreshscale > 0.01)
                refreshscale -= 0.01;
        }
        
        if(neustate != neutmp)
        {
            neuflag = true;
        }
        neutmp = neustate;

        if(pointer.isDown){
            //console.log("goose x " + goose.x + ", y " + goose.y);
            //console.log("player x " + goose.x + ", y " + goose.y);
            //console.log(goose.x - player.x);
            //console.log(goose.y - player.y);
            if(!getGoose){
                if(goose.x > player.x - 37 && goose.x < player.x + 37 && goose.y > player.y - 37 && goose.y < player.y + 37){
                    getGoose = true;
                    goose.destroy();
                    
                }
            }
            if(!getCoin){
                if(coin.x > player.x - 37 && coin.x < player.x + 37 && coin.y > player.y - 37 && coin.y < player.y + 37){
                    getCoin = true;
                    coin.destroy();
                }
            }
            if(!getHarp){
                if(harp.x > player.x - 40 && harp.x < player.x + 40 && harp.y > player.y - 40 && harp.y < player.y + 40){
                    getHarp = true;
                    harp.destroy();

                    playHarp = setTimeout(() => {harpSound.play()}, 2000);
                    giantAwake = setTimeout(() => {
                        //console.log('giant' + giant)

                        snore.stop()

                        giantSleep
                        .setAlpha(0)

                        giant
                        .setAlpha(1)
                        .setDepth(6)
                        //.setAngularVelocity(100)

                        giantIsAwake = true

                    }, 5000);
                }
            }
        }

        if(giantIsAwake){
            refreshscale = 0
            if(player.x > giant.x - 80 && player.x < giant.x + 80 && player.y > giant.y - 80 && player.y < giant.y + 80 && catchFlag == false) {
                catchFlag = true;
                refreshscale += 20;
            }

            if(player.x > 1740 && player.x <= 2700 && player.y > 400 && player.y < 1260){
                playerSite = 0;
            }
            else if(player.x > 0 && player.x <= 1740 && player.y > 400 && player.y < 1260){
                playerSite = 1;
            }
            if(giant.x > 1740 && giant.x <= 2700 && giant.y > 400 && giant.y < 1260){
                giantSite = 0;
            }
            else if(giant.x > 0 && giant.x <= 1740 && giant.y > 400 && giant.y < 1260){
                giantSite = 1;
            }
            if(tmpSite != playerSite){
                siteFlag = true
            }
            tmpSite = playerSite;
            if(playerSite == 0 && giantSite == 1 && siteFlag == true|| playerSite == 1 && giantSite == 0 && siteFlag == true){
                if((1747 - giant.x) > 0){
                    giant.x+=3;
                }
                else if((1747 - giant.x) < 0){
                    giant.x-=3;
                }
                if((1012 - giant.y) > 0){
                    giant.y+=3;
                }
                else if((1012 - giant.y) < 0){
                    giant.y-=3;
                }
                if(giant.x - 1747 < 5 && giant.x - 1747 > -5 && giant.y - 1012 < 5 && giant.y - 1012 > -5){
                    siteFlag = false;
                } 
            }
            else{                
                if((player.x - giant.x) > 0){
                    giant.x+=3;
                }
                else if((player.x - giant.x) < 0){
                    giant.x-=3;
                }
                if((player.y - giant.y) > 0){
                    giant.y+=3;
                }
                else if((player.y - giant.y) < 0){
                    giant.y-=3;
                }
            }
            //1747 1012
            //console.log('x')
            //console.log(giant.x)
            //console.log('y')
            //console.log(giant.y)
        }
        if(player.y <= 397){
            footstep.volume = 0;
            snore.volume = 0;
            this.scene.pause('neuroticism')
            this.scene.pause('neuroticismUI')
            game.scene.start('neuroticismEndUI')
            //console.log('start')
        }
    }
}

//create field of view
function createFOV(scene){
    maskGraphics = scene.add.graphics({ fillStyle: { color: 0xffffff, alpha: 0 }});
    mask = new Phaser.Display.Masks.GeometryMask(scene, maskGraphics);
    mask.setInvertAlpha();
    fow = scene.add.graphics({ fillStyle: { color: 0x000000, alpha: 0.6 } }).setDepth(29);
    fow.setMask(mask);
    fow.fillRect(0, 0, 3072, 5000);
}

function draw() {
    //add ray origin to intersections to create full polygon
    intersections.push(ray.origin);
    graphics.clear();
    graphics.fillStyle(0xffffff, 0.3);
    graphics.fillPoints(intersections);
    for(let intersection of intersections) {
        graphics.strokeLineShape({
            x1: ray.origin.x,
            y1: ray.origin.y,
            x2: intersection.x,
            y2: intersection.y
        });
    }
    //graphics.fillStyle(0xff00ff);
    //graphics.fillPoint(ray.origin.x, ray.origin.y, 3);
}

function giantStuckEvent(){
    if(giantIsAwake){
        if(giantPostX == giant.x && giantPostY == giant.y){}
        else{
            giantPostX = giant.x
            giantPostY = giant.y
        }
    }
}

var neuroticismUI = {
    key: 'neuroticismUI',

    create: function(){
        neuUI = this.add.image(50,735,'neuUI')
        .setOrigin(0,0.5)
        .setDepth(99);
        passion = this.add.image(51,735,'passion')
        .setOrigin(0,0.5)
        .setScale(refreshscale,1)
        .setDepth(99);
        
        //文字提示
        gooseText = this.add.text(100, 100, '\n  你拿到了下金蛋的鵝', {
            fontSize: '32px',
            color: '#FFF'
        })
        .setAlpha(0)
        
        coinText = this.add.text(100, 100, '\n  你拿到了金幣', {
            fontSize: '32px',
            color: '#FFF'
        })
        .setAlpha(0)

        harpText = this.add.text(100, 100, '\n  你拿到了豎琴，\n你忍不住彈了一下', {
            fontSize: '32px',
            color: '#FFF'
        })
        .setAlpha(0)
        
        deadText = this.add.text(370, 350, 'You are dead', {
            fontSize: '32px',
            color: '#FF0000'
        })
        .setStroke('#000000', 4)
        .setAlpha(0)

        
        var Buttonflag = false;
        
        //back鈕
        backButton = this.add.sprite(250, 650, 'backout')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerover', function (event) {
            backin.alpha = 0.8
            backButton.alpha = 0
        })
        var backin = this.add.sprite(250, 650, 'backin')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerdown', function (event) {
            Buttonflag = false
            build.alpha = 1;
            backin.alpha = 0;
            backButton.alpha = 0.8;
            createShoppage(0);
            neuTimeLock = false;
        })
        .on('pointerout', function (event) {
            if(Buttonflag == true){
                backin.alpha = 0;
                backButton.alpha = 0.8;
            }
        });
        
        //遊戲介紹
        neuFrame = this.add.rectangle(game.config.width*0.5, game.config.height*0.5, game.config.width-100, game.config.height-100, 0xFFC78E)
        .setStrokeStyle(5, 0x000000)
        .setOrigin(0.5,0.5)
        .setAlpha(1) //透明度
        neuIntroduce0 = this.add.image(game.config.width*0.52, game.config.height*0.45,'neuIntroduce0')
        .setScale(0.24)
        .setAlpha(0)
        neuIntroduce1 = this.add.image(game.config.width*0.52, game.config.height*0.45,'neuIntroduce1')
        .setScale(0.24)
        .setAlpha(0)
        neuIntroduce2 = this.add.image(game.config.width*0.5, game.config.height*0.45,'neuIntroduce2')
        .setScale(0.24)
        .setAlpha(0)
        neuIntroduce3 = this.add.image(game.config.width*0.5, game.config.height*0.45,'neuIntroduce3')
        .setScale(0.24)
        .setAlpha(0)
        neuIntroducea = this.add.image(game.config.width*0.5, game.config.height*0.45,'neuIntroducea')
        .setScale(0.24)
        .setAlpha(0)
        neuIntroduceb = this.add.image(game.config.width*0.5, game.config.height*0.45,'neuIntroduceb')
        .setScale(0.24)
        .setAlpha(0)
        //右按鈕
        rightOut = this.add.sprite(game.config.width*0.85, game.config.height*0.87,'rightout')
        .setScale(0.25)
        .setInteractive()
        .on('pointerover', function (event) {
            rightIn.alpha = 1
            rightOut.alpha = 0
        })
        rightIn = this.add.sprite(game.config.width*0.85, game.config.height*0.87,'rightin')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerdown', function (event) {
            neuIntroduceCount++;
        })
        .on('pointerout', function (event) {
            rightIn.alpha = 0;
            rightOut.alpha = 1;
        })
        //左按鈕
        leftOut = this.add.sprite(game.config.width*0.15, game.config.height*0.87,'leftout')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerover', function (event) {
            leftIn.alpha = 1
            leftOut.alpha = 0
        })
        leftIn = this.add.sprite(game.config.width*0.15, game.config.height*0.87,'leftin')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerdown', function (event) {
            neuIntroduceCount--;
        })
        .on('pointerout', function (event) {
            leftIn.alpha = 0;
            leftOut.alpha = 1;
        })
        //close按鈕
        closeOut = this.add.sprite(game.config.width*0.85, game.config.height*0.87,'closeout')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerover', function (event) {
            closeIn.alpha = 1;
            closeOut.alpha = 0;
        })
        closeIn = this.add.sprite(game.config.width*0.85, game.config.height*0.87,'closein')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerdown', function (event) {
            neuIntroduceCount++;
        })
        .on('pointerout', function (event) {
            closeIn.alpha = 0;
            closeOut.alpha = 1;
        })

        //初始化變數
        neuMoveAllow = false;
        neuTimeLock = false;
        neuTimeFlag = false;
        neuIntroduceCount = 0;
        neuIntroduceGooseCount = 0;
        neuCloseToRightFlag = true;
        textFlag = false
    },

    update: function(){
        passion.setScale(refreshscale,1);

        if(getGoose && !textFlag){

            //遊戲介紹前後頁控制
            if(neuIntroduceCount == 4){
                neuMoveAllow = false;
                neuIntroducea.alpha = 1;
                neuFrame.alpha = 1;
                leftIn.alpha = 0;
                leftOut.alpha = 0;
                rightIn.alpha = 0;
                rightOut.alpha = 0;
                closeIn.alpha = 0;
                closeOut.alpha = 0;
                console.log('4' + neuIntroduceCount);
                setTimeout(() => {
                    neuIntroduceCount=5;
                }, 3000)
                //console.log(neuIntroduceCount);
            }
            else if(neuIntroduceCount == 5){
                console.log('5' + neuIntroduceCount);
                neuIntroducea.alpha = 0;
                rightIn.alpha = 0;
                rightOut.alpha = 0;
                leftIn.alpha = 0;
                leftOut.alpha = 0;
                neuFrame.alpha = 0;
                neuMoveAllow = true;
                neuTimeFlag = false;

                barrier1.destroy();
                gooseText
                .setDepth(99)
                .setAlpha(1)
                setTimeout(() => {
                    gooseText
                    .setDepth(0)
                    .setAlpha(0)
                }, 5000)
                textFlag = true
                setTimeout(() => {
                    neuIntroduceCount=6;
                    console.log('+6' + neuIntroduceCount);
                    textFlag = false
                }, 5000)
                 //跳出此if
            }
            else{
                closeIn.alpha = 0;
                closeOut.alpha = 0;
            }

            //gooseText
            //.setDepth(100)
            //.setAlpha(1)
            //setTimeout(() => {
            //    gooseText
            //    .setDepth(0)
            //    .setAlpha(0)
            //}, 5000)
        }//console.log('out');
        if(getCoin && !textFlag){
            //console.log(neuIntroduceCount);
            //遊戲介紹前後頁控制
            if(neuIntroduceCount == 6){
                neuMoveAllow = false;
                neuIntroduceb.alpha = 1;
                neuFrame.alpha = 1;
                leftIn.alpha = 0;
                leftOut.alpha = 0;
                rightIn.alpha = 0;
                rightOut.alpha = 0;
                closeIn.alpha = 0;
                closeOut.alpha = 0;
                console.log('6' + neuIntroduceCount);
                setTimeout(() => {
                    neuIntroduceCount=7;
                }, 2000)
            }
            else if(neuIntroduceCount == 7){
                console.log('7' + neuIntroduceCount);
                neuIntroduceb.alpha = 0;
                rightIn.alpha = 0;
                rightOut.alpha = 0;
                leftIn.alpha = 0;
                leftOut.alpha = 0;
                neuFrame.alpha = 0;
                neuMoveAllow = true;
                neuTimeFlag = false;
                
                barrier2.destroy();
                coinText
                .setDepth(99)
                .setAlpha(1)
                setTimeout(() => {
                    coinText
                    .setDepth(0)
                    .setAlpha(0)
                }, 5000)
                textFlag = true
                setTimeout(() => {
                    neuIntroduceCount++;
                    textFlag = false
                }, 5000)
                 //跳出此if
            }
            else{
                closeIn.alpha = 0;
                closeOut.alpha = 0;
            }
        }
        if(getHarp && !textFlag){
            textFlag = true
            barrier3.destroy();
            barrier4.x = 2496;
            barrier4.alpha = 1;
            harpText
            .setDepth(99)
            .setAlpha(1)
            setTimeout(() => {
                harpText
                .setDepth(0)
                .setAlpha(0)
                console.log('text');
            }, 5000)
        }
        
        if( refreshscale >= 1 )
        {
            refreshscale = 0.01;
            deathimage.setAlpha(1);
            neuUI.setAlpha(0);
            passion.setAlpha(0);
            snore.volume = 0;
            footstep.volume = 0;
            deadText
            .setDepth(100)
            .setAlpha(1)
            game.scene.pause('neuroticism')
            setTimeout(() => {
                //console.log('text');
                deadText
                .setDepth(0)
                .setAlpha(0)

                deathimage
                .setAlpha(0)

                clearTimeout(playHarp)
                clearTimeout(giantAwake)
                
                game.scene.stop('neuroticism')
                game.scene.stop('neuroticismUI')
                game.scene.start('neuroticism')
            }, 4000)
        }
        
        //遊戲介紹前後頁控制
        if(neuIntroduceCount == 0){
            neuIntroduce0.alpha = 1;
            neuIntroduce1.alpha = 0;
            leftIn.alpha = 0;
            leftOut.alpha = 0;
            closeIn.alpha = 0;
            closeOut.alpha = 0;
            if(neuCloseToRightFlag == false){
                neuCloseToRightFlag = true;
            }
        }
        else if(neuIntroduceCount == 1){
            neuIntroduce0.alpha = 0;
            neuIntroduce1.alpha = 1;
            neuIntroduce2.alpha = 0;
            closeIn.alpha = 0;
            closeOut.alpha = 0;
            if(neuCloseToRightFlag == true){
                leftOut.alpha = 1;
                rightOut.alpha = 1;
                neuCloseToRightFlag = false;
            }
        }
        else if(neuIntroduceCount == 2){
            neuIntroduce1.alpha = 0;
            neuIntroduce2.alpha = 1;
            rightIn.alpha = 0;
            rightOut.alpha = 0;
            if(neuCloseToRightFlag == false){
                closeIn.alpha = 1;
                neuCloseToRightFlag = true;
            }
        }
        else if(neuIntroduceCount == 3){
            neuIntroduce2.alpha = 0;
            closeIn.alpha = 0;
            closeOut.alpha = 0;
            leftIn.alpha = 0;
            leftOut.alpha = 0;
            neuFrame.alpha = 0;
            neuMoveAllow = true;
            neuTimeFlag = false;
            neuIntroduceCount++; //跳出此if
        }
        else{
            closeIn.alpha = 0;
            closeOut.alpha = 0;
        }
        
    }
}

function refresh(){
    //打呼計時器
    refreshx++;
    if(refreshx == 60)
    {
        refreshx = 0;
        refreshtimer++;
        //console.log(refreshtimer);
    }

    if(refreshtimer > refreshtime)
    {
        //console.log('Refresh!');
        refreshtimer = 0;
        refreshtime = Phaser.Math.FloatBetween(1,7);
        refreshV = Phaser.Math.FloatBetween(0.01,0.022);
        snore.volume = 1 - (refreshV * 30);
        refreshV = refreshV * 0.5;
        //console.log('refreshtime: ' + refreshtime);
        //console.log('refreshV: ' + refreshV);
        //console.log('snore volume: ' + snore.volume);
    }
}

var neuExpGoEnd2 = false;
var neuExpTimeLock;
var neuFrame;
var neuMoveAllow;

var neuroticismEndUI = {
    key: 'neuroticismEndUI',


    create: function(){
        var Buttonflag = false;
        
        //back鈕
        backButton = this.add.sprite(250, 650, 'backout')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerover', function (event) {
            backin.alpha = 0.8
            backButton.alpha = 0
        })
        var backin = this.add.sprite(250, 650, 'backin')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerdown', function (event) {
            Buttonflag = false
            build.alpha = 1;
            backin.alpha = 0;
            backButton.alpha = 0.8;
            createShoppage(0);
            neuExpTimeLock = false;
        })
        .on('pointerout', function (event) {
            if(Buttonflag == true){
                backin.alpha = 0;
                backButton.alpha = 0.8;
            }
        });
        
        //遊戲介紹
        neuFrame = this.add.rectangle(game.config.width*0.5, game.config.height*0.5, game.config.width-100, game.config.height-100, 0xFFC78E)
        .setStrokeStyle(5, 0x000000)
        .setOrigin(0.5,0.5)
        .setAlpha(1) //透明度
        neuIntroduce3 = this.add.image(game.config.width*0.5, game.config.height*0.45,'neuIntroduce3')
        .setScale(0.24)
        .setAlpha(0)
        neuIntroduce4 = this.add.image(game.config.width*0.5, game.config.height*0.45,'neuIntroduce4')
        .setScale(0.24)
        .setAlpha(0)
        neuIntroduce5 = this.add.image(game.config.width*0.5, game.config.height*0.45,'neuIntroduce5')
        .setScale(0.24)
        .setAlpha(0)
        //右按鈕
        rightOut = this.add.sprite(game.config.width*0.85, game.config.height*0.87,'rightout')
        .setScale(0.25)
        .setInteractive()
        .on('pointerover', function (event) {
            rightIn.alpha = 1
            rightOut.alpha = 0
        })
        rightIn = this.add.sprite(game.config.width*0.85, game.config.height*0.87,'rightin')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerdown', function (event) {
            neuIntroduceCount++;
        })
        .on('pointerout', function (event) {
            rightIn.alpha = 0;
            rightOut.alpha = 1;
        })
        //左按鈕
        leftOut = this.add.sprite(game.config.width*0.15, game.config.height*0.87,'leftout')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerover', function (event) {
            leftIn.alpha = 1
            leftOut.alpha = 0
        })
        leftIn = this.add.sprite(game.config.width*0.15, game.config.height*0.87,'leftin')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerdown', function (event) {
            neuIntroduceCount--;
        })
        .on('pointerout', function (event) {
            leftIn.alpha = 0;
            leftOut.alpha = 1;
        })
        //close按鈕
        closeOut = this.add.sprite(game.config.width*0.85, game.config.height*0.87,'closeout')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerover', function (event) {
            closeIn.alpha = 1;
            closeOut.alpha = 0;
        })
        closeIn = this.add.sprite(game.config.width*0.85, game.config.height*0.87,'closein')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerdown', function (event) {
            neuIntroduceCount++;
        })
        .on('pointerout', function (event) {
            closeIn.alpha = 0;
            closeOut.alpha = 1;
        })
        //Menu按鈕
        menuOut = this.add.sprite(game.config.width*0.85, game.config.height*0.87, 'menuout')
        .setScale(0.25)
        .setInteractive()
        .setAlpha(0)
        .on('pointerover', function (event) {
            menuIn.alpha = 1;
            menuOut.alpha = 0;
        })
        menuIn = this.add.sprite(game.config.width*0.85, game.config.height*0.87, 'menuin')
        .setScale(0.25)
        .setAlpha(0)
        .setInteractive()
        .on('pointerout', function (event) {
            menuIn.alpha = 0;
            menuOut.alpha = 1;
        })
        .on('pointerdown', function (event) {
            neuIntroduceCount++;
        });

        //初始化變數
        neuMoveAllow = false;
        neuExpTimeLock = false;
        neuTimeFlag = false;
        neuIntroduceCount = 0;
        neuExpGoEnd2 = false;
        neuCloseToRightFlag = true;
    },

    update: function(){
        //console.log('endui\n')
        //遊戲介紹前後頁控制
        if(neuIntroduceCount == 0){
            neuIntroduce3.alpha = 1;
            neuIntroduce4.alpha = 0;
            leftIn.alpha = 0;
            leftOut.alpha = 0;
            menuIn.alpha = 0;
            menuOut.alpha = 0;
            //console.log('flag' + neuCloseToRightFlag);
            if(neuCloseToRightFlag == false){
                rightOut.alpha = 1;
                neuCloseToRightFlag = true;
            }
        }
        else if(neuIntroduceCount == 1){
            neuIntroduce3.alpha = 0;
            neuIntroduce4.alpha = 1;
            //closeOut.alpha = 1;
            menuIn.alpha = 0;
            menuOut.alpha = 0;
            //console.log('flag:' + neuCloseToRightFlag);
            if(neuCloseToRightFlag == true){
                leftOut.alpha = 1;
                rightOut.alpha = 1;
                //console.log('closeOut' + closeOut.alpha);
                neuCloseToRightFlag = false;
            }
        }
        else if(neuIntroduceCount == 2){
            neuIntroduce4.alpha = 0;
            neuIntroduce5.alpha = 1;
            rightIn.alpha = 0;
            rightOut.alpha = 0;
            //console.log('flag' + neuCloseToRightFlag);
            if(neuCloseToRightFlag == false){
                menuOut.alpha = 1;
                neuCloseToRightFlag = true;
            }
        }
        else if(neuIntroduceCount == 3){
            neuIntroduce5.alpha = 0;
            leftIn.alpha = 0;
            leftOut.alpha = 0;
            neuFrame.alpha = 0;
            neuMoveAllow = true;
            neuTimeFlag = false;
            neuIntroduceCount++; //跳出此if
            game.scene.stop('neuroticismUI')
            game.scene.stop('neuroticism')
            game.scene.stop('neuroticismEndUI')
            game.scene.start('main')

        }
        else{
            menuIn.alpha = 0;
            menuOut.alpha = 0;
        }
    }
}

//遊戲參數
var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    backgroundColor: '#314157',
    parent: 'start',
    scene: [load,start,main,experience1,experience2,experience3,experienceUI,experienceEndUI,conscientiousness,conscientiousnessUI,conscientiousnessEnd,conscientiousnessEndUI
        ,neuroticism,neuroticismUI,neuroticismEndUI],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false,
            //debug: true
        },
        matter: {
            gravity: false,
            //debug: true
        },
    },
    plugins: {
        scene: [
            {
                key: 'PhaserRaycaster',
                plugin: PhaserRaycaster,
                mapping: 'raycasterPlugin'
            },
            {
                plugin: PhaserMatterCollisionPlugin.default, // The plugin class
                key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
                mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision
            }
        ]
    },
    audio: {
        disableWebAudio: true
    }
};

//建立遊戲
var game = new Phaser.Game(config);

/*
var ex = {
    key: '',

    preload: function(){

    },

    create: function(){

    },

    update: function(){
        
    },
}
*/