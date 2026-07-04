#!/usr/bin/env python3
import json, math, re, xml.etree.ElementTree as ET

meta = json.load(open('/tmp/meta.json'))
RACE, TYPE, REST_DAYS, STAGES = meta['RACE'], meta['TYPE'], meta['REST_DAYS'], meta['meta']

def hav(a, b):
    R = 6371.0
    la1, lo1, la2, lo2 = map(math.radians, [a[0], a[1], b[0], b[1]])
    x = math.sin((la2-la1)/2)**2 + math.cos(la1)*math.cos(la2)*math.sin((lo2-lo1)/2)**2
    return 2*R*math.asin(math.sqrt(x))

def parse_gpx(path):
    ns = {'g': 'http://www.topografix.com/GPX/1/0'}
    root = ET.parse(path).getroot()
    pts = []
    for tp in root.iter('{http://www.topografix.com/GPX/1/0}trkpt'):
        lat = float(tp.get('lat')); lon = float(tp.get('lon'))
        ele_el = tp.find('{http://www.topografix.com/GPX/1/0}ele')
        ele = float(ele_el.text) if ele_el is not None and ele_el.text else 0.0
        pts.append((lat, lon, ele))
    return pts

def downsample(pts, official_km, n=150):
    # cumulative distance
    cum = [0.0]
    for i in range(1, len(pts)):
        cum.append(cum[-1] + hav(pts[i-1], pts[i]))
    total = cum[-1] or 1.0
    scale = official_km / total
    # index of global max elevation (to guarantee the summit is captured)
    max_i = max(range(len(pts)), key=lambda i: pts[i][2])
    # even sampling by distance
    idxs = []
    j = 0
    for k in range(n):
        d = k * total / (n - 1)
        while j < len(cum)-1 and cum[j] < d:
            j += 1
        idxs.append(j)
    idxs = sorted(set(idxs) | {0, len(pts)-1, max_i})
    out = []
    for i in idxs:
        lat, lon, ele = pts[i]
        out.append({'km': round(cum[i]*scale, 2), 'ele': round(ele),
                    'lat': round(lat, 5), 'lng': round(lon, 5), 'i': i})
    return out, max_i

def esc(s): return s.replace('\\', '\\\\').replace("'", "\\'")

lines = []
lines.append("// 2026 Tour de France — route data with REAL GPS traces.")
lines.append("// Each stage's `profile` is downsampled from the official letour.fr GPX")
lines.append("// (mirrored via cyclingstage.com), giving genuine { km, ele, lat, lng } points.")
lines.append("// The full-resolution .gpx files are in /gpx if you want to resample denser.")
lines.append("")
lines.append("export const RACE = " + json.dumps(RACE, ensure_ascii=False) + "")
lines.append("")
lines.append("export const TYPE = " + json.dumps(TYPE, ensure_ascii=False))
lines.append("")
lines.append("export const REST_DAYS = " + json.dumps(REST_DAYS))
lines.append("")
lines.append("export const STAGES = [")

for s in STAGES:
    n = s['n']
    pts = parse_gpx(f'gpx/stage-{n}.gpx')
    prof, max_i = downsample(pts, s['km'], n=150)
    lines.append("  {")
    lines.append(f"    n: {n}, date: '{s['date']}', day: '{s['day']}', type: '{s['type']}',")
    lines.append(f"    start: '{esc(s['start'])}', finish: '{esc(s['finish'])}', km: {s['km']}, startTime: '{s['startTime']}',")
    lines.append(f"    note: '{esc(s['note'])}',")
    climbs = ", ".join("'"+esc(c)+"'" for c in s['climbs'])
    lines.append(f"    climbs: [{climbs}],")
    lines.append("    gpx: true,")
    lines.append("    profile: [")
    for p in prof:
        label = ''; poi = ''
        if p['i'] == 0:
            label = f"Start — {s['start']}"; poi = 'start'
        elif p['i'] == len(pts)-1:
            label = f"Finish — {s['finish']}"; poi = 'finish'
        elif p['i'] == max_i and p['ele'] > 250:
            label = f"High point — {p['ele']} m"; poi = 'climb'
        extra = ''
        if label: extra += f", label: '{esc(label)}'"
        if poi: extra += f", poi: '{poi}'"
        lines.append(f"      {{ km: {p['km']}, ele: {p['ele']}, lat: {p['lat']}, lng: {p['lng']}{extra} }},")
    lines.append("    ],")
    lines.append("  },")
lines.append("]")

open('src/data/stages.js', 'w').write("\n".join(lines) + "\n")
tot = 0
for s in STAGES:
    pts = parse_gpx(f'gpx/stage-{s["n"]}.gpx')
    prof, _ = downsample(pts, s['km'], n=150)
    tot += len(prof)
print(f"Rebuilt stages.js — 21 stages, ~{tot} real GPS points total.")
