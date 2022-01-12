const COLOR_BG = '#000';
const COLOR_OBJ = '#AAA';
const MAX_DOTS = 200;
const DOT_SIZE = 5;
const NEAR_RANGE = 30;

let dots = [];
const params = {
    show_item_id: 1,
    rotate: true,
    rotateX: 0.01,
    rotateY: 0.01,
    planeW: 50,
    planeH: 50,
    boxW: 50,
    boxH: 50,
    boxDepth: 50,
    sphereRadius: 50,
    cylinderRadius: 20,
    cylinderHeight: 50,
    coneRadius: 40,
    coneH: 70,
    ellipsoidRadiusX: 30,
    ellipsoidRadiusY: 40,
    ellipsoidRadiusZ: 40,
    torusRadius: 30,
    torusTubeRadius: 15,
};

const folders = [];
function setup() {
    //キャンバスを作成(WEBGL入れないと出力されない)
    createCanvas(400, 600, WEBGL);
    //背景色
    background(COLOR_BG);
    // tweakpane
    const pane = new Tweakpane.Pane();
    pane.addInput(params, 'show_item_id', { min: 0, max: 6, step: 1 });
    pane.addInput(params, 'rotate');
    pane.addInput(params, 'rotateX', { min: 0.00, max: 0.01 });
    pane.addInput(params, 'rotateY', { min: 0.00, max: 0.01 });
    const folderPlane = pane.addFolder({
        title: 'plane',
    });
    folderPlane.addInput(params, 'planeW');
    folderPlane.addInput(params, 'planeH');
    const folderBox = pane.addFolder({
        title: 'box',
    });
    folderBox.addInput(params, 'boxW');
    folderBox.addInput(params, 'boxH');
    folderBox.addInput(params, 'boxDepth');
    const folderSphere = pane.addFolder({
        title: 'sphere',
    });
    folderSphere.addInput(params, 'sphereRadius');
    const folderCylinder = pane.addFolder({
        title: 'cylinder',
    });
    folderCylinder.addInput(params, 'cylinderRadius');
    folderCylinder.addInput(params, 'cylinderHeight');
    const folderCone = pane.addFolder({
        title: 'cone',
    });
    folderCone.addInput(params, 'coneRadius');
    folderCone.addInput(params, 'coneH');
    const folderEllipsoid = pane.addFolder({
        title: 'ellipsoid',
    });
    folderEllipsoid.addInput(params, 'ellipsoidRadiusX');
    folderEllipsoid.addInput(params, 'ellipsoidRadiusY');
    folderEllipsoid.addInput(params, 'ellipsoidRadiusZ');
    const folderTorus = pane.addFolder({
        title: 'torus',
    });
    folderTorus.addInput(params, 'torusRadius');
    folderTorus.addInput(params, 'torusTubeRadius');

    folders.push(folderPlane);
    folders.push(folderBox);
    folders.push(folderSphere);
    folders.push(folderCylinder);
    folders.push(folderCone);
    folders.push(folderEllipsoid);
    folders.push(folderTorus);
}

let current_id = 0;
function draw() {
    background(COLOR_BG);
    // 回転設定
    if ( params.rotate ) {
        rotateX(frameCount * params.rotateX);
        rotateY(frameCount * params.rotateY);
    }
    // tweakpaneの切り替え
    if (params.show_item_id != current_id ) {
        current_id = params.show_item_id;
        for ( let i = 0; i < 7; i++ ) {
            if ( i == current_id ) {
                folders[i].hidden = false;
                continue;
            }
            folders[i].hidden = true;
        }
    }

    // 図形描画
    switch (params.show_item_id) {
        case 0:
            plane(params.planeW, params.planeH);
            break;
        case 1:
            box(params.boxW, params.boxH, params.boxDepth);
            break;
        case 2:
            sphere(params.sphereRadius);
            break;
        case 3:
            cylinder(params.cylinderRadius, params.cylinderHeight);
            break;
        case 4:
            cone(params.coneRadius, params.coneH);
            break;
        case 5:
            ellipsoid(params.ellipsoidRadiusX, params.ellipsoidRadiusY, params.ellipsoidRadiusZ);
            break;
        case 6:
            torus(params.torusRadius, params.torusTubeRadius);
            break;
        default:
            break;
    }
    // textも3Dオブジェクトとして入っていまう模様
    //log_display();
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

