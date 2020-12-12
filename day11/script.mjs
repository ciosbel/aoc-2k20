import fs from 'fs';

const print = (input) => {
    console.table(input.map(x => [...x]));
}

const out_of_bounds = (i, j, [upperI, upperJ]) => {
    return i < 0 || j < 0 || i > upperI || j > upperJ;
}

const toggleable = (mtrx, i, j, threshold, sight) => {

    const bounds = [mtrx.length - 1, mtrx[i].length - 1];
    let k = 1;
    let dirs = {0:1, 1:1, 2:1, 3:1, 4:1, 5:1, 6:1, 7:1}
    let minSeatable = 0;
    while (true) {
        let coords = [
            [i - k, j - k],
            [i + k, j + k],
            [i, j - k],
            [i, j + k],
            [i - k, j],
            [i + k, j],
            [i + k, j - k],
            [i - k, j + k],
        ];

        let exhaustedDirsCount = 0;
        for (var idx in coords) {
            if (!dirs[idx]) {
                exhaustedDirsCount += 1;
                continue;
            }
            const [i, j] = [...coords[idx]];
            if (out_of_bounds(i, j, bounds)) {
                dirs[idx] = 0;
                continue;
            }
            if (mtrx[i][j] === 'L') {
                dirs[idx] = 0;
                continue;
            }
            if (mtrx[i][j] === '#') {
                minSeatable += 1;
                if (minSeatable === threshold) {
                    return threshold > 1;
                }
                dirs[idx] = 0;
            }
        }
        if (!sight || exhaustedDirsCount === 8) {
            return threshold === 1;
        }
        k +=1;
    }
}

const fn_pX = (matrix, seatThreshold, standUpThreshold, sight) => {

    let seatMePlease = true;
    let lastSeatCount = 0;
    let seatCount = -1;

    while(lastSeatCount != seatCount) {
        lastSeatCount = seatCount;
        seatCount = 0;
        let backing = matrix.map(x => [...x]);

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] === '#') {
                    seatCount += 1;
                }
                if (matrix[i][j] === '.') {
                    continue;
                }
                if (seatMePlease && matrix[i][j] === 'L' && toggleable(matrix, i, j, seatThreshold, sight)) {
                    backing[i][j] = '#';
                    seatCount += 1;
                    continue;
                }
                if (!seatMePlease && matrix[i][j] === '#' && toggleable(matrix, i, j, standUpThreshold, sight)) {
                    backing[i][j] = 'L';
                    seatCount -= 1;
                    continue;
                }
            }
        }
        matrix = backing;
        seatMePlease = !seatMePlease;
    }

    return seatCount;
}

const fn_p1 = (matrix) => {
    return fn_pX(matrix, 1, 4, false);
}

const fn_p2 = (matrix) => {
    return fn_pX(matrix, 1, 5, true);
}

const input = fs.readFileSync("./day11/input",'utf8').split('\r\n').map(x => [...x]);

console.time('fn_p1');
console.log(fn_p1(input)); // 2489
console.timeEnd('fn_p1');

console.time('fn_p2');
console.log(fn_p2(input)); // 2180
console.timeEnd('fn_p2');
