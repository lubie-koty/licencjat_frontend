import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginDTO } from 'src/app/entities/data_transfer_objects/model_dtos';
import { AuthenticationDTO } from 'src/app/entities/data_transfer_objects/response_dtos';

import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  public loginForm!: FormGroup;
  public showError: boolean = false;
  public errorMessage: string = '';

  constructor (
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit () : void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  public checkField (fieldName: string) : boolean {
    return this.loginForm.get(fieldName)!.invalid &&
           this.loginForm.get(fieldName)!.touched;
  }

  public fieldHasError (fieldName: string, errorName:string) : boolean {
    return this.loginForm.get(fieldName)!.hasError(errorName);
  }

  public loginUser (formValues: any) {
    this.showError = false;
    const user: UserLoginDTO = { ...formValues };
    this.authenticationService.loginUser(user).subscribe({
      next: (res: AuthenticationDTO) => {
        localStorage.setItem('token', res.token);
        this.authenticationService.sendAuthStatusNotification(res.isSuccessful);
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        this.showError = true;
        this.errorMessage = err.message;
      }
    });
  }
}
