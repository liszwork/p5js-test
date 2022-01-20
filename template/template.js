const COLOR_BG = '#000';
const COLOR_OBJ = '#AAA';

let dots = [];
const params = {
    mode: 0,
};

function setup() {
    //キャンバスを作成
    createCanvas(400, 600);
    //背景色
    background(COLOR_BG);
    // tweakpane
    setup_tweakpane();
}

function setup_tweakpane() {
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

