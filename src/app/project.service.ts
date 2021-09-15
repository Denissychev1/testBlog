import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) {
  }

  API_URL: string = "http://127.0.0.1:3000";

  getToDoTitles(path: string): Observable<any> {
    let endpoint = this.API_URL + path
    return this.http.get<any>(endpoint);
  };

  getToDoList(path: string): Observable<any> {
    let endpoint = this.API_URL + path
    return this.http.get<any>(endpoint);
  }

  postToDo(body: object) {
    const path = '/todos';
    let endpoint = this.API_URL + path
    return this.http.post(endpoint, body)
  }

  updateToDo(id: number, body?: any) {
    const path = '/todos';
    const qwe = {checked: body}
    let params = new HttpParams();
    params = params.append('id', id);
    let endpoint = this.API_URL + path +`/${id}`
    return this.http.put(endpoint, qwe)
  }

}
