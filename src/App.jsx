import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import HeroGlobal from './components/HeroGlobal'
import Panorama from './components/Panorama'
import PanoramaGlobal from './components/PanoramaGlobal'
import Clasificacion from './components/Clasificacion'
import TiposIntervencion from './components/TiposIntervencion'
import Intervenciones from './components/Intervenciones'
import Programadas from './components/Programadas'
import MapaIntervenciones from './components/MapaIntervenciones'
import PresupuestoGeneral from './components/PresupuestoGeneral'
import MaquinariaGeneral from './components/MaquinariaGeneral'
import GaleriaGlobal from './components/GaleriaGlobal'
import PuntosCriticos from './components/PuntosCriticos'
import Escenarios from './components/Escenarios'
import Activos from './components/Activos'
import Galeria from './components/Galeria'
import AdminPanel from './components/AdminPanel'
import Footer from './components/Footer'
import { regions, GLOBAL_ID, DEFAULT_VIEW } from './data/regions'
import { globalData } from './data/global'

export default function App() {
  const [regionId, setRegionId] = useState(DEFAULT_VIEW)
  const isGlobal = regionId === GLOBAL_ID
  const data = isGlobal ? globalData : regions[regionId]

  function handleRegionChange(id) {
    setRegionId(id)
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }

  return (
    <div className="min-h-screen bg-surface-0 text-ink antialiased">
      <Nav data={data} regionId={regionId} onRegionChange={handleRegionChange} />
      <main key={regionId}>
        {isGlobal ? (
          <>
            <HeroGlobal onRegionChange={handleRegionChange} />
            <PanoramaGlobal />
            <Clasificacion />
            <TiposIntervencion />
            <MapaIntervenciones isGlobal regionId={regionId} />
            <PresupuestoGeneral />
            <MaquinariaGeneral />
            <GaleriaGlobal />
          </>
        ) : (
          <>
            <Hero data={data} regionId={regionId} onRegionChange={handleRegionChange} />
            <Panorama data={data} />
            <Intervenciones data={data} />
            <Programadas data={data} />
            <MapaIntervenciones regionId={regionId} shortLabel={data.shortLabel} />
            {data.puntosCriticos && <PuntosCriticos data={data} />}
            {data.escenarios && <Escenarios data={data} />}
            <Activos data={data} />
            <Galeria data={data} />
          </>
        )}
      </main>
      <Footer data={data} />
      <AdminPanel regionId={regionId} isGlobal={isGlobal} />
    </div>
  )
}
