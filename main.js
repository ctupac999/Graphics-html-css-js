// main.js
import { loadData } from './dataService.js';
import { populateTable, filterData, clearTable } from './tableController.js';
import { handleApplyClick, handleClearClick } from './statusController.js';

// Variable global para almacenar datos
window.data = [];

/**
 * Función para inicializar la aplicación.
 */
async function init() {
    try {
        window.data = await loadData('./data/data.json');
        populateTable(window.data); // Llenar la tabla con los datos iniciales
    } catch (error) {
        console.error('Error initializing application:', error);
    }
}

/**
 * Función para manejar la aplicación de filtros.
 */
function applyFilters() {
    if (window.data.length > 0) {
        const filteredData = filterData(window.data);
        populateTable(filteredData);
    }
}

// Llamar a la función de inicialización cuando se cargue el contenido del DOM
document.addEventListener('DOMContentLoaded', init);

// Asignar la función de filtrado al botón Apply
document.getElementById('apply').addEventListener('click', () => {
    handleApplyClick();
    applyFilters();
});

// Asignar la función de limpieza al botón Clear
document.getElementById('clear').addEventListener('click', () => {
    handleClearClick();
    clearTable();
});
