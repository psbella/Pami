let medicamentos = [];

function mapearMedicamento(item) {
    let cobertura = (item.E || '').replace('%', '');
    let precio = (item.F || '0').replace('$', '').replace(/\s/g, '').replace(',', '');
    
    return {
        DROGA: item.A || '',
        MARCA: item.B || '',
        PRESENTACION: item.C || '',
        LABORATORIO: item.D || '',
        COBERTURA: cobertura,
        COPAGO: parseFloat(precio) || 0
    };
}

function mostrarResultados(lista) {
    const contenedor = document.getElementById('resultados');
    const contadorDiv = document.getElementById('contador');
    
    if (!lista || lista.length === 0) {
        contenedor.innerHTML = '<div class="mensaje-inicial">🔍 No se encontraron medicamentos. Probá con otra palabra.</div>';
        contadorDiv.innerHTML = '0 resultados';
        return;
    }
    
    contadorDiv.innerHTML = `${lista.length} resultado${lista.length !== 1 ? 's' : ''}`;
    
    contenedor.innerHTML = lista.map(med => `
        <div class="tarjeta">
            <h3 class="marca-tarjeta">${med.MARCA}</h3>
            <div class="tabla-interna">
                <div class="fila-tabla">
                    <div class="celda etiqueta">Droga</div>
                    <div class="celda valor">${med.DROGA}</div>
                </div>
                <div class="fila-tabla">
                    <div class="celda etiqueta">Presentación</div>
                    <div class="celda valor">${med.PRESENTACION}</div>
                </div>
                <div class="fila-tabla">
                    <div class="celda etiqueta">Cobertura</div>
                    <div class="celda valor"><span class="cobertura-tag">${med.COBERTURA}%</span></div>
                </div>
                <div class="fila-tabla">
                    <div class="celda etiqueta">Precio final</div>
                    <div class="celda valor precio-destacado">$${med.COPAGO.toLocaleString()}</div>
                </div>
            </div>
            <div class="laboratorio-tarjeta">${med.LABORATORIO}</div>
        </div>
    `).join('');
}

// Buscador en tiempo real
document.getElementById('buscador').addEventListener('input', (e) => {
    const texto = e.target.value.toLowerCase();
    if (!medicamentos.length) return;
    
    const filtrados = medicamentos.filter(med => 
        (med.DROGA || '').toLowerCase().includes(texto) ||
        (med.MARCA || '').toLowerCase().includes(texto) ||
        (med.LABORATORIO || '').toLowerCase().includes(texto)
    );
    mostrarResultados(filtrados);
});

// Cargar datos
fetch('medicamentos.json')
    .then(response => response.json())
    .then(data => {
        // La primera línea es el encabezado, la saltamos
        const datosMedicamentos = data.slice(1);
        medicamentos = datosMedicamentos.map(mapearMedicamento);
        // No mostrar nada al inicio (solo el mensaje)
        document.getElementById('resultados').innerHTML = '<div class="mensaje-inicial">🔍 Buscá un medicamento para ver los resultados</div>';
    })
    .catch(error => {
        console.error(error);
        document.getElementById('resultados').innerHTML = '<p>Error al cargar los datos.</p>';
    });
