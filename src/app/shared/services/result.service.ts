import { Injectable } from '@angular/core';
import { addDoc, collectionData, collection, Firestore, deleteDoc, doc, docData, updateDoc, getDoc, query, where, orderBy } from '@angular/fire/firestore';
import { DocumentData, DocumentReference } from 'rxfire/firestore/interfaces';
import { Observable } from 'rxjs';
import { Result } from '../models/result';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private firestore: Firestore) { }

  getResults(): Observable<Result[]> {
    const raceRef = collection(this.firestore, 'results');
    return collectionData(raceRef, { idField: 'id' }) as Observable<Result[]>;
  }

  getResultsByRaceId(raceId: string): Observable<Result[]> {
    const quer = query(collection(this.firestore, 'results'), where("raceId", "==", raceId), orderBy("rank"));
    return collectionData(quer, { idField: 'id' }) as Observable<Result[]>;
  }

  getResultById(id: string): Observable<Result> {
    const raceRef = doc(this.firestore, `results/${id}`);
    return docData(raceRef, { idField: 'id' }) as Observable<Result>;
  }

  getResultSnapshot(raceRef: DocumentReference<any>) {
    return getDoc(raceRef);
  }

  addResult(result: Result) {
    const raceRef = collection(this.firestore, 'results');
    return addDoc(raceRef, result);
  }

  updateResult(raceRef: DocumentReference<DocumentData>, data: any) {
    return updateDoc(raceRef, data);
  }

  updateResultById(id: string, data: any) {
    const raceRef = doc(this.firestore, `results/${id}`);
    return updateDoc(raceRef, data);
  }

  deleteResult(result: Result) {
    const raceRef = doc(this.firestore, `results/${result.id}`);
    return deleteDoc(raceRef);
  }

  deleteResultById(id: string) {
    const raceRef = doc(this.firestore, `results/${id}`);
    return deleteDoc(raceRef);
  }
}
