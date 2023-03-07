// У одного из студентов в комнате живёт кузнечик, который очень любит прыгать по клетчатой одномерной доске. Длина доски — N клеток. К его сожалению, он умеет прыгать только на 1, 2, …, k клеток вперёд.

// Однажды студентам стало интересно, сколькими способами кузнечик может допрыгать из первой клетки до последней. Помогите им ответить на этот вопрос.

// Формат ввода
// В первой и единственной строке входного файла записано два целых числа — N и k .

// Формат вывода
// Выведите одно число — количество способов, которыми кузнечик может допрыгать из первой клетки до последней.

// Пример

// Ввод
// 8 2

// Вывод
// 21

const fs = require('fs');
const fileContent = fs.readFileSync("input.txt", "utf8");

const fn = (n, k) => {
    const cash = [1];

    const calc = (i) => {
        if (i < 0) {
            return 0;
        }

        if (cash[i]) {
            return cash[i];
        }

        let sum = 0;

        for (let index = 1; index <= k; index++) {
            sum += calc(i - index);
        }

        cash[i] = sum;

        return sum;
    }

    return calc(n - 1);
}

const [line] = fileContent.toString().split('\n');
const [n, k] = line.split(' ');
const result = fn(+n, +k);

fs.writeFileSync("output.txt", result.toString())