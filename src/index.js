import { canvas, refreshCanvas } from "./components/canvas.js";
import { formGenerationMap } from "./components/formGenerationMap.js";

document.body.appendChild(formGenerationMap());
document.body.appendChild(canvas());
refreshCanvas(400, document.getElementById('sizeMap').value * 2, document.getElementById('sizeMap').value, true);