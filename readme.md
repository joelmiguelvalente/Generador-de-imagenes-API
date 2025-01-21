//tomamos el input 
let valueSearch = null; // Variable para almacenar el valor ingresado 
// en el input de búsqueda
buscarInput.addEventListener('keyup', (e) => {
  // Evento que escucha cuando se presiona una tecla en el input
  // e = representa el objeto del evento que el navegador 
  // envía automáticamente a la función del manejador.

//   key = es una propiedad específica del objeto del 
//   evento en los eventos de teclado como

// Cada vez que ocurre un evento relacionado con el teclado, 
// el navegador crea un objeto del evento.
//   Este objeto contiene información sobre el evento,
//   incluyendo la tecla que fue presionada.

// {
//     key: "Enter",
// }

  if (e.key === 'Enter') {
    // Verifica si la tecla presionada es "Enter"
    console.log('Enter key pressed'); // Muestra un mensaje en la 
    // consola para confirmar el evento
    currentPage = 1; // Reinicia la página actual a la 1 para iniciar
    //  una nueva búsqueda
    // valueSearch = e.target.value; // Obtiene el valor del input (texto 
    valueSearch = buscarInput; 
    // ingresado por el usuario)
    imagenes.innerHTML = ""; // Limpia el contenedor de imágenes 
    // para mostrar solo los resultados de búsqueda
    SolicitarImagenes(`https://api.pexels.com/v1/search?query=${valueSearch}&page=${currentPage}&per_page=${numPage}`);
    // Construye la URL de búsqueda personalizada:
    // - 'query': Define el término de búsqueda (valor del input)
    // - 'page': Página actual (reiniciada a 1)
    // - 'per_page': Número de imágenes por página (15 en este caso)
  }
});
