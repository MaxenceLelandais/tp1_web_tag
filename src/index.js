import { canvas, refreshCanvas } from "./components/canvas.js";
import { formGenerationMap } from "./components/formGenerationMap.js";

document.body.appendChild(formGenerationMap());
document.body.appendChild(canvas());
refreshCanvas(1, document.getElementById('widthMap').value, document.getElementById('heightMap').value, true);