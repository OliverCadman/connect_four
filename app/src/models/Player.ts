export class Player {
  color: string;
  playerName: string;
  score: number;

  constructor(color: string, playerName: string) {
    this.color = color;
    this.playerName = playerName;
    this.score = 0;
  }

  incrementScore() {
    this.score += 1;
  }
}
