let playerEloRepository: StubPlayerEloRepository;

beforeEach(() => {
  playerEloRepository = new StubPlayerEloRepository();
});

describe('Feature: Elo computing', () => {
  it('Should add 10 PE to the winner player', async () => {
    // Arrange / Given
    playerEloRepository.eloRank.set('player1', 1500);

    // Act / When
    await new ComputeEloCommandHandler(playerEloRepository).execute();

    // Assert / Then
    expect(playerEloRepository.eloRank.get('player1')).toBe(1510);
  });
});

interface PlayerEloRepository {
  updatePlayerElo(playerId: string, newElo: number): Promise<void>;
  getPlayerElo(playerId: string): Promise<number>;
}

class StubPlayerEloRepository implements PlayerEloRepository {
  eloRank: Map<string, number> = new Map();
  getPlayerElo(playerId: string): Promise<number> {
    return Promise.resolve(this.eloRank.get(playerId));
  }

  updatePlayerElo(playerId: string, newElo: number): Promise<void> {
    this.eloRank.set(playerId, newElo);
    return Promise.resolve();
  }
}

class ComputeEloCommandHandler {
  constructor(private playerEloRepository: PlayerEloRepository) {}

  async execute(): Promise<void> {
    const oldElo = await this.playerEloRepository.getPlayerElo('player1');
    const newElo = oldElo + 10;
    return this.playerEloRepository.updatePlayerElo('player1', newElo);
  }
}
