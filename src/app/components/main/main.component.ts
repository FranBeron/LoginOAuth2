import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { getAuth } from 'firebase/auth';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  userPic: any;

  constructor(private userService: UserService, private router: Router) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user !== null) {
      this.userPic = user.photoURL;
    }
  }
  ngOnInit(): void {}

  onClick() {
    this.userService
      .logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => console.log(error));
  }
  
}
