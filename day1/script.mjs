import fs from 'fs';

const fn_p1_naive = (input) => {
    for (let i of input) {
        for (let j of input) {
            if (i + j === 2020) {
                return i * j;
            }
        }
    }
}

const fn_p1_better = (input) => {
    var set = input.reduce((acc, curr) => {
        acc[curr] = curr;
        return acc;
    }, {});

    for (let i of input) {
        let lhs = 2020 - i;
        if (set[lhs]) {
            return lhs * i;
        }
    }
    return null;
}

const fn_p2_naive = (input) => {
    for (let i of input) {
        for (let j of input) {
            for (let k of input) {
                if (i + j + k === 2020) {
                    return i * j * k;
                }
            }
        }
    }
    return null;
}

const fn_p2_better = (input) => {
    var set = input.reduce((acc, curr) => {
        acc[curr] = curr;
        return acc;
    }, {});

    for (let i of input) {
        for (let j of input) {
            let lhs = 2020 - i - j;
            if (set[lhs]) {
                return lhs * i * j;
            }
        }
    }
    return null;
}

var input = fs.readFileSync("./day1/input",'utf8').split('\r\n',).map(x => parseInt(x, 10));

console.time('benchmarkFn1');
console.log(fn_p1_naive(input));
console.timeEnd('benchmarkFn1');

console.time('benchmarkFn2');
console.log(fn_p1_better(input));
console.timeEnd('benchmarkFn2');

console.time('benchmarkFn2');
console.log(fn_p2_naive(input));
console.timeEnd('benchmarkFn2');

console.time('benchmarkFn2');
console.log(fn_p2_better(input));
console.timeEnd('benchmarkFn2');
/*
const benchmarkMap = size => {
    console.time('benchmarkMap');
    var map = new Map();
    for (var i = 0; i < size; i++) map.set(i, i);
    for (var i = 0; i < size; i++) var x = map.get(i);
    console.timeEnd('benchmarkMap');
  }
  
  const benchmarkObj = size => {
    console.time('benchmarkObj');
    var obj = {};
    for (var i = 0; i < size; i++) obj[i] = i;
    for (var i = 0; i < size; i++) var x = obj[i];
    console.timeEnd('benchmarkObj');
  }
  
  const benchmarkSet = size => {
    console.time('benchmarkSet');
    var set = new Set();
    for (var i = 0; i < size; i++) set.add(i, i);
    for (var i = 0; i < size; i++) var x = set[i];
    console.timeEnd('benchmarkSet');
  }

  var size = 10000;

  
benchmarkMap(size);
benchmarkObj(size);
benchmarkSet(size);
*/