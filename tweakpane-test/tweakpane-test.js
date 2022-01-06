const COLOR_BG = '#000';
const COLOR_OBJ = '#AAA';

const PARAMS = {
    w: 300,
    h: 300,
};

function setup() {
    //キャンバスを作成
    createCanvas(400, 600);
    //背景色
    background(COLOR_BG);
    // tweakpaneパネル初期化とパラメータのセット
    const pane = new Tweakpane.Pane();
    pane.addInput(PARAMS, 'w', {
        min: 50,
        max: width - 10,
    });
    pane.addInput(PARAMS, 'h', {
        min: 50,
        max: height - 10,
    });
}

function draw() {
    background(COLOR_BG);
    fill(COLOR_OBJ);
    rect(10, 10, PARAMS.w, PARAMS.h);
}

