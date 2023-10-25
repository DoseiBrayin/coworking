var a = [{ nombre: "Castlevania", calificacion: 10, genero: "Ficcion" },
{ nombre: "SuperBigote", calificacion: 9, genero: "Comedia" },
{ nombre: "Pablo Escobar", calificacion: 8, genero: "Drama" },
{ nombre: "Dark", calificacion: 10, genero: "Ficcion" }]

var b = a.copyWithin(); // Copia el arreglo

a.filter((x) => x.genero == "Ficcion").map(Element => console.log(Element)); // Filtra los elementos que cumplan con la condicion
