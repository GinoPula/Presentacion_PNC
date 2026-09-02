import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiOutlineLocationMarker, HiOutlineGlobeAlt, HiOutlineChevronDown, HiOutlineCheck } from 'react-icons/hi'
import { VIEW_LIST, GLOBAL_ID } from '../data/regions'

export default function RegionSwitcher({ regionId, onChange, variant = 'desktop' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const current = VIEW_LIST.find((r) => r.id === regionId)
  const CurrentIcon = regionId === GLOBAL_ID ? HiOutlineGlobeAlt : HiOutlineLocationMarker

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  function select(id) {
    setOpen(false)
    if (id !== regionId) onChange(id)
  }

  const isMobile = variant === 'mobile'

  return (
    <div ref={ref} className={`relative ${isMobile ? 'w-full' : ''}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] pl-3.5 pr-3 py-2 text-[13px] font-semibold text-ink transition-colors hover:bg-white/[0.1] ${
          isMobile ? 'w-full justify-between' : ''
        }`}
      >
        <span className="flex items-center gap-2">
          <CurrentIcon className="text-brand-soft" />
          {current?.shortLabel ?? 'Región'}
        </span>
        <HiOutlineChevronDown className={`text-ink-mute transition-transform duration-200 ${open ? 'rotate-180' : ''}`} size={14} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute z-50 mt-2 min-w-[200px] max-h-[min(70vh,26rem)] overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-surface-2/95 p-1.5 shadow-2xl backdrop-blur-md ${
              isMobile ? 'left-0 right-0' : 'right-0'
            }`}
          >
            {VIEW_LIST.map((r, i) => (
              <li key={r.id}>
                <button
                  role="option"
                  aria-selected={r.id === regionId}
                  onClick={() => select(r.id)}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm transition-colors ${
                    r.id === regionId ? 'bg-brand/15 text-brand-soft' : 'text-ink-dim hover:bg-white/[0.06] hover:text-ink'
                  } ${i === 0 ? 'mb-1 border-b border-white/[0.06] pb-2.5' : ''}`}
                >
                  {r.label}
                  {r.id === regionId && <HiOutlineCheck size={16} />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
