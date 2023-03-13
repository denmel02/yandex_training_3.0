// В неориентированном графе требуется найти минимальный путь между двумя вершинами.

// Формат ввода
// Первым на вход поступает число N – количество вершин в графе (1 ≤ N ≤ 100). Затем записана матрица смежности (0 обозначает отсутствие ребра, 1 – наличие ребра). Далее задаются номера двух вершин – начальной и конечной.

// Формат вывода
// Выведите сначала L – длину кратчайшего пути (количество ребер, которые нужно пройти), а потом сам путь. Если путь имеет длину 0, то его выводить не нужно, достаточно вывести длину.

// Необходимо вывести путь (номера всех вершин в правильном порядке). Если пути нет, нужно вывести -1.

// Пример

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
// 5 2 4

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

const getRoutes = (prev, end) => {
    const routes = [end];

    while (prev[routes.at(-1)] !== -1) {
        routes.push(prev[routes.at(-1)]);
    }

    return routes.reverse();
}

const wsd = (graph, start, end) => {
    const queue = new Queue();
    const dist = [];
    const prev = [];

    dist[start] = 0;
    prev[start] = -1;

    queue.push(start);

    while (queue.size) {
        const current = queue.pop();

        if (current === end) {
            return dist[current] ? `${dist[current]}\n${getRoutes(prev, end).join(' ')}` : 0;
        }

        const nextDist = dist[current] + 1;

        for (let next of graph[current]) {
            if (dist[next] !== undefined) {
                continue;
            }

            dist[next] = nextDist;
            prev[next] = current;

            queue.push(next);
        }
    }

    return -1;
}

const { graph, start, end } = parse(fileContent.toString());
const result = wsd(graph, start, end);

fs.writeFileSync("output.txt", result.toString())