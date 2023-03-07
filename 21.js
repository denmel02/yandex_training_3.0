// По данному числу N определите количество последовательностей из нулей и единиц длины N, в которых никакие три единицы не стоят рядом.

// Формат ввода
// Во входном файле написано натуральное число N, не превосходящее 35.

// Формат вывода
// Выведите количество искомых последовательностей. Гарантируется, что ответ не превосходит 231-1.

// Пример

// Ввод
// 1

// Вывод
// 2

const fs = require('fs');
const fileContent = fs.readFileSync("input.txt", "utf8");

const fn = (n) => {
    const cash = [];

    cash[1] = 2;
    cash[2] = 4;
    cash[3] = 7;

    const calc = (k) => {
        if (cash[k]) {
            return cash[k];
        }

        const res = calc(k - 1) + calc(k - 2) + calc(k - 3);

        cash[k] = res;

        return res;
    }

    return calc(n);
}

const [n] = fileContent.toString().split('\n');
const result = fn(+n);

fs.writeFileSync("output.txt", result.toString())