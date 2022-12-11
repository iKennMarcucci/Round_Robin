let arrayProcesos = [];
let times = [];
function insertRow() {
    let nFilas = document.getElementById('tablaProcesos').getElementsByTagName('tr').length;
    let tablaProcesos = document.getElementById('tablaProcesos').insertRow(nFilas);
    let col0 = tablaProcesos.insertCell(0)
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
    console.log(quantum.value);
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
    idciclostotales.value = '';
    idtiempototal.value = '';
    bodycard.innerHTML = '';
    bodycard.innerHTML += '<p>--> Quantum: ' + quantum.value + '</p>';
    bodycard.innerHTML += '<p>--> Cantidad de Procesos: ' + (arrayProcesos.length) + '</p>';
    await sleep(1000);
    for (let i = 0; i < arrayProcesos.length && !terminado; i++) {
        if (arrayProcesos[i] > 0) {
            bodycard.innerHTML += '<p></p>';
            bodycard.innerHTML += '<p class="badge text-bg-warning">' + "============== Proceso #" + i + " ==============" + '</p>';
            await sleep(750);
            bodycard.innerHTML += '<p>' + " • Ráfaga de CPU a procesar = " + arrayProcesos[i] + '</p>';
            arrayProcesos[i] -= parseInt(quantum.value);
            if (arrayProcesos[i] > 0) {
                tiempo += parseInt(quantum.value);
            } else {
                tiempo += parseInt(quantum.value) + parseInt(arrayProcesos[i]);
                times[i] = tiempo;
            }
            await sleep(750);
            if (arrayProcesos[i] > 0) {
                bodycard.innerHTML += '<p>' + " • Ráfaga de CPU procesada  = " + arrayProcesos[i] + '</p>';
            } else {
                bodycard.innerHTML += '<p>' + " • Ráfaga de CPU procesada  = 0" + '</p>';
            }
            ciclos++;
            await sleep(750);
            bodycard.innerHTML += '<p class="badge text-bg-primary">' + "Ciclo #" + ciclos + '</p>     ';
            if (arrayProcesos[i] > 0) {
                bodycard.innerHTML += '     <p class="badge text-bg-success">' + "Tiempo --> " + tiempo + '</p>';
            } else {
                bodycard.innerHTML += '     <p class="badge text-bg-danger">' + "Tiempo FINAL (TAT) --> " + times[i] + '</p>';
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
    bodycard.innerHTML += '<p><b>' + "--> Ciclos Totales = " + ciclos + '</b></p>';
    bodycard.innerHTML += '<p><b>' + "--> Tiempo Total = " + tiempo + '</b></p>';
    idciclostotales.value = ciclos;
    idtiempototal.value = tiempo;
    await sleep(1);
}

function sleep(ms) {
    let bajable = document.getElementById('bajable');
    bajable.scrollTop = bajable.scrollHeight;
    return new Promise(resolve => setTimeout(resolve, ms));
}