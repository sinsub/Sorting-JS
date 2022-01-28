// CSS class names
const ARRAY_ELEMENT_CLASS = "array-element";
const COMPARED_ELEMENT_CLASS = "compared-element";
const SWAP_ELEMENT_CLASS = "swap-element";
const ACTIVE_SLICE_CLASS = "active-slice";
const modificationClasses = [COMPARED_ELEMENT_CLASS, SWAP_ELEMENT_CLASS];

const ARRAY_TYPES = ["random", "sorted", "descending", "someInversions"];
const SORT_TYPES = ["bubble", "selection", "insertion", "shell", "merge", "quick", "randomisedQuick", "threewayQuick"];
const REPETITION_TYPES = ["none", "some", "high"];

let arraySize = 32;
let elementWidth = getWidth(arraySize);
let arrayType = ARRAY_TYPES[0];
let keyRepetition = REPETITION_TYPES[0];
let sortType = SORT_TYPES[0];
let delay = 10;    // in ms
let _array = [];

let array = [];
let divArray = [];

let auxArray = [];
let auxDivArray = [];
let auxElementWidth = 0;

// render variables:
let totalDelay = 0;
let modifiedElements = [];
let comparesCount = 0;
let swapCount = 0;
let renderQueue = [];
let activeSliceStack = [];

// status
let loaded = false;


// <----- ----- ----- DOM elements ----- ----- -----> //

// Canvas to animate
const canvas = document.getElementById("canvas");

const auxCanvas = document.getElementById("auxCanvas");
const auxCanvasContainer = document.getElementById("auxCanvasContainer");

// Select Array Type
const selectArrayType = document.getElementById("selectArrayType");
selectArrayType.onchange = () => {
    arrayType = selectArrayType.value;
    createArray();
}

// Select Array Type
const selectKeyRepetition = document.getElementById("selectKeyRepetition");
selectKeyRepetition.onchange = () => {
    keyRepetition = selectKeyRepetition.value;
    createArray();
}


// Select Array Size
const labelRangeArraySize = document.getElementById("labelRangeArraySize");
const rangeArraySize = document.getElementById("rangeArraySize");
rangeArraySize.onchange = () => {
    labelRangeArraySize.innerHTML = `Array Size: ${rangeArraySize.value}`;
    arraySize = rangeArraySize.value;
    elementWidth = getWidth(arraySize);
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


function getWidth(arraySize) {
    return Math.floor((100 / arraySize) * 1000) / 1000;
}


// create and load a new array
function createArray() {
    _array = generateArray(arraySize, keyRepetition, arrayType);
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
    activeSliceStack = [];

    auxArray = [];
    auxDivArray = [];

    auxCanvas.innerHTML = "";
    auxCanvasContainer.style.display = "none";
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
        const elemDiv = createElementDiv(height, elementWidth);
        divArray.push(elemDiv);
        canvas.appendChild(elemDiv);
    }
    loaded = true;
    btnSort.disabled = false;
}


// aux array
function createAux(size) {
    size = +size;
    auxArray = Array(size).fill(0, 0);
    auxElementWidth = getWidth(size);
    auxCanvasContainer.style.display = "block";
    auxCanvas.innerHTML = "";
    for (let height of auxArray) {
        const elemDiv = createElementDiv(height, auxElementWidth);
        elemDiv.classList.add(ACTIVE_SLICE_CLASS);
        auxDivArray.push(elemDiv);
        auxCanvas.appendChild(elemDiv);
    }
}



function sort() {
    btnSort.disabled = true;

    if (!loaded) loadArray();
    loaded = false;

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
        case "merge":
            mergeSort();
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
        height = 10 + (Math.random() * 90);
        array.push(height);
    }
    return array;
}


function getRepeatedKeysArray(arraySize) {
    let keys = getRandomArray(Math.sqrt(arraySize));
    let array = [];
    for (let i = 0; i < arraySize; i++) {
        array.push(keys[Math.floor(Math.random() * (keys.length))]);
    }
    return array;
}


function generateKeys(arraySize, keyRepetition) {
    let numberOfKeys;
    switch (keyRepetition) {
        case "none":
            numberOfKeys = arraySize;
            break;
        case "some":
            numberOfKeys = Math.sqrt(arraySize);
            break;
        case "high":
            numberOfKeys = Math.sqrt(Math.sqrt(arraySize));
            break;
        default:
            numberOfKeys = arraySize;
    }
    return getRandomArray(numberOfKeys);
}


function createsomeInversions(array) {
    // not really some but okay 
    let pseudosomeNumber = Math.sqrt(Math.sqrt(array.length));
    for (let i = 0; i < pseudosomeNumber; i++) {
        const j = Math.floor(Math.random() * (array.length));
        const k = Math.floor(Math.random() * (array.length));
        [array[k], array[j]] = [array[j], array[k]];
    }
}


function generateArray(arraySize, keyRepetition, arrayType) {
    const keys = generateKeys(arraySize, keyRepetition);
    const array = [];
    for (let i = 0, j = 0; i < arraySize; i++, j = (j + 1) % keys.length) {
        array.push(keys[j]);
    }
    switch (arrayType) {
        case "random":
            shuffleArray(array);
            break;
        case "sorted":
            array.sort((a, b) => a - b);
            break;
        case "descending":
            array.sort((a, b) => b - a);
            break;
        case "someInversions":
            array.sort((a, b) => a - b);
            createsomeInversions(array);
            break;
        default:
            shuffleArray(array);
    }
    return array;
}


function shuffleArray(array) {
    for (let i = 0; i < array.length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// <----- ----- ----- ----- ----- ----- -----> //


// <----- basic operatios and their visualization -----> 

function createElementDiv(height, width) {
    const element = document.createElement("div");
    element.style.width = `${width}%`;
    element.style.height = `${height}%`;
    element.className = ARRAY_ELEMENT_CLASS;
    return element;
}





function v_less(i, j, elem1, elem2) {
    comparesCount++;
    const id = setTimeout((elem1, elem2, resetElems) => {
        resetModifiedElements(resetElems);
        elem1.classList.add(COMPARED_ELEMENT_CLASS)
        elem2.classList.add(COMPARED_ELEMENT_CLASS);
    }, totalDelay, elem1, elem2, modifiedElements);
    renderQueue.push(id);
    totalDelay += delay;
    modifiedElements = [];
    modifiedElements.push(elem1);
    modifiedElements.push(elem2);
    return i < j;
}


function v_swap(i, j) {
    if (i === j) return;
    swapCount++;
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;

    const id1 = setTimeout((delay, elem1, elem2, resetElems) => {
        resetModifiedElements(resetElems);
        elem1.classList.add(SWAP_ELEMENT_CLASS)
        elem2.classList.add(SWAP_ELEMENT_CLASS);

        // translating?
        let x = elem1.offsetLeft - elem2.offsetLeft;
        elem1.style.zIndex = "1";
        elem2.style.zIndex = "1";
        elem1.style.transition = `transform ${delay}ms ${delay * 0.5}ms ease-out`
        elem2.style.transition = `transform ${delay}ms ${delay * 0.5}ms ease-out`
        elem1.style.transform = `translateX(${-x}px)`;
        elem2.style.transform = `translateX(${x}px)`;

    }, totalDelay, delay, divArray[i], divArray[j], modifiedElements);
    totalDelay += 2 * delay;
    renderQueue.push(id1);
    modifiedElements = [];
    modifiedElements.push(divArray[i]);
    modifiedElements.push(divArray[j]);

    const id2 = setTimeout((elem1, height1, elem2, height2, resetElems) => {
        // console.log("rendering...");
        resetModifiedElements(resetElems);
        elem1.style.zIndex = "auto";
        elem2.style.zIndex = "auto";
        elem1.style.transition = "transform 0ms"
        elem2.style.transition = "transform 0ms"
        elem1.style.transform = `translateX(0)`;
        elem2.style.transform = `translateX(0)`;

        elem1.style.height = `${height1}%`;
        elem2.style.height = `${height2}%`;
    }, totalDelay, divArray[i], array[i], divArray[j], array[j], modifiedElements);
    totalDelay += delay;
    renderQueue.push(id2);
    modifiedElements = [];
}

function resetModifiedElements(modifiedElements) {
    for (let elem of modifiedElements)
        for (let className of modificationClasses)
            elem.classList.remove(className);
}

function queueOnCompleteHandler() {
    const id = setTimeout((modifiedElements) => {
        console.log("final render");
        console.log(comparesCount);
        console.log(swapCount);
        console.log(totalDelay);
        resetModifiedElements(modifiedElements);
        resetRenderVariables();

    }, totalDelay, modifiedElements);
    renderQueue.push(id);
    modifiedElements = [];
}


function v_pushActiveSlick(i, j) {
    let oldSlice = [];
    if (activeSliceStack.length > 0) {
        [x, y] = activeSliceStack[activeSliceStack.length - 1];
        oldSlice = divArray.slice(x, y + 1);
    }

    activeSliceStack.push([i, j]);
    let slice = divArray.slice(i, j + 1);

    const id = setTimeout((slice, oldSlice, resetElems) => {
        resetModifiedElements(resetElems);
        for (let elem of oldSlice)
            elem.classList.remove(ACTIVE_SLICE_CLASS);
        for (let elem of slice)
            elem.classList.add(ACTIVE_SLICE_CLASS);
    }, totalDelay, slice, oldSlice, modifiedElements);

    totalDelay += delay;
    renderQueue.push(id);
    modifiedElements = [];
}

function v_popActiveSlice() {
    [i, j] = activeSliceStack.pop();
    const slice1 = divArray.slice(i, j + 1);

    let slice2 = [];
    if (activeSliceStack.length > 0) {
        [x, y] = activeSliceStack[activeSliceStack.length - 1];
        slice2 = divArray.slice(x, y + 1);
    }

    const id = setTimeout((slice1, slice2, resetElems) => {
        resetModifiedElements(resetElems);
        for (let elem of slice1)
            elem.classList.remove(ACTIVE_SLICE_CLASS);
        for (let elem of slice2)
            elem.classList.add(ACTIVE_SLICE_CLASS);
    }, totalDelay, slice1, slice2, modifiedElements);

    totalDelay += delay;
    renderQueue.push(id);
    modifiedElements = [];
}


function v_replaceActiveSlice(i, j) {
    let oldSlice = [];
    if (activeSliceStack.length > 0) {
        [x, y] = activeSliceStack[activeSliceStack.length - 1];
        oldSlice = divArray.slice(x, y + 1);
        activeSliceStack.pop();
    }

    activeSliceStack.push([i, j]);
    let slice = divArray.slice(i, j + 1);

    const id = setTimeout((slice, oldSlice, resetElems) => {
        resetModifiedElements(resetElems);
        for (let elem of oldSlice)
            elem.classList.remove(ACTIVE_SLICE_CLASS);
        for (let elem of slice)
            elem.classList.add(ACTIVE_SLICE_CLASS);
    }, totalDelay, slice, oldSlice, modifiedElements);

    totalDelay += delay;
    renderQueue.push(id);
    modifiedElements = [];
}


function v_assignToAux(i, j) {
    auxArray[i] = array[j];
    const id = setTimeout((elem1, elem2, height, resetElems) => {
        resetModifiedElements(resetElems);
        elem1.classList.add(SWAP_ELEMENT_CLASS);
        elem2.classList.add(SWAP_ELEMENT_CLASS);
        elem1.style.height = `${height}%`;
        // console.log(elem1, elem2, height);
    }, totalDelay, auxDivArray[i], divArray[j], array[j], modifiedElements);

    totalDelay += delay;
    renderQueue.push(id);
    modifiedElements = [];
    modifiedElements.push(auxDivArray[i]);
    modifiedElements.push(divArray[j]);
}


function v_assignFromAux(i, j) {
    array[i] = auxArray[j];
    const id = setTimeout((elem1, elem2, height, resetElems) => {
        resetModifiedElements(resetElems);
        elem1.classList.add(SWAP_ELEMENT_CLASS);
        elem2.classList.add(SWAP_ELEMENT_CLASS);
        elem1.style.height = `${height}%`;
    }, totalDelay, divArray[i], auxDivArray[j], auxArray[j], modifiedElements);

    totalDelay += delay;
    renderQueue.push(id);
    modifiedElements = [];
    modifiedElements.push(divArray[i]);
    modifiedElements.push(auxDivArray[j]);
}


// <----- ----- ----- ----- ----- ----- -----> //


// <----- ----- ----- Sorts ----- ----- -----> //


function bubbleSort() {
    v_pushActiveSlick(0, array.length - 1);
    let n = array.length;
    let swapped = true;
    while (swapped) {
        swapped = false;
        for (let i = 1; i < n; i++) {
            if (v_less(array[i], array[i - 1], divArray[i], divArray[i-1])) {
                v_swap(i, i - 1);
                swapped = true;
            }
        }
    }
    v_popActiveSlice();
}

function insertionSort() {
    v_pushActiveSlick(0, 1);
    for (let i = 1; i < array.length; i++) {
        v_replaceActiveSlice(0, i);
        for (let j = i - 1; j >= 0; j--) {
            if (!v_less(array[j + 1], array[j], divArray[j + 1], divArray[j])) break;
            v_swap(j + 1, j);
        }
    }
    v_popActiveSlice();
}

function selectionSort() {
    v_pushActiveSlick(0, array.length - 1);
    for (let i = 0; i < array.length; i++) {
        v_replaceActiveSlice(i, array.length - 1);
        let minIdx = i;
        for (let j = i + 1; j < array.length; j++) {
            if (v_less(array[j], array[minIdx], divArray[j], divArray[minIdx])) minIdx = j;
        }
        v_swap(i, minIdx);
    }
    v_popActiveSlice();
}


function shellSort() {
    v_pushActiveSlick(0, array.length - 1);

    let n = array.length;
    let h = 1;
    while (h < Math.floor(n / 3)) h = 3 * h + 1;
    while (h >= 1) {
        for (let i = h; i < n; i++) {
            for (let j = i; j >= h; j -= h) {
                if (!v_less(array[j], array[j - h], divArray[j], divArray[j - h])) break;
                v_swap(j, j - h);
            }
        }
        h = Math.floor(h / 3);
    }
}


function partition(lo, hi) {
    if (hi <= lo) return lo;
    v_pushActiveSlick(lo, hi);
    let i = lo + 1, j = hi;
    while (i <= j) {
        if (v_less(array[i], array[lo], divArray[i], divArray[lo])) i++;
        else if (v_less(array[lo], array[j], divArray[lo], divArray[j])) j--;
        else v_swap(i++, j--);
    }
    v_swap(lo, j);
    v_popActiveSlice();
    return j;
}


function _quickSort(lo, hi) {
    if (hi <= lo) return;
    v_pushActiveSlick(lo, hi);
    let j = partition(lo, hi);
    _quickSort(lo, j - 1);
    _quickSort(j + 1, hi);
    v_popActiveSlice();

}



function quickSort() {
    _quickSort(0, array.length - 1);
}


function randomisedQuickSort() {
    shuffle();
    quickSort();
}

function shuffle() {
    v_pushActiveSlick(0, 0);
    for (let i = 0; i < array.length; i++) {
        v_replaceActiveSlice(0, i);
        let r = Math.floor(Math.random() * (i + 1));
        v_swap(i, r);
    }
    v_popActiveSlice();
}


function _threeWayQuickSort(lo, hi) {
    if (hi <= lo) return;
    v_pushActiveSlick(lo, hi);
    let i = lo, j = lo + 1, k = hi;
    while (j <= k) {
        if (v_less(array[j], array[i], divArray[j], divArray[i]))
            v_swap(i++, j++);
        else if (v_less(array[i], array[j], divArray[i], divArray[j]))
            v_swap(j, k--);
        else j++;
    }
    _threeWayQuickSort(lo, i - 1);
    _threeWayQuickSort(j, hi);
    v_popActiveSlice();
}


function threeWayQuickSort() {
    shuffle();
    _threeWayQuickSort(0, array.length - 1);
}



function merge(lo, mid, hi) {
    for (let k = lo; k <= hi; k++) {
        v_assignToAux(k, k);
    }
    let i = lo, j = mid + 1;
    for (let k = lo; k <= hi; k++) {
        if (i > mid) v_assignToAux(k, j++);
        else if (j > hi) v_assignFromAux(k, i++);
        else if (v_less(auxArray[j], auxArray[i], auxDivArray[j], auxDivArray[i]))
            v_assignFromAux(k, j++);
        else v_assignFromAux(k, i++);
    }
}


function _mergeSort(lo, hi) {
    if (hi <= lo) return;
    v_pushActiveSlick(lo, hi);
    let mid = Math.floor(lo + (hi - lo) / 2);
    _mergeSort(lo, mid);
    _mergeSort(mid + 1, hi);
    if (!v_less(array[mid + 1], array[mid], divArray[mid + 1], divArray[mid])) {
        v_popActiveSlice(lo, hi);
        return;
    }
    merge(lo, mid, hi);
    v_popActiveSlice(lo, hi);
}


function mergeSort() {
    createAux(arraySize);
    _mergeSort(0, array.length - 1);
}


// <----- ----- ----- ----- ----- ----- -----> //