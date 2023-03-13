// В неориентированном графе требуется найти длину минимального пути между двумя вершинами.

// Формат ввода
// Первым на вход поступает число N – количество вершин в графе (1 ≤ N ≤ 100). Затем записана матрица смежности (0 обозначает отсутствие ребра, 1 – наличие ребра). Далее задаются номера двух вершин – начальной и конечной.

// Формат вывода
// Выведите L – длину кратчайшего пути (количество ребер, которые нужно пройти).

// Если пути нет, нужно вывести -1.

// Пример 1

// Ввод
// 10
// 0 1 0 0 0 0 0 0 0 0
// 1 0 0 1 1 0 1 0 0 0
// 0 0 0 0 1 0 0 0 1 0
// 0 1 0 0 0 0 1 0 0 0
// 0 1 1 0 0 0 0 0 0 1
// 0 0 0 0 0 0 1 0 0 1
// 0 1 0 1 0 1 0 0 0 0
// 0 0 0 0 0 0 0 0 1 0
// 0 0 1 0 0 0 0 1 0 0
// 0 0 0 0 1 1 0 0 0 0
// 5 4

// Вывод
// 2

// Пример 2

// Ввод
// 5
// 0 1 0 0 1
// 1 0 1 0 0
// 0 1 0 0 0
// 0 0 0 0 0
// 1 0 0 0 0
// 3 5

// Вывод
// 3

const fs = require('fs');
const fileContent = fs.readFileSync("input.txt", "utf8");

const Queue = require('./dataStructure/Queue');

const parse = (str) => {
    const [ n, ...lines ] = str.split('\n');
    const graph = Array.from({ length: +n + 1 }, () => []);
    const [ start, end ] = lines[n].split(' ');

    for (let i = 0; i < +n; i++) {
        const line = lines[i].split(' ');

        for (let j = i; j < +n; j++) {
            if (line[j] === '1') {
                graph[i + 1].push(j + 1);
                graph[j + 1].push(i + 1);
            }
        }
    }

    return { graph, start: +start, end: +end };
}

const wsd = (graph, start, end) => {
    const queue = new Queue();
    const dist = [];

    dist[start] = 0;

    queue.push(start);

    while (queue.size) {
        const current = queue.pop();

        if (current === end) {
            return dist[current];
        }

        const nextDist = dist[current] + 1;

        for (let next of graph[current]) {
            if (dist[next] !== undefined) {
                continue;
            }

            dist[next] = nextDist;

            queue.push(next);
        }
    }

    return -1;
}

const { graph, start, end } = parse(fileContent.toString());
const result = wsd(graph, start, end);

fs.writeFileSync("output.txt", result.toString())