import { Injectable } from '@angular/core';
import { addDoc, collectionData, collection, Firestore, deleteDoc, doc, docData, query, where, updateDoc } from '@angular/fire/firestore';
import { DocumentData, DocumentReference } from 'rxfire/firestore/interfaces';
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

  getAthletesByTeamId(teamId: string): Observable<Athlete[]> {
    const q = query(collection(this.firestore, 'athletes'), where("memberOf.id", "==", teamId));
    return collectionData(q, { idField: 'id' }) as Observable<Athlete[]>;
  }

  addAthlete(athlete: Athlete) {
    const athleteRef = collection(this.firestore, 'athletes');
    return addDoc(athleteRef, athlete);
  }

  updateAthlete(athleteRef: DocumentReference<DocumentData>, data: any) {
    return updateDoc(athleteRef, data);
  }

  updateAthleteById(id: string, data: any) {
    const teamRef = doc(this.firestore, `athletes/${id}`);
    return updateDoc(teamRef, data);
  }

  deleteAthlete(athlete: Athlete) {
    const athleteRef = doc(this.firestore, `athletes/${athlete.id}`);
    return deleteDoc(athleteRef);
  }



}
