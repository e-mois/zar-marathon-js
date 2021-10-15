const $arena = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    number: 1,
    name: 'Scorpion',
    hp: 100,
    img:'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['supershout'],
    attack: function() {
        console.log(player1.name + ' ' + 'Fight!');
    }
}

const player2 = {
    number: 2,
    name: 'Kitana',
    hp: 100,
    img:'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['megasupershout'],
    attack: function() {
        console.log(player2.name + ' ' + 'Fight!');
    }
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

function changeHp(player) {
    const $playerLife = document.querySelector('.player' + player.number + ' .life');
    player.hp -= randomDamage(20);
    
    if (player.hp < 0) {
        player.hp = 0;
        $randomButton.disabled = true;
        $arena.appendChild(checkWinner(player));
    }

    $playerLife.style.width = player.hp + '%';
}

function playerWin(name) {
    const $winTitle = createElement('div', 'winTitle');
    $winTitle.innerText = name + ' wins'
    return $winTitle;
}

function checkWinner(player) {
    const $winner = player.number == 1 ? playerWin(player2.name) : playerWin(player1.name);
    return $winner;
}

function randomDamage(maxDamage) {
    const damage = Math.ceil(Math.random() * maxDamage);
    return damage;
}


$randomButton.addEventListener('click', function() {
    changeHp(player1);
    changeHp(player2);
})

$arena.appendChild(createPlayer(player1));
$arena.appendChild(createPlayer(player2));
