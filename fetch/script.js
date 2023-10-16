const ppal = () => fetching((error) => {
    const errorElement = document.createElement("h1")
    errorElement.textContent = JSON.stringify(error.message)
    document.body.appendChild(errorElement)
})

const fetching = (callback) => {
    axios.get('https://jsonplaceholder.typicode.com/comments')
    .then(response => {
        imprimir(response.data)
    })
    .catch((error) => callback(error))
}

const imprimir = (data) => {
    lista.innerHTML = ''
    data.map((element) => {
        lista.innerHTML += `
            <li>
             ${element.name}
            </li>  `
    });
    return data  
}

ppal()

const lista = document.querySelector('#lista')


