import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isAuthenticated: boolean = false;

  constructor (
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit () : void {
    this.authenticationService.getAuthStatusObservable().subscribe(res => {
      this.isAuthenticated = res;
    })
  }

  public logout () {
    this.authenticationService.logout();
    this.router.navigate(['/authenticate/login']);
  }
}
