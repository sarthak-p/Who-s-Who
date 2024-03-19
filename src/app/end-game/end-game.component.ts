import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface PlayerScore {
  name: string;
  score: number;
}

@Component({
  selector: 'app-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.css']
})
export class EndGameComponent implements OnInit {
  score: number = 0;
  resultMessage: string = '';
  playerName: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.score = history.state?.score || 0;
    this.resultMessage = this.score >= 3 ? 'Congratulations, you won!' : 'Sorry, you lost.';
  }

  submitName(name: string): void {
  name = name.trim();

  if (!name) {
    alert('Please enter your name.');
    return; 
  }

  const newScore: PlayerScore = { name, score: this.score };
  let scores: PlayerScore[] = JSON.parse(localStorage.getItem('leaderboard') || '[]');
  scores.push(newScore);
  scores = scores.sort((a, b) => b.score - a.score).slice(0, 10);
  localStorage.setItem('leaderboard', JSON.stringify(scores));
  this.router.navigate(['/home']);
}
}
