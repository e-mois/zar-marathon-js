import { generateLogs } from "./logs.js";

export const $arena = document.querySelector('.arenas');

function getTime() {
    const date = new Date();
    const normalize = (num) => (num.toString().length > 1 ? num : `0${num}`)
    const time = `${normalize(date.getHours())}:${normalize(date.getMinutes())}:${normalize(date.getSeconds())}`;
    return time;
}

function getRandom(maxDamage) {
    return Math.ceil(Math.random() * maxDamage);
}

function createElement(tag, className) {
    const $tag = document.createElement(tag);

    if (className) {
        $tag.classList.add(className);
    }

    return $tag;
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

const $randomButton = document.querySelector('.button');

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

function checkWinner(player1, player2) {
        
    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arena.appendChild(playerWin(player2.name));
        generateLogs('end', player2.name, player1.name)
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arena.appendChild(playerWin(player1.name));
        generateLogs('end', player1.name, player2.name)
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arena.appendChild(playerWin());
        generateLogs('draw');
    }

    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
        createReloadButton();
    }
}

export { getTime, getRandom, createElement, checkWinner }