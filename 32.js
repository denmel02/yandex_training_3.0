// Дан неориентированный невзвешенный граф. Необходимо посчитать количество его компонент связности и вывести их.

// Формат ввода
// Во входном файле записано два числа N и M (0 < N ≤ 100000, 0 ≤ M ≤ 100000). В следующих M строках записаны по два числа i и j (1 ≤ i, j ≤ N), которые означают, что вершины i и j соединены ребром.

// Формат вывода
// В первой строчке выходного файла выведите количество компонент связности. Далее выведите сами компоненты связности в следующем формате: в первой строке количество вершин в компоненте, во второй - сами вершины в произвольном порядке.

// Пример 1

// Ввод
// 6 4
// 3 1
// 1 2
// 5 4
// 2 3

// Вывод
// 3
// 3
// 1 2 3
// 2
// 4 5
// 1
// 6

// Пример 2

// Ввод
// 6 4
// 4 2
// 1 4
// 6 4
// 3 6
// Вывод
// 2
// 5
// 1 2 3 4 6
// 1
// 5

const fs = require('fs');
const fileContent = fs.readFileSync("input.txt", "utf8");

const Stack = require('./dataStructure/Stack');

const parse = (str) => {
    const [ data, ...lines ] = str.split('\n');
    const [vCount, eCount] = data.split(' ');
    const graph = Array.from({ length: +vCount + 1 }, () => []);

    lines.slice(0, +eCount).forEach((line) => {
        const [ from, to ] = line.split(' ');

        if (from !== to && !graph[+from].includes(+to)) {
            graph[+from].push(+to);
            graph[+to].push(+from);
        }
    });

    return graph;
}

const dfs = (graph, visited, comp, now) => {
    const stack = new Stack();
    visited[now] = true;
    comp.push(now);

    stack.push(now);

    while (stack.size) {
        const current = stack.pop();

        graph[current].forEach((next) => {
            if (!visited[next]) {
                visited[next] = true;

                comp.push(next);
                stack.push(next);
            }
        })
    }
}

const fn = (graph) => {
    const visited = [];
    let comps = [];

    for (let i = 1; i < graph.length; i++) {
        if (!visited[i]) {
            comps.push([])
            dfs(graph, visited, comps.at(-1), i);
        }
    }

    return `${comps.length}\n${comps.map((comp) => `${comp.length}\n${comp.sort((a, b) => a - b).join(' ')}`).join('\n')}`
}

const graph = parse(fileContent.toString());
const result = fn(graph);

fs.writeFileSync("output.txt", result.toString())