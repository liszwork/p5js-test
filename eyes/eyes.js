const COLOR_BG = '#AAA';
const msgs = [];

const params = {
    base_h: 213,
    base_s: 63,
    base_b: 70,
    base_color: '#4274b3'
};

let cx;
let cy;

function setup() {
    createCanvas(400, 600);
    background(COLOR_BG);
    colorMode('HSB', 360, 100, 100, 100);
    // setup_tweakpane();

    cx = width / 2;
    cy = height / 2;
}

function setup_tweakpane() {
    const pane = new Tweakpane.Pane();
    pane.addInput(params, 'base_h', { step: 1, min: 0, max: 360 });
    pane.addInput(params, 'base_s', { step: 1, min: 0, max: 100 });
    pane.addInput(params, 'base_b', { step: 1, min: 0, max: 100 });
    pane.addInput(params, 'base_color');
}

function draw() {
    background(COLOR_BG);

    test1();

    log_display();

    // console.log(noise(width * frameCount) * 10)
}

function test1() {
    const eye_size = ((width < height) ? width : height) * 0.9;;
    const pupil_size = eye_size * 0.5;
    const pupil_r = pupil_size / 2;

    // 白目
    white_eye(eye_size);

    // ベース
    pupil(pupil_size);

    msgs.push(`x: ${cx}, y: ${cy}`);
    msgs.push(`e-sz: ${eye_size}, p-sz: ${pupil_size}, p-r: ${pupil_r}`);
}
function white_eye(size) {
    //グラデーションを作成点AのXY座標から点BのXY座標までの線形のグラデーション
    const r = size / 2;
    const gradient = drawingContext.createLinearGradient(cx, cy - r, cx, cy + r);
    const color_a = color(`hsb(300, 1%, 100%)`);
    const color_b = color(`hsb(270, 3%, 8%)`);
    gradient.addColorStop(0.3, color_a);
    gradient.addColorStop(1.0, color_b);
    //上で指定したグラデーション内容を塗りつぶしスタイルに代入する
    drawingContext.fillStyle = gradient;
    circle(cx, cy, size);
}
let is_initialized = false;
const lines = [];
function _pupil_base(size, r) {
    //グラデーションを作成点AのXY座標から点BのXY座標までの円形のグラデーション
    const gra_piple_base = drawingContext.createRadialGradient(cx, cy, 6, cx, cy, r);
    const color_a = color(`rgb(184, 110, 41)`);
    const color_b = color(`rgb(148, 199, 212)`);
    const color_c = color(`rgb(28, 10, 36)`);
    gra_piple_base.addColorStop(0.0, color_a);
    gra_piple_base.addColorStop(0.65, color_b);
    gra_piple_base.addColorStop(0.8, color_b);
    gra_piple_base.addColorStop(1.0, color_c);
    //上で指定したグラデーション内容を塗りつぶしスタイルに代入する
    drawingContext.fillStyle = gra_piple_base;
    circle(cx, cy, size);
}
function _pupil_kousai(r) {
    stroke(0);
    stroke(hsb(0, 100, 0, 0.22));
    const angle_deg = 2;
    const ofs = 5
    for (let i = 0; i < 360 / angle_deg; i++) {
        const theta_deg = angle_deg * i;
        // console.log(theta_deg)
        switch (theta_deg) {
            case 0:
                line(cx, cy, cx, cy - r + ofs);
                break;
            case 90:
                line(cx, cy, cx + r - ofs, cy);
                break;
            case 180:
                line(cx, cy, cx, cy + r - ofs);
                break;
            case 270:
                line(cx, cy, cx - r + ofs, cy);
                break;
            default:
                const theta = radians(theta_deg);
                let [x, y] = get_xy(theta, r - ofs);
                x += cx;
                y += cy;
                if (theta_deg == 88) {
                    msgs.push(`θ: ${round(degrees(theta), 3)}, line(${cx}, ${cy}, ${round(x, 2)}, ${round(y, 2)})`);
                }
                line(cx, cy, x, y);
                break;
        }
    }
}
function _pupil_doukou(size) {
    noStroke();
    fill(hsb(0, 0, 0));
    circle(cx, cy, size);
}
function pupil(size) {
    // 瞳の作成
    const doukou_size = 50;
    const r = size / 2;
    // 瞳
    _pupil_base(size, r);

    // 虹彩
    _pupil_kousai(r)

    // 瞳孔
    _pupil_doukou(doukou_size);

    // test noise line
    test_noise_line();
}
function get_xy(theta, r) {
    const x = r * sin(theta);
    const y = r * cos(theta);
    // msgs.push(`get_xy: θ: ${round(degrees(theta), 3)} x, y=${round(x, 0)}, ${round(y, 0)}`);
    return [x, y];
}

const items = [];
function test_noise_line() {
    if (!is_initialized) {
        is_initialized = true;
        for (let i = 0; i < 10; i++) {
            const y = height - 110 + (10 * i);
            // const n = round(noise(width) * random(20) * 10 / 10, 0);
            // const n = round(noise(width * i)*10, 0);
            const n = round(noise(i) * 2, 0);
            items.push({
                x1: 0,
                y1: y,
                x2: width,
                y2: y,
                wright: n,
            });
        }
    }
    let m = 'weigt: ';
    for (const item of items) {
        m += `${item.wright}, `;
        strokeWeight(item.wright);
        line(item.x1, item.y1, item.x2, item.y2);
    }
    msgs.push(m)
    // normalize
    strokeWeight(1);
}



function hsb(h, s, b, a = 1.0) {
    if (h < 0 || 360 < h) {
        return 0;
    }
    if (s < 0 || 100 < s) {
        return 0;
    }
    if (b < 0 || 100 < b) {
        return 0;
    }
    if (a < 0 || 1 < a) {
        return 0;
    }
    return `hsba(${h}, ${s}%, ${b}%, ${a})`
}

function log_display() {
    const h = 13;
    const offset = 5;
    let x = offset;
    let y = h + offset;
    msgs.push(`frameCount: \${frameCount}`);
    fill('rgba(0, 0, 150, 0.25)');
    rect(0, 0, 300, 20 * msgs.length);
    noStroke();
    fill('#000');
    msgs.forEach(msg => {
        text(msg, x, y);
        y += h;
    });

    // clear
    msgs.splice(0)
}

