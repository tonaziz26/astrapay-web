import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Example {
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExampleService {
  private apiUrl = 'http://localhost:8000/api/examples';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getExamples(): Observable<Example[]> {
    return this.http.get<Example[]>(this.apiUrl, { headers: this.headers });
  }

  createExample(example: Example): Observable<Example> {
    return this.http.post<Example>(this.apiUrl, example, { headers: this.headers });
  }

  updateExample(name: string, example: Example): Observable<Example> {
    return this.http.put<Example>(`${this.apiUrl}/${name}`, example, { headers: this.headers });
  }

  deleteExample(name: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${name}`, { headers: this.headers });
  }

  getExampleByName(name: string): Observable<Example> {
    return this.http.get<Example>(`${this.apiUrl}/${name}`, { headers: this.headers });
  }
}
