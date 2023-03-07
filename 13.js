// В постфиксной записи (или обратной польской записи) операция записывается после двух операндов. Например, сумма двух чисел A и B записывается как A B +. Запись B C + D * обозначает привычное нам (B + C) * D, а запись A B C + D * + означает A + (B + C) * D. Достоинство постфиксной записи в том, что она не требует скобок и дополнительных соглашений о приоритете операторов для своего чтения.

// Формат ввода
// В единственной строке записано выражение в постфиксной записи, содержащее цифры и операции +, -, *. Цифры и операции разделяются пробелами. В конце строки может быть произвольное количество пробелов.

// Формат вывода
// Необходимо вывести значение записанного выражения.

// Пример

// Ввод
// 8 9 + 1 7 - *

// Вывод
// -102


const fs = require('fs');
const fileContent = fs.readFileSync("input.txt", "utf8");

const Stack = require('./dataStructure/Stack');

const fn = (str) => {
    const stack = new Stack();
    const arr = str.split(' ');
    const funs = {
        '-': (a, b) => a - b,
        '+': (a, b) => a + b,
        '*': (a, b) => a * b
    }

    for (let value of arr) {
        switch(value) {
            case '+':
            case '-':
            case '*': {
                const second = stack.pop();
                const first = stack.pop();

                stack.push(funs[value](first, second));
                break;
            }
            default:
                stack.push(+value);
        }
    }

    return stack.pop();
}

const result = fn(fileContent.toString().split('\n')[0]);

fs.writeFileSync("output.txt", result.toString())