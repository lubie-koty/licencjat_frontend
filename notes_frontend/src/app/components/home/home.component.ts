import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public userData!: string;

  constructor (
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.authenticationService.getLoggedUserDetails().subscribe(res => {
      this.userData = `${res.firstName ?? ''}${res.lastName ? ` ${res.lastName}` : ''}`;
    })
  }
}
