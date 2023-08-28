import { PlayerElo } from '../../models/player-elo';
import { PlayerEloRepository } from '../../ports/player-elo.repository';
import { ComputeEloCommandHandler } from './compute-elo.commandhandler';

let playerEloRepository: StubPlayerEloRepository;

beforeEach(() => {
  playerEloRepository = new StubPlayerEloRepository();
});

describe('Feature: Elo computing', () => {
  it.each`
    matchResult | pe    | expectedPE
    ${'WIN'}    | ${10} | ${1510}
    ${'LOOSE'}  | ${-5} | ${1495}
    ${'DRAW'}   | ${3}  | ${1503}
  `(
    'Should add $pe to player ELO when $matchResult',
    async ({ matchResult, expectedPE }) => {
      // Arrange / Given
      playerEloRepository.eloRank.set(
        'player1',
        new PlayerElo('player1', 1500),
      );

      // Act / When
      await new ComputeEloCommandHandler(playerEloRepository).execute({
        playerId: 'player1',
        type: matchResult,
      });

      // Assert / Then
      expect(playerEloRepository.eloRank.get('player1').elo).toBe(expectedPE);
    },
  );
});

class StubPlayerEloRepository implements PlayerEloRepository {
  eloRank: Map<string, PlayerElo> = new Map();
  getPlayerElo(playerId: string): Promise<PlayerElo> {
    return Promise.resolve(this.eloRank.get(playerId));
  }

  updatePlayerElo(newElo: PlayerElo): Promise<void> {
    this.eloRank.set(newElo.playerId, newElo);
    return Promise.resolve();
  }
}
