import { UserSettings } from './user-settings';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getSubscriptionTuypes(): Observable<string[]> | undefined {
    return of(['Monthly', 'Annually', 'Lifetime']);
  }

  constructor(private http: HttpClient) { }

  postUserSettingsForm (userSettings: UserSettings) : Observable<any>{
   // return of(userSettings);
   return this.http.post('https://putsreq.com/4fyJg9yf6SygxCzY0HPW', userSettings);
  }
}
