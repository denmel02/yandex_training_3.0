// Рассмотрим последовательность, состоящую из круглых, квадратных и фигурных скобок. Программа дожна определить, является ли данная скобочная последовательность правильной. Пустая последовательность явлется правильной. Если A – правильная, то последовательности (A), [A], {A} – правильные. Если A и B – правильные последовательности, то последовательность AB – правильная.

// Формат ввода
// В единственной строке записана скобочная последовательность, содержащая не более 100000 скобок.

// Формат вывода
// Если данная последовательность правильная, то программа должна вывести строку yes, иначе строку no.

// Пример 1

// Ввод
// ()[]

// Вывод
// yes

// Пример 2

// Ввод
// ([)]

// Вывод
// no
// Пример 3

// Ввод
// (

// Вывод
// no

const fs = require('fs');
const fileContent = fs.readFileSync("input.txt", "utf8");

const Stack = require('./dataStructure/Stack');

const fn = (str) => {
    const stack = new Stack();

    for (let i = 0; i < str.length; i++) {

        switch(str[i]) {
            case '(':
            case '{':
            case '[':
                stack.push(str[i]);
                break;
            case ')': {
                if (stack.pop() === '(') {
                    break;
                }

                return 'no';
            }
            case '}': {
                if (stack.pop() === '{') {
                    break;
                }

                return 'no';
            }
            case ']': {
                if (stack.pop() === '[') {
                    break;
                }

                return 'no';
            }
        }
    }

    if (stack.size) {
        return 'no';
    }

    return 'yes';
}

const result = fn(fileContent.toString().split('\n')[0]);

fs.writeFileSync("output.txt", result.toString())