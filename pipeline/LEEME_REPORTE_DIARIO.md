# Reporte Diario — que se actualice solo desde Producción

Esto agrega una segunda tarea programada, separada de `generar_todas_regiones.py`
(esa sigue igual, sin tocar). Esta nueva (`generar_reporte_diario_live.py`) se
conecta EN VIVO a Producción y actualiza el consolidado nacional de intervenciones
"EN EJECUCIÓN" que usa el botón **Reporte Diario** del sitio — sin exportar Excel a
mano ni subírmelo a mí.

## 1. Probarlo a mano primero

Con la VPN de VIVIENDA conectada:

```bash
cd pipeline
python generar_reporte_diario_live.py --repo "C:\ruta\a\tu\pnc-tumbes"
```

Te pide servidor/base/usuario/contraseña igual que `generar_todas_regiones.py` (si
ya tienes `credenciales_pnc.env` armado para ese script, este reusa el mismo
archivo — no hay que crear otro). Revisa el número de intervenciones que imprime al
final y, si quieres, abre `src/data/reporteDiario.json` para confirmar que se ve
bien. Recién ahí prueba con `--git-commit` (hace commit, no push):

```bash
python generar_reporte_diario_live.py --repo "C:\ruta\a\tu\pnc-tumbes" --git-commit
```

**Resuelto (de dónde sale):** `marco_legal` sí existe tal cual en
`pnc.tb_em_intervencion`. La maquinaria asignada NO es una columna plana -- vive en
la tabla puente N:M `pnc.tb_em_intervencion_maquinaria` (id_intervencion,
cod_activo), cruzada con el catálogo `pnc.fc_em_maquinaria_1` (codigo →
tipo_unidad/marca/modelo) -- mismo patrón que ya usan `M_avance_pnc.php` /
`M_asigna_activo.php`. Los scripts `diagnosticar_maquinaria.py` y
`diagnosticar_maquinaria_v2.py` ya cumplieron su propósito (encontrar esa tabla) --
se pueden borrar de esta carpeta cuando quieras, no hace falta programarlos ni
volver a correrlos.

**Pendiente (permiso):** la primera corrida con el join dio
`permission denied for table tb_em_intervencion_maquinaria` -- el usuario de
`credenciales_pnc.env` puede leer `tb_em_intervencion` y `fc_em_maquinaria_1`, pero
no tiene permiso de lectura sobre la tabla puente. El script ya quedó preparado para
esto: la maquinaria se trae en una consulta APARTE del resto del reporte, así que si
ese permiso sigue faltando, el reporte se genera igual (departamento, provincia,
tipo, marco legal, descripción, fechas) y solo la maquinaria queda vacía, con un
aviso por consola -- nunca se cae la corrida completa por esto.

Para que sí traiga la maquinaria, pide a quien administre la base de Producción que
corra (con el nombre real de tu usuario, el mismo de `PGUSER` en
`credenciales_pnc.env`):

```sql
GRANT SELECT ON pnc.tb_em_intervencion_maquinaria TO "tu_usuario_aqui";
```

Vuelve a correr la prueba manual:

```bash
python generar_reporte_diario_live.py --repo "C:\ruta\a\tu\pnc-tumbes"
```

Si ves el aviso `[!] No se pudo traer la maquinaria asignada...`, todavía falta ese
permiso (revisa igual que el resto del reporte haya salido bien). Si no sale el
aviso, abre `src/data/reporteDiario.json` y confirma que el campo `maquinaria` ya
viene lleno en vez de vacío.

## 2. Programarlo con el Programador de tareas de Windows

Igual que el otro, pero como tarea aparte:

1. **Programador de tareas** → **Crear tarea básica...**
   - Nombre: `Actualizar Reporte Diario PNC`
   - Desencadenador: **Repetir tarea cada** 15 o 30 minutos (el que prefieras),
     indefinidamente, mientras la laptop esté prendida.
   - Acción: **Iniciar un programa**.
     - Programa/script: la ruta a tu `python.exe`.
     - Agregar argumentos:
       `generar_reporte_diario_live.py --repo "C:\ruta\a\tu\pnc-tumbes" --git-push`
     - Iniciar en (carpeta): `C:\ruta\a\tu\pnc-tumbes\pipeline`
2. Pruébala de inmediato con clic derecho → **Ejecutar**, y confirma que aparece un
   commit nuevo en GitHub (si no había cambios desde la corrida anterior, no hace
   commit — eso es normal, no un error).

De ahí en adelante: cada 15-30 minutos (mientras la laptop esté prendida y
conectada a la VPN), el reporte se refresca solo y el sitio se recompila y publica
solo (mismo GitHub Action que ya tienes). El botón "Reporte Diario" del sitio
siempre va a mostrar la última corrida, con su fecha/hora de corte real.

## Por qué así, y no un botón que consulte la base en cada clic

El sitio (GitHub Pages) es 100% estático — no tiene backend propio. Para que
alguien lo abriera desde cualquier lado y el botón consultara la base al toque,
haría falta exponer un servicio conectado a Producción hacia internet, corriendo
en tu laptop las 24 horas — eso es abrir una puerta nueva desde tu red interna
hacia afuera, y deja de funcionar si la laptop está apagada. El refresco
automático cada 15-30 minutos consigue el mismo resultado práctico (nadie exporta
ni sube nada a mano, el dato sale directo de Producción) sin ese riesgo ni esa
dependencia. Si más adelante cambia el contexto (por ejemplo, si llegan a tener un
servidor propio con IP pública), se puede revisar esta decisión.
