function createMatrix() {
    const n = document.getElementById('n').value;
    let html = '<table>';
    for (let i = 0; i < n; i++) {
        html += '<tr>';
        for (let j = 0; j < n; j++) {
            let val = (i === j) ? 1 : 1;
            html += `<td><input type="number" class="matrix-input" id="c${i}${j}" value="${val}" step="0.1" onchange="autoReciprocal(${i},${j})"></td>`;
        }
        html += '</tr>';
    }
    html += '</table><button onclick="calculateAHP()">Calculate & Graph</button>';
    document.getElementById('matrixArea').innerHTML = html;
}

function autoReciprocal(i, j) {
    let val = document.getElementById(`c${i}${j}`).value;
    document.getElementById(`c${j}${i}`).value = (1 / val).toFixed(3);
}

function calculateAHP() {
    const n = parseInt(document.getElementById('n').value);
    const RI = [0, 0, 0.58, 0.90, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49];
    
    // 1. Get Matrix Values
    let matrix = [];
    for(let i=0; i<n; i++){
        matrix[i] = [];
        for(let j=0; j<n; j++) matrix[i][j] = parseFloat(document.getElementById(`c${i}${j}`).value);
    }

    // 2. Simple Eigenvector Approximation (Row Geometric Mean)
    let weights = matrix.map(row => Math.pow(row.reduce((a,b) => a*b), 1/n));
    let total = weights.reduce((a,b) => a+b);
    let normalized = weights.map(w => (w/total) * 100);

    // 3. Consistency Check (Placeholder for full Eigenvalue logic)
    // Note: For your research, you will add the CR calculation here
    const status = document.getElementById('status');
    status.innerHTML = "Weight Calculation Complete. (Check CR < 0.1)";
    status.className = "consistent";

    // 4. Graphing
    const trace = { x: normalized.map((_,i) => `Factor ${i+1}`), y: normalized, type: 'bar' };
    Plotly.newPlot('chart', [trace], { title: 'Criteria Weights (%)' });
}
