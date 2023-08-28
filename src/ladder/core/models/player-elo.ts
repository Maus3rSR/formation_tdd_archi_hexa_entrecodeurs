export type MatchResult = 'WIN' | 'LOOSE' | 'DRAW';

export class PlayerElo {
  constructor(public playerId: string, public elo: number) {}

  computeElo(matchResult: MatchResult): void {
    let newElo;
    switch (matchResult) {
      case 'WIN':
        newElo = this.elo + 10;
        break;
      case 'LOOSE':
        newElo = this.elo - 5;
        break;
      case 'DRAW':
        newElo = this.elo + 3;
    }

    this.elo = newElo;
  }
}
