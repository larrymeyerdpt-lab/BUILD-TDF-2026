import { useMemo, useState, useRef, useEffect } from 'react'
import { MapContainer, TileLayer, Polyline, CircleMarker, useMap, Tooltip } from 'react-leaflet'

// linear interpolation of a value along the profile at distance `km`
function sampleAt(points, km) {
  if (km <= points[0].km) return points[0]
  const last = points[points.length - 1]
  if (km >= last.km) return last
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i], b = points[i + 1]
    if (km >= a.km && km <= b.km) {
      const t = (km - a.km) / (b.km - a.km || 1)
      return {
        km,
        ele: a.ele + (b.ele - a.ele) * t,
        lat: a.lat + (b.lat - a.lat) * t,
        lng: a.lng + (b.lng - a.lng) * t,
        label: t < 0.5 ? a.label : b.label,
      }
    }
  }
  return last
}

function MapController({ bounds, follow }) {
  const map = useMap()
  const didFit = useRef(false)
  useEffect(() => {
    // iOS Safari often mounts the map before the container has its final size;
    // nudge it to re-measure, then fit the route.
    const kick = () => map.invalidateSize()
    const t1 = setTimeout(kick, 50)
    const t2 = setTimeout(() => {
      kick()
      if (!didFit.current) {
        map.fitBounds(bounds, { padding: [30, 30] })
        didFit.current = true
      }
    }, 300)
    window.addEventListener('orientationchange', kick)
    window.addEventListener('resize', kick)
    return () => { clearTimeout(t1); clearTimeout(t2); window.removeEventListener('orientationchange', kick); window.removeEventListener('resize', kick) }
  }, [bounds, map])
  useEffect(() => {
    if (follow) map.panTo([follow.lat, follow.lng], { animate: true, duration: 0.25 })
  }, [follow, map])
  return null
}

const W = 700, H = 240, PADL = 46, PADR = 48, PADT = 76, PADB = 8
const M_TO_FT = 3.28084

export default function StageProfile({ stage }) {
  const pts = stage.profile
  const [pos, setPos] = useState(0)
  const [followOn, setFollowOn] = useState(true)

  const { minE, maxE } = useMemo(() => {
    const es = pts.map((p) => p.ele)
    return { minE: Math.min(...es), maxE: Math.max(...es) }
  }, [pts])

  const x = (km) => PADL + (km / stage.km) * (W - PADL - PADR)
  const y = (ele) => {
    const span = Math.max(maxE - minE, 50)
    return PADT + (1 - (ele - minE) / span) * (H - PADT - PADB)
  }

  const areaPath = useMemo(() => {
    let d = `M ${x(pts[0].km)} ${H - PADB}`
    pts.forEach((p) => { d += ` L ${x(p.km)} ${y(p.ele)}` })
    d += ` L ${x(pts[pts.length - 1].km)} ${H - PADB} Z`
    return d
  }, [pts, minE, maxE]) // eslint-disable-line

  const linePath = useMemo(() => {
    return 'M ' + pts.map((p) => `${x(p.km)} ${y(p.ele)}`).join(' L ')
  }, [pts, minE, maxE]) // eslint-disable-line

  const cur = sampleAt(pts, pos)
  const ticks = useMemo(() => {
    const span = Math.max(maxE - minE, 50)
    const vals = span >= 120 ? [minE, minE + span / 2, minE + span] : [minE, minE + span]
    return [...new Set(vals.map((v) => Math.round(v)))]
  }, [minE, maxE])
  const bounds = useMemo(() => pts.map((p) => [p.lat, p.lng]), [pts])
  const routeLatLng = useMemo(() => (stage.route && stage.route.length > 1 ? stage.route : bounds), [stage, bounds])

  // cumulative km along the dense road line, scaled to the official stage length,
  // so the red marker rides ON the drawn road instead of cutting between profile points
  const routeCum = useMemo(() => {
    const R = 6371
    const cum = [0]
    for (let i = 1; i < routeLatLng.length; i++) {
      const [la1, lo1] = routeLatLng[i - 1], [la2, lo2] = routeLatLng[i]
      const dla = (la2 - la1) * Math.PI / 180, dlo = (lo2 - lo1) * Math.PI / 180
      const a = Math.sin(dla / 2) ** 2 + Math.cos(la1 * Math.PI / 180) * Math.cos(la2 * Math.PI / 180) * Math.sin(dlo / 2) ** 2
      cum.push(cum[i - 1] + 2 * R * Math.asin(Math.sqrt(a)))
    }
    const total = cum[cum.length - 1] || 1
    const scale = stage.km / total
    return cum.map((d) => d * scale)
  }, [routeLatLng, stage.km])

  const markerLL = useMemo(() => {
    const km = Math.min(pos, stage.km)
    let lo = 0, hi = routeCum.length - 1
    while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (routeCum[mid] <= km) lo = mid; else hi = mid }
    const seg = routeCum[hi] - routeCum[lo] || 1
    const t = Math.max(0, Math.min(1, (km - routeCum[lo]) / seg))
    const [la1, lo1] = routeLatLng[lo], [la2, lo2] = routeLatLng[hi]
    return [la1 + (la2 - la1) * t, lo1 + (lo2 - lo1) * t]
  }, [pos, routeCum, routeLatLng, stage.km])

  const poiColor = { start: '#23a94b', finish: '#e0242b', climb: '#ffe100', town: '#928f9c' }
  const catColor = { HC: '#17161a', '1': '#e0242b', '2': '#e89b2c', '3': '#23a94b', '4': '#6f6c78', '': '#e0242b' }
  const climbPts = useMemo(() => (stage.climbPts || []).map((c) => {
    const s = sampleAt(pts, c.km)
    return { ...c, yEle: s.ele, lat: c.lat ?? s.lat, lng: c.lng ?? s.lng }
  }), [pts, stage])
  const climbRows = useMemo(() => {
    let lastX = -1e9, lastRow = 1
    return climbPts.map((c) => {
      const cx = PADL + (c.km / stage.km) * (W - PADL - PADR)
      const row = (cx - lastX < 100) ? (lastRow === 0 ? 1 : 0) : 0
      lastX = cx; lastRow = row
      return row
    })
  }, [climbPts, stage.km])

  return (
    <div>
      <div className="profile-wrap">
        <div className="profile-readout">
          <div>
            <div className="readout-km mono">{pos.toFixed(1)}<span style={{ fontSize: 13, color: 'var(--muted)' }}> / {stage.km} km</span></div>
            <div className="readout-ele mono">{Math.round(cur.ele)} m / {Math.round(cur.ele * M_TO_FT)} ft</div>
          </div>
          <div className="readout-loc">{cur.label || '—'}</div>
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Stage elevation profile">
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,225,0,.34)" />
              <stop offset="100%" stopColor="rgba(255,225,0,.02)" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill="url(#grad)" />
          {/* elevation gridlines + dual axis: metres (left) / feet (right) */}
          {ticks.map((e, i) => {
            const yy = y(e)
            return (
              <g key={`t${i}`}>
                <line x1={PADL} y1={yy} x2={W - PADR} y2={yy} stroke="#37353f" strokeWidth="1" opacity="0.6" />
                <text x={PADL - 6} y={yy + 3} textAnchor="end" fontSize="11" fill="#928f9c" fontFamily="'IBM Plex Mono', monospace">{e} m</text>
                <text x={W - PADR + 6} y={yy + 3} textAnchor="start" fontSize="11" fill="#928f9c" fontFamily="'IBM Plex Mono', monospace">{Math.round(e * M_TO_FT)} ft</text>
              </g>
            )
          })}
          <path d={linePath} fill="none" stroke="#ffe100" strokeWidth="2" strokeLinejoin="round" />
          {/* POI dots */}
          {pts.map((p, i) => (
            p.poi && !(p.poi === 'climb' && climbPts.length) ? <circle key={i} cx={x(p.km)} cy={y(p.ele)} r="3.5" fill={poiColor[p.poi] || '#928f9c'} stroke="#17161a" strokeWidth="1" /> : null
          ))}
          {/* categorized climb summits — badge sits above the peak; dot marks the summit */}
          {climbPts.map((c, i) => {
            const cx = x(c.km), cy = y(c.yEle)
            const off = climbRows[i] * 22
            const topY = cy - 16 - off
            const isHC = c.cat === 'HC'
            const bw = isHC ? 20 : 15
            const anchor = cx < 72 ? 'start' : cx > W - 72 ? 'end' : 'middle'
            const detail = c.len != null ? `${c.len} km @ ${c.grad}%` : ''
            const name = c.ele != null ? `${c.name} · ${c.ele} m` : c.name
            return (
              <g key={`c${i}`}>
                <line x1={cx} y1={cy} x2={cx} y2={topY} stroke="#ece9e0" strokeWidth="1" opacity="0.5" />
                <circle cx={cx} cy={cy} r="3" fill={catColor[c.cat] || '#e0242b'} stroke="#ece9e0" strokeWidth="1" />
                <rect x={cx - bw / 2} y={topY - 13} width={bw} height="13" rx="3" fill={catColor[c.cat] || '#e0242b'} stroke="#ece9e0" strokeWidth="0.5" />
                <text x={cx} y={topY - 3} textAnchor="middle" fontSize={isHC ? 8 : 9} fontWeight="700" fill="#fff" fontFamily="'Barlow Condensed', sans-serif">{c.cat || 'F'}</text>
                <text x={cx} y={topY - 16} textAnchor={anchor} fontSize="9.5" fontWeight="600" fill="#ece9e0" fontFamily="'Barlow', sans-serif">{name}</text>
                {detail && <text x={cx} y={topY - 27} textAnchor={anchor} fontSize="8.5" fill="#b8b5c0" fontFamily="'IBM Plex Mono', monospace">{detail}</text>}
              </g>
            )
          })}
          {/* marker line */}
          <line x1={x(pos)} y1={PADT - 8} x2={x(pos)} y2={H - PADB} stroke="#fff" strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />
          <circle cx={x(pos)} cy={y(cur.ele)} r="5.5" fill="#fff" stroke="#e0242b" strokeWidth="2.5" />
        </svg>

        <input
          className="slider"
          type="range"
          min="0"
          max={stage.km}
          step="0.1"
          value={pos}
          onChange={(e) => setPos(parseFloat(e.target.value))}
          aria-label="Distance along stage"
        />
        <div className="map-hint">Slide to move the red marker down the profile — the map below follows the same point along the real letour.fr GPS trace.</div>
      </div>

      <div className="mapbox">
        <MapContainer center={markerLL} zoom={9} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
          <TileLayer
            attribution='Tiles &copy; Esri — Esri, HERE, Garmin, USGS, NGA'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
            maxZoom={17}
          />
          <Polyline positions={routeLatLng} pathOptions={{ color: '#17161a', weight: 6, opacity: 0.9 }} />
          <Polyline positions={routeLatLng} pathOptions={{ color: '#ffe100', weight: 3, opacity: 1 }} />
          {climbPts.map((c, i) => (
            <CircleMarker key={`cm${i}`} center={[c.lat, c.lng]} radius={6}
              pathOptions={{ color: '#ece9e0', weight: 1.5, fillColor: catColor[c.cat] || '#e0242b', fillOpacity: 1 }}>
              <Tooltip direction="top">
                {(c.cat === 'HC' ? 'HC' : c.cat ? 'Cat ' + c.cat : 'Finish')} · {c.name}
                {c.ele != null ? ` · ${c.ele} m` : ''}{c.len != null ? ` · ${c.len} km @ ${c.grad}%` : ''}
              </Tooltip>
            </CircleMarker>
          ))}
          {pts.map((p, i) => (
            p.poi && p.poi !== 'climb' ? (
              <CircleMarker key={i} center={[p.lat, p.lng]} radius={5}
                pathOptions={{ color: '#17161a', weight: 1.5, fillColor: poiColor[p.poi] || '#928f9c', fillOpacity: 1 }}>
                <Tooltip direction="top">{p.label}</Tooltip>
              </CircleMarker>
            ) : null
          ))}
          {/* moving position */}
          <CircleMarker center={markerLL} radius={8}
            pathOptions={{ color: '#e0242b', weight: 3, fillColor: '#fff', fillOpacity: 1 }} />
          <MapController bounds={bounds} follow={followOn ? { lat: markerLL[0], lng: markerLL[1] } : null} />
        </MapContainer>
      </div>

      <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, fontSize: 13, color: 'var(--muted)' }}>
        <input type="checkbox" checked={followOn} onChange={(e) => setFollowOn(e.target.checked)} style={{ accentColor: 'var(--bleu)' }} />
        Map follows the marker as you slide
      </label>
    </div>
  )
}
