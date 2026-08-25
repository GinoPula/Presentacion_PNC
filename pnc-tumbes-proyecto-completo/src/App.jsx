import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Panorama from './components/Panorama'
import Clasificacion from './components/Clasificacion'
import TiposIntervencion from './components/TiposIntervencion'
import Intervenciones from './components/Intervenciones'
import Programadas from './components/Programadas'
import MapaIntervenciones from './components/MapaIntervenciones'
import PuntosCriticos from './components/PuntosCriticos'
import Escenarios from './components/Escenarios'
import Activos from './components/Activos'
import Galeria from './components/Galeria'
import Footer from './components/Footer'
import { regions, DEFAULT_REGION } from './data/regions'

export default function App() {
  const [regionId, setRegionId] = useState(DEFAULT_REGION)
  const data = regions[regionId]

  function handleRegionChange(id) {
    setRegionId(id)
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }

  return (
    <div className="min-h-screen bg-surface-0 text-ink antialiased">
      <Nav data={data} regionId={regionId} onRegionChange={handleRegionChange} />
      <main key={regionId}>
        <Hero data={data} regionId={regionId} onRegionChange={handleRegionChange} />
        <Panorama data={data} />
        <Clasificacion />
        <TiposIntervencion />
        <Intervenciones data={data} />
        <Programadas data={data} />
        <MapaIntervenciones regionId={regionId} shortLabel={data.shortLabel} />
        {data.puntosCriticos && <PuntosCriticos data={data} />}
        {data.escenarios && <Escenarios data={data} />}
        <Activos data={data} />
        <Galeria data={data} />
      </main>
      <Footer data={data} />
    </div>
  )
}
