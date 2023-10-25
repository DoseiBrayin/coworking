const btnRefrescar = document.querySelector('#btnRefrescar');
const tblUsuarios = document.querySelector('#tblUsuarios');
const seccionFormulario = document.querySelector('#secForm');
const inputId = document.querySelector('#id');
const inputName = document.querySelector('#name');
const inputUserName = document.querySelector('#username');
const inputWbsite = document.querySelector('#website');
const form = document.querySelector('#form');

const fetchUsuarios = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        mostrarUsuarios(data);
        guardarUsuariosLocalStorage(data);
    } catch (error) {
        console.log(error);
    }
}

const mostrarUsuarios = (data) => {
    const tbody = tblUsuarios.querySelector('tbody');
    tbody.innerHTML = '';
    data.map(usuario => {
        const fila = document.createElement('tr');
        fila.id = usuario.id;
        fila.innerHTML = `
            <td>${usuario.id}</td>
            <td data-nombre="${usuario.name}">${usuario.name}</td>
            <td data-nombre-usuario="${usuario.username}">${usuario.username}</td>
            <td data-website="${usuario.website}">${usuario.website}</td>
            <td><button class="btnEliminar" onclick="eliminarUsuario(${usuario.id})">Eliminar</button></td>
            <td><button class="btnEditar" onclick="editarUsuario(${usuario.id})">Editar</button></td>
        `;
        tbody.appendChild(fila);
    });
}

const guardarUsuariosLocalStorage = (data) => {
    data.forEach(usuario => {
        localStorage.setItem(usuario.id, JSON.stringify(usuario));
    });
}

const editarUsuario = (id) => {
    const usuario = JSON.parse(localStorage.getItem(id));
    seccionFormulario.style.display = 'block';
    inputId.value = usuario.id;
    inputName.value = usuario.name;
    inputUserName.value = usuario.username;
    inputWbsite.value = usuario.website;
}

const eliminarUsuario = (id) => {
    const fila = document.querySelector(`#tblUsuarios tbody tr[id="${id}"]`);
    if (fila) {
        fila.remove();
        localStorage.removeItem(id);
    }
}

btnRefrescar.onclick = () => {
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