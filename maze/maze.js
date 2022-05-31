const hoverDeath = document.querySelectorAll('.hover-death');
const goal = document.querySelector('.goal')
const giveUpBtn = document.querySelector('.give-up-btn');

const mazeLose = () => {
    // alert('you lose')
    window.location.replace('about.html')
    // console.log('you lose')
}

const mazeWin = () => {
    alert('you win!')
}

const giveUp = () => {
    window.location.replace('game-night.html')
}

if (hoverDeath !== null) {
    for (let i = 0; i < hoverDeath.length; i++) {
        hoverDeath[i].addEventListener('mouseover', mazeLose)
    }
}

if (goal !== null) {
    goal.addEventListener('dblclick', mazeWin)
}

giveUpBtn.addEventListener('click', giveUp)
