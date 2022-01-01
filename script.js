class Circle {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }
    draw(color = '', is_update_color = false) {
        if (color.length) {
            console.log(`c ${color}`)
            fill(color);
            if (is_update_color) {
                this.color = color;
            }
        }
        else if (this.color.length) {
            console.log(`c ${this.color}`)
            fill(this.color);
        }
        ellipse(this.x, this.y, this.size);
        this.log();
    }
    is_near(x, y) {
        if (abs(this.x - x) >= NEAR_RANGE) {
            return false;
        }
        if (abs(this.y - y) >= NEAR_RANGE) {
            return false;
        }
        return true;
    }
    log(prefix = '') {
        console.log(`${prefix} x, y, size = ${this.x}, ${this.y}, ${this.size}, ${this.color}`);
    }
}

const COLOR_BG = '#000';
const COLOR_OBJ = '#AAA';
const MAX_DOTS = 350;
const DOT_SIZE = 5;
const NEAR_RANGE = 30;

let dots = [];

function setup() {
    //キャンバスを作成
    createCanvas(400, 600);
    //背景色
    background(COLOR_BG);

    for ( let i = 0; i < MAX_DOTS; i++ ) {
        const x = randomInt(0, width);
        const y = randomInt(0, height);
        dots.push(new Circle(x, y, DOT_SIZE, '#AAB'));
    }
}

function draw() {
    background(COLOR_BG);
    fill(COLOR_OBJ);
    stroke(COLOR_OBJ);
    // 図形描画
    for (var curr_i = 0; curr_i < MAX_DOTS; curr_i++) {
        const curr_dot = dots[curr_i];
        curr_dot.draw();
        for (var chk_i = curr_i + 1; chk_i < MAX_DOTS; chk_i++) {
            const chk_dot = dots[chk_i];
            if (curr_dot.is_near(chk_dot.x, chk_dot.y)) {
                line(curr_dot.x, curr_dot.y, chk_dot.x, chk_dot.y);
            }
        }
    }
}

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

