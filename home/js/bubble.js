

//Div that contains the canvas:
var canvasContainer = document.getElementById("a");

//Canvas for animation :
var canvas = document.querySelector('canvas');
const canvasWidth  = 1200;
const canvasHeight = 600; 
canvas.width = canvasWidth
canvas.height = canvasHeight;
var c = canvas.getContext("2d");
//Constants for canvas
const startx = 100;
const starty = 500;
const lengthx = 1000;
const lengthy = 5;
//Variable for canvas
var tUnitx = (lengthx)/10;
var unitx = tUnitx;
const unity = 3;  

//Buttons for animations
//Size of list
var btnSize10 = document.getElementById("size_10");
var btnSize25 = document.getElementById("size_25");
var btnSize50 = document.getElementById("size_50");
var btnSize100 = document.getElementById("size_100");
//Type of List
var btnTypeR = document.getElementById("type_random");
var btnTypeSW = document.getElementById("type_sorted_wrong");
var btnTypeS = document.getElementById("type_sorted");
//Controls
var btnPlayA = document.getElementById("play_animation");
var btnPauseA = document.getElementById("pause_animation");
var btnResetA = document.getElementById("reset_animation");
//Pause button disabled unless play is clicked
btnPauseA.disabled = true;
//Constants
const selctedBtnCN = "btn btn-success active";
const otherBtnCN = "btn btn-success";

//Array to be animated 
var aArray = [];
var oArray = [];
var aArraySize = 10;
var aArrayType = "random";
setArray();
var pass = 0;
var counter = 0;

//Variables for animation frames;
var requestID = "";

//Object
function Block(index , value , x , y ){
    this.index = index;
    this.value = value;
    this.x = x;
    this.y = y;
    this.xl = unitx;
    this.yl = value*unity;
    
    this.draw = function(){
       // console.log(this.x);
        //console.log(this.y);
        c.beginPath();
        c.fillStyle = "yellow";
        c.fillRect(this.x , this.y , this.xl , this.yl);
        c.fillStyle = "blue";
        c.strokeRect(this.x , this.y , this.xl , this.yl)
    }
    /*
    this.update = function(j){
        this.x += ((j-this.index)*unitx);
        this.index = j; 
        //this.draw();
    }*/
}

//function to reset everything
function reset(){
    oArray = [];
    aArray = [];
    aArraySize = 10;
    unitx = lengthx/aArraySize;
    aArrayType = "random";
    pass = 0;
    setArray();
    btnPlayA.disabled = false;
    btnPauseA.disabled = true;
    
}

//Function for Size of List toggle
function setListSize(size){
    pass = 0; 
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
    unitx = lengthx/size;
    setArray();
}
//Function for tyoe of List toggle
function setListType(type_number){
    pass = 0;
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
    var m = (100/aArraySize);
    if(aArrayType == "random"){
        for(var i = 0 ; i < aArraySize ; i++){
            aArray.push(Math.ceil(Math.random()*100));
        }
    }
    if(aArrayType == "sorted"){
        for(var i = 1 ; i <= aArraySize ; i++){
            aArray.push(i*m);
        }
    }
    if(aArrayType == "sorted wrong"){
        for(var i = aArraySize ; i >= 1 ;i--){
            aArray.push(i*m);
        }
    }
    setObjectArray();
    drawObjectArray();
    //console.log(aArray);
    //resetAnimation();
}

//set object array
function setObjectArray(){
    oArray = [];
    for(var i = 0 ; i < aArraySize ; i++){
        oArray.push(new Block(i , aArray[i] , startx+(i*unitx) , starty - (aArray[i]*unity) ));
    }
    //console.log(oArray);
}
//Draw objects whenever reset
function drawObjectArray(){
    c.clearRect(0 , 0 , 1200 , 600);
    for(var i = 0 ; i < aArraySize ; i++){
        oArray[i].draw();
    }
}

//Function to animate
function sortAnimate(){
    
    requestID = requestAnimationFrame(sortAnimate);
    if(pass >= aArraySize - 1){
        pass = 0;
        counter = 0
    }
    if(aArray[pass] > aArray[pass + 1]){
        var temp = aArray[pass];
        aArray[pass] = aArray[pass+1];
        aArray[pass+1] = temp;
    }
    else{
        counter++;
    }
    if(counter >= aArraySize-1){
        pauseA();
    }
    setObjectArray();
    c.clearRect(0,0,1200,600);
    for(var i = 0 ; i < aArraySize ; i++){
        oArray[i].draw();
    }
    pass++;
}


//Function to reset btns
function resetBtns(){
    btnPlayA.disabled = false;
    btnPauseA.disabled = true;
    btnSize10.disabled = false;
    btnSize10.parentElement.className = selctedBtnCN;
    btnSize25.disabled = false;
    btnSize25.parentElement.className = otherBtnCN;
    btnSize50.disabled = false;
    btnSize50.parentElement.className = otherBtnCN;
    btnSize100.disabled = false;
    btnSize100.parentElement.className = otherBtnCN;
    btnTypeR.disabled = false;
    btnTypeR.parentElement.className = selctedBtnCN;
    btnTypeSW.disabled = false;
    btnTypeSW.parentElement.className = otherBtnCN;
    btnTypeS.disabled = false;
    btnTypeS.parentElement.className = otherBtnCN;
}
//Function for controls
//For play
btnPlayA.addEventListener("click",(e) => {
    counter = 0;
    sortAnimate();
    //sort();
    //Button disabled to stop multiple call of sortAndDraw()
    btnPlayA.disabled = true;
    btnPauseA.disabled = false;
    btnSize10.disabled = true;
    btnSize25.disabled = true;
    btnSize50.disabled = true;
    btnSize100.disabled = true;
    btnTypeR.disabled = true;
    btnTypeSW.disabled = true;
    btnTypeS.disabled = true;
});

//For pause
btnPauseA.addEventListener("click",(e) => {
    cancelAnimationFrame(requestID);
    console.log("pauseed");
    btnPlayA.disabled = false;
    btnPauseA.disabled = true;
    //resetBtns();
    btnPlayA.disabled = false;
    btnPauseA.disabled = true;
    btnSize10.disabled = false;
    btnSize25.disabled = false;
    btnSize50.disabled = false;
    btnSize100.disabled = false;
    btnTypeR.disabled = false;
    btnTypeSW.disabled = false;
    btnTypeS.disabled = false;
});

//For reset
btnResetA.addEventListener("click",(e) => {
    console.log("animation stopped");
    cancelAnimationFrame(requestID);
    resetBtns();
    reset();
});

function pauseA(){
    cancelAnimationFrame(requestID);
    console.log("pausedd");
    btnPlayA.disabled = false;
    btnPauseA.disabled = true;
    //resetBtns();
    btnPlayA.disabled = false;
    btnPauseA.disabled = true;
    btnSize10.disabled = false;
    btnSize25.disabled = false;
    btnSize50.disabled = false;
    btnSize100.disabled = false;
    btnTypeR.disabled = false;
    btnTypeSW.disabled = false;
    btnTypeS.disabled = false;
}






