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

// Función principal
async function main() {
    try {
        const data = await loadData(dataUrl);

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

        
        // Crear el gráfico combinado
        const ctxCombined = document.getElementById('combinedChart').getContext('2d');
        const combinedChart = new Chart(ctxCombined, {
            type: 'pie',
            data: {
                datasets: [{
                    label: 'Status y Not Processed',
                    data: [counts.active, counts.inactive, counts.pending, counts.notProcessed],
                    backgroundColor: ['#03A9F4', '#22C55E', '#FF7B1C', '#D32F2F']
                }]
            },
            options: {
                responsive: true,
            }
        });
    } catch (error) {
        console.error('Error loading or processing data:', error);
    }
}

// Ejecutar la función principal
main();
