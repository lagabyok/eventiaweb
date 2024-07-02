function validateForm() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let celular = document.getElementById("celular").value;
  let message = document.getElementById("message").value;

  // Valido que el nombre tenga más de 3 letras y no contenga números ni caracteres especiales
  let namePattern = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]{3,}$/;
  if (!namePattern.test(name)) {
    alert(
      "El nombre debe tener más de 3 letras y no debe contener números ni caracteres especiales"
    );
    return false;
  }

  // Valido formato de email
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    console.log("entre");
    alert("Por favor, ingrese un correo electrónico válido");
    return false;
  }

  // Valido que el celular contenga solo números y tenga 10 dígitos
  let celularPattern = /^\d{10}$/;
  if (!celularPattern.test(celular)) {
    alert("El número de celular debe contener solo números y tener 10 dígitos");
    return false;
  }

  if (message === "") {
    alert("Por favor, complete todos los campos");
    return false;
  } else {
    console.log("enviar");
    document.getElementById("form").submit();
  }
}
