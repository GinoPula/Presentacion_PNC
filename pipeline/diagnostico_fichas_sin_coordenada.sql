-- Diagnóstico: intervenciones EJECUTADA / EN EJECUCIÓN del periodo 2026 que NO tienen
-- coordenada (lat/long) cargada -- estas son las que hoy NO llegan a mapaIntervenciones.js
-- y por eso no aparecen en el cuadro PROVINCIA/DISTRITO del Ayuda Memoria.
--
-- Corre esto tal cual, o cambia el IN (...) / periodo si quieres ver otra región/año.

SELECT
    inte.departamento,
    inte.ficha_tec,
    inte.estado,
    inte.provincia,
    inte.distrito,
    inte.tipo,
    inte.descripcion,
    inte.lat,
    inte.long,
    TO_CHAR(inte.fecha_inicio, 'DD/MM/YYYY') AS fecha_inicio,
    TO_CHAR(inte.fecha_fin, 'DD/MM/YYYY')    AS fecha_fin
FROM pnc.tb_em_intervencion inte
WHERE upper(inte.departamento) IN ('LA LIBERTAD', 'ANCASH')
  AND inte.periodo = '2026'
  AND inte.estado IN ('EJECUTADA', 'EN EJECUCIÓN')
  AND (inte.lat IS NULL OR inte.long IS NULL)
ORDER BY inte.departamento, inte.ficha_tec;


-- Variante: mismas EJECUTADA/EN EJECUCIÓN de esas 2 regiones, pero CON coordenada cargada
-- y que aun así no cae dentro del departamento (coordenada corrupta/mal ubicada) -- por si
-- el hueco no es "sin coordenada" sino "coordenada mala". No se puede filtrar 100% en SQL
-- (la corrección de UTM/signo la hace el script en Python), pero esto ayuda a ubicarlas:
-- los rangos aproximados son La Libertad lat entre -9.12 y -6.80, long entre -79.84 y -76.75;
-- Ancash lat entre -10.90 y -7.90, long entre -78.79 y -76.58.

SELECT
    inte.departamento,
    inte.ficha_tec,
    inte.estado,
    inte.provincia,
    inte.distrito,
    inte.lat,
    inte.long
FROM pnc.tb_em_intervencion inte
WHERE upper(inte.departamento) = 'LA LIBERTAD'
  AND inte.periodo = '2026'
  AND inte.estado IN ('EJECUTADA', 'EN EJECUCIÓN')
  AND inte.lat IS NOT NULL AND inte.long IS NOT NULL
  AND (inte.lat NOT BETWEEN -9.12 AND -6.80 OR inte.long NOT BETWEEN -79.84 AND -76.75)

UNION ALL

SELECT
    inte.departamento,
    inte.ficha_tec,
    inte.estado,
    inte.provincia,
    inte.distrito,
    inte.lat,
    inte.long
FROM pnc.tb_em_intervencion inte
WHERE upper(inte.departamento) = 'ANCASH'
  AND inte.periodo = '2026'
  AND inte.estado IN ('EJECUTADA', 'EN EJECUCIÓN')
  AND inte.lat IS NOT NULL AND inte.long IS NOT NULL
  AND (inte.lat NOT BETWEEN -10.90 AND -7.90 OR inte.long NOT BETWEEN -78.79 AND -76.58)

ORDER BY departamento, ficha_tec;
