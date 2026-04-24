let medicamentos = [];
let indiceBusqueda = {};     // Índice: palabra -> array de índices
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

// Construir el índice invertido
function construirIndice() {
    indiceBusqueda = {};
    
    medicamentos.forEach((med, idx) => {
        // Texto completo a indexar (todo en minúsculas)
        const textoCompleto = `${med.DROGA} ${med.MARCA} ${med.LABORATORIO}`.toLowerCase();
        
        // Extraer palabras individuales (dividir por espacios)
        const palabras = textoCompleto.split(/\s+/);
        
        // Para cada palabra, agregar este medicamento al índice
        palabras.forEach(palabra => {
            if (palabra.length < 2) return; // Ignorar palabras de 1 letra
            
            if (!indiceBusqueda[palabra]) {
                indiceBusqueda[palabra] = new Set(); // Set evita duplicados
            }
            indiceBusqueda[palabra].add(idx);
        });
    });
    
    console.log(`✅ Índice construido con ${Object.keys(indiceBusqueda).length} palabras únicas`);
}

// Buscar usando el índice
function buscarConIndice(texto) {
    if (!texto || texto.length < 2) {
        return []; // No buscar con menos de 2 letras
    }
    
    const palabrasBusqueda = texto.toLowerCase().split(/\s+/);
    
    // Obtener resultados para la primera palabra
    let resultadosSet = indiceBusqueda[palabrasBusqueda[0]] || new Set();
    
    // Intersectar con las demás palabras
    for (let i = 1; i < palabrasBusqueda.length; i++) {
        const resultadosPalabra = indiceBusqueda[palabrasBusqueda[i]] || new Set();
        resultadosSet = new Set([...resultadosSet].filter(idx => resultadosPalabra.has(idx)));
        if (resultadosSet.size === 0) break;
    }
    
    // Devolver los medicamentos correspondientes
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
    
    // Limitar a 100 resultados
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

// Búsqueda con índice + debounce
function ejecutarBusqueda(texto) {
    if (texto === '') {
        document.getElementById('resultados').innerHTML = '<div class="mensaje-inicial">🔍 Buscá un medicamento para ver los resultados</div>';
        document.getElementById('contador').innerHTML = '';
        return;
    }
    
    // Usar índice si está disponible, sino búsqueda lineal
    let resultados;
    if (Object.keys(indiceBusqueda).length > 0) {
        resultados = buscarConIndice(texto);
    } else {
        // Fallback a búsqueda lineal
        resultados = medicamentos.filter(med => {
            const droga = (med.DROGA || '').toLowerCase();
            const marca = (med.MARCA || '').toLowerCase();
            const lab = (med.LABORATORIO || '').toLowerCase();
            return droga.includes(texto) || marca.includes(texto) || lab.includes(texto);
        });
    }
    
    mostrarResultados(resultados);
}

// Buscador con debounce
const buscador = document.getElementById('buscador');
if (buscador) {
    buscador.addEventListener('input', (e) => {
        const texto = e.target.value.toLowerCase().trim();
        
        clearTimeout(timeoutBuscador);
        
        if (texto !== '' && texto.length < 2) {
            document.getElementById('resultados').innerHTML = '<div class="mensaje-inicial">🔍 Escribí al menos 2 letras para buscar</div>';
            document.getElementById('contador').innerHTML = '';
            return;
        }
        
        if (texto !== '') {
            document.getElementById('resultados').innerHTML = '<div class="mensaje-inicial">⏳ Buscando...</div>';
        }
        
        timeoutBuscador = setTimeout(() => {
            ejecutarBusqueda(texto);
        }, 200);
    });
}

// Cargar datos y construir índice
fetch('medicamentos.json')
    .then(response => response.json())
    .then(data => {
        let datosMedicamentos = data;
        if (data.length > 0 && (data[0].DROGA !== undefined || data[0].A !== undefined)) {
            datosMedicamentos = data;
        }
        
        // Mapear medicamentos
        medicamentos = datosMedicamentos.map((item, idx) => mapearMedicamento(item, idx));
        console.log(`✅ Cargados ${medicamentos.length} medicamentos`);
        
        // Construir índice invertido
        construirIndice();
        
        document.getElementById('resultados').innerHTML = '<div class="mensaje-inicial">🔍 Buscá un medicamento para ver los resultados</div>';
        document.getElementById('contador').innerHTML = '';
    })
    .catch(error => {
        console.error(error);
        document.getElementById('resultados').innerHTML = `<p>Error al cargar los datos: ${error.message}</p>`;
    });
