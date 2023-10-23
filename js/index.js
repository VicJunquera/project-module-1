window.addEventListener("load", () => {
    const container = document.getElementById("game-board");
    const game = new Game(container);
    game.start();

})