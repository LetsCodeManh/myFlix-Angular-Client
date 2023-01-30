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

  moviePage(): void {
    this.router.navigate(['movies']);
  }
  profilePage(): void {
    this.router.navigate(['profile']);
  }
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}
