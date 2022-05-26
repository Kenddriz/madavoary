
export const areas = [
  { id: 1, name: 'Analamazaotra' },
  { id: 2, name: 'Andohahela' },
  { id: 3, name: 'Andringitra' },
  { id: 4, name: 'Ankarafantsika' },
  { id: 5, name: 'Baie de Baly' },
  { id: 6, name: 'Bemaraha' },
  { id: 7, name: 'Isalo' },
  { id: 8, name: 'Kirindy Mite' },
  { id: 9, name: 'Lokobe' },
  { id: 10, name: 'Mananara Nord' },

  { id: 11, name: 'Mantadia' },
  { id: 12, name: 'Marojejy' },
  { id: 13, name: 'Marolambo' },
  { id: 14, name: 'Masoala' },
  { id: 15, name: 'Midongy du sud' },
  { id: 16, name: 'Mikea' },
  { id: 17, name: 'Montange d\'Ambre' },
  { id: 18, name: 'Marin Nosy Hara' },
  { id: 19, name: 'Marin Nosy Tany Hely' },
  { id: 20, name: 'Nosy ve-Androka' },

  { id: 21, name: 'Ranomafana' },
  { id: 22, name: 'Sahamalaza' },
  { id: 23, name: 'Tsimanapesotse' },
  { id: 24, name: 'Zahamena' },
  { id: 25, name: 'Zombitse Vohibasia' },
  { id: 26, name: 'Ambatovaky' },
  { id: 27, name: 'Ambohitantely' },
  { id: 28, name: 'Anjanaharibe-Sud' },
  { id: 29, name: 'Ankarana' },
  { id: 30, name: 'Beza Mahafaly' },

  { id: 31, name: 'Cap Sainte-Marie' },
  { id: 32, name: 'kalambatritra' },
  { id: 33, name: 'Analamerana' },
  { id: 34, name: 'Pic d\'Ivohibe' },
  { id: 35, name: 'Mangerivola' },
  { id: 36, name: 'Manombo' },
  { id: 37, name: 'Manongarivo' },
  { id: 38, name: 'Marotandrano' },
  { id: 39, name: 'Betampo' },
  { id: 40, name: 'Tsaratanana' },
]

export const areaPage = (id: number): string => {
  let area = areas.find(a => a.id === id);
  if(!area) area = areas[0];
  return area.name.replace(/ /g, '-').toLowerCase();
}
