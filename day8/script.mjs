import fs from 'fs';

const fn_loop_detector = (statements) => {
    let register = 0;
    let instructionPointer = 0;
    let visitedPointers = new Set([]);
    let callStack = [];
    // We should: parse, build an AST and write an interpreter: we simplyfy things here.
    while(instructionPointer < statements.length) {
        if (visitedPointers.has(instructionPointer)) {
            // Simple loop detection, as stated in the quiz.
            return [register, false, callStack];
        }
        visitedPointers.add(instructionPointer);
        callStack = [...callStack, instructionPointer];

        const statement = statements[instructionPointer];
        const [instruction, argument] = statement.split(' ');

        switch(instruction) {
            case 'nop':
                instructionPointer++;
                break;
            case 'acc':
                register += parseInt(argument);
                instructionPointer++;
                break;
            case 'jmp':
                instructionPointer += parseInt(argument);
                break;                
        }
    }
    return [register, true, callStack];
}

const fn_p1 = (statements) => {
    const [register, _] = fn_loop_detector(statements);
    return register;
}

// Starts form the bottom to replace until termination.
const fn_p2_backtrack = (statements) => {
    let [register, terminated] = fn_loop_detector(statements);
    let lastPatchedIndex = statements.length;
    while (!terminated) {

        let idx = lastPatchedIndex;
        let [stmt, _] = '';
        do {
            idx--;
            [stmt, _] = statements[idx].split(' ');
        }
        while (stmt !== 'jmp' && stmt !== 'nop');

        lastPatchedIndex = idx;

        const patchedInput = statements.map((x, index) => {
            if (lastPatchedIndex === index) {
                return stmt === 'jmp'
                ? x.replace('jmp', 'nop')
                : x.replace('nop', 'jmp');
            }
            return x;
        });

        [register, terminated] = fn_loop_detector(patchedInput);
    }
    return register;
}

// Simple brute force solution.
const fn_p2_brute = (statements) => {
    for (var i in statements) {
        let [instruction, argument] = statements[i].split(' ');
        if (instruction === 'acc') {
            continue;
        }

        if (instruction === 'jmp') {
            instruction = 'nop ';
        } else {
            instruction = 'jmp ';
        }
        const patchedInput = [...statements];
        patchedInput[i] = instruction + argument;
        const [register, terminated] = fn_loop_detector(patchedInput);    

        if (terminated) {
            return register;
        }
    }
    return null;
}

// Brute force only on visited stmts.
const fn_p2_only_visited = (statements) => {
    const [_1, _2, callStack] = fn_loop_detector(statements);

    for (var i in callStack) {
        let stmtIdx = callStack[i];
        let [instruction, argument] = statements[stmtIdx].split(' ');
        if (instruction === 'acc') {
            continue;
        }

        if (instruction === 'jmp') {
            instruction = 'nop ';
        } else {
            instruction = 'jmp ';
        }
        const patchedInput = [...statements];
        patchedInput[stmtIdx] = instruction + argument;
        const [register, terminated] = fn_loop_detector(patchedInput);    

        if (terminated) {
            return register;
        }
    }
    return null;
}

/* Unfinished. This should be in-place stmt swap, but laziness caught me.
const fn_p2 = (statements) => {
    let register = 0;
    let instructionPointer = 0;
    let visitedPointers = new Set([]);
    let callStack = [];
    let patchedPointer = -1;
    let registerBeforeFirstPatch = 0;
    while(instructionPointer < statements.length) {
        if (visitedPointers.has(instructionPointer)) {
            // We failed to find the right patch. Restore everuthing and try another strategy.
            const backIndex = 1;
            let previousJmpOrNopInstruction = '';
            while(previousJmpOrNopInstruction !== 'jmp' && previousJmpOrNopInstruction !== 'nop') {
                backIndex += 1;
                previousJmpOrNopInstruction = statements[callStack[callStack.length - backIndex]].split(' ');
            }
            // Try to patch jmp or nop and redo the computation.
            instructionPointer -= callStack.length - 1 - backIndex;
            callStack = [callStack.length - 1];

            registerBeforeFirstPatch = register;
            return register;
        }
        visitedPointers.add(instructionPointer);
        callStack = [...callStack, instructionPointer];
        const statement = statements[instructionPointer];
        const [instruction, argument] = statement.split(' ');
        switch(instruction) {
            case 'nop':
                instructionPointer++;
                break;
            case 'acc':
                register += parseInt(argument);
                instructionPointer++;
                break;
            case 'jmp':
                instructionPointer += parseInt(argument);
                break;                
        }
    }
    return register;
}
*/
const input = fs.readFileSync("./day8/input",'utf8').split('\r\n');

console.time('fn_p1');
console.log(fn_p1(input)); // 1420
console.timeEnd('fn_p1');

console.time('fn_p2_brute');
console.log(fn_p2_brute(input)); // 1245
console.timeEnd('fn_p2_brute');

console.time('fn_p2_backtrack');
console.log(fn_p2_backtrack(input)); // 1245
console.timeEnd('fn_p2_backtrack');

console.time('fn_p2_only_visited');
console.log(fn_p2_only_visited(input)); // 1245
console.timeEnd('fn_p2_only_visited');
