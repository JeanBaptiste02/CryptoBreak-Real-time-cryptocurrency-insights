import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Message {
  content: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  constructor(private http: HttpClient) {}

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>('http://localhost:4000/messages/messages');
  }

  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(
      'http://localhost:4000/messages/messages',
      message
    );
  }
}
