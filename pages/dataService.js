// dataService.js

/**
 * Carga datos desde una URL y devuelve una promesa con los datos JSON.
 * @param {string} url - La URL desde la que cargar los datos.
 * @returns {Promise<Object[]>} - Una promesa que resuelve con los datos JSON.
 */
export async function loadData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    } catch (error) {
        console.error('Error getting data:', error);
        throw error; // Propaga el error para que pueda ser manejado en otros lugares
    }
}
