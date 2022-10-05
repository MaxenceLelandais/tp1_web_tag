import { canvas, refreshCanvas } from "./components/canvas.js";
import { pageNewGame } from "./components/pageNewGame.js";

$('body').append(pageNewGame());
$('body').append(canvas());
