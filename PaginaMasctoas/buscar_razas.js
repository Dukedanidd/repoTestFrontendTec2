document.addEventListener("DOMContentLoaded", async function() {
    const selectRaza = document.getElementById("selectRaza")
    const detalleRaza = document.getElementById("detalleRaza")
    const razaNombre = document.getElementById("razaNombre")
    const razaTemperamento = document.getElementById("razaTemperamento")
    const razaAltura = document.getElementById("razaAltura")
    const razaPeso = document.getElementById("razaPeso")
    const razaImagen = document.getElementById("razaImagen")
    const razaOrigen = document.getElementById("razaOrigen")
    const razaGrupo = document.getElementById("razaGrupo")
    const razaVida = document.getElementById("razaVida")
    const razaCriadoPara = document.getElementById("razaCriadoPara")
    const razaCategoriaPeso = document.getElementById("razaCategoriaPeso")
    const pesoSlider = document.getElementById("pesoSlider")
    const pesoTexto = document.getElementById("pesoTexto")
        // Obtener datos de la API 1️⃣
    async function cargarRazas() {
        try {
            const response = await fetch("https://api.thedogapi.com/v1/breeds")
            const razas = await response.json()
                // Limpiar el select y agregar opciones
            selectRaza.innerHTML = '<option value="">Selecciona una raza</option>'
            razas.forEach(raza => {
                    let option = document.createElement("option")
                    option.value = raza.id
                    option.textContent = raza.name
                    selectRaza.appendChild(option)
                })
                // Evento cuando el usuario selecciona una raza
            selectRaza.addEventListener("change", function() {
                let selectedRaza = razas.find(raza => raza.id == selectRaza.value)
                if (selectedRaza) {
                    mostrarDetalles(selectedRaza)
                } else {
                    detalleRaza.classList.add("d-none")
                }
            })
        } catch (error) {
            console.error("Error cargando razas:", error)
            selectRaza.innerHTML = '<option value="">Error cargando razas</option>'
        }
    }
    // Mostrar los detalles de la raza seleccionada 2️⃣
    function mostrarDetalles(raza) {
        razaNombre.textContent = raza.name
        razaTemperamento.textContent = raza.temperament || "No disponible"
        razaAltura.textContent = raza.height.metric
        razaPeso.textContent = raza.weight.metric
        
        // Nuevos campos
        razaOrigen.textContent = raza.origin || "No disponible"
        razaGrupo.textContent = raza.breed_group || "No disponible"
        razaVida.textContent = raza.life_span || "No disponible"
        razaCriadoPara.textContent = raza.bred_for || "No disponible"
        
        // Determinar categoría de peso y actualizar el slider
        const pesosStr = raza.weight.metric;
        const pesos = pesosStr.split('-').map(p => parseFloat(p.trim()));
        const pesoPromedio = (pesos[0] + pesos[1]) / 2;
        
        let categoria;
        if (pesoPromedio <= 10) {
            categoria = "Perro pequeño";
        } else if (pesoPromedio <= 25) {
            categoria = "Perro mediano";
        } else if (pesoPromedio <= 50) {
            categoria = "Perro grande";
        } else {
            categoria = "Perro gigante";
        }
        
        razaCategoriaPeso.textContent = categoria;
        
        // Actualizar el slider y el texto del peso
        pesoSlider.value = pesoPromedio;
        pesoTexto.textContent = `Peso: ${pesoPromedio} kg (${categoria})`;

        razaImagen.src = raza.reference_image_id ?
            `https://cdn2.thedogapi.com/images/${raza.reference_image_id}.jpg` :
            "../images/perro1.jpg" // Imagen por defecto si no hay
        detalleRaza.classList.remove("d-none")
    }
    // Cargar las razas al iniciar la página
    cargarRazas()
})