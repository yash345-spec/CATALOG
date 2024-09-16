const fs = require('fs');

function decodeValue(value, base) {
    return parseInt(value, base); 
}

function lagrangeInterpolation(points) {
    let result = 0;
    let k = points.length;

    for (let i = 0; i < k; i++) {
        let term = points[i].y; 

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                term *= (0 - points[j].x) / (points[i].x - points[j].x);
            }
        }

        result += term;
    }

    return result; 
}

function findConstantTerm(input) {
    const keys = input.keys;
    const n = keys.n;
    const k = keys.k;

    const points = [];
    for (let i = 1; i <= n; i++) {
        const idx = i.toString();
        if (input[idx]) {
            const x = parseInt(idx); 
            const base = parseInt(input[idx].base); 
            const y = decodeValue(input[idx].value, base); 
            points.push({ x, y });
        }
    }

    const secret = lagrangeInterpolation(points);
    return secret;
}

fs.readFile('input.json', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading the file:", err);
        return;
    }

    const input = JSON.parse(data);
    const constantTerm = findConstantTerm(input);
    console.log("The constant term (secret) is:", constantTerm);
});