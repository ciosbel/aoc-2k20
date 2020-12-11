import fs from 'fs';

const fn_p1 = (input) => {
    const set = input.reduce((acc, curr) => {
        acc[curr] = curr;
        return acc;
    }, {});

    const diffs = {1: 0, 2: 0, 3: 0};
    let idx = 0;
    while (true) {
        const prevIdx = idx;
        // Side effects what? :E
        const next = set[++idx] || set[++idx] || set[++idx];
        diffs[idx - prevIdx] += 1;
        if (!next) {
            break;
        }
    }
    return diffs[1] * diffs[3];
}

/**
 * I literally lost my mind over graphs... number of paths... between edges...
 * adiacent matrices and their weird props, some dynamic recursion... daemons...
 */
const fn_p2 = (input) => {
    // As stated, we treat "the charging outlet near your seat as having an effective joltage rating of 0";
    // So we prepend 0, and order ascending by the joltage.
    const data = [0, ...input].map(x => parseInt(x, 10)).sort((a, b) => a - b);

    // This is a map from an adapter to its cumulative sum visits.
    // Something like "how many times my previous 1-3 adapters have been visited, before me".
    // We start from 0 that is visited 1 by default.
    const set = data.reduce((acc, curr, index) => {
        acc[curr] = index === 0 ? 1 : 0;
        return acc;
    }, {});

    let max = 0;
    for (var x of data) {
        // The current number of visits for the adapter x, is the sum of all the visits
        // of the 1-3 previous adapters, if any plus my current visits count.
        // Or, we can also say that a given adapter x, "spreads" its visits count to all
        // its 1-3 adapters, if any.
        // And so on.
        // Hours... for a simple loop. I hate puzzles. Really.
        const sum = (set[x - 1] || 0)
            + (set[x - 2] || 0)
            + (set[x - 3] || 0)
        set[x] += sum || 0;
        max = set[x] > max ? set[x] : max;
    }
    return max;
}

const input = fs.readFileSync("./day10/input",'utf8').split('\r\n');

console.time('fn_p1');
console.log(fn_p1(input)); // 2346
console.timeEnd('fn_p1');

console.time('fn_p2');
console.log(fn_p2(input)); // 6044831973376
console.timeEnd('fn_p2');
