import { Injectable } from '@angular/core';
import { addDoc, collectionData, collection, Firestore, deleteDoc, doc, docData, updateDoc, getDoc, query, where } from '@angular/fire/firestore';
import { DocumentData, DocumentReference } from 'rxfire/firestore/interfaces';
import { Observable } from 'rxjs';
import { Race } from '../models/race';


@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(private firestore: Firestore) { }

  getRaces(): Observable<Race[]> {
    const raceRef = collection(this.firestore, 'races');
    return collectionData(raceRef, { idField: 'id' }) as Observable<Race[]>;
  }

  getRacesByEventId(eventId: string): Observable<Race[]> {
    const quer = query(collection(this.firestore, 'races'), where("eventId", "==", eventId));
    return collectionData(quer, { idField: 'id' }) as Observable<Race[]>;
  }

  getRaceByEventIdAndRaceNumber(eventId: string, raceNum: number): Observable<Race[]> {
    const quer = query(collection(this.firestore, 'races'), where("eventId", "==", eventId), where("number", "==", raceNum));
    return collectionData(quer, { idField: 'id' }) as Observable<Race[]>;
  }

  getRaceById(id: string): Observable<Race> {
    const raceRef = doc(this.firestore, `races/${id}`);
    return docData(raceRef, { idField: 'id' }) as Observable<Race>;
  }

  getRaceSnapshot(raceRef: DocumentReference<any>) {
    return getDoc(raceRef);
  }

  addRace(race: Race) {
    const raceRef = collection(this.firestore, 'races');
    return addDoc(raceRef, race);
  }

  updateRace(raceRef: DocumentReference<DocumentData>, data: any) {
    return updateDoc(raceRef, data);
  }

  updateRaceById(id: string, data: any) {
    const raceRef = doc(this.firestore, `races/${id}`);
    return updateDoc(raceRef, data);
  }

  deleteRace(race: Race) {
    const raceRef = doc(this.firestore, `races/${race.id}`);
    return deleteDoc(raceRef);
  }

  deleteRaceById(id: string) {
    const raceRef = doc(this.firestore, `races/${id}`);
    return deleteDoc(raceRef);
  }
}
