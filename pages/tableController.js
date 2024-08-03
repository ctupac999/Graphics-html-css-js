// tableController.js

/**
 * Llena la tabla con los datos proporcionados.
 * @param {Object[]} data - Los datos a mostrar en la tabla.
 */
export function populateTable(data) {
    let tableBody = document.querySelector('#table-data tbody');
    tableBody.innerHTML = ''; // Limpiar la tabla

    data.forEach(item => {
        let row = document.createElement('tr');
        Object.entries(item).forEach(([key, value]) => {
            if (key !== 'date-message') {
                let cell = document.createElement('td');
                cell.textContent = value;
                row.appendChild(cell);
            }
        });
        tableBody.appendChild(row);
    });
}

/**
 * Filtra los datos según el rango de fechas seleccionado y actualiza la tabla.
 * @param {Object[]} data - Los datos a filtrar.
 */
export function filterData(data) {
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

    startDate.setHours(0, 0, 0, 0);
    today.setHours(23, 59, 59, 999);

    const filteredData = data.filter(item => {
        const itemDate = new Date(item['date-message']);
        itemDate.setHours(0, 0, 0, 0);
        return itemDate >= startDate && itemDate <= today;
    });

    return filteredData;
}

/**
 * Limpia el contenido de la tabla.
 */
export function clearTable() {
    let tableBody = document.querySelector('#table-data tbody');
    tableBody.innerHTML = ''; // Limpiar el contenido de la tabla
}
