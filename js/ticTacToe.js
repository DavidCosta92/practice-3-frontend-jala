// @ts-nocheck
export class TicTacToe{
    playerA
    playerB
    userPlaying
    gameSize
    board
    messageContainer
    message
    playerSign  
    squares

    constructor(board, messageContainer, message, playerSign) {
        this.board = board
        this.messageContainer = messageContainer
        this.message = message
        this.playerSign = playerSign
    }
    
    init(dialog){
        dialog.showModal();
    }
    
    configGame(playerA, playerB, size){    
        if(playerA != "" & playerB !="") {
            this.gameSize = size
            this.playerA = playerA
            this.playerB = playerB
            this.createboard()
            this.initalRandomPlayer()
        }
    }
    createboard(){
        this.board.replaceChildren(); 
        this.squares = Array.from({length: Math.pow(this.gameSize,2)});
        this.squares.forEach((sq, i)=>{
            const square = document.createElement("div")
            square.classList.add("square")
            square.classList.add("void")
            square.id=`square-${i}`
            square.addEventListener("click", (e) => this.selectSquare(e)) // callback error context
            this.board.append(square)
        })
        this.board.style.gridTemplateColumns = `repeat(${this.gameSize}, 1fr)`;
        this.board.style.gridTemplateRows = `repeat(${this.gameSize}, 1fr)`;    
    }

    initalRandomPlayer(){
        this.userPlaying = Math.random()<0.5? this.playerA : this.playerB   
        this.message.innerHTML = "Es turno de"
        this.playerSign.innerHTML = this.userPlaying
        this.playerSign.classList.remove(this.userPlaying == this.playerA? "playerB" : "playerA")
        this.playerSign.classList.add(this.userPlaying == this.playerA? "playerA" : "playerB")
    }   
    selectSquare(e){
        let square = e.target
        if(square.classList.contains("void")){
            square.classList.remove("void")
            square.classList.add(this.userPlaying == this.playerA? "playerA" : "playerB")
            this.checkStatus()
            this.changeUser()
        } else{
            alert("No puedes elegir esta casilla")
        }
    } 
    checkStatus(){
        const squares = document.getElementsByClassName("square");
        const squaresArray = Array.from(squares)
        let playerClass = this.userPlaying == this.playerA?  "playerA" : "playerB"
        this.checkDiagonal(squaresArray, playerClass)
        this.checkHorizontal(squaresArray, playerClass)
        this.checkVertical(squaresArray, playerClass)
        if (squaresArray.filter(sq => sq.classList.contains("void")).length == 0) this.draw()
    }
    checkHorizontal(squares, playerClass){  
        // [0],[1],[2],[3],[4],[5],[6],[7],[8] => [ [0],[1],[2] ], [ [3],[4],[5] ], [ [6],[7],[8] ]
        let rowsArray = Array.from({length: this.gameSize}).fill().map(() => [])     
        for(let i = 0; i < Math.pow(this.gameSize,2); i++){ // this.gameSize*gameSize
            let rowIndex = Math.floor( i / this.gameSize); // 0,0,0,1,1,1
            rowsArray[rowIndex].push(squares[i]); 
        }
    
        rowsArray.forEach((row)=>{        
            if ( row.every(square => square.classList.contains(playerClass)) ) this.win()
        })   
    }
    checkVertical(squares, playerClass){
        // [0],[1],[2],[3],[4],[5],[6],[7],[8] => [ [0],[3],[6] ], [ [1],[4],[7] ], [ [2],[5],[8] ]   
        let colsArray = Array.from({length: this.gameSize}).fill().map(() => [])         
        
        for (let i = 0; i < Math.pow(this.gameSize,2); i++) {
            let colIndex = i % this.gameSize // 0,1,2,0,1,2
            colsArray[colIndex].push(squares[i]); 
        }
        colsArray.forEach((col)=>{ // [0],[3],[6]       
            if ( col.every(square => square.classList.contains(playerClass)) ) this.win()
        })   
    }
    checkDiagonal(squares, playerClass){
        // diagonal descendente
        if(squares[0].classList.contains(playerClass)){ // si primero fila true
            let squareIndex=0
            let flag = false 
            for (let col = 0; col < this.gameSize; col ++){
                flag = squares[squareIndex].classList.contains(playerClass) // 0, 4, 8
                if(!flag) break
                squareIndex+=parseInt(this.gameSize)+1 
            }
            if (flag) this.win()
        }
        
        // diagonal ascendete
        if(squares[this.gameSize-1].classList.contains(playerClass)){ // ultimo de fila true
            let flag = false    
            let squareIndex = this.gameSize - 1 //2
            for (let col = 0; col < this.gameSize; col ++){
                flag = squares[squareIndex].classList.contains(playerClass) // 2, 
                if(!flag) break
                squareIndex +=parseInt(this.gameSize)-1
            }
            if (flag) this.win()
        }
    }

    win(){
        alert(`El jugador ${this.userPlaying} gano!!`)
        confirm("Jugar nuevamente?") && this.restarGame()
    }
    draw(){
        confirm("Hubo un empate! Reiniciar partida?") && this.restarGame()
    }    
    changeUser(){
        this.userPlaying = this.userPlaying === this.playerA? this.playerB : this.playerA
        this.message.innerHTML = "Es turno de"   
        this.playerSign.innerHTML = this.userPlaying
        this.playerSign.classList.remove(this.userPlaying == this.playerA? "playerB" : "playerA")
        this.playerSign.classList.add(this.userPlaying == this.playerA? "playerA" : "playerB")
    }
    restarGame(){
        const squares = document.getElementsByClassName("square");
        for (let i =0; i<squares.length; i++){
            squares[i].classList.remove("playerA")
            squares[i].classList.remove("playerB")
            squares[i].classList.add("void")
        }
        this.initalRandomPlayer()
    }
    newGame(){
        this.init()
    }
}
