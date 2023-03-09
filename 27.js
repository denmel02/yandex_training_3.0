// В левом верхнем углу прямоугольной таблицы размером N × M находится черепашка. В каждой клетке таблицы записано некоторое число. Черепашка может перемещаться вправо или вниз, при этом маршрут черепашки заканчивается в правом нижнем углу таблицы.
// Подсчитаем сумму чисел, записанных в клетках, через которую проползла черепашка (включая начальную и конечную клетку). Найдите наибольшее возможное значение этой суммы и маршрут, на котором достигается эта сумма.

// Формат ввода
// В первой строке входных данных записаны два натуральных числа N и M, не превосходящих 100 — размеры таблицы. Далее идет N строк, каждая из которых содержит M чисел, разделенных пробелами — описание таблицы. Все числа в клетках таблицы целые и могут принимать значения от 0 до 100.

// Формат вывода
// Первая строка выходных данных содержит максимальную возможную сумму, вторая — маршрут, на котором достигается эта сумма. Маршрут выводится в виде последовательности, которая должна содержать N-1 букву D, означающую передвижение вниз и M-1 букву R, означающую передвижение направо. Если таких последовательностей несколько, необходимо вывести ровно одну (любую) из них.

// Пример

// Ввод
// 5 5
// 9 9 9 9 9
// 3 0 0 0 0
// 9 9 9 9 9
// 6 6 6 6 8
// 9 9 9 9 9

// Вывод
// 74
// D D R R R R D D

const fs = require('fs');
const fileContent = fs.readFileSync("input.txt", "utf8");

const fn = (n, m, points) => {
    const cash = Array.from({ length: n }, () => []);
    const prev = Array.from({ length: n }, () => []);

    cash[0][0] = points[0][0];

    const calc = (y, x) => {
        if (x < 0 || y < 0) {
            return;
        }

        if (cash[y][x] !== undefined) {
            return cash[y][x];
        }

        const r = calc(y, x - 1);
        const d = calc(y - 1, x);
        cash[y][x] = Math.max(d || 0, r || 0) + points[y][x];
        prev[y][x] = (() => {
            switch (true) {
                case d === undefined:
                    return 'R';
                case r === undefined:
                    return 'D';
                case d > r:
                    return 'D';
                default:
                    return 'R';
            }
        })();

        return cash[y][x];
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            calc(i,j);
        }
    }

    let cY = n - 1;
    let cX = m - 1;
    const moves = [];

    for (let i = n + m - 3; i >= 0; i--) {
        const move = prev[cY][cX];

        moves[i] = move;

        switch (move) {
            case 'D':
                cY--;
                break;
            case 'R':
                cX--;
                break;
        }
    }

    const count = cash.at(-1).at(-1);

    return `${count}\n${moves.join(' ')}`;
}

const [sizes, ...pointsStr] = fileContent.toString().split('\n');
const [n, m] = sizes.split(' ');
const points = pointsStr
    .slice(0, +n)
    .map((mPoints) => mPoints.split(' ').slice(0, +m).map((point) => +point));
const result = fn(+n, +m, points);

fs.writeFileSync("output.txt", result.toString())