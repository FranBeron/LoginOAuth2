import { getAuth } from 'firebase/auth';
import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  router: any;
  constructor(private auth: Auth, private Aft: AngularFireAuth) {}

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  getCurrentUser(): Promise<User> {
    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          const currentUser: User = {
            uid: user.uid,
            email: user.email ? user.email : '',
            displayName: user.displayName ? user.displayName : '',
            photoURL: user.photoURL ? user.photoURL : '',
          };
          resolve(currentUser);
        } else {
          reject('No se ha iniciado sesión');
        }
      });
    });
  }

  resetPassword(email: string) {
    return this.Aft.sendPasswordResetEmail(email);
  }

  logout() {
    return this.auth
      .signOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log(error);
        throw new Error('Error al cerrar sesión');
      });
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  loginWithFacebook() {
    return signInWithPopup(this.auth, new FacebookAuthProvider());
  }
}
