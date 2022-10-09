export function game(){
    const ctx = $('.mapGame').get(0).getContext("2d");
    ctx.font = "30px Arial";
    ctx.fillText("Hello World", 50, 50);
    ctx.fillText("Hello World", 50, 100);
}