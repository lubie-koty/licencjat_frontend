import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';

import { UserLoginDTO, UserRegisterDTO, UserDetailsDTO } from '../entities/data_transfer_objects/model_dtos';
import { ActionResponseDTO, AuthenticationDTO } from '../entities/data_transfer_objects/response_dtos';
import { getApiURI } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private getAuthApiURI = getApiURI('api/users');
  private authStatusSubject = new BehaviorSubject<boolean>(false);

  constructor (private httpClient: HttpClient, private jwtHelper: JwtHelperService) { }

  public registerUser (body: UserRegisterDTO) : Observable<ActionResponseDTO> {
    return this.httpClient.post<ActionResponseDTO>(this.getAuthApiURI('register'), body)
  }

  public loginUser (body: UserLoginDTO) : Observable<AuthenticationDTO> {
    return this.httpClient.post<AuthenticationDTO>(this.getAuthApiURI('login'), body)
  }

  public getAuthStatusObservable () : Observable<boolean> {
    return this.authStatusSubject.asObservable()
  }

  public isUserLoggedIn () : boolean {
    const token = localStorage.getItem('token');
    return token !== null && !this.jwtHelper.isTokenExpired(token);
  }

  public logout () {
    localStorage.removeItem('token');
    this.authStatusSubject.next(false);
  }

  public sendAuthStatusNotification (authStatus: boolean) {
    this.authStatusSubject.next(authStatus);
  }

  public getLoggedUserDetails () : Observable<UserDetailsDTO> {
    return this.httpClient.get<UserDetailsDTO>(this.getAuthApiURI('current-user-details'));
  }
}
