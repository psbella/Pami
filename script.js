let medicamentos = [];
let indiceBusqueda = {};
let timeoutBuscador;

// Eliminar acentos
function normalizarTexto(texto) {
    if (!texto) return '';
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function mapearMedicamento(item, idx) {
    if (item.DROGA !== undefined) {
        return {
            id: idx,
            DROGA: item.DROGA || '',
            MARCA: item.MARCA || '',
            PRESENTACION: item.PRESENTACION || '',
            LABORATORIO: item.LABORATORIO || '',
            COBERTURA: (item.COBERTURA || '').replace('%', ''),
            COPAGO: parseFloat(String(item.COPAGO || 0).replace('$', '').replace(/\s/g, '').replace(',', '')) || 0,
            DROGA_buscar: normalizarTexto(item.DROGA || ''),
            MARCA_buscar: normalizarTexto(item.MARCA || ''),
            LABORATORIO_buscar: normalizarTexto(item.LABORATORIO || '')
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
        COPAGO: parseFloat(precio) || 0,
        DROGA_buscar: normalizarTexto(item.A || ''),
        MARCA_buscar: normalizarTexto(item.B || ''),
        LABORATORIO_buscar: normalizarTexto(item.D || '')
    };
}

function construirIndice() {
    indiceBusqueda = {};
    
    medicamentos.forEach((med, idx) => {
        const textoCompleto = `${med.DROGA_buscar} ${med.MARCA_buscar} ${med.LABORATORIO_buscar}`;
        const palabras = textoCompleto.split(/\s+/);
        
        palabras.forEach(palabra => {
            if (palabra.length < 2) return;
            
            if (!indiceBusqueda[palabra]) {
                indiceBusqueda[palabra] = new Set();
            }
            indiceBusqueda[palabra].add(idx);
            
            for (let i = 2; i <= palabra.length; i++) {
                const fragmento = palabra.substring(0, i);
                if (!indiceBusqueda[fragmento]) {
                    indiceBusqueda[fragmento] = new Set();
                }
                indiceBusqueda[fragmento].add(idx);
            }
        });
    });
    
    console.log(`✅ Índice construido`);
}

function buscarConIndice(texto) {
    if (!texto || texto.length < 2) return [...medicamentos];
    
    const textoNormalizado = normalizarTexto(texto);
    const resultadosSet = indiceBusqueda[textoNormalizado] || new Set();
    
    return [...resultadosSet].map(idx => medicamentos[idx]);
}

function aplicarFiltrosYOrden(lista) {
    let resultado = [...lista];
    
    const presentacion = document.getElementById('filtroPresentacion')?.value;
    const laboratorio = document.getElementById('filtroLaboratorio')?.value;
    const orden = document.getElementById('ordenPrecio')?.value;
    
    if (presentacion) {
        resultado = resultado.filter(med => med.PRESENTACION === presentacion);
    }
    
    if (laboratorio) {
        resultado = resultado.filter(med => med.LABORATORIO === laboratorio);
    }
    
    if (orden === 'asc') {
        resultado.sort((a, b) => a.COPAGO - b.COPAGO);
    } else if (orden === 'desc') {
        resultado.sort((a, b) => b.COPAGO - a.COPAGO);
    }
    
    return resultado;
}

function mostrarResultados(lista) {
    const contenedor = document.getElementById('resultados');
    const contadorDiv = document.getElementById('contador');
    
    if (!lista || lista.length === 0) {
        contenedor.innerHTML = '<div class="mensaje-inicial">🔍 No se encontraron medicamentos.</div>';
        contadorDiv.innerHTML = '0 resultados';
        return;
    }
    
    contadorDiv.innerHTML = `${lista.length} resultado${lista.length !== 1 ? 's' : ''}`;
    
    const listaMostrar = lista.slice(0, 200);
    if (lista.length > 200) {
        contadorDiv.innerHTML += ` (mostrando 200 de ${lista.length})`;
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

function actualizarResultados() {
    const busquedaTexto = document.getElementById('buscador').value.trim();
    
    let resultados = medicamentos;
    
    // Si hay texto de búsqueda y tiene al menos 2 letras, filtrar
    if (busquedaTexto && busquedaTexto.length >= 2) {
        resultados = buscarConIndice(busquedaTexto);
    }
    
    const resultadosFiltrados = aplicarFiltrosYOrden(resultados);
    mostrarResultados(resultadosFiltrados);
}

function cargarOpcionesFiltros() {
    const presentaciones = new Set();
    const laboratorios = new Set();
    
    medicamentos.forEach(med => {
        if (med.PRESENTACION) presentaciones.add(med.PRESENTACION);
        if (med.LABORATORIO) laboratorios.add(med.LABORATORIO);
    });
    
    const selectPresentacion = document.getElementById('filtroPresentacion');
    const selectLaboratorio = document.getElementById('filtroLaboratorio');
    
    const presOrdenadas = Array.from(presentaciones).sort();
    const labsOrdenados = Array.from(laboratorios).sort();
    
    presOrdenadas.forEach(p => {
        const option = document.createElement('option');
        option.value = p;
        option.textContent = p.length > 40 ? p.substring(0, 40) + '...' : p;
        selectPresentacion.appendChild(option);
    });
    
    labsOrdenados.forEach(l => {
        const option = document.createElement('option');
        option.value = l;
        option.textContent = l;
        selectLaboratorio.appendChild(option);
    });
}

// Configurar eventos
function setupEventListeners() {
    const buscador = document.getElementById('buscador');
    const btnBuscar = document.getElementById('btnBuscar');
    const filtroPresentacion = document.getElementById('filtroPresentacion');
    const filtroLaboratorio = document.getElementById('filtroLaboratorio');
    const ordenPrecio = document.getElementById('ordenPrecio');
    
    // Búsqueda en tiempo real (con debounce)
    buscador.addEventListener('input', (e) => {
        clearTimeout(timeoutBuscador);
        
        const texto = e.target.value.trim();
        
        if (texto === '') {
            // Si está vacío, mostrar resultados sin filtro de texto
            timeoutBuscador = setTimeout(() => {
                actualizarResultados();
            }, 100);
            return;
        }
        
        if (texto.length < 2) {
            document.getElementById('resultados').innerHTML = '<div class="mensaje-inicial">🔍 Escribí al menos 2 letras</div>';
            document.getElementById('contador').innerHTML = '';
            return;
        }
        
        document.getElementById('resultados').innerHTML = '<div class="mensaje-inicial">⏳ Buscando...</div>';
        
        timeoutBuscador = setTimeout(() => {
            actualizarResultados();
        }, 200);
    });
    
    // Botón buscar (fuerza la búsqueda)
    if (btnBuscar) {
        btnBuscar.addEventListener('click', () => {
            clearTimeout(timeoutBuscador);
            actualizarResultados();
        });
    }
    
    // Filtros y orden
    filtroPresentacion.addEventListener('change', () => actualizarResultados());
    filtroLaboratorio.addEventListener('change', () => actualizarResultados());
    ordenPrecio.addEventListener('change', () => actualizarResultados());
}

// Cargar datos
fetch('medicamentos.json')
    .then(response => response.json())
    .then(data => {
        let datosMedicamentos = data;
        if (data.length > 0 && (data[0].DROGA !== undefined || data[0].A !== undefined)) {
            datosMedicamentos = data;
        }
        
        medicamentos = datosMedicamentos.map((item, idx) => mapearMedicamento(item, idx));
        console.log(`✅ Cargados ${medicamentos.length} medicamentos`);
        
        construirIndice();
        cargarOpcionesFiltros();
        setupEventListeners();
        
        // Mostrar mensaje inicial
        document.getElementById('resultados').innerHTML = '<div class="mensaje-inicial">🔍 Buscá un medicamento para ver los resultados</div>';
        document.getElementById('contador').innerHTML = '';
    })
    .catch(error => {
        console.error(error);
        document.getElementById('resultados').innerHTML = `<p>Error al cargar los datos: ${error.message}</p>`;
    });
