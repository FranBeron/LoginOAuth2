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
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private auth: Auth, private Aft: AngularFireAuth,  private router: Router) {}

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

  async logout() {
    try {
      await this.auth
        .signOut();
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
      throw new Error('Error al cerrar sesión');
    }
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  loginWithFacebook() {
    return signInWithPopup(this.auth, new FacebookAuthProvider());
  }
}
