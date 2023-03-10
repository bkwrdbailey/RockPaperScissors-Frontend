import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GameState } from '../models/GameState';

@Injectable({
  providedIn: 'root'
})
export class GamemoveService {

  constructor(private http: HttpClient) { }

  updateComputerGameState(currState: GameState) : Observable<GameState> {
    return this.http.put<GameState>(environment.apiBaseUrl + '/game/computer/nextstate', currState);
  }

  updatePlayerGameState(currState: GameState) : Observable<GameState> {
    return this.http.put<GameState>(environment.apiBaseUrl + '/game/nextstate', currState);
  }
}
