document.getElementById("playButton").addEventListener("click",gameEntry)

let gameResult
let compChoice
let choices = {}
let rules = {}
let userSelection = null

fetch('./gameConfig.json')
    .then(res => res.json())
    .then(data => {
        choices = data.choices,
        rules = data.rules,
        setupUserChoice()
    })


function gameEntry(){
    document.getElementsByClassName("startingPage")[0].style.display = "none"
    document.getElementsByClassName("gamePage")[0].style.display = "flex"
}


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

    let userChoice = choices[userSelection]
    compChoice = choices[generatedChoice()]

    userImg.innerHTML = `<img src='./static/hand${userChoice}.PNG'>`
    computerImg.innerHTML = `<img src='./static/hand${compChoice}.PNG'>`


        if (userChoice === compChoice) {
            gameResult = "draw"
        } else if (rules[userChoice] == compChoice){
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

function reset() {
    gameResult = null;
    compChoice = null;
    userSelection = null;

    if (Array.isArray(choices)) {
        for (let i = 0; i < choices.length; i++) {
            const btn = document.getElementById(`${choices[i]}Button`);
            if (btn) btn.style.border = "";
        }
    }

    document.querySelector("#showcaseBar > div:nth-child(1)").innerHTML = "";
    document.querySelector("#showcaseBar > div:nth-child(4)").innerHTML = "";
    document.getElementById("overlayResult").style.display = "none";
}

document.getElementById("returnButton").addEventListener("click",returnToTheMain)

function returnToTheMain(){
    reset()
    document.getElementsByClassName("startingPage")[0].style.display = "flex"
    document.getElementsByClassName("gamePage")[0].style.display = "none"

}