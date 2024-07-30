// Ruta al archivo JSON
const dataUrl = '../data/data.json';

// Función para cargar los datos JSON
async function loadData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
}

// Función para calcular el porcentaje
function calculatePercentage(part, total) {
    return ((part / total) * 100).toFixed(2);
}

// Función principal
async function main1() {
    try {
        const data = await loadData(dataUrl);
        const total = data.length;

        // Contadores para los estados y processed false
        const counts = {
            active: 0,
            inactive: 0,
            pending: 0,
            notProcessed: 0
        };

        // Contar los estados y processed false
        data.forEach(item => {
            if (item.STATUS === 'active') counts.active++;
            if (item.STATUS === 'inactive') counts.inactive++;
            if (item.STATUS === 'pending') counts.pending++;
            if (!item.PROCESSED) counts.notProcessed++;
        });

        // // Mostrar los indicadores en el HTML
        // document.getElementById('activeIndicator').textContent =
        //     `Active: ${counts.active} (${calculatePercentage(counts.active, total)}%)`;
        // document.getElementById('inactiveIndicator').textContent =
        //     `Inactive: ${counts.inactive} (${calculatePercentage(counts.inactive, total)}%)`;
        // document.getElementById('pendingIndicator').textContent =
        //     `Pending: ${counts.pending} (${calculatePercentage(counts.pending, total)}%)`;
        // document.getElementById('notProcessedIndicator').textContent =
        //     `Not Processed: ${counts.notProcessed} (${calculatePercentage(counts.notProcessed, total)}%)`;
    } catch (error) {
        console.error('Error loading or processing data:', error);
    }
}

// Ejecutar la función principal
main1();
