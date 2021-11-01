import { generateLogs } from "./logs.js";
import { Player } from "./players.js";
import { getRandom, createElement, checkWinner, $arena } from "./utils.js";


export const $formFight = document.querySelector('.control');


export let player1;
export let player2;

export class Game {
    constructor(props) {}

    createPlayer(player) {
        const {number, name, hp, img} = player;
        const $player = createElement('div', 'player' + number);
        const $progressBar = createElement('div', 'progressbar');
        const $life = createElement('div', 'life');
        const $name = createElement('div', 'name');
        const $character = createElement('div', 'character');
        const $img = createElement('img');

        $life.style.width = hp + '%';
        $name.innerText = name;
        $img.src = img;

        $progressBar.appendChild($life);
        $progressBar.appendChild($name);
        $character.appendChild($img);
        $player.appendChild($progressBar);
        $player.appendChild($character);

        return $player;

    }


    playerAttack() {
        const attack = {};

        for (let item of $formFight) {
            if (item.checked && item.name === 'hit') {
                attack.hit = item.value;
            }

            if (item.checked && item.name === 'defence') {
                attack.defence = item.value;
            }

            item.checked = false;
        
        }
        return attack;
    }

    getPlayers = async () => {
        const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
        console.log(body);
        return body;
    }

    getEnemyPlayers = async () => {
        const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());
        return body;
    }

    getAttack = async () => {
        const chooseAttack = this.playerAttack();
        const attack = fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
            method: 'POST',
            body: JSON.stringify({
                hit: chooseAttack['hit'],
                defence: chooseAttack['defence'],
            })
        }).then(res => res.json());
        return attack;
    }

    fight = async () => {
        const playersDamage = await this.getAttack()

        const player = playersDamage.player1;
        const enemy = playersDamage.player2;
            
        const {value: enemyValue, hit: enemyHit, defence: enemyDefence} = enemy
            
        const {value: playerValue, hit: playerHit, defence: playerDefence} = player
        
        if (playerDefence !== enemyHit) {
            player1.changeHP(enemyValue);
            player1.renderHP();
            generateLogs('hit', player2.name, player1.name, enemyValue, player1.hp);
        } else if (playerDefence === enemyHit) {
            generateLogs('defence', player2.name, player1.name, 0, player1.hp)
        }
            
        if (enemyDefence !== playerHit) {
            player2.changeHP(playerValue);
            player2.renderHP();
            generateLogs('hit', player1.name, player2.name, playerValue, player2.hp);
        } else if (enemyDefence === playerHit) {
            generateLogs('defence', player1.name, player2.name, 0, player2.hp);
        }
        
        checkWinner(player1, player2);
                
    }

    start = async () => {
        const players = await this.getPlayers();
        const enemy = await this.getEnemyPlayers();
        const p1 = players[getRandom(players.length) - 1];
        const p2 = enemy;

        player1 = new Player({
            ...p1,
            number: 1,
        })

        player2 = new Player({
            ...p2,
            number: 2,
        })

        $arena.appendChild(this.createPlayer(player1));
        $arena.appendChild(this.createPlayer(player2));
        generateLogs('start', player1.name, player2.name);
    }

}
