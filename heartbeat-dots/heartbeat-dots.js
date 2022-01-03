const COLOR_BG = '#000';
const COLOR_OBJ = '#AAA';
const MAX_DOTS = 200;
const DOT_SIZE = 5;
const NEAR_RANGE = 30;

let dots = [];

function setup() {
    //キャンバスを作成
    createCanvas(400, 600);
    //背景色
    background(COLOR_BG);
}

functio draw() { 
    background(COLOR_BG);
    fill(COLOR_OBJ);
    stroke(COLOR_OBJ);
    // 図形描画
    
    log_display();
}

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function log_display() {
    const h = 10;
    let x = 0;
    let y = h;
    const msgs = [
        `frameCount: ${frameCount}`,
        `dot num: ${dots.length}`,
    ]
    fill('rgba(0, 0, 150, 0.25)');
    rect(0, 0, 100, 25);
    fill('#AAB');
    msgs.forEach(msg => {
        text(msg, x, y);
        y += h;
    });
}
