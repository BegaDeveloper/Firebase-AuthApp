import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  //GET users
  getUsers() {
    return this.http.get('http://localhost:3000/users').pipe(
      map((res) => {
        return res;
      })
    );
  }

  //POST users
  postUser(data: any) {
    return this.http.post('http://localhost:3000/users', data).pipe(
      map((res) => {
        return res;
      })
    );
  }

  //EDIT users
  editUser(data: any, id: number) {
    return this.http.put('http://localhost:3000/users/' + id, data).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
