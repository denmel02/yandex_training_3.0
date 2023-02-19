const fs = require('fs');
const fileContent = fs.readFileSync("input.txt", "utf8");

const toSeconds = (time) => {
    const [hh, mm, ss] = time.split(':');

    return +hh * 3600 + +mm * 60 + +ss;
}

const numberToString = (value, minLength) => {
    const valueStr = value.toString();
    const needAddCount = Math.max(minLength - valueStr.length, 0);

    return '0'.repeat(needAddCount) + valueStr;
}

const toTime = (seconds) => {
   const hh = Math.floor(seconds / 3600);
   const mm = Math.floor((seconds % 3600) / 60);
   const ss = seconds % 60;

   return [hh, mm, ss].map((value) => numberToString(value, 2)).join(':');
}

const fn = (str) => {
    const [firstTime, serverTime, secondTime ] = str.split('\n');
    const firstSeconds = toSeconds(firstTime);
    const serverSeconds = toSeconds(serverTime);
    const secondSeconds = toSeconds(secondTime);
    const daySeconds = toSeconds('24:00:00');
    const mistakeSeconds = (() => {
        if (firstSeconds > secondSeconds) {
            return Math.round((daySeconds - firstSeconds + secondSeconds) / 2);
        }

        return Math.round((secondSeconds - firstSeconds) / 2);
    })();
    const currentSeconds = (serverSeconds + mistakeSeconds) % daySeconds;

    return toTime(currentSeconds);
}

const result = fn(fileContent.toString());

fs.writeFileSync("output.txt", result.toString())