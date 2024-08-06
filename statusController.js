// statusController.js

/**
 * Función para obtener la opción seleccionada del filtro.
 * @returns {string} - El valor de la opción seleccionada.
 */
function getSelectedFilterValue() {
    const selectElement = document.getElementById('choise');
    return selectElement.value;
}

/**
 * Función para actualizar la etiqueta statusChoise con el valor del filtro seleccionado.
 * @param {string} filterValue - El valor del filtro seleccionado.
 */
function updateStatusChoise(filterValue) {
    const statusChoiseElement = document.getElementById('statusChoise');
    statusChoiseElement.textContent = filterValue;
}

/**
 * Función para manejar el evento de clic en el botón Apply.
 */
function handleApplyClick() {
    const selectedValue = getSelectedFilterValue();
    updateStatusChoise(selectedValue);
}

/**
 * Función para manejar el evento de clic en el botón Clear.
 */
function handleClearClick() {
    updateStatusChoise('');
}

// Exportar las funciones para ser utilizadas en otros módulos
export { handleApplyClick, handleClearClick };
