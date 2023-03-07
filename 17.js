// В игре в пьяницу карточная колода раздается поровну двум игрокам. Далее они вскрывают по одной верхней карте, и тот, чья карта старше, забирает себе обе вскрытые карты, которые кладутся под низ его колоды. Тот, кто остается без карт – проигрывает. Для простоты будем считать, что все карты различны по номиналу, а также, что самая младшая карта побеждает самую старшую карту ("шестерка берет туза"). Игрок, который забирает себе карты, сначала кладет под низ своей колоды карту первого игрока, затем карту второго игрока (то есть карта второго игрока оказывается внизу колоды). Напишите программу, которая моделирует игру в пьяницу и определяет, кто выигрывает. В игре участвует 10 карт, имеющих значения от 0 до 9, большая карта побеждает меньшую, карта со значением 0 побеждает карту 9.

// Формат ввода
// Программа получает на вход две строки: первая строка содержит 5 чисел, разделенных пробелами — номера карт первого игрока, вторая – аналогично 5 карт второго игрока. Карты перечислены сверху вниз, то есть каждая строка начинается с той карты, которая будет открыта первой.

// Формат вывода
// Программа должна определить, кто выигрывает при данной раздаче, и вывести слово first или second, после чего вывести количество ходов, сделанных до выигрыша. Если на протяжении 106 ходов игра не заканчивается, программа должна вывести слово botva.

// Пример 1

// Ввод
// 1 3 5 7 9
// 2 4 6 8 0

// Вывод
// second 5

// Пример 2

// Ввод
// 2 4 6 8 0
// 1 3 5 7 9

// Вывод
// first 5

// Пример 3

// Ввод
// 1 7 3 9 4
// 5 8 0 2 6

// Вывод
// second 23


const fs = require('fs');
const fileContent = fs.readFileSync("input.txt", "utf8");

const Queue = require('./dataStructure/Queue');

const fn = (firstCards, secondCards) => {
    console.log(firstCards, secondCards)
    const first = new Queue(firstCards);
    const second = new Queue(secondCards);
    let count = 0;

    while (first.size && second.size && count < 10 ** 6) {
        const firstCard = first.pop();
        const secondCard = second.pop();
        const winner = (() => {
            switch (true) {
                case firstCard === 0 && secondCard === 9:
                    return first;
                case firstCard === 9 && secondCard === 0:
                    return second;
                case firstCard > secondCard:
                    return first;
                default:
                    return second;
            }
        })();
        winner.push(firstCard);
        winner.push(secondCard);
        count++;
    }

   switch (0) {
    case first.size:
        return `second ${count}\n`;
    case second.size:
        return `first ${count}\n`;
    default:
        return 'botva\n'
   }
}

const [f, s] = fileContent.toString().split('\n');
const result = fn(f.split(' ').slice(0, 5).map(v => +v), s.split(' ').slice(0, 5).map(v => +v));

fs.writeFileSync("output.txt", result.toString())