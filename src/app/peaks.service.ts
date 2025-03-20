import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeaksService {
  private baseUrl = 'http://localhost:3000'; // URL del backend

  constructor(private http: HttpClient) {}

  // Obtener la lista de picos
  getPeaks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/peaks`);
  }

  // Registrar una subida a un pico
  logClimb(peakId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/peaks/${peakId}/climb`, {});
  }
}
