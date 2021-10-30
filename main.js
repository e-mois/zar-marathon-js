import { Player } from "./players.js";
import { Game, $formFight } from "./game.js";

const player1 = new Player({
    number: 1,
    name: 'Scorpion',
    hp: 100,
    img:'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
})

const player2 = new Player({
    number: 2,
    name: 'Kitana',
    hp: 100,
    img:'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
})

const game = new Game({
    player1: player1,
    player2: player2,
})

game.start()

$formFight.addEventListener('submit', function(e) {
    e.preventDefault();

    const enemy = game.enemyAttack();
    const {value: enemyValue, hit: enemyHit, defence: enemyDefence} = enemy

    const player = game.playerAttack();
    const {value: playerValue, hit: playerHit, defence: playerDefence} = player

    if (playerDefence !== enemyHit) {
        player1.changeHP(enemyValue);
        player1.renderHP();
        game.generateLogs('hit', player2.name, player1.name, enemyValue, player1.hp);
    } else if (playerDefence === enemyHit) {
        game.generateLogs('defence', player2.name, player1.name, 0, player1.hp)
    }
    
    if (enemyDefence !== playerHit) {
        player2.changeHP(playerValue);
        player2.renderHP();
        game.generateLogs('hit', player1.name, player2.name, playerValue, player2.hp);
    } else if (enemyDefence === playerHit) {
        game.generateLogs('defence', player1.name, player2.name, 0, player2.hp);
    }

    game.checkWinner();
})
