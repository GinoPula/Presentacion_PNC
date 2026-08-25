# Automatización PNC Maquinarias — de "manual" a "solo se actualiza solo"

Esto reemplaza el flujo anterior (correr un script, pegarme el resultado, yo te
devuelvo un `index.html`, lo subes a mano a GitHub) por uno donde tu laptop
actualiza el sitio solo, con tu acceso directo a Producción.

Hay 3 piezas. Las 3 hay que dejarlas armadas una vez; después no se vuelven a
tocar (salvo que cambie algo grande, como agregar una región nueva).

1. Subir este proyecto a tu repo de GitHub (una sola vez).
2. Prender GitHub Pages con "Source: GitHub Actions" (una sola vez).
3. Programar `generar_todas_regiones.py` en tu laptop con el Programador de
   tareas de Windows (una sola vez) — de ahí en adelante, cada vez que corra,
   actualiza los datos y los sube solo.

---

## 1. Subir el proyecto a GitHub (una sola vez)

Hoy tu repo (el que usas para "Presentacion_PNC" o como se llame) solo tiene
el `index.html` que subías a mano. Vamos a reemplazar eso por el proyecto
completo (el código fuente, no el archivo compilado) para que GitHub Actions
lo compile automáticamente en cada cambio.

Desde la carpeta del proyecto (`pnc-tumbes`, la que te compartí):

```bash
git init
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git add .
git commit -m "Primera subida del proyecto completo (antes solo estaba el index.html a mano)"
git branch -M main
git push -u origin main --force
```

**El `--force` en el último paso pisa lo que haya en el repo hoy** (el
`index.html` viejo subido a mano). Es lo que queremos, porque de ahora en
adelante el `index.html` publicado sale de compilar este proyecto, no de
subirlo a mano. Si tienes dudas, antes de este paso puedes bajar una copia del
repo actual como respaldo.

## 2. Prender GitHub Pages con GitHub Actions (una sola vez)

Ya viene incluido en el proyecto el archivo `.github/workflows/deploy.yml`,
que compila el sitio y lo publica automáticamente cada vez que subes algo a
la rama `main`. Falta un solo clic para activarlo:

1. En GitHub, entra al repo → **Settings** → **Pages** (menú de la izquierda).
2. En "Build and deployment" → "Source", elige **GitHub Actions** (en vez de
   "Deploy from a branch", que es como debe estar hoy si el sitio se subía a
   mano).
3. Listo. Después del push del paso 1, entra a la pestaña **Actions** del
   repo y deberías ver el flujo "Deploy a GitHub Pages" corriendo. Cuando
   termine (ícono verde), tu sitio va a estar en
   `https://TU-USUARIO.github.io/TU-REPO/` (o tu dominio, si tienes uno
   configurado).

De acá en adelante, **cada vez que se suba un cambio a `main` — lo suba el
script automático o lo subas tú a mano — el sitio se recompila y publica
solo**, sin que nadie tenga que generar un `index.html` y subirlo.

## 3. Programar la actualización automática de datos (una sola vez)

Esta es la pieza que elimina el paso manual de "correr el script, mandarle el
resultado a Claude". `pipeline/generar_todas_regiones.py` (en esta misma
carpeta del proyecto) hace todo en un solo paso: consulta Producción para las
7 regiones, escribe los datos directo en el código fuente del sitio, y sube
el cambio a GitHub — lo cual dispara el paso 2 automáticamente.

### 3.1 Instalar lo necesario (una sola vez, en tu laptop)

```bash
cd pipeline
pip install -r requirements.txt
```

### 3.2 Probarlo a mano primero

Antes de programarlo, corre esto una vez a mano (conectado a la VPN de
VIVIENDA) para confirmar que funciona igual que el script que ya probaste:

```bash
cd pipeline
python generar_todas_regiones.py --repo "C:\ruta\a\tu\pnc-tumbes"
```

Te va a pedir servidor/base/usuario/contraseña igual que antes. Revisa que
los números impresos (ejecutadas, programadas, convenios, flota) tengan
sentido para cada región, y de paso mira los archivos que cambió con
`git diff` para asegurarte de que se ve bien. Si todo está bien, confirma que
también funciona con `--git-commit` (esto sí hace commit, pero no push):

```bash
python generar_todas_regiones.py --repo "C:\ruta\a\tu\pnc-tumbes" --git-commit
```

### 3.3 Contraseña sin tener que tipearla cada vez

Para que el Programador de tareas lo corra solo (sin que nadie esté sentado
para tipear la contraseña), el script busca un archivo llamado
`credenciales_pnc.env` en la MISMA carpeta que `generar_todas_regiones.py`.
Si existe, lee las credenciales de ahí. Este archivo **nunca se sube a
GitHub** (ya está en `.gitignore`).

Créalo una vez, en `pipeline/credenciales_pnc.env`, con este contenido (con
tus datos reales):

```
PGHOST=S01pgeo001.vivienda.gob.pe
PGPORT=5432
PGDATABASE=nombre_de_la_base
PGUSER=vivienda\mvcs_pnc_gfpg
PGPASSWORD=tu_contraseña
```

**Aviso de seguridad, léelo:** esto deja tu contraseña de Producción guardada
en texto plano en tu laptop. Es el trade-off inevitable de que algo corra
"solo" sin que nadie tipee nada — cualquier automatización desatendida
necesita la contraseña guardada en algún lado. Para que sea lo más seguro
posible:

- Ese archivo queda SOLO en tu laptop, nunca se sube a ningún repo (ya está
  en `.gitignore` -- revísalo con `git status` después de crearlo: no debería
  aparecer como "untracked" para subir).
- Si tu laptop tiene BitLocker o cifrado de disco activado (normalmente sí,
  en un equipo institucional), el archivo queda protegido si te roban el
  equipo apagado.
- Si en algún momento cambias la contraseña de esa cuenta de base de datos,
  actualiza también este archivo.
- Si prefieres NO guardar la contraseña en disco, la alternativa es correr el
  script a mano cada vez que quieras actualizar (sin programarlo) -- ahí sí
  te la pide por consola y no queda guardada en ningún lado. Es la única
  forma de evitar tenerla en disco, a costa de volver a ser "manual".

### 3.4 Programarlo con el Programador de tareas de Windows

1. Abre **Programador de tareas** (busca "Task Scheduler" en el menú Inicio).
2. **Crear tarea básica...**
   - Nombre: `Actualizar datos PNC Maquinarias`
   - Desencadenador: el que prefieras -- por ejemplo, diario a una hora en
     que sepas que vas a estar conectado a la VPN de VIVIENDA (el script no
     hace nada si no hay conexión a la base, simplemente falla esa corrida y
     lo intenta de nuevo en el próximo horario).
   - Acción: **Iniciar un programa**.
     - Programa/script: la ruta a tu `python.exe` (ej.
       `C:\Users\TU_USUARIO\AppData\Local\Programs\Python\Python312\python.exe`
       -- confírmala con `where python` en una consola).
     - Agregar argumentos:
       `generar_todas_regiones.py --repo "C:\ruta\a\tu\pnc-tumbes" --git-push`
     - Iniciar en (carpeta): `C:\ruta\a\tu\pnc-tumbes\pipeline`
3. Termina el asistente. Puedes probarlo de inmediato haciendo clic derecho
   sobre la tarea → **Ejecutar**, y revisando que los archivos en
   `src/data/regions/_generated/` se hayan actualizado y que el commit
   aparezca en GitHub.

De ahí en adelante: cada vez que la tarea corra (con la laptop prendida y
conectada a la VPN de VIVIENDA), consulta Producción, actualiza los 7
archivos de datos, hace commit y push -- y eso dispara la compilación y
publicación automática del paso 2. Cero pasos manuales.

---

## Qué SÍ queda automático

- Intervenciones ejecutadas, en ejecución y programadas (con avance real).
- Convenios vigentes.
- Flota (cantidad, estado operativo/inoperativo, códigos) -- incluyendo las
  notas de mantenimiento que ya estaban escritas (el script las conserva
  mientras la máquina siga en el mismo estado y con el mismo código; ver el
  punto 2 de "Limitaciones" abajo para cuándo hay que escribir una nueva a
  mano).
- Compilación y publicación del sitio (GitHub Actions).

## Qué sigue siendo manual (a propósito -- no viene de la base de datos)

- Fotos de la galería.
- Puntos críticos ANA (vienen de un Excel aparte que sube la ANA).
- Escenarios FEN / presupuesto (vienen de un Excel nacional que hoy solo
  cubre las regiones del norte).
- Personal de cada UBO.
- Fuentes (el pie de cada región).
- Los límites geográficos del mapa (vienen de una fuente pública distinta,
  no de Producción).
- Agregar una región completamente nueva (hay que armar esas secciones a
  mano la primera vez -- después de eso, sus datos de intervenciones/
  convenios/flota sí quedan automáticos agregándola a la lista
  `DEPARTAMENTOS` en `generar_todas_regiones.py`).

## Limitaciones de la traducción automática (para que no te sorprenda un cambio de formato)

1. **Tipos y marcas de maquinaria nuevos**: la base los da en mayúsculas. El
   script trae un diccionario armado con todo lo que ya aparece hoy en las 7
   regiones (Excavadora hidráulica, Camión cisterna de agua, Caterpillar,
   John Deere, etc.). Si aparece una marca o tipo de máquina que nunca se
   había visto, el script lo va a mostrar en pantalla con una advertencia y
   lo va a guardar igual (no se pierde ninguna máquina), solo que con una
   capitalización más simple. Avísame o edita el diccionario
   (`TRAD_TIPO`/`TRAD_MARCA` al inicio del script) cuando salga una
   advertencia de estas.
2. **Notas de mantenimiento nuevas**: si una máquina que hoy está operativa
   pasa a inoperativa en una corrida futura, el script no puede inventar por
   qué (esa explicación la escribe alguien de PNC, no está en la base). La
   máquina va a aparecer igual, sin nota. Si quieres que tenga la nota, hay
   que agregarla a mano una vez en el `_generated/<region>.js`
   correspondiente -- de ahí en adelante, mientras la máquina siga
   inoperativa con ese mismo código, el script la conserva sola.
3. **Nombres de distrito/provincia**: se pasan por mayúscula-inicial simple.
   Tildes que la base no tiene en nombres propios (ej. "San José de los
   Molinos") no se restauran solas.
4. **Convenios**: si son 10 o menos, se listan uno por uno con fecha de
   vencimiento (y aviso "a un mes de caducar" si falta poco). Si son más de
   10, se agrupan por nivel de gobierno en un resumen -- igual que ya pasa
   hoy en Piura y Puno.

Si alguna de estas simplificaciones no te convence para algún caso puntual,
dímelo y ajustamos la regla en el script -- no hay que volver a lo manual
para eso.
