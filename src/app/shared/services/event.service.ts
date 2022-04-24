import { Injectable } from '@angular/core';
import { addDoc, collectionData, collection, Firestore, deleteDoc, doc, docData, updateDoc, getDoc, query, where } from '@angular/fire/firestore';
import { DocumentData, DocumentReference } from 'rxfire/firestore/interfaces';
import { Observable } from 'rxjs';
import { Event } from '../models/event';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private firestore: Firestore) { }

  getEvents(): Observable<Event[]> {
    const eventRef = collection(this.firestore, 'events');
    return collectionData(eventRef, { idField: 'id' }) as Observable<Event[]>;
  }

  getEventById(id: string): Observable<Event> {
    const eventRef = doc(this.firestore, `events/${id}`);
    return docData(eventRef, { idField: 'id' }) as Observable<Event>;
  }

  getEventsByTeamId(teamId: string): Observable<Event[]> {
    const q = query(collection(this.firestore, 'events'), where("organizer.id", "==", teamId));
    return collectionData(q, { idField: 'id' }) as Observable<Event[]>;
  }  

  getEventSnapshot(eventRef: DocumentReference<any>) {
    return getDoc(eventRef);
  }

  getCurrentEvent(): Observable<Event[]> {
    const q = query(collection(this.firestore, 'events'), where("endDate", ">=", new Date(new Date().setHours(0, 0, 0, 0)).toISOString()));
    return collectionData(q, { idField: 'id' }) as Observable<Event[]>;
  }

  getUpcomingEvents(): Observable<Event[]> {
    const q = query(collection(this.firestore, 'events'), where("startDate", ">=", new Date(new Date().setHours(0, 0, 0, 0)).toISOString()));
    return collectionData(q, { idField: 'id' }) as Observable<Event[]>;
  }

  addEvent(event: Event) {
    const eventRef = collection(this.firestore, 'events');
    return addDoc(eventRef, event);
  }

  updateEvent(eventRef: DocumentReference<DocumentData>, data: any) {
    return updateDoc(eventRef, data);
  }

  updateEventById(id: string, data: any) {
    const eventRef = doc(this.firestore, `events/${id}`);
    return updateDoc(eventRef, data);
  }

  deleteEvent(event: Event) {
    const eventRef = doc(this.firestore, `events/${event.id}`);
    return deleteDoc(eventRef);
  }

  deleteEventById(id: string) {
    const eventRef = doc(this.firestore, `events/${id}`);
    return deleteDoc(eventRef);
  }
}
