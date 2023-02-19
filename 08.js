// На клетчатой плоскости закрашено K клеток. Требуется найти минимальный по площади прямоугольник, со сторонами, параллельными линиям сетки, покрывающий все закрашенные клетки.

// Формат ввода
// Во входном файле, на первой строке, находится число K (1 ≤ K ≤ 100). На следующих K строках находятся пары чисел Xi и Yi – координаты закрашенных клеток (|Xi|, |Yi| ≤ 109).

// Формат вывода
// Выведите в выходной файл координаты левого нижнего и правого верхнего углов прямоугольника.

// Пример

// Ввод
// 3
// 1 1
// 1 10
// 5 5

// Вывод
// 1 1 5 10

const fs = require('fs');
const fileContent = fs.readFileSync("input.txt", "utf8");

const fn = (str) => {
    const [ nStr, ...pointsStr ] = str.split('\n');
    const xSet = new Set();
    const ySet = new Set();

    pointsStr.slice(0, +nStr).forEach(pointStr => {
        const [xStr, yStr] = pointStr.split(' ');

        xSet.add(+xStr);
        ySet.add(+yStr);
    });
    const xArray = [...xSet.values()]
    const yArray = [...ySet.values()]

    return [Math.min(...xArray), Math.min(...yArray), Math.max(...xArray), Math.max(...yArray) ].join(' ')
}

const result = fn(fileContent.toString());

fs.writeFileSync("output.txt", result.toString())