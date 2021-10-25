import { $formFight, $arena, createPlayer, generateLogs, checkWinner, enemyAttach, playerAttack } from "./utils.js";
import { player1, player2 } from "./players.js";



export let {
    name: namePlayer1,
    hp: hpPlayer1,
} = player1


export let {
    name: namePlayer2,
    hp: hpPlayer2,
} = player2


$arena.appendChild(createPlayer(player1));
$arena.appendChild(createPlayer(player2));


generateLogs('start', namePlayer1, namePlayer2);

$formFight.addEventListener('submit', function(e) {
    e.preventDefault();


    const enemy = enemyAttach();
    const {value: enemyValue, hit: enemyHit, defence: enemyDefence} = enemy

    const player = playerAttack();
    const {value: playerValue, hit: playerHit, defence: playerDefence} = player

    if (playerDefence !== enemyHit) {
        player1.changeHP(enemyValue);
        hpPlayer1 = player1.hp;
        player1.renderHP();
        generateLogs('hit', namePlayer2, namePlayer1, enemyValue, hpPlayer1);
    } else if (playerDefence === enemyHit) {
        generateLogs('defence', namePlayer2, namePlayer1, 0, hpPlayer1)
    }
    
    if (enemyDefence !== playerHit) {
        player2.changeHP(playerValue);
        hpPlayer2 = player2.hp;
        player2.renderHP();
        generateLogs('hit', namePlayer1, namePlayer2, playerValue, hpPlayer2);
    } else if (enemyDefence === playerHit) {
        generateLogs('defence', namePlayer1, namePlayer2, 0, hpPlayer2);
    }

    checkWinner();
})
