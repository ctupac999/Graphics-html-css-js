// filterController.js

/**
 * Función para obtener la opción seleccionada del filtro.
 * @returns {string} - La opción seleccionada.
 */
export function getSelectedFilterOption() {
    const selectElement = document.getElementById('choise');
    return selectElement.options[selectElement.selectedIndex].text;
}

/**
 * Función para actualizar la etiqueta statusChoise con el filtro seleccionado.
 * @param {string} filterOption - La opción de filtro seleccionada.
 */
export function updateStatusChoise(filterOption) {
    const statusChoiseElement = document.getElementById('statusChoise');
    statusChoiseElement.textContent = filterOption;
}

/**
 * Función para manejar el evento de clic en el botón Apply.
 */
export function handleApplyClick() {
    const selectedOption = getSelectedFilterOption();
    updateStatusChoise(selectedOption);
}
