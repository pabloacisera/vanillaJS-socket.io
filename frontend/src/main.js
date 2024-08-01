// Conectar al servidor Socket.IO
const socket = io();

/**escuchar servidor *************/

socket.on('ping', () => { //cuano se recibe el ping, se puede hacer algo!!!
    console.log('Esto es la escucha del servidor de socket...')
    socket.emit('respuesta')//podemos devolverle una respueta tambien
})





/**************************logica de negocio********************************/


const usuarios = [
    {
        id: 1,
        nombre: "pablo",
    },
    {
        id: 2,
        nombre: "jose",
    },
]

const pacientes = [
    { id: 1, nombre: "augusto" }, 
    { id: 2, nombre: "julian" }
];

const tableBody = document.getElementById('table-body');

let idDeUsuario

for(let item of pacientes) {
    // Crear la fila
    let row = document.createElement('tr');

    // Crear las celdas
    let celdaIdentificador = document.createElement('td');
    let celdaNombre = document.createElement('td');
    let celdaSeleccionar = document.createElement('td');

    // Crear botón para la celda seleccionar
    let boton = document.createElement('button');
    boton.textContent = 'Seleccionar';

    // Cargar los datos en las celdas
    celdaIdentificador.textContent = item.id;
    celdaNombre.textContent = item.nombre;
    celdaSeleccionar.appendChild(boton);

    boton.onclick = () => {
        console.log('Este es el id del paciente: ', item.id);
        idDeUsuario = item.id
        socket.emit('userId', idDeUsuario)//solo debe pasar el dato, no una funcion
    };

    // Cargar las celdas en la fila
    row.appendChild(celdaIdentificador);
    row.appendChild(celdaNombre);
    row.appendChild(celdaSeleccionar);

    // Agregar la fila al cuerpo de la tabla
    tableBody.appendChild(row);
}

/***************************************************************************/