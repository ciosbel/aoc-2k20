import fs from 'fs';

const build_graph = (input) => {

    const graph = {};
    const bagsRegex = new RegExp(/(\d+) ([\w\s]{1,}) bags?[,.]/, 'g');

    for (let rule of input) {
        // I really hate regex lookahead/behind.
        const nodeName = rule.substring(0, rule.indexOf(' bags contain'));
        const adiacentNodes = [...rule.matchAll(bagsRegex)];

        if (rule.indexOf('no other bags') !== -1) {
            graph[nodeName] = [];
            continue;
        }
        graph[nodeName] = adiacentNodes.map(x => {
            return {
                node: x[2],
                weight: parseInt(x[1])
            }
        });
    }
    return graph;
}

const count_bag = (graph, nodes, bagToFind) => {

    // The simplest possible graph traversal I could imagine in such a late night.
    for (let node in nodes) {
        const curr = nodes[node].node;
        if (curr === bagToFind) {
            return 1;
        }        
        const bag = count_bag(graph, graph[curr], bagToFind);
        if (bag) {
            return bag;
        }
    }
    return 0;
}

const fn_p1 = (input) => {

    const graph = build_graph(input);

    let bags = 0
    for (let vertex in graph) {
        bags += count_bag(graph, graph[vertex], 'shiny gold');
    }

    return bags;
}

const count_bag_pt2 = (graph, nodes) => {

    let count = 0;
    for (let node in nodes) {
        const curr = nodes[node].node;
        const weight = nodes[node].weight;
        count += weight + weight * count_bag_pt2(graph, graph[curr]);
    }
    return count;
}

const fn_p2 = (input) => {

    const graph = build_graph(input);
    return count_bag_pt2(graph, graph['shiny gold']);
}

const input = fs.readFileSync("./day7/input",'utf8').split('\r\n');

console.time('fn_p1');
console.log(fn_p1(input)); // 151
console.timeEnd('fn_p1');

console.time('fn_p2');
console.log(fn_p2(input)); // 41559
console.timeEnd('fn_p2');
