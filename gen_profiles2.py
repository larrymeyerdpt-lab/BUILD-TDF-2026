#!/usr/bin/env python3
import json, math, xml.etree.ElementTree as ET
NS='{http://www.topografix.com/GPX/1/0}'
meta=json.load(open('/tmp/meta.json'))
RACE,TYPE,REST_DAYS,STAGES=meta['RACE'],meta['TYPE'],meta['REST_DAYS'],meta['meta']

def hav(a,b):
    R=6371.0; la1,lo1,la2,lo2=map(math.radians,[a[0],a[1],b[0],b[1]])
    x=math.sin((la2-la1)/2)**2+math.cos(la1)*math.cos(la2)*math.sin((lo2-lo1)/2)**2
    return 2*R*math.asin(math.sqrt(x))

def load(n):
    root=ET.parse(f'gpx/stage-{n}.gpx').getroot(); pts=[]
    for tp in root.iter(NS+'trkpt'):
        e=tp.find(NS+'ele'); pts.append((float(tp.get('lat')),float(tp.get('lon')),float(e.text) if e is not None and e.text else 0.0))
    cum=[0.0]
    for i in range(1,len(pts)): cum.append(cum[-1]+hav(pts[i-1],pts[i]))
    return pts,cum

# Authoritative classified climbs per stage (official letour.fr data):
# (name, cat, approx_km, len_km, grad_pct, ele_m, is_finish)
C={
 2:[('Montjuïc','3',143.0,None,None,173,False),('Montjuïc','3',155.0,None,None,173,False),('Montjuïc','3',166.0,None,None,173,True)],
 3:[('Côte de Saint Feliu de Codines','3',17.2,7.6,4.5,622,False),('Col de Toses','1',127.7,9.3,6.5,1778,False),('Col du Calvaire','3',172.3,11.4,4.1,1836,False),('Les Angles','3',188.9,1.7,6.5,1794,True)],
 4:[('Col de Bedos','4',48.2,3.4,4.3,None,False),('Col du Paradis','3',65.9,6.4,4.1,None,False),('Col de Coudons','2',104.9,10.5,5.5,None,False),('Col de Montségur','2',146.7,6.9,6.6,None,False)],
 5:[('Côte de Baleix','3',132.7,1.0,8.8,None,False)],
 6:[('Côte de Loucrup','4',50.9,1.9,7.1,None,False),('Côte de Mauvezin','3',77.3,None,None,None,False),('Col d’Aspin','1',118.1,12.0,6.5,1490,False),('Col du Tourmalet','HC',147.8,17.1,7.3,2115,False),('Gavarnie-Gèdre','2',186.2,18.7,3.7,1440,True)],
 10:[('Pas de Peyrol — Puy Mary','1',135.3,7.8,6.0,1589,False),('Col de Pertus','1',150.0,4.4,8.5,None,False),('Le Lioran','2',166.6,None,None,1230,True)],
 15:[('Plateau de Solaison','HC',184.0,11.3,9.0,1471,True)],
 18:[('Orcières-Merlette','1',185.0,7.1,6.7,1825,True)],
 19:[('Col du Noyer','1',25.8,7.2,8.5,1664,False),('Alpe d’Huez','HC',127.9,13.8,8.1,1850,True)],
 20:[('Col de la Croix de Fer','HC',33.9,24.0,5.2,2067,False),('Col du Télégraphe','1',87.2,11.9,7.1,1566,False),('Col du Galibier','HC',110.4,17.7,6.9,2642,False),('Col de Sarenne','2',156.1,12.8,7.3,1999,False),('Alpe d’Huez','',170.9,3.8,6.1,1850,True)],
 21:[('Côte de la Butte Montmartre','4',83.0,1.1,5.9,130,False),('Côte de la Butte Montmartre','4',99.3,1.1,5.9,130,False),('Côte de la Butte Montmartre','4',115.6,1.1,5.9,130,False)],
}

def esc(s): return s.replace('\\','\\\\').replace("'","\\'")
def j(v):
    if v is None: return 'null'
    if isinstance(v,str): return "'"+esc(v)+"'"
    return str(v)

def snap_max(cum,pts,target,win=2.0):
    lo,hi=target-win,target+win
    best=None
    for i in range(len(pts)):
        if cum[i]<lo: continue
        if cum[i]>hi: break
        if best is None or pts[i][2]>pts[best][2]: best=i
    if best is None:
        best=min(range(len(pts)),key=lambda i:abs(cum[i]-target))
    return best

out=[]
out.append("// 2026 Tour de France — real letour.fr GPS traces, corrected distances, and")
out.append("// classified climbs snapped to their true summits with length & average gradient.")
out.append("")
# Official published race distances (km) — GPX totals are scaled to these so the app matches letour.fr.
OFFICIAL_KM={1:19.6,2:168.5,3:188.9,4:181.9,5:158.3,6:186.2,10:166.6,13:205.8,14:155.3,15:184.0,16:26.1,18:185.0,19:127.9,20:170.9,21:133.0}
out.append("export const RACE = "+json.dumps(RACE,ensure_ascii=False))
out.append("")
out.append("export const TYPE = "+json.dumps(TYPE,ensure_ascii=False))
out.append("")
out.append("export const REST_DAYS = "+json.dumps(REST_DAYS))
out.append("")
out.append("export const STAGES = [")
for s in STAGES:
    n=s['n']; pts,cum=load(n); total=cum[-1]
    km=OFFICIAL_KM.get(n, round(total,1)); scale=km/total
    # downsample 150 by distance
    N=150; idxs=[]; jj=0
    for k in range(N):
        d=k*total/(N-1)
        while jj<len(cum)-1 and cum[jj]<d: jj+=1
        idxs.append(jj)
    idxs=sorted(set(idxs)|{0,len(pts)-1})
    out.append("  {")
    out.append(f"    n: {n}, date: '{s['date']}', day: '{s['day']}', type: '{s['type']}',")
    out.append(f"    start: '{esc(s['start'])}', finish: '{esc(s['finish'])}', km: {round(km,1)}, startTime: '{s['startTime']}',")
    out.append(f"    note: '{esc(s['note'])}',")
    out.append(f"    climbs: [{', '.join(chr(39)+esc(c)+chr(39) for c in s['climbs'])}],")
    # climbs with snap (approx_km is in official space -> convert to gpx space to snap, then scale back)
    cps=[]
    for (name,cat,akm,ln,gr,ele,fin) in C.get(n,[]):
        if fin:
            bi=len(pts)-1
        else:
            gpx_target=akm/scale if scale else akm
            bi=snap_max(cum,pts,gpx_target)
        lat,lon,e=pts[bi]
        cps.append({'name':name,'cat':cat,'km':round(cum[bi]*scale,1),'len':ln,'grad':gr,
                    'ele':ele if ele is not None else round(e),'lat':round(lat,5),'lng':round(lon,5)})
    # build profile points
    prof=[]
    for i in idxs:
        lat,lon,e=pts[i]
        prof.append({'km':round(cum[i]*scale,2),'ele':round(e),'lat':round(lat,5),'lng':round(lon,5),
                     'poi':'start' if i==0 else ('finish' if i==len(pts)-1 else None),
                     'label':(f"Start — {s['start']}" if i==0 else (f"Finish — {s['finish']}" if i==len(pts)-1 else None))})
    # pin each climb summit to its true elevation, and align the badge km to that profile point
    for c in cps:
        ji=min(range(len(prof)), key=lambda k:abs(prof[k]['km']-c['km']))
        prof[ji]['ele']=c['ele']
        c['km']=prof[ji]['km']
    cpstr=", ".join("{ name: %s, cat: %s, km: %s, len: %s, grad: %s, ele: %s, lat: %s, lng: %s }"%(
        j(c['name']),j(c['cat']),j(c['km']),j(c['len']),j(c['grad']),j(c['ele']),j(c['lat']),j(c['lng'])) for c in cps)
    out.append(f"    climbPts: [{cpstr}],")
    out.append("    gpx: true,")
    out.append("    profile: [")
    for p in prof:
        extra=''
        if p['poi']: extra=f", label: '{esc(p['label'])}', poi: '{p['poi']}'"
        out.append(f"      {{ km: {p['km']}, ele: {p['ele']}, lat: {p['lat']}, lng: {p['lng']}{extra} }},")
    out.append("    ],")
    out.append("  },")
out.append("]")
open('src/data/stages.js','w').write("\n".join(out)+"\n")
print("Regenerated. Stage 3 km now:", round(load(3)[1][-1],1))
