document.getElementById("playButton").addEventListener("click",gameEntry)

let gameResult
let compChoice

function gameEntry(){
    document.getElementsByClassName("startingPage")[0].style.display = "none"
    document.getElementsByClassName("gamePage")[0].style.display = "flex"
}

let choices = ["rock", "scissor", "paper"]
let userSelection = null

function setupUserChoice() {
    document.getElementById("rockButton").onclick = () => {
        document.getElementById("rockButton").style.border = "10px solid black"
        userSelection = 0
        display()
    }
    document.getElementById("scissorButton").onclick = () => {
        document.getElementById("scissorButton").style.border = "10px solid black"
        userSelection = 1
        display()
    }
    document.getElementById("paperButton").onclick = () => {
        document.getElementById("paperButton").style.border = "10px solid black"
        userSelection = 2
        display()
    }
}

function generatedChoice() {
    return Math.floor(Math.random() * choices.length)
}

function display() {

    let userImg = document.querySelector("#showcaseBar > div:nth-child(1)")
    let computerImg = document.querySelector("#showcaseBar > div:nth-child(4)")


    if (userSelection === null) return
    compChoice = generatedChoice()

    userImg.innerHTML = `<img src='./static/hand${choices[userSelection]}.PNG'>`
    computerImg.innerHTML = `<img src='./static/hand${choices[compChoice]}.PNG'>`

        if (userSelection === compChoice) {
            gameResult = "draw"
        } else if (
            (userSelection === 0 && compChoice === 1) ||
            (userSelection === 1 && compChoice === 2) ||
            (userSelection === 2 && compChoice === 0)
        ) {
            gameResult = "won"
        } else {
            gameResult = "lost"
        }
            let overlay = document.getElementById("overlayResult")
    if(gameResult != null){
        overlay.style.display = "flex"
        overlay.innerHTML = `<div id="overlayTextBox"><p>${gameResult}</p><img width="32" height="32" src="https://img.icons8.com/windows/32/restart.png" alt="restart"/></div>`
    }
    overlay.querySelector("img").addEventListener("click",reset)

}

setupUserChoice();

function reset(){
    gameResult = null
    compChoice = null
    userSelection = null
    let i
    for(i = 0 ; i < 3 ; i++){
        document.getElementById(`${choices[i]}Button`).style.border = ""
    }
    document.querySelector("#showcaseBar > div:nth-child(1)").innerHTML = ""
    document.querySelector("#showcaseBar > div:nth-child(4)").innerHTML = ""
    document.getElementById("overlayResult").style.display = "none"
}

document.getElementById("returnButton").addEventListener("click",returnToTheMain)

function returnToTheMain(){
    reset()
    document.getElementsByClassName("startingPage")[0].style.display = "flex"
    document.getElementsByClassName("gamePage")[0].style.display = "none"

}