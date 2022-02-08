const params = {
    stroke: 20,
    blur: 16,
    back_color: '#FFF',
    back_weight: 18,
    fore_disable: false,
    fore_color: '#FFF',
    fore_weight: 1,
}

function setup() {
    background(0);
    createCanvas(800, 400);
    setup_tweakpane();
    textAlign(CENTER, CENTER);
    textSize(90);
}

function setup_tweakpane() {
    const pane = new Tweakpane.Pane();
    pane.addInput(params, 'stroke', { step: 1, min: 1, max: 50 });
    pane.addInput(params, 'blur', { step: 1, min: 1, max: 50 });
    // folder: back
    const folderBack = pane.addFolder({
        title: 'back',
    });
    folderBack.addInput(params, 'back_color');
    folderBack.addInput(params, 'back_weight', { step: 1, min: 1, max: 50 });
    // folder: fore
    const folderFore = pane.addFolder({
        title: 'fore',
    });
    folderFore.addInput(params, 'fore_disable');
    folderFore.addInput(params, 'fore_color');
    folderFore.addInput(params, 'fore_weight', { step: 1, min: 1, max: 50 });
}

let is_first = true;
let is_finished_output = false;
let pre_params = JSON.parse(JSON.stringify(params));
function draw() {
    let is_reloading = false;
    for (let key of Object.keys(params)) {
        // paramsの全要素の変化をチェック+更新
        if (params[key] != pre_params[key]) {
            is_reloading = true;
            pre_params[key] = params[key];
        }
    }
    if (is_reloading || is_first) {
        is_reloading = false;
        pre_params.fore_disable = params.fore_disable;
        background(0);
    }
    else {
        return;
    }
    is_first = false;

    // back
    stroke(params.stroke);
    fill(params.back_color);
    textSize(90);
    strokeWeight(params.back_weight);
    text('DIR EN GREY', width / 2, height / 2);

    // fore
    if (!params.fore_disable) {
        filter(BLUR, params.blur);
        fill(params.fore_color);
        strokeWeight(params.fore_weight);
        text('DIR EN GREY', width / 2, height / 2);
    }
}