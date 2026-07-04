import { useState } from 'react'

const KMH_TO_MPH = 0.621371

function SpeedConverter() {
  const [kmh, setKmh] = useState('40')
  const mph = kmh === '' ? '' : (parseFloat(kmh) * KMH_TO_MPH)
  const setFromMph = (v) => setKmh(v === '' ? '' : String((parseFloat(v) / KMH_TO_MPH)))

  const fmt = (n) => (n === '' || isNaN(n) ? '' : (Math.round(n * 100) / 100).toString())

  return (
    <div className="card conv-card">
      <div className="conv-io">
        <div className="conv-field">
          <label>Kilometres / hour</label>
          <div className="inp">
            <input inputMode="decimal" value={kmh} onChange={(e) => setKmh(e.target.value.replace(/[^0-9.]/g, ''))} />
            <span className="unit">km/h</span>
          </div>
        </div>
        <div className="swap">⇅</div>
        <div className="conv-field">
          <label>Miles / hour</label>
          <div className="inp">
            <input inputMode="decimal" value={fmt(mph)} onChange={(e) => setFromMph(e.target.value.replace(/[^0-9.]/g, ''))} />
            <span className="unit">mph</span>
          </div>
        </div>
      </div>

      <div className="presets">
        {[35, 40, 45, 50, 60, 70].map((v) => (
          <button key={v} className="chip" onClick={() => setKmh(String(v))}>{v} km/h</button>
        ))}
      </div>
      <p className="note" style={{ marginTop: 14 }}>
        Peloton cruising speed sits around 40–45 km/h; flat-stage bunch sprints top 65–70 km/h,
        and Alpine descents can push past 90 km/h.
      </p>
    </div>
  )
}

function TempConverter() {
  const [c, setC] = useState('25')
  const f = c === '' ? '' : (parseFloat(c) * 9 / 5 + 32)
  const setFromF = (v) => setC(v === '' ? '' : String((parseFloat(v) - 32) * 5 / 9))
  const fmt = (n) => (n === '' || isNaN(n) ? '' : (Math.round(n * 10) / 10).toString())
  const clean = (v) => v.replace(/[^0-9.\-]/g, '')

  return (
    <div className="card conv-card" style={{ marginTop: 14 }}>
      <div className="eyebrow" style={{ marginBottom: 12 }}>Temperature converter</div>
      <div className="conv-io">
        <div className="conv-field">
          <label>Celsius</label>
          <div className="inp">
            <input inputMode="decimal" value={c} onChange={(e) => setC(clean(e.target.value))} />
            <span className="unit">°C</span>
          </div>
        </div>
        <div className="swap">⇅</div>
        <div className="conv-field">
          <label>Fahrenheit</label>
          <div className="inp">
            <input inputMode="decimal" value={fmt(f)} onChange={(e) => setFromF(clean(e.target.value))} />
            <span className="unit">°F</span>
          </div>
        </div>
      </div>
      <div className="presets">
        {[15, 20, 25, 30, 35, 40].map((v) => (
          <button key={v} className="chip" onClick={() => setC(String(v))}>{v}°C</button>
        ))}
      </div>
      <p className="note" style={{ marginTop: 14 }}>
        Pyrenean and Alpine summits can be 15–20°C cooler than the valleys, while July tarmac in the
        south of France often bakes past 35°C (95°F).
      </p>
    </div>
  )
}

function DistanceRef() {
  const rows = [
    ['Stage 19 — Gap → Alpe d\u2019Huez', 127.9],
    ['Stage 21 — Thoiry → Paris', 133],
    ['Stage 5 — Lannemezan → Pau', 158.3],
    ['Stage 13 — Dole → Belfort (longest)', 205.8],
    ['Whole Tour', 3333],
  ]
  return (
    <div className="card conv-card" style={{ marginTop: 14 }}>
      <div className="eyebrow">km → miles quick reference</div>
      <table className="ref-table">
        <tbody>
          {rows.map(([label, km]) => (
            <tr key={label}>
              <td style={{ color: 'var(--paper)' }}>{label}</td>
              <td>{km} km</td>
              <td>{(km * KMH_TO_MPH).toFixed(1)} mi</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function Converter() {
  return (
    <div className="section">
      <div className="eyebrow">Speed &middot; temperature &middot; distance</div>
      <SpeedConverter />
      <TempConverter />
      <DistanceRef />
    </div>
  )
}
