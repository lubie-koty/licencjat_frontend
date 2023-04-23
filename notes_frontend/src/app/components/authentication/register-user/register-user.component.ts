import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthenticationService } from 'src/app/services/authentication.service';

import { UserRegisterDTO } from 'src/app/entities/data_transfer_objects/model_dtos';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  public registerForm!: FormGroup;
  public showError: boolean = false;
  public errorMessage: string = '';

  constructor (
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit () : void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
    this.registerForm.get('confirmPassword')?.addValidators(
      this.validateConfirmPasswordFunction(this.registerForm.get('password')!)
    );
  }

  private validateConfirmPasswordFunction (passwordControl: AbstractControl) : ValidatorFn {
    return (confirmPasswordControl: AbstractControl) : { [key: string]: boolean } | null => {
      if (confirmPasswordControl.value === '') { return null; }
      if (confirmPasswordControl.value != passwordControl.value) { return { mustMatch: true }; }
      return null;
    }
  }

  public checkField (fieldName: string) : boolean {
    return this.registerForm.get(fieldName)!.invalid &&
           this.registerForm.get(fieldName)!.touched;
  }

  public fieldHasError (fieldName: string, errorName:string) : boolean {
    return this.registerForm.get(fieldName)!.hasError(errorName);
  }

  public registerUser (formValues: any) {
    this.showError = false;
    const user: UserRegisterDTO = { 
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password
    };
    this.authenticationService.registerUser(user).subscribe({
      next: () => {
        this.router.navigate(['/authenticate/login'], { queryParams: { registrationSuccessful: true } });
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.message);
        this.showError = true;
        this.errorMessage = err.message;
      }
    })
  }
}
