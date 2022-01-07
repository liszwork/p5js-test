const COLOR_BG = '#000';
const COLOR_OBJ = '#AAA';
const MAX_DOTS = 200;
const DOT_SIZE = 5;
const NEAR_RANGE = 30;

let dots = [];
const params = {
    show_item_id: 2,
    rotate: true,
    rotateX: 0.01,
    rotateY: 0.01,
};

function setup() {
    //キャンバスを作成(WEBGL入れないと出力されない)
    createCanvas(400, 600, WEBGL);
    //背景色
    background(COLOR_BG);
    // tweakpane
    const pane = new Tweakpane.Pane();
    pane.addInput(params, 'show_item_id', { min: 1, max: 7, step: 1 });
    pane.addInput(params, 'rotate');
    pane.addInput(params, 'rotateX', { min: 0.00, max: 0.01 });
    pane.addInput(params, 'rotateY', { min: 0.00, max: 0.01 });
}

function draw() {
    background(COLOR_BG);
    // 図形描画
    if ( params.rotate ) {
        rotateX(frameCount * params.rotateX);
        rotateY(frameCount * params.rotateY);
    }

    switch (params.show_item_id) {
        case 1:
            plane(50, 50);
            break;
        case 2:
            box(50, 50, 50);
            break;
        case 3:
            sphere(40);
            break;
        case 4:
            cylinder(50, 50);
            break;
        case 5:
            cone(50, 50);
            break;
        case 6:
            ellipsoid(50, 50, 50);
            break;
        case 7:
            torus(50, 50);
            break;
        default:
            break;
    }
    // textも3Dオブジェクトとして入っていまう模様
    //log_display();
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

