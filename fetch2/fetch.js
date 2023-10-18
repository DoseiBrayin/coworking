const container = document.querySelector("#container");
const numeralComments = document.querySelector("#numeral-comments");
const img = document.createElement("img");
img.src = "./public/images/loading-gif.webp";
img.id = "loading-gif";

const btnFetch = () => {
    container.appendChild(img);
    setTimeout(traerDatos, 1000);
}

const traerDatos = () => {
    fetch('https://jsonplaceholder.typicode.com/comments')
        .then(data => data.json())
        .then(data => mostrarComments(data))
        .catch((error) => {
            alert("Error al traer los datos");
            console.error(error);
        })
        .finally(container.removeChild(img))
}

const mostrarComments = (data) => {
    data.forEach(comment => {
        numeralComments.appendChild(document.createElement("li")).textContent = comment.body;
    });
};




