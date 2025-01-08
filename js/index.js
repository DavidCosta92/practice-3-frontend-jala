// @ts-nocheck
import {TicTacToe} from './ticTacToe.js';

const dialog = document.querySelector("dialog");
let initGameBtn = document.getElementById("initGame").addEventListener("click", initGame)
let restarGameBtn = document.getElementById("restarGame").addEventListener("click", restarGame)
let cofigForm = document.getElementById("cofigForm").addEventListener("submit", configGame)

const board = document.getElementsByClassName("board")[0];
const messageContainer = document.getElementsByClassName("messageContainer")[0];
const message = document.getElementsByClassName("message")[0];
const playerSign = document.getElementsByClassName("playerSign")[0];

let game

function initGame(){
    game = new TicTacToe(board, messageContainer, message, playerSign) 
    game.init(dialog)   
}
function restarGame(){
    if(game){
        game.restarGame()
    } else{
        initGame()
    }
}
function configGame(){
    let playerA = document.getElementById("inputName1").value 
    let playerB = document.getElementById("inputName2").value 
    let gameSize = document.getElementById("gameSize").value 
    if(game){
        game.configGame(playerA, playerB, gameSize)
    } else{
        initGame()
    }
}
