import { Injectable } from '@angular/core';
import { addDoc, collectionData, collection, Firestore, deleteDoc, doc, docData, updateDoc, getDoc } from '@angular/fire/firestore';
import { DocumentData, DocumentReference, DocumentSnapshot } from 'rxfire/firestore/interfaces';
import { Observable } from 'rxjs';
import { SportsTeam } from '../models/sportsTeam';


@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private firestore: Firestore) { }

  getSportTeams(): Observable<SportsTeam[]> {
    const teamRef = collection(this.firestore, 'teams');
    return collectionData(teamRef, /* { idField: 'id' } */) as Observable<SportsTeam[]>;
  }

  getSportsTeamById(id: string): Observable<SportsTeam> {
    const teamRef = doc(this.firestore, `teams/${id}`);
    return docData(teamRef) as Observable<SportsTeam>;
  }

  getSportsTeamSnapshot(teamRef: DocumentReference<any>) {
    return getDoc(teamRef);
  }

  addSportsTeam(team: SportsTeam) {
    const teamRef = collection(this.firestore, 'teams');
    return addDoc(teamRef, team);
  }

  updateSportsTeam(teamRef: DocumentReference<DocumentData>, data: any) {
    return updateDoc(teamRef, data);
  }

  updateSportsTeamById(id: string, data: any) {
    const teamRef = doc(this.firestore, `teams/${id}`);
    return updateDoc(teamRef, data);
  }

  deleteSportsTeam(team: SportsTeam) {
    const teamRef = doc(this.firestore, `teams/${team.id}`);
    return deleteDoc(teamRef);
  }

  deleteSportsTeamById(id: string) {
    const teamRef = doc(this.firestore, `teams/${id}`);
    return deleteDoc(teamRef);
  }

}
