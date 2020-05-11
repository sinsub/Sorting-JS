

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
var aArraySize = 10;
var aArrayType = "random";
setArray();

//Variables for animation frames;
var requestID = "";

//variables for swaps

//function to reset everything
function reset(){
    aArray = [];
    aArraySize = 10;
    aArrayType = "random";
    setArray();
    btnPlayA.disabled = false;
    btnPauseA.disabled = true;
}

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

    console.log(aArray);
    resetAnimation();
}

//Reset function also initialiser
function resetAnimation(){
    //Bottom line:
    c.clearRect(0 , 0 , 1200 , 600);
    c.beginPath();
    c.fillStyle="blue";
    c.fillRect(startx - 50,starty,startx + lengthx + 50,5);
    tUnitx = (lengthx)/aArraySize;
    unitx = tUnitx;

    for(var i = 0 ; i < aArraySize ; i++){
        c.beginPath();
        var x = startx + tUnitx*i;
        var y = starty - unity*aArray[i];
        c.fillStyle = "blue";
        c.strokeRect(x , y , unitx , unity*aArray[i]);
        c.fillStyle = "yellow";
        c.fillRect(x , y , unitx , unity*aArray[i]);
        c.fillStyle = "blue";
        c.fillText(aArray[i], x-1 , y-1);
    }


}
//Function to reset btns
function resetBtns(){
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
//Function for controls
//For play
btnPlayA.addEventListener("click",(e) => {
    //sortAndDraw();
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
    console.log("pause");
    btnPlayA.disabled = false;
    btnPauseA.disabled = true;
});
//For reset
btnResetA.addEventListener("click",(e) => {
    console.log("stop animation");
    resetBtns();
    reset();
});

/*
//functon to sort as well as animate :
function sortAndDraw() {
    //requestID = requestAnimationFrame(sortAndDraw);
    //resetAnimation();
}

function sort(){
    for (var i1 = 0 ; i1 < aArraySize-1 ; i1++){
        for(var j1 = 0 ; j1 < aArraySize-i-1 ; j1++){
            if(aArray[j1]>aArray[j1+1]){
                obj1.x = startx + tUnitx*j1;
                obj1.y = starty - unity*aArray[j1];
                obj2.x = startx + tUnitx*(j1+1);
                obj2.y = starty - unity*aArray[j1+1];
                obj1.dx = (obj2.x - obj1.x)/10;
                obj2.dx = (obj1.x - obj2.x)/10;
                swapAnimation(j1);
                wait(1000);
            }
            j++;
        }
        i++;
    } 
}

function swapAnimation(j1){
    var requestID = requestAnimationFrame(swapAnimation(j1));
    c.clearRect(0 , 0 , 1200 , 600);
    c.beginPath();
    c.fillStyle="blue";
    c.fillRect(startx - 50,starty,startx + lengthx + 50,5);
    tUnitx = (lengthx)/aArraySize;
    unitx = tUnitx - spacex;

    for(var i = 0 ; i < aArraySize ; i++){
        c.beginPath();
        var x = startx + tUnitx*i;
        var y = starty - unity*aArray[i];
        c.fillStyle = "blue";
        c.strokeRect(x , y , unitx , unity*aArray[i]);
        c.fillStyle = "yellow";
        c.fillRect(x , y , unitx , unity*aArray[i]);
        c.fillStyle = "blue";
        c.fillText(aArray[i], x-1 , y-1);
    }

    c.beginPath();
    c.fillStyle = "blue";
    c.fillRect(obj1.x, obj1.y , unitx , aArray[j1]*unity);
    c.fillRect(obj2.x, obj2.y , unitx , aArray[j1+1]*unity);
    if(obj1.x < obj2.x){
        obj1.x += obj1.dx;
        obj2.x += obj2.dx;
    } 
    else{
        cancelAnimationFrame(requestID);
        var temp = aArray[j1];
        aArray[j1] = aArray[j1+1];
        aArray[j1+1] = temp;
    }

}

//function to delay
function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        console.log("hey")
      end = new Date().getTime();
   }
 }
*/
//Function for resizing canvas not needed
/*
window.addEventListener("resize",function(){
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    console.log(canvas);
});
*/





