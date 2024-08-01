// Conectar al servidor Socket.IO
const socket = io();

// Array de pacientes
const pacientes = [
    { id: 1, nombre: "augusto" }, 
    { id: 2, nombre: "julian" }
];

const tableBody = document.getElementById('table-body');

for (let item of pacientes) {
    let row = document.createElement('tr');
    let celdaIdentificador = document.createElement('td');
    let celdaNombre = document.createElement('td');
    let celdaSeleccionar = document.createElement('td');

    let boton = document.createElement('button');
    boton.textContent = 'Seleccionar';

    celdaIdentificador.textContent = item.id;
    celdaNombre.textContent = item.nombre;
    celdaSeleccionar.appendChild(boton);

    boton.onclick = () => {
        console.log('Este es el nombre del paciente: ', item.nombre);
        socket.emit('nombre-paciente', item.nombre); // Emitir el ID del paciente al backend
    };

    row.appendChild(celdaIdentificador);
    row.appendChild(celdaNombre);
    row.appendChild(celdaSeleccionar);

    tableBody.appendChild(row);
}

// Suscribirse al evento toastr-event
socket.on('toastr-event', (data) => {
    ToastrComponent(`Se encuentra en el establecimiento el paciente: ${data}`, 'info'); // Mostrar el toastr
});

function ToastrComponent(message, type="info") {
    const toastr = document.createElement('div');

    toastr.classList.add('toastr');
    toastr.classList.add(type);
    toastr.textContent = message;

    const container = document.getElementById('toastr-container');
    container.appendChild(toastr);

    setTimeout(() => {
        toastr.classList.add('show');
    }, 100);

    setTimeout(() => {
        toastr.classList.remove('show');
        toastr.classList.add('remove');
        setTimeout(() => {
            container.removeChild(toastr);
        }, 500);
    }, 3000);
}
