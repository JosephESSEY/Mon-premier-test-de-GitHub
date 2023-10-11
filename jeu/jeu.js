const choices = ["rock", "paper", "scissors"];

function computerPlay() {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return "C'est une égalité !";
    } else if (
        (playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")
    ) {
        return "Vous avez gagné !";
    } else {
        return "L'ordinateur a gagné !";
    }
}

const buttons = document.querySelectorAll("button");
const message = document.getElementById("message");

buttons.forEach((button) => {
    button.addEventListener("click", function () {
        const playerSelection = button.id;
        const computerSelection = computerPlay();
        const result = playRound(playerSelection, computerSelection);
        message.textContent = `Vous avez choisi ${playerSelection}, l'ordinateur a choisi ${computerSelection}. ${result}`;
    });
});
