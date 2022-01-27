// CSS class names
const ARRAY_ELEMENT_CLASS = "array-element";
const COMPARED_ELEMENT_CLASS = "compared-element";

const ARRAY_TYPES = ["random", "sorted", "descending"];
const SORT_TYPES = ["bubble", "selection", "insertion", "shell", "quick", "merge"];

let arraySize = 32;
let elementWidth = 80 / arraySize;
let arrayType = ARRAY_TYPES[0];
let sortType = SORT_TYPES[0];
let delay = 10;    // in ms
let _array = [];

let array = [];
let divArray = [];

// render variables:
let totalDelay = 0;
let modifiedElements = [];
let comparesCount = 0;
let swapCount = 0;
let renderQueue = [];

// status
let loaded = false;


// <----- ----- ----- DOM elements ----- ----- -----> //

// Canvas to animate
const canvas = document.getElementById("canvas");

// Select Array Type
const selectArrayType = document.getElementById("selectArrayType");
selectArrayType.onchange = () => {
    arrayType = selectArrayType.value;
    createArray();
}

// Select Array Size
const labelRangeArraySize = document.getElementById("labelRangeArraySize");
const rangeArraySize = document.getElementById("rangeArraySize");
rangeArraySize.onchange = () => {
    labelRangeArraySize.innerHTML = `Array Size: ${rangeArraySize.value}`;
    arraySize = rangeArraySize.value;
    elementWidth = 80 / arraySize;
    createArray();
}
const setRangeArraySize = (value) => {
    rangeArraySize.value = value;
    labelRangeArraySize.innerHTML = `Array Size: ${rangeArraySize.value}`;
}
setRangeArraySize(arraySize);

// Create new Array
const btnNewArray = document.getElementById("btnNewArray");
btnNewArray.onclick = () => {
    createArray()
}

// Select Algorithm
const selectAlgorithm = document.getElementById("selectAlgorithm");
selectAlgorithm.onchange = () => {
    sortType = selectAlgorithm.value;
    loadArray();
}

// Set Delay
const labelRangeDelay = document.getElementById("labelRangeDelay");
const rangeDelay = document.getElementById("rangeDelay");
rangeDelay.onchange = () => {
    labelRangeDelay.innerHTML = `Delay: ${rangeDelay.value} ms`;
    delay = +rangeDelay.value;
    loadArray();
}
const setRangeDelay = (value) => {
    rangeDelay.value = value;
    labelRangeDelay.innerHTML = `Delay: ${rangeDelay.value} ms`;
}
setRangeDelay(delay);

// Sort
const btnSort = document.getElementById("btnSort");
btnSort.onclick = () => {
    sort();
}
btnSort.disabled = true;


// Reset
const btnReset = document.getElementById("btnReset");
btnReset.onclick = () => {
    loadArray();
}

// <----- ----- ----- ----- ----- ----- ----->


createArray();


// create and load a new array
function createArray() {
    switch (arrayType) {
        case "random":
            _array = getRandomArray(arraySize);
            break;
        case "sorted":
            _array = getSortedArray(arraySize);
            break;
        case "descending":
            _array = getDescendingArray(arraySize);
            break;
        case "repeatedKeys":
            _array = getRepeatedKeysArray(arraySize);
            break;
        default: _array = getRandomArray(arraySize);
    }
    loadArray();
}


// reset the render variables
function resetRenderVariables() {
    while (renderQueue.length > 0)
        clearTimeout(renderQueue.pop());
    totalDelay = 0;
    modifiedElements = [];
    comparesCount = 0;
    swapCount = 0;
}

// loads _array for sorting and 
// resets the render variables
function loadArray() {
    // reset render variables
    resetRenderVariables();

    array = [..._array];
    divArray = [];
    canvas.innerHTML = "";
    for (let height of array) {
        const elemDiv = createElementDiv(height);
        divArray.push(elemDiv);
        canvas.appendChild(elemDiv);
    }
    loaded = true;
    btnSort.disabled = false;
}


function sort() {
    if (!loaded) loadArray();
    loaded = false;
    btnSort.disabled = true;
    switch (sortType) {
        case "bubble":
            bubbleSort();
            break;
        case "selection":
            selectionSort();
            break;
        case "insertion":
            insertionSort();
            break;
        case "shell":
            shellSort();
            break;
        case "quick":
            quickSort();
            break;
        case "randomisedQuick":
            randomisedQuickSort();
            break;
        case "threewayQuick":
            threeWayQuickSort();
            break;
        default: return;
    }

    queueOnCompleteHandler();
}


// <----- Generate different types of array -----> //

function getRandomArray(arraySize) {
    const array = [];
    for (let i = 0; i < arraySize; i++) {
        height = Math.random() * 100;
        array.push(height);
    }
    return array;
}

function getSortedArray(arraySize) {
    const array = getRandomArray(arraySize);
    array.sort((a, b) => a - b);
    return array;
}

function getDescendingArray(arraySize) {
    const array = getRandomArray(arraySize);
    array.sort((a, b) => b - a);
    return array;
}


function getRepeatedKeysArray(arraySize) {
    let keys = getRandomArray(Math.sqrt(Math.sqrt(arraySize)));
    let array = [];
    for (let i = 0; i < arraySize; i++) {
        array.push(keys[Math.floor(Math.random() * (keys.length))]);
    }
    console.log(array);
    return array;
}

// <----- ----- ----- ----- ----- ----- -----> //


// <----- basic operatios and their visualization -----> 

function createElementDiv(height) {
    const element = document.createElement("div");
    element.style.width = `${elementWidth}%`;
    element.style.height = `${height}%`;
    element.className = ARRAY_ELEMENT_CLASS;
    return element;
}





function less(i, j) {
    comparesCount++;
    const id = setTimeout((elem1, elem2, ...resetElems) => {
        // console.log("rendering...");
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
    swapCount++;
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;

    const id = setTimeout((elem1, height1, elem2, height2, ...resetElems) => {
        // console.log("rendering...");
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
        console.log(comparesCount);
        console.log(swapCount);
        console.log(totalDelay);
        resetModifiedElements(...modifiedElements);
        resetRenderVariables();

    }, totalDelay, ...modifiedElements);
    renderQueue.push(id);
    modifiedElements = [];
}


// <----- ----- ----- ----- ----- ----- -----> //


// <----- ----- ----- Sorts ----- ----- -----> //


function bubbleSort() {
    let n = array.length;
    let swapped = true;
    while (swapped) {
        swapped = false;
        for (let i = 1; i < n; i++) {
            if (less(i, i - 1)) {
                swap(i, i - 1);
                swapped = true;
            }
        }
    }
}

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


function shellSort() {
    let n = array.length;
    let h = 1;
    while (h < Math.floor(n / 3)) h = 3 * h + 1;
    while (h >= 1) {
        for (let i = h; i < n; i++) {
            for (let j = i; j >= h; j -= h) {
                if (!less(j, j - h)) break;
                swap(j, j - h);
            }
        }
        h = Math.floor(h / 3);
    }
}


function partition(lo, hi) {
    if (hi <= lo) return lo;
    let i = lo + 1, j = hi;
    while (i <= j) {
        if (less(i, lo)) i++;
        else if (less(lo, j)) j--;
        else swap(i++, j--);
    }
    swap(lo, j);
    return j;
}


function _quickSort(lo, hi) {
    if (hi <= lo) return;
    let j = partition(lo, hi);
    _quickSort(lo, j-1);
    _quickSort(j+1, hi);
}



function quickSort() {
    _quickSort(0, array.length - 1);
}


function randomisedQuickSort() {
    shuffle();
    quickSort();
}

function shuffle() {
    for (let i = 0; i < array.length; i++) {
        let r = Math.floor(Math.random() * (i+1));
        swap(i, r);
    }
}


function _threeWayQuickSort(lo, hi) {
    if (hi <= lo) return;
    let i = lo, j = lo + 1, k = hi;
    while (j <= k) {
        if (less(j, i)) 
            swap(i++, j++);
        else if (less(i, j))
            swap(j, k--);
        else j++;
    }
    _threeWayQuickSort(lo, i - 1);
    _threeWayQuickSort(j, hi);
}


function threeWayQuickSort() {
    shuffle();
    _threeWayQuickSort(0, array.length-1);
}



// <----- ----- ----- ----- ----- ----- -----> //