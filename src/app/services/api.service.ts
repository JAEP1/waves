import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from
  '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public users = [];

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }
  apiURL = 'https://my-json-server.typicode.com/victorrosendo/repoUsuariosRamos';

  constructor(private http:HttpClient) { }

  getUsuarios():Observable<any>{

    return this.http.get(this.apiURL+'/users/').pipe(
      retry(3)
    );
  }
}
