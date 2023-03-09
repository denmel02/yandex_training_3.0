// Дана прямоугольная доска N × M (N строк и M столбцов). В левом верхнем углу находится шахматный конь, которого необходимо переместить в правый нижний угол доски. В данной задаче конь может перемещаться на две клетки вниз и одну клетку вправо или на одну клетку вниз и две клетки вправо.

// Необходимо определить, сколько существует различных маршрутов, ведущих из левого верхнего в правый нижний угол.

// Формат ввода
// Входной файл содержит два натуральных числа N и M , .

// Формат вывода
// В выходной файл выведите единственное число — количество способов добраться конём до правого нижнего угла доски.

// Пример 1

// Ввод
// 3 2

// Вывод
// 1
// Пример 2

// Ввод
// 31 34

// Вывод
// 293930

const fs = require('fs');
const fileContent = fs.readFileSync("input.txt", "utf8");

const fn = (n, m) => {
    const cash = Array.from({ length: n }, () => []);

    cash[0][0] = 1;

    const calc = (y, x) => {
        if (x < 0 || y < 0) {
            return 0;
        }

        if (cash[y][x] !== undefined) {
            return cash[y][x];
        }

        cash[y][x] = calc(y - 1, x - 2) + calc(y - 2, x - 1);

        return cash[y][x];
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            calc(i,j);
        }
    }

    return cash.at(-1).at(-1);
}

const [sizes] = fileContent.toString().split('\n');
const [n, m] = sizes.split(' ');
const result = fn(+n, +m);

fs.writeFileSync("output.txt", result.toString())