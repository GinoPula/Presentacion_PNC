# PNC Maquinarias — Reporte Regional · Agosto 2026

Sitio web (React + Vite + Tailwind CSS + Framer Motion + Recharts) que presenta, en formato
landing/dashboard de una sola página, el reporte operativo de maquinaria pesada e intervenciones
del **Programa Nuestras Ciudades (PNC)** — rediseñado a partir de los PowerPoint originales.

Incluye un **selector de región** (arriba a la derecha, y también en el hero) que cambia todos
los datos de la página al instante: **Tumbes, Puno y Tacna**. Las secciones que una región no
tiene (por ejemplo "Puntos críticos ANA" o "Escenarios FEN / Presupuesto", que solo existen en el
reporte de Tumbes) se ocultan automáticamente — tanto el contenido como el menú de navegación.

## Qué incluye

- **Selector de región**: cambia Tumbes / Puno / Tacna sin recargar la página.
- **Hero** con foto de fondo, logotipos institucionales y KPIs rápidos por región.
- **Panorama**: estadísticas clave y gráfico de intervenciones ejecutadas por tipo.
- **Clasificación de intervenciones**: las 4 rutas normativas y su base legal (igual en las 3 regiones).
- **Tipos de intervenciones**: las 6 modalidades operativas con maquinaria (limpieza de cauces, encauzamiento,
  distribución de agua, limpieza de escombros, remoción de escombros, mejoramiento de transitabilidad), con foto
  y base legal cada una — contenido idéntico en las 3 regiones, tomado de la presentación nacional del PNC.
- **Intervenciones**: tabla de ejecutadas + tarjetas "en ejecución".
- **Programadas**: tabla de intervenciones programadas por provincia/distrito.
- **Mapa de intervenciones**: mapa interactivo (Leaflet, tiles Esri) con cada punto ejecutado o en
  ejecución, georreferenciado con coordenadas reales del sistema PNC. Cada punto tiene popup con
  ficha técnica, tipo, fechas, población beneficiada, volumen ejecutado y enlace a la ficha (cuando
  existe). El panel de filtro (estilo ReporteRiesgos, claro, al costado del mapa) tiene interruptores
  "Ejecutadas" / "En ejecución" para activar o desactivar cada capa, un filtro territorial provincia →
  distrito cuyas opciones se ajustan según la capa activa, botones "Acercar" / "Restablecer ámbito"
  y contadores "En esta vista" — el mapa encuadra con zoom animado y margen sobre la zona elegida.
- **Puntos críticos ANA** *(solo Tumbes)*: fichas técnicas asignadas al MVCS.
- **Escenarios FEN y presupuesto** *(solo Tumbes)*: comparativo de escenarios con gráfico de barras.
- **Activos y personal**: flota de maquinaria y equipo de la UBO de cada región.
- **Galería**: fotografías reales de intervenciones ejecutadas, con lightbox.

Todo el contenido (cifras, tablas, textos normativos y fotografías) proviene de los PPT
originales de cada región. Dos tablas del PPT de Puno (programadas y activos) venían como
capturas de imagen en vez de texto; se transcribieron a mano verificando que los totales cuadren.
En el PPT de Puno, la fila "Total general" de la tabla de ejecutadas venía copiada por error del
reporte de Tumbes — aquí se muestra el total recalculado a partir de las filas por tipo de
actividad (34 intervenciones, no 43).

## Requisitos

- Node.js 20+
- npm

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

## Compilar para producción

```bash
npm run build
npm run preview   # para previsualizar el build de dist/
```

## Publicarlo en tu repositorio de GitHub

1. Crea un repositorio nuevo en GitHub (o usa uno existente) y **no** lo inicialices con README.
2. Desde esta carpeta:

   ```bash
   git init
   git add .
   git commit -m "Sitio PNC Maquinarias — Tumbes, Puno y Tacna"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/<tu-repo>.git
   git push -u origin main
   ```

3. Para publicarlo gratis con **GitHub Pages**, ya incluí el workflow
   `.github/workflows/deploy.yml`: en tu repositorio ve a **Settings → Pages** y en
   "Build and deployment" elige **Source: GitHub Actions**. Cada `push` a `main`
   compilará y publicará el sitio automáticamente en
   `https://<tu-usuario>.github.io/<tu-repo>/`.

   Alternativa manual sin Actions:

   ```bash
   npm run build
   npm install -D gh-pages
   npx gh-pages -d dist
   ```

## Agregar una región nueva

1. Crea `src/data/regions/<region>.js` copiando la forma de `puno.js` o `tacna.js` (deja
   `puntosCriticos: null` y `escenarios: null` si esa región no los tiene).
2. Agrega sus fotos a `src/assets/photos/` con el prefijo `<region>-1.jpg` … `<region>-4.jpg`.
3. Regístrala en `src/data/regions/index.js`.
4. Para que el mapa muestre sus puntos, agrega un arreglo `<region>: [...]` en
   `src/data/mapaIntervenciones.js` (mismo formato que `tumbes`/`puno`/`tacna`: cada punto con
   `lat`, `lng`, `estado` — "Ejecutada" o "En ejecución" — y los demás campos de ficha técnica).
5. Para que el filtro territorial dibuje los límites reales de la región nueva, agrega su entrada
   en `src/data/mapaLimites.js` (ver sección siguiente).

El selector de región y las secciones condicionales se actualizan solos — no hay que tocar
ningún componente.

## Actualizar los datos del mapa

`src/data/mapaIntervenciones.js` se generó a partir de un export Excel del sistema del PNC
(columnas `LAT`/`LONG`, `ESTADO`, `FICHA_TEC`, etc.). Para refrescarlo con una nueva descarga,
filtra las filas de Tumbes/Puno/Tacna con `ESTADO` "EJECUTADA" o "EN EJECUCIÓN" y regenera el
arreglo con esa misma forma — no hace falta tocar el componente del mapa.

`src/data/mapaLimites.js` trae los límites geográficos reales (departamento, provincia y distrito)
que el mapa resalta cuando filtras por provincia/distrito — igual que el mapa de ReporteRiesgos,
pero con la forma real del territorio en vez de un simple rectángulo. Viene de
[juaneladio/peru-geojson](https://github.com/juaneladio/peru-geojson) (fuente INEI), con las
coordenadas redondeadas a 5 decimales para aligerar el archivo. Dos distritos de la data del PNC
("San Miguel" en San Román, Puno, y "La Yarada - Los Palos" en Tacna) no existen en esa fuente —
en esos dos casos el mapa resalta el límite de la provincia como respaldo. Para agregar una región
nueva, descarga las geometrías de departamento/provincia/distrito correspondientes de esa misma
fuente (o de otra con el mismo formato) y agrégalas con la misma estructura.

## Estructura

```
src/
  components/              # secciones de la página (Hero, Panorama, MapaIntervenciones, etc.)
  data/regions/             # un archivo de datos por región (tumbes.js, puno.js, tacna.js)
  data/shared.js            # contenido normativo compartido por las 3 regiones
  data/mapaIntervenciones.js # puntos georreferenciados (ejecutadas + en ejecución) por región
  assets/                    # logotipos y fotografías extraídas de los PPT originales
  lib/                       # helpers de formato de números/moneda
```

## Stack

React 19 · Vite 8 · Tailwind CSS v4 · Framer Motion · Recharts · Leaflet · react-icons
