let medicamentos = [];
let indiceBusqueda = {};
let timeoutBuscador;
let resultadosUltimaBusqueda = [];

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
    
    medicamentos.forEach(function(med, idx) {
        var textoCompleto = med.DROGA_buscar + ' ' + med.MARCA_buscar + ' ' + med.LABORATORIO_buscar;
        var palabras = textoCompleto.split(/\s+/);
        
        palabras.forEach(function(palabra) {
            if (palabra.length < 2) return;
            
            if (!indiceBusqueda[palabra]) {
                indiceBusqueda[palabra] = new Set();
            }
            indiceBusqueda[palabra].add(idx);
            
            for (var i = 2; i <= palabra.length; i++) {
                var fragmento = palabra.substring(0, i);
                if (!indiceBusqueda[fragmento]) {
                    indiceBusqueda[fragmento] = new Set();
                }
                indiceBusqueda[fragmento].add(idx);
            }
        });
    });
    
    console.log('Indice construido');
}

function buscarConIndice(texto) {
    if (!texto || texto.length < 2) return [...medicamentos];
    
    var textoNormalizado = normalizarTexto(texto);
    var resultadosSet = indiceBusqueda[textoNormalizado] || new Set();
    
    return [...resultadosSet].map(function(idx) {
        return medicamentos[idx];
    });
}

function actualizarOpcionesFiltros(resultados) {
    var presentaciones = new Set();
    var laboratorios = new Set();
    
    resultados.forEach(function(med) {
        if (med.PRESENTACION && med.PRESENTACION !== 'N/A') {
            presentaciones.add(med.PRESENTACION);
        }
        if (med.LABORATORIO && med.LABORATORIO !== 'N/A') {
            laboratorios.add(med.LABORATORIO);
        }
    });
    
    var selectPresentacion = document.getElementById('filtroPresentacion');
    var selectLaboratorio = document.getElementById('filtroLaboratorio');
    
    var selectedPres = selectPresentacion.value;
    var selectedLab = selectLaboratorio.value;
    
    selectPresentacion.innerHTML = '<option value="">Todas</option>';
    var presOrdenadas = Array.from(presentaciones).sort();
    presOrdenadas.forEach(function(p) {
        var option = document.createElement('option');
        option.value = p;
        option.textContent = p.length > 50 ? p.substring(0, 50) + '...' : p;
        selectPresentacion.appendChild(option);
    });
    
    if (presentaciones.has(selectedPres)) {
        selectPresentacion.value = selectedPres;
    } else if (selectedPres !== '') {
        selectPresentacion.value = '';
    }
    
    selectLaboratorio.innerHTML = '<option value="">Todos</option>';
    var labsOrdenados = Array.from(laboratorios).sort();
    labsOrdenados.forEach(function(l) {
        var option = document.createElement('option');
        option.value = l;
        option.textContent = l;
        selectLaboratorio.appendChild(option);
    });
    
    if (laboratorios.has(selectedLab)) {
        selectLaboratorio.value = selectedLab;
    } else if (selectedLab !== '') {
        selectLaboratorio.value = '';
    }
}

function aplicarFiltrosYOrden(lista) {
    var resultado = [...lista];
    
    var presentacion = document.getElementById('filtroPresentacion').value;
    var laboratorio = document.getElementById('filtroLaboratorio').value;
    var orden = document.getElementById('ordenPrecio').value;
    
    if (presentacion) {
        resultado = resultado.filter(function(med) {
            return med.PRESENTACION === presentacion;
        });
    }
    
    if (laboratorio) {
        resultado = resultado.filter(function(med) {
            return med.LABORATORIO === laboratorio;
        });
    }
    
    if (orden === 'asc') {
        resultado.sort(function(a, b) {
            return a.COPAGO - b.COPAGO;
        });
    } else if (orden === 'desc') {
        resultado.sort(function(a, b) {
            return b.COPAGO - a.COPAGO;
        });
    }
    
    return resultado;
}

function mostrarResultados(lista) {
    var contenedor = document.getElementById('resultados');
    var contadorDiv = document.getElementById('contador');
    
    if (!lista || lista.length === 0) {
        contenedor.innerHTML = '<div class="mensaje-inicial"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="1.5"><circle cx="10" cy="10" r="7"/><line x1="15" y1="15" x2="21" y2="21"/></svg><p>No se encontraron medicamentos.</p></div>';
        contadorDiv.innerHTML = '0 resultados';
        return;
    }
    
    contadorDiv.innerHTML = lista.length + ' resultado' + (lista.length !== 1 ? 's' : '');
    
    var listaMostrar = lista.slice(0, 200);
    if (lista.length > 200) {
        contadorDiv.innerHTML += ' (mostrando 200 de ' + lista.length + ')';
    }
    
    contenedor.innerHTML = listaMostrar.map(function(med) {
        return '<div class="tarjeta">' +
            '<h3 class="marca-tarjeta">' + (med.MARCA || 'N/A') + '</h3>' +
            '<div class="tabla-interna">' +
                '<div class="fila-tabla">' +
                    '<div class="celda etiqueta">Droga</div>' +
                    '<div class="celda valor">' + (med.DROGA || 'N/A') + '</div>' +
                '</div>' +
                '<div class="fila-tabla">' +
                    '<div class="celda etiqueta">Presentación</div>' +
                    '<div class="celda valor">' + (med.PRESENTACION || 'N/A') + '</div>' +
                '</div>' +
                '<div class="fila-tabla">' +
                    '<div class="celda etiqueta">Cobertura</div>' +
                    '<div class="celda valor"><span class="cobertura-tag">' + (med.COBERTURA || '?') + '%</span></div>' +
                '</div>' +
                '<div class="fila-tabla">' +
                    '<div class="celda etiqueta">Precio final</div>' +
                    '<div class="celda valor precio-destacado">$' + (med.COPAGO || 0).toLocaleString() + '</div>' +
                '</div>' +
            '</div>' +
            '<div class="laboratorio-tarjeta">' + (med.LABORATORIO || 'N/A') + '</div>' +
        '</div>';
    }).join('');
}

function actualizarTodo() {
    var textoBusqueda = document.getElementById('buscador').value.trim();
    
    var resultados;
    if (textoBusqueda && textoBusqueda.length >= 2) {
        resultados = buscarConIndice(textoBusqueda);
    } else {
        resultados = [...medicamentos];
    }
    
    resultadosUltimaBusqueda = resultados;
    
    actualizarOpcionesFiltros(resultados);
    
    var resultadosFinales = aplicarFiltrosYOrden(resultados);
    mostrarResultados(resultadosFinales);
}

function setupEventListeners() {
    var buscador = document.getElementById('buscador');
    var btnBuscar = document.getElementById('btnBuscar');
    var filtroPresentacion = document.getElementById('filtroPresentacion');
    var filtroLaboratorio = document.getElementById('filtroLaboratorio');
    var ordenPrecio = document.getElementById('ordenPrecio');
    
    buscador.addEventListener('input', function(e) {
        clearTimeout(timeoutBuscador);
        
        var texto = e.target.value.trim();
        
        if (texto === '') {
            timeoutBuscador = setTimeout(function() {
                actualizarTodo();
            }, 100);
            return;
        }
        
        if (texto.length < 2) {
            document.getElementById('resultados').innerHTML = '<div class="mensaje-inicial"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="1.5"><circle cx="10" cy="10" r="7"/><line x1="15" y1="15" x2="21" y2="21"/></svg><p>Escribí al menos 2 letras</p></div>';
            document.getElementById('contador').innerHTML = '';
            return;
        }
        
        document.getElementById('resultados').innerHTML = '<div class="mensaje-inicial"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><p>Buscando...</p></div>';
        
        timeoutBuscador = setTimeout(function() {
            actualizarTodo();
        }, 200);
    });
    
    if (btnBuscar) {
        btnBuscar.addEventListener('click', function() {
            clearTimeout(timeoutBuscador);
            actualizarTodo();
        });
    }
    
    filtroPresentacion.addEventListener('change', function() {
        var resultadosFiltrados = aplicarFiltrosYOrden(resultadosUltimaBusqueda);
        mostrarResultados(resultadosFiltrados);
    });
    
    filtroLaboratorio.addEventListener('change', function() {
        var resultadosFiltrados = aplicarFiltrosYOrden(resultadosUltimaBusqueda);
        mostrarResultados(resultadosFiltrados);
    });
    
    ordenPrecio.addEventListener('change', function() {
        var resultadosFiltrados = aplicarFiltrosYOrden(resultadosUltimaBusqueda);
        mostrarResultados(resultadosFiltrados);
    });
}

// Cargar datos
fetch('medicamentos.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var datosMedicamentos = data;
        if (data.length > 0 && (data[0].DROGA !== undefined || data[0].A !== undefined)) {
            datosMedicamentos = data;
        }
        
        medicamentos = datosMedicamentos.map(function(item, idx) {
            return mapearMedicamento(item, idx);
        });
        
        console.log('Cargados ' + medicamentos.length + ' medicamentos');
        
        construirIndice();
        
        // 🔥 Inicializar filtros con TODOS los medicamentos
        resultadosUltimaBusqueda = [...medicamentos];
        actualizarOpcionesFiltros(medicamentos);
        
        setupEventListeners();
        
        document.getElementById('resultados').innerHTML = '<div class="mensaje-inicial"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="1.5"><circle cx="10" cy="10" r="7"/><line x1="15" y1="15" x2="21" y2="21"/></svg><p>Buscá un medicamento para ver los resultados</p></div>';
        document.getElementById('contador').innerHTML = '';
    })
    .catch(function(error) {
        console.error(error);
        document.getElementById('resultados').innerHTML = '<p>Error al cargar los datos: ' + error.message + '</p>';
    });
