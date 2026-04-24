let medicamentos = [];
let indiceBusqueda = {};
let timeoutBuscador;

function mapearMedicamento(item, idx) {
    if (item.DROGA !== undefined) {
        return {
            id: idx,
            DROGA: item.DROGA || '',
            MARCA: item.MARCA || '',
            PRESENTACION: item.PRESENTACION || '',
            LABORATORIO: item.LABORATORIO || '',
            COBERTURA: (item.COBERTURA || '').replace('%', ''),
            COPAGO: parseFloat(String(item.COPAGO || 0).replace('$', '').replace(/\s/g, '').replace(',', '')) || 0
        };
    }
    
    let cobertura = (item.E || '').replace('%', '');
    let precio = (item.F || '0').replace('$', '').replace(/\s/g, '').replace(',', '');
    
    return {
        id: idx,
        DROGA: item.A || '',
        MARCA: item.B || '',
        PRESENTACION: item.C || '',
        LABORATORIO: item.D || '',
        COBERTURA: cobertura,
        COPAGO: parseFloat(precio) || 0
    };
}

function construirIndice() {
    indiceBusqueda = {};
    
    medicamentos.forEach((med, idx) => {
        const textoCompleto = `${med.DROGA} ${med.MARCA} ${med.LABORATORIO}`.toLowerCase();
        const palabras = textoCompleto.split(/\s+/);
        
        palabras.forEach(palabra => {
            if (palabra.length < 2) return;
            if (!indiceBusqueda[palabra]) {
                indiceBusqueda[palabra] = new Set();
            }
            indiceBusqueda[palabra].add(idx);
        });
    });
    
    console.log(`✅ Índice construido con ${Object.keys(indiceBusqueda).length} palabras únicas`);
    console.log(`🔍 Ejemplo de índice: "aspirina" → ${indiceBusqueda['aspirina'] ? indiceBusqueda['aspirina'].size : 0} resultados`);
}

function buscarConIndice(texto) {
    if (!texto || texto.length < 2) {
        return [];
    }
    
    const palabrasBusqueda = texto.toLowerCase().split(/\s+/);
    console.log(`🔍 Buscando: "${texto}" | Palabras:`, palabrasBusqueda);
    
    let resultadosSet = indiceBusqueda[palabrasBusqueda[0]] || new Set();
    console.log(`   Primera palabra "${palabrasBusqueda[0]}": ${resultadosSet.size} resultados`);
    
    for (let i = 1; i < palabrasBusqueda.length; i++) {
        const resultadosPalabra = indiceBusqueda[palabrasBusqueda[i]] || new Set();
        console.log(`   Palabra "${palabrasBusqueda[i]}": ${resultadosPalabra.size} resultados`);
        resultadosSet = new Set([...resultadosSet].filter(idx => resultadosPalabra.has(idx)));
        if (resultadosSet.size === 0) break;
    }
    
    console.log(`   Total después de intersección: ${resultadosSet.size} resultados`);
    return [...resultadosSet].map(idx => medicamentos[idx]);
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
    const listaMostrar = lista.slice(0, 100);
    if (lista.length > 100) {
        contadorDiv.innerHTML += ` (mostrando 100 de ${lista.length})`;
    }
    
    contenedor.innerHTML = listaMostrar.map(med => `
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

function ejecutarBusqueda(texto) {
    console.log(`🚀 ejecutarBusqueda llamado con: "${texto}"`);
    
    if (texto === '') {
        document.getElementById('resultados').innerHTML = '<div class="mensaje-inicial">🔍 Buscá un medicamento para ver los resultados</div>';
        document.getElementById('contador').innerHTML = '';
        return;
    }
    
    let resultados;
    if (Object.keys(indiceBusqueda).length > 0) {
        resultados = buscarConIndice(texto);
        console.log(`📊 Resultados del índice: ${resultados.length}`);
    } else {
        resultados = medicamentos.filter(med => {
            const droga = (med.DROGA || '').toLowerCase();
            const marca = (med.MARCA || '').toLowerCase();
            const lab = (med.LABORATORIO || '').toLowerCase();
            return droga.includes(texto) || marca.includes(texto) || lab.includes(texto);
        });
        console.log(`📊 Resultados búsqueda lineal: ${resultados.length}`);
    }
    
    mostrarResultados(resultados);
}

// Buscador
const buscador = document.getElementById('buscador');
if (buscador) {
    console.log('✅ Buscador encontrado, agregando event listener');
    
    buscador.addEventListener('input', (e) => {
        const texto = e.target.value.toLowerCase().trim();
        console.log(`⌨️ Input detectado: "${texto}"`);
        
        clearTimeout(timeoutBuscador);
        
        if (texto === '') {
            document.getElementById('resultados').innerHTML = '<div class="mensaje-inicial">🔍 Buscá un medicamento para ver los resultados</div>';
            document.getElementById('contador').innerHTML = '';
            return;
        }
        
        if (texto.length < 2) {
            document.getElementById('resultados').innerHTML = '<div class="mensaje-inicial">🔍 Escribí al menos 2 letras</div>';
            document.getElementById('contador').innerHTML = '';
            return;
        }
        
        document.getElementById('resultados').innerHTML = '<div class="mensaje-inicial">⏳ Buscando...</div>';
        
        timeoutBuscador = setTimeout(() => {
            ejecutarBusqueda(texto);
        }, 300);
    });
} else {
    console.error('❌ No se encontró el elemento con id "buscador"');
}

// Cargar datos
console.log('🔄 Iniciando carga de datos...');
fetch('medicamentos.json')
    .then(response => {
        console.log('📡 Respuesta del servidor:', response.status);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
    })
    .then(data => {
        console.log('📦 JSON cargado. Tipo:', Array.isArray(data) ? 'array' : typeof data);
        console.log('📊 Cantidad total de registros:', data.length);
        
        let datosMedicamentos = data;
        if (data.length > 0 && (data[0].DROGA !== undefined || data[0].A !== undefined)) {
            datosMedicamentos = data;
        }
        
        medicamentos = datosMedicamentos.map((item, idx) => mapearMedicamento(item, idx));
        console.log(`✅ Cargados ${medicamentos.length} medicamentos`);
        
        construirIndice();
        
        document.getElementById('resultados').innerHTML = '<div class="mensaje-inicial">🔍 Buscá un medicamento para ver los resultados</div>';
        document.getElementById('contador').innerHTML = '';
    })
    .catch(error => {
        console.error('❌ ERROR FATAL:', error);
        document.getElementById('resultados').innerHTML = `<p>Error al cargar los datos: ${error.message}</p>`;
    });
