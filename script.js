/*
A grid structure that can be moved cheaply in any direction.
Shape enums to 
The values in the grid must be changed between themselves.
A way to remove values and be replaced ones from top in a way that everything above them moves down as well.
A patterns of removed values
A score system.
Hint system that checks if any value can be moved to trigger the removal of values.
Special powers.


initGrid function 
    GET GridSize
        Create a empty array.
        Create an array with no 3 same shapes in a row.
        Push it to an Empty array.
        Create more of them in a way that no more than 2 same shapes can be in the same index in row
    RETURN 2D array 

adjustGrid function
    GET target1, target2
        SWITCH target1 and target2
    RETURN Updated Grid

checkForThree function
    GET Grid
    LOOP and Check if a color repeats 3 or more times in a row in each direction
    IF three match PUSH to matchArray and keep pushing every next
    RETURN [...]


score function 
    Add the number of elements in matchArray to score.


fillBoard funtion
    GET matchArray.
    LOOP matchArray and from each element should be traveled upward and move the next to the current.
    IF index === 0 generate random color
    checkForThree again and add score if necessary.


initialCheck function
    GET Grid
    LOOP and Check if a color repeats 3 or more times in a row in each direction
    if they do match take the middle one and change the color to different one.
    RETURN 


MoveElements function
    GET grid item old location and move to new location
*/
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let grid = [];
let gridSize = 5;
let selectedElement = [];
let matchArray = [];
let fillArray = [];
let moveArray = [];
let elementWidth = 50;
let padding = 10;
let outerPadding = 65;
let gameObjSize = padding + elementWidth;
let gameInit = false;
let score = document.getElementById("score");
let validCheck = true;
let scoreCount = 0;
let dy = 1;
canvas.width = gridSize * (elementWidth + padding) + outerPadding * 2;
canvas.height = gridSize * (elementWidth + padding) + outerPadding * 2;




const gameElements = {
    1: "lightgreen",
    2: "skyblue",
    3: "pink",
    4: "yellow",
    5: "violet"
}



function randomC() {
    return gameElements[Math.floor(Math.random() * Object.keys(gameElements).length) + 1];
}

function initGrid(size) {
    for (let i = 0; i < size; i++) {
        grid.push([])
        for (let j = 0; j < size; j++) {
            grid[i].push({
                id: `${i}${j}`,
                x: outerPadding + padding / 2 + (gameObjSize * i),
                y: outerPadding + padding / 2 + ( gameObjSize * j),
                color: randomC(),
                removed: false,
                toggled: false
            })
            ctx.fillStyle = grid[i][j].color;
            ctx.fillRect(grid[i][j].x, grid[i][j].y, elementWidth, elementWidth);
        }
    }
    return grid;
}

function isColliding(a, b) {
    return (
    a.x < b.offsetX &&
    a.x + elementWidth > b.offsetX &&
    a.y < b.offsetY &&
    a.y + elementWidth > b.offsetY
    )
}

function checkCollision() {
    
}

function toggleSelected(x, y, width, height, rectColor, boolean) {
    if (boolean) {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, width, height);
        ctx.closePath();
    } 
    else {
        ctx.clearRect(x - 2, y - 2, elementWidth + 4, elementWidth + 4);
        ctx.fillStyle = rectColor;
        ctx.fillRect(x, y, elementWidth, elementWidth);
    }
}

/* let x = 50;
let y = 100;
let dx = 5;

let speed = 0.05; */


 function animateImg() {
    ctx.clearRect(0, 0 ,canvas.width, canvas.height);
   ctx.beginPath();
   ctx.arc(x,y,30,0,Math.PI * 2);
   ctx.fillStyle = "orange";
   ctx.fill();
   ctx.closePath(); 

    //img.onload = () => {
    //ctx.drawImage(img, x, y, 100, 150);
    //}
    //Update position
     if (y < 300) {
    y += dy;
    } 

   // y = Math.min(100, dy);

    //bouncing
     if (x + 30 >= canvas.width || x - 30 <= 0) {
    dx = -dx;
    }
    if (y + 30 >= canvas.height || y - 30 <= 0) {
    dy = -dy;
    } 
     requestAnimationFrame(animateImg);

  
    } 
    let moveY = 10;

function moveElement() {

        ctx.clearRect(x - 2, moveY - 2, width + 4, height + 4);
        
        ctx.fillStyle = rectColor;
       
        ctx.fillRect(x, moveY, width, height);
        //ctx.fillRect(x, y, elementWidth, elementWidth);

        while(moveY < y) {
            moveY += dy;
        }
    requestAnimationFrame(moveElement);
}


 function reRender(x, y, width, height, rectColor) {
        ctx.clearRect(x - 2, y - 2, width + 4, height + 4);
        ctx.beginPath();
        ctx.fillStyle = rectColor;
        ctx.fillRect(x, y, elementWidth, elementWidth);
        ctx.closePath();
    
} 

canvas.addEventListener("click", (e) => {
    const {offsetX: x, offsetY: y} = e;
    //console.log(`OffsetX: ${x}, OffsetY: ${y}`)
    grid.forEach((vLine, lineIndex) => {
        vLine.forEach((block, bIndex) => {
            //console.log(isColliding(block, e) && console.log(`Found a match!  -  BlockX: ${block.x}, BlockY: ${block.y}, Color: ${block.color}, ID: ${block.id}`));
            if(isColliding(block, e)) {
                selectedElement.push(block);
                console.log(block.id, block.color, block.removed)
                block.toggled = !block.toggled;
                toggleSelected(block.x, block.y, 50, 50,block.color , block.toggled)
                //console.log(block.id)
                if (selectedElement.length === 2) {
                    swapTargets(selectedElement[0], selectedElement[1]);
                    
                    do {
                        validCheck = true
                        checkMatch();
                        orderArray(matchArray)
                        //console.log(matchArray);
                        fillBoard(); 
                        checkMatch();

                        //removeEl(matchArray);

                    } while (!validCheck)
                    console.log(grid)

                    setRemovedFalse();
                    matchArray = [];
                    fillArray = [];
                    selectedElement = [];
                }
                if (!block.toggled) {
                    selectedElement.pop()
                    //block.toggled = !block.toggled;
                }

                console.log(block.toggled)
                //vLine.splice(bIndex, 1);
                
                
                
                //ctx.clearRect(block.x, block.y, 50, 50);

            }
        })
        
    })
})

function swapTargets(target1, target2) {
    let target1Color = selectedElement[0].color;
    let target2Color = selectedElement[1].color;

    if (Number(target1.id) === Number(target2.id) + 1 ||
        Number(target1.id) === Number(target2.id) - 1 ||
        Number(target1.id) === Number(target2.id) + 10 ||
        Number(target1.id) === Number(target2.id) - 10 
    ) {
        console.log("Swap possible")
        grid.forEach((vLine, lineIndex) => {
            vLine.forEach((block, bIndex) => {
                if(block.id === selectedElement[0].id) {
                    block.toggled = false;
                    //console.log("first block: " , block.color);
                    //console.log("first selection: " , selectedElement[0].color);

                    block.color = target2Color;
                    //console.log("first block: " , block.color);

                    //console.log(`Grid Color: ${block.color}, SelectedElementColor1: ${selectedElement[1].color}`)
                }
                if(block.id === selectedElement[1].id) {
                    block.toggled = false;
                    //console.log("second block: " , block.color)
                    //console.log("second selection: " , selectedElement[1].color)

                    block.color = target1Color;
                    //console.log("second block: " , block.color)
                    //console.log(`Grid Color: ${block.color}, SelectedElementColor2: ${selectedElement[0].color}`)

                } 
            })
        });
        reRender(selectedElement[0].x, selectedElement[0].y, 50, 50, target2Color, true)
        reRender(selectedElement[1].x, selectedElement[1].y, 50, 50, target1Color, true)

    } else {
        grid.forEach((vLine, lineIndex) => {
            vLine.forEach((block, bIndex) => {
                if(block.id === selectedElement[0].id) {
                    block.toggled = false;
                }
                if(block.id === selectedElement[1].id) {
                    block.toggled = false;
                }
            })
        });
        reRender(selectedElement[0].x, selectedElement[0].y, 50, 50, target1Color, true)
        reRender(selectedElement[1].x, selectedElement[1].y, 50, 50, target2Color, true)
        selectedElement = [];
        console.log("not valid selection")
    } 
}

function initialCheck() {
    let vertical = 0;
    let horizontal = gridSize;
    let prev = null;
    let curr = null;
    let next = null;

    grid.forEach((vLine, lineIndex) => {
            vLine.forEach((block) => {

                    //+horizontalCheck
                    for (let i = 0; i < vLine.length; i++) {
                        if (block.id === `${i}${i}`) {
                            //block.toggled = !block.toggled;
                            //toggleSelected(block.x, block.y, 50, 50, block.color, block.toggled)
                            //console.log(grid[i][i])

                            for (let j = i; j < horizontal - 1; j++) {
                                prev = grid[j - 1]  ? grid[j - 1][i].color : null;
                                curr = grid[j][i].color;
                                next = grid[j + 1] ? grid[j + 1][i].color : null;
                                /*console.log(grid[j - 1] ? grid[j - 1][i]?.id : null)
                                console.log(grid[j - 1] ? grid[j - 1][i]?.color : null)

                                console.log(grid[j][i].id)
                                console.log(grid[j][i].color)

                                console.log(grid[j + 1] ? grid[j + 1][i]?.id : null)
                                console.log(grid[j + 1] ? grid[j + 1][i]?.color : null)
*/
                                if(prev === curr &&
                                    next === curr) {
                                        validCheck = false;
                                       // console.log(prev, curr, next)
                                        let newColor = randomC();
                                        while (curr === newColor) {
                                            newColor = randomC();
                                        }
                                        //console.log(`Old: ${grid[j][i].color}, New: ${newColor}`)
                                        grid[j][i].color = newColor;
                                        curr = newColor;
                                        reRender(grid[j][i].x, grid[j][i].y, 50, 50, newColor, true)
                                        
                                    }
                            }

                            
                        }
                        
                    }

                    //-horizontalCheck

                    for (let i = 0; i < vLine.length; i++) {
                        if (block.id === `${i}${i}`) {
                            for (let j = i; j > 0; j--) {
                                prev = grid[j + 1]  ? grid[j + 1][i].color : null;
                                curr = grid[j][i].color;
                                next = grid[j - 1] ? grid[j - 1][i].color : null;
                            
                                if(prev === curr &&
                                    next === curr) {
                                        validCheck = false;
                                        let newColor = randomC();
                                        while (curr === newColor) {
                                            newColor = randomC();
                                        }
                                        grid[j][i].color = newColor;
                                        curr = newColor;
                                        reRender(grid[j][i].x, grid[j][i].y, 50, 50, newColor, true)
                                    }
                        }
                    }
                    }

                    //+vertical check
                    for (let i = 0; i < vLine.length; i++) {
                        if (block.id === `${i}${i}`) {
                            for (let j = i; j < horizontal; j++) {
                                prev = grid[i]  ? grid[i][j - 1]?.color : null;
                                curr = grid[i][j].color;
                                next = grid[i] ? grid[i][j + 1]?.color : null;
                                
                                if(prev === curr &&
                                    next === curr) {
                                        validCheck = false;
                                        let newColor = randomC();
                                        while (curr === newColor) {
                                            newColor = randomC();
                                        }
                                        grid[i][j].color = newColor;
                                        curr = newColor;
                                        reRender(grid[i][j].x, grid[i][j].y, 50, 50, newColor, true)
                                    }
                        }
                    }
                    }
                    //-vertical check
                    for (let i = 0; i < vLine.length; i++) {
                        if (block.id === `${i}${i}`) {
                            for (let j = i; j > 0; j--) {
                                prev = grid[i]  ? grid[i][j + 1]?.color : null;
                                curr = grid[i][j].color;
                                next = grid[i] ? grid[i][j - 1]?.color : null;

                                if(prev === curr &&
                                    next === curr) {
                                        validCheck = false;
                                        //console.log(prev, curr, next)
                                        let newColor = randomC();
                                        while (curr === newColor) {
                                            newColor = randomC();
                                        }
                                        grid[i][j].color = newColor;
                                        curr = newColor;
                                        reRender(grid[i][j].x, grid[i][j].y, 50, 50, newColor, true)
                                    }
                        }
                    }
                    }
            })
        });
}


function checkMatch() {
    let horizontal = gridSize;
    let prev = null;
    let curr = null;
    let next = null;
    grid.forEach((vLine, lineIndex) => {
            vLine.forEach((block) => {

                    //+horizontalCheck
                    for (let i = 0; i < vLine.length; i++) {
                        if (block.id === `${i}${i}`) {
                            for (let j = i; j < horizontal - 1; j++) {
                                prev = grid[j - 1] ? grid[j - 1][i] : null;
                                curr = grid[j][i];
                                next = grid[j + 1] ? grid[j + 1][i] : null;
                                if(prev?.color === curr?.color &&
                                    next?.color === curr?.color) {
                                    //console.log(prev, curr, next)
                                    if (!matchArray.some(el => el.id === prev.id)) {
                                        validCheck = false;
                                        grid[j - 1][i].removed = true;
                                        matchArray.push(prev)
                                    }
                                    if (!matchArray.some(el => el.id === curr.id)) {
                                        validCheck = false;
                                        grid[j][i].removed = true;
                                        matchArray.push(curr)
                                    }
                                    if (!matchArray.some(el => el.id === next.id)) {
                                        validCheck = false;
                                        grid[j + 1][i].removed = true;
                                        matchArray.push(next)
                                    }
                                        //reRender(grid[j][i].x, grid[j][i].y, 50, 50, newColor, true)
                                    }
                            }
                        }
                    }

                    //-horizontalCheck

                    for (let i = 0; i < vLine.length; i++) {
                        if (block.id === `${i}${i}`) {
                            for (let j = i; j > 0; j--) {
                                prev = grid[j + 1]  ? grid[j + 1][i] : null;
                                curr = grid[j][i];
                                next = grid[j - 1]  ? grid[j - 1][i]: null;
                            
                                if(prev?.color === curr?.color &&
                                    next?.color === curr?.color) {
                                    if (!matchArray.some(el => el.id === prev.id)) {
                                        validCheck = false;
                                        grid[j + 1][i].removed = true;
                                        matchArray.push(prev)
                                    }
                                    if (!matchArray.some(el => el.id === curr.id)) {
                                        validCheck = false;
                                        grid[j][i].removed = true;
                                        matchArray.push(curr)
                                    }
                                    if (!matchArray.some(el => el.id === next.id)) {
                                        validCheck = false;
                                        grid[j - 1][i].removed = true;
                                        matchArray.push(next)
                                    }
                                        //reRender(grid[j][i].x, grid[j][i].y, 50, 50, newColor, true)
                                    }
                        }
                    }
                    }

                    //+vertical check
                    for (let i = 0; i < vLine.length; i++) {
                        if (block.id === `${i}${i}`) {
                            for (let j = i; j < horizontal; j++) {
                                prev = grid[i] ? grid[i][j - 1] : null;
                                curr = grid[i][j];
                                next = grid[i] ? grid[i][j + 1]: null;
                                
                                if(prev?.color === curr?.color &&
                                    next?.color === curr?.color) {
                                    if (!matchArray.some(el => el.id === prev.id)) {
                                        validCheck = false;
                                        grid[i][j - 1].removed = true;
                                        matchArray.push(prev)
                                    }
                                    if (!matchArray.some(el => el.id === curr.id)) {
                                        validCheck = false;
                                        grid[i][j].removed = true;
                                        matchArray.push(curr)
                                    }
                                    if (!matchArray.some(el => el.id === next.id)) {
                                        validCheck = false;
                                        grid[i][j + 1].removed = true;
                                        matchArray.push(next)
                                    }
                                        //reRender(grid[i][j].x, grid[i][j].y, 50, 50, newColor, true)
                                    }
                        }
                    }
                    }
                    //-vertical check
                    for (let i = 0; i < vLine.length; i++) {
                        if (block.id === `${i}${i}`) {
                            for (let j = i; j > 0; j--) {
                                prev = grid[i] ? grid[i][j + 1] : null;
                                curr = grid[i][j];
                                next = grid[i] ? grid[i][j - 1]: null;

                                if(prev?.color === curr?.color &&
                                    next?.color === curr?.color) {
                                    if (!matchArray.some(el => el.id === prev.id)) {
                                        validCheck = false;
                                        grid[i][j + 1].removed = true;
                                        matchArray.push(prev)
                                    }
                                    if (!matchArray.some(el => el.id === curr.id)) {
                                        validCheck = false;
                                        grid[i][j].removed = true;
                                        matchArray.push(curr)
                                    }
                                    if (!matchArray.some(el => el.id === next.id)) {
                                        validCheck = false;
                                        grid[i][j - 1].removed = true;
                                        matchArray.push(next)
                                    }
                                        //reRender(grid[i][j].x, grid[i][j].y, 50, 50, newColor, true)
                                    }
                        }
                    }
                    }
            })
        });
        if (validCheck) {
            console.log("ALL CLEAR, DID NOT FIND ANY MATCH 3")
        }
}

function calcScore() {
    matchArray.forEach((el) => {
        scoreCount++;
    })
    score.textContent = scoreCount;
}

function orderArray(array) {
    array.sort((a, b) => Number(b.id) - Number(a.id));
}

function fillBoard() {
    let curr = null;
    let next = null;
    console.log("matchArray: ", matchArray);
    matchArray.forEach((el) => {
        let column = el.id.slice(0, 1);
        let index = el.id.slice(1)
        //console.log(column)
        //console.log("this is index: ",index, "typeof index is: ", typeof index)
        

        for (let i = index; i >= 0 ; i--) {
            //console.log("loop i in matchArray: ", i, "block id is: ", grid[column][i].id)

            //console.log("Removed color:" ,grid[column][index].color)
            //console.log(grid[column][i].id, " is removed: ", grid[column][i].removed )
            console.log("----Current id: ", grid[column][i].id, " ----------")
            
           debugger;
            if (grid[column][i].removed === false) {
                let moveY = 10;
                grid[column][i].removed = true;
                fillArray.push(grid[column][i])
                console.log("Top color: ", grid[column][i].color, "Moved to: ", grid[column][index].id)
                grid[column][index].color = grid[column][i].color;
                grid[column][index].removed = false;
                reRender(grid[column][i].x, grid[column][i].y, 50, 50, grid[column][i].color, true);
                reRender(grid[column][index].x, grid[column][index].y, 50, 50, grid[column][i].color, true);
                
                //console.log("New color: ", grid[column][index].color)
                break;
            }
            if(i === 0 || index === "0") {
                let newColor = randomC();
                console.log("generated", newColor, " color to: ", grid[column][index].id )
                grid[column][index].color = newColor;
                grid[column][index].removed = false;
                //grid[column][i].removed = false;
                reRender(grid[column][index].x, grid[column][index].y, 50, 50, newColor, true);
            }
            
            
        }
        
        console.log(grid)
    })
    calcScore();
    matchArray = [];
    orderArray(fillArray);
    console.log("fillArray: ", fillArray)
        fillArray.forEach((el) => {
            let column = Number(el.id.slice(0, 1));
            let index = Number(el.id.slice(1));
            //grid[column][index].removed = false;
            for (let i = index; i >= 0 ; i--) {
            //console.log("Removed color:" ,grid[column][index].color)
            //console.log(grid[column][i].id, " is removed: ", grid[column][i].removed )
            console.log("----Current id: ", grid[column][i].id, " ----------")
            curr = grid[column][i];
            next = grid[column][i - 1] ? grid[column][i - 1] : null;
            debugger;

           /*  if (i = index - 1) {
                console.log("Top color: ", next.color, "Moved to: ", grid[column][index].id)

                 grid[column][index].color = next.color;
                reRender(grid[column][i].x, grid[column][i].y, 50, 50, next.color, true);

            } */

            if(i === 0 || index === "0" || next === null) {
                let newColor = randomC();
                console.log("generated", newColor, " color to: ", curr.id )
                grid[column][i].color = newColor;
                grid[column][i].removed = false;
                //grid[column][i].removed = false;
                reRender(curr.x, curr.y, 50, 50, newColor, true);
                break;
            }

            if (next) {
                //grid[column][i].removed = true;
                console.log("Top color: ", next.color, "Moved to: ", curr.id)
                grid[column][i].color = next.color;
                grid[column][i].removed = false;
                reRender(grid[column][i].x, grid[column][i].y, 50, 50, next.color, true);
                //reRender(grid[column][index].x, grid[column][index].y, 50, 50, grid[column][i].color, true);
                
                //console.log("New color: ", grid[column][index].color)
            }
        }

        })
        fillArray = [];
}

function removeEl(array) {
    if(matchArray.length > 0) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            for (let k = 0; k <= array?.length - 1; k++) {
                if (grid[j][i].id === array[k]?.id) {
                    //console.log("grid id: ", grid[j][i].id, "array id: ", array[k]?.id)
                    //toggleSelected(grid[j][i].x, grid[j][i].y, 50, 50, "black", true)
                    console.log("---------got to removeEl--------")
                    //array?.splice(k, 1);
                    //grid[j][i].removed = false;
                    //reRender(grid[j][i].x, grid[j][i].y, 50, 50, "rgba(0, 0, 0, 0.0)", true)

                }
            }
        }
        
    }
    }
    console.log("array length: ",array.length)
    
}

function setRemovedFalse() {
    grid.forEach((line) => {
        line.forEach(el => el.removed = false)
    })
    
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    initGrid(gridSize)
    
    do {
        validCheck = true;
        initialCheck()
        
    } while (!validCheck)

    
    
}

gameLoop();



