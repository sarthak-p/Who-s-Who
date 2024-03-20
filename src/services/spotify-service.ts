import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private baseUrl = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient) {}

  fetchTracksByGenre(genre: string): Observable<any[]> {
    const token = this.getToken();
    const searchUrl = `${this.baseUrl}/search?q=genre:"${encodeURIComponent(genre)}"&type=track&limit=50`;
    return this.http.get<any>(searchUrl, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      map(response => response.tracks.items)
    );
  }

  private getToken(): string | null {
    const storedToken = localStorage.getItem('whos-who-access-token');
    return storedToken ? JSON.parse(storedToken).value : null;
  }
}
