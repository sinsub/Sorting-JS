const canvas = document.getElementById("canvas");

// class names
const ARRAY_ELEMENT_CLASS = "array-element";
const PIVOT_ELEMENT_CLASS = "pivot-element";
const COMPARED_ELEMENT_CLASS = "compared-element";
const SWAPPED_ELEMENT_CLASS = "swapped-element";

const ARRAY_TYPES = ["random"];
const SORT_TYPES = ["insertion", "selection"];

let arraySize = 50;
let elementWidth = 80 / arraySize;
let arrayType = ARRAY_TYPES[0];
let sortType = SORT_TYPES[0];
let array = [];
let divArray = [];
let delay = 10;    // in ms
let totalDelay = 0;
let modifiedElements = [];
let comparesCount = 0;
let swapCount = 0;
let renderQueue = [];

reset();

function reset() {
    while (renderQueue.length > 0) 
        clearTimeout(renderQueue.pop());

    [array, divArray] = createArray(arraySize, arrayType);
    loadArray(divArray);
    totalDelay = 0;
    modifiedElements = [];
    comparesCount = 0;
    swapCount = 0;
    sort();
}


function resetBtnClicked() {
    reset();
}


function loadArray() {
    canvas.innerHTML = "";
    for (let element of divArray) {
        canvas.appendChild(element);
    }
}

function sort() {
    switch(sortType) {
        case "insertion" :
            insertionSort();
            break;
        case "selection":
            selectionSort();
            break;
        default: return;
    }
    queueOnCompleteHandler();
}

// <----- Generate different types of array -----> //

function createArray(arraySize, arrayType) {
    switch (arrayType) {
        case "random":
            return getRandomArray(arraySize);
        default: return [[], []];
    }
}


function getRandomArray(arraySize) {
    const array = [];
    const divArray = [];
    for (let i = 0; i < arraySize; i++) {
        height = Math.random() * 100;
        array.push(height);
        divArray.push(createElement(height));
    }
    return [array, divArray];
}

function createElement(height) {
    const element = document.createElement("div");
    element.style.width = `${elementWidth}%`;
    element.style.height = `${height}%`;
    element.className = ARRAY_ELEMENT_CLASS;
    return element;
}


// <----- ----- ----- ----- ----- ----- -----> //


// <----- basic operatios and their visualization -----> 

function less(i, j) {
    comparesCount++;
    const id = setTimeout((elem1, elem2, ...resetElems) => {
        console.log("rendering...");
        resetModifiedElements(...resetElems);
        elem1.className = COMPARED_ELEMENT_CLASS;
        elem2.className = COMPARED_ELEMENT_CLASS;
    }, totalDelay, divArray[i], divArray[j], ...modifiedElements);
    renderQueue.push(id);
    totalDelay += delay;
    modifiedElements = [];
    modifiedElements.push(divArray[i]);
    modifiedElements.push(divArray[j]);
    return array[i] < array[j];
}


function swap(i, j) {
    if (i === j) return;

    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;

    const id = setTimeout((elem1, height1, elem2, height2, ...resetElems) => {
        console.log("rendering...");
        resetModifiedElements(...resetElems);
        elem1.style.height = `${height1}%`;
        elem2.style.height = `${height2}%`;
    }, totalDelay, divArray[i], array[i], divArray[j], array[j], ...modifiedElements);
    renderQueue.push(id);
    totalDelay += delay;
    modifiedElements = [];
}

function resetModifiedElements(...modifiedElements) {
    for (let elem of modifiedElements) 
        elem.className = ARRAY_ELEMENT_CLASS;
}

function queueOnCompleteHandler() {
    const id = setTimeout((...modifiedElements) => {
        console.log("final render");
        resetModifiedElements(...modifiedElements);

    }, totalDelay, ...modifiedElements);
    renderQueue.push(id);
    modifiedElements = [];
}


// <----- ----- ----- ----- ----- ----- -----> //


// <----- Sorts ----->

function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        for (let j = i - 1; j >= 0; j--) {
            if (!less(j + 1, j)) break;
            swap(j + 1, j);
        }
    }

}

function selectionSort() {
    for (let i = 0; i < array.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < array.length; j++) {
            if (less(j, minIdx)) minIdx = j;
        }
        swap(i, minIdx);
    }
}