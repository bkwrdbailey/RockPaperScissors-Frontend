import { Component, OnInit } from '@angular/core';
import { GameState } from 'src/app/models/GameState';
import { User } from 'src/app/models/User';
import { UserhandlingService } from 'src/app/services/userhandling.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  constructor(private userData: UserhandlingService) { }

  gameNotStarted: boolean = true;
  loading: boolean = false;

  currUsername: string = '';

  newGame: GameState = {playerOne: '', playerTwo: '', rounds: 0, winner: '', playerOneChoice: '', playerTwoChoice: ''}

  ngOnInit() {
    this.currUsername = this.userData.getUsername();
  }

  playCompGame() {
    if(this.currUsername != ' ')
    {
      this.newGame.playerOne = this.currUsername;
    }
    else
    {
      this.newGame.playerOne = 'guest';
    }
    this.newGame.playerTwo = 'rpsxterminator';
    this.newGame.rounds = 3;
    this.gameNotStarted = false;
  }

  resetValues(cleanGame: GameState) {
    this.gameNotStarted = true;
    this.newGame = cleanGame;
  }
}
