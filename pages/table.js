// Función para obtener datos del archivo JSON y generar la tabla
async function loadData() {
    try {
        // Obtener los datos del archivo JSON
        let response = await fetch('../data/data.json');
        let data = await response.json();
        window.data = data; // Guardar los datos en una variable global
        populateTable(data); // Llenar la tabla con los datos iniciales
    } catch (error) {
        console.error('Error getting data:', error);
    }
}

// Función para llenar la tabla con datos
function populateTable(data) {
    let tableBody = document.querySelector('#table-data tbody');
    tableBody.innerHTML = ''; // Limpiar la tabla

    // Recorrer los datos y crear las filas de la tabla
    data.forEach(item => {
        let row = document.createElement('tr');

        // Filtrar propiedades para excluir 'date-message'
        Object.entries(item).forEach(([key, value]) => {
            if (key !== 'date-message') {
                let cell = document.createElement('td');
                cell.textContent = value;
                row.appendChild(cell);
            }
        });

        // Añadir la fila al cuerpo de la tabla
        tableBody.appendChild(row);
    });
}

// Función para filtrar los datos según el rango de fechas seleccionado
function filterData() {
    const selectedOption = document.getElementById('choise').value;
    const today = new Date();
    let startDate;

    switch (selectedOption) {
        case 'last7days':
            startDate = new Date(today);
            startDate.setDate(today.getDate() - 7);
            break;
        case 'lastMonth':
            startDate = new Date(today);
            startDate.setMonth(today.getMonth() - 1);
            break;
        case 'lastYear':
            startDate = new Date(today);
            startDate.setFullYear(today.getFullYear() - 1);
            break;
        default:
            startDate = new Date(0); // Fecha muy antigua para incluir todos los datos
    }

    // Normalizar la fecha de inicio para que incluya el inicio del día
    startDate.setHours(0, 0, 0, 0);
    today.setHours(23, 59, 59, 999); // Incluye todo el día de hoy

    const filteredData = window.data.filter(item => {
        const itemDate = new Date(item['date-message']);
        // Normalizar la fecha del dato para que incluya el inicio del día
        itemDate.setHours(0, 0, 0, 0);
        return itemDate >= startDate && itemDate <= today;
    });

    populateTable(filteredData);
}

// Función para borrar toda la tabla
function clearTable() {
    let tableBody = document.querySelector('#table-data tbody');
    tableBody.innerHTML = ''; // Limpiar el contenido de la tabla
}

// Llamar a la función para cargar los datos cuando se cargue el contenido del DOM
document.addEventListener('DOMContentLoaded', loadData);

// Asignar la función de filtrado al botón Apply
document.getElementById('apply').addEventListener('click', filterData);

// Asignar la función de limpieza al botón Clear
document.getElementById('clear').addEventListener('click', clearTable);
