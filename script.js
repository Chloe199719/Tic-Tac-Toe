// This ObJect Handles Board Actions

const gameBoard = (() => {
  const Board = ["", "", "", "", "", "", "", "", ""];
  let isThereaWiner = 0;
  const Player = (name, choice, turn) => {
    const getName = () => name;
    const getChoice = () => choice;
    let itsTurn = turn;
    return { getName, getChoice, itsTurn };
  };
  const setupGame = (e) => {
    e.preventDefault();
    if (
      displayControler.inputp1Name.value === "" &&
      displayControler.inputp2Name === ""
    ) {
      return;
    } else if (
      displayControler.playerChoice1.checked === false &&
      displayControler.playerChoice2.checked === false
    ) {
      return;
    } else {
      let p1;
      let p2;
      let turn;
      if (displayControler.playerChoice1.checked) {
        p1 = "X";
        p2 = "O";
        turn = true;
      } else if (displayControler.playerChoice2.checked) {
        p2 = "X";
        p1 = "O";
        turn = false;
      }
      gameBoard.player1 = gameBoard.Player(
        displayControler.inputp1Name.value,
        p1,
        turn
      );
      gameBoard.player2 = gameBoard.Player(
        displayControler.inputp2Name.value,
        p2,
        !turn
      );
      gameBoard.isThereaWiner = 0;
      displayControler.init();
      displayControler.clearForm();
      displayControler.playersInfo();
      displayControler.closeForm();
    }

    // Player("chloe", "X", true);Player("Roly", "O", false);
  };
  let player1;
  let player2;
  const reset = () => {
    gameBoard.Board = ["", "", "", "", "", "", "", "", ""];
    displayControler.rendergame();
    displayControler.woncont.textContent = "";
    gameBoard.isThereaWiner = 0;
  };
  const newgame = () => {
    gameBoard.reset();
    gameBoard.isThereaWiner = 1;
    const temp = document.querySelectorAll(`.players`);
    temp.forEach((a) => {
      a.remove();
    });
    displayControler.openForm();
    displayControler.gameinfo.classList.remove(`active`);
  };
  return {
    Board,
    Player,
    player1,
    player2,
    reset,
    setupGame,
    newgame,
    isThereaWiner,
  };
})();

const displayControler = (() => {
  const tiles = document.querySelectorAll(`.tile`);
  const resetBtn = document.querySelector(`#reset`);
  const inputp1Name = document.querySelector("#p1name");
  const inputp2Name = document.querySelector(`#p2name`);
  const playerChoice1 = document.querySelector(`#player1`);
  const playerChoice2 = document.querySelector(`#player2`);
  const startGameBtn = document.querySelector(`#strgame`);
  const gameinfo = document.querySelector(`.gameinfo`);
  const woncont = document.querySelector(`.won`);
  const newgamebtn = document.querySelector(`#newgame`);
  const grayout = document.querySelector(`#grayout`);
  const closeBtn = document.querySelector(`#close`);
  const newgameForm = document.querySelector(`#register`);
  const closeWinerbtn = document.querySelector(`#closewiner`);
  const winbox = document.querySelector(`.won-box`);

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

  const initInit = () => {
    displayControler.startGameBtn.addEventListener(
      `click`,
      gameBoard.setupGame
    );
    displayControler.newgamebtn.addEventListener(`click`, gameBoard.newgame);
    displayControler.closeBtn.addEventListener("click", closeForm);
  };
  const clearForm = () => {
    displayControler.inputp1Name.value = "";
    displayControler.inputp2Name.value = "";
    displayControler.playerChoice1.checked = false;
    displayControler.playerChoice2.checked = false;
  };
  const playersInfo = () => {
    const div1 = document.createElement(`div`);
    const div2 = document.createElement(`div`);
    div1.className = "players";
    div2.className = "players";
    div1.textContent = `${gameBoard.player1.getName()} ${gameBoard.player1.getChoice()} against `;
    div2.textContent = `${gameBoard.player2.getName()} ${gameBoard.player2.getChoice()} `;
    displayControler.gameinfo.appendChild(div1);
    displayControler.gameinfo.appendChild(div2);
    displayControler.gameinfo.classList.add(`active`);
  };
  const displayWiner = (e) => {
    if (e === "Draw") {
      woncont.textContent = `Its a Draw Neither Player Won`;
    }
    if (e === gameBoard.player1.getChoice()) {
      woncont.textContent = `${gameBoard.player1.getName()} ${e} as won this round`;
    } else if (e === gameBoard.player2.getChoice()) {
      woncont.textContent = `${gameBoard.player2.getName()} ${e} as won this round`;
    }
    displayControler.openWinner();
  };
  const openForm = () => {
    displayControler.newgameForm.classList.add("active");
    displayControler.addGrayout();
    displayControler.grayout.addEventListener(`click`, closeForm);
  };
  const closeForm = () => {
    displayControler.newgameForm.classList.remove("active");
    displayControler.removeGrayout();
    displayControler.clearForm();
  };
  const addGrayout = () => {
    displayControler.grayout.classList.add(`active`);
  };
  const removeGrayout = () => {
    displayControler.grayout.classList.remove(`active`);
  };
  const openWinner = () => {
    displayControler.winbox.classList.add(`active`);
    displayControler.grayout.addEventListener(
      `click`,
      displayControler.closeWinner
    );
    displayControler.closeWinerbtn.addEventListener(
      `click`,
      displayControler.closeWinner
    );
    displayControler.addGrayout();
  };

  const closeWinner = () => {
    displayControler.winbox.classList.remove(`active`);
    displayControler.removeGrayout();
  };
  return {
    tiles,
    rendergame,
    init,
    resetBtn,
    inputp1Name,
    inputp2Name,
    playerChoice1,
    playerChoice2,
    startGameBtn,
    initInit,
    clearForm,
    gameinfo,
    playersInfo,
    woncont,
    displayWiner,
    newgamebtn,
    grayout,
    closeBtn,
    newgameForm,
    openForm,
    closeForm,
    addGrayout,
    removeGrayout,
    openWinner,
    closeWinner,
    closeWinerbtn,
    winbox,
  };
})();

const gameLogic = (() => {
  const round = (e) => {
    if (gameBoard.isThereaWiner === 0) {
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
    }
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
      displayControler.displayWiner("O");
      gameBoard.isThereaWiner = 1;
    } else if (gameLogic.convertX(Board) === true) {
      displayControler.displayWiner("X");
      gameBoard.isThereaWiner = 1;
    } else if (gameLogic.checkDraw(Board) === true) {
      displayControler.displayWiner(`Draw`);
      gameBoard.isThereaWiner = 1;
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

displayControler.initInit();

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
