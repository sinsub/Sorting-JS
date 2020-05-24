//Main: #12D4E6
//Diff1: #07E6B2
//Diff2: #07F270
//Main dark: #0763F2
//Almost main: #08A8FC
//Div that contains the canvas:
var canvasContainer = document.getElementById("canvas_container");

//Canvas for animation :
var canvas = document.querySelector('canvas');
//Constants for canvas
var startx = 0;
var starty = 0;
var lengthx = 0;
//for resizability
var c = canvas.getContext("2d");
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
//Variable for canvas
var unitx = (lengthx)/10;
const unity = 3;  

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
var aArray = [];
var oArray = [];
var aArraySize = 10;
var aArrayType = "random";
setArray();

//Related to insertion sort
var pass = 1;
var current = 1;

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
        c.beginPath();
        //default colour
        c.fillStyle = "#12D4E6";

        //To show comparisons for insertion sort

        if(btnPlayA.disabled==true){
            if(this.index == current )
                c.fillStyle = "#07E6B2"; 
            else if (this.index == current - 1)
                c.fillStyle = "#07F270";
            else if (this.index == pass)
                c.fillStyle = "#0763F2";
            else if(this.index < pass){
                c.fillStyle = "#08A8FC";
            }
        }
        
        c.fillRect(this.x , this.y , this.xl , this.yl);
        c.fillStyle = "blue";
        c.strokeRect(this.x , this.y , this.xl , this.yl)
    }
}

//function to reset everything
function reset(){
    oArray = [];
    aArray = [];
    aArraySize = 10;
    aArrayType = "random";

    //Related to insertion sort algorithm
    pass = 1;
    current = 1

    unitx = lengthx/aArraySize;
    setArray();

    //related to buttons
    btnPlayA.disabled = false;
    btnPauseA.disabled = true;
    
}

//Function for Size of List toggle
function setListSize(size){
    pass = 1; 
    current = 1;
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
    //Related to insertion sort algo
    pass = 1;
    current = 1;

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

//Function to animate insertion sort
function sortAnimate(){
    
    requestID = requestAnimationFrame(sortAnimate);
    if(pass > aArraySize - 1){
        pass = 1;
        current = pass;
        pauseA();
    }else if(current == 0){
        pass++;
        current = pass;
    } else {
        if(aArray[current]<aArray[current-1]){
            //swap
            var temp = aArray[current];
            aArray[current] = aArray[current-1];
            aArray[current-1] = temp;
            //update Object Array
            setObjectArray();
            current--;
        }
        else {
            pass++;
            current = pass;
        }
    } 
    
    //update object array:
    //setObjectArray();
    //Draw the updated array
    c.clearRect(0 , 0 , canvas.width , canvas.height);
    for(var i = 0 ; i < aArraySize ; i++){
        oArray[i].draw();
    }    
}




//Function for controls
//For play
btnPlayA.addEventListener("click",(e) => {
    
    btnsAfterPlay();

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

function pauseA(){
    cancelAnimationFrame(requestID);
    console.log("paused");
    btnsAfterPause();


    pass = 1;
    current = pass;
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



