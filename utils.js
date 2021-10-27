import { logs } from "./logs.js";
import { hpPlayer1, hpPlayer2, namePlayer1, namePlayer2 } from "./main.js";

export const $arena = document.querySelector('.arenas');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];

const $randomButton = document.querySelector('.button');
const $chat = document.querySelector('.chat');
export const $formFight = document.querySelector('.control');

const randomDamage = (maxDamage) => Math.ceil(Math.random() * maxDamage);

function getTime() {
    const date = new Date();
    const normalize = (num) => (num.toString().length > 1 ? num : `0${num}`)
    const time = `${normalize(date.getHours())}:${normalize(date.getMinutes())}:${normalize(date.getSeconds())}`;
    return time;
}


function createElement(tag, className) {
    const $tag = document.createElement(tag);
    
    if (className) {
        $tag.classList.add(className);
    }
    
    return $tag;
}

function createPlayer(player) {
    
    const $player = createElement('div', 'player' + player.number);
    const $progressBar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $character = createElement('div', 'character');
    const $img = createElement('img');

    $life.style.width = player.hp + '%';
    $name.innerText = player.name;
    $img.src = player.img;

    $progressBar.appendChild($life);
    $progressBar.appendChild($name);
    $character.appendChild($img);
    $player.appendChild($progressBar);
    $player.appendChild($character);

    return $player;

}

function playerWin(name) {
    const $winTitle = createElement('div', 'winTitle');
    if (name) {
        $winTitle.innerText = name + ' wins';
    } else {
        $winTitle.innerText = 'draw';
    }
    
    return $winTitle;
}


function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'restart';
            
    $reloadButton.addEventListener('click', function() {
        window.location.reload();
    });

    $reloadWrap.appendChild($reloadButton);
    $arena.appendChild($reloadWrap);
}

const enemyAttach = () => {
    const hit = ATTACK[randomDamage(3) - 1];
    const defence = ATTACK[randomDamage(3) - 1];
    
    const enemy = {
        value: randomDamage(HIT[hit]),
        hit,
        defence,
    };

    return enemy;
}

const playerAttack = () => {
    const attack = {};

    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = randomDamage(HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        item.checked = false;
    }

    return attack;
}

function checkWinner() {
    if (hpPlayer1 === 0 && hpPlayer1 < hpPlayer2) {
        $arena.appendChild(playerWin(namePlayer2));
        generateLogs('end', namePlayer2, namePlayer1)
    } else if (hpPlayer2 === 0 && hpPlayer2 < hpPlayer1) {
        $arena.appendChild(playerWin(namePlayer1));
        generateLogs('end', namePlayer1, namePlayer2)
    } else if (hpPlayer1 === 0 && hpPlayer2 === 0) {
        $arena.appendChild(playerWin());
        generateLogs('draw');
    }
    
    if (hpPlayer1 === 0 || hpPlayer2 === 0) {
        $randomButton.disabled = true;
        createReloadButton();
    }
}


function generateLogs(type, player1, player2, damage, hp){
    switch (type) {
        case 'start':
            let textStart = logs[type].replace('[time]', getTime()).replace('[player1]', player1).replace('[player2]',player2);
            let elStart = `<p>${textStart}</p>`;
            $chat.insertAdjacentHTML('afterbegin', elStart);
            break
        case 'hit':
            let textHit = logs[type][randomDamage(type.length - 1)].replace('[playerKick]', player1).replace('[playerDefence]', player2);
            let elHit = `<p>${getTime()} ${textHit} -${damage} [${hp}/100] </p>`
            $chat.insertAdjacentHTML('afterbegin', elHit);
            break
        case 'defence':
            let textDefence = logs[type][randomDamage(type.length - 1)].replace('[playerKick]', player1).replace('[playerDefence]', player2);
            let elDefence = `<p>${getTime()} ${textDefence} 0 [${hp}/100] </p>`
            $chat.insertAdjacentHTML('afterbegin', elDefence);
            break
        case 'end':
            let textEnd = logs[type][randomDamage(type.length - 1)].replace('[playerWins]', player1).replace('[playerLose]', player2);
            let elEnd = `<p>${textEnd}</p>`;
            $chat.insertAdjacentHTML('afterbegin', elEnd);
            break
        case 'draw':
            let textDraw = logs[type];
            let elDraw = `<p>${textDraw}</p>`;
            $chat.insertAdjacentHTML('afterbegin', elDraw);
            break
    }
    
}


export {randomDamage, createPlayer, generateLogs, checkWinner, enemyAttach, playerAttack};