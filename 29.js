// Около Петиного университета недавно открылось новое кафе, в котором действует следующая система скидок: при каждой покупке более чем на 100 рублей покупатель получает купон, дающий право на один бесплатный обед (при покупке на сумму 100 рублей и меньше такой купон покупатель не получает).

// Однажды Пете на глаза попался прейскурант на ближайшие N дней. Внимательно его изучив, он решил, что будет обедать в этом кафе все N дней, причем каждый день он будет покупать в кафе ровно один обед. Однако стипендия у Пети небольшая, и поэтому он хочет по максимуму использовать предоставляемую систему скидок так, чтобы его суммарные затраты были минимальны. Требуется найти минимально возможную суммарную стоимость обедов и номера дней, в которые Пете следует воспользоваться купонами.

// Формат ввода
// В первой строке входного файла записано целое число N (0 ≤ N ≤ 100). В каждой из последующих N строк записано одно целое число, обозначающее стоимость обеда в рублях на соответствующий день. Стоимость — неотрицательное целое число, не превосходящее 300.

// Формат вывода
// В первой строке выдайте минимальную возможную суммарную стоимость обедов. Во второй строке выдайте два числа K1 и K2 — количество купонов, которые останутся неиспользованными у Пети после этих N дней и количество использованных им купонов соответственно.

// В последующих K2 строках выдайте в возрастающем порядке номера дней, когда Пете следует воспользоваться купонами. Если существует несколько решений с минимальной суммарной стоимостью, то выдайте то из них, в котором значение K1 максимально (на случай, если Петя когда-нибудь ещё решит заглянуть в это кафе). Если таких решений несколько, выведите любое из них.

// Пример

// Ввод
// 5
// 35
// 40
// 101
// 59
// 63

// Вывод
// 235
// 0 1
// 5

const fs = require('fs');
const fileContent = fs.readFileSync("input.txt", "utf8");

const fn = (prices) => {
    const days = prices.length;
    const cash = Array.from({ length: prices.length + 1 }, () => []);
    const calc = (day, tickets) => {
        if (day < 0 || tickets < 0 || day < tickets) {
            return { value: Infinity, usedDays: [], tickets: 0 };
        }

        if (cash[day][tickets] !== undefined) {
            return cash[day][tickets];
        }

        if (day === 0 && tickets === 0) {
            cash[0][0] = { value: 0, usedDays: [], tickets: 0 };

            return cash[0][0];
        }

        const price = prices[day - 1];
        const notUsedVariant = price > 100 ? calc(day - 1, tickets - 1) : calc(day - 1, tickets);
        const usedVariant = calc(day - 1, tickets + 1);

        cash[day][tickets] = notUsedVariant.value + price <= usedVariant.value ?
            { ...notUsedVariant, value: notUsedVariant.value + price, tickets } :
            { ...usedVariant, usedDays: [...usedVariant.usedDays, day ], tickets }

        return cash[day][tickets];
    }

    for (let i = 0; i <= days; i++) {
        for (let j = 0; j <= days; j++) {
            calc(i,j);
        }
    }

    const lastDayVariants = cash.at(-1);
    const minValue = Math.min(...lastDayVariants.map((variant) => variant.value));
    const minVariant = lastDayVariants
        .filter((variant) => variant.value === minValue)
        .sort((a, b) => b.tickets - a.tickets)[0]

        console.log(cash)

    return `${minVariant.value}\n${minVariant.tickets} ${minVariant.usedDays.length}\n${minVariant.usedDays.join(' ')}`;
}

const [n, ...pricesStr] = fileContent.toString().split('\n');
const result = fn(pricesStr.slice(0, +n).map((priceStr) => +priceStr));

fs.writeFileSync("output.txt", result.toString())