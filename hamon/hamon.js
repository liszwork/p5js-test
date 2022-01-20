let debug = false;
let auto_drawing = false;

const circles = [];
const draw_timing = 100;

function setup() {
    createCanvas(400, 600);
    background(0);
    frameRate(60);
}

function draw() {
    background(0);
    stroke('#fff');
    noFill();
    strokeWeight(1);

    random_add_circle();

    const del_idx = [];
    for ( let i = 0; i < circles.length; i++ ) {
        const circle = circles[i];
        if ( circle.is_finished ) {
            del_idx.unshift(i); // 逆順で追加
        }
        else {
            circle.draw();
        }
    }
    del_idx.forEach(idx => {
        circles.splice(idx, 1); // 完了オブジェクトの削除
    });

    debug_disp();
}

function add_circle(x, y, size) {
    circles.push(new Circle(x, y, size)); 
}

function random_add_circle() {
    if ( !auto_drawing ) { return; }
    if ( frameCount % draw_timing != 0 ) { return; }
    const x = random(0, width);
    const y = random(0, height);
    add_circle(x, y, 20);
}

function mouseClicked() {
    add_circle(mouseX, mouseY, 20);
}

function keyPressed() {
    if ( keyCode === ENTER ) {
        auto_drawing = !auto_drawing;
    }
    else if ( key === 'd' ) {
        debug = !debug;
    }
    return false;
}

class Circle {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.count = 0;
        this.max_count = 50 + random(0, 400);
        this.weight = random(10, 30) * 0.1;
        this.is_finished = false;
    }
    draw() {
        if ( this.is_expired() ) {
            this.is_finished = true;
            return;
        }
        
        if ( frameCount % 1 == 0 ) {
            this.size += 1;
            this.count++;
        }
        const alpha = 100 - (this.count / this.max_count * 100)
        stroke(255, 255, 255, alpha);
        strokeWeight(this.weight);
        ellipse(this.x, this.y, this.size);
    }
    is_expired() {
        if ( this.count > this.max_count ) {
            return true;
        }
        return false;
    }
}

function debug_disp() {
    if ( !debug ) { return; }
    let msg = '';
    msg += `frame: ${frameCount}\n`;
    msg += `noise: ${noise(random(0, 1))}\n`;
    msg += `c num: ${circles.length}\n`
    for (let i = 0; i < circles.length; i++) {
        const c = circles[i];
        msg += `c[${i}]: (${c.x}, ${c.y}, ${c.size}) count=${c.count}, max=${c.max_count}\n`;
    }
    textSize(9);
    stroke('#fff');
    strokeWeight(1);
    text(msg, 5, 15);
}

/* 水の波紋 (波動関数)
 * ｘ＝ｓｉｎ2π（ｒ／λ＋νｔ）
 * ｒが中心からの距離
 * λが波長
 * νが振動数
 * ｔが時間
 */
