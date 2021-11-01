import { Game, $formFight } from "./game.js";


const game = new Game()

game.start()

$formFight.addEventListener('submit', function(e) {
    e.preventDefault();
    game.fight();
})
