/* clase mascota */
class Mascota {
    constructor(nombre, especie, edad, precio, imagen) {
        this.nombre = nombre;
        this.especie = especie;
        this.edad = edad;
        this.precio = precio;
        this.imagen = imagen;
    }

    mostrarInfo() {
        return `${this.nombre} es un ${this.especie} de ${this.edad} años y cuesta $${this.precio}.`;
    }
}

/* Mascotas iniciales en un arreglo */
let mascotas = [
    new Mascota(
        "Sultan",
        "Perro",
        3,
        2000,
        "https://encrypted-tbn0.https://upload.wikimedia.org/https://https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSsREXUfDezSzCvaVdQ_kxxK7H5svKV4iXF30A2caQNcxx96Rwf2mtol4rBz81fdCwVVFAaasVuIBIB2r-4f0smVgencrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSsREXUfDezSzCvaVdQ_kxxK7H5svKV4iXF30A2caQNcxx96Rwf2mtol4rBz81fdCwVVFAaasVuIBIB2r-4f0smVg/commons/thumb/4/47/Cyanocitta_cristata_blue_jay.jpg/1200px-Cyanocitta_cristata_blue_jay.jpg.com/https://www.google.com/url?sa=i&url=https%3A%2F%2Fspotpetinsurance.ca%2Fblog%2Fbreed-tips%2Fhow-much-does-a-cane-corso-cost&psig=AOvVaw2YNgTeDGh41MBhmN-4QQkE&ust=1743538727009000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCNiX9oWStYwDFQAAAAAdAAAAABAE?q=tbn:ANd9GcQrKDPxU6fd7ByROGy53fNPe7updhp-7lw5Rw&s"
    ),
    new Mascota(
        "Felipe",
        "Gato",
        3,
        2000,
        "https://imgs.search.brave.com/Y5BYkeNKk_gxa-uRoXNNe2lr77uODMZHmA_LnO7ObAI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzE1LzY4LzY0/LzM2MF9GXzQxNTY4/NjQ1N19aSFZEbDVx/Z2t1MnZtejd5dk9r/NGxSdDlQS3B5Q21D/Yy5qcGc"
    ),
];

/* Clase Carrito */
class Carrito {
    constructor() {
        this.compras = JSON.parse(localStorage.getItem("carrito")) || [];
    }

    agregarMascota(mascota) {
        this.compras = JSON.parse(localStorage.getItem("carrito")) || [];
        this.compras.push(mascota);
        alert(`${mascota.nombre} agregado al carrito.`);
        localStorage.setItem("carrito", JSON.stringify(this.compras));
        this.mostrarCarrito();
    }

    mostrarCarrito() {
        /* Mostrar carrito en la UI */
        let contenedor_carrito = document.getElementById("contenedor_carrito");
        contenedor_carrito.innerHTML = "";
        let total = 0;
        let mascotas_carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        mascotas_carrito.forEach((mascota, index) => {
            let mascotaHTML = `
                <div class="col-md-4 mascota" data-especie="${mascota.especie}">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${mascota.nombre}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Edad: ${mascota.edad}</h6>
                            <p class="card-text">Precio: $${mascota.precio}</p>
                            <img
                                src="${mascota.imagen}"
                                class="card-img-top"
                                alt="${mascota.especie}"
                                style="width: 100px; height: 100px"
                            />
                            <button class="btn btn-danger btn-sm float-end" onclick="eliminarMascota(${index})">Eliminar</button>
                        </div>
                    </div>
                </div>`;
            total += parseInt(mascota.precio);
            contenedor_carrito.innerHTML += mascotaHTML;
        });
        contenedor_carrito.innerHTML += `<div class="card text-center">Total: $${total}</div>`;
    }
}

function eliminarMascota(index) {
    let mascotas_carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    mascotas_carrito.splice(index, 1); // Eliminar mascota seleccionada
    localStorage.setItem("carrito", JSON.stringify(mascotas_carrito));
    carrito.mostrarCarrito();
}

/* Crear carrito */
const carrito = new Carrito();

/* Agregar mascota al carrito de compras. Se invoca por evento del botón "Comprar" de cada mascota */
function comprarMascota(index) {
    carrito.agregarMascota(mascotas[index]);
}

/* Mostrar todas las mascotas del arreglo "mascotas" */
function mostrarMascotas(mascotas) {
    let contenedor = document.getElementById("contenedor_mascotas");
    contenedor.innerHTML = ""; // Limpiar antes de mostrar
    mascotas.forEach((mascota, index) => {
        contenedor.innerHTML += `
            <div class="card m-2" style="width: 18rem;">
                <div class="card-body">
                    <img
                        src="${mascota.imagen}"
                        class="card-img-top"
                        alt="${mascota.especie}"
                        style="width: 100px; height: 100px"
                    />
                    <h5 class="card-title">${mascota.nombre}</h5>
                    <p class="card-text">${mascota.mostrarInfo()}</p>
                    <button class="btn btn-primary" onclick="comprarMascota(${index})">
                        <i class="bi bi-credit-card"></i> Comprar
                    </button>
                </div>
            </div>`;
    });
}

/* Función que se ejecuta al enviar (submit) el formulario */
function submit_formulario(event) {
    event.preventDefault();
    let nombre = document.getElementById("nombre").value.trim();
    let especie = document.getElementById("especie").value.trim();
    let edad = document.getElementById("edad").value.trim();
    let precio = document.getElementById("precio").value.trim();
    let imagen = document.getElementById("imagen").value.trim();

    if (nombre && especie && edad && precio && imagen) {
        let mascotaNueva = new Mascota(nombre, especie, edad, precio, imagen);
        mascotas.push(mascotaNueva);
        mostrarMascotas(mascotas); // Actualiza las tarjetas en pantalla
        document.getElementById("formMascota").reset(); // Limpia el formulario
    } else {
        alert("Por favor, completa todos los campos del formulario.");
    }
    return false;
}

/* Función llamada por escuchador inicial */
function inicio() {
    mostrarMascotas(mascotas);
    document.getElementById("formMascota").addEventListener("submit", submit_formulario);
    carrito.mostrarCarrito();
}

/* Escuchador de eventos inicial al detectar carga de la página */
document.addEventListener("DOMContentLoaded", inicio);