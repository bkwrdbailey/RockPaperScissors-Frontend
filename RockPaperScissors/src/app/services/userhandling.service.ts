import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserhandlingService {

  constructor(private http: HttpClient) { }

  attemptToSignIn(userInfo: User): Observable<any> {
    return this.http.get<boolean>(environment.apiBaseUrl + `/user/login/${userInfo.username}/${userInfo.password}`);
  }

  attemptToRegister(newUserInfo: User): Observable<any> {
    return this.http.post<boolean>(environment.apiBaseUrl + '/user/register', newUserInfo);
  }

  /* Session Storage */

  getUsername(): string
  {
    return sessionStorage.getItem('localUserUsername') ?? ' ';
  }

  getUserActiveStatus(): boolean
  {
    if(sessionStorage.getItem('localUserActiveStatus') == 'true')
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  setUserData(_username: string, isActive: boolean)
  {
    sessionStorage.setItem('localUserUsername', `${_username}`);
    sessionStorage.setItem('localUserActiveStatus', `${isActive}`);
  }

  // SessionStorage data is deleted via removeItem and clear to be safe as some older browsers can not implement one or the other
  clearUserData()
  {
    sessionStorage.removeItem('localUserUsername');
    sessionStorage.removeItem('localUserActiveStatus');

    sessionStorage.clear();
  }
}
