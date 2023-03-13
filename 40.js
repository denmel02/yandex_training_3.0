// Метрополитен состоит из нескольких линий метро. Все станции метро в городе пронумерованы натуральными числами от 1 до N. На каждой линии расположено несколько станций. Если одна и та же станция расположена сразу на нескольких линиях, то она является станцией пересадки и на этой станции можно пересесть с любой линии, которая через нее проходит, на любую другую (опять же проходящую через нее).

// Напишите программу, которая по данному вам описанию метрополитена определит, с каким минимальным числом пересадок можно добраться со станции A на станцию B. Если данный метрополитен не соединяет все линии в одну систему, то может так получиться, что со станции A на станцию B добраться невозможно, в этом случае ваша программа должна это определить.

// Формат ввода
// Сначала вводится число N — количество станций метро в городе (2≤N≤100). Далее следует число M — количество линий метро (1≤M≤20). Далее идет описание M линий. Описание каждой линии состоит из числа Pi — количество станций на этой линии (2≤Pi≤50) и Pi чисел, задающих номера станций, через которые проходит линия (ни через какую станцию линия не проходит дважды).

// Затем вводятся два различных числа: A — номер начальной станции, и B — номер станции, на которую нам нужно попасть. При этом если через станцию A проходит несколько линий, то мы можем спуститься на любую из них. Так же если через станцию B проходит несколько линий, то нам не важно, по какой линии мы приедем.

// Формат вывода
// Выведите минимальное количество пересадок, которое нам понадобится. Если добраться со станции A на станцию B невозможно, программа должна вывести одно число –1 (минус один).

// Пример
// Ввод
// 5
// 2
// 4 1 2 3 4
// 2 5 3
// 3 1

// Вывод
// 0

const fs = require('fs');
const fileContent = fs.readFileSync("input.txt", "utf8");

const Deque = require('./dataStructure/Deque');

const parse = (str) => {
    const [nStr, mStr, ...other ] = str.split('\n');
    const n = +nStr;
    const m = +mStr;
    const [startStr, endStr ] = other[m].split(' ');
    const stations = Array.from({ length: n + 1 }, () => []);

    for (let line = 0; line < +mStr; line++) {
        const [count, ...stationsStr] = other[line].split(' ');

        for (let i = 0; i < count - 1; i++) {
            const firstStation = +stationsStr[i];
            const secondStation = +stationsStr[i + 1];

            stations[firstStation].push({ station: secondStation, line });
            stations[secondStation].push({ station: firstStation, line });
        }
    }

    return { stations, start: +startStr, end: +endStr };
}

const wsd = ({ stations, start, end }) => {
    const deque = new Deque();
    const dist = Array.from({ length: stations.length }, () => []);

    stations[start].forEach(({ line }) => {
        deque.pushFront({ station: start, line });
        dist[start][line] = 0;
    });

    while (deque.size) {
        const { station, line } = deque.popFront();
        const currentDist = dist[station][line];

        stations[station].forEach(({station: nextStation, line: nextLine }) => {
            const newDist = line === nextLine ? currentDist : currentDist + 1;
            const nextDist = dist[nextStation][nextLine];

            if (nextDist !== undefined && nextDist <= newDist) {
                return;
            }

            dist[nextStation][nextLine] = newDist;

            line === nextLine ?
                deque.pushFront({ station: nextStation, line }) :
                deque.pushBack({ station: nextStation, line: nextLine });
        });
    }

    const dists = dist[end].filter((distInLine) => distInLine !== undefined);

    return dists.length ? Math.min(...dists) : -1;
}

const data = parse(fileContent.toString());
const result = wsd(data);

fs.writeFileSync("output.txt", result.toString())