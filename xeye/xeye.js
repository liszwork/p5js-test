const debug = true;
const bg = 255;

const rb = 200;
const ra = rb * 0.5;
const pupil_r = 26;

let m;
const eyes = [];

function setup() {
    createCanvas(600, 600);
    background(200);

    strokeWeight(20);

    m = createVector(ra * 1.1, rb * 1.3);

    const w4 = width / 4;
    const h4 = height / 2;
    eyes.push(new Eye(createVector(w4, h4), ra, rb, pupil_r));
    eyes.push(new Eye(createVector(w4 * 3, h4), ra, rb, pupil_r));
}

function draw() {
    background(200);

    // mouse
    m.x = mouseX;
    m.y = mouseY;

    // 目の描画
    for (const eye of eyes) {
        eye.draw();
    }
}

class Eye {
    constructor(centerVector, ra, rb, er) {
        // ra: 楕円長辺半径, rb: 楕円短辺半径, er: 瞳の半径
        this.c = centerVector;
        this.d = createVector(m.x - this.c.x, m.y - this.c.y);
        this.ra = ra;
        this.rb = rb;
        this.er = er;
    }
    draw() {
        this.d.x = m.x - this.c.x;
        this.d.y = m.y - this.c.y;
        this.draw_white_eye();
        this.draw_pupil();
    }
    draw_white_eye() {
        const w = this.ra * 2;
        const h = this.rb * 2
        _ellipse(this.c.x, this.c.y, w, h, bg, '#000');
    }
    draw_pupil() {
        // 瞳の計算
        // 瞳の位置計算(楕円円周上)
        const theta = atan2(abs(this.d.y), abs(this.d.x));
        // 中点(0, 0)での座標計算
        let x = this.ra * cos(atan(this.ra / this.rb * tan(theta)));
        let y = this.rb * sin(atan(this.ra / this.rb * tan(theta)));
        // 瞳の半径分減算
        x -= this.er;
        y -= this.er;
        // 中点Cに合わせて正負を修正
        if (this.d.x < 0) {
            x *= -1;
        }
        if (this.d.y < 0) {
            y *= -1;
        }
        // 中点Cに合わるため中点値を加算
        x += this.c.x;
        y += this.c.y;
        // 瞳の描画
        _circle(x, y, this.er * 2, '#000', '')
    }
}

function conf_fill(fill_color, stroke_color) {
    if (fill_color.length == 0) {
        noFill();
    }
    else {
        fill(fill_color);
    }
    if (stroke_color.length == 0) {
        noStroke();
    } else {
        stroke(stroke_color);
    }
}

function _circle(x, y, size, fill_color, stroke_color) {
    conf_fill(fill_color, stroke_color);
    circle(x, y, size);
}
function _ellipse(x1, y1, x2, y2, fill_color, stroke_color) {
    conf_fill(fill_color, stroke_color);
    ellipse(x1, y1, x2, y2);
}
