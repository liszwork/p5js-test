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
    // dots
    for ( let i = 0; i < MAX_DOTS; i++ ) {
        dots.push(generate());
    }
}

function draw() {
    background(COLOR_BG);
    fill(params.color);
    stroke(params.color);
    // 図形描画
    const del_idxs = [];
    for (let curr_i = 0; curr_i < dots.length; curr_i++) {
        const curr_dot = dots[curr_i];
        curr_dot.draw(params.color);
        for (let chk_i = curr_i + 1; chk_i < dots.length; chk_i++) {
            const chk_dot = dots[chk_i];
            if (curr_dot.is_near(chk_dot.x, chk_dot.y)) {
                line(curr_dot.x, curr_dot.y, chk_dot.x, chk_dot.y);
            }
        }
        curr_dot.move();
        if (curr_dot.is_got_out_screen()) {
            del_idxs.push(curr_i);
        }
    }
    //console.log('delidx ' + del_idxs);
    for (let i = 0; i < del_idxs.length; i++) {
        const index = del_idxs[del_idxs.length - 1 - i];
        dots.splice(index, 1);
    }
    for (let i = 0; i < del_idxs.length; i++) {
        dots.push(generate());
    }
    
    log_display();
}

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function generate() {
    const x = randomInt(0, width);
    const y = randomInt(0, height);
    return new Circle(x, y, DOT_SIZE, '#AAB');
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
