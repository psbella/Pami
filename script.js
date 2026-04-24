let medicamentos = [];

function mapearMedicamento(item) {
    // Si el item ya tiene las claves en mayúsculas directas, usarlas
    if (item.DROGA !== undefined) {
        return {
            DROGA: item.DROGA || '',
            MARCA: item.MARCA || '',
            PRESENTACION: item.PRESENTACION || '',
            LABORATORIO: item.LABORATORIO || '',
            COBERTURA: (item.COBERTURA || '').replace('%', ''),
            COPAGO: parseFloat(String(item.COPAGO || 0).replace('$', '').replace(/\s/g, '').replace(',', '')) || 0
        };
    }
    
    // Si viene con claves A,B,C,D,E,F (formato original)
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
    
    console.log('Mostrando resultados:', lista.length); // Debug
    
    if (!lista || lista.length === 0) {
        contenedor.innerHTML = '<div class="mensaje-inicial">🔍 No se encontraron medicamentos. Probá con otra palabra.</div>';
        contadorDiv.innerHTML = '0 resultados';
        return;
    }
    
    contadorDiv.innerHTML = `${lista.length} resultado${lista.length !== 1 ? 's' : ''}`;
    
    contenedor.innerHTML = lista.map(med => `
        <div class="tarjeta">
            <h3 class="marca-tarjeta">${med.MARCA || 'N/A'}</h3>
            <div class="tabla-interna">
                <div class="fila-tabla">
                    <div class="celda etiqueta">Droga</div>
                    <div class="celda valor">${med.DROGA || 'N/A'}</div>
                </div>
                <div class="fila-tabla">
                    <div class="celda etiqueta">Presentación</div>
                    <div class="celda valor">${med.PRESENTACION || 'N/A'}</div>
                </div>
                <div class="fila-tabla">
                    <div class="celda etiqueta">Cobertura</div>
                    <div class="celda valor"><span class="cobertura-tag">${med.COBERTURA || '?'}%</span></div>
                </div>
                <div class="fila-tabla">
                    <div class="celda etiqueta">Precio final</div>
                    <div class="celda valor precio-destacado">$${(med.COPAGO || 0).toLocaleString()}</div>
                </div>
            </div>
            <div class="laboratorio-tarjeta">${med.LABORATORIO || 'N/A'}</div>
        </div>
    `).join('');
}

// Buscador
const buscador = document.getElementById('buscador');
if (buscador) {
    buscador.addEventListener('input', (e) => {
        const texto = e.target.value.toLowerCase().trim();
        console.log('Buscando:', texto, 'Total medicamentos:', medicamentos.length); // Debug
        
        if (!medicamentos.length) return;
        
        if (texto === '') {
            // Si no hay texto, mostrar mensaje inicial (no resultados)
            document.getElementById('resultados').innerHTML = '<div class="mensaje-inicial">🔍 Buscá un medicamento para ver los resultados</div>';
            document.getElementById('contador').innerHTML = '';
            return;
        }
        
        const filtrados = medicamentos.filter(med => {
            const droga = (med.DROGA || '').toLowerCase();
            const marca = (med.MARCA || '').toLowerCase();
            const lab = (med.LABORATORIO || '').toLowerCase();
            return droga.includes(texto) || marca.includes(texto) || lab.includes(texto);
        });
        
        console.log('Filtrados:', filtrados.length); // Debug
        mostrarResultados(filtrados);
    });
}

// Cargar datos
fetch('medicamentos.json')
    .then(response => {
        console.log('Respuesta del servidor:', response.status); // Debug
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.json();
    })
    .then(data => {
        console.log('Datos cargados, tipo:', Array.isArray(data) ? 'array' : typeof data);
        console.log('Primeros 3 items:', data.slice(0, 3));
        
        // Detectar formato automáticamente
        let datosMedicamentos = data;
        
        // Si la primera fila parece un encabezado (con A,B,C o DROGA, etc.)
        if (data.length > 0 && (data[0].A !== undefined || data[0].DROGA !== undefined)) {
            // Ya está en formato correcto o es el formato con A,B,C
            datosMedicamentos = data;
        }
        
        medicamentos = datosMedicamentos.map(mapearMedicamento);
        console.log('Medicamentos procesados:', medicamentos.length);
        console.log('Primer medicamento mapeado:', medicamentos[0]);
        
        // Mostrar mensaje inicial (vacío)
        document.getElementById('resultados').innerHTML = '<div class="mensaje-inicial">🔍 Buscá un medicamento para ver los resultados</div>';
        document.getElementById('contador').innerHTML = '';
    })
    .catch(error => {
        console.error('ERROR DETAIL:', error);
        document.getElementById('resultados').innerHTML = `<p>Error al cargar los datos: ${error.message}</p>`;
    });
