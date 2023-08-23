import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JsondataService {

  geoUrl = environment.geoJsonUrl;
  constructor(private http: HttpClient) { }

  getJSON(): Observable<any> {
    return this.http.get(`${this.geoUrl}`);
  }
}
