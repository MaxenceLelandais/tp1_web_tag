import { refreshCanvas } from "./canvas.js";

export function formGenerationMap() {
    const div = document.createElement('div');
    div.id = 'formGenerationMap';

    div.appendChild(addRange('widthMap', 10, 400, 'x = ', ' tiles'));
    div.appendChild(addRange('heightMap', 10, 400, 'y = ', ' tiles'));

    const buttonGenerate = document.createElement('button');
    buttonGenerate.id = 'buttonGenerate';
    buttonGenerate.append('Génération');
    buttonGenerate.onclick = () => {
        refreshCanvas(1, document.getElementById('widthMap').value, document.getElementById('heightMap').value, true);
    };
    div.append(buttonGenerate);


    const buttonValidate = document.createElement('button');
    buttonValidate.id = 'buttonValidate';
    buttonValidate.append('Valider');
    buttonValidate.onclick = () => {
        refreshCanvas(32, document.getElementById('widthMap').value, document.getElementById('heightMap').value, false);
        div.innerHTML = '';
    };
    div.append(buttonValidate);
    return div;
}

function addRange(id, min, max, startText, endText) {
    const div = document.createElement('div');
    const range = document.createElement('input');
    range.id = id;
    range.type = 'range';
    range.step = 2;
    range.min = min;
    range.max = max;

    const output = document.createElement('output');
    actualizeValue(range, output, startText, endText)
    range.oninput = () => actualizeValue(range, output, startText, endText);
    div.append(range, output)

    return div;
}

function actualizeValue(range, output, startText, endText) {
    output.value = startText + range.value + endText;
}