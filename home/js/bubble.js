

//Div that contains the canvas:
var canvasContainer = document.getElementById("a");

//Canvas for animation :
var canvas = document.querySelector('canvas');
const canvasWidth  = 1200;
const canvasHeight = 600; 
canvas.width = canvasWidth
canvas.height = canvasHeight;
var c = canvas.getContext("2d");

//Buttons for animations
//Size of list
var btnSize10 = document.getElementById("size_10");
var btnSize25 = document.getElementById("size_25");
var btnSize50 = document.getElementById("size_50");
var btnSize100 = document.getElementById("size_100");
//Type of List
var btnTypeR = document.getElementById("type_random");
var btnTypeSW = document.getElementById("type_sorted_wrong")
var btnTypeS = document.getElementById("type_sorted")
//Controls
var btnPlayA = document.getElementById("play_animation");
var btnPauseA = document.getElementById("pause_animation");
var btnResetA = document.getElementById("reset_animation");
//Constants
const selctedBtnCN = "btn btn-success active";
const otherBtnCN = "btn btn-success";

//Array to be animated 
var aArray = [];
var aArraySize = 10;
var aArrayType = "random";
setArray();


//Function for Size of List toggle
function setListSize(size){
    btnSize10.parentElement.className = otherBtnCN;
    btnSize25.parentElement.className = otherBtnCN;
    btnSize50.parentElement.className = otherBtnCN;
    btnSize100.parentElement.className = otherBtnCN;
    if (size == 100){
        btnSize100.parentElement.className = selctedBtnCN;
    } else if (size == 50) {
        btnSize50.parentElement.className = selctedBtnCN;
    } else if (size == 25) {
        btnSize25.parentElement.className = selctedBtnCN;
    } else {
        btnSize10.parentElement.className = selctedBtnCN;
    }
    aArraySize = size;
    setArray();
}
//Function for tyoe of List toggle
function setListType(type_number){
    type = "random";
    if(type_number == 2)
        type = "sorted wrong";
    if(type_number == 3)
        type = "sorted";    
    btnTypeR.parentElement.className = otherBtnCN;
    btnTypeS.parentElement.className = otherBtnCN;
    btnTypeSW.parentElement.className = otherBtnCN;
    if (type == "sorted"){
        btnTypeS.parentElement.className = selctedBtnCN;
    } else if (type == "sorted wrong"){
        btnTypeSW.parentElement.className = selctedBtnCN;
    } else {
        btnTypeR.parentElement.className = selctedBtnCN;
    }
    aArrayType = type;
    setArray();
}

//Function to set the Array for animation;
function setArray(){
    aArray = [];
    if(aArrayType == "random"){
        for(var i = 0 ; i < aArraySize ; i++){
            aArray.push(Math.floor(Math.random()*100));
        }
    }
    if(aArrayType == "sorted"){
        for(var i = 1 ; i <= aArraySize ; i++){
            aArray.push(i);
        }
    }
    if(aArrayType == "sorted wrong"){
        for(var i = aArraySize ; i >= 1 ;i--){
            aArray.push(i);
        }
    }

    console.log(aArray);
    resetAnimation();
}

//Reset function also initialiser
function resetAnimation(){
    
}

//Function for resizing canvas not needed
/*
window.addEventListener("resize",function(){
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    console.log(canvas);
});
*/





