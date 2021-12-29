function setup() {
    //キャンバスを作成
    createCanvas(400, 600);
    //背景色
    background(0);
}

function draw() {
    background(0);
    let x = width / 2;
    let y = height / 2;
    let size = 100;
    fill(0, 255, 0);
    ellipse(x, y, size);
}

