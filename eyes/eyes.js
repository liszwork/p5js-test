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
const eyes = [];
function setup() {
  createCanvas(400, 600);
  background(COLOR_BG);
  colorMode(HSB, 360, 100, 100, 100);
  // setup_tweakpane();

  cx = width / 2;
  cy = height / 2;

  eyes.push(new Eye());
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

  for (const eye of eyes) {
    eye.draw();
  }

  // fill('#aaf');
  // stroke(0);
  // beginShape();
  // vertex(10, 10);
  // vertex(300, 10);
  // vertex(300, 100);
  // vertex(250, 150);
  // vertex(100, 100);
  // vertex(100, 200);
  // endShape(CLOSE);


  log_display();
}

class Eye {
  constructor() {
    this.eye_size = ((width < height) ? width : height) * 0.9;;
    this.pupil_size = this.eye_size * 0.5;
    this.pupil_r = this.pupil_size / 2;
    // this.is_initialized = false;
    this.iris_points = [];
    this._create_iris_points(this.pupil_size / 2);
  }
  draw() {
    // 白目
    this.white_eye(this.eye_size);

    // 瞳
    this.pupil(this.pupil_size);

    // msgs.push(`x: ${cx}, y: ${cy}`);
    // msgs.push(`e-sz: ${this.eye_size}, p-sz: ${this.pupil_size}, p-r: ${this.pupil_r}`);
  }
  white_eye(size) {
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
  _pupil_base(size, r) {
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
  _create_iris_points(_r) {
    // 虹彩の作成
    const angle_deg = 1;
    const ofs = 15;
    for (let i = 0; i < 360 / angle_deg; i++) {
      const r = random(_r * 0.6, _r);
      const theta_deg = angle_deg * i;
      const theta = radians(theta_deg);
      let [x, y] = this.get_xy(theta, r - ofs);
      x += cx;
      y += cy;
      this.iris_points.push({ x: x, y: y });
    }
  }
  _pupil_iris(r) {
    blendMode(OVERLAY);
    noStroke();
    const gradient = drawingContext.createLinearGradient(cx, cy - r, cx, cy + r);
    const color_a = color(`rgba(155, 155, 155, 0.6)`);
    const color_b = color(`rgba(126, 126, 126, 0.6)`);
    const color_c = color(`rgba(75, 75, 75, 0.6)`);
    gradient.addColorStop(0.3, color_a);
    gradient.addColorStop(0.5, color_b);
    gradient.addColorStop(1.0, color_c);
    //上で指定したグラデーション内容を塗りつぶしスタイルに代入する
    drawingContext.fillStyle = gradient;

    beginShape();
    for (const p of this.iris_points) {
      vertex(p.x, p.y);
    }
    endShape(CLOSE);
    blendMode(BLEND);
  }
  _pupil_doukou(size) {
    noStroke();
    fill(hsb(100, 100, 100, 1));
    fill(0);
    circle(cx, cy, size);
  }
  pupil(size) {
    // 瞳の作成
    const doukou_size = 50;
    const r = size / 2;
    // 瞳
    this._pupil_base(size, r);
    // 虹彩
    this._pupil_iris(r);
    // 瞳孔
    this._pupil_doukou(doukou_size);
  }
  get_xy(theta, r) {
    const x = r * sin(theta);
    const y = r * cos(theta);
    // msgs.push(`get_xy: θ: ${round(degrees(theta), 3)} x, y=${round(x, 0)}, ${round(y, 0)}`);
    return [x, y];
  }
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

