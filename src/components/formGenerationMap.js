import { refreshCanvas } from "./canvas.js";

export function formGenerationMap() {
    const div = document.createElement('div');
    div.id = 'formGenerationMap';

    div.appendChild(addRange('sizeMap', 10, 200, ' x ', ' tiles' ));

    const buttonGenerate = document.createElement('button');
    buttonGenerate.id = 'buttonGenerate';
    buttonGenerate.append('Génération');
    buttonGenerate.onclick = () => {
        refreshCanvas(400, document.getElementById('sizeMap').value * 2, document.getElementById('sizeMap').value, true);
    };
    div.append(buttonGenerate);

    const buttonValidate = document.createElement('button');
    buttonValidate.id = 'buttonValidate';
    buttonValidate.append('Valider');
    buttonValidate.onclick = () => {
        refreshCanvas(-1, document.getElementById('sizeMap').value * 2, document.getElementById('sizeMap').value, false);
        div.innerHTML = '';
    };
    div.append(buttonValidate);
    return div;
}

function addRange(id, min, max, text, endText) {
    const div = document.createElement('div');
    const range = document.createElement('input');
    range.id = id;
    range.type = 'range';
    range.step = 2;
    range.min = min;
    range.max = max;

    const output = document.createElement('output');
    actualizeValue(range, output, text, endText)
    range.oninput = () => actualizeValue(range, output, text, endText);
    div.append(range, output)

    return div;
}

function actualizeValue(range, output, text, endText) {
    output.value = range.value * 2 + text + range.value + endText;
}