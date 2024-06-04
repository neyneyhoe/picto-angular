import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PictoService {
  private apiUrl = 'http://localhost:8000/api/create-inquiry/'; 

  constructor(private http: HttpClient) { }

  sendInquiry(text: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, { text }, { headers })
      .pipe(
        tap(response => {
          console.log('Response from server:', response);
        }),
        map(response => response)
      );
  }
}
