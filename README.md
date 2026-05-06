# 💊 Buscador de Medicamentos PAMI

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Online-222222?logo=githubpages)](https://psbella.github.io/pami/) [![License](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey?logo=creativecommons)](https://creativecommons.org/licenses/by-nc/4.0/) [![Repo Size](https://img.shields.io/github/repo-size/psbella/pami?label=Repo%20Size)](https://github.com/psbella/pami) [![Last Commit](https://img.shields.io/github/last-commit/psbella/pami?label=Last%20Commit)](https://github.com/psbella/pami) [![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5)](https://developer.mozilla.org/es/docs/Web/HTML) [![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3)](https://developer.mozilla.org/es/docs/Web/CSS) [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript)](https://developer.mozilla.org/es/docs/Web/JavaScript) [![SVG](https://img.shields.io/badge/SVG-FFB13B?logo=svg&logoColor=white)](https://www.w3.org/Graphics/SVG/) [![Python](https://img.shields.io/badge/Python-3776AB?logo=python)](https://www.python.org/) [![OpenPyXL](https://img.shields.io/badge/OpenPyXL-25A162?logo=python)](https://openpyxl.readthedocs.io/) [![JSON](https://img.shields.io/badge/JSON-000000?logo=json)](https://www.json.org/) [![Git](https://img.shields.io/badge/Git-F05032?logo=git)](https://git-scm.com/) [![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github)](https://github.com/psbella/pami) [![Dependencies](https://img.shields.io/badge/Dependencies-0%20(Zero)-brightgreen)](https://github.com/psbella/pami/network/dependencies) [![Open Source](https://img.shields.io/badge/Open%20Source-Yes-brightgreen)](https://opensource.org/) [![No Ads](https://img.shields.io/badge/No%20Ads-Yes-brightgreen)](#) [![No Tracking](https://img.shields.io/badge/No%20Tracking-Yes-brightgreen)](#) [![GDPR](https://img.shields.io/badge/GDPR-Compliant-brightgreen)](#) [![Responsive](https://img.shields.io/badge/Responsive-Yes-brightgreen)](#) [![Mobile First](https://img.shields.io/badge/Mobile%20First-Yes-brightgreen)](#) [![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%20AA-brightgreen?logo=accessibility)](https://www.w3.org/WAI/standards-guidelines/wcag/) [![Performance](https://img.shields.io/badge/Performance-71%25-yellow)](#) [![Accessibility Score](https://img.shields.io/badge/Accessibility%20Score-80%25-brightgreen)](#) [![Best Practices](https://img.shields.io/badge/Best%20Practices-100%25-brightgreen)](#) [![SEO](https://img.shields.io/badge/SEO-90%25-brightgreen)](#) [![Lighthouse](https://img.shields.io/badge/Lighthouse-Passed-brightgreen?logo=lighthouse)](#) [![PWA](https://img.shields.io/badge/PWA-Planned-blue?logo=pwa)](#) [![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-Planned-blue?logo=githubactions)](#) [![Open Issues](https://img.shields.io/github/issues/psbella/pami?label=Open%20Issues)](https://github.com/psbella/pami/issues)

---

## 📋 Descripción

Buscador de medicamentos con precios actualizados de **PAMI (Programa de Atención Médica Integral)**. Permite consultar coberturas y copagos de forma rápida, gratuita y sin publicidad.

🔗 **Sitio web:** [https://psbella.github.io/pami/](https://psbella.github.io/pami/)

📊 **Base de datos actual:** `8,391` medicamentos y presentaciones

📅 **Última actualización:** Ver en el footer del sitio

---

## ✨ Características

| Característica | Descripción |
|----------------|-------------|
| 🔍 **Búsqueda en tiempo real** | Índice optimizado para búsquedas rápidas |
| 💰 **Precios actualizados** | Datos oficiales de PAMI |
| 📊 **Filtros dinámicos** | Por presentación y laboratorio |
| 📱 **Diseño responsive** | Funciona en celular, tablet y desktop |
| 🚫 **Sin publicidad** | 100% gratuito, sin tracking |
| 🔒 **Privacidad first** | Sin cookies de rastreo, búsquedas locales |
| 📜 **Open Source** | Licencia CC BY-NC 4.0 |

---

## 🏗️ Tecnologías utilizadas

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos responsive, Flexbox, Grid
- **JavaScript (ES6+)** - Lógica de búsqueda, manipulación del DOM, async/fetch

### Backend / Procesamiento de datos
- **Python 3** - Conversión de XLSX a JSON
- **OpenPyXL** - Lectura de archivos Excel
- **JSON** - Almacenamiento de datos

### Infraestructura
- **GitHub Pages** - Hosting gratuito
- **Git** - Control de versiones

---

## 📁 Estructura del proyecto

```text
📁 pami/
├── index.html           # Página principal
├── style.css            # Estilos completos
├── script.js            # Lógica de búsqueda
├── medicamentos.json    # Base de datos (8.391 registros)
├── privacidad.html      # Política de privacidad
├── terminos.html        # Términos y condiciones
├── robots.txt           # Control de bots
├── humans.txt           # Información del equipo
├── img/
│   ├── favicon.svg      # Favicon del sitio
│   └── logo_banner.svg  # Logo del header
└── xls_to_JSON.py       # Script de conversión (herramienta)
```

---

## 🗃️ Ejemplo del JSON (medicamentos.json)

```json
{
  "fecha": "05/05/2026 16:53",
  "medicamentos": [
    {
      "DROGA": "levetiracetam",
      "MARCA": "LEVECOM SOLUCIÓN",
      "PRESENTACION": "sol.oral x 300 ml",
      "LABORATORIO": "Baliarda",
      "COBERTURA": "50",
      "COPAGO": 79725.54
    },
    {
      "DROGA": "levocetirizina",
      "MARCA": "TIRIZ",
      "PRESENTACION": "5 mg comp.rec.x 10",
      "LABORATORIO": "Eurofarma",
      "COBERTURA": "50",
      "COPAGO": 4118.6
    }
  ]
}
```

### Campos del JSON

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `fecha` | string | Fecha de última actualización del dataset |
| `DROGA` | string | Nombre del principio activo |
| `MARCA` | string | Marca comercial del medicamento |
| `PRESENTACION` | string | Formato y cantidad |
| `LABORATORIO` | string | Laboratorio fabricante |
| `COBERTURA` | string | Porcentaje de cobertura PAMI |
| `COPAGO` | number | Precio final con descuento aplicado |

---

## ⚙️ Cómo funciona el buscador

### 1. Carga de datos
- El archivo `medicamentos.json` se carga con `fetch()`
- Se detecta automáticamente si tiene formato con fecha o sin ella

### 2. Construcción del índice
- Se normaliza el texto (minúsculas + sin acentos)
- Se crea un índice inverso para búsquedas rápidas
- Cada palabra y prefijo apunta a los IDs de medicamentos

### 3. Búsqueda
- El usuario escribe al menos 3 caracteres
- Se busca en el índice y se devuelven resultados
- Límite de 200 resultados por búsqueda

### 4. Filtros
- **Presentación:** Filtra por formato del medicamento
- **Laboratorio:** Filtra por fabricante
- **Orden:** Ordena por precio ascendente o descendente

### 5. Visualización
- Tarjetas con: Marca, Droga, Presentación, Cobertura, Precio y Laboratorio
- Animación del contador total de medicamentos

---

## 🔄 Actualización de datos

### Requisitos
- Python 3.x
- Librería OpenPyXL

### Instalación
```bash
pip install openpyxl
```

### Proceso
1. Descargar el archivo XLSX desde [datos.pami.org.ar](https://datos.pami.org.ar)
2. Colocar el archivo en la misma carpeta que `xls_to_JSON.py`
3. Ejecutar el script:
```bash
python xls_to_JSON.py
```
4. El script genera `medicamentos.json` con formato optimizado
5. Subir el nuevo JSON al repositorio

### Script de conversión (`xls_to_JSON.py`)
- Busca automáticamente el archivo `.xlsx`
- Limpia precios (elimina `$` y espacios)
- Limpia coberturas (elimina `%`)
- Guarda en formato JSON minificado
- Incluye fecha de actualización

---

## 🔗 Enlaces oficiales

- **Datos oficiales PAMI:** [datos.pami.org.ar](https://datos.pami.org.ar)
- **Sitio web PAMI:** [pami.org.ar](https://www.pami.org.ar)
- **Licencia CC BY-NC 4.0:** [creativecommons.org](https://creativecommons.org/licenses/by-nc/4.0/)
- **Código fuente:** [GitHub](https://github.com/psbella/pami)

---

## 📊 Estadísticas de la base de datos

| Métrica | Valor |
|---------|-------|
| Total de medicamentos | 8,391 |
| Tamaño del JSON (minificado) | ~2.5 MB |
| Tiempo de carga promedio | < 1 segundo |
| Coberturas disponibles | 40% - 100% |
| Laboratorios distintos | +200 |

---

## 📱 Responsive

| Dispositivo | Breakpoint | Comportamiento |
|-------------|------------|----------------|
| 📱 Celular | < 600px | Logo más chico, input y botón en columna, filtros apilados |
| 📟 Tablet | 600px - 1200px | Layout adaptable |
| 🖥️ Desktop | > 1200px | Layout completo, contenedor centrado |

---

## 📜 Licencia

Este proyecto está bajo la licencia **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)**.

- ✅ **Permitido:** Compartir, copiar, redistribuir
- ✅ **Permitido:** Adaptar, remezclar, transformar
- ❌ **No permitido:** Uso comercial

[Ver licencia completa](https://creativecommons.org/licenses/by-nc/4.0/)

---

## 👨‍💻 Autor

**Pablo Bella**
- 📧 Email: [pablo.s.bella@gmail.com](mailto:pablo.s.bella@gmail.com)
- 🐙 GitHub: [psbella](https://github.com/psbella)

---

## 🙏 Agradecimientos

- **PAMI** - Por proporcionar los datos abiertos
- **GitHub Pages** - Por el hosting gratuito
- **OpenPyXL** - Por la librería de manipulación de Excel

---

## 📅 Historial de versiones

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0.0 | Mayo 2026 | Lanzamiento inicial |

---

## 📞 Contacto

Para consultas, sugerencias o reportar errores:
📧 **pablo.s.bella@gmail.com**

---

⭐ **Si te gustó este proyecto, no olvides dejar una estrella en GitHub!** ⭐
