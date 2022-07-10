
window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    document.getElementById("left").addEventListener("click", () => moveObject(-1, 0, 0));
    document.getElementById("right").addEventListener("click", () => moveObject(1, 0, 0));
    document.getElementById("bottom").addEventListener("click", () => moveObject(0, -1, 0));
    document.getElementById("up").addEventListener("click", () => moveObject(0, 1, 0));

    button.innerText = '﹖';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function moveObject(x, y, z) {
    let element = document.querySelector('a-entity');
    let position = element.getAttribute("position").split(" ");
    console.log("moveObject", position, element, x, y)
    if(x === 1)
        element.setAttribute("position", `${position[0]+1} ${position[1]} ${position[2]}`)
    else if (x === -1)
        element.setAttribute("position", `${position[0]-1} ${position[1]} ${position[2]}`)
    else if (y === 1)
        element.setAttribute("position", `${position[0]} ${position[1]+1} ${position[2]}`)
    else if (y === -1)
        element.setAttribute("position", `${position[0]} ${position[1]-1} ${position[2]}`)
}

function staticLoadPlaces() {
    return [
        {
            name: 'Pokèmon',
            location: {
                lat: 49.459288,
                lng: 11.064394,
            },
        },
    ];
}

var models = [
    {
        url: './assets/magnemite/scene.gltf',
        scale: '0.2 0.2 0.2',
        info: 'Magnemite, Lv. 5, HP 10/10',
        rotation: '0 180 0',
        position: "0 0 0"
    },
    {
        url: './assets/articuno/scene.gltf',
        scale: '0.05 0.05 0.05',
        rotation: '0 180 0',
        info: 'Articuno, Lv. 80, HP 100/100',
        position: "0 0 0"
    },
    {
        url: './assets/dragonite/scene.gltf',
        scale: '0.02 0.02 0.02',
        rotation: '0 180 0',
        info: 'Dragonite, Lv. 99, HP 150/150',
        position: "0 0 0"
    },
];

var modelIndex = 0;
var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}
