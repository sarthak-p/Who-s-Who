import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameConfig } from 'src/app/game-config-model';

@Injectable({
  providedIn: 'root',
})
export class GameConfigService {
  private configSource = new BehaviorSubject<GameConfig | null>(null);
  currentConfig = this.configSource.asObservable();

  constructor() {}

  setConfig(config: GameConfig) {
    this.configSource.next(config);
  }

  getConfig(): GameConfig | null {
    return this.configSource.getValue();
  }
}
