import { logs } from "./logs.js";

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];
const $arena = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $chat = document.querySelector('.chat');
export const $formFight = document.querySelector('.control');



export class Game {
    constructor(props) {
        this.player1 = props.player1;
        this.player2 = props.player2 
    }

    randomDamage = (maxDamage) => Math.ceil(Math.random() * maxDamage);

    getTime() {
        const date = new Date();
        const normalize = (num) => (num.toString().length > 1 ? num : `0${num}`)
        const time = `${normalize(date.getHours())}:${normalize(date.getMinutes())}:${normalize(date.getSeconds())}`;
        return time;
    }


    createElement(tag, className) {
        const $tag = document.createElement(tag);
    
        if (className) {
            $tag.classList.add(className);
        }
    
        return $tag;
    }

    createPlayer(player) {
        const {number, name, hp, img} = player;
        const $player = this.createElement('div', 'player' + number);
        const $progressBar = this.createElement('div', 'progressbar');
        const $life = this.createElement('div', 'life');
        const $name = this.createElement('div', 'name');
        const $character = this.createElement('div', 'character');
        const $img = this.createElement('img');

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

    playerWin(name) {
        const $winTitle = this.createElement('div', 'winTitle');
        if (name) {
            $winTitle.innerText = name + ' wins';
        } else {
            $winTitle.innerText = 'draw';
        }
    
        return $winTitle;
    }


    createReloadButton() {
        const $reloadWrap = this.createElement('div', 'reloadWrap');
        const $reloadButton = this.createElement('button', 'button');
        $reloadButton.innerText = 'restart';
            
        $reloadButton.addEventListener('click', function() {
            window.location.reload();
        });

        $reloadWrap.appendChild($reloadButton);
        $arena.appendChild($reloadWrap);
    }

    enemyAttack() {
        const hit = ATTACK[this.randomDamage(3) - 1];
        const defence = ATTACK[this.randomDamage(3) - 1];
    
        const enemy = {
            value: this.randomDamage(HIT[hit]),
            hit,
            defence,
        };

        return enemy;
    }

    playerAttack() {
        const attack = {};

        for (let item of $formFight) {
            if (item.checked && item.name === 'hit') {
                attack.value = this.randomDamage(HIT[item.value]);
                attack.hit = item.value;
            }

            if (item.checked && item.name === 'defence') {
                attack.defence = item.value;
            }

            item.checked = false;
        
        }
        return attack;
    }

    checkWinner() {
        
        if (this.player1.hp === 0 && this.player1.hp < this.player2.hp) {
            $arena.appendChild(this.playerWin(this.player2.name));
            this.generateLogs('end', this.player2.name, this.player1.name)
        } else if (this.player2.hp === 0 && this.player2.hp < this.player1.hp) {
            $arena.appendChild(this.playerWin(this.player1.name));
            this.generateLogs('end', this.player1.name, this.player2.name)
        } else if (this.player1.hp === 0 && this.player2.hp === 0) {
            $arena.appendChild(this.playerWin());
            this.generateLogs('draw');
        }
    
        if (this.player1.hp === 0 || this.player2.hp === 0) {
            $randomButton.disabled = true;
            this.createReloadButton();
        }
    }


    generateLogs(type, player1, player2, damage, hp) {
        switch (type) {
            case 'start':
                let textStart = logs[type].replace('[time]', this.getTime()).replace('[player1]', player1).replace('[player2]',player2);
                let elStart = `<p>${textStart}</p>`;
                $chat.insertAdjacentHTML('afterbegin', elStart);
                break;
            case 'hit':
                let textHit = logs[type][this.randomDamage(type.length - 1)].replace('[playerKick]', player1).replace('[playerDefence]', player2);
                let elHit = `<p>${this.getTime()} ${textHit} -${damage} [${hp}/100] </p>`
                $chat.insertAdjacentHTML('afterbegin', elHit);
                break;
            case 'defence':
                let textDefence = logs[type][this.randomDamage(type.length - 1)].replace('[playerKick]', player1).replace('[playerDefence]', player2);
                let elDefence = `<p>${this.getTime()} ${textDefence} -${damage} [${hp}/100] </p>`
                $chat.insertAdjacentHTML('afterbegin', elDefence);
                break;
            case 'end':
                let textEnd = logs[type][this.randomDamage(type.length - 1)].replace('[playerWins]', player1).replace('[playerLose]', player2);
                let elEnd = `<p>${textEnd}</p>`;
                $chat.insertAdjacentHTML('afterbegin', elEnd);
                break;
            case 'draw':
                let textDraw = logs[type];
                let elDraw = `<p>${textDraw}</p>`;
                $chat.insertAdjacentHTML('afterbegin', elDraw);
                break;
        }
    
    }

    start() {
        $arena.appendChild(this.createPlayer(this.player1));
        $arena.appendChild(this.createPlayer(this.player2));
        this.generateLogs('start', this.player1.name, this.player2.name);
    }
}
