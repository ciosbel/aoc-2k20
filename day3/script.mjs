import fs from 'fs';

const fn_p1_modulish = (input, row_inc = 1, col_inc = 3) => {
    const height = input.length;
    let row = 0;
    let col = 0;
    let trees = 0;
    while (row < height - row_inc) {
        row += row_inc;
        col += col_inc;
        if (input[row][col % input[row].length] === '#') {
            trees++;
        }        
    }

    return trees;
}

const fn_p2_naive = (input) => {
    const run1 = fn_p1_modulish(input, 1, 3);
    const run2 = fn_p1_modulish(input, 1, 1);
    const run3 = fn_p1_modulish(input, 1, 5);
    const run4 = fn_p1_modulish(input, 1, 7);
    const run5 = fn_p1_modulish(input, 2, 1);
    return run1 * run2 * run3 * run4 * run5;
}

const fn_p2_lookaround = (input) => {
    const height = input.length;
    let row = 0;
    const row_inc = 1;
    const col_incs = [1, 3, 5, 7];
    let cols = [0, 0, 0, 0];
    let trees = [0, 0, 0, 0];
    while (row < height - row_inc) {
        row += row_inc;
        for (let i in col_incs) {
            cols[i] += col_incs[i];
            if (input[row][cols[i] % input[row].length] === '#') {
                trees[i]++;
            }
        }
    }
    const runs = trees[0] * trees[1] * trees[2] * trees[3];
    const run5 = fn_p1_modulish(input, 2, 1); // eh...
    return runs * run5;
}

var input = fs.readFileSync("./day3/input",'utf8').split('\r\n');

console.time('fn_p1_modulish');
console.log(fn_p1_modulish(input)); // 167
console.timeEnd('fn_p1_modulish');

console.time('fn_p2_naive');
console.log(fn_p2_naive(input)); // 736527114
console.timeEnd('fn_p2_naive');

console.time('fn_p2_lookaround');
console.log(fn_p2_lookaround(input)); // 736527114
console.timeEnd('fn_p2_lookaround');
