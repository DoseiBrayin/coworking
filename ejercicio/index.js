const btnRefrescar = document.querySelector('#btnRefrescar');
const tblUsuarios = document.querySelector('#tblUsuarios');
const seccionFormulario = document.querySelector('#secForm');
const inputId = document.querySelector('#id');
const inputName = document.querySelector('#name');
const inputUserName = document.querySelector('#username');
const inputWbsite = document.querySelector('#website');
const form = document.querySelector('#form');

const fetchUsuarios = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => { mostrarUsuarios(data) })
        .catch(error => console.log(error))
        .finally(() => guardarUsuariosLocalStorage())
}

const mostrarUsuarios = (data) => {
    const tbody = tblUsuarios.querySelector('tbody');
    data.forEach(usuario => {
        let fila = tbody.insertRow();
        fila.id = usuario.id;
        const celdaId = fila.insertCell();
        celdaId.textContent = usuario.id;
        celdaId.dataset.id = usuario.id;

        const celdaNombre = fila.insertCell();
        celdaNombre.textContent = usuario.name;
        celdaNombre.dataset.nombre = usuario.name;

        const celdaNombreUsuario = fila.insertCell();
        celdaNombreUsuario.textContent = usuario.username;
        celdaNombreUsuario.dataset.nombreUsuario = usuario.username;

        const celdaWebSite = fila.insertCell();
        celdaWebSite.textContent = usuario.website;
        celdaWebSite.dataset.website = usuario.website;


        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.className = 'btnEliminar';
        btnEliminar.onclick = () => eliminarUsuario(usuario)
        
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.className = 'btnEditar';
        btnEditar.onclick = () => editarUsuario(usuario);

        fila.insertCell().append(btnEliminar);
        fila.insertCell().append(btnEditar);

        guardarUsuariosLocalStorage(fila);
    });
}

form

const guardarUsuariosLocalStorage = (usuario) => {
    localStorage.setItem(usuario.id, JSON.stringify(usuario));
}

const editarUsuario = (usuario) => {
    seccionFormulario.style.display = 'block';
    inputId.value = usuario.id;
    inputName.value = usuario.name;
    inputUserName.value = usuario.username;
    inputWbsite.value = usuario.website;
}

const eliminarUsuario = (usuario) => {
    const fila = document.querySelector(`#tblUsuarios tbody tr[id="${usuario.id}"]`);
    if (fila) {
        fila.remove();
        localStorage.removeItem(usuario.id);
    }
}

btnRefrescar.onclick = () => {
    const tbody = tblUsuarios.querySelector('tbody');
    tbody.innerHTML = '';
    fetchUsuarios();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const usuario = {
        id: inputId.value,
        name: inputName.value,
        username: inputUserName.value,
        website: inputWbsite.value
    }
    const fila = document.querySelector(`#tblUsuarios tbody tr[id="${usuario.id}"]`);
    if (fila) {
        fila.querySelector('td[data-nombre]').textContent = usuario.name;
        fila.querySelector('td[data-nombre-usuario]').textContent = usuario.username;
        fila.querySelector('td[data-website]').textContent = usuario.website;
    } else {
        mostrarUsuarios([usuario]);
    }
    seccionFormulario.style.display = 'none';
});

fetchUsuarios();

