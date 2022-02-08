const debug = true;
const bg = 200;

let center;
const eyes = [];

function setup() {
    createCanvas(400, 600);
    background(bg);

    center = createVector(width / 2, height / 2);

    eyes.push(new Eye(center.x, center.y, 100, 200));
}

function draw() {
    background(bg);
    debug_center_line();

    ////////
    // test();
    test2();
    return;
    ////////

    for (eye of eyes) {
        //eye.debug_print();
        eye.update(mouseX, mouseY);
        eye.draw();
    }
}

/////////////////
let is_init = false;    // 初期化済みフラグ
let c;          // 白目の中心点
let m;          // マウス座標
let ra = 100;   // 長軸の半分(白目の長い方=縦r)
let rb = 50;    // 短軸の半分(白目の短い方=横r)
let theta;      // 線分c->mの角度
let eye_r = 20; // 目玉の半径
let xx = 0;     // 線分c-mと楕円(白目)の接点x
let yy = 0;     // 線分c->mと楕円(白目)の接点y
function test() {
    if (!is_init) {
        is_init = true;
        c = createVector(center.x, center.y);   // 目の中心点
        m = createVector(mouseX, mouseY);       // マウス座標
    }
    m.x = mouseX;
    m.y = mouseY;

    function calc_theta(m, c) {
        // theta = tan^-1 (dy/ dx)
        //    dx = mx - cx
        //    dy = my - cy
        const d = m.copy();
        d.sub(c); // m - c
        t = atan2(d.y, d.x);
        return t;
    }
    theta = calc_theta(m, c);

    function calc_Q(ra, theta, er) {
        const x = (ra - er) * cos(theta);
        const y = (ra - er) * sin(theta);
        return createVector(x, y);
    }
    const q = calc_Q(ra, theta, eye_r);

    stroke(0);
    fill(255);
    ellipse(c.x, c.y, rb * 2, ra * 2); // 白目
    fill(0);
    const x = (rb - eye_r) * (cos(theta) + 1) + c.x;
    const y = (ra - eye_r) * (sin(theta) + 1) + c.y;
    ellipse(x, y, eye_r, eye_r);
    //    ellipse(q.x + ra - eye_r, q.y + rb - eye_r, eye_r, eye_r);
    //    text(`${q.x + ra - eye_r}, ${q.y + rb - eye_r}, ${eye_r}`, 0, 50);

    //    let msg = `${c}\n${m}\n${theta}`;
    //    text(msg, 0, 100);

    // guide
    fill('#FF0');
    circle(m.x, m.y, 10);
    fill('#F00');
    circle(c.x, c.y, 10);
    fill('#F0F');
    circle(c.x - rb, c.y, 5);
    circle(c.x + rb, c.y, 5);
    circle(c.x, c.y - ra, 5);
    circle(c.x, c.y + ra, 5);

    // 補助線
    noFill();
    stroke(0);
    circle(c.x, c.y, ra * 2);
    line(mouseX, mouseY, c.x, c.y);
    line(mouseX, mouseY, mouseX, c.y)

    fill(0);
    noStroke();
    let texty = 20;
    text(`mouse: ${mouseX}, ${mouseY}`, 5, texty); texty += 15;
    text(`x, y: ${x}, ${y}`, 5, texty); texty += 15;
    text(`theta: ${theta}rad (${degrees(theta)} deg)`, 5, texty); texty += 15;
}
/////////////////

function debug_center_line() {
    if (!debug) return;
    stroke(0);
    line(0, center.y, width, center.y);
    line(center.x, 0, center.x, height);
}

function white_eye() {
    fill('#fff');
    stroke('#000');
    ellipse(center.x, center.y, 100, 200);
}
function black_eye() {
    fill('#000');
    stroke('#900');
    ellipse(center.x, center.y, 30, 30);
}

class Eye {
    constructor(x, y, w, h) {
        this.white = new EyeParts(x, y, w, h, '#fff', 'weye');
        const size = w * 0.3;
        this.black = new EyeParts(x, y, size, size, '#000', 'beye');
        console.log(`Eye: ${x}, ${y}, ${w}, ${h}, ${size}`);
    }
    draw() {
        this.white.draw();
        this.black.draw();
    }
    update(x, y) {
        // TODO: 白目と範囲からの計算

        this.black.update(x, y);
    }
    debug_print() {
        this.white.debug_print();
        this.black.debug_print();
    }
}

class EyeParts {
    constructor(x, y, w, h, fill_color, name) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.fill_color = fill_color;
        this.name = name
        this.debug_print();
    }
    draw() {
        stroke(0);
        fill(this.fill_color);
        ellipse(this.x, this.y, this.w, this.h);
    }
    update(x, y) {
        this.x = x;
        this.y = y;
    }
    debug_print() {
        console.log(`${this.name}: ${this.x}, ${this.y}, ${this.w}, ${this.h}, ${this.fill_color}`);
    }
}

