// Вам необходимо ответить на запросы узнать сумму всех элементов числовой матрицы N×M в прямоугольнике с левым верхним углом (x1, y1) и правым нижним (x2, y2)

// Формат ввода
// В первой строке находится числа N, M размеры матрицы (1 ≤ N, M ≤ 1000) и K — количество запросов (1 ≤ K ≤ 100000). Каждая из следующих N строк содержит по M чисел`— элементы соответствующей строки матрицы (по модулю не превосходят 1000). Последующие K строк содержат по 4 целых числа, разделенных пробелом x1 y1 x2 y2 — запрос на сумму элементов матрице в прямоугольнике (1 ≤ x1 ≤ x2 ≤ N, 1 ≤ y1 ≤ y2 ≤ M)

// Формат вывода
// Для каждого запроса на отдельной строке выведите его результат — сумму всех чисел в элементов матрице в прямоугольнике (x1, y1), (x2, y2)

// Пример

// Ввод
// 3 3 2
// 1 2 3
// 4 5 6
// 7 8 9
// 2 2 3 3
// 1 1 2 3

// Вывод
// 28
// 21

const fs = require('fs');
const fileContent = fs.readFileSync("input.txt", "utf8");

const fn = (str) => {
    const [ settingsStr, ...pointsStr ] = str.split('\n');
    const [ nStr, mStr, kStr ] = settingsStr.split(' ');
    const n = +nStr;
    const m = +mStr;
    const k = +kStr;
    const matrix = pointsStr
        .slice(0, n)
        .map((pointStr) => pointStr.split(' ').slice(0, m).map((numbStr) => +numbStr));
    const coordinates = pointsStr
        .slice(n, n + k)
        .map((coordinatesStr) => coordinatesStr.split(' ').slice(0, 4).map((coordinateStr) => +coordinateStr - 1));
    const matrixSum = [];

    for (let x = 0; x < n; x++) {
        matrixSum[x] = [];

        for (let y = 0; y < m; y++) {
            matrixSum[x][y] = matrix[x][y];

            if (x > 0) {
                matrixSum[x][y] += matrixSum[x - 1][y];
            }

            if (y > 0) {
                matrixSum[x][y] += matrixSum[x][y - 1];
            }

            if (x > 0 && y > 0) {
                matrixSum[x][y] -= matrixSum[x - 1][y - 1];
            }
        }
    }

    const sums = coordinates.map((coordinate) => {
        const [ x1, y1, x2, y2] = coordinate;

        let sum = matrixSum[x2][y2];

        if (y1 > 0) {
            sum -= matrixSum[x2][y1 - 1];
        }

        if (x1 > 0) {
            sum -= matrixSum[x1 - 1][y2];
        }

        if (x1 > 0 && y1 > 0) {
            sum += matrixSum[x1 - 1][y1 - 1];
        }

        return sum;
    });

    return sums.join('\n');
}

const result = fn(fileContent.toString());

fs.writeFileSync("output.txt", result.toString())