// 23 teams confirmed for the 2026 Tour de France.
// 18 UCI WorldTeams + 5 additional squads (Cofidis, Pinarello-Q36.5, Tudor by ranking;
// TotalEnergies and Caja Rural-Seguros RGA by wildcard).

export const TEAMS = [
  { id: 'uae', name: 'UAE Team Emirates-XRG', code: 'UAD', country: 'United Arab Emirates', bibs: '1–8', accent: '#111', focus: 'GC — Tadej Pogačar chasing a record-tying 5th title' },
  { id: 'visma', name: 'Team Visma | Lease a Bike', code: 'TVL', country: 'Netherlands', bibs: '11–18', accent: '#f5d200', focus: 'GC — Jonas Vingegaard for the yellow jersey' },
  { id: 'redbull', name: 'Red Bull – Bora – Hansgrohe', code: 'BOH', country: 'Germany', bibs: '21–28', accent: '#001a4d', focus: 'GC — Remco Evenepoel & Florian Lipowitz' },
  { id: 'lidltrek', name: 'Lidl-Trek', code: 'TFS', country: 'United States', bibs: '31–38', accent: '#0a3b8c', focus: 'GC & sprints — Juan Ayuso, Mads Pedersen' },
  { id: 'ef', name: 'EF Education-EasyPost', code: 'EFE', country: 'United States', bibs: '41–48', accent: '#ff0098', focus: 'Stage hunting — Carapaz, Healy, Powless' },
  { id: 'decathlon', name: 'Decathlon CMA CGM Team', code: 'DCT', country: 'France', bibs: '51–58', accent: '#0033a0', focus: 'GC podium bid — Paul Seixas on debut' },
  { id: 'astana', name: 'XDS Astana Team', code: 'AST', country: 'Kazakhstan', bibs: '61–68', accent: '#0aa1dd', focus: 'Breakaways & road experience' },
  { id: 'bahrain', name: 'Bahrain – Victorious', code: 'TBV', country: 'Bahrain', bibs: '71–78', accent: '#b30000', focus: 'GC — Antonio Tiberi; breakaways via Mohorič' },
  { id: 'ineos', name: 'Netcompany – INEOS', code: 'IGD', country: 'United Kingdom', bibs: '81–88', accent: '#c00', focus: 'GC — Bernal & Arensman; TT power' },
  { id: 'soudal', name: 'Soudal Quick-Step', code: 'SOQ', country: 'Belgium', bibs: '91–98', accent: '#0a1a6b', focus: 'Sprints — Tim Merlier' },
  { id: 'alpecin', name: 'Alpecin-Premier Tech', code: 'APT', country: 'Belgium', bibs: '101–108', accent: '#e01a2b', focus: 'Sprints & classics — Philipsen, Van der Poel' },
  { id: 'jayco', name: 'Team Jayco AlUla', code: 'JAY', country: 'Australia', bibs: '111–118', accent: '#0e7d3a', focus: 'GC & stages — Ben O\u2019Connor, Michael Matthews' },
  { id: 'unox', name: 'Uno-X Mobility', code: 'UXM', country: 'Norway', bibs: '121–128', accent: '#e60000', focus: 'GC & breakaways — Johannessen, Abrahamsen' },
  { id: 'nsn', name: 'NSN Cycling Team', code: 'NSN', country: 'Israel', bibs: '131–138', accent: '#0033a0', focus: 'Sprints — Biniam Girmay' },
  { id: 'movistar', name: 'Movistar Team', code: 'MOV', country: 'Spain', bibs: '141–148', accent: '#0a3d91', focus: 'GC — Enric Mas' },
  { id: 'lotto', name: 'Lotto Intermarché', code: 'LOI', country: 'Belgium', bibs: '151–158', accent: '#c8102e', focus: 'Sprints — Arnaud De Lie' },
  { id: 'cofidis', name: 'Cofidis', code: 'COF', country: 'France', bibs: '161–168', accent: '#c8102e', focus: 'Stages — Coquard, Izagirre' },
  { id: 'pinarello', name: 'Pinarello-Q36.5 Pro Cycling', code: 'PQT', country: 'Switzerland', bibs: '171–178', accent: '#111', focus: 'GC debut — Tom Pidcock' },
  { id: 'fdj', name: 'Groupama – FDJ United', code: 'GFC', country: 'France', bibs: '181–188', accent: '#0a3d91', focus: 'GC & stages — Gaudu, Grégoire' },
  { id: 'tudor', name: 'Tudor Pro Cycling Team', code: 'PRT', country: 'Switzerland', bibs: '191–198', accent: '#111', focus: 'Puncheurs — Alaphilippe, Hirschi' },
  { id: 'total', name: 'TotalEnergies', code: 'TEN', country: 'France', bibs: '201–208', accent: '#e2001a', focus: 'French breakaway spirit' },
  { id: 'picnic', name: 'Team Picnic PostNL', code: 'DFP', country: 'Netherlands', bibs: '211–218', accent: '#e4002b', focus: 'Stages — Warren Barguil' },
  { id: 'cajarural', name: 'Caja Rural – Seguros RGA', code: 'CJR', country: 'Spain', bibs: '221–228', accent: '#0a7d3a', focus: 'First-ever Tour start — nothing to lose' },
]

export const teamById = Object.fromEntries(TEAMS.map((t) => [t.id, t]))
