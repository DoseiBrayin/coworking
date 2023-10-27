const seccionFormulario = document.querySelector('#secForm');
const inputID = document.querySelector("#id");
const inputNombre = document.querySelector("#nombre");
const inputUsername = document.querySelector("#username");
const inputWebsite = document.querySelector("#website");
const form = document.querySelector('#form');   

const fetchUsuarios = async () =>{
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    montarUsuarios(data);
    guardarUsuarioLocalStorage(data);
}

const montarUsuarios = (usuarios) =>{
    const tbody = document.querySelector('#tblUsuarios tbody');
    tbody.innerHTML = '';
    usuarios.map((usuario) =>{
        const fila = document.createElement('tr');
        fila.id = usuario.id;
        fila.innerHTML = `
        <td data-id =${usuario.id}>${usuario.id}</td>
        <td data-name =${usuario.name}>${usuario.name}</td>
        <td data-username =${usuario.username}>${usuario.username}</td>
        <td data-website =${usuario.website}>${usuario.website}</td>
        <td><button onclick=eliminar(${usuario.id})>Eliminar</button></td>
        <td><button onclick=editar(${usuario.id})>Editar</button></td>
        `;
        tbody.appendChild(fila);
    })
}

const guardarUsuarioLocalStorage = (usuarios) =>{
    usuarios.map(usuario => {
        localStorage.setItem(usuario.id, JSON.stringify(usuario));
    })
}

const eliminar = (id) =>{
    const fila = document.querySelector(`#tblUsuarios tbody tr[id="${id}"]`);
    console.log(fila);
    fila.remove();
    localStorage.removeItem(id);
}

const editar = (id) =>{
    const usuario = JSON.parse(localStorage.getItem(id));
    seccionFormulario.style.display = 'block'; // <seccionFormulario style="display: block">
    inputID.value = usuario.id;
    inputNombre.value = usuario.name;
    inputUsername.value = usuario.username;
    inputWebsite.value = usuario.website;
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const usuario = {
        id: inputID.value,
        name: inputNombre.value,
        username: inputUsername.value,
        website: inputWebsite.value
    }
    const fila = document.querySelector(`#tblUsuarios tbody tr[id="${usuario.id}"]`);
    if(fila){
        fila.querySelector('td[data-name]').textContent = usuario.name;
        fila.querySelector('td[data-username]').textContent = usuario.username;
        fila.querySelector('td[data-website]').textContent = usuario.website;
    }else{
        montarUsuarios([usuario])
    }
    seccionFormulario.style.display = 'none';
})

btnRefrescar = () =>{
    fetchUsuarios();
}

fetchUsuarios();