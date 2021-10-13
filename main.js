const player1 ={
    name: 'Scorpion',
    hp: 100,
    img:'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['supershout'],
    attack: function() {
        console.log(player1.name + ' ' + 'Fight!');
    }
}

const player2 ={
    name: 'Kitana',
    hp: 100,
    img:'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['megasupershout'],
    attack: function() {
        console.log(player2.name + ' ' + 'Fight!');
    }
}

function createPlayer(className, player, hp) {
    const $arena = document.querySelector('.arenas');
    const $player = document.createElement('div');
    $player.classList.add(className);
    const $progressBar = document.createElement('div');
    $progressBar.classList.add('progressbar');
    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.style.width = '100%';
    const $name = document.createElement('div');
    $name.classList.add('name');
    $name.innerText = player.name;
    $progressBar.appendChild($life);
    $progressBar.appendChild($name);
    const $character = document.createElement('div');
    $character.classList.add('character');
    const $img = document.createElement('img');
    $img.src = player.img;
    $character.appendChild($img);
    $player.appendChild($progressBar);
    $player.appendChild($character);
    $arena.appendChild($player);
}

createPlayer('player1', player1);
createPlayer('player2', player2);
