import { Component, OnInit, Input } from '@angular/core';

// Fetch API from server
import { FetchApiDataService } from '../fetch-api-data.service';

// Display Notifcations back to the User
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  initialInput: any = {};
  @Input() updateUser = { username: '', password: '', email: '', birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  /**
   * @returns object with user information
   * @function getUserData
   */
  getUserData(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      this.updateUser.username = this.user.username;
      this.updateUser.password = this.user.password;
      this.updateUser.email = this.user.email;
      this.updateUser.birthday = this.user.birthday;
    });
  }

  /**
   * POST | Update userData
   * @function updateUserData
   */
  updateUserData(): void {
    this.fetchApiData.updateUser(this.updateUser).subscribe((result) => {
      console.log(result);
      this.snackBar.open(`User profile successfully updated`, 'OK', {
        duration: 2000,
      });
      if (this.user.username !== result.username) {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open(
          `User profile successfully updated. Please login using your new username.`,
          'OK',
          {
            duration: 2000,
          }
        );
      }
    });
  }

  /**
   * Delete user
   * @function deleteUser
   */
  deleteUser(): void {
    if (confirm('All your data will be lost - this cannot be undone!')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open(
          'You have successfully deleted your account - See ya!!!',
          'OK',
          {
            duration: 2000,
          }
        );
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }
}
