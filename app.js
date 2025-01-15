const apiKey = "f5w0AqiyhPbskiSXtzTQVtyR8d1NGMzkcYW4K5ujeKKrps2mOTJGJwqZ"; 
const numPage = 15; // Número de imágenes a cargar por página
let currentPage = 1; // Página actual, empieza desde la 1

const imagenes = document.querySelector(".images"); 
// Contenedor donde se mostrarán las imágenes

// tomaremos el boton para cargar mas imagenes
const botonVerMas = document.querySelector(".load-more");

// tomaremos el input para buscar
const buscarInput = document.querySelector(".input");

// Función para generar las imágenes dinámicamente en el DOM
const generateImages = (images) => {
  imagenes.innerHTML += images.map(image => 
    `<li class="list">
      <img src="${image.src.large2x}" alt="Image by
      ${image.photographer}">
      <!-- 'image.src.large2x': URL de la imagen en alta calidad
       que se obtiene de la API -->
      <div class="container-details">
        <div class="details">
           <i class="fas fa-camera"></i> 
          <span>${image.photographer}</span>
          <!-- 'image.photographer': Nombre del fotógrafo,
           también proporcionado por la API -->
        </div>
        <button> <i class="fa-solid fa-download"></i>  </button>
      </div>
    </li>`
  ).join("");
};

// Función para solicitar imágenes desde la API de Pexels
const SolicitarImagenes = (url) => {
    botonVerMas.innerText = 'Cargando...'; 
    botonVerMas.classList.add("disabled"); 
    // Cambia el botón a estado de cargando
  fetch(url, {
    headers: { Authorization: apiKey } 
    // 'Authorization': Header requerido por la API 
    // para autenticar la solicitud
  })
  .then(res => res.json()) // Convierte la respuesta en formato JSON
  .then(data => {
    console.log(data); // Verifica la respuesta de la API en la consola
    generateImages(data.photos); // Envía las imágenes recibidas a 
    // la función 'generateImages'
    botonVerMas.innerText = 'Ver más'; // Cambia el texto del botón 
    // cuando termina de cargar
    botonVerMas.classList.remove("disabled"); // Habilita el botón nuevamente
  })
  .catch(err => console.error("Error fetching images:", err)); // Manejo de errores
};

// Llamada inicial para obtener imágenes cuando se carga la página
SolicitarImagenes(`https://api.pexels.com/v1/curated?page=
${currentPage}&per_page=${numPage}`);
// 'currentPage' y 'numPage' determinan qué página y cuántas 
// imágenes cargar por solicitud

//Evento para el boton load-more
botonVerMas.addEventListener('click', ()=> {
    currentPage++; // Incrementa el número de página cada vez 
    // que se hace clic en "Ver más"
    let apiURL = `https://api.pexels.com/v1/curated?page=
    ${currentPage}&per_page=${numPage}`; 
    // Construye la URL para solicitar la siguiente página 
    // de imágenes
    SolicitarImagenes(apiURL); // Solicita más imágenes con 
    // la nueva URL
}); 

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
    valueSearch = e.target.value; // Obtiene el valor del input (texto 
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
