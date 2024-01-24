import { HIGHSCORE_LIST_LENGTH } from '../constants/game-settings.constants';

interface HighscoreProps {
  name: string;
  score: number;
}

export class Highscore {
  private highscores: HighscoreProps[];

  constructor() {
    this.highscores = new Array<HighscoreProps>();
  }

  isHighscore(highscore: number) {
    return highscore > this.highscores[HIGHSCORE_LIST_LENGTH - 1].score;
  }

  addNewHighscore(highscore: HighscoreProps) {
    this.highscores.push(highscore);
    this.highscores.sort((first, second) => second.score - first.score);
    if (this.highscores.length > HIGHSCORE_LIST_LENGTH) {
      this.highscores.pop();
    }
  }

  getHighscores() {
    return this.highscores;
  }
}
