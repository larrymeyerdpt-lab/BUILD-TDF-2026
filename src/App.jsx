import { useMemo, useState } from 'react'
import { STAGES, RACE, TYPE, REST_DAYS } from './data/stages.js'
import { TEAMS, teamById } from './data/teams.js'
import { RIDERS, NAT, OUT, FLAG } from './data/riders.js'
import StageProfile from './components/StageProfile.jsx'
import Converter from './components/Converter.jsx'
import Weather from './components/Weather.jsx'

const RACE_START = new Date('2026-07-04T00:00:00')

function ageFrom(born) {
  if (!born) return null
  const b = new Date(born)
  let a = RACE_START.getFullYear() - b.getFullYear()
  const m = RACE_START.getMonth() - b.getMonth()
  if (m < 0 || (m === 0 && RACE_START.getDate() < b.getDate())) a--
  return a
}
const yearsPro = (pro) => (pro ? 2026 - pro : null)
function ftIn(cm) {
  const totalIn = cm / 2.54
  let ft = Math.floor(totalIn / 12)
  let inch = Math.round(totalIn - ft * 12)
  if (inch === 12) { ft += 1; inch = 0 }
  return `${ft}'${inch}"`
}
const fmtDate = (iso) => new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })

/* ─────────────────────────── Stages ─────────────────────────── */
function StageList({ onOpen }) {
  const today = new Date().toISOString().slice(0, 10)
  return (
    <div className="section">
      <div className="eyebrow">All 21 stages · Barcelona → Paris</div>
      {STAGES.map((s, i) => {
        const t = TYPE[s.type]
        const done = s.date < today
        const isToday = s.date === today
        return (
          <div key={s.n}>
            <button className={`stage-row${done ? ' done' : ''}${isToday ? ' today' : ''}`} onClick={() => onOpen(s.n)}>
              <div className="stage-no">{s.n}<small>{s.day} {fmtDate(s.date)}</small></div>
              <div>
                <div className="stage-route">{s.start} → {s.finish}</div>
                <div className="stage-meta">Start {s.startTime} CEST{isToday ? ' · Racing today' : ''}</div>
              </div>
              <div className="stage-right">
                <span className={`tag t-${t.color}`}>{t.short}</span>
                <span className="km mono">{s.km} km</span>
              </div>
            </button>
            {REST_DAYS.includes(nextDate(s.date)) && i < STAGES.length - 1 && (
              <div className="count" style={{ textAlign: 'center', margin: '2px 0 12px' }}>— Rest day, {fmtDate(nextDate(s.date))} —</div>
            )}
          </div>
        )
      })}
      <p className="foot">
        Route data reflects the official 2026 Tour de France ({RACE.distanceKm} km, {RACE.climbingM.toLocaleString()} m of climbing,
        highest point {RACE.highestPoint.name} at {RACE.highestPoint.m} m). Every stage profile and map is now built from the
        official letour.fr GPS trace, so the elevation shapes and route lines are the real thing.
      </p>
    </div>
  )
}
function nextDate(iso) {
  const d = new Date(iso + 'T00:00:00'); d.setDate(d.getDate() + 1)
  return d.toISOString().slice(0, 10)
}

function StageDetail({ n, onBack }) {
  const s = STAGES.find((x) => x.n === n)
  const t = TYPE[s.type]
  return (
    <div className="section">
      <button className="back" onClick={onBack}>‹ All stages</button>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', margin: '6px 0' }}>
        <span className={`tag t-${t.color}`}>{t.label}</span>
        <span className="mono" style={{ color: 'var(--muted)', fontSize: 13 }}>Stage {s.n} · {s.day} {fmtDate(s.date)}</span>
      </div>
      <div className="detail-title">{s.start} → {s.finish}</div>
      <div className="detail-sub">Start {s.startTime} CEST</div>

      <div className="stat-strip">
        <div className="stat"><div className="v">{s.km}</div><div className="l">km</div></div>
        <div className="stat"><div className="v">{Math.round(s.km * 0.621371)}</div><div className="l">miles</div></div>
        <div className="stat"><div className="v">{s.climbs.length}</div><div className="l">key climbs</div></div>
      </div>

      <Weather stage={s} />

      {s.gpx && (
        <div className="gpx-badge">● Real letour.fr GPS trace · {s.profile.length} points — drag the marker to follow the exact route</div>
      )}
      <StageProfile stage={s} />

      {s.climbs.length > 0 && (
        <div className="climbs">
          <div className="eyebrow" style={{ marginTop: 18 }}>Key climbs</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {s.climbs.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </div>
      )}
      <p className="note">{s.note}</p>
    </div>
  )
}

/* ─────────────────────────── Riders ─────────────────────────── */
function RiderList({ onOpen, filter, setFilter }) {
  const { q, team, nat, sort } = filter
  const setQ = (v) => setFilter((f) => ({ ...f, q: v }))
  const setTeam = (v) => setFilter((f) => ({ ...f, team: v }))
  const setNat = (v) => setFilter((f) => ({ ...f, nat: v }))
  const setSort = (v) => setFilter((f) => ({ ...f, sort: v }))

  const nats = useMemo(() => {
    const set = [...new Set(RIDERS.map((r) => r.nat))].sort((a, b) => (NAT[a] || a).localeCompare(NAT[b] || b))
    return set
  }, [])

  const list = useMemo(() => {
    const qq = q.trim().toLowerCase()
    let r = RIDERS.filter((x) => {
      const tm = teamById[x.team]
      const hay = `${x.name} ${x.bib} ${tm.bike || ''} ${tm.sponsors || ''} ${tm.name}`.toLowerCase()
      return (!qq || hay.includes(qq)) && (!team || x.team === team) && (!nat || x.nat === nat)
    })
    r = [...r].sort((a, b) => {
      const aa = ageFrom(a.born), bb = ageFrom(b.born)
      if (sort === 'age-desc') return (bb ?? -1) - (aa ?? -1)
      if (sort === 'age-asc') return (aa ?? 999) - (bb ?? 999)
      return a.name.localeCompare(b.name)
    })
    return r
  }, [q, team, nat, sort])

  return (
    <div className="section">
      <div className="eyebrow">Riders · search &amp; filter</div>
      <div className="controls">
        <input className="search" placeholder="Search name, bib #, bike brand, or sponsor…" value={q} onChange={(e) => setQ(e.target.value)} />
        <div className="filter-row">
          <select className="search" value={team} onChange={(e) => setTeam(e.target.value)}>
            <option value="">All teams</option>
            {TEAMS.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <select className="search" value={nat} onChange={(e) => setNat(e.target.value)}>
            <option value="">All nationalities</option>
            {nats.map((n) => <option key={n} value={n}>{NAT[n] || n}</option>)}
          </select>
        </div>
        <div className="sortbar">
          <button className={`chip${sort === 'name' ? ' on' : ''}`} onClick={() => setSort('name')}>A–Z</button>
          <button className={`chip${sort === 'age-asc' ? ' on' : ''}`} onClick={() => setSort('age-asc')}>Youngest</button>
          <button className={`chip${sort === 'age-desc' ? ' on' : ''}`} onClick={() => setSort('age-desc')}>Oldest</button>
        </div>
      </div>

      <div className="count">{list.length} rider{list.length !== 1 ? 's' : ''} shown</div>

      {list.map((r) => {
        const tm = teamById[r.team]
        return (
          <button key={r.id} className={`rider-row${OUT[r.id] ? ' rider-out' : ''}`} onClick={() => onOpen(r.id)}>
            <div>
              <div className="rname">{FLAG[r.nat]} {r.name}{OUT[r.id] && <span className="dnf">OUT</span>}</div>
              <div className="rmeta">
                <span className="flag">{r.nat}</span>
                <span>{NAT[r.nat] || r.nat}</span>
                <span>· {tm.name}</span>
              </div>
            </div>
            <div className="age-badge">{ageFrom(r.born) ?? '—'}<small>YEARS</small></div>
          </button>
        )
      })}
      {list.length === 0 && <div className="empty">No riders match those filters.</div>}
      <p className="foot">
        The full confirmed field: all {RIDERS.length} riders across 23 teams, with names, teams and
        nationalities from the official startlist. Age, height, weight and career tallies are filled in for
        well-known riders and shown as &ldquo;—&rdquo; where not yet verified. Correct or extend any rider in
        <span className="mono"> src/data/riders.js</span>.
      </p>
    </div>
  )
}

function Metric({ v, l, dim }) {
  return <div className="metric"><div className={`v${dim ? ' dim' : ''}`}>{v ?? '—'}</div><div className="l">{l}</div></div>
}

function RiderDetail({ id, onBack }) {
  const r = RIDERS.find((x) => x.id === id)
  const tm = teamById[r.team]
  return (
    <div className="section rider-detail">
      <button className="back" onClick={onBack}>‹ Back</button>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '6px 0' }}>
        <span style={{ fontSize: 20 }}>{FLAG[r.nat]}</span>
        <span className="flag">{r.nat}</span>
        <span style={{ color: 'var(--muted)', fontSize: 13 }}>{NAT[r.nat] || r.nat}</span>
      </div>
      <div className="big">{r.name}</div>
      <div className="detail-sub" style={{ marginTop: 6 }}>
        {r.role} · {tm.name} · Bib {r.bib}
        {tm.bike && <> · {tm.bikeUrl
          ? <a className="bike-link" href={tm.bikeUrl} target="_blank" rel="noopener noreferrer">{tm.bike} ↗</a>
          : tm.bike}</>}
      </div>
      {OUT[r.id] && <div className="out-banner">Out of the race — {OUT[r.id]}</div>}

      <div className="grid2">
        <Metric v={ageFrom(r.born)} l="Age" />
        <Metric v={yearsPro(r.pro)} l="Years as a pro" />
        <Metric v={r.heightCm ? r.heightCm + ' cm' : null} l="Height" dim={!r.heightCm} />
        <Metric v={r.weightKg ? r.weightKg + ' kg' : null} l="Weight" dim={!r.weightKg} />
        <Metric v={r.gt} l="Grand Tours started" dim={r.gt == null} />
        <Metric v={r.tdfWins} l="TdF stage wins" dim={r.tdfWins == null} />
      </div>

      <div className="grid2" style={{ marginTop: 8 }}>
        <Metric v={r.heightCm ? ftIn(r.heightCm) : null} l="Height (ft·in)" dim={!r.heightCm} />
        <Metric v={r.weightKg ? Math.round(r.weightKg * 2.2046) + ' lb' : null} l="Weight (lb)" dim={!r.weightKg} />
      </div>
      <p className="note">
        {NAT[r.nat] || r.nat}{r.pro ? ` · turned professional in ${r.pro}` : ''}.
        {ageFrom(r.born) == null && ' Detailed metrics for this rider are still being verified.'}
      </p>
    </div>
  )
}

/* ─────────────────────────── Teams ─────────────────────────── */
function TeamList({ onOpen }) {
  return (
    <div className="section">
      <div className="eyebrow">23 teams · 184 riders</div>
      {TEAMS.map((t) => (
        <button key={t.id} className="team-row" onClick={() => onOpen(t.id)}>
          <div className="team-bar" style={{ background: t.accent }} />
          <div>
            <div className="tname">{t.name}</div>
            <div className="tfocus">{t.country} · Bibs {t.bibs}{t.bike ? ` · ${t.bike}` : ''} · {t.focus}</div>
          </div>
          <div className="tcode">{t.code} ›</div>
        </button>
      ))}
    </div>
  )
}

function TeamDetail({ id, onBack, onOpenRider }) {
  const t = teamById[id]
  const roster = RIDERS.filter((r) => r.team === id)
  return (
    <div className="section">
      <button className="back" onClick={onBack}>‹ All teams</button>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', margin: '8px 0 2px' }}>
        <div style={{ width: 14, height: 30, borderRadius: 4, background: t.accent }} />
        <div className="detail-title" style={{ fontSize: 26 }}>{t.name}</div>
      </div>
      <div className="detail-sub">{t.country} · {t.code} · Bibs {t.bibs}</div>
      <div className="team-facts">
        <div><span className="tf-label">Bikes</span>{t.bike
          ? (t.bikeUrl ? <a className="bike-link" href={t.bikeUrl} target="_blank" rel="noopener noreferrer">{t.bike} ↗</a> : t.bike)
          : '—'}</div>
        <div><span className="tf-label">Sponsors</span>{t.sponsors}</div>
      </div>
      <p className="note" style={{ marginTop: 10 }}>{t.focus}.</p>

      <div className="eyebrow" style={{ marginTop: 16 }}>Riders in this set ({roster.length})</div>
      {roster.map((r) => (
        <button key={r.id} className={`rider-row${OUT[r.id] ? ' rider-out' : ''}`} onClick={() => onOpenRider(r.id)}>
          <div>
            <div className="rname">{FLAG[r.nat]} {r.name}{OUT[r.id] && <span className="dnf">OUT</span>}</div>
            <div className="rmeta"><span className="flag">{r.nat}</span><span>{r.role}</span></div>
          </div>
          <div className="age-badge">{ageFrom(r.born) ?? '—'}<small>YEARS</small></div>
        </button>
      ))}
      {roster.length === 0 && <div className="empty">Roster for this team is still being confirmed at publication.</div>}
    </div>
  )
}

/* ─────────────────────────── Shell ─────────────────────────── */
export default function App() {
  const [tab, setTab] = useState('stages')
  const [stage, setStage] = useState(null)
  const [rider, setRider] = useState(null)
  const [team, setTeam] = useState(null)
  const [riderFilter, setRiderFilter] = useState({ q: '', team: '', nat: '', sort: 'name' })

  const go = (t) => { setTab(t); setStage(null); setRider(null); setTeam(null) }

  return (
    <div className="app">
      <header className="masthead">
        <div className="kicker">Le Suiveur — the follower</div>
        <h1>Tour de France<br />2026</h1>
        <div className="sub"><b>{RACE.grandDepart}</b> → <b>Paris</b> · {RACE.dates} · <b>{RACE.distanceKm} km</b></div>
      </header>

      {tab === 'stages' && (stage == null
        ? <StageList onOpen={(n) => setStage(n)} />
        : <StageDetail n={stage} onBack={() => setStage(null)} />)}

      {tab === 'riders' && (rider == null
        ? <RiderList onOpen={(id) => setRider(id)} filter={riderFilter} setFilter={setRiderFilter} />
        : <RiderDetail id={rider} onBack={() => setRider(null)} />)}

      {tab === 'teams' && (
        rider != null ? <RiderDetail id={rider} onBack={() => setRider(null)} />
          : team == null
            ? <TeamList onOpen={(id) => setTeam(id)} />
            : <TeamDetail id={team} onBack={() => setTeam(null)} onOpenRider={(id) => setRider(id)} />
      )}

      {tab === 'convert' && <Converter />}

      <nav className="tabbar">
        <button className={tab === 'stages' ? 'on' : ''} onClick={() => go('stages')}><span className="ic">▲</span>Stages</button>
        <button className={tab === 'riders' ? 'on' : ''} onClick={() => go('riders')}><span className="ic">◎</span>Riders</button>
        <button className={tab === 'teams' ? 'on' : ''} onClick={() => go('teams')}><span className="ic">▦</span>Teams</button>
        <button className={tab === 'convert' ? 'on' : ''} onClick={() => go('convert')}><span className="ic">⇅</span>Convert</button>
      </nav>
    </div>
  )
}
