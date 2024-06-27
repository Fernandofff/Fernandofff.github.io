const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let rect;

function preload() {}

function create() {
    rect = this.add.rectangle(400, 300, 100, 100, 0x0000ff).setInteractive();
    this.input.setDraggable(rect);

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    });

    document.body.insertAdjacentHTML('beforeend', '<button id="saveButton">Guardar Posición</button>');
    document.body.insertAdjacentHTML('beforeend', '<button id="loadButton">Cargar Posición</button>');

    document.getElementById('saveButton').addEventListener('click', savePosition);
    document.getElementById('loadButton').addEventListener('click', loadPosition);

    loadPosition();
}

function update() {}

function savePosition() {
    const rectPosition = { x: rect.x, y: rect.y };
    fetch('/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(rectPosition)
    });
}

function loadPosition() {
    fetch('/load')
        .then(response => response.json())
        .then(data => {
            rect.setPosition(data.x, data.y);
        });
}
