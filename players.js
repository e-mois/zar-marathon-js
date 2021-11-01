export class Player {
    constructor(props) {
        this.number = props.number;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
    }

    changeHP(damage) {

        this.hp -= damage;
        
        if (this.hp < 0) {
            this.hp = 0;
        }
    }

    elHP() {
        const $playerLife = document.querySelector(`.player${this.number} .life`);
        return $playerLife
    }

    renderHP() {
        this.elHP().style.width = `${this.hp}%`;
    }
}

// export const player1 = {
//     number: 1,
//     name: 'Scorpion',
//     hp: 100,
//     img:'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
//     weapon: ['supershout'],
//     attack: function() {
//         console.log(player1.name + ' ' + 'Fight!');
//     },
//     changeHP,
//     elHP,
//     renderHP,
// }

// export const player2 = {
//     number: 2,
//     name: 'Kitana',
//     hp: 100,
//     img:'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
//     weapon: ['megasupershout'],
//     attack: function() {
//         console.log(player2.name + ' ' + 'Fight!');
//     },
//     changeHP,
//     elHP,
//     renderHP,
// }
