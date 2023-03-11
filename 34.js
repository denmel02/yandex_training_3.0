// Дан ориентированный граф. Необходимо построить топологическую сортировку.

// Формат ввода
// В первой строке входного файла два натуральных числа N и M (1 ≤ N, M ≤ 100 000) — количество вершин и рёбер в графе соответственно. Далее в M строках перечислены рёбра графа. Каждое ребро задаётся парой чисел — номерами начальной и конечной вершин соответственно.

// Формат вывода
// Выведите любую топологическую сортировку графа в виде последовательности номеров вершин (перестановка чисел от 1 до N). Если топологическую сортировку графа построить невозможно, выведите -1.

// Пример

// Ввод
// 6 6
// 1 2
// 3 2
// 4 2
// 2 5
// 6 5
// 4 6

// Вывод
// 4 6 3 1 2 5

const fs = require('fs');
const fileContent = fs.readFileSync("input.txt", "utf8");

const Stack = require('./dataStructure/Stack');

const parse = (str) => {
    const [ data, ...lines ] = str.split('\n');
    const [vCount, eCount] = data.split(' ');
    const graph = Array.from({ length: +vCount + 1 }, () => []);

    lines.slice(0, +eCount).forEach((line) => {
        const [ from, to ] = line.split(' ');

        graph[+from].push(+to);
    });

    return graph;
}

const dfs = (graph, visited, order, now) => {
    const stack = new Stack();

    stack.push(now);

    while (stack.size) {
        const current = stack.back();

        if (!visited[current]) {
            visited[current] = 1;
            graph[current].forEach((next) => {
                if (!visited[next]) {
                    stack.push(next);
                }
            });

            continue
        }

        if (visited[current] === 1 && graph[current].some((next) => visited[next] === 1)) {
            return false;
        }

        if (visited[current] === 1) {
            visited[current] = 2;
            order.push(current);
        }

        stack.pop();
    }

    return true;
}

const fn = (graph) => {
    const visited = [];
    const order = [];

    for (let i = 1; i < graph.length; i++) {
        if (visited[i] === 1 || !visited[i] && !dfs(graph, visited, order, i)) {
            return -1
        }
    }

    return order.reverse().join(' ');
}

const graph = parse(fileContent.toString());
const result = fn(graph);

fs.writeFileSync("output.txt", result.toString())