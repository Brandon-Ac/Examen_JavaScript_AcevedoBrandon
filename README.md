# 🛍️ BucaraEmprende

Aplicación web desarrollada para gestionar ferias de emprendimiento en Bucaramanga. Permite registrar eventos con su información básica y asociar emprendimientos que incluyen datos detallados de su negocio y productos.

---

## 📌 Funcionalidades principales

✅ Registrar eventos de emprendimiento  
✅ Registrar emprendimientos con datos completos  
✅ Asociar emprendimientos a eventos registrados  
✅ Visualizar todos los eventos con sus emprendimientos  
✅ Ordenar eventos por fecha de inicio  
✅ Guardar y recuperar datos usando `localStorage`  
✅ Borrar todos los datos desde la interfaz  
✅ Validaciones de formularios para evitar errores  
✅ Diseño responsive y buena experiencia de usuario (UI/UX)

---

## 🧠 Especificaciones técnicas

### Formulario para registrar eventos incluye:

- Nombre del evento  
- Lugar del evento  
- Fecha de inicio  
- Fecha de finalización  
- Hora de inicio  
- Hora de finalización

### Formulario para registrar emprendimientos incluye:

- Nombre del emprendimiento  
- Categoría  
- Descripción del emprendimiento  
- Enlace a red social  
- Producto o servicio:
  - Nombre del producto  
  - Precio  
  - Descripción  
  - URL de imagen

---

## 💾 Persistencia de datos

Los datos son almacenados en el navegador usando `localStorage`, por lo que persisten incluso si recargas la página o cierras el navegador.

---

## 📷 Vista de emprendimientos

Cada evento muestra su lista de emprendimientos registrados con:

- Nombre del negocio y categoría  
- Descripción y enlace a redes sociales  
- Información del producto (nombre, precio, descripción)  
- Imagen del producto (desde URL)

---

## ⚙️ Cómo ejecutar el proyecto

1. Clona o descarga el repositorio.
2. Abre el archivo `index.html` en tu navegador.
3. Usa los formularios para registrar eventos y emprendimientos.
4. Observa la lista ordenada de eventos y sus negocios asociados.
5. Puedes eliminar todos los datos con el botón **"Borrar LocalStorage"**.

---

## 🧪 Validaciones incluidas

- Todos los campos son obligatorios.  
- Las fechas de finalización deben ser iguales o posteriores a la fecha de inicio.  
- El precio del producto debe ser mayor a 0.  
- Las URLs deben ser válidas (enlace de red social y de imagen).

---

## 📱 Responsive Design

- Interfaz adaptada para móviles, tabletas y pantallas grandes.
- Distribución clara y accesible de formularios y resultados.
- Tipografía y botones accesibles y funcionales.

---

## 🚀 Tecnologías utilizadas

- HTML5  
- CSS3  
- JavaScript
- LocalStorage

---

## 🧑‍🎓 Autor

**Nombre completo:** Brandon Alberto Acevedo Pabon 
**Repositorio:**  https://github.com/Brandon-Ac/Examen_JavaScript_AcevedoBrandon

---

¡Gracias por revisar este proyecto! 🎉
