// Función para obtener datos del archivo JSON y generar la tabla
async function table() {
  try {
      // Obtener los datos del archivo JSON
      let response = await fetch('../data/data.json');
      let data = await response.json();

      // Seleccionar el cuerpo de la tabla
      let tableBody = document.querySelector('#table-data tbody');

      // Recorrer los datos y crear las filas de la tabla
      data.forEach(item => {
          let row = document.createElement('tr');

          // Crear y añadir celdas a la fila
          Object.values(item).forEach(value => {
              let cell = document.createElement('td');
              cell.textContent = value;
              row.appendChild(cell);   
          });

          // Añadir la fila al cuerpo de la tabla
          tableBody.appendChild(row);
      });
  } catch (error) {
      console.error('Error getting data:', error);
  }
}

// Llamar a la función para generar la tabla cuando se cargue el contenido del DOM
document.addEventListener('DOMContentLoaded', table);
