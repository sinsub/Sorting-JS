//Div that contains the canvas:
var canvasContainer = document.getElementById("a");

//Canvas for animation :
var canvas = document.querySelector('canvas');
//Constants for canvas
var startx = 0;
var starty = 0;
var lengthx = 0;
var lengthy = 0;
//for resizability
var c = canvas.getContext("2d");
const maxCanvasW = 1100;
const canvasHeight = 500;

if(window.innerWidth >= 1100){
    canvas.width = maxCanvasW
    canvas.height = canvasHeight;
     startx = 50;
     starty = 400;
     lengthx = 1000;

}
else {
    canvas.width = window.innerWidth;
    canvas.height = canvasHeight;
     startx = 25;
     starty = 400;
     lengthx = window.innerWidth - 100;
}
//Variable for canvas
var tUnitx = (lengthx)/10;
var unitx = tUnitx;
const unity = 3;  

window.addEventListener("resize", (e) => {
    if(window.innerWidth >= 1200){
        canvas.width = maxCanvasW
        canvas.height = canvasHeight;
         startx = 50;
         starty = 400;
         lengthx = 1000;
    
    }
    else {
        canvas.width = window.innerWidth;
        canvas.height = canvasHeight;
         startx = 25;
         starty = 400;
         lengthx = window.innerWidth - 100;
    }
    tUnitx = (lengthx)/aArraySize;
    unitx = tUnitx;
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
        c.fillStyle = "yellow";

        //To show comparisons for insertion sort

        if(btnPlayA.disabled==true){
            if(this.index == current )
                c.fillStyle = "blue"; 
            else if (this.index == current - 1)
                c.fillStyle = "green";
            else if (this.index == pass)
                c.fillStyle = "orange";
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
    c.clearRect(0 , 0 , 1200 , 600);
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
    c.clearRect(0,0,1200,600);
    for(var i = 0 ; i < aArraySize ; i++){
        oArray[i].draw();
    }    
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
    console.log("paused");
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


    pass = 1;
    current = pass;
}






