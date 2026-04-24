// script.js - Versión de diagnóstico
console.log("🚀 Script iniciado");

let medicamentos = [];

function mostrarResultados(lista) {
    const contenedor = document.getElementById('resultados');
    const contadorDiv = document.getElementById('contador');
    
    if (!lista || lista.length === 0) {
        contenedor.innerHTML = '<div class="mensaje-inicial">🔍 No se encontraron medicamentos.</div>';
        contadorDiv.innerHTML = '0 resultados';
        return;
    }
    
    contadorDiv.innerHTML = `${lista.length} resultado${lista.length !== 1 ? 's' : ''}`;
    contenedor.innerHTML = lista.map(med => `
        <div class="tarjeta">
            <h3>${med.MARCA || 'N/A'}</h3>
            <p>${med.DROGA || 'N/A'} | ${med.PRESENTACION || 'N/A'}</p>
            <p>${med.LABORATORIO || 'N/A'} | Cobertura ${med.COBERTURA || '?'}%</p>
            <strong>$${(med.COPAGO || 0).toLocaleString()}</strong>
        </div>
    `).join('');
}

// Cargar y mostrar datos con logs detallados
console.log("📡 Intentando cargar medicamentos.json...");
fetch('medicamentos.json')
    .then(response => {
        console.log("📡 Respuesta recibida. Status:", response.status);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: El archivo medicamentos.json no se encontró. Verifica la ruta.`);
        }
        return response.json();
    })
    .then(data => {
        console.log("✅ Datos JSON cargados. Tipo:", Array.isArray(data) ? 'array' : typeof data);
        console.log("📊 Primeros 2 registros:", data.slice(0,2));
        
        // Limpieza simple de datos
        medicamentos = data.map(item => ({
            DROGA: item.DROGA || item.A || 'N/A',
            MARCA: item.MARCA || item.B || 'N/A',
            PRESENTACION: item.PRESENTACION || item.C || 'N/A',
            LABORATORIO: item.LABORATORIO || item.D || 'N/A',
            COBERTURA: (item.COBERTURA || item.E || '0').replace('%', ''),
            COPAGO: Number(String(item.COPAGO || item.F || '0').replace(/[^0-9.-]/g, '')) || 0
        }));
        
        console.log(`✅ Procesados ${medicamentos.length} medicamentos`);
        mostrarResultados(medicamentos);
    })
    .catch(error => {
        console.error("❌ ERROR CRÍTICO:", error);
        document.getElementById('resultados').innerHTML = `<p style="color:red;">Error: ${error.message}<br><br>Asegurate de que el archivo <strong>medicamentos.json</strong> esté en la MISMA carpeta que index.html en GitHub.</p>`;
        document.getElementById('contador').innerHTML = 'Error';
    });
