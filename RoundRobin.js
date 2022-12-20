let arrayProcesos = [];
let times = [];
function insertRow() {
    let nFilas = document.getElementById('tablaProcesos').getElementsByTagName('tr').length;
    let tablaProcesos = document.getElementById('tablaProcesos').insertRow(nFilas);
    let col0 = tablaProcesos.insertCell(0);
    let col1 = tablaProcesos.insertCell(1);
    let col2 = tablaProcesos.insertCell(2);

    col0.innerHTML = '<b>P' + (nFilas) + '</b>';
    col1.innerHTML = '<input class="text-center border-0 bg-transparent" id="orden" type="number" style="width: 25%;" value="0" name="cpu" autocomplete="off">';
    col2.innerHTML = '<input class="text-center border-0 bg-transparent" id="orden" type="number" style="width: 25%;" value="' + (nFilas - 1) + '" disabled>';
}

function execute() {
    let burst = document.getElementsByName('cpu');
    var i = 0;
    burst.forEach(element => {
        arrayProcesos[i] = element.value;
        i++;
    });
    let quantum = document.getElementById('floatingQuantum');
    if (quantum.value != '') {
        roundRobin(quantum);
    } else {
        console.log("Digite un valor válido para el Quantum");
    }
}

async function roundRobin(quantum) {
    let ciclos = 0;
    let tiempo = 0;
    let terminado = false;
    let bodycard = document.getElementById('salida');
    let idciclostotales = document.getElementById('idciclostotales');
    let idtiempototal = document.getElementById('idtiempototal');
    let ganttchart = document.getElementById('ganttchart');
    const tbody = document.createElement('tbody');
    const row1 = document.createElement('tr');
    const row2 = document.createElement('tr');
    ganttchart.innerHTML = '';
    var valoranterior = 0;
    idciclostotales.value = '';
    idtiempototal.value = '';
    bodycard.innerHTML = '';
    bodycard.innerHTML += '<p>--> Quantum: ' + quantum.value + '</p>';
    bodycard.innerHTML += '<p>--> Number of Processes: ' + (arrayProcesos.length) + '</p>';
    const title1 = document.createElement('th');
    title1.textContent = 'Time Elapsed'
    const title2 = document.createElement('th');
    title2.textContent = 'Process'
    row1.appendChild(title1);
    row2.appendChild(title2);
    tbody.appendChild(row1);
    ganttchart.appendChild(tbody);
    tbody.appendChild(row2);
    ganttchart.appendChild(tbody);
    await sleep(1000);
    for (let i = 0; i < arrayProcesos.length && !terminado; i++) {
        if (arrayProcesos[i] > 0) {
            const col1 = document.createElement('td');
            const col2 = document.createElement('td');
            bodycard.innerHTML += '<p></p>';
            bodycard.innerHTML += '<p class="badge text-bg-warning">' + "============== Process #" + i + " ==============" + '</p>';
            col2.textContent = 'P' + (i + 1);
            row2.appendChild(col2);
            await sleep(750);
            bodycard.innerHTML += '<p>' + " • CPU burst to process = " + arrayProcesos[i] + '</p>';
            arrayProcesos[i] -= parseInt(quantum.value);
            if (arrayProcesos[i] > 0) {
                tiempo += parseInt(quantum.value);
            } else {
                tiempo += parseInt(quantum.value) + parseInt(arrayProcesos[i]);
                times[i] = tiempo;
            }
            await sleep(750);
            if (arrayProcesos[i] > 0) {
                bodycard.innerHTML += '<p>' + " • CPU burst processed  = " + arrayProcesos[i] + '</p>';
            } else {
                bodycard.innerHTML += '<p>' + " • CPU burst processed  = 0" + '</p>';
            }
            ciclos++;
            await sleep(750);
            bodycard.innerHTML += '<p class="badge text-bg-primary">' + "Cycle #" + ciclos + '</p>     ';
            if (arrayProcesos[i] > 0) {
                bodycard.innerHTML += '<p class="badge text-bg-success">' + "Time --> " + tiempo + '</p>';
                col1.textContent = valoranterior + ' to ' + tiempo;
                valoranterior = tiempo;
                row1.appendChild(col1);
                tbody.appendChild(row1);
                ganttchart.appendChild(tbody);
                tbody.appendChild(row2);
            ganttchart.appendChild(tbody);
            } else {
                bodycard.innerHTML += '<p class="badge text-bg-danger">' + "FINAL TIME --> " + times[i] + '</p>';
                col1.textContent = valoranterior + ' to ' + tiempo;
                valoranterior = tiempo;
                row1.appendChild(col1);
                tbody.appendChild(row1);
                ganttchart.appendChild(tbody);
                tbody.appendChild(row2);
            ganttchart.appendChild(tbody);
            }
            await sleep(2000);
        }
        for (let j = 0; j < arrayProcesos.length && i == arrayProcesos.length - 1; j++) {
            if (arrayProcesos[j] <= 0) {
                terminado = true;
            } else {
                terminado = false;
                i = -1;
                break;
            }
        }
    }
    await sleep(500);
    bodycard.innerHTML += '<p><b>' + "--> Total Cycles = " + ciclos + '</b></p>';
    bodycard.innerHTML += '<p><b>' + "--> Total Time = " + tiempo + '</b></p>';
    idciclostotales.value = ciclos;
    idtiempototal.value = tiempo;
    await sleep(1);
}

function sleep(ms) {
    let bajable = document.getElementById('bajable');
    bajable.scrollTop = bajable.scrollHeight;
    return new Promise(resolve => setTimeout(resolve, ms));
}