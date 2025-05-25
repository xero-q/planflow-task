import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenaiService {
  API_URL = 'https://api.openai.com/v1/chat/completions';
  OPENAI_API_KEY =
    'sk-proj-ATLObTa3gmcRQ52uDJkXAu6HeTX3pC26qGVB0s7invV9PXoPq8CEcd7erMCBtTQNPy6SI-4DNT3BlbkFJpbBGLRUt6Y5hmFd98GOsI502b57w3zGJkWS7JCpS1Kp8Elihdv5-2PUexF_g3l__iyhCG5gcA';

  constructor(private httpClient: HttpClient) {}

  sendPrompt(prompt: string): Observable<any> {
    return this.httpClient.post<any>(
      this.API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${this.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
