import fs from 'fs';

const fn_p1 = (input, preamble) => {
    const set = {};
    for (let i in input) {
        const nth = input[i];
        set[nth] = nth;
        if (i < preamble) {
            continue;
        }
    
        for (let j = i - preamble; j < i; j++) {
            const diff = nth - input[j];
            if (set[diff]) {
                break;
            }
            if (j === i - 1) {
                return [nth, i];
            }
        }
        delete set[input[i - preamble]];
    }
    return [0, 0];
}

const fn_p2 = (input, preamble) => {
    const [invalid] = fn_p1(input, preamble);
    const invalidValue = parseInt(invalid, 10);

    let sum = 0, start = 0, max = 0;
    let min = invalidValue;
    for (let i = 0; i < input.length; i++) {
        const nth = parseInt(input[i], 10)
        sum += nth;
        if (sum === invalidValue) {
            return min + max;
        }
        if (sum > invalidValue) {
            sum = max = 0;
            min = invalidValue
            i = start;
            start += 1;
        }
        min = nth < min ? nth : min;
        max = nth > max ? nth : max;
    }
    return null;
}


const input = fs.readFileSync("./day9/input",'utf8').split('\r\n');

console.time('fn_p1');
console.log(fn_p1(input, 25)); // 22406676
console.timeEnd('fn_p1');

console.time('fn_p1');
console.log(fn_p2(input, 25)); // 2942387
console.timeEnd('fn_p1');