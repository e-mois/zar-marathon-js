const $arena = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

const player1 = {
    number: 1,
    name: 'Scorpion',
    hp: 100,
    img:'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['supershout'],
    attack: function() {
        console.log(player1.name + ' ' + 'Fight!');
    },
    changeHP,
    elHP,
    renderHP,
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
    changeHP,
    elHP,
    renderHP,
}

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

function renderHP() {
    this.elHP().style.width = this.hp + '%';
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
            
    $reloadButton.addEventListener('click', function() {
        window.location.reload();
    });

    $reloadWrap.appendChild($reloadButton);
    $arena.appendChild($reloadWrap);
}


// $randomButton.addEventListener('click', function() {
//     player1.changeHP(randomDamage(20));
//     player2.changeHP(randomDamage(20));

//     player1.renderHP(player1.elHP());
//     player2.renderHP(player2.elHP());

//     if (player1.hp === 0 || player2.hp === 0) {
//         $randomButton.disabled = true;
//         createReloadButton();
//     }

//     if (player1.hp === 0 && player1.hp < player2.hp) {
//         $arena.appendChild(playerWin(player2.name));
//     } else if (player2.hp === 0 && player2.hp < player1.hp) {
//         $arena.appendChild(playerWin(player1.name));
//     } else if (player1.hp === 0 && player2.hp === 0) {
//         $arena.appendChild(playerWin());
//     } 
// })


$arena.appendChild(createPlayer(player1));
$arena.appendChild(createPlayer(player2));



function enemyAttach() {
    const hit = ATTACK[randomDamage(3) - 1];
    const defence = ATTACK[randomDamage(3) - 1];
    
    return {
        value: randomDamage(HIT[hit]),
        hit,
        defence,
    }
}

function playerAttack() {
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
    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arena.appendChild(playerWin(player2.name));
        generateLogs('end', player2, player1)
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arena.appendChild(playerWin(player1.name));
        generateLogs('end', player1, player2)
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arena.appendChild(playerWin());
        generateLogs('draw');
    }
    
    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
        createReloadButton();
    }
}


function generateLogs(type, player1, player2, damage, hp){
    switch (type) {
        case 'start':
            let textStart = logs[type].replace('[time]', getTime()).replace('[player1]', player1.name).replace('[player2]', player2.name);
            let elStart = `<p>${textStart}</p>`;
            $chat.insertAdjacentHTML('afterbegin', elStart);
            break
        case 'hit':
            let textHit = logs[type][randomDamage(type.length - 1)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            let elHit = `<p>${getTime()} ${textHit} -${damage} [${hp}/100] </p>`
            $chat.insertAdjacentHTML('afterbegin', elHit);
            break
        case 'defence':
            let textDefence = logs[type][randomDamage(type.length - 1)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            let elDefence = `<p>${getTime()} ${textDefence} 0 [${hp}/100] </p>`
            $chat.insertAdjacentHTML('afterbegin', elDefence);
            break
        case 'end':
            let textEnd = logs[type][randomDamage(type.length - 1)].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
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

generateLogs('start', player1, player2);

$formFight.addEventListener('submit', function(e) {
    e.preventDefault();
    const enemy = enemyAttach();
    const player = playerAttack();

    if (player.defence !== enemy.hit) {
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs('hit', player2, player1, enemy.value, player1.hp);
    } else if (player.defence === enemy.hit) {
        generateLogs('defence', player2, player1, 0, player1.hp)
    }
    
    if (enemy.defence !== player.hit) {
        player2.changeHP(player.value);
        player2.renderHP();
        generateLogs('hit', player1, player2, player.value, player2.hp);
    } else if (enemy.defence === player.hit) {
        generateLogs('defence', player1, player2, 0, player2.hp);
    }

    checkWinner();
})


