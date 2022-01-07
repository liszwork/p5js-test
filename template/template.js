const COLOR_BG = '#000';
const COLOR_OBJ = '#AAA';
const MAX_DOTS = 200;
const DOT_SIZE = 5;
const NEAR_RANGE = 30;

let dots = [];
const params = {
    color: '#2d25ac'
};

function setup() {
    //キャンバスを作成
    createCanvas(400, 600);
    //背景色
    background(COLOR_BG);
    // tweakpane
    const pane = new Tweakpane.Pane();
    pane.addInput(params, 'color');
}

function draw() {
    background(COLOR_BG);
    fill(params.color);
    stroke(params.color);
    // 図形描画

    log_display();
}

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function log_display() {
    const h = 13;
    const offset = 5;
    let x = offset;
    let y = h + offset;
    const msgs = [
        `frameCount: \${frameCount}`,
        `dot sz: \${dot.size}`
    ]
    fill('rgba(0, 0, 150, 0.25)');
    rect(0, 0, 150, 20 * msgs.length);
    fill('#AAB');
    msgs.forEach(msg => {
        text(msg, x, y);
        y += h;
    });
}

