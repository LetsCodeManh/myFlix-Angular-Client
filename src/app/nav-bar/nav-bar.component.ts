import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  /**
   * Navigates to movies page
   * @function moviePage
   */
  moviePage(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Navigates to user page
   * @function profilePage
   */
  profilePage(): void {
    this.router.navigate(['profile']);
  }

  /**
   * LogOut and navigates to welcome page
   * @function logOut
   */
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}
