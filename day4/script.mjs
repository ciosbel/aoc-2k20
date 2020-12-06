import fs from 'fs';

const reqs = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];//, 'cid'];

const fn_p1 = (input) => {
    let valid = 0;
    for (let i of input) {
        valid += fn_p1_1(i);
    }
    return valid;
}

const fn_p1_1 = (input) => {
    const keys = Object.keys(input);
    for (let j of reqs) {
        if (keys.indexOf(j) === -1) {
            return 0;
        }
    }
    return 1;
}

const fn_p2 = (input) => {
    let valid = 0;
    for (let i of input) {
        valid += fn_p1_2(i);
    }
    return valid;
}

const fn_p1_2_minmax = (value, min, max) => {
    const v = parseInt(value, 10);
    if (v < min || v > max) {
        return false;
    }
    return true;
}

const fn_p1_2 = (input) => {
    const keys = Object.keys(input);
    const eyes = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
    for (let j of reqs) {
        let idx = keys.indexOf(j);
        if (idx === -1) {
            return 0;
        }
        var value = input[j];
        switch(j) {
            case 'byr':
                if (!fn_p1_2_minmax(value, 1920, 2002)) {
                    return 0;
                }
                break;
            case 'iyr':
                if (!fn_p1_2_minmax(value, 2010, 2020)) {
                    return 0;
                }
                break;
            case 'eyr':
                if (!fn_p1_2_minmax(value, 2020, 2030)) {
                    return 0;
                }
                break;
            case 'hgt':
                if (value.indexOf('in') > -1) {
                    if (!fn_p1_2_minmax(value.replace('in', ''), 59, 76)) {
                        return 0;
                    }
                } else if (value.indexOf('cm') > -1) {
                    if (!fn_p1_2_minmax(value.replace('cm', ''), 150, 193)) {
                        return 0;
                    }
                } else {
                    return 0;
                }
                break;
            case 'hcl':
                if (value[0] !== '#' || !/^[0-9a-f]{6}$/.test(value.replace('#', ''))) {
                    return 0;
                }
                break;
            case 'ecl':
                if (eyes.indexOf(value) === -1) {
                    return 0;
                }
                break;
            case 'pid':
                if (!/^[0-9]{9}$/.test(value)) {
                    return 0;
                }
                break;
            case 'cid':
                break;
        }
    }
    return 1;
}

var input = fs.readFileSync("./day4/input",'utf8')
    .replace(/\r\n/g, ' ')
    .split('  ')
    .map(x => x.split(' '))
    .reduce((acc, val) => {
        const obj = {};
        for (let i of val) {
            const [a, b] = i.split(':');
            obj[a] = b;
        }
        return [...acc, obj]
    }, []);

console.time('fn_p1');
console.log(fn_p1(input)); // 222
console.timeEnd('fn_p1');

console.time('fn_p2');
console.log(fn_p2(input)); // 140
console.timeEnd('fn_p2');