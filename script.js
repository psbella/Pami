let medicamentos = [];

function mostrarResultados(lista) {
    const contenedor = document.getElementById('resultados');
    
    if (!lista || lista.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron medicamentos.</p>';
        return;
    }
    
    contenedor.innerHTML = lista.map(med => `
        <div class="tarjeta">
            <div class="info">
                <h3>${med.MARCA || med.marca || 'N/A'}</h3>
                <div class="droga">${med.DROGA || med.droga || ''} | ${med.PRESENTACION || med.presentacion || ''}</div>
                <div class="droga">${med.LABORATORIO || med.laboratorio || ''}</div>
                <span class="cobertura">Cobertura ${med.COBERTURA || med.cobertura || '?'}%</span>
            </div>
            <div class="precio">
                $ ${Number(med.COPAGO || med.precio || med.copago || 0).toLocaleString()}
            </div>
        </div>
    `).join('');
}

// Buscador en tiempo real
document.getElementById('buscador').addEventListener('input', (e) => {
    const texto = e.target.value.toLowerCase();
    if (!medicamentos.length) return;
    
    const filtrados = medicamentos.filter(med => {
        const droga = (med.DROGA || med.droga || '').toLowerCase();
        const marca = (med.MARCA || med.marca || '').toLowerCase();
        const lab = (med.LABORATORIO || med.laboratorio || '').toLowerCase();
        return droga.includes(texto) || marca.includes(texto) || lab.includes(texto);
    });
    mostrarResultados(filtrados);
});

// Cargar datos
fetch('medicamentos.json')
    .then(response => response.json())
    .then(data => {
        medicamentos = data;
        mostrarResultados(medicamentos);
    })
    .catch(error => {
        console.error(error);
        document.getElementById('resultados').innerHTML = '<p>Error al cargar los datos.</p>';
    });
