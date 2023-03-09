// Даны две последовательности, требуется найти и вывести их наибольшую общую подпоследовательность.

// Формат ввода
// В первой строке входных данных содержится число N – длина первой последовательности (1 ≤ N ≤ 1000). Во второй строке заданы члены первой последовательности (через пробел) – целые числа, не превосходящие 10000 по модулю.

// В третьей строке записано число M – длина второй последовательности (1 ≤ M ≤ 1000). В четвертой строке задаются члены второй последовательности (через пробел) – целые числа, не превосходящие 10000 по модулю.

// Формат вывода
// Требуется вывести наибольшую общую подпоследовательность данных последовательностей, через пробел.

// Пример 1

// Ввод
// 3
// 1 2 3
// 3
// 2 3 1

// Вывод
// 2 3

// Пример 2
// Ввод
// 3
// 1 2 3
// 3
// 3 2 1

// Вывод
// 1

const fs = require('fs');
const fileContent = fs.readFileSync("input.txt", "utf8");

const fn = (arrC1, arrC2) => {
    const arr1 = arrC1.filter((item) => arrC2.includes(item));
    const arr2 = arrC2.filter((item) => arr1.includes(item));
    const cash = Array.from({ length: arr1.length }, () => []);
    const calc = (i1, i2) => {
        if (i1 < 0 || i2 < 0) {
            return 0;
        }

        if (cash[i1][i2] !== undefined) {
            return cash[i1][i2];
        }

        cash[i1][i2] = arr1[i1] === arr2[i2] ?
            calc(i1 - 1, i2 - 1) + 1 :
            Math.max(calc(i1 - 1, i2), calc(i1, i2 - 1));

        return cash[i1][i2];
    }

    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            calc(i, j);
        }
    }

    let i1 = arr1.length - 1;
    let i2 = arr2.length - 1;
    const res = [];

    while (i1 >= 0 && i2 >= 0) {
        const left = calc(i1, i2 - 1);
        const top = calc(i1 - 1, i2);
        const current = calc(i1, i2);
        const cross = calc(i1 - 1, i2 - 1);

        if (top === left && current === cross + 1) {
            res.push(arr2[i2]);
            i1--;
            i2--;
            continue;
        }

        if (top === current && i1) {
            i1--;
            continue;
        }

        i2--;
    }

    return res.reverse().join(' ');
}


const [n1, str1, n2, str2] = fileContent.toString().split('\n');
const result = fn(str1.split(' ').slice(0, +n1), str2.split(' ').slice(0, +n2));

fs.writeFileSync("output.txt", result.toString())