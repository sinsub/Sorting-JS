//Main: #12D4E6
//Diff1: #07E6B2
//Diff2: #07F270
//Main dark: #0763F2
//Almost main: #08A8FC
//Div that contains the canvas:
var canvasContainer = document.getElementById("canvas_container");

//Canvas for animation :
var canvas = document.querySelector('canvas');
var c = canvas.getContext("2d");
//variables for canvas
//Position to start the drawing at:
var startx = 0;     
var starty = 0;
//Total length that the array representation occupies
var lengthx = 0;
//Constatnt height of the canvas
const canvasHeight = 425;

if(window.innerWidth >= 1100){
    canvas.width = canvasContainer.clientWidth;
    canvas.height = canvasHeight;
    startx = 50;
    starty = 375;
    lengthx = canvasContainer.clientWidth-100;

}
else {
    canvas.width = canvasContainer.clientWidth;
    canvas.height = canvasHeight;
    startx = 25;
    starty = 375;
    lengthx = canvasContainer.clientWidth-50;
}
//Variables for drawing the array representation
//Width of an element --Note it is divided by 10 since
//  intital length of the array is 10;
var unitx = (lengthx)/10;
//Height if 1 unit is 3px
const unity = 3;  

//ariables reset when windows is resized
window.addEventListener("resize", (e) => {
    if(window.innerWidth >= 1200){
        canvas.width = canvasContainer.clientWidth;
        canvas.height = canvasHeight;
        startx = 50;
        starty = 375;
        lengthx = canvasContainer.clientWidth-100;
    }
    else {
        canvas.width = canvasContainer.clientWidth;
        canvas.height = canvasHeight;
        startx = 25;
        starty = 375;
        lengthx = canvasContainer.clientWidth-50;
    }
    unitx = (lengthx)/aArraySize;
    setObjectArray();
    drawObjectArray();
});
  

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
//Array contaning the numbers
var aArray = [];
//Array contaning objects to be drawn
var oArray = [];
//Initial Array size is 10
var aArraySize = 10;
//Initial array type is random
var aArrayType = "random";
setArray();

//Related to bubble sort
var pass = 0;
var cIndex = 0;
var counter = 0;

//Variables to cancle animation frames
//  required when pause or reset button is pressed
var requestID = "";

//Object to be drawn
function Block(index , value , x , y ){
    this.index = index;
    this.value = value;
    this.x = x;
    this.y = y;
    this.xl = unitx;
    this.yl = value*unity;
    
    this.draw = function(){
        c.beginPath();
        //default colour
        c.fillStyle = "#12D4E6";
        //To show comparison for bubble sort
        if(btnPlayA.disabled==true){
            if(this.index < pass + 1)
                c.fillStyle = "#08A8FC";
            else if(this.index == pass + 1)
                //c.fillStyle = "rgb(99, 142, 242)";
                c.fillStyle = "#08A8FC"; 
            else if (this.index == pass + 2)
                //c.fillStyle = "rgb(23, 255, 108)";
                c.fillStyle = "#07F270";
        }
        
        c.fillRect(this.x , this.y , this.xl , this.yl);
        c.strokeStyle = "blue";
        c.strokeRect(this.x , this.y , this.xl , this.yl)
    }
}

//function to reset everything
function reset(){
    oArray = [];
    aArray = [];
    aArraySize = 10;
    aArrayType = "random";

    //Related to bubble sort algorithm
    pass = 0;
    cIndex = 0;

    unitx = lengthx/aArraySize;
    setArray();

    //related to buttons
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
    cIndex = 0;
    unitx = lengthx/size;
    setArray();
}
//Function for tyoe of List toggle
function setListType(type_number){
    //Related to bubble sort algo
    pass = 0;
    cIndex = 0;

    type = "random";
    if(type_number == 2)
        type = "sorted wrong";
    if(type_number == 3)
        type = "sorted";  
        
    //Setting btn according to button pressed
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
}

//set object array
function setObjectArray(){
    oArray = [];
    for(var i = 0 ; i < aArraySize ; i++){
        oArray.push(new Block(i , aArray[i] , startx+(i*unitx) , starty - (aArray[i]*unity) ));
    }
}

//Draw objects whenever reset
function drawObjectArray(){
    c.clearRect(0 , 0 , canvas.width , canvas.height);
    for(var i = 0 ; i < aArraySize ; i++){
        oArray[i].draw();
    }
}

//Function to animate bubble sort
function sortAnimate(){
    
    requestID = requestAnimationFrame(sortAnimate);
    if(pass >= aArraySize - 1 - cIndex){
        pass = 0;
        counter = 0;
        cIndex++;
    }
    if(aArray[pass] > aArray[pass + 1]){
        //array updated
        var temp = aArray[pass];
        aArray[pass] = aArray[pass+1];
        aArray[pass+1] = temp;
    }
    else{
        counter++;
    }
    if(counter >= aArraySize-1-cIndex){
        pauseA();
    }
    setObjectArray();
        c.clearRect(0 , 0 , canvas.width , canvas.height);
        for(var i = 0 ; i < aArraySize ; i++){
            oArray[i].draw();
        }
    
    pass++;
}




//Function for controls
//For play
btnPlayA.addEventListener("click",(e) => {

    btnsAfterPlay();

    counter = 0;
    sortAnimate();
    //sort();
   
});

//For pause
btnPauseA.addEventListener("click",(e) => {
    cancelAnimationFrame(requestID);
    console.log("pauseed");
    btnsAfterPause();
});

//For reset
btnResetA.addEventListener("click",(e) => {
    console.log("animation stopped");
    cancelAnimationFrame(requestID);
    resetBtns();
    reset();
});

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

function pauseA(){
    cancelAnimationFrame(requestID);
    console.log("paused");
    btnsAfterPause();

    pass = 0;
    cIndex = 0;
    counter = 0;
}


function btnsAfterPause() {
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

function btnsAfterPlay() {
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
    
}





