// Научитесь пользоваться стандартной структурой данных deque для целых чисел.  Напишите программу, содержащую описание дека и моделирующую работу дека, реализовав все указанные здесь методы. Программа считывает последовательность команд и в зависимости от команды выполняет ту или иную операцию. После выполнения каждой команды программа должна вывести одну строчку.

// Возможные команды для программы:

// push_front n
// Добавить (положить) в начало дека новый элемент. Программа должна вывести ok.

// push_back n
// Добавить (положить) в конец дека новый элемент. Программа должна вывести ok.

// pop_front
// Извлечь из дека первый элемент. Программа должна вывести его значение.

// pop_back
// Извлечь из дека последний элемент. Программа должна вывести его значение.

// front
// Узнать значение первого элемента (не удаляя его). Программа должна вывести его значение.

// back
// Узнать значение последнего элемента (не удаляя его). Программа должна вывести его значение.

// size
// Вывести количество элементов в деке.

// clear
// Очистить дек (удалить из него все элементы) и вывести ok.

// exit
// Программа должна вывести bye и завершить работу.

// Гарантируется, что количество элементов в деке в любой момент не превосходит 100. Перед исполнением операций pop_front, pop_back, front, back программа должна проверять, содержится ли в деке хотя бы один элемент. Если во входных данных встречается операция pop_front, pop_back, front, back, и при этом дек пуст, то программа должна вместо числового значения вывести строку error.

// Формат ввода
// Вводятся команды управления деком, по одной на строке.

// Формат вывода
// Требуется вывести протокол работы дека, по одному сообщению на строке

// Пример 1

// Ввод
// push_back 1
// back
// exit

// Вывод
// ok
// 1
// bye

// Пример 2

// Ввод
// size
// push_back 1
// size
// push_back 2
// size
// push_front 3
// size
// exit

// Вывод
// 0
// ok
// 1
// ok
// 2
// ok
// 3
// bye

// Пример 3

// Ввод
// push_back 3
// push_front 14
// size
// clear
// push_front 1
// back
// push_back 2
// front
// pop_back
// size
// pop_front
// size
// exit

// Вывод
// ok
// ok
// 2
// ok
// ok
// 1
// ok
// 1
// 2
// 1
// 1
// 0
// bye

const fs = require('fs');
const fileContent = fs.readFileSync("input.txt", "utf8");

const Deque = require('./dataStructure/Deque');

const fn = (str) => {
    const commands = str.split('\n');
    const deque = new Deque();
    const answers = [];

    for (let command of commands) {
        const [name, value] = command.split(' ');

        switch(name) {
            case 'push_back':
                deque.pushBack(value);
                answers.push('ok');
                break;
            case 'push_front':
                deque.pushFront(value);
                answers.push('ok');
                break;
            case 'pop_back':
                answers.push(deque.popBack());
                break;
            case 'pop_front':
                answers.push(deque.popFront());
                break;
            case 'front':
                answers.push(deque.front());
                break;
            case 'back':
                answers.push(deque.back());
                break;
            case 'size':
                answers.push(deque.size);
                break;
            case 'clear':
                deque.clear();
                answers.push('ok');
                break;
            case 'exit':
                answers.push('bye');
                return answers;
        }
    }

    return answers;
}

const answers = fn(fileContent.toString());
const result = answers.join('\n');

fs.writeFileSync("output.txt", result.toString())