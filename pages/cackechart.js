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

            

        // Mostrar los indicadores en el HTML
        document.getElementById('activeIndicator').textContent = counts.active;
        document.getElementById('inactiveIndicator').textContent = counts.inactive;
        document.getElementById('pendingIndicator').textContent = counts.pending;
        document.getElementById('notProcessedIndicator').textContent = counts.notProcessed;

        // Crear el gráfico combinado
        const ctxCombined = document.getElementById('combinedChart').getContext('2d');
        const combinedChart = new Chart(ctxCombined, {
            type: 'pie',
            data: {
                datasets: [{
                    label: 'Status y Not Processed',
                    data: [counts.active, counts.inactive, counts.pending],
                    backgroundColor: ['#03A9F4', '#22C55E', '#FF7B1C']
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
