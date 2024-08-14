const figlet = require('figlet');

const word = ['F', 'E', 'I', 'R', 'A', ' ', 'D', 'E', ' ', 'C', 'I', 'Ê', 'N', 'C', 'I', 'A', 'S', ' ', '2', '0', '2', '4'];
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

let currentIndex = 0;
let currentLetter = 'A';
let targetLetter = word[currentIndex];
let transitionIndex = 0;

function getTransitionLetter() {
    let index = alphabet.indexOf(currentLetter);
    let targetIndex = alphabet.indexOf(targetLetter);

    if (index < targetIndex) {
        return alphabet[index + 1];
    } else if (index > targetIndex) {
        return targetLetter;
    }

    return targetLetter;
}

function render() {
    let newOutput = '';
    let letterToRender = '';

    if (currentLetter !== targetLetter) {
        currentLetter = getTransitionLetter();
    }

    for (let i = 0; i < word.length; i++) {
        if (i < currentIndex) {
            newOutput += word[i];
        } else if (i === currentIndex) {
            letterToRender = currentLetter;
            newOutput += letterToRender;
        } else {
            newOutput += ' ';
        }
    }

    if (currentLetter === targetLetter) {
        if (transitionIndex >= 20) {
            currentIndex++;
            if (currentIndex < word.length) {
                targetLetter = word[currentIndex];
                currentLetter = 'A';
            }
            transitionIndex = 0;
        }
    }

    process.stdout.write('\x1B[2J\x1B[0f');
    console.log(
        figlet.textSync(newOutput, {
            font: "Slant",
            whitespaceBreak: true
        })
    );

    transitionIndex++;
}

setInterval(render, 20);
