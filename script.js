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
    log(prefix = '') {
        console.log(`${prefix} x, y, size = ${this.x}, ${this.y}, ${this.size}, ${this.color}`);
    }
}

const COLOR_BG = '#000';
const MAX_DOTS = 50;
const DOT_SIZE = 5;

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
    fill('#0A0');
    // 図形描画
    dots.forEach(dot => {
        dot.draw();
    });
}

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

