// Дан неориентированный граф. Требуется определить, есть ли в нем цикл, и, если есть, вывести его.

// Формат ввода
// В первой строке дано одно число n — количество вершин в графе ( 1 ≤ n ≤ 500 ). Далее в n строках задан сам граф матрицей смежности.

// Формат вывода
// Если в иcходном графе нет цикла, то выведите «NO». Иначе, в первой строке выведите «YES», во второй строке выведите число k — количество вершин в цикле, а в третьей строке выведите k различных чисел — номера вершин, которые принадлежат циклу в порядке обхода (обход можно начинать с любой вершины цикла). Если циклов несколько, то выведите любой.

// Пример 1
// Ввод
// 3
// 0 1 1
// 1 0 1
// 1 1 0

// Вывод
// YES
// 3
// 3 2 1

// Пример 2

// Ввод
// 4
// 0 0 1 0
// 0 0 0 1
// 1 0 0 0
// 0 1 0 0

// Вывод
// NO

// Пример 3

// Ввод
// 5
// 0 1 0 0 0
// 1 0 0 0 0
// 0 0 0 1 1
// 0 0 1 0 1
// 0 0 1 1 0

// Вывод
// YES
// 3
// 5 4 3

const fs = require('fs');
const fileContent = fs.readFileSync("input.txt", "utf8");

const Stack = require('./dataStructure/Stack');

const parse = (str) => {
    const [ n, ...lines ] = str.split('\n');
    const graph = Array.from({ length: +n + 1 }, () => []);

    for (let i = 0; i < +n; i++) {
        const line = lines[i].split(' ');

        for (let j = i; j < +n; j++) {
            if (line[j] === '1') {
                graph[i + 1].push(j + 1);
                graph[j + 1].push(i + 1);
            }
        }
    }

    return graph;
}

const dfs = (graph, visited, now) => {
    const stack = new Stack();
    const circle = [];
    let last;

    stack.push({ current: now });

    while (stack.size) {
        const { current, prev } = stack.back();

        if (current === last) {
            circle.push(current);

            return circle;
        }

        if (!visited[current]) {
            visited[current] = 1;
        }

        if (visited[current] === 1 && graph[current].some((next) => next !== prev && visited[next] === 1)) {
            if (!circle.length) {
                last = graph[current].find((next) => next !== prev && visited[next] === 1);
            }
            circle.push(current);
            stack.pop();
            continue;
        }

        const nextNew = graph[current].find((next) => next !== prev && !visited[next])

        if (nextNew) {
            stack.push({ current: nextNew, prev: current });
            continue;
        }

        visited[current] = 2;
        stack.pop();
    }

    return circle.length ? circle : undefined;
}

const fn = (graph) => {
    const visited = [];

    for (let i = 1; i < graph.length; i++) {
        if (!visited[i]) {
            const circle = dfs(graph, visited, i);

            if (circle) {
                return `YES\n${circle.length}\n${circle.join(' ')}`;
            }
        }
    }

    return 'NO';
}

const graph = parse(fileContent.toString());
const result = fn(graph);

fs.writeFileSync("output.txt", result.toString())