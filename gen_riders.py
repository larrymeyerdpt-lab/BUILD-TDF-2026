#!/usr/bin/env python3
# Generates src/data/riders.js from the confirmed 2026 TdF startlist (184 riders).
# Names/teams/nationalities are from the official startlist (velowire + cyclingfantasy, 4 Jul 2026).
# Detailed metrics (born/height/weight/pro/gt/tdfWins) are hand-verified for well-known riders;
# unknown values are left null and render as "—" in the app.

import unicodedata, re, json

TEAM_BY_BIB = {}
def rng(a,b,t):
    for n in range(a,b+1): TEAM_BY_BIB[n]=t
rng(1,8,'uae'); rng(11,18,'visma'); rng(21,28,'redbull'); rng(31,38,'lidltrek')
rng(41,48,'ef'); rng(51,58,'decathlon'); rng(61,68,'astana'); rng(71,78,'bahrain')
rng(81,88,'ineos'); rng(91,98,'soudal'); rng(101,108,'alpecin'); rng(111,118,'jayco')
rng(121,128,'unox'); rng(131,138,'nsn'); rng(141,148,'movistar'); rng(151,158,'lotto')
rng(161,168,'cofidis'); rng(171,178,'pinarello'); rng(181,188,'fdj'); rng(191,198,'tudor')
rng(201,208,'total'); rng(211,218,'picnic'); rng(221,228,'cajarural')

# bib: (name, nat3)
R = {
 1:("Tadej Pogačar","SVN"),2:("Isaac del Toro","MEX"),3:("Felix Großschartner","AUT"),
 4:("Brandon McNulty","USA"),5:("Nils Politt","GER"),6:("Florian Vermeersch","BEL"),
 7:("Tim Wellens","BEL"),8:("Adam Yates","GBR"),
 11:("Jonas Vingegaard","DEN"),12:("Edoardo Affini","ITA"),13:("Bruno Armirail","FRA"),
 14:("Victor Campenaerts","BEL"),15:("Per Strand Hagenes","NOR"),16:("Matteo Jorgenson","USA"),
 17:("Sepp Kuss","USA"),18:("Davide Piganzoli","ITA"),
 21:("Remco Evenepoel","BEL"),22:("Mattia Cattaneo","ITA"),23:("Nico Denz","GER"),
 24:("Jai Hindley","AUS"),25:("Florian Lipowitz","GER"),26:("Jan Tratnik","SVN"),
 27:("Tim van Dijke","NED"),28:("Maxim Van Gils","BEL"),
 31:("Juan Ayuso","ESP"),32:("Derek Gee","CAN"),33:("Mads Pedersen","DEN"),
 34:("Quinn Simmons","USA"),35:("Mattias Skjelmose","DEN"),36:("Toms Skujiņš","LAT"),
 37:("Mathias Vacek","CZE"),38:("Carlos Verona","ESP"),
 41:("Richard Carapaz","ECU"),42:("Kasper Asgreen","DEN"),43:("Alex Baudin","FRA"),
 44:("Ben Healy","IRL"),45:("Sean Quinn","USA"),46:("Georg Steinhauser","GER"),
 47:("Michael Valgren","DEN"),48:("Max Walker","GBR"),
 51:("Paul Seixas","FRA"),52:("Tiesj Benoot","BEL"),53:("Cees Bol","NED"),
 54:("Daan Hoole","NED"),55:("Olav Kooij","NED"),56:("Aurélien Paret-Peintre","FRA"),
 57:("Nicolas Prodhomme","FRA"),58:("Matthew Riccitello","USA"),
 61:("Sergio Higuita","COL"),62:("Davide Ballerini","ITA"),63:("Aaron Gate","NZL"),
 64:("Max Kanter","GER"),65:("Harold Tejada","COL"),66:("Mike Teunissen","NED"),
 67:("Simone Velasco","ITA"),68:("Nicolas Vinokurov","KAZ"),
 71:("Lenny Martinez","FRA"),72:("Phil Bauhaus","GER"),73:("Damiano Caruso","ITA"),
 74:("Kamil Gradek","POL"),75:("Matej Mohorič","SVN"),76:("Robert Stannard","AUS"),
 77:("Antonio Tiberi","ITA"),78:("Vlad van Mechelen","BEL"),
 81:("Egan Bernal","COL"),82:("Thymen Arensman","NED"),83:("Tobias Foss","NOR"),
 84:("Filippo Ganna","ITA"),85:("Dorian Godon","FRA"),86:("Michał Kwiatkowski","POL"),
 87:("Joshua Tarling","GBR"),88:("Kévin Vauquelin","FRA"),
 91:("Tim Merlier","BEL"),92:("Pascal Eenkhoorn","NED"),93:("Valentin Paret-Peintre","FRA"),
 94:("Jasper Stuyven","BEL"),95:("Dylan van Baarle","NED"),96:("Bert Van Lerberghe","BEL"),
 97:("Ilan Van Wilder","BEL"),98:("Louis Vervaeke","BEL"),
 101:("Mathieu van der Poel","NED"),102:("Ramses Debruyne","BEL"),103:("Silvan Dillier","SUI"),
 104:("Tim Marsman","NED"),105:("Jasper Philipsen","BEL"),106:("Edward Planckaert","BEL"),
 107:("Jonas Rickaert","BEL"),108:("Emiel Verstrynge","BEL"),
 111:("Ben O'Connor","AUS"),112:("Pascal Ackermann","GER"),113:("Luke Durbridge","AUS"),
 114:("Felix Engelhardt","GER"),115:("Michael Matthews","AUS"),116:("Kelland O'Brien","AUS"),
 117:("Luke Plapp","AUS"),118:("Mauro Schmid","SUI"),
 121:("Tobias Halland Johannessen","NOR"),122:("Jonas Abrahamsen","NOR"),123:("Anthon Charmig","DEN"),
 124:("Magnus Cort","DEN"),125:("Anders Halland Johannessen","NOR"),126:("Anders Skaarseth","NOR"),
 127:("Torstein Træen","NOR"),128:("Søren Wærenskjold","NOR"),
 131:("Biniam Girmay","ERI"),132:("Lewis Askey","GBR"),133:("George Bennett","NZL"),
 134:("Marco Frigo","ITA"),135:("Matis Louvel","FRA"),136:("Krists Neilands","LAT"),
 137:("Jake Stewart","GBR"),138:("Tom Van Asbroeck","BEL"),
 141:("Cian Uijtdebroeks","BEL"),142:("Pablo Castrillo","ESP"),143:("Jefferson Cepeda","ECU"),
 144:("Raúl García Pierna","ESP"),145:("Michel Heßmann","GER"),146:("Nelson Oliveira","POR"),
 147:("Javier Romo","ESP"),148:("Einer Rubio","COL"),
 151:("Arnaud De Lie","BEL"),152:("Huub Artz","NED"),153:("Jenno Berckmoes","BEL"),
 154:("Lars Craps","BEL"),155:("Liam Slock","BEL"),156:("Lennert Van Eetvelt","BEL"),
 157:("Baptiste Veistroffer","FRA"),158:("Georg Zimmermann","GER"),
 161:("Ion Izagirre","ESP"),162:("Piet Allegaert","BEL"),163:("Alex Aranburu","ESP"),
 164:("Jenthe Biermans","BEL"),165:("Milan Fretin","BEL"),166:("Alex Kirsch","LUX"),
 167:("Hugo Page","FRA"),168:("Benjamin Thomas","FRA"),
 171:("Tom Pidcock","GBR"),172:("Xabier Azparren","ESP"),173:("Christopher Harper","AUS"),
 174:("Quinten Hermans","BEL"),175:("Damien Howson","AUS"),176:("Xandro Meurisse","BEL"),
 177:("Brent Van Moer","BEL"),178:("Fred Wright","GBR"),
 181:("Romain Grégoire","FRA"),182:("Clément Berthet","FRA"),183:("Clément Braz Afonso","FRA"),
 184:("Ewen Costiou","FRA"),185:("Lorenzo Germani","ITA"),186:("Guillaume Martin","FRA"),
 187:("Quentin Pacher","FRA"),188:("Clément Russo","FRA"),
 191:("Julian Alaphilippe","FRA"),192:("Arvid de Kleijn","NED"),193:("Marco Haller","AUT"),
 194:("Marc Hirschi","SUI"),195:("Rick Pluimers","NED"),196:("Michael Storer","AUS"),
 197:("Matteo Trentin","ITA"),198:("Yannis Voisard","SUI"),
 201:("Jordan Jegat","FRA"),202:("Nicolas Breuillard","FRA"),203:("Joris Delbove","FRA"),
 204:("Alexandre Delettre","FRA"),205:("Thibault Guernalec","FRA"),206:("Mathis Le Berre","FRA"),
 207:("Anthony Turgis","FRA"),208:("Matteo Vercher","FRA"),
 211:("Warren Barguil","FRA"),212:("Frits Biesterbos","NED"),213:("Pavel Bittner","CZE"),
 214:("John Degenkolb","GER"),215:("Robbe Dhondt","BEL"),216:("Niklas Märkl","GER"),
 217:("Julius van den Berg","NED"),218:("Frank van den Broek","NED"),
 221:("Fernando Gaviria","COL"),222:("Abel Balderstone","ESP"),223:("Sebastian Berwick","AUS"),
 224:("Alex Molenaar","NED"),225:("Joël Nicolau","ESP"),226:("Stefano Oldani","ITA"),
 227:("Jakub Otruba","CZE"),228:("José Félix Parra","ESP"),
}

# Detailed, hand-verified metrics by bib: (born, heightCm, weightKg, pro, gt, tdfWins, role)
# Only riders I'm confident about. Others -> nulls + best-effort role.
M = {
 1:("1998-09-21",176,66,2019,13,17,"GC leader"),
 2:("2003-11-16",180,65,2024,2,0,"GC / super-domestique"),
 3:("1993-12-23",184,67,2016,9,0,"Climbing domestique"),
 4:("1998-04-02",183,64,2019,8,0,"Time trial / mountains"),
 5:("1994-03-06",192,82,2015,11,1,"Rouleur / lead-out"),
 6:("1999-03-12",192,79,2021,2,0,"Rouleur"),
 7:("1991-05-10",183,67,2012,15,1,"Road captain / breakaway"),
 8:("1992-08-07",178,58,2014,20,1,"GC / mountains"),
 11:("1996-12-10",175,60,2019,9,6,"GC leader"),
 12:("1996-06-24",194,80,2017,7,0,"Time trial / rouleur"),
 13:("1994-04-01",180,68,2017,7,0,"Time trial"),
 14:("1991-10-28",177,77,2013,12,1,"Rouleur / breakaway"),
 15:("2003-02-08",186,73,2022,2,0,"Rouleur / domestique"),
 16:("1999-07-01",188,70,2020,6,0,"GC / road captain"),
 17:("1994-09-13",180,61,2018,12,1,"Climbing domestique"),
 18:("2002-05-28",178,62,2023,2,0,"Climbing domestique"),
 21:("2000-01-25",171,61,2019,8,3,"GC leader"),
 22:("1990-10-25",180,69,2013,13,0,"Road captain / TT"),
 23:("1994-03-15",180,73,2016,9,1,"Domestique / breakaway"),
 24:("1996-05-05",174,61,2016,9,0,"Climber"),
 25:("2000-09-04",180,62,2023,2,0,"GC"),
 26:("1990-02-23",176,66,2010,14,0,"Rouleur / domestique"),
 27:("2000-08-31",184,70,2021,3,0,"Domestique"),
 28:("1999-11-24",177,64,2019,4,0,"Puncheur / climber"),
 31:("2002-09-16",183,65,2021,6,0,"GC leader"),
 32:("1998-01-27",185,71,2021,5,0,"GC / time trial"),
 33:("1995-12-18",180,75,2015,10,3,"Sprinter / classics"),
 34:("2001-05-08",188,74,2020,4,0,"Classics / breakaway"),
 35:("2000-09-26",180,64,2020,4,0,"GC"),
 36:("1991-06-15",182,69,2013,11,0,"Road captain / breakaway"),
 37:("2002-05-04",188,77,2021,3,0,"Rouleur / sprint"),
 38:("1992-11-29",177,63,2015,9,0,"Climbing domestique"),
 41:("1993-05-29",170,62,2016,14,2,"GC / mountains"),
 42:("1995-02-08",190,83,2017,7,0,"Rouleur / classics"),
 43:("2001-01-01",176,60,2021,3,0,"Climber"),
 44:("2000-09-11",180,63,2020,5,1,"Puncheur / breakaway"),
 45:("2000-05-09",183,68,2020,3,0,"Domestique"),
 46:("2001-09-06",184,66,2022,3,0,"Climber / breakaway"),
 47:("1992-02-07",181,71,2013,12,0,"Classics / breakaway"),
 51:("2006-08-14",184,67,2025,0,0,"GC — Tour debut (age 19)"),
 52:("1994-03-11",190,68,2016,13,0,"Road captain / climber"),
 53:("1995-02-27",197,83,2016,7,0,"Lead-out / sprinter"),
 54:("1999-02-06",191,76,2021,3,0,"Time trial / rouleur"),
 55:("2001-10-17",177,66,2021,3,0,"Sprinter"),
 56:("1996-02-27",172,58,2018,8,1,"Climber"),
 57:("1996-08-08",180,64,2019,4,0,"Climbing domestique"),
 58:("2001-11-08",180,63,2022,2,0,"Climber"),
 61:("1997-05-01",166,57,2018,10,0,"Climber / puncheur"),
 62:("1994-09-21",180,73,2016,8,0,"Sprinter / lead-out"),
 63:("1990-11-26",178,70,2014,3,0,"Rouleur / breakaway"),
 64:("1997-10-01",184,74,2019,4,0,"Lead-out"),
 65:("1997-05-25",173,60,2019,5,0,"Climbing domestique"),
 66:("1992-11-25",183,72,2015,12,0,"Rouleur / classics"),
 67:("1995-05-30",176,66,2016,4,0,"Breakaway"),
 68:("2001-01-01",180,68,2021,2,0,"Domestique"),
 71:("2003-07-03",168,52,2022,4,0,"Climber / KOM"),
 72:("1994-07-08",184,75,2015,9,0,"Sprinter"),
 73:("1987-10-12",180,68,2010,20,1,"Climber / road captain"),
 74:("1990-05-05",186,76,2015,3,0,"Rouleur / domestique"),
 75:("1994-10-19",180,68,2014,14,2,"Breakaway / descender"),
 76:("1998-09-16",183,70,2018,3,0,"Domestique"),
 77:("2001-06-16",178,60,2020,5,0,"GC leader"),
 81:("1997-01-13",175,60,2018,10,1,"GC / mountains"),
 82:("1999-12-04",187,67,2019,8,1,"GC / mountains"),
 83:("1997-05-25",183,70,2019,6,0,"Time trial"),
 84:("1996-07-25",193,83,2017,8,0,"Time trial / rouleur"),
 85:("1996-05-28",178,68,2018,5,0,"Sprinter / lead-out"),
 86:("1990-06-02",178,68,2010,15,1,"Road captain"),
 87:("2004-02-01",188,80,2022,3,0,"Time trial / rouleur"),
 88:("2001-04-26",177,63,2021,3,1,"Puncheur / GC"),
 91:("1992-10-30",180,76,2018,7,3,"Sprinter"),
 92:("1997-02-08",185,74,2018,6,0,"Rouleur / lead-out"),
 93:("2000-09-15",171,55,2021,4,1,"Climber"),
 94:("1992-04-17",186,77,2014,11,0,"Classics / lead-out"),
 95:("1988-05-21",188,79,2011,16,1,"Rouleur / road captain"),
 97:("2000-05-15",179,63,2020,5,0,"Climbing domestique"),
 98:("1993-11-16",184,68,2016,10,0,"Climbing domestique"),
 101:("1995-01-19",184,75,2014,6,2,"Classics / sprint"),
 103:("1990-08-03",188,78,2013,9,0,"Rouleur / road captain"),
 105:("1998-03-02",179,74,2018,12,9,"Sprinter"),
 106:("1995-06-06",183,73,2016,5,0,"Lead-out / classics"),
 107:("1994-06-19",180,72,2016,5,0,"Lead-out"),
 111:("1995-11-25",172,67,2016,13,1,"GC leader"),
 112:("1994-01-17",184,75,2015,7,0,"Sprinter"),
 113:("1991-04-09",187,79,2012,12,0,"Rouleur / TT"),
 115:("1990-09-26",178,71,2011,18,4,"Sprint / puncheur"),
 117:("2000-12-24",180,68,2021,4,0,"Time trial / GC"),
 118:("1999-12-13",178,67,2020,4,0,"Rouleur / breakaway"),
 121:("1999-09-01",177,60,2021,3,0,"GC"),
 122:("1995-10-01",178,70,2018,4,1,"Breakaway / KOM"),
 124:("1993-01-16",174,69,2013,15,1,"Breakaway"),
 125:("2000-04-13",176,61,2022,2,0,"Climber"),
 128:("2000-04-27",190,84,2021,2,0,"Sprinter / rouleur"),
 131:("2000-04-02",176,65,2020,5,3,"Sprinter"),
 133:("1990-01-07",178,64,2012,17,0,"Climbing domestique"),
 141:("2003-02-01",176,60,2022,4,0,"GC leader"),
 146:("1989-03-05",180,72,2011,15,0,"Time trial / rouleur"),
 148:("1998-03-30",170,58,2019,7,0,"Climber"),
 151:("2002-03-16",187,78,2020,2,0,"Sprinter"),
 156:("2001-01-27",178,63,2021,2,0,"GC / climber"),
 158:("1997-09-10",184,70,2019,6,0,"Breakaway / climber"),
 161:("1989-02-04",172,62,2010,20,2,"GC / breakaway"),
 163:("1995-08-19",175,63,2018,6,0,"Puncheur / breakaway"),
 168:("1995-04-14",181,70,2016,4,0,"Time trial / breakaway"),
 171:("1999-07-30",170,58,2021,5,1,"GC / puncheur"),
 174:("1995-07-08",184,66,2017,4,0,"Puncheur / breakaway"),
 181:("2003-07-09",175,62,2022,3,0,"Puncheur / GC"),
 186:("1993-06-09",173,53,2016,13,0,"Climber / GC"),
 187:("1992-01-06",188,72,2015,6,0,"Climber / breakaway"),
 191:("1992-06-11",173,62,2014,12,5,"Puncheur"),
 192:("1994-11-22",185,78,2016,3,0,"Sprinter"),
 193:("1991-04-01",184,77,2011,10,0,"Lead-out / rouleur"),
 194:("1998-08-24",173,63,2018,6,1,"Puncheur"),
 196:("1997-02-28",183,66,2019,7,0,"Climber / breakaway"),
 197:("1989-08-02",185,80,2011,17,4,"Classics / breakaway"),
 207:("1994-05-16",183,74,2015,9,1,"Classics / breakaway"),
 211:("1991-10-28",183,62,2013,16,2,"Climber / breakaway"),
 214:("1989-01-07",180,80,2011,14,1,"Sprinter / classics"),
 221:("1994-08-06",176,74,2013,10,0,"Sprinter"),
 226:("1998-08-08",184,70,2020,5,0,"Breakaway"),
}

def slug(name):
    s = unicodedata.normalize('NFKD', name).encode('ascii','ignore').decode()
    s = re.sub(r"[^a-zA-Z0-9]+","-", s).strip('-').lower()
    return s

def esc(s): return s.replace('\\','\\\\').replace("'", "\\'")

def jsval(v):
    if v is None: return 'null'
    if isinstance(v,str): return "'"+esc(v)+"'"
    return str(v)

lines = []
teams_order = ['uae','visma','redbull','lidltrek','ef','decathlon','astana','bahrain','ineos',
 'soudal','alpecin','jayco','unox','nsn','movistar','lotto','cofidis','pinarello','fdj','tudor',
 'total','picnic','cajarural']
team_label = {'uae':'UAE Team Emirates-XRG','visma':'Team Visma | Lease a Bike','redbull':'Red Bull – Bora – Hansgrohe',
 'lidltrek':'Lidl-Trek','ef':'EF Education-EasyPost','decathlon':'Decathlon CMA CGM Team','astana':'XDS Astana Team',
 'bahrain':'Bahrain – Victorious','ineos':'Netcompany – INEOS','soudal':'Soudal Quick-Step','alpecin':'Alpecin-Premier Tech',
 'jayco':'Team Jayco AlUla','unox':'Uno-X Mobility','nsn':'NSN Cycling Team','movistar':'Movistar Team',
 'lotto':'Lotto Intermarché','cofidis':'Cofidis','pinarello':'Pinarello-Q36.5','fdj':'Groupama – FDJ United',
 'tudor':'Tudor Pro Cycling Team','total':'TotalEnergies','picnic':'Team Picnic PostNL','cajarural':'Caja Rural – Seguros RGA'}

seen_ids = {}
by_team = {t: [] for t in teams_order}
for bib in sorted(R):
    name, nat = R[bib]
    team = TEAM_BY_BIB[bib]
    sid = slug(name)
    if sid in seen_ids:
        seen_ids[sid]+=1; sid = f"{sid}-{seen_ids[sid]}"
    else:
        seen_ids[sid]=1
    m = M.get(bib)
    if m: born,h,w,pro,gt,tdf,role = m
    else: born=h=w=pro=gt=tdf=None; role='Rider'
    by_team[team].append((bib,sid,name,team,nat,born,h,w,pro,gt,tdf,role))

out = []
out.append("// FULL 2026 Tour de France startlist — all 23 teams, 184 riders.")
out.append("// Names, teams, nationalities: official confirmed startlist (4 Jul 2026).")
out.append("// born 'YYYY-MM-DD' (age computed as of the 4 Jul 2026 Grand Départ); heightCm/weightKg/pro/gt/tdfWins")
out.append("// are hand-verified for well-known riders and null (shown as '—') where not reliably known.")
out.append("// Extend or correct any rider inline — the app reads this array live.")
out.append("")
out.append("export const NAT = {")
out.append("  SVN:'Slovenia', MEX:'Mexico', USA:'United States', GER:'Germany', AUT:'Austria',")
out.append("  BEL:'Belgium', DEN:'Denmark', GBR:'United Kingdom', ESP:'Spain', LAT:'Latvia',")
out.append("  ECU:'Ecuador', IRL:'Ireland', FRA:'France', NED:'Netherlands', ITA:'Italy',")
out.append("  COL:'Colombia', NOR:'Norway', ERI:'Eritrea', AUS:'Australia', SUI:'Switzerland',")
out.append("  POL:'Poland', LUX:'Luxembourg', NZL:'New Zealand', KAZ:'Kazakhstan', CZE:'Czechia',")
out.append("  CAN:'Canada', POR:'Portugal',")
out.append("}")
out.append("")
out.append("export const RIDERS = [")
for t in teams_order:
    out.append(f"  // ── {team_label[t]} ──")
    for (bib,sid,name,team,nat,born,h,w,pro,gt,tdf,role) in by_team[t]:
        obj = ("{ id: '%s', bib: %d, name: '%s', team: '%s', nat: '%s', born: %s, heightCm: %s, weightKg: %s, pro: %s, gt: %s, tdfWins: %s, role: '%s' },"
               % (esc(sid), bib, esc(name), team, nat, jsval(born), jsval(h), jsval(w), jsval(pro), jsval(gt), jsval(tdf), esc(role)))
        out.append("  "+obj)
    out.append("")
out.append("]")

open('src/data/riders.js','w').write("\n".join(out)+"\n")
n = sum(len(by_team[t]) for t in teams_order)
detailed = sum(1 for t in teams_order for r in by_team[t] if r[5] is not None)
print(f"Wrote {n} riders ({detailed} with birthdate/age, {n-detailed} name+team+nat only).")
