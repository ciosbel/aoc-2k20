import fs from 'fs';

const fn_p1_r1 = (input, idx, lower, upper) => {
    if (idx >= input.length) {
        return [lower, upper];
    }
    const ch = input[idx];
    const lowerHalf = ch === 'F' || ch === 'L';
    var mid = (lower + upper) >> 1; // signed arith shift
    // tail rec here, but v8 seems not able to optimize
    return fn_p1_r1(
        input,
        ++idx,
        lowerHalf ? lower : mid + 1,
        lowerHalf ? mid : upper)
}

// old
const fn_p1_r0 = (input, idx, lower_row, upper_row, lower_seat, upper_seat) => {
    if (idx >= input.length) {
        return [lower_row, upper_seat];
    }
    const ch = input[idx];
    if (ch === 'B' || ch === 'F') {
        var mid_row = (lower_row + upper_row) >> 1; // signed arith shift
        return fn_p1_r0(
            input,
            ++idx,
            ch === 'B' ? mid_row + 1 : lower_row,
            ch === 'F' ? mid_row : upper_row,
            lower_seat,
            upper_seat)    
    }

    if (ch === 'L' || ch === 'R') {
        var mid_seat = (lower_seat + upper_seat) >> 1; // signed arith shift
        return fn_p1_r0(
            input,
            ++idx,
            lower_row,
            upper_row,
            ch === 'R' ? mid_seat + 1 : lower_seat,
            ch === 'L' ? mid_seat : upper_seat)    
    }
    return [];
}

const fn_p1 = (input) => {
    let max = 0;
    for (var i of input) {
        //const [lower_row, upper_seat] = fn_p1_r0(i, 0, 0, 127, 0, 7);
        const [lower_row, _r] = fn_p1_r1(i.substring(0, 7), 0, 0, 127);
        const [_s, upper_seat] = fn_p1_r1(i.substring(7, i.length), 0, 0, 7);
        const id = lower_row * 8 + upper_seat;
        if (id > max) {
            max = id;
        }
    }
    return max;
}

const fn_p2 = (input) => {
    let max = 0;
    let min = 1023;
    const set = {};
    for (let i of input) {
        const [lower_row, _r] = fn_p1_r1(i.substring(0, 7), 0, 0, 127);
        const [_s, upper_seat] = fn_p1_r1(i.substring(7, i.length), 0, 0, 7);
        const id = lower_row * 8 + upper_seat;

        max = id > max ? id : max;
        min = id < min ? id : min;
        set[id] = 1;
    }
    let idx = 0;
    while (idx < min || idx > max || set[idx] === 1) {
        // The first, not in the set, is our seat.
        idx++;
    }
    return idx;
    /*
    // TODO: optimize
    ids = ids.sort((a, b) => a - b);
    
    while (ids[idx + 1] === 1 + ids[idx]) {
        idx++;
    }
    return ids[idx] + 1;
    */
}

const input = fs.readFileSync("./day5/input",'utf8').split('\r\n');

console.time('fn_p1');
console.log(fn_p1(input)); // 878
console.timeEnd('fn_p1');

console.time('fn_p2');
console.log(fn_p2(input)); // 504
console.timeEnd('fn_p2');