
// variables

const canvas = _("canvasID");
const context = canvas.getContext('2d');
let interval = null;
let mainBoxX = 10,
    mainBoxY = 10,
    speed = 100,     // change this to handle refresh speed
    totalColumns = canvas.clientWidth / 10,
    snakeLength = 3,
    gridSide = canvas.clientWidth / totalColumns,
    refreshX = 0,
    refreshY = 0,
    appleLocation = null
    ;

let snakeBlockQueue = [{
    x: mainBoxX,
    y: mainBoxY
}]

// variables

window.onload = e => {
    context.fillStyle = "lime";
    context.fillRect(mainBoxX, mainBoxY, gridSide, gridSide);

    appleLocation = setRedBlock();
    context.fillStyle = "red";
    context.fillRect(appleLocation.x, appleLocation.y, gridSide, gridSide);


}

window.onkeydown = e => {
    // console.log(e)
    // key Codes
    // 37 -> left
    // 38 -> up
    // 39 -> right
    // 40 -> down


    refreshFrameStartFunc();


    if (e.keyCode == 37 && refreshX == 0) {
        refreshY = 0;
        refreshX = -gridSide;
    }
    else if (e.keyCode == 38 && refreshY == 0) {
        refreshX = 0;
        refreshY = -gridSide;
    }
    else if (e.keyCode == 39 && refreshX == 0) {
        refreshY = 0;
        refreshX = gridSide;
    }
    else if (e.keyCode == 40 && refreshY == 0) {
        refreshX = 0;
        refreshY = gridSide;

    }
}

//android butons funcion 

function upClickFunc() {
    refreshFrameStartFunc();


    refreshX = 0;
    if (refreshY == 0)
        refreshY = -gridSide;
}

function leftClickFunc() {
    refreshFrameStartFunc();

    refreshY = 0;
    if (refreshX == 0)
        refreshX = -gridSide;
}

function rightClickFunc() {
    refreshFrameStartFunc();

    refreshY = 0;
    if (refreshX == 0)
        refreshX = gridSide;
}


function downClickFunc() {
    refreshFrameStartFunc();

    refreshX = 0;
    if (refreshY == 0)
        refreshY = gridSide;
}


// functions

function _(el) { return document.getElementById(el); }

function refreshFrameStartFunc() {
    if (interval == null)
        interval = setInterval(frameRefresh, speed);
}

function frameRefresh() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    borderHitFunc();

    moveSnake();

    if (checkItselfBit()) {
        snakeLength = 3;
        mainBoxX = 10;
        mainBoxY = 10;
        snakeBlockQueue = [{
            x: mainBoxX,
            y: mainBoxY
        }]

    }

    checkAppleHit();

    displayApple();

    mainBoxX += refreshX;
    mainBoxY += refreshY;

}


function borderHitFunc() {
    if (mainBoxX == canvas.width && refreshX > 0)
        mainBoxX = 0;
    else if (mainBoxX == -gridSide && refreshX < 0)
        mainBoxX = canvas.width;

    if (mainBoxY == canvas.height && refreshY > 0)
        mainBoxY = 0;
    else if (mainBoxY == -gridSide && refreshY < 0)
        mainBoxY = canvas.height;
}

function setRedBlock() {
    let noOfBlocksX = canvas.width / gridSide,
        noOfBlocksY = canvas.height / gridSide;

    let randomX = (Math.random() * 1000) % noOfBlocksX;
    let randomY = (Math.random() * 1000) % noOfBlocksY;

    randomX = Math.floor(randomX) * gridSide;
    randomY = Math.floor(randomY) * gridSide;
    if (snakeBlockQueue.indexOf({ x: randomX, y: randomY }) == -1)
        return { x: randomX, y: randomY }

    else setRedBlock();
}

function displayApple() {
    context.fillStyle = "red";
    context.fillRect(appleLocation.x, appleLocation.y, gridSide, gridSide);

}

function moveSnake() {
    snakeBlockQueue.push({ x: mainBoxX, y: mainBoxY })

    if (snakeBlockQueue.length > snakeLength) {
        snakeBlockQueue.splice(0, 1);
    }

    for (let block of snakeBlockQueue) {
        context.fillStyle = "lime";
        context.fillRect(block.x, block.y, gridSide, gridSide);
    }
}

function checkAppleHit() {
    if (snakeBlockQueue.at(-1).x == appleLocation.x && snakeBlockQueue.at(-1).y == appleLocation.y) {
        snakeLength++;
        appleLocation = setRedBlock();
    }


}

function checkItselfBit() {
    for (let block of snakeBlockQueue.slice(0, - 1)) {
        if (snakeBlockQueue.at(-1).x == block.x && snakeBlockQueue.at(-1).y == block.y)
            return true
    }
    return false;
}

