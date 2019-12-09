import { Injectable } from '@angular/core';
import { HttpClient}from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  consultarPaises():Observable<Object>{
    const url = "https://restcountries.eu/rest/v2/all";
    console.info("La url es: "+url);
    return this.http.get<Object>(url);
  }
}
