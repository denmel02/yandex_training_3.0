// Дан неориентированный граф, возможно, с петлями и кратными ребрами. Необходимо построить компоненту связности, содержащую первую вершину.

// Формат ввода
// В первой строке записаны два целых числа N (1 ≤ N ≤ 103) и M (0 ≤ M ≤ 5 * 105) — количество вершин и ребер в графе. В последующих M строках перечислены ребра — пары чисел, определяющие номера вершин, которые соединяют ребра.

// Формат вывода
// В первую строку выходного файла выведите число K — количество вершин в компоненте связности. Во вторую строку выведите K целых чисел — вершины компоненты связности, перечисленные в порядке возрастания номеров.

// Пример

// Ввод
// 4 5
// 2 2
// 3 4
// 2 3
// 1 3
// 2 4

// Вывод
// 4
// 1 2 3 4
const fs = require('fs');
const fileContent = fs.readFileSync("input.txt", "utf8");

const parse = (str) => {
    const [ data, ...lines ] = str.split('\n');
    const [vCount, eCount] = data.split(' ');
    const graph = Array.from({ length: +vCount + 1 }, () => []);

    lines.slice(0, +eCount).forEach((line) => {
        const [ from, to ] = line.split(' ');

        if (from !== to) {
            graph[+from].push(+to);
            graph[+to].push(+from);
        }
    });

    return graph;
}

const dfs = (graph, comp, now) => {
    comp.add(now)

    graph[now].forEach((next) => {
        if (!comp.has(next)) {
            dfs(graph, comp, next);
        }
    });
}

const fn = (graph) => {
    const comp = new Set();

    dfs(graph, comp, 1);

    return`${comp.size}\n${[...comp.values()].sort((a, b) => a-b).join(' ')}`
}

const graph = parse(fileContent.toString());
const result = fn(graph);

fs.writeFileSync("output.txt", result.toString())