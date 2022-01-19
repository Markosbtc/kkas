import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Auth, createUserWithEmailAndPassword, GoogleAuthProvider,
  getAdditionalUserInfo, sendEmailVerification, sendPasswordResetEmail,
  signInWithEmailAndPassword, signInWithPopup, updateProfile, User, authState, signInAnonymously, signOut
} from '@angular/fire/auth';
import { traceUntilFirst } from '@angular/fire/performance';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user$: Observable<User | null>;
  private readonly userDisposable: Subscription | undefined;


  constructor(
    private auth: Auth,
    private router: Router
  ) {

    this.user$ = authState(this.auth);
    this.userDisposable = authState(this.auth).pipe(
      traceUntilFirst('auth'),
      map(u => !!u)
    ).subscribe(isLoggedIn => {
      // console.log('constructor isloggedin', isLoggedIn);
    });

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
      this.router.navigate(['login']);
    })
  }

  async emailLogin(email: string, password: string): Promise<any> {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  async emailSignUp(email: string, password: string): Promise<void> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    await updateProfile(credential.user, { displayName: credential.user.displayName });
    await sendEmailVerification(credential.user);

    //TODO: create user in db
    // ...
  }

  async resetPassword(email): Promise<any> {

    // sends reset password email
    await sendPasswordResetEmail(this.auth, email).then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    });
  }

  async GoogleAuth() {
    return await signInWithPopup(this.auth, new GoogleAuthProvider()).then((res) => {
      const additionalInfo = getAdditionalUserInfo(res);
      console.log(res);
      console.log(additionalInfo);
      this.router.navigate(['home']);

      //TODO: create user in db
      if (additionalInfo?.isNewUser) {
        // ...
      }


      // this.SetUserData(result.user);
    });
  }


  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  /*  SetUserData(user) {
     const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
     const userData: User = {
       uid: user.uid,
       email: user.email,
       displayName: user.displayName,
       photoURL: user.photoURL,
       emailVerified: user.emailVerified
     }
     return userRef.set(userData, {
       merge: true
     })
   } */

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }

}