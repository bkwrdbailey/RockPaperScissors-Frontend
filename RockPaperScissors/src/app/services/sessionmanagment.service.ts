import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionmanagmentService {

  constructor(private http: HttpClient) { }

  checkSessionStatus(username: string): Observable<boolean> {
    return this.http.put<boolean>(environment.apiBaseUrl + `/Session/Status`, username);
  }

  removeSession(username: string): Observable<any> {
    return this.http.delete(environment.apiBaseUrl + `/Session/Removal/${username}`);
  }
}
