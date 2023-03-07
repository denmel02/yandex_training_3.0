// Имеется калькулятор, который выполняет следующие операции:

// умножить число X на 2;
// умножить число X на 3;
// прибавить к числу X единицу.
// Определите, какое наименьшее количество операций требуется, чтобы получить из числа 1 число N.

// Формат ввода
// Во входном файле написано натуральное число N, не превосходящее 106.

// Формат вывода
// В первой строке выходного файла выведите минимальное количество операций. Во второй строке выведите числа, последовательно получающиеся при выполнении операций. Первое из них должно быть равно 1, а последнее N. Если решений несколько, выведите любое.

// Пример 1

// Ввод
// 1

// Вывод
// 0
// 1

// Пример 2

// Ввод
// 5

// Вывод
// 3
// 1 3 4 5

const fs = require('fs');
const fileContent = fs.readFileSync("input.txt", "utf8");

const fn = (n) => {
    const cash = [,0, 1, 1];
    const prev = [,1, 1, 1];

    const calc = (i) => {
        if (Math.round(i) !== i) {
            return Infinity;
        }

        if (cash[i] !== undefined) {
            return cash[i];
        }

        const variants = [calc(i - 1), calc(i / 2), calc(i / 3)];
        const min = Math.min(...variants);
        const minIndex = variants.findIndex((variant) => variant === min);
        prev[i] = (() => {
            switch (minIndex) {
                case 0:
                    return i - 1;
                case 1:
                    return i / 2;
                case 2:
                    return i / 3;
            }
        })();
        cash[i] = min + 1;

        return cash[i];
    }

    for (let numb = 4; numb <=n; numb++) {
        calc(numb);
    }

    const res = [n];

    while (res.at(-1) !== 1) {
        res.push(prev[res.at(-1)]);
    }

    res.reverse()

    return `${res.length - 1}\n${res.join(' ')}`;
}

const [n] = fileContent.toString().split('\n');
const result = fn(+n);

fs.writeFileSync("output.txt", result.toString())