// Función que activa el overlay. Se pasa como parámetro el contenedor padre (#vintalight en el DOM)
function activeVintalight(container) {
  // Delegación de eventos para detectar click en los hijos
  container.addEventListener("click", function (e) {
    var element = e.target;
    // Validar que se haya dado click en el pseudoelemento before
    if (element.tagName == "DIV") {
      // Obtener dirección y descripción de la imagen que se dio click
      var src = element.querySelector("img").src;
      var descrip = element.querySelector("img").alt;
      // Crear un nuevo div que se usará como overlay
      var vintalightOverlay = document.createElement("div");
      // Agregar clase al div que creamos para poder darle estilos con CSS
      vintalightOverlay.classList.add("vintalight-overlay");
      // Agregar contenido al overlay
      vintalightOverlay.innerHTML = `
                <figure class="vintalight__container active">
                    <div class="vintalight__photo">
                        <img src="${src}" alt="${descrip}" class="vintalight__img"/>
                    </div>
                    <figcaption class="vintalight__caption">
                        <h3 class="vintalight__text">${descrip}</h3>
                    </figcaption>
                    <button class="vintalight__button" id="button-close">✕</button>
                </figure>
            `;
      // Meter el overlay en el DOM
      document.body.appendChild(vintalightOverlay);
      // Añadimos la clase active para poder darle transición
      setTimeout(function () {
        vintalightOverlay.classList.add("active");
      }, 1);
      // Eliminar el scroll del body
      document.body.style.overflow = "hidden";
      // Evento para cerrar el overlay
      document
        .getElementById("button-close")
        .addEventListener("click", function () {
          // Eliminar clase active
          vintalightOverlay.classList.remove("active");
          // Eliminar overlay del DOM
          setTimeout(function () {
            document.body.removeChild(vintalightOverlay);
          }, 500);
          // Devolver scroll al body
          document.body.style.overflow = "auto";
        });
      // Evento para cerrar el overlay con la tecla ESC
      window.addEventListener("keyup", function (e) {
        if (e.key === "Escape") document.getElementById("button-close").click();
      });
    }
  });
}

// Activamos la función después de que se cargue la página
window.addEventListener("load", function () {
  activeVintalight(document.getElementById("vintalight"));
});

function validateForm() {
  let nombre = document.querySelector('input[name="nombre"]').value.trim();
  let email = document.querySelector('input[name="email"]').value.trim();
  let telefono = document.querySelector('input[name="telefono"]').value.trim();
  let tipoEvento = document.getElementById("tipo").value;
  let fechaEvento = document.getElementById("fechaEvento").value;
  let mensaje = document.querySelector('textarea[name="mensaje"]').value.trim();
  let politicaPrivacidad = document.querySelector(
    'input[type="checkbox"]'
  ).checked;

  // Valida nombre
  if (nombre === "") {
    alert("Por favor, ingrese su nombre");
    return false;
  }

  // Valida email
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Por favor, ingrese un correo electrónico válido");
    return false;
  }

  // Valida teléfono
  let telefonoPattern = /^\d{10}$/;
  if (!telefonoPattern.test(telefono)) {
    alert("El número de teléfono debe contener 10 dígitos numéricos");
    return false;
  }

  // Valida tipo de evento
  if (tipoEvento === "") {
    alert("Por favor, seleccione el tipo de evento");
    return false;
  }

  //Validaciones en Fecha Evento
  // Valida fecha de evento
  if (fechaEvento === "") {
    alert("Por favor, seleccione la fecha del evento");
    return false;
  }

  // Expresión regular para validar el formato DD-MM-YYYYY
  let fechaPattern = /^\d{4}-\d{2}-\d{2}$/;

  if (!fechaPattern.test(fechaEvento)) {
    alert("Por favor, ingrese una fecha valida. Formato DD/MM/YYYY");
    return false;
  }

  // Verifica que la fecha sea válida
  let partesFecha = fechaEvento.split("-");
  let anio = parseInt(partesFecha[0]);
  let mes = parseInt(partesFecha[1]);
  let dia = parseInt(partesFecha[2]);

  if (isNaN(dia) || isNaN(mes) || isNaN(anio)) {
    alert("Por favor, ingrese una fecha válida");
    return false;
  }

  // Verifica el rango de los valores
  if (dia < 1 || dia > 31 || mes < 1 || mes > 12) {
    alert("Por favor, ingrese una fecha válida");
    return false;
  }

  // Verificar febrero y los días de los meses
  if ((mes === 4 || mes === 6 || mes === 9 || mes === 11) && dia > 30) {
    alert("Por favor, ingrese una fecha válida");
    return false;
  }

  if (mes === 2) {
    // Año bisiesto: febrero tiene 29 días
    let diasFebrero =
      anio % 4 === 0 && (anio % 100 !== 0 || anio % 400 === 0) ? 29 : 28;
    if (dia > diasFebrero) {
      alert("Por favor, ingrese una fecha válida");
      return false;
    }
  }

  // Verifica si la fecha es mayor a la fecha del sistema
  const currentDate = new Date();
  const inputDate = new Date(anio, mes - 1, dia); // Meses en JavaScript van de 0 a 11

  if (inputDate <= currentDate) {
    alert("La fecha del evento debe ser mayor a la fecha actual");
    return false;
  }

  // Si pasa todas las validaciones, la fecha es válida

  // Valida mensaje
  if (mensaje === "") {
    alert("Por favor, ingrese un mensaje");
    return false;
  }

  // Valida política de privacidad
  if (!politicaPrivacidad) {
    alert("Por favor, acepte la política de privacidad");
    return false;
  }

  const imageInput = document.getElementById("imageInput");
  const file = imageInput.files[0];

  if (!file) {
    alert("Por favor seleccione un archivo.");
    event.preventDefault();
    return false;
  }

  const validExtensions = ["jpg", "jpeg", "png"];
  const fileExtension = file.name.split(".").pop().toLowerCase();

  if (!validExtensions.includes(fileExtension)) {
    alert("Por favor seleccione una imagen en formato JPG o PNG.");
    event.preventDefault();
    return false;
  }

  // Si todas las validaciones pasan, enviar el formulario
  return true;
}

// Función para cargar los tipos de eventos desde la API
async function cargarTiposEventos() {
  const response = await fetch("http://localhost:3000/api/obtenerTipoEvento");
  const data = await response.json();

  const selectTipo = document.getElementById("tipo");

  data.forEach((tipo) => {
    const option = document.createElement("option");
    option.value = tipo.id;
    option.textContent = tipo.nombre;
    selectTipo.appendChild(option);
  });
}

cargarTiposEventos();
