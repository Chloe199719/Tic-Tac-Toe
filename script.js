const gameBoard = (() => {
  const Board = ["", "", "", "", "", "", "", "", ""];
  const Player = (name, choice, turn) => {
    const getName = () => name;
    const getChoice = () => choice;
    let itsTurn = turn;
    return { getName, getChoice, itsTurn };
  };
  const player1 = Player("chloe", "X", true);
  const player2 = Player("Roly", "O", false);
  const reset = () => {
    gameBoard.Board = ["", "", "", "", "", "", "", "", ""];
    displayControler.rendergame();
  };
  return { Board, Player, player1, player2, reset };
})();

const displayControler = (() => {
  const tiles = document.querySelectorAll(`.tile`);
  const resetBtn = document.querySelector(`#reset`);
  const rendergame = function () {
    tiles.forEach((a) => {
      a.textContent = gameBoard.Board[a.dataset.tile];
    });
  };
  const init = () => {
    tiles.forEach((a) => {
      a.addEventListener("click", gameLogic.round);
    });
    displayControler.resetBtn.addEventListener("click", gameBoard.reset);
  };
  return { tiles, rendergame, init, resetBtn };
})();

const gameLogic = (() => {
  const round = (e) => {
    if (gameBoard.player1.itsTurn) {
      if (gameBoard.Board[e.target.dataset.tile] !== "") return;
      gameBoard.Board[e.target.dataset.tile] = gameBoard.player1.getChoice();
      gameBoard.player1.itsTurn = false;
      gameBoard.player2.itsTurn = true;
    } else if (gameBoard.player2.itsTurn) {
      if (gameBoard.Board[e.target.dataset.tile] !== "") return;
      gameBoard.Board[e.target.dataset.tile] = gameBoard.player2.getChoice();
      gameBoard.player2.itsTurn = false;
      gameBoard.player1.itsTurn = true;
    }
    displayControler.rendergame();
    checkWiner(gameBoard.Board);
  };
  const convertX = (X) => {
    let temparray = [];
    X.forEach((a) => {
      if (a === "X") {
        temparray.push(1);
      } else {
        temparray.push(0);
      }
    });
    return gameLogic.win(gameLogic.wining, temparray);
  };
  const convertO = (O) => {
    let temparray = [];
    O.forEach((a) => {
      if (a === "O") {
        temparray.push(1);
      } else {
        temparray.push(0);
      }
    });
    return gameLogic.win(gameLogic.wining, temparray);
  };
  const wining = [
    [1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 1, 0, 1, 0, 1, 0, 0],
  ];
  const win = (winkey, key) => {
    let result = false;
    winkey.forEach((a) => {
      let winx = 0;
      for (let i = 0; i < a.length; i++) {
        if (a[i] === 1 && key[i] === 1) {
          winx = winx + 1;
        }
      }
      if (winx >= 3) {
        result = true;
      }
    });
    return result;
  };
  const checkWiner = (Board) => {
    if (gameLogic.convertO(Board) === true) {
      console.log("Circle Wins");
    } else if (gameLogic.convertX(Board) === true) {
      console.log(`Cross Wins`);
    } else if (gameLogic.checkDraw(Board) === true) {
      console.log(`Draw`);
    }
    return false;
  };
  const checkDraw = (Board) => {
    let result = true;
    Board.forEach((a, i) => {
      if (a === "") result = false;
    });
    return result;
  };
  return { round, convertX, convertO, wining, win, checkWiner, checkDraw };
})();

displayControler.init();

// [1, 1, 1, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 1, 1, 1, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 1, 1, 1],
//   [1, 0, 0, 1, 0, 0, 1, 0, 0],
//   [0, 1, 0, 0, 1, 0, 0, 1, 0],
//   [0, 0, 1, 0, 0, 1, 0, 0, 1],
//   [1, 0, 0, 0, 1, 0, 0, 0, 1],
//   [0, 0, 1, 0, 1, 0, 1, 0, 0];

// const win = function () {
//   let temparray = [];
//   const wining = [
//     [1, 1, 1, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 1, 1, 1, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 1, 1, 1],
//     [1, 0, 0, 1, 0, 0, 1, 0, 0],
//     [0, 1, 0, 0, 1, 0, 0, 1, 0],
//     [0, 0, 1, 0, 0, 1, 0, 0, 1],
//     [1, 0, 0, 0, 1, 0, 0, 0, 1],
//     [0, 0, 1, 0, 1, 0, 1, 0, 0],
//   ];
//   gameBoard.Board.forEach((a) => {
//     if (a === "X") {
//       temparray.push(1);
//     } else {
//       temparray.push(0);
//     }
//   });
//   wining.forEach((a) => {
//     let winx = 0;
//     for (let i = 0; i < a.length; i++) {
//       if (a[i] === 1 && temparray[i] === 1) {
//         winx = winx + 1;
//       }
//     }
//     if (winx >= 3) {
//       console.log(`Win X`);
//     }
//   });
// };
