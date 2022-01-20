const COLOR_BG = '#ccc';

const params = {
      color12: '#cc0',
      color11: '#00c',
      color10: '#fcc',
      color9: '#f66',
      color8: '#ff0',
      color7: '#f00',
      color6: '#c8a',
      color5: '#c0a',
      color4: '#f00',
      color3: '#00f',
      color2: '#0ff',
      color1: '#ff0',
};

function setup() {
    createCanvas(400, 600);
    background(COLOR_BG);
    setup_tweakpane();
}

function setup_tweakpane() {
    const pane = new Tweakpane.Pane();
    pane.addInput(params, 'color12');
    pane.addInput(params, 'color11');
    pane.addInput(params, 'color10');
    pane.addInput(params, 'color9');
    pane.addInput(params, 'color8');
    pane.addInput(params, 'color7');
    pane.addInput(params, 'color6');
    pane.addInput(params, 'color5');
    pane.addInput(params, 'color4');
    pane.addInput(params, 'color3');
    pane.addInput(params, 'color2');
    pane.addInput(params, 'color1');
}

let angle = 0;

function draw() {
    background(COLOR_BG);
    // 図形描画

    angle++;
    translate(width / 2, height / 2);
    rotate(angle);

    fill(params.color12);
    rect(0, 0, 200, 100);
    fill(params.color11);
    rect(0, 0, 200, 50);
    fill(params.color10);
    rect(0, 0, 140);
    fill(params.color9);
    rect(0, 0, 120);
    fill(params.color8);
    rect(0, 0, 100);
    fill(params.color7);
    rect(0, 0, 90);
    fill(params.color6);
    rect(0, 0, 80);
    fill(params.color5);
    rect(0, 0, 65);
    fill(params.color4);
    rect(0, 0, 50);
    fill(params.color3);
    rect(0, 0, 32);
    fill(params.color2);
    rect(0, 0, 31);
    fill(params.color1);
    rect(0, 0, 25);
}
