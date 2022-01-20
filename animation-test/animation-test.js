const COLOR_BG = '#000';
const COLOR_OBJ = '#AAA';
const MAX_DOTS = 200;
const DOT_SIZE = 5;
const NEAR_RANGE = 30;

const dots = [];
const params = {
    mode: 0,
};

let functions = []
function setup() {
    //キャンバスを作成
    createCanvas(400, 600);
    //背景色
    background(COLOR_BG);
    // tweakpane
    setup_twakpane();

    frameRate(60)
    // register Objects
    const pos = new createVector(4, 0);
    const vel = new createVector(4, 0);
    dots.push(new Circle(pos, vel, 10, '#55C'));

    // register functions
    functions.push(test_moving_dot);
    functions.push(test_translate);
}

function setup_twakpane() {
    const pane = new Tweakpane.Pane();
    pane.addInput(params, 'mode', { min: 0, max: 10, step: 1});
}

function draw() {
    background(COLOR_BG);
    noStroke();
    // 図形描画
//    switch (params.mode) {
//        case 0:
//            test_moving_dot();
//            break;
//
//    }
//    test_translate();
    if (params.mode < functions.length) {
        functions[params.mode]();
    }

    log_display();
}

function test_moving_dot() {
    const dot = dots[0];
    translate(width/2, height/2);
    dot.move();
    function sin_y() {
        dot.position.y = sin(frameCount / 20.0) * height/4.0;
    }
    sin_y();
    function sin_x() {
        dot.position.x = sin(frameCount / 20.0) * height/4.0;
    }
    sin_x();
    dot.draw();
    if (dot.position.x > width/2) {
        dot.position.x = -width/2;
    }

    const cx = 0;
    const cy = 0;
    const r = 1;
    const angle = 45;
    const x = cx + (r * cos(radians(angle)));
    const y = cy + (r * sin(radians(angle)));
    fill(255);
    ellipse(x, y, 5);
    const msg = `(${round(x, 3)}, ${round(y, 3)})`;
    text(msg, x + 5, y -5)
}

function test_translate() {
    fill('#ff0000')
    translate(0,0)
    rect(10, 10, 30, 30);
    fill('#008000')
    translate(300,0)
    rect(10, 10, 30, 30);
    fill('#0055ff')
    translate(-50,0)
    rect(10, 10, 30, 30);
}

function log_display() {
    const h = 13;
    const offset = 5;
    let x = offset;
    let y = h + offset;
    const msgs = [
        `frameCount: ${frameCount}`,
        `dot x, y: ${dots[0].position.x}, ${dots[0].position.y}`
    ]
    translate(0,0);
    fill('rgba(0, 0, 150, 0.25)');
    rect(0, 0, 150, 20 * msgs.length);
    fill('#AAB');
    msgs.forEach(msg => {
        text(msg, x, y);
        y += h;
    });
}

