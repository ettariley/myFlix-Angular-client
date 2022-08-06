import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Log out user
   * Clears local storage of user and token
   * Redirects to welcome screen
   */
  logoutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

}
