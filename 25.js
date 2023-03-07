// В дощечке в один ряд вбиты гвоздики. Любые два гвоздика можно соединить ниточкой. Требуется соединить некоторые пары гвоздиков ниточками так, чтобы к каждому гвоздику была привязана хотя бы одна ниточка, а суммарная длина всех ниточек была минимальна.

// Формат ввода
// В первой строке входных данных записано число N — количество гвоздиков (2 ≤ N ≤ 100). В следующей строке заданы N чисел — координаты всех гвоздиков (неотрицательные целые числа, не превосходящие 10000).

// Формат вывода
// Выведите единственное число — минимальную суммарную длину всех ниточек.

// Пример

// Ввод
// 6
// 3 13 12 4 14 6

// Вывод
// 5


const fs = require('fs');
const fileContent = fs.readFileSync("input.txt", "utf8");

const fn = (points) => {
    const cash = [points[1] - points[0], points[1] - points[0]];

    for (let i = 2; i < points.length; i++) {
        cash[i] = Math.min(cash[i - 1], cash[i - 2]) + points[i] - points[i - 1];
    }

    return cash.at(-1);
}

const [n, pointsStr] = fileContent.toString().split('\n');
const result = fn(pointsStr.split(' ').slice(0, +n).map((point) => +point).sort((a, b) => a - b));

fs.writeFileSync("output.txt", result.toString())