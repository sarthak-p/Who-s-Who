import { Component, OnInit } from '@angular/core';
import { SpotifyTrack } from '../spotify-track-model';
import { SpotifyService } from 'src/services/spotify-service';
import { GameConfigService } from 'src/services/GameConfigService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hard-mode',
  templateUrl: './hard-mode.component.html',
  styleUrls: ['./hard-mode.component.css']
})
export class HardModeComponent implements OnInit {

  tracks: SpotifyTrack[] = [];
  currentTrackIndex: number = 0;
  currentTrack?: SpotifyTrack;
  artistOptions: string[] = [];
  score: number = 0;
  totalOptions: number = 4;

  constructor(
    private spotifyService: SpotifyService,
    private gameConfigService: GameConfigService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.gameConfigService.currentConfig.subscribe(config => {
      if (config) {
        this.totalOptions = config.artists;
        if (config.genre) {
          this.spotifyService.fetchTracksByGenre(config.genre).subscribe({
            next: (tracks) => {
              this.tracks = tracks;
              this.loadTrack();
            },
            error: (error) => console.error('Error fetching tracks:', error),
          });
        } else {
          console.warn('Genre is not specified in the configuration.');
          this.router.navigate(['/']);
        }
      } else {
        console.warn('No game configuration found.');
        this.router.navigate(['/']);
      }
    });
  }

  loadTrack(): void {
    if (this.currentTrackIndex >= 5) {
      this.endGame();
      return;
    }
    this.currentTrack = this.tracks[this.currentTrackIndex];
    this.prepareOptions();
  }

  prepareOptions(): void {
    if (!this.currentTrack) return;

    let options = [this.currentTrack.artists[0].name];
    let potentialOptions = this.tracks
      .filter(track => track.id !== this.currentTrack!.id)
      .flatMap(track => track.artists.map(artist => artist.name));

    potentialOptions = [...new Set(potentialOptions)];

    while (options.length < this.totalOptions) {
      const randomIndex = Math.floor(Math.random() * potentialOptions.length);
      const option = potentialOptions.splice(randomIndex, 1)[0];
      if (!options.includes(option)) {
        options.push(option);
      }
    }

    this.artistOptions = this.shuffleArray(options);
  }

  guess(option: string): void {
    if (!this.currentTrack) return;

    if (option === this.currentTrack.artists[0].name) {
      this.score++;
    }
      this.moveToNextTrack();
    
  }

  moveToNextTrack(): void {
    this.currentTrackIndex++;
    if (this.currentTrackIndex < 5) {
      this.loadTrack();
    } else {
      this.endGame();
    }
  }

  endGame(): void {
    alert(`Game Over! Your score: ${this.score}`);
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

}
