import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  GEMINI_API_KEY = environment.GEMINI_API_KEY;
  API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.GEMINI_API_KEY}`;

  constructor(private httpClient: HttpClient) {}

  sendPrompt(prompt: string): Observable<any> {
    return this.httpClient.post<any>(
      this.API_URL,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
