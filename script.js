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
    REMOVE all the matches from grid
    Move the elements above down and generate new ones from top
    Add the number of elements removed to score
    RETURN [...]

initialCheck function
    GET Grid
    LOOP and Check if a color repeats 3 or more times in a row in each direction
    if they do match take the middle one and change the color to different one.
    RETURN 

*/
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let grid = [];
let gridSize = 8;
let selectedElement = [];
let matchArray = []
let elementWidth = 50;
let gameInit = false;

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
                x: 5 + (60 * i),
                y: 5 + ( 60 * j),
                color: randomC(),
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

function reRender(x, y, width, height, rectColor, boolean) {
    if (boolean) {
        ctx.beginPath();
        ctx.clearRect(x - 2, y - 2, width + 4, height + 4);
        ctx.fillStyle = rectColor;
        ctx.fillRect(x, y, elementWidth, elementWidth);
        ctx.closePath();
    } 
}

canvas.addEventListener("click", (e) => {
    const {offsetX: x, offsetY: y} = e;
    //console.log(`OffsetX: ${x}, OffsetY: ${y}`)
    
    grid.forEach((vLine, lineIndex) => {
        vLine.forEach((block, bIndex) => {
            //console.log(isColliding(block, e) && console.log(`Found a match!  -  BlockX: ${block.x}, BlockY: ${block.y}, Color: ${block.color}, ID: ${block.id}`));
            if(isColliding(block, e)) {
                selectedElement.push(block);
                block.toggled = !block.toggled;
                toggleSelected(block.x, block.y, 50, 50,block.color , block.toggled)
                //console.log(block.id)
                if (selectedElement.length === 2) {
                    swapTargets(selectedElement[0], selectedElement[1]);
                    checkMatch();
                    console.log(matchArray)
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
    console.log("got here")

                                prev = grid[j - 1] ? grid[j - 1][i] : null;
                                curr = grid[j][i];
                                next = grid[j + 1] ? grid[j + 1][i] : null;
                                if(prev?.color === curr?.color &&
                                    next?.color === curr?.color) {
                                    console.log(prev, curr, next)
                                    if (!matchArray.some(el => el.id === prev.id)) {
                                        matchArray.push(prev)
                                    }
                                    if (!matchArray.some(el => el.id === curr.id)) {
                                        matchArray.push(curr)
                                    }
                                    if (!matchArray.some(el => el.id === next.id)) {
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
                                        matchArray.push(prev)
                                    }
                                    if (!matchArray.some(el => el.id === curr.id)) {
                                        matchArray.push(curr)
                                    }
                                    if (!matchArray.some(el => el.id === next.id)) {
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
                                        matchArray.push(prev)
                                    }
                                    if (!matchArray.some(el => el.id === curr.id)) {
                                        matchArray.push(curr)
                                    }
                                    if (!matchArray.some(el => el.id === next.id)) {
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
                                        matchArray.push(prev)
                                    }
                                    if (!matchArray.some(el => el.id === curr.id)) {
                                        matchArray.push(curr)
                                    }
                                    if (!matchArray.some(el => el.id === next.id)) {
                                        matchArray.push(next)
                                    }
                                        //reRender(grid[i][j].x, grid[i][j].y, 50, 50, newColor, true)
                                    }
                        }
                    }
                    }
            })
        });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    initGrid(gridSize)
    initialCheck()

    
    
}

gameLoop();



console.log(grid)
