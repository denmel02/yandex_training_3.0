// Красотой строки назовем максимальное число идущих подряд одинаковых букв. (красота строки abcaabdddettq равна 3)

// Сделайте данную вам строку как можно более красивой, если вы можете сделать не более k операций замены символа.

// Формат ввода
// В первой строке записано одно целое число k (0 ≤ k ≤ 10^9)

// Во второй строке дана непустая строчка S (|S| ≤ 2 ⋅ 10^5). Строчка S состоит только из маленьких латинских букв.

// Формат вывода
// Выведите одно число — максимально возможную красоту строчки, которую можно получить.

// Пример 1

// Ввод
// 2
// abcaz

// Вывод
// 4

// Пример 2
// Ввод
// 2
// helto

// Вывод
// 3

const fn = (numb, str) => {
    const map = new Map();

    str.split("").forEach((letter, index) => {
      const indexes = map.get(letter) || [];

      indexes.push(index);
      map.set(letter, indexes);
    });

    const arrays = [...map.values()]
        .filter((arr) => arr.length > 1)
        .map((arr) => {
            const newArr = [];

            for (let i = 1; i < arr.length; i++) {
                newArr.push(arr[i] - arr[i - 1] - 1);
            }

            return newArr;
        });
    let max = numb + 1;

    const calcMax = (arr) => {
        let firstIndex = 0;
        let needCount = 0;
        for (let lastIndex = 0; lastIndex < arr.length; lastIndex++) {
            needCount += arr[lastIndex];

            if (needCount <= numb) {
                max = Math.max(2 + numb + lastIndex - firstIndex, max);
            } else {
                while (needCount > numb && firstIndex !== lastIndex) {
                    needCount -= arr[firstIndex];
                    firstIndex++;
                }
            }
        }
    };

    arrays.forEach(calcMax);

    return max;
  };

  console.log(fn(2, 'abcazaa'));
  console.log('-----------------')
  console.log(fn(2, 'helto'));