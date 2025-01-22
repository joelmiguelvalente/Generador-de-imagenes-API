// Cada linea de código tiene un comentario explicativo 
// para que puedas comprender que se hizo en cada paso

const apiKey = "f5w0AqiyhPbskiSXtzTQVtyR8d1NGMzkcYW4K5ujeKKrps2mOTJGJwqZ"; 
const numPage = 20; // Número de imágenes a cargar por página
let currentPage = 1; // Página actual, empieza desde la 1

const imagenes = document.querySelector(".images"); 
// Contenedor donde se mostrarán las imágenes

// PROXIMO LIVE ---------------------------------------
// Selección del botón para cargar más imágenes
const botonVerMas = document.querySelector(".load-more");

// Selección del input para búsqueda
const buscarInput = document.querySelector(".input");
//-----------------------------------------------------

// Función para generar las imágenes dinámicamente en el DOM
const generateImages = (images) => {
  imagenes.innerHTML += images.map(image => 
    `<li class="list">
      <img src="${image.src.large2x}" alt="Image by ${image.photographer}">
      <!-- 'image.src.large2x': URL de la imagen en alta calidad -->
      <div class="container-details">
        <div class="details">
          <i class="fas fa-camera"></i> 
          <span>${image.photographer}</span>
          <!-- 'image.photographer': Nombre del fotógrafo -->
        </div>
        <button> 
          <i class="fa-solid fa-download"></i>  
        </button>
      </div>
    </li>`
  ).join(""); // Convierte el array en una cadena para añadir al HTML
};

// Función para solicitar imágenes desde la API de Pexels
const SolicitarImagenes = (url) => {
  fetch(url, {
    headers: { Authorization: apiKey } 
    // 'Authorization': Header requerido por la API para autenticar la solicitud
  })
  .then(res => res.json()) // Convierte la respuesta en un objeto JSON
  .then(data => {
    console.log(data); // Verifica la respuesta de la API en la consola
    generateImages(data.photos); // Envía las imágenes recibidas a la función para mostrarlas
  })
  .catch(err => console.error("Error fetching images:", err)); // Manejo de errores
};

// Llamada inicial para obtener imágenes cuando se carga la página
SolicitarImagenes(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${numPage}`);
// 'currentPage' y 'numPage' determinan qué página y cuántas imágenes cargar por solicitud

// Evento para el botón "Ver más"
botonVerMas.addEventListener('click', () => {
  currentPage++; // Incrementa el número de página
  let apiURL = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${numPage}`;
  SolicitarImagenes(apiURL); // Solicita más imágenes con la nueva página
});

// Variable para almacenar el valor ingresado en el input de búsqueda
let valueSearch = null; 

// Evento para detectar cuando se presiona una tecla en el input
buscarInput.addEventListener('keyup', (e) => {

  // KEYUP 
  // se dispara cuando se suelta una tecla después de haberla presionado. Es un evento del teclado que permite capturar la acción de soltar la tecla en un campo de entrada o en cualquier elemento que pueda recibir eventos de teclado.

  // Evento que escucha cuando se presiona una tecla en el input
  // e = representa el objeto del evento que el navegador 
  // envía automáticamente a la función del manejador.


  if (e.key === 'Enter') {
    // Verifica si la tecla presionada es "Enter"
    console.log('Enter key pressed'); // Muestra un mensaje en la consola
    currentPage = 1; // Reinicia la página actual a la 1 para una nueva búsqueda
    valueSearch = e.target.value; // Obtiene el valor del input
    imagenes.innerHTML = ""; // Limpia el contenedor de imágenes
    SolicitarImagenes(`https://api.pexels.com/v1/search?query=${valueSearch}&page=${currentPage}&per_page=${numPage}`);
    // Construye la URL para buscar imágenes según el término ingresado
  }
});
