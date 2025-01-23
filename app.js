// Cada linea de código tiene un comentario explicativo 
// para que puedas comprender que se hizo en cada paso
// Le añadi mi apikey
const apiKey = "563492ad6f91700001000001127bf65f5a814751bc581cf6d151ef3f"; 
const numPage = 20; // Número de imágenes a cargar por página
let currentPage = 1; // Página actual, empieza desde la 1
let loadedImageIds = new Set(); // Set para almacenar los IDs de las imágenes cargadas
let valueSearch = null; // Variable para almacenar el valor ingresado en el input de búsqueda
let debug = false;

const imagenes = document.querySelector(".images"); 
// Contenedor donde se mostrarán las imágenes

const template = document.querySelector("#image-items");

// PROXIMO LIVE ---------------------------------------
// Selección del botón para cargar más imágenes
const botonVerMas = document.querySelector(".load-more");

// Selección del input para búsqueda
const buscarInput = document.querySelector(".input");
//-----------------------------------------------------

// Función para generar las imágenes dinámicamente en el DOM
/** 
 * Contiene el mismo problema que la versión de @Ceciliapradob
 * algunas de las imagenes se repiten, es tema de Pexels,
 * lo inspeccione con postman y pasa lo mismo
*/
const generateImages = (images) => {
	// Iteramos sobre cada imagen en el array
	images.forEach((image) => {
		// Desestructuramos
		const { id, src: { large, large2x }, photographer } = image;
		// Verifica si la imagen ya fue cargada y evita repetirla
    	if (!loadedImageIds.has(id)) {
	    	// Agrega el ID al Set
	    	loadedImageIds.add(id);
			// Clonamos el contenido del template
			const clone = template.content.cloneNode(true);
			// Modificamos el contenido del clon
			const img = clone.querySelector('img');
			const span = clone.querySelector('span');
			img.src = large; // Usamos la propiedad correcta (con large es más rápido)
			img.alt = `Image by ${photographer}`;
			span.textContent = photographer;
			// Añadimos el clon al DOM
			imagenes.append(clone);
		}
	});
};

// Función para solicitar imágenes desde la API de Pexels
const SolicitarImagenes = async (page, per_page, q = '') => {
	const query = q ? `search?query=${q}&` : 'curated?';
	const apiUrl = `https://api.pexels.com/v1/${query}page=${page}&per_page=${per_page}`;
	// Mostramos el API URL solo si debug es true
	if(!debug) console.log(apiUrl)
	// 'Authorization': Header requerido por la API para autenticar la solicitud
	const headers = { Authorization: apiKey } 
  	
  	try {
  		const response = await fetch(apiUrl, { headers });
  		// Verificamos si la respuesta es exitosa
    	if (!response.ok) {
      	console.error(`Error: ${response.status} - ${response.statusText}`);
    	}
    	// Convertimos la respuesta en JSON
  		const data = await response.json();
	  	// Verifica la respuesta de la API en la consola
  		if(debug) console.log(data);
  		// Envía las imágenes recibidas a la función para mostrarlas
  		generateImages(data.photos);
  	} catch(err) {
  		// statements
  		console.error("Error fetching images:", err); // Manejo de errores
  	}
};

// Llamada inicial para obtener imágenes cuando se carga la página
SolicitarImagenes(currentPage, numPage);
// 'currentPage' y 'numPage' determinan qué página y cuántas imágenes cargar por solicitud

// Evento para el botón "Ver más"
botonVerMas.addEventListener('click', () => {
	currentPage++; // Incrementa el número de página
	SolicitarImagenes(currentPage, numPage); // Solicita más imágenes con la nueva página
});

// Evento para detectar cuando se presiona una tecla en el input
buscarInput.addEventListener('keyup', (event) => {
	// Desestructuramos
	const { key, code, target: { value } } = event;
	// KEYUP 
	// se dispara cuando se suelta una tecla después de haberla presionado. Es un evento del teclado que permite capturar la acción de soltar la tecla en un campo de entrada o en cualquier elemento que pueda recibir eventos de teclado.

	// Evento que escucha cuando se presiona una tecla en el input
	// event = representa el objeto del evento que el navegador 
	// envía automáticamente a la función del manejador.
	if(debug) console.log(event)
	if (key === 'Enter' && code === 'Enter') {
		// Verifica si la tecla presionada es "Enter"
		if(debug) console.log('Enter key pressed'); // Muestra un mensaje en la consola
		currentPage = 1; // Resetea la página
		loadedImageIds.clear(); // Limpia el Set de IDs cargados
		imagenes.innerHTML = ""; // Limpia el contenedor de imágenes
		SolicitarImagenes(currentPage, numPage, value);
		// Construye la URL para buscar imágenes según el término ingresado
  	}
});