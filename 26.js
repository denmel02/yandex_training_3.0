// В каждой клетке прямоугольной таблицы  N × M записано некоторое число. Изначально игрок находится в левой верхней клетке. За один ход ему разрешается перемещаться в соседнюю клетку либо вправо, либо вниз (влево и вверх перемещаться запрещено). При проходе через клетку с игрока берут столько килограммов еды, какое число записано в этой клетке (еду берут также за первую и последнюю клетки его пути).
// Требуется найти минимальный вес еды в килограммах, отдав которую игрок может попасть в правый нижний угол.

// Формат ввода
// Вводятся два числа N и M — размеры таблицы ( 1 ≤ N ≤ 20 ,  1 ≤ M ≤ 20 ). Затем идет N строк по M чисел в каждой — размеры штрафов в килограммах за прохождение через соответствующие клетки (числа от 0 до 100).

// Формат вывода
// Выведите минимальный вес еды в килограммах, отдав которую можно попасть в правый нижний угол.

// Пример

// Ввод
// 5 5
// 1 1 1 1 1
// 3 100 100 100 100
// 1 1 1 1 1
// 2 2 2 2 1
// 1 1 1 1 1

// Вывод
// 11

const fs = require('fs');
const fileContent = fs.readFileSync("input.txt", "utf8");

const fn = (points) => {
    const cash = [ [ points[0][0] ] ];

    const calc = (x, y) => {
        if (x < 0 || y < 0 || !points[x] || points[x][y] === undefined) {
            return Infinity;
        }

        if (cash[x] && cash[x][y] !== undefined) {
            return cash[x][y];
        }

        if (!cash[x]) {
            cash[x] = [];
        }

        cash[x][y] = Math.min(calc(x-1, y), calc(x, y - 1)) + points[x][y];

        return cash[x][y];
    }

    for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points[i].length; j++) {
            calc(i,j);
        }
    }

    return cash.at(-1).at(-1);
}

const [sizes, ...pointsStr] = fileContent.toString().split('\n');
const [n, m] = sizes.split(' ');
const points = pointsStr
    .slice(0, +n)
    .map((mPoints) => mPoints.split(' ').slice(0, +m).map((point) => +point));
const result = fn(points);

fs.writeFileSync("output.txt", result.toString())