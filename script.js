const game = {
   from: 0,
   to: 10,
   chances: 10,
   guess: null,
   targetNumber: null
};

const resultSpan = document.getElementById("result");
const fromInput = document.getElementById("from");
const guessInput = document.getElementById("guess");
const toInput = document.getElementById("to");
const chancesSpan = document.getElementById("chances");

document.getElementById("start").addEventListener("click", startGame);
document.getElementById("reset").addEventListener("click", resetGame);
fromInput.addEventListener("blur", changeRange);
toInput.addEventListener("blur", changeRange);

function playGame(e) {
   if (e.key !== "Enter") return;

   guessInput.focus();
   if (guessInput.value == "") return (resultSpan.textContent = "Enter your Guess please!");

   if (guessInput.value == game.targetNumber) showResult("WIN");
   else if (game.chances == 1) showResult("LOSE"); //it was the last chance and the number is wrong.
   else if (guessInput.value < game.from || guessInput.value > game.to) resultSpan.textContent = "Your Guess is out of Range!";
   else resultSpan.textContent = guessInput.value < game.targetNumber ? "Enter a greater number!" : "Enter a smaller number!";

   chancesSpan.textContent = --game.chances;
   chancesSpan.className = "flash";
   setTimeout(() => (chancesSpan.className = ""), 300);
}

function startGame() {
   fromInput.disabled = toInput.disabled = true;

   game.from = +fromInput.value;
   game.to = +toInput.value;
   game.targetNumber = Math.floor(Math.random() * (game.to - game.from + 1)) + game.from;

   guessInput.parentElement.classList.remove("hidden");
   guessInput.focus();
   resultSpan.textContent = "Enjoy Playing!";
   resultSpan.className = "";
   chancesSpan.textContent = game.chances = 10;
   chancesSpan.parentElement.classList.remove("hidden");

   window.addEventListener("keydown", playGame);

   console.log("target number: ", game.targetNumber); // for testing purposes
}

function resetGame() {
   fromInput.disabled = toInput.disabled = false;
   guessInput.parentElement.classList.add("hidden");
   resultSpan.textContent = `Define "From" and "To" then Press Start`;
   resultSpan.className = "";
   chancesSpan.parentElement.classList.add("hidden");
   window.removeEventListener("keydown", playGame);
}

function showResult(result) {
   resultSpan.textContent = `You ${result}! the number is: ${game.targetNumber}`;
   resultSpan.className = result == "WIN" ? "green" : "red";
   window.removeEventListener("keydown", playGame);
}

function changeRange() {
   switch (this.id) {
      case "from":
         if (+toInput.value < +fromInput.value + 2) toInput.value = +fromInput.value + 2;
         break;
      case "to":
         if (+fromInput.value > +toInput.value - 2) fromInput.value = +toInput.value - 2;
         break;
   }
}
