const FRAME_RATE = 12;
const COLOR_BG = '#000';
const COLOR_OBJ = '#AAA';
const MAX_DOTS = 50;
const DOT_SIZE = 5;
const NEAR_RANGE = 30;

const balls = [];
const params = {
    mode: 1,
};
let pre_mode = -2;

let position;
let velocity;

function setup() {
    //キャンバスを作成
    createCanvas(400, 600);
    // 書き換え頻度
    frameRate(FRAME_RATE);
    //背景色
    background(COLOR_BG);
    // tweakpane
    setup_teakpane();
    // setup variable
    position = new createVector(random(width), random(height));
    velocity = new createVector(random(-10, 10), random(-10, 10));
}

function setup_teakpane() {
    const pane = new Tweakpane.Pane();
    pane.addInput(params, 'mode', {
        options: {
            none: -1,
            infinity_draw_ball: 0,
            move_ball: 1,
        }
    });
}

function draw() {
    //background(COLOR_BG);
    switch (params.mode) {
        case 0:
            mode_infinity_draw_ball();
            break;
        case 1:
            if ( pre_mode != params.mode ) {
                for ( let i = 0; i < MAX_DOTS; i++ ) {
                    const ball = {
                        'color': create_random_color_hex(),
                        'position': new createVector(random(width), random(height)),
                        'velocity': new createVector(random(-10, 10), random(-10, 10)),
                    };
                    balls.push(ball);
                }
            }
            mode_move_ball();
            break;
        default:
            background(COLOR_BG);
            if ( pre_mode != params.mode) {
                mode_reset();
            }
            break;
    }
    //log_display();
}

function mode_reset() {
    pre_mode = params.mode;
    balls.splice(0); // =clear
}

function mode_infinity_draw_ball() {
    // 無限に増殖する円
    noStroke();
    const size = random(5, 100);
    // single
    //fill(random(255), random(255), random(255));
    ellipse(random(width), random(height), size, size);
}

function mode_move_ball() {
    // 移動する円
    background(COLOR_BG);
    noStroke();
    const size = 20;

    balls.forEach(ball => {
        fill(ball.color);
        ball.position.add(ball.velocity);
        ellipse(ball.position.x, ball.position.y, size, size);
        // 画面外判定
        if ( ball.position.x < 0 || width < ball.position.x ) {
            ball.velocity.x = ball.velocity.x * -1; // X方向のスピードを反転
        }
        if ( ball.position.y < 0 || height < ball.position.y ) {
            ball.velocity.y = ball.velocity.y * -1; // Y方向のスピードを反転
        }
    });
}

function create_random_color_hex() {
    let h = '#';
    for ( let i = 0; i < 3; i++ ) {
        const c = round(random(255), 0);
        h += c.toString(16);
    }
    return h;
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

