const API_URL = "http://localhost:3002/characters";

async function buscarPersonaje() {
    const name = document.getElementById("searchInput").value;
    if (!name) {
        alert("Por favor ingresa un nombre");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${name}`);
        const data = await response.json();

        if (response.ok) {
            mostrarPersonaje(data);
        } else {
            document.getElementById("characterInfo").innerHTML = `<p>${data.error}</p>`;
        }
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

function mostrarPersonaje(personaje) {
    const infoDiv = document.getElementById("characterInfo");
    infoDiv.innerHTML = `
        <h2>${personaje.name}</h2>
        <p>Status: ${personaje.status}</p>
        <p>Species: ${personaje.species}</p>
        <p>Gender: ${personaje.gender}</p>
        <p>Origin: ${personaje.origin.name}</p>
        <img src="${personaje.image}" alt="${personaje.name}">
    `;
}
