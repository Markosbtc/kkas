import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Auth, createUserWithEmailAndPassword, GoogleAuthProvider,
  getAdditionalUserInfo, sendEmailVerification, sendPasswordResetEmail,
  signInWithEmailAndPassword, signInWithPopup, updateProfile, User, authState, signInAnonymously, signOut
} from '@angular/fire/auth';
import { traceUntilFirst } from '@angular/fire/performance';
import { Router } from '@angular/router';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user$: Observable<User | null>;
  private readonly userDisposable: Subscription | undefined;


  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {

    this.user$ = authState(this.auth);
    /* this.userDisposable = authState(this.auth).pipe(
      traceUntilFirst('auth'),
      map(u => !!u)
    ).subscribe(isLoggedIn => {
      // console.log('constructor isloggedin', isLoggedIn);
    }); */

    this.user$.subscribe(user => {
      if (user) {
        const userData = user;
        localStorage.setItem('user', JSON.stringify(userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });

  }

  getUserProfile() {
    const user = this.auth.currentUser;
    if (user) {
      const userDocRef = doc(this.firestore, `user/${user.uid}`);
      return docData(userDocRef);
    }
    return EMPTY;
  }

  /* getUserRole() {
    this.auth.currentUser.getIdTokenResult().then((res) => {
      console.log(res);
      if (res.claims.role) {
        // do stuff
      }
    }).catch((error) => {
      console.error(error);
    })
  }

  async grantRole(email: string, role: string){
    const user = await //??
  } */

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    // return (user !== null && user.emailVerified !== false) ? true : false;
    return (user !== null) ? true : false;
  }

  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user.emailVerified !== false) ? true : false;
  }

  async loginAnonymously() {
    return await signInAnonymously(this.auth);
  }

  async logout() {
    return await signOut(this.auth).then(() => {
      localStorage.removeItem('user');
      this.router.navigateByUrl('home', { replaceUrl: true });
    })
  }

  async emailLogin(email: string, password: string) {
    try {
      const response = await signInWithEmailAndPassword(this.auth, email, password);
      if (response?.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
        return response.user;
      } else {
        return null;
      }
    } catch (error) {
      throw (error);
    }
  }

  async emailSignUp(email: string, password: string, userData) {
    try {
      const credential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = credential.user;
      await sendEmailVerification(user);
      await updateProfile(user, { displayName: userData.fullName });
      const userDocRef = doc(this.firestore, `user/${user.uid}`);
      await setDoc(userDocRef, {
        userData
      });
      localStorage.setItem('user', JSON.stringify(credential.user));
      return credential.user;
    } catch (error) {
      throw (error);
    }

  }

  // sends reset password email
  async resetPassword(email): Promise<any> {
    return await sendPasswordResetEmail(this.auth, email);
  }

  async GoogleAuth() {
    return await signInWithPopup(this.auth, new GoogleAuthProvider()).then((res) => {
      const additionalInfo = getAdditionalUserInfo(res);
      console.log(res);
      console.log(additionalInfo);
      this.router.navigate(['home'], { replaceUrl: true });

      //TODO: create user in db
      if (additionalInfo?.isNewUser) {
        // ...
      }

    });
  }

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }

}