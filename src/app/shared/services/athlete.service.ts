import { Injectable } from '@angular/core';
import { addDoc, collectionData, collection, Firestore, deleteDoc, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Athlete } from '../models/athlete';

@Injectable({
  providedIn: 'root'
})
export class AthleteService {

  constructor(private firestore: Firestore) { }

  getAthletes(): Observable<Athlete[]> {
    const athleteRef = collection(this.firestore, 'athletes');
    return collectionData(athleteRef, { idField: 'id' }) as Observable<Athlete[]>;
  }

  getAthleteById(id: string): Observable<Athlete> {
    const athleteRef = doc(this.firestore, `athletes/${id}`);
    return docData(athleteRef) as Observable<Athlete>;
  }

  addAthlete(athlete: Athlete) {
    const athleteRef = collection(this.firestore, 'athletes');
    return addDoc(athleteRef, athlete);
  }

  deleteAthlete(athlete: Athlete) {
    const athleteRef = doc(this.firestore, `athletes/${athlete.id}`);
    return deleteDoc(athleteRef);
  }



}
