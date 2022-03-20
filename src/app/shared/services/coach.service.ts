import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import { DocumentData, DocumentReference } from 'rxfire/firestore/interfaces';
import { Observable } from 'rxjs';
import { Coach } from '../models/coach';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  constructor(private firestore: Firestore) { }

  getCoaches(): Observable<Coach[]> {
    const coachRef = collection(this.firestore, 'coaches');
    return collectionData(coachRef, { idField: 'id' }) as Observable<Coach[]>;
  }

  getCoachById(id: string): Observable<Coach> {
    const coachRef = doc(this.firestore, `coaches/${id}`);
    return docData(coachRef) as Observable<Coach>;
  }

  getCoachSnapshot(coachRef: DocumentReference<any>) {
    return getDoc(coachRef);
  }

  addCoach(coach: Coach) {
    const coachRef = collection(this.firestore, 'coaches');
    return addDoc(coachRef, coach);
  }

  updateCoach(coachRef: DocumentReference<DocumentData>, data: any) {
    return updateDoc(coachRef, data);
  }

  updateCoachById(id: string, data: any) {
    const coachRef = doc(this.firestore, `coaches/${id}`);
    return updateDoc(coachRef, data);
  }

  deleteCoach(coach: Coach) {
    const coachRef = doc(this.firestore, `coaches/${coach.id}`);
    return deleteDoc(coachRef);
  }

  deleteCoachById(id: string) {
    const coachRef = doc(this.firestore, `coaches/${id}`);
    return deleteDoc(coachRef);
  }
}
