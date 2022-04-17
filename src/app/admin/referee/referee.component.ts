import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-referee',
  templateUrl: './referee.component.html',
  styleUrls: ['./referee.component.scss'],
})
export class RefereeComponent implements OnInit {

  races: Race[] = [];
  teamsK: TeamResult[] = [];
  teamsMK: TeamResult[] = [];
  selectedRace: Race;
  wb: XLSX.WorkBook;
  loaded = false;
  lastrace = true; // FIXME:
  kRaceIndex: number[] = [];
  mkRaceIndex: number[] = [];

  constructor(
    private datePipe: DatePipe
  ) { }

  //--
  // FIXME: 
  // Így nem működik a dolog, ezért csak elnavigálunk ide:
  navigate() {
    window.open('https://tisincvetraceapp.web.app/home', "_blank");
  }

  //--

  ngOnInit(): void {
    window.addEventListener('load', () => {
      const entryFilesSelector = document.getElementById('loadEntries');
      const startListFileSelector = document.getElementById('loadfStartList');
      entryFilesSelector.addEventListener('change', (event: any) => {
        const fileList = event.target.files;
        console.log(fileList);
        this.readEntries(fileList);
      });
      startListFileSelector.addEventListener('change', (event: any) => {
        const fileList = event.target.files;
        const f = fileList[0];
        this.readStartList(f);
      });
    });
  }

  // TODO: iterate through entries and process them -> create start list
  readEntries(files) {
    const f = files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      const result = new Uint8Array(event.target.result as ArrayBuffer);

      const wb = XLSX.read(result, { type: 'array' });
      // this.processEntry(wb);

    });

    reader.readAsArrayBuffer(f);
    // this.loaded = true;
  }

  readStartList(f) {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      const result = new Uint8Array(event.target.result as ArrayBuffer);

      this.wb = XLSX.read(result, { type: 'array', cellDates: true });
      this.processStartList(this.wb);

    });

    reader.readAsArrayBuffer(f);
  }

  processStartList(wb: XLSX.WorkBook) {
    // first sheet in workbook
    const ws = wb.Sheets[wb.SheetNames[0]];
    // const ws = wb.Sheets['Sheet1'];
    // console.log(ws);
    const data = XLSX.utils.sheet_to_json(ws);
    // console.log(data);

    const searchStr = Object.keys(data[0])[0]; // text in A1 cell, usually STARTNE LISTE
    const emtptyStr = Object.keys(data[6])[0]; // '__EMPTY'

    let race: Race = { id: 0, category: '', description: '', time: '' };
    let competitor: Competitor;
    let competitors: Competitor[] = [];

    data.forEach(obj => {
      if (typeof (obj[searchStr]) === 'number') {
        race.competitors = competitors;
        this.races.push(race);
        competitors = [];
        race = {
          id: obj[searchStr],
          description: obj['__EMPTY_1'],
          category: obj['__EMPTY_2'],
          time: obj['__EMPTY_5'],
        };
        try {
          race.description = race.description.trim();
          race.category = race.category.trim();
          // race.displayTime = XLSX.SSF.parse_date_code(race.time);
          race.displayTime = this.datePipe.transform(race.time, 'HH:mm');
        } catch (error) {
          console.error(error);
        }
        race.displayText = race.id + '. ' + race.description + ' - ' + race.category + ' ' + race.displayTime;
      } else if (typeof (obj[emtptyStr]) === 'number' && obj['__EMPTY_1']) {
        competitor = {
          start_num: obj['__EMPTY'],
          name: obj['__EMPTY_1'],
          club: obj['__EMPTY_2'],
          city: obj['__EMPTY_3'],
          displayText: '',
          points: null
        };
        try {
          competitor.name = competitor.name.trim();
          competitor.club = competitor.club.trim();
          competitor.city = competitor.city.trim();
        } catch (error) {
          console.error(error);
        }
        competitor.displayText = competitor.start_num + ' ' + competitor.name + ' - ' + competitor.club;
        competitors.push(competitor);
      }
    });
    race.competitors = competitors;
    this.races.push(race);
    this.races.shift();

    this.createTeams();
    this.loaded = true;
  }

  createTeams() {
    const clubs: Set<string> = new Set();
    const clubsMK: Set<string> = new Set();

    this.races.forEach(race => {
      if ((race.description.indexOf('K') === 0)) {
        race.competitors.forEach(competitor => {
          clubs.add(competitor.club);
        });
      } else if ((race.description.indexOf('MK') === 0)) {
        race.competitors.forEach(competitor => {
          clubsMK.add(competitor.club);
        });
      }
    });
    clubs.forEach((club1) => {
      this.teamsK.push({
        club: club1,
        race: [{ desc: '', points: 0 }]
      });
    });
    clubsMK.forEach((club1) => {
      this.teamsMK.push({
        club: club1,
        race: [{ desc: '', points: 0 }]
      });
    });
  }


  doReorder(ev: any) {
    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. Update the items variable to the
    // new order of items
    ev.detail.complete(this.selectedRace.competitors);
    // console.log(ev.detail);
  }

  selectRace(ev: any) {
    this.selectedRace = this.races[ev.detail.value - 1];
    if (ev.detail.value === this.races.length) {
      this.lastrace = true;
    }
  }

  reorderFromInput(ev: any) {
    console.log(ev);
    // TODO:
  }

  save() {
    this.calculatePoints();
    this.calculateTeamPoints();

    const wsNameRes = 'REZULTATI';
    const wsNameTeamRes = 'EKIPNI PLASMAN - K';
    const wsNameTeamResMK = 'EKIPNI PLASMAN - MK';
    const newWb = XLSX.utils.book_new();
    const ws1 = this.createResultsSheet();
    const ws2 = this.createTeamResultSheet(true);
    const ws3 = this.createTeamResultSheet(false);

    XLSX.utils.book_append_sheet(newWb, ws1, wsNameRes);
    XLSX.utils.book_append_sheet(newWb, ws2, wsNameTeamRes);
    XLSX.utils.book_append_sheet(newWb, ws3, wsNameTeamResMK);
    XLSX.writeFile(newWb, 'Rezultati - Regata Tisin Cvet - 2020.xlsx');
  }

  createResultsSheet(): XLSX.WorkSheet {
    let row: any;
    const aoa: any = [
      ['REZULTATI'],
      ['KRK Tisin Cvet Senta'],
      ['IX međunarodna regata "TISIN CVET"'],
      ['Senta, 11. jul 2020.godine'],
      [],
    ];

    this.races.forEach(race => {
      row = [race.id, 'TRKA', race.description, race.category, undefined, 'bodovi', race.displayTime];
      aoa.push(row);
      aoa.push([]);
      race.competitors.forEach((competitor, i) => {
        const namestr = competitor.start_num + '. ' + competitor.name;
        row = [undefined, (i + 1).toString(), namestr, competitor.club, competitor.city, competitor.points];
        aoa.push(row);
      });
      aoa.push([], []);
    });

    const ws = XLSX.utils.aoa_to_sheet(aoa);
    ws['!margins'] = { left: 0.7, right: 0.7, top: 0.75, bottom: 0.75, header: 0.3, footer: 0.3 };
    ws['!merges'] = [
      { s: { c: 0, r: 0 }, e: { c: 6, r: 0 } },
      { s: { c: 0, r: 1 }, e: { c: 6, r: 1 } },
      { s: { c: 0, r: 2 }, e: { c: 6, r: 2 } },
      { s: { c: 0, r: 3 }, e: { c: 6, r: 3 } },
      { s: { c: 0, r: 4 }, e: { c: 6, r: 4 } },
    ];
    ws['!cols'] = [
      { width: 4 },
      { width: 6 },
      { width: 36 },
      { width: 15 },
      { width: 16 },
    ];
    return ws;
  }

  createTeamResultSheet(K: boolean): XLSX.WorkSheet {
    const teamRes: any = [
      ['IX međunarodna regata "TISIN CVET" - 2020'],
      ['EKIPNI PLASMAN'],
      [], []
    ];

    if (K) {
      teamRes[1] = ['EKIPNI PLASMAN - K'];
      let row = [, ,];
      this.kRaceIndex.forEach(racenum => {
        row.push('trka ' + racenum);
      });
      row.push('ukupno');
      teamRes.push(row);
      this.teamsK.forEach((team, i) => {
        row = [i + 1, team.club];
        team.race.forEach(race => {
          const index = this.kRaceIndex.indexOf(parseInt(race.desc, 10)) + 2;
          row[index] = race.points;
        });
        row[this.kRaceIndex.length + 2] = team.total;
        teamRes.push(row);
      });
    } else {
      teamRes[1] = ['EKIPNI PLASMAN - MK'];
      let row = [, ,];
      this.mkRaceIndex.forEach(racenum => {
        row.push('trka ' + racenum);
      });
      row.push('ukupno');
      teamRes.push(row);
      this.teamsMK.forEach((team, i) => {
        row = [i + 1, team.club];
        team.race.forEach(race => {
          const index = this.mkRaceIndex.indexOf(parseInt(race.desc, 10)) + 2;
          row[index] = race.points;
        });
        row[this.mkRaceIndex.length + 2] = team.total;
        teamRes.push(row);
      });
    }

    const ws = XLSX.utils.aoa_to_sheet(teamRes);
    ws['!margins'] = { left: 0.7, right: 0.7, top: 0.75, bottom: 0.75, header: 0.3, footer: 0.3 };
    ws['!merges'] = [
      { s: { c: 0, r: 0 }, e: { c: 1, r: 0 } },
      { s: { c: 0, r: 1 }, e: { c: 1, r: 1 } },
    ];
    ws['!cols'] = [
      { width: 4 },
      { width: 36 }
    ];
    return ws;
  }

  calculatePoints() {
    const clubs = new Set();
    this.races.forEach(race => {
      if (race.category.includes('MIX')) {
        return;
      }
      if (race.description.indexOf('MK-1') === 0 || race.description.indexOf('MK- 1') === 0 ||
        race.description.indexOf('MK -1') === 0 || race.description.indexOf('MK - 1') === 0) {
        // MK-1:
        for (let i = 0; i < race.competitors.length; i++) {
          if (clubs.has(race.competitors[i].club)) {
            race.competitors[i].points = null;
          } else {
            race.competitors[i].points = race.competitors.length - i;
            clubs.add(race.competitors[i].club);
          }
        }
        clubs.clear();
      } else if (race.description.indexOf('MK-2') === 0 || race.description.indexOf('MK- 2') === 0 ||
        race.description.indexOf('MK -2') === 0 || race.description.indexOf('MK - 2') === 0) {
        // MK-2:
        for (let i = 0; i < race.competitors.length; i++) {
          if (clubs.has(race.competitors[i].club)) {
            race.competitors[i].points = null;
          } else {
            race.competitors[i].points = (race.competitors.length - i) * 1.5;
            clubs.add(race.competitors[i].club);
          }
        }
        clubs.clear();
      } else if (race.description.indexOf('K-1') === 0 || race.description.indexOf('K- 1') === 0 ||
        race.description.indexOf('K -1') === 0 || race.description.indexOf('K - 1') === 0) {
        // K-1:
        for (let i = 0; i < race.competitors.length; i++) {
          if (clubs.has(race.competitors[i].club)) {
            race.competitors[i].points = null;
          } else {
            race.competitors[i].points = race.competitors.length - i;
            clubs.add(race.competitors[i].club);
          }
        }
        clubs.clear();
      } else if (race.description.indexOf('K-2') === 0 || race.description.indexOf('K- 2') === 0 ||
        race.description.indexOf('K -2') === 0 || race.description.indexOf('K - 2') === 0) {
        // K-2:
        for (let i = 0; i < race.competitors.length; i++) {
          if (clubs.has(race.competitors[i].club)) {
            race.competitors[i].points = null;
          } else {
            race.competitors[i].points = (race.competitors.length - i) * 1.5;
            clubs.add(race.competitors[i].club);
          }
        }
        clubs.clear();
      }
    });
  }

  calculateTeamPoints() {
    this.races.forEach(race => {
      if ((race.description.indexOf('K') === 0)) {
        this.kRaceIndex.push(race.id);
        race.competitors.forEach(competitor => {
          for (const team of this.teamsK) {
            if (competitor.club === team.club && competitor.points > 0) {
              team.race.push({ desc: race.id.toString(), points: competitor.points }); // desc: 'race.displayText - race.category - time' ?
            }
          }
        });
      } else if ((race.description.indexOf('MK') === 0)) {
        this.mkRaceIndex.push(race.id);
        race.competitors.forEach(competitor => {
          for (const team of this.teamsMK) {
            if (competitor.club === team.club && competitor.points > 0) {
              team.race.push({ desc: race.id.toString(), points: competitor.points });
            }
          }
        });
      }
    });
    this.calculateTeamTotals();
  }

  calculateTeamTotals() {
    let sum;
    this.teamsK.forEach(t => {
      t.race.shift();
      sum = 0;
      t.race.forEach(r => {
        sum += r.points;
      });
      t.total = sum;
    });
    this.teamsMK.forEach(t => {
      t.race.shift();
      sum = 0;
      t.race.forEach(r => {
        sum += r.points;
      });
      t.total = sum;
    });
    this.teamsK.sort((a, b) => (a.total > b.total) ? -1 : ((b.total > a.total) ? 1 : 0));
    this.teamsMK.sort((a, b) => (a.total > b.total) ? -1 : ((b.total > a.total) ? 1 : 0));
  }

}

export interface Competitor {
  name: string;
  start_num: number;
  club: string;
  city: string;
  displayText: string;
  points: number;
}

export interface Race {
  id: number;
  time: any;
  description: string; // k1-1000m
  category: string; // seniori
  distance?: string;
  competitors?: Competitor[];
  displayText?: string;
  displayTime?: string; // HH:mm
}

export interface TeamResult {
  club: string;
  race?: [{
    desc: string;
    points: number;
  }];
  total?: number;
}
