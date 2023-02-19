// Васин жесткий диск состоит из M секторов. Вася последовательно устанавливал на него различные операционные системы следующим методом: он создавал новый раздел диска из последовательных секторов, начиная с сектора номер ai и до сектора bi включительно, и устанавливал на него очередную систему. При этом, если очередной раздел хотя бы по одному сектору пересекается с каким-то ранее созданным разделом, то ранее созданный раздел «затирается», и операционная система, которая на него была установлена, больше не может быть загружена.

// Напишите программу, которая по информации о том, какие разделы на диске создавал Вася, определит, сколько в итоге работоспособных операционных систем установлено и работает в настоящий момент на Васином компьютере.

// Формат ввода
// Сначала вводятся натуральное число M — количество секторов на жестком диске (1 ≤ M ≤ 10^9) и целое число N — количество разделов, которое последовательно создавал Вася (0 ≤ N ≤ 1000).

// Далее идут N пар чисел ai и bi, задающих номера начального и конечного секторов раздела (1 ≤ ai ≤ bi ≤ M).

// Формат вывода
// Выведите одно число — количество работающих операционных систем на Васином компьютере.

// Пример 1

// Ввод
// 10
// 3
// 1 3
// 4 7
// 3 4

// Вывод
// 1

// Пример 2

// Ввод
// 10
// 4
// 1 3
// 4 5
// 7 8
// 4 6

// Вывод
// 3

const fs = require('fs');
const fileContent = fs.readFileSync("input.txt", "utf8");

const fn = (str) => {
    const [sectorNumberStr, systemsStr, ...sectorsStr ] = str.split('\n');
    const sectorNumber = +sectorNumberStr;
    const systems = +systemsStr;

    if (!systems) {
        return 0;
    }

    const sectors = sectorsStr
        .slice(0, systems)
        .map((sector) => {
            const [startStr, endStr] = sector.split(' ');

            return ({ start: +startStr, end: + endStr });
        });

    let workSectors = [ sectors[0] ];

    const isNotBlock = (first, second) => first.end < second.start || first.start > second.end;

    for (let i = 1; i < sectors.length; i++) {
        const currentSector = sectors[i];

        workSectors = workSectors.filter((sector) => isNotBlock(sector, currentSector));

        workSectors.push(currentSector);
    }

    return workSectors.length;
}

const result = fn(fileContent.toString());

fs.writeFileSync("output.txt", result.toString())