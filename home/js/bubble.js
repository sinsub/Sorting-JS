var canvas = document.querySelector('canvas');
var canvas_container = document.getElementById("canvas_container");
var c = canvas.getContext("2d");
console.log(canvas);
//console.log(canvas_container);
canvas.width = innerWidth;
canvas.height = 400;

window.addEventListener("resize",function(){
    canvas.width = main_canvas.Width;
    canvas.height = 400;
});


