let initialValues = [];
let values = [];
let elements = [];
let solveMe = (skips = false, generateRandom = false) => {
  initialValues = [];
  values = [];
  elements = [];
  for (let i = 1; i < 10; i++) {
    let tempValues = [];
    let tempElement = [];
    for (let j = 1; j < 10; j++) {
      let element = document.getElementById("sudoku" + i + "-" + j);
      tempElement.push(element);
      tempValues.push(element.value);
    }
    elements.push(tempElement);
    values.push(tempValues);
  }

  initialValues = JSON.parse(JSON.stringify(values));
  solve(values, skips);
};
let solveBtn = document.getElementById("solve");
solveBtn.addEventListener("click", solveMe);

let solve = (board, skips) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] == "") {
        for (let c = "1"; c <= "9"; c++) {
          if (isValid(board, i, j, c)) {
            board[i][j] = c;
            elements[i][j].value = c;
            elements[i][j].style.background = "rgb(0, 0, 139, 80%)";
            elements[i][j].style.color = "white";

            if (solve(board)) {
              if (skips) continue;

              return true;
            } else {
              board[i][j] = "";
              elements[i][j].value = "";
              elements[i][j].style.background = "white";
              elements[i][j].style.color = "black";
            }
          }
        }
        return false;
      }
    }
  }
  return true;
};

let isValid = (board, row, col, c) => {
  for (let i = 0; i < 9; i++) {
    if (board[i][col] == c) {
      return false;
    }
    if (board[row][i] == c) {
      return false;
    }
    if (
      board[parseInt(3 * parseInt(row / 3) + i / 3)][
        parseInt(3 * parseInt(col / 3) + (i % 3))
      ] === c
    ) {
      return false;
    }
  }
  return true;
};

let inputs = document.querySelectorAll("input");
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("keyup", (event) => {
    if (parseInt(event.target.value) < 1) {
      event.target.value = 1;
    } else if (parseInt(event.target.value) > 9) {
      event.target.value = 9;
    }
  });
}

let reset = document.getElementById("reset");
reset.addEventListener("click", () => {
  for (let i = 0; i < initialValues.length; i++) {
    for (let j = 0; j < initialValues[0].length; j++) {
      elements[i][j].value = initialValues[i][j];
      elements[i][j].style.background = "white";
      elements[i][j].style.color = "black";
    }
  }
});

let randomGenerator = (min = 40, max = 81) => {
  return Math.floor(Math.random() * max + min);
};

let regenerate = () => {
  initialValues = [];
  values = [];
  elements = [];

  let eraseNumbers = randomGenerator();

  for (let i = 0; i < initialValues.length; i++) {
    for (let j = 0; j < initialValues[0].length; j++) {
      elements[i][j].value = "";
      elements[i][j].style.background = "white";
      elements[i][j].style.color = "black";
    }
  }

  solveMe(true, true);

  for (let i = 0; i < initialValues.length; i++) {
    for (let j = 0; j < initialValues[0].length; j++) {
      elements[i][j].style.background = "white";
      elements[i][j].style.color = "black";
      if (randomGenerator(0, 3) == 0 && eraseNumbers > 0) {
        elements[i][j].value = "";
        eraseNumbers--;
      }
    }
  }
};
regenerate();

let regenerateBtn = document.getElementById("regenerate");
regenerateBtn.addEventListener("click", regenerate);

let empty = document.getElementById("empty");
empty.addEventListener("click", () => {
  for (let i = 0; i < initialValues.length; i++) {
    for (let j = 0; j < initialValues[0].length; j++) {
      elements[i][j].value = "";
      elements[i][j].style.background = "white";
      elements[i][j].style.color = "black";
    }
  }
});

const share = () => {
  navigator
    .share({
      title: "Sudoku Solver",
      text: "Check out this sudoku solver",
      url: window.location.href,
    })
    .then(() => {
      setTimeout(() => {
        var toastLiveExample = document.getElementById("toast");
        var toast = new bootstrap.Toast(toastLiveExample);

        toast.show();
      }, 2000);
    })
    .catch(console.error);
};
