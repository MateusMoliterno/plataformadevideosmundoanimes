import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideosService {
  private apiUrl = 'http://localhost:3000/videos';

  constructor(private http: HttpClient) {}

  getVideos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  incrementVideoViews(videoId: string, currentViews: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${videoId}`, { views: currentViews + 1 });
  }

  incrementVideoLikes(videoId: string, currentLikes: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${videoId}`, { likes: currentLikes + 1 });
  }
}
