let boxes    = document.querySelectorAll(".box");
let reset    = document.querySelector("#rstbtn");
let newbtn   = document.querySelector("#newbtn");
let msg      = document.querySelector("#msg");
let msgHave  = document.querySelector(".msgHave");

let turnO = true; // true → O’s turn; false → X’s turn

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

// reset to initial state
const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgHave.classList.add("hide");
}

// attach handlers
boxes.forEach(box => {
  box.addEventListener("click", () => {
    // place & color
    if (turnO) {
      box.innerText = "O";
      box.classList.add("o");
    } else {
      box.innerText = "X";
      box.classList.add("x");
    }
    turnO = !turnO;
    box.disabled = true;
    checkWinner();
  });
});

// disable all squares (stop further play)
const disableBoxes = () => {
  boxes.forEach(b => b.disabled = true);
}

// enable & clear all squares
const enableBoxes = () => {
  boxes.forEach(b => {
    b.disabled   = false;
    b.innerText  = "";
    b.classList.remove("x", "o");
  });
}

// show win or draw overlay
const showMessage = text => {
  msg.innerText = text;
  msgHave.classList.remove("hide");
  disableBoxes();
}

// check for win or draw
const checkWinner = () => {
  // 1) win?
  for (let p of winPatterns) {
    const [a,b,c] = p.map(i => boxes[i].innerText);
    if (a && a === b && b === c) {
      return showMessage(`Winner ${a}`);
    }
  }
  // 2) draw?
  const isDraw = Array.from(boxes).every(b => b.innerText);
  if (isDraw) {
    return showMessage("Draw!");
  }
}

newbtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);