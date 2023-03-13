// Пещера представлена кубом, разбитым на N частей по каждому измерению (то есть на N3 кубических клеток). Каждая клетка может быть или пустой, или полностью заполненной камнем. Исходя из положения спелеолога в пещере, требуется найти, какое минимальное количество перемещений по клеткам ему требуется, чтобы выбраться на поверхность. Переходить из клетки в клетку можно, только если они обе свободны и имеют общую грань.

// Формат ввода
// В первой строке содержится число N (1 ≤ N ≤ 30). Далее следует N блоков. Блок состоит из пустой строки и N строк по N символов: # - обозначает клетку, заполненную камнями, точка - свободную клетку. Начальное положение спелеолога обозначено заглавной буквой S. Первый блок представляет верхний уровень пещеры, достижение любой свободной его клетки означает выход на поверхность. Выход на поверхность всегда возможен.

// Формат вывода
// Вывести одно число - длину пути до поверхности.

// Пример

// Ввод
// 3

// ###
// ###
// .##

// .#.
// .#S
// .#.

// ###
// ...
// ###

// Вывод
// 6

// Примечания
// Нужно спуститься на уровень вниз, сделать два движения на запад, подняться на уровень вверх, сделать движение на юг, подняться на уровень вверх.

const fs = require('fs');
const fileContent = fs.readFileSync("input.txt", "utf8");

const Queue = require('./dataStructure/Queue');

const parse = (str) => {
    const [ nStr, ...levels] = str.split('\n\n');
    const n = +nStr;
    let start = { k: 0, i: 0, j: 0 };
    const cube = levels
        .slice(0 , n)
        .map((level, k) =>
            level
                .split('\n')
                .slice(0 , n)
                .map((level, i) =>
                    level
                        .split('')
                        .slice(0, n)
                        .map((point, j) => {
                            switch (point) {
                                case '.':
                                    return 1;
                                case 'S': {
                                    start = { k, i, j };

                                    return 1;
                                }
                                default:
                                    return 0;
                            }
                        })
                )
        )

    return { n, cube, start }
}

const getPoints = (n, cube, point) => {
    const { k, i, j } = point;
    return points = [
        { k, i: i - 1, j },
        { k, i: i + 1, j },
        { k, i, j: j - 1 },
        { k, i, j: j + 1 },
        { k: k - 1, i, j },
        { k: k + 1, i, j },
    ].filter((point) => {
        const { k: pK, i: pI, j: pJ } = point;

        return cube[pK] && cube[pK][pI] && cube[pK][pI][pJ];
    })
}

const wsd = ({ n, cube, start }) => {
    const queue = new Queue();
    const table = Array.from({ length: n }, () => Array.from({ length: n }, () => []));

    table[start.k][start.i][start.j] = 0;

    queue.push(start);

    console.log(cube)
    console.log(start)
    console.log('=====')

    while (queue.size) {
        const point = queue.pop();
        const currentDist = table[point.k][point.i][point.j];

        if (!point.k) {
            return currentDist;
        }

        const nextDist = currentDist + 1;

        getPoints(n, cube, point).forEach((nextPoint) => {
            if (table[nextPoint.k][nextPoint.i][nextPoint.j] === undefined) {
                table[nextPoint.k][nextPoint.i][nextPoint.j] = nextDist;

                queue.push(nextPoint);
            }
        });
    }

    return -1;
}

const data = parse(fileContent.toString());
const result = wsd(data);

fs.writeFileSync("output.txt", result.toString())