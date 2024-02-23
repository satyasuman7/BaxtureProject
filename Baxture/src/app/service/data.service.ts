import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private _http: HttpClient) { }

  readonly url = "http://localhost:3000";
  private selectedUser: any;

  // POST (ADD) DETAILS
  postData(data: any): Observable<any> {
    return this._http.post(`${this.url}/users`, data);
  }

  // GET DETAILS
  getData() {
    return this._http.get(`${this.url}/users`);
  }

  // DELETE DETAILS
  deleteData(id: number) {
    return this._http.delete(`${this.url}/users/${id}`);
  }

  // UPDATE DETAILS
  updateData(id: number, data: any): Observable<any> {
    return this._http.put(`${this.url}/users/${id}`, data);
  }

  setSelectedUser(data: any) {
    this.selectedUser = data;
  }

  getSelectedUser() {
    return this.selectedUser;
  }

  private isUpdateModeSubject = new BehaviorSubject<boolean>(false);
  isUpdateMode$ = this.isUpdateModeSubject.asObservable();

  setUpdateMode(isUpdateMode: boolean) {
    this.isUpdateModeSubject.next(isUpdateMode);
  }
}
