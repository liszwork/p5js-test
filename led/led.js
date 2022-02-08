const COLOR_BG = '#000';

/*
const params = {
    mode: 0,
};
*/

function setup() {
    createCanvas(400, 400);
    background(COLOR_BG);
    //setup_tweakpane();
}

/*
function setup_tweakpane() {
    const pane = new Tweakpane.Pane();
    pane.addInput(params, 'mode');
}
*/

le

function draw() {
    background(COLOR_BG);
    noStroke();

    for (var i = 0; i < 5; i++) {
        led(width/2, height/2 + (20 * i), 10, 255, 0, 0, 1 - (0.1 * i));
    }

}

function led(x, y, s, r, g, b, a) {
    const n = 3;
    let msg = '';
    for (let i = 0; i < n; i++) {
        const size = (s / n) * (n - i);
        const alpha = (a / n) * (i + 1);
        color = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        fill(color);
        ellipse(x, y, size);
        msg += `(${i}, ${round(size, 0)} ${round(alpha, 1)})`
        text(msg, 3, 15);
    }
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

