import { Component, OnInit } from '@angular/core';
import { GameState } from 'src/app/models/GameState';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  constructor() { }

  gameNotStarted: boolean = true;
  loading: boolean = false;

  currUser: User = {username: '', password: ''}

  newGame: GameState = {playerOne: '', playerTwo: '', rounds: 0, winner: '', playerOneChoice: '', playerTwoChoice: ''}

  ngOnInit(): void {
  }

  playCompGame() {
    this.newGame.playerOne = 'bobbyRPSPRO';
    this.newGame.playerTwo = 'RPSxTerminator';
    this.newGame.rounds = 3;
    this.gameNotStarted = false;
  }

  resetValues(cleanGame: GameState) {
    this.gameNotStarted = true;
    this.newGame = cleanGame;
  }
}
