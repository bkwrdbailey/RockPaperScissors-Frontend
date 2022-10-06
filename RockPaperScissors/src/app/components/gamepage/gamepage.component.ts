import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameState } from 'src/app/models/GameState';
import { User } from 'src/app/models/User';
import { GamemoveService } from 'src/app/services/gamemove.service';

@Component({
  selector: 'app-gamepage',
  templateUrl: './gamepage.component.html',
  styleUrls: ['./gamepage.component.css']
})
export class GamepageComponent implements OnInit {

  constructor(private gamemoveService: GamemoveService) { }

  @Input()
  currGame: GameState = {playerOne: '', playerTwo: '', rounds: 0, winner: '', playerOneChoice: '', playerTwoChoice: ''}

  @Output() endGameEvent = new EventEmitter<GameState>();

  currUser: User = {username: 'bobbyRPSPRO', password: ''};

  gameHistory!: GameState[];

  choiceNotMade: boolean = true;
  currPlayerTurn: boolean = false;
  anotherRound: boolean = false;
  showWinner: boolean = false;

  playerOneChoiceImg!: string;
  playerTwoChoiceImg!: string;
  overallWinner!: string;

  roundCounter!: number;
  playerOneWins!: number;
  playerTwoWins!: number;

  // Rock Paper Scissors img sources
  rockImg: string = '/assets/icons/icons8-rock.png';
  paperImg: string = '/assets/icons/icons8-paper.png';
  scissorsImg: string = '/assets/icons/icons8-scissors.png';

  ngOnInit() {
    this.gameHistory = [];
    if (this.currGame.playerOne == this.currUser.username) {
      this.currPlayerTurn = true;
    }
    this.roundCounter = 1;
    this.playerOneWins = 0;
    this.playerTwoWins = 0;
  }

  madeRPSChoice(choice: string) {
    this.currPlayerTurn = false;
    this.choiceNotMade = false;
    this.currGame.playerOneChoice = choice;

    this.gamemoveService.updateComputerGameState(this.currGame).subscribe(res => {
      this.currGame = res;
      this.currPlayerTurn = true;

      if (res.playerOneChoice != res.playerTwoChoice) {
        this.roundCounter++;
      }

      if (this.roundCounter <= this.currGame.rounds) {
        this.anotherRound = true;
      }

      if (this.currGame.playerTwoChoice == 'rock') {
        this.currGame.playerTwoChoice = this.rockImg;
      }
      else if (this.currGame.playerTwoChoice == 'paper') {
        this.currGame.playerTwoChoice = this.paperImg;
      }
      else if (this.currGame.playerTwoChoice == 'scissors') {
        this.currGame.playerTwoChoice = this.scissorsImg;
      }

      if (choice == 'rock') {
        this.currGame.playerOneChoice = this.rockImg;
      }
      else if (choice == 'paper') {
        this.currGame.playerOneChoice = this.paperImg
      }
      else if (choice == 'scissors') {
        this.currGame.playerOneChoice = this.scissorsImg;
      }

      if (this.currGame.winner == this.currGame.playerOne) {
        this.playerOneWins++;
      }
      else if (this.currGame.winner == this.currGame.playerTwo) {
        this.playerTwoWins++;
      }

      let priorRound: GameState = {playerOne: this.currGame.playerOne, playerTwo: this.currGame.playerTwo, rounds: 0, winner: this.currGame.winner, playerOneChoice: this.currGame.playerOneChoice, playerTwoChoice: this.currGame.playerTwoChoice}

      this.gameHistory.push(priorRound);

      if (this.roundCounter > this.currGame.rounds)
      {
        if (this.playerOneWins > this.playerTwoWins)
        {
          this.overallWinner = this.currGame.playerOne;
        }
        else
        {
          this.overallWinner = this.currGame.playerTwo;
        }

        this.showWinner = true;
      }
    })
  }

  nextRound() {
    this.anotherRound = false;
    this.choiceNotMade = true;
  }

  gameFinished() {
    this.currGame.playerOne = '';
    this.currGame.playerTwo = '';
    this.currGame.playerOneChoice = '';
    this.currGame.playerTwoChoice = '';
    this.currGame.rounds = 0;
    this.currGame.winner = '';

    this.endGameEvent.emit(this.currGame);
  }

}
