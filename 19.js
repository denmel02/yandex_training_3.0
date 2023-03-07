// В этой задаче вам необходимо самостоятельно (не используя соответствующие классы и функции стандартной библиотеки) организовать структуру данных Heap для хранения целых чисел, над которой определены следующие операции: a) Insert(k) – добавить в Heap число k ; b) Extract достать из Heap наибольшее число (удалив его при этом).

// Формат ввода
// В первой строке содержится количество команд N (1 ≤ N ≤ 100000), далее следуют N команд, каждая в своей строке. Команда может иметь формат: “0 <число>” или “1”, обозначающий, соответственно, операции Insert(<число>) и Extract. Гарантируется, что при выполнении команды Extract в структуре находится по крайней мере один элемент.

// Формат вывода
// Для каждой команды извлечения необходимо отдельной строкой вывести число, полученное при выполнении команды Extract.

// Пример 1

// Ввод
// 2
// 0 10000
// 1

// Вывод
// 10000

// Пример 2

// Ввод
// 14
// 0 1
// 0 345
// 1
// 0 4346
// 1
// 0 2435
// 1
// 0 235
// 0 5
// 0 365
// 1
// 1
// 1
// 1

// Вывод
// 345
// 4346
// 2435
// 365
// 235
// 5
// 1

const fs = require('fs');
const fileContent = fs.readFileSync("input.txt", "utf8");

const Heap = require('./dataStructure/Heap');

const fn = (commands) => {
    const heap = new Heap();
    const results = [];

    for (let command of commands) {
        const [name, value] = command.split(' ');

        switch (name) {
            case '0':
                heap.insert(+value);
                break;
            case '1':
                results.push(heap.extract());
                break;
        }
    }

    return results.join('\n');
}

const [n, ...commands] = fileContent.toString().split('\n');
const result = fn(commands.slice(0, +n));

fs.writeFileSync("output.txt", result.toString())