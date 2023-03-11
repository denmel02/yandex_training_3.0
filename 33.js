// Во время контрольной работы профессор Флойд заметил, что некоторые студенты обмениваются записками. Сначала он хотел поставить им всем двойки, но в тот день профессор был добрым, а потому решил разделить студентов на две группы: списывающих и дающих списывать, и поставить двойки только первым.

// У профессора записаны все пары студентов, обменявшихся записками. Требуется определить, сможет ли он разделить студентов на две группы так, чтобы любой обмен записками осуществлялся от студента одной группы студенту другой группы.

// Формат ввода
// В первой строке находятся два числа N и M — количество студентов и количество пар студентов, обменивающихся записками (1 ≤ N ≤ 102, 0 ≤ M ≤ N(N−1)/2).

// Далее в M строках расположены описания пар студентов: два числа, соответствующие номерам студентов, обменивающихся записками (нумерация студентов идёт с 1). Каждая пара студентов перечислена не более одного раза.

// Формат вывода
// Необходимо вывести ответ на задачу профессора Флойда. Если возможно разделить студентов на две группы - выведите YES; иначе выведите NO.

// Пример 1

// Ввод
// 3 2
// 1 2
// 2 3

// Вывод
// YES
// Пример 2

// Ввод
// 3 3
// 1 2
// 2 3
// 1 3

// Вывод
// NO

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

const dfs = (graph, visited, now, color) => {
    visited[now] = color;
    const nextColor = color === 1 ? 2 : 1;

    for (let next of graph[now]) {
        if (visited[next] === color || !visited[next] && !dfs(graph, visited, next, nextColor)) {
            return false;
        }
    }

    return true;
}

const fn = (graph) => {
    const visited = [];

    for (let i = 1; i < graph.length; i++) {
        if (!visited[i] && !dfs(graph, visited, i, 1)) {
            return 'NO'
        }
    }

    return 'YES';
}

const graph = parse(fileContent.toString());
const result = fn(graph);

fs.writeFileSync("output.txt", result.toString())