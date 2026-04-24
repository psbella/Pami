* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
    min-height: 100vh;
    padding: 20px;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

/* Header */
h1 {
    background: linear-gradient(135deg, #1a73e8, #0d47a1);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-size: 2rem;
    margin-bottom: 8px;
    font-weight: 700;
}

.container > p {
    color: #5f6368;
    margin-bottom: 30px;
    font-size: 1rem;
}

/* ============================================ */
/* SECCIÓN DE BÚSQUEDA (destacada) */
/* ============================================ */
.busqueda-section {
    background: white;
    border-radius: 20px;
    padding: 24px;
    margin-bottom: 30px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.08);
    border: 1px solid rgba(26,115,232,0.1);
}

.busqueda-container {
    display: flex;
    gap: 12px;
}

.busqueda-container #buscador {
    flex: 1;
    padding: 16px 20px;
    font-size: 16px;
    border: 2px solid #e0e0e0;
    border-radius: 16px;
    font-family: inherit;
    transition: all 0.3s ease;
    background: #fafbfc;
}

.busqueda-container #buscador:focus {
    outline: none;
    border-color: #1a73e8;
    background: white;
    box-shadow: 0 0 0 4px rgba(26,115,232,0.1);
}

#btnBuscar {
    padding: 0 32px;
    background: linear-gradient(135deg, #1a73e8, #0d47a1);
    color: white;
    border: none;
    border-radius: 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.3s ease;
    white-space: nowrap;
    box-shadow: 0 2px 8px rgba(26,115,232,0.3);
}

#btnBuscar:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(26,115,232,0.4);
}

#btnBuscar:active {
    transform: translateY(0);
}

/* ============================================ */
/* SECCIÓN DE FILTROS (más discreta) */
/* ============================================ */
.filtros-section {
    background: rgba(255,255,255,0.8);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 25px;
    border: 1px solid rgba(0,0,0,0.05);
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.filtros-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.filtro-grupo {
    flex: 1;
    min-width: 160px;
}

.filtro-grupo label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: #5f6368;
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.filtro-grupo select {
    width: 100%;
    padding: 10px 12px;
    font-size: 14px;
    border: 1.5px solid #e0e0e0;
    border-radius: 12px;
    background: white;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.2s ease;
}

.filtro-grupo select:hover {
    border-color: #1a73e8;
}

.filtro-grupo select:focus {
    outline: none;
    border-color: #1a73e8;
    box-shadow: 0 0 0 3px rgba(26,115,232,0.1);
}

/* ============================================ */
/* CONTADOR */
/* ============================================ */
.contador {
    margin: 15px 0 20px 0;
    font-size: 14px;
    color: #5f6368;
    text-align: right;
    font-weight: 500;
}

/* ============================================ */
/* TARJETAS DE RESULTADOS */
/* ============================================ */
.resultados {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.tarjeta {
    background: white;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    transition: all 0.3s ease;
    border: 1px solid rgba(0,0,0,0.03);
}

.tarjeta:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.1);
}

.marca-tarjeta {
    color: #1a73e8;
    font-size: 1.2rem;
    margin: 0 0 16px 0;
    padding-bottom: 10px;
    border-bottom: 2px solid #e8eaed;
    font-weight: 600;
}

.tabla-interna {
    width: 100%;
    margin-bottom: 12px;
}

.fila-tabla {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #f0f2f5;
}

.fila-tabla:last-child {
    border-bottom: none;
}

.celda {
    font-size: 14px;
}

.celda.etiqueta {
    color: #5f6368;
    font-weight: 500;
    width: 110px;
}

.celda.valor {
    color: #202124;
    text-align: right;
    flex: 1;
}

.precio-destacado {
    font-size: 1.3rem;
    font-weight: 700;
    background: linear-gradient(135deg, #1a73e8, #0d47a1);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.cobertura-tag {
    background: #e8f0fe;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    color: #1a73e8;
    display: inline-block;
}

.laboratorio-tarjeta {
    font-size: 12px;
    color: #5f6368;
    padding-top: 10px;
    margin-top: 10px;
    border-top: 1px solid #e8eaed;
    text-align: right;
    font-weight: 500;
}

.mensaje-inicial {
    text-align: center;
    color: #5f6368;
    padding: 60px 20px;
    background: white;
    border-radius: 20px;
    font-size: 1rem;
    border: 2px dashed #e0e0e0;
}

/* ============================================ */
/* RESPONSIVE */
/* ============================================ */
@media (max-width: 600px) {
    body {
        padding: 12px;
    }
    
    h1 {
        font-size: 1.6rem;
    }
    
    .busqueda-section {
        padding: 16px;
    }
    
    .busqueda-container {
        flex-direction: column;
    }
    
    #btnBuscar {
        padding: 14px;
    }
    
    .filtros-container {
        flex-direction: column;
        gap: 12px;
    }
    
    .filtro-grupo {
        min-width: 100%;
    }
    
    .celda.etiqueta {
        width: 85px;
        font-size: 12px;
    }
    
    .celda.valor {
        font-size: 12px;
    }
    
    .precio-destacado {
        font-size: 1.1rem;
    }
    
    .marca-tarjeta {
        font-size: 1rem;
    }
    
    .tarjeta {
        padding: 14px;
    }
}
