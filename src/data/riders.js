// FULL 2026 Tour de France startlist — all 23 teams, 184 riders.
// Names, teams, nationalities: official confirmed startlist (4 Jul 2026).
// born 'YYYY-MM-DD' (age computed as of the 4 Jul 2026 Grand Départ); heightCm/weightKg/pro/gt/tdfWins
// are hand-verified for well-known riders and null (shown as '—') where not reliably known.
// Extend or correct any rider inline — the app reads this array live.

export const NAT = {
  SVN:'Slovenia', MEX:'Mexico', USA:'United States', GER:'Germany', AUT:'Austria',
  BEL:'Belgium', DEN:'Denmark', GBR:'United Kingdom', ESP:'Spain', LAT:'Latvia',
  ECU:'Ecuador', IRL:'Ireland', FRA:'France', NED:'Netherlands', ITA:'Italy',
  COL:'Colombia', NOR:'Norway', ERI:'Eritrea', AUS:'Australia', SUI:'Switzerland',
  POL:'Poland', LUX:'Luxembourg', NZL:'New Zealand', KAZ:'Kazakhstan', CZE:'Czechia',
  CAN:'Canada', POR:'Portugal',
}

export const RIDERS = [
  // ── UAE Team Emirates-XRG ──
  { id: 'tadej-pogacar', bib: 1, name: 'Tadej Pogačar', team: 'uae', nat: 'SVN', born: '1998-09-21', heightCm: 176, weightKg: 66, pro: 2019, gt: 13, tdfWins: 17, role: 'GC leader' },
  { id: 'isaac-del-toro', bib: 2, name: 'Isaac del Toro', team: 'uae', nat: 'MEX', born: '2003-11-16', heightCm: 180, weightKg: 65, pro: 2024, gt: 2, tdfWins: 0, role: 'GC / super-domestique' },
  { id: 'felix-groschartner', bib: 3, name: 'Felix Großschartner', team: 'uae', nat: 'AUT', born: '1993-12-23', heightCm: 184, weightKg: 67, pro: 2016, gt: 9, tdfWins: 0, role: 'Climbing domestique' },
  { id: 'brandon-mcnulty', bib: 4, name: 'Brandon McNulty', team: 'uae', nat: 'USA', born: '1998-04-02', heightCm: 183, weightKg: 64, pro: 2019, gt: 8, tdfWins: 0, role: 'Time trial / mountains' },
  { id: 'nils-politt', bib: 5, name: 'Nils Politt', team: 'uae', nat: 'GER', born: '1994-03-06', heightCm: 192, weightKg: 82, pro: 2015, gt: 11, tdfWins: 1, role: 'Rouleur / lead-out' },
  { id: 'florian-vermeersch', bib: 6, name: 'Florian Vermeersch', team: 'uae', nat: 'BEL', born: '1999-03-12', heightCm: 192, weightKg: 79, pro: 2021, gt: 2, tdfWins: 0, role: 'Rouleur' },
  { id: 'tim-wellens', bib: 7, name: 'Tim Wellens', team: 'uae', nat: 'BEL', born: '1991-05-10', heightCm: 183, weightKg: 67, pro: 2012, gt: 15, tdfWins: 1, role: 'Road captain / breakaway' },
  { id: 'adam-yates', bib: 8, name: 'Adam Yates', team: 'uae', nat: 'GBR', born: '1992-08-07', heightCm: 178, weightKg: 58, pro: 2014, gt: 20, tdfWins: 1, role: 'GC / mountains' },

  // ── Team Visma | Lease a Bike ──
  { id: 'jonas-vingegaard', bib: 11, name: 'Jonas Vingegaard', team: 'visma', nat: 'DEN', born: '1996-12-10', heightCm: 175, weightKg: 60, pro: 2019, gt: 9, tdfWins: 6, role: 'GC leader' },
  { id: 'edoardo-affini', bib: 12, name: 'Edoardo Affini', team: 'visma', nat: 'ITA', born: '1996-06-24', heightCm: 194, weightKg: 80, pro: 2017, gt: 7, tdfWins: 0, role: 'Time trial / rouleur' },
  { id: 'bruno-armirail', bib: 13, name: 'Bruno Armirail', team: 'visma', nat: 'FRA', born: '1994-04-01', heightCm: 180, weightKg: 68, pro: 2017, gt: 7, tdfWins: 0, role: 'Time trial' },
  { id: 'victor-campenaerts', bib: 14, name: 'Victor Campenaerts', team: 'visma', nat: 'BEL', born: '1991-10-28', heightCm: 177, weightKg: 77, pro: 2013, gt: 12, tdfWins: 1, role: 'Rouleur / breakaway' },
  { id: 'per-strand-hagenes', bib: 15, name: 'Per Strand Hagenes', team: 'visma', nat: 'NOR', born: '2003-02-08', heightCm: 186, weightKg: 73, pro: 2022, gt: 2, tdfWins: 0, role: 'Rouleur / domestique' },
  { id: 'matteo-jorgenson', bib: 16, name: 'Matteo Jorgenson', team: 'visma', nat: 'USA', born: '1999-07-01', heightCm: 188, weightKg: 70, pro: 2020, gt: 6, tdfWins: 0, role: 'GC / road captain' },
  { id: 'sepp-kuss', bib: 17, name: 'Sepp Kuss', team: 'visma', nat: 'USA', born: '1994-09-13', heightCm: 180, weightKg: 61, pro: 2018, gt: 12, tdfWins: 1, role: 'Climbing domestique' },
  { id: 'davide-piganzoli', bib: 18, name: 'Davide Piganzoli', team: 'visma', nat: 'ITA', born: '2002-05-28', heightCm: 178, weightKg: 62, pro: 2023, gt: 2, tdfWins: 0, role: 'Climbing domestique' },

  // ── Red Bull – Bora – Hansgrohe ──
  { id: 'remco-evenepoel', bib: 21, name: 'Remco Evenepoel', team: 'redbull', nat: 'BEL', born: '2000-01-25', heightCm: 171, weightKg: 61, pro: 2019, gt: 8, tdfWins: 3, role: 'GC leader' },
  { id: 'mattia-cattaneo', bib: 22, name: 'Mattia Cattaneo', team: 'redbull', nat: 'ITA', born: '1990-10-25', heightCm: 180, weightKg: 69, pro: 2013, gt: 13, tdfWins: 0, role: 'Road captain / TT' },
  { id: 'nico-denz', bib: 23, name: 'Nico Denz', team: 'redbull', nat: 'GER', born: '1994-03-15', heightCm: 180, weightKg: 73, pro: 2016, gt: 9, tdfWins: 1, role: 'Domestique / breakaway' },
  { id: 'jai-hindley', bib: 24, name: 'Jai Hindley', team: 'redbull', nat: 'AUS', born: '1996-05-05', heightCm: 174, weightKg: 61, pro: 2016, gt: 9, tdfWins: 0, role: 'Climber' },
  { id: 'florian-lipowitz', bib: 25, name: 'Florian Lipowitz', team: 'redbull', nat: 'GER', born: '2000-09-04', heightCm: 180, weightKg: 62, pro: 2023, gt: 2, tdfWins: 0, role: 'GC' },
  { id: 'jan-tratnik', bib: 26, name: 'Jan Tratnik', team: 'redbull', nat: 'SVN', born: '1990-02-23', heightCm: 176, weightKg: 66, pro: 2010, gt: 14, tdfWins: 0, role: 'Rouleur / domestique' },
  { id: 'tim-van-dijke', bib: 27, name: 'Tim van Dijke', team: 'redbull', nat: 'NED', born: '2000-08-31', heightCm: 184, weightKg: 70, pro: 2021, gt: 3, tdfWins: 0, role: 'Domestique' },
  { id: 'maxim-van-gils', bib: 28, name: 'Maxim Van Gils', team: 'redbull', nat: 'BEL', born: '1999-11-24', heightCm: 177, weightKg: 64, pro: 2019, gt: 4, tdfWins: 0, role: 'Puncheur / climber' },

  // ── Lidl-Trek ──
  { id: 'juan-ayuso', bib: 31, name: 'Juan Ayuso', team: 'lidltrek', nat: 'ESP', born: '2002-09-16', heightCm: 183, weightKg: 65, pro: 2021, gt: 6, tdfWins: 0, role: 'GC leader' },
  { id: 'derek-gee', bib: 32, name: 'Derek Gee', team: 'lidltrek', nat: 'CAN', born: '1998-01-27', heightCm: 185, weightKg: 71, pro: 2021, gt: 5, tdfWins: 0, role: 'GC / time trial' },
  { id: 'mads-pedersen', bib: 33, name: 'Mads Pedersen', team: 'lidltrek', nat: 'DEN', born: '1995-12-18', heightCm: 180, weightKg: 75, pro: 2015, gt: 10, tdfWins: 3, role: 'Sprinter / classics' },
  { id: 'quinn-simmons', bib: 34, name: 'Quinn Simmons', team: 'lidltrek', nat: 'USA', born: '2001-05-08', heightCm: 188, weightKg: 74, pro: 2020, gt: 4, tdfWins: 0, role: 'Classics / breakaway' },
  { id: 'mattias-skjelmose', bib: 35, name: 'Mattias Skjelmose', team: 'lidltrek', nat: 'DEN', born: '2000-09-26', heightCm: 180, weightKg: 64, pro: 2020, gt: 4, tdfWins: 0, role: 'GC' },
  { id: 'toms-skujins', bib: 36, name: 'Toms Skujiņš', team: 'lidltrek', nat: 'LAT', born: '1991-06-15', heightCm: 182, weightKg: 69, pro: 2013, gt: 11, tdfWins: 0, role: 'Road captain / breakaway' },
  { id: 'mathias-vacek', bib: 37, name: 'Mathias Vacek', team: 'lidltrek', nat: 'CZE', born: '2002-05-04', heightCm: 188, weightKg: 77, pro: 2021, gt: 3, tdfWins: 0, role: 'Rouleur / sprint' },
  { id: 'carlos-verona', bib: 38, name: 'Carlos Verona', team: 'lidltrek', nat: 'ESP', born: '1992-11-29', heightCm: 177, weightKg: 63, pro: 2015, gt: 9, tdfWins: 0, role: 'Climbing domestique' },

  // ── EF Education-EasyPost ──
  { id: 'richard-carapaz', bib: 41, name: 'Richard Carapaz', team: 'ef', nat: 'ECU', born: '1993-05-29', heightCm: 170, weightKg: 62, pro: 2016, gt: 14, tdfWins: 2, role: 'GC / mountains' },
  { id: 'kasper-asgreen', bib: 42, name: 'Kasper Asgreen', team: 'ef', nat: 'DEN', born: '1995-02-08', heightCm: 190, weightKg: 83, pro: 2017, gt: 7, tdfWins: 0, role: 'Rouleur / classics' },
  { id: 'alex-baudin', bib: 43, name: 'Alex Baudin', team: 'ef', nat: 'FRA', born: '2001-01-01', heightCm: 176, weightKg: 60, pro: 2021, gt: 3, tdfWins: 0, role: 'Climber' },
  { id: 'ben-healy', bib: 44, name: 'Ben Healy', team: 'ef', nat: 'IRL', born: '2000-09-11', heightCm: 180, weightKg: 63, pro: 2020, gt: 5, tdfWins: 1, role: 'Puncheur / breakaway' },
  { id: 'sean-quinn', bib: 45, name: 'Sean Quinn', team: 'ef', nat: 'USA', born: '2000-05-09', heightCm: 183, weightKg: 68, pro: 2020, gt: 3, tdfWins: 0, role: 'Domestique' },
  { id: 'georg-steinhauser', bib: 46, name: 'Georg Steinhauser', team: 'ef', nat: 'GER', born: '2001-09-06', heightCm: 184, weightKg: 66, pro: 2022, gt: 3, tdfWins: 0, role: 'Climber / breakaway' },
  { id: 'michael-valgren', bib: 47, name: 'Michael Valgren', team: 'ef', nat: 'DEN', born: '1992-02-07', heightCm: 181, weightKg: 71, pro: 2013, gt: 12, tdfWins: 0, role: 'Classics / breakaway' },
  { id: 'max-walker', bib: 48, name: 'Max Walker', team: 'ef', nat: 'GBR', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },

  // ── Decathlon CMA CGM Team ──
  { id: 'paul-seixas', bib: 51, name: 'Paul Seixas', team: 'decathlon', nat: 'FRA', born: '2006-08-14', heightCm: 184, weightKg: 67, pro: 2025, gt: 0, tdfWins: 0, role: 'GC — Tour debut (age 19)' },
  { id: 'tiesj-benoot', bib: 52, name: 'Tiesj Benoot', team: 'decathlon', nat: 'BEL', born: '1994-03-11', heightCm: 190, weightKg: 68, pro: 2016, gt: 13, tdfWins: 0, role: 'Road captain / climber' },
  { id: 'cees-bol', bib: 53, name: 'Cees Bol', team: 'decathlon', nat: 'NED', born: '1995-02-27', heightCm: 197, weightKg: 83, pro: 2016, gt: 7, tdfWins: 0, role: 'Lead-out / sprinter' },
  { id: 'daan-hoole', bib: 54, name: 'Daan Hoole', team: 'decathlon', nat: 'NED', born: '1999-02-06', heightCm: 191, weightKg: 76, pro: 2021, gt: 3, tdfWins: 0, role: 'Time trial / rouleur' },
  { id: 'olav-kooij', bib: 55, name: 'Olav Kooij', team: 'decathlon', nat: 'NED', born: '2001-10-17', heightCm: 177, weightKg: 66, pro: 2021, gt: 3, tdfWins: 0, role: 'Sprinter' },
  { id: 'aurelien-paret-peintre', bib: 56, name: 'Aurélien Paret-Peintre', team: 'decathlon', nat: 'FRA', born: '1996-02-27', heightCm: 172, weightKg: 58, pro: 2018, gt: 8, tdfWins: 1, role: 'Climber' },
  { id: 'nicolas-prodhomme', bib: 57, name: 'Nicolas Prodhomme', team: 'decathlon', nat: 'FRA', born: '1996-08-08', heightCm: 180, weightKg: 64, pro: 2019, gt: 4, tdfWins: 0, role: 'Climbing domestique' },
  { id: 'matthew-riccitello', bib: 58, name: 'Matthew Riccitello', team: 'decathlon', nat: 'USA', born: '2001-11-08', heightCm: 180, weightKg: 63, pro: 2022, gt: 2, tdfWins: 0, role: 'Climber' },

  // ── XDS Astana Team ──
  { id: 'sergio-higuita', bib: 61, name: 'Sergio Higuita', team: 'astana', nat: 'COL', born: '1997-05-01', heightCm: 166, weightKg: 57, pro: 2018, gt: 10, tdfWins: 0, role: 'Climber / puncheur' },
  { id: 'davide-ballerini', bib: 62, name: 'Davide Ballerini', team: 'astana', nat: 'ITA', born: '1994-09-21', heightCm: 180, weightKg: 73, pro: 2016, gt: 8, tdfWins: 0, role: 'Sprinter / lead-out' },
  { id: 'aaron-gate', bib: 63, name: 'Aaron Gate', team: 'astana', nat: 'NZL', born: '1990-11-26', heightCm: 178, weightKg: 70, pro: 2014, gt: 3, tdfWins: 0, role: 'Rouleur / breakaway' },
  { id: 'max-kanter', bib: 64, name: 'Max Kanter', team: 'astana', nat: 'GER', born: '1997-10-01', heightCm: 184, weightKg: 74, pro: 2019, gt: 4, tdfWins: 0, role: 'Lead-out' },
  { id: 'harold-tejada', bib: 65, name: 'Harold Tejada', team: 'astana', nat: 'COL', born: '1997-05-25', heightCm: 173, weightKg: 60, pro: 2019, gt: 5, tdfWins: 0, role: 'Climbing domestique' },
  { id: 'mike-teunissen', bib: 66, name: 'Mike Teunissen', team: 'astana', nat: 'NED', born: '1992-11-25', heightCm: 183, weightKg: 72, pro: 2015, gt: 12, tdfWins: 0, role: 'Rouleur / classics' },
  { id: 'simone-velasco', bib: 67, name: 'Simone Velasco', team: 'astana', nat: 'ITA', born: '1995-05-30', heightCm: 176, weightKg: 66, pro: 2016, gt: 4, tdfWins: 0, role: 'Breakaway' },
  { id: 'nicolas-vinokurov', bib: 68, name: 'Nicolas Vinokurov', team: 'astana', nat: 'KAZ', born: '2001-01-01', heightCm: 180, weightKg: 68, pro: 2021, gt: 2, tdfWins: 0, role: 'Domestique' },

  // ── Bahrain – Victorious ──
  { id: 'lenny-martinez', bib: 71, name: 'Lenny Martinez', team: 'bahrain', nat: 'FRA', born: '2003-07-03', heightCm: 168, weightKg: 52, pro: 2022, gt: 4, tdfWins: 0, role: 'Climber / KOM' },
  { id: 'phil-bauhaus', bib: 72, name: 'Phil Bauhaus', team: 'bahrain', nat: 'GER', born: '1994-07-08', heightCm: 184, weightKg: 75, pro: 2015, gt: 9, tdfWins: 0, role: 'Sprinter' },
  { id: 'damiano-caruso', bib: 73, name: 'Damiano Caruso', team: 'bahrain', nat: 'ITA', born: '1987-10-12', heightCm: 180, weightKg: 68, pro: 2010, gt: 20, tdfWins: 1, role: 'Climber / road captain' },
  { id: 'kamil-gradek', bib: 74, name: 'Kamil Gradek', team: 'bahrain', nat: 'POL', born: '1990-05-05', heightCm: 186, weightKg: 76, pro: 2015, gt: 3, tdfWins: 0, role: 'Rouleur / domestique' },
  { id: 'matej-mohoric', bib: 75, name: 'Matej Mohorič', team: 'bahrain', nat: 'SVN', born: '1994-10-19', heightCm: 180, weightKg: 68, pro: 2014, gt: 14, tdfWins: 2, role: 'Breakaway / descender' },
  { id: 'robert-stannard', bib: 76, name: 'Robert Stannard', team: 'bahrain', nat: 'AUS', born: '1998-09-16', heightCm: 183, weightKg: 70, pro: 2018, gt: 3, tdfWins: 0, role: 'Domestique' },
  { id: 'antonio-tiberi', bib: 77, name: 'Antonio Tiberi', team: 'bahrain', nat: 'ITA', born: '2001-06-16', heightCm: 178, weightKg: 60, pro: 2020, gt: 5, tdfWins: 0, role: 'GC leader' },
  { id: 'vlad-van-mechelen', bib: 78, name: 'Vlad van Mechelen', team: 'bahrain', nat: 'BEL', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },

  // ── Netcompany – INEOS ──
  { id: 'egan-bernal', bib: 81, name: 'Egan Bernal', team: 'ineos', nat: 'COL', born: '1997-01-13', heightCm: 175, weightKg: 60, pro: 2018, gt: 10, tdfWins: 1, role: 'GC / mountains' },
  { id: 'thymen-arensman', bib: 82, name: 'Thymen Arensman', team: 'ineos', nat: 'NED', born: '1999-12-04', heightCm: 187, weightKg: 67, pro: 2019, gt: 8, tdfWins: 1, role: 'GC / mountains' },
  { id: 'tobias-foss', bib: 83, name: 'Tobias Foss', team: 'ineos', nat: 'NOR', born: '1997-05-25', heightCm: 183, weightKg: 70, pro: 2019, gt: 6, tdfWins: 0, role: 'Time trial' },
  { id: 'filippo-ganna', bib: 84, name: 'Filippo Ganna', team: 'ineos', nat: 'ITA', born: '1996-07-25', heightCm: 193, weightKg: 83, pro: 2017, gt: 8, tdfWins: 0, role: 'Time trial / rouleur' },
  { id: 'dorian-godon', bib: 85, name: 'Dorian Godon', team: 'ineos', nat: 'FRA', born: '1996-05-28', heightCm: 178, weightKg: 68, pro: 2018, gt: 5, tdfWins: 0, role: 'Sprinter / lead-out' },
  { id: 'micha-kwiatkowski', bib: 86, name: 'Michał Kwiatkowski', team: 'ineos', nat: 'POL', born: '1990-06-02', heightCm: 178, weightKg: 68, pro: 2010, gt: 15, tdfWins: 1, role: 'Road captain' },
  { id: 'joshua-tarling', bib: 87, name: 'Joshua Tarling', team: 'ineos', nat: 'GBR', born: '2004-02-01', heightCm: 188, weightKg: 80, pro: 2022, gt: 3, tdfWins: 0, role: 'Time trial / rouleur' },
  { id: 'kevin-vauquelin', bib: 88, name: 'Kévin Vauquelin', team: 'ineos', nat: 'FRA', born: '2001-04-26', heightCm: 177, weightKg: 63, pro: 2021, gt: 3, tdfWins: 1, role: 'Puncheur / GC' },

  // ── Soudal Quick-Step ──
  { id: 'tim-merlier', bib: 91, name: 'Tim Merlier', team: 'soudal', nat: 'BEL', born: '1992-10-30', heightCm: 180, weightKg: 76, pro: 2018, gt: 7, tdfWins: 3, role: 'Sprinter' },
  { id: 'pascal-eenkhoorn', bib: 92, name: 'Pascal Eenkhoorn', team: 'soudal', nat: 'NED', born: '1997-02-08', heightCm: 185, weightKg: 74, pro: 2018, gt: 6, tdfWins: 0, role: 'Rouleur / lead-out' },
  { id: 'valentin-paret-peintre', bib: 93, name: 'Valentin Paret-Peintre', team: 'soudal', nat: 'FRA', born: '2000-09-15', heightCm: 171, weightKg: 55, pro: 2021, gt: 4, tdfWins: 1, role: 'Climber' },
  { id: 'jasper-stuyven', bib: 94, name: 'Jasper Stuyven', team: 'soudal', nat: 'BEL', born: '1992-04-17', heightCm: 186, weightKg: 77, pro: 2014, gt: 11, tdfWins: 0, role: 'Classics / lead-out' },
  { id: 'dylan-van-baarle', bib: 95, name: 'Dylan van Baarle', team: 'soudal', nat: 'NED', born: '1988-05-21', heightCm: 188, weightKg: 79, pro: 2011, gt: 16, tdfWins: 1, role: 'Rouleur / road captain' },
  { id: 'bert-van-lerberghe', bib: 96, name: 'Bert Van Lerberghe', team: 'soudal', nat: 'BEL', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'ilan-van-wilder', bib: 97, name: 'Ilan Van Wilder', team: 'soudal', nat: 'BEL', born: '2000-05-15', heightCm: 179, weightKg: 63, pro: 2020, gt: 5, tdfWins: 0, role: 'Climbing domestique' },
  { id: 'louis-vervaeke', bib: 98, name: 'Louis Vervaeke', team: 'soudal', nat: 'BEL', born: '1993-11-16', heightCm: 184, weightKg: 68, pro: 2016, gt: 10, tdfWins: 0, role: 'Climbing domestique' },

  // ── Alpecin-Premier Tech ──
  { id: 'mathieu-van-der-poel', bib: 101, name: 'Mathieu van der Poel', team: 'alpecin', nat: 'NED', born: '1995-01-19', heightCm: 184, weightKg: 75, pro: 2014, gt: 6, tdfWins: 2, role: 'Classics / sprint' },
  { id: 'ramses-debruyne', bib: 102, name: 'Ramses Debruyne', team: 'alpecin', nat: 'BEL', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'silvan-dillier', bib: 103, name: 'Silvan Dillier', team: 'alpecin', nat: 'SUI', born: '1990-08-03', heightCm: 188, weightKg: 78, pro: 2013, gt: 9, tdfWins: 0, role: 'Rouleur / road captain' },
  { id: 'tim-marsman', bib: 104, name: 'Tim Marsman', team: 'alpecin', nat: 'NED', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'jasper-philipsen', bib: 105, name: 'Jasper Philipsen', team: 'alpecin', nat: 'BEL', born: '1998-03-02', heightCm: 179, weightKg: 74, pro: 2018, gt: 12, tdfWins: 9, role: 'Sprinter' },
  { id: 'edward-planckaert', bib: 106, name: 'Edward Planckaert', team: 'alpecin', nat: 'BEL', born: '1995-06-06', heightCm: 183, weightKg: 73, pro: 2016, gt: 5, tdfWins: 0, role: 'Lead-out / classics' },
  { id: 'jonas-rickaert', bib: 107, name: 'Jonas Rickaert', team: 'alpecin', nat: 'BEL', born: '1994-06-19', heightCm: 180, weightKg: 72, pro: 2016, gt: 5, tdfWins: 0, role: 'Lead-out' },
  { id: 'emiel-verstrynge', bib: 108, name: 'Emiel Verstrynge', team: 'alpecin', nat: 'BEL', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },

  // ── Team Jayco AlUla ──
  { id: 'ben-o-connor', bib: 111, name: 'Ben O\'Connor', team: 'jayco', nat: 'AUS', born: '1995-11-25', heightCm: 172, weightKg: 67, pro: 2016, gt: 13, tdfWins: 1, role: 'GC leader' },
  { id: 'pascal-ackermann', bib: 112, name: 'Pascal Ackermann', team: 'jayco', nat: 'GER', born: '1994-01-17', heightCm: 184, weightKg: 75, pro: 2015, gt: 7, tdfWins: 0, role: 'Sprinter' },
  { id: 'luke-durbridge', bib: 113, name: 'Luke Durbridge', team: 'jayco', nat: 'AUS', born: '1991-04-09', heightCm: 187, weightKg: 79, pro: 2012, gt: 12, tdfWins: 0, role: 'Rouleur / TT' },
  { id: 'felix-engelhardt', bib: 114, name: 'Felix Engelhardt', team: 'jayco', nat: 'GER', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'michael-matthews', bib: 115, name: 'Michael Matthews', team: 'jayco', nat: 'AUS', born: '1990-09-26', heightCm: 178, weightKg: 71, pro: 2011, gt: 18, tdfWins: 4, role: 'Sprint / puncheur' },
  { id: 'kelland-o-brien', bib: 116, name: 'Kelland O\'Brien', team: 'jayco', nat: 'AUS', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'luke-plapp', bib: 117, name: 'Luke Plapp', team: 'jayco', nat: 'AUS', born: '2000-12-24', heightCm: 180, weightKg: 68, pro: 2021, gt: 4, tdfWins: 0, role: 'Time trial / GC' },
  { id: 'mauro-schmid', bib: 118, name: 'Mauro Schmid', team: 'jayco', nat: 'SUI', born: '1999-12-13', heightCm: 178, weightKg: 67, pro: 2020, gt: 4, tdfWins: 0, role: 'Rouleur / breakaway' },

  // ── Uno-X Mobility ──
  { id: 'tobias-halland-johannessen', bib: 121, name: 'Tobias Halland Johannessen', team: 'unox', nat: 'NOR', born: '1999-09-01', heightCm: 177, weightKg: 60, pro: 2021, gt: 3, tdfWins: 0, role: 'GC' },
  { id: 'jonas-abrahamsen', bib: 122, name: 'Jonas Abrahamsen', team: 'unox', nat: 'NOR', born: '1995-10-01', heightCm: 178, weightKg: 70, pro: 2018, gt: 4, tdfWins: 1, role: 'Breakaway / KOM' },
  { id: 'anthon-charmig', bib: 123, name: 'Anthon Charmig', team: 'unox', nat: 'DEN', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'magnus-cort', bib: 124, name: 'Magnus Cort', team: 'unox', nat: 'DEN', born: '1993-01-16', heightCm: 174, weightKg: 69, pro: 2013, gt: 15, tdfWins: 1, role: 'Breakaway' },
  { id: 'anders-halland-johannessen', bib: 125, name: 'Anders Halland Johannessen', team: 'unox', nat: 'NOR', born: '2000-04-13', heightCm: 176, weightKg: 61, pro: 2022, gt: 2, tdfWins: 0, role: 'Climber' },
  { id: 'anders-skaarseth', bib: 126, name: 'Anders Skaarseth', team: 'unox', nat: 'NOR', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'torstein-tren', bib: 127, name: 'Torstein Træen', team: 'unox', nat: 'NOR', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'sren-wrenskjold', bib: 128, name: 'Søren Wærenskjold', team: 'unox', nat: 'NOR', born: '2000-04-27', heightCm: 190, weightKg: 84, pro: 2021, gt: 2, tdfWins: 0, role: 'Sprinter / rouleur' },

  // ── NSN Cycling Team ──
  { id: 'biniam-girmay', bib: 131, name: 'Biniam Girmay', team: 'nsn', nat: 'ERI', born: '2000-04-02', heightCm: 176, weightKg: 65, pro: 2020, gt: 5, tdfWins: 3, role: 'Sprinter' },
  { id: 'lewis-askey', bib: 132, name: 'Lewis Askey', team: 'nsn', nat: 'GBR', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'george-bennett', bib: 133, name: 'George Bennett', team: 'nsn', nat: 'NZL', born: '1990-01-07', heightCm: 178, weightKg: 64, pro: 2012, gt: 17, tdfWins: 0, role: 'Climbing domestique' },
  { id: 'marco-frigo', bib: 134, name: 'Marco Frigo', team: 'nsn', nat: 'ITA', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'matis-louvel', bib: 135, name: 'Matis Louvel', team: 'nsn', nat: 'FRA', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'krists-neilands', bib: 136, name: 'Krists Neilands', team: 'nsn', nat: 'LAT', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'jake-stewart', bib: 137, name: 'Jake Stewart', team: 'nsn', nat: 'GBR', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'tom-van-asbroeck', bib: 138, name: 'Tom Van Asbroeck', team: 'nsn', nat: 'BEL', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },

  // ── Movistar Team ──
  { id: 'cian-uijtdebroeks', bib: 141, name: 'Cian Uijtdebroeks', team: 'movistar', nat: 'BEL', born: '2003-02-01', heightCm: 176, weightKg: 60, pro: 2022, gt: 4, tdfWins: 0, role: 'GC leader' },
  { id: 'pablo-castrillo', bib: 142, name: 'Pablo Castrillo', team: 'movistar', nat: 'ESP', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'jefferson-cepeda', bib: 143, name: 'Jefferson Cepeda', team: 'movistar', nat: 'ECU', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'raul-garcia-pierna', bib: 144, name: 'Raúl García Pierna', team: 'movistar', nat: 'ESP', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'michel-hemann', bib: 145, name: 'Michel Heßmann', team: 'movistar', nat: 'GER', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'nelson-oliveira', bib: 146, name: 'Nelson Oliveira', team: 'movistar', nat: 'POR', born: '1989-03-05', heightCm: 180, weightKg: 72, pro: 2011, gt: 15, tdfWins: 0, role: 'Time trial / rouleur' },
  { id: 'javier-romo', bib: 147, name: 'Javier Romo', team: 'movistar', nat: 'ESP', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'einer-rubio', bib: 148, name: 'Einer Rubio', team: 'movistar', nat: 'COL', born: '1998-03-30', heightCm: 170, weightKg: 58, pro: 2019, gt: 7, tdfWins: 0, role: 'Climber' },

  // ── Lotto Intermarché ──
  { id: 'arnaud-de-lie', bib: 151, name: 'Arnaud De Lie', team: 'lotto', nat: 'BEL', born: '2002-03-16', heightCm: 187, weightKg: 78, pro: 2020, gt: 2, tdfWins: 0, role: 'Sprinter' },
  { id: 'huub-artz', bib: 152, name: 'Huub Artz', team: 'lotto', nat: 'NED', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'jenno-berckmoes', bib: 153, name: 'Jenno Berckmoes', team: 'lotto', nat: 'BEL', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'lars-craps', bib: 154, name: 'Lars Craps', team: 'lotto', nat: 'BEL', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'liam-slock', bib: 155, name: 'Liam Slock', team: 'lotto', nat: 'BEL', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'lennert-van-eetvelt', bib: 156, name: 'Lennert Van Eetvelt', team: 'lotto', nat: 'BEL', born: '2001-01-27', heightCm: 178, weightKg: 63, pro: 2021, gt: 2, tdfWins: 0, role: 'GC / climber' },
  { id: 'baptiste-veistroffer', bib: 157, name: 'Baptiste Veistroffer', team: 'lotto', nat: 'FRA', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'georg-zimmermann', bib: 158, name: 'Georg Zimmermann', team: 'lotto', nat: 'GER', born: '1997-09-10', heightCm: 184, weightKg: 70, pro: 2019, gt: 6, tdfWins: 0, role: 'Breakaway / climber' },

  // ── Cofidis ──
  { id: 'ion-izagirre', bib: 161, name: 'Ion Izagirre', team: 'cofidis', nat: 'ESP', born: '1989-02-04', heightCm: 172, weightKg: 62, pro: 2010, gt: 20, tdfWins: 2, role: 'GC / breakaway' },
  { id: 'piet-allegaert', bib: 162, name: 'Piet Allegaert', team: 'cofidis', nat: 'BEL', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'alex-aranburu', bib: 163, name: 'Alex Aranburu', team: 'cofidis', nat: 'ESP', born: '1995-08-19', heightCm: 175, weightKg: 63, pro: 2018, gt: 6, tdfWins: 0, role: 'Puncheur / breakaway' },
  { id: 'jenthe-biermans', bib: 164, name: 'Jenthe Biermans', team: 'cofidis', nat: 'BEL', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'milan-fretin', bib: 165, name: 'Milan Fretin', team: 'cofidis', nat: 'BEL', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'alex-kirsch', bib: 166, name: 'Alex Kirsch', team: 'cofidis', nat: 'LUX', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'hugo-page', bib: 167, name: 'Hugo Page', team: 'cofidis', nat: 'FRA', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'benjamin-thomas', bib: 168, name: 'Benjamin Thomas', team: 'cofidis', nat: 'FRA', born: '1995-04-14', heightCm: 181, weightKg: 70, pro: 2016, gt: 4, tdfWins: 0, role: 'Time trial / breakaway' },

  // ── Pinarello-Q36.5 ──
  { id: 'tom-pidcock', bib: 171, name: 'Tom Pidcock', team: 'pinarello', nat: 'GBR', born: '1999-07-30', heightCm: 170, weightKg: 58, pro: 2021, gt: 5, tdfWins: 1, role: 'GC / puncheur' },
  { id: 'xabier-azparren', bib: 172, name: 'Xabier Azparren', team: 'pinarello', nat: 'ESP', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'christopher-harper', bib: 173, name: 'Christopher Harper', team: 'pinarello', nat: 'AUS', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'quinten-hermans', bib: 174, name: 'Quinten Hermans', team: 'pinarello', nat: 'BEL', born: '1995-07-08', heightCm: 184, weightKg: 66, pro: 2017, gt: 4, tdfWins: 0, role: 'Puncheur / breakaway' },
  { id: 'damien-howson', bib: 175, name: 'Damien Howson', team: 'pinarello', nat: 'AUS', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'xandro-meurisse', bib: 176, name: 'Xandro Meurisse', team: 'pinarello', nat: 'BEL', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'brent-van-moer', bib: 177, name: 'Brent Van Moer', team: 'pinarello', nat: 'BEL', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'fred-wright', bib: 178, name: 'Fred Wright', team: 'pinarello', nat: 'GBR', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },

  // ── Groupama – FDJ United ──
  { id: 'romain-gregoire', bib: 181, name: 'Romain Grégoire', team: 'fdj', nat: 'FRA', born: '2003-07-09', heightCm: 175, weightKg: 62, pro: 2022, gt: 3, tdfWins: 0, role: 'Puncheur / GC' },
  { id: 'clement-berthet', bib: 182, name: 'Clément Berthet', team: 'fdj', nat: 'FRA', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'clement-braz-afonso', bib: 183, name: 'Clément Braz Afonso', team: 'fdj', nat: 'FRA', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'ewen-costiou', bib: 184, name: 'Ewen Costiou', team: 'fdj', nat: 'FRA', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'lorenzo-germani', bib: 185, name: 'Lorenzo Germani', team: 'fdj', nat: 'ITA', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'guillaume-martin', bib: 186, name: 'Guillaume Martin', team: 'fdj', nat: 'FRA', born: '1993-06-09', heightCm: 173, weightKg: 53, pro: 2016, gt: 13, tdfWins: 0, role: 'Climber / GC' },
  { id: 'quentin-pacher', bib: 187, name: 'Quentin Pacher', team: 'fdj', nat: 'FRA', born: '1992-01-06', heightCm: 188, weightKg: 72, pro: 2015, gt: 6, tdfWins: 0, role: 'Climber / breakaway' },
  { id: 'clement-russo', bib: 188, name: 'Clément Russo', team: 'fdj', nat: 'FRA', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },

  // ── Tudor Pro Cycling Team ──
  { id: 'julian-alaphilippe', bib: 191, name: 'Julian Alaphilippe', team: 'tudor', nat: 'FRA', born: '1992-06-11', heightCm: 173, weightKg: 62, pro: 2014, gt: 12, tdfWins: 5, role: 'Puncheur' },
  { id: 'arvid-de-kleijn', bib: 192, name: 'Arvid de Kleijn', team: 'tudor', nat: 'NED', born: '1994-11-22', heightCm: 185, weightKg: 78, pro: 2016, gt: 3, tdfWins: 0, role: 'Sprinter' },
  { id: 'marco-haller', bib: 193, name: 'Marco Haller', team: 'tudor', nat: 'AUT', born: '1991-04-01', heightCm: 184, weightKg: 77, pro: 2011, gt: 10, tdfWins: 0, role: 'Lead-out / rouleur' },
  { id: 'marc-hirschi', bib: 194, name: 'Marc Hirschi', team: 'tudor', nat: 'SUI', born: '1998-08-24', heightCm: 173, weightKg: 63, pro: 2018, gt: 6, tdfWins: 1, role: 'Puncheur' },
  { id: 'rick-pluimers', bib: 195, name: 'Rick Pluimers', team: 'tudor', nat: 'NED', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'michael-storer', bib: 196, name: 'Michael Storer', team: 'tudor', nat: 'AUS', born: '1997-02-28', heightCm: 183, weightKg: 66, pro: 2019, gt: 7, tdfWins: 0, role: 'Climber / breakaway' },
  { id: 'matteo-trentin', bib: 197, name: 'Matteo Trentin', team: 'tudor', nat: 'ITA', born: '1989-08-02', heightCm: 185, weightKg: 80, pro: 2011, gt: 17, tdfWins: 4, role: 'Classics / breakaway' },
  { id: 'yannis-voisard', bib: 198, name: 'Yannis Voisard', team: 'tudor', nat: 'SUI', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },

  // ── TotalEnergies ──
  { id: 'jordan-jegat', bib: 201, name: 'Jordan Jegat', team: 'total', nat: 'FRA', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'nicolas-breuillard', bib: 202, name: 'Nicolas Breuillard', team: 'total', nat: 'FRA', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'joris-delbove', bib: 203, name: 'Joris Delbove', team: 'total', nat: 'FRA', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'alexandre-delettre', bib: 204, name: 'Alexandre Delettre', team: 'total', nat: 'FRA', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'thibault-guernalec', bib: 205, name: 'Thibault Guernalec', team: 'total', nat: 'FRA', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'mathis-le-berre', bib: 206, name: 'Mathis Le Berre', team: 'total', nat: 'FRA', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'anthony-turgis', bib: 207, name: 'Anthony Turgis', team: 'total', nat: 'FRA', born: '1994-05-16', heightCm: 183, weightKg: 74, pro: 2015, gt: 9, tdfWins: 1, role: 'Classics / breakaway' },
  { id: 'matteo-vercher', bib: 208, name: 'Matteo Vercher', team: 'total', nat: 'FRA', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },

  // ── Team Picnic PostNL ──
  { id: 'warren-barguil', bib: 211, name: 'Warren Barguil', team: 'picnic', nat: 'FRA', born: '1991-10-28', heightCm: 183, weightKg: 62, pro: 2013, gt: 16, tdfWins: 2, role: 'Climber / breakaway' },
  { id: 'frits-biesterbos', bib: 212, name: 'Frits Biesterbos', team: 'picnic', nat: 'NED', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'pavel-bittner', bib: 213, name: 'Pavel Bittner', team: 'picnic', nat: 'CZE', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'john-degenkolb', bib: 214, name: 'John Degenkolb', team: 'picnic', nat: 'GER', born: '1989-01-07', heightCm: 180, weightKg: 80, pro: 2011, gt: 14, tdfWins: 1, role: 'Sprinter / classics' },
  { id: 'robbe-dhondt', bib: 215, name: 'Robbe Dhondt', team: 'picnic', nat: 'BEL', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'niklas-markl', bib: 216, name: 'Niklas Märkl', team: 'picnic', nat: 'GER', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'julius-van-den-berg', bib: 217, name: 'Julius van den Berg', team: 'picnic', nat: 'NED', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'frank-van-den-broek', bib: 218, name: 'Frank van den Broek', team: 'picnic', nat: 'NED', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },

  // ── Caja Rural – Seguros RGA ──
  { id: 'fernando-gaviria', bib: 221, name: 'Fernando Gaviria', team: 'cajarural', nat: 'COL', born: '1994-08-06', heightCm: 176, weightKg: 74, pro: 2013, gt: 10, tdfWins: 0, role: 'Sprinter' },
  { id: 'abel-balderstone', bib: 222, name: 'Abel Balderstone', team: 'cajarural', nat: 'ESP', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'sebastian-berwick', bib: 223, name: 'Sebastian Berwick', team: 'cajarural', nat: 'AUS', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'alex-molenaar', bib: 224, name: 'Alex Molenaar', team: 'cajarural', nat: 'NED', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'joel-nicolau', bib: 225, name: 'Joël Nicolau', team: 'cajarural', nat: 'ESP', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'stefano-oldani', bib: 226, name: 'Stefano Oldani', team: 'cajarural', nat: 'ITA', born: '1998-08-08', heightCm: 184, weightKg: 70, pro: 2020, gt: 5, tdfWins: 0, role: 'Breakaway' },
  { id: 'jakub-otruba', bib: 227, name: 'Jakub Otruba', team: 'cajarural', nat: 'CZE', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },
  { id: 'jose-felix-parra', bib: 228, name: 'José Félix Parra', team: 'cajarural', nat: 'ESP', born: null, heightCm: null, weightKg: null, pro: null, gt: null, tdfWins: null, role: 'Rider' },

]

// Riders out of the race — update this map daily as abandons happen.
// Key = rider id, value = short reason shown in the app.
export const OUT = {
  'clement-berthet': 'DNS stage 2 — crash in the Barcelona team time trial',
}

// ISO3 -> flag emoji for every nationality in the race
export const FLAG = {
  SVN:'🇸🇮', MEX:'🇲🇽', USA:'🇺🇸', GER:'🇩🇪', AUT:'🇦🇹', BEL:'🇧🇪', DEN:'🇩🇰', GBR:'🇬🇧',
  ESP:'🇪🇸', LAT:'🇱🇻', ECU:'🇪🇨', IRL:'🇮🇪', FRA:'🇫🇷', NED:'🇳🇱', ITA:'🇮🇹', COL:'🇨🇴',
  NOR:'🇳🇴', ERI:'🇪🇷', AUS:'🇦🇺', SUI:'🇨🇭', POL:'🇵🇱', LUX:'🇱🇺', NZL:'🇳🇿', KAZ:'🇰🇿',
  CZE:'🇨🇿', CAN:'🇨🇦', POR:'🇵🇹',
}
