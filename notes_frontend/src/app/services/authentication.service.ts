import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { BehaviorSubject, Observable } from 'rxjs';

import { UserLoginDTO, UserRegisterDTO } from '../entities/data_transfer_objects/model_dtos';
import { ActionResponseDTO, AuthenticationDTO } from '../entities/data_transfer_objects/response_dtos';
import { User } from '../entities/models/models';
import { getApiURI, getHttpOptions } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private getAuthApiURI = getApiURI('api/users');
  private authStatusSubject = new BehaviorSubject<boolean>(false);

  constructor (private httpClient: HttpClient) { }

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
    return !(localStorage.getItem('token') === null)
  }

  public logout () {
    localStorage.removeItem('token');
    this.authStatusSubject.next(false);
  }

  public sendAuthStatusNotification (authStatus: boolean) {
    this.authStatusSubject.next(authStatus);
  }

  public getLoggedUserDetails () : Observable<User> {
    return this.httpClient.get<User>(this.getAuthApiURI('current-user-details'), getHttpOptions());
  }
}
