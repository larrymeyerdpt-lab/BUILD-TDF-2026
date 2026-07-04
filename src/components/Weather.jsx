import { useEffect, useState } from 'react'

// Free, no-key forecast API (open-meteo.com). Forecast horizon is ~16 days, so
// stages more than a couple of weeks out will report "forecast not available yet".
const WMO = {
  0: ['Clear sky', '☀️'], 1: ['Mainly clear', '🌤️'], 2: ['Partly cloudy', '⛅'], 3: ['Overcast', '☁️'],
  45: ['Fog', '🌫️'], 48: ['Rime fog', '🌫️'],
  51: ['Light drizzle', '🌦️'], 53: ['Drizzle', '🌦️'], 55: ['Heavy drizzle', '🌧️'],
  61: ['Light rain', '🌦️'], 63: ['Rain', '🌧️'], 65: ['Heavy rain', '🌧️'],
  66: ['Freezing rain', '🌧️'], 67: ['Freezing rain', '🌧️'],
  71: ['Light snow', '🌨️'], 73: ['Snow', '🌨️'], 75: ['Heavy snow', '❄️'],
  80: ['Rain showers', '🌦️'], 81: ['Rain showers', '🌧️'], 82: ['Violent showers', '⛈️'],
  95: ['Thunderstorm', '⛈️'], 96: ['Thunderstorm', '⛈️'], 99: ['Thunderstorm', '⛈️'],
}
const cToF = (c) => Math.round(c * 9 / 5 + 32)

export default function Weather({ stage }) {
  const [state, setState] = useState({ status: 'loading' })
  const p0 = stage.profile[0]
  const lat = p0.lat, lng = p0.lng

  useEffect(() => {
    let live = true
    setState({ status: 'loading' })
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}` +
      `&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode,windspeed_10m_max` +
      `&start_date=${stage.date}&end_date=${stage.date}&timezone=Europe%2FParis`
    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        if (!live) return
        const day = d && d.daily
        if (!day || day.temperature_2m_max == null || day.temperature_2m_max[0] == null) {
          setState({ status: 'unavailable' }); return
        }
        setState({
          status: 'ok',
          hi: day.temperature_2m_max[0],
          lo: day.temperature_2m_min[0],
          rain: day.precipitation_probability_max?.[0],
          wind: day.windspeed_10m_max?.[0],
          code: day.weathercode?.[0] ?? 0,
        })
      })
      .catch(() => live && setState({ status: 'error' }))
    return () => { live = false }
  }, [lat, lng, stage.date])

  const [label, icon] = state.status === 'ok' ? (WMO[state.code] || ['—', '🌡️']) : ['', '']

  return (
    <div className="weather">
      <div className="eyebrow" style={{ marginBottom: 8 }}>Race-day weather · {stage.start} area</div>
      {state.status === 'loading' && <div className="wx-note">Checking the forecast…</div>}
      {state.status === 'unavailable' && (
        <div className="wx-note">Forecast opens closer to the date — this stage is still outside the ~16-day window.</div>
      )}
      {state.status === 'error' && <div className="wx-note">Couldn&rsquo;t reach the weather service just now.</div>}
      {state.status === 'ok' && (
        <>
          <div className="wx-main">
            <div className="wx-icon">{icon}</div>
            <div className="wx-temp">
              <div className="wx-hi">{Math.round(state.hi)}°C <span>/ {cToF(state.hi)}°F</span></div>
              <div className="wx-lo">low {Math.round(state.lo)}°C / {cToF(state.lo)}°F</div>
            </div>
            <div className="wx-cond">{label}</div>
          </div>
          <div className="wx-strip">
            <div className="wx-stat"><div className="v">{state.rain ?? '—'}%</div><div className="l">chance of rain</div></div>
            <div className="wx-stat"><div className="v">{state.wind != null ? Math.round(state.wind) : '—'}</div><div className="l">km/h wind</div></div>
          </div>
          <div className="wx-note">Live forecast for {stage.start}, updates as the date approaches.</div>
        </>
      )}
    </div>
  )
}
