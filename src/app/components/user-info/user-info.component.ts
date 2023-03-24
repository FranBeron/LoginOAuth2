import { Component, OnInit } from '@angular/core';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit {
  userPic: any;
  photoExist: boolean = false;
  userName: any;
  userEmail: any;
  token: any;
  showToken: boolean = false;

  constructor() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user !== null) {
      this.userPic = user.photoURL;
      if(this.userPic)
        this.photoExist = true;
      this.userName = user.displayName;
      this.userEmail = user.email;
      const idToken = user
        .getIdToken()
        .then((token: string) => (this.token = token));
      console.log(
        user.getIdToken().then((token: string) => (this.token = token))
      );
    }
  }
  ngOnInit(): void {}
  
  onShowToken() {
    this.showToken = !this.showToken;
  }
}
