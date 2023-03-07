const fs = require('fs');
const fileContent = fs.readFileSync("input.txt", "utf8");

const [n, numbers] = fileContent.toString().split('\n');
const result = numbers.split(' ').slice(0, +n).map(item => +item).sort((a, b) => a - b);

fs.writeFileSync("output.txt", result.join(' '))