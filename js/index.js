window.addEventListener("load", () => {
  const container = document.getElementById("game-board");
  const titleGame = document.getElementById("title-game");
  const btnStart = document.getElementById("intro-game-btn");
  titleGame.style.transform = "translate(0,170px)";
  titleGame.style.transition = "2s";
  btnStart.style.transform = "translate(0,-250px)";
  btnStart.style.transition = "2s";
  btnStart.addEventListener("click", () => {
    const game = new Game(container);
    game.start();
    titleGame.style.transform = "translate(0,-100px)";
    titleGame.style.transition = "2s";
    btnStart.style.transform = "translate(0, 100px)";
    btnStart.style.transition = "2s";
  });
});
