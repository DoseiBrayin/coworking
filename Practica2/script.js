var form = document.querySelector("#formAstroneas");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const cedula = document.querySelector("#cedula").value;
    const nombre = document.querySelector("#nombre").value;
    const edad = document.querySelector("#edad").value;

    if (edad >= 18) {
        var astroNea = {
            "id": cedula,
            "nombre": nombre,
            "edad": edad
        }
        Object.keys(localStorage).forEach(key => {
            if (key == cedula) {
                alert("Ya existe una persona con esa cédula");
            } else{
                localStorage.setItem(astroNea.id, JSON.stringify(astroNea));   
        }})
        localStorage.setItem(astroNea.id, JSON.stringify(astroNea));
    }else{
        alert("No se puede registrar a una persona menor de edad");
    }
    location.reload();
})

// Después de guardar el objeto JSON en el localStorage
var tabla = document.getElementById("tablaAstroneas");
var fila = tabla.insertRow();

Object.keys(localStorage).forEach(key => {
    var astroNea = JSON.parse(localStorage.getItem(key))
    var celdaId = fila.insertCell();
    celdaId.textContent = astroNea.id;
    var celdaNombre = fila.insertCell();
    celdaNombre.textContent = astroNea.nombre;
    var celdaEdad = fila.insertCell();
    celdaEdad.textContent = astroNea.edad;
    var celdaEliminar = fila.insertCell();
    var botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.id = "botonEliminar";
    celdaEliminar.appendChild(botonEliminar);
    fila = tabla.insertRow();
});

var btnEliminar = document.querySelector("#botonEliminar");

btnEliminar.addEventListener("click", function (e) {
    e.preventDefault();
    var idFila = btnEliminar.parentElement.parentElement.cells[0].textContent;
    localStorage.removeItem(idFila);
    location.reload();
})

