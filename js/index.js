// @ts-nocheck
let squares = []
const board = document.getElementsByClassName("board")[0];
const messageContainer = document.getElementsByClassName("messageContainer")[0];
const message = document.getElementsByClassName("message")[0];
const player = document.getElementsByClassName("player")[0];
const dialog = document.querySelector("dialog");
const initButton = document.getElementById("initGame")

let playerA ;
let playerB;
let userPlaying;
let gameSize;

function initalRandomPlayer(){
    userPlaying = Math.random()<0.5? playerA : playerB
    message.innerHTML = "Es turno de"
    player.innerHTML = userPlaying
    player.classList.remove(userPlaying == playerA? "playerB" : "playerA")
    player.classList.add(userPlaying == playerA? "playerA" : "playerB")
}
function init(){
    dialog.showModal();
    initButton.style.opacity = 0    
}
function setPlayersNames(){    
    playerA = document.getElementById("inputName1").value
    playerB = document.getElementById("inputName2").value
    gameSize = document.getElementById("gameSize").value
    if(playerA != "" & playerB !="") createboard()
    initalRandomPlayer()
}
function createboard(){
    board.replaceChildren();
    squares = Array.from({length: Math.pow(gameSize,2)});
    squares.forEach((sq, i)=>{
        const square = document.createElement("div")
        square.classList.add("square")
        square.classList.add("void")
        square.id=`square-${i}`
        square.addEventListener("click", userPlay)
        board.append(square)
    })
    board.style.gridTemplateColumns = `repeat(${gameSize}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${gameSize}, 1fr)`;    
}
function userPlay(e){
    const squareId = e.target.id.slice(7) //square-
    selectSquare(squareId)
}
function selectSquare(id){
    let square = document.getElementById(`square-${id}`)
    if(square.classList.contains("void")){
        square.classList.remove("void")
        square.classList.add(userPlaying == playerA? "playerA" : "playerB")
        checkStatus()
        changeUser()
    } else{
        alert("No puedes elegir esta casilla")
    }
}

function checkHorizontal(squares){  
    // [0],[1],[2],[3],[4],[5],[6],[7],[8] => [ [0],[1],[2] ], [ [3],[4],[5] ], [ [6],[7],[8] ]
    let rowsArray = Array.from({length: gameSize}).fill().map(() => [])     
    for(let i = 0; i < gameSize*gameSize; i++){
        let rowIndex = Math.floor( i / gameSize); // 0,0,0,1,1,1
        rowsArray[rowIndex].push(squares[i]); 
    }

    let playerClass = userPlaying === playerA?  "playerA" : "playerB"
    rowsArray.forEach((row)=>{        
        if ( row.every(square => square.classList.contains(playerClass)) ) win()
    })   
}
function checkVertical(squares){
    // [0],[1],[2],[3],[4],[5],[6],[7],[8] => [ [0],[3],[6] ], [ [1],[4],[7] ], [ [2],[5],[8] ]   
    let colsArray = Array.from({length: gameSize}).fill().map(() => [])         
    
    for (let i = 0; i < gameSize*gameSize; i++) {
        let colIndex = i % gameSize // 0,1,2,0,1,2
        colsArray[colIndex].push(squares[i]); 
    }
    let playerClass = userPlaying === playerA?  "playerA" : "playerB"
    colsArray.forEach((col)=>{ // [0],[3],[6]       
        if ( col.every(square => square.classList.contains(playerClass)) ) win()
    })   
}
function checkDiagonal(squares){
    let playerClass = userPlaying === playerA?  "playerA" : "playerB"
    let flag = false

    // diagonal descendente
    if(squares[0].classList.contains(playerClass)){ // si primero fila true
        let squareIndex=0
        for (let col = 0; col < gameSize; col ++){
            flag = squares[squareIndex].classList.contains(playerClass) // 0, 4, 8
            squareIndex+=parseInt(gameSize)+1 
        }
        if (flag) win()
    }
    // diagonal ascendete
    if(squares[gameSize-1].classList.contains(playerClass)){ // ultimo de fila true
        let squareIndex = gameSize - 1 //2
        for (let col = 0; col < gameSize; col ++){
            flag = squares[squareIndex].classList.contains(playerClass) // 2, 
            squareIndex +=parseInt(gameSize)-1
        }
        if (flag) win()
    }
}
function checkStatus (){
    const squares = document.getElementsByClassName("square");
    const squaresArray = Array.from(squares)
    checkDiagonal(squaresArray)
    checkHorizontal(squaresArray)
    checkVertical(squaresArray)
    if (squaresArray.filter(sq => sq.classList.contains("void")).length == 0) draw()
}
function win(){
    alert(`El jugador ${userPlaying} gano!!`)
    confirm("Jugar nuevamente?") && restarGame()
}
function draw(){
    confirm("Hubo un empate! Reiniciar partida?") && restarGame()
}

function changeUser(){
    userPlaying = userPlaying === playerA? playerB : playerA
    message.innerHTML = "Es turno de"   
    player.innerHTML = userPlaying
    player.classList.remove(userPlaying == playerA? "playerB" : "playerA")
    player.classList.add(userPlaying == playerA? "playerA" : "playerB")
}
function restarGame(){
    const squares = document.getElementsByClassName("square");
    for (let i =0; i<squares.length; i++){
        squares[i].classList.remove("playerA")
        squares[i].classList.remove("playerB")
        squares[i].classList.add("void")
    }
    initalRandomPlayer()
    initButton.style.opacity = 1
}
function newGame(){
    init()
}
