// cackechart.js

import { filterData } from './tableController.js';
import { clearTable } from './tableController.js';

// Ruta al archivo JSON
const dataUrl = './data/data.json';

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

// Función para actualizar los indicadores y el gráfico
function updateIndicatorsAndChart(data) {
    // Contadores para los estados y processed false
    const counts = {
        active: 0,
        inactive: 0,
        pending: 0,
        notProcessed: 0
    };
    // Total de registros
    const total = data.length;

    // Contar los estados y processed false
    data.forEach(item => {
        if (item.STATUS === 'active') counts.active++;
        if (item.STATUS === 'inactive') counts.inactive++;
        if (item.STATUS === 'pending') counts.pending++;
        if (!item.PROCESSED) counts.notProcessed++;
    });

    // Calcular porcentajes
    const percentages = {
        active: calculatePercentage(counts.active, total),
        inactive: calculatePercentage(counts.inactive, total),
        pending: calculatePercentage(counts.pending, total),
        notProcessed: calculatePercentage(counts.notProcessed, total)
    };

    // Mostrar el total de registros en el HTML
    document.getElementById('totalRecords').textContent = total;

    // Mostrar los indicadores en el HTML
    document.getElementById('activeIndicator').textContent = counts.active;
    document.getElementById('inactiveIndicator').textContent = counts.inactive;
    document.getElementById('pendingIndicator').textContent = counts.pending;
    document.getElementById('notProcessedIndicator').textContent = counts.notProcessed;

    // Mostrar los porcentajes en las etiquetas h5
    document.getElementById('activeIndicatorPercentage').textContent = `${percentages.active}%`;
    document.getElementById('inactiveIndicatorPercentage').textContent = `${percentages.inactive}%`;
    document.getElementById('pendingIndicatorPercentage').textContent = `${percentages.pending}%`;
    document.getElementById('notProcessedIndicatorPercentage').textContent = `${percentages.notProcessed}%`;

    // Actualizar el gráfico combinado con los mismos datos
    combinedChart.data.datasets[0].data = [counts.active, counts.inactive, counts.pending, counts.notProcessed];
    combinedChart.update();
}

// Función para reiniciar los indicadores y el gráfico
function resetIndicatorsAndChart() {
    // Reiniciar contadores en el HTML
    document.getElementById('totalRecords').textContent = 0;
    document.getElementById('activeIndicator').textContent = 0;
    document.getElementById('inactiveIndicator').textContent = 0;
    document.getElementById('pendingIndicator').textContent = 0;
    document.getElementById('notProcessedIndicator').textContent = 0;

    // Reiniciar porcentajes en las etiquetas h5
    document.getElementById('activeIndicatorPercentage').textContent = '0%';
    document.getElementById('inactiveIndicatorPercentage').textContent = '0%';
    document.getElementById('pendingIndicatorPercentage').textContent = '0%';
    document.getElementById('notProcessedIndicatorPercentage').textContent = '0%';

    // Reiniciar el gráfico combinado
    combinedChart.data.datasets[0].data = [0, 0, 0, 0];
    combinedChart.update();
}

// Crear el gráfico combinado
const ctxCombined = document.getElementById('combinedChart').getContext('2d');
const combinedChart = new Chart(ctxCombined, {
    type: 'pie',
    data: {
        datasets: [{
            label: 'Status y Not Processed',
            data: [0, 0, 0, 0],
            backgroundColor: ['#03A9F4', '#22C55E', '#FF7B1C', '#FF0000'] // Añadir un color para Not Processed
        }]
    },
    options: {
        responsive: true,
    }
});

// Función principal para cargar y mostrar los datos
async function main() {
    try {
        const data = await loadData(dataUrl);
        window.originalData = data; // Guardar los datos originales en una variable global
        updateIndicatorsAndChart(data);

        // Asignar la función de filtrado al botón Apply
        document.getElementById('apply').addEventListener('click', () => {
            const filteredData = filterData(window.originalData);
            updateIndicatorsAndChart(filteredData);
        });

        // Asignar la función de limpieza al botón Clear
        document.getElementById('clear').addEventListener('click', () => {
            clearTable();
            resetIndicatorsAndChart();
        });
    } catch (error) {
        console.error('Error loading or processing data:', error);
    }
}

// Ejecutar la función principal
main();
