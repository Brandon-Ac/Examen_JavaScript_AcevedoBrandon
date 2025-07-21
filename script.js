// Recuperar eventos desde localStorage
let events = JSON.parse(localStorage.getItem('events')) || [];

// Elementos del DOM
const eventForm = document.getElementById('eventForm');
const businessForm = document.getElementById('businessForm');
const eventSelect = document.getElementById('eventSelect');
const eventList = document.getElementById('eventList');
const deleteButton = document.getElementById('Borrar');

// Guardar eventos en localStorage
function saveEvents() {
  localStorage.setItem('events', JSON.stringify(events));
}

// Mostrar todos los eventos con sus emprendimientos
function renderEvents() {
  eventList.innerHTML = '';

  const sortedEvents = [...events].sort((a, b) => new Date(a.dateInicio) - new Date(b.dateInicio));

  sortedEvents.forEach(event => {
    const div = document.createElement('div');
    div.className = 'event';

    div.innerHTML = `
      <h3>${event.name}</h3>
      <p><strong>Fechas:</strong> ${event.dateInicio} - ${event.dateFinal}</p>
      <p><strong>Horario:</strong> ${event.timeInicio} - ${event.timeFinal}</p>
      <p><strong>Lugar:</strong> ${event.location}</p>
      <p><strong>Emprendimientos:</strong></p>
      <ul>
        ${event.businesses.map(b => `
          <li>
            <strong>${b.name}</strong> - ${b.category}<br>
            <em>${b.description}</em><br>
            <a href="${b.social}" target="_blank">Red Social</a><br>
            <strong>Producto:</strong> ${b.product.name} - $${b.product.price}<br>
            ${b.product.description}<br>
            <img src="${b.product.image}" alt="Imagen de ${b.product.name}" width="100"/>
          </li>
        `).join('')}
      </ul>
    `;
    eventList.appendChild(div);
  });
}

// Llenar el <select> con los eventos disponibles
function updateEventSelect() {
  eventSelect.innerHTML = '';
  events.forEach((event, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${event.name} (${event.dateInicio})`;
    eventSelect.appendChild(option);
  });
}

// Validar si una URL es válida
function isValidURL(str) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

// Registrar evento
eventForm.addEventListener('submit', e => {
  e.preventDefault();

  // Obtener valores del formulario
  const name = document.getElementById('eventName').value.trim();
  const location = document.getElementById('eventLocation').value.trim();
  const dateInicio = document.getElementById('eventDateInicio').value;
  const dateFinal = document.getElementById('eventDateFinal').value;
  const timeInicio = document.getElementById('eventTimeInicio').value;
  const timeFinal = document.getElementById('eventTimeFinal').value;

  // Validaciones
  if (!name || !location || !dateInicio || !dateFinal || !timeInicio || !timeFinal) {
    Swal.fire("Por favor, completa todos los campos del evento.");
    return;
  }

  if (new Date(dateFinal) < new Date(dateInicio)) {
    Swal.fire("La fecha final no puede ser anterior a la fecha de inicio.");
    return;
  }

  const yearInicio = new Date(dateInicio).getFullYear();
  if (yearInicio <= 2024) {
    Swal.fire("La fecha de inicio debe ser posterior al año 2025.");
    return;
  }

  if (dateInicio === dateFinal && timeFinal <= timeInicio) {
    Swal.fire("La hora final no puede ser anterior o igual a la hora de inicio.");
    return;
  }

  // Crear evento
  events.push({
    name,
    location,
    dateInicio,
    dateFinal,
    timeInicio,
    timeFinal,
    businesses: []
  });

  // Guardar y mostrar
  saveEvents();
  updateEventSelect();
  renderEvents();
  eventForm.reset();

  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Evento registrado correctamente",
    showConfirmButton: false,
    timer: 1500
  });
});

// Registrar emprendimiento asociado a un evento
businessForm.addEventListener('submit', e => {
  e.preventDefault();

  const index = eventSelect.value;
  if (index === "") {
    Swal.fire("Selecciona un evento al cual asociar el emprendimiento.");
    return;
  }

  const name = document.getElementById('businessName').value.trim();
  const category = document.getElementById('category').value.trim();
  const description = document.getElementById('businessDescription').value.trim();
  const social = document.getElementById('socialLink').value.trim();

  const productName = document.getElementById('productName').value.trim();
  const productPrice = parseFloat(document.getElementById('productPrice').value);
  const productDescription = document.getElementById('productDescription').value.trim();
  const productImage = document.getElementById('productImage').value.trim();

  // Validaciones
  if (!name || !category || !description || !social || !productName || !productDescription || !productImage) {
    Swal.fire("Por favor, completa todos los campos del emprendimiento y su producto.");
    return;
  }

  if (!isValidURL(social)) {
    Swal.fire("El enlace a la red social no es válido.");
    return;
  }

  if (!isValidURL(productImage)) {
    Swal.fire("La URL de la imagen del producto no es válida.");
    return;
  }

  if (isNaN(productPrice) || productPrice <= 0) {
    Swal.fire("El precio del producto debe ser un número mayor a 0.");
    return;
  }

  // Crear producto y emprendimiento
  const product = {
    name: productName,
    price: productPrice.toFixed(2),
    description: productDescription,
    image: productImage
  };

  const business = { name, category, description, social, product };

  events[index].businesses.push(business);

  // Guardar y actualizar
  saveEvents();
  renderEvents();
  businessForm.reset();
});

// Borrar todos los datos
deleteButton.addEventListener('click', () => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "¡Esto eliminará todos los eventos y emprendimientos!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, borrar todo"
  }).then(result => {
    if (result.isConfirmed) {
      localStorage.removeItem('events');
      events = [];
      updateEventSelect();
      renderEvents();
      Swal.fire("Eliminado", "Todos los datos han sido borrados.", "success");
    }
  });
});

// Inicializar aplicación
updateEventSelect();
renderEvents();
