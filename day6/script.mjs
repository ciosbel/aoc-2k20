import fs from 'fs';

const fn_p1 = (input) => {
    let count = 0;
    // It's a union... but I'm lazy...
    for (let i of input) {
        const set = {}
        for (let j of i) {
            for (let k of j) {
                set[k] = true;
            }
        }
        count += Object.keys(set).length;
    }
    return count;
}

const fn_p2 = (input) => {
    let count = 0;

    // more interesting: be less lazy here!
    for (let i of input) {
        if (i.length == 1) {
            count += i[0].length;
            continue;
        }
        let lastIntersection =  new Set(i[0]);
        let groupCount = 0;
        for (let j of i) {
            const actual = new Set(j)
            const intersection = new Set([...lastIntersection].filter(x => actual.has(x)));
            groupCount = intersection.size;
            if (groupCount === 0) {
                break;
            }
            lastIntersection = intersection;
        }

        count += groupCount;
    }
    return count;
}

const input = fs.readFileSync("./day6/input",'utf8')
    .replace(/\r\n/g, ' ')
    .split('  ')
    .map(x => x.split(' '));

console.time('fn_p1');
console.log(fn_p1(input)); // 6351
console.timeEnd('fn_p1');

console.time('fn_p2');
console.log(fn_p2(input)); // 3143
console.timeEnd('fn_p2');
