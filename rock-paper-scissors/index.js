const container = document.querySelector(".container");
const userScoreNumber = document.querySelector(".user-score-number");
const computerScoreNumber = document.querySelector(".computer-score-number");
const computerBoard = document.querySelector(".computer-board");
const winner = document.querySelector(".score-board");
const score = document.querySelectorAll(".score");
const uWin = document.querySelector(".u-win");
const cWin = document.querySelector(".c-win");
const scoreU = document.querySelector(".score-u");
const scoreC = document.querySelector(".score-c");
const choices = document.querySelector(".choices");
const btns = document.querySelectorAll(".choice-btn");
const result = document.querySelector(".result");
const resetBtn = document.querySelector(".reset-btn");
const computerChoice = document.querySelector(".computer-option");
const ready = document.querySelector(".ready");
const go = document.querySelector(".go");
const emoji = document.querySelector(".emoji");
const day = document.querySelector(".day");
const moon = document.querySelector(".moon");
const sun = document.querySelector(".sun");
const body = document.querySelector("body");

moon.addEventListener("click", function () {
  sun.classList.remove("hidden");
  moon.classList.add("hidden");
  body.classList.toggle("dark");
});
sun.addEventListener("click", function () {
  sun.classList.add("hidden");
  moon.classList.remove("hidden");
  body.classList.toggle("dark");
});
const state = {
  isPlaying: true,
  playerScore: 0,
  computerScore: 0,
};

const options = { 1: "🪨", 2: "📄", 3: "✂️" };
const letsGo = ["Rock", "Paper", "Scissors"];
let userAns = [];
let machineAns = [];
let machineChoice;
let ans;
computerChoice.textContent = "";
userScoreNumber.textContent = 0;
computerScoreNumber.textContent = 0;

const init = function () {
  userAns = [];
  machineAns = [];
  computerChoice.textContent = "";
  ready.textContent = "";
};

const disableBtns = function () {
  btns.forEach((btn) => (btn.disabled = true));
};

const enableBtns = function () {
  btns.forEach((btn) => (btn.disabled = false));
};

const guess = function () {
  machineChoice = Math.trunc(Math.random() * 3) + 1;
  ans = options[machineChoice];
  machineAns.push(ans);
};

const comp = function () {
  computerChoice.textContent = "";
};

const fadeOutbtns = function () {
  choices.classList.add("loss");
  btns.forEach((btn) => btn.classList.add("loss"));
  go.classList.add("loss");
  computerBoard.classList.add("loss");
  result.classList.add("loss");
};
const fadeInbtns = function () {
  choices.classList.remove("loss");
  btns.forEach((btn) => btn.classList.remove("loss"));
  go.classList.remove("loss");
  computerBoard.classList.remove("loss");
  result.classList.remove("loss");
};

const declareWinner = function () {
  if (state.computerScore === 10) {
    disableBtns();
    go.disabled = true;
    console.log(cWin);
    cWin.textContent = "Computer wins";
    scoreC.classList.add("active");

    fadeOutbtns();
    // score.classList.add("winner");
  } else if (state.playerScore === 10) {
    disableBtns();
    uWin.textcontent = "You win";
    scoreU.classList.add("active");
    emoji.textContent = "😒😒";

    fadeOutbtns();
    // score.classList.add("winner");
  }
};
// go.disabled = true;
console.log(go);

const check = function () {
  console.log(userAns);
  computerChoice.textContent = ans;

  const userWon = function () {
    ++state.playerScore;
    userScoreNumber.textContent = state.playerScore;
  };
  const machineWon = function () {
    ++state.computerScore;
    computerScoreNumber.textContent = state.computerScore;
  };
  if (
    userAns[0] === machineAns[0] &&
    typeof userAns[0] === typeof machineAns[0]
  ) {
    userScoreNumber.textContent = state.playerScore;
    computerScoreNumber.textContent = state.computerScore;
  } else if (userAns[0] === "🪨" && machineAns[0] === "📄") {
    machineWon();
  } else if (userAns[0] === "🪨" && machineAns[0] === "✂️") {
    userWon();
  } else if (userAns[0] === "📄" && machineAns[0] === "🪨") {
    userWon();
  } else if (userAns[0] === "📄" && machineAns[0] === "✂️") {
    machineWon();
  } else if (userAns[0] === "✂️" && machineAns[0] === "📄") {
    userWon();
  } else if (userAns[0] === "✂️" && machineAns[0] === "🪨") {
    machineWon();
  }

  if (state.playerScore >= 1 && state.computerScore <= 3) {
    emoji.innerHTML = "";
  } else if (
    state.playerScore >= 1 &&
    state.computerScore > 4 + state.playerScore
  ) {
    emoji.innerHTML = `<img src='https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTE4a2oxNjhmdTBldW13OG1kOHY4YTl3cGFlNnc2YjUydDNmaDd6dSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/HKoJmvYy3fUqj2Cvrm/giphy.gif'>`;
  } else if (
    state.playerScore >= 1 &&
    state.computerScore > 2 + state.playerScore
  ) {
    emoji.innerHTML = `<img src='blue-joobi-laugh.gif'>`;
    // console.log("😒😒😒😒😒");
  } else if (state.playerScore > 4 + state.computerScore) {
    emoji.innerHTML = `<img src='pains.jpg'>`;
    // console.log("😒😒😒😒😒");
  } else if (state.playerScore > 2 + state.computerScore) {
    emoji.innerHTML = `<img src='scared.jpg'>`;
  }
  declareWinner();
  console.log(state.computerScore, state.playerScore);
};

let btn;
// const allowClick = function () {
choices.addEventListener("click", function (e) {
  btn = e.target;
  // console.log(btn);
  btn.classList.contains("choice-btn")
    ? btn.classList.add("active")
    : btn.classList.remove("active");
  userAns.push(`${e.target.textContent}`);
});
// };
// allowClick();

let index = 0;
const play = function () {
  if (state.isPlaying) {
    const timeout = function () {
      setTimeout(() => {
        go.disabled = true;
        ready.textContent = letsGo[0];
        setTimeout(() => {
          ready.textContent = letsGo[1];
          setTimeout(() => {
            ready.textContent = letsGo[2];
            setTimeout(() => {
              ready.textContent = "";
              disableBtns();
              // go.disabled = true;
              setTimeout(() => {
                comp();
                check();
                state.isPlaying = false;
                setTimeout(() => {
                  // enableBtns();
                  disableBtns();
                  go.disabled = false;
                  init();
                }, 1000);
              }, 650);
            }, 600);
          }, 520);
        }, 510);
      }, 500);
    };

    timeout();
  }
};
// play();

go.addEventListener("click", function () {
  // go.disabled = true;
  enableBtns();
  computerChoice.textContent = "";
  state.isPlaying = true;
  btns.forEach((btn) => {
    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
    }
  });
  init();
  guess();
  play();
  comp();
  // go.disabled = false;
  // allowClick();
});

resetBtn.addEventListener("click", function () {
  enableBtns();
  state.computerScore = 0;
  state.playerScore = 0;
  cWin.textContent = "Computer Score";
  uWin.textContent = "Player Score";
  init();
  userScoreNumber.textContent = state.playerScore;
  computerScoreNumber.textContent = state.computerScore;
  btns.forEach((btn) => {
    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
    }
  });
  score.forEach((btn) => {
    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
    }
  });

  console.log(state.computerScore, state.playerScore);

  // winner.innerHTML = `<div class="score">
  //         <h3>Your Score</h3>
  //         <div class="user-score">
  //           <p class="score-number user-score-number">${state.playerScore}</p>
  //         </div>
  //       </div>
  //       <div class="score">
  //         <h3>Computer Score</h3>
  //         <div class="computer-score">
  //           <p class="score-number computer-score-number">${state.computerScore}</p>
  //           <span class="emoji"></span>
  //         </div>
  //       </div>`;
  // enableBtns();
  fadeInbtns();
});
