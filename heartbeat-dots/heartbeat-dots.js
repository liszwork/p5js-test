const COLOR_BG = '#000';
const COLOR_OBJ = '#AAA';
const MAX_DOTS = 200;

class Dots {
    constructor() {
        this.dot_num = 20;
        this.items = { objects: [] };
        for ( let i = 0; i < this.dot_num; i++ ) {
            const offset = 10;
            const x = randomInt(offset, width - offset);
            const y = randomInt(offset, height - offset);
            const size = randomInt(30, 40);
            const inc = randomInt(0, 1) ? 1 : -1;
            const max_factor = randomInt(11, 30) * 0.1; // 係数
            const obj = {
                id: i,
                name: 'item' + i,
                obj: new Circle(x, y, size),
                default: {
                    x: x,
                    y: y,
                    size: size,
                    inc: inc
                },
                inc: inc,
                min: size,
                max_factor: max_factor,
                max: size * max_factor
            }
            this.items['objects'].push(obj);
        }
    }
    draw() {
        this.items['objects'].forEach(item => {
            stroke(COLOR_OBJ);
            item['obj'].draw();
            fill('#33A');
            // text(item['id'], item['default']['x'], item['default']['y'])
        });
    }
    calc_size() {
        this.items['objects'].forEach(item => {
            const obj = item['obj'];
            const min = item['min'];
            const max = item['max'];
            let s = obj.size + item['inc'];
            if ( s < min || max < s ) {
                item['inc'] *= -1;
                s = obj.size + item['inc'];
            }
            obj.size = s;
        });
    }
}

let dot;
let dots;
let size = 50;
let inc = 1;

function setup() {
    //キャンバスを作成
    createCanvas(400, 600);
    //背景色
    background(COLOR_BG);

    dots = new Dots();
    dot = new Circle(width/2, height/2, size);
}

function draw() { 
    background(COLOR_BG);
    fill(COLOR_OBJ);
    stroke(COLOR_OBJ);
    // 図形描画
    dot.draw();
    dots.draw();

    // 次回値計算
    size = sz(50, 100);
    dot.size = size;
    dots.calc_size();

    log_display();
}

function sz(min, max) {
    let s = size + inc;
    if ( s < min || max < s ) {
        // sが範囲外になったらincを反転と再計算
        inc *= -1;
        s = size + inc;
    }
    return s;
}

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function log_display() {
    const h = 13;
    const offset = 5;
    let x = offset;
    let y = h + offset;
    const msgs = [
        `frameCount: ${frameCount}`,
        //`dot num: ${dots.length}`,
        `dot sz: ${dot.size}`
    ]
    fill('rgba(0, 0, 150, 0.25)');
    rect(0, 0, 150, 20 * msgs.length);
    fill('#AAB');
    msgs.forEach(msg => {
        text(msg, x, y);
        y += h;
    });
}
