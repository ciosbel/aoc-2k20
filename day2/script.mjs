import fs from 'fs';

const fn_p1_regexysh = (input) => {
    let count = 0;
    for (let i of input) {
        // Esoterism here!
        const replaced = i[2].replace(new RegExp('[^' + i[0] + ']', 'g'), '');
        if (new RegExp('^[' + i[0] + ']{' + i[1] + '}$').test(replaced)) {
            count++;
        }
    }
    return count;
}

const fn_p2_xorish = (input) => {
    let count = 0;
    for (let i of input) {
        const split = i[1].split(',').map(x => parseInt(x, 10) - 1);
        const c1 = i[2][split[0]] === i[0];
        const c2 = i[2][split[1]] === i[0];
        if (c1 ? !c2 : c2) {
            count++;
        }
    }
    return count;
}

var input = fs.readFileSync("./day2/input",'utf8').split('\r\n',)
    .map(x => {
        const splitted = x.split(' ');
        var tuple = [
            splitted[1].replace(':', ''),
            splitted[0].replace('-', ','),
            splitted[2]
        ];
        return tuple;
    });

console.time('benchmarkFn1');
console.log(fn_p1_regexy(input)); // 515
console.timeEnd('benchmarkFn1');

console.time('benchmarkFn1');
console.log(fn_p2_linear(input)); // 711
console.timeEnd('benchmarkFn1');
