const $arena = document.querySelector('.arenas');
const $arenaControl = document.querySelector('.arenas .control');
const $randomButton = document.querySelector('.button');

const player1 = {
    number: 1,
    name: 'Scorpion',
    hp: 100,
    img:'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['supershout'],
    attack: function() {
        console.log(player1.name + ' ' + 'Fight!');
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
}

const player2 = {
    number: 2,
    name: 'Kitana',
    hp: 100,
    img:'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['megasupershout'],
    attack: function() {
        console.log(player2.name + ' ' + 'Fight!');
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
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

function changeHP(damage) {

    this.hp -= damage;
    
    if (this.hp < 0) {
        this.hp = 0;
    }
}

function elHP() {
    const $playerLife = document.querySelector('.player' + this.number + ' .life');
    return $playerLife
}

function renderHP(element) {
    element.style.width = this.hp + '%';
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


function randomDamage(maxDamage) {
    const damage = Math.ceil(Math.random() * maxDamage);
    return damage;
}

function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'restart';
    $reloadWrap.appendChild($reloadButton);
    return $reloadWrap;
}


$randomButton.addEventListener('click', function() {
    player1.changeHP(randomDamage(20));
    player2.changeHP(randomDamage(20));

    player1.renderHP(player1.elHP());
    player2.renderHP(player2.elHP());

    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
        $arenaControl.appendChild(createReloadButton());
        const $reloadButton = document.querySelector('.reloadWrap .button');
        $reloadButton.addEventListener('click', function() {
            window.location.reload();
        })
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arena.appendChild(playerWin(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arena.appendChild(playerWin(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arena.appendChild(playerWin());
    } 
})


$arena.appendChild(createPlayer(player1));
$arena.appendChild(createPlayer(player2));
